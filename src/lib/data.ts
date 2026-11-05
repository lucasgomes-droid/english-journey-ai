import "server-only";
import { cache } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireUser } from "@/lib/supabase/server";
import { displayStreak, localDate } from "@/lib/streak";
import { ALL_LESSONS, getLesson, lessonsOfLevel, nextLessonFor } from "@/content/curriculum";
import type { CefrLevel, Skill } from "@/content/types";

export interface Profile {
  id: string;
  display_name: string;
  current_level: CefrLevel;
  daily_minutes: number;
  daily_goal_xp: number;
  weekly_goal_lessons: number;
  learning_goal: string | null;
  timezone: string;
  xp_total: number;
  streak_current: number;
  streak_best: number;
  last_study_date: string | null;
  onboarded: boolean;
  /** Fase 3: mostrar tradução em português (padrão: sim). */
  show_translation?: boolean;
}

export const getSession = cache(async () => {
  const { supabase, user } = await requireUser();
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single<Profile>();
  return { supabase, user, profile };
});

export async function getCompletedLessons(supabase: SupabaseClient, userId: string) {
  const { data } = await supabase.from("lesson_progress").select("lesson_id, status, best_score, attempts").eq("user_id", userId);
  const rows = data ?? [];
  return {
    rows,
    completed: new Set(rows.filter((r) => r.status === "completed").map((r) => r.lesson_id as string)),
  };
}

export interface DashboardData {
  profile: Profile;
  streak: number;
  todayXp: number;
  weekXp: { date: string; xp: number }[];
  weekLessons: number;
  totalMinutes: number;
  wordsLearned: number;
  dueReviews: number;
  levelProgress: number;
  overallLessonsDone: number;
  nextLesson: ReturnType<typeof nextLessonFor>;
  /** Partes da prova do nível atual já aprovadas (relevante quando acabam as aulas do nível). */
  examPartsPassed: string[];
  skills: { skill: Skill; label: string; accuracy: number | null; answers: number }[];
  activity: { id: number; kind: string; title: string; xp: number; score: number | null; created_at: string }[];
  achievements: string[];
  /** Tipos de atividade feitos hoje (para marcar a rotina). */
  todayKinds: string[];
  lastWeeklyAt: string | null;
}

const SKILL_LABELS: Record<Skill, string> = {
  vocabulary: "Vocabulário",
  grammar: "Gramática",
  listening: "Listening",
  reading: "Reading",
  writing: "Writing",
  speaking: "Speaking",
};

export const getDashboard = cache(async (): Promise<DashboardData> => {
  const { supabase, user, profile } = await getSession();
  if (!profile) throw new Error("Perfil não encontrado. Verifique se o SQL 20261104120000_schema.sql foi executado.");
  const tz = profile.timezone || "America/Sao_Paulo";
  const today = localDate(new Date(), tz);
  const weekAgo = new Date(Date.now() - 6 * 86_400_000);
  const days = Array.from({ length: 7 }, (_, i) => localDate(new Date(weekAgo.getTime() + i * 86_400_000), tz));

  const [{ completed }, activityRes, recentRes, answersRes, vocabRes, dueRes, achRes, weeklyRes] = await Promise.all([
    getCompletedLessons(supabase, user.id),
    supabase.from("activity_log").select("kind, xp, duration_seconds, local_date").eq("user_id", user.id),
    supabase.from("activity_log").select("id, kind, title, xp, score, created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(8),
    supabase.from("exercise_answers").select("skill, correct").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1000),
    supabase.from("review_items").select("item_id", { count: "exact", head: true }).eq("user_id", user.id).eq("item_type", "vocab").gte("repetitions", 1),
    supabase.from("review_items").select("item_id", { count: "exact", head: true }).eq("user_id", user.id).lte("due_at", new Date().toISOString()),
    supabase.from("achievements").select("code").eq("user_id", user.id),
    supabase.from("speaking_sessions").select("created_at").eq("user_id", user.id).eq("kind", "weekly").order("created_at", { ascending: false }).limit(1),
  ]);

  const activity = activityRes.data ?? [];
  const weekXp = days.map((d) => ({ date: d, xp: activity.filter((a) => a.local_date === d).reduce((s, a) => s + a.xp, 0) }));
  const weekLessons = activity.filter((a) => (a.kind === "lesson" || a.kind === "test") && days.includes(a.local_date)).length;

  const levelLessons = lessonsOfLevel(profile.current_level);
  const nextLesson = nextLessonFor(completed, profile.current_level);
  let examPartsPassed: string[] = [];
  if (!nextLesson) {
    const { data } = await supabase.from("exam_attempts").select("part").eq("user_id", user.id).eq("level_code", profile.current_level).eq("passed", true);
    examPartsPassed = Array.from(new Set((data ?? []).map((r) => r.part as string)));
  }
  const levelDone = levelLessons.filter((l) => completed.has(l.id)).length;

  const answers = answersRes.data ?? [];
  const skills = (Object.keys(SKILL_LABELS) as Skill[]).map((skill) => {
    const rows = answers.filter((a) => a.skill === skill);
    return {
      skill,
      label: SKILL_LABELS[skill],
      answers: rows.length,
      accuracy: rows.length ? Math.round((rows.filter((r) => r.correct).length / rows.length) * 100) : null,
    };
  });

  return {
    profile,
    streak: displayStreak(profile.last_study_date, profile.streak_current, today),
    todayXp: weekXp[6].xp,
    weekXp,
    weekLessons,
    totalMinutes: Math.round(activity.reduce((s, a) => s + (a.duration_seconds ?? 0), 0) / 60),
    wordsLearned: vocabRes.count ?? 0,
    dueReviews: dueRes.count ?? 0,
    levelProgress: levelLessons.length ? Math.round((levelDone / levelLessons.length) * 100) : 0,
    overallLessonsDone: ALL_LESSONS.filter((l) => completed.has(l.id)).length,
    nextLesson,
    examPartsPassed,
    skills,
    activity: recentRes.data ?? [],
    achievements: (achRes.data ?? []).map((a) => a.code as string),
    todayKinds: Array.from(new Set(activity.filter((a) => a.local_date === today).map((a) => a.kind as string))),
    lastWeeklyAt: weeklyRes.data?.[0]?.created_at ?? null,
  };
});

/** Erros recentes do aluno, usados para personalizar o professor de IA. */
export async function getRecentMistakes(supabase: SupabaseClient, userId: string, limit = 8) {
  const { data } = await supabase
    .from("exercise_answers")
    .select("exercise_id, lesson_id")
    .eq("user_id", userId)
    .eq("correct", false)
    .order("created_at", { ascending: false })
    .limit(40);
  const seen = new Set<string>();
  const out: string[] = [];
  for (const r of data ?? []) {
    if (seen.has(r.exercise_id)) continue;
    seen.add(r.exercise_id);
    const lesson = getLesson(r.lesson_id);
    const ex = lesson?.exercises.find((e) => e.id === r.exercise_id);
    if (!lesson || !ex) continue;
    const what = "prompt" in ex ? ex.prompt : "sentence" in ex ? ex.sentence : "";
    out.push(`${lesson.title}: ${what}`);
    if (out.length >= limit) break;
  }
  return out;
}
