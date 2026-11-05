import Link from "next/link";
import { Check } from "lucide-react";
import { MINI_MODULES } from "@/content/mini";
import { getScenario } from "@/content/scenarios";
import { getCompletedLessons, getSession } from "@/lib/data";
import { Avatar } from "@/components/avatar";

export const metadata = { title: "Mini-aulas" };

export default async function MiniAulasPage() {
  const { supabase, user } = await getSession();
  const { completed } = await getCompletedLessons(supabase, user.id);

  return (
    <main>
      <h1 className="font-display text-3xl font-bold">Mini-aulas</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Lições de 5 minutos para situações reais. Aprenda as frases-chave, pratique e termine conversando com um personagem. Todas ficam sempre abertas, fora da ordem da trilha.
      </p>
      {MINI_MODULES.map((m) => (
        <section key={m.id} className="mt-8" aria-labelledby={m.id}>
          <h2 id={m.id} className="flex items-center gap-2 font-display text-2xl font-bold">
            <span className="rounded-xl bg-atlantic px-2.5 py-1 text-base text-surface">{m.level}</span>
            {m.level === "A1" ? "Primeiras situações" : m.level === "A2" ? "Viagem e serviços" : m.level === "B1" ? "Trabalho e telefone" : "Inglês profissional"}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {m.lessons.map((l) => {
              const sc = getScenario(l.scenarioId ?? "");
              const done = completed.has(l.id);
              return (
                <li key={l.id}>
                  <Link href={`/aula/${l.id}`} className="panel group flex items-center gap-4 p-3 pr-5 transition-colors hover:border-atlantic">
                    <span className="relative size-20 shrink-0 overflow-hidden rounded-2xl">
                      {sc && <Avatar look={sc.character.look} className="size-full transition-transform duration-300 group-hover:scale-110" />}
                      {done && (
                        <span className="absolute bottom-1 right-1 grid size-6 place-items-center rounded-full bg-boarding text-boarding-ink" aria-label="Concluída">
                          <Check size={14} strokeWidth={3} aria-hidden />
                        </span>
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-lg font-bold leading-tight">{l.title}</span>
                      <span className="mt-0.5 block text-sm text-muted">{l.objective}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </main>
  );
}
