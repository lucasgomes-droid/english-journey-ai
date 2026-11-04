import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleAlert, TrendingDown, TrendingUp, Minus, Sparkles } from "lucide-react";
import { getSession } from "@/lib/data";
import { loadPatterns, loadPlans } from "@/lib/difficulties";
import { getCategory } from "@/content/error-patterns";
import { StartPlanButton } from "@/components/plan-buttons";

export const metadata = { title: "Minhas Dificuldades" };

const SOURCE: Record<string, string> = { exercise: "exercícios", conversation: "conversas", listening: "listening", pronunciation: "pronúncia" };
const DATE = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" });

function Trend({ t }: { t: string }) {
  if (t === "melhorando")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-correct-bg px-2 py-0.5 text-xs font-bold text-correct">
        <TrendingDown size={14} aria-hidden /> menos erros
      </span>
    );
  if (t === "piorando")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-wrong-bg px-2 py-0.5 text-xs font-bold text-wrong">
        <TrendingUp size={14} aria-hidden /> mais erros
      </span>
    );
  if (t === "novo") return <span className="rounded-full bg-boarding/30 px-2 py-0.5 text-xs font-bold">recente</span>;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-2 py-0.5 text-xs font-bold text-muted">
      <Minus size={14} aria-hidden /> estável
    </span>
  );
}

export default async function DifficultiesPage() {
  const { supabase, user } = await getSession();
  const [{ patterns }, plans] = await Promise.all([loadPatterns(supabase, user.id), loadPlans(supabase, user.id)]);
  const active = new Map(plans.filter((p) => p.status === "active").map((p) => [p.category, p]));
  const history = plans.filter((p) => p.status !== "active");

  return (
    <main className="space-y-6">
      <header>
        <h1 className="font-display text-4xl font-bold">Minhas Dificuldades</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Os padrões dos seus erros, a partir dos seus exercícios, conversas, listenings e gravações reais. Para cada um, o professor monta um plano: explica em
          português, mostra exemplos, cria exercícios, coloca você para usar numa conversa e verifica se você evoluiu.
        </p>
      </header>

      {patterns.length === 0 ? (
        <section className="panel p-6">
          <p className="font-bold">Ainda não há erros suficientes para encontrar padrões.</p>
          <p className="mt-1 text-muted">Faça aulas e converse com os personagens: cada erro corrigido entra aqui automaticamente.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/trilha" className="btn-primary">
              Ir para a trilha
            </Link>
            <Link href="/conversar" className="btn-ghost">
              Conversar
            </Link>
          </div>
        </section>
      ) : (
        <ol className="space-y-4">
          {patterns.slice(0, 8).map((p, i) => {
            const info = getCategory(p.category)!;
            const plan = active.get(p.category);
            return (
              <li key={p.category} className="panel p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-muted">{i === 0 ? "Sua principal dificuldade agora" : `#${i + 1}`}</p>
                    <h2 className="font-display text-xl font-bold">{info.label}</h2>
                    <p className="mt-1 text-sm text-muted">
                      {p.errors} {p.errors === 1 ? "erro" : "erros"} em {p.sources.map((s) => SOURCE[s]).join(", ")}
                      {p.rate !== null && ` · ${p.rate}% de erro nos exercícios`} · {p.recent} nas últimas 2 semanas
                    </p>
                  </div>
                  <Trend t={p.trend} />
                </div>
                {p.samples.length > 0 && (
                  <ul className="mt-3 space-y-1 text-sm">
                    {p.samples.map((s, k) => (
                      <li key={k}>
                        <span className="text-wrong line-through" lang="en">
                          {s.original}
                        </span>{" "}
                        → <strong lang="en">{s.corrected}</strong>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-4">
                  {plan ? (
                    <Link href={`/dificuldades/${p.category}`} className="btn-go inline-flex">
                      Continuar o plano <ArrowRight size={18} aria-hidden />
                    </Link>
                  ) : (
                    <StartPlanButton category={p.category} />
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}

      {history.length > 0 && (
        <section className="panel p-5">
          <h2 className="font-display text-xl font-bold">Histórico dos planos</h2>
          <ul className="mt-3 divide-y divide-line">
            {history.map((h) => (
              <li key={h.id} className="flex items-start gap-3 py-3">
                {h.status === "improved" ? <CheckCircle2 className="mt-0.5 shrink-0 text-correct" aria-hidden /> : <CircleAlert className="mt-0.5 shrink-0 text-[#d49b00]" aria-hidden />}
                <div className="min-w-0 flex-1">
                  <p className="font-bold">
                    {getCategory(h.category)?.label} <span className="text-sm font-normal text-muted">· {DATE.format(new Date(h.completed_at ?? h.created_at))}</span>
                  </p>
                  <p className="text-sm text-muted">{h.result?.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="flex items-center gap-2 text-sm text-muted">
        <Sparkles size={16} aria-hidden /> A revisão espaçada também prioriza o que você erra mais.{" "}
        <Link href="/meu-professor" className="font-bold underline">
          Ver meu painel de desenvolvimento
        </Link>
      </p>
    </main>
  );
}
