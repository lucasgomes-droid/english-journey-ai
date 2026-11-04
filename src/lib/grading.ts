import type { Exercise } from "@/content/types";

export type ExerciseAnswer =
  | { kind: "choice"; choice: number }
  | { kind: "text"; text: string }
  | { kind: "order"; words: string[] }
  | { kind: "pairs"; mistakes: number };

export interface GradeResult {
  correct: boolean;
  /** Resposta esperada para exibir ao aluno. */
  expected: string;
  /** Correto, mas com pequeno erro de digitação. */
  typo?: boolean;
}

const CONTRACTIONS: [RegExp, string][] = [
  [/\bi'm\b/g, "i am"],
  [/\byou're\b/g, "you are"],
  [/\bwe're\b/g, "we are"],
  [/\bthey're\b/g, "they are"],
  [/\b(he|she|it|that|what|where|who|name)'s\b/g, "$1 is"],
  [/\bisn't\b/g, "is not"],
  [/\baren't\b/g, "are not"],
  [/\bdon't\b/g, "do not"],
  [/\bdoesn't\b/g, "does not"],
  [/\bcan't\b/g, "cannot"],
  [/\bcan not\b/g, "cannot"],
  [/\b(i|you|he|she|we|they)'d\b/g, "$1 would"],
  [/\b(i|you|we|they)'ve\b/g, "$1 have"],
  [/\b(i|you|he|she|we|they)'ll\b/g, "$1 will"],
];

/** Normaliza uma frase para comparação tolerante (caixa, pontuação, contrações). */
export function normalize(text: string): string {
  let t = text
    .toLowerCase()
    .replace(/[‘’ʼ`´]/g, "'")
    .replace(/[“”"]/g, "")
    .replace(/[.,!?;:()¿¡]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  for (const [re, rep] of CONTRACTIONS) t = t.replace(re, rep);
  return t.replace(/\s+/g, " ").trim();
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  // Distância de Damerau (alinhamento ótimo): troca de letras vizinhas conta como 1 erro.
  const d: number[][] = Array.from({ length: m + 1 }, (_, i) => Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[m][n];
}

/** Compara texto livre com a lista de respostas aceitas. */
export function matchText(input: string, accepted: string[], allowTypo = true): { correct: boolean; typo: boolean } {
  const n = normalize(input);
  if (!n) return { correct: false, typo: false };
  const targets = accepted.map(normalize);
  if (targets.includes(n)) return { correct: true, typo: false };
  if (allowTypo) {
    for (const t of targets) {
      // Tolera 1 erro de digitação em respostas com mais de 5 letras (não em palavra única curta).
      if (t.length > 5 && levenshtein(n, t) <= 1) return { correct: true, typo: true };
    }
  }
  return { correct: false, typo: false };
}

export function expectedAnswer(ex: Exercise): string {
  switch (ex.type) {
    case "multiple_choice":
      return ex.options[ex.answer];
    case "listening":
      return ex.options && ex.answer !== undefined ? ex.options[ex.answer] : (ex.accepted?.[0] ?? ex.audio);
    case "translate":
    case "fill_blank":
      return ex.accepted[0];
    case "word_order":
      return ex.answer;
    case "match_pairs":
      return ex.pairs.map(([a, b]) => `${a} = ${b}`).join(", ");
  }
}

export function gradeExercise(ex: Exercise, answer: ExerciseAnswer): GradeResult {
  const expected = expectedAnswer(ex);
  switch (ex.type) {
    case "multiple_choice":
      return { expected, correct: answer.kind === "choice" && answer.choice === ex.answer };
    case "listening": {
      if (ex.options && ex.answer !== undefined) {
        return { expected, correct: answer.kind === "choice" && answer.choice === ex.answer };
      }
      if (answer.kind !== "text") return { expected, correct: false };
      // No ditado o próprio áudio também é aceito como resposta.
      const r = matchText(answer.text, [...(ex.accepted ?? []), ex.audio]);
      return { expected, ...r };
    }
    case "translate": {
      if (answer.kind !== "text") return { expected, correct: false };
      return { expected, ...matchText(answer.text, ex.accepted) };
    }
    case "fill_blank": {
      if (answer.kind !== "text") return { expected, correct: false };
      // Lacunas são palavras curtas e específicas: sem tolerância a erro de digitação.
      return { expected, ...matchText(answer.text, ex.accepted, false) };
    }
    case "word_order": {
      if (answer.kind !== "order") return { expected, correct: false };
      return { expected, correct: normalize(answer.words.join(" ")) === normalize(ex.answer) };
    }
    case "match_pairs":
      return { expected, correct: answer.kind === "pairs" && answer.mistakes <= 1 };
  }
}

/** Divide a frase do word_order em blocos (palavras com sua pontuação). */
export function orderTokens(sentence: string): string[] {
  return sentence.split(/\s+/).filter(Boolean);
}

export function scorePercent(results: boolean[]): number {
  if (!results.length) return 0;
  return Math.round((results.filter(Boolean).length / results.length) * 100);
}
