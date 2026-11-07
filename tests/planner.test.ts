import { describe, expect, it } from "vitest";
import { paceEstimate, planDay, planWeek, skillWeights, type PlanInput } from "@/lib/planner";

const base: PlanInput = {
  level: "A1",
  minutes: 30,
  studyDays: [1, 2, 3, 4, 5],
  focus: [],
  weak: [],
  dueReviews: 12,
  reviewLimit: 20,
  nextLesson: { id: "a1-m1-l2", title: "Aula 2", kind: "lesson" },
  examDue: false,
  reinforce: [],
  weeklyDue: false,
};

describe("cronograma", () => {
  it("nunca passa do tempo do dia e começa por revisão e aula nova", () => {
    for (const minutes of [10, 15, 20, 30, 45, 60]) {
      for (let day = 0; day < 10; day++) {
        const p = planDay({ ...base, minutes }, day);
        expect(p.reduce((s, b) => s + b.minutes, 0)).toBeLessThanOrEqual(minutes);
        expect(p[0].kind).toBe("review");
        expect(p.some((b) => b.kind === "lesson")).toBe(true);
      }
    }
  });

  it("revisão respeita o limite diário e ocupa no máximo ~30% do tempo", () => {
    const p = planDay({ ...base, dueReviews: 200, reviewLimit: 10, minutes: 60 }, 1);
    expect(p[0].detail).toBe("10 itens");
    expect(p[0].minutes).toBeLessThanOrEqual(18);
  });

  it("foco e fraqueza ganham peso (e tempo)", () => {
    const w = skillWeights(["listening"], ["writing"]);
    expect(w.listening).toBeGreaterThan(w.speaking);
    expect(w.writing).toBeGreaterThan(w.vocabulary);
    const p = planDay({ ...base, focus: ["listening"], minutes: 45 }, 3);
    const skillBlocks = p.filter((b) => !["review", "lesson", "reinforce", "weekly", "test"].includes(b.kind));
    expect(skillBlocks[0].kind).toBe("listening");
  });

  it("com pouco tempo, o treino do foco vem antes da gravação semanal", () => {
    const p = planDay({ ...base, dueReviews: 0, minutes: 15, focus: ["listening"], weeklyDue: true }, 4);
    expect(p.map((b) => b.kind)).toEqual(["lesson", "listening"]);
    expect(p.reduce((s, b) => s + b.minutes, 0)).toBe(15);
  });

  it("reforço entra quando há objetivo fraco", () => {
    const p = planDay({ ...base, reinforce: [{ lessonId: "a1-m1-l1", title: "Cumprimentos" }] }, 2);
    expect(p.find((b) => b.kind === "reinforce")?.href).toBe("/aula/a1-m1-l1");
  });

  it("semana respeita os dias de estudo (sábado e domingo de folga)", () => {
    const w = planWeek(base, "2026-11-09"); // segunda
    expect(w.map((d) => d.weekday)).toEqual([1, 2, 3, 4, 5, 6, 0]);
    expect(w.filter((d) => d.rest).map((d) => d.weekday)).toEqual([6, 0]);
    expect(w[5].blocks).toEqual([]);
    expect(new Set(w.slice(0, 5).map((d) => d.blocks.map((b) => b.kind).join())).size).toBeGreaterThan(1); // varia ao longo da semana
  });

  it("ritmo × prazo", () => {
    expect(paceEstimate({ lessonsRemaining: 40, lessonsPerWeek: 4, targetDate: "2027-02-01", todayIso: "2026-11-09" })).toEqual({ weeksAtPace: 10, weeksLeft: 12, neededPerWeek: 4, onTrack: true });
    expect(paceEstimate({ lessonsRemaining: 40, lessonsPerWeek: 2, targetDate: "2027-02-01", todayIso: "2026-11-09" }).onTrack).toBe(false);
    expect(paceEstimate({ lessonsRemaining: 40, lessonsPerWeek: 0, targetDate: null, todayIso: "2026-11-09" }).weeksAtPace).toBeNull();
  });
});
