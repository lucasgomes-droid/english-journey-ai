"use client";

import { useTranslationPref } from "@/lib/translation";

/** 🇧🇷 Mostrar tradução / 🇬🇧 Praticar só em inglês. */
export function TranslationToggle() {
  const { on, set } = useTranslationPref();
  return (
    <button
      type="button"
      onClick={() => set(!on)}
      aria-pressed={on}
      className={`chip font-bold ${on ? "" : "bg-atlantic text-surface"}`}
      title={on ? "Traduções em português ligadas. Toque para praticar só em inglês." : "Praticando só em inglês. Toque para mostrar as traduções."}
    >
      <span aria-hidden>{on ? "🇧🇷" : "🇬🇧"}</span>
      <span className="hidden sm:inline">{on ? "Mostrar tradução" : "Só inglês"}</span>
      <span className="sr-only sm:hidden">{on ? "Tradução ligada" : "Só inglês"}</span>
    </button>
  );
}
