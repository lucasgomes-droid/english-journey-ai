"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getSession } from "@/lib/data";
import { getCategory } from "@/content/error-patterns";
import { errorRate, verifyPlan } from "@/lib/difficulty-rules";
import { conversationTurnsSince, loadErrorEvents, type PracticePlanRow } from "@/lib/difficulties";

const cat = z.string().refine((c) => !!getCategory(c), "Categoria inválida.");

/** Etapa 1: começa um plano de recuperação para a dificuldade (guarda a taxa de erro atual). */
export async function startPracticePlan(category: string) {
  if (!cat.safeParse(category).success) return { ok: false as const, error: "Categoria inválida." };
  const { supabase, user } = await getSession();
  const { data: open } = await supabase.from("practice_plans").select("id").eq("user_id", user.id).eq("category", category).eq("status", "active").maybeSingle();
  if (open) return { ok: true as const, id: open.id as number };
  const events = await loadErrorEvents(supabase, user.id);
  const baseline = errorRate(events, getCategory(category)!.id, Date.now() - 60 * 86_400_000).rate;
  const { data, error } = await supabase.from("practice_plans").insert({ user_id: user.id, category, baseline_rate: baseline }).select("id").single();
  if (error || !data) return { ok: false as const, error: "Não foi possível criar o plano." };
  revalidatePath("/dificuldades");
  return { ok: true as const, id: data.id as number };
}

async function ownPlan(id: number) {
  const { supabase, user } = await getSession();
  const { data } = await supabase.from("practice_plans").select("id, category, status, baseline_rate, steps, result, created_at, completed_at").eq("id", id).eq("user_id", user.id).maybeSingle();
  return { supabase, user, plan: data as PracticePlanRow | null };
}

/** Etapas 2–3: o aluno leu a explicação e os exemplos. */
export async function markStudied(id: number) {
  const { supabase, plan } = await ownPlan(id);
  if (!plan || plan.status !== "active") return { ok: false as const };
  await supabase.from("practice_plans").update({ steps: { ...plan.steps, studied: true } }).eq("id", id);
  revalidatePath(`/dificuldades/${plan.category}`);
  return { ok: true as const };
}

/** Etapa 4: resultado dos exercícios específicos. */
export async function saveDrillScore(id: number, score: number) {
  const s = z.number().int().min(0).max(100).safeParse(score);
  if (!s.success) return { ok: false as const };
  const { supabase, plan } = await ownPlan(id);
  if (!plan || plan.status !== "active") return { ok: false as const };
  await supabase.from("practice_plans").update({ steps: { ...plan.steps, drillScore: s.data } }).eq("id", id);
  revalidatePath(`/dificuldades/${plan.category}`);
  return { ok: true as const };
}

/** Etapas 6–7: verifica a evolução e registra o resultado no histórico. */
export async function verifyPracticePlan(id: number) {
  const { supabase, user, plan } = await ownPlan(id);
  if (!plan || plan.status !== "active") return { ok: false as const, error: "Plano não encontrado." };
  const turns = await conversationTurnsSince(supabase, user.id, plan.created_at);
  const steps = { ...plan.steps, conversationTurns: turns };
  const events = await loadErrorEvents(supabase, user.id);
  const after = errorRate(events, plan.category, new Date(plan.created_at).getTime()).rate;
  const v = verifyPlan(steps, plan.baseline_rate, after);
  if (!v.ready) {
    await supabase.from("practice_plans").update({ steps }).eq("id", id);
    return { ok: false as const, error: v.summary };
  }
  await supabase
    .from("practice_plans")
    .update({
      steps,
      status: v.improved ? "improved" : "not_yet",
      result: { summary: v.summary, drillScore: steps.drillScore, baseline: plan.baseline_rate, after },
      completed_at: new Date().toISOString(),
    })
    .eq("id", id);
  revalidatePath("/dificuldades");
  revalidatePath(`/dificuldades/${plan.category}`);
  return { ok: true as const, improved: v.improved, summary: v.summary };
}

const adaptiveSchema = z.array(z.object({ exerciseId: z.string().max(80), correct: z.boolean(), ms: z.number().int().min(0).max(600_000).optional() })).min(1).max(30);

/** Treino adaptativo: os resultados alimentam as dificuldades e a revisão (exercícios da trilha). */
export async function submitAdaptive(results: z.infer<typeof adaptiveSchema>) {
  const parsed = adaptiveSchema.safeParse(results);
  if (!parsed.success) return { ok: false as const };
  const { supabase, user, profile } = await getSession();
  const { getExercise } = await import("@/content/curriculum");
  const { recordActivity } = await import("@/lib/progress");
  const rows = parsed.data
    .map((r) => ({ r, e: getExercise(r.exerciseId) }))
    .filter((x) => x.e)
    .map(({ r, e }) => ({ user_id: user.id, lesson_id: e!.lessonId, exercise_id: r.exerciseId, skill: e!.exercise.skill, answer: { kind: "adaptive" }, correct: r.correct, response_ms: r.ms ?? null }));
  if (rows.length) await supabase.from("exercise_answers").insert(rows);
  const wrong = rows.filter((r) => !r.correct);
  if (wrong.length)
    await supabase.from("review_items").upsert(
      wrong.map((w) => ({ user_id: user.id, item_type: "exercise", item_id: w.exercise_id, repetitions: 0, interval_days: 0, due_at: new Date(Date.now() + 10 * 60_000).toISOString() })),
      { onConflict: "user_id,item_type,item_id" },
    );
  const correct = parsed.data.filter((r) => r.correct).length;
  if (profile) await recordActivity(supabase, profile, { kind: "review", ref: "adaptive", title: "Treino adaptativo", xp: correct, durationSeconds: Math.round(parsed.data.reduce((s, r) => s + (r.ms ?? 0), 0) / 1000), score: Math.round((correct / parsed.data.length) * 100) }).catch(() => null);
  // Sem revalidatePath aqui: recarregar a página sortearia outro treino por cima do resumo.
  return { ok: true as const };
}
