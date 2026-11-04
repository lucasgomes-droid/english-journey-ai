"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, Mic, RotateCcw, Square, User, Volume2 } from "lucide-react";
import { unlockAudio, useVoice, useVoiceCaps } from "@/lib/voice";
import { useVoiceRecorder } from "@/lib/voice-recorder";
import { wpmComment } from "@/lib/fluency";

interface Result {
  transcript: string;
  seconds: number;
  speechSeconds: number;
  words: number;
  uniqueWords: number;
  wpm: number;
  pauses: number;
  fillers: number;
  feedback: {
    summary_pt: string;
    strengths_pt: string[];
    improved: string;
    mistakes: { original: string; corrected: string; pt: string; explanation_pt: string }[];
    phrases: { en: string; pt: string }[];
    next_step_pt: string;
  } | null;
  feedbackError: string | null;
  audioSaved: boolean;
  savedPhrases: number;
}

/** Grava a fala livre (até `maxSeconds`), mede o ritmo e mostra o retorno do professor. */
export function FreeSpeaking({ kind, topicId, maxSeconds, minSeconds = 20 }: { kind: "fluency" | "weekly"; topicId?: string; maxSeconds: number; minSeconds?: number }) {
  const caps = useVoiceCaps();
  const router = useRouter();
  const { speak, playBlob } = useVoice();
  const rec = useVoiceRecorder({ silenceMs: 0, maxSeconds, noSpeechTimeoutMs: 12000 });
  const [elapsed, setElapsed] = useState(0);
  const [busy, setBusy] = useState(false);
  const [mine, setMine] = useState<Blob | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const startedAt = useRef(0);

  useEffect(() => {
    if (!rec.active) return;
    const t = setInterval(() => setElapsed(Math.floor((performance.now() - startedAt.current) / 1000)), 250);
    return () => clearInterval(t);
  }, [rec.active]);

  async function start() {
    unlockAudio();
    setError(null);
    setResult(null);
    setMine(null);
    setElapsed(0);
    startedAt.current = performance.now();
    const wav = await rec.listen();
    if (!wav) {
      if (!rec.error) setError("Não ouvi você. Toque em Começar e fale.");
      return;
    }
    const secs = (performance.now() - startedAt.current) / 1000;
    if (secs < minSeconds * 0.5) {
      setError(`Fale por pelo menos ${minSeconds} segundos para o app medir seu ritmo.`);
      return;
    }
    setMine(wav);
    setBusy(true);
    try {
      const form = new FormData();
      form.append("audio", wav, "speech.wav");
      form.append("kind", kind);
      if (topicId) form.append("topic", topicId);
      const res = await fetch("/api/speaking", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Falha ao analisar.");
      setResult(data);
      router.refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  if (!caps.stt) return <p className="panel p-6 text-muted">O reconhecimento de voz ainda não foi ativado no servidor.</p>;

  const left = Math.max(0, maxSeconds - elapsed);
  return (
    <div className="space-y-4">
      <div className="panel flex flex-col items-center gap-4 p-6 text-center">
        {rec.active ? (
          <>
            <p className="font-display text-6xl font-bold tabular-nums">
              {Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}
            </p>
            <div className="h-2 w-full max-w-sm overflow-hidden rounded-full bg-surface-2">
              <div className="h-full bg-boarding transition-all" style={{ width: `${(elapsed / maxSeconds) * 100}%` }} />
            </div>
            <p className="text-muted">{rec.state === "speaking" ? "Continue falando. Se travar, use outras palavras e siga em frente." : "Pode começar a falar…"}</p>
            <button onClick={rec.stop} className="btn relative bg-wrong text-white">
              <Square size={16} aria-hidden /> Terminei
              <span className="absolute inset-0 rounded-xl ring-4 ring-wrong/40" style={{ opacity: 0.3 + rec.level * 0.7 }} aria-hidden />
            </button>
          </>
        ) : busy ? (
          <p className="flex items-center gap-2 text-lg">
            <Loader2 className="animate-spin" aria-hidden /> Ouvindo sua gravação e preparando o retorno…
          </p>
        ) : (
          <>
            <p className="text-muted">
              Fale sem parar por até {maxSeconds >= 120 ? "2 minutos" : `${maxSeconds} segundos`}. Errar faz parte: o objetivo é não travar.
            </p>
            <button onClick={start} className="btn bg-boarding px-6 py-4 text-lg text-boarding-ink">
              {result ? <RotateCcw size={20} aria-hidden /> : <Mic size={20} aria-hidden />} {result ? "Gravar de novo" : "Começar"}
            </button>
          </>
        )}
        {(error || rec.error) && <p className="w-full rounded-xl bg-wrong-bg px-3 py-2 text-sm text-wrong">{error ?? rec.error}</p>}
      </div>

      {result && (
        <div className="space-y-4" role="status">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              [result.wpm || "—", "palavras/min"],
              [result.words, "palavras"],
              [result.uniqueWords, "palavras diferentes"],
              [result.pauses, "pausas longas"],
            ].map(([v, l]) => (
              <div key={l as string} className="panel p-4 text-center">
                <p className="font-display text-3xl font-bold">{v}</p>
                <p className="text-sm text-muted">{l}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted">
            {wpmComment(result.wpm)} {result.fillers > 2 ? `Você usou ${result.fillers} hesitações (um, uh): tente trocar por uma pausa curta ou por “well…”.` : ""}
          </p>

          {mine && (
            <button className="btn-ghost" onClick={() => (unlockAudio(), playBlob(mine))}>
              <User size={18} aria-hidden /> Ouvir minha gravação
            </button>
          )}

          {result.feedback ? (
            <>
              <section className="panel p-5">
                <h3 className="font-display text-xl font-bold">Retorno do professor</h3>
                <p className="mt-2">{result.feedback.summary_pt}</p>
                {result.feedback.strengths_pt.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {result.feedback.strengths_pt.map((s) => (
                      <li key={s} className="flex gap-2 text-sm">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-correct" aria-hidden /> {s}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
              {result.feedback.mistakes.length > 0 && (
                <section className="panel p-5">
                  <h3 className="font-display text-xl font-bold">Ajustes</h3>
                  <ul className="mt-3 space-y-3">
                    {result.feedback.mistakes.map((m, k) => (
                      <li key={k} className="rounded-xl bg-surface-2 p-3">
                        {m.original && (
                          <p className="text-wrong line-through" lang="en">
                            {m.original}
                          </p>
                        )}
                        <p className="flex items-center gap-2 font-bold text-correct" lang="en">
                          {m.corrected}
                          <button className="text-atlantic" onClick={() => (unlockAudio(), speak(m.corrected))} aria-label={`Ouvir: ${m.corrected}`}>
                            <Volume2 size={16} aria-hidden />
                          </button>
                        </p>
                        <p className="text-sm text-muted">{m.explanation_pt}</p>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {result.feedback.improved && (
                <section className="panel p-5">
                  <h3 className="flex items-center justify-between gap-2 font-display text-xl font-bold">
                    Como ficaria mais natural
                    <button className="btn-ghost px-3 text-sm" onClick={() => (unlockAudio(), speak(result.feedback!.improved))}>
                      <Volume2 size={16} aria-hidden /> Ouvir
                    </button>
                  </h3>
                  <p className="mt-2 leading-relaxed" lang="en">
                    {result.feedback.improved}
                  </p>
                </section>
              )}
              {result.feedback.phrases.length > 0 && (
                <section className="panel p-5">
                  <h3 className="font-display text-xl font-bold">Frases para usar da próxima vez</h3>
                  <ul className="mt-3 space-y-2">
                    {result.feedback.phrases.map((p) => (
                      <li key={p.en} className="flex items-start gap-2">
                        <button className="mt-0.5 text-atlantic" onClick={() => (unlockAudio(), speak(p.en))} aria-label={`Ouvir: ${p.en}`}>
                          <Volume2 size={16} aria-hidden />
                        </button>
                        <span>
                          <strong lang="en">{p.en}</strong> <span className="text-muted">· {p.pt}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {result.feedback.next_step_pt && <p className="rounded-2xl bg-boarding/20 p-4">{result.feedback.next_step_pt}</p>}
              {result.savedPhrases > 0 && <p className="text-sm text-muted">{result.savedPhrases} frases foram para “Minhas frases” e entram na sua revisão.</p>}
            </>
          ) : (
            <p className="rounded-xl bg-surface-2 p-3 text-sm text-muted">{result.feedbackError ?? "Sem retorno do professor desta vez."} As medidas acima foram salvas.</p>
          )}

          <details className="panel p-5">
            <summary className="cursor-pointer font-bold">O que o app entendeu</summary>
            <p className="mt-2 text-muted" lang="en">
              {result.transcript}
            </p>
          </details>
        </div>
      )}
    </div>
  );
}
