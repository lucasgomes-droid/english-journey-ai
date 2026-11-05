import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { getDashboard } from "@/lib/data";
import { dailyRoutine } from "@/lib/routine";

const WEEKDAY = new Intl.DateTimeFormat("pt-BR", { weekday: "short", timeZone: "UTC" });

/** Coluna da direita (Início e Trilha): rotina de hoje e últimos 7 dias. */
export async function StudyRail() {
  const d = await getDashboard();
  const routine = dailyRoutine(d);
  const goal = d.profile.daily_goal_xp;
  const goalPct = Math.min(100, Math.round((d.todayXp / goal) * 100));
  const maxWeek = Math.max(goal, ...d.weekXp.map((w) => w.xp));
  const weekTotal = d.weekXp.reduce((s, w) => s + w.xp, 0);

  return (
    <div className="space-y-5">
      <section className="panel p-5" aria-labelledby="rotina">
        <div className="flex items-baseline justify-between gap-2">
          <h2 id="rotina" className="font-display text-lg font-bold">
            Rotina de hoje
          </h2>
          <span className="text-xs font-bold text-muted">XP</span>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-valuenow={goalPct} aria-valuemin={0} aria-valuemax={100} aria-label="Meta diária de XP">
            <div className="h-full rounded-full bg-boarding" style={{ width: `${goalPct}%` }} />
          </div>
          <span className="text-sm tabular-nums text-muted">
            {d.todayXp} de {goal}
          </span>
        </div>
        <ul className="mt-3 space-y-1">
          {routine.map((r) => (
            <li key={r.href + r.title}>
              <Link href={r.href} className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-surface-2">
                {r.done ? (
                  <CheckCircle2 size={20} className="shrink-0 text-correct" aria-label="Feito hoje" />
                ) : (
                  <span className="grid size-5 shrink-0 place-items-center rounded-full border-2 border-gold" aria-hidden />
                )}
                <span className="min-w-0 flex-1">
                  <span className={`block text-sm font-bold ${r.done ? "text-muted line-through" : ""}`}>
                    {r.title} <span className="font-normal text-muted">(~{r.minutes} min)</span>
                  </span>
                  <span className="block truncate text-xs text-muted">{r.detail}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel p-5" aria-labelledby="semana">
        <h2 id="semana" className="font-display text-lg font-bold">
          Últimos 7 dias
        </h2>
        <div className="mt-4 flex h-32 items-end gap-2" role="img" aria-label={`XP por dia: ${d.weekXp.map((w) => w.xp).join(", ")}`}>
          {d.weekXp.map((w, i) => (
            <div key={w.date} className="flex flex-1 flex-col items-center gap-1">
              <div className={`w-full rounded-t-md ${i === 6 ? "bg-boarding" : "bg-atlantic"} ${w.xp ? "" : "opacity-25"}`} style={{ height: `${Math.max(6, (w.xp / maxWeek) * 104)}px` }} />
              <span className="text-xs capitalize text-muted">{WEEKDAY.format(new Date(`${w.date}T12:00:00Z`)).replace(".", "").slice(0, 3)}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 flex justify-between text-sm">
          <span className="font-bold">Consistência</span>
          <span className="tabular-nums text-muted">
            {weekTotal} de {goal * 7} XP · {d.streak} {d.streak === 1 ? "dia" : "dias"} seguidos
          </span>
        </p>
      </section>
    </div>
  );
}
