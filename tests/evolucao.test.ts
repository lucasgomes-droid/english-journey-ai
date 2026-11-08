import { describe, expect, it } from "vitest";
import { wordStatus, wordPriority } from "@/lib/vocab-status";
import { weeklyCounts } from "@/lib/week-buckets";
import { skillLevel } from "@/lib/mastery";
import { BUILD_SITUATIONS, buildFor } from "@/content/build-situations";
import { LEVEL_ORDER, EVERY_LESSON } from "@/content/curriculum";
import { LISTENING } from "@/content/listening";
import { READINGS } from "@/content/readings";
import { SCENARIOS } from "@/content/scenarios";
import { withUsEnglish } from "@/lib/us-english";

const NOW = Date.parse("2026-11-08T12:00:00Z");
const h = (
  o: Partial<{
    repetitions: number;
    lapses: number;
    interval_days: number;
    due_at: string | null;
    last_reviewed_at: string | null;
  }>,
) => ({
  repetitions: 0,
  lapses: 0,
  interval_days: 0,
  due_at: null,
  last_reviewed_at: null,
  ...o,
});

describe("vocabulário: estado da palavra", () => {
  it("nova, aprendendo, firme e esquecida", () => {
    expect(wordStatus(undefined, NOW)).toBe("nova");
    expect(wordStatus(h({ due_at: "2026-11-09T00:00:00Z" }), NOW)).toBe("nova");
    expect(
      wordStatus(
        h({
          repetitions: 2,
          interval_days: 6,
          due_at: "2026-11-10T00:00:00Z",
          last_reviewed_at: "2026-11-04T00:00:00Z",
        }),
        NOW,
      ),
    ).toBe("aprendendo");
    expect(
      wordStatus(
        h({
          repetitions: 5,
          interval_days: 30,
          due_at: "2026-12-01T00:00:00Z",
          last_reviewed_at: "2026-11-01T00:00:00Z",
        }),
        NOW,
      ),
    ).toBe("firme");
    expect(
      wordStatus(
        h({
          repetitions: 0,
          lapses: 1,
          interval_days: 1,
          due_at: "2026-11-09T00:00:00Z",
          last_reviewed_at: "2026-11-08T00:00:00Z",
        }),
        NOW,
      ),
    ).toBe("esquecida");
    // Muito tempo vencida também conta como esquecendo.
    expect(
      wordStatus(
        h({
          repetitions: 2,
          interval_days: 3,
          due_at: "2026-10-20T00:00:00Z",
          last_reviewed_at: "2026-10-17T00:00:00Z",
        }),
        NOW,
      ),
    ).toBe("esquecida");
  });
  it("esquecidas vêm antes das firmes", () => {
    expect(wordPriority("esquecida", undefined, NOW)).toBeLessThan(
      wordPriority("aprendendo", undefined, NOW),
    );
    expect(wordPriority("nova", undefined, NOW)).toBeLessThan(
      wordPriority("firme", undefined, NOW),
    );
  });
});

describe("aulas por semana", () => {
  it("agrupa por semana terminando hoje", () => {
    const w = weeklyCounts(
      ["2026-11-08", "2026-11-02", "2026-11-01", "2026-10-01"],
      "2026-11-08",
      4,
    );
    expect(w).toHaveLength(4);
    expect(w[3]).toEqual({ start: "2026-11-02", count: 2 });
    expect(w[2].count).toBe(1);
    expect(w.reduce((s, x) => s + x.count, 0)).toBe(3);
  });
});

describe("domínio por competência", () => {
  it("só julga com amostra e separa reforçar/firme", () => {
    expect(skillLevel(0, 0)).toBe("sem dados");
    expect(skillLevel(5, 5)).toBe("começando");
    expect(skillLevel(5, 10)).toBe("reforçar");
    expect(skillLevel(8, 10)).toBe("em progresso");
    expect(skillLevel(18, 20)).toBe("firme");
  });
});

describe("construir frases", () => {
  it("8 situações por nível, ids únicos, com estrutura e modelo", () => {
    for (const l of LEVEL_ORDER) expect(buildFor(l)).toHaveLength(8);
    expect(new Set(BUILD_SITUATIONS.map((s) => s.id)).size).toBe(
      BUILD_SITUATIONS.length,
    );
    for (const s of BUILD_SITUATIONS) {
      expect(s.target.length).toBeGreaterThan(2);
      expect(s.model.length).toBeGreaterThan(5);
    }
  });
  it("A1 usa frases curtas", () => {
    for (const s of buildFor("A1"))
      expect(s.model.split(/\s+/).length).toBeLessThanOrEqual(14);
  });
});

describe("só inglês americano", () => {
  const BRIT = /\b(surname|neighbour|colour|favourite|centre|organis(e|ed|ing)|realis(e|ed)|apologis(e|ed)|travelled|cancelled|learnt|holidays? (?!together)|on holiday|mobile phone|motorway|rubbish|trousers|queue|at the weekend|the cinema)\b/i;
  it("áudios sem sotaque britânico/australiano e sem grafia britânica", () => {
    for (const l of LISTENING) for (const line of l.lines) {
      expect(line.accent ?? "us").toBe("us");
      expect(line.text).not.toMatch(BRIT);
    }
  });
  it("leituras, cenários e exemplos das aulas em inglês americano (exceto a aula que compara UK × US)", () => {
    for (const r of READINGS) expect(r.text).not.toMatch(BRIT);
    for (const s of SCENARIOS) expect(`${s.setting} ${s.opener}`).not.toMatch(BRIT);
    for (const l of EVERY_LESSON) {
      if (l.title.includes("britânico") || l.id === "c1-m7-l4") continue;
      for (const e of l.examples) if (!/\(UK\)/.test(e.en)) expect(e.en).not.toMatch(BRIT);
    }
  });
  it("toda chamada à IA leva a regra do inglês americano", () => {
    const m = withUsEnglish([{ role: "system", content: "You are a teacher." }, { role: "user", content: "hi" }]);
    expect(m[0].content).toMatch(/American English/);
    expect(m).toHaveLength(2);
    expect(withUsEnglish([{ role: "user", content: "hi" }])[0].role).toBe("system");
  });
});
