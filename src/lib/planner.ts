/**
 * Cronograma de estudo (regras puras e testáveis, sem IA).
 *
 * Distribui o tempo do dia entre: revisão (o que vence hoje), aula nova, reforço do que está fraco
 * e treinos de competência (listening, fala, conversa, escrita, vocabulário). O peso de cada
 * competência sobe com o foco escolhido pelo aluno e com a fraqueza medida nos dados reais.
 * Nunca passa do tempo informado e respeita os dias de estudo escolhidos.
 */
import { LISTENING } from "@/content/listening";
import { PAIR_SETS } from "@/content/minimal-pairs";
import { SCENARIOS } from "@/content/scenarios";
import { topicsFor } from "@/content/speaking-topics";
import type { CefrLevel } from "@/content/types";

export type BlockKind = "review" | "lesson" | "test" | "reinforce" | "listening" | "speaking" | "conversation" | "writing" | "vocabulary" | "weekly";
export type TrainSkill = "listening" | "speaking" | "conversation" | "writing" | "vocabulary";

export interface Block {
  kind: BlockKind;
  title: string;
  detail: string;
  minutes: number;
  href: string;
}

export interface PlanInput {
  level: CefrLevel;
  minutes: number;
  /** 0 = domingo … 6 = sábado */
  studyDays: number[];
  /** Competências que o aluno quer priorizar (nomes do perfil). */
  focus: string[];
  /** Competências fracas medidas (accuracy < 70% com amostra). */
  weak: string[];
  dueReviews: number;
  reviewLimit: number;
  nextLesson: { id: string; title: string; kind: "lesson" | "test" } | null;
  examDue: boolean;
  reinforce: { lessonId: string; title: string }[];
  weeklyDue: boolean;
}

/** Atividades registradas que marcam um bloco como feito. */
export const DONE_BY: Record<BlockKind, string[]> = {
  review: ["review"],
  lesson: ["lesson"],
  test: ["test"],
  reinforce: ["lesson", "review"],
  listening: ["listening"],
  speaking: ["speaking", "pronunciation"],
  conversation: ["chat", "scenario"],
  writing: ["chat"],
  vocabulary: ["review", "mini"],
  weekly: ["speaking"],
};

const SKILL_OF_PROFILE: Record<string, TrainSkill[]> = {
  listening: ["listening"],
  speaking: ["speaking", "conversation"],
  writing: ["writing"],
  vocabulary: ["vocabulary"],
  grammar: ["vocabulary", "writing"],
  reading: ["writing"],
};

/** Peso de cada treino: base 1, +2 se é foco do aluno, +1,5 se está fraco. */
export function skillWeights(focus: string[], weak: string[]): Record<TrainSkill, number> {
  const w: Record<TrainSkill, number> = { listening: 1, speaking: 1, conversation: 1, writing: 0.8, vocabulary: 0.8 };
  for (const f of focus) for (const s of SKILL_OF_PROFILE[f] ?? []) w[s] += 2;
  for (const f of weak) for (const s of SKILL_OF_PROFILE[f] ?? []) w[s] += 1.5;
  return w;
}

function trainingBlock(skill: TrainSkill, level: CefrLevel, day: number, minutes: number): Block {
  const listening = LISTENING.filter((l) => l.level === level);
  const item = listening[day % Math.max(1, listening.length)] ?? LISTENING[0];
  const topics = topicsFor(level);
  const scene = SCENARIOS[day % SCENARIOS.length];
  switch (skill) {
    case "listening":
      return { kind: "listening", title: "Listening", detail: item.title, minutes, href: `/listening/${item.id}` };
    case "speaking": {
      const opts = [
        { detail: `Pares mínimos: ${PAIR_SETS[day % PAIR_SETS.length].title}`, href: `/pronuncia/pares/${PAIR_SETS[day % PAIR_SETS.length].id}` },
        topics.length ? { detail: `Fale 1 minuto: ${topics[day % topics.length].pt}`, href: `/falar/desafio/${topics[day % topics.length].id}` } : null,
        { detail: `Shadowing: ${item.title}`, href: `/pronuncia/shadowing/${item.id}` },
      ].filter(Boolean) as { detail: string; href: string }[];
      const o = opts[day % opts.length];
      return { kind: "speaking", title: "Fala e pronúncia", detail: o.detail, minutes, href: o.href };
    }
    case "conversation":
      return day % 2
        ? { kind: "conversation", title: "Conversa do dia", detail: `Situação: ${scene.title}`, minutes, href: `/professor?cenario=${scene.id}` }
        : { kind: "conversation", title: "Conversa do dia", detail: "Ligação com o professor Alex", minutes, href: "/conversa?modo=professor" };
    case "writing":
      return { kind: "writing", title: "Escrita", detail: "Escreva com o Alex (teclado) — ele corrige cada frase", minutes, href: "/conversa?modo=professor" };
    case "vocabulary":
      return { kind: "vocabulary", title: "Treino adaptativo", detail: "Exercícios escolhidos pelos seus erros", minutes, href: "/praticar/adaptativo" };
  }
}

/**
 * Plano de um dia. `day` é um número que muda a cada dia (varia os treinos);
 * `forecast` = dia futuro (revisões estimadas, sem reforço específico).
 */
