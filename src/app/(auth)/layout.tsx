import { LevelLine, Wordmark } from "@/components/brand";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid min-h-dvh lg:grid-cols-[1.1fr_1fr]">
      <section className="relative hidden flex-col justify-between overflow-hidden bg-hero p-12 text-white lg:flex">
        <div className="[&_span.text-muted]:text-white/60">
          <Wordmark />
        </div>
        <div className="max-w-md">
          <h1 className="font-display text-5xl font-bold">Do primeiro hello à fluência.</h1>
          <p className="mt-5 text-lg text-white/80">
            Aulas curtas explicadas em português, exercícios corrigidos na hora e um professor de IA que conversa com você em inglês e explica cada erro.
          </p>
          <div className="mt-10">
            <LevelLine current="A1" inverted />
          </div>
        </div>
        <p className="text-sm text-white/60">Seu progresso fica salvo e sincronizado entre computador e celular.</p>
      </section>
      <section className="flex flex-col justify-center px-4 py-10 sm:px-10">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10 lg:hidden">
            <Wordmark />
          </div>
          {children}
        </div>
      </section>
    </main>
  );
}
