"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { markStudied, startPracticePlan, verifyPracticePlan } from "@/app/actions/difficulties";

export function StartPlanButton({ category, label = "Começar plano de recuperação" }: { category: string; label?: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      className="btn-go"
      onClick={() =>
        start(async () => {
          const r = await startPracticePlan(category);
          if (r.ok) router.push(`/dificuldades/${category}`);
        })
      }
    >
      {pending && <Loader2 size={18} className="animate-spin" aria-hidden />} {label}
    </button>
  );
}

export function StudiedButton({ planId }: { planId: number }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <button type="button" disabled={pending} className="btn-primary" onClick={() => start(async () => (await markStudied(planId), router.refresh()))}>
      Entendi, vamos praticar
    </button>
  );
}

export function VerifyButton({ planId }: { planId: number }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<string | null>(null);
  return (
    <div>
      <button
        type="button"
        disabled={pending}
        className="btn-go"
        onClick={() =>
          start(async () => {
            const r = await verifyPracticePlan(planId);
            setMsg(r.ok ? r.summary : r.error);
            router.refresh();
          })
        }
      >
        {pending && <Loader2 size={18} className="animate-spin" aria-hidden />} Verificar minha evolução
      </button>
      {msg && (
        <p className="mt-2 text-sm" role="status">
          {msg}
        </p>
      )}
    </div>
  );
}
