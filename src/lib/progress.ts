import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { earnedAchievements } from "@/lib/achievements";
import { localDate, nextStreak } from "@/lib/streak";
import type { Profile } from "@/lib/data";

export interface ActivityInput {
  kind: "lesson" | "test" | "review" | "chat" | "pronunciation" | "scenario" | "listening" | "mini";
  ref?: string;
  title: string;
  xp: number;
  durationSeconds: number;
  score?: number | null;
}

/** Registra atividade, soma XP e atualiza a sequência de dias. */
export async function recordActivity(supabase: SupabaseClient, profile: Profile, input: ActivityInput) {
  const tz = profile.timezone || "America/Sao_Paulo";
  const today = localDate(new Date(), tz);
  const streak = nextStreak(profile.last_study_date, profile.streak_current, today);

  const { error: actErr } = await supabase.from("activity_log").insert({
    user_id: profile.id,
    kind: input.kind,
    ref: input.ref ?? null,
    title: input.title,
    xp: input.xp,
    duration_seconds: Math.max(0, Math.min(input.durationSeconds, 3 * 3600)),
    score: input.score ?? null,
    local_date: today,
  });
  if (actErr) throw new Error(`Falha ao salvar atividade: ${actErr.message}`);

  const updated = {
    xp_total: profile.xp_total + input.xp,
    streak_current: streak,
    streak_best: Math.max(profile.streak_best, streak),
    last_study_date: today,
    updated_at: new Date().toISOString(),
  };
  const { error } = await supabase.from("profiles").update(updated).eq("id", profile.id);
  if (error) throw new Error(`Falha ao atualizar perfil: ${error.message}`);
  return { ...profile, ...updated };
}

/** Calcula conquistas com base no estado atual e grava as novas. Retorna os códigos novos. */
export async function syncAchievements(supabase: SupabaseClient, profile: Profile, opts: { perfectLesson?: boolean } = {}) {
  const uid = profile.id;
  const [done, tests, chats, reviews, levelUps, existing] = await Promise.all([
    supabase.from("lesson_progress").select("lesson_id", { count: "exact", head: true }).eq("user_id", uid).eq("status", "completed"),
    supabase.from("assessments").select("id", { count: "exact", head: true }).eq("user_id", uid).eq("passed", true),
    supabase.from("messages").select("id", { count: "exact", head: true }).eq("user_id", uid).eq("role", "user"),
    supabase.from("activity_log").select("score").eq("user_id", uid).eq("kind", "review"),
    supabase.from("assessments").select("id", { count: "exact", head: true }).eq("user_id", uid).eq("passed", true).like("lesson_id", "%-final-test"),
    supabase.from("achievements").select("code").eq("user_id", uid),
  ]);
  const have = new Set((existing.data ?? []).map((a) => a.code as string));
  const reviewCount = (reviews.data ?? []).reduce((s, r) => s + (r.score ?? 0), 0);
  const earned = earnedAchievements({
    lessonsCompleted: done.count ?? 0,
    passedTestsCount: tests.count ?? 0,
    perfectLesson: Boolean(opts.perfectLesson) || have.has("perfect_lesson"),
    streak: profile.streak_current,
    xp: profile.xp_total,
    chats: chats.count ?? 0,
    reviews: reviewCount,
    levelUps: levelUps.count ?? 0,
  });
  const fresh = earned.filter((c) => !have.has(c));
  if (fresh.length) {
    await supabase.from("achievements").insert(fresh.map((code) => ({ user_id: uid, code })));
  }
  return fresh;
}
