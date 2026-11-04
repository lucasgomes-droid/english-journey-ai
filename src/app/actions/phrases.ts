"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/data";

/** Apaga uma frase pessoal e o cartão de revisão dela. */
export async function deletePhrase(id: number) {
  if (!Number.isInteger(id)) return { ok: false as const };
  const { supabase, user } = await getSession();
  await Promise.all([
    supabase.from("personal_phrases").delete().eq("id", id).eq("user_id", user.id),
    supabase.from("review_items").delete().eq("user_id", user.id).eq("item_type", "phrase").eq("item_id", `ph-${id}`),
  ]);
  revalidatePath("/falar/vida");
  return { ok: true as const };
}
