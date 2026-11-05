import Link from "next/link";
import { AudioLines, BookOpenText, CalendarCheck, Headphones, RotateCcw, Shuffle, Timer, UserRound } from "lucide-react";
import { getSession } from "@/lib/data";
import { MINI_LESSONS } from "@/content/mini";
import { LISTENING } from "@/content/listening";

export const metadata = { title: "Praticar" };

type Tile = { href: string; icon: typeof Shuffle; title: string; text: string; badge?: string };

export default async function PraticarPage() {
  const { supabase, user } = await getSession();
  const { count } = await supabase.from("review_items").select("item_id", { count: "exact", head: true }).eq("user_id", user.id).lte("due_at", new Date().toISOString());

  const groups: { title: string; hint: string; tiles: Tile[] }[] = [
    {
      title: "Fixar o que aprendeu",
      hint: "Para não esquecer e corrigir seus pontos fracos.",
      tiles: [
        { href: "/revisao", icon: RotateCcw, title: "Revisão", text: count ? "Itens no ponto certo para você não esquecer." : "Nada pendente agora.", badge: count ? `${count}` : undefined },
        { href: "/praticar/adaptativo", icon: Shuffle, title: "Treino adaptativo", text: "12 exercícios escolhidos pelos seus erros." },
        { href: "/mini-aulas", icon: BookOpenText, title: "Mini-aulas", text: `${MINI_LESSONS.length} lições de 5 minutos para situações reais.` },
      ],
    },
    {
      title: "Falar e pronunciar",
      hint: "Sua voz analisada pelo reconhecedor de fala, sem notas inventadas.",
      tiles: [
        { href: "/pronuncia", icon: AudioLines, title: "Pronúncia", text: "Pares mínimos (think × sink), frases e shadowing." },
        { href: "/falar/desafio", icon: Timer, title: "Desafio de 1 minuto", text: "Fale sem parar e veja seu ritmo e como dizer melhor." },
        { href: "/falar/vida", icon: UserRound, title: "Fale sobre sua vida", text: "Frases em inglês sobre você, no seu nível." },
        { href: "/falar/semanal", icon: CalendarCheck, title: "Gravação semanal", text: "2 minutos por semana para ouvir sua evolução." },
      ],
    },
    {
      title: "Ouvir",
      hint: "Entender o inglês falado, em velocidade normal e lenta.",
      tiles: [{ href: "/listening", icon: Headphones, title: "Listening", text: `${LISTENING.length} áudios do A1 ao C2, com perguntas e ditado.` }],
    },
  ];

  return (
    <main className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-bold">Praticar</h1>
        <p className="mt-1 text-muted">Treinos rápidos além da trilha. Para conversar, use a aba Conversa.</p>
      </header>
      {groups.map((g) => (
        <section key={g.title} aria-labelledby={`g-${g.title}`}>
          <h2 id={`g-${g.title}`} className="font-display text-xl font-bold">
            {g.title}
          </h2>
          <p className="text-sm text-muted">{g.hint}</p>
          <ul className="mt-3 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {g.tiles.map((t) => (
              <li key={t.href}>
                <Link href={t.href} className="panel flex h-full items-start gap-4 p-5 transition-transform hover:-translate-y-0.5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-boarding/40 text-boarding-ink">
                    <t.icon size={22} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 font-display text-lg font-bold">
                      {t.title}
                      {t.badge && <span className="rounded-full bg-atlantic px-2 text-sm text-surface">{t.badge}</span>}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted">{t.text}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
