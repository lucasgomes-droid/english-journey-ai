import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "c2-final";

export const c2Final: Module = {
  id: M,
  level: "C2",
  order: 9,
  title: "Avaliação final C2",
  description: "Teste final do curso: proficiência em inglês.",
  lessons: [
    buildLesson("c2-final-test", M, 1, {
      kind: "test",
      title: "Teste final C2",
      objective: "Comprovar domínio de nível de proficiência em todas as habilidades.",
      xp: 300,
      passScore: 75,
      explanation: [
        {
          title: "Como funciona",
          body: "O teste final do curso. Reúne gramática de proficiência, vocabulário raro, compreensão de subtexto, pragmática e escrita. Com **75%** ou mais, você conclui a trilha **A1 → C2**. Para comprovar oficialmente, o próximo passo é um exame como o **Cambridge C2 Proficiency** ou o **IELTS**.",
        },
      ],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "___ it not for her help, we would have failed.", accepted: ["Were"] },
        { type: "fill_blank", skill: "grammar", sentence: "Be that as it ___, the deadline stands.", accepted: ["may"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Ainda bem que saímos cedo.\"", options: ["It's just as well we left early.", "It's good as we left early."], answer: 0 },
        { type: "multiple_choice", skill: "writing", prompt: "Correta:", options: ["It was raining, we stayed in.", "It was raining; we stayed in."], answer: 1 },
        { type: "fill_blank", skill: "writing", sentence: "The claim holds only ___ as the data are reliable.", accepted: ["insofar", "in so far"] },
        { type: "multiple_choice", skill: "writing", prompt: "Mais conciso:", options: ["Due to the fact that it rained, we cancelled.", "Because it rained, we cancelled."], answer: 1 },
        { type: "fill_blank", skill: "vocabulary", sentence: "I'd take ___ with the premise of your argument.", accepted: ["issue"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Exacerbate\":", options: ["Agravar", "Atenuar"], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"A blessing in disguise\":", options: ["Algo ruim que acabou sendo bom.", "Um presente embrulhado."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "The parties agreed to settle out of ___.", accepted: ["court"] },
        { type: "multiple_choice", skill: "reading", prompt: "\"Is he a good cook?\" — \"He makes excellent toast.\" Implicatura:", options: ["Não cozinha muito bem.", "É um chef excelente."], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Economical with the truth\":", options: ["Mentindo", "Muito sincero"], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Cliente diz \"That might be a bit tricky.\" Provavelmente:", options: ["Não", "Sim, com prazer"], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Catch-22\":", options: ["Situação sem saída", "Jogo de beisebol"], answer: 0 },
        { type: "multiple_choice", skill: "grammar", prompt: "Correta:", options: ["It depends of the context.", "It depends on the context."], answer: 1 },
        { type: "multiple_choice", skill: "writing", prompt: "\"Deu ruim\":", options: ["Things went south.", "It gave bad."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Por mais que eu tentasse, não consegui entender.", accepted: ["Try as I might, I couldn't understand.", "Try as I might, I could not understand.", "Try as I might, I couldn't understand it."] },
        { type: "translate", skill: "writing", prompt: "Isso não quer dizer que esteja errado; antes, está incompleto.", accepted: ["This is not to say that it is wrong; rather, it is incomplete.", "This is not to say it's wrong; rather, it's incomplete.", "That is not to say that it is wrong; rather, it is incomplete.", "This isn't to say it's wrong; rather, it's incomplete."] },
        { type: "word_order", skill: "grammar", prompt: "Basta dizer que não deu certo.", answer: "Suffice it to say it didn't work." },
        { type: "word_order", skill: "grammar", prompt: "Em conjunto, os resultados indicam uma mudança.", answer: "Taken together, the results suggest a change." },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "With respect, that conflates two quite separate issues.", options: ["Isso mistura duas questões bem diferentes.", "Isso resolve as duas questões."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Well, it's certainly a bold choice.", options: ["Provavelmente uma crítica velada.", "Um elogio entusiasmado."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Notwithstanding these limitations, the findings are robust.", accepted: ["notwithstanding these limitations the findings are robust"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["ubiquitous", "onipresente"], ["candid", "franco"], ["gist", "ideia geral"], ["caveat", "ressalva"]] },
      ],
      review: ["Parabéns por chegar até aqui. Revise os pontos onde errou e continue praticando toda semana."],
    }),
  ],
};
