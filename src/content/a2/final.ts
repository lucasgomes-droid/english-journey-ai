import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "a2-final";

export const a2Final: Module = {
  id: M,
  level: "A2",
  order: 9,
  title: "Avaliação final A2",
  description: "Teste de nível que libera o B1.",
  lessons: [
    buildLesson("a2-final-test", M, 1, {
      kind: "test",
      title: "Teste de nível A2",
      objective: "Mostrar que você concluiu o nível A2 e está pronto para o B1.",
      xp: 120,
      passScore: 75,
      explanation: [
        {
          title: "Como funciona",
          body: "Este teste reúne todo o conteúdo do A2: passado, futuro, comparações, conselhos, viagem, trabalho e relações. Com **75%** ou mais, seu nível passa para **B1**. Depois do teste, faça uma **ligação com o professor** para treinar tudo falando.",
        },
      ],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "While I ___ (wait) for the bus, I met an old friend.", accepted: ["was waiting"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["Have you ever been to Japan?", "Did you ever been to Japan?", "Have you ever went to Japan?"], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Eu ainda não terminei o relatório.", accepted: ["I haven't finished the report yet.", "I have not finished the report yet."] },
        { type: "multiple_choice", skill: "grammar", prompt: "Já comprei as passagens: \"___ to Lisbon in June.\"", options: ["I'll go", "I'm going", "I go"], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "This is the ___ (good) restaurant in town.", accepted: ["best"] },
        { type: "fill_blank", skill: "grammar", sentence: "My new job isn't as stressful ___ my old one.", accepted: ["as"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Não precisa vir amanhã.\"", options: ["You mustn't come tomorrow.", "You don't have to come tomorrow.", "You shouldn't come tomorrow."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Você deveria descansar mais.", accepted: ["You should rest more.", "You should get more rest."] },
        { type: "fill_blank", skill: "grammar", sentence: "Would you mind ___ (close) the window?", accepted: ["closing"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Pergunta educada correta:", options: ["Could you tell me where is the station?", "Could you tell me where the station is?"], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Moro aqui há três anos.", accepted: ["I've lived here for three years.", "I have lived here for three years.", "I've been living here for three years.", "I have been living here for three years."] },
        { type: "fill_blank", skill: "grammar", sentence: "I ___ to play the piano, but I stopped.", accepted: ["used"] },
        { type: "multiple_choice", skill: "grammar", prompt: "How ___ money do you need?", options: ["many", "much"], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "If it ___ (be) sunny tomorrow, we'll go to the beach.", accepted: ["is", "'s"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Este quadro foi pintado em 1890.\"", options: ["This painting painted in 1890.", "This painting was painted in 1890.", "This painting is paint in 1890."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "I really enjoy ___ (travel) with friends.", accepted: ["traveling", "traveling"] },
        { type: "word_order", skill: "grammar", prompt: "Eu me dou bem com meus colegas.", answer: "I get on well with my colleagues." },
        { type: "word_order", skill: "grammar", prompt: "Você gostaria de jantar com a gente?", answer: "Would you like to have dinner with us?" },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I'm afraid your flight has been canceled. We can put you on the next one.", options: ["O voo foi cancelado; podem colocar você no próximo.", "O voo está no horário.", "O voo foi adiantado."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "If I were you, I'd talk to her before Friday.", options: ["Se eu fosse você, falaria com ela antes de sexta.", "Vou falar com ela na sexta.", "Ela falou comigo na sexta."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Guess what! I've got a new job!", accepted: ["guess what i've got a new job", "guess what i have got a new job"] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Could you spell that, please?", accepted: ["could you spell that please"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["deadline", "prazo"], ["luggage", "bagagem"], ["headache", "dor de cabeça"], ["neighbor", "vizinho"]] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["hang out", "sair junto"], ["borrow", "pegar emprestado"], ["unless", "a menos que"], ["nowhere", "lugar nenhum"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente. A revisão diária vai reforçar o que você errou."],
    }),
  ],
};
