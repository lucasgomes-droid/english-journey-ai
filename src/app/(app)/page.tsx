import Link from "next/link";
import { Sparkles, TriangleAlert, AudioLines, BookOpen, CalendarCheck, Clock, Flame, Headphones, Languages, MessagesSquare, Phone, RotateCcw, CheckCircle2, Target, Timer } from "lucide-react";
import { PAIR_SETS } from "@/content/minimal-pairs";
import { topicsFor } from "@/content/speaking-topics";
import { SCENARIOS } from "@/content/scenarios";
import { LISTENING } from "@/content/listening";
import { getDashboard, getSession } from "@/lib/data";
import { loadHomeCoach } from "@/lib/teacher";
import { getCategory } from "@/content/error-patterns";
import { getModule } from "@/content/curriculum";
import { LevelLine } from "@/components/brand";

export const metadata = { title: "Início" };

const WEEKDAY = new Intl.DateTimeFormat("pt-BR", { weekday: "short", timeZone: "UTC" });

function formatHours(min: number) {
  if (min < 60) return `${min} min`;
  return `${Math.floor(min / 60)}h ${min % 60 ? `${min % 60}min` : ""}`.trim();
}

export default async function Dashboard() {
  const d = await getDashboard();
  const { supabase, user } = await getSession();
  const coach = await loadHomeCoach(supabase, user.id, d.skills, d.dueReviews);
  const { profile, nextLesson } = d;
  const mod = nextLesson ? getModule(nextLesson.moduleId) : null;
  const courseDone = !nextLesson && profile.current_level === "C2" && d.examPartsPassed.length === 3;
  const goalPct = Math.min(100, Math.round((d.todayXp / profile.daily_goal_xp) * 100));
  const maxWeek = Math.max(profile.daily_goal_xp, ...d.weekXp.map((w) => w.xp));

  // Situação e áudio do dia mudam diariamente.
  const dayIndex = Math.floor(Date.parse(`${d.weekXp[6].date}T12:00:00Z`) / 86_400_000);
  const sceneToday = SCENARIOS[dayIndex % SCENARIOS.length];
  const levelListening = LISTENING.filter((l) => l.level === profile.current_level);
  const listeningToday = levelListening[dayIndex % Math.max(1, levelListening.length)] ?? LISTENING[0];

  // Rotina diária: o mínimo para falar todo dia — revisão, aula, fala, escuta e conversa.
  const done = new Set(d.todayKinds);
  const levelTopics = topicsFor(profile.current_level);
  const speakTask = [
    { href: `/pronuncia/pares/${PAIR_SETS[dayIndex % PAIR_SETS.length].id}`, icon: AudioLines, title: "Fala do dia: pares mínimos", detail: PAIR_SETS[dayIndex % PAIR_SETS.length].title },
    levelTopics.length
      ? { href: `/falar/desafio/${levelTopics[dayIndex % levelTopics.length].id}`, icon: Timer, title: "Fala do dia: desafio de 1 minuto", detail: levelTopics[dayIndex % levelTopics.length].pt }
      : null,
    { href: `/pronuncia/shadowing/${listeningToday.id}`, icon: AudioLines, title: "Fala do dia: shadowing", detail: listeningToday.title },
  ].filter(Boolean)[dayIndex % 3] ?? { href: "/pronuncia", icon: AudioLines, title: "Fala do dia", detail: "Pronúncia" };
  const weeklyDue = !d.lastWeeklyAt || Date.parse(`${d.weekXp[6].date}T12:00:00Z`) - Date.parse(d.lastWeeklyAt) > 6 * 86_400_000;
  type PlanItem = { href: string; icon: typeof BookOpen; title: string; detail: string; minutes: number; done: boolean };
  const plan = [
    d.dueReviews > 0 && { href: "/revisao", icon: RotateCcw, title: "Revisão", detail: `${d.dueReviews} ${d.dueReviews === 1 ? "item pendente" : "itens pendentes"}`, minutes: Math.min(10, Math.ceil(d.dueReviews / 3)), done: done.has("review") },
    !nextLesson && !courseDone && { href: `/prova/${profile.current_level}`, icon: BookOpen, title: "Prova de nível", detail: `Comprovar o ${profile.current_level}`, minutes: 15, done: done.has("test") },
    nextLesson && { href: `/aula/${nextLesson.id}`, icon: BookOpen, title: nextLesson.kind === "test" ? "Avaliação" : "Aula nova", detail: nextLesson.title, minutes: 10, done: done.has("lesson") || done.has("test") },
    { ...speakTask, minutes: 3, done: done.has("speaking") || done.has("pronunciation") },
    profile.daily_minutes >= 15 && { href: `/listening/${listeningToday.id}`, icon: Headphones, title: "Listening", detail: listeningToday.title, minutes: 5, done: done.has("listening") },
    profile.daily_minutes >= 20 && {
      href: dayIndex % 2 ? `/professor?cenario=${sceneToday.id}` : "/professor?ligar=1",
      icon: dayIndex % 2 ? MessagesSquare : Phone,
      title: dayIndex % 2 ? "Conversa do dia" : "Ligação com o professor",
      detail: dayIndex % 2 ? sceneToday.title : "Só por voz, como uma ligação",
      minutes: Math.max(5, profile.daily_minutes - 25),
      done: done.has("chat") || done.has("scenario"),
    },
    weeklyDue && { href: "/falar/semanal", icon: CalendarCheck, title: "Gravação da semana", detail: "2 minutos para medir sua evolução", minutes: 3, done: false },
  ].filter(Boolean) as PlanItem[];
  const planDone = plan.filter((p) => p.done).length;

  return (
    <main className="space-y-6">
      <h1 className="sr-only">Início</h1>

      {/* Próxima estação: o ponto de partida do dia */}
      <section className="overflow-hidden rounded-3xl bg-[#0e4d57] text-white">
        <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-white/70">Olá, {profile.display_name.split(" ")[0]}. {nextLesson ? "Continuar de onde parei:" : "Sua próxima etapa:"}</p>
            {nextLesson ? (
              <>
                <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">{nextLesson.title}</h2>
                <p className="mt-2 max-w-xl text-white/80">
                  {mod?.title} · {nextLesson.objective}
                </p>
              </>
            ) : courseDone ? (
              <>
                <h2 className="mt-2 font-display text-4xl font-bold">Você concluiu a trilha do A1 ao C2.</h2>
                <p className="mt-2 max-w-xl text-white/80">Para manter o nível: revisão diária, conversas com o professor, a gravação semanal e um exame oficial (CPE ou IELTS) para comprovar.</p>
              </>
            ) : (
              <>
                <h2 className="mt-2 font-display text-4xl font-bold sm:text-5xl">Prova de nível {profile.current_level}</h2>
                <p className="mt-2 max-w-xl text-white/80">
                  Você terminou as aulas do {profile.current_level}. Para subir de nível, comprove escrita, Speaking e Conversation ({d.examPartsPassed.length} de 3 aprovadas).
                </p>
              </>
            )}
          </div>
          {nextLesson ? (
            <Link href={`/aula/${nextLesson.id}`} className="btn-go text-lg">
              {nextLesson.kind === "test" ? "Fazer avaliação" : "Começar aula"}
            </Link>
          ) : (
            !courseDone && (
              <Link href={`/prova/${profile.current_level}`} className="btn-go text-lg">
                Ir para a prova
              </Link>
            )
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 px-6 py-4 sm:px-8">
          <LevelLine current={profile.current_level} inverted />
          <p className="text-sm text-white/80">
            {profile.current_level}: {d.levelProgress}% concluído
          </p>
        </div>
      </section>

      {/* Professor IA: prática recomendada e dificuldades */}
      <div className="grid gap-4 md:grid-cols-2">
        <section className="panel flex flex-col p-5" aria-labelledby="recomendado">
          <p className="flex items-center gap-2 text-sm font-bold text-muted">
            <Sparkles size={16} aria-hidden /> Prática recomendada pelo professor IA
          </p>
          <h2 id="recomendado" className="mt-1 font-display text-xl font-bold">
            {coach.recommendation.title}
          </h2>
          <p className="text-sm text-muted">{coach.recommendation.why}</p>
          <Link href={coach.recommendation.href} className="btn-primary mt-4 self-start">
            {coach.recommendation.cta}
          </Link>
        </section>
        <section className="panel p-5" aria-labelledby="dificuldades">
          <div className="flex items-center justify-between gap-2">
            <h2 id="dificuldades" className="flex items-center gap-2 text-sm font-bold text-muted">
              <TriangleAlert size={16} aria-hidden /> Minhas dificuldades
            </h2>
            <Link href="/dificuldades" className="text-sm font-bold underline">
              Ver todas
            </Link>
          </div>
          {coach.patterns.length ? (
            <ul className="mt-2 space-y-2">
              {coach.patterns.map((p) => (
                <li key={p.category}>
                  <Link href={`/dificuldades/${p.category}`} className="flex items-center justify-between gap-2 rounded-xl bg-surface-2 px-3 py-2 hover:bg-line">
                    <span className="font-bold">{getCategory(p.category)!.label}</span>
                    <span className="shrink-0 text-sm text-muted">{p.recent} recentes</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-muted">Nenhum padrão de erro ainda. Eles aparecem aqui conforme você pratica.</p>
          )}
        </section>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] [&>*]:min-w-0">
        {/* Rotina de hoje */}
        <section className="panel p-6" aria-labelledby="hoje">
          <div className="flex items-baseline justify-between gap-4">
            <h2 id="hoje" className="font-display text-2xl font-bold">
              Rotina de hoje
            </h2>
            <span className="text-sm text-muted">
              {planDone} de {plan.length} feitos · {profile.daily_minutes} min/dia ·{" "}
              <Link href="/perfil#lembrete" className="font-bold text-atlantic hover:underline">
                lembrete
              </Link>
            </span>
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
                  <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${p.done ? "bg-correct-bg text-correct" : "bg-surface-2 text-atlantic"}`}>
                    {p.done ? <CheckCircle2 size={20} aria-label="Feito hoje" /> : <p.icon size={20} aria-hidden />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block font-bold ${p.done ? "text-muted line-through" : ""}`}>{p.title}</span>
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

      <div className="grid gap-6 lg:grid-cols-2 [&>*]:min-w-0">
        {/* Desempenho por habilidade */}
        <section className="panel p-6" aria-labelledby="hab">
          <h2 id="hab" className="font-display text-2xl font-bold">
            Desempenho por habilidade
          </h2>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-sm text-muted">Percentual de acertos nos exercícios</p>
            <Link href="/diagnostico" className="inline-flex items-center gap-1 text-sm font-bold text-atlantic hover:underline">
              <Target size={14} aria-hidden /> Ver meus pontos fracos
            </Link>
          </div>
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

        <Link href="/meu-professor" className="panel flex flex-col justify-center gap-2 p-6 hover:border-atlantic">
          <span className="font-display text-2xl font-bold">Meu Professor IA</span>
          <span className="text-muted">Evolução da pronúncia e da conversação, histórico de erros, tempo de resposta e próximos objetivos.</span>
          <span className="font-bold text-atlantic">Abrir meu painel →</span>
        </Link>
      </div>

    </main>
  );
}
