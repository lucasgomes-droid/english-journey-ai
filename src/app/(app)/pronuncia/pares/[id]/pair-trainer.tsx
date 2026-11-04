"use client";

import { useState } from "react";
import { Check, Ear, Loader2, Mic, Square, User, Volume2, X } from "lucide-react";
import type { PairSet } from "@/content/minimal-pairs";
import { carrier } from "@/content/minimal-pairs";
import { unlockAudio, useVoice, useVoiceCaps } from "@/lib/voice";
import { useVoiceRecorder } from "@/lib/voice-recorder";

type Side = "a" | "b";
const ROUNDS = 8;

function shuffleRounds(set: PairSet, n: number) {
  const out: { index: number; side: Side }[] = [];
  for (let i = 0; i < n; i++) out.push({ index: Math.floor(Math.random() * set.pairs.length), side: Math.random() < 0.5 ? "a" : "b" });
  return out;
}

export function PairTrainer({ set }: { set: PairSet }) {
  const [tab, setTab] = useState<"ouvir" | "falar">("ouvir");
  return (
    <div className="mt-6">
      <div className="inline-flex rounded-2xl bg-surface-2 p-1" role="tablist">
        {(
          [
            ["ouvir", "1. Ouvir e escolher"],
            ["falar", "2. Falar"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            role="tab"
            aria-selected={tab === k}
            onClick={() => setTab(k)}
            className={`rounded-xl px-4 py-2 font-bold ${tab === k ? "bg-surface shadow-sm" : "text-muted"}`}
          >
            {label}
          </button>
        ))}
      </div>
      {tab === "ouvir" ? <ListenRounds set={set} onDone={() => setTab("falar")} /> : <SpeakPairs set={set} />}
    </div>
  );
}

/** Parte 1: o app fala uma das duas palavras e o aluno escolhe qual ouviu. */
function ListenRounds({ set, onDone }: { set: PairSet; onDone: () => void }) {
  const { speak } = useVoice();
  const [rounds, setRounds] = useState<{ index: number; side: Side }[]>([]);
  const [i, setI] = useState(-1);
  const [picked, setPicked] = useState<Side | null>(null);
  const [hits, setHits] = useState(0);

  const round = rounds[i];
  const pair = round ? set.pairs[round.index] : null;
  const word = pair && round ? (round.side === "a" ? pair.a : pair.b) : "";

  function play(w = word) {
    unlockAudio();
    speak(w, { rate: 0.85 });
  }
  const wordOf = (r: { index: number; side: Side }) => (r.side === "a" ? set.pairs[r.index].a : set.pairs[r.index].b);
  function start() {
    const r = shuffleRounds(set, ROUNDS);
    setRounds(r);
    setHits(0);
    setPicked(null);
    setI(0);
    play(wordOf(r[0]));
  }
  // Toca a palavra assim que a rodada muda (sempre depois de um toque do aluno).
  function next() {
    const n = i + 1;
    setPicked(null);
    setI(n);
    if (rounds[n]) play(wordOf(rounds[n]));
  }

  if (i === -1)
    return (
      <div className="panel mt-4 p-6">
        <p>Você vai ouvir {ROUNDS} palavras. Para cada uma, escolha qual das duas foi dita. Treinar o ouvido vem antes de treinar a boca.</p>
        <button
          className="btn mt-4 bg-boarding text-boarding-ink"
          onClick={start}
        >
          <Ear size={18} aria-hidden /> Começar
        </button>
      </div>
    );

  if (i >= rounds.length)
    return (
      <div className="panel mt-4 p-6 text-center">
        <p className="font-display text-5xl font-bold">
          {hits}/{rounds.length}
        </p>
        <p className="mt-2 text-muted">{hits === rounds.length ? "Ouvido afiado! Agora vamos falar." : hits >= rounds.length * 0.75 ? "Muito bem. Os sons já estão ficando claros." : "Esses sons ainda se confundem para você. Repita o treino: o ouvido aprende rápido."}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button className="btn-ghost" onClick={() => setI(-1)}>
            Repetir
          </button>
          <button className="btn bg-boarding text-boarding-ink" onClick={onDone}>
            Ir para a fala
          </button>
        </div>
      </div>
    );

  return (
    <div className="panel mt-4 p-6">
      <div className="flex items-center justify-between text-sm text-muted">
        <span>
          {i + 1} de {rounds.length}
        </span>
        <span>{hits} acertos</span>
      </div>
      <button className="btn-ghost mt-4" onClick={() => play()} aria-label="Ouvir de novo">
        <Volume2 size={18} aria-hidden /> Ouvir de novo
      </button>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {(["a", "b"] as const).map((s) => {
          const w = s === "a" ? pair!.a : pair!.b;
          const pt = s === "a" ? pair!.aPt : pair!.bPt;
          const isRight = s === round!.side;
          const state = picked === null ? "" : isRight ? "border-correct bg-correct-bg" : picked === s ? "border-wrong bg-wrong-bg" : "opacity-60";
          return (
            <button
              key={s}
              disabled={picked !== null}
              onClick={() => {
                setPicked(s);
                if (isRight) setHits((h) => h + 1);
              }}
              className={`rounded-2xl border-2 border-line p-4 text-left transition-colors ${state}`}
            >
              <span className="block font-display text-2xl font-bold" lang="en">
                {w}
              </span>
              <span className="text-sm text-muted">
                {pt} · {s === "a" ? set.sounds[0] : set.sounds[1]}
              </span>
            </button>
          );
        })}
      </div>
      {picked && (
        <div role="status" className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <p className={picked === round!.side ? "font-bold text-correct" : "font-bold text-wrong"}>
            {picked === round!.side ? "Correto!" : `Era “${word}”.`}
          </p>
          <div className="flex gap-2">
            {picked !== round!.side && (
              <button className="btn-ghost" onClick={async () => {
                  unlockAudio();
                  await speak(pair!.a, { rate: 0.85 });
                  await speak(pair!.b, { rate: 0.85 });
                }}>
                Ouvir as duas
              </button>
            )}
            <button className="btn bg-atlantic text-surface" onClick={next}>
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

type Result = { heard: string; outcome: "target" | "other" | "unclear" };

/** Parte 2: o aluno fala a palavra pedida e vê o que o reconhecedor de voz entendeu. */
function SpeakPairs({ set }: { set: PairSet }) {
  const caps = useVoiceCaps();
  const [targets] = useState<Side[]>(() => set.pairs.map(() => (Math.random() < 0.5 ? "a" : "b")));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState({ ok: 0, total: 0 });

  if (!caps.stt) return <p className="panel mt-4 p-6 text-muted">O reconhecimento de voz ainda não foi ativado no servidor.</p>;
  if (idx >= set.pairs.length)
    return (
      <div className="panel mt-4 p-6 text-center">
        <p className="font-display text-5xl font-bold">
          {score.ok}/{score.total}
        </p>
        <p className="mt-2 text-muted">palavras entendidas do jeito que você quis dizer</p>
        <button className="btn mt-4 bg-boarding text-boarding-ink" onClick={() => (setIdx(0), setScore({ ok: 0, total: 0 }))}>
          Treinar de novo
        </button>
      </div>
    );

  return (
    <div className="mt-4 space-y-3">
      <p className="text-sm text-muted">
        Diga a frase em voz alta. Um reconhecedor de voz decide qual palavra ouviu. Não é uma nota por som, mas se ele entender a outra palavra, uma pessoa também pode entender errado.
      </p>
      <SpeakOne
        key={`${idx}`}
        set={set}
        index={idx}
        side={targets[idx]}
        progress={`${idx + 1} de ${set.pairs.length}`}
        onScored={(ok) => setScore((s) => ({ ok: s.ok + (ok ? 1 : 0), total: s.total + 1 }))}
        onNext={() => setIdx((n) => n + 1)}
      />
    </div>
  );
}

function SpeakOne({ set, index, side, progress, onScored, onNext }: { set: PairSet; index: number; side: Side; progress: string; onScored: (ok: boolean) => void; onNext: () => void }) {
  const pair = set.pairs[index];
  const target = side === "a" ? pair.a : pair.b;
  const other = side === "a" ? pair.b : pair.a;
  const targetSound = side === "a" ? set.sounds[0] : set.sounds[1];
  const otherSound = side === "a" ? set.sounds[1] : set.sounds[0];
  const tip = side === "a" ? set.tipA : set.tipB;
  const { speak, playBlob } = useVoice();
  const rec = useVoiceRecorder({ silenceMs: 900, maxSeconds: 6, noSpeechTimeoutMs: 7000 });
  const [busy, setBusy] = useState(false);
  const [mine, setMine] = useState<Blob | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scored, setScored] = useState(false);

  async function record() {
    unlockAudio();
    setError(null);
    if (rec.active) return rec.stop();
    const wav = await rec.listen();
    if (!wav) {
      if (!rec.error) setError("Não ouvi nada. Toque no microfone e diga a frase.");
      return;
    }
    setMine(wav);
    setBusy(true);
    try {
      const form = new FormData();
      form.append("audio", wav, "speech.wav");
      form.append("set", set.id);
      form.append("index", String(index));
      form.append("side", side);
      const res = await fetch("/api/pronunciation/pair", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Falha ao reconhecer.");
      setResult(data);
      if (!scored && data.outcome !== "unclear") {
        setScored(true);
        onScored(data.outcome === "target");
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="panel p-6">
      <p className="text-sm text-muted">{progress}</p>
      <p className="mt-2 text-muted">Diga:</p>
      <p className="font-display text-3xl font-bold" lang="en">
        I said <span className="rounded-lg bg-boarding/30 px-1.5">{target}</span>.
      </p>
      <p className="mt-1 text-sm text-muted">
        {target} = {side === "a" ? pair.aPt : pair.bPt} · cuidado para não soar como <em lang="en">{other}</em> ({side === "a" ? pair.bPt : pair.aPt})
      </p>
      <p className="mt-2 text-sm">
        <span className="font-mono font-bold">{targetSound}</span> {tip}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button className="btn-ghost px-3" onClick={() => (unlockAudio(), speak(carrier(target), { rate: 0.85 }))} aria-label="Ouvir o modelo">
          <Volume2 size={18} aria-hidden /> Ouvir
        </button>
        <button onClick={record} disabled={busy} className={`btn relative ${rec.active ? "bg-wrong text-white" : "bg-boarding text-boarding-ink"}`}>
          {busy ? <Loader2 size={18} className="animate-spin" aria-hidden /> : rec.active ? <Square size={16} aria-hidden /> : <Mic size={18} aria-hidden />}
          {busy ? "Ouvindo o que você disse…" : rec.active ? "Fale agora" : result ? "Tentar de novo" : "Falar"}
          {rec.active && <span className="absolute inset-0 rounded-xl ring-4 ring-wrong/40" style={{ opacity: 0.3 + rec.level * 0.7 }} aria-hidden />}
        </button>
        {mine && !rec.active && (
          <button className="btn-ghost px-3" onClick={() => (unlockAudio(), playBlob(mine))}>
            <User size={18} aria-hidden /> Minha voz
          </button>
        )}
      </div>

      {(error || rec.error) && <p className="mt-3 rounded-xl bg-wrong-bg px-3 py-2 text-sm text-wrong">{error ?? rec.error}</p>}

      {result && (
        <div role="status" className={`mt-4 rounded-xl p-3 ${result.outcome === "target" ? "bg-correct-bg" : result.outcome === "other" ? "bg-wrong-bg" : "bg-surface-2"}`}>
          {result.outcome === "target" && (
            <p className="flex items-center gap-2 font-bold text-correct">
              <Check size={18} aria-hidden /> Correto! Entendeu “{target}”.
            </p>
          )}
          {result.outcome === "other" && (
            <>
              <p className="flex items-center gap-2 font-bold text-wrong">
                <X size={18} aria-hidden /> Entendeu “{other}”.
              </p>
              <p className="mt-1 text-sm">
                Seu <span className="font-mono">{targetSound}</span> soou como <span className="font-mono">{otherSound}</span>. {tip}
              </p>
            </>
          )}
          {result.outcome === "unclear" && <p className="text-sm">Não deu para saber qual palavra foi dita. Fale um pouco mais perto do microfone e tente de novo.</p>}
          <p className="mt-1 text-xs text-muted">Reconhecido: “{result.heard || "…"}”</p>
        </div>
      )}

      {(scored || result) && (
        <div className="mt-4 flex justify-end">
          <button className="btn bg-atlantic text-surface" onClick={onNext}>
            {scored ? "Próximo" : "Pular"}
          </button>
        </div>
      )}
    </div>
  );
}
