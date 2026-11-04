"use client";

import { useState, useTransition } from "react";
import { Loader2, RotateCcw, X } from "lucide-react";
import { resetProgress } from "@/app/actions/reset";

const WORD = "RESETAR";

/** Configurações → "Recomeçar do zero", com confirmação digitada (não dá para desfazer). */
export function ResetProgress() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const ok = text.trim().toUpperCase() === WORD;

  return (
    <section className="panel border-2 border-wrong/40 p-6" aria-labelledby="reset">
      <h2 id="reset" className="font-display text-2xl font-bold">
        Recomeçar do zero
      </h2>
      <p className="mt-1 text-muted">Apaga todo o seu progresso e volta para o início, como uma conta nova. Sua conta, nome, metas e preferências continuam.</p>
      <button type="button" onClick={() => setOpen(true)} className="btn mt-4 border-2 border-wrong text-wrong">
        <RotateCcw size={18} aria-hidden /> Resetar meu progresso
      </button>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-end bg-black/50 sm:place-items-center" role="dialog" aria-modal="true" aria-labelledby="reset-titulo">
          <form
            className="animate-pop w-full max-w-lg rounded-t-3xl bg-surface p-6 sm:rounded-3xl"
            onSubmit={(e) => {
              e.preventDefault();
              if (!ok) return;
              setError(null);
              start(async () => {
                const r = await resetProgress(text);
                if (r?.error) setError(r.error);
              });
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 id="reset-titulo" className="font-display text-2xl font-bold">
                Apagar todo o progresso?
              </h3>
              <button type="button" onClick={() => setOpen(false)} disabled={pending} className="grid size-9 shrink-0 place-items-center rounded-full hover:bg-surface-2" aria-label="Cancelar">
                <X size={20} aria-hidden />
              </button>
            </div>
            <p className="mt-2">Isto apaga para sempre:</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-muted">
              <li>aulas feitas, notas, provas de nível e planos de recuperação;</li>
              <li>revisões, palavras aprendidas e frases salvas;</li>
              <li>conversas, relatórios, gravações e treinos de pronúncia;</li>
              <li>XP, sequência de dias, conquistas e nível (volta para o A1).</li>
            </ul>
            <p className="mt-3 text-sm font-bold">Não dá para desfazer. Depois você escolhe de novo onde começar (A1 ou teste de nivelamento).</p>
            <label htmlFor="reset-confirm" className="mt-4 block text-sm font-bold">
              Para confirmar, digite {WORD}
            </label>
            <input id="reset-confirm" value={text} onChange={(e) => setText(e.target.value)} autoComplete="off" autoCapitalize="characters" className="field mt-1" disabled={pending} />
            {error && <p className="mt-3 rounded-xl bg-wrong-bg px-3 py-2 text-sm text-wrong">{error}</p>}
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setOpen(false)} disabled={pending} className="btn-ghost">
                Cancelar
              </button>
              <button type="submit" disabled={!ok || pending} className="btn bg-wrong text-white disabled:opacity-50">
                {pending && <Loader2 size={18} className="animate-spin" aria-hidden />} Apagar e recomeçar
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
