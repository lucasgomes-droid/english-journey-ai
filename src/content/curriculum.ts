import { a1Module1 } from "./a1/module1";
import { a1Module2 } from "./a1/module2";
import { a1Module3 } from "./a1/module3";
import { a1Final } from "./a1/final";
import type { CefrLevel, Lesson, Level, Module, VocabItem } from "./types";

export const LEVELS: Level[] = [
  { code: "A1", name: "Iniciante", description: "Frases simples do dia a dia, apresentações e informações pessoais.", modules: [a1Module1, a1Module2, a1Module3, a1Final] },
  { code: "A2", name: "Básico", description: "Passado, planos, compras, direções e situações rotineiras.", modules: [] },
  { code: "B1", name: "Intermediário", description: "Viagens, experiências, opiniões e conversas mais longas.", modules: [] },
  { code: "B2", name: "Intermediário avançado", description: "Discussões, argumentação e inglês profissional.", modules: [] },
  { code: "C1", name: "Avançado", description: "Linguagem flexível e precisa em contextos acadêmicos e profissionais.", modules: [] },
  { code: "C2", name: "Proficiência", description: "Domínio próximo ao de um nativo culto.", modules: [] },
];

export const LEVEL_ORDER: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export function nextLevel(level: CefrLevel): CefrLevel | null {
  const i = LEVEL_ORDER.indexOf(level);
  return i >= 0 && i < LEVEL_ORDER.length - 1 ? LEVEL_ORDER[i + 1] : null;
}

export const ALL_MODULES: Module[] = LEVELS.flatMap((l) => l.modules);

/** Todas as aulas em ordem pedagógica. */
export const ALL_LESSONS: Lesson[] = ALL_MODULES.flatMap((m) => m.lessons);

const lessonMap = new Map(ALL_LESSONS.map((l) => [l.id, l]));
const moduleMap = new Map(ALL_MODULES.map((m) => [m.id, m]));
const vocabMap = new Map<string, VocabItem & { lessonId: string }>(
  ALL_LESSONS.flatMap((l) => l.vocabulary.map((v) => [v.id, { ...v, lessonId: l.id }] as const)),
);
const exerciseMap = new Map(ALL_LESSONS.flatMap((l) => l.exercises.map((e) => [e.id, { exercise: e, lessonId: l.id }] as const)));

export const getLesson = (id: string) => lessonMap.get(id);
export const getModule = (id: string) => moduleMap.get(id);
export const getVocab = (id: string) => vocabMap.get(id);
export const getExercise = (id: string) => exerciseMap.get(id);
export const getLevel = (code: string) => LEVELS.find((l) => l.code === code);

/**
 * Regra de desbloqueio: uma aula só abre quando a anterior (na ordem global
 * da trilha) foi concluída. Assim o aluno não vê conteúdo avançado antes
 * de dominar os fundamentos.
 */
export function isLessonUnlocked(lessonId: string, completed: Set<string>): boolean {
  const idx = ALL_LESSONS.findIndex((l) => l.id === lessonId);
  if (idx <= 0) return idx === 0;
  return completed.has(ALL_LESSONS[idx - 1].id);
}

export function nextLessonFor(completed: Set<string>): Lesson | null {
  return ALL_LESSONS.find((l) => !completed.has(l.id)) ?? null;
}

export function lessonsOfLevel(level: CefrLevel): Lesson[] {
  return getLevel(level)?.modules.flatMap((m) => m.lessons) ?? [];
}
