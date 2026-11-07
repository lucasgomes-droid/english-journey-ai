"use client";

import { useState, useTransition } from "react";
import { setCorrectionIntensity } from "@/app/actions/preferences";

export type Intensity = "leve" | "normal" | "intensa";

export const INTENSITY_INFO: Record<Intensity, { label: string; hint: string }> = {
  leve: { label: "Leve", hint: "Só corrige o que atrapalha o entendimento. O resto vai para o relatório." },
  normal: { label: "Normal", hint: "Corrige os erros claros e, de vez em quando, pede para você tentar de novo na hora." },
  intensa: { label: "Intensa", hint: "Corrige tudo e sempre pede para você tentar de novo na hora." },
};

/** Escolha de quanto o professor corrige (salva no perfil, vale em todos os aparelhos). */
export function IntensityPicker({ value, onChange, tone = "light", showHint = false }: { value: Intensity; onChange?: (v: Intensity) => void; tone?: "light" | "dark"; showHint?: boolean }) {
  const [current, setCurrent] = useState<Intensity>(value);
  const [, start] = useTransition();
  const pick = (v: Intensity) => {
    setCurrent(v);
    onChange?.(v);
    start(async () => {
      await setCorrectionIntensity(v);
    });
  };
  const base = tone === "dark" ? "bg-white/10 text-white" : "bg-surface-2";
  const on = tone === "dark" ? "bg-boarding text-boarding-ink" : "bg-atlantic text-surface";
  return (
    <div>
      <div role="radiogroup" aria-label="Intensidade da correção" className={`inline-flex rounded-full p-1 ${base}`}>
        {(Object.keys(INTENSITY_INFO) as Intensity[]).map((k) => (
          <button
            key={k}
            type="button"
            role="radio"
            aria-checked={current === k}
            onClick={() => pick(k)}
            className={`rounded-full px-3 py-1 text-xs font-bold transition ${current === k ? on : ""}`}
          >
            {INTENSITY_INFO[k].label}
          </button>
        ))}
      </div>
      {showHint && <p className={`mt-1 text-xs ${tone === "dark" ? "text-white/70" : "text-muted"}`}>{INTENSITY_INFO[current].hint}</p>}
    </div>
  );
}

/** Regra da correção na hora: intensa = sempre; normal = no máximo 1 a cada 3 falas; leve = nunca. */
export function shouldFixNow(intensity: Intensity, turnsSinceLastFix: number) {
  if (intensity === "intensa") return true;
  if (intensity === "normal") return turnsSinceLastFix >= 2;
  return false;
}
