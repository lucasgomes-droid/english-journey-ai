import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, CircleDashed, MessagesSquare } from "lucide-react";
import { getSession } from "@/lib/data";
import { getCategory } from "@/content/error-patterns";
import { buildPatterns } from "@/lib/difficulty-rules";
import { conversationTurnsSince, loadErrorEvents, loadPlans } from "@/lib/difficulties";
import { SpeakButton } from "@/components/speak-button";
import { DrillRunner } from "@/components/drill-runner";
import { StartPlanButton, StudiedButton, VerifyButton } from "@/components/plan-buttons";
import type { Exercise } from "@/content/types";

export async function generateMetadata({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params;
  return { title: getCategory(cat)?.label ?? "Dificuldade" };
}

function Step({ n, title, done, children }: { n: number; title: string; done: boolean; children: React.ReactNode }) {
  return (
    <li className="panel p-5">
      <h2 className="flex items-center gap-2 font-display text-xl font-bold">
        {done ? <CheckCircle2 className="text-correct" aria-hidden /> : <CircleDashed className="text-muted" aria-hidden />}
        <span>
          {n}. {title}
        </span>
      </h2>
      <div className="mt-3">{children}</div>
    </li>
  );
}

export default async function DifficultyPlanPage({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params;
  const info = getCategory(cat);
  if (!info) notFound();
  const { supabase, user, profile } = await getSession();
  const [events, plans] = await Promise.all([loadErrorEvents(supabase, user.id), loadPlans(supabase, user.id)]);
  const pattern = buildPatterns(events).find((p) => p.category === info.id);
  const plan = plans.find((p) => p.category === info.id && p.status === "active");
  const last = plans.find((p) => p.category === info.id && p.status !== "active");
  const turns = plan ? await conversationTurnsSince(supabase, user.id, plan.created_at) : 0;

  // Exercícios: primeiro as frases que VOCÊ errou (escolher a forma certa), depois os do tema.
  const own: Exercise[] = (pattern?.samples ?? [])
    .filter((s) => s.original && s.corrected && !s.original.startsWith("entendido como"))
    .slice(0, 3)
    .map((s, i) => ({ id: `own-${i}`, type: "multiple_choice", skill: "grammar", prompt: "Qual destas frases está correta?", options: i % 2 ? [s.original, s.corrected] : [s.corrected, s.original], answer: i % 2 ? 1 : 0 }));
  const drills = [...own, ...info.drills];
  const level = profile?.current_level ?? "A1";
  const sceneHref = `/professor?cena=${encodeURIComponent(`${info.scene_pt} (Quero praticar: ${info.label}.)`)}&nivel=${level}`;

  return (
    <main className="mx-auto max-w-3xl space-y-5">
      <Link href="/dificuldades" className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft size={16} aria-hidden /> Minhas Dificuldades
      </Link>
      <header>
        <p className="text-sm font-bold text-atlantic">Plano de recuperação</p>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">{info.label}</h1>
        {last?.result && <p className="mt-2 text-sm text-muted">Último plano: {last.result.summary}</p>}
      </header>

      {!plan ? (
        <section className="panel p-5">
          <p>{info.explanation_pt}</p>
          <div className="mt-4">
            <StartPlanButton category={info.id} label={last ? "Fazer o plano de novo" : "Começar plano de recuperação"} />
          </div>
        </section>
      ) : (
        <ol className="space-y-4">
          <Step n={1} title="O assunto" done>
            <p>
              {pattern
                ? `Encontramos ${pattern.errors} ${pattern.errors === 1 ? "erro" : "erros"} seus neste tema${pattern.rate !== null ? ` (${pattern.rate}% de erro nos exercícios)` : ""}.`
                : "Você escolheu reforçar este tema."}
              {plan.baseline_rate !== null && ` Ponto de partida: ${plan.baseline_rate}% de erro.`}
            </p>
            {pattern && pattern.samples.length > 0 && (
              <ul className="mt-2 space-y-1 text-sm">
                {pattern.samples.map((s, k) => (
                  <li key={k}>
                    <span className="text-wrong line-through" lang="en">
                      {s.original}
                    </span>{" "}
                    → <strong lang="en">{s.corrected}</strong>
                  </li>
                ))}
              </ul>
            )}
          </Step>
          <Step n={2} title="O erro, explicado em português" done={plan.steps.studied}>
            <p>{info.explanation_pt}</p>
          </Step>
          <Step n={3} title="Exemplos corretos" done={plan.steps.studied}>
            <ul className="space-y-2">
              {info.examples.map((e) => (
                <li key={e.en} className="flex items-center gap-3 rounded-xl bg-surface-2 p-3">
                  <SpeakButton text={e.en} size="sm" withSlow />
                  <span>
                    <span className="block font-bold" lang="en">
                      {e.en}
                    </span>
                    <span className="text-sm text-muted">{e.pt}</span>
                  </span>
                </li>
              ))}
            </ul>
            {!plan.steps.studied && (
              <div className="mt-4">
                <StudiedButton planId={plan.id} />
              </div>
            )}
          </Step>
          <Step n={4} title="Exercícios específicos" done={plan.steps.drillScore !== null}>
            {!plan.steps.studied ? (
              <p className="text-muted">Abre depois que você ler a explicação e os exemplos.</p>
            ) : plan.steps.drillScore !== null ? (
              <p>
                Você acertou <strong>{plan.steps.drillScore}%</strong>.
              </p>
            ) : (
              <DrillRunner planId={plan.id} drills={drills} />
            )}
          </Step>
          <Step n={5} title="Use numa conversa" done={turns >= 4}>
            <p>Agora use o tema numa conversa de verdade. O personagem cria chances para você praticar; mande pelo menos 4 falas.</p>
            <p className="mt-1 text-sm text-muted">Falas desde o início do plano: {Math.min(turns, 4)}/4</p>
            <Link href={sceneHref} className="btn-go mt-3 inline-flex">
              <MessagesSquare size={18} aria-hidden /> Praticar conversando
            </Link>
          </Step>
          <Step n={6} title="Verificar a evolução" done={false}>
            <p className="text-muted">Comparamos seus resultados antes e depois do plano. O resultado fica registrado no seu histórico.</p>
            <div className="mt-3">
              <VerifyButton planId={plan.id} />
            </div>
          </Step>
        </ol>
      )}
    </main>
  );
}
