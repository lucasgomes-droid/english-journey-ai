import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { computeDiagnostics } from "@/lib/diagnostics";
import { loadPatterns, loadPlans, type PracticePlanRow } from "@/lib/difficulties";
import { getCategory } from "@/content/error-patterns";
import type { Pattern } from "@/lib/difficulty-rules";
import type { Profile } from "@/lib/data";

const SKILL_PT: Record<string, string> = { grammar: "Gramática", vocabulary: "Vocabulário", listening: "Listening", reading: "Leitura", writing: "Escrita", speaking: "Fala" };

const weekKey = (iso: string) => {
  const d = new Date(iso);
  const monday = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - ((d.getUTCDay() + 6) % 7)));
  return monday.toISOString().slice(0, 10);
};

function weekly<T>(rows: T[], at: (r: T) => string, value: (rs: T[]) => number | null, weeks = 8) {
  const by = new Map<string, T[]>();
  for (const r of rows) by.set(weekKey(at(r)), [...(by.get(weekKey(at(r))) ?? []), r]);
  return Array.from(by.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-weeks)
    .map(([week, rs]) => ({ week, value: value(rs), n: rs.length }))
    .filter((w) => w.value !== null) as { week: string; value: number; n: number }[];
}

export interface Recommendation {
  title: string;
  why: string;
  href: string;
  cta: string;
}

/** Prática recomendada: sempre baseada nos dados reais (dificuldade principal, revisão, área mais fraca). */
export interface WeakArea {
  label: string;
  score: number | null;
  href: string;
  action: string;
}

export function recommend(patterns: Pattern[], weakest: WeakArea | null, dueReviews: number, plans: PracticePlanRow[]): Recommendation {
  const active = plans.find((p) => p.status === "active");
  if (active) {
    const c = getCategory(active.category)!;
    return { title: `Continuar o plano: ${c.label}`, why: "Você começou um plano de recuperação e ainda não terminou.", href: `/dificuldades/${active.category}`, cta: "Continuar plano" };
  }
  // Não insiste num tema que o aluno acabou de recuperar com sucesso (últimos 7 dias).
  const recentlyFixed = new Set(plans.filter((p) => p.status === "improved" && p.completed_at && Date.now() - new Date(p.completed_at).getTime() < 7 * 86_400_000).map((p) => p.category));
  const top = patterns.find((p) => p.recent >= 2 && !recentlyFixed.has(p.category));
  if (top) {
    const c = getCategory(top.category)!;
    return {
      title: `Reforçar: ${c.label}`,
      why: `${top.recent} erros nas últimas duas semanas${top.rate !== null ? ` (${top.rate}% de erro nos exercícios)` : ""}.`,
      href: `/dificuldades/${top.category}`,
      cta: "Começar o plano",
    };
  }
  if (dueReviews >= 10) return { title: `Revisar ${dueReviews} itens`, why: "Eles estão no ponto certo para você não esquecer.", href: "/revisao", cta: "Revisar agora" };
  if (weakest && weakest.score !== null && weakest.score < 70)
    return { title: `Treinar ${weakest.label.toLowerCase()}`, why: `É a sua área com menos acertos (${weakest.score}%).`, href: weakest.href, cta: weakest.action };
  return { title: "Conversar numa situação real", why: "Seus resultados estão bons: use o inglês numa conversa para ganhar confiança.", href: "/conversar", cta: "Conversar" };
}

