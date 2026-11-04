/** Leitura tolerante das respostas da IA para a fala livre (funções puras). */
export interface SpeakingFeedback {
  summary_pt: string;
  strengths_pt: string[];
  improved: string;
  mistakes: { original: string; corrected: string; pt: string; explanation_pt: string }[];
  phrases: { en: string; pt: string }[];
  next_step_pt: string;
}

const str = (x: unknown) => (typeof x === "string" ? x.trim() : "");

/** Extrai o primeiro objeto JSON da resposta do modelo, de forma tolerante. */
export function parseJsonObject(raw: string): Record<string, unknown> | null {
  const m = raw.match(/\{[\s\S]*\}/);
  if (!m) return null;
  try {
    return JSON.parse(m[0]) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function normalizeFeedback(obj: Record<string, unknown> | null): SpeakingFeedback | null {
  if (!obj) return null;
  const arr = (x: unknown) => (Array.isArray(x) ? x : []);
  const mistakes = arr(obj.mistakes)
    .map((m) => m as Record<string, unknown>)
    .map((m) => ({ original: str(m.original), corrected: str(m.corrected), pt: str(m.pt), explanation_pt: str(m.explanation_pt) }))
    .filter((m) => m.corrected && m.corrected !== m.original)
    .slice(0, 5);
  const phrases = arr(obj.phrases)
    .map((p) => p as Record<string, unknown>)
    .map((p) => ({ en: str(p.en), pt: str(p.pt) }))
    .filter((p) => p.en && p.pt)
    .slice(0, 6);
  const fb: SpeakingFeedback = {
    summary_pt: str(obj.summary_pt),
    strengths_pt: arr(obj.strengths_pt).map(str).filter(Boolean).slice(0, 3),
    improved: str(obj.improved),
    mistakes,
    phrases,
    next_step_pt: str(obj.next_step_pt),
  };
  return fb.summary_pt || fb.improved || mistakes.length ? fb : null;
}

