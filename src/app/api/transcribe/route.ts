import { NextResponse } from "next/server";
import { currentUser } from "@/lib/supabase/server";
import { AiError, transcribe } from "@/lib/ai";
import { canUse, LIMIT_MESSAGE, recordUsage } from "@/lib/ai-budget";

export const maxDuration = 60;
const MAX_BYTES = 4 * 1024 * 1024; // limite de corpo das funções da Vercel é ~4,5 MB

export async function POST(req: Request) {
  const { supabase, user } = await currentUser();
  if (!user) return NextResponse.json({ error: "Faça login novamente." }, { status: 401 });

  const form = await req.formData().catch(() => null);
  const audio = form?.get("audio");
  if (!(audio instanceof Blob) || audio.size === 0) return NextResponse.json({ error: "Nenhum áudio recebido." }, { status: 400 });
  if (audio.size > MAX_BYTES) return NextResponse.json({ error: "Áudio muito longo. Grave até 60 segundos." }, { status: 413 });

  const type = audio.type || "audio/webm";
  const ext = type.includes("mp4") || type.includes("m4a") ? "m4a" : type.includes("ogg") ? "ogg" : type.includes("wav") ? "wav" : "webm";
  if (!(await canUse(supabase, user.id, "stt"))) return NextResponse.json({ error: LIMIT_MESSAGE.stt, limit: true }, { status: 429 });
  try {
    const text = await transcribe(audio, `speech.${ext}`);
    // WAV de 16 kHz mono ≈ 32 KB por segundo (estimativa para o controle de uso).
    void recordUsage(supabase, "stt", { audioSeconds: audio.size / 32000 });
    return NextResponse.json({ text });
  } catch (e) {
    const err = e instanceof AiError ? e : new AiError("Falha na transcrição.");
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
}
