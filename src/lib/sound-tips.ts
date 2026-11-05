/**
 * Sons prováveis de uma palavra inglesa que costumam ser difíceis para brasileiros
 * (pela escrita da palavra). Usado quando não há análise fonética: o reconhecedor diz QUAL
 * palavra não saiu; estas regras dizem QUAL SOM provavelmente atrapalhou.
 */
import { PHONEME_TIPS } from "@/lib/word-check";

const RULES: { test: RegExp; phoneme: string }[] = [
  { test: /^(th)(ink|ank|ree|row|ought|ing|ird|ursday|irty|in)/, phoneme: "θ" },
  { test: /^(this|that|these|those|the|they|them|there|then|than|though|their)$/, phoneme: "ð" },
  { test: /th/, phoneme: "θ" },
  { test: /^h/, phoneme: "h" },
  { test: /^(r|wr)/, phoneme: "ɹ" },
  { test: /(ee|ea|ie)/, phoneme: "i" },
  { test: /^[^aeiou]*i[^aeiou]+$/, phoneme: "ɪ" },
  { test: /^[^aeiou]*a[^aeiou]+$/, phoneme: "æ" },
  { test: /^[^aeiou]*u[^aeiou]+$/, phoneme: "ʌ" },
  { test: /(oo)/, phoneme: "u" },
  { test: /(ir|ur|or|er)[^aeiou]*$/, phoneme: "ɝ" },
  { test: /ng$/, phoneme: "ŋ" },
];

export const ED_TIP = "-ED final: depois de t/d soa \"id\" (wanted); depois de som surdo (p, k, s, sh, ch) soa \"t\" (worked); nos outros, \"d\" (played). Não diga \"ê-d\".";

export function wordSoundTips(word: string): string[] {
  const w = word.toLowerCase().replace(/[^a-z']/g, "");
  if (!w) return [];
  const tips: string[] = [];
  if (/[^e]ed$/.test(w) && w.length > 4) tips.push(ED_TIP);
  for (const r of RULES) {
    if (r.test.test(w) && PHONEME_TIPS[r.phoneme] && !tips.includes(PHONEME_TIPS[r.phoneme])) {
      tips.push(PHONEME_TIPS[r.phoneme]);
      if (tips.length >= 2) break;
    }
  }
  return tips;
}

/**
 * Resultado de uma repetição: "unclear" quando o reconhecedor quase não entendeu nada
 * (não é justo chamar de erro de pronúncia — pede para repetir), senão as palavras que não saíram.
 */
export function judgeRepeat(completeness: number, recognized: string): "unclear" | "good" | "improve" {
  if (!recognized.trim() || completeness < 35) return "unclear";
  return completeness >= 85 ? "good" : "improve";
}
