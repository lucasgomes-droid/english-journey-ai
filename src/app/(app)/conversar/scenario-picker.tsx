"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MessagesSquare, Plus, X } from "lucide-react";
import { Avatar } from "@/components/avatar";
import type { AvatarLook, Place } from "@/content/scenarios";
import { SceneBackdrop } from "@/components/scene-backdrop";

interface Card {
  id: string;
  title: string;
  category: string;
  name: string;
  role: string;
  look: AvatarLook;
  place: Place;
  mission: string;
}

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
const LEVEL_HINT: Record<string, string> = {
  A1: "frases curtas e simples",
  A2: "conversa do dia a dia",
  B1: "conversa natural",
  B2: "ritmo real, expressões",
  C1: "nuance e idioms",
  C2: "como um nativo",
};

export function ScenarioPicker({ scenarios, defaultLevel, categoryOrder }: { scenarios: Card[]; defaultLevel: string; categoryOrder: readonly string[] }) {
  const [level, setLevel] = useState(defaultLevel);
  const [category, setCategory] = useState("Todas");
  const [creating, setCreating] = useState(false);
  const [scene, setScene] = useState("");
  const router = useRouter();
  const categories = ["Todas", ...categoryOrder.filter((c) => scenarios.some((s) => s.category === c))];
  const list = category === "Todas" ? scenarios : scenarios.filter((s) => s.category === category);

  return (
    <>
      <div className="sticky top-0 z-10 -mx-4 mt-6 space-y-3 bg-paper/95 px-4 py-3 backdrop-blur">
        <div className="flex flex-wrap items-center gap-2" role="radiogroup" aria-label="Nível da conversa">
          <span className="mr-1 text-sm font-bold text-muted">Nível</span>
          {LEVELS.map((l) => (
            <button
              key={l}
              type="button"
              role="radio"
              aria-checked={level === l}
              onClick={() => setLevel(l)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors ${level === l ? "bg-atlantic text-surface" : "bg-surface-2 text-ink hover:bg-line"}`}
            >
              {l}
            </button>
          ))}
          <span className="text-sm text-muted">· {LEVEL_HINT[level]}</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Categorias">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={category === c}
              onClick={() => setCategory(c)}
              className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-bold ${category === c ? "border-ink text-ink" : "border-line text-muted"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-4 grid grid-cols-2 gap-3 pb-20 sm:grid-cols-3 lg:grid-cols-4 lg:pb-0">
        <li>
          <Link href="/professor" className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-3xl bg-[#0e4d57] p-4 text-white">
            <MessagesSquare className="absolute left-4 top-4 opacity-80" size={28} aria-hidden />
            <span className="font-display text-lg font-bold leading-tight">Professor Alex</span>
            <span className="text-sm text-white/80">Conversa livre sobre qualquer assunto</span>
          </Link>
        </li>
        <li className="hidden lg:block">
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-line p-4 text-center text-muted transition-colors hover:border-atlantic hover:text-ink"
          >
            <span className="grid size-14 place-items-center rounded-full bg-boarding text-boarding-ink">
              <Plus size={28} aria-hidden />
            </span>
            <span className="font-display text-lg font-bold text-ink">Crie a sua situação</span>
            <span className="text-sm">Descreva qualquer cena e a IA faz o outro papel</span>
          </button>
        </li>
        {list.map((s) => (
          <li key={s.id}>
            <Link
              href={`/professor?cenario=${s.id}&nivel=${level}`}
              className="group relative block aspect-[4/5] overflow-hidden rounded-3xl ring-line transition-transform hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
              title={s.mission}
            >
              <SceneBackdrop place={s.place} className="absolute inset-0 size-full transition-transform duration-300 group-hover:scale-105" />
              <Avatar look={s.look} className="absolute left-1/2 top-[14%] size-[58%] -translate-x-1/2 overflow-hidden rounded-full border-4 border-white/70" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 pt-10 text-white">
                <span className="block font-display text-lg font-bold leading-tight">{s.title}</span>
                <span className="block text-sm text-white/80">
                  {s.name}, {s.role}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Crie o seu */}
      <button
        type="button"
        onClick={() => setCreating(true)}
        className="btn-go fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full px-6 shadow-lg lg:hidden"
      >
        <Plus size={20} aria-hidden /> Crie a sua situação
      </button>

      {creating && (
        <div className="fixed inset-0 z-40 grid place-items-end bg-black/50 sm:place-items-center" role="dialog" aria-modal="true" aria-labelledby="crie-titulo">
          <form
            className="animate-pop w-full max-w-lg rounded-t-3xl bg-surface p-6 sm:rounded-3xl"
            onSubmit={(e) => {
              e.preventDefault();
              if (scene.trim().length < 8) return;
              router.push(`/professor?cena=${encodeURIComponent(scene.trim())}&nivel=${level}`);
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id="crie-titulo" className="font-display text-2xl font-bold">
                Crie a sua situação
              </h2>
              <button type="button" onClick={() => setCreating(false)} aria-label="Fechar" className="grid size-9 place-items-center rounded-full hover:bg-surface-2">
                <X size={20} aria-hidden />
              </button>
            </div>
            <p className="mt-1 text-muted">Descreva a cena em português ou inglês. A IA assume o outro papel no nível {level}.</p>
            <textarea
              autoFocus
              value={scene}
              onChange={(e) => setScene(e.target.value)}
              maxLength={400}
              rows={4}
              className="field mt-4"
              placeholder="Ex.: Estou num aeroporto em Londres e perdi minha conexão. Preciso remarcar o voo com a atendente."
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {["Devolver um produto com defeito", "Pedir um aumento ao meu chefe", "Conhecer os pais da namorada", "Marcar consulta no dentista"].map((ex) => (
                <button key={ex} type="button" onClick={() => setScene(ex)} className="rounded-full border border-line px-3 py-1 text-sm hover:bg-surface-2">
                  {ex}
                </button>
              ))}
            </div>
            <button type="submit" disabled={scene.trim().length < 8} className="btn-primary mt-5 w-full">
              Começar a conversa
            </button>
          </form>
        </div>
      )}
    </>
  );
}
