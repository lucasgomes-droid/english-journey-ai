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

export const sttConfig = {
  apiKey: process.env.STT_API_KEY || process.env.AI_API_KEY || "",
  baseUrl: (process.env.STT_BASE_URL || process.env.AI_BASE_URL || "https://api.groq.com/openai/v1").replace(/\/$/, ""),
  model: process.env.STT_MODEL || "whisper-large-v3-turbo",
};

export const isAiConfigured = () => Boolean(aiConfig.apiKey);
export const isSttConfigured = () => Boolean(sttConfig.apiKey);

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

export async function chatCompletion(messages: ChatMessage[], opts: { json?: boolean; temperature?: number; maxTokens?: number } = {}) {
  if (!isAiConfigured()) throw new AiError("Professor de IA não configurado: defina AI_API_KEY no servidor.", 503);
  const isReasoning = /gpt-oss|^o\d|qwen3/i.test(aiConfig.model);
  const call = (json: boolean) =>
    fetch(`${aiConfig.baseUrl}/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${aiConfig.apiKey}` },
      body: JSON.stringify({
        model: aiConfig.model,
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
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    if (res.status === 401) throw new AiError("A chave da API de IA foi recusada (401). Confira AI_API_KEY.", 502);
    if (res.status === 429) throw new AiError("Limite de uso da API de IA atingido. Aguarde um pouco e tente de novo.", 429);
    if (res.status === 404 || /model/i.test(body)) throw new AiError(`Modelo de IA indisponível (${aiConfig.model}). Ajuste AI_MODEL. Detalhe: ${body.slice(0, 160)}`, 502);
    throw new AiError(`A API de IA respondeu com erro ${res.status}. ${body.slice(0, 200)}`, 502);
  }
  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return data.choices?.[0]?.message?.content ?? "";
}

/** Transcreve áudio com um modelo Whisper (endpoint /audio/transcriptions). */
export async function transcribe(file: Blob, filename: string) {
  if (!isSttConfigured()) throw new AiError("Reconhecimento de voz não configurado: defina AI_API_KEY ou STT_API_KEY.", 503);
  const form = new FormData();
  form.append("file", file, filename);
  form.append("model", sttConfig.model);
  form.append("language", "en");
  form.append("response_format", "json");
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
