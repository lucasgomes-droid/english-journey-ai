import { describe, expect, it } from "vitest";
import { LEVEL_EXAMS, EXAM_PASS } from "@/content/level-exams";
import { LEVEL_ORDER } from "@/content/curriculum";
import { buildRecoveryTasks, examState, rubricScore, speakingAnswerScore, taskProgress, weakSkillsFrom, type RecoveryPlan } from "@/lib/exam-rules";

const at = (m: number) => new Date(Date.UTC(2026, 10, 5, 10, m)).toISOString();

describe("prova de nível", () => {
  it("existe roteiro para todos os níveis, com critérios, 2 temas de fala e conversa", () => {
    expect(LEVEL_EXAMS.map((e) => e.level)).toEqual(LEVEL_ORDER);
    for (const e of LEVEL_EXAMS) {
      expect(e.canDo.length).toBeGreaterThanOrEqual(4);
      expect(e.speaking).toHaveLength(2);
      expect(e.turns).toBeGreaterThanOrEqual(5);
      expect(e.conversation.opener.length).toBeGreaterThan(5);
    }
    // Fala mais exigente a cada nível.
    for (let i = 1; i < LEVEL_EXAMS.length; i++) expect(LEVEL_EXAMS[i].minWords).toBeGreaterThan(LEVEL_EXAMS[i - 1].minWords);
  });

  it("partes em sequência: escrita → Speaking → Conversation; aprovado só com as três", () => {
    let s = examState([], []);
    expect(s.parts.written.lock).toBeNull();
    expect(s.parts.speaking.lock).toBe("prereq");
    expect(s.parts.conversation.lock).toBe("prereq");
    s = examState([{ part: "written", score: 80, passed: true, created_at: at(1) }], []);
    expect(s.parts.speaking.lock).toBeNull();
    expect(s.parts.conversation.lock).toBe("prereq");
    s = examState(
      [
        { part: "written", score: 80, passed: true, created_at: at(1) },
        { part: "speaking", score: 65, passed: true, created_at: at(2) },
        { part: "conversation", score: 70, passed: true, created_at: at(3) },
      ],
      [],
    );
    expect(s.passed).toBe(true);
  });

  it("reprovou → plano aberto bloqueia; plano cumprido libera nova tentativa", () => {
    const attempts = [{ part: "written" as const, score: 60, passed: false, created_at: at(1) }];
    const plan: RecoveryPlan = { id: 1, level_code: "A1", part: "written", tasks: buildRecoveryTasks("written"), created_at: at(1), completed_at: null };
    expect(examState(attempts, [plan]).parts.written.lock).toBe("plan");
    expect(examState(attempts, [{ ...plan, completed_at: at(9) }]).parts.written.lock).toBeNull();
    expect(examState(attempts, [plan]).passed).toBe(false);
  });

  it("plano da parte escrita usa as aulas e habilidades mais fracas", () => {
    const tasks = buildRecoveryTasks("written", { weakSkills: ["listening", "grammar"], weakLessons: [{ id: "a1-m1-l2", title: "Apresentando-se" }] });
    expect(tasks.map((t) => t.kind)).toEqual(["lesson", "review", "listening"]);
    expect(tasks[0].href).toBe("/aula/a1-m1-l2");
    expect(buildRecoveryTasks("speaking").some((t) => t.kind === "speaking")).toBe(true);
    expect(buildRecoveryTasks("conversation").some((t) => t.kind === "conversation")).toBe(true);
  });

  it("progresso de tarefa e habilidades fracas", () => {
    expect(taskProgress({ id: "r", kind: "review", target: 15, label: "", href: "" }, 20)).toEqual({ done: 15, target: 15, complete: true });
    expect(taskProgress({ id: "l", kind: "lesson", ref: "x", target: 70, label: "", href: "" }, 0).complete).toBe(false);
    expect(
      weakSkillsFrom([
        { skill: "grammar", correct: false },
        { skill: "grammar", correct: true },
        { skill: "listening", correct: false },
        { skill: "vocabulary", correct: true },
      ]),
    ).toEqual(["listening", "grammar"]);
  });

  it("notas: rubrica 0–5 vira 0–100 e resposta curta demais é limitada", () => {
    expect(rubricScore({ a: 5, b: 5 })).toBe(100);
    expect(rubricScore({ a: 3, b: 3 })).toBe(60);
    expect(speakingAnswerScore({ a: 4, b: 4 }, 40, 40)).toBe(80);
    expect(speakingAnswerScore({ a: 4, b: 4 }, 10, 40)).toBeLessThan(EXAM_PASS.speaking);
  });
});
