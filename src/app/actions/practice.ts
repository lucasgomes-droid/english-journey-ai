"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getListening } from "@/content/listening";
import { getSession } from "@/lib/data";
import { matchText } from "@/lib/grading";
import { translateForLearner } from "@/lib/help-ai";
import { savePhrases } from "@/lib/speaking";
import { recordActivity, syncAchievements } from "@/lib/progress";

const schema = z.object({
  itemId: z.string().max(60),
  answers: z.array(z.number().int().min(-1).max(10)).max(10),
  dictation: z.string().max(400),
  durationSeconds: z.number().int().min(0).max(7200),
});

/** Corrige no servidor e salva um exercício de listening. */
export async function submitListening(input: z.infer<typeof schema>) {
  const data = schema.parse(input);
  const item = getListening(data.itemId);
  if (!item) return { ok: false as const, error: "Áudio não encontrado." };
  const { supabase, user, profile } = await getSession();
  if (!profile) return { ok: false as const, error: "Perfil não encontrado." };

  const results = item.questions.map((q, i) => data.answers[i] === q.answer);
  const correct = results.filter(Boolean).length;
  const dict = matchText(data.dictation, [item.dictation]);
  const total = item.questions.length + 1;
  const score = correct + (dict.correct ? 1 : 0);
  const xp = correct * 3 + (dict.correct ? 4 : 0);

  const { error } = await supabase.from("listening_results").insert({
    user_id: user.id,
    item_id: item.id,
    level_code: item.level,
    score,
    total,
    dictation_correct: dict.correct,
  });
  if (error) return { ok: false as const, error: `Não foi possível salvar: ${error.message}` };

  const updated = await recordActivity(supabase, profile, {
    kind: "listening",
    ref: item.id,
    title: `Listening: ${item.title}`,
    xp,
    durationSeconds: data.durationSeconds,
    score: Math.round((score / total) * 100),
  });
  const newAchievements = await syncAchievements(supabase, updated);
  revalidatePath("/", "layout");
  return { ok: true as const, results, dictationCorrect: dict.correct, dictationTypo: dict.typo, score, total, xp, newAchievements };
}

/**
 * Salva uma palavra ou expressão no vocabulário pessoal (com tradução pela IA) e agenda a revisão.
 * Usado no Listening (tocar numa palavra da transcrição) e na tela de Vocabulário.
 */
export async function saveWord(input: { en: string; context?: string; topic: string; source: "listening" | "vocab" }) {
  const en = input.en.trim().replace(/^[^A-Za-z']+|[^A-Za-z'?!.]+$/g, "").slice(0, 120);
  if (en.length < 2) return { ok: false as const, error: "Palavra inválida." };
  const { supabase, user } = await getSession();
  const { data: exists } = await supabase.from("personal_phrases").select("id").eq("user_id", user.id).ilike("en", en).maybeSingle();
  if (exists) return { ok: true as const, already: true, pt: null };
  const { data: profile } = await supabase.from("profiles").select("current_level").eq("id", user.id).single();
  let pt = "";
  try {
    const t = await translateForLearner(input.context ? `${en} — (in: "${input.context.slice(0, 200)}")` : en, profile?.current_level ?? "A1");
    pt = t?.words.find((w) => w.en.toLowerCase() === en.toLowerCase())?.pt ?? t?.translation_pt.split(" — ")[0] ?? "";
  } catch {
    /* sem tradução agora: salva assim mesmo */
  }
  const saved = await savePhrases(supabase, user.id, input.topic, input.source, [{ en, pt: pt.slice(0, 200) || "(sem tradução)" }]);
  if (!saved.length) return { ok: false as const, error: "Não foi possível salvar." };
  if (input.source === "vocab") revalidatePath("/vocabulario");
  return { ok: true as const, already: false, pt };
}

/** Fecha uma sessão de "Construir frases": XP e atividade de fala. */
export async function finishBuild(input: { level: string; done: number; correct: number; durationSeconds: number }) {
  const d = z.object({ level: z.string().max(4), done: z.number().int().min(1).max(20), correct: z.number().int().min(0).max(20), durationSeconds: z.number().int().min(0).max(7200) }).parse(input);
  const { supabase, profile } = await getSession();
  if (!profile) return { ok: false as const };
  await recordActivity(supabase, profile, { kind: "speaking", ref: `build-${d.level}`, title: "Construir frases", xp: d.done * 3 + d.correct * 2, durationSeconds: d.durationSeconds, score: Math.round((d.correct / d.done) * 100) });
  revalidatePath("/", "layout");
  return { ok: true as const };
}
