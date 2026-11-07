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
