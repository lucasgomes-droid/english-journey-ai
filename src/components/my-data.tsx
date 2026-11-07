"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Download, Loader2, Trash2, X } from "lucide-react";
import { deleteAccount } from "@/app/actions/account";

const WORD = "EXCLUIR";

/** LGPD: baixar os próprios dados e excluir a conta (com confirmação digitada). */
export function MyData() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const ok = text.trim().toUpperCase() === WORD;

  return (
    <section className="panel p-6" aria-labelledby="meus-dados">
      <h2 id="meus-dados" className="font-display text-2xl font-bold">
        Meus dados
      </h2>
      <p className="mt-1 text-muted">
        Você pode baixar tudo o que o app guarda sobre você ou excluir a conta. Veja a <Link href="/privacidade" className="font-bold text-atlantic underline">política de privacidade</Link>.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a href="/api/account/export" className="btn-ghost inline-flex items-center gap-2" download>
          <Download size={18} aria-hidden /> Baixar meus dados
        </a>
        <button type="button" onClick={() => setOpen(true)} className="btn border-2 border-wrong text-wrong">
          <Trash2 size={18} aria-hidden /> Excluir minha conta
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-end bg-black/50 sm:place-items-center" role="dialog" aria-modal="true" aria-labelledby="excluir-titulo">
          <form
            className="animate-pop w-full max-w-lg rounded-t-3xl bg-surface p-6 sm:rounded-3xl"
            onSubmit={(e) => {
              e.preventDefault();
              if (!ok) return;
              setError(null);
              start(async () => {
                const r = await deleteAccount(text);
                if (r?.error) setError(r.error);
              });
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 id="excluir-titulo" className="font-display text-2xl font-bold">
                Excluir a conta para sempre?
              </h3>
              <button type="button" onClick={() => setOpen(false)} disabled={pending} className="grid size-9 shrink-0 place-items-center rounded-full hover:bg-surface-2" aria-label="Cancelar">
                <X size={20} aria-hidden />
              </button>
            </div>
            <p className="mt-2">Apaga sua conta e todos os dados: progresso, conversas, gravações, o que o professor lembra de você e preferências. Se quiser guardar uma cópia, baixe seus dados antes.</p>
            <p className="mt-3 text-sm font-bold">Não dá para desfazer.</p>
            <label htmlFor="excluir-confirm" className="mt-4 block text-sm font-bold">
              Para confirmar, digite {WORD}
            </label>
            <input id="excluir-confirm" value={text} onChange={(e) => setText(e.target.value)} autoComplete="off" autoCapitalize="characters" className="field mt-1" disabled={pending} />
            {error && <p className="mt-3 rounded-xl bg-wrong-bg px-3 py-2 text-sm text-wrong">{error}</p>}
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setOpen(false)} disabled={pending} className="btn-ghost">
                Cancelar
              </button>
              <button type="submit" disabled={!ok || pending} className="btn bg-wrong text-white disabled:opacity-50">
                {pending && <Loader2 size={18} className="animate-spin" aria-hidden />} Excluir conta
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
