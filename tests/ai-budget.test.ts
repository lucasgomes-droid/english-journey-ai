import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

describe("M0 — modelos, limites e cache de voz", async () => {
  const { modelsFor, chatModel, aiConfig } = await import("@/lib/ai");
  const { underLimit, DAILY_LIMITS } = await import("@/lib/ai-budget");
  const { retryAfterMs, ttsCachePath } = await import("@/lib/speech-server");

  it("fala da conversa usa o modelo menor e o maior fica de reserva (cotas separadas)", () => {
    expect(aiConfig.baseUrl).toContain("groq.com");
    expect(chatModel()).toBe("openai/gpt-oss-20b");
    expect(modelsFor("turn")).toEqual(["openai/gpt-oss-20b", "openai/gpt-oss-120b"]);
    expect(modelsFor("heavy")).toEqual(["openai/gpt-oss-120b", "openai/gpt-oss-20b"]);
  });

  it("limite diário por aluno", () => {
    expect(underLimit(0, "chat")).toBe(true);
    expect(underLimit(DAILY_LIMITS.chat - 1, "chat")).toBe(true);
    expect(underLimit(DAILY_LIMITS.chat, "chat")).toBe(false);
    expect(DAILY_LIMITS.tts).toBeLessThan(100); // nunca um aluno sozinho gasta a cota diária inteira da voz
  });

  it("retry-after em segundos, data ou ausente", () => {
    expect(retryAfterMs("120")).toBe(120_000);
    expect(retryAfterMs(null)).toBe(600_000);
    const at = new Date(Date.now() + 30_000).toUTCString();
    expect(retryAfterMs(at)).toBeGreaterThan(20_000);
  });

  it("mesma frase e mesma voz → mesmo arquivo no cache (espaços não importam)", () => {
    const a = ttsCachePath("groq", "f1", "Hello,  how are you?");
    expect(a).toBe(ttsCachePath("groq", "f1", " Hello, how are you? "));
    expect(a).not.toBe(ttsCachePath("groq", "m1", "Hello, how are you?"));
    expect(a).toMatch(/^groq\/f1\/[0-9a-f]{40}\.wav$/);
  });
});

describe("M2 — correção e memória do professor", async () => {
  const { shouldFixNow } = await import("@/components/intensity-picker");
  const { parseTutorReply } = await import("@/lib/tutor-prompt");

  it("correção na hora: intensa sempre, normal 1 a cada 3 falas, leve nunca", () => {
    expect([0, 1, 2, 5].map((n) => shouldFixNow("intensa", n))).toEqual([true, true, true, true]);
    expect([0, 1, 2, 5].map((n) => shouldFixNow("normal", n))).toEqual([false, false, true, true]);
    expect([0, 5, 99].map((n) => shouldFixNow("leve", n))).toEqual([false, false, false]);
  });

  it("lê exemplo extra e fatos do aluno; descarta tipos desconhecidos", () => {
    const r = parseTutorReply(
      JSON.stringify({
        reply: "Nice!",
        correction: { original: "I have 30 years", corrected: "I'm 30 years old", explanation_pt: "Idade usa to be.", example: "She is 25 years old." },
        learner_facts: [{ kind: "work", value: "works in logistics." }, { kind: "cpf", value: "123" }, { kind: "interest", value: "x" }],
        tip_pt: null,
      }),
    );
    expect(r.correction?.example).toBe("She is 25 years old.");
    expect(r.learner_facts).toEqual([{ kind: "work", value: "works in logistics" }]);
  });
});

describe("conversa da aula", async () => {
  const { talkSystemPrompt, parseTalkReview, talkPassed, isGuided } = await import("@/lib/lesson-talk");
  const { getLesson } = await import("@/content/curriculum");
  it("A1–A2 guiada, B1+ natural, com o conteúdo da aula no prompt", () => {
    const l = getLesson("a1-m1-l2")!;
    const p = talkSystemPrompt(l, "A1", "Lucas");
    expect(p).toContain("STYLE: GUIDED");
    expect(p).toContain(l.title);
    expect(p).toContain(l.vocabulary[0].en);
    expect(talkSystemPrompt(l, "B1", "Lucas")).toContain("STYLE: NATURAL");
    expect([isGuided("A2"), isGuided("B1")]).toEqual([true, false]);
  });
  it("mini-resultado: só conta para o domínio se comunicou e usou algo da aula", () => {
    const r = parseTalkReview({ score: 82, used: ["I'm from Brazil", ""], missing: ["Where are you from?"], best_sentence: "x", try_next: "y", feedback_pt: "z" })!;
    expect(r.used).toEqual(["I'm from Brazil"]);
    expect(talkPassed(r)).toBe(true);
    expect(talkPassed({ score: 90, used: [] })).toBe(false);
    expect(parseTalkReview({ score: "abc" })).toBeNull();
  });
});

describe("recuperação de 'tool_use_failed' (gpt-oss no Groq)", async () => {
  const { salvageToolCall } = await import("@/lib/ai");
  it("aproveita o JSON que veio dentro da chamada de ferramenta", () => {
    const body = JSON.stringify({ error: { message: "Tool choice is none, but model called a tool", code: "tool_use_failed", failed_generation: '{"name": "assistant", "arguments": {"reply": "Hi! What\'s your name?", "correction": null}}' } });
    expect(JSON.parse(salvageToolCall(body)!)).toEqual({ reply: "Hi! What's your name?", correction: null });
  });
  it("sem resposta aproveitável → null (o servidor tenta de novo / outro modelo)", () => {
    expect(salvageToolCall(JSON.stringify({ error: { code: "tool_use_failed", failed_generation: '{"name": "search", "arguments": {"q": "x"}}' } }))).toBeNull();
    expect(salvageToolCall("not json")).toBeNull();
  });
});
