import { describe, expect, it } from "vitest";
import { confidence, isProduction, objectiveState, type Evidence } from "@/lib/mastery";

const day = (d: number, h = 10) => new Date(Date.UTC(2026, 10, 1 + d, h)).toISOString();
const ev = (d: number, correct: boolean, production = false, h = 10): Evidence => ({ lessonId: "a1-m1-l1", correct, at: day(d, h), production });

describe("domínio e retenção por objetivo", () => {
  it("nunca domina com uma resposta só, nem com tudo certo num único dia", () => {
    expect(objectiveState("x", [ev(0, true, true)]).status).toBe("learning");
    const oneDay = Array.from({ length: 8 }, (_, i) => ev(0, true, i % 2 === 0, 10 + i));
    expect(objectiveState("x", oneDay).status).toBe("learning");
  });

  it("só reconhecimento (escolher opção) não basta: precisa produzir", () => {
    const evs = [ev(0, true), ev(0, true), ev(0, true), ev(1, true), ev(1, true), ev(1, true)];
    expect(objectiveState("x", evs).status).toBe("learning");
    expect(objectiveState("x", [...evs, ev(1, true, true)]).status).toBe("mastered");
  });

  it("80% nas últimas 10, em 2 dias, com produção → dominado", () => {
    const evs = [ev(0, true, true), ev(0, false), ev(0, true), ev(1, true), ev(1, true)];
    const s = objectiveState("x", evs);
    expect(s.recentAccuracy).toBe(80);
    expect(s.status).toBe("mastered");
  });

  it("retido só quando continua certo 7+ dias depois", () => {
    const base = [ev(0, true, true), ev(0, true), ev(1, true), ev(1, true), ev(1, true, true)];
    expect(objectiveState("x", [...base, ev(9, true), ev(9, true, true)]).status).toBe("retained");
    expect(objectiveState("x", [...base, ev(9, true)]).status).toBe("mastered"); // 1 resposta tardia não basta
    const forgot = objectiveState("x", [...base, ev(9, false), ev(9, false, true), ev(9, true)]);
    expect(forgot.status).toBe("reinforce");
    expect(forgot.retention).toEqual({ n: 3, correct: 1 });
  });

  it("errando muito → precisa reforço", () => {
    expect(objectiveState("x", [ev(0, false), ev(0, false), ev(0, true)]).status).toBe("reinforce");
  });

  it("produção × reconhecimento por tipo de exercício", () => {
    expect(isProduction({ type: "translate" })).toBe(true);
    expect(isProduction({ type: "word_order" })).toBe(true);
    expect(isProduction({ type: "fill_blank" })).toBe(true);
    expect(isProduction({ type: "listening" })).toBe(true); // ditado
    expect(isProduction({ type: "listening", options: ["a", "b"] })).toBe(false);
    expect(isProduction({ type: "multiple_choice" })).toBe(false);
    expect(isProduction({ type: "match_pairs" })).toBe(false);
  });

  it("confiabilidade pela amostra", () => {
    expect([0, 5, 15, 40].map(confidence)).toEqual(["sem dados", "baixa", "média", "alta"]);
  });
});
