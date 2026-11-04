import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getExercise } from "@/content/curriculum";
import { classifyCorrection, getCategory, type ErrorCategory } from "@/content/error-patterns";
import { buildPatterns, lessonCategory, type ErrorEvent, type Pattern } from "@/lib/difficulty-rules";
import type { Exercise } from "@/content/types";

const expected = (ex: Exercise | undefined): string => {
  if (!ex) return "";
  switch (ex.type) {
    case "multiple_choice":
      return ex.options[ex.answer];
    case "translate":
    case "fill_blank":
      return ex.accepted[0];
    case "word_order":
      return ex.answer;
    case "listening":
      return ex.options ? ex.options[ex.answer ?? 0] : (ex.accepted?.[0] ?? "");
    default:
      return "";
  }
};

/** Todos os erros e acertos reais do aluno, já classificados por padrão. */
export async function loadErrorEvents(supabase: SupabaseClient, uid: string): Promise<ErrorEvent[]> {
  const since = new Date(Date.now() - 120 * 86_400_000).toISOString();
  const [ans, msgs, lis, pron] = await Promise.all([
    supabase.from("exercise_answers").select("lesson_id, exercise_id, skill, correct, answer, created_at").eq("user_id", uid).gte("created_at", since).order("created_at", { ascending: false }).limit(3000),
    supabase.from("messages").select("correction, created_at").eq("user_id", uid).eq("role", "user").not("correction", "is", null).gte("created_at", since).order("created_at", { ascending: false }).limit(500),
    supabase.from("listening_results").select("score, total, created_at").eq("user_id", uid).gte("created_at", since).limit(500),
    supabase.from("pronunciation_attempts").select("completeness, provider, details, created_at").eq("user_id", uid).eq("provider", "minimal-pair").gte("created_at", since).limit(800),
  ]);
  const events: ErrorEvent[] = [];
  for (const a of ans.data ?? []) {
    const ex = getExercise(a.exercise_id)?.exercise;
    const typed = (a.answer as { kind?: string; text?: string } | null)?.kind === "text" ? (a.answer as { text: string }).text : null;
    events.push({
      category: lessonCategory(a.lesson_id, a.skill),
      wrong: !a.correct,
      at: a.created_at,
      source: a.skill === "listening" ? "listening" : "exercise",
      sample: !a.correct && typed && expected(ex) ? { original: typed, corrected: expected(ex) } : undefined,
    });
  }
  for (const m of msgs.data ?? []) {
    const c = m.correction as { original?: string; corrected?: string; category?: ErrorCategory };
    if (!c?.corrected) continue;
    events.push({
      category: c.category && getCategory(c.category) ? c.category : classifyCorrection(c.original ?? "", c.corrected),
      wrong: true,
      at: m.created_at,
      source: "conversation",
      sample: { original: c.original ?? "", corrected: c.corrected },
    });
  }
  for (const r of lis.data ?? []) {
    for (let i = 0; i < r.total; i++) events.push({ category: "listening", wrong: i >= r.score, at: r.created_at, source: "listening" });
  }
  for (const p of pron.data ?? []) {
    const d = p.details as { target?: string; heard?: string } | null;
    const wrong = Number(p.completeness) !== 100;
    events.push({ category: "pronunciation", wrong, at: p.created_at, source: "pronunciation", sample: wrong && d?.target ? { original: `entendido como "${d.heard ?? "?"}"`, corrected: d.target } : undefined });
  }
  return events;
}

export async function loadPatterns(supabase: SupabaseClient, uid: string): Promise<{ events: ErrorEvent[]; patterns: Pattern[] }> {
  const events = await loadErrorEvents(supabase, uid);
  return { events, patterns: buildPatterns(events) };
}

export interface PracticePlanRow {
  id: number;
  category: ErrorCategory;
  status: "active" | "improved" | "not_yet";
  baseline_rate: number | null;
  steps: { studied: boolean; drillScore: number | null; conversationTurns: number };
  result: { summary: string; drillScore: number | null; baseline: number | null; after: number | null } | null;
  created_at: string;
  completed_at: string | null;
}

export async function loadPlans(supabase: SupabaseClient, uid: string): Promise<PracticePlanRow[]> {
  const { data } = await supabase.from("practice_plans").select("id, category, status, baseline_rate, steps, result, created_at, completed_at").eq("user_id", uid).order("created_at", { ascending: false }).limit(50);
  return (data ?? []) as PracticePlanRow[];
}

/** Falas do aluno em conversas desde o início do plano (etapa 5). */
export async function conversationTurnsSince(supabase: SupabaseClient, uid: string, since: string): Promise<number> {
  const { count } = await supabase.from("messages").select("id", { count: "exact", head: true }).eq("user_id", uid).eq("role", "user").gte("created_at", since);
  return count ?? 0;
}
