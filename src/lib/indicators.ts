import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { ALL_LESSONS, getExercise, getModule } from "@/content/curriculum";
import type { CefrLevel } from "@/content/types";
import { confidence, isProduction, MASTERY, objectiveStates, rate, SIX_SKILLS, SIX_SKILL_PT, skillLevel, type Evidence, type ObjectiveState, type SixSkill } from "@/lib/mastery";

const DAY = 86_400_000;
const SKILL_PT: Record<string, string> = { grammar: "Gramática", vocabulary: "Vocabulário", listening: "Listening", reading: "Leitura", writing: "Escrita", speaking: "Fala" };

/**
 * Os 4 indicadores do Meu progresso, separados de propósito:
 * Atividade (o que fez) · Desempenho (como respondeu) · Domínio (o que consegue usar) · Retenção (o que lembra depois).
 * Tudo calculado das respostas reais já salvas; cada número vem com o tamanho da amostra.
 */
export async function loadIndicators(supabase: SupabaseClient, uid: string, level: CefrLevel) {
  const now = Date.now();
  const since28 = new Date(now - 28 * DAY).toISOString();
  const since60 = new Date(now - 60 * DAY).toISOString();
  const [ansRes, actRes, vocabRes, prodRes, lisRes, proRes] = await Promise.all([
    supabase.from("exercise_answers").select("lesson_id, exercise_id, skill, correct, created_at").eq("user_id", uid).order("created_at", { ascending: false }).limit(5000),
    supabase.from("activity_log").select("kind, duration_seconds, local_date, created_at").eq("user_id", uid).gte("created_at", since28).limit(2000),
    supabase.from("review_items").select("repetitions, lapses, interval_days").eq("user_id", uid).eq("item_type", "vocab").not("last_reviewed_at", "is", null).limit(5000),
    supabase.from("production_attempts").select("lesson_id, mode, score, feedback, created_at").eq("user_id", uid).order("created_at", { ascending: false }).limit(1000),
    supabase.from("listening_results").select("score, total").eq("user_id", uid).gte("created_at", since60).limit(1000),
    supabase.from("pronunciation_attempts").select("overall").eq("user_id", uid).gte("created_at", since60).limit(2000),
  ]);
  const answers = (ansRes.data ?? []) as { lesson_id: string; exercise_id: string; skill: string; correct: boolean; created_at: string }[];
  const acts = (actRes.data ?? []) as { kind: string; duration_seconds: number | null; local_date: string; created_at: string }[];

  // ---- Atividade
  const activity = (days: number) => {
    const from = now - days * DAY;
    const xs = acts.filter((a) => Date.parse(a.created_at) >= from);
    return {
      minutes: Math.round(xs.reduce((s, a) => s + (a.duration_seconds ?? 0), 0) / 60),
      days: new Set(xs.map((a) => a.local_date)).size,
      lessons: xs.filter((a) => a.kind === "lesson" || a.kind === "test").length,
      sessions: xs.length,
    };
  };

  // ---- Desempenho (últimas 2 semanas × 2 semanas anteriores)
  const inRange = (a: { created_at: string }, fromDays: number, toDays: number) => {
    const t = Date.parse(a.created_at);
    return t >= now - fromDays * DAY && t < now - toDays * DAY;
  };
  const cur = answers.filter((a) => inRange(a, 14, 0));
  const prev = answers.filter((a) => inRange(a, 28, 14));
  const bySkill = new Map<string, { n: number; c: number }>();
  for (const a of answers.filter((x) => inRange(x, 28, 0))) {
    const s = bySkill.get(a.skill) ?? { n: 0, c: 0 };
    s.n++;
    if (a.correct) s.c++;
    bySkill.set(a.skill, s);
  }
  const performance = {
    current: { value: rate(cur.filter((a) => a.correct).length, cur.length), n: cur.length },
    previous: { value: rate(prev.filter((a) => a.correct).length, prev.length), n: prev.length },
    skills: [...bySkill]
      .map(([skill, s]) => ({ skill: SKILL_PT[skill] ?? skill, value: rate(s.c, s.n)!, n: s.n, confidence: confidence(s.n) }))
      .sort((a, b) => b.n - a.n),
  };

  // ---- Domínio e retenção por objetivo de aula
  const evidence: Evidence[] = [];
  for (const a of answers) {
    const ex = getExercise(a.exercise_id);
    if (!ex || ex.lessonId.startsWith("mini-")) continue;
    evidence.push({ lessonId: ex.lessonId, correct: a.correct, at: a.created_at, production: isProduction(ex.exercise) });
  }
  // Produção livre ("Use você mesmo"): evidência forte de que o aluno consegue usar o conteúdo.
  for (const p of (prodRes.data ?? []) as { lesson_id: string; score: number | null; feedback: { used_target?: boolean } | null; created_at: string }[])
    evidence.push({ lessonId: p.lesson_id, correct: (p.score ?? 0) >= 70 && p.feedback?.used_target === true, at: p.created_at, production: true });
  const states = objectiveStates(evidence);
  const levelOf = new Map(ALL_LESSONS.map((l) => [l.id, getModule(l.moduleId)?.level]));
  const lessonLevel = (id: string) => levelOf.get(id);
  const objectives = ALL_LESSONS.filter((l) => l.kind === "lesson");
  const levelObjectives = objectives.filter((l) => getModule(l.moduleId)?.level === level);
  const count = (list: typeof objectives, pred: (s: ObjectiveState) => boolean) => list.filter((l) => states.has(l.id) && pred(states.get(l.id)!)).length;
  const isMastered = (s: ObjectiveState) => s.status === "mastered" || s.status === "retained";
  const levelEvidence = evidence.filter((e) => lessonLevel(e.lessonId) === level).length;
  const titled = (s: ObjectiveState) => {
    const l = objectives.find((x) => x.id === s.lessonId)!;
    return { lessonId: s.lessonId, title: l.title, objective: l.objective, accuracy: s.recentAccuracy, attempts: s.attempts, days: s.days, status: s.status };
  };
  const studied = [...states.values()].filter((s) => objectives.some((l) => l.id === s.lessonId));
  const mastery = {
    level,
    total: levelObjectives.length,
    started: count(levelObjectives, () => true),
    mastered: count(levelObjectives, isMastered),
    reinforce: count(levelObjectives, (s) => s.status === "reinforce"),
    allMastered: studied.filter(isMastered).length,
    evidence: levelEvidence,
    confidence: confidence(levelEvidence),
    toReinforce: studied.filter((s) => s.status === "reinforce").sort((a, b) => a.recentAccuracy - b.recentAccuracy).slice(0, 5).map(titled),
    almost: studied
      .filter((s) => s.status === "learning" && s.recentAccuracy >= 80)
      .sort((a, b) => b.lastAt.localeCompare(a.lastAt))
      .slice(0, 5)
      .map((s) => ({ ...titled(s), missing: missingFor(s) })),
  };

  // Retenção: respostas dadas 7+ dias depois de começar o objetivo; palavras que passaram em revisões longas.
  const ret = studied.reduce((acc, s) => ({ n: acc.n + s.retention.n, c: acc.c + s.retention.correct }), { n: 0, c: 0 });
  const vocab = (vocabRes.data ?? []) as { repetitions: number; lapses: number; interval_days: number }[];
  const retention = {
    value: rate(ret.c, ret.n),
    n: ret.n,
    confidence: confidence(ret.n),
    retained: studied.filter((s) => s.status === "retained").length,
    wordsReviewed: vocab.length,
    wordsRetained: vocab.filter((v) => v.repetitions >= 3).length,
    wordsForgotten: vocab.filter((v) => v.lapses > 0 && v.repetitions === 0).length,
  };

  // ---- Domínio por competência (últimos 60 dias): cada fonte real conta para a sua competência.
  const sk = Object.fromEntries(SIX_SKILLS.map((k) => [k, { n: 0, c: 0 }])) as Record<SixSkill, { n: number; c: number }>;
  const add = (k: string, ok: boolean, w = 1) => {
    const t = sk[k as SixSkill];
    if (!t) return;
    t.n += w;
    if (ok) t.c += w;
  };
  const from60 = now - 60 * DAY;
  for (const a of answers) if (Date.parse(a.created_at) >= from60) add(a.skill, a.correct);
  for (const l of (lisRes.data ?? []) as { score: number; total: number }[]) {
    sk.listening.n += l.total;
    sk.listening.c += l.score;
  }
  for (const p of (proRes.data ?? []) as { overall: number | null }[]) if (p.overall !== null) add("speaking", Number(p.overall) >= 70);
  for (const p of (prodRes.data ?? []) as { mode: string; score: number | null; created_at: string }[])
    if (Date.parse(p.created_at) >= from60) add(p.mode === "speak" ? "speaking" : "writing", (p.score ?? 0) >= 70, 2);
  for (const v of vocab) add("vocabulary", v.lapses === 0 || v.repetitions >= 2);
  const skills6 = SIX_SKILLS.map((k) => ({ key: k, name: SIX_SKILL_PT[k], value: rate(sk[k].c, sk[k].n), n: sk[k].n, level: skillLevel(sk[k].c, sk[k].n), confidence: confidence(sk[k].n) }));

  return { activity: { week: activity(7), month: activity(28) }, performance, mastery, retention, skills6 };
}

/** O que falta para um objetivo contar como dominado (em português, para o aluno). */
export function missingFor(s: ObjectiveState): string {
  const parts: string[] = [];
  const more = MASTERY.minAttempts - s.attempts;
  if (more > 0) parts.push(`mais ${more} ${more === 1 ? "resposta" : "respostas"}`);
  if (s.days < MASTERY.minDays) parts.push("praticar em outro dia");
  if (!s.productionCorrect) parts.push("acertar um exercício de escrever ou montar a frase");
  return parts.join(" · ") || "manter o acerto";
}

export type Indicators = Awaited<ReturnType<typeof loadIndicators>>;
