import "server-only";
import { chatCompletion } from "@/lib/ai";
import { parseJsonObject } from "@/lib/speaking-parse";
import type { LevelExam } from "@/content/level-exams";

export interface ExamFeedback {
  summary_pt: string;
  strengths_pt: string[];
  improve_pt: string[];
  corrections: { original: string; corrected: string; explanation_pt: string }[];
}

const str = (x: unknown) => (typeof x === "string" ? x.trim() : "");
const arr = (x: unknown) => (Array.isArray(x) ? x : []);
const num = (x: unknown) => {
  const n = typeof x === "number" ? x : Number(x);
  return Number.isFinite(n) ? Math.min(5, Math.max(0, n)) : 0;
};

function feedbackFrom(o: Record<string, unknown>): ExamFeedback {
  return {
    summary_pt: str(o.summary_pt),
    strengths_pt: arr(o.strengths_pt).map(str).filter(Boolean).slice(0, 3),
    improve_pt: arr(o.improve_pt).map(str).filter(Boolean).slice(0, 4),
    corrections: arr(o.corrections)
      .map((c) => c as Record<string, unknown>)
      .map((c) => ({ original: str(c.original), corrected: str(c.corrected), explanation_pt: str(c.explanation_pt) }))
      .filter((c) => c.corrected && c.corrected !== c.original)
      .slice(0, 5),
  };
}

const RUBRIC_RULES = `Score each criterion from 0 to 5 AGAINST THE TARGET LEVEL (3 = meets the level, 4 = clearly above, 5 = well above, 2 = below, 0-1 = far below or off-task).
Be fair but strict: an exam must show the student really works at this level. The transcript comes from speech recognition: ignore small recognition errors and never invent mistakes.`;

/** Avalia as duas respostas faladas da parte Speaking. */
export async function evaluateSpeaking(exam: LevelExam, answers: { prompt: string; transcript: string; wpm: number; pauses: number; words: number }[]) {
  const system = `You are a CEFR speaking examiner for a Brazilian learner taking the ${exam.level} level exam.
${RUBRIC_RULES}
Criteria: range (vocabulary and structures), accuracy (grammar), fluency (flow, hesitation), coherence (organization, connectors), task (answers the prompt fully).
Reply ONLY with JSON:
{"answers":[{"range":0,"accuracy":0,"fluency":0,"coherence":0,"task":0}, {...}],
 "summary_pt":"2 sentences in Brazilian Portuguese with an honest overall verdict",
 "strengths_pt":["up to 2"],"improve_pt":["up to 3 concrete points to improve, in Portuguese"],
 "corrections":[{"original":"student's phrase","corrected":"correct English","explanation_pt":"short reason"}]}
"answers" must have exactly ${answers.length} items in the same order. At most 5 corrections.`;
  const user = answers
    .map((a, i) => `Answer ${i + 1}\nPrompt: ${a.prompt}\nTranscript: """${a.transcript.slice(0, 2000)}"""\n${a.words} words · ${a.wpm} words/min · ${a.pauses} long pauses`)
    .join("\n\n");
  const raw = await chatCompletion(
    [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    { json: true, temperature: 0.2, maxTokens: 2000 },
  );
  const o = parseJsonObject(raw);
  if (!o) return null;
  const rubrics = arr(o.answers).map((r) => {
    const x = (r ?? {}) as Record<string, unknown>;
    return { range: num(x.range), accuracy: num(x.accuracy), fluency: num(x.fluency), coherence: num(x.coherence), task: num(x.task) };
  });
  if (rubrics.length !== answers.length) return null;
  return { rubrics, feedback: feedbackFrom(o) };
}

export interface ExamTurn {
  role: "examiner" | "student";
  text: string;
  voice?: boolean;
}

/** Próxima fala do examinador (uma conversa de verdade, não um roteiro fixo). */
export async function examinerReply(exam: LevelExam, turns: ExamTurn[], remaining: number) {
  const system = `${exam.conversation.examiner}
This is a speaking exam conversation with a Brazilian learner (target level ${exam.level}). Situation: ${exam.conversation.title}.
Stay in character. React naturally to what the student actually said, then move the conversation forward with ONE question or prompt.
Do not correct the student and do not switch to Portuguese. If the student's message is unclear, ask them to clarify, like a real person would.
Keep it to 1–3 sentences. ${remaining <= 1 ? "This is your last turn: ask a final question that lets the student close the conversation." : ""}
Reply with the line only, no quotes or labels.`;
  const messages = [
    { role: "system" as const, content: system },
    ...turns.map((t) => ({ role: t.role === "examiner" ? ("assistant" as const) : ("user" as const), content: t.text })),
  ];
  const raw = await chatCompletion(messages, { temperature: 0.7, maxTokens: 400 });
  return raw.replace(/^["“]|["”]$/g, "").trim();
}

/** Avalia a conversa inteira no fim da parte Conversation. */
export async function evaluateConversation(exam: LevelExam, turns: ExamTurn[]) {
  const system = `You are a CEFR examiner assessing the interactive speaking (conversation) part of the ${exam.level} exam for a Brazilian learner.
Situation: ${exam.conversation.title} — goal: ${exam.conversation.goal_pt}
${RUBRIC_RULES}
Criteria: interaction (keeps the conversation going, asks/answers, turn-taking), comprehension (understands and responds to what was said), accuracy (grammar), range (vocabulary and structures), task (achieves the goal of the situation).
Reply ONLY with JSON:
{"rubric":{"interaction":0,"comprehension":0,"accuracy":0,"range":0,"task":0},
 "summary_pt":"2 sentences in Brazilian Portuguese with an honest verdict",
 "strengths_pt":["up to 2"],"improve_pt":["up to 3 concrete points, in Portuguese"],
 "corrections":[{"original":"student's phrase","corrected":"correct English","explanation_pt":"short reason"}]}`;
  const transcript = turns.map((t) => `${t.role === "examiner" ? "EXAMINER" : "STUDENT"}: ${t.text}`).join("\n");
  const raw = await chatCompletion(
    [
      { role: "system", content: system },
      { role: "user", content: transcript.slice(0, 8000) },
    ],
    { json: true, temperature: 0.2, maxTokens: 1800 },
  );
  const o = parseJsonObject(raw);
  if (!o) return null;
  const r = (o.rubric ?? {}) as Record<string, unknown>;
  const rubric = { interaction: num(r.interaction), comprehension: num(r.comprehension), accuracy: num(r.accuracy), range: num(r.range), task: num(r.task) };
  return { rubric, feedback: feedbackFrom(o) };
}
