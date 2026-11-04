import { a1Module1 } from "./a1/module1";
import { a1Module2 } from "./a1/module2";
import { a1Module3 } from "./a1/module3";
import { a1Module4 } from "./a1/module4";
import { a1Module5 } from "./a1/module5";
import { a1Module6 } from "./a1/module6";
import { a1Module7 } from "./a1/module7";
import { a1Module8 } from "./a1/module8";
import { a1Final } from "./a1/final";
import { A2_MODULES } from "./a2";
import { B1_MODULES } from "./b1";
import { B2_MODULES } from "./b2";
import { MINI_LESSONS, MINI_MODULES } from "./mini";
import type { CefrLevel, Lesson, Level, Module, VocabItem } from "./types";

export const LEVELS: Level[] = [
  { code: "A1", name: "Iniciante", description: "Frases simples do dia a dia, apresentações e informações pessoais.", modules: [a1Module1, a1Module2, a1Module3, a1Module4, a1Module5, a1Module6, a1Module7, a1Module8, a1Final] },
  { code: "A2", name: "Básico", description: "Passado, planos, compras, direções e situações rotineiras.", modules: A2_MODULES },
  { code: "B1", name: "Intermediário", description: "Viagens, experiências, opiniões e conversas mais longas.", modules: B1_MODULES },
  { code: "B2", name: "Intermediário avançado", description: "Discussões, argumentação e inglês profissional.", modules: B2_MODULES },
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

/** Aulas da trilha + mini-aulas (para busca por ID, revisão e banco). */
export const EVERY_LESSON: Lesson[] = [...ALL_LESSONS, ...MINI_LESSONS];
export const EVERY_MODULE: Module[] = [...ALL_MODULES, ...MINI_MODULES];

const lessonMap = new Map(EVERY_LESSON.map((l) => [l.id, l]));
const moduleMap = new Map(EVERY_MODULE.map((m) => [m.id, m]));
const vocabMap = new Map<string, VocabItem & { lessonId: string }>(
  EVERY_LESSON.flatMap((l) => l.vocabulary.map((v) => [v.id, { ...v, lessonId: l.id }] as const)),
);
const exerciseMap = new Map(EVERY_LESSON.flatMap((l) => l.exercises.map((e) => [e.id, { exercise: e, lessonId: l.id }] as const)));

export const getLesson = (id: string) => lessonMap.get(id);
export const getModule = (id: string) => moduleMap.get(id);
export const getVocab = (id: string) => vocabMap.get(id);
export const getExercise = (id: string) => exerciseMap.get(id);
export const getLevel = (code: string) => LEVELS.find((l) => l.code === code);

const levelOfLesson = (l: Lesson) => moduleMap.get(l.moduleId)?.level ?? "A1";
const levelIdx = (lv: CefrLevel) => LEVEL_ORDER.indexOf(lv);

/**
 * Regra de desbloqueio: uma aula só abre quando a anterior (na ordem global
 * da trilha) foi concluída. Quem começou num nível acima (pelo nivelamento ou
 * por ter passado no teste de nível) tem as aulas dos níveis anteriores abertas,
 * para revisar quando quiser, e a trilha começa no primeiro módulo do seu nível.
 */
export function isLessonUnlocked(lessonId: string, completed: Set<string>, startLevel: CefrLevel = "A1"): boolean {
  if (lessonId.startsWith("mini-")) return true; // mini-aulas ficam sempre abertas
  const idx = ALL_LESSONS.findIndex((l) => l.id === lessonId);
  if (idx < 0) return false;
  if (idx === 0) return true;
  const lesson = ALL_LESSONS[idx];
  const lv = levelIdx(levelOfLesson(lesson));
  const start = levelIdx(startLevel);
  if (lv < start) return true;
  const prev = ALL_LESSONS[idx - 1];
  if (lv === start && levelIdx(levelOfLesson(prev)) < start) return true; // primeira aula do nível inicial
  return completed.has(prev.id);
}

/** Próxima aula da trilha, a partir do nível em que o aluno está. */
export function nextLessonFor(completed: Set<string>, startLevel: CefrLevel = "A1"): Lesson | null {
  const start = levelIdx(startLevel);
  return ALL_LESSONS.find((l) => levelIdx(levelOfLesson(l)) >= start && !completed.has(l.id)) ?? null;
}

/** Nível mais alto que já tem aulas escritas. */
export const MAX_AUTHORED_LEVEL: CefrLevel = [...LEVELS].reverse().find((l) => l.modules.length > 0)?.code ?? "A1";

export function lessonsOfLevel(level: CefrLevel): Lesson[] {
  return getLevel(level)?.modules.flatMap((m) => m.lessons) ?? [];
}
