"use client";

import { useState, useTransition } from "react";
import { Loader2, Sparkles, Trash2 } from "lucide-react";
import { LIFE_TOPICS } from "@/content/speaking-topics";
import { PronounceCard } from "@/components/pronounce-card";
import { SpeakButton } from "@/components/speak-button";
import { deletePhrase } from "@/app/actions/phrases";

type Phrase = { id: number; topic: string; en: string; pt: string; source?: string };

export function LifePhrases({ initial }: { initial: Phrase[] }) {
  const [topic, setTopic] = useState<(typeof LIFE_TOPICS)[number]["id"]>(LIFE_TOPICS[0].id);
  const [about, setAbout] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fresh, setFresh] = useState<Phrase[]>([]);
  const [all, setAll] = useState<Phrase[]>(initial);
  const [, start] = useTransition();
  const t = LIFE_TOPICS.find((x) => x.id === topic)!;

  async function generate() {
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/phrases", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ topic, about }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Falha ao gerar.");
      setFresh(data.phrases);
      setAll((a) => [...data.phrases, ...a]);
      setAbout("");
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const groups = Array.from(
    all.reduce((m, p) => m.set(p.topic, [...(m.get(p.topic) ?? []), p]), new Map<string, Phrase[]>()).entries(),
  );

  return (
    <div className="mt-6 space-y-8">
      <section className="panel p-5">
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Tema">
          {LIFE_TOPICS.map((x) => (
            <button
              key={x.id}
              role="radio"
              aria-checked={topic === x.id}
              onClick={() => setTopic(x.id)}
              className={`rounded-full border px-3 py-1.5 text-sm font-bold ${topic === x.id ? "border-atlantic bg-atlantic text-surface" : "border-line"}`}
            >
              {x.title}
            </button>
          ))}
        </div>
        <label className="mt-4 block">
          <span className="font-bold">{t.question}</span>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={4}
            maxLength={1500}
            className="field mt-2 w-full"
            placeholder="Ex.: Trabalho como analista numa empresa de logística em Bauru. Acordo às 6h, vou de carro…"
          />
        </label>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs text-muted">Use só o que você quiser compartilhar. As frases ficam salvas apenas na sua conta.</p>
          <button onClick={generate} disabled={busy || about.trim().length < 10} className="btn shrink-0 bg-boarding text-boarding-ink">
            {busy ? <Loader2 size={18} className="animate-spin" aria-hidden /> : <Sparkles size={18} aria-hidden />} {busy ? "Criando…" : "Criar minhas frases"}
          </button>
        </div>
        {error && <p className="mt-3 rounded-xl bg-wrong-bg px-3 py-2 text-sm text-wrong">{error}</p>}
      </section>

      {fresh.length > 0 && (
        <section>
          <h2 className="font-display text-2xl font-bold">Treine em voz alta</h2>
          <p className="text-sm text-muted">Ouça, repita e compare com a sua gravação. Elas também entram na sua revisão.</p>
          <div className="mt-4 space-y-4">
            {fresh.map((p) => (
              <PronounceCard key={p.id} text={p.en} translation={p.pt} context={`life:${p.id}`} />
            ))}
          </div>
        </section>
      )}

      {groups.length > 0 && (
        <section>
          <h2 className="font-display text-2xl font-bold">Minhas frases</h2>
          {groups.map(([g, list]) => (
            <div key={g} className="mt-4">
              <h3 className="text-sm font-bold uppercase tracking-wide text-muted">{g}</h3>
              <ul className="mt-2 divide-y divide-line rounded-2xl border border-line bg-surface">
                {list.map((p) => (
                  <li key={p.id} className="flex items-center gap-3 px-3 py-2.5">
                    <SpeakButton text={p.en} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold" lang="en">
                        {p.en}
                      </span>
                      <span className="block text-sm text-muted">{p.pt}</span>
                    </span>
                    <button
                      className="p-2 text-muted hover:text-wrong"
                      aria-label={`Apagar: ${p.en}`}
                      onClick={() => {
                        setAll((a) => a.filter((x) => x.id !== p.id));
                        setFresh((a) => a.filter((x) => x.id !== p.id));
                        start(() => void deletePhrase(p.id));
                      }}
                    >
                      <Trash2 size={16} aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
