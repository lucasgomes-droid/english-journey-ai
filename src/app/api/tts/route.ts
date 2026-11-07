import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUser } from "@/lib/supabase/server";
import { SpeechError, synthesize, ttsCachePath, ttsProvider, type VoiceId } from "@/lib/speech-server";
import { canUse, LIMIT_MESSAGE, recordUsage } from "@/lib/ai-budget";

export const maxDuration = 30;

const schema = z.object({
  text: z.string().trim().min(1).max(220),
  voice: z.enum(["f1", "f2", "f3", "m1", "m2", "m3"]).default("f1"),
});

// Cache por instância (o mais rápido) + cache compartilhado no Supabase Storage (sobrevive a reinícios
// e vale para todos os alunos): cada frase das aulas é gerada UMA vez e não gasta mais a cota de voz.
const memory = new Map<string, { body: ArrayBuffer; type: string }>();
const MAX_MEMORY = 300;
const BUCKET = "tts-cache";

export async function POST(req: Request) {
  const { supabase, user } = await currentUser();
  if (!user) return NextResponse.json({ error: "Faça login novamente." }, { status: 401 });
  const provider = ttsProvider();
  if (provider === "none") return NextResponse.json({ error: "Voz natural não configurada." }, { status: 503 });

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Texto inválido." }, { status: 400 });
  const { text, voice } = parsed.data;
  const path = ttsCachePath(provider, voice, text);

  let audio = memory.get(path);
  if (!audio) {
    const stored = await supabase.storage.from(BUCKET).download(path).catch(() => ({ data: null }));
    if (stored.data) audio = { body: await stored.data.arrayBuffer(), type: provider === "azure" ? "audio/mpeg" : "audio/wav" };
  }
  if (!audio) {
    // Só a geração nova conta no limite diário (frases em cache são de graça).
    if (!(await canUse(supabase, user.id, "tts"))) return NextResponse.json({ error: LIMIT_MESSAGE.tts, limit: true }, { status: 429 });
    try {
      audio = await synthesize(text, voice as VoiceId);
    } catch (e) {
      const err = e instanceof SpeechError ? e : new SpeechError("Falha ao gerar voz.");
      return NextResponse.json({ error: err.message }, { status: err.status });
    }
    void recordUsage(supabase, "tts");
    void supabase.storage
      .from(BUCKET)
      .upload(path, new Blob([audio.body], { type: audio.type }), { contentType: audio.type, upsert: false })
      .catch(() => null);
  }
  if (memory.size >= MAX_MEMORY) memory.delete(memory.keys().next().value!);
  memory.set(path, audio);
  return new NextResponse(audio.body, { headers: { "Content-Type": audio.type, "Cache-Control": "private, max-age=86400" } });
}
