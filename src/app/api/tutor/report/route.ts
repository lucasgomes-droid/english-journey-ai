import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUser } from "@/lib/supabase/server";
import { AiError } from "@/lib/ai";
import { getScenario } from "@/content/scenarios";
import { getLesson } from "@/content/curriculum";
import { conversationReport } from "@/lib/conversation-report";
import { savePhrases } from "@/lib/speaking";

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

  await supabase.from("conversations").update({ report, report_score: report.score }).eq("id", conv.id);
  // As expressões novas vão para o seu banco de frases e entram na revisão.
  const saved = await savePhrases(supabase, user.id, scenario?.title ?? conv.title, "conversation", report.expressions);
  return NextResponse.json({ report, savedPhrases: saved.length });
}