export async function loadTeacherPanel(supabase: SupabaseClient, uid: string, profile: Profile) {
  const since = new Date(Date.now() - 70 * 86_400_000).toISOString();
  const [diag, { events, patterns }, plans, timesRes, convRes, msgRes, pairRes, dueRes] = await Promise.all([
    computeDiagnostics(supabase, uid),
    loadPatterns(supabase, uid),
    loadPlans(supabase, uid),
    supabase.from("exercise_answers").select("skill, response_ms, created_at").eq("user_id", uid).not("response_ms", "is", null).order("created_at", { ascending: false }).limit(400),
    supabase.from("conversations").select("report_score, updated_at, title").eq("user_id", uid).not("report_score", "is", null).order("updated_at", { ascending: true }).limit(40),
    supabase.from("messages").select("correction, created_at").eq("user_id", uid).eq("role", "user").gte("created_at", since).limit(2000),
    supabase.from("pronunciation_attempts").select("completeness, created_at").eq("user_id", uid).eq("provider", "minimal-pair").gte("created_at", since).limit(2000),
    supabase.from("review_items").select("item_id", { count: "exact", head: true }).eq("user_id", uid).lte("due_at", new Date().toISOString()),
  ]);

  // Tempo para formular respostas, por habilidade (mediana em segundos).
  const times = timesRes.data ?? [];
  const median = (xs: number[]) => {
    const s = [...xs].sort((a, b) => a - b);
    return s.length ? s[Math.floor(s.length / 2)] : 0;
  };
  const bySkill = new Map<string, number[]>();
  for (const t of times) bySkill.set(t.skill, [...(bySkill.get(t.skill) ?? []), t.response_ms as number]);
  const responseTimes = Array.from(bySkill.entries())
    .filter(([, v]) => v.length >= 3)
    .map(([skill, v]) => ({ skill: SKILL_PT[skill] ?? skill, seconds: Math.round(median(v) / 100) / 10, n: v.length }))
    .sort((a, b) => b.seconds - a.seconds);

  // Conversação: nota dos relatórios e % de falas sem correção por semana.
  const msgs = msgRes.data ?? [];
  const conversationWeeks = weekly(msgs, (m) => m.created_at, (rs) => (rs.length >= 3 ? Math.round((rs.filter((r) => !r.correction).length / rs.length) * 100) : null));
  const reportScores = (convRes.data ?? []).slice(-8).map((c) => ({ title: c.title as string, score: c.report_score as number }));

  // Pronúncia: % de acerto nos pares mínimos por semana (dado real do reconhecedor).
  const pronunciationWeeks = weekly(pairRes.data ?? [], (p) => p.created_at, (rs) => (rs.length >= 4 ? Math.round((rs.filter((r) => Number(r.completeness) === 100).length / rs.length) * 100) : null));

  const strengths = diag.areas.filter((a) => a.score !== null && a.score >= 75);
  const recentErrors = events
    .filter((e) => e.wrong && e.sample)
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, 8)
    .map((e) => ({ ...e.sample!, at: e.at, category: getCategory(e.category)!.label, source: e.source }));

  return {
    level: profile.current_level,
    diag,
    patterns: patterns.slice(0, 4),
    plans,
    strengths,
    responseTimes,
    conversationWeeks,
    reportScores,
    pronunciationWeeks,
    recentErrors,
    dueReviews: dueRes.count ?? 0,
    recommendation: recommend(patterns, diag.weakest, dueRes.count ?? 0, plans),
  };
}

const SKILL_HREF: Record<string, { href: string; action: string }> = {
  listening: { href: "/listening", action: "Praticar listening" },
  vocabulary: { href: "/revisao", action: "Revisar palavras" },
  grammar: { href: "/dificuldades", action: "Ver dificuldades" },
  reading: { href: "/trilha", action: "Rever aulas" },
  writing: { href: "/mini-aulas", action: "Fazer mini-aulas" },
  speaking: { href: "/pronuncia", action: "Treinar pronúncia" },
};

/** Versão leve para a tela inicial: dificuldades e recomendação sem o diagnóstico completo. */
export async function loadHomeCoach(supabase: SupabaseClient, uid: string, skills: { skill: string; label: string; accuracy: number | null; answers: number }[], dueReviews: number) {
  const [{ patterns }, plans] = await Promise.all([loadPatterns(supabase, uid), loadPlans(supabase, uid)]);
  const measured = skills.filter((s) => s.accuracy !== null && s.answers >= 5);
  const w = measured.length ? measured.reduce((m, s) => (s.accuracy! < m.accuracy! ? s : m)) : null;
  const weakest = w ? { label: w.label, score: w.accuracy, ...(SKILL_HREF[w.skill] ?? { href: "/praticar", action: "Praticar" }) } : null;
  return { patterns: patterns.slice(0, 3), recommendation: recommend(patterns, weakest, dueReviews, plans) };
}
