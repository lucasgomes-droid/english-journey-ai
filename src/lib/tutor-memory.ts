import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { loadPatterns } from "@/lib/difficulties";
import { getCategory } from "@/content/error-patterns";

/**
 * O que o professor "lembra" do aluno no começo de cada conversa: erros recorrentes,
 * palavras que não saíram na pronúncia e expressões aprendidas recentemente.
 */
export async function buildTutorMemory(supabase: SupabaseClient, uid: string): Promise<string | null> {
  const since = new Date(Date.now() - 45 * 86_400_000).toISOString();
  const [{ patterns }, pron, phrases, lastReport] = await Promise.all([
    loadPatterns(supabase, uid),
    supabase.from("pronunciation_attempts").select("details").eq("user_id", uid).eq("provider", "whisper-words").gte("created_at", since).order("created_at", { ascending: false }).limit(60),
    supabase.from("personal_phrases").select("en").eq("user_id", uid).order("created_at", { ascending: false }).limit(6),
    supabase.from("conversations").select("report").eq("user_id", uid).not("report", "is", null).order("updated_at", { ascending: false }).limit(1).maybeSingle(),
  ]);
  const lines: string[] = [];
  for (const p of patterns.slice(0, 3)) {
    const ex = p.samples[0];
    lines.push(`- Recurring difficulty: ${getCategory(p.category)!.label}${ex ? ` (e.g. "${ex.original}" → "${ex.corrected}")` : ""}`);
  }
  const missed = new Map<string, number>();
  for (const r of pron.data ?? []) {
    const words = ((r.details as { words?: { word: string; accuracy: number }[] } | null)?.words ?? []).filter((w) => w.accuracy < 100);
    for (const w of words) missed.set(w.word, (missed.get(w.word) ?? 0) + 1);
  }
  const hard = [...missed.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([w]) => w);
  if (hard.length) lines.push(`- Words that did not come out right when repeating: ${hard.join(", ")}. Use some of them naturally so the student practises.`);
  const learned = (phrases.data ?? []).map((p) => p.en as string);
  if (learned.length) lines.push(`- Expressions learned recently (create chances to reuse): ${learned.join(" | ")}`);
  const rep = lastReport.data?.report as { suggestion_pt?: string } | null;
  if (rep?.suggestion_pt) lines.push(`- Advice from the last session: ${rep.suggestion_pt}`);
  return lines.length ? lines.join("\n").slice(0, 1500) : null;
}
