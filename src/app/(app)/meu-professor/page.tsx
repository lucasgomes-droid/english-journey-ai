import Link from "next/link";
import { ProgressTabs } from "@/components/progress-tabs";
import { ArrowRight, Clock, GraduationCap, MessagesSquare, Mic, Sparkles, Target, TriangleAlert, Trophy } from "lucide-react";
import { getDashboard, getSession } from "@/lib/data";
import { loadTeacherPanel } from "@/lib/teacher";
import { loadIndicators } from "@/lib/indicators";
import { IndicatorsPanel } from "@/components/indicators-panel";
import { getCategory } from "@/content/error-patterns";
import { ALL_LESSONS } from "@/content/curriculum";

export const metadata = { title: "Meu progresso" };

const WEEK = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", timeZone: "UTC" });

function Bars({ data, unit = "%" }: { data: { label: string; value: number; sub?: string }[]; unit?: string }) {
  return (
    <ul className="space-y-2">
      {data.map((d) => (
        <li key={d.label}>
          <div className="flex justify-between text-sm">
            <span>{d.label}</span>
            <span className="tabular-nums text-muted">
              {d.value}
              {unit}
              {d.sub ? ` · ${d.sub}` : ""}
            </span>
          </div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface-2">
            <div className={`h-full rounded-full ${unit === "%" ? (d.value >= 75 ? "bg-correct" : d.value >= 50 ? "bg-boarding" : "bg-wrong") : "bg-atlantic"}`} style={{ width: `${Math.min(100, unit === "%" ? d.value : (d.value / Math.max(...data.map((x) => x.value), 1)) * 100)}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Trend({ points, empty }: { points: { week: string; value: number; n: number }[]; empty: string }) {
  if (points.length < 2) return <p className="text-sm text-muted">{empty}</p>;
  return (
    <div className="flex h-28 items-end gap-2" role="img" aria-label={`Evolução semanal: ${points.map((p) => `${p.value}%`).join(", ")}`}>
      {points.map((p) => (
        <div key={p.week} className="flex flex-1 flex-col items-center gap-1">
          <span className="text-xs tabular-nums text-muted">{p.value}%</span>
          <div className="w-full rounded-t-md bg-atlantic" style={{ height: `${Math.max(6, p.value * 0.7)}px` }} />
          <span className="text-[10px] text-muted">{WEEK.format(new Date(p.week))}</span>
        </div>
      ))}
    </div>
  );
}

export default async function MyTeacherPage() {
  const { supabase, user, profile } = await getSession();
  const [d, t, ind] = await Promise.all([getDashboard(), loadTeacherPanel(supabase, user.id, profile!), loadIndicators(supabase, user.id, profile!.current_level)]);
  const measured = t.diag.areas.filter((a) => a.score !== null);

  return (
    <main className="space-y-6">
      <ProgressTabs />
      <header>
        <h1 className="font-display text-3xl font-bold">Meu progresso</h1>
        <p className="mt-1 max-w-2xl text-muted">O professor IA acompanha sua evolução. Tudo aqui vem dos seus exercícios, conversas e gravações reais; sem dados, sem nota.</p>
      </header>

      <section className="panel border-2 border-boarding p-6">
        <p className="flex items-center gap-2 text-sm font-bold text-muted">
          <Sparkles size={16} aria-hidden /> O professor recomenda agora
        </p>
        <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">{t.recommendation.title}</h2>
        <p className="mt-1 text-muted">{t.recommendation.why}</p>
        <Link href={t.recommendation.href} className="btn-go mt-4 inline-flex">
          {t.recommendation.cta} <ArrowRight size={18} aria-hidden />
        </Link>
      </section>

      <IndicatorsPanel data={ind} />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="panel p-5">
          <p className="flex items-center gap-2 text-sm font-bold text-muted">
            <GraduationCap size={16} aria-hidden /> Nível atual
          </p>
          <p className="mt-1 font-display text-4xl font-bold">{t.level}</p>
          <p className="text-sm text-muted">{d.levelProgress}% das aulas do nível</p>
        </div>
        <div className="panel p-5">
          <p className="flex items-center gap-2 text-sm font-bold text-muted">
            <Trophy size={16} aria-hidden /> Evolução geral
          </p>
          <p className="mt-1 font-display text-4xl font-bold">
            {d.overallLessonsDone}
            <span className="text-lg text-muted">/{ALL_LESSONS.length}</span>
          </p>
          <p className="text-sm text-muted">aulas e avaliações concluídas · {d.wordsLearned} palavras</p>
        </div>
        <div className="panel p-5">
          <p className="flex items-center gap-2 text-sm font-bold text-muted">
            <Clock size={16} aria-hidden /> Tempo de estudo
          </p>
          <p className="mt-1 font-display text-4xl font-bold">{d.totalMinutes} min</p>
          <p className="text-sm text-muted">{t.dueReviews} itens para revisar hoje</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="panel p-5">
          <h2 className="font-display text-xl font-bold">Taxa de acerto por competência</h2>
          {measured.length ? (
            <div className="mt-3">
              <Bars data={measured.map((a) => ({ label: a.label, value: a.score!, sub: `${a.samples} respostas` }))} />
            </div>
          ) : (
            <p className="mt-2 text-sm text-muted">Faça algumas aulas e conversas: com 5 respostas numa competência ela aparece aqui.</p>
          )}
          {t.diag.areas.some((a) => a.score === null) && (
            <p className="mt-3 text-xs text-muted">Sem dados ainda: {t.diag.areas.filter((a) => a.score === null).map((a) => a.label).join(", ")}.</p>
          )}
        </section>

        <section className="panel p-5">
          <h2 className="font-display text-xl font-bold">Pontos fortes e dificuldades</h2>
          <h3 className="mt-3 text-sm font-bold text-muted">Pontos fortes</h3>
          {t.strengths.length ? (
            <ul className="mt-1 flex flex-wrap gap-2">
              {t.strengths.map((s) => (
                <li key={s.key} className="rounded-full bg-correct-bg px-3 py-1 text-sm font-bold text-correct">
                  {s.label} · {s.score}%
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">Aparecem quando uma competência passa de 75% de acerto.</p>
          )}
          <h3 className="mt-4 text-sm font-bold text-muted">Principais dificuldades</h3>
          {t.patterns.length ? (
            <ul className="mt-1 space-y-2">
              {t.patterns.map((p) => (
                <li key={p.category}>
                  <Link href={`/dificuldades/${p.category}`} className="flex items-center justify-between gap-2 rounded-xl bg-surface-2 px-3 py-2 hover:bg-line">
                    <span className="flex items-center gap-2">
                      <TriangleAlert size={16} className="shrink-0 text-wrong" aria-hidden /> {getCategory(p.category)!.label}
                    </span>
                    <span className="shrink-0 text-sm text-muted">{p.errors} erros</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">Nenhum padrão de erro ainda.</p>
          )}
        </section>

        <section className="panel p-5">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold">
            <Mic size={20} aria-hidden /> Evolução da pronúncia
          </h2>
          <p className="mb-3 text-sm text-muted">% de palavras dos pares mínimos entendidas como você quis dizer, por semana.</p>
          <Trend points={t.pronunciationWeeks} empty="Treine pares mínimos em duas semanas diferentes para ver a evolução." />
          {t.diag.weakPairs.length > 0 && <p className="mt-3 text-sm">Sons para melhorar: {t.diag.weakPairs.map((w) => `${w.title} (${w.rate}%)`).join(", ")}.</p>}
        </section>

        <section className="panel p-5">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold">
            <MessagesSquare size={20} aria-hidden /> Evolução da conversação
          </h2>
          <p className="mb-3 text-sm text-muted">% das suas falas que não precisaram de correção, por semana.</p>
          <Trend points={t.conversationWeeks} empty="Converse em duas semanas diferentes para ver a evolução." />
          {t.reportScores.length > 0 && (
            <p className="mt-3 text-sm">
              Notas dos últimos relatórios: <span className="tabular-nums">{t.reportScores.map((r) => r.score).join(" · ")}</span>
            </p>
          )}
        </section>

        <section className="panel p-5">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold">
            <Clock size={20} aria-hidden /> Tempo para responder
          </h2>
          <p className="mb-3 text-sm text-muted">Quanto você leva, em média, para formular a resposta nos exercícios.</p>
          {t.responseTimes.length ? <Bars unit=" s" data={t.responseTimes.map((r) => ({ label: r.skill, value: r.seconds, sub: `${r.n} respostas` }))} /> : <p className="text-sm text-muted">Começa a ser medido nas próximas aulas.</p>}
        </section>

        <section className="panel p-5">
          <h2 className="font-display text-xl font-bold">Assuntos para revisar</h2>
          {t.diag.hardTopics.length ? (
            <ul className="mt-3 space-y-2">
              {t.diag.hardTopics.map((h) => (
                <li key={h.lessonId}>
                  <Link href={`/aula/${h.lessonId}`} className="flex justify-between gap-2 rounded-xl bg-surface-2 px-3 py-2 hover:bg-line">
                    <span>{h.title}</span>
                    <span className="shrink-0 text-sm text-muted">{h.rate}% de erro</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-muted">Nada pendente.</p>
          )}
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="panel p-5">
          <h2 className="font-display text-xl font-bold">Palavras para treinar a pronúncia</h2>
          <p className="text-sm text-muted">Palavras que o reconhecedor não entendeu quando você repetiu frases.</p>
          {t.missedWords.length ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {t.missedWords.map((w) => (
                <li key={w.word} className="rounded-full bg-wrong-bg px-3 py-1 text-sm font-bold text-wrong" lang="en">
                  {w.word} <span className="font-normal">×{w.n}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-muted">Nenhuma ainda. Repita frases na conversa ou no treino de pronúncia.</p>
          )}
        </section>
        <section className="panel p-5">
          <h2 className="font-display text-xl font-bold">Expressões aprendidas</h2>
          <p className="text-sm text-muted">{t.phrases.total} no seu banco de frases (entram na revisão).</p>
          <ul className="mt-3 space-y-1 text-sm">
            {t.phrases.recent.map((p) => (
              <li key={p.en}>
                <strong lang="en">{p.en}</strong> <span className="text-muted">· {p.pt}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="panel p-5">
        <h2 className="font-display text-xl font-bold">Histórico de erros</h2>
        {t.recentErrors.length ? (
          <ul className="mt-3 divide-y divide-line">
            {t.recentErrors.map((e, i) => (
              <li key={i} className="flex flex-wrap items-baseline justify-between gap-2 py-2 text-sm">
                <span>
                  <span className="text-wrong line-through" lang="en">
                    {e.original}
                  </span>{" "}
                  → <strong lang="en">{e.corrected}</strong>
                </span>
                <span className="text-xs text-muted">{e.category}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-muted">Seus erros corrigidos aparecem aqui.</p>
        )}
        <div className="mt-3 flex flex-wrap gap-4 text-sm font-bold">
          <Link href="/dificuldades" className="underline">
            Ver todos os padrões em Minhas Dificuldades
          </Link>
          <Link href="/relatorio" className="underline">
            Relatório semanal
          </Link>
        </div>
      </section>

      <section className="panel p-5">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold">
          <Target size={20} aria-hidden /> Próximos objetivos
        </h2>
        <ol className="mt-3 list-decimal space-y-1 pl-5">
          {d.nextLesson ? (
            <li>
              Concluir a aula <Link href={`/aula/${d.nextLesson.id}`} className="font-bold underline">{d.nextLesson.title}</Link>.
            </li>
          ) : (
            <li>
              Passar na <Link href={`/prova/${t.level}`} className="font-bold underline">prova de nível {t.level}</Link> ({d.examPartsPassed.length} de 3 partes).
            </li>
          )}
          {t.patterns[0] && <li>Reduzir os erros de {getCategory(t.patterns[0].category)!.label.toLowerCase()}.</li>}
          {t.dueReviews > 0 && <li>Fazer as {t.dueReviews} revisões pendentes.</li>}
          <li>Conversar pelo menos 3 vezes nesta semana e ver o relatório de cada conversa.</li>
        </ol>
      </section>
    </main>
  );
}
