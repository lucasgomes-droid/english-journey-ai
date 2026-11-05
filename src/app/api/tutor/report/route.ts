import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUser } from "@/lib/supabase/server";
import { AiError } from "@/lib/ai";
import { getScenario } from "@/content/scenarios";
import { getLesson } from "@/content/curriculum";
import { conversationReport } from "@/lib/conversation-report";
import { savePhrases } from "@/lib/speaking";
import { classifyCorrection, getCategory, type ErrorCategory } from "@/content/error-patterns";

export const maxDuration = 60;

const schema = z.object({ conversationId: z.string().uuid() });

/** Relatório do fim da conversa: o que disse, versão melhor, erros, expressões, nota e sugestão. */
export async function POST(req: Request) {
  const { supabase, user } = await currentUser();
  if (!user) return NextResponse.json({ error: "Faça login novamente." }, { status: 401 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Conversa inválida." }, { status: 400 });

  const [convRes, msgsRes] = await Promise.all([
    supabase.from("conversations").select("id, scenario_id, custom_prompt, lesson_id, level_code, title").eq("id", parsed.data.conversationId).eq("user_id", user.id).maybeSingle(),
    supabase.from("messages").select("role, content").eq("conversation_id", parsed.data.conversationId).eq("user_id", user.id).order("id").limit(200),
  ]);
  const conv = convRes.data;
  if (!conv) return NextResponse.json({ error: "Conversa não encontrada." }, { status: 404 });
  const turns = (msgsRes.data ?? []) as { role: "user" | "assistant"; content: string }[];
  if (turns.filter((t) => t.role === "user").length < 2) return NextResponse.json({ error: "Converse um pouco mais (pelo menos 2 falas suas) para gerar o relatório." }, { status: 422 });

  const scenario = conv.scenario_id ? getScenario(conv.scenario_id) : undefined;
  const lesson = conv.lesson_id ? getLesson(conv.lesson_id) : undefined;
  const scene = scenario ? `${scenario.title} — ${scenario.setting}` : conv.custom_prompt ? `Custom scene: ${conv.custom_prompt}` : lesson ? `Lesson practice: ${lesson.title}` : "Free conversation with the teacher";

  let report;
  try {
    report = await conversationReport({ level: conv.level_code, scene, goals: scenario?.goals ?? [], turns });
  } catch (e) {
    return NextResponse.json({ error: e instanceof AiError ? e.message : "Não foi possível gerar o relatório agora." }, { status: 502 });
  }
  if (!report) return NextResponse.json({ error: "Não foi possível gerar o relatório agora. Tente de novo." }, { status: 502 });

  // Pronúncia nesta conversa (repetições conferidas pelo reconhecedor), correções e tempo de resposta.
  const [pronRes, corrRes] = await Promise.all([
    supabase.from("pronunciation_attempts").select("reference_text, completeness, details").eq("user_id", user.id).filter("details->>context", "eq", `chat:${conv.id}`).limit(100),
    supabase.from("messages").select("correction, response_ms").eq("conversation_id", conv.id).eq("user_id", user.id).eq("role", "user"),
  ]);
  const byPhrase = new Map<string, { best: number; first: number; attempts: number; missed: Set<string> }>();
  for (const r of pronRes.data ?? []) {
    const e = byPhrase.get(r.reference_text) ?? { best: 0, first: Number(r.completeness), attempts: 0, missed: new Set<string>() };
    e.best = Math.max(e.best, Number(r.completeness));
    e.attempts++;
    for (const w of ((r.details as { words?: { word: string; accuracy: number }[] } | null)?.words ?? [])) if (w.accuracy < 70) e.missed.add(w.word);
    byPhrase.set(r.reference_text, e);
  }
  const pronunciation = [...byPhrase.entries()].map(([en, e]) => ({ en, best: e.best, first: e.first, attempts: e.attempts, missed: [...e.missed].slice(0, 5) }));
  const cats = new Map<ErrorCategory, number>();
  for (const m of corrRes.data ?? []) {
    const c = m.correction as { original?: string; corrected?: string; category?: ErrorCategory } | null;
    if (c?.corrected) {
      const k = c.category ?? classifyCorrection(c.original ?? "", c.corrected);
      cats.set(k, (cats.get(k) ?? 0) + 1);
    }
  }
  const times = (corrRes.data ?? []).map((m) => m.response_ms as number | null).filter((x): x is number => typeof x === "number");
  const responseSeconds = times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length / 100) / 10 : null;
  const exercises = [
    ...[...cats.entries()].sort((a, b) => b[1] - a[1]).slice(0, 2).map(([c]) => ({ label: `Plano de recuperação: ${getCategory(c)!.label}`, href: `/dificuldades/${c}` })),
    ...(pronunciation.some((p) => p.best < 85) ? [{ label: "Treinar pronúncia (pares mínimos e frases)", href: "/pronuncia" }] : []),
    { label: "Revisar as expressões novas desta conversa", href: "/revisao" },
  ];
  const full = { ...report, pronunciation, exercises, responseSeconds };
  await supabase.from("conversations").update({ report: full, report_score: report.score }).eq("id", conv.id);
  // As expressões novas vão para o seu banco de frases e entram na revisão.
  const saved = await savePhrases(supabase, user.id, scenario?.title ?? conv.title, "conversation", report.expressions);
  return NextResponse.json({ report: full, savedPhrases: saved.length });
}
