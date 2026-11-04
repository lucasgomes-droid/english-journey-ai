import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { AiError, transcribe } from "@/lib/ai";

export const maxDuration = 60;
const MAX_BYTES = 4 * 1024 * 1024; // limite de corpo das funções da Vercel é ~4,5 MB

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Faça login novamente." }, { status: 401 });

  const form = await req.formData().catch(() => null);
  const audio = form?.get("audio");
  if (!(audio instanceof Blob) || audio.size === 0) return NextResponse.json({ error: "Nenhum áudio recebido." }, { status: 400 });
  if (audio.size > MAX_BYTES) return NextResponse.json({ error: "Áudio muito longo. Grave até 60 segundos." }, { status: 413 });

  const type = audio.type || "audio/webm";
  const ext = type.includes("mp4") || type.includes("m4a") ? "m4a" : type.includes("ogg") ? "ogg" : type.includes("wav") ? "wav" : "webm";
  try {
    const text = await transcribe(audio, `speech.${ext}`);
    return NextResponse.json({ text });
  } catch (e) {
    const err = e instanceof AiError ? e : new AiError("Falha na transcrição.");
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
}
