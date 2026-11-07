import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { loadErrorEvents } from "@/lib/difficulties";
import type { ErrorCategory } from "@/content/error-patterns";
import type { WeekStats } from "@/lib/adaptive";

const pct = (ok: number, n: number, min = 3) => (n >= min ? Math.round((ok / n) * 100) : null);

/** Números reais de duas semanas (últimos 7 dias × 7 dias anteriores). */
export const loadWeeks = (supabase: SupabaseClient, uid: string, now = Date.now()) => loadPeriods(supabase, uid, 7, now);

/** Números reais de dois períodos seguidos de `days` dias (semana = 7, mês = 30). */
export async function loadPeriods(supabase: SupabaseClient, uid: string, days: number, now = Date.now()) {
  const D = days * 86_400_000;
  const start = new Date(now - 2 * D).toISOString();
  const [act, ans, msgs, convs, pairs, lis, events] = await Promise.all([
    supabase.from("activity_log").select("kind, xp, duration_seconds, created_at").eq("user_id", uid).gte("created_at", start).limit(3000),
    supabase.from("exercise_answers").select("correct, created_at").eq("user_id", uid).gte("created_at", start).limit(5000),
    supabase.from("messages").select("correction, created_at").eq("user_id", uid).eq("role", "user").gte("created_at", start).limit(3000),
    supabase.from("conversations").select("report_score, updated_at").eq("user_id", uid).not("report_score", "is", null).gte("updated_at", start),
    supabase.from("pronunciation_attempts").select("completeness, created_at").eq("user_id", uid).eq("provider", "minimal-pair").gte("created_at", start).limit(3000),
    supabase.from("listening_results").select("score, total, created_at").eq("user_id", uid).gte("created_at", start).limit(1000),
    loadErrorEvents(supabase, uid),
  ]);
  const week = (from: number, to: number): WeekStats => {
    const inR = (iso: string) => {
      const t = new Date(iso).getTime();
      return t >= from && t < to;
    };
    const a = (act.data ?? []).filter((r) => inR(r.created_at));
    const ex = (ans.data ?? []).filter((r) => inR(r.created_at));
    const m = (msgs.data ?? []).filter((r) => inR(r.created_at));
    const c = (convs.data ?? []).filter((r) => inR(r.updated_at));
    const p = (pairs.data ?? []).filter((r) => inR(r.created_at));
    const l = (lis.data ?? []).filter((r) => inR(r.created_at));
    const errorsByCategory: Partial<Record<ErrorCategory, number>> = {};
    for (const e of events) if (e.wrong && inR(e.at)) errorsByCategory[e.category] = (errorsByCategory[e.category] ?? 0) + 1;
    return {
      minutes: Math.round(a.reduce((s, r) => s + (r.duration_seconds ?? 0), 0) / 60),
      xp: a.reduce((s, r) => s + r.xp, 0),
      lessons: a.filter((r) => r.kind === "lesson" || r.kind === "test" || r.kind === "mini").length,
      answers: ex.length,
      accuracy: pct(ex.filter((r) => r.correct).length, ex.length, 5),
      messages: m.length,
      cleanMessages: pct(m.filter((r) => !r.correction).length, m.length),
      reportAvg: c.length ? Math.round(c.reduce((s, r) => s + (r.report_score as number), 0) / c.length) : null,
      pairAccuracy: pct(p.filter((r) => Number(r.completeness) === 100).length, p.length, 4),
      listeningAccuracy: pct(l.reduce((s, r) => s + r.score, 0), l.reduce((s, r) => s + r.total, 0)),
      reviews: a.filter((r) => r.kind === "review").length,
      errorsByCategory,
    };
  };
  return { cur: week(now - D, now + 1), prev: week(now - 2 * D, now - D) };
}
