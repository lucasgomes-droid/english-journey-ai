"use client";

import { useState } from "react";
import { HelpCircle, Languages, Loader2, X } from "lucide-react";
import { SpeakButton } from "@/components/speak-button";

async function ask<T>(body: object): Promise<T> {
  const res = await fetch("/api/help", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Não consegui ajudar agora.");
  return data as T;
}

interface Explain {
  explanation_pt: string;
  examples: { en: string; pt: string }[];
  answer_tip_pt: string;
}

/** Botão "Não entendi": o professor explica em português simples, com exemplos. */
export function NotUnderstood({ text, context, className = "" }: { text: string; context?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [data, setData] = useState<Explain | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function go() {
    setOpen(true);
    if (data) return;
    setBusy(true);
    setError(null);
    try {
      setData(await ask<Explain>({ mode: "explain", text, context }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button type="button" onClick={go} className={`inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1 text-sm font-bold ${className}`}>
        <HelpCircle size={16} aria-hidden /> Não entendi
      </button>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-end bg-black/50 sm:place-items-center" role="dialog" aria-modal="true" aria-label="Explicação do professor" onClick={() => setOpen(false)}>
          <div className="animate-pop max-h-[85dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-surface p-6 sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-2xl font-bold">Explicando em português</h2>
              <button type="button" onClick={() => setOpen(false)} className="grid size-9 shrink-0 place-items-center rounded-full hover:bg-surface-2" aria-label="Fechar">
                <X size={20} aria-hidden />
              </button>
            </div>
            <p className="mt-2 rounded-xl bg-surface-2 p-3 text-sm" lang="en">
              {text}
            </p>
            {busy && (
              <p className="mt-4 flex items-center gap-2 text-muted">
                <Loader2 size={18} className="animate-spin" aria-hidden /> O professor está preparando a explicação…
              </p>
            )}
            {error && <p className="mt-4 rounded-xl bg-wrong-bg px-3 py-2 text-sm text-wrong">{error}</p>}
            {data && (
              <div className="mt-4 space-y-4">
                <p>{data.explanation_pt}</p>
                {data.examples.length > 0 && (
                  <ul className="space-y-2">
                    {data.examples.map((e) => (
                      <li key={e.en} className="flex items-center gap-3 rounded-xl bg-surface-2 p-3">
                        <SpeakButton text={e.en} size="sm" />
                        <span>
                          <span className="block font-bold" lang="en">
                            {e.en}
                          </span>
                          <span className="text-sm text-muted">{e.pt}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                {data.answer_tip_pt && <p className="rounded-xl bg-boarding/20 p-3 text-sm">{data.answer_tip_pt}</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

interface Translation {
  translation_pt: string;
  expressions: { en: string; meaning_pt: string }[];
  words: { en: string; pt: string }[];
}

/** "Traduzir" uma fala em inglês: tradução, expressões que não são literais e palavras-chave. */
export function TranslateInline({ text }: { text: string }) {
  const [data, setData] = useState<Translation | null>(null);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function go() {
    if (open) return setOpen(false);
    setOpen(true);
    if (data) return;
    setBusy(true);
    setError(null);
    try {
      setData(await ask<Translation>({ mode: "translate", text }));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-1 max-w-[85%]">
      <button type="button" onClick={go} className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink" aria-expanded={open}>
        <Languages size={14} aria-hidden /> {open ? "Esconder tradução" : "Traduzir"}
      </button>
      {open && (
        <div className="mt-1 rounded-xl border border-line p-3 text-sm">
          {busy && <Loader2 size={16} className="animate-spin" aria-label="Traduzindo" />}
          {error && <p className="text-wrong">{error}</p>}
          {data && (
            <>
              <p>{data.translation_pt}</p>
              {data.expressions.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {data.expressions.map((x) => (
                    <li key={x.en}>
                      <strong lang="en">{x.en}</strong>: <span className="text-muted">{x.meaning_pt}</span>
                    </li>
                  ))}
                </ul>
              )}
              {data.words.length > 0 && (
                <p className="mt-2 flex flex-wrap gap-1.5">
                  {data.words.map((w) => (
                    <span key={w.en} className="rounded-full bg-surface-2 px-2 py-0.5">
                      <span lang="en">{w.en}</span> = {w.pt}
                    </span>
                  ))}
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
