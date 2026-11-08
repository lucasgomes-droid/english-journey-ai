"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Lightbulb, Mic, RotateCcw, Square } from "lucide-react";
import type { BuildSituation } from "@/content/build-situations";
import { MicInput } from "@/components/mic-input";
import { SpeakButton } from "@/components/speak-button";
import { checkRepeat, type RepeatResult } from "@/components/practice-card";
import { finishBuild } from "@/app/actions/practice";
import { useVoiceRecorder } from "@/lib/voice-recorder";
import { unlockAudio, useVoiceCaps } from "@/lib/voice";

interface Fix {
  ok: boolean;
  used_target: boolean;
  corrected: string;
  explanation_pt: string;
  better: string;
}

/** Situação → resposta → correção → reproduzir a versão corrigida. */
export function BuildTrainer({
  level,
  situations,
}: {
  level: string;
  situations: BuildSituation[];
}) {
  const caps = useVoiceCaps();
  const rec = useVoiceRecorder({
    silenceMs: 1100,
    maxSeconds: 20,
    noSpeechTimeoutMs: 8000,
  });
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"write" | "speak">("write");
  const [hint, setHint] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fix, setFix] = useState<Fix | null>(null);
  const [repeat, setRepeat] = useState<RepeatResult | null>(null);
  const [score, setScore] = useState({ done: 0, correct: 0 });
  const [finished, setFinished] = useState(false);
  const started = useRef<number | null>(null);
  const s = situations[i];

  async function correct() {
    if (started.current === null) started.current = performance.now();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: s.id, text, mode }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error ?? "Não consegui corrigir agora.");
      setFix(data);
      setScore((p) => ({
        done: p.done + 1,
        correct: p.correct + (data.ok ? 1 : 0),
      }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function sayIt() {
    unlockAudio();
    if (rec.active) return rec.stop();
    const wav = await rec.listen();
    if (!wav || !fix) return;
    setBusy(true);
    try {
      setRepeat(await checkRepeat(wav, fix.corrected, `build:${s.id}`));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function next() {
    setFix(null);
    setRepeat(null);
    setText("");
    setHint(false);
    if (i + 1 >= situations.length) {
      setFinished(true);
      const secs =
        started.current === null
          ? 60
          : Math.round((performance.now() - started.current) / 1000);
      if (score.done > 0)
        await finishBuild({
          level,
          done: score.done,
          correct: score.correct,
          durationSeconds: secs,
        }).catch(() => null);
    } else setI(i + 1);
  }

  if (finished || !s)
    return (
      <section className="panel mt-6 p-6 text-center" role="status">
        <CheckCircle2 className="mx-auto text-correct" size={36} aria-hidden />
        <p className="mt-2 font-display text-2xl font-bold">Treino concluído</p>
        <p className="mt-1 text-muted">
          {score.correct} de {score.done} respostas certas de primeira.
        </p>
        <button
          type="button"
          className="btn-ghost mt-4"
          onClick={() => {
            setI(0);
            setScore({ done: 0, correct: 0 });
            setFinished(false);
            started.current = null;
          }}
        >
          <RotateCcw size={16} aria-hidden /> Recomeçar
        </button>
      </section>
    );

  return (
    <section className="panel mt-6 p-6" aria-labelledby="situacao">
      <p className="text-sm font-bold text-muted">
        Situação {i + 1} de {situations.length} · {level}
      </p>
      <h2 id="situacao" className="mt-1 text-xl font-bold">
        {s.situation_pt}
      </h2>
      <button
        type="button"
        className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-atlantic"
        onClick={() => setHint((h) => !h)}
        aria-expanded={hint}
      >
        <Lightbulb size={16} aria-hidden />{" "}
        {hint ? "Esconder dica" : "Ver dica"}
      </button>
      {hint && (
        <p className="mt-1 text-sm text-muted">
          Use: <strong lang="en">{s.target}</strong>
        </p>
      )}

      {!fix ? (
        <>
          <label htmlFor="build-text" className="sr-only">
            Sua resposta em inglês
          </label>
          <textarea
            id="build-text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setMode("write");
            }}
            rows={2}
            lang="en"
            className="field mt-4 w-full"
            placeholder="Answer in English…"
          />
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="btn-go"
              onClick={correct}
              disabled={busy || text.trim().length < 2}
            >
              {busy ? "Corrigindo…" : "Corrigir"}
            </button>
            {caps.stt && (
              <MicInput
                label="Responder falando"
                onText={(t) => {
                  setText(t);
                  setMode("speak");
                }}
                disabled={busy}
              />
            )}
          </div>
        </>
      ) : (
        <div className="mt-4 space-y-3" role="status">
          <p className="flex items-center gap-2 font-bold">
            {fix.ok && (
              <CheckCircle2 className="text-correct" size={20} aria-hidden />
            )}
            {fix.ok ? "Correto!" : "Quase! Veja a versão corrigida:"}
          </p>
          {!fix.ok && (
            <p className="text-sm">
              <span className="text-muted">Você disse: </span>
              <span lang="en" className="text-wrong line-through">
                {text}
              </span>
            </p>
          )}
          <p className="rounded-xl bg-surface-2 p-3">
            <span lang="en" className="font-bold">
              {fix.corrected}
            </span>{" "}
            <SpeakButton
              text={fix.corrected}
              label="Ouvir a versão corrigida"
            />
          </p>
          {fix.explanation_pt && (
            <p className="text-sm">{fix.explanation_pt}</p>
          )}
          {fix.better && fix.better !== fix.corrected && (
            <p className="text-sm text-muted">
              Mais natural: <span lang="en">{fix.better}</span>
            </p>
          )}
          {caps.stt && (
            <div>
              <p className="text-sm font-bold">
                Agora repita a versão corrigida em voz alta:
              </p>
              <button
                type="button"
                className="btn-ghost mt-2"
                onClick={sayIt}
                disabled={busy && !rec.active}
              >
                {rec.active ? (
                  <Square size={16} aria-hidden />
                ) : (
                  <Mic size={16} aria-hidden />
                )}{" "}
                {rec.active ? "Parar" : repeat ? "Repetir de novo" : "Repetir"}
              </button>
              {repeat && (
                <p className="mt-2 text-sm" role="status">
                  {repeat.verdict === "good"
                    ? "Ótimo, saiu certinho!"
                    : repeat.verdict === "unclear"
                      ? "Não entendi bem. Tente de novo, mais perto do microfone."
                      : `Quase. Treine: ${repeat.missed.join(", ") || "o ritmo da frase"}.`}
                </p>
              )}
            </div>
          )}
          <button type="button" className="btn-go" onClick={next}>
            {i + 1 >= situations.length ? "Concluir" : "Próxima situação"}
          </button>
        </div>
      )}
      {error && (
        <p className="mt-2 text-sm text-wrong" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
