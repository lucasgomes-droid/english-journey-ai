import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { CefrLevel } from "@/content/types";
import { chatCompletion } from "@/lib/ai";

export { parseJsonObject, normalizeFeedback, type SpeakingFeedback } from "@/lib/speaking-parse";
import { normalizeFeedback, parseJsonObject } from "@/lib/speaking-parse";

export async function speakingFeedback(input: { level: CefrLevel; topic: string; transcript: string; wpm: number; pauses: number; fillers: number; seconds: number }) {
  const system = `You are an English speaking coach for a Brazilian learner at CEFR level ${input.level}.
The student answered a speaking prompt out loud. You get the automatic transcript (it may contain recognition errors; ignore small ones and do not invent mistakes).
Reply ONLY with a JSON object:
{
 "summary_pt": "2 short sentences in Brazilian Portuguese: how the answer went, encouraging and honest",
 "strengths_pt": ["up to 2 concrete things done well, in Portuguese"],
 "improved": "a natural, fluent version of what the student tried to say, one level above ${input.level}, max 90 words, in English",
 "mistakes": [{"original": "student's phrase", "corrected": "correct English", "pt": "Portuguese translation of the corrected phrase", "explanation_pt": "short reason in Portuguese"}],
 "phrases": [{"en": "useful natural phrase for this topic", "pt": "Portuguese translation"}],
 "next_step_pt": "one concrete thing to practice next time, in Portuguese"
}
Rules: at most 4 mistakes (the most important ones; grammar or word choice that a listener would notice); exactly 3 phrases the student could have used; keep everything appropriate for ${input.level}.`;
  const user = `Prompt: ${input.topic}
Transcript: """${input.transcript.slice(0, 2500)}"""
Speaking time: ${Math.round(input.seconds)} s · ${input.wpm} words/min · ${input.pauses} long pauses · ${input.fillers} fillers (um/uh).`;
  const raw = await chatCompletion(
    [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    { json: true, temperature: 0.4, maxTokens: 2200 },
  );
  return normalizeFeedback(parseJsonObject(raw));
}

/** Salva frases no banco pessoal e agenda a revisão delas. */
export async function savePhrases(supabase: SupabaseClient, userId: string, topic: string, source: "life" | "speaking" | "conversation" | "listening" | "vocab", phrases: { en: string; pt: string }[]) {
  if (!phrases.length) return [];
  const { data, error } = await supabase
    .from("personal_phrases")
    .insert(phrases.map((p) => ({ user_id: userId, topic: topic.slice(0, 120), source, en: p.en.slice(0, 300), pt: p.pt.slice(0, 300) })))
    .select("id, en, pt, topic");
  if (error || !data) return [];
  const due = new Date(Date.now() + 6 * 3600_000).toISOString();
  await supabase.from("review_items").upsert(
    data.map((r) => ({ user_id: userId, item_type: "phrase", item_id: `ph-${r.id}`, due_at: due })),
    { onConflict: "user_id,item_type,item_id", ignoreDuplicates: true },
  );
  return data;
}
