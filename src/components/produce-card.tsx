"use client";

import { useState } from "react";
import { CheckCircle2, PenLine } from "lucide-react";
import { MicInput } from "@/components/mic-input";
import { SpeakButton } from "@/components/speak-button";
import { useVoiceCaps } from "@/lib/voice";

interface Feedback {
  score: number;
  used_target: boolean;
  feedback_pt: string;
  corrected: string;
  mistakes: { original: string; corrected: string; explanation_pt: string }[];
}

/**
 * "Use você mesmo": no fim da aula o aluno escreve (ou fala) 2–3 frases sobre a própria vida usando o que aprendeu.
 * A IA corrige; o resultado conta como evidência de domínio (produção livre).
 */
type ProduceProps = { lessonId: string; objective: string; hint: string };

export function ProduceCard(props: ProduceProps) {
  return (
    <section className="panel mt-4 p-6 text-left" aria-labelledby="use-voce-mesmo">
      <h2 id="use-voce-mesmo" className="flex items-center gap-2 font-display text-xl font-bold">
        <PenLine size={20} aria-hidden /> Use você mesmo
      </h2>
      <ProduceBody {...props} />
    </section>
  );
}

/** Conteúdo do "escrever" (sem a moldura), para usar dentro de outro cartão. */
export function ProduceBody({ lessonId, objective, hint }: ProduceProps) {
  const caps = useVoiceCaps();
  const [text, setText] = useState("");
  const [mode, setMode] = useState<"write" | "speak">("write");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fb, setFb] = useState<Feedback | null>(null);

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/produce", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lessonId, text, mode }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Não consegui corrigir agora.");
      setFb(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <p className="mt-1 text-muted">
        Escreva ou fale 2 ou 3 frases sobre <strong>a sua vida</strong> usando o que aprendeu: {objective.charAt(0).toLowerCase() + objective.slice(1)}
      </p>
      <p className="mt-1 text-sm text-muted">Ideia: {hint}</p>
      {!fb ? (
        <>
          <label htmlFor="produce-text" className="sr-only">
            Suas frases em inglês
          </label>
          <textarea
            id="produce-text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setMode("write");
            }}
            rows={3}
            lang="en"
            className="field mt-3 w-full"
            placeholder="Write here in English…"
          />
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button type="button" className="btn-go" onClick={submit} disabled={busy || text.trim().length < 3}>
              {busy ? "Corrigindo…" : "Corrigir"}
            </button>
            {caps.stt && (
              <MicInput
                label="Falar em vez de escrever"
                onText={(t) => {
                  setText(t);
                  setMode("speak");
                }}
                disabled={busy}
              />
            )}
          </div>
          {error && (
            <p className="mt-2 text-sm text-wrong" role="alert">
              {error}
            </p>
          )}
        </>
      ) : (
        <div className="mt-3 space-y-3" role="status">
          <p className="flex items-center gap-2 font-bold">
            {fb.score >= 70 && fb.used_target ? <CheckCircle2 className="text-correct" size={20} aria-hidden /> : null}
            {fb.score >= 70 && fb.used_target ? "Muito bem! Isso conta para o domínio desta aula." : "Boa tentativa! Veja como fica melhor:"} <span className="chip">{fb.score}/100</span>
          </p>
          <p>{fb.feedback_pt}</p>
          {fb.corrected && (
            <p className="rounded-xl bg-surface-2 p-3">
              <span lang="en" className="font-bold">
                {fb.corrected}
              </span>{" "}
              <SpeakButton text={fb.corrected} label="Ouvir a versão corrigida" />
            </p>
          )}
          {fb.mistakes.length > 0 && (
            <ul className="space-y-1 text-sm">
              {fb.mistakes.map((m, i) => (
                <li key={i}>
                  <span className="text-wrong line-through" lang="en">
                    {m.original}
                  </span>{" "}
                  → <strong lang="en">{m.corrected}</strong> <span className="text-muted">— {m.explanation_pt}</span>
                </li>
              ))}
            </ul>
          )}
          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              setFb(null);
              setText("");
            }}
          >
            Tentar outra vez
          </button>
        </div>
      )}
    </>
  );
}
