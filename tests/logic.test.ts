import { describe, expect, it } from "vitest";
import { gradeExercise, matchText, normalize } from "@/lib/grading";
import { NEW_SRS, reviewSrs } from "@/lib/srs";
import { displayStreak, localDate, nextStreak } from "@/lib/streak";
import { earnedAchievements } from "@/lib/achievements";

describe("correção de respostas", () => {
  it("normaliza caixa, pontuação e contrações", () => {
    expect(normalize("I'm FINE, thanks!")).toBe("i am fine thanks");
    expect(normalize("She doesn’t like it.")).toBe("she does not like it");
    expect(normalize("What's your name?")).toBe("what is your name");
  });

  it("aceita contração e forma completa", () => {
    expect(matchText("I am tired", ["I'm tired."]).correct).toBe(true);
  });

  it("tolera um erro de digitação em frases, não em palavras curtas", () => {
    expect(matchText("How old are yuo?", ["How old are you?"])).toEqual({ correct: true, typo: true });
    expect(matchText("it", ["is"]).correct).toBe(false);
  });

  it("rejeita resposta errada", () => {
    expect(matchText("I have 25 years", ["I'm 25 years old."]).correct).toBe(false);
  });

  it("fill_blank não aceita erro de digitação", () => {
    const ex = { id: "x", type: "fill_blank" as const, skill: "grammar" as const, sentence: "She ___ a teacher.", accepted: ["is"] };
    expect(gradeExercise(ex, { kind: "text", text: "Is" }).correct).toBe(true);
    expect(gradeExercise(ex, { kind: "text", text: "are" }).correct).toBe(false);
  });

  it("word_order compara a frase montada", () => {
    const ex = { id: "y", type: "word_order" as const, skill: "grammar" as const, prompt: "", answer: "Are you hungry?" };
    expect(gradeExercise(ex, { kind: "order", words: ["Are", "you", "hungry?"] }).correct).toBe(true);
    expect(gradeExercise(ex, { kind: "order", words: ["You", "are", "hungry?"] }).correct).toBe(false);
  });
});

describe("repetição espaçada (SM-2)", () => {
  const now = new Date("2026-01-10T12:00:00Z");
  it("acerto aumenta o intervalo: 1 → 3 → ~7 dias", () => {
    const a = reviewSrs(NEW_SRS, 5, now);
    expect(a.intervalDays).toBe(1);
    const b = reviewSrs(a, 5, now);
    expect(b.intervalDays).toBe(3);
    const c = reviewSrs(b, 4, now);
    expect(c.intervalDays).toBeGreaterThanOrEqual(7);
  });
  it("erro faz o item voltar hoje e reduz a facilidade", () => {
    const r = reviewSrs({ ease: 2.5, intervalDays: 10, repetitions: 3, lapses: 0 }, 1, now);
    expect(r.intervalDays).toBe(0);
    expect(r.lapses).toBe(1);
    expect(r.ease).toBeLessThan(2.5);
    expect(r.dueAt.getTime() - now.getTime()).toBe(10 * 60 * 1000);
  });
});

describe("sequência de dias", () => {
  it("conta dias consecutivos e quebra após falta", () => {
    expect(nextStreak(null, 0, "2026-03-01")).toBe(1);
    expect(nextStreak("2026-03-01", 1, "2026-03-02")).toBe(2);
    expect(nextStreak("2026-03-02", 2, "2026-03-02")).toBe(2);
    expect(nextStreak("2026-03-02", 5, "2026-03-05")).toBe(1);
    expect(displayStreak("2026-03-01", 4, "2026-03-03")).toBe(0);
    expect(displayStreak("2026-03-02", 4, "2026-03-03")).toBe(4);
  });
  it("usa o fuso do aluno", () => {
    expect(localDate(new Date("2026-03-02T02:00:00Z"), "America/Sao_Paulo")).toBe("2026-03-01");
  });
});

describe("conquistas", () => {
  it("libera conforme estatísticas", () => {
    const got = earnedAchievements({ lessonsCompleted: 5, passedTestsCount: 1, perfectLesson: false, streak: 3, xp: 120, chats: 0, reviews: 0, levelUps: 0 });
    expect(got).toEqual(["first_lesson", "five_lessons", "module_done", "streak_3"]);
  });
});
