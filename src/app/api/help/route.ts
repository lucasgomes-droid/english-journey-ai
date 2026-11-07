import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUser } from "@/lib/supabase/server";
import { AiError } from "@/lib/ai";
import { canUse, LIMIT_MESSAGE, recordUsage } from "@/lib/ai-budget";
import { explainForLearner, translateForLearner } from "@/lib/help-ai";

export const maxDuration = 30;

const schema = z.object({
  mode: z.enum(["translate", "explain"]),
  text: z.string().trim().min(1).max(800),
  context: z.string().max(600).optional(),
});

/** Ajuda sob demanda: "Traduzir" e "Não entendi". */
export async function POST(req: Request) {
  const { supabase, user } = await currentUser();
  if (!user) return NextResponse.json({ error: "Faça login novamente." }, { status: 401 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  const [{ data: profile }, allowed] = await Promise.all([supabase.from("profiles").select("current_level").eq("id", user.id).single(), canUse(supabase, user.id, "heavy")]);
  if (!allowed) return NextResponse.json({ error: LIMIT_MESSAGE.heavy, limit: true }, { status: 429 });
  void recordUsage(supabase, "heavy");
  const level = (profile?.current_level as string) ?? "A1";
  try {
    const { mode, text, context } = parsed.data;
    const result = mode === "translate" ? await translateForLearner(text, level) : await explainForLearner(text, context ?? "", level);
    if (!result) return NextResponse.json({ error: "Não consegui explicar agora. Tente de novo." }, { status: 502 });
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json({ error: e instanceof AiError ? e.message : "Não consegui explicar agora." }, { status: 502 });
  }
}
