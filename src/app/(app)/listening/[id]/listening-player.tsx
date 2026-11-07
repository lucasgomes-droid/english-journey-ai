"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, Pause, Play, Rabbit, Snail, CheckCircle2, XCircle } from "lucide-react";
import type { ListeningItem } from "@/content/listening";
import { accentAvailable, unlockAudio, useVoice } from "@/lib/voice";
import { submitListening } from "@/app/actions/practice";

type Result = Awaited<ReturnType<typeof submitListening>>;

export function ListeningPlayer({ item, rate }: { item: ListeningItem; rate: number }) {
  const { speakLines, speak, stop } = useVoice();
  const supported = true;
  const [line, setLine] = useState<number | null>(null);
  const speaking = line !== null;
  const [plays, setPlays] = useState(0);
  const [answers, setAnswers] = useState<number[]>(() => item.questions.map(() => -1));
  const [dictation, setDictation] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [pending, start] = useTransition();
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
    return () => stop();
  }, [stop]);

  /** Velocidade: devagar (0,75×), normal ou rápida (1,2× — como nativos falando entre si). */
  const play = (speed: "slow" | "normal" | "fast" = "normal") => {
    if (speaking) {
      stop();
      setLine(null);
      return;
    }
    unlockAudio();
    setPlays((p) => p + 1);
    setLine(0);
    speakLines(item.lines, { rate: speed === "slow" ? rate * 0.75 : speed === "fast" ? Math.min(1.5, rate * 1.2) : rate, onLine: (i) => setLine(i < 0 ? null : i) });
  };

  const accents = Array.from(new Set(item.lines.map((l) => l.accent).filter((a): a is "gb" | "au" => a === "gb" || a === "au")));
  const [missingAccent, setMissingAccent] = useState(false);
  useEffect(() => {
    const check = () => setMissingAccent(accents.some((a) => !accentAvailable(a)));
    check();
    // As vozes do aparelho carregam depois da página em alguns navegadores.
    window.speechSynthesis?.addEventListener?.("voiceschanged", check);
    return () => window.speechSynthesis?.removeEventListener?.("voiceschanged", check);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.id]);

  const done = result?.ok;
  const canSubmit = answers.every((a) => a >= 0) && dictation.trim().length > 0 && !done;

  return (
    <main className="mx-auto max-w-2xl">
      <Link href={`/listening?nivel=${item.level}`} className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft size={16} aria-hidden /> Listening {item.level}
      </Link>
      <h1 className="mt-1 font-display text-4xl font-bold">{item.title}</h1>
      <p className="text-muted">
        {item.topic} · {item.kind === "dialogue" ? `diálogo entre ${Array.from(new Set(item.lines.map((l) => l.speaker))).join(" e ")}` : "monólogo"}
      </p>
      {accents.length > 0 && (
        <p className="mt-1 text-sm text-muted">
          Sotaque {accents.map((a) => (a === "gb" ? "britânico" : "australiano")).join(" e ")} em algumas falas
          {missingAccent ? " — seu aparelho não tem essa voz instalada, então elas tocam com a voz americana." : "."}
        </p>
      )}

      {/* Player */}
      <section className="mt-6 rounded-3xl bg-hero p-6 text-white">
        {!supported ? (
          <p>Seu navegador não tem síntese de voz. Use Chrome, Edge ou Safari atualizados.</p>
        ) : (
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => play("normal")}
              className="grid size-20 place-items-center rounded-full bg-boarding text-boarding-ink transition-transform active:scale-95"
              aria-label={speaking ? "Parar" : "Ouvir o áudio"}
            >
              {speaking ? <Pause size={34} aria-hidden /> : <Play size={34} className="translate-x-0.5" aria-hidden />}
            </button>
            <button type="button" onClick={() => play("slow")} className="btn border border-white/30 text-white hover:bg-white/10" disabled={speaking}>
              <Snail size={18} aria-hidden /> Mais devagar
            </button>
            <button type="button" onClick={() => play("fast")} className="btn border border-white/30 text-white hover:bg-white/10" disabled={speaking}>
              <Rabbit size={18} aria-hidden /> Mais rápido
            </button>
            <div className="text-sm text-white/80">
              <p>{plays === 0 ? "Ouça primeiro sem ler. Pode repetir quantas vezes quiser." : `Ouvido ${plays}× ${speaking && line !== null ? `· falando: ${item.lines[line].speaker}` : ""}`}</p>
            </div>
          </div>
        )}
        {speaking && (
          <div className="mt-5 flex h-8 items-end gap-1" aria-hidden>
            {Array.from({ length: 28 }, (_, i) => (
              <span key={i} className="w-1.5 animate-pulse rounded-full bg-boarding/80" style={{ height: `${20 + ((i * 37) % 80)}%`, animationDelay: `${(i % 7) * 90}ms` }} />
            ))}
          </div>
        )}
      </section>

      {/* Perguntas */}
      <section className="mt-6 space-y-5" aria-label="Perguntas">
        {item.questions.map((q, qi) => (
          <fieldset key={qi} className="panel p-5">
            <legend className="sr-only">Pergunta {qi + 1}</legend>
            <p className="font-bold">
              {qi + 1}. {q.prompt}
            </p>
            <div className="mt-3 grid gap-2">
              {q.options.map((o, oi) => {
                const chosen = answers[qi] === oi;
                const right = done && oi === q.answer;
                const wrong = done && chosen && oi !== q.answer;
                return (
                  <button
                    key={oi}
                    type="button"
                    disabled={!!done}
                    onClick={() => setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)))}
                    aria-pressed={chosen}
                    className={`rounded-xl border-2 px-4 py-2.5 text-left transition-colors ${
                      right ? "border-correct bg-correct-bg" : wrong ? "border-wrong bg-wrong-bg" : chosen ? "border-atlantic bg-surface-2" : "border-line hover:border-atlantic/50"
                    }`}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}

        <div className="panel p-5">
          <p className="font-bold">Ditado</p>
          <p className="text-sm text-muted">Escreva esta frase do áudio. Toque para ouvir só ela.</p>
          <div className="mt-3 flex gap-2">
            <button type="button" className="btn-ghost shrink-0 px-3" onClick={() => {
                unlockAudio();
                speak(item.dictation, { rate });
              }} aria-label="Ouvir a frase do ditado">
              <Play size={18} aria-hidden />
            </button>
            <input
              value={dictation}
              onChange={(e) => setDictation(e.target.value)}
              disabled={!!done}
              className="field"
              placeholder="Escreva o que ouviu"
              lang="en"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
          </div>
          {done && result.ok && (
            <p className={`mt-3 flex items-start gap-2 ${result.dictationCorrect ? "text-correct" : "text-wrong"}`}>
              {result.dictationCorrect ? <CheckCircle2 size={20} aria-hidden /> : <XCircle size={20} aria-hidden />}
              <span>
                {result.dictationCorrect ? (result.dictationTypo ? "Certo, com um errinho de digitação. " : "Perfeito! ") : "Frase correta: "}
                <strong lang="en">{item.dictation}</strong>
              </span>
            </p>
          )}
        </div>
      </section>

      {result && !result.ok && <p className="mt-4 rounded-xl bg-wrong-bg px-4 py-3 text-wrong">{result.error}</p>}

      {!done ? (
        <button
          type="button"
          className="btn-primary mt-6 w-full"
          disabled={!canSubmit || pending}
          onClick={() =>
            start(async () => {
              const r = await submitListening({ itemId: item.id, answers, dictation, durationSeconds: Math.round((Date.now() - startedAt.current) / 1000) });
              setResult(r);
            })
          }
        >
          {pending ? "Corrigindo…" : "Verificar respostas"}
        </button>
      ) : (
        <section className="mt-6 space-y-4">
          <div className="panel flex items-center justify-between p-5">
            <p className="font-display text-2xl font-bold">
              {result.score} de {result.total} certos
            </p>
            <span className="chip bg-boarding text-boarding-ink">+{result.xp} XP</span>
          </div>
          <details className="panel p-5" open>
            <summary className="cursor-pointer font-bold">Transcrição</summary>
            <div className="mt-3 space-y-2">
              {item.lines.map((l, i) => (
                <p key={i} lang="en">
                  {item.kind === "dialogue" && <strong className="text-atlantic">{l.speaker}: </strong>}
                  {l.text}
                </p>
              ))}
            </div>
          </details>
          <Link href={`/listening?nivel=${item.level}`} className="btn-go w-full">
            Próximo áudio
          </Link>
        </section>
      )}
    </main>
  );
}
