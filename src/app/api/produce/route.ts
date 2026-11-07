import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUser } from "@/lib/supabase/server";
import { AiError } from "@/lib/ai";
import { canUse, LIMIT_MESSAGE, recordUsage } from "@/lib/ai-budget";
import { getLesson, getModule } from "@/content/curriculum";
import { productionFeedback } from "@/lib/production-ai";

export const maxDuration = 30;

const schema = z.object({ lessonId: z.string().min(3).max(60), text: z.string().trim().min(3).max(1200), mode: z.enum(["write", "speak"]) });

/** "Use você mesmo": corrige a produção livre do fim da aula e guarda como evidência de domínio. */
export async function POST(req: Request) {
  const { supabase, user } = await currentUser();
  if (!user) return NextResponse.json({ error: "Faça login novamente." }, { status: 401 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Escreva pelo menos uma frase." }, { status: 400 });
  const lesson = getLesson(parsed.data.lessonId);
  if (!lesson || lesson.kind !== "lesson") return NextResponse.json({ error: "Aula não encontrada." }, { status: 404 });
  if (!(await canUse(supabase, user.id, "chat"))) return NextResponse.json({ error: LIMIT_MESSAGE.chat, limit: true }, { status: 429 });

  let feedback;
  try {
    feedback = await productionFeedback({
      level: getModule(lesson.moduleId)?.level ?? "A1",
      objective: lesson.objective,
      target: [...lesson.vocabulary.map((v) => v.en), ...lesson.examples.slice(0, 4).map((e) => e.en)].slice(0, 16),
      text: parsed.data.text,
      mode: parsed.data.mode,
    });
    void recordUsage(supabase, "chat");
  } catch (e) {
    return NextResponse.json({ error: e instanceof AiError ? e.message : "Não consegui corrigir agora." }, { status: e instanceof AiError ? e.status : 502 });
  }
  if (!feedback) return NextResponse.json({ error: "Não consegui corrigir agora. Tente de novo." }, { status: 502 });
  await supabase.from("production_attempts").insert({ user_id: user.id, lesson_id: lesson.id, mode: parsed.data.mode, text: parsed.data.text, score: feedback.score, feedback });
  return NextResponse.json(feedback);
}
