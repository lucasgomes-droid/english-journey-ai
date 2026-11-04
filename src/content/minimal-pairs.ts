/**
 * Pares mínimos: palavras que só mudam por um som. São as trocas que mais
 * atrapalham quem fala português (think → sink, red → head, ship → sheep).
 */
export interface MinimalPair {
  a: string;
  aPt: string;
  b: string;
  bPt: string;
}

export interface PairSet {
  id: string;
  title: string;
  /** Som da coluna A e da coluna B. */
  sounds: [string, string];
  /** O que costuma acontecer com brasileiros. */
  issue: string;
  /** Como fazer o som da coluna A (o difícil). */
  tipA: string;
  /** Como fazer o som da coluna B. */
  tipB: string;
  pairs: MinimalPair[];
}

const P = (a: string, aPt: string, b: string, bPt: string): MinimalPair => ({ a, aPt, b, bPt });

export const PAIR_SETS: PairSet[] = [
  {
    id: "th-s",
    title: "TH × S",
    sounds: ["/θ/", "/s/"],
    issue: "O TH sai como S: think vira \"sink\" (afundar).",
    tipA: "TH: ponta da língua entre os dentes, sopre o ar.",
    tipB: "S: língua atrás dos dentes, som de cobra.",
    pairs: [
      P("think", "pensar", "sink", "pia / afundar"),
      P("thank", "agradecer", "sank", "afundou"),
      P("thick", "grosso", "sick", "doente"),
      P("thing", "coisa", "sing", "cantar"),
      P("mouth", "boca", "mouse", "rato"),
      P("path", "caminho", "pass", "passar"),
    ],
  },
  {
    id: "th-t",
    title: "TH × T",
    sounds: ["/θ/", "/t/"],
    issue: "O TH sai como T: three vira \"tree\" (árvore).",
    tipA: "TH: língua entre os dentes, só ar, sem bater a língua.",
    tipB: "T: a língua bate atrás dos dentes de cima.",
    pairs: [
      P("three", "três", "tree", "árvore"),
      P("thin", "magro", "tin", "lata"),
      P("thank", "agradecer", "tank", "tanque"),
      P("thought", "pensei", "taught", "ensinei"),
      P("both", "ambos", "boat", "barco"),
      P("bath", "banho", "bat", "morcego"),
    ],
  },
  {
    id: "dh-d",
    title: "TH sonoro × D",
    sounds: ["/ð/", "/d/"],
    issue: "O TH de this e they sai como D: they vira \"day\" (dia).",
    tipA: "TH sonoro: língua entre os dentes e a garganta vibrando.",
    tipB: "D: a língua bate atrás dos dentes, vibrando.",
    pairs: [
      P("they", "eles", "day", "dia"),
      P("then", "então", "den", "toca"),
      P("those", "aqueles", "doze", "cochilar"),
      P("there", "lá", "dare", "ousar"),
      P("though", "embora", "dough", "massa"),
      P("breathe", "respirar", "breed", "raça / criar"),
    ],
  },
  {
    id: "r-h",
    title: "R × H",
    sounds: ["/ɹ/", "/h/"],
    issue: "O R do começo sai como o \"rr\" brasileiro, que soa como H: red vira \"head\" (cabeça).",
    tipA: "R: curve a língua para trás, sem encostar em nada, e faça um biquinho.",
    tipB: "H: só ar saindo da garganta, como embaçar um espelho.",
    pairs: [
      P("red", "vermelho", "head", "cabeça"),
      P("rate", "taxa", "hate", "odiar"),
      P("rat", "rato", "hat", "chapéu"),
      P("ray", "raio", "hay", "feno"),
      P("rid", "livrar", "hid", "escondeu"),
      P("rope", "corda", "hope", "esperança"),
    ],
  },
  {
    id: "i-ee",
    title: "I curto × I longo",
    sounds: ["/ɪ/", "/iː/"],
    issue: "As duas viram o \"i\" do português: ship (navio) e sheep (ovelha) ficam iguais.",
    tipA: "I curto: rápido e relaxado, quase um \"ê\" fechado.",
    tipB: "I longo: estique o som e sorria um pouco.",
    pairs: [
      P("ship", "navio", "sheep", "ovelha"),
      P("live", "viver", "leave", "sair"),
      P("sit", "sentar", "seat", "assento"),
      P("fill", "encher", "feel", "sentir"),
      P("hit", "bater", "heat", "calor"),
      P("chip", "lasca / chip", "cheap", "barato"),
    ],
  },
  {
    id: "ae-e",
    title: "A aberto × É",
    sounds: ["/æ/", "/ɛ/"],
    issue: "O A aberto vira \"é\": bad (ruim) soa como bed (cama).",
    tipA: "Æ: abra bem a boca, entre o \"é\" e o \"á\".",
    tipB: "É: como o \"é\" de \"café\".",
    pairs: [
      P("bad", "ruim", "bed", "cama"),
      P("man", "homem", "men", "homens"),
      P("sad", "triste", "said", "disse"),
      P("pan", "panela", "pen", "caneta"),
      P("bag", "bolsa", "beg", "implorar"),
      P("had", "tinha", "head", "cabeça"),
    ],
  },
  {
    id: "uh-ae",
    title: "U de cup × A de cat",
    sounds: ["/ʌ/", "/æ/"],
    issue: "Cup (xícara) e cap (boné) acabam iguais, porque os dois viram \"a\".",
    tipA: "ʌ: um \"â\" curto, boca pouco aberta e relaxada.",
    tipB: "æ: boca bem aberta, quase um \"é\".",
    pairs: [
      P("cup", "xícara", "cap", "boné"),
      P("hut", "cabana", "hat", "chapéu"),
      P("bug", "inseto", "bag", "bolsa"),
      P("fun", "diversão", "fan", "ventilador / fã"),
      P("cut", "cortar", "cat", "gato"),
      P("much", "muito", "match", "partida / combinar"),
    ],
  },
  {
    id: "v-b",
    title: "V × B",
    sounds: ["/v/", "/b/"],
    issue: "Quando a pessoa fala rápido, o V vira B: very soa como berry (fruta silvestre).",
    tipA: "V: dentes de cima encostados no lábio de baixo, vibrando.",
    tipB: "B: os dois lábios se fecham e abrem.",
    pairs: [
      P("very", "muito", "berry", "fruta silvestre"),
      P("vest", "colete", "best", "melhor"),
      P("van", "van", "ban", "proibir"),
      P("vote", "votar", "boat", "barco"),
      P("vet", "veterinário", "bet", "apostar"),
      P("curve", "curva", "curb", "meio-fio"),
    ],
  },
];

export const getPairSet = (id: string) => PAIR_SETS.find((s) => s.id === id);

/** Frase-moldura para o reconhecedor de voz não ouvir uma palavra solta. */
export const carrier = (word: string) => `I said ${word}.`;

/**
 * Decide o que o reconhecedor ouviu: a palavra-alvo, a do par ou nenhuma.
 * Compara palavra por palavra, sem diferenciar maiúsculas e pontuação.
 */
export function judgePair(heard: string, target: string, other: string): "target" | "other" | "unclear" {
  const words = heard
    .toLowerCase()
    .replace(/[^a-z' ]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const t = target.toLowerCase();
  const o = other.toLowerCase();
  const hasT = words.includes(t);
  const hasO = words.includes(o);
  if (hasT && !hasO) return "target";
  if (hasO && !hasT) return "other";
  return "unclear";
}
