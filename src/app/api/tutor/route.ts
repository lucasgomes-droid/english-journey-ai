import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUser } from "@/lib/supabase/server";
import { AiError, chatCompletion, type ChatMessage } from "@/lib/ai";
import { customSetting, parseTutorReply, scenarioSystemPrompt, tutorSystemPrompt, type TutorMode } from "@/lib/tutor-prompt";
import { buildTutorMemory } from "@/lib/tutor-memory";
import { getRecentMistakes, type Profile } from "@/lib/data";
import { getLesson } from "@/content/curriculum";
import { getScenario } from "@/content/scenarios";
import type { CefrLevel } from "@/content/types";
import { recordActivity, syncAchievements } from "@/lib/progress";
import { classifyCorrection } from "@/content/error-patterns";

export const maxDuration = 60;

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;

const bodySchema = z.object({
  conversationId: z.string().uuid().nullable().optional(),
  message: z.string().trim().min(1).max(1000),
  lessonId: z.string().max(60).nullable().optional(),
  scenarioId: z.string().max(60).nullable().optional(),
  customPrompt: z.string().trim().max(400).nullable().optional(),
  level: z.enum(LEVELS).nullable().optional(),
  viaVoice: z.boolean().optional(),
  /** Professor particular (aba Conversa). */
  tutorMode: z.enum(["livre", "professor", "imersao"]).nullable().optional(),
  /** Tempo que o aluno levou para responder (ms). */
  responseMs: z.number().int().min(0).max(600_000).optional(),
});

const HISTORY_LIMIT = 24; // mensagens anteriores enviadas ao modelo (mantém o contexto)

