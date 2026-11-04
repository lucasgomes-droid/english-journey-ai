"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getListening } from "@/content/listening";
import { getSession } from "@/lib/data";
import { matchText } from "@/lib/grading";
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
