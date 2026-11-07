"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/supabase/server";

/** Liga/desliga a tradução em português (salvo no perfil, vale em todos os aparelhos). */
export async function setShowTranslation(on: boolean) {
  const { supabase, user } = await requireUser();
  const { error } = await supabase.from("profiles").update({ show_translation: on }).eq("id", user.id);
  if (error) return { ok: false as const, error: error.message };
  revalidatePath("/", "layout");
  return { ok: true as const };
}

/** Quanto o professor corrige: leve, normal ou intensa (vale na conversa e nas situações). */
export async function setCorrectionIntensity(value: "leve" | "normal" | "intensa") {
  if (!["leve", "normal", "intensa"].includes(value)) return { ok: false as const, error: "Valor inválido." };
  const { supabase, user } = await requireUser();
  const { error } = await supabase.from("profiles").update({ correction_intensity: value }).eq("id", user.id);
  if (error) return { ok: false as const, error: error.message };
  return { ok: true as const };
}

/** Apaga algo que o professor lembra sobre você. */
export async function forgetFact(id: number) {
  const { supabase, user } = await requireUser();
  const { error } = await supabase.from("learner_facts").delete().eq("id", id).eq("user_id", user.id);
  if (error) return { ok: false as const, error: error.message };
  revalidatePath("/perfil");
  return { ok: true as const };
}
