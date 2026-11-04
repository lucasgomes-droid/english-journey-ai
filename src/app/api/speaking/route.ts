import { NextResponse } from "next/server";
import { currentUser } from "@/lib/supabase/server";
import { AiError, transcribe } from "@/lib/ai";
import { analyzeAudio, readWav, textStats, wordsPerMinute } from "@/lib/fluency";
import { savePhrases, speakingFeedback, type SpeakingFeedback } from "@/lib/speaking";
import { getTopic, WEEKLY_PROMPT } from "@/content/speaking-topics";
import { recordActivity } from "@/lib/progress";
import type { Profile } from "@/lib/data";

export const maxDuration = 60;
const MAX_BYTES = 4_300_000; // ~2 min de WAV 16 kHz (limite de envio da Vercel é 4,5 MB)

/** Fala livre: desafio de 1 minuto ou gravação semanal. Mede o ritmo e pede um retorno à IA. */
export async function POST(req: Request) {
  const { supabase, user } = await currentUser();
  if (!user) return NextResponse.json({ error: "Faça login novamente." }, { status: 401 });

  const form = await req.formData().catch(() => null);
  const audio = form?.get("audio");
  const kind = form?.get("kind") === "weekly" ? "weekly" : "fluency";
  const topic = kind === "weekly" ? null : getTopic(String(form?.get("topic") ?? ""));
  if (!(audio instanceof Blob) || !audio.size) return NextResponse.json({ error: "Áudio ausente." }, { status: 400 });
  if (kind === "fluency" && !topic) return NextResponse.json({ error: "Tema inválido." }, { status: 400 });
  if (audio.size > MAX_BYTES) return NextResponse.json({ error: "Gravação longa demais (máx. 2 minutos)." }, { status: 413 });

  const buf = await audio.arrayBuffer();
  const wav = readWav(buf);
  const stats = wav ? analyzeAudio(wav.samples, wav.rate) : { seconds: 0, speechSeconds: 0, pauses: 0 };

  let transcript: string;
  try {
    // O prompt com hesitações faz o reconhecedor manter "um/uh" na transcrição (para contar).
    transcript = await transcribe(new Blob([buf], { type: "audio/wav" }), "speech.wav", "Um, so, uh, I think... well, you know, I mean...");
  } catch (e) {
    const err = e instanceof AiError ? e : new AiError("Falha ao reconhecer a fala.", 502);
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
  const text = textStats(transcript);
  if (text.words < 4) return NextResponse.json({ error: "Quase não entendi o que você disse. Fale mais perto do microfone e por pelo menos 20 segundos." }, { status: 422 });
  const wpm = wordsPerMinute(text.words, stats.speechSeconds || stats.seconds);

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single<Profile>();
  if (!profile) return NextResponse.json({ error: "Perfil não encontrado." }, { status: 404 });
  const topicText = kind === "weekly" ? WEEKLY_PROMPT.en : topic!.en;

  let feedback: SpeakingFeedback | null = null;
  let feedbackError: string | null = null;
  try {
    feedback = await speakingFeedback({ level: profile.current_level, topic: topicText, transcript, wpm, pauses: stats.pauses, fillers: text.fillers, seconds: stats.speechSeconds });
    if (!feedback) feedbackError = "O professor não conseguiu analisar desta vez.";
  } catch (e) {
    feedbackError = e instanceof AiError ? e.message : "O professor não conseguiu analisar desta vez.";
  }

  // Gravação semanal: guarda o áudio para você ouvir sua evolução.
  let audioPath: string | null = null;
  if (kind === "weekly") {
    const path = `${user.id}/${Date.now()}.wav`;
    const up = await supabase.storage.from("recordings").upload(path, buf, { contentType: "audio/wav", upsert: false }).catch(() => null);
    if (up && !up.error) audioPath = path;
  }

  const { data: session, error } = await supabase
    .from("speaking_sessions")
    .insert({
      user_id: user.id,
      kind,
      topic: kind === "weekly" ? "weekly" : topic!.id,
      level_code: profile.current_level,
      transcript,
      seconds: Math.round(stats.seconds * 10) / 10,
      speech_seconds: Math.round(stats.speechSeconds * 10) / 10,
      words: text.words,
      unique_words: text.uniqueWords,
      wpm,
      pauses: stats.pauses,
      fillers: text.fillers,
      feedback,
      audio_path: audioPath,
    })
    .select("id")
    .single();
  if (error) return NextResponse.json({ error: `Falha ao salvar: ${error.message}` }, { status: 500 });

  // Correções e frases úteis vão para "Minhas frases" e para a revisão.
  const label = kind === "weekly" ? "Gravação semanal" : `Desafio: ${topic!.pt}`;
  const toSave = feedback ? [...feedback.mistakes.filter((m) => m.pt).map((m) => ({ en: m.corrected, pt: m.pt })), ...feedback.phrases] : [];
  await Promise.all([
    savePhrases(supabase, user.id, label, "speaking", toSave),
    recordActivity(supabase, profile, { kind: "speaking", ref: `speak:${session.id}`, title: kind === "weekly" ? "Gravação semanal" : `Desafio de 1 minuto: ${topic!.pt}`, xp: kind === "weekly" ? 20 : 10, durationSeconds: Math.round(stats.seconds) + 60 }),
  ]);

  return NextResponse.json({
    id: session.id,
    transcript,
    seconds: stats.seconds,
    speechSeconds: stats.speechSeconds,
    words: text.words,
    uniqueWords: text.uniqueWords,
    wpm,
    pauses: stats.pauses,
    fillers: text.fillers,
    feedback,
    feedbackError,
    audioSaved: Boolean(audioPath),
    savedPhrases: toSave.length,
  });
}
