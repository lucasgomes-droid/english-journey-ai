import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "b2-final";

export const b2Final: Module = {
  id: M,
  level: "B2",
  order: 9,
  title: "Avaliação final B2",
  description: "Teste de nível que libera o C1.",
  lessons: [
    buildLesson("b2-final-test", M, 1, {
      kind: "test",
      title: "Teste de nível B2",
      objective: "Mostrar que você concluiu o nível B2 e está pronto para o C1.",
      xp: 180,
      passScore: 75,
      explanation: [
        {
          title: "Como funciona",
          body: "Reúne todo o B2: tempos avançados, condicionais, argumentação, inglês profissional, vocabulário, mídia, fala autêntica e estilo. Com **75%** ou mais, você passa para o **C1**.",
        },
      ],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "By the end of the year, we'll ___ opened two new offices.", accepted: ["have"] },
        { type: "fill_blank", skill: "grammar", sentence: "Her eyes were red. She had ___ crying.", accepted: ["been"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"The train is ___ to arrive at 9:45.\" (previsto)", options: ["due", "about", "bound"], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "If you had told me, I would ___ helped.", accepted: ["have"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"If I had taken the job, I ___ in London now.\"", options: ["would live", "would have lived", "will live"], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "I wish I ___ (not / say) that.", accepted: ["hadn't said", "had not said"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["Despite it rained, we went out.", "Despite the rain, we went out."], answer: 1 },
        { type: "multiple_choice", skill: "writing", prompt: "Afirmação com hedging:", options: ["This proves that everyone is wrong.", "The data suggest that the approach may be effective."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "The launch has been pushed ___ to July.", accepted: ["back"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Fazer um esforço\":", options: ["do an effort", "make an effort"], answer: 1 },
        { type: "fill_blank", skill: "vocabulary", sentence: "We've run out ___ paper.", accepted: ["of"] },
        { type: "fill_blank", skill: "grammar", sentence: "He denied ___ (steal) the car.", accepted: ["stealing", "having stolen"] },
        { type: "fill_blank", skill: "grammar", sentence: "The suspect is believed ___ have left the country.", accepted: ["to"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Actually\":", options: ["Na verdade", "Atualmente"], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "Never ___ I seen such a beautiful place.", accepted: ["have"] },
        { type: "fill_blank", skill: "grammar", sentence: "It was my brother ___ found the solution.", accepted: ["who", "that"] },
        { type: "translate", skill: "writing", prompt: "Mal sabia eu que tudo ia mudar.", accepted: ["Little did I know that everything would change.", "Little did I know everything would change.", "Little did I know that everything was going to change."] },
        { type: "translate", skill: "writing", prompt: "Os benefícios superam as desvantagens.", accepted: ["The benefits outweigh the drawbacks.", "The benefits outweigh the disadvantages.", "The advantages outweigh the disadvantages."] },
        { type: "word_order", skill: "grammar", prompt: "O que eu preciso é de mais tempo.", answer: "What I need is more time." },
        { type: "word_order", skill: "grammar", prompt: "Tendo terminado o relatório, ela foi para casa.", answer: "Having finished the report, she went home." },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I take your point. Nevertheless, the evidence suggests otherwise.", options: ["Entende o ponto, mas as evidências dizem o contrário.", "Concorda totalmente.", "Não tem evidências."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Oh, fantastic. The printer's broken again.", options: ["Sarcasmo: está irritado.", "Está feliz com a impressora.", "A impressora foi consertada."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "With all due respect, that's not the point.", accepted: ["with all due respect that's not the point", "with all due respect that is not the point"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["on the verge of", "à beira de"], ["hindsight", "olhando para trás"], ["biased", "tendencioso"], ["purchase", "compra"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente. A revisão diária vai reforçar o que você errou."],
    }),
  ],
};
