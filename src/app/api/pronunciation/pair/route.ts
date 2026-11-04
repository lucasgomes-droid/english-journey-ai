import { NextResponse } from "next/server";
import { currentUser } from "@/lib/supabase/server";
import { AiError, transcribe } from "@/lib/ai";
import { getPairSet, judgePair } from "@/content/minimal-pairs";
import { recordActivity } from "@/lib/progress";
import type { Profile } from "@/lib/data";

export const maxDuration = 30;

/**
 * Par mínimo falado: o aluno diz "I said <palavra>" e o reconhecedor de voz decide
 * se ouviu a palavra certa ou a do par. Não é nota fonética: mostra se a troca de som
 * foi grande o bastante para mudar a palavra entendida.
 */
export async function POST(req: Request) {
  const { supabase, user } = await currentUser();
  if (!user) return NextResponse.json({ error: "Faça login novamente." }, { status: 401 });

  const form = await req.formData().catch(() => null);
  const audio = form?.get("audio");
  const setId = String(form?.get("set") ?? "");
  const index = Number(form?.get("index"));
  const side = String(form?.get("side") ?? "a");
  const set = getPairSet(setId);
  const pair = set?.pairs[index];
  if (!(audio instanceof Blob) || !audio.size || !set || !pair) return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
  if (audio.size > 600_000) return NextResponse.json({ error: "Gravação longa demais. Diga só a frase curta." }, { status: 413 });

  const target = side === "b" ? pair.b : pair.a;
  const other = side === "b" ? pair.a : pair.b;
  // O prompt cita as duas palavras (em ordem aleatória) para o reconhecedor escolher entre elas pelo som.
  const both = Math.random() < 0.5 ? [target, other] : [other, target];
  let heard: string;
  try {
    heard = await transcribe(audio, "speech.wav", `I said ${both[0]}. I said ${both[1]}.`);
  } catch (e) {
    const err = e instanceof AiError ? e : new AiError("Falha ao reconhecer a fala.", 502);
    return NextResponse.json({ error: err.message }, { status: err.status });
  }
  const outcome = judgePair(heard, target, other);

  if (outcome !== "unclear") {
    const [, profileRes] = await Promise.all([
      supabase.from("pronunciation_attempts").insert({
        user_id: user.id,
        reference_text: target,
        provider: "minimal-pair",
        completeness: outcome === "target" ? 100 : 0,
        details: { context: `pair:${set.id}`, target, other, heard, outcome, sound: side === "b" ? set.sounds[1] : set.sounds[0] },
      }),
      supabase.from("profiles").select("*").eq("id", user.id).single<Profile>(),
    ]);
    if (profileRes.data) {
      await recordActivity(supabase, profileRes.data, { kind: "pronunciation", ref: `pair:${set.id}`, title: `Par mínimo: ${pair.a} × ${pair.b}`, xp: 1, durationSeconds: 8, score: outcome === "target" ? 100 : 0 });
    }
  }
  return NextResponse.json({ heard, outcome, target, other });
}
