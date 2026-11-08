import "server-only";

/**
 * Cliente para qualquer API compatível com OpenAI (Groq, OpenAI, Google Gemini, OpenRouter...).
 * As chaves ficam SOMENTE no servidor (variáveis sem NEXT_PUBLIC_).
 */
export const aiConfig = {
  apiKey: process.env.AI_API_KEY || "",
  baseUrl: (process.env.AI_BASE_URL || "https://api.groq.com/openai/v1").replace(/\/$/, ""),
  model: process.env.AI_MODEL || "openai/gpt-oss-120b",
};

/**
 * Dois modelos com cotas separadas no Groq: o menor responde cada fala da conversa (rápido e barato);
 * o maior fica para relatórios, provas e explicações. Se um esgotar a cota (429), o outro assume.
 */
export const chatModel = () => process.env.AI_CHAT_MODEL || (aiConfig.baseUrl.includes("groq.com") ? "openai/gpt-oss-20b" : aiConfig.model);
export type AiPurpose = "turn" | "heavy";
export const modelsFor = (purpose: AiPurpose) => {
  const main = purpose === "turn" ? chatModel() : aiConfig.model;
  const other = purpose === "turn" ? aiConfig.model : chatModel();
  return main === other ? [main] : [main, other];
};

export const sttConfig = {
  apiKey: process.env.STT_API_KEY || process.env.AI_API_KEY || "",
  baseUrl: (process.env.STT_BASE_URL || process.env.AI_BASE_URL || "https://api.groq.com/openai/v1").replace(/\/$/, ""),
  model: process.env.STT_MODEL || "whisper-large-v3-turbo",
};

export const isAiConfigured = () => Boolean(aiConfig.apiKey);
export const isSttConfigured = () => Boolean(sttConfig.apiKey);

import { withUsEnglish } from "@/lib/us-english";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export class AiError extends Error {
  constructor(
    message: string,
    public status = 502,
  ) {
    super(message);
  }
}

export interface ChatOptions {
  json?: boolean;
  temperature?: number;
  maxTokens?: number;
  /** "turn" = fala da conversa (modelo menor); "heavy" = relatório, prova, explicação (padrão). */
  purpose?: AiPurpose;
  /** Recebe o total de tokens gasto (para o controle de uso). */
  onUsage?: (tokens: number, model: string) => void;
}

export async function chatCompletion(rawMessages: ChatMessage[], opts: ChatOptions = {}) {
  if (!isAiConfigured()) throw new AiError("Professor de IA não configurado: defina AI_API_KEY no servidor.", 503);
  const messages = withUsEnglish(rawMessages);
  const models = modelsFor(opts.purpose ?? "heavy");
  for (let i = 0; i < models.length; i++) {
    try {
      return await completeWith(models[i], messages, opts);
    } catch (e) {
      // Cota esgotada (ou modelo fora do ar): tenta o outro modelo, que tem cota própria.
      const retry = e instanceof AiError && (e.status === 429 || e.status === 503) && i + 1 < models.length;
      if (!retry) throw e;
    }
  }
  throw new AiError("Falha ao falar com a IA. Tente de novo.");
}

