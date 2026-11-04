"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/supabase/server";

/** Tabelas com o progresso do aluno (conversas apagam as mensagens em cascata). */
const PROGRESS_TABLES = [
  "practice_plans",
  "recovery_plans",
  "exam_sessions",
  "exam_attempts",
  "exercise_answers",
  "assessments",
  "lesson_progress",
  "review_items",
  "activity_log",
  "achievements",
  "pronunciation_attempts",
  "listening_results",
  "speaking_sessions",
  "personal_phrases",
  "conversations",
] as const;

const RESET_WORD = "RESETAR";



/**
 * Recomeçar do zero: apaga todo o progresso do próprio aluno (aulas, provas, revisões, conversas,
 * gravações, XP e conquistas) e leva de volta às boas-vindas para escolher o ponto de partida.
 * Mantém a conta, o nome, as metas e as preferências.
 */
export async function resetProgress(confirmation: string): Promise<{ error: string } | void> {
  if (confirmation.trim().toUpperCase() !== RESET_WORD) return { error: `Digite ${RESET_WORD} para confirmar.` };
  const { supabase, user } = await requireUser();

  // Gravações da fala semanal no armazenamento.
  const { data: files } = await supabase.storage.from("recordings").list(user.id, { limit: 1000 });
  if (files?.length) await supabase.storage.from("recordings").remove(files.map((f) => `${user.id}/${f.name}`));

  for (const table of PROGRESS_TABLES) {
    const { error } = await supabase.from(table).delete().eq("user_id", user.id);
    if (error) return { error: `Não foi possível apagar (${table}): ${error.message}. Nada mais foi alterado depois disso; tente de novo.` };
  }
  const { error } = await supabase
    .from("profiles")
    .update({ current_level: "A1", xp_total: 0, streak_current: 0, streak_best: 0, last_study_date: null, onboarded: false })
    .eq("id", user.id);
  if (error) return { error: `Não foi possível reiniciar o perfil: ${error.message}` };

  revalidatePath("/", "layout");
  redirect("/boas-vindas");
}
