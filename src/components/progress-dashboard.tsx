import Link from "next/link";
import { ArrowRight, Check, Target } from "lucide-react";
import { ACHIEVEMENTS } from "@/lib/achievements";
import { AchievementIcon } from "@/components/achievement-icon";
import { STATUS_LABEL, type WordStatus } from "@/lib/vocab-status";
import type { SkillLevel } from "@/lib/mastery";

const WEEKDAY = new Intl.DateTimeFormat("pt-BR", {
  weekday: "short",
  timeZone: "UTC",
});
const DAYMONTH = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  timeZone: "UTC",
});

export interface ProgressDashboardProps {
  level: string;
  next: string | null;
  levelPct: number;
  nextStep: { title: string; href: string; cta: string };
  week: { date: string; xp: number }[];
  streak: number;
  goals: {
    todayXp: number;
    goalXp: number;
    weekLessons: number;
    weekLessonsGoal: number;
    target: string | null;
  };
  lessonsPerWeek: { start: string; count: number }[];
  vocab: Record<WordStatus, number>;
  skills: {
    key: string;
    name: string;
    value: number | null;
    n: number;
    level: SkillLevel;
  }[];
  achievements: string[];
}

const SKILL_BAR: Record<SkillLevel, string> = {
  "sem dados": "bg-line",
  começando: "bg-atlantic/60",
  reforçar: "bg-wrong",
  "em progresso": "bg-boarding",
  firme: "bg-correct",
};
const VOCAB_COLOR: Record<WordStatus, string> = {
  esquecida: "var(--wrong)",
  aprendendo: "var(--atlantic)",
  nova: "var(--line)",
  firme: "var(--correct)",
};
const VOCAB_ORDER: WordStatus[] = ["firme", "aprendendo", "esquecida", "nova"];

function Panel({
  title,
  action,
  children,
  className = "",
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`panel flex min-w-0 flex-col p-5 ${className}`}
      aria-label={title}
    >
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="font-display text-lg font-bold">{title}</h2>
        {action}
      </div>
      <div className="mt-3 flex-1">{children}</div>
    </section>
  );
}

