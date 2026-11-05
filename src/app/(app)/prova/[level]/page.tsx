import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, CircleDashed, Lock, Mic, MessagesSquare, PenLine, Trophy, XCircle } from "lucide-react";
import { EXAM_PARTS, EXAM_PASS, getLevelExam, PART_LABEL, type ExamPart } from "@/content/level-exams";
import { getLevel, isLessonUnlocked, LEVEL_ORDER, nextLevel } from "@/content/curriculum";
import { getCompletedLessons, getSession } from "@/lib/data";
import { loadLevelExam } from "@/lib/exams";
import type { ExamFeedback } from "@/lib/exam-ai";

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  return { title: `Prova de nível ${level.toUpperCase()}` };
}

const ICON = { written: PenLine, speaking: Mic, conversation: MessagesSquare } as const;

export default async function LevelExamPage({ params }: { params: Promise<{ level: string }> }) {
  const { level: raw } = await params;
  const exam = getLevelExam(raw);
  if (!exam) notFound();
  const { supabase, user, profile } = await getSession();
  const current = profile?.current_level ?? "A1";
  const [{ state, attempts, plans }, { completed }] = await Promise.all([loadLevelExam(supabase, user.id, exam.level), getCompletedLessons(supabase, user.id)]);
  const finalId = `${exam.level.toLowerCase()}-final-test`;
  const finalOpen = completed.has(finalId) || isLessonUnlocked(finalId, completed, current);
  const aboveCurrent = LEVEL_ORDER.indexOf(exam.level) > LEVEL_ORDER.indexOf(current);
  const levelInfo = getLevel(exam.level);
  const nl = nextLevel(exam.level);

  const href: Record<ExamPart, string> = {
    written: `/aula/${finalId}`,
    speaking: `/prova/${exam.level}/speaking`,
    conversation: `/prova/${exam.level}/conversa`,
  };
  const lastDetails = (part: ExamPart) => [...attempts].reverse().find((a) => a.part === part)?.details as { feedback?: ExamFeedback } | null | undefined;

  return (
    <main className="mx-auto max-w-3xl space-y-6">
      <Link href="/trilha" className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft size={16} aria-hidden /> Trilha
      </Link>
      <header>
        <p className="text-sm font-bold text-atlantic">{levelInfo?.name}</p>
        <h1 className="font-display text-3xl font-bold">Prova de nível {exam.level}</h1>
        <p className="mt-2 text-muted">
          Para subir de nível você precisa comprovar as três partes. Se não passar em uma delas, o app monta um plano de recuperação com base nos seus erros, e a nova
          tentativa abre quando você cumprir o plano.
        </p>
      </header>

      {state.passed && (
        <section className="panel flex items-start gap-4 border-2 border-boarding p-5" role="status">
          <Trophy className="mt-1 shrink-0 text-boarding" size={28} aria-hidden />
          <div>
            <h2 className="font-display text-2xl font-bold">Nível {exam.level} comprovado</h2>
            <p className="mt-1 text-muted">
              {nl ? `Você passou nas três partes. O ${nl} está aberto na trilha.` : "Você concluiu a prova final do curso, do A1 ao C2."}
            </p>
            {nl && (
              <Link href="/trilha" className="btn-go mt-3 inline-flex">
                Ir para o {nl}
              </Link>
            )}
          </div>
        </section>
      )}

      {aboveCurrent && !state.passed && (
        <p className="rounded-xl bg-surface-2 p-4 text-sm">
          Você está no nível {current}. Esta prova abre depois que você comprovar os níveis anteriores.
        </p>
      )}

      <section className="panel p-5">
        <h2 className="font-display text-xl font-bold">O que a prova verifica</h2>
        <p className="text-sm text-muted">Ao final do {exam.level}, você consegue:</p>
        <ul className="mt-3 space-y-2">
          {exam.canDo.map((c) => (
            <li key={c} className="flex gap-2">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-atlantic" aria-hidden /> {c}
            </li>
          ))}
        </ul>
      </section>

      <ol className="space-y-4">
        {EXAM_PARTS.map((part, i) => {
          const st = state.parts[part];
          const Icon = ICON[part];
          const tasks = plans[part];
          const fb = lastDetails(part)?.feedback;
          const canStart = !st.passed && !st.lock && !aboveCurrent && (part !== "written" || finalOpen);
          return (
            <li key={part} className="panel p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-surface-2 text-atlantic">
                    <Icon size={20} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold">
                      {i + 1}. {PART_LABEL[part]}
                    </h3>
                    <p className="text-sm text-muted">
                      Nota mínima: {EXAM_PASS[part]}%
                      {st.attempts > 0 && ` · ${st.attempts} ${st.attempts === 1 ? "tentativa" : "tentativas"} · melhor nota ${st.best}%`}
                    </p>
                  </div>
                </div>
                <Status passed={st.passed} lock={st.lock} attempted={st.attempts > 0} />
              </div>

              {part === "written" && (
                <p className="mt-3 text-sm text-muted">É o teste final do nível na trilha: leitura, escrita, listening, gramática e vocabulário.</p>
              )}
              {part === "speaking" && (
                <p className="mt-3 text-sm text-muted">Duas perguntas para responder falando (até {exam.speakingSeconds} s cada). Avaliamos a transcrição e o ritmo da sua fala.</p>
              )}
              {part === "conversation" && (
                <p className="mt-3 text-sm text-muted">
                  {exam.conversation.title}: {exam.conversation.setting_pt} {exam.turns} falas suas.
                </p>
              )}

              {fb && !st.passed && (
                <div className="mt-3 rounded-xl bg-surface-2 p-3 text-sm">
                  <p>{fb.summary_pt}</p>
                  {fb.improve_pt.length > 0 && (
                    <ul className="mt-2 list-disc space-y-1 pl-5">
                      {fb.improve_pt.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {st.lock === "plan" && tasks && (
                <div className="mt-4 rounded-2xl border border-boarding/60 p-4">
                  <h4 className="font-bold">Seu plano de recuperação</h4>
                  <p className="text-sm text-muted">Montado a partir dos seus erros. A nova tentativa abre quando tudo estiver feito.</p>
                  <ul className="mt-3 space-y-3">
                    {tasks.map((t) => (
                      <li key={t.id}>
                        <Link href={t.href} className="group flex items-center gap-3">
                          {t.complete ? (
                            <CheckCircle2 size={20} className="shrink-0 text-correct" aria-hidden />
                          ) : (
                            <CircleDashed size={20} className="shrink-0 text-muted" aria-hidden />
                          )}
                          <span className="min-w-0 flex-1">
                            <span className={`font-bold group-hover:underline ${t.complete ? "text-muted line-through" : ""}`}>{t.label}</span>
                            {t.total > 1 && (
                              <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-surface-2">
                                <span className="block h-full bg-boarding" style={{ width: `${(t.done / t.total) * 100}%` }} />
                              </span>
                            )}
                          </span>
                          {t.total > 1 && (
                            <span className="text-sm tabular-nums text-muted">
                              {t.done}/{t.total}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {canStart && (
                <Link href={href[part]} className="btn-go mt-4 inline-flex">
                  {st.attempts > 0 ? "Tentar de novo" : part === "written" ? "Fazer o teste final" : "Começar"}
                </Link>
              )}
              {part === "written" && !finalOpen && !st.passed && !aboveCurrent && (
                <p className="mt-3 text-sm text-muted">Conclua as aulas e os testes de módulo do {exam.level} para liberar.</p>
              )}
              {st.lock === "prereq" && <p className="mt-3 text-sm text-muted">Abre depois que você passar na parte anterior.</p>}
            </li>
          );
        })}
      </ol>
    </main>
  );
}

function Status({ passed, lock, attempted }: { passed: boolean; lock: string | null; attempted: boolean }) {
  if (passed)
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-correct-bg px-3 py-1 text-sm font-bold text-correct">
        <CheckCircle2 size={16} aria-hidden /> Aprovado
      </span>
    );
  if (lock === "plan")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-wrong-bg px-3 py-1 text-sm font-bold text-wrong">
        <XCircle size={16} aria-hidden /> Plano de recuperação
      </span>
    );
  if (lock === "prereq")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-3 py-1 text-sm font-bold text-muted">
        <Lock size={14} aria-hidden /> Bloqueado
      </span>
    );
  return <span className="rounded-full bg-surface-2 px-3 py-1 text-sm font-bold text-muted">{attempted ? "Liberado" : "A fazer"}</span>;
}
