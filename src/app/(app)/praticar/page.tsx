import Link from "next/link";
import { AudioLines, BookA, BookOpenText, Blocks, CalendarCheck, CheckCircle2, Clock, Headphones, RotateCcw, Settings2, Shuffle, Timer, UserRound } from "lucide-react";
import { getDashboard, getSession } from "@/lib/data";
import { MINI_LESSONS } from "@/content/mini";
import { LISTENING } from "@/content/listening";
import { ALL_LESSONS, LEVEL_ORDER, getModule } from "@/content/curriculum";
import { loadIndicators } from "@/lib/indicators";
import { BLOCK_ICON, planInputFrom } from "@/lib/routine";
import { DONE_BY, paceEstimate, planWeek } from "@/lib/planner";
import type { CefrLevel } from "@/content/types";

export const metadata = { title: "Praticar" };

const WEEKDAY = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const DATE = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", timeZone: "UTC" });

type Tile = { href: string; icon: typeof Shuffle; title: string; text: string };

/** Praticar = o treino de hoje (montado pelos seus dados) + a semana + os demais treinos. */
export default async function PraticarPage() {
  const { supabase, user } = await getSession();
  const d = await getDashboard();
  const ind = await loadIndicators(supabase, user.id, d.profile.current_level);
  const input = planInputFrom(
    d,
    ind.mastery.toReinforce.map((o) => ({ lessonId: o.lessonId, title: o.title })),
  );
  const todayIso = d.weekXp[6].date;
  const week = planWeek(input, todayIso);
  const today = week[0];
  const done = new Set(d.todayKinds);
  const isDone = (k: keyof typeof DONE_BY) => DONE_BY[k].some((x) => done.has(x));
  const doneMinutes = today.blocks.filter((b) => isDone(b.kind)).reduce((s, b) => s + b.minutes, 0);

  // Ritmo × prazo (só quando o aluno escolheu nível e data).
  const p = d.profile;
  const target = p.target_level as CefrLevel | null | undefined;
  let pace: ReturnType<typeof paceEstimate> | null = null;
  let remaining = 0;
  if (target && LEVEL_ORDER.indexOf(target) > LEVEL_ORDER.indexOf(p.current_level)) {
    const from = d.nextLesson ? ALL_LESSONS.findIndex((l) => l.id === d.nextLesson!.id) : ALL_LESSONS.length;
    const lastIdx = ALL_LESSONS.map((l) => getModule(l.moduleId)?.level).lastIndexOf(target);
    remaining = Math.max(0, lastIdx - from + 1);
    pace = paceEstimate({ lessonsRemaining: remaining, lessonsPerWeek: Math.round((ind.activity.month.lessons / 4) * 10) / 10, targetDate: p.target_date ?? null, todayIso });
  }

  const more: Tile[] = [
    { href: "/revisao", icon: RotateCcw, title: "Revisão", text: d.dueReviews ? `${d.dueReviews} itens no ponto certo para não esquecer.` : "Nada pendente agora." },
    { href: "/praticar/adaptativo", icon: Shuffle, title: "Treino adaptativo", text: "12 exercícios escolhidos pelos seus erros." },
    { href: "/mini-aulas", icon: BookOpenText, title: "Mini-aulas", text: `${MINI_LESSONS.length} lições de 5 minutos para situações reais.` },
    { href: "/pronuncia", icon: AudioLines, title: "Pronúncia", text: "Pares mínimos, frases e shadowing." },
    { href: "/vocabulario", icon: BookA, title: "Vocabulário", text: "Suas palavras: áudio, exemplo, histórico e o que está esquecendo." },
    { href: "/falar/construir", icon: Blocks, title: "Construir frases", text: "Situação → sua resposta → correção → repita a versão certa." },
    { href: "/falar/desafio", icon: Timer, title: "Desafio de 1 minuto", text: "Fale sem parar e veja como dizer melhor." },
    { href: "/falar/vida", icon: UserRound, title: "Fale sobre sua vida", text: "Frases em inglês sobre você." },
    { href: "/falar/semanal", icon: CalendarCheck, title: "Gravação semanal", text: "2 minutos por semana para ouvir sua evolução." },
    { href: "/listening", icon: Headphones, title: "Listening", text: `${LISTENING.length} áudios do A1 ao C2.` },
  ];

  return (
    <main className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Treino de hoje</h1>
          <p className="mt-1 text-muted">
            {today.rest ? "Hoje é dia de descanso no seu plano — se quiser, faça um treino leve." : `Montado com o seu tempo (${p.daily_minutes} min), seus erros e o que vence hoje.`}
          </p>
        </div>
        <Link href="/perfil#prefs" className="btn-ghost inline-flex items-center gap-2 text-sm">
          <Settings2 size={16} aria-hidden /> Ajustar plano
        </Link>
      </header>

      <section className="panel p-5" aria-labelledby="hoje">
        <div className="flex items-center justify-between gap-2">
          <h2 id="hoje" className="font-display text-xl font-bold">
            {today.rest ? "Sugestão leve" : "Hoje"}
          </h2>
          <span className="flex items-center gap-1 text-sm text-muted">
            <Clock size={14} aria-hidden /> {doneMinutes} de {today.rest ? 0 : today.minutes} min
          </span>
        </div>
        <ol className="mt-3 space-y-2">
          {(today.rest ? week.find((w) => !w.rest)?.blocks.slice(0, 2) ?? [] : today.blocks).map((b) => {
            const Icon = BLOCK_ICON[b.kind];
            const ok = isDone(b.kind);
            return (
              <li key={b.kind + b.href}>
                <Link href={b.href} className="flex items-center gap-4 rounded-2xl bg-surface-2 p-4 transition hover:-translate-y-0.5">
                  <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${ok ? "bg-correct/15 text-correct" : "bg-boarding/40 text-boarding-ink"}`}>
                    {ok ? <CheckCircle2 size={22} aria-label="Feito hoje" /> : <Icon size={22} aria-hidden />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block font-bold ${ok ? "text-muted line-through" : ""}`}>{b.title}</span>
                    <span className="block truncate text-sm text-muted">{b.detail}</span>
                  </span>
                  <span className="shrink-0 text-sm tabular-nums text-muted">{b.minutes} min</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <section aria-labelledby="semana-plano">
        <h2 id="semana-plano" className="font-display text-xl font-bold">
          Sua semana
        </h2>
        <ol className="mt-3 grid grid-cols-7 gap-1.5 sm:gap-2" aria-label="Plano dos próximos 7 dias">
          {week.map((w, i) => (
            <li key={w.date} className={`rounded-xl p-2 text-center ${i === 0 ? "bg-atlantic text-surface" : w.rest ? "bg-surface-2 text-muted" : "panel"}`}>
              <span className="block text-xs font-bold">{WEEKDAY[w.weekday]}</span>
              <span className="block text-[11px]">{DATE.format(new Date(`${w.date}T12:00:00Z`))}</span>
              <span className="mt-1 block text-xs font-bold tabular-nums">{w.rest ? "folga" : `${w.minutes}′`}</span>
            </li>
          ))}
        </ol>
        <details className="panel mt-3 p-4">
          <summary className="cursor-pointer font-bold">Ver o que está planejado em cada dia</summary>
          <ul className="mt-3 space-y-3 text-sm">
            {week.slice(1).map((w) => (
              <li key={w.date}>
                <span className="font-bold">
                  {WEEKDAY[w.weekday]} {DATE.format(new Date(`${w.date}T12:00:00Z`))}:
                </span>{" "}
                {w.rest ? <span className="text-muted">descanso</span> : w.blocks.map((b) => `${b.title} (${b.minutes} min)`).join(" · ")}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted">Os dias seguintes se ajustam sozinhos ao que você fizer: revisões que vencerem, erros novos e o que você já dominou.</p>
        </details>
      </section>

      {pace && (
        <section className="panel p-5" aria-labelledby="meta">
          <h2 id="meta" className="font-display text-xl font-bold">
            Meta: {target}
            {p.target_date ? ` até ${DATE.format(new Date(`${p.target_date}T12:00:00Z`))}` : ""}
          </h2>
          <p className="mt-1">
            Faltam {remaining} aulas.{" "}
            {pace.weeksAtPace === null
              ? "Ainda não há ritmo medido (faça algumas aulas esta semana)."
              : `No seu ritmo atual (${(ind.activity.month.lessons / 4).toFixed(1)} aulas/semana), são cerca de ${pace.weeksAtPace} semanas.`}
          </p>
          {pace.neededPerWeek !== null && (
            <p className={`mt-1 font-bold ${pace.onTrack === false ? "text-wrong" : "text-correct"}`}>
              {pace.onTrack === false ? `Para cumprir o prazo, seriam ${pace.neededPerWeek} aulas por semana.` : pace.onTrack ? "Você está no ritmo para cumprir o prazo." : `Meta: ${pace.neededPerWeek} aulas por semana.`}
            </p>
          )}
          <p className="mt-2 text-xs text-muted">Estimativa pelo número de aulas, não uma garantia de nível: o domínio real aparece em Meu progresso.</p>
        </section>
      )}

      <details className="group" aria-labelledby="mais">
        <summary id="mais" className="cursor-pointer font-display text-xl font-bold">
          Mais treinos
        </summary>
        <ul className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {more.map((t) => (
            <li key={t.href}>
              <Link href={t.href} className="panel flex h-full items-start gap-3 p-4 hover:-translate-y-0.5">
                <t.icon size={20} className="mt-0.5 shrink-0 text-atlantic" aria-hidden />
                <span>
                  <span className="block font-bold">{t.title}</span>
                  <span className="block text-sm text-muted">{t.text}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </main>
  );
}
