/**
 * Regras puras de "Minhas Dificuldades": agrupa erros reais por padrão e mede a evolução.
 */
import { getLesson, getModule } from "@/content/curriculum";
import { syllabusLevel } from "@/content/syllabus";
import { categoryForGrammar, type ErrorCategory } from "@/content/error-patterns";
import type { CefrLevel } from "@/content/types";

/** Categoria de um erro em exercício: pela habilidade e pelo tema gramatical da aula. */
export function lessonCategory(lessonId: string, skill: string): ErrorCategory {
  if (skill === "listening") return "listening";
  if (skill === "vocabulary") return "vocabulary";
  const lesson = getLesson(lessonId);
  const mod = lesson ? getModule(lesson.moduleId) : undefined;
  if (!lesson || !mod) return "structure";
  const syl = syllabusLevel(mod.level as CefrLevel)?.modules[mod.order - 1];
  const sl = syl?.lessons.find((x) => x.title === lesson.title) ?? (lesson.kind === "lesson" ? syl?.lessons[lesson.order - 1] : undefined);
  return sl ? categoryForGrammar(sl.grammar) : "structure";
}

export interface ErrorEvent {
  category: ErrorCategory;
  wrong: boolean;
  at: string;
  /** Fonte: exercício, conversa, listening ou pronúncia. */
  source: "exercise" | "conversation" | "listening" | "pronunciation";
  sample?: { original: string; corrected: string };
}

export interface Pattern {
  category: ErrorCategory;
  errors: number;
  attempts: number;
  /** % de erro nos exercícios (null se poucos dados). */
  rate: number | null;
  recent: number;
  previous: number;
  trend: "melhorando" | "piorando" | "estável" | "novo";
  sources: string[];
  samples: { original: string; corrected: string }[];
}

const DAY = 86_400_000;

export function buildPatterns(events: ErrorEvent[], now = Date.now()): Pattern[] {
  const by = new Map<ErrorCategory, ErrorEvent[]>();
  for (const e of events) by.set(e.category, [...(by.get(e.category) ?? []), e]);
  const out: Pattern[] = [];
  for (const [category, evs] of by) {
    const wrong = evs.filter((e) => e.wrong);
    if (!wrong.length) continue;
    const t = (e: ErrorEvent) => new Date(e.at).getTime();
    const recent = wrong.filter((e) => now - t(e) <= 14 * DAY).length;
    const previous = wrong.filter((e) => now - t(e) > 14 * DAY && now - t(e) <= 28 * DAY).length;
    const ex = evs.filter((e) => e.source === "exercise" || e.source === "listening" || e.source === "pronunciation");
    const exWrong = ex.filter((e) => e.wrong).length;
    out.push({
      category,
      errors: wrong.length,
      attempts: ex.length,
      rate: ex.length >= 5 ? Math.round((exWrong / ex.length) * 100) : null,
      recent,
      previous,
      trend: previous === 0 ? (recent > 0 ? "novo" : "estável") : recent < previous * 0.7 ? "melhorando" : recent > previous * 1.3 ? "piorando" : "estável",
      sources: Array.from(new Set(wrong.map((e) => e.source))),
      // Ordem estável (mais recentes primeiro; empate pelo texto) para os exercícios não mudarem entre recarregamentos.
      samples: wrong
        .filter((e) => e.sample)
        .sort((x, y) => y.at.localeCompare(x.at) || x.sample!.original.localeCompare(y.sample!.original))
        .filter((e, i, arr) => arr.findIndex((o) => o.sample!.original === e.sample!.original && o.sample!.corrected === e.sample!.corrected) === i)
        .slice(0, 3)
        .map((e) => e.sample!),
    });
  }
  // Mais importante: erros recentes, depois taxa de erro, depois total.
  return out.sort((a, b) => b.recent - a.recent || (b.rate ?? 0) - (a.rate ?? 0) || b.errors - a.errors);
}

/** Taxa de erro de uma categoria num período (para comparar antes × depois do plano). */
export function errorRate(events: ErrorEvent[], category: ErrorCategory, fromMs: number, toMs = Infinity): { rate: number | null; n: number } {
  const evs = events.filter((e) => e.category === category && (e.source === "exercise" || e.source === "listening") && new Date(e.at).getTime() >= fromMs && new Date(e.at).getTime() < toMs);
  return { rate: evs.length >= 3 ? Math.round((evs.filter((e) => e.wrong).length / evs.length) * 100) : null, n: evs.length };
}

export interface PlanSteps {
  /** 1–3: viu explicação e exemplos. */
  studied: boolean;
  /** 4: exercícios específicos (nota). */
  drillScore: number | null;
  /** 5: falas numa conversa focada no tema, desde o início do plano. */
  conversationTurns: number;
}

/** 6: verificação. Evoluiu se acertou ≥ 80% nos exercícios, conversou e (havendo dados) errou menos que antes. */
export function verifyPlan(steps: PlanSteps, baseline: number | null, after: number | null): { ready: boolean; improved: boolean; summary: string } {
  const ready = steps.studied && steps.drillScore !== null && steps.conversationTurns >= 4;
  if (!ready) return { ready, improved: false, summary: "Complete as etapas para verificar sua evolução." };
  const drillsOk = steps.drillScore! >= 80;
  const rateOk = baseline === null || after === null ? true : after < baseline;
  const improved = drillsOk && rateOk;
  const rateText = baseline !== null && after !== null ? ` Erro nos exercícios do tema: ${baseline}% antes → ${after}% depois.` : "";
  return {
    ready,
    improved,
    summary: improved
      ? `Você evoluiu: ${steps.drillScore}% nos exercícios específicos.${rateText}`
      : `Ainda não firmou: ${steps.drillScore}% nos exercícios específicos.${rateText} Refaça o plano para fixar.`,
  };
}
