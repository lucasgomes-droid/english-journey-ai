import { describe, expect, it } from "vitest";
import { ALL_LESSONS, ALL_MODULES, EVERY_LESSON, isLessonUnlocked, nextLessonFor } from "@/content/curriculum";
import { SCENARIOS, getScenario } from "@/content/scenarios";
import { MINI_LESSONS } from "@/content/mini";
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
    const ids = EVERY_LESSON.flatMap((l) => [l.id, ...l.vocabulary.map((v) => v.id), ...l.exercises.map((e) => e.id)]);
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
    for (const l of EVERY_LESSON) {
      for (const ex of l.exercises) {
        const r = gradeExercise(ex, correctAnswer(ex));
        expect(r.correct, `${ex.id}`).toBe(true);
      }
    }
  });

  it("índices de múltipla escolha estão dentro das opções", () => {
    for (const ex of EVERY_LESSON.flatMap((l) => l.exercises)) {
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
    // Quem começa no A2 (nivelamento) tem o A1 aberto e a trilha começa no A2.
    expect(isLessonUnlocked("a2-m1-l1", new Set(), "A2")).toBe(true);
    expect(isLessonUnlocked("a2-m1-l2", new Set(), "A2")).toBe(false);
    expect(isLessonUnlocked("a1-m3-l2", new Set(), "A2")).toBe(true);
    expect(nextLessonFor(new Set(), "A2")?.id).toBe("a2-m1-l1");
    expect(isLessonUnlocked("a2-m1-l1", new Set(), "A1")).toBe(false);
  });
  it("o nível seguinte só abre com a prova de nível (subir current_level), nunca só pelo teste final", () => {
    const a1 = ALL_LESSONS.filter((l) => l.id.startsWith("a1-")).map((l) => l.id);
    const allA1 = new Set(a1);
    expect(isLessonUnlocked("a2-m1-l1", allA1, "A1")).toBe(false);
    expect(nextLessonFor(allA1, "A1")).toBeNull();
    expect(isLessonUnlocked("a2-m1-l1", allA1, "A2")).toBe(true);
  });
  it("aulas exigem 70% (domínio)", () => {
    for (const l of ALL_LESSONS) expect(l.passScore, l.id).toBeGreaterThanOrEqual(70);
  });
});

describe("mini-aulas e conversas", () => {
  it("toda mini-aula aponta para uma situação existente e fica sempre aberta", () => {
    expect(MINI_LESSONS.length).toBeGreaterThanOrEqual(10);
    for (const l of MINI_LESSONS) {
      expect(getScenario(l.scenarioId!), l.id).toBeDefined();
      expect(isLessonUnlocked(l.id, new Set())).toBe(true);
      expect(ALL_LESSONS.some((x) => x.id === l.id)).toBe(false);
    }
  });
  it("situações têm IDs únicos, objetivos e fala inicial", () => {
    expect(new Set(SCENARIOS.map((s) => s.id)).size).toBe(SCENARIOS.length);
    for (const s of SCENARIOS) {
      expect(s.goals.length).toBeGreaterThan(0);
      expect(s.opener.length).toBeGreaterThan(5);
    }
  });
});

import { LISTENING } from "@/content/listening";
describe("listening", () => {
  it("tem itens em todos os níveis, com respostas válidas", () => {
    for (const lv of ["A1", "A2", "B1", "B2", "C1", "C2"]) expect(LISTENING.filter((i) => i.level === lv).length).toBeGreaterThanOrEqual(3);
    expect(new Set(LISTENING.map((i) => i.id)).size).toBe(LISTENING.length);
    for (const it of LISTENING) {
      for (const q of it.questions) expect(q.answer).toBeLessThan(q.options.length);
      // A frase do ditado precisa estar no áudio.
      const audio = it.lines.map((l) => l.text).join(" ").toLowerCase();
      const words = it.dictation.toLowerCase().replace(/[.,!?]/g, "").split(" ");
      expect(words.every((w) => audio.includes(w)), it.id).toBe(true);
    }
  });
});

describe("qualidade do conteúdo", () => {
  it("palavras de distração não fazem parte da resposta e ditados batem com o áudio", async () => {
    const { normalize } = await import("@/lib/grading");
    for (const ex of ALL_LESSONS.flatMap((l) => l.exercises)) {
      if (ex.type === "word_order" && ex.distractors) {
        const toks = orderTokens(ex.answer).map((t) => t.toLowerCase().replace(/[.,!?]/g, ""));
        for (const d of ex.distractors) expect(toks, ex.id).not.toContain(d.toLowerCase());
      }
      if (ex.type === "listening" && !ex.options) {
        expect(ex.accepted!.map(normalize), ex.id).toContain(normalize(ex.audio));
      }
    }
  });
  it("títulos dos módulos escritos batem com o mapa do curso", async () => {
    const { syllabusLevel } = await import("@/content/syllabus");
    for (const m of ALL_MODULES.filter((x) => x.level !== "A1" && !x.id.endsWith("final"))) {
      const syl = syllabusLevel(m.level).modules.map((x) => x.title);
      expect(syl, m.id).toContain(m.title);
    }
  });
});
