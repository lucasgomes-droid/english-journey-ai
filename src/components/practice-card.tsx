"use client";

import { useState } from "react";
import { Loader2, Mic, Snail, Square, TrendingUp, Volume2 } from "lucide-react";
import { useVoiceRecorder } from "@/lib/voice-recorder";
import { unlockAudio, useVoice, useVoiceCaps } from "@/lib/voice";
import { judgeRepeat, wordSoundTips } from "@/lib/sound-tips";
import { Pt } from "@/components/pt";

export interface RepeatResult {
  verdict: "unclear" | "good" | "improve";
  score: number;
  recognized: string;
  missed: string[];
}

/** Envia a repetição para o reconhecedor e compara com a frase esperada. */
export async function checkRepeat(wav: Blob, text: string, context: string): Promise<RepeatResult> {
  const form = new FormData();
  form.append("audio", wav, "speech.wav");
  form.append("text", text);
  form.append("context", context);
  const res = await fetch("/api/pronunciation", { method: "POST", body: form });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Falha ao avaliar.");
  const score = (data.overall ?? data.completeness ?? 0) as number;
  const missed = ((data.words ?? []) as { word: string; accuracy: number }[]).filter((w) => w.accuracy < 70).map((w) => w.word);
  return { verdict: judgeRepeat(score, data.recognized ?? ""), score, recognized: data.recognized ?? "", missed };
}

/**
 * "Repita comigo" dentro da conversa: ouvir a frase certa, repetir, ver as palavras que não saíram
 * (com dica do som), tentar de novo e ver se melhorou. Se o reconhecedor não entendeu, pede para repetir
 * em vez de apontar erro de pronúncia.
 */
export function PracticeCard({ en, pt, context, rate = 1, external }: { en: string; pt: string; context: string; rate?: number; external?: RepeatResult[] }) {
  const caps = useVoiceCaps();
  const { speak } = useVoice();
  const rec = useVoiceRecorder({ silenceMs: 1100, maxSeconds: 20, noSpeechTimeoutMs: 8000 });
  const [busy, setBusy] = useState(false);
  const [own, setOwn] = useState<RepeatResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const attempts = [...(external ?? []), ...own];
  const last = attempts[attempts.length - 1];
  const judged = attempts.filter((a) => a.verdict !== "unclear");
  const improved = judged.length >= 2 && judged[judged.length - 1].score > judged[0].score;

  async function record() {
    unlockAudio();
    setError(null);
    if (rec.active) return rec.stop();
    const wav = await rec.listen();
    if (!wav) return;
    setBusy(true);
    try {
      const r = await checkRepeat(wav, en, context);
      setOwn((a) => [...a, r]);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-2 max-w-[92%] rounded-2xl border-2 border-boarding bg-boarding/10 p-3" aria-label="Repita comigo">
      <p className="text-xs font-bold uppercase tracking-wide text-muted">Repita comigo</p>
      <p className="mt-0.5 font-display text-lg font-bold" lang="en">
        {en}
      </p>
      {pt && (
        <p className="text-sm">
          <Pt>{pt}</Pt>
        </p>
      )}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => (unlockAudio(), speak(en, { rate }))} className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 text-sm font-bold" aria-label={`Ouvir: ${en}`}>
          <Volume2 size={16} aria-hidden /> Ouvir
        </button>
        <button type="button" onClick={() => (unlockAudio(), speak(en, { rate: 0.7 }))} className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 text-sm font-bold" aria-label="Ouvir devagar">
          <Snail size={16} aria-hidden /> Devagar
        </button>
        {caps.stt && (
          <button type="button" onClick={record} disabled={busy} className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-bold ${rec.active ? "bg-wrong text-white" : "bg-atlantic text-surface"}`}>
            {busy ? <Loader2 size={16} className="animate-spin" aria-hidden /> : rec.active ? <Square size={14} aria-hidden /> : <Mic size={16} aria-hidden />}
            {rec.active ? "Parar" : attempts.length ? "Tentar de novo" : "Repetir"}
          </button>
        )}
      </div>
      {last && (
        <div className="mt-2 text-sm" role="status">
          {last.verdict === "unclear" ? (
            <p>Não consegui ouvir bem (isso não conta como erro). Fale mais perto do microfone e repita.</p>
          ) : last.verdict === "good" ? (
            <p className="font-bold text-correct">Saiu certinho! O reconhecedor entendeu a frase inteira.</p>
          ) : (
            <>
              <p>
                Entendi: <span lang="en">“{last.recognized}”</span>. Treine:
              </p>
              <ul className="mt-1 space-y-1">
                {last.missed.slice(0, 3).map((w) => (
                  <li key={w}>
                    <button type="button" onClick={() => speak(w, { rate: 0.75 })} className="font-bold text-atlantic underline" lang="en">
                      {w}
                    </button>
                    {wordSoundTips(w)[0] && <span className="text-muted"> — {wordSoundTips(w)[0]}</span>}
                  </li>
                ))}
              </ul>
            </>
          )}
          {improved && (
            <p className="mt-1 flex items-center gap-1 font-bold text-correct">
              <TrendingUp size={16} aria-hidden /> Melhorou: {judged[0].score}% → {judged[judged.length - 1].score}% das palavras
            </p>
          )}
        </div>
      )}
      {error && <p className="mt-2 text-sm text-wrong">{error}</p>}
    </div>
  );
}
