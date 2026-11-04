/**
 * Aprendizagem adaptativa (Fase 6), funções puras:
 * - mais exercícios do que o aluno erra, menos do que ele já domina;
 * - revisão priorizando os temas fracos;
 * - comparação semanal para o relatório de evolução.
 */
import type { ErrorCategory } from "@/content/error-patterns";
import type { Pattern } from "@/lib/difficulty-rules";

/** Peso de cada tema: erros recentes e taxa de erro aumentam; domínio comprovado diminui. */
export function categoryWeights(patterns: Pattern[], all: ErrorCategory[], mastered: Set<ErrorCategory>): Map<ErrorCategory, number> {
  const w = new Map<ErrorCategory, number>();
  for (const c of all) w.set(c, mastered.has(c) ? 0.3 : 1);
  for (const p of patterns) w.set(p.category, (mastered.has(p.category) ? 0.3 : 1) + p.recent * 2 + (p.rate ?? 0) / 20);
  return w;
}

/** Temas dominados: muitas respostas e quase nenhum erro. */
export function masteredCategories(stats: { category: ErrorCategory; total: number; wrong: number }[]): Set<ErrorCategory> {
  return new Set(stats.filter((s) => s.total >= 10 && s.wrong / s.total < 0.15).map((s) => s.category));
}

/** Gerador pseudoaleatório determinístico (mesma sessão ao recarregar a página). */
export function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Sorteia n itens com probabilidade proporcional ao peso do tema, sem repetir. */
export function adaptiveMix<T extends { id: string; category: ErrorCategory }>(pool: T[], weights: Map<ErrorCategory, number>, n: number, seed: string): T[] {
  const rnd = seeded(seed);
  const left = [...pool];
  const out: T[] = [];
  while (out.length < n && left.length) {
    const total = left.reduce((s, x) => s + (weights.get(x.category) ?? 1), 0);
    let r = rnd() * total;
    let i = 0;
    for (; i < left.length - 1; i++) {
      r -= weights.get(left[i].category) ?? 1;
      if (r <= 0) break;
    }
    out.push(left.splice(i, 1)[0]);
  }
  return out;
}

/** Ordena a revisão: temas fracos e itens com mais esquecimentos primeiro. */
export function prioritizeReview<T extends { category: ErrorCategory | null; lapses: number; due_at: string }>(items: T[], weak: Set<ErrorCategory>): T[] {
  const score = (x: T) => (x.category && weak.has(x.category) ? 3 : 0) + Math.min(3, x.lapses);
  return [...items].sort((a, b) => score(b) - score(a) || a.due_at.localeCompare(b.due_at));
}

export interface WeekStats {
  minutes: number;
  xp: number;
  lessons: number;
  answers: number;
  accuracy: number | null;
  messages: number;
  cleanMessages: number | null;
  reportAvg: number | null;
  pairAccuracy: number | null;
  listeningAccuracy: number | null;
  reviews: number;
  errorsByCategory: Partial<Record<ErrorCategory, number>>;
}

export interface Highlight {
  tone: "good" | "bad" | "info";
  text: string;
}

const delta = (a: number | null, b: number | null) => (a === null || b === null ? null : a - b);

/** Destaques do relatório: o que melhorou, o que piorou e o que fazer, só com dados reais. */
export function weeklyHighlights(cur: WeekStats, prev: WeekStats, label: (c: ErrorCategory) => string): Highlight[] {
  const h: Highlight[] = [];
  if (cur.minutes === 0 && cur.answers === 0 && cur.messages === 0) return [{ tone: "info", text: "Nenhuma atividade nesta semana. Comece com 10 minutos: uma aula e uma revisão." }];
  const dm = cur.minutes - prev.minutes;
  if (prev.minutes > 0 && Math.abs(dm) >= 10) h.push({ tone: dm > 0 ? "good" : "bad", text: dm > 0 ? `Você estudou ${dm} min a mais que na semana passada.` : `Você estudou ${-dm} min a menos que na semana passada.` });
  const da = delta(cur.accuracy, prev.accuracy);
  if (da !== null && Math.abs(da) >= 5) h.push({ tone: da > 0 ? "good" : "bad", text: `Acerto nos exercícios: ${prev.accuracy}% → ${cur.accuracy}%.` });
  const dc = delta(cur.cleanMessages, prev.cleanMessages);
  if (dc !== null && Math.abs(dc) >= 5) h.push({ tone: dc > 0 ? "good" : "bad", text: `Falas sem correção nas conversas: ${prev.cleanMessages}% → ${cur.cleanMessages}%.` });
  const dp = delta(cur.pairAccuracy, prev.pairAccuracy);
  if (dp !== null && Math.abs(dp) >= 5) h.push({ tone: dp > 0 ? "good" : "bad", text: `Pronúncia (pares mínimos): ${prev.pairAccuracy}% → ${cur.pairAccuracy}%.` });
  const dl = delta(cur.listeningAccuracy, prev.listeningAccuracy);
  if (dl !== null && Math.abs(dl) >= 5) h.push({ tone: dl > 0 ? "good" : "bad", text: `Listening: ${prev.listeningAccuracy}% → ${cur.listeningAccuracy}%.` });
  const cats = new Set([...Object.keys(cur.errorsByCategory), ...Object.keys(prev.errorsByCategory)] as ErrorCategory[]);
  for (const c of cats) {
    const a = cur.errorsByCategory[c] ?? 0;
    const b = prev.errorsByCategory[c] ?? 0;
    if (b >= 3 && a <= b / 2) h.push({ tone: "good", text: `Menos erros de ${label(c).toLowerCase()}: ${b} → ${a}.` });
    else if (a >= 3 && a >= b * 2 && a - b >= 3) h.push({ tone: "bad", text: `Mais erros de ${label(c).toLowerCase()}: ${b} → ${a}. Vale fazer o plano de recuperação.` });
  }
  if (cur.messages < 5) h.push({ tone: "info", text: "Converse mais: pelo menos 3 conversas por semana fazem diferença na fluência." });
  return h.slice(0, 6);
}
