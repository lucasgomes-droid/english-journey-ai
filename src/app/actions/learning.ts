"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getLesson, getExercise, getVocab, isLessonUnlocked, nextLevel } from "@/content/curriculum";
import { getCompletedLessons, getSession } from "@/lib/data";
import { gradeExercise, scorePercent, type ExerciseAnswer } from "@/lib/grading";
import { recordActivity, syncAchievements } from "@/lib/progress";
import { NEW_SRS, reviewSrs } from "@/lib/srs";

const answerSchema: z.ZodType<ExerciseAnswer> = z.union([
  z.object({ kind: z.literal("choice"), choice: z.number().int().min(0).max(20) }),
  z.object({ kind: z.literal("text"), text: z.string().max(500) }),
  z.object({ kind: z.literal("order"), words: z.array(z.string().max(60)).max(40) }),
  z.object({ kind: z.literal("pairs"), mistakes: z.number().int().min(0).max(50) }),
]);

const submitSchema = z.object({
  lessonId: z.string(),
  answers: z.array(z.object({ exerciseId: z.string(), answer: answerSchema })).max(60),
  durationSeconds: z.number().int().min(0).max(4 * 3600),
});

export interface LessonResult {
  ok: boolean;
  error?: string;
  score: number;
  passed: boolean;
  passScore: number;
  xpEarned: number;
  firstCompletion: boolean;
  leveledUpTo: string | null;
  newAchievements: string[];
}

/**
 * Corrige a aula no servidor (a mesma função usada na tela), salva respostas,
 * progresso, XP, sequência, itens de revisão e conquistas.
 */
export async function submitLesson(input: z.infer<typeof submitSchema>): Promise<LessonResult> {
  const fail = (error: string): LessonResult => ({ ok: false, error, score: 0, passed: false, passScore: 0, xpEarned: 0, firstCompletion: false, leveledUpTo: null, newAchievements: [] });
  const parsed = submitSchema.safeParse(input);
  if (!parsed.success) return fail("Dados da aula inválidos.");
  const { lessonId, answers, durationSeconds } = parsed.data;

  const lesson = getLesson(lessonId);
  if (!lesson) return fail("Aula não encontrada.");

  const { supabase, user, profile } = await getSession();
  if (!profile) return fail("Perfil não encontrado.");

  const { completed, rows } = await getCompletedLessons(supabase, user.id);
  if (!isLessonUnlocked(lessonId, completed) && !completed.has(lessonId)) return fail("Esta aula ainda está bloqueada.");

  // Corrige cada exercício da aula. Exercício sem resposta conta como erro.
  const byId = new Map(answers.map((a) => [a.exerciseId, a.answer]));
  const graded = lesson.exercises.map((ex) => {
    const ans = byId.get(ex.id);
    const correct = ans ? gradeExercise(ex, ans).correct : false;
    return { ex, ans, correct };
  });
  const score = scorePercent(graded.map((g) => g.correct));
  const passed = score >= lesson.passScore;
  const previous = rows.find((r) => r.lesson_id === lessonId);
  const firstCompletion = passed && !completed.has(lessonId);

  const { error: ansErr } = await supabase.from("exercise_answers").insert(
    graded.map((g) => ({
      user_id: user.id,
      lesson_id: lessonId,
      exercise_id: g.ex.id,
      skill: g.ex.skill,
      answer: g.ans ?? null,
      correct: g.correct,
    })),
  );
  if (ansErr) return fail(`Não foi possível salvar as respostas: ${ansErr.message}`);

  await supabase.from("lesson_progress").upsert({
    user_id: user.id,
    lesson_id: lessonId,
    status: passed || completed.has(lessonId) ? "completed" : "started",
    best_score: Math.max(score, previous?.best_score ?? 0),
    last_score: score,
    attempts: (previous?.attempts ?? 0) + 1,
    completed_at: firstCompletion ? new Date().toISOString() : undefined,
    updated_at: new Date().toISOString(),
  });

  // XP: valor cheio na primeira aprovação; refazer vale menos; reprovado ganha pelo esforço.
  const correctCount = graded.filter((g) => g.correct).length;
  const xpEarned = firstCompletion ? lesson.xp + (score === 100 ? 5 : 0) : passed ? Math.max(5, Math.round(lesson.xp / 4)) : correctCount;

  // Repetição espaçada: vocabulário da aula entra na fila; exercícios errados voltam em breve.
  const now = Date.now();
  if (lesson.vocabulary.length) {
    await supabase.from("review_items").upsert(
      lesson.vocabulary.map((v) => ({ user_id: user.id, item_type: "vocab", item_id: v.id, due_at: new Date(now + 86_400_000).toISOString() })),
      { onConflict: "user_id,item_type,item_id", ignoreDuplicates: true },
    );
  }
  const wrong = graded.filter((g) => !g.correct);
  if (wrong.length) {
    await supabase.from("review_items").upsert(
      wrong.map((g) => ({ user_id: user.id, item_type: "exercise", item_id: g.ex.id, repetitions: 0, interval_days: 0, due_at: new Date(now + 10 * 60_000).toISOString() })),
      { onConflict: "user_id,item_type,item_id" },
    );
  }

  let leveledUpTo: string | null = null;
  if (lesson.kind === "test") {
    const mod = lesson.moduleId;
    await supabase.from("assessments").insert({ user_id: user.id, lesson_id: lessonId, level_code: profile.current_level, score, passed });
    if (passed && mod.endsWith("-final")) {
      const nl = nextLevel(profile.current_level);
      if (nl) {
        leveledUpTo = nl;
        await supabase.from("profiles").update({ current_level: nl }).eq("id", user.id);
      }
    }
  }

  let updatedProfile = profile;
  try {
    updatedProfile = await recordActivity(supabase, profile, {
      kind: lesson.kind === "test" ? "test" : "lesson",
      ref: lessonId,
      title: lesson.title,
      xp: xpEarned,
      durationSeconds,
      score,
    });
  } catch (e) {
    return fail((e as Error).message);
  }
  const newAchievements = await syncAchievements(supabase, updatedProfile, { perfectLesson: score === 100 });

  revalidatePath("/", "layout");
  return { ok: true, score, passed, passScore: lesson.passScore, xpEarned, firstCompletion, leveledUpTo, newAchievements };
}

