"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Volume2 } from "lucide-react";
import { PLACEMENT } from "@/content/placement";
import { savePlacement } from "@/app/actions/placement";
import { unlockAudio, useVoice } from "@/lib/voice";
import type { CefrLevel } from "@/content/types";

type Result = Extract<Awaited<ReturnType<typeof savePlacement>>, { ok: true }>;

export function PlacementTest({ current }: { current: CefrLevel }) {
  const router = useRouter();
  const { speak } = useVoice();
  const [i, setI] = useState(-1);
  const [answers, setAnswers] = useState<number[]>(() => PLACEMENT.map(() => -1));
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const q = PLACEMENT[i];

  function play(text: string) {
    unlockAudio();
    speak(text, { rate: 0.9 });
  }
  function choose(opt: number) {
    const next = answers.map((a, k) => (k === i ? opt : a));
    setAnswers(next);
    if (i + 1 < PLACEMENT.length) {
      setI(i + 1);
      if (PLACEMENT[i + 1].audio) play(PLACEMENT[i + 1].audio!);
    } else {
      start(async () => {
        const r = await savePlacement(next);
        if (!r.ok) return setError(r.error);
        setResult(r);
        router.refresh();
      });
    }
  }

  if (result)
    return (
      <div className="panel mt-8 p-6 text-center" role="status">
        <p className="text-muted">Seu nível estimado</p>
        <p className="font-display text-6xl font-bold text-atlantic">{result.estimated}</p>
        <ul className="mt-4 grid grid-cols-4 gap-2 text-sm">
          {result.byLevel.map((b) => (
            <li key={b.level} className={`rounded-xl p-2 ${b.ok >= 4 ? "bg-correct-bg text-correct" : "bg-surface-2"}`}>
              <span className="block font-bold">{b.level}</span>
              {b.ok}/{b.total}
            </li>
          ))}
        </ul>
        <p className="mt-4">
          {result.start === result.estimated
            ? `Sua trilha agora começa no ${result.start}. As aulas dos níveis anteriores ficam abertas para revisar quando quiser.`
            : `O conteúdo do ${result.estimated} ainda está em produção, então sua trilha começa no ${result.start}, revisando o que você já sabe.`}
        </p>
        <button className="btn-go mt-6" onClick={() => router.push("/trilha")}>
          Ver minha trilha
        </button>
      </div>
    );

  if (i === -1)
    return (
      <div className="panel mt-8 p-6">
        <p>
          Seu nível atual no app: <strong>{current}</strong>. Ao terminar, sua trilha passa a começar no nível estimado (você pode refazer o teste quando quiser).
        </p>
        <button
          className="btn-go mt-6"
          onClick={() => {
            setI(0);
            if (PLACEMENT[0].audio) play(PLACEMENT[0].audio);
          }}
        >
          Começar o teste
        </button>
      </div>
    );

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 text-sm text-muted">
        <span>
          {i + 1} de {PLACEMENT.length}
        </span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
          <div className="h-full bg-boarding" style={{ width: `${(i / PLACEMENT.length) * 100}%` }} />
        </div>
      </div>
      <div className="panel mt-4 p-6">
        <p className="font-display text-2xl font-bold" lang={q.audio ? "pt-BR" : "en"}>
          {q.prompt}
        </p>
        {q.audio && (
          <button className="btn-ghost mt-3" onClick={() => play(q.audio!)}>
            <Volume2 size={18} aria-hidden /> Ouvir de novo
          </button>
        )}
        <div className="mt-5 grid gap-2" role="radiogroup">
          {q.options.map((o, k) => (
            <button key={k} role="radio" aria-checked={false} disabled={pending} onClick={() => choose(k)} className="rounded-2xl border-2 border-line p-4 text-left font-bold hover:border-atlantic" lang={q.audio ? "pt-BR" : "en"}>
              {o}
            </button>
          ))}
          <button disabled={pending} onClick={() => choose(-1)} className="rounded-2xl p-3 text-left text-muted hover:text-ink">
            Não sei
          </button>
        </div>
        {pending && <p className="mt-4 text-muted">Calculando…</p>}
        {error && <p className="mt-4 rounded-xl bg-wrong-bg px-3 py-2 text-wrong">{error}</p>}
      </div>
    </div>
  );
}
