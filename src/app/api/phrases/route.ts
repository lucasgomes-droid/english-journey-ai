import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUser } from "@/lib/supabase/server";
import { AiError, chatCompletion } from "@/lib/ai";
import { parseJsonObject, savePhrases } from "@/lib/speaking";
import { LIFE_TOPICS } from "@/content/speaking-topics";
import type { Profile } from "@/lib/data";

export const maxDuration = 60;

const schema = z.object({
  topic: z.enum(LIFE_TOPICS.map((t) => t.id) as [string, ...string[]]),
  about: z.string().trim().min(10, "Conte um pouco mais (pelo menos uma frase).").max(1500),
});

/** "Fale sobre sua vida": transforma o que o aluno contou em frases em inglês, no nível dele. */
export async function POST(req: Request) {
  const { supabase, user } = await currentUser();
  if (!user) return NextResponse.json({ error: "Faça login novamente." }, { status: 401 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Dados inválidos." }, { status: 400 });
  const { topic, about } = parsed.data;
  const t = LIFE_TOPICS.find((x) => x.id === topic)!;
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single<Profile>();
  if (!profile) return NextResponse.json({ error: "Perfil não encontrado." }, { status: 404 });

  let raw: string;
  try {
    raw = await chatCompletion(
      [
        {
          role: "system",
          content: `You help a Brazilian learner at CEFR ${profile.current_level} talk about their own life in English.
The student describes their life (in Portuguese or English). Write 6 to 8 first-person sentences in natural spoken English that the student can actually say about themselves, using ONLY facts they gave (never invent names, jobs, places or numbers).
Keep grammar and vocabulary at ${profile.current_level} (A1: very short present-tense sentences; B1+: connectors and some past/future; C1+: idiomatic).
Reply ONLY with JSON: {"phrases":[{"en":"…","pt":"tradução natural em português"}]}`,
        },
        { role: "user", content: `Topic: ${t.title}\nWhat the student said: """${about}"""` },
      ],
      { json: true, temperature: 0.5, maxTokens: 1800 },
    );
  } catch (e) {
    const err = e instanceof AiError ? e : new AiError("Falha ao gerar as frases.", 502);
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
  const obj = parseJsonObject(raw);
  const phrases = (Array.isArray(obj?.phrases) ? obj!.phrases : [])
    .map((p) => p as { en?: unknown; pt?: unknown })
    .map((p) => ({ en: typeof p.en === "string" ? p.en.trim() : "", pt: typeof p.pt === "string" ? p.pt.trim() : "" }))
    .filter((p) => p.en && p.pt)
    .slice(0, 8);
  if (!phrases.length) return NextResponse.json({ error: "Não consegui montar as frases. Tente de novo." }, { status: 502 });
  const saved = await savePhrases(supabase, user.id, t.title, "life", phrases);
  return NextResponse.json({ phrases: saved });
}
