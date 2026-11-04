"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Route, Dumbbell, MessagesSquare, Mic, Headphones, Sparkles, TriangleAlert, ClipboardCheck, User, LayoutGrid, X } from "lucide-react";

/** As 10 áreas do app, na ordem do menu. */
const ITEMS = [
  { href: "/", label: "Início", icon: Home, match: ["/"] },
  { href: "/trilha", label: "Minha Trilha", short: "Trilha", icon: Route, match: ["/trilha", "/aula"] },
  { href: "/praticar", label: "Praticar", icon: Dumbbell, match: ["/praticar", "/mini-aulas", "/revisao", "/falar"] },
  { href: "/conversar", label: "Conversação", short: "Conversar", icon: MessagesSquare, match: ["/conversar", "/professor"] },
  { href: "/pronuncia", label: "Pronúncia", icon: Mic, match: ["/pronuncia"] },
  { href: "/listening", label: "Listening", icon: Headphones, match: ["/listening"] },
  { href: "/meu-professor", label: "Meu Professor IA", icon: Sparkles, match: ["/meu-professor", "/diagnostico"] },
  { href: "/dificuldades", label: "Minhas Dificuldades", icon: TriangleAlert, match: ["/dificuldades"] },
  { href: "/avaliacoes", label: "Avaliações", icon: ClipboardCheck, match: ["/avaliacoes", "/prova"] },
  { href: "/perfil", label: "Meu Perfil", icon: User, match: ["/perfil"] },
];

/** No celular cabem 4 atalhos + "Mais" (que abre as 10 áreas). */
const BOTTOM = ["/", "/trilha", "/conversar", "/praticar"];

export function AppNav({ dueReviews, variant }: { dueReviews: number; variant: "sidebar" | "bottom" }) {
  const pathname = usePathname();
  const [more, setMore] = useState(false);
  const isActive = (href: string) => {
    const item = ITEMS.find((i) => i.href === href)!;
    return href === "/" ? pathname === "/" : item.match.some((m) => pathname.startsWith(m));
  };
  // Fecha a folha "Mais" ao navegar.
  // eslint-disable-next-line react-hooks/set-state-in-effect -- reação à mudança de rota
  useEffect(() => setMore(false), [pathname]);

  const badge = (href: string) =>
    href === "/praticar" && dueReviews > 0 ? (
      <span className="ml-auto rounded-full bg-boarding px-2 text-sm text-boarding-ink" aria-label={`${dueReviews} revisões pendentes`}>
        {dueReviews}
      </span>
    ) : null;

  if (variant === "sidebar")
    return (
      <nav aria-label="Principal" className="hidden flex-col gap-0.5 lg:flex">
        {ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-current={isActive(href) ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-4 py-2.5 font-bold ${isActive(href) ? "bg-atlantic text-surface" : "text-ink hover:bg-surface-2"}`}
          >
            <Icon size={20} aria-hidden />
            {label}
            {badge(href)}
          </Link>
        ))}
      </nav>
    );

  const bottom = ITEMS.filter((i) => BOTTOM.includes(i.href));
  const moreActive = !bottom.some((i) => isActive(i.href));
  return (
    <>
      <nav aria-label="Principal" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden">
        {bottom.map(({ href, label, short, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-current={isActive(href) ? "page" : undefined}
            className={`relative flex flex-col items-center gap-1 py-2.5 text-xs font-bold ${isActive(href) ? "text-atlantic" : "text-muted"}`}
          >
            <Icon size={22} aria-hidden />
            {short ?? label}
            {href === "/praticar" && dueReviews > 0 && <span className="absolute right-[22%] top-1.5 size-2.5 rounded-full bg-boarding" aria-label={`${dueReviews} revisões pendentes`} />}
          </Link>
        ))}
        <button type="button" onClick={() => setMore(true)} aria-expanded={more} className={`flex flex-col items-center gap-1 py-2.5 text-xs font-bold ${moreActive ? "text-atlantic" : "text-muted"}`}>
          <LayoutGrid size={22} aria-hidden />
          Mais
        </button>
      </nav>
      {more && (
        <div className="fixed inset-0 z-50 grid place-items-end bg-black/50 lg:hidden" role="dialog" aria-modal="true" aria-label="Todas as áreas" onClick={() => setMore(false)}>
          <div className="animate-pop w-full rounded-t-3xl bg-surface p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <p className="font-display text-xl font-bold">Todas as áreas</p>
              <button type="button" onClick={() => setMore(false)} className="grid size-10 place-items-center rounded-full hover:bg-surface-2" aria-label="Fechar">
                <X size={20} aria-hidden />
              </button>
            </div>
            <ul className="grid grid-cols-2 gap-2">
              {ITEMS.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive(href) ? "page" : undefined}
                    className={`flex min-h-14 items-center gap-3 rounded-2xl px-3 py-3 font-bold ${isActive(href) ? "bg-atlantic text-surface" : "bg-surface-2 text-ink"}`}
                  >
                    <Icon size={20} className="shrink-0" aria-hidden />
                    <span className="leading-tight">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