async function completeWith(model: string, messages: ChatMessage[], opts: ChatOptions) {
  const isReasoning = /gpt-oss|^o\d|qwen3/i.test(model);
  const call = (json: boolean) =>
    fetch(`${aiConfig.baseUrl}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${aiConfig.apiKey}` },
      body: JSON.stringify({
        model,
        messages,
        temperature: opts.temperature ?? 0.7,
        // Modelos de raciocínio gastam tokens pensando: damos mais folga e pedimos raciocínio curto.
        max_tokens: opts.maxTokens ?? (isReasoning ? 1500 : 600),
        ...(isReasoning && aiConfig.baseUrl.includes("groq.com") ? { reasoning_effort: "low" } : {}),
        ...(json ? { response_format: { type: "json_object" } } : {}),
      }),
      signal: AbortSignal.timeout(45_000),
    });

  let res = await call(Boolean(opts.json));
  // Alguns provedores/modelos não aceitam JSON mode: tenta de novo sem ele (o parser é tolerante).
  if (res.status === 400 && opts.json) {
    const body = await res.clone().text();
    if (/response_format|json/i.test(body)) res = await call(false);
  }
  // gpt-oss às vezes "chama uma ferramenta" em vez de responder (Groq devolve 400 tool_use_failed).
  // O texto gerado vem em failed_generation: aproveitamos se já for o JSON esperado; senão, tentamos de novo.
  if (res.status === 400) {
    const body = await res.clone().text().catch(() => "");
    if (/tool_use_failed|failed_generation/.test(body)) {
      const salvaged = salvageToolCall(body);
      if (salvaged) return salvaged;
      res = await call(false);
      if (!res.ok) {
        const again = await res.clone().text().catch(() => "");
        const second = /tool_use_failed|failed_generation/.test(again) ? salvageToolCall(again) : null;
        if (second) return second;
        // 503 faz o chatCompletion tentar o outro modelo.
        if (/tool_use_failed/.test(again)) throw new AiError("A IA se confundiu ao responder. Tente de novo.", 503);
      }
    }
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    if (res.status === 401) throw new AiError("A chave da API de IA foi recusada (401). Confira AI_API_KEY.", 502);
    if (res.status === 429) throw new AiError("Limite de uso da API de IA atingido. Aguarde um pouco e tente de novo.", 429);
    if (res.status === 503) throw new AiError("A IA está sobrecarregada agora. Tente de novo em instantes.", 503);
    if (res.status === 404 || /model_not_found|model_decommissioned|does not exist/i.test(body)) throw new AiError(`Modelo de IA indisponível (${model}). Ajuste AI_MODEL/AI_CHAT_MODEL. Detalhe: ${body.slice(0, 160)}`, 502);
    throw new AiError(`A API de IA respondeu com erro ${res.status}. ${body.slice(0, 200)}`, 502);
  }
  const data = (await res.json()) as { choices?: { message?: { content?: string } }[]; usage?: { total_tokens?: number } };
  opts.onUsage?.(data.usage?.total_tokens ?? 0, model);
  return data.choices?.[0]?.message?.content ?? "";
}

/** Transcreve áudio com um modelo Whisper (endpoint /audio/transcriptions). */
/** `prompt` orienta o reconhecimento (ex.: as duas palavras de um par mínimo). */
export async function transcribe(file: Blob, filename: string, prompt?: string) {
  if (!isSttConfigured()) throw new AiError("Reconhecimento de voz não configurado: defina AI_API_KEY ou STT_API_KEY.", 503);
  const form = new FormData();
  form.append("file", file, filename);
  form.append("model", sttConfig.model);
  form.append("language", "en");
  form.append("response_format", "json");
  if (prompt) form.append("prompt", prompt.slice(0, 400));
  const res = await fetch(`${sttConfig.baseUrl}/audio/transcriptions`, {
    method: "POST",
    headers: { Authorization: `Bearer ${sttConfig.apiKey}` },
    body: form,
    signal: AbortSignal.timeout(45_000),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new AiError(`Falha na transcrição (${res.status}). ${body.slice(0, 200)}`, res.status === 429 ? 429 : 502);
  }
  const data = (await res.json()) as { text?: string };
  return (data.text ?? "").trim();
}

/**
 * Recupera a resposta quando o modelo a embrulhou numa "chamada de ferramenta":
 * failed_generation costuma trazer {"name": "...", "arguments": {...nosso JSON...}}.
 */
export function salvageToolCall(body: string): string | null {
  try {
    const gen = (JSON.parse(body) as { error?: { failed_generation?: string } }).error?.failed_generation;
    if (!gen) return null;
    const start = gen.indexOf("{");
    const end = gen.lastIndexOf("}");
    if (start < 0 || end <= start) return null;
    const obj = JSON.parse(gen.slice(start, end + 1)) as Record<string, unknown>;
    const args = typeof obj.arguments === "string" ? JSON.parse(obj.arguments) : obj.arguments ?? obj.parameters;
    const out = args && typeof args === "object" ? (args as Record<string, unknown>) : obj;
    return typeof out.reply === "string" || typeof out.score === "number" ? JSON.stringify(out) : null;
  } catch {
    return null;
  }
}
