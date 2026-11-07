"use client";

import { useMemo, useState } from "react";
import type { Exercise } from "@/content/types";
import type { ExerciseAnswer } from "@/lib/grading";
import { orderTokens } from "@/lib/grading";
import { seededShuffle } from "@/lib/speech";
import { SpeakButton } from "./speak-button";
import { MicInput } from "./mic-input";
import { useVoiceCaps } from "@/lib/voice";

interface Props {
  exercise: Exercise;
  locked: boolean; // após verificar
  onChange: (answer: ExerciseAnswer | null) => void;
  /** Resultado da verificação, para colorir as opções. */
  result?: { correct: boolean } | null;
  /** Modo fala: responder com a voz (tradução, lacuna, ditado e montar frase). */
  speakMode?: boolean;
}

const TITLES: Record<Exercise["type"], string> = {
  multiple_choice: "Escolha a resposta",
  translate: "Traduza para o inglês",
  fill_blank: "Complete a frase",
  word_order: "Monte a frase em inglês",
  listening: "Exercício de escuta",
  match_pairs: "Ligue os pares",
};

export function ExerciseView(rawProps: Props) {
  // Sem reconhecimento de voz no servidor, o modo fala vira digitação.
  const caps = useVoiceCaps();
  const props = { ...rawProps, speakMode: Boolean(rawProps.speakMode && caps.stt) };
  const { exercise } = props;
  return (
    <div className="animate-pop">
      <p className="text-sm font-bold text-muted">
        {props.speakMode && exercise.type === "translate" ? "Diga em inglês" : props.speakMode && exercise.type === "word_order" ? "Diga a frase em inglês" : exercise.type === "multiple_choice" && exercise.passage ? "Leia o texto e responda" : TITLES[exercise.type]}
      </p>
      {exercise.type === "multiple_choice" && exercise.passage && (
        <article className="mt-3 rounded-2xl border border-line bg-surface-2 p-4" aria-label={`Texto: ${exercise.passage.title}`}>
          <h3 className="font-display text-lg font-bold" lang="en">
            {exercise.passage.title}
          </h3>
          <p className="mt-2 whitespace-pre-line leading-relaxed" lang="en">
            {exercise.passage.text}
          </p>
        </article>
      )}
      {exercise.type === "multiple_choice" && <Choices {...props} prompt={exercise.prompt} options={exercise.options} answer={exercise.answer} />}
      {exercise.type === "listening" && <Listening {...props} />}
      {exercise.type === "translate" && (
        <>
          <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{exercise.prompt}</h2>
          <TextInput {...props} placeholder="Escreva em inglês" multiline />
        </>
      )}
      {exercise.type === "fill_blank" && <FillBlank {...props} />}
      {exercise.type === "word_order" && <WordOrder {...props} />}
      {exercise.type === "match_pairs" && <MatchPairs {...props} />}
    </div>
  );
}

