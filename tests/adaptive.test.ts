import { describe, expect, it } from "vitest";
import { adaptiveMix, categoryWeights, masteredCategories, prioritizeReview, weeklyHighlights, type WeekStats } from "@/lib/adaptive";
import type { ErrorCategory } from "@/content/error-patterns";
import type { Pattern } from "@/lib/difficulty-rules";

const pat = (category: ErrorCategory, recent: number, rate: number | null): Pattern => ({ category, errors: recent, attempts: 10, rate, recent, previous: 0, trend: "novo", sources: [], samples: [] });

describe("aprendizagem adaptativa", () => {
  it("tema com dificuldade aparece mais; tema dominado aparece menos", () => {
    const all: ErrorCategory[] = ["questions", "to-be", "prepositions"];
    const mastered = masteredCategories([{ category: "to-be", total: 20, wrong: 1 }, { category: "questions", total: 20, wrong: 9 }]);
    expect(mastered.has("to-be")).toBe(true);
    expect(mastered.has("questions")).toBe(false);
    const w = categoryWeights([pat("questions", 5, 45)], all, mastered);
    const pool = all.flatMap((c) => Array.from({ length: 30 }, (_, i) => ({ id: `${c}-${i}`, category: c })));
    const mix = adaptiveMix(pool, w, 30, "seed");
    const count = (c: string) => mix.filter((x) => x.category === c).length;
    expect(count("questions")).toBeGreaterThan(count("prepositions"));
    expect(count("prepositions")).toBeGreaterThan(count("to-be"));
    expect(new Set(mix.map((x) => x.id)).size).toBe(30);
    // Determinístico para a mesma semente.
    expect(adaptiveMix(pool, w, 12, "abc").map((x) => x.id)).toEqual(adaptiveMix(pool, w, 12, "abc").map((x) => x.id));
  });
  it("revisão prioriza temas fracos e itens esquecidos", () => {
    const items = [
      { id: "a", category: "to-be" as ErrorCategory, lapses: 0, due_at: "2026-01-01" },
      { id: "b", category: "questions" as ErrorCategory, lapses: 0, due_at: "2026-01-02" },
      { id: "c", category: null, lapses: 3, due_at: "2026-01-03" },
    ];
    expect(prioritizeReview(items, new Set<ErrorCategory>(["questions"])).map((x) => x.id)).toEqual(["b", "c", "a"]);
  });
  it("relatório semanal compara com a semana anterior", () => {
    const base: WeekStats = { minutes: 30, xp: 100, lessons: 2, answers: 40, accuracy: 60, messages: 10, cleanMessages: 50, reportAvg: null, pairAccuracy: null, listeningAccuracy: 70, reviews: 10, errorsByCategory: { questions: 8 } };
    const cur: WeekStats = { ...base, minutes: 60, accuracy: 75, errorsByCategory: { questions: 2, past: 6 } };
    const h = weeklyHighlights(cur, base, (c) => c);
    expect(h.some((x) => x.tone === "good" && x.text.includes("30 min a mais"))).toBe(true);
    expect(h.some((x) => x.text.includes("60% → 75%"))).toBe(true);
    expect(h.some((x) => x.text.includes("Menos erros de questions"))).toBe(true);
    expect(h.some((x) => x.tone === "bad" && x.text.includes("past"))).toBe(true);
    expect(weeklyHighlights({ ...base, minutes: 0, answers: 0, messages: 0 }, base, (c) => c)[0].tone).toBe("info");
  });
});

import { periodRecommendations } from "@/lib/adaptive";
describe("recomendações do período", () => {
  const empty = { minutes: 0, xp: 0, lessons: 0, answers: 0, accuracy: null, messages: 0, cleanMessages: null, reportAvg: null, pairAccuracy: null, listeningAccuracy: null, reviews: 0, errorsByCategory: {} };
  it("pouca constância, erro recorrente e queda de acerto viram ações concretas (máx. 3)", () => {
    const cur = { ...empty, minutes: 20, accuracy: 55, messages: 10, listeningAccuracy: 80, errorsByCategory: { articles: 5 } };
    const prev = { ...empty, minutes: 90, accuracy: 80 };
    const r = periodRecommendations(cur as never, prev as never, { plannedMinutes: 105, label: (c) => (c === "articles" ? "Artigos" : c) });
    expect(r.map((x) => x.href)).toEqual(["/praticar", "/dificuldades/articles", "/revisao"]);
    expect(r[1].text).toContain("artigos (5 vezes)");
  });
  it("sem problemas, sem recomendação inventada", () => {
    const good = { ...empty, minutes: 200, accuracy: 85, messages: 30, listeningAccuracy: 80 };
    expect(periodRecommendations(good as never, good as never, { plannedMinutes: 105, label: String })).toEqual([]);
  });
});
