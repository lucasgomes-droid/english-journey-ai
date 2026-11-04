import type { Exercise, Lesson, VocabItem } from "./types";

type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never;
export type ExerciseInput = DistributiveOmit<Exercise, "id">;

export interface LessonInput
  extends Omit<Lesson, "id" | "moduleId" | "order" | "exercises" | "vocabulary" | "kind" | "passScore" | "xp"> {
  kind?: Lesson["kind"];
  xp?: number;
  passScore?: number;
  vocabulary: Omit<VocabItem, "id">[];
  exercises: ExerciseInput[];
}

export function slug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Monta uma aula atribuindo IDs estáveis a vocabulário e exercícios. */
export function buildLesson(id: string, moduleId: string, order: number, input: LessonInput): Lesson {
  return {
    ...input,
    id,
    moduleId,
    order,
    kind: input.kind ?? "lesson",
    xp: input.xp ?? (input.kind === "test" ? 50 : 20),
    passScore: input.passScore ?? 70,
    vocabulary: input.vocabulary.map((v) => ({ ...v, id: `${id}-v-${slug(v.en)}` })),
    exercises: input.exercises.map((e, i) => ({ ...e, id: `${id}-e${i + 1}` }) as Exercise),
  };
}
