import Link from "next/link";
import { Activity, Brain, CalendarClock, Gauge, ShieldCheck } from "lucide-react";
import type { Indicators } from "@/lib/indicators";
import { confidence as confidenceOf, type Confidence } from "@/lib/mastery";

const CONF_CLASS: Record<Confidence, string> = {
  "sem dados": "bg-surface-2 text-muted",
  baixa: "bg-boarding/20 text-ink",
  média: "bg-atlantic/15 text-ink",
  alta: "bg-correct/15 text-ink",
};

function Conf({ level, n, unit }: { level: Confidence; n: number; unit: string }) {
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${CONF_CLASS[level]}`}>
      {level === "sem dados" ? "Sem dados ainda" : `Confiabilidade ${level} · ${n} ${unit}`}
    </span>
  );
}

function Card({ icon, title, hint, children }: { icon: React.ReactNode; title: string; hint: string; children: React.ReactNode }) {
  return (
    <section className="panel flex flex-col gap-2 p-5" aria-label={title}>
      <h3 className="flex items-center gap-2 font-display text-lg font-bold">
        {icon} {title}
      </h3>
      <p className="text-sm text-muted">{hint}</p>
      {children}
    </section>
  );
}

const pct = (v: number | null) => (v === null ? "—" : `${v}%`);

/** Os 4 indicadores (Atividade, Desempenho, Domínio, Retenção), cada um com sua amostra. */
export function IndicatorsPanel({ data }: { data: Indicators }) {
  const { activity, performance, mastery, retention } = data;
  const delta = performance.current.value !== null && performance.previous.value !== null ? performance.current.value - performance.previous.value : null;
  return (
    <section className="space-y-4" aria-labelledby="indicadores-titulo">
      <div>
        <h2 id="indicadores-titulo" className="font-display text-2xl font-bold">
          Você está aprendendo?
        </h2>
        <p className="text-sm text-muted">Quatro medidas separadas. XP não entra aqui: ele mostra esforço, não domínio do inglês.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card icon={<Activity size={18} aria-hidden />} title="Atividade" hint="O que você fez.">
          <p className="font-display text-4xl font-bold tabular-nums">
            {activity.week.minutes} <span className="text-lg font-normal text-muted">min nos últimos 7 dias</span>
          </p>
          <p className="text-sm">
            {activity.week.days} {activity.week.days === 1 ? "dia" : "dias"} de estudo · {activity.week.lessons} {activity.week.lessons === 1 ? "aula" : "aulas"} · em 4 semanas: {activity.month.minutes} min em {activity.month.days} dias
          </p>
        </Card>

        <Card icon={<Gauge size={18} aria-hidden />} title="Desempenho" hint="Como você respondeu nos exercícios (últimas 2 semanas).">
          <p className="font-display text-4xl font-bold tabular-nums">
            {pct(performance.current.value)} <span className="text-lg font-normal text-muted">de acerto</span>
          </p>
          <p className="text-sm">
            {delta === null ? "Sem comparação ainda." : delta === 0 ? "Igual às 2 semanas anteriores." : `${delta > 0 ? "+" : ""}${delta} pontos em relação às 2 semanas anteriores (${pct(performance.previous.value)}).`}
          </p>
          <Conf level={confidenceOf(performance.current.n)} n={performance.current.n} unit="respostas" />
        </Card>

        <Card icon={<Brain size={18} aria-hidden />} title="Domínio" hint={`Objetivos do ${mastery.level} que você mostrou conseguir usar: 80%+ de acerto, em 2 dias, com produção.`}>
          <p className="font-display text-4xl font-bold tabular-nums">
            {mastery.mastered}
            <span className="text-lg font-normal text-muted"> de {mastery.total} objetivos</span>
          </p>
          <div className="h-2 overflow-hidden rounded-full bg-surface-2" role="img" aria-label={`${mastery.mastered} de ${mastery.total} objetivos dominados`}>
            <div className="h-full rounded-full bg-correct" style={{ width: `${mastery.total ? (mastery.mastered / mastery.total) * 100 : 0}%` }} />
          </div>
          <p className="text-sm">
            {mastery.started} {mastery.started === 1 ? "começado" : "começados"} · {mastery.reinforce} {mastery.reinforce === 1 ? "precisa" : "precisam"} de reforço
            {mastery.allMastered > mastery.mastered ? ` · ${mastery.allMastered} no total` : ""}
          </p>
          <Conf level={mastery.confidence} n={mastery.evidence} unit="respostas no nível" />
        </Card>

        <Card icon={<ShieldCheck size={18} aria-hidden />} title="Retenção" hint="O que você ainda acerta 7 dias ou mais depois de aprender.">
          <p className="font-display text-4xl font-bold tabular-nums">
            {pct(retention.value)} <span className="text-lg font-normal text-muted">lembrado</span>
          </p>
          <p className="text-sm">
            {retention.retained} {retention.retained === 1 ? "objetivo retido" : "objetivos retidos"} · palavras: {retention.wordsRetained} firmes
            {retention.wordsForgotten > 0 ? `, ${retention.wordsForgotten} esquecidas` : ""} (de {retention.wordsReviewed} revisadas)
          </p>
          <Conf level={retention.confidence} n={retention.n} unit="respostas após 7+ dias" />
        </Card>
      </div>

      {(mastery.toReinforce.length > 0 || mastery.almost.length > 0) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {mastery.toReinforce.length > 0 && (
            <section className="panel p-5">
              <h3 className="font-display text-lg font-bold">Precisam de reforço</h3>
              <ul className="mt-2 space-y-2">
                {mastery.toReinforce.map((o) => (
                  <li key={o.lessonId}>
                    <Link href={`/aula/${o.lessonId}`} className="block rounded-xl bg-surface-2 p-3 hover:bg-surface-2/70">
                      <span className="font-bold">{o.title}</span>
                      <span className="block text-sm text-muted">
                        {o.accuracy}% nas últimas respostas ({o.attempts} no total) · refazer a aula
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {mastery.almost.length > 0 && (
            <section className="panel p-5">
              <h3 className="flex items-center gap-2 font-display text-lg font-bold">
                <CalendarClock size={18} aria-hidden /> Quase dominados
              </h3>
              <ul className="mt-2 space-y-2">
                {mastery.almost.map((o) => (
                  <li key={o.lessonId} className="rounded-xl bg-surface-2 p-3">
                    <span className="font-bold">{o.title}</span>
                    <span className="block text-sm text-muted">Falta: {o.missing}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </section>
  );
}
