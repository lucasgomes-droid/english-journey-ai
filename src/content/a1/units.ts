/**
 * A1 em 8 unidades, na ordem pedagógica do projeto:
 * 1 Primeiros passos · 2 Informações pessoais · 3 Vida cotidiana · 4 Pessoas e objetos ·
 * 5 Situações reais · 6 Lugares e deslocamentos · 7 Experiências básicas · 8 Consolidação.
 *
 * As aulas são as mesmas de antes (mesmos IDs: o progresso salvo continua valendo), só reagrupadas.
 * O passado (antigo "Ontem") passou a abrir o A2. Cada unidade termina com uma avaliação montada com
 * exercícios das próprias aulas da unidade (IDs novos `-uN`) + a leitura da unidade.
 */
import { buildLesson } from "../builder";
import type { Exercise, Lesson, Module } from "../types";
import { a1Module1 } from "./module1";
import { a1Module2 } from "./module2";
import { a1Module3 } from "./module3";
import { a1Module4 } from "./module4";
import { a1Module5 } from "./module5";
import { a1Module6 } from "./module6";
import { a1Module7 } from "./module7";
import { a1Module8 } from "./module8";
import { a1Final } from "./final";

const SOURCE = [a1Module1, a1Module2, a1Module3, a1Module4, a1Module5, a1Module6, a1Module7];
const lessonById = new Map(SOURCE.flatMap((m) => m.lessons).map((l) => [l.id, l]));
const testOf = (moduleId: string) => SOURCE.find((m) => m.id === moduleId)!.lessons.find((l) => l.kind === "test")!;

const PRODUCTION = new Set(["translate", "fill_blank", "word_order"]);

/** Avaliação da unidade: até 3 exercícios variados de cada aula (produção, escuta e outro). */
export function unitTestExercises(testId: string, lessons: Lesson[]): Exercise[] {
  const picked: Exercise[] = [];
  for (const l of lessons) {
    const prod = l.exercises.find((e) => PRODUCTION.has(e.type));
    const listen = l.exercises.find((e) => e.type === "listening");
    const other = l.exercises.find((e) => e !== prod && e !== listen);
    for (const e of [prod, listen, other]) if (e) picked.push(e);
  }
  return picked.slice(0, 14).map((e, i) => ({ ...e, id: `${testId}-u${i + 1}` }) as Exercise);
}

function unit(id: string, order: number, title: string, description: string, lessonIds: string[]): Module {
  const lessons = lessonIds.map((lid, i) => ({ ...lessonById.get(lid)!, moduleId: id, order: i + 1 }));
  const base = testOf(id);
  const test: Lesson = {
    ...base,
    moduleId: id,
    order: lessons.length + 1,
    title: `Avaliação da unidade ${order}`,
    objective: `Comprovar que você domina a unidade "${title}".`,
    explanation: [
      { title: "Como funciona", body: "Exercícios de todas as aulas da unidade, com escuta, escrita e uma leitura curta. Você precisa de **70%** de acertos para liberar a próxima unidade. Pode refazer quantas vezes quiser." },
    ],
    exercises: unitTestExercises(base.id, lessons),
  };
  return { id, level: "A1", order, title, description, lessons: [...lessons, test] };
}

