import { normalize } from "./grading";

/**
 * Verificação de palavras (quando não há análise fonética): compara o que o
 * reconhecimento de voz entendeu com a frase esperada, palavra por palavra.
 * NÃO é nota de pronúncia — só indica se cada palavra foi reconhecida.
 */
export function wordCheck(reference: string, recognized: string) {
  const ref = normalize(reference).split(" ").filter(Boolean);
  const heard = normalize(recognized).split(" ").filter(Boolean);
  const pool = [...heard];
  const words = ref.map((w) => {
    const i = pool.indexOf(w);
    if (i >= 0) pool.splice(i, 1);
    return { word: w, accuracy: i >= 0 ? 100 : 0, errorType: i >= 0 ? "None" : "Omission", phonemes: [] as { phoneme: string; score: number }[] };
  });
  const ok = words.filter((w) => w.accuracy === 100).length;
  const completeness = ref.length ? Math.round((ok / ref.length) * 100) : 0;
  return { words, completeness };
}

/** Dicas para sons difíceis para brasileiros, a partir do fonema IPA com nota baixa. */
export const PHONEME_TIPS: Record<string, string> = {
  "θ": "TH surdo (think): ponha a ponta da língua entre os dentes e sopre, sem vibrar. Não é \"t\" nem \"f\".",
  "ð": "TH sonoro (this): língua entre os dentes, vibrando a garganta. Não é \"d\".",
  "h": "H aspirado (house): sai ar, como um \"rr\" bem suave. Nunca mudo.",
  "ɹ": "R americano (red): curve a língua para trás sem encostar no céu da boca. Não vibre.",
  "r": "R americano (red): curve a língua para trás sem encostar no céu da boca. Não vibre.",
  "ɪ": "I curto (ship): mais aberto e rápido que o \"i\" do português.",
  "i": "I longo (sheep): estique o \"ii\", sorrindo um pouco.",
  "æ": "A aberto (cat): entre o \"é\" e o \"á\", com a boca bem aberta.",
  "ʌ": "U curto (cup): um \"â\" curto e relaxado.",
  "ʊ": "U curto (book): mais curto e relaxado que o \"u\" do português.",
  "u": "U longo (food): estique o \"uu\".",
  "ɝ": "ER (bird, work): som de \"êr\" com a língua curvada, sem vogal extra.",
  "ɚ": "ER fraco (teacher): \"êr\" curto e relaxado no final.",
  "ə": "Schwa (about): vogal neutra e fraca, como um \"â\" bem curto.",
  "ŋ": "NG (sing): o som fica no fundo da boca; não pronuncie um \"g\" no final.",
  "d": "D final (bed): pronuncie o D sem acrescentar \"i\" no fim (não \"bedi\").",
  "t": "T final (cat): pronuncie o T sem acrescentar \"i\" no fim (não \"cati\").",
  "k": "K final (book): solte o som sem colocar vogal depois.",
  "g": "G final (dog): sem \"i\" no fim (não \"dogui\").",
  "v": "V (very): dentes de cima no lábio de baixo, vibrando. Não troque por B.",
  "z": "Z (is, was): som vibrado de \"z\", não \"s\".",
  "l": "L final (well): encoste a língua atrás dos dentes; não vire \"u\" (\"uéu\").",
  "w": "W (water): lábios em bico, como um \"u\" rápido.",
  "dʒ": "J (job): como \"dj\".",
  "tʃ": "CH (church): como \"tch\".",
};
