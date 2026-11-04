import { describe, expect, it } from "vitest";
import { ALL_LESSONS, ALL_MODULES, isLessonUnlocked, nextLessonFor } from "@/content/curriculum";
import { gradeExercise, orderTokens } from "@/lib/grading";
import type { Exercise } from "@/content/types";
import type { ExerciseAnswer } from "@/lib/grading";

function correctAnswer(ex: Exercise): ExerciseAnswer {
  switch (ex.type) {
    case "multiple_choice":
      return { kind: "choice", choice: ex.answer };
    case "listening":
      return ex.options ? { kind: "choice", choice: ex.answer! } : { kind: "text", text: ex.accepted![0] };
    case "translate":
    case "fill_blank":
      return { kind: "text", text: ex.accepted[0] };
    case "word_order":
      return { kind: "order", words: orderTokens(ex.answer) };
    case "match_pairs":
      return { kind: "pairs", mistakes: 0 };
  }
}

describe("integridade do conteúdo A1", () => {
  it("tem módulos e aulas", () => {
    expect(ALL_MODULES.length).toBeGreaterThanOrEqual(4);
    expect(ALL_LESSONS.length).toBeGreaterThanOrEqual(16);
  });

  it("IDs de aulas, vocabulário e exercícios são únicos", () => {
    const ids = ALL_LESSONS.flatMap((l) => [l.id, ...l.vocabulary.map((v) => v.id), ...l.exercises.map((e) => e.id)]);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("toda aula comum tem objetivo, explicação, vocabulário, exemplos, exercícios, conversa e revisão", () => {
    for (const l of ALL_LESSONS.filter((x) => x.kind === "lesson")) {
      expect(l.objective, l.id).toBeTruthy();
      expect(l.explanation.length, l.id).toBeGreaterThan(0);
      expect(l.vocabulary.length, l.id).toBeGreaterThanOrEqual(6);
      expect(l.examples.length, l.id).toBeGreaterThan(0);
      expect(l.exercises.length, l.id).toBeGreaterThanOrEqual(6);
      expect(l.conversation, l.id).toBeDefined();
      expect(l.review.length, l.id).toBeGreaterThan(0);
    }
  });

  it("a resposta oficial de cada exercício é corrigida como certa", () => {
    for (const l of ALL_LESSONS) {
      for (const ex of l.exercises) {
        const r = gradeExercise(ex, correctAnswer(ex));
        expect(r.correct, `${ex.id}`).toBe(true);
      }
    }
  });

  it("índices de múltipla escolha estão dentro das opções", () => {
    for (const ex of ALL_LESSONS.flatMap((l) => l.exercises)) {
      if (ex.type === "multiple_choice") expect(ex.answer).toBeLessThan(ex.options.length);
      if (ex.type === "listening" && ex.options) expect(ex.answer!).toBeLessThan(ex.options.length);
      if (ex.type === "listening" && !ex.options) expect(ex.accepted?.length).toBeGreaterThan(0);
      if (ex.type === "fill_blank") expect(ex.sentence).toContain("___");
    }
  });

  it("desbloqueio segue a ordem da trilha", () => {
    const first = ALL_LESSONS[0].id;
    const second = ALL_LESSONS[1].id;
    expect(isLessonUnlocked(first, new Set())).toBe(true);
    expect(isLessonUnlocked(second, new Set())).toBe(false);
    expect(isLessonUnlocked(second, new Set([first]))).toBe(true);
    expect(nextLessonFor(new Set([first]))?.id).toBe(second);
  });
});
