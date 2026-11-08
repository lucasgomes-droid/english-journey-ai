import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { wordStatus, type WordStatus } from "@/lib/vocab-status";
import { weeklyCounts } from "@/lib/week-buckets";

/** Dados extras do painel visual do Meu progresso (aulas por semana e vocabulário por estado). */
export async function loadProgressDashboard(
  supabase: SupabaseClient,
  uid: string,
  todayIso: string,
) {
  const since = new Date(
    Date.parse(`${todayIso}T12:00:00Z`) - 8 * 7 * 86_400_000,
  )
    .toISOString()
    .slice(0, 10);
  const [actRes, vocRes] = await Promise.all([
    supabase
      .from("activity_log")
      .select("local_date")
      .eq("user_id", uid)
      .in("kind", ["lesson", "test"])
      .gte("local_date", since)
      .limit(2000),
    supabase
      .from("review_items")
      .select("repetitions, lapses, interval_days, due_at, last_reviewed_at")
      .eq("user_id", uid)
      .in("item_type", ["vocab", "phrase"])
      .limit(5000),
  ]);
  const lessonsPerWeek = weeklyCounts(
    ((actRes.data ?? []) as { local_date: string }[]).map((a) => a.local_date),
    todayIso,
    8,
  );
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();
  const vocab: Record<WordStatus, number> = {
    esquecida: 0,
    aprendendo: 0,
    nova: 0,
    firme: 0,
  };
  for (const r of vocRes.data ?? []) vocab[wordStatus(r, now)]++;
  return { lessonsPerWeek, vocab };
}
