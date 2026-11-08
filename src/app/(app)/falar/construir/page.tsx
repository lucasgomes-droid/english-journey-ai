import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSession } from "@/lib/data";
import { buildFor } from "@/content/build-situations";
import { LEVELS } from "@/content/curriculum";
import type { CefrLevel } from "@/content/types";
import { BuildTrainer } from "./build-trainer";

export const metadata = { title: "Construir frases" };

export default async function ConstruirPage({
  searchParams,
}: {
  searchParams: Promise<{ nivel?: string }>;
}) {
  const { profile } = await getSession();
  const { nivel } = await searchParams;
  const codes = LEVELS.map((l) => l.code);
  const level = (
    codes.includes(nivel as CefrLevel)
      ? nivel
      : (profile?.current_level ?? "A1")
  ) as CefrLevel;
  return (
    <main className="mx-auto max-w-2xl">
      <Link
        href="/praticar"
        className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink"
      >
        <ArrowLeft size={16} aria-hidden /> Praticar
      </Link>
      <h1 className="mt-1 font-display text-4xl font-bold">Construir frases</h1>
      <p className="mt-2 text-muted">
        Leia a situação, monte sua resposta em inglês (falando ou escrevendo),
        veja a correção e repita a versão certa em voz alta.
      </p>
      <nav className="mt-4 flex flex-wrap gap-2" aria-label="Nível">
        {codes.map((c) => (
          <Link
            key={c}
            href={`/falar/construir?nivel=${c}`}
            className={`chip ${c === level ? "bg-ink text-paper" : ""}`}
            aria-current={c === level ? "page" : undefined}
          >
            {c}
          </Link>
        ))}
      </nav>
      <BuildTrainer key={level} level={level} situations={buildFor(level)} />
    </main>
  );
}
