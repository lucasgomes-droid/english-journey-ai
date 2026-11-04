import Link from "next/link";
import { Check, Lock, Flag, Award } from "lucide-react";
import { LEVELS, LEVEL_ORDER, isLessonUnlocked, nextLessonFor } from "@/content/curriculum";
import { syllabusLevel } from "@/content/syllabus";
import { getCompletedLessons, getSession } from "@/lib/data";

export const metadata = { title: "Trilha" };

export default async function TrailPage() {
  const { supabase, user, profile } = await getSession();
  const startLevel = profile?.current_level ?? "A1";
  const { completed, rows } = await getCompletedLessons(supabase, user.id);
  const next = nextLessonFor(completed, startLevel);
  const best = new Map(rows.map((r) => [r.lesson_id as string, r.best_score as number]));
  const { data: examRows } = await supabase.from("exam_attempts").select("level_code, part").eq("user_id", user.id).eq("passed", true);
  const examPassed = (lv: string) => new Set((examRows ?? []).filter((r) => r.level_code === lv).map((r) => r.part)).size;
  const curIdx = LEVEL_ORDER.indexOf(startLevel);

  return (
    <main className="space-y-10">
      <header>
        <h1 className="font-display text-4xl font-bold">Sua trilha</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Cada aula é uma estação e pede 70% para concluir. Cada módulo termina com uma avaliação, e cada nível com uma prova de nível (escrita, Speaking e
          Conversation). O nível seguinte só abre quando você comprova o atual.
        </p>
      </header>

      {LEVELS.map((level) => (
        <section key={level.code} aria-labelledby={`lv-${level.code}`}>
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl bg-atlantic font-display text-lg font-bold text-surface">{level.code}</span>
            <div>
              <h2 id={`lv-${level.code}`} className="font-display text-2xl font-bold">
                {level.name}
              </h2>
              <p className="text-sm text-muted">{level.description}</p>
            </div>
          </div>

          {level.modules.length === 0 ? (
            <PlannedModules level={level.code} authoredTitles={[]} />
          ) : (
            <div className="mt-6 space-y-8">
              {level.modules.map((m) => {
                const done = m.lessons.filter((l) => completed.has(l.id)).length;
                return (
                  <div key={m.id} className="panel p-5 sm:p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-xl font-bold">{m.title}</h3>
                      <span className="text-sm text-muted">
                        {done}/{m.lessons.length} estações
                      </span>
                    </div>
                    <p className="text-muted">{m.description}</p>
                    <ol className="relative mt-5">
                      {m.lessons.map((l, i) => {
                        const isDone = completed.has(l.id);
                        const unlocked = isDone || isLessonUnlocked(l.id, completed, startLevel);
                        const isNext = next?.id === l.id;
                        const last = i === m.lessons.length - 1;
                        return (
                          <li key={l.id} className="relative flex gap-4 pb-5 last:pb-0">
                            {!last && (
                              <span aria-hidden className={`absolute left-[19px] top-10 h-[calc(100%-2.5rem)] w-1.5 rounded ${isDone ? "bg-boarding" : "bg-line"}`} />
                            )}
                            <span
                              aria-hidden
                              className={`relative z-10 grid size-11 shrink-0 place-items-center rounded-full border-4 ${
                                isDone
                                  ? "border-boarding bg-boarding text-boarding-ink"
                                  : isNext
                                    ? "border-boarding bg-surface text-atlantic"
                                    : "border-line bg-surface-2 text-muted"
                              }`}
                            >
                              {isDone ? <Check size={18} strokeWidth={3} /> : l.kind === "test" ? <Flag size={16} /> : unlocked ? <span className="size-2.5 rounded-full bg-atlantic" /> : <Lock size={15} />}
                            </span>
                            <div className="min-w-0 flex-1 pt-1">
                              {unlocked ? (
                                <Link href={`/aula/${l.id}`} className="group block">
                                  <span className="font-bold group-hover:text-atlantic group-hover:underline">{l.title}</span>
                                  {isNext && <span className="ml-2 rounded-full bg-boarding px-2 py-0.5 text-xs font-bold text-boarding-ink">Você está aqui</span>}
                                  <span className="block text-sm text-muted">
                                    {isDone ? `Melhor nota: ${best.get(l.id)}% · refazer` : l.objective}
                                  </span>
                                </Link>
                              ) : (
                                <>
                                  <span className="font-bold text-muted">{l.title}</span>
                                  <span className="block text-sm text-muted">
                                    {LEVEL_ORDER.indexOf(level.code) > curIdx ? `Abre quando você passar na prova de nível ${LEVEL_ORDER[LEVEL_ORDER.indexOf(level.code) - 1]}` : "Conclua a estação anterior para abrir"}
                                  </span>
                                </>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                );
              })}
              <Link
                href={`/prova/${level.code}`}
                className={`panel flex items-center gap-4 border-2 p-5 hover:bg-surface-2 ${examPassed(level.code) === 3 ? "border-boarding" : "border-transparent"}`}
              >
                <Award className={examPassed(level.code) === 3 ? "text-boarding" : "text-atlantic"} size={28} aria-hidden />
                <span className="flex-1">
                  <span className="block font-display text-xl font-bold">Prova de nível {level.code}</span>
                  <span className="block text-sm text-muted">
                    {examPassed(level.code) === 3
                      ? "Nível comprovado"
                      : LEVEL_ORDER.indexOf(level.code) < curIdx
                        ? "Opcional: você já está acima deste nível"
                        : `Escrita, Speaking e Conversation · ${examPassed(level.code)} de 3 aprovadas`}
                  </span>
                </span>
              </Link>
              <PlannedModules level={level.code} authoredTitles={level.modules.map((m) => m.title)} />
            </div>
          )}
        </section>
      ))}
    </main>
  );
}

function PlannedModules({ level, authoredTitles }: { level: Parameters<typeof syllabusLevel>[0]; authoredTitles: string[] }) {
  const syl = syllabusLevel(level);
  const planned = syl.modules.filter((m) => !authoredTitles.includes(m.title));
  if (!planned.length) return null;
  return (
    <div className="mt-6 space-y-4">
      <p className="text-sm text-muted">
        Em produção neste nível: {planned.length} {planned.length === 1 ? "módulo" : "módulos"}, {planned.reduce((s, m) => s + m.lessons.length, 0)} aulas. Meta do
        nível: cerca de {syl.words.toLocaleString("pt-BR")} palavras e {syl.hours} horas de estudo.
      </p>
      {planned.map((m) => (
        <details key={m.title} className="rounded-2xl border border-dashed border-line p-5">
          <summary className="cursor-pointer font-display text-lg font-bold text-muted">
            {m.title} <span className="ml-2 rounded-full bg-surface-2 px-2 py-0.5 text-xs font-bold">em produção</span>
          </summary>
          <ul className="mt-3 space-y-2">
            {m.lessons.map((l) => (
              <li key={l.title} className="text-sm">
                <span className="font-bold">{l.title}</span>
                <span className="text-muted"> · {l.grammar} · você vai conseguir {l.canDo}</span>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}