export function planDay(input: PlanInput, day: number, forecast = false): Block[] {
  const total = Math.max(5, input.minutes);
  let left = total;
  const blocks: Block[] = [];
  const take = (b: Block) => {
    const m = Math.min(b.minutes, left);
    if (m < 3) return;
    blocks.push({ ...b, minutes: m });
    left -= m;
  };

  // 1) Revisão: o que vence hoje (até ~30% do tempo; ~3 itens por minuto; limite diário do aluno).
  const reviews = forecast ? Math.min(input.reviewLimit, 9) : Math.min(input.dueReviews, input.reviewLimit);
  if (reviews > 0) take({ kind: "review", title: "Revisão", detail: forecast ? "Itens que vencerem no dia" : `${reviews} ${reviews === 1 ? "item" : "itens"}`, minutes: Math.max(3, Math.min(Math.ceil(reviews / 3), Math.round(total * 0.3))), href: "/revisao" });

  // 2) Aula nova (ou prova de nível quando as aulas acabaram).
  if (input.nextLesson) take({ kind: input.nextLesson.kind === "test" ? "test" : "lesson", title: input.nextLesson.kind === "test" ? "Avaliação da unidade" : "Aula nova", detail: input.nextLesson.title, minutes: total >= 20 ? 10 : 8, href: `/aula/${input.nextLesson.id}` });
  else if (input.examDue) take({ kind: "test", title: "Prova de nível", detail: `Comprovar o ${input.level}`, minutes: 15, href: `/prova/${input.level}` });

  // 3) Reforço do objetivo mais fraco (só hoje: depende dos dados atuais).
  if (!forecast && input.reinforce.length && left >= 8) {
    const r = input.reinforce[day % input.reinforce.length];
    take({ kind: "reinforce", title: "Reforço", detail: r.title, minutes: 5, href: `/aula/${r.lessonId}` });
  }

  // 4) Treinos de competência pelo peso (foco + fraqueza), variando a cada dia.
  //    A gravação da semana (3 min) entra depois do treino principal, se sobrar tempo.
  const w = skillWeights(input.focus, input.weak);
  const order = (Object.keys(w) as TrainSkill[]).sort((a, b) => w[b] - w[a] || ((day + a.length) % 5) - ((day + b.length) % 5));
  // Garante variedade: o 1º lugar é sempre o de maior peso; os seguintes giram entre os demais.
  const rest = order.slice(1);
  const rotated = [order[0], ...rest.slice(day % rest.length), ...rest.slice(0, day % rest.length)];
  rotated.forEach((s, i) => {
    if (i === 1 && !forecast && input.weeklyDue && left >= 3) take({ kind: "weekly", title: "Gravação da semana", detail: "2 minutos para medir a evolução", minutes: 3, href: "/falar/semanal" });
    if (left < 3) return;
    const m = left >= 16 ? (w[s] >= 2.5 ? 8 : 6) : left;
    take(trainingBlock(s, input.level, day, m));
  });
  return blocks;
}

export interface PlanDay {
  date: string; // YYYY-MM-DD
  weekday: number;
  rest: boolean;
  blocks: Block[];
  minutes: number;
}

/** Semana a partir de hoje (7 dias), respeitando os dias de estudo. */
export function planWeek(input: PlanInput, todayIso: string): PlanDay[] {
  const base = Date.parse(`${todayIso}T12:00:00Z`);
  return Array.from({ length: 7 }, (_, i) => {
    const t = base + i * 86_400_000;
    const date = new Date(t).toISOString().slice(0, 10);
    const weekday = new Date(t).getUTCDay();
    const dayNum = Math.floor(t / 86_400_000);
    const rest = !input.studyDays.includes(weekday);
    const blocks = rest ? [] : planDay(i === 0 ? input : { ...input, nextLesson: input.nextLesson && { ...input.nextLesson, title: "Próxima aula da trilha" } }, dayNum, i > 0);
    return { date, weekday, rest, blocks, minutes: blocks.reduce((s, b) => s + b.minutes, 0) };
  });
}

/**
 * Ritmo × prazo: com o ritmo atual (aulas por semana), quando chega ao nível-alvo?
 * E quantas aulas por semana seriam necessárias para cumprir a data escolhida?
 */
export function paceEstimate(input: { lessonsRemaining: number; lessonsPerWeek: number; targetDate: string | null; todayIso: string }) {
  const weeksAtPace = input.lessonsPerWeek > 0 ? Math.ceil(input.lessonsRemaining / input.lessonsPerWeek) : null;
  const weeksLeft = input.targetDate ? Math.max(0, Math.ceil((Date.parse(`${input.targetDate}T12:00:00Z`) - Date.parse(`${input.todayIso}T12:00:00Z`)) / (7 * 86_400_000))) : null;
  const neededPerWeek = weeksLeft ? Math.ceil(input.lessonsRemaining / weeksLeft) : null;
  const onTrack = weeksAtPace !== null && weeksLeft !== null ? weeksAtPace <= weeksLeft : null;
  return { weeksAtPace, weeksLeft, neededPerWeek, onTrack };
}
