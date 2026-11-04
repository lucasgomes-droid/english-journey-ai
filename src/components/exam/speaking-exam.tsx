"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Mic, RotateCcw, Square, User } from "lucide-react";
import { unlockAudio, useVoice, useVoiceCaps } from "@/lib/voice";
import { useVoiceRecorder } from "@/lib/voice-recorder";
import { SpeakButton } from "@/components/speak-button";
import { ExamResult, RubricBars, type ExamFeedbackView } from "./exam-result";

interface Result {
  score: number;
  scores: number[];
  answers: { transcript: string; words: number; wpm: number; rubric: Record<string, number> }[];
  feedback: ExamFeedbackView;
  passed: boolean;
  levelPassed: boolean;
  leveledUpTo: string | null;
}

export function SpeakingExam({ blocked, level, prompts, maxSeconds, passScore }: { blocked?: boolean; level: string; prompts: { en: string; pt: string }[]; maxSeconds: number; passScore: number }) {
  const caps = useVoiceCaps();
  const router = useRouter();
  const { playBlob } = useVoice();
  const rec = useVoiceRecorder({ silenceMs: 0, maxSeconds, noSpeechTimeoutMs: 12000 });
  const [step, setStep] = useState(0);
  const [wavs, setWavs] = useState<(Blob | null)[]>(prompts.map(() => null));
  const [elapsed, setElapsed] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const startedAt = useRef(0);

  useEffect(() => {
    if (!rec.active) return;
    const t = setInterval(() => setElapsed(Math.floor((performance.now() - startedAt.current) / 1000)), 250);
    return () => clearInterval(t);
  }, [rec.active]);

  async function record() {
    unlockAudio();
    setError(null);
    setElapsed(0);
    startedAt.current = performance.now();
    const wav = await rec.listen();
    if (!wav) {
      if (!rec.error) setError("Não ouvi você. Toque em Gravar e responda.");
      return;
    }
    if ((performance.now() - startedAt.current) / 1000 < 8) {
      setError("Resposta curta demais. Fale por pelo menos 15 segundos.");
      return;
    }
    setWavs((w) => w.map((x, i) => (i === step ? wav : x)));
  }

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("level", level);
      wavs.forEach((w, i) => form.append(`audio${i}`, w!, `answer${i}.wav`));
      const res = await fetch("/api/exam/speaking", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Falha ao avaliar.");
      setResult(data);
      router.refresh();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  if (!caps.stt) return <p className="panel p-6 text-muted">O reconhecimento de voz ainda não foi ativado no servidor.</p>;

  if (blocked && !result)
    return (
      <div className="panel p-6 text-center">
        <p className="text-muted">Esta parte não está disponível agora: ou você já foi aprovado, ou falta cumprir uma etapa anterior ou o plano de recuperação.</p>
        <Link href={`/prova/${level}`} className="btn-go mt-4 inline-flex">
          Voltar à prova
        </Link>
      </div>
    );

  if (result)
    return (
      <ExamResult level={level} score={result.score} passScore={passScore} passed={result.passed} levelPassed={result.levelPassed} leveledUpTo={result.leveledUpTo} feedback={result.feedback}>
        {result.answers.map((a, i) => (
          <section key={i} className="panel p-5">
            <h3 className="font-bold">
              Resposta {i + 1} · {result.scores[i]}%
            </h3>
            <p className="text-sm text-muted" lang="en">
              {prompts[i].en}
            </p>
            <p className="mt-2 rounded-xl bg-surface-2 p-3 text-sm" lang="en">
              “{a.transcript}”
            </p>
            <p className="mt-1 text-xs text-muted">
              {a.words} palavras · {a.wpm || "—"} palavras/min · transcrição automática
            </p>
            <div className="mt-3">
              <RubricBars rubric={a.rubric} />
            </div>
          </section>
        ))}
      </ExamResult>
    );

  const p = prompts[step];
  const wav = wavs[step];
  const left = Math.max(0, maxSeconds - elapsed);
  const allDone = wavs.every(Boolean);
  return (
    <div className="space-y-4">
      <ol className="flex gap-2" aria-label="Perguntas">
        {prompts.map((_, i) => (
          <li key={i}>
            <button
              onClick={() => !rec.active && setStep(i)}
              className={`rounded-full px-3 py-1 text-sm font-bold ${i === step ? "bg-atlantic text-surface" : wavs[i] ? "bg-correct-bg text-correct" : "bg-surface-2 text-muted"}`}
              aria-current={i === step ? "step" : undefined}
            >
              Pergunta {i + 1}
              {wavs[i] ? " ✓" : ""}
            </button>
          </li>
        ))}
      </ol>

      <section className="panel p-5">
        <h2 className="flex items-start gap-3 font-display text-2xl font-bold" lang="en">
          {p.en} <SpeakButton text={p.en} size="sm" />
        </h2>
        <p className="mt-1 text-muted">{p.pt}</p>
      </section>

      <div className="panel flex flex-col items-center gap-4 p-6 text-center">
        {rec.active ? (
          <>
            <p className="font-display text-5xl font-bold tabular-nums">
              {Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}
            </p>
            <p className="text-muted">{rec.state === "speaking" ? "Continue. Se travar, explique com outras palavras." : "Pode começar a responder…"}</p>
            <button onClick={rec.stop} className="btn relative bg-wrong text-white">
              <Square size={16} aria-hidden /> Terminei
              <span className="absolute inset-0 rounded-xl ring-4 ring-wrong/40" style={{ opacity: 0.3 + rec.level * 0.7 }} aria-hidden />
            </button>
          </>
        ) : busy ? (
          <p className="flex items-center gap-2 text-lg">
            <Loader2 className="animate-spin" aria-hidden /> O examinador está avaliando suas respostas…
          </p>
        ) : (
          <>
            <p className="text-muted">Até {maxSeconds} segundos. Você pode regravar antes de enviar.</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button onClick={record} className="btn bg-boarding px-6 py-4 text-lg text-boarding-ink">
                {wav ? <RotateCcw size={20} aria-hidden /> : <Mic size={20} aria-hidden />} {wav ? "Regravar" : "Gravar resposta"}
              </button>
              {wav && (
                <button className="btn-ghost" onClick={() => (unlockAudio(), playBlob(wav))}>
                  <User size={18} aria-hidden /> Ouvir
                </button>
              )}
            </div>
            {wav && step < prompts.length - 1 && (
              <button className="btn-go" onClick={() => setStep(step + 1)}>
                Próxima pergunta
              </button>
            )}
            {allDone && (
              <button className="btn-go" onClick={submit}>
                Enviar para avaliação
              </button>
            )}
          </>
        )}
        {(error || rec.error) && <p className="w-full rounded-xl bg-wrong-bg px-3 py-2 text-sm text-wrong">{error ?? rec.error}</p>}
      </div>
    </div>
  );
}
