import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "c1-final";

export const c1Final: Module = {
  id: M,
  level: "C1",
  order: 9,
  title: "Avaliação final C1",
  description: "Teste de nível que libera o C2.",
  lessons: [
    buildLesson("c1-final-test", M, 1, {
      kind: "test",
      title: "Teste de nível C1",
      objective: "Mostrar que você concluiu o nível C1 e está pronto para o C2.",
      xp: 220,
      passScore: 75,
      explanation: [
        {
          title: "Como funciona",
          body: "Reúne todo o C1: precisão gramatical, escrita acadêmica, persuasão, vocabulário avançado, inglês corporativo, compreensão, cultura e estilo. Com **75%** ou mais, você passa para o **C2**.",
        },
      ],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "___ I known, I would have acted differently.", accepted: ["Had"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"It is essential that every member ___ informed.\"", options: ["is", "be", "will be"], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "Você comprou ingressos e o show era grátis:", options: ["I needn't have bought tickets.", "I didn't need to buy tickets."], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "Is it going to rain? — I hope ___. (que não)", accepted: ["not"] },
        { type: "multiple_choice", skill: "writing", prompt: "Mais acadêmico:", options: ["We asked loads of people.", "A large sample of participants was surveyed."], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Verbo de relato com distanciamento:", options: ["claims", "demonstrates"], answer: 0 },
        { type: "fill_blank", skill: "writing", sentence: "It is recommended that the system ___ updated.", accepted: ["be"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"That argument doesn't hold water.\"", options: ["Não se sustenta.", "É muito convincente."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Exports account ___ half of our revenue.", accepted: ["for"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Make ends meet\":", options: ["Fechar as contas do mês", "Fazer amigos"], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Collocation natural:", options: ["deeply concerned", "strongly concerned"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "We'll lower the price, ___ that you sign for two years.", accepted: ["provided", "providing"] },
        { type: "multiple_choice", skill: "reading", prompt: "\"A mere 3% of the budget...\" O autor acha 3%:", options: ["Pouco", "Muito"], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Flat\" (UK) =", options: ["apartment", "plain"], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "Strange ___ it may seem, I miss the rain.", accepted: ["as"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Pretendo mudar de emprego.\"", options: ["I intend to change jobs.", "I pretend to change jobs."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Caso você precise de algo, me avise. (com inversão)", accepted: ["Should you need anything, let me know.", "Should you need anything, please let me know."] },
        { type: "translate", skill: "writing", prompt: "Ainda não está claro se vai funcionar.", accepted: ["It remains unclear whether it will work.", "It is still unclear whether it will work.", "It's still unclear whether it will work.", "It remains unclear if it will work."] },
        { type: "word_order", skill: "grammar", prompt: "Só então percebemos o problema.", answer: "Only then did we realize the problem." },
        { type: "word_order", skill: "grammar", prompt: "A última coisa de que precisamos é outro atraso.", answer: "The last thing we need is another delay." },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "We take full responsibility, and we've taken immediate steps to fix the issue.", options: ["Assumem a responsabilidade e já agiram para resolver.", "Culpam o fornecedor.", "Não vão fazer nada."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Admittedly, the plan is ambitious. That said, it's entirely achievable.", options: ["É ambicioso, mas totalmente alcançável.", "É impossível.", "É modesto demais."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I was wondering if you could help.", accepted: ["i was wondering if you could help"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["stalemate", "impasse"], ["allegedly", "supostamente"], ["thrifty", "econômico"], ["feasible", "viável"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente. A revisão diária vai reforçar o que você errou."],
    }),
  ],
};