// ---------------------------------------------------------------- Unidade 8: consolidação (aulas novas)
const C = "a1-final";
const consolidation1 = buildLesson("a1-final-l1", C, 1, {
  title: "Revisão: falando de você",
  objective: "Conseguir se apresentar por completo: nome, idade, país, trabalho, família e rotina.",
  explanation: [
    {
      title: "Tudo o que você já sabe",
      body: "Com o **verbo to be** você diz quem é (**I'm Lucas. I'm 30. I'm from Brazil.**). Com o **present simple** fala da rotina (**I work in a warehouse. I get up at six.**). Com **have/has** fala da família (**I have two brothers.**). Juntando tudo, você já consegue uma apresentação inteira.",
    },
    { title: "Perguntas para devolver", body: "Numa conversa, devolva a pergunta: **And you? Where are you from? What do you do?** Isso mantém a conversa viva." },
  ],
  vocabulary: [
    { en: "about me", pt: "sobre mim", say: "a-BÁUT mi" },
    { en: "usually", pt: "geralmente", say: "IÚ-ju-a-li", example: { en: "I usually get up at six.", pt: "Geralmente acordo às seis." } },
    { en: "on weekends", pt: "nos fins de semana", say: "on UÍK-endz" },
    { en: "my favorite", pt: "meu/minha favorito(a)", say: "mai FÊI-vu-rit", example: { en: "My favorite food is pizza.", pt: "Minha comida favorita é pizza." } },
    { en: "And you?", pt: "E você?", say: "end IÚ" },
    { en: "I live in…", pt: "Eu moro em…", say: "ai LIV in", example: { en: "I live in Campinas.", pt: "Eu moro em Campinas." } },
  ],
  examples: [
    { en: "Hi! I'm Lucas. I'm 30 and I'm from Brazil.", pt: "Oi! Sou o Lucas. Tenho 30 anos e sou do Brasil." },
    { en: "I work in a warehouse. I usually start at seven.", pt: "Trabalho num armazém. Geralmente começo às sete." },
    { en: "I have a brother and a sister.", pt: "Tenho um irmão e uma irmã." },
    { en: "On weekends I play football. And you?", pt: "Nos fins de semana jogo futebol. E você?" },
  ],
  exercises: [
    { type: "translate", skill: "writing", prompt: "Eu sou do Brasil e trabalho num armazém.", accepted: ["I'm from Brazil and I work in a warehouse.", "I am from Brazil and I work in a warehouse."] },
    { type: "multiple_choice", skill: "grammar", prompt: "Escolha a frase correta.", options: ["I have 30 years.", "I'm 30 years old.", "I am have 30."], answer: 1 },
    { type: "fill_blank", skill: "grammar", sentence: "My sister ___ (live) in São Paulo.", accepted: ["lives"] },
    { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I usually get up at six and start work at seven.", options: ["Acorda às 6 e começa a trabalhar às 7.", "Acorda às 7 e começa às 6.", "Trabalha das 6 às 7."], answer: 0 },
    { type: "word_order", skill: "grammar", prompt: "O que você faz nos fins de semana?", answer: "What do you do on weekends?" },
    { type: "multiple_choice", skill: "reading", prompt: "\"I'm Ana. I'm a teacher. I have two cats. On weekends I go to the park.\" O que Ana faz nos fins de semana?", options: ["Trabalha", "Vai ao parque", "Cuida dos gatos"], answer: 1 },
    { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Where are you from?", accepted: ["where are you from"] },
    { type: "translate", skill: "writing", prompt: "Eu tenho dois irmãos. E você?", accepted: ["I have two brothers. And you?", "I've got two brothers. And you?"] },
  ],
  conversation: { goal: "Apresente-se por completo ao professor e faça pelo menos duas perguntas de volta.", starter: "Hi! Tell me about you. What's your name?" },
  review: ["I'm + idade/país/profissão (to be).", "Rotina: I work / she works (present simple).", "Devolva a pergunta: And you?"],
});

const consolidation2 = buildLesson("a1-final-l2", C, 2, {
  title: "Revisão: sua cidade e o agora",
  objective: "Conseguir falar da sua cidade, pedir coisas, perguntar preços e dizer o que está acontecendo agora.",
  explanation: [
    { title: "Lugares e pedidos", body: "**There is / There are** para dizer o que existe na cidade (**There is a park near my house.**). **Can I have…? / How much is…?** para pedir e perguntar preços." },
    { title: "Rotina × agora", body: "Rotina: **I work every day** (present simple). Agora: **I'm working now** (present continuous, com **am/is/are + -ing**)." },
  ],
  vocabulary: [
    { en: "near", pt: "perto", say: "NÍR", example: { en: "There is a park near my house.", pt: "Tem um parque perto da minha casa." } },
    { en: "right now", pt: "agora mesmo", say: "RÁIT náu" },
    { en: "How much is it?", pt: "Quanto custa?", say: "ráu MÂTCH iz it" },
    { en: "Can I have…?", pt: "Pode me dar…? / Eu queria…", say: "ken ai RÉV" },
    { en: "across from", pt: "em frente a", say: "a-CRÓS from", example: { en: "The bank is across from the school.", pt: "O banco fica em frente à escola." } },
    { en: "umbrella", pt: "guarda-chuva", say: "âm-BRÉ-la" },
  ],
  examples: [
    { en: "There is a big supermarket near my house.", pt: "Tem um supermercado grande perto da minha casa." },
    { en: "Can I have a coffee, please? How much is it?", pt: "Pode me dar um café, por favor? Quanto é?" },
    { en: "I work every day, but right now I'm studying English.", pt: "Trabalho todo dia, mas agora estou estudando inglês." },
    { en: "It's raining today. Take an umbrella!", pt: "Está chovendo hoje. Leve um guarda-chuva!" },
  ],
  exercises: [
    { type: "fill_blank", skill: "grammar", sentence: "There ___ two parks in my city.", accepted: ["are"] },
    { type: "multiple_choice", skill: "grammar", prompt: "Agora mesmo, ele…", options: ["works.", "is working.", "work."], answer: 1 },
    { type: "translate", skill: "writing", prompt: "Quanto custa este bolo?", accepted: ["How much is this cake?", "How much does this cake cost?"] },
    { type: "listening", skill: "listening", prompt: "Onde fica o banco?", audio: "The bank is across from the post office.", options: ["Ao lado dos correios", "Em frente aos correios", "Atrás dos correios"], answer: 1 },
    { type: "word_order", skill: "grammar", prompt: "Pode me dar uma água, por favor?", answer: "Can I have a water, please?" },
    { type: "multiple_choice", skill: "reading", prompt: "\"Hi Bia! I'm at the café near the station. It's raining, so I'm drinking a hot chocolate.\" Por que ela está tomando chocolate quente?", options: ["Está com fome", "Está chovendo", "O café fechou"], answer: 1 },
    { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I'm waiting for the bus.", accepted: ["i'm waiting for the bus", "i am waiting for the bus"] },
    { type: "fill_blank", skill: "grammar", sentence: "Turn ___ at the bank. (vire à esquerda)", accepted: ["left"] },
  ],
  conversation: { goal: "Conte ao professor como é a sua cidade e o que você está fazendo agora.", starter: "Hi! Where do you live? Is there a park near your house?" },
  review: ["There is (um) / There are (vários).", "Can I have…? How much is…?", "Rotina: I work. Agora: I'm working."],
});

// ---------------------------------------------------------------- Unidades
export const A1_UNITS: Module[] = [
  unit("a1-m1", 1, "Primeiros passos", "Alfabeto, saudações, apresentações e o verbo to be.", ["a1-m4-l1", "a1-m1-l1", "a1-m1-l2", "a1-m1-l3"]),
  unit("a1-m2", 2, "Informações pessoais", "Números e idade, países e nacionalidades, datas e horários.", ["a1-m1-l4", "a1-m2-l1", "a1-m5-l3", "a1-m3-l2"]),
  unit("a1-m3", 3, "Vida cotidiana", "Present simple, rotina, do/does, terceira pessoa e tempo livre.", ["a1-m3-l1", "a1-m3-l4", "a1-m5-l2"]),
  unit("a1-m4", 4, "Pessoas e objetos", "Família, profissões, this/that, have/has e there is/are na casa.", ["a1-m2-l2", "a1-m2-l3", "a1-m2-l4", "a1-m4-l3"]),
  unit("a1-m5", 5, "Situações reais", "Comida, café, preços, quantidades e can/can't.", ["a1-m3-l3", "a1-m6-l4", "a1-m6-l1", "a1-m6-l2", "a1-m5-l1"]),
  unit("a1-m6", 6, "Lugares e deslocamentos", "Lugares da cidade, preposições, transporte, direções e imperativos.", ["a1-m4-l4", "a1-m7-l3", "a1-m7-l4"]),
  unit("a1-m7", 7, "Experiências básicas", "Present continuous, rotina × agora, clima e roupas.", ["a1-m7-l1", "a1-m7-l2", "a1-m5-l4", "a1-m4-l2", "a1-m6-l3"]),
  {
    ...a1Final,
    order: 8,
    title: "Consolidação",
    description: "Revisão geral, conversas, leitura, escrita e a avaliação final do A1.",
    lessons: [consolidation1, consolidation2, ...a1Final.lessons.map((l) => ({ ...l, order: 3 }))],
  },
];

/** O antigo "Ontem" (passado) abre o A2, como no currículo CEFR. */
export const A2_PAST_UNIT: Module = { ...a1Module8, level: "A2", order: 0, title: "Passado simples: ontem", description: "Was/were, verbos regulares e irregulares e perguntas com did." };
