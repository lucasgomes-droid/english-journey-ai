import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUser } from "@/lib/supabase/server";
import { AiError } from "@/lib/ai";
import { getLevelExam } from "@/content/level-exams";
import { evaluateConversation, examinerReply, type ExamTurn } from "@/lib/exam-ai";
import { loadLevelExam, recordExamAttempt } from "@/lib/exams";
import { rubricScore } from "@/lib/exam-rules";
import { recordActivity } from "@/lib/progress";
import type { Profile } from "@/lib/data";

export const maxDuration = 60;

const schema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("start"), level: z.string().max(2) }),
  z.object({ action: z.literal("turn"), sessionId: z.string().uuid(), text: z.string().trim().min(1).max(600), voice: z.boolean().optional() }),
]);

/** Parte Conversation da prova de nível: conversa com um examinador de IA, avaliada no fim. */
export async function POST(req: Request) {
  const { supabase, user } = await currentUser();
  if (!user) return NextResponse.json({ error: "Faça login novamente." }, { status: 401 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Mensagem inválida (máx. 600 caracteres)." }, { status: 400 });
  const body = parsed.data;

  if (body.action === "start") {
    const exam = getLevelExam(body.level);
    if (!exam) return NextResponse.json({ error: "Nível inválido." }, { status: 400 });
    const view = await loadLevelExam(supabase, user.id, exam.level);
    const st = view.state.parts.conversation;
    if (st.passed) return NextResponse.json({ error: "Você já foi aprovado nesta parte." }, { status: 409 });
    if (st.lock === "prereq") return NextResponse.json({ error: "Aprove antes a parte escrita e o Speaking." }, { status: 403 });
    if (st.lock === "plan") return NextResponse.json({ error: "Cumpra o plano de recuperação antes de tentar de novo." }, { status: 403 });
    const turns: ExamTurn[] = [{ role: "examiner", text: exam.conversation.opener }];
    const { data, error } = await supabase.from("exam_sessions").insert({ user_id: user.id, level_code: exam.level, turns }).select("id").single();
    if (error || !data) return NextResponse.json({ error: "Não foi possível começar a conversa." }, { status: 500 });
    return NextResponse.json({ sessionId: data.id, turns, total: exam.turns });
  }

  const { data: session } = await supabase.from("exam_sessions").select("id, level_code, turns, finished").eq("id", body.sessionId).eq("user_id", user.id).maybeSingle();
  if (!session || session.finished) return NextResponse.json({ error: "Esta conversa já terminou. Comece de novo." }, { status: 409 });
  const exam = getLevelExam(session.level_code)!;
  const turns = [...(session.turns as ExamTurn[]), { role: "student" as const, text: body.text, voice: !!body.voice }];
  const said = turns.filter((t) => t.role === "student").length;

  if (said < exam.turns) {
    let reply: string;
    try {
      reply = await examinerReply(exam, turns, exam.turns - said);
    } catch (e) {
      return NextResponse.json({ error: e instanceof AiError ? e.message : "O examinador não respondeu. Envie de novo." }, { status: 502 });
    }
    if (!reply) return NextResponse.json({ error: "O examinador não respondeu. Envie de novo." }, { status: 502 });
    turns.push({ role: "examiner", text: reply });
    await supabase.from("exam_sessions").update({ turns }).eq("id", session.id);
    return NextResponse.json({ reply, said, total: exam.turns, done: false });
  }

  // Última fala: avalia a conversa inteira.
  let ev;
  try {
    ev = await evaluateConversation(exam, turns);
  } catch (e) {
    return NextResponse.json({ error: e instanceof AiError ? e.message : "O examinador não conseguiu avaliar. Envie de novo." }, { status: 502 });
  }
  if (!ev) return NextResponse.json({ error: "O examinador não conseguiu avaliar. Envie de novo." }, { status: 502 });
  await supabase.from("exam_sessions").update({ turns, finished: true }).eq("id", session.id);

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single<Profile>();
  if (!profile) return NextResponse.json({ error: "Perfil não encontrado." }, { status: 404 });
  const score = rubricScore(ev.rubric);
  const voiceShare = turns.filter((t) => t.role === "student" && t.voice).length / said;
  let r;
  try {
    r = await recordExamAttempt(supabase, user.id, profile.current_level, {
      level: exam.level,
      part: "conversation",
      score,
      details: { sessionId: session.id, rubric: ev.rubric, feedback: ev.feedback, voiceShare },
    });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
  await recordActivity(supabase, profile, {
    kind: "test",
    ref: `exam:${exam.level}:conversation`,
    title: `Prova ${exam.level} · Conversation`,
    xp: r.passed ? 50 : 10,
    durationSeconds: 0,
    score,
  }).catch(() => null);
  return NextResponse.json({ done: true, score, rubric: ev.rubric, feedback: ev.feedback, ...r });
}