function LineChart({ points }: { points: { start: string; count: number }[] }) {
  const W = 320;
  const H = 120;
  const max = Math.max(3, ...points.map((p) => p.count));
  const x = (i: number) => 12 + (i * (W - 24)) / Math.max(1, points.length - 1);
  const y = (v: number) => H - 8 - (v / max) * (H - 20);
  const path = points
    .map(
      (p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.count).toFixed(1)}`,
    )
    .join(" ");
  const area = `${path} L${x(points.length - 1).toFixed(1)},${H - 8} L${x(0).toFixed(1)},${H - 8} Z`;
  const last = points[points.length - 1];
  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-32 w-full"
        role="img"
        aria-label={`Aulas por semana: ${points.map((p) => p.count).join(", ")}`}
      >
        {[0, 0.5, 1].map((f) => (
          <line
            key={f}
            x1={12}
            x2={W - 12}
            y1={y(max * f)}
            y2={y(max * f)}
            stroke="var(--line)"
            strokeDasharray="3 4"
          />
        ))}
        <path d={area} fill="var(--atlantic)" opacity={0.12} />
        <path
          d={path}
          fill="none"
          stroke="var(--atlantic)"
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {points.map((p, i) => (
          <g key={p.start}>
            <circle
              cx={x(i)}
              cy={y(p.count)}
              r={i === points.length - 1 ? 4.5 : 3}
              fill={
                i === points.length - 1 ? "var(--boarding)" : "var(--surface)"
              }
              stroke="var(--atlantic)"
              strokeWidth={2}
            />
          </g>
        ))}
      </svg>
      <div className="mt-1 flex justify-between text-xs text-muted" aria-hidden>
        <span>{DAYMONTH.format(new Date(`${points[0].start}T12:00:00Z`))}</span>
        <span>esta semana</span>
      </div>
      <p className="mt-2 text-sm">
        <strong className="tabular-nums">{last.count}</strong>{" "}
        {last.count === 1 ? "aula" : "aulas"} nesta semana · máximo{" "}
        {Math.max(...points.map((p) => p.count))} por semana
      </p>
    </div>
  );
}

function Donut({ data }: { data: Record<WordStatus, number> }) {
  const total = VOCAB_ORDER.reduce((s, k) => s + data[k], 0);
  const R = 42;
  const C = 2 * Math.PI * R;
  let acc = 0;
  return (
    <div className="flex flex-wrap items-center gap-5">
      <svg
        viewBox="0 0 110 110"
        className="size-32 shrink-0 -rotate-90"
        role="img"
        aria-label={VOCAB_ORDER.map(
          (k) => `${STATUS_LABEL[k]}: ${data[k]}`,
        ).join(", ")}
      >
        <circle
          cx={55}
          cy={55}
          r={R}
          fill="none"
          stroke="var(--surface-2)"
          strokeWidth={14}
        />
        {total > 0 &&
          VOCAB_ORDER.map((k) => {
            const len = (data[k] / total) * C;
            const el = data[k] ? (
              <circle
                key={k}
                cx={55}
                cy={55}
                r={R}
                fill="none"
                stroke={VOCAB_COLOR[k]}
                strokeWidth={14}
                strokeDasharray={`${len} ${C - len}`}
                strokeDashoffset={-acc}
              />
            ) : null;
            acc += len;
            return el;
          })}
        <text
          x={55}
          y={55}
          transform="rotate(90 55 55)"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={20}
          fontWeight={800}
          fill="var(--ink)"
        >
          {total}
        </text>
      </svg>
      <ul className="min-w-0 flex-1 space-y-1.5 text-sm">
        {VOCAB_ORDER.map((k) => (
          <li key={k} className="flex items-center gap-2">
            <span
              className="size-3 shrink-0 rounded-full"
              style={{ background: VOCAB_COLOR[k] }}
              aria-hidden
            />
            <span className="flex-1">{STATUS_LABEL[k]}</span>
            <span className="font-bold tabular-nums">{data[k]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Meter({
  label,
  value,
  max,
  sub,
}: {
  label: string;
  value: number;
  max: number;
  sub: string;
}) {
  const pct = Math.min(100, Math.round((value / Math.max(1, max)) * 100));
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-bold">{label}</span>
        <span className="tabular-nums text-muted">{sub}</span>
      </div>
      <div
        className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-surface-2"
        role="progressbar"
        aria-label={label}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className={`h-full rounded-full ${pct >= 100 ? "bg-correct" : "bg-boarding"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/** Painel visual do Meu progresso: onde estou, minha semana, metas, ritmo, vocabulário, competências e conquistas. */
export function ProgressDashboard(p: ProgressDashboardProps) {
  const studiedDays = p.week.filter((w) => w.xp > 0).length;
  const earned = new Set(p.achievements);
  return (
    <div className="grid gap-4 lg:grid-cols-3 [&>*]:min-w-0">
      {/* Nível */}
      <section
        className="relative overflow-hidden rounded-3xl bg-hero p-6 text-white lg:col-span-2"
        aria-labelledby="nivel-atual"
      >
        <div
          className="pointer-events-none absolute -right-10 -top-16 size-56 rounded-full bg-white/5"
          aria-hidden
        />
        <p className="text-sm font-bold text-white/75">
          Seu nível (estimativa do app)
        </p>
        <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
          <h2 id="nivel-atual" className="font-display text-5xl font-bold">
            {p.level}
          </h2>
          <Link href={p.nextStep.href} className="btn-go rounded-full px-5">
            {p.nextStep.cta} <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
        <p className="mt-1 text-white/80">Próximo passo: {p.nextStep.title}</p>
        <div className="mt-5">
          <div className="flex justify-between text-sm font-bold">
            <span>{p.level}</span>
            <span className="tabular-nums">{p.levelPct}%</span>
            <span>{p.next ?? "C2 ✓"}</span>
          </div>
          <div
            className="mt-1.5 h-3 overflow-hidden rounded-full bg-white/15"
            role="progressbar"
            aria-label={`Progresso do ${p.level} para o ${p.next ?? "fim"}`}
            aria-valuenow={p.levelPct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-boarding"
              style={{ width: `${p.levelPct}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-white/70">
            Não é certificação oficial do CEFR: mostra quanto do conteúdo do
            nível você já concluiu e comprovou.
          </p>
        </div>
      </section>

      {/* Semana */}
      <Panel
        title="Sua semana"
        action={
          <span className="text-sm text-muted">
            {p.streak} {p.streak === 1 ? "dia seguido" : "dias seguidos"}
          </span>
        }
      >
        <ol
          className="grid grid-cols-7 gap-1.5"
          aria-label={`Estudou ${studiedDays} de 7 dias`}
        >
          {p.week.map((w, i) => {
            const done = w.xp > 0;
            const today = i === p.week.length - 1;
            return (
              <li key={w.date} className="flex flex-col items-center gap-1.5">
                <span className="text-xs capitalize text-muted">
                  {WEEKDAY.format(new Date(`${w.date}T12:00:00Z`))
                    .replace(".", "")
                    .slice(0, 3)}
                </span>
                <span
                  className={`grid size-9 place-items-center rounded-full border-2 ${done ? "border-correct bg-correct text-surface" : today ? "border-boarding" : "border-line"}`}
                  role="img"
                  aria-label={
                    done
                      ? "Estudou"
                      : today
                        ? "Hoje, ainda não estudou"
                        : "Não estudou"
                  }
                >
                  {done && <Check size={18} strokeWidth={3} aria-hidden />}
                </span>
              </li>
            );
          })}
        </ol>
        <p className="mt-4 text-sm text-muted">
          {studiedDays} de 7 dias com estudo.{" "}
          {studiedDays >= 5
            ? "Ótimo ritmo!"
            : "Pouco todo dia vale mais que muito de vez em quando."}
        </p>
      </Panel>

      {/* Metas */}
      <Panel
        title="Metas"
        action={<Target size={18} className="text-muted" aria-hidden />}
      >
        <div className="space-y-4">
          <Meter
            label="Hoje"
            value={p.goals.todayXp}
            max={p.goals.goalXp}
            sub={`${p.goals.todayXp} de ${p.goals.goalXp} XP`}
          />
          <Meter
            label="Aulas na semana"
            value={p.goals.weekLessons}
            max={p.goals.weekLessonsGoal}
            sub={`${p.goals.weekLessons} de ${p.goals.weekLessonsGoal}`}
          />
          {p.goals.target && (
            <p className="text-sm text-muted">{p.goals.target}</p>
          )}
          <Link
            href="/perfil#prefs"
            className="text-sm font-bold text-atlantic underline"
          >
            Ajustar metas
          </Link>
        </div>
      </Panel>

      {/* Aulas por semana */}
      <Panel
        title="Aulas por semana"
        action={<span className="text-sm text-muted">8 semanas</span>}
      >
        <LineChart points={p.lessonsPerWeek} />
      </Panel>

      {/* Vocabulário */}
      <Panel
        title="Vocabulário"
        action={
          <Link
            href="/vocabulario"
            className="text-sm font-bold text-atlantic underline"
          >
            Ver palavras
          </Link>
        }
      >
        <Donut data={p.vocab} />
      </Panel>

      {/* Competências */}
      <Panel title="Domínio por competência" className="lg:col-span-2">
        <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {p.skills.map((s) => (
            <li key={s.key}>
              <div className="flex items-baseline justify-between gap-2 text-sm">
                <span className="font-bold">{s.name}</span>
                <span className="text-muted">
                  {s.value === null ? (
                    "sem dados"
                  ) : (
                    <>
                      {s.value}% ·{" "}
                      <span
                        className={
                          s.level === "reforçar"
                            ? "font-bold text-wrong"
                            : s.level === "firme"
                              ? "font-bold text-correct"
                              : ""
                        }
                      >
                        {s.level}
                      </span>
                    </>
                  )}
                </span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface-2">
                <div
                  className={`h-full rounded-full ${SKILL_BAR[s.level]}`}
                  style={{ width: `${s.value ?? 0}%` }}
                />
              </div>
              <span className="text-xs text-muted">
                {s.n
                  ? `${s.n} ${s.n === 1 ? "resposta" : "respostas"} em 60 dias`
                  : "Pratique para medir"}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted">
          “Firme” pede 85%+ com 20+ respostas. Concluir aula não é o mesmo que
          dominar: aqui conta o que você acerta.
        </p>
      </Panel>

      {/* Conquistas */}
      <Panel
        title="Conquistas"
        action={
          <span className="text-sm text-muted">
            {earned.size} de {ACHIEVEMENTS.length}
          </span>
        }
      >
        <ul className="grid grid-cols-5 gap-2">
          {ACHIEVEMENTS.map((a) => {
            const ok = earned.has(a.code);
            return (
              <li key={a.code} title={`${a.title}: ${a.description}`}>
                <span
                  role="img"
                  className={`grid aspect-square place-items-center rounded-2xl ${ok ? "bg-boarding text-boarding-ink" : "bg-surface-2 text-muted opacity-60"}`}
                  aria-label={`${a.title}${ok ? "" : " (bloqueada)"}`}
                >
                  <AchievementIcon name={a.icon} size={20} />
                </span>
              </li>
            );
          })}
        </ul>
      </Panel>
    </div>
  );
}
