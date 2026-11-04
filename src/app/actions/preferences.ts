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
