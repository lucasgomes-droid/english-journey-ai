"use client";

import { useActionState } from "react";
import { signIn, signUp, type FormState } from "@/app/actions/account";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [state, action, pending] = useActionState<FormState, FormData>(mode === "login" ? signIn : signUp, {});
  return (
    <form action={action} className="mt-8 space-y-4">
      {mode === "signup" && (
        <label className="block">
          <span className="mb-1.5 block font-bold">Como podemos te chamar?</span>
          <input name="name" required minLength={2} autoComplete="given-name" className="field" placeholder="Seu nome" />
        </label>
      )}
      <label className="block">
        <span className="mb-1.5 block font-bold">E-mail</span>
        <input name="email" type="email" required autoComplete="email" className="field" placeholder="voce@email.com" />
      </label>
      <label className="block">
        <span className="mb-1.5 block font-bold">Senha</span>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          className="field"
          placeholder="Mínimo de 8 caracteres"
        />
      </label>
      {state.error && (
        <p role="alert" className="rounded-xl bg-wrong-bg px-4 py-3 text-wrong">
          {state.error}
        </p>
      )}
      {state.message && (
        <p role="status" className="rounded-xl bg-correct-bg px-4 py-3 text-correct">
          {state.message}
        </p>
      )}
      <button type="submit" disabled={pending} className="btn-primary w-full">
        {pending ? "Aguarde…" : mode === "login" ? "Entrar" : "Criar conta"}
      </button>
    </form>
  );
}
