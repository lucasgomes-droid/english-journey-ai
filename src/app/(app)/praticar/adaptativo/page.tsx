import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSession } from "@/lib/data";
import { ALL_MODULES, LEVEL_ORDER } from "@/content/curriculum";
import { CATEGORIES_INFO, getCategory, type ErrorCategory } from "@/content/error-patterns";
import { buildPatterns, lessonCategory } from "@/lib/difficulty-rules";
import { loadErrorEvents } from "@/lib/difficulties";
import { adaptiveMix, categoryWeights, masteredCategories } from "@/lib/adaptive";
import { DrillRunner } from "@/components/drill-runner";
import type { Exercise } from "@/content/types";

export const metadata = { title: "Treino adaptativo" };
const N = 12;

export default async function AdaptivePage() {
  const { supabase, user, profile } = await getSession();
  const level = profile?.current_level ?? "A1";
  const events = await loadErrorEvents(supabase, user.id);
  const patterns = buildPatterns(events);

  // Domínio: temas com muitas respostas e quase nenhum erro nos exercícios.
  const stats = new Map<ErrorCategory, { total: number; wrong: number }>();
  for (const e of events.filter((x) => x.source === "exercise")) {
    const s = stats.get(e.category) ?? { total: 0, wrong: 0 };
    s.total++;
    if (e.wrong) s.wrong++;
    stats.set(e.category, s);
  }
  const mastered = masteredCategories(Array.from(stats.entries()).map(([category, s]) => ({ category, ...s })));
  const weights = categoryWeights(patterns, CATEGORIES_INFO.map((c) => c.id), mastered);

  // Banco: exercícios das aulas até o seu nível + exercícios específicos de cada tema.
  const maxIdx = LEVEL_ORDER.indexOf(level);
  const pool: { id: string; category: ErrorCategory; exercise: Exercise }[] = [];
  for (const m of ALL_MODULES.filter((m) => LEVEL_ORDER.indexOf(m.level) <= maxIdx && LEVEL_ORDER.indexOf(m.level) >= maxIdx - 1)) {
    for (const l of m.lessons.filter((l) => l.kind === "lesson"))
      for (const e of l.exercises.filter((e) => e.type !== "match_pairs")) pool.push({ id: e.id, category: lessonCategory(l.id, e.skill), exercise: e });
  }
  for (const c of CATEGORIES_INFO) for (const d of c.drills) pool.push({ id: d.id, category: c.id, exercise: d });

  const today = new Date().toISOString().slice(0, 10);
  const { count } = await supabase.from("activity_log").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("ref", "adaptive").eq("local_date", today);
  const mix = adaptiveMix(pool, weights, N, `${user.id}-${today}-${count ?? 0}`);
  const labels = Object.fromEntries(mix.map((m) => [m.id, getCategory(m.category)!.label]));
  const focus = [...new Set(mix.map((m) => m.category))].map((c) => ({ c, n: mix.filter((m) => m.category === c).length })).sort((a, b) => b.n - a.n);

  return (
    <main className="mx-auto max-w-2xl space-y-5">
      <Link href="/praticar" className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft size={16} aria-hidden /> Praticar
      </Link>
      <header>
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Treino adaptativo</h1>
        <p className="mt-2 text-muted">
          {N} exercícios escolhidos para você: mais do que você erra, menos do que você já domina. A cada treino, a mistura se ajusta aos seus resultados.
        </p>
        <p className="mt-3 flex flex-wrap gap-2 text-sm">
          {focus.slice(0, 4).map((f) => (
            <span key={f.c} className="rounded-full bg-surface-2 px-3 py-1">
              {getCategory(f.c)!.label} · {f.n}
            </span>
          ))}
          {mastered.size > 0 && <span className="rounded-full bg-correct-bg px-3 py-1 text-correct">Dominados (menos treino): {[...mastered].map((c) => getCategory(c)!.label).join(", ")}</span>}
        </p>
      </header>
      <section className="panel p-5">
        <DrillRunner key={mix.map((m) => m.id).join()} drills={mix.map((m) => m.exercise)} adaptive labels={labels} />
      </section>
      <Link href="/praticar/adaptativo" className="btn-ghost inline-flex">
        Fazer outro treino
      </Link>
    </main>
  );
}
