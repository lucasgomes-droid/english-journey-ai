import { NextResponse } from "next/server";
import { currentUser } from "@/lib/supabase/server";
import { AiError, transcribe } from "@/lib/ai";
import { assessPronunciation, isAzureConfigured, SpeechError, type PronunciationResult } from "@/lib/speech-server";
import { wordCheck } from "@/lib/word-check";
import { recordActivity } from "@/lib/progress";
import type { Profile } from "@/lib/data";

export const maxDuration = 60;
const MAX_BYTES = 2 * 1024 * 1024; // ~60 s de WAV 16 kHz

export async function POST(req: Request) {
  const { supabase, user } = await currentUser();
  if (!user) return NextResponse.json({ error: "Faça login novamente." }, { status: 401 });

  const form = await req.formData().catch(() => null);
  const audio = form?.get("audio");
  const text = String(form?.get("text") ?? "").trim().slice(0, 300);
  const context = String(form?.get("context") ?? "").slice(0, 60);
  if (!(audio instanceof Blob) || !audio.size || !text) return NextResponse.json({ error: "Áudio ou frase ausente." }, { status: 400 });
  if (audio.size > MAX_BYTES) return NextResponse.json({ error: "Gravação longa demais (máx. 30 s)." }, { status: 413 });

  let result: PronunciationResult;
  try {
    if (isAzureConfigured()) {
      result = await assessPronunciation(audio, text);
    } else {
      // Sem análise fonética: confere só se as palavras foram reconhecidas.
      const recognized = await transcribe(audio, "speech.wav");
      const check = wordCheck(text, recognized);
      result = { method: "words", recognized, overall: null, accuracy: null, fluency: null, completeness: check.completeness, prosody: null, words: check.words };
    }
  } catch (e) {
    const err = e instanceof SpeechError || e instanceof AiError ? e : new SpeechError("Falha ao avaliar a fala.");
    return NextResponse.json({ error: err.message }, { status: err.status });
  }

  // Salva a tentativa (base da evolução da pronúncia) e dá XP pela prática.
  const [, profileRes] = await Promise.all([
    supabase.from("pronunciation_attempts").insert({
      user_id: user.id,
      reference_text: text,
      provider: result.method === "azure" ? "azure" : "whisper-words",
      overall: result.overall,
      accuracy: result.accuracy,
      fluency: result.fluency,
      completeness: result.completeness,
      prosody: result.prosody,
      details: { words: result.words, recognized: result.recognized, context },
    }),
    supabase.from("profiles").select("*").eq("id", user.id).single<Profile>(),
  ]);
  if (profileRes.data) {
    await recordActivity(supabase, profileRes.data, { kind: "pronunciation", ref: context || undefined, title: `Pronúncia: ${text.slice(0, 40)}`, xp: 1, durationSeconds: 15, score: result.overall ?? result.completeness });
  }
  return NextResponse.json(result);
}
