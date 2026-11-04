import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUser } from "@/lib/supabase/server";
import { SpeechError, synthesize, ttsProvider, type VoiceId } from "@/lib/speech-server";

export const maxDuration = 30;

const schema = z.object({
  text: z.string().trim().min(1).max(220),
  voice: z.enum(["f1", "f2", "f3", "m1", "m2", "m3"]).default("f1"),
});

// Cache simples por instância (frases de aula se repetem muito).
const cache = new Map<string, { body: ArrayBuffer; type: string }>();
const MAX_CACHE = 300;

export async function POST(req: Request) {
  const { user } = await currentUser();
  if (!user) return NextResponse.json({ error: "Faça login novamente." }, { status: 401 });
  if (ttsProvider() === "none") return NextResponse.json({ error: "Voz natural não configurada." }, { status: 503 });

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Texto inválido." }, { status: 400 });
  const { text, voice } = parsed.data;
  const key = `${ttsProvider()}|${voice}|${text}`;

  let audio = cache.get(key);
  if (!audio) {
    try {
      audio = await synthesize(text, voice as VoiceId);
    } catch (e) {
      const err = e instanceof SpeechError ? e : new SpeechError("Falha ao gerar voz.");
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    if (cache.size >= MAX_CACHE) cache.delete(cache.keys().next().value!);
    cache.set(key, audio);
  }
  return new NextResponse(audio.body, { headers: { "Content-Type": audio.type, "Cache-Control": "private, max-age=86400" } });
}
