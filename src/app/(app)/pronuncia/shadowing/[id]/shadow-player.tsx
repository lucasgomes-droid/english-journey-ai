"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Mic, Repeat, Snail, User, Volume2 } from "lucide-react";
import type { ListeningItem } from "@/content/listening";
import { unlockAudio, useVoice, useVoiceCaps, type VoiceName } from "@/lib/voice";
import { useVoiceRecorder } from "@/lib/voice-recorder";

const PALETTE: VoiceName[] = ["f1", "m1", "f2", "m2", "f3", "m3"];

type LineResult = { completeness: number; words: { word: string; accuracy: number }[]; recognized: string };

/**
 * Shadowing: o app fala uma frase e, logo em seguida, abre o microfone para você repetir
 * imitando o ritmo. Depois mostra quais palavras foram reconhecidas.
 */
export function ShadowPlayer({ item, rate }: { item: ListeningItem; rate: number }) {
  const caps = useVoiceCaps();
  const { speak, playBlob, speaking } = useVoice();
  const rec = useVoiceRecorder({ silenceMs: 1000, maxSeconds: 20, noSpeechTimeoutMs: 6000 });
  const speakers = Array.from(new Set(item.lines.map((l) => l.speaker)));
  const [i, setI] = useState(0);
  const [slow, setSlow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState<(LineResult | null)[]>(() => item.lines.map(() => null));
  const [mine, setMine] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  const line = item.lines[i];
  const done = i >= item.lines.length;
  const voiceFor = (speaker: string) => PALETTE[speakers.indexOf(speaker) % PALETTE.length];

  async function round(index = i) {
    unlockAudio();
    setError(null);
    setMine(null);
    const l = item.lines[index];
    await speak(l.text, { voice: voiceFor(l.speaker), rate: slow ? rate * 0.75 : rate });
    if (!caps.stt) return;
    const wav = await rec.listen();
    if (!wav) {
      if (!rec.error) setError("Não ouvi você repetir. Toque em “Ouvir e repetir” de novo.");
      return;
    }
    setMine(wav);
    setBusy(true);
    try {
      const form = new FormData();
      form.append("audio", wav, "speech.wav");
      form.append("text", l.text);
      form.append("context", `shadow:${item.id}#${index}`);
      const res = await fetch("/api/pronunciation", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Falha ao avaliar.");
      setResults((r) => r.map((x, k) => (k === index ? { completeness: data.overall ?? data.completeness ?? 0, words: data.words, recognized: data.recognized } : x)));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  function next() {
    const n = i + 1;
    setI(n);
    setMine(null);
    if (n < item.lines.length) void round(n);
  }

  if (done) {
    const scored = results.filter((r): r is LineResult => r !== null);
    const avg = scored.length ? Math.round(scored.reduce((s, r) => s + r.completeness, 0) / scored.length) : 0;
    return (
      <div className="panel mt-6 p-6 text-center">
        <p className="font-display text-5xl font-bold">{avg}%</p>
        <p className="mt-2 text-muted">média das frases repetidas ({scored.length} de {item.lines.length})</p>
        <ul className="mt-4 space-y-1 text-left">
          {item.lines.map((l, k) => (
            <li key={k} className="flex justify-between gap-3 rounded-xl bg-surface-2 px-3 py-2 text-sm">
              <span lang="en">{l.text}</span>
              <span className="font-bold">{results[k] ? `${results[k]!.completeness}%` : "—"}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button className="btn-ghost" onClick={() => (setI(0), setResults(item.lines.map(() => null)))}>
            Fazer de novo
          </button>
          <Link href="/pronuncia" className="btn bg-boarding text-boarding-ink">
            Outros treinos
          </Link>
        </div>
      </div>
    );
  }

  const res = results[i];
  const original = line.text.split(/\s+/).filter(Boolean);
  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between text-sm text-muted">
        <span>
          Frase {i + 1} de {item.lines.length}
        </span>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={slow} onChange={(e) => setSlow(e.target.checked)} />
          <Snail size={16} aria-hidden /> Mais devagar
        </label>
      </div>
      <div className="panel p-6">
        <p className="text-sm font-bold text-muted">{line.speaker}</p>
        <p className="mt-1 font-display text-2xl font-bold leading-snug" lang="en">
          {res
            ? res.words.map((w, k) => (
                <span key={k} className={`mr-1.5 rounded-md px-1 ${w.accuracy >= 80 ? "text-correct" : w.accuracy >= 60 ? "text-[#b7791f]" : "bg-wrong-bg text-wrong"}`}>
                  {original.length === res.words.length ? original[k] : w.word}
                </span>
              ))
            : line.text}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button onClick={() => round()} disabled={busy || rec.active || speaking} className="btn relative bg-boarding text-boarding-ink">
            {busy ? <Loader2 size={18} className="animate-spin" aria-hidden /> : speaking ? <Volume2 size={18} aria-hidden /> : rec.active ? <Mic size={18} aria-hidden /> : <Repeat size={18} aria-hidden />}
            {busy ? "Analisando…" : speaking ? "Ouça…" : rec.active ? "Agora repita!" : res ? "Repetir de novo" : "Ouvir e repetir"}
            {rec.active && <span className="absolute inset-0 rounded-xl ring-4 ring-wrong/40" style={{ opacity: 0.3 + rec.level * 0.7 }} aria-hidden />}
          </button>
          {rec.active && (
            <button className="btn-ghost" onClick={rec.stop}>
              Terminei
            </button>
          )}
          {mine && !rec.active && !busy && (
            <button
              className="btn-ghost px-3"
              onClick={async () => {
                unlockAudio();
                await speak(line.text, { voice: voiceFor(line.speaker), rate });
                await playBlob(mine);
              }}
            >
              <User size={18} aria-hidden /> Comparar com a minha
            </button>
          )}
        </div>
        {(error || rec.error) && <p className="mt-3 rounded-xl bg-wrong-bg px-3 py-2 text-sm text-wrong">{error ?? rec.error}</p>}
        {!caps.stt && <p className="mt-3 text-sm text-muted">O reconhecimento de voz não está ativo: você pode ouvir e repetir, mas sem conferência.</p>}
        {res && (
          <p className="mt-3 text-sm text-muted">
            {res.completeness}% das palavras reconhecidas. Entendido: “{res.recognized}”
          </p>
        )}
      </div>
      <div className="flex justify-end">
        <button className="btn bg-atlantic text-surface" onClick={next} disabled={busy || rec.active}>
          {i + 1 === item.lines.length ? "Ver resultado" : "Próxima frase"}
        </button>
      </div>
    </div>
  );
}
