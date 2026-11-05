"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Route, Dumbbell, MessagesSquare, TrendingUp, User } from "lucide-react";

/** Menu focado no estudo: só o que faz o aluno evoluir. */
const ITEMS = [
  { href: "/", label: "Início", icon: Home, match: ["/"] },
  { href: "/trilha", label: "Trilha", icon: Route, match: ["/trilha", "/aula", "/prova", "/nivelamento"] },
  { href: "/praticar", label: "Praticar", icon: Dumbbell, match: ["/praticar", "/mini-aulas", "/revisao", "/falar", "/pronuncia", "/listening"] },
  { href: "/conversa", label: "Conversa", icon: MessagesSquare, match: ["/conversa", "/conversar", "/professor"] },
  { href: "/meu-professor", label: "Meu progresso", short: "Progresso", icon: TrendingUp, match: ["/meu-professor", "/dificuldades", "/avaliacoes", "/relatorio", "/diagnostico"] },
  { href: "/perfil", label: "Perfil", icon: User, match: ["/perfil"] },
];

export function AppNav({ dueReviews, variant }: { dueReviews: number; variant: "sidebar" | "bottom" }) {
  const pathname = usePathname();
  const isActive = (href: string) => {
    const item = ITEMS.find((i) => i.href === href)!;
    return href === "/" ? pathname === "/" : item.match.some((m) => pathname.startsWith(m));
  };

  if (variant === "sidebar")
    return (
      <nav aria-label="Principal" className="hidden flex-col gap-1 lg:flex">
        {ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-current={isActive(href) ? "page" : undefined}
            className={`flex items-center gap-3 rounded-2xl px-4 py-2.5 font-bold transition-colors ${isActive(href) ? "bg-surface text-ink shadow-sm" : "text-muted hover:bg-surface/60 hover:text-ink"}`}
          >
            <Icon size={20} className={isActive(href) ? "text-atlantic" : ""} aria-hidden />
            {label}
            {href === "/praticar" && dueReviews > 0 && (
              <span className="ml-auto rounded-full bg-boarding px-2 text-sm text-boarding-ink" aria-label={`${dueReviews} revisões pendentes`}>
                {dueReviews}
              </span>
            )}
          </Link>
        ))}
      </nav>
    );

  return (
    <nav aria-label="Principal" className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden">
      {ITEMS.filter((i) => i.href !== "/perfil").map(({ href, label, short, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          aria-current={isActive(href) ? "page" : undefined}
          className={`relative flex flex-col items-center gap-1 py-2.5 text-xs font-bold ${isActive(href) ? "text-atlantic" : "text-muted"}`}
        >
          <Icon size={22} aria-hidden />
          {short ?? label}
          {href === "/praticar" && dueReviews > 0 && <span className="absolute right-[24%] top-1.5 size-2.5 rounded-full bg-boarding" aria-label={`${dueReviews} revisões pendentes`} />}
        </Link>
      ))}
    </nav>
  );
}
