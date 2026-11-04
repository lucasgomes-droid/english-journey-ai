import Link from "next/link";
import { AudioLines, BarChart3, BookOpenText, CalendarCheck, Headphones, Phone, RotateCcw, Shuffle, Timer, UserRound } from "lucide-react";
import { getSession } from "@/lib/data";
import { MINI_LESSONS } from "@/content/mini";
import { LISTENING } from "@/content/listening";

export const metadata = { title: "Praticar" };

export default async function PraticarPage() {
  const { supabase, user } = await getSession();
  const { count } = await supabase.from("review_items").select("item_id", { count: "exact", head: true }).eq("user_id", user.id).lte("due_at", new Date().toISOString());

  const tiles = [
    { href: "/praticar/adaptativo", icon: Shuffle, title: "Treino adaptativo", text: "12 exercícios escolhidos pelos seus erros: mais do que você erra, menos do que já domina.", tone: "bg-[#0e4d57] text-white" },
    { href: "/professor?ligar=1", icon: Phone, title: "Ligação com o professor", text: "Conversa só por voz, como uma ligação. Correções no final.", tone: "bg-[#ffd6a5] text-[#3d2200]" },
    { href: "/falar/vida", icon: UserRound, title: "Fale sobre sua vida", text: "Conte sobre você e ganhe frases em inglês no seu nível para treinar.", tone: "bg-[#ffe5ec] text-[#4a1426]" },
    { href: "/falar/desafio", icon: Timer, title: "Desafio de 1 minuto", text: "Fale sem parar sobre um tema. Veja seu ritmo e como dizer melhor.", tone: "bg-[#d8f3dc] text-[#10361b]" },
    { href: "/falar/semanal", icon: CalendarCheck, title: "Gravação semanal", text: "2 minutos por semana para ouvir sua evolução.", tone: "bg-[#e9e3ff] text-[#241a4d]" },
    { href: "/pronuncia", icon: AudioLines, title: "Pronúncia", text: "Pares mínimos (think × sink), sons em frases e shadowing.", tone: "bg-[#bde0fe] text-[#0b2540]" },
    { href: "/mini-aulas", icon: BookOpenText, title: "Mini-aulas", text: `${MINI_LESSONS.length} lições de 5 minutos: pedir comida, se apresentar, aeroporto, entrevista…`, tone: "bg-boarding text-boarding-ink" },
    { href: "/listening", icon: Headphones, title: "Listening", text: `${LISTENING.length} áudios do A1 ao C2, com perguntas e ditado.`, tone: "bg-[#ffd6a5] text-[#3d2200]" },
    { href: "/revisao", icon: RotateCcw, title: "Revisão", text: count ? `${count} ${count === 1 ? "item espera" : "itens esperam"} por você agora.` : "Nada pendente agora. Volte mais tarde.", tone: "bg-[#e7c8dd] text-[#3d1d33]" },
    { href: "/relatorio", icon: BarChart3, title: "Relatório semanal", text: "Sua semana comparada com a anterior: tempo, acertos, conversa, pronúncia e erros por tema.", tone: "bg-[#cfe8d8] text-[#12391f]" },
  ];

  return (
    <main>
      <h1 className="font-display text-4xl font-bold">Praticar</h1>
      <p className="mt-2 text-muted">Treinos rápidos fora da trilha, para usar quando quiser.</p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {tiles.map((t) => (
          <li key={t.href}>
            <Link href={t.href} className={`group flex h-full min-h-44 flex-col justify-between rounded-3xl p-6 transition-transform hover:-translate-y-0.5 ${t.tone}`}>
              <t.icon size={32} aria-hidden />
              <span>
                <span className="block font-display text-2xl font-bold">{t.title}</span>
                <span className="mt-1 block opacity-80">{t.text}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
