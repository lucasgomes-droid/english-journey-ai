import "server-only";
import { chatCompletion } from "@/lib/ai";
import { parseJsonObject } from "@/lib/speaking-parse";

const str = (x: unknown) => (typeof x === "string" ? x.trim() : "");
const pairs = (x: unknown, a: string, b: string) =>
  (Array.isArray(x) ? x : [])
    .map((y) => y as Record<string, unknown>)
    .map((y) => ({ [a]: str(y[a]), [b]: str(y[b]) }) as Record<string, string>)
    .filter((y) => y[a] && y[b])
    .slice(0, 6);

export interface TranslateResult {
  translation_pt: string;
  expressions: { en: string; meaning_pt: string }[];
  words: { en: string; pt: string }[];
}

/** Tradução para o português do Brasil, explicando expressões que não se traduzem ao pé da letra. */
export async function translateForLearner(text: string, level: string): Promise<TranslateResult | null> {
  const raw = await chatCompletion(
    [
      {
        role: "system",
        content: `You help a Brazilian learner (CEFR ${level}) understand English. Reply ONLY with JSON:
{"translation_pt":"natural Brazilian Portuguese translation",
 "expressions":[{"en":"idiom or phrase whose meaning differs from the literal translation","meaning_pt":"what it really means, in Portuguese"}],
 "words":[{"en":"key word likely new at this level","pt":"meaning in Portuguese"}]}
Use empty arrays when there is nothing worth explaining. At most 3 expressions and 5 words.`,
      },
      { role: "user", content: text.slice(0, 800) },
    ],
    { json: true, temperature: 0.2, maxTokens: 900 },
  );
  const o = parseJsonObject(raw);
  if (!o || !str(o.translation_pt)) return null;
  return { translation_pt: str(o.translation_pt), expressions: pairs(o.expressions, "en", "meaning_pt") as TranslateResult["expressions"], words: pairs(o.words, "en", "pt") as TranslateResult["words"] };
}

export interface ExplainResult {
  explanation_pt: string;
  examples: { en: string; pt: string }[];
  answer_tip_pt: string;
}

/** Botão "Não entendi": explica em português simples, com exemplos. */
export async function explainForLearner(text: string, context: string, level: string): Promise<ExplainResult | null> {
  const raw = await chatCompletion(
    [
      {
        role: "system",
        content: `You are a patient English teacher for a Brazilian learner (CEFR ${level}) who pressed "I didn't understand".
Explain the content below in simple Brazilian Portuguese: what it means and the key idea (grammar or vocabulary) in 2–4 short sentences, no jargon.
Then give 2 very simple examples and, if the student has to answer or do something, a tip on how to answer (in Portuguese, with an English model answer in quotes).
Reply ONLY with JSON: {"explanation_pt":"...","examples":[{"en":"...","pt":"..."}],"answer_tip_pt":"... or empty"}`,
      },
      { role: "user", content: `Context: ${context.slice(0, 600)}\nContent: ${text.slice(0, 800)}` },
    ],
    { json: true, temperature: 0.3, maxTokens: 900 },
  );
  const o = parseJsonObject(raw);
  if (!o || !str(o.explanation_pt)) return null;
  return { explanation_pt: str(o.explanation_pt), examples: pairs(o.examples, "en", "pt") as ExplainResult["examples"], answer_tip_pt: str(o.answer_tip_pt) };
}
