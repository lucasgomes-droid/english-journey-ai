import Link from "next/link";
import { AuthForm } from "../auth-form";

export const metadata = { title: "Entrar" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ conta?: string }> }) {
  const deleted = (await searchParams).conta === "excluida";
  return (
    <>
      {deleted && (
        <p className="mb-4 rounded-xl bg-correct-bg px-4 py-3 text-correct" role="status">
          Sua conta e todos os seus dados foram excluídos.
        </p>
      )}
      <h2 className="font-display text-3xl font-bold">Entrar</h2>
      <p className="mt-2 text-muted">Continue de onde parou.</p>
      <AuthForm mode="login" />
      <p className="mt-6 text-center text-muted">
        Ainda não tem conta?{" "}
        <Link href="/cadastro" className="font-bold text-atlantic underline-offset-4 hover:underline">
          Criar conta grátis
        </Link>
      </p>
      <p className="mt-3 text-center text-sm">
        <Link href="/privacidade" className="text-muted underline">
          Privacidade e seus dados
        </Link>
      </p>
    </>
  );
}
