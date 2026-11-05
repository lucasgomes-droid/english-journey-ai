import Link from "next/link";
import { Headphones, MessagesSquare, User } from "lucide-react";
import { LISTENING } from "@/content/listening";
import type { CefrLevel } from "@/content/types";
import { getSession } from "@/lib/data";

export const metadata = { title: "Listening" };

const LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export default async function ListeningPage({ searchParams }: { searchParams: Promise<{ nivel?: string }> }) {
  const { nivel } = await searchParams;
  const { supabase, user, profile } = await getSession();
  const level = (LEVELS.includes(nivel as CefrLevel) ? nivel : profile?.current_level ?? "A1") as CefrLevel;
  const { data } = await supabase.from("listening_results").select("item_id, score, total").eq("user_id", user.id);
  const best = new Map<string, number>();
  for (const r of data ?? []) best.set(r.item_id, Math.max(best.get(r.item_id) ?? 0, Math.round((r.score / r.total) * 100)));
  const items = LISTENING.filter((i) => i.level === level);

  return (
    <main>
      <h1 className="font-display text-3xl font-bold">Listening</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Ouça diálogos e textos reais do seu nível, responda às perguntas e escreva uma frase de ditado. Primeiro sem ler; a transcrição aparece depois que você responde.
      </p>
      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Nível">
        {LEVELS.map((l) => (
          <Link
            key={l}
            href={`/listening?nivel=${l}`}
            aria-current={l === level ? "page" : undefined}
            className={`rounded-full px-4 py-2 font-bold ${l === level ? "bg-atlantic text-surface" : "bg-surface-2 hover:bg-line"}`}
          >
            {l}
          </Link>
        ))}
      </nav>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((it) => {
          const b = best.get(it.id);
          return (
            <li key={it.id}>
              <Link href={`/listening/${it.id}`} className="panel flex items-center gap-4 p-4 transition-colors hover:border-atlantic">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-boarding/30 text-atlantic">
                  {it.kind === "dialogue" ? <MessagesSquare size={24} aria-hidden /> : <User size={24} aria-hidden />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg font-bold leading-tight">{it.title}</span>
                  <span className="block text-sm text-muted">
                    {it.topic} · {it.kind === "dialogue" ? "diálogo" : "monólogo"} · {it.questions.length} perguntas + ditado
                  </span>
                </span>
                {b !== undefined ? (
                  <span className={`chip ${b >= 75 ? "bg-correct-bg text-correct" : ""}`}>{b}%</span>
                ) : (
                  <Headphones size={20} className="text-muted" aria-hidden />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
