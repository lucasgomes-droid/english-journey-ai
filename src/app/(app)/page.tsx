import Link from "next/link";
import { ArrowRight, Sparkles, TriangleAlert } from "lucide-react";
import { getDashboard, getSession } from "@/lib/data";
import { loadHomeCoach } from "@/lib/teacher";
import { getCategory } from "@/content/error-patterns";
import { getModule } from "@/content/curriculum";
import { StudyRail } from "@/components/study-rail";
import { TalkingPeople } from "@/components/illustrations";

export const metadata = { title: "Início" };

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

/** Trilha de progresso A1 → C2 com círculos dourados (nível atual em destaque). */
function ProgressTrail({ current, pct }: { current: string; pct: number }) {
  const ci = LEVELS.indexOf(current);
  return (
    <div>
      <p className="text-sm font-bold">Trilha de progresso</p>
      <ol className="mt-3 flex items-center" aria-label={`Nível atual: ${current}, ${pct}% concluído`}>
        {LEVELS.map((lv, i) => (
          <li key={lv} className="flex flex-1 items-center last:flex-none">
            <span
              className={`grid size-10 shrink-0 place-items-center rounded-full border-2 text-sm font-bold sm:size-11 ${
                i < ci ? "border-gold bg-gold text-boarding-ink" : i === ci ? "border-gold bg-boarding text-boarding-ink ring-4 ring-boarding/30" : "border-line bg-surface text-muted"
              }`}
              aria-current={i === ci ? "step" : undefined}
            >
              {lv}
            </span>
            {i < LEVELS.length - 1 && <span className={`h-1 flex-1 ${i < ci ? "bg-gold" : "bg-line"}`} aria-hidden />}
          </li>
        ))}
      </ol>
      <p className="mt-2 text-xs text-muted">
        {current}: {pct}% das aulas concluídas
      </p>
    </div>
  );
}

export default async function Dashboard() {
  const d = await getDashboard();
  const { supabase, user } = await getSession();
  const coach = await loadHomeCoach(supabase, user.id, d.skills, d.dueReviews);
  const { profile, nextLesson } = d;
  const mod = nextLesson ? getModule(nextLesson.moduleId) : null;
  const courseDone = !nextLesson && profile.current_level === "C2" && d.examPartsPassed.length === 3;
  const firstName = profile.display_name.split(" ")[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_20rem] [&>*]:min-w-0">
      <main className="space-y-6">
        <h1 className="font-display text-3xl font-bold">Início</h1>

        {/* Continuar de onde parei + trilha de progresso */}
        <section className="panel p-6 sm:p-8" aria-labelledby="continuar">
          <p className="text-muted">
            Olá, {firstName}. {nextLesson ? "Continuar de onde parei:" : "Sua próxima etapa:"}
          </p>
          <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
            <div className="min-w-0">
              <h2 id="continuar" className="font-display text-4xl font-bold sm:text-5xl">
                {nextLesson ? nextLesson.title : courseDone ? "Trilha A1 → C2 concluída" : `Prova de nível ${profile.current_level}`}
              </h2>
              <p className="mt-2 max-w-xl text-muted">
                {nextLesson
                  ? `${mod?.title} · ${nextLesson.objective}`
                  : courseDone
                    ? "Para manter o nível: revisão, conversas e um exame oficial (CPE ou IELTS)."
                    : `Você terminou as aulas do ${profile.current_level}. Comprove escrita, Speaking e Conversation (${d.examPartsPassed.length} de 3).`}
              </p>
            </div>
            {nextLesson ? (
              <Link href={`/aula/${nextLesson.id}`} className="btn-go rounded-full px-7 text-lg">
                {nextLesson.kind === "test" ? "Fazer avaliação" : "Começar aula"}
              </Link>
            ) : (
              !courseDone && (
                <Link href={`/prova/${profile.current_level}`} className="btn-go rounded-full px-7 text-lg">
                  Ir para a prova
                </Link>
              )
            )}
          </div>
          <div className="mt-8 border-t border-line pt-6">
            <ProgressTrail current={profile.current_level} pct={d.levelProgress} />
          </div>
        </section>

        <div className="grid gap-5 md:grid-cols-[1.4fr_1fr] [&>*]:min-w-0">
          {/* Prática recomendada pelo professor IA */}
          <section className="panel flex gap-4 overflow-hidden p-6" aria-labelledby="recomendada">
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="flex items-center gap-1.5 text-sm font-bold text-muted">
                <Sparkles size={16} className="text-gold" aria-hidden /> Prática recomendada
              </p>
              <h2 id="recomendada" className="mt-1 font-display text-2xl font-bold">
                {coach.recommendation.title}
              </h2>
              <p className="mt-1 text-sm text-muted">{coach.recommendation.why}</p>
              <div className="mt-auto pt-4">
                <Link href={coach.recommendation.href} className="btn-primary rounded-full px-6">
                  {coach.recommendation.cta}
                </Link>
              </div>
            </div>
            <TalkingPeople className="hidden h-36 w-36 shrink-0 self-end sm:block" />
          </section>

          {/* Conversa ou dificuldade principal */}
          <section className="panel flex flex-col p-6" aria-labelledby="foco">
            {coach.patterns[0] ? (
              <>
                <p className="flex items-center gap-1.5 text-sm font-bold text-muted">
                  <TriangleAlert size={16} className="text-wrong" aria-hidden /> Sua maior dificuldade
                </p>
                <h2 id="foco" className="mt-1 font-display text-xl font-bold">
                  {getCategory(coach.patterns[0].category)!.label}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {coach.patterns[0].recent} erros nas últimas 2 semanas. O professor monta um plano curto para resolver.
                </p>
                <div className="mt-auto pt-4">
                  <Link href={`/dificuldades/${coach.patterns[0].category}`} className="btn-primary rounded-full px-6">
                    Resolver agora
                  </Link>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm font-bold text-muted">Conversa com o professor</p>
                <h2 id="foco" className="mt-1 font-display text-xl font-bold">
                  Fale sobre qualquer assunto
                </h2>
                <p className="mt-1 text-sm text-muted">Por voz, em inglês ou português. Ele corrige sua pronúncia e acompanha sua evolução.</p>
                <div className="mt-auto pt-4">
                  <Link href="/conversa" className="btn-primary rounded-full px-6">
                    Conversar
                  </Link>
                </div>
              </>
            )}
          </section>
        </div>

        <Link href="/meu-professor" className="flex items-center justify-between gap-3 rounded-3xl border border-dashed border-line px-6 py-4 font-bold text-muted hover:border-atlantic hover:text-ink">
          Ver meu progresso: acerto por habilidade, pronúncia, conversação e avaliações
          <ArrowRight size={18} aria-hidden />
        </Link>
      </main>

      <aside aria-label="Rotina e semana">
        <StudyRail />
      </aside>
    </div>
  );
}
