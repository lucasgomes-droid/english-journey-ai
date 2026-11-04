/**
 * Regras puras da prova de nível e do plano de recuperação (sem banco, testáveis).
 */
import { EXAM_PARTS, EXAM_PASS, type ExamPart } from "@/content/level-exams";

export interface ExamAttempt {
  part: ExamPart;
  score: number;
  passed: boolean;
  created_at: string;
}

export type TaskKind = "lesson" | "review" | "listening" | "speaking" | "pronunciation" | "conversation";

export interface PlanTask {
  id: string;
  kind: TaskKind;
  /** Para "lesson": id da aula. */
  ref?: string;
  /** Quantidade a cumprir (para "lesson": nota mínima). */
  target: number;
  label: string;
  href: string;
}

export interface RecoveryPlan {
  id: number;
  level_code: string;
  part: ExamPart;
  tasks: PlanTask[];
  created_at: string;
  completed_at: string | null;
}

export interface PartState {
  part: ExamPart;
  attempts: number;
  best: number | null;
  last: number | null;
  passed: boolean;
  /** "prereq": falta aprovar a parte anterior; "plan": falta cumprir o plano de recuperação. */
  lock: null | "prereq" | "plan";
  plan: RecoveryPlan | null;
}

export interface ExamState {
  parts: Record<ExamPart, PartState>;
  passed: boolean;
}

/** Estado da prova de um nível a partir das tentativas e dos planos daquele nível. */
export function examState(attempts: ExamAttempt[], plans: RecoveryPlan[]): ExamState {
  const parts = {} as Record<ExamPart, PartState>;
  let prevPassed = true;
  for (const part of EXAM_PARTS) {
    const mine = attempts.filter((a) => a.part === part).sort((a, b) => a.created_at.localeCompare(b.created_at));
    const passed = mine.some((a) => a.passed);
    const openPlan = plans.filter((p) => p.part === part && !p.completed_at).sort((a, b) => b.created_at.localeCompare(a.created_at))[0] ?? null;
    const lastPlan = openPlan ?? plans.filter((p) => p.part === part).sort((a, b) => b.created_at.localeCompare(a.created_at))[0] ?? null;
    parts[part] = {
      part,
      attempts: mine.length,
      best: mine.length ? Math.max(...mine.map((a) => a.score)) : null,
      last: mine.length ? mine[mine.length - 1].score : null,
      passed,
      lock: passed ? null : !prevPassed ? "prereq" : openPlan ? "plan" : null,
      plan: passed ? null : lastPlan,
    };
    prevPassed = prevPassed && passed;
  }
  return { parts, passed: EXAM_PARTS.every((p) => parts[p].passed) };
}

export const partPassed = (part: ExamPart, score: number) => score >= EXAM_PASS[part];

/** Rubrica de 0 a 5 por critério → nota 0–100. */
export function rubricScore(r: Record<string, number>): number {
  const vals = Object.values(r).filter((v) => Number.isFinite(v));
  if (!vals.length) return 0;
  const avg = vals.reduce((s, v) => s + Math.min(5, Math.max(0, v)), 0) / vals.length;
  return Math.round(avg * 20);
}

/**
 * Nota de uma resposta falada: a rubrica da IA, limitada quando a resposta é curta demais
 * para o nível (falar pouco não comprova domínio).
 */
export function speakingAnswerScore(rubric: Record<string, number>, words: number, minWords: number): number {
  const base = rubricScore(rubric);
  const ratio = Math.min(1, words / Math.max(1, minWords));
  return Math.round(base * (0.4 + 0.6 * ratio));
}

export interface WrittenContext {
  /** Habilidades com mais erros no teste (ordem: pior primeiro). */
  weakSkills: string[];
  /** Aulas do nível com menor nota (ordem: pior primeiro). */
  weakLessons: { id: string; title: string }[];
}

/** Monta o plano de recuperação de uma parte reprovada. */
export function buildRecoveryTasks(part: ExamPart, ctx: WrittenContext = { weakSkills: [], weakLessons: [] }): PlanTask[] {
  if (part === "written") {
    const tasks: PlanTask[] = ctx.weakLessons.slice(0, 3).map((l) => ({
      id: `lesson:${l.id}`,
      kind: "lesson",
      ref: l.id,
      target: 70,
      label: `Refazer a aula "${l.title}" com 70% ou mais`,
      href: `/aula/${l.id}`,
    }));
    tasks.push({ id: "review", kind: "review", target: 15, label: "Fazer 15 revisões", href: "/revisao" });
    if (ctx.weakSkills.slice(0, 2).includes("listening"))
      tasks.push({ id: "listening", kind: "listening", target: 2, label: "Ouvir e responder 2 listenings", href: "/listening" });
    return tasks;
  }
  if (part === "speaking")
    return [
      { id: "speaking", kind: "speaking", target: 2, label: "Fazer 2 desafios de fala de 1 minuto", href: "/falar/desafio" },
      { id: "pronunciation", kind: "pronunciation", target: 8, label: "Fazer 8 tentativas de pronúncia ou shadowing", href: "/pronuncia" },
      { id: "review", kind: "review", target: 10, label: "Fazer 10 revisões", href: "/revisao" },
    ];
  return [
    { id: "conversation", kind: "conversation", target: 12, label: "Enviar 12 falas em conversas (personagens ou professor)", href: "/conversar" },
    { id: "speaking", kind: "speaking", target: 1, label: "Fazer 1 desafio de fala de 1 minuto", href: "/falar/desafio" },
    { id: "review", kind: "review", target: 10, label: "Fazer 10 revisões", href: "/revisao" },
  ];
}

/** Quanto falta em cada tarefa, dado o que o aluno fez desde a criação do plano. */
export function taskProgress(task: PlanTask, done: number): { done: number; target: number; complete: boolean } {
  if (task.kind === "lesson") return { done: done ? 1 : 0, target: 1, complete: done > 0 };
  return { done: Math.min(done, task.target), target: task.target, complete: done >= task.target };
}

/** Habilidades com mais erros, da pior para a melhor (só as que tiveram erro). */
export function weakSkillsFrom(results: { skill: string; correct: boolean }[]): string[] {
  const by = new Map<string, { wrong: number; total: number }>();
  for (const r of results) {
    const s = by.get(r.skill) ?? { wrong: 0, total: 0 };
    s.total++;
    if (!r.correct) s.wrong++;
    by.set(r.skill, s);
  }
  return [...by.entries()]
    .filter(([, s]) => s.wrong > 0)
    .sort((a, b) => b[1].wrong / b[1].total - a[1].wrong / a[1].total || b[1].wrong - a[1].wrong)
    .map(([k]) => k);
}
