import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUser } from "@/lib/supabase/server";
import { AiError, chatCompletion, type ChatMessage } from "@/lib/ai";
import { canUse, LIMIT_MESSAGE, recordUsage } from "@/lib/ai-budget";
import { getLesson, getModule } from "@/content/curriculum";
import { parseTutorReply } from "@/lib/tutor-prompt";
import { parseJsonObject } from "@/lib/speaking-parse";
import { parseTalkReview, talkPassed, talkReviewPrompt, talkSystemPrompt, TALK_TURNS } from "@/lib/lesson-talk";
import type { CefrLevel } from "@/content/types";

export const maxDuration = 30;

const schema = z.object({
  lessonId: z.string().min(3).max(60),
  turns: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(800) })).max(TALK_TURNS * 2 + 2),
  finish: z.boolean().optional(),
});

/** Conversa da aula: uma fala do Alex (ou, com `finish`, o mini-resultado e o registro como evidência de domínio). */
export async function POST(req: Request) {
  const { supabase, user } = await currentUser();
  if (!user) return NextResponse.json({ error: "Faça login novamente." }, { status: 401 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  const lesson = getLesson(parsed.data.lessonId);
  if (!lesson || lesson.kind !== "lesson") return NextResponse.json({ error: "Aula não encontrada." }, { status: 404 });
  if (!(await canUse(supabase, user.id, "chat"))) return NextResponse.json({ error: LIMIT_MESSAGE.chat, limit: true }, { status: 429 });
  const level = (getModule(lesson.moduleId)?.level ?? "A1") as CefrLevel;
  const { turns, finish } = parsed.data;

  try {
    if (finish) {
      const studentLines = turns.filter((t) => t.role === "user").map((t) => t.content.trim()).filter(Boolean);
      if (!studentLines.length) return NextResponse.json({ error: "Responda pelo menos uma vez." }, { status: 422 });
      const transcript = turns.map((t) => `${t.role === "user" ? "STUDENT" : "TEACHER"}: ${t.content}`).join("\n");
      const review = parseTalkReview(parseJsonObject(await chatCompletion([{ role: "system", content: talkReviewPrompt(lesson, level) }, { role: "user", content: transcript.slice(0, 4000) }], { json: true, purpose: "turn", temperature: 0.2, maxTokens: 900 })));
      void recordUsage(supabase, "chat");
      if (!review) return NextResponse.json({ error: "Não consegui avaliar agora. Tente de novo." }, { status: 502 });
      // Conta como evidência de produção (domínio da aula), como o "Use você mesmo".
      await supabase.from("production_attempts").insert({
        user_id: user.id,
        lesson_id: lesson.id,
        mode: "speak",
        text: studentLines.join(" / ").slice(0, 1200),
        score: review.score,
        feedback: { ...review, used_target: talkPassed(review), kind: "lesson-talk" },
      });
      return NextResponse.json(review);
    }

    const { data: profile } = await supabase.from("profiles").select("display_name").eq("id", user.id).single();
    const name = String(profile?.display_name ?? "").split(" ")[0] || "student";
    const messages: ChatMessage[] = [{ role: "system", content: talkSystemPrompt(lesson, level, name) }, ...turns.map((t) => ({ role: t.role, content: t.content }))];
    // Primeira fala: o Alex abre com a pergunta da aula.
    if (!turns.length) messages.push({ role: "user", content: "(The call starts. Greet the student in one short sentence and ask your first question.)" });
    const reply = parseTutorReply(await chatCompletion(messages, { json: true, purpose: "turn", temperature: 0.6, maxTokens: 700 }));
    void recordUsage(supabase, "chat");
    const userTurns = turns.filter((t) => t.role === "user").length;
    return NextResponse.json({ reply: reply.reply, correction: reply.correction, done: userTurns >= TALK_TURNS });
  } catch (e) {
    const err = e instanceof AiError ? e : new AiError("Falha ao falar com a IA. Tente de novo.");
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
}
