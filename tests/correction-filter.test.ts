import { describe, expect, it } from "vitest";
import { isTrivialCorrection } from "@/lib/correction-filter";
import { parseTutorReply } from "@/lib/tutor-prompt";
import { askedQuestions, nextLessonQuestion, repeatsQuestion } from "@/lib/lesson-talk";
import { getLesson } from "@/content/curriculum";

describe("correções falsas são descartadas", () => {
  it("contração × forma completa, pontuação e 'and you?'", () => {
    expect(isTrivialCorrection("What's your name?", "What is your name?")).toBe(true);
    expect(isTrivialCorrection("I'm fine, thanks", "I am fine, thanks.")).toBe(true);
    expect(isTrivialCorrection("i dont know", "I don't know.")).toBe(true);
    expect(isTrivialCorrection("My name is Lucas, and you?", "My name is Lucas. What is your name?")).toBe(true);
    expect(isTrivialCorrection("I'm good thanks and you", "I'm good, thanks. How about you?")).toBe(true);
  });
  it("erros de verdade continuam", () => {
    expect(isTrivialCorrection("I has a dog", "I have a dog")).toBe(false);
    expect(isTrivialCorrection("I have 30 years", "I'm 30 years old")).toBe(false);
    expect(isTrivialCorrection("She don't like coffee", "She doesn't like coffee")).toBe(false);
    expect(isTrivialCorrection("How is your name?", "What is your name?")).toBe(false);
  });
  it("parseTutorReply ignora a correção falsa", () => {
    const r = parseTutorReply(JSON.stringify({ reply: "Nice to meet you!", correction: { original: "What's your name?", corrected: "What is your name?", explanation_pt: "x" } }));
    expect(r.correction).toBeNull();
    const ok = parseTutorReply(JSON.stringify({ reply: "Cool!", correction: { original: "I has a dog", corrected: "I have a dog", explanation_pt: "x" } }));
    expect(ok.correction?.corrected).toBe("I have a dog");
  });
});

describe("conversa da aula não anda em círculo", () => {
  const turns = [
    { role: "assistant", content: "Hello! What is your name?" },
    { role: "user", content: "My name is Lucas. What's your name?" },
    { role: "assistant", content: "Nice to meet you. What is your name?" },
  ];
  it("detecta pergunta repetida (mesmo com contração)", () => {
    const asked = askedQuestions(turns);
    expect(asked).toContain("What is your name?");
    expect(repeatsQuestion("Nice to meet you, Lucas. What's your name?", asked)).toBe(true);
    expect(repeatsQuestion("I'm Alex. Where are you from?", asked)).toBe(false);
  });
  it("plano B: próxima pergunta da aula ainda não feita", () => {
    const lesson = getLesson("a1-m1-l1")!;
    const q = nextLessonQuestion(lesson, ["What is your name?"]);
    if (q) expect(q.toLowerCase()).not.toBe("what is your name?");
  });
});

import { cleanExplanation, restoreContractions, stripEcho } from "@/lib/correction-filter";
describe("caso da tela: 'yes I have, but I'm at my house now'", () => {
  const original = "yes I have , but I'm at my house now";
  it("mantém o I'm do aluno na versão corrigida e tira a explicação falsa", () => {
    expect(restoreContractions(original, "Yes, I have one, but I am at my house now.")).toBe("Yes, I have one, but I'm at my house now.");
    expect(cleanExplanation('Use "I have one" para indicar que você tem um guarda-roupa. "I am" em vez de "I\'m" no início da frase.', original)).toBe('Use "I have one" para indicar que você tem um guarda-roupa.');
  });
  it("o Alex não repete a frase do aluno", () => {
    expect(stripEcho("I am at my house now. Do you like rain?", [original, "Yes, I have one, but I'm at my house now."])).toBe("Do you like rain?");
    expect(stripEcho("Nice! Do you like rain?", [original])).toBe("Nice! Do you like rain?");
  });
  it("parseTutorReply aplica tudo", () => {
    const r = parseTutorReply(JSON.stringify({ reply: "Ok!", correction: { original: "I'm 30 years", corrected: "I am 30 years old", explanation_pt: "Idade: years old. Use \"I am\" em vez de \"I'm\"." } }));
    expect(r.correction?.corrected).toBe("I'm 30 years old");
    expect(r.correction?.explanation_pt).toBe("Idade: years old.");
  });
});
