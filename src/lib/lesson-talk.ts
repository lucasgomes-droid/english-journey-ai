/**
 * "Conversa da aula": 3 a 5 falas com o Alex sobre o tema que acabou de ser estudado.
 * A1–A2: guiada (ele pergunta o que obriga a usar o conteúdo). B1+: conversa natural sobre o tema.
 * No fim, um mini-resultado: quais estruturas da aula você usou e o que faltou.
 */
import type { CefrLevel, Lesson } from "@/content/types";
import { LEVEL_GUIDE, PT_POLICY } from "@/lib/tutor-prompt";
import { NO_FALSE_CORRECTIONS, normalizeSentence } from "@/lib/correction-filter";

export const TALK_TURNS = 4;

export const isGuided = (level: CefrLevel) => level === "A1" || level === "A2";

/** O que a aula quer que o aluno use: vocabulário e frases-modelo. */
export function lessonTargets(lesson: Lesson): string[] {
  return [...lesson.examples.slice(0, 5).map((e) => e.en), ...lesson.vocabulary.slice(0, 8).map((v) => v.en)];
}

/** Perguntas (frases com "?") que o Alex já fez, para não repetir. */
export function askedQuestions(turns: { role: string; content: string }[]): string[] {
  return turns
    .filter((t) => t.role === "assistant")
    .flatMap((t) => t.content.match(/[^.!?]*\?/g) ?? [])
    .map((q) => q.trim())
    .filter(Boolean);
}

/** A resposta repete uma pergunta que o Alex já fez? */
export function repeatsQuestion(reply: string, asked: string[]): boolean {
  const seen = new Set(asked.map(normalizeSentence));
  return (reply.match(/[^.!?]*\?/g) ?? []).some((q) => seen.has(normalizeSentence(q)));
}

/** Próxima pergunta da própria aula ainda não feita (plano B quando o modelo insiste em repetir). */
export function nextLessonQuestion(lesson: Lesson, asked: string[]): string | null {
  const seen = new Set(asked.map(normalizeSentence));
  const qs = [...lesson.examples.map((e) => e.en), ...(lesson.conversation ? [lesson.conversation.starter] : [])].flatMap((t) => t.match(/[^.!?]*\?/g) ?? []).map((q) => q.trim());
  return qs.find((q) => q.split(" ").length <= 12 && !seen.has(normalizeSentence(q))) ?? null;
}

export function talkSystemPrompt(lesson: Lesson, level: CefrLevel, studentName: string, asked: string[] = []): string {
  const guided = isGuided(level);
  return `You are "Alex", a warm English teacher on a short voice call with ${studentName}, a Brazilian learner (CEFR ${level}), right after a lesson.
${LEVEL_GUIDE[level]}
${PT_POLICY[level]}
LESSON JUST STUDIED: "${lesson.title}" — objective (Portuguese): ${lesson.objective}
TARGET LANGUAGE to get the student to use: ${lessonTargets(lesson).join(" | ")}
${lesson.conversation ? `Conversation goal: ${lesson.conversation.goal}` : ""}

${guided
    ? "STYLE: GUIDED. Ask ONE short, personal question per turn that the student can only answer well by using the lesson's language (e.g. after a lesson on daily routine: 'What time do you get up?'). Use the lesson's words in your questions. Very simple English."
    : "STYLE: NATURAL. Have a natural, friendly conversation about the lesson's topic, reacting to what the student says, and create openings for them to use the lesson's structures without making it feel like a quiz. One question per turn."}
- Keep replies to 1–2 short sentences. The call lasts about ${TALK_TURNS} student turns: after the student's ${TALK_TURNS}th answer, wrap up warmly in one sentence (no new question).
- If the student asks YOU a question (e.g. "What's your name?", "How are you?"), ANSWER IT FIRST as Alex (you are Alex, an English teacher from Chicago; you are doing well), then ask a NEW question.
- "reply" must react to what the student said and MOVE THE CONVERSATION FORWARD with a NEW question about a different detail. Never repeat, rephrase or model the corrected sentence in "reply" (the "correction" field already handles it).
${asked.length ? `- Questions you ALREADY asked (NEVER ask them again, not even reworded): ${asked.map((q) => `"${q}"`).join(", ")}. The student already answered them.` : ""}
- Correct ONLY real mistakes in the student's LAST message, especially in the lesson's target language. Never invent mistakes; ignore capitalization/punctuation and likely speech-recognition slips.
${NO_FALSE_CORRECTIONS}

Respond ONLY with JSON:
{"reply": "what you say",
 "correction": null or {"original": "...", "corrected": "...", "explanation_pt": "explicação curta em português", "example": "one more short example with the corrected form"}}`;
}

export function talkReviewPrompt(lesson: Lesson, level: CefrLevel): string {
  return `You evaluate a short practice call between a teacher and a Brazilian learner (CEFR ${level}) right after the lesson "${lesson.title}" (objective: ${lesson.objective}).
Target language of the lesson: ${lessonTargets(lesson).join(" | ")}
Judge ONLY the student's lines (they come from speech recognition; ignore small recognition slips). Be fair for ${level}.
Reply ONLY with JSON:
{"score": 0-100 (how well the student communicated AND used the lesson's language),
 "used": ["up to 4 lesson words/structures the student actually used correctly, as short English phrases"],
 "missing": ["up to 2 lesson structures the student did not use or used wrongly"],
 "best_sentence": "the student's best sentence (corrected if needed)",
 "try_next": "one natural sentence the student could have said using the lesson's language",
 "feedback_pt": "1–2 frases em português: o que foi bem e o que treinar"}`;
}

export interface TalkReview {
  score: number;
  used: string[];
  missing: string[];
  best_sentence: string;
  try_next: string;
  feedback_pt: string;
}

/** A conversa conta como domínio quando comunica bem e usa algo da aula. */
export const talkPassed = (r: Pick<TalkReview, "score" | "used">) => r.score >= 70 && r.used.length > 0;

export function parseTalkReview(o: Record<string, unknown> | null): TalkReview | null {
  if (!o) return null;
  const str = (x: unknown) => (typeof x === "string" ? x.trim() : "");
  const list = (x: unknown, n: number) => (Array.isArray(x) ? x.map(str).filter(Boolean).slice(0, n) : []);
  const score = Math.round(Number(o.score));
  if (!Number.isFinite(score)) return null;
  return {
    score: Math.max(0, Math.min(100, score)),
    used: list(o.used, 4),
    missing: list(o.missing, 2),
    best_sentence: str(o.best_sentence).slice(0, 200),
    try_next: str(o.try_next).slice(0, 200),
    feedback_pt: str(o.feedback_pt).slice(0, 400),
  };
}
