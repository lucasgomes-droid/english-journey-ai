"use client";

import { useState } from "react";
import { MessagesSquare, PenLine } from "lucide-react";
import { LessonTalk } from "@/components/lesson-talk";
import { ProduceBody } from "@/components/produce-card";
import { useVoiceCaps } from "@/lib/voice";

/** Fim da aula: usar o que aprendeu — conversando com o Alex (voz) ou escrevendo. Opcional. */
export function UseItCard({ lessonId, objective, hint }: { lessonId: string; objective: string; hint: string }) {
  const caps = useVoiceCaps();
  const [mode, setMode] = useState<"talk" | "write">(caps.stt ? "talk" : "write");
  return (
    <section className="panel mt-4 p-6 text-left" aria-labelledby="use-voce-mesmo">
      <h2 id="use-voce-mesmo" className="font-display text-xl font-bold">
        Use você mesmo
      </h2>
      <div role="radiogroup" aria-label="Como praticar" className="mt-3 inline-flex rounded-full bg-surface-2 p-1">
        {(
          [
            ["talk", "Conversar com o Alex", MessagesSquare],
            ["write", "Escrever", PenLine],
          ] as const
        ).map(([k, label, Icon]) => (
          <button
            key={k}
            type="button"
            role="radio"
            aria-checked={mode === k}
            onClick={() => setMode(k)}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-bold ${mode === k ? "bg-atlantic text-surface" : ""}`}
          >
            <Icon size={16} aria-hidden /> {label}
          </button>
        ))}
      </div>
      <div className="mt-4">{mode === "talk" ? <LessonTalk lessonId={lessonId} /> : <ProduceBody lessonId={lessonId} objective={objective} hint={hint} />}</div>
      <p className="mt-3 text-xs text-muted">Opcional. Conta para o domínio desta aula no seu progresso.</p>
    </section>
  );
}
