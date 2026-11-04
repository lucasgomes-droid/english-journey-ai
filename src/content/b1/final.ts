import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "b1-final";

export const b1Final: Module = {
  id: M,
  level: "B1",
  order: 9,
  title: "Avaliação final B1",
  description: "Teste de nível que libera o B2.",
  lessons: [
    buildLesson("b1-final-test", M, 1, {
      kind: "test",
      title: "Teste de nível B1",
      objective: "Mostrar que você concluiu o nível B1 e está pronto para o B2.",
      xp: 150,
      passScore: 75,
      explanation: [
        {
          title: "Como funciona",
          body: "Reúne todo o B1: narrativas, hipóteses, opiniões, trabalho, sociedade, saúde, cultura e vida no exterior. Com **75%** ou mais, você passa para o **B2**. Depois, faça um **desafio de 1 minuto** sobre um tema do B2 para testar a fala.",
        },
      ],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "When we arrived, the concert ___ already started.", accepted: ["had"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"I'll call you.\" → She said she ___ call me.", options: ["will", "would", "can"], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "If I ___ (have) more time, I'd learn to play the piano.", accepted: ["had"] },
        { type: "fill_blank", skill: "grammar", sentence: "I wish I ___ (can) travel more.", accepted: ["could"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Take an umbrella ___ it rains.\"", options: ["unless", "in case", "as long as"], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "Ele não atende. \"He ___ be busy.\"", options: ["must", "mustn't", "can't to"], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "They can't ___ left yet. Their car is still here.", accepted: ["have"] },
        { type: "fill_blank", skill: "grammar", sentence: "I've been ___ (study) English for three years.", accepted: ["studying"] },
        { type: "fill_blank", skill: "grammar", sentence: "The winners will ___ announced tomorrow.", accepted: ["be"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"The man ___ car was stolen called the police.\"", options: ["who", "which", "whose"], answer: 2 },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Estou acostumado a trabalhar à noite.\"", options: ["I used to work at night.", "I'm used to working at night.", "I'm used to work at night."], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["I'm boring with this job.", "I'm bored with this job."], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Desligue a TV\" com pronome:", options: ["Turn off it.", "Turn it off."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "It was ___ a long day that I went straight to bed.", accepted: ["such"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Where do you live?\" → He asked me...", options: ["where I lived.", "where did I live.", "where do I live."], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "You work in sales, ___ you?", accepted: ["don't"] },
        { type: "translate", skill: "writing", prompt: "Mandei consertar meu celular.", accepted: ["I had my phone repaired.", "I had my phone fixed.", "I got my phone repaired.", "I got my phone fixed.", "I had my cell phone repaired."] },
        { type: "translate", skill: "writing", prompt: "Entendo seu ponto, mas discordo.", accepted: ["I see your point, but I disagree.", "I see your point, but I don't agree.", "I understand your point, but I disagree."] },
        { type: "word_order", skill: "grammar", prompt: "Assim que eu cheguei, ela saiu.", answer: "As soon as I arrived, she left." },
        { type: "word_order", skill: "grammar", prompt: "Era para eles chegarem às oito.", answer: "They were supposed to arrive at eight." },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "If I were you, I'd ask for a refund. That's unacceptable.", options: ["Se fosse você, pediria reembolso. É inaceitável.", "Aceite a situação.", "O reembolso já foi feito."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "To sum up, sales fell slightly, but costs remained stable.", options: ["Vendas caíram um pouco; custos estáveis.", "Vendas subiram muito.", "Custos dobraram."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I couldn't agree more.", accepted: ["i couldn't agree more", "i could not agree more"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["eventually", "finalmente"], ["landlord", "proprietário"], ["overwhelmed", "sobrecarregado"], ["whereas", "enquanto"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente. A revisão diária vai reforçar o que você errou."],
    }),
  ],
};