function Choices({ prompt, options, answer, locked, onChange, result, exercise }: Props & { prompt: string; options: string[]; answer?: number }) {
  const [sel, setSel] = useState<number | null>(null);
  return (
    <>
      <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{prompt}</h2>
      <div className="mt-6 grid gap-3" role="radiogroup" aria-label={prompt}>
        {options.map((o, i) => {
          const showRight = locked && result && i === answer;
          const showWrong = locked && result && !result.correct && i === sel;
          return (
            <button
              key={`${exercise.id}-${i}`}
              type="button"
              role="radio"
              aria-checked={sel === i}
              disabled={locked}
              onClick={() => {
                setSel(i);
                onChange({ kind: "choice", choice: i });
              }}
              className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3.5 text-left text-lg transition-colors ${
                showRight
                  ? "border-correct bg-correct-bg"
                  : showWrong
                    ? "border-wrong bg-wrong-bg"
                    : sel === i
                      ? "border-atlantic bg-surface-2"
                      : "border-line bg-surface hover:border-atlantic/50"
              }`}
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-lg border border-line text-sm text-muted">{i + 1}</span>
              {o}
            </button>
          );
        })}
      </div>
    </>
  );
}

function Listening(props: Props) {
  const ex = props.exercise;
  if (ex.type !== "listening") return null;
  return (
    <>
      <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{ex.prompt}</h2>
      <div className="mt-6 flex items-center gap-4">
        <SpeakButton text={ex.audio} size="lg" withSlow label="Ouvir o áudio" />
        <span className="text-muted">Toque para ouvir. Ouça quantas vezes quiser.</span>
      </div>
      {ex.options ? (
        <ChoicesNoPrompt {...props} options={ex.options} answer={ex.answer} />
      ) : (
        <TextInput {...props} placeholder="Escreva o que ouviu" />
      )}
    </>
  );
}

function ChoicesNoPrompt(p: Props & { options: string[]; answer?: number }) {
  return (
    <div className="[&>h2]:hidden">
      <Choices {...p} prompt="" />
    </div>
  );
}

function TextInput({ locked, onChange, placeholder, multiline, exercise, speakMode }: Props & { placeholder: string; multiline?: boolean }) {
  const [v, setV] = useState("");
  const set = (val: string) => {
    setV(val);
    onChange(val.trim() ? { kind: "text", text: val } : null);
  };
  const common = {
    value: v,
    disabled: locked,
    placeholder: speakMode ? "…ou digite aqui" : placeholder,
    autoCapitalize: "off",
    autoCorrect: "off",
    spellCheck: false,
    lang: "en",
    "aria-label": placeholder,
    className: `field text-lg ${speakMode ? "" : "mt-6"}`,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => set(e.target.value),
  };
  const input = multiline ? <textarea key={exercise.id} rows={speakMode ? 2 : 3} {...common} /> : <input key={exercise.id} {...common} autoFocus={!speakMode} />;
  if (!speakMode) return input;
  return (
    <div className="mt-6 flex items-start gap-4">
      <MicInput size="lg" onText={(t) => set(t)} disabled={locked} label="Falar a resposta" />
      <div className="min-w-0 flex-1">{input}</div>
    </div>
  );
}

function FillBlank(props: Props) {
  const ex = props.exercise;
  if (ex.type !== "fill_blank") return null;
  const [before, after] = ex.sentence.split("___");
  return (
    <>
      <h2 className="mt-2 font-display text-2xl font-bold leading-relaxed sm:text-3xl">
        {before}
        <span className="mx-1 inline-block min-w-16 border-b-4 border-boarding align-baseline">&nbsp;</span>
        {after}
      </h2>
      {ex.translation && <p className="mt-2 text-muted">{ex.translation}</p>}
      <TextInput {...props} placeholder="Palavra que falta" />
    </>
  );
}

function WordOrder({ exercise, locked, onChange, speakMode }: Props) {
  const ex = exercise as Extract<Exercise, { type: "word_order" }>;
  const bank = useMemo(() => {
    const tokens = [...orderTokens(ex.answer), ...(ex.distractors ?? [])].map((w, i) => ({ id: i, w }));
    return seededShuffle(tokens, ex.id);
  }, [ex]);
  const [picked, setPicked] = useState<number[]>([]);

  const update = (next: number[]) => {
    setPicked(next);
    onChange(next.length ? { kind: "order", words: next.map((id) => bank.find((b) => b.id === id)!.w) } : null);
  };

  if (speakMode) {
    return (
      <>
        <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{ex.prompt}</h2>
        <SpokenSentence locked={locked} onChange={onChange} />
      </>
    );
  }
  return (
    <>
      <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{ex.prompt}</h2>
      <div className="mt-6 flex min-h-16 flex-wrap gap-2 border-b-2 border-line pb-3" aria-label="Sua frase" aria-live="polite">
        {picked.map((id) => (
          <button key={id} type="button" disabled={locked} onClick={() => update(picked.filter((p) => p !== id))} className="rounded-xl border-2 border-atlantic bg-surface px-3 py-2 text-lg">
            {bank.find((b) => b.id === id)!.w}
          </button>
        ))}
        {!picked.length && <span className="py-2 text-muted">Toque nas palavras abaixo na ordem certa</span>}
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {bank.map((b) => {
          const used = picked.includes(b.id);
          return (
            <button
              key={b.id}
              type="button"
              disabled={locked || used}
              data-bank-word={b.w}
              onClick={() => update([...picked, b.id])}
              className={`rounded-xl border-2 px-3 py-2 text-lg ${used ? "border-dashed border-line bg-transparent text-transparent" : "border-line bg-surface hover:border-atlantic"}`}
              aria-hidden={used}
            >
              {b.w}
            </button>
          );
        })}
      </div>
    </>
  );
}

function MatchPairs({ exercise, locked, onChange }: Props) {
  const ex = exercise as Extract<Exercise, { type: "match_pairs" }>;
  const right = useMemo(() => seededShuffle(ex.pairs.map((p) => p[1]), ex.id), [ex]);
  const [left, setLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [shake, setShake] = useState<string | null>(null);

  const tryMatch = (r: string) => {
    if (!left) return;
    const pair = ex.pairs.find((p) => p[0] === left);
    if (pair && pair[1] === r) {
      const next = [...matched, left];
      setMatched(next);
      setLeft(null);
      onChange(next.length === ex.pairs.length ? { kind: "pairs", mistakes } : null);
    } else {
      setMistakes((m) => m + 1);
      setShake(r);
      setTimeout(() => setShake(null), 250);
    }
  };

  const cell = "w-full rounded-2xl border-2 px-3 py-3 text-lg text-left";
  return (
    <>
      <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">{ex.prompt}</h2>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="space-y-3">
          {ex.pairs.map(([l]) => (
            <button
              key={l}
              type="button"
              lang="en"
              disabled={locked || matched.includes(l)}
              onClick={() => setLeft(l)}
              className={`${cell} ${matched.includes(l) ? "border-correct bg-correct-bg opacity-70" : left === l ? "border-atlantic bg-surface-2" : "border-line bg-surface"}`}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {right.map((r) => {
            const done = ex.pairs.some((p) => p[1] === r && matched.includes(p[0]));
            return (
              <button
                key={r}
                type="button"
                disabled={locked || done || !left}
                onClick={() => tryMatch(r)}
                className={`${cell} ${done ? "border-correct bg-correct-bg opacity-70" : shake === r ? "animate-shake border-wrong bg-wrong-bg" : "border-line bg-surface"}`}
              >
                {r}
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-3 text-sm text-muted">
        Toque numa palavra em inglês e depois na tradução. {mistakes > 0 && `Erros: ${mistakes} (até 1 é aceito).`}
      </p>
    </>
  );
}

/** Montar frase no modo fala: o aluno diz a frase inteira. */
function SpokenSentence({ locked, onChange }: Pick<Props, "locked" | "onChange">) {
  const [said, setSaid] = useState("");
  return (
    <div className="mt-6 flex items-center gap-4">
      <MicInput
        size="lg"
        disabled={locked}
        label="Falar a frase"
        onText={(t) => {
          setSaid(t);
          onChange({ kind: "order", words: t.split(" ") });
        }}
      />
      <p className="min-h-12 flex-1 rounded-xl border-2 border-dashed border-line px-4 py-3 text-lg" lang="en" aria-live="polite">
        {said || <span className="text-muted">Toque no microfone e diga a frase</span>}
      </p>
    </div>
  );
}
