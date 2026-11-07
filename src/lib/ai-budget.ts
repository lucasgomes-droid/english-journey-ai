import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Controle de uso de IA por aluno e por dia.
 * As cotas gratuitas do Groq são do app inteiro: um aluno não pode gastar a cota de todos.
 * Se a tabela ainda não existir (migration não aplicada), nada é bloqueado (falha aberta).
 */
export type UsageKind = "chat" | "heavy" | "stt" | "tts";

const num = (v: string | undefined, d: number) => (v && Number.isFinite(Number(v)) ? Number(v) : d);

/** Pedidos por aluno por dia. Ajustáveis por variável de ambiente sem mudar código. */
export const DAILY_LIMITS: Record<UsageKind, number> = {
  chat: num(process.env.AI_LIMIT_CHAT, 150), // falas na conversa
  heavy: num(process.env.AI_LIMIT_HEAVY, 40), // relatórios, explicações, provas
  stt: num(process.env.AI_LIMIT_STT, 400), // transcrições (cota folgada)
  tts: num(process.env.AI_LIMIT_TTS, 40), // voz natural gerada (frases já em cache não contam)
};

export const LIMIT_MESSAGE: Record<UsageKind, string> = {
  chat: "Você usou todas as conversas com o professor de hoje. Amanhã libera de novo — enquanto isso, que tal revisar ou fazer uma aula?",
  heavy: "O limite de relatórios e explicações de hoje acabou. Amanhã libera de novo.",
  stt: "O limite de reconhecimento de voz de hoje acabou. Você ainda pode escrever.",
  tts: "A voz natural de hoje acabou; seguimos com a voz do aparelho.",
};

/** Quanto o aluno já usou hoje e se ainda pode usar. */
export function underLimit(used: number, kind: UsageKind) {
  return used < DAILY_LIMITS[kind];
}

export async function usageToday(supabase: SupabaseClient, uid: string, kind: UsageKind): Promise<number> {
  try {
    const { data, error } = await supabase.from("ai_usage").select("requests").eq("user_id", uid).eq("kind", kind).eq("day", today()).maybeSingle();
    if (error) return 0;
    return data?.requests ?? 0;
  } catch {
    return 0;
  }
}

export async function canUse(supabase: SupabaseClient, uid: string, kind: UsageKind) {
  return underLimit(await usageToday(supabase, uid, kind), kind);
}

/** Registra o uso (não interrompe a resposta se falhar). */
export async function recordUsage(supabase: SupabaseClient, kind: UsageKind, usage: { requests?: number; tokens?: number; audioSeconds?: number } = {}) {
  try {
    await supabase.rpc("bump_ai_usage", { p_kind: kind, p_requests: usage.requests ?? 1, p_tokens: Math.round(usage.tokens ?? 0), p_audio_seconds: Math.round(usage.audioSeconds ?? 0) });
  } catch {
    /* uso não registrado não pode derrubar a aula */
  }
}

/** Data de hoje no mesmo critério do banco (UTC, `current_date`). */
function today() {
  return new Date().toISOString().slice(0, 10);
}