export async function POST(req: Request) {
  const { supabase, user } = await currentUser();
  if (!user) return NextResponse.json({ error: "Faça login novamente." }, { status: 401 });

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Mensagem inválida (máx. 1000 caracteres)." }, { status: 400 });
  const { message, viaVoice } = parsed.data;
  let conversationId = parsed.data.conversationId ?? null;

  // Consultas independentes em paralelo (cada ida ao banco custa tempo).
  const [recentRes, profileRes, convRes, msgsRes, recentMistakes] = await Promise.all([
    supabase
      .from("messages")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("role", "user")
      .gte("created_at", new Date(Date.now() - 60_000).toISOString()),
    supabase.from("profiles").select("*").eq("id", user.id).single<Profile>(),
    conversationId
      ? supabase.from("conversations").select("id, mode, lesson_id, scenario_id, custom_prompt, level_code, tutor_mode, memory").eq("id", conversationId).eq("user_id", user.id).maybeSingle()
      : Promise.resolve({ data: null }),
    conversationId
      ? supabase.from("messages").select("role, content").eq("conversation_id", conversationId).order("id", { ascending: false }).limit(HISTORY_LIMIT)
      : Promise.resolve({ data: [] as { role: string; content: string }[] }),
    getRecentMistakes(supabase, user.id, 6),
  ]);

  // Limite simples de uso: 20 mensagens por minuto por aluno.
  if ((recentRes.count ?? 0) >= 20) return NextResponse.json({ error: "Muitas mensagens em sequência. Aguarde um minuto." }, { status: 429 });
  const profile = profileRes.data;
  if (!profile) return NextResponse.json({ error: "Perfil não encontrado." }, { status: 500 });

  // Configuração da conversa: professor livre, prática de aula ou personagem.
  let mode: "tutor" | "scenario" = parsed.data.scenarioId || parsed.data.customPrompt ? "scenario" : "tutor";
  let lessonId = parsed.data.lessonId ?? null;
  let scenarioId = parsed.data.scenarioId ?? null;
  let customPrompt = parsed.data.customPrompt ?? null;
  let level: CefrLevel = parsed.data.level ?? profile.current_level;
  let history: { role: "user" | "assistant"; content: string }[] = [];
  let tutorMode: TutorMode | null = mode === "tutor" && !parsed.data.lessonId ? (parsed.data.tutorMode ?? null) : null;
  let memory: string | null = null;

  if (conversationId) {
    const conv = convRes.data;
    if (!conv) return NextResponse.json({ error: "Conversa não encontrada." }, { status: 404 });
    mode = conv.mode;
    lessonId = conv.lesson_id;
    scenarioId = conv.scenario_id;
    customPrompt = conv.custom_prompt;
    level = conv.level_code as CefrLevel;
    tutorMode = (conv.tutor_mode as TutorMode | null) ?? null;
    memory = conv.memory as string | null;
    history = ((msgsRes.data ?? []) as typeof history).reverse();
  }

  const lesson = lessonId ? getLesson(lessonId) : undefined;
  const scenario = scenarioId ? getScenario(scenarioId) : undefined;
  if (mode === "scenario" && !scenario && !customPrompt) return NextResponse.json({ error: "Situação não encontrada." }, { status: 404 });

  if (!conversationId) {
    const title = scenario ? scenario.title : customPrompt ? `Minha cena: ${customPrompt.slice(0, 40)}` : lesson ? `Prática: ${lesson.title}` : message.length > 48 ? `${message.slice(0, 45)}…` : message;
    if (tutorMode) memory = await buildTutorMemory(supabase, user.id).catch(() => null);
    const { data: conv, error } = await supabase
      .from("conversations")
      .insert({ user_id: user.id, mode, lesson_id: lesson?.id ?? null, scenario_id: scenario?.id ?? null, custom_prompt: customPrompt, level_code: level, title, tutor_mode: tutorMode, memory })
      .select("id")
      .single();
    if (error || !conv) return NextResponse.json({ error: `Não foi possível criar a conversa: ${error?.message}` }, { status: 500 });
    conversationId = conv.id as string;
    const starter = scenario?.opener ?? lesson?.conversation?.starter;
    if (starter) {
      await supabase.from("messages").insert({ conversation_id: conversationId, user_id: user.id, role: "assistant", content: starter });
      history = [{ role: "assistant", content: starter }];
    }
  }

  // Salva a mensagem do aluno antes de chamar a IA (não se perde em caso de erro).
  const { data: userMsg, error: umErr } = await supabase
    .from("messages")
    .insert({ conversation_id: conversationId, user_id: user.id, role: "user", content: message, via_voice: Boolean(viaVoice), response_ms: parsed.data.responseMs ?? null })
    .select("id")
    .single();
  if (umErr || !userMsg) return NextResponse.json({ error: `Não foi possível salvar a mensagem: ${umErr?.message}` }, { status: 500 });

  const studentName = profile.display_name.split(" ")[0] || "student";
  let system: string;
  if (mode === "scenario") {
    const sc = scenario ? { setting: scenario.setting, goals: scenario.goals } : customSetting(customPrompt ?? "");
    system = scenarioSystemPrompt({ studentName, level, characterName: scenario?.character.name ?? "the person in the scene", setting: sc.setting, goals: sc.goals, recentMistakes, challenges: scenario && !["A1", "A2"].includes(level) ? scenario.challenges : undefined });
  } else {
    system = tutorSystemPrompt({
      studentName,
      level,
      learningGoal: profile.learning_goal,
      recentMistakes,
      lesson: lesson?.conversation
        ? { title: lesson.title, objective: lesson.objective, vocabulary: lesson.vocabulary.map((v) => v.en), goal: lesson.conversation.goal }
        : null,
      tutorMode,
      memory,
    });
  }
  // Preferência "só inglês": explicações em inglês simples (sem entregar o português).
  if (profile.show_translation === false && tutorMode !== "imersao")
    system += `\nLANGUAGE PREFERENCE: the student chose to practise in English only. Write "explanation_pt" and "tip_pt" in very simple English (A2-level words) instead of Portuguese, unless the student writes in Portuguese.`;
  const messages: ChatMessage[] = [{ role: "system", content: system }, ...history, { role: "user", content: message }];

  let reply;
  try {
    reply = parseTutorReply(await chatCompletion(messages, { json: true }));
  } catch (e) {
    const err = e instanceof AiError ? e : new AiError("Falha ao falar com a IA. Tente de novo.");
    return NextResponse.json({ error: err.message, conversationId, userMessageId: userMsg.id }, { status: err.status });
  }

  // Gravações independentes em paralelo.
  const [, aMsgRes, , updated] = await Promise.all([
    reply.correction
      ? Promise.all([
          // Guarda a categoria do erro (base de "Minhas Dificuldades").
          supabase.from("messages").update({ correction: { ...reply.correction, category: classifyCorrection(reply.correction.original, reply.correction.corrected) } }).eq("id", userMsg.id),
          // O erro vira cartão de revisão: você pratica a forma certa até ela sair sozinha.
          supabase.from("review_items").upsert(
            { user_id: user.id, item_type: "grammar", item_id: `msg-${userMsg.id}`, due_at: new Date(Date.now() + 6 * 3600_000).toISOString() },
            { onConflict: "user_id,item_type,item_id", ignoreDuplicates: true },
          ),
        ])
      : Promise.resolve(null),
    supabase.from("messages").insert({ conversation_id: conversationId, user_id: user.id, role: "assistant", content: reply.intro_pt ? `${reply.intro_pt}\n${reply.reply}` : reply.reply, tip: reply.tip_pt, practice: reply.practice ?? null }).select("id").single(),
    supabase.from("conversations").update({ updated_at: new Date().toISOString() }).eq("id", conversationId),
    // XP pela prática de conversação (2 XP por mensagem; cena concluída vale +15).
    recordActivity(supabase, profile, {
      kind: mode === "scenario" ? "scenario" : "chat",
      ref: conversationId,
      title: mode === "scenario" ? (scenario?.title ?? "Minha cena") : tutorMode ? `Professor particular (${tutorMode === "imersao" ? "imersão" : tutorMode})` : "Conversa com o professor",
      xp: 2 + (reply.scene_complete ? 15 : 0),
      durationSeconds: 45,
    }),
  ]);
  // Conquistas: só recalcula quando pode haver novidade (primeira conversa ou mudança de dia).
  if (history.length <= 1 || profile.last_study_date !== updated.last_study_date) await syncAchievements(supabase, updated);

  return NextResponse.json({
    conversationId,
    userMessageId: userMsg.id,
    assistantMessageId: aMsgRes.data?.id ?? null,
    reply: reply.reply,
    correction: reply.correction,
    tip: reply.tip_pt,
    sceneComplete: Boolean(reply.scene_complete),
    practice: reply.practice ?? null,
    introPt: reply.intro_pt ?? null,
  });
}