// ---------------------------------------------------------------------------
// REVISÃO (repetição espaçada)
// ---------------------------------------------------------------------------

const reviewSchema = z.object({
  itemType: z.enum(["vocab", "exercise"]),
  itemId: z.string(),
  answer: answerSchema,
});

export async function submitReview(input: z.infer<typeof reviewSchema>) {
  const parsed = reviewSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, error: "Dados inválidos." };
  const { itemType, itemId, answer } = parsed.data;
  const { supabase, user } = await getSession();

  let correct = false;
  let typo = false;
  let expected = "";
  if (itemType === "vocab") {
    const v = getVocab(itemId);
    if (!v) return { ok: false as const, error: "Item não encontrado." };
    // Vocabulário é revisado do português para o inglês.
    const r = gradeExercise({ id: itemId, type: "translate", skill: "vocabulary", prompt: v.pt, accepted: [v.en] }, answer);
    ({ correct, expected } = r);
    typo = Boolean(r.typo);
  } else {
    const found = getExercise(itemId);
    if (!found) return { ok: false as const, error: "Item não encontrado." };
    const r = gradeExercise(found.exercise, answer);
    ({ correct, expected } = r);
    typo = Boolean(r.typo);
    await supabase.from("exercise_answers").insert({ user_id: user.id, lesson_id: found.lessonId, exercise_id: itemId, skill: found.exercise.skill, answer, correct });
  }

  const { data: row } = await supabase
    .from("review_items")
    .select("ease, interval_days, repetitions, lapses")
    .eq("user_id", user.id)
    .eq("item_type", itemType)
    .eq("item_id", itemId)
    .maybeSingle();
  const state = row ? { ease: Number(row.ease), intervalDays: row.interval_days, repetitions: row.repetitions, lapses: row.lapses } : NEW_SRS;
  const next = reviewSrs(state, correct ? (typo ? 4 : 5) : 1);

  await supabase.from("review_items").upsert(
    {
      user_id: user.id,
      item_type: itemType,
      item_id: itemId,
      ease: next.ease,
      interval_days: next.intervalDays,
      repetitions: next.repetitions,
      lapses: next.lapses,
      due_at: next.dueAt.toISOString(),
      last_reviewed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,item_type,item_id" },
  );

  return { ok: true as const, correct, typo, expected, nextInDays: next.intervalDays };
}

/** Fecha a sessão de revisão: registra XP e tempo. `score` guarda a quantidade de itens revisados. */
export async function finishReviewSession(input: { reviewed: number; correct: number; durationSeconds: number }) {
  const data = z
    .object({ reviewed: z.number().int().min(0).max(500), correct: z.number().int().min(0).max(500), durationSeconds: z.number().int().min(0).max(14400) })
    .parse(input);
  if (data.reviewed === 0) return { ok: true, xp: 0, newAchievements: [] as string[] };
  const { supabase, profile } = await getSession();
  if (!profile) return { ok: false, xp: 0, newAchievements: [] as string[] };
  const xp = data.correct * 2 + (data.reviewed - data.correct);
  const updated = await recordActivity(supabase, profile, {
    kind: "review",
    title: `Revisão de ${data.reviewed} itens`,
    xp,
    durationSeconds: data.durationSeconds,
    score: data.reviewed,
  });
  const newAchievements = await syncAchievements(supabase, updated);
  revalidatePath("/", "layout");
  return { ok: true, xp, newAchievements };
}
