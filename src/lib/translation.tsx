"use client";

import { createContext, useContext, useOptimistic, useTransition } from "react";
import { setShowTranslation } from "@/app/actions/preferences";

const Ctx = createContext<{ on: boolean; set: (v: boolean) => void }>({ on: true, set: () => {} });

/** Preferência de tradução em português, salva no perfil. */
export function TranslationProvider({ initial, children }: { initial: boolean; children: React.ReactNode }) {
  const [on, setOptimistic] = useOptimistic(initial);
  const [, start] = useTransition();
  const set = (v: boolean) =>
    start(async () => {
      setOptimistic(v);
      await setShowTranslation(v);
    });
  return <Ctx.Provider value={{ on, set }}>{children}</Ctx.Provider>;
}

export const useTranslationPref = () => useContext(Ctx);
