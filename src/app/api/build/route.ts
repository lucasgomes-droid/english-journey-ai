import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUser } from "@/lib/supabase/server";
import { AiError, chatCompletion } from "@/lib/ai";
import { canUse, LIMIT_MESSAGE, recordUsage } from "@/lib/ai-budget";
import { getBuild } from "@/content/build-situations";
import { parseJsonObject } from "@/lib/speaking-parse";
import { LEVEL_GUIDE } from "@/lib/tutor-prompt";
import { isTrivialCorrection, NO_FALSE_CORRECTIONS } from "@/lib/correction-filter";

export const maxDuration = 30;

const schema = z.object({ id: z.string().max(20), text: z.string().trim().min(2).max(600), mode: z.enum(["write", "speak"]) });

/** Speaking B — construção de frases: corrige a resposta à situação e devolve a versão para repetir. */
export async function POST(req: Request) {
  const { supabase, user } = await currentUser();
  if (!user) return NextResponse.json({ error: "Faça login novamente." }, { status: 401 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  const s = parsed.success ? getBuild(parsed.data.id) : undefined;
  if (!parsed.success || !s) return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  if (!(await canUse(supabase, user.id, "chat"))) return NextResponse.json({ error: LIMIT_MESSAGE.chat, limit: true }, { status: 429 });
  try {
    const raw = await chatCompletion(
      [
        {
          role: "system",
          content: `You are a precise, kind English teacher for a Brazilian learner (CEFR ${s.level}). ${LEVEL_GUIDE[s.level]}
Situation (Portuguese): ${s.situation_pt}
Target structure: ${s.target}
The student ${parsed.data.mode === "speak" ? "SPOKE (speech recognition; ignore small recognition slips and punctuation)" : "WROTE"} an answer. Evaluate it for this situation and level.
Reply ONLY with JSON:
{"ok": true if the answer is correct, natural and fits the situation,
 "used_target": true if it uses the target structure,
 "corrected": "the student's answer corrected and natural (same meaning, same level); if already correct, repeat it",
 "explanation_pt": "1–2 frases simples em português: o erro principal e por quê (ou o que ficou bom)",
 "better": "optional: a more natural alternative for this level, or empty"}
${NO_FALSE_CORRECTIONS}`,
        },
        { role: "user", content: parsed.data.text },
      ],
      { json: true, purpose: "turn", temperature: 0.3, maxTokens: 700 },
    );
    void recordUsage(supabase, "chat");
    const o = parseJsonObject(raw);
    const str = (x: unknown) => (typeof x === "string" ? x.trim() : "");
    if (!o || !str(o.corrected)) return NextResponse.json({ error: "Não consegui corrigir agora. Tente de novo." }, { status: 502 });
    const same = isTrivialCorrection(parsed.data.text, str(o.corrected));
    return NextResponse.json({ ok: o.ok === true || same, used_target: o.used_target === true, corrected: str(o.corrected).slice(0, 300), explanation_pt: str(o.explanation_pt).slice(0, 400), better: str(o.better).slice(0, 300) });
  } catch (e) {
    const err = e instanceof AiError ? e : new AiError("Falha ao falar com a IA.");
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
}
