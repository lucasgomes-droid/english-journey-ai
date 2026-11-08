import { isTrivialCorrection, NO_FALSE_CORRECTIONS } from "@/lib/correction-filter";
import "server-only";
import { chatCompletion } from "@/lib/ai";
import { parseJsonObject } from "@/lib/speaking-parse";

export interface ProductionFeedback {
  score: number;
  used_target: boolean;
  feedback_pt: string;
  corrected: string;
  mistakes: { original: string; corrected: string; explanation_pt: string }[];
}

/** Corrige a produção livre do fim da aula: o aluno usou o que a aula ensinou? */
export async function productionFeedback(input: { level: string; objective: string; target: string[]; text: string; mode: "write" | "speak" }): Promise<ProductionFeedback | null> {
  const raw = await chatCompletion(
    [
      {
        role: "system",
        content: `You are a kind, precise English teacher for a Brazilian learner (CEFR ${input.level}).
At the end of a lesson the student ${input.mode === "speak" ? "SPOKE (automatic transcript; ignore small recognition errors)" : "WROTE"} a few sentences about their own life, to practice the lesson objective.
Lesson objective (Portuguese): ${input.objective}
Target language from the lesson: ${input.target.join(", ")}
Reply ONLY with JSON:
{"score": 0-100 (communication + correct use of the lesson's language, fair for ${input.level}),
 "used_target": true if the student actually used the lesson's language,
 "feedback_pt": "2 short sentences in Brazilian Portuguese: what was good and the one thing to improve",
 "corrected": "the student's text corrected and natural, same meaning, same level",
 "mistakes": [{"original":"...", "corrected":"...", "explanation_pt":"motivo curto"}] (max 3, only real mistakes; [] if none)}
${NO_FALSE_CORRECTIONS}`,
      },
      { role: "user", content: input.text.slice(0, 1200) },
    ],
    { json: true, purpose: "turn", temperature: 0.3, maxTokens: 900 },
  );
  const o = parseJsonObject(raw);
  if (!o) return null;
  const str = (x: unknown) => (typeof x === "string" ? x.trim() : "");
  const score = Math.max(0, Math.min(100, Math.round(Number(o.score))));
  if (!Number.isFinite(score)) return null;
  return {
    score,
    used_target: o.used_target === true,
    feedback_pt: str(o.feedback_pt).slice(0, 400),
    corrected: str(o.corrected).slice(0, 1200),
    mistakes: (Array.isArray(o.mistakes) ? o.mistakes : [])
      .map((m) => m as Record<string, unknown>)
      .filter((m) => str(m.original) && str(m.corrected) && !isTrivialCorrection(str(m.original), str(m.corrected)))
      .slice(0, 3)
      .map((m) => ({ original: str(m.original), corrected: str(m.corrected), explanation_pt: str(m.explanation_pt) })),
  };
}

/** A produção conta como acerto de domínio quando comunica bem e usa o conteúdo da aula. */
export const productionPassed = (f: Pick<ProductionFeedback, "score" | "used_target">) => f.score >= 70 && f.used_target;
