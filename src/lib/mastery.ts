/**
 * Domínio e retenção por objetivo de aula (regras puras, testáveis).
 *
 * Cada aula da trilha tem um objetivo ("Ao final você consegue…"). Ele é a unidade de domínio.
 * As evidências são as respostas reais a exercícios daquela aula (na aula, na revisão, no treino adaptativo).
 *
 * - Dominado: ≥ 80% de acerto nas últimas 10 respostas, com pelo menos 5 respostas, em 2 dias diferentes
 *   e pelo menos um acerto de PRODUÇÃO (escrever, completar, montar, ditado) — nunca com uma resposta só.
 * - Retido: dominado e ainda certo (≥ 80%, pelo menos 2 respostas) 7 dias ou mais depois de começar.
 * - Precisa reforço: errando muito (< 60%) nas respostas recentes ou nas de retenção.
 */
import type { Exercise } from "@/content/types";

export const MASTERY = { minAttempts: 5, minDays: 2, recent: 10, threshold: 0.8, weak: 0.6, retentionDays: 7, retentionMin: 2 } as const;
const DAY = 86_400_000;

export type MasteryStatus = "learning" | "mastered" | "retained" | "reinforce";

export interface Evidence {
  lessonId: string;
  correct: boolean;
  at: string; // ISO
  production: boolean;
}

export interface ObjectiveState {
  lessonId: string;
  attempts: number;
  correct: number;
  recentAccuracy: number; // 0–100
  days: number;
  productionCorrect: boolean;
  retention: { n: number; correct: number };
  status: MasteryStatus;
  firstAt: string;
  lastAt: string;
}

/** Produção = o aluno precisa formar a resposta; reconhecimento = escolher entre opções. */
export function isProduction(ex: Pick<Exercise, "type"> & { options?: unknown }): boolean {
  if (ex.type === "fill_blank" || ex.type === "translate" || ex.type === "word_order") return true;
  if (ex.type === "listening") return !ex.options; // ditado
  return false;
}

export function objectiveState(lessonId: string, evs: Evidence[]): ObjectiveState {
  const sorted = [...evs].sort((a, b) => a.at.localeCompare(b.at));
  const first = Date.parse(sorted[0].at);
  const recent = sorted.slice(-MASTERY.recent);
  const recentAccuracy = Math.round((recent.filter((e) => e.correct).length / recent.length) * 100);
  const days = new Set(sorted.map((e) => e.at.slice(0, 10))).size;
  const productionCorrect = sorted.some((e) => e.production && e.correct);
  const later = sorted.filter((e) => Date.parse(e.at) - first >= MASTERY.retentionDays * DAY);
  const retention = { n: later.length, correct: later.filter((e) => e.correct).length };
  const retentionAcc = retention.n ? retention.correct / retention.n : null;

  const mastered = sorted.length >= MASTERY.minAttempts && recentAccuracy >= MASTERY.threshold * 100 && days >= MASTERY.minDays && productionCorrect;
  let status: MasteryStatus = "learning";
  if ((sorted.length >= 3 && recentAccuracy < MASTERY.weak * 100) || (retention.n >= MASTERY.retentionMin && retentionAcc! < MASTERY.weak)) status = "reinforce";
  else if (mastered && retention.n >= MASTERY.retentionMin && retentionAcc! >= MASTERY.threshold) status = "retained";
  else if (mastered) status = "mastered";

  return {
    lessonId,
    attempts: sorted.length,
    correct: sorted.filter((e) => e.correct).length,
    recentAccuracy,
    days,
    productionCorrect,
    retention,
    status,
    firstAt: sorted[0].at,
    lastAt: sorted[sorted.length - 1].at,
  };
}

export function objectiveStates(evs: Evidence[]): Map<string, ObjectiveState> {
  const by = new Map<string, Evidence[]>();
  for (const e of evs) by.set(e.lessonId, [...(by.get(e.lessonId) ?? []), e]);
  return new Map([...by].map(([id, list]) => [id, objectiveState(id, list)]));
}

/** Confiabilidade de um indicador pelo tamanho da amostra. */
export type Confidence = "sem dados" | "baixa" | "média" | "alta";
export function confidence(n: number): Confidence {
  if (n === 0) return "sem dados";
  if (n < 10) return "baixa";
  if (n < 30) return "média";
  return "alta";
}

/** Taxa de acerto (0–100) ou null sem amostra. */
export const rate = (correct: number, n: number) => (n ? Math.round((correct / n) * 100) : null);

/** As 6 competências medidas separadamente (spec: domínio ≠ conclusão). */
export const SIX_SKILLS = ["listening", "speaking", "grammar", "vocabulary", "reading", "writing"] as const;
export type SixSkill = (typeof SIX_SKILLS)[number];
export const SIX_SKILL_PT: Record<SixSkill, string> = { listening: "Listening", speaking: "Fala", grammar: "Gramática", vocabulary: "Vocabulário", reading: "Leitura", writing: "Escrita" };
export type SkillLevel = "sem dados" | "começando" | "reforçar" | "em progresso" | "firme";

/** Situação de uma competência a partir de acertos/tentativas (amostra mínima antes de julgar). */
export function skillLevel(correct: number, n: number): SkillLevel {
  if (n === 0) return "sem dados";
  if (n < 8) return "começando";
  const r = correct / n;
  if (r < 0.7) return "reforçar";
  if (r >= 0.85 && n >= 20) return "firme";
  return "em progresso";
}
