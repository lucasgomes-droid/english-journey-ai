import Link from "next/link";
import { Award, CheckCircle2, CircleDashed, Lock, XCircle } from "lucide-react";
import { getCompletedLessons, getSession } from "@/lib/data";
import { LEVELS, LEVEL_ORDER, isLessonUnlocked } from "@/content/curriculum";
import { EXAM_PARTS, PART_LABEL } from "@/content/level-exams";
import { examState, type ExamAttempt, type RecoveryPlan } from "@/lib/exam-rules";

export const metadata = { title: "Avaliações" };

export default async function AssessmentsPage() {
  const { supabase, user, profile } = await getSession();
  const current = profile?.current_level ?? "A1";
  const [{ completed, rows }, attemptsRes, plansRes] = await Promise.all([
    getCompletedLessons(supabase, user.id),
    supabase.from("exam_attempts").select("level_code, part, score, passed, created_at").eq("user_id", user.id),
    supabase.from("recovery_plans").select("id, level_code, part, tasks, created_at, completed_at").eq("user_id", user.id),
  ]);
  const best = new Map(rows.map((r) => [r.lesson_id as string, r.best_score as number]));
  const attempts = (attemptsRes.data ?? []) as (ExamAttempt & { level_code: string })[];
  const plans = (plansRes.data ?? []) as RecoveryPlan[];
  const curIdx = LEVEL_ORDER.indexOf(current);

  return (
    <main className="space-y-6">
      <header>
        <h1 className="font-display text-4xl font-bold">Avaliações</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Cada módulo termina com uma avaliação (70%) e cada nível com uma prova em três partes: escrita (Reading, Writing e Listening, 75%), Speaking (60%) e
          Conversation (60%). Se não passar, você recebe um plano de recuperação e refaz depois de praticar.
        </p>
      </header>

      {LEVELS.filter((l) => l.modules.length).map((level) => {
        const st = examState(
          attempts.filter((a) => a.level_code === level.code),
          plans.filter((p) => p.level_code === level.code),
        );
        const tests = level.modules.flatMap((m) => m.lessons.filter((l) => l.kind === "test" && !m.id.endsWith("-final")).map((l) => ({ l, m })));
        const idx = LEVEL_ORDER.indexOf(level.code);
        const open = idx <= curIdx;
        return (
          <section key={level.code} className="panel p-5" aria-labelledby={`av-${level.code}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id={`av-${level.code}`} className="flex items-center gap-3 font-display text-2xl font-bold">
                <span className="grid size-10 place-items-center rounded-xl bg-atlantic text-base text-surface">{level.code}</span>
                {level.name}
              </h2>
              {st.passed ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-correct-bg px-3 py-1 text-sm font-bold text-correct">
                  <Award size={16} aria-hidden /> Nível comprovado
                </span>
              ) : !open ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-3 py-1 text-sm font-bold text-muted">
                  <Lock size={14} aria-hidden /> Abre depois do {LEVEL_ORDER[idx - 1]}
                </span>
              ) : null}
            </div>

            <h3 className="mt-4 text-sm font-bold text-muted">Avaliações dos módulos</h3>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {tests.map(({ l, m }) => {
                const score = best.get(l.id);
                const done = completed.has(l.id);
                const can = done || isLessonUnlocked(l.id, completed, current);
                return (
                  <li key={l.id}>
                    <Link
                      href={can ? `/aula/${l.id}` : "#"}
                      aria-disabled={!can}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${can ? "bg-surface-2 hover:bg-line" : "pointer-events-none bg-surface-2 opacity-60"}`}
                    >
                      {done ? (
                        <CheckCircle2 size={18} className="shrink-0 text-correct" aria-hidden />
                      ) : score !== undefined ? (
                        <XCircle size={18} className="shrink-0 text-wrong" aria-hidden />
                      ) : (
                        <CircleDashed size={18} className="shrink-0 text-muted" aria-hidden />
                      )}
                      <span className="min-w-0 flex-1 truncate text-sm font-bold">{m.title}</span>
                      <span className="shrink-0 text-sm tabular-nums text-muted">{score !== undefined ? `${score}%` : "—"}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <h3 className="mt-4 text-sm font-bold text-muted">Prova de nível</h3>
            <ul className="mt-2 grid gap-2 sm:grid-cols-3">
              {EXAM_PARTS.map((p) => {
                const ps = st.parts[p];
                return (
                  <li key={p} className="rounded-xl border border-line px-3 py-2.5 text-sm">
                    <p className="font-bold">{PART_LABEL[p]}</p>
                    <p className="text-muted">
                      {ps.passed ? `Aprovado · ${ps.best}%` : ps.lock === "plan" ? `Plano de recuperação · última ${ps.last}%` : ps.attempts ? `Última nota ${ps.last}%` : "Ainda não feita"}
                    </p>
                  </li>
                );
              })}
            </ul>
            {open && (
              <Link href={`/prova/${level.code}`} className="btn-primary mt-4 inline-flex">
                {st.passed ? "Ver a prova" : "Ir para a prova de nível"}
              </Link>
            )}
          </section>
        );
      })}
    </main>
  );
}
