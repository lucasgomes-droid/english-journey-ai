"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Route, Dumbbell, MessagesSquare, User } from "lucide-react";

const ITEMS = [
  { href: "/", label: "Início", icon: Home, match: ["/"] },
  { href: "/trilha", label: "Trilha", icon: Route, match: ["/trilha", "/aula"] },
  { href: "/praticar", label: "Praticar", icon: Dumbbell, match: ["/praticar", "/mini-aulas", "/listening", "/revisao", "/diagnostico"] },
  { href: "/conversar", label: "Conversar", icon: MessagesSquare, match: ["/conversar", "/professor"] },
  { href: "/perfil", label: "Perfil", icon: User, match: ["/perfil"] },
];

export function AppNav({
  dueReviews,
  variant,
}: {
  dueReviews: number;
  variant: "sidebar" | "bottom";
}) {
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
            className={`flex items-center gap-3 rounded-xl px-4 py-3 font-bold ${
              isActive(href)
                ? "bg-atlantic text-surface"
                : "text-ink hover:bg-surface-2"
            }`}
          >
            <Icon size={20} aria-hidden />
            {label}
            {href === "/praticar" && dueReviews > 0 && (
              <span className="ml-auto rounded-full bg-boarding px-2 text-sm text-boarding-ink">
                {dueReviews}
              </span>
            )}
          </Link>
        ))}
      </nav>
    );
  return (
    <nav
      aria-label="Principal"
      className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      {ITEMS.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          aria-current={isActive(href) ? "page" : undefined}
          className={`relative flex flex-col items-center gap-0.5 py-2.5 text-[0.7rem] font-bold ${isActive(href) ? "text-atlantic" : "text-muted"}`}
        >
          <Icon size={22} aria-hidden />
          {label}
          {href === "/praticar" && dueReviews > 0 && (
            <span
              className="absolute right-[22%] top-1 size-2.5 rounded-full bg-boarding"
              aria-label={`${dueReviews} revisões pendentes`}
            />
          )}
        </Link>
      ))}
    </nav>
  );
}
