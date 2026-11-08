import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "a1-final";

export const a1Final: Module = {
  id: M,
  level: "A1",
  order: 9,
  title: "Avaliação final A1",
  description: "Teste de nível que libera o A2.",
  lessons: [
    buildLesson("a1-final-test", M, 1, {
      kind: "test",
      title: "Teste de nível A1",
      objective: "Mostrar que você concluiu o nível A1 e está pronto para o A2.",
      xp: 100,
      passScore: 75,
      explanation: [
        {
          title: "Como funciona",
          body: "Este teste reúne todo o conteúdo do A1. Com **75%** ou mais, seu nível passa para **A2**. Se não atingir, a revisão diária vai reforçar os pontos fracos e você pode tentar de novo.",
        },
      ],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Você vai dormir. O que diz à família?", options: ["Good evening", "Good night", "Good afternoon"], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Eu tenho vinte anos.", accepted: ["I'm twenty.", "I'm twenty years old.", "I am twenty years old.", "I am twenty.", "I'm 20.", "I'm 20 years old."] },
        { type: "fill_blank", skill: "grammar", sentence: "Is ___ your sister? (essa pessoa aqui perto)", accepted: ["this"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"O filho dela\" é:", options: ["his son", "her son", "she's son"], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I'm an engineer from Brazil.", options: ["Sou engenheiro do Brasil.", "Sou médico do Brasil.", "Sou brasileiro e advogado."], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "He ___ (study) English every day.", accepted: ["studies"] },
        { type: "word_order", skill: "grammar", prompt: "Você gosta do seu trabalho?", answer: "Do you like your job?", distractors: ["does"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a frase correta.", options: ["Is raining.", "It's raining.", "It raining."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Onde você trabalha?", accepted: ["Where do you work?"] },
        { type: "listening", skill: "listening", prompt: "Que horas você ouviu?", audio: "The meeting is at a quarter past ten.", options: ["10:15", "10:45", "2:10"], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "We don't have ___ bread.", accepted: ["any"] },
        { type: "multiple_choice", skill: "reading", prompt: "\"Hi, I'm Mia. I'm 30 and I'm a nurse. I live in Dublin with my husband and our two daughters.\" Quantos filhos Mia tem?", options: ["Um filho", "Duas filhas", "Dois filhos"], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Ela não gosta de café.", accepted: ["She doesn't like coffee.", "She does not like coffee."] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "What do you do?", accepted: ["what do you do"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Are they from Canada?\" — resposta curta positiva:", options: ["Yes, they do.", "Yes, they are.", "Yes, they is."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "There ___ a lot of people at the party.", accepted: ["were", "are"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Frase correta:", options: ["She can speaks French.", "She can speak French.", "She cans speak French."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "Shh! The baby is ___ (sleep).", accepted: ["sleeping"] },
        { type: "translate", skill: "writing", prompt: "Quanto custa esta camisa?", accepted: ["How much is this shirt?", "How much does this shirt cost?"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Does she ___ English?\"", options: ["speaks", "speak", "speaking"], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Onde fica a farmácia?", audio: "The pharmacy is next to the supermarket.", options: ["Ao lado do supermercado", "Em frente ao supermercado", "Dentro do supermercado"], answer: 0 },
        { type: "word_order", skill: "grammar", prompt: "Eu vou ao cinema aos sábados.", answer: "I go to the movies on Saturdays.", distractors: ["went"] },
        { type: "translate", skill: "writing", prompt: "Está ensolarado hoje.", accepted: ["It's sunny today.", "It is sunny today.", "Today it's sunny."] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
