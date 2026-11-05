"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/meu-professor", label: "Visão geral" },
  { href: "/dificuldades", label: "Dificuldades" },
  { href: "/avaliacoes", label: "Avaliações" },
  { href: "/relatorio", label: "Relatório semanal" },
];

/** Abas de "Meu progresso": tudo sobre a sua evolução num só lugar. */
export function ProgressTabs() {
  const pathname = usePathname();
  return (
    <nav aria-label="Meu progresso" className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1">
      {TABS.map((t) => {
        const active = pathname.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-bold ${active ? "border-atlantic bg-atlantic text-surface" : "border-line bg-surface text-muted hover:text-ink"}`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
