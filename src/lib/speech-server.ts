import "server-only";
import { aiConfig } from "@/lib/ai";

/**
 * Serviços de fala no servidor:
 * - Voz natural (TTS): Azure Neural (se configurado) → Groq Orpheus (usa a chave da IA) → navegador.
 * - Avaliação de pronúncia: Azure Pronunciation Assessment (análise fonética real).
 */
export const azure = {
  key: process.env.AZURE_SPEECH_KEY || "",
  region: process.env.AZURE_SPEECH_REGION || "",
};
export const isAzureConfigured = () => Boolean(azure.key && azure.region);

export type VoiceId = "f1" | "f2" | "f3" | "m1" | "m2" | "m3";

const AZURE_VOICES: Record<VoiceId, string> = {
  f1: "en-US-AvaNeural",
  f2: "en-US-JennyNeural",
  f3: "en-GB-SoniaNeural",
  m1: "en-US-AndrewNeural",
  m2: "en-US-GuyNeural",
  m3: "en-GB-RyanNeural",
};
const GROQ_VOICES: Record<VoiceId, string> = { f1: "autumn", f2: "diana", f3: "hannah", m1: "austin", m2: "daniel", m3: "troy" };

export function ttsProvider(): "azure" | "groq" | "none" {
  const pref = process.env.TTS_PROVIDER;
  if (pref === "none" || pref === "browser") return "none";
  if (isAzureConfigured() && pref !== "groq") return "azure";
  if (aiConfig.apiKey && (aiConfig.baseUrl.includes("groq.com") || pref === "groq")) return "groq";
  return "none";
}

const escapeXml = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);

export class SpeechError extends Error {
  constructor(
    message: string,
    public status = 502,
  ) {
    super(message);
  }
}

/** Gera áudio para um trecho de até ~200 caracteres. Retorna bytes + content-type. */
export async function synthesize(text: string, voice: VoiceId): Promise<{ body: ArrayBuffer; type: string }> {
  const provider = ttsProvider();
  if (provider === "azure") {
    const name = AZURE_VOICES[voice] ?? AZURE_VOICES.f1;
    const ssml = `<speak version="1.0" xml:lang="en-US"><voice name="${name}">${escapeXml(text)}</voice></speak>`;
    const res = await fetch(`https://${azure.region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": azure.key,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
        "User-Agent": "english-journey-ai",
      },
      body: ssml,
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) throw new SpeechError(`Azure TTS ${res.status}`, res.status === 429 ? 429 : 502);
    return { body: await res.arrayBuffer(), type: "audio/mpeg" };
  }
  if (provider === "groq") {
    const res = await fetch(`${aiConfig.baseUrl}/audio/speech`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${aiConfig.apiKey}` },
      body: JSON.stringify({ model: process.env.TTS_MODEL || "canopylabs/orpheus-v1-english", voice: GROQ_VOICES[voice] ?? "autumn", input: text, response_format: "wav" }),
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new SpeechError(`Groq TTS ${res.status}: ${detail.slice(0, 160)}`, res.status === 429 ? 429 : 502);
    }
    return { body: await res.arrayBuffer(), type: "audio/wav" };
  }
  throw new SpeechError("Voz natural não configurada.", 503);
}

// ---------------------------------------------------------------------------
// Avaliação de pronúncia (Azure)
// ---------------------------------------------------------------------------

export interface PhonemeScore {
  phoneme: string;
  score: number;
}
export interface WordScore {
  word: string;
  accuracy: number;
  errorType: string;
  phonemes: PhonemeScore[];
}
export interface PronunciationResult {
  method: "azure" | "words";
  recognized: string;
  overall: number | null;
  accuracy: number | null;
  fluency: number | null;
  completeness: number | null;
  prosody: number | null;
  words: WordScore[];
}

type AzureWord = {
  Word: string;
  AccuracyScore?: number;
  ErrorType?: string;
  PronunciationAssessment?: { AccuracyScore?: number; ErrorType?: string };
  Phonemes?: { Phoneme: string; AccuracyScore?: number; PronunciationAssessment?: { AccuracyScore?: number } }[];
};
type AzureNBest = {
  Display?: string;
  AccuracyScore?: number;
  FluencyScore?: number;
  CompletenessScore?: number;
  ProsodyScore?: number;
  PronScore?: number;
  PronunciationAssessment?: { AccuracyScore?: number; FluencyScore?: number; CompletenessScore?: number; ProsodyScore?: number; PronScore?: number };
  Words?: AzureWord[];
};

const r1 = (n: number | undefined | null) => (typeof n === "number" ? Math.round(n) : null);

export async function assessPronunciation(wav: Blob, referenceText: string): Promise<PronunciationResult> {
  if (!isAzureConfigured()) throw new SpeechError("Avaliação de pronúncia não configurada.", 503);
  const params = {
    ReferenceText: referenceText,
    GradingSystem: "HundredMark",
    Granularity: "Phoneme",
    Dimension: "Comprehensive",
    EnableMiscue: "True",
    EnableProsodyAssessment: "True",
    PhonemeAlphabet: "IPA",
  };
  const header = Buffer.from(JSON.stringify(params), "utf8").toString("base64");
  const res = await fetch(
    `https://${azure.region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US&format=detailed`,
    {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": azure.key,
        "Content-Type": "audio/wav; codecs=audio/pcm; samplerate=16000",
        Accept: "application/json",
        "Pronunciation-Assessment": header,
      },
      body: await wav.arrayBuffer(),
      signal: AbortSignal.timeout(30_000),
    },
  );
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new SpeechError(`Azure respondeu ${res.status}. ${detail.slice(0, 160)}`, res.status === 429 ? 429 : 502);
  }
  const data = (await res.json()) as { RecognitionStatus?: string; NBest?: AzureNBest[] };
  if (data.RecognitionStatus !== "Success" || !data.NBest?.length) {
    throw new SpeechError("Não consegui ouvir sua fala. Fale mais perto do microfone e tente de novo.", 422);
  }
  const b = data.NBest[0];
  const pa = b.PronunciationAssessment ?? b;
  return {
    method: "azure",
    recognized: b.Display ?? "",
    overall: r1(pa.PronScore),
    accuracy: r1(pa.AccuracyScore),
    fluency: r1(pa.FluencyScore),
    completeness: r1(pa.CompletenessScore),
    prosody: r1(pa.ProsodyScore),
    words: (b.Words ?? []).map((w) => ({
      word: w.Word,
      accuracy: Math.round(w.PronunciationAssessment?.AccuracyScore ?? w.AccuracyScore ?? 0),
      errorType: w.PronunciationAssessment?.ErrorType ?? w.ErrorType ?? "None",
      phonemes: (w.Phonemes ?? []).map((p) => ({ phoneme: p.Phoneme, score: Math.round(p.PronunciationAssessment?.AccuracyScore ?? p.AccuracyScore ?? 0) })),
    })),
  };
}
