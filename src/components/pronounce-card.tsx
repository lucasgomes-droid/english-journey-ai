"use client";

import { useState } from "react";
import { Mic, Square, RotateCcw, Snail, Volume2, Loader2 } from "lucide-react";
import { useVoiceRecorder } from "@/lib/voice-recorder";
import { unlockAudio, useVoice, useVoiceCaps } from "@/lib/voice";
import { PHONEME_TIPS } from "@/lib/word-check";

export interface PronResult {
  method: "azure" | "words";
  recognized: string;
  overall: number | null;
  accuracy: number | null;
  fluency: number | null;
  completeness: number | null;
  prosody: number | null;
  words: { word: string; accuracy: number; errorType: string; phonemes: { phoneme: string; score: number }[] }[];
}

const tone = (n: number) => (n >= 80 ? "text-correct" : n >= 60 ? "text-[#b7791f]" : "text-wrong");
const bg = (n: number) => (n >= 80 ? "bg-correct-bg" : n >= 60 ? "bg-boarding/25" : "bg-wrong-bg");

/** Ouvir → repetir → nota por palavra e por som. */
export function PronounceCard({
  text,
  translation,
  say,
  context,
  onResult,
}: {
  text: string;
  translation?: string;
  say?: string;
  context?: string;
  onResult?: (score: number) => void;
}) {
  const caps = useVoiceCaps();
  const { speak } = useVoice();
  const rec = useVoiceRecorder({ silenceMs: 1100, maxSeconds: 25, noSpeechTimeoutMs: 8000 });
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<PronResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tipWord, setTipWord] = useState<number | null>(null);

  async function record() {
    unlockAudio();
    setError(null);
    setTipWord(null);
    if (rec.active) {
      rec.stop();
      return;
    }
    const wav = await rec.listen();
    if (!wav) {
      if (!rec.error) setError("Não ouvi nada. Toque no microfone e fale a frase.");
      return;
    }
    setBusy(true);
    try {
      const form = new FormData();
      form.append("audio", wav, "speech.wav");
      form.append("text", text);
      if (context) form.append("context", context);
      const res = await fetch("/api/pronunciation", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Falha ao avaliar.");
      setResult(data);
      onResult?.(data.overall ?? data.completeness ?? 0);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const score = result ? (result.overall ?? result.completeness ?? 0) : null;
  const weak = result?.words
    .map((w, i) => ({ ...w, i }))
    .filter((w) => w.accuracy < 70)
    .flatMap((w) => w.phonemes.filter((p) => p.score < 60 && PHONEME_TIPS[p.phoneme]).map((p) => p.phoneme));
  const tips = Array.from(new Set(weak ?? [])).slice(0, 3);

  return (
    <div className="panel p-5">
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-display text-2xl font-bold leading-snug" lang="en">
            {result && result.method === "azure"
              ? result.words.length
                ? result.words.map((w, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setTipWord(i);
                        speak(w.word, { rate: 0.8 });
                      }}
                      className={`mr-1.5 rounded-md px-1 ${bg(w.accuracy)} ${tone(w.accuracy)} ${w.errorType === "Omission" ? "line-through" : ""}`}
                      title={`${w.accuracy}%`}
                    >
                      {w.word}
                    </button>
                  ))
                : text
              : text}
          </p>
          {translation && <p className="mt-1 text-muted">{translation}</p>}
          {say && <p className="text-sm text-atlantic">/{say}/</p>}
        </div>
        {score !== null && (
          <div
            className={`grid size-16 shrink-0 place-items-center rounded-full border-4 text-center font-display font-bold leading-none ${tone(score)} ${score >= 80 ? "border-correct" : score >= 60 ? "border-boarding" : "border-wrong"}`}
            title={result?.method === "azure" ? "Nota de pronúncia (0–100)" : "Palavras reconhecidas"}
          >
            {result?.method === "azure" ? (
              <span className="text-xl">{score}</span>
            ) : (
              <span className="text-base">
                {score}%<span className="block text-[0.6rem] font-normal">palavras</span>
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button type="button" className="btn-ghost px-3" onClick={() => (unlockAudio(), speak(text))} aria-label="Ouvir o modelo">
          <Volume2 size={18} aria-hidden /> Ouvir
        </button>
        <button type="button" className="btn-ghost px-3" onClick={() => (unlockAudio(), speak(text, { rate: 0.7 }))} aria-label="Ouvir devagar">
          <Snail size={18} aria-hidden />
        </button>
        <button
          type="button"
          onClick={record}
          disabled={busy || !caps.stt}
          className={`btn ${rec.active ? "bg-wrong text-white" : "bg-boarding text-boarding-ink"} relative`}
          aria-label={rec.active ? "Parar gravação" : "Gravar sua fala"}
        >
          {busy ? <Loader2 size={18} className="animate-spin" aria-hidden /> : rec.active ? <Square size={16} aria-hidden /> : result ? <RotateCcw size={18} aria-hidden /> : <Mic size={18} aria-hidden />}
          {busy ? "Analisando…" : rec.active ? (rec.state === "speaking" ? "Ouvindo…" : "Fale agora") : result ? "Tentar de novo" : "Repetir em voz alta"}
          {rec.active && <span className="absolute inset-0 rounded-xl ring-4 ring-wrong/40" style={{ opacity: 0.3 + rec.level * 0.7 }} aria-hidden />}
        </button>
      </div>

      {(error || rec.error) && <p className="mt-3 rounded-xl bg-wrong-bg px-3 py-2 text-sm text-wrong">{error ?? rec.error}</p>}
      {!caps.stt && <p className="mt-3 text-sm text-muted">O reconhecimento de voz ainda não foi ativado no servidor.</p>}

      {result && (
        <div className="mt-4 space-y-3 text-sm">
          {result.method === "azure" ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                ["Precisão dos sons", result.accuracy],
                ["Fluência", result.fluency],
                ["Ritmo e entonação", result.prosody],
                ["Completude", result.completeness],
              ].map(([label, v]) => (
                <div key={label as string} className="rounded-xl bg-surface-2 p-2 text-center">
                  <p className={`font-display text-lg font-bold ${typeof v === "number" ? tone(v) : ""}`}>{v ?? "—"}</p>
                  <p className="text-muted">{label}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-surface-2 p-3 text-muted">
              <p>
                Verificação de palavras: {result.completeness}% das palavras foram reconhecidas. Ainda não é uma nota de pronúncia por som; ela aparece quando a análise fonética estiver ativada.
              </p>
              {result.words.some((w) => w.accuracy === 0) && (
                <p className="mt-1">
                  Não reconhecidas:{" "}
                  {result.words
                    .filter((w) => w.accuracy === 0)
                    .map((w) => w.word)
                    .join(", ")}
                </p>
              )}
            </div>
          )}
          {tipWord !== null && result.words[tipWord] && result.words[tipWord].phonemes.length > 0 && (
            <p className="rounded-xl border border-line p-3">
              <strong lang="en">{result.words[tipWord].word}</strong>:{" "}
              {result.words[tipWord].phonemes.map((p, i) => (
                <span key={i} className={`mr-1 font-mono ${tone(p.score)}`} title={`${p.score}%`}>
                  /{p.phoneme}/
                </span>
              ))}
            </p>
          )}
          {tips.length > 0 && (
            <ul className="space-y-1.5">
              {tips.map((p) => (
                <li key={p} className="rounded-xl bg-boarding/15 p-3">
                  <span className="font-mono font-bold">/{p}/</span> {PHONEME_TIPS[p]}
                </li>
              ))}
            </ul>
          )}
          <p className="text-xs text-muted">
            {result.method === "azure" ? "Notas estimadas de pronúncia e inteligibilidade (0–100). Toque numa palavra para ouvir e ver os sons." : `Entendido: “${result.recognized}”`}
          </p>
        </div>
      )}
    </div>
  );
}
