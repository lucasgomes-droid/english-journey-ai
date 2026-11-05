"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function applyTheme(t: "light" | "dark") {
  const root = document.documentElement;
  if (t === "dark") root.setAttribute("data-theme", "dark");
  else root.removeAttribute("data-theme");
}

/** Tema do app neste aparelho: creme (padrão) ou escuro. */
export function ThemeChoice() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lê a preferência salva no aparelho
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
  }, []);
  const choose = (t: "light" | "dark") => {
    setTheme(t);
    applyTheme(t);
    try {
      localStorage.setItem("ej-theme", t);
    } catch {}
  };
  return (
    <section className="panel flex flex-wrap items-center justify-between gap-4 p-6" aria-labelledby="tema">
      <div>
        <h2 id="tema" className="font-display text-2xl font-bold">
          Aparência
        </h2>
        <p className="text-sm text-muted">Vale para este aparelho.</p>
      </div>
      <div className="flex gap-2" role="radiogroup" aria-label="Tema">
        {(
          [
            ["light", "Claro", Sun],
            ["dark", "Escuro", Moon],
          ] as const
        ).map(([t, label, Icon]) => (
          <button
            key={t}
            type="button"
            role="radio"
            aria-checked={theme === t}
            onClick={() => choose(t)}
            className={`flex items-center gap-2 rounded-full border-2 px-4 py-2 font-bold ${theme === t ? "border-atlantic bg-atlantic text-surface" : "border-line bg-surface"}`}
          >
            <Icon size={18} aria-hidden /> {label}
          </button>
        ))}
      </div>
    </section>
  );
}
