import Link from "next/link";
import { Award, Check, ChevronDown, Flag, Lock } from "lucide-react";
import { LEVELS, LEVEL_ORDER, isLessonUnlocked, nextLessonFor } from "@/content/curriculum";
import { getCompletedLessons, getSession } from "@/lib/data";
import { StudyRail } from "@/components/study-rail";
import { TalkingPeople } from "@/components/illustrations";
import type { CefrLevel } from "@/content/types";

export const metadata = { title: "Trilha" };

export default async function TrailPage({ searchParams }: { searchParams: Promise<{ nivel?: string }> }) {
  const sp = await searchParams;
  const { supabase, user, profile } = await getSession();
  const current = (profile?.current_level ?? "A1") as CefrLevel;
  const shown = (LEVEL_ORDER.includes(sp.nivel as CefrLevel) ? sp.nivel : current) as CefrLevel;
  const { completed, rows } = await getCompletedLessons(supabase, user.id);
  const next = nextLessonFor(completed, current);
  const best = new Map(rows.map((r) => [r.lesson_id as string, r.best_score as number]));
  const { data: examRows } = await supabase.from("exam_attempts").select("level_code, part").eq("user_id", user.id).eq("passed", true);
  const examPassed = (lv: string) => new Set((examRows ?? []).filter((r) => r.level_code === lv).map((r) => r.part)).size;
  const level = LEVELS.find((l) => l.code === shown)!;
  const curIdx = LEVEL_ORDER.indexOf(current);
  const shownIdx = LEVEL_ORDER.indexOf(shown);
  const all = level.modules.flatMap((m) => m.lessons);
  const doneCount = all.filter((l) => completed.has(l.id)).length;

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_20rem] [&>*]:min-w-0">
      <main className="space-y-6">
        <h1 className="font-display text-3xl font-bold">Trilha de Estudos</h1>

        <nav aria-label="Níveis" className="flex gap-2 overflow-x-auto pb-1">
          {LEVELS.map((l, i) => (
            <Link
              key={l.code}
              href={`/trilha?nivel=${l.code}`}
              aria-current={l.code === shown ? "page" : undefined}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border-2 px-4 py-1.5 text-sm font-bold ${
                l.code === shown ? "border-gold bg-boarding text-boarding-ink" : i < curIdx ? "border-gold bg-surface text-ink" : "border-line bg-surface text-muted"
              }`}
            >
              {i > curIdx && <Lock size={13} aria-label="bloqueado" />}
              {l.code}
            </Link>
          ))}
        </nav>

        <section className="panel p-6 sm:p-8" aria-labelledby="sua-trilha">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id="sua-trilha" className="font-display text-2xl font-bold">
                Sua trilha · {level.code} {level.name}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {doneCount} de {all.length} estações · cada aula pede 70%, cada módulo termina com uma avaliação e o nível com uma prova.
              </p>
              <div className="mt-3 h-2 max-w-sm overflow-hidden rounded-full bg-surface-2">
                <div className="h-full rounded-full bg-gold" style={{ width: `${Math.round((doneCount / Math.max(1, all.length)) * 100)}%` }} />
              </div>
            </div>
            <TalkingPeople className="hidden h-24 w-28 shrink-0 sm:block" />
          </div>
          {shownIdx > curIdx && (
            <p className="mt-4 rounded-2xl bg-surface-2 p-3 text-sm">
              Este nível abre quando você passar na <Link href={`/prova/${LEVEL_ORDER[shownIdx - 1]}`} className="font-bold underline">prova de nível {LEVEL_ORDER[shownIdx - 1]}</Link>.
            </p>
          )}

          <div className="mt-6 space-y-4">
            {level.modules.map((m) => {
              const mDone = m.lessons.filter((l) => completed.has(l.id)).length;
              const hasNext = m.lessons.some((l) => l.id === next?.id);
              const complete = mDone === m.lessons.length;
              const locked = !hasNext && !complete && !m.lessons.some((l) => completed.has(l.id) || isLessonUnlocked(l.id, completed, current));
              // Só o módulo atual fica aberto: a trilha mostra o que fazer agora, sem uma lista enorme.
              return (
              <details key={m.id} open={hasNext || (!next && m === level.modules[0])} className="group/mod">
                <summary className="flex cursor-pointer list-none items-center gap-3 rounded-2xl py-1 [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0 flex-1">
                    <span className="font-display text-lg font-bold">{m.title}</span>
                    <span className="ml-2 text-sm text-muted">
                      {complete ? "concluído" : locked ? "bloqueado" : `${mDone} de ${m.lessons.length}`}
                    </span>
                  </span>
                  {complete ? <Check size={18} className="shrink-0 text-gold" aria-hidden /> : locked ? <Lock size={16} className="shrink-0 text-muted" aria-hidden /> : null}
                  <ChevronDown size={18} className="shrink-0 text-muted transition group-open/mod:rotate-180" aria-hidden />
                </summary>
                <ol className="relative mt-3">
                  {m.lessons.map((l, i) => {
                    const isDone = completed.has(l.id);
                    const unlocked = isDone || isLessonUnlocked(l.id, completed, current);
                    const isNext = next?.id === l.id;
                    const last = i === m.lessons.length - 1;
                    return (
                      <li key={l.id} className="relative flex items-center gap-4 pb-4 last:pb-0">
                        {!last && <span aria-hidden className={`absolute left-[25px] top-[52px] h-[calc(100%-44px)] w-1 rounded ${isDone ? "bg-gold" : "bg-line"}`} />}
                        <span
                          aria-hidden
                          className={`relative z-10 grid size-[54px] shrink-0 place-items-center rounded-full border-[3px] font-display text-lg font-bold ${
                            isDone ? "border-gold bg-gold text-boarding-ink" : isNext ? "border-gold bg-boarding text-boarding-ink ring-4 ring-boarding/30" : unlocked ? "border-gold bg-surface text-ink" : "border-line bg-surface-2 text-muted"
                          }`}
                        >
                          {isDone ? <Check size={22} strokeWidth={3} /> : l.kind === "test" ? <Flag size={20} /> : l.order}
                        </span>
                        <div className="min-w-0 flex-1">
                          {unlocked ? (
                            <Link href={`/aula/${l.id}`} className="group block">
                              <span className={`inline-block font-bold ${isNext ? "rounded-full bg-gold px-4 py-1.5 text-boarding-ink" : "group-hover:text-atlantic group-hover:underline"}`}>{l.title}</span>
                              <span className="block text-sm text-muted">{isDone ? `Melhor nota: ${best.get(l.id)}% · refazer` : isNext ? "Você está aqui" : l.objective}</span>
                            </Link>
                          ) : (
                            <span className="block font-bold text-muted">{l.title}</span>
                          )}
                        </div>
                        {!unlocked && <Lock size={16} className="shrink-0 text-muted" aria-label="bloqueada" />}
                      </li>
                    );
                  })}
                </ol>
              </details>
              );
            })}

            <Link href={`/prova/${level.code}`} className={`flex items-center gap-4 rounded-2xl border-2 p-4 ${examPassed(level.code) === 3 ? "border-gold bg-boarding/15" : "border-dashed border-line hover:border-gold"}`}>
              <span className="grid size-[54px] shrink-0 place-items-center rounded-full bg-gold text-white">
                <Award size={24} aria-hidden />
              </span>
              <span className="flex-1">
                <span className="block font-display text-lg font-bold">Prova de nível {level.code}</span>
                <span className="block text-sm text-muted">
                  {examPassed(level.code) === 3 ? "Nível comprovado" : `Escrita, Speaking e Conversation · ${examPassed(level.code)} de 3 aprovadas`}
                </span>
              </span>
            </Link>
          </div>
        </section>
      </main>

      <aside aria-label="Rotina e semana" className="hidden xl:block">
        <StudyRail />
      </aside>
    </div>
  );
}
