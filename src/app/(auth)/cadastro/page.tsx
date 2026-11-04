import Link from "next/link";
import { AuthForm } from "../auth-form";

export const metadata = { title: "Criar conta" };

export default function SignUpPage() {
  return (
    <>
      <h2 className="font-display text-3xl font-bold">Criar conta</h2>
      <p className="mt-2 text-muted">Comece do zero no A1. Leva menos de um minuto.</p>
      <AuthForm mode="signup" />
      <p className="mt-6 text-center text-muted">
        Já tem conta?{" "}
        <Link href="/login" className="font-bold text-atlantic underline-offset-4 hover:underline">
          Entrar
        </Link>
      </p>
    </>
  );
}
