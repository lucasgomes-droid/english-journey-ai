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
