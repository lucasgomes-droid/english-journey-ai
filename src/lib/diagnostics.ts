import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getLesson, getVocab } from "@/content/curriculum";

export interface Area {
  key: "listening" | "vocabulary" | "grammar" | "writing" | "conversation" | "pronunciation";
  label: string;
  /** 0–100 ou null se ainda não há dados suficientes. */
  score: number | null;
  samples: number;
  href: string;
  action: string;
  detail: string;
}

export interface Diagnostics {
  areas: Area[];
  weakest: Area | null;
  hardWords: { en: string; pt: string; lapses: number }[];
  hardTopics: { lessonId: string; title: string; errors: number; rate: number }[];
  recentCorrections: { original: string; corrected: string; explanation: string }[];
  listeningByLevel: { level: string; pct: number; attempts: number }[];
}

const MIN_SAMPLES = 5;
const pct = (ok: number, total: number) => (total ? Math.round((ok / total) * 100) : null);

/** Calcula onde o aluno mais erra, a partir de tudo que ele já fez no app. */
export async function computeDiagnostics(supabase: SupabaseClient, userId: string): Promise<Diagnostics> {
  const [ans, lis, vocab, corr, userMsgs] = await Promise.all([
    supabase.from("exercise_answers").select("lesson_id, skill, correct").eq("user_id", userId).order("created_at", { ascending: false }).limit(2000),
    supabase.from("listening_results").select("level_code, score, total").eq("user_id", userId).limit(500),
    supabase.from("review_items").select("item_id, lapses").eq("user_id", userId).eq("item_type", "vocab").gt("lapses", 0).order("lapses", { ascending: false }).limit(12),
    supabase.from("messages").select("correction").eq("user_id", userId).eq("role", "user").not("correction", "is", null).order("id", { ascending: false }).limit(60),
    supabase.from("messages").select("id", { count: "exact", head: true }).eq("user_id", userId).eq("role", "user"),
  ]);

  const answers = ans.data ?? [];
  const bySkill = (skills: string[]) => {
    const rows = answers.filter((a) => skills.includes(a.skill));
    return { ok: rows.filter((r) => r.correct).length, total: rows.length };
  };

  // Listening: exercícios de escuta das aulas + biblioteca de listening.
  const lisEx = bySkill(["listening"]);
  const lisRows = lis.data ?? [];
  const lisOk = lisEx.ok + lisRows.reduce((s, r) => s + r.score, 0);
  const lisTotal = lisEx.total + lisRows.reduce((s, r) => s + r.total, 0);
  const vocabS = bySkill(["vocabulary"]);
  const grammarS = bySkill(["grammar", "reading"]);
  const writingS = bySkill(["writing"]);
  const corrections = corr.data ?? [];
  const chatTotal = userMsgs.count ?? 0;
  // Conversação: % de mensagens sem correção.
  const convScore = chatTotal >= MIN_SAMPLES ? Math.round(((chatTotal - Math.min(corrections.length, chatTotal)) / chatTotal) * 100) : null;

  const guard = (score: number | null, n: number) => (n >= MIN_SAMPLES ? score : null);
  const areas: Area[] = [
    { key: "listening", label: "Listening", score: guard(pct(lisOk, lisTotal), lisTotal), samples: lisTotal, href: "/listening", action: "Praticar listening", detail: "Entender o que ouve: exercícios de áudio e diálogos." },
    { key: "vocabulary", label: "Palavras", score: guard(pct(vocabS.ok, vocabS.total), vocabS.total), samples: vocabS.total, href: "/revisao", action: "Revisar palavras", detail: "Lembrar e reconhecer o vocabulário." },
    { key: "grammar", label: "Gramática", score: guard(pct(grammarS.ok, grammarS.total), grammarS.total), samples: grammarS.total, href: "/trilha", action: "Rever aulas", detail: "Estruturas: tempos verbais, preposições, ordem das palavras." },
    { key: "writing", label: "Escrita", score: guard(pct(writingS.ok, writingS.total), writingS.total), samples: writingS.total, href: "/mini-aulas", action: "Fazer mini-aulas", detail: "Montar frases certas em inglês (traduções)." },
    { key: "conversation", label: "Conversação", score: convScore, samples: chatTotal, href: "/conversar", action: "Conversar", detail: "Frases enviadas ao professor/personagens sem precisar de correção." },
    { key: "pronunciation", label: "Pronúncia", score: null, samples: 0, href: "/conversar", action: "Em breve", detail: "A avaliação de pronúncia por som chega com o treino de pronúncia." },
  ];
  const measured = areas.filter((a) => a.score !== null);
  const weakest = measured.length ? measured.reduce((min, a) => (a.score! < min.score! ? a : min)) : null;

  // Tópicos (aulas) com mais erros.
  const perLesson = new Map<string, { err: number; total: number }>();
  for (const a of answers) {
    const e = perLesson.get(a.lesson_id) ?? { err: 0, total: 0 };
    e.total++;
    if (!a.correct) e.err++;
    perLesson.set(a.lesson_id, e);
  }
  const hardTopics = Array.from(perLesson.entries())
    .filter(([, v]) => v.err > 0)
    .map(([lessonId, v]) => ({ lessonId, title: getLesson(lessonId)?.title ?? lessonId, errors: v.err, rate: Math.round((v.err / v.total) * 100) }))
    .sort((a, b) => b.rate - a.rate || b.errors - a.errors)
    .slice(0, 5);

  const hardWords = (vocab.data ?? [])
    .map((r) => {
      const v = getVocab(r.item_id);
      return v ? { en: v.en, pt: v.pt, lapses: r.lapses } : null;
    })
    .filter((x): x is { en: string; pt: string; lapses: number } => x !== null)
    .slice(0, 8);

  const recentCorrections = corrections.slice(0, 5).map((c) => {
    const x = c.correction as { original?: string; corrected?: string; explanation_pt?: string };
    return { original: x.original ?? "", corrected: x.corrected ?? "", explanation: x.explanation_pt ?? "" };
  });

  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const listeningByLevel = levels
    .map((lv) => {
      const rows = lisRows.filter((r) => r.level_code === lv);
      const ok = rows.reduce((s, r) => s + r.score, 0);
      const total = rows.reduce((s, r) => s + r.total, 0);
      return { level: lv, pct: total ? Math.round((ok / total) * 100) : 0, attempts: rows.length };
    })
    .filter((r) => r.attempts > 0);

  return { areas, weakest, hardWords, hardTopics, recentCorrections, listeningByLevel };
}
