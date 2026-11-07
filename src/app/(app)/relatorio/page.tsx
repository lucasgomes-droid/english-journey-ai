import Link from "next/link";
import { ProgressTabs } from "@/components/progress-tabs";
import { ArrowDown, ArrowUp, Info } from "lucide-react";
import { getSession } from "@/lib/data";
import { loadPeriods } from "@/lib/weekly-report";
import { periodRecommendations, weeklyHighlights, type WeekStats } from "@/lib/adaptive";
import { getCategory, type ErrorCategory } from "@/content/error-patterns";

export const metadata = { title: "Relatório" };

const ROWS: { key: keyof WeekStats; label: string; unit?: string; better?: "up" | "down" }[] = [
  { key: "minutes", label: "Tempo de estudo", unit: " min", better: "up" },
  { key: "xp", label: "XP", better: "up" },
  { key: "lessons", label: "Aulas e avaliações", better: "up" },
  { key: "answers", label: "Exercícios respondidos", better: "up" },
  { key: "accuracy", label: "Acerto nos exercícios", unit: "%", better: "up" },
  { key: "messages", label: "Falas em conversas", better: "up" },
  { key: "cleanMessages", label: "Falas sem correção", unit: "%", better: "up" },
  { key: "reportAvg", label: "Nota média dos relatórios de conversa", better: "up" },
  { key: "pairAccuracy", label: "Pronúncia: pares mínimos certos", unit: "%", better: "up" },
  { key: "listeningAccuracy", label: "Acerto no listening", unit: "%", better: "up" },
  { key: "reviews", label: "Revisões feitas", better: "up" },
];

export default async function WeeklyReportPage({ searchParams }: { searchParams: Promise<{ periodo?: string }> }) {
  const month = (await searchParams).periodo === "mes";
  const { supabase, user, profile } = await getSession();
  const days = month ? 30 : 7;
  const { cur, prev } = await loadPeriods(supabase, user.id, days);
  const label = (c: ErrorCategory) => getCategory(c)!.label;
  const highlights = weeklyHighlights(cur, prev, label, month ? "month" : "week");
  const studyDays = profile?.study_days?.length ?? 7;
  const recs = periodRecommendations(cur, prev, { plannedMinutes: Math.round((profile?.daily_minutes ?? 15) * studyDays * (days / 7)), label });
  const cats = Array.from(new Set([...Object.keys(cur.errorsByCategory), ...Object.keys(prev.errorsByCategory)])) as ErrorCategory[];
  const fmt = (v: unknown, unit = "") => (v === null || v === undefined ? "—" : `${v}${unit}`);

  return (
    <main className="mx-auto max-w-3xl space-y-6">
      <ProgressTabs />
      <header>
        <h1 className="font-display text-3xl font-bold">{month ? "Relatório mensal" : "Relatório semanal"}</h1>
        <p className="mt-2 text-muted">Últimos {days} dias comparados com os {days} dias anteriores. “—” quando ainda não há dados suficientes para medir.</p>
        <nav aria-label="Período do relatório" className="mt-3 inline-flex rounded-full bg-surface-2 p-1">
          <Link href="/relatorio" aria-current={!month ? "page" : undefined} className={`rounded-full px-4 py-1.5 text-sm font-bold ${!month ? "bg-atlantic text-surface" : ""}`}>
            Semana
          </Link>
          <Link href="/relatorio?periodo=mes" aria-current={month ? "page" : undefined} className={`rounded-full px-4 py-1.5 text-sm font-bold ${month ? "bg-atlantic text-surface" : ""}`}>
            Mês
          </Link>
        </nav>
      </header>

      {recs.length > 0 && (
        <section className="panel border-2 border-boarding p-5" aria-labelledby="recomendacoes">
          <h2 id="recomendacoes" className="font-display text-xl font-bold">
            O Alex recomenda {month ? "para o próximo mês" : "para a próxima semana"}
          </h2>
          <ul className="mt-3 space-y-3">
            {recs.map((r) => (
              <li key={r.href} className="flex flex-wrap items-center justify-between gap-3">
                <span className="min-w-0 flex-1">{r.text}</span>
                <Link href={r.href} className="btn-ghost text-sm">
                  {r.cta}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="panel p-5" aria-labelledby="destaques">
        <h2 id="destaques" className="font-display text-xl font-bold">
          {month ? "Destaques do mês" : "Destaques da semana"}
        </h2>
        <ul className="mt-3 space-y-2">
          {highlights.length ? (
            highlights.map((h) => (
              <li key={h.text} className="flex items-start gap-2">
                {h.tone === "good" ? <ArrowUp size={18} className="mt-0.5 shrink-0 text-correct" aria-label="Melhorou" /> : h.tone === "bad" ? <ArrowDown size={18} className="mt-0.5 shrink-0 text-wrong" aria-label="Piorou" /> : <Info size={18} className="mt-0.5 shrink-0 text-muted" aria-hidden />}
                <span>{h.text}</span>
              </li>
            ))
          ) : (
            <li className="text-muted">Semana parecida com a anterior. Continue no ritmo.</li>
          )}
        </ul>
      </section>

      <section className="panel overflow-x-auto p-5" aria-labelledby="numeros">
        <h2 id="numeros" className="font-display text-xl font-bold">
          Números
        </h2>
        <table className="mt-3 w-full text-left text-sm">
          <thead>
            <tr className="text-muted">
              <th className="py-2 font-bold">Indicador</th>
              <th className="py-2 text-right font-bold">{month ? "Últimos 30 dias" : "Esta semana"}</th>
              <th className="py-2 text-right font-bold">Anterior</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.key} className="border-t border-line">
                <td className="py-2">{r.label}</td>
                <td className="py-2 text-right font-bold tabular-nums">{fmt(cur[r.key], r.unit)}</td>
                <td className="py-2 text-right tabular-nums text-muted">{fmt(prev[r.key], r.unit)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {cats.length > 0 && (
        <section className="panel p-5" aria-labelledby="erros">
          <h2 id="erros" className="font-display text-xl font-bold">
            Erros por tema
          </h2>
          <ul className="mt-3 space-y-2">
            {cats.map((c) => (
              <li key={c}>
                <Link href={`/dificuldades/${c}`} className="flex justify-between gap-2 rounded-xl bg-surface-2 px-3 py-2 hover:bg-line">
                  <span>{getCategory(c)!.label}</span>
                  <span className="shrink-0 tabular-nums text-muted">
                    {prev.errorsByCategory[c] ?? 0} → <strong className="text-ink">{cur.errorsByCategory[c] ?? 0}</strong>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="flex flex-wrap gap-2">
        <Link href="/praticar/adaptativo" className="btn-go">
          Fazer um treino adaptativo
        </Link>
        <Link href="/meu-professor" className="btn-ghost">
          Meu Professor IA
        </Link>
      </div>
    </main>
  );
}
