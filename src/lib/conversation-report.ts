import "server-only";
import { chatCompletion } from "@/lib/ai";
import { parseJsonObject } from "@/lib/speaking-parse";
import { rubricScore } from "@/lib/exam-rules";

export interface ConversationReport {
  summary_pt: string;
  strengths_pt: string[];
  said: { original: string; better: string }[];
  mistakes: { original: string; corrected: string; explanation_pt: string }[];
  expressions: { en: string; pt: string }[];
  goals: { goal: string; done: boolean }[];
  rubric: { task: number; accuracy: number; range: number; interaction: number };
  score: number;
  suggestion_pt: string;
}

const str = (x: unknown) => (typeof x === "string" ? x.trim() : "");
const arr = (x: unknown) => (Array.isArray(x) ? x : []);
const num = (x: unknown) => {
  const n = typeof x === "number" ? x : Number(x);
  return Number.isFinite(n) ? Math.min(5, Math.max(0, n)) : 0;
};

/** Normaliza a resposta da IA (função pura, testável). */
export function normalizeReport(o: Record<string, unknown> | null, goals: string[]): ConversationReport | null {
  if (!o) return null;
  const r = (o.rubric ?? {}) as Record<string, unknown>;
  const rubric = { task: num(r.task), accuracy: num(r.accuracy), range: num(r.range), interaction: num(r.interaction) };
  const doneList = arr(o.goals_done);
  return {
    summary_pt: str(o.summary_pt),
    strengths_pt: arr(o.strengths_pt).map(str).filter(Boolean).slice(0, 3),
    said: arr(o.said)
      .map((x) => x as Record<string, unknown>)
      .map((x) => ({ original: str(x.original), better: str(x.better) }))
      .filter((x) => x.original && x.better)
      .slice(0, 5),
    mistakes: arr(o.mistakes)
      .map((x) => x as Record<string, unknown>)
      .map((x) => ({ original: str(x.original), corrected: str(x.corrected), explanation_pt: str(x.explanation_pt) }))
      .filter((x) => x.corrected && x.corrected !== x.original)
      .slice(0, 6),
    expressions: arr(o.expressions)
      .map((x) => x as Record<string, unknown>)
      .map((x) => ({ en: str(x.en), pt: str(x.pt) }))
      .filter((x) => x.en && x.pt)
      .slice(0, 5),
    goals: goals.map((g, i) => ({ goal: g, done: doneList[i] === true })),
    rubric,
    score: rubricScore(rubric),
    suggestion_pt: str(o.suggestion_pt),
  };
}

export async function conversationReport(input: {
  level: string;
  scene: string;
  goals: string[];
  turns: { role: "user" | "assistant"; content: string }[];
}): Promise<ConversationReport | null> {
  const system = `You are an English teacher reviewing a practice conversation of a Brazilian learner (CEFR ${input.level}).
Scene: ${input.scene}
Student's goals: ${input.goals.length ? input.goals.map((g, i) => `${i + 1}. ${g}`).join(" ") : "keep a natural conversation"}
Lines marked STUDENT are what the student actually said (possibly via speech recognition: ignore tiny recognition errors and never invent mistakes).
Score each criterion 0–5 against the ${input.level} level (3 = meets the level): task (achieved the goals), accuracy (grammar), range (vocabulary/structures), interaction (kept the conversation going, asked and answered).
Reply ONLY with JSON:
{"summary_pt":"2 sentences in Brazilian Portuguese: honest overall verdict",
 "strengths_pt":["up to 3 concrete positive points, in Portuguese"],
 "said":[{"original":"a student's line, verbatim","better":"a more natural version at about one level above"}],
 "mistakes":[{"original":"student's phrase","corrected":"correct English","explanation_pt":"short reason in Portuguese"}],
 "expressions":[{"en":"useful natural expression for this scene that the student did not use","pt":"translation"}],
 "goals_done":[true/false for each goal, in order],
 "rubric":{"task":0,"accuracy":0,"range":0,"interaction":0},
 "suggestion_pt":"one concrete practice suggestion in Portuguese"}
Rules: "said" picks the 3–5 most instructive student lines; at most 6 mistakes (most important first); exactly 4 expressions.`;
  const transcript = input.turns.map((t) => `${t.role === "user" ? "STUDENT" : "CHARACTER"}: ${t.content}`).join("\n");
  const raw = await chatCompletion(
    [
      { role: "system", content: system },
      { role: "user", content: transcript.slice(-9000) },
    ],
    { json: true, temperature: 0.3, maxTokens: 2400 },
  );
  return normalizeReport(parseJsonObject(raw), input.goals);
}
