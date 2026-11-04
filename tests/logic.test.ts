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

import { analyzeAudio, readWav, textStats, wordsPerMinute } from "../src/lib/fluency";
import { encodeWav } from "../src/lib/voice-recorder";
import { normalizeFeedback, parseJsonObject } from "../src/lib/speaking-parse";
describe("fluência", () => {
  it("conta pausas longas e tempo de fala", async () => {
    const rate = 16000;
    const tone = (s: number) => Array.from({ length: rate * s }, (_, i) => Math.sin(i / 4) * 0.4);
    const silence = (s: number) => Array.from({ length: rate * s }, () => 0);
    const pcm = new Float32Array([...silence(0.5), ...tone(1), ...silence(1), ...tone(1), ...silence(0.3), ...tone(1), ...silence(0.5)]);
    const wav = readWav(await encodeWav(pcm, rate).arrayBuffer())!;
    expect(wav.rate).toBe(rate);
    const st = analyzeAudio(wav.samples, wav.rate);
    expect(st.pauses).toBe(1);
    expect(st.speechSeconds).toBeGreaterThan(4);
    expect(st.speechSeconds).toBeLessThan(4.6);
  });
  it("conta palavras, diferentes e hesitações", () => {
    expect(textStats("Um, I work, uh, I work in logistics.")).toEqual({ words: 6, uniqueWords: 4, fillers: 2 });
    expect(wordsPerMinute(50, 30)).toBe(100);
    expect(wordsPerMinute(5, 2)).toBe(0);
  });
  it("lê o retorno da IA de forma tolerante", () => {
    const fb = normalizeFeedback(parseJsonObject('ok {"summary_pt":"Bom","mistakes":[{"original":"a","corrected":"a"},{"original":"I have 30 years","corrected":"I am 30","pt":"Tenho 30"}],"phrases":[{"en":"Hi","pt":"Oi"},{"en":""}]}'));
    expect(fb?.mistakes).toHaveLength(1);
    expect(fb?.phrases).toHaveLength(1);
    expect(normalizeFeedback(parseJsonObject("nada"))).toBeNull();
  });
});

import { PLACEMENT, scorePlacement } from "../src/content/placement";
describe("nivelamento", () => {
  const perfect = PLACEMENT.map((q) => q.answer);
  const upTo = (lv: string[]) => PLACEMENT.map((q) => (lv.includes(q.level) ? q.answer : -1));
  it("estima o nível pelo último nível dominado", () => {
    expect(scorePlacement(PLACEMENT.map(() => -1)).estimated).toBe("A1");
    expect(scorePlacement(upTo(["A1"])).estimated).toBe("A2");
    expect(scorePlacement(upTo(["A1", "A2"])).estimated).toBe("B1");
    expect(scorePlacement(perfect).estimated).toBe("C1");
  });
  it("não pula níveis: errar o A2 mantém no A2 mesmo acertando B1", () => {
    expect(scorePlacement(upTo(["A1", "B1"])).estimated).toBe("A2");
  });
  it("respostas certas estão dentro das opções", () => {
    for (const q of PLACEMENT) expect(q.answer).toBeLessThan(q.options.length);
    expect(PLACEMENT.length).toBe(24);
  });
});

import { buildIcs } from "../src/components/reminder-card";
describe("lembrete no calendário", () => {
  it("gera evento diário com alarme no fuso de São Paulo", () => {
    const ics = buildIcs("07:45", 20, "https://exemplo.app");
    expect(ics).toContain("RRULE:FREQ=DAILY");
    expect(ics).toMatch(/DTSTART;TZID=America\/Sao_Paulo:\d{8}T074500/);
    expect(ics).toMatch(/DTEND;TZID=America\/Sao_Paulo:\d{8}T080500/);
    expect(ics).toContain("BEGIN:VALARM");
  });
});
