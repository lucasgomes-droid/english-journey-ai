"use client";

import { useState } from "react";
import { useTranslationPref } from "@/lib/translation";

/**
 * Texto em português (tradução). Com a tradução ligada, aparece direto.
 * No modo "só inglês", fica escondido e o aluno pode tocar para ver (sem entregar de graça).
 */
export function Pt({ children, className = "text-muted" }: { children: React.ReactNode; className?: string }) {
  const { on } = useTranslationPref();
  const [peek, setPeek] = useState(false);
  if (on || peek) return <span className={className}>{children}</span>;
  return (
    <button type="button" onClick={() => setPeek(true)} className="text-sm font-bold text-muted underline decoration-dotted underline-offset-4" aria-label="Ver a tradução em português">
      ver tradução
    </button>
  );
}
