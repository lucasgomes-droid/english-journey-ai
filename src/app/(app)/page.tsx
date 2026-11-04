import Link from "next/link";
import { BookOpen, Clock, Flame, Languages, MessagesSquare, RotateCcw, CheckCircle2 } from "lucide-react";
import { getDashboard } from "@/lib/data";
import { getModule } from "@/content/curriculum";
import { LevelLine } from "@/components/brand";
import { ACHIEVEMENTS } from "@/lib/achievements";
import { AchievementIcon } from "@/components/achievement-icon";

export const metadata = { title: "Início" };

const WEEKDAY = new Intl.DateTimeFormat("pt-BR", { weekday: "short", timeZone: "UTC" });
const KIND_LABEL: Record<string, string> = { lesson: "Aula", test: "Avaliação", review: "Revisão", chat: "Conversa", pronunciation: "Pronúncia", scenario: "Situação real" };

function formatHours(min: number) {
  if (min < 60) return `${min} min`;
  return `${Math.floor(min / 60)}h ${min % 60 ? `${min % 60}min` : ""}`.trim();
}

export default async function Dashboard() {
  const d = await getDashboard();
  const { profile, nextLesson } = d;
  const mod = nextLesson ? getModule(nextLesson.moduleId) : null;
  const goalPct = Math.min(100, Math.round((d.todayXp / profile.daily_goal_xp) * 100));
  const maxWeek = Math.max(profile.daily_goal_xp, ...d.weekXp.map((w) => w.xp));

  // Rotina diária: distribui o tempo disponível entre revisão, aula e conversa.
  const plan = [
    d.dueReviews > 0 && { href: "/revisao", icon: RotateCcw, title: "Revisão", detail: `${d.dueReviews} ${d.dueReviews === 1 ? "item pendente" : "itens pendentes"}`, minutes: Math.min(10, Math.ceil(d.dueReviews / 3)) },
    nextLesson && { href: `/aula/${nextLesson.id}`, icon: BookOpen, title: nextLesson.kind === "test" ? "Avaliação" : "Aula nova", detail: nextLesson.title, minutes: 10 },
    profile.daily_minutes >= 15 && { href: "/professor", icon: MessagesSquare, title: "Conversa com o professor", detail: "Pratique o que aprendeu", minutes: Math.max(5, profile.daily_minutes - 20) },
  ].filter(Boolean) as { href: string; icon: typeof BookOpen; title: string; detail: string; minutes: number }[];

  return (
    <main className="space-y-6">
      <h1 className="sr-only">Início</h1>

      {/* Próxima estação: o ponto de partida do dia */}
      <section className="overflow-hidden rounded-3xl bg-[#0e4d57] text-white">
        <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-white/70">Olá, {profile.display_name.split(" ")[0]}. Sua próxima parada:</p>
            {nextLesson ? (
              <>
                <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">{nextLesson.title}</h2>
                <p className="mt-2 max-w-xl text-white/80">
                  {mod?.title} · {nextLesson.objective}
                </p>
              </>
            ) : (
              <>
                <h2 className="mt-2 font-display text-4xl font-bold">Você concluiu todo o conteúdo disponível.</h2>
                <p className="mt-2 max-w-xl text-white/80">Os próximos níveis estão em produção. Continue revisando e conversando com o professor.</p>
              </>
            )}
          </div>
          {nextLesson && (
            <Link href={`/aula/${nextLesson.id}`} className="btn-go text-lg">
              {nextLesson.kind === "test" ? "Fazer avaliação" : "Começar aula"}
            </Link>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 px-6 py-4 sm:px-8">
          <LevelLine current={profile.current_level} inverted />
          <p className="text-sm text-white/80">
            {profile.current_level}: {d.levelProgress}% concluído
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Rotina de hoje */}
        <section className="panel p-6" aria-labelledby="hoje">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="hoje" className="font-display text-2xl font-bold">
              Rotina de hoje
            </h2>
            <span className="text-sm text-muted">{profile.daily_minutes} min/dia</span>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className="font-bold">
                {d.todayXp} de {profile.daily_goal_xp} XP
              </span>
              <span className="text-muted">{goalPct >= 100 ? "Meta do dia batida" : `${100 - goalPct}% para a meta`}</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-valuenow={goalPct} aria-valuemin={0} aria-valuemax={100} aria-label="Meta diária de XP">
              <div className="h-full rounded-full bg-boarding transition-all" style={{ width: `${goalPct}%` }} />
            </div>
          </div>
          <ul className="mt-5 divide-y divide-line">
            {plan.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="flex items-center gap-4 py-3 hover:text-atlantic">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-surface-2 text-atlantic">
                    <p.icon size={20} aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold">{p.title}</span>
                    <span className="block truncate text-sm text-muted">{p.detail}</span>
                  </span>
                  <span className="text-sm text-muted">~{p.minutes} min</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Semana */}
        <section className="panel p-6" aria-labelledby="semana">
          <h2 id="semana" className="font-display text-2xl font-bold">
            Últimos 7 dias
          </h2>
          <p className="text-sm text-muted">
            {d.weekLessons} de {profile.weekly_goal_lessons} aulas na meta semanal
          </p>
          <div className="mt-6 flex h-36 items-end gap-2" role="img" aria-label={`XP por dia: ${d.weekXp.map((w) => w.xp).join(", ")}`}>
            {d.weekXp.map((w, i) => (
              <div key={w.date} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="text-xs text-muted">{w.xp || ""}</span>
                <div
                  className={`w-full rounded-md ${i === 6 ? "bg-boarding" : w.xp >= profile.daily_goal_xp ? "bg-atlantic" : "bg-atlantic/40"}`}
                  style={{ height: `${Math.max(4, (w.xp / maxWeek) * 100)}px` }}
                />
                <span className="text-xs capitalize text-muted">{WEEKDAY.format(new Date(`${w.date}T12:00:00Z`)).replace(".", "")}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Números */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4" aria-label="Estatísticas">
        {[
          { icon: Flame, value: `${d.streak}`, label: d.streak === 1 ? "dia seguido" : "dias seguidos", sub: `Recorde: ${profile.streak_best}` },
          { icon: Clock, value: formatHours(d.totalMinutes), label: "de estudo", sub: "tempo registrado" },
          { icon: Languages, value: `${d.wordsLearned}`, label: "palavras aprendidas", sub: "revisadas com acerto" },
          { icon: CheckCircle2, value: `${d.overallLessonsDone}`, label: "aulas concluídas", sub: `${profile.xp_total} XP no total` },
        ].map((s) => (
          <div key={s.label} className="panel p-5">
            <s.icon size={20} className="text-atlantic" aria-hidden />
            <p className="mt-3 font-display text-3xl font-bold">{s.value}</p>
            <p className="font-bold">{s.label}</p>
            <p className="text-sm text-muted">{s.sub}</p>
          </div>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Desempenho por habilidade */}
        <section className="panel p-6" aria-labelledby="hab">
          <h2 id="hab" className="font-display text-2xl font-bold">
            Desempenho por habilidade
          </h2>
          <p className="text-sm text-muted">Percentual de acertos nos exercícios</p>
          <ul className="mt-5 space-y-4">
            {d.skills.map((s) => (
              <li key={s.skill}>
                <div className="flex justify-between text-sm">
                  <span className="font-bold">{s.label}</span>
                  <span className="text-muted">{s.accuracy === null ? "Sem dados ainda" : `${s.accuracy}% · ${s.answers} ${s.answers === 1 ? "resposta" : "respostas"}`}</span>
                </div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-surface-2">
                  <div
                    className={`h-full rounded-full ${s.accuracy !== null && s.accuracy < 60 ? "bg-wrong" : "bg-correct"}`}
                    style={{ width: `${s.accuracy ?? 0}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Histórico */}
        <section className="panel p-6" aria-labelledby="hist">
          <h2 id="hist" className="font-display text-2xl font-bold">
            Histórico de atividades
          </h2>
          {d.activity.length === 0 ? (
            <p className="mt-4 text-muted">Nada por aqui ainda. Sua primeira aula aparece nesta lista assim que você terminar.</p>
          ) : (
            <ul className="mt-4 divide-y divide-line">
              {d.activity.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3 py-2.5">
                  <span className="min-w-0">
                    <span className="block truncate font-bold">{a.title}</span>
                    <span className="text-sm text-muted">
                      {KIND_LABEL[a.kind] ?? a.kind}
                      {a.score !== null && (a.kind === "lesson" || a.kind === "test") ? ` · ${a.score}%` : ""} ·{" "}
                      {new Date(a.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
                    </span>
                  </span>
                  <span className="shrink-0 font-bold text-atlantic">+{a.xp} XP</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {d.achievements.length > 0 && (
        <section className="panel p-6" aria-labelledby="medalhas">
          <h2 id="medalhas" className="font-display text-2xl font-bold">
            Medalhas
          </h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {ACHIEVEMENTS.filter((a) => d.achievements.includes(a.code)).map((a) => (
              <li key={a.code} className="flex items-center gap-2 rounded-full bg-boarding/25 py-1.5 pl-1.5 pr-4" title={a.description}>
                <span className="grid size-8 place-items-center rounded-full bg-boarding text-boarding-ink">
                  <AchievementIcon name={a.icon} />
                </span>
                <span className="font-bold">{a.title}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
