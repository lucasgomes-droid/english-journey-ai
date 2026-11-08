/**
 * Filtro de "correções falsas": a IA às vezes "corrige" frases que já estão certas
 * (What's → What is, "and you?" → "What is your name?", vírgula → ponto). Isso confunde o aluno,
 * então essas correções são descartadas no servidor, seja qual for o modelo.
 */
const CONTRACTIONS: [RegExp, string][] = [
  [/\bcan't\b/g, "cannot"], [/\bwon't\b/g, "will not"], [/\bshan't\b/g, "shall not"], [/\blet's\b/g, "let us"],
  [/\b(\w+)n't\b/g, "$1 not"], [/\bi'm\b/g, "i am"], [/\b(\w+)'re\b/g, "$1 are"], [/\b(\w+)'ve\b/g, "$1 have"],
  [/\b(\w+)'ll\b/g, "$1 will"], [/\b(\w+)'d\b/g, "$1 would"],
  [/\b(what|where|who|how|when|why|it|that|there|here|he|she|this|everything|nothing|something)'s\b/g, "$1 is"],
  // Sem apóstrofo (comum no teclado e no reconhecimento de voz).
  [/\b(do|does|did|is|are|was|were|have|has|had|could|would|should)nt\b/g, "$1 not"], [/\bcant\b/g, "cannot"], [/\bwont\b/g, "will not"],
  [/\bim\b/g, "i am"], [/\b(what|that|where|who|how)s\b/g, "$1 is"], [/\bive\b/g, "i have"], [/\byoure\b/g, "you are"],
  [/\bcan not\b/g, "cannot"], [/\bgonna\b/g, "going to"], [/\bwanna\b/g, "want to"],
];

export function normalizeSentence(s: string): string {
  let t = s.toLowerCase().replace(/[’‘`´]/g, "'");
  for (const [re, rep] of CONTRACTIONS) t = t.replace(re, rep);
  return t.replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim();
}

/** Perguntas de volta equivalentes ("and you?", "what about you?", "what is your name?"...). */
const ASK_BACK = /\s*(and you|what about you|how about you|and yours|you)$/;

/** true quando a "correção" não corrige nada de verdade e deve ser ignorada. */
export function isTrivialCorrection(original: string, corrected: string): boolean {
  const a = normalizeSentence(original);
  const b = normalizeSentence(corrected);
  if (!a || !b) return true;
  if (a === b) return true;
  // "My name is Lucas, and you?" → "My name is Lucas. What is your name?": só troca a pergunta de volta.
  const head = a.replace(ASK_BACK, "").trim();
  if (head && head !== a && b.startsWith(head) && /\?\s*$/.test(corrected.trim()) && b.slice(head.length).trim().split(" ").length <= 6) return true;
  return false;
}

/** Regra comum a todos os prompts que corrigem o aluno. */
export const NO_FALSE_CORRECTIONS = `NEVER "correct" what is already correct (correction must be null):
- Contractions and full forms are BOTH correct: What's = What is, I'm = I am, don't = do not, it's = it is. Never change one into the other.
- "And you?", "What about you?", "How about you?" are natural ways to ask back. Never replace them.
- Never correct commas, periods, capitalization or other punctuation (the text usually comes from speech recognition).
- Never rewrite a correct sentence into a different correct sentence. Only real grammar or vocabulary mistakes count.`;

/** Devolve as contrações que o aluno usou ("I'm" → a IA escreveu "I am": volta para "I'm"). */
export function restoreContractions(original: string, corrected: string): string {
  let out = corrected;
  for (const c of original.replace(/[’‘]/g, "'").match(/\b[A-Za-z]+'[A-Za-z]+\b/g) ?? []) {
    const full = normalizeSentence(c);
    if (full === c.toLowerCase()) continue;
    const re = new RegExp(`\\b${full.replace(/ /g, "\\s+")}\\b`, "i");
    const m = out.match(re);
    if (m && !new RegExp(`\\b${c.replace("'", "['’]")}\\b`, "i").test(out)) out = out.replace(re, m[0][0] === m[0][0].toUpperCase() && /[A-Z]/.test(m[0][0]) ? c[0].toUpperCase() + c.slice(1) : c);
  }
  return out;
}

/** Tira da explicação as frases que "corrigem" uma contração que o aluno usou certo. */
export function cleanExplanation(explanation: string, original: string): string {
  const cs = (original.replace(/[’‘]/g, "'").match(/\b[A-Za-z]+'[A-Za-z]+\b/g) ?? []).map((c) => ({ c: c.toLowerCase(), full: normalizeSentence(c) }));
  if (!cs.length) return explanation;
  const parts = explanation.split(/(?<=[.!?])\s+/);
  const kept = parts.filter((p) => {
    const low = p.toLowerCase().replace(/[’‘]/g, "'");
    return !cs.some(({ c, full }) => low.includes(c) && low.includes(full));
  });
  return kept.join(" ").trim();
}

/** Tira da fala do professor as frases que só repetem o que o aluno disse (ou a correção). */
export function stripEcho(reply: string, texts: string[]): string {
  const sources = texts.map(normalizeSentence).filter(Boolean);
  const parts = reply.split(/(?<=[.!?])\s+/);
  const kept = parts.filter((p) => {
    const n = normalizeSentence(p);
    // Repete (inteira ou um trecho de 4+ palavras) a fala do aluno ou a correção, sem acrescentar nada.
    return !(n.split(" ").length >= 4 && !p.trim().endsWith("?") && sources.some((src) => src.includes(n)));
  });
  return kept.length && kept.length < parts.length ? kept.join(" ").trim() : reply;
}
