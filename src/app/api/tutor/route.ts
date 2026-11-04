import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { AiError, chatCompletion, type ChatMessage } from "@/lib/ai";
import { parseTutorReply, tutorSystemPrompt } from "@/lib/tutor-prompt";
import { getRecentMistakes, type Profile } from "@/lib/data";
import { getLesson } from "@/content/curriculum";
import { recordActivity, syncAchievements } from "@/lib/progress";

export const maxDuration = 60;

const bodySchema = z.object({
  conversationId: z.string().uuid().nullable().optional(),
  message: z.string().trim().min(1).max(1000),
  lessonId: z.string().max(60).nullable().optional(),
  viaVoice: z.boolean().optional(),
});

const HISTORY_LIMIT = 24; // mensagens anteriores enviadas ao modelo (mantém o contexto)

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Faça login novamente." }, { status: 401 });

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Mensagem inválida (máx. 1000 caracteres)." }, { status: 400 });
  const { message, lessonId, viaVoice } = parsed.data;
  let conversationId = parsed.data.conversationId ?? null;

  // Limite simples de uso: 20 mensagens por minuto por aluno.
  const { count: recent } = await supabase
    .from("messages")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("role", "user")
    .gte("created_at", new Date(Date.now() - 60_000).toISOString());
  if ((recent ?? 0) >= 20) return NextResponse.json({ error: "Muitas mensagens em sequência. Aguarde um minuto." }, { status: 429 });

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single<Profile>();
  if (!profile) return NextResponse.json({ error: "Perfil não encontrado." }, { status: 500 });

  // Conversa existente ou nova
  let lesson = lessonId ? getLesson(lessonId) : undefined;
  let history: { role: "user" | "assistant"; content: string }[] = [];
  if (conversationId) {
    const { data: conv } = await supabase.from("conversations").select("id, lesson_id").eq("id", conversationId).eq("user_id", user.id).maybeSingle();
    if (!conv) return NextResponse.json({ error: "Conversa não encontrada." }, { status: 404 });
    lesson = conv.lesson_id ? getLesson(conv.lesson_id) : undefined;
    const { data: msgs } = await supabase
      .from("messages")
      .select("role, content")
      .eq("conversation_id", conversationId)
      .order("id", { ascending: false })
      .limit(HISTORY_LIMIT);
    history = (msgs ?? []).reverse() as typeof history;
  } else {
    const title = message.length > 48 ? `${message.slice(0, 45)}…` : message;
    const { data: conv, error } = await supabase
      .from("conversations")
      .insert({ user_id: user.id, mode: "tutor", lesson_id: lesson?.id ?? null, level_code: profile.current_level, title: lesson ? `Prática: ${lesson.title}` : title })
      .select("id")
      .single();
    if (error || !conv) return NextResponse.json({ error: `Não foi possível criar a conversa: ${error?.message}` }, { status: 500 });
    conversationId = conv.id as string;
    if (lesson?.conversation) {
      await supabase.from("messages").insert({ conversation_id: conversationId, user_id: user.id, role: "assistant", content: lesson.conversation.starter });
      history = [{ role: "assistant", content: lesson.conversation.starter }];
    }
  }

  // Salva a mensagem do aluno antes de chamar a IA (não se perde em caso de erro).
  const { data: userMsg, error: umErr } = await supabase
    .from("messages")
    .insert({ conversation_id: conversationId, user_id: user.id, role: "user", content: message, via_voice: Boolean(viaVoice) })
    .select("id")
    .single();
  if (umErr || !userMsg) return NextResponse.json({ error: `Não foi possível salvar a mensagem: ${umErr?.message}` }, { status: 500 });

  const recentMistakes = await getRecentMistakes(supabase, user.id, 6);
  const system = tutorSystemPrompt({
    studentName: profile.display_name.split(" ")[0] || "student",
    level: profile.current_level,
    learningGoal: profile.learning_goal,
    recentMistakes,
    lesson: lesson?.conversation
      ? { title: lesson.title, objective: lesson.objective, vocabulary: lesson.vocabulary.map((v) => v.en), goal: lesson.conversation.goal }
      : null,
  });
  const messages: ChatMessage[] = [{ role: "system", content: system }, ...history, { role: "user", content: message }];

  let reply;
  try {
    reply = parseTutorReply(await chatCompletion(messages, { json: true }));
  } catch (e) {
    const err = e instanceof AiError ? e : new AiError("Falha ao falar com a IA. Tente de novo.");
    return NextResponse.json({ error: err.message, conversationId, userMessageId: userMsg.id }, { status: err.status });
  }

  // Correção pertence à mensagem do aluno; resposta é nova mensagem do professor.
  if (reply.correction) await supabase.from("messages").update({ correction: reply.correction }).eq("id", userMsg.id);
  const { data: aMsg } = await supabase
    .from("messages")
    .insert({ conversation_id: conversationId, user_id: user.id, role: "assistant", content: reply.reply, tip: reply.tip_pt })
    .select("id")
    .single();
  await supabase.from("conversations").update({ updated_at: new Date().toISOString() }).eq("id", conversationId);

  // XP pela prática de conversação (2 XP por mensagem, ~45 s de estudo).
  const updated = await recordActivity(supabase, profile, { kind: "chat", ref: conversationId, title: "Conversa com o professor", xp: 2, durationSeconds: 45 });
  await syncAchievements(supabase, updated);

  return NextResponse.json({
    conversationId,
    userMessageId: userMsg.id,
    assistantMessageId: aMsg?.id ?? null,
    reply: reply.reply,
    correction: reply.correction,
    tip: reply.tip_pt,
  });
}
