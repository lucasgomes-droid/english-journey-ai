"use client";

import { useState, useTransition } from "react";
import { X } from "lucide-react";
import { forgetFact } from "@/app/actions/preferences";

const KIND_PT: Record<string, string> = { work: "Trabalho", interest: "Interesse", goal: "Objetivo", family: "Família", place: "Onde vive", routine: "Rotina", preference: "Preferência" };

/** O que o professor lembra sobre você — visível e apagável a qualquer momento. */
export function TeacherMemory({ facts }: { facts: { id: number; kind: string; value: string }[] }) {
  const [list, setList] = useState(facts);
  const [, start] = useTransition();
  if (!list.length)
    return <p className="text-sm text-muted">Ainda nada. Conforme você conta sobre sua vida nas conversas (trabalho, interesses, metas), o Alex guarda aqui para personalizar as próximas.</p>;
  return (
    <ul className="flex flex-wrap gap-2">
      {list.map((f) => (
        <li key={f.id} className="flex items-center gap-1 rounded-full bg-surface-2 py-1 pl-3 pr-1 text-sm">
          <span className="font-bold">{KIND_PT[f.kind] ?? f.kind}:</span>
          <span lang="en">{f.value}</span>
          <button
            type="button"
            className="grid size-7 place-items-center rounded-full hover:bg-surface"
            aria-label={`Esquecer: ${f.value}`}
            onClick={() => {
              setList((l) => l.filter((x) => x.id !== f.id));
              start(async () => {
                await forgetFact(f.id);
              });
            }}
          >
            <X size={14} aria-hidden />
          </button>
        </li>
      ))}
    </ul>
  );
}
