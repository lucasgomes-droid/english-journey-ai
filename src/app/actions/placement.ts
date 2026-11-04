"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getSession } from "@/lib/data";
import { PLACEMENT, scorePlacement } from "@/content/placement";
import { LEVEL_ORDER, MAX_AUTHORED_LEVEL } from "@/content/curriculum";
import type { CefrLevel } from "@/content/types";

const schema = z.array(z.number().int().min(-1).max(5)).length(PLACEMENT.length);

/** Corrige o nivelamento no servidor e define o nível inicial do aluno. */
export async function savePlacement(answers: number[]) {
  const parsed = schema.safeParse(answers);
  if (!parsed.success) return { ok: false as const, error: "Respostas inválidas." };
  const { supabase, user } = await getSession();
  const result = scorePlacement(parsed.data);
  // A trilha começa no nível estimado, limitado ao último nível com aulas prontas.
  const start: CefrLevel = LEVEL_ORDER.indexOf(result.estimated) > LEVEL_ORDER.indexOf(MAX_AUTHORED_LEVEL) ? MAX_AUTHORED_LEVEL : result.estimated;
  const { error } = await supabase.from("profiles").update({ current_level: start, onboarded: true, updated_at: new Date().toISOString() }).eq("id", user.id);
  if (error) return { ok: false as const, error: `Não foi possível salvar: ${error.message}` };
  revalidatePath("/", "layout");
  return { ok: true as const, ...result, start };
}
