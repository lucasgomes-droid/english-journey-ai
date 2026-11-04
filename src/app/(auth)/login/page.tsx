import Link from "next/link";
import { AuthForm } from "../auth-form";

export const metadata = { title: "Entrar" };

export default function LoginPage() {
  return (
    <>
      <h2 className="font-display text-3xl font-bold">Entrar</h2>
      <p className="mt-2 text-muted">Continue de onde parou.</p>
      <AuthForm mode="login" />
      <p className="mt-6 text-center text-muted">
        Ainda não tem conta?{" "}
        <Link href="/cadastro" className="font-bold text-atlantic underline-offset-4 hover:underline">
          Criar conta grátis
        </Link>
      </p>
    </>
  );
}
