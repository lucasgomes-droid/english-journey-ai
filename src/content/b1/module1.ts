import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "b1-m1";

export const b1Module1: Module = {
  id: M,
  level: "B1",
  order: 1,
  title: "Narrativas",
  description: "Contar histórias com sequência de tempo, conectivos e relatar o que alguém disse.",
  lessons: [
    buildLesson("b1-m1-l1", M, 1, {
      title: "Passado perfeito",
      objective: "Mostrar que algo aconteceu antes de outro fato no passado.",
      explanation: [
        {
          title: "had + particípio",
          body: "O **past perfect** é o \"passado do passado\": **When I got to the station, the train had already left.** (Quando cheguei, o trem já tinha saído.) Primeiro o trem saiu; depois eu cheguei.",
          table: {
            head: ["Afirmativa", "Negativa", "Pergunta"],
            rows: [
              ["I had finished.", "I hadn't finished.", "Had you finished?"],
              ["She'd left.", "She hadn't left.", "Had she left?"],
            ],
          },
        },
        {
          title: "Quando é necessário",
          body: "Use quando a ordem não fica clara sozinha. Com **after** e **before** a ordem já está dita, então o passado simples também serve: **After I ate, I went out.** Compare: **When I arrived, she left.** (saiu na hora) × **When I arrived, she had left.** (já tinha saído).",
        },
        {
          title: "Expressões que combinam",
          body: "**already** (já), **never ... before** (nunca antes), **by the time** (quando, até o momento em que), **just** (tinha acabado de).",
        },
      ],
      vocabulary: [
        { en: "had already", pt: "já tinha", say: "réd ól-RÉ-di" },
        { en: "by the time", pt: "quando / até o momento em que", say: "bái dhe TÁIM" },
        { en: "realize", pt: "perceber", say: "RÍ-a-láiz" },
        { en: "miss (the train)", pt: "perder (o trem)", say: "MÍS" },
        { en: "leave (left)", pt: "sair / deixar", say: "LÍIV / LÉFT" },
        { en: "forget (forgotten)", pt: "esquecer", say: "for-GÓ-ten" },
        { en: "lock", pt: "trancar", say: "LÓK" },
        { en: "before", pt: "antes", say: "bi-FÓR" },
        { en: "turn out", pt: "acabar sendo / revelar-se", say: "TÂRN ÁUT" },
      ],
      examples: [
        { en: "By the time we arrived, the show had already started.", pt: "Quando chegamos, o show já tinha começado." },
        { en: "I realized I had left my keys at home.", pt: "Percebi que tinha deixado as chaves em casa." },
        { en: "She had never seen snow before that trip.", pt: "Ela nunca tinha visto neve antes daquela viagem." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "When I got home, my family ___ already eaten.", translation: "Quando cheguei em casa, minha família já tinha comido.", accepted: ["had"] },
        { type: "fill_blank", skill: "grammar", sentence: "I ___ (not / see) the movie before, so it was all new to me.", accepted: ["hadn't seen", "had not seen"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Quando cheguei à festa, o Pedro já tinha ido embora.\"", options: ["When I arrived at the party, Pedro left.", "When I arrived at the party, Pedro had already left.", "When I had arrived at the party, Pedro already left."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Percebi que tinha esquecido a senha.", accepted: ["I realized I had forgotten the password.", "I realized that I had forgotten the password.", "I realized I had forgotten the password.", "I realized I'd forgotten the password.", "I realized I had forgotten my password.", "I realized that I had forgotten my password."] },
        { type: "word_order", skill: "grammar", prompt: "Quando o médico chegou, o paciente já tinha acordado.", answer: "When the doctor arrived, the patient had already woken up.", distractors: ["has"] },
        { type: "multiple_choice", skill: "reading", prompt: "\"When we got to the movies, the movie had started.\" O que aconteceu primeiro?", options: ["Chegamos ao cinema.", "O filme começou.", "Aconteceram juntos."], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I had never flown before I moved to Canada.", options: ["Nunca tinha andado de avião antes de me mudar para o Canadá.", "Voei para o Canadá muitas vezes.", "Nunca fui ao Canadá."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "The train had already left.", accepted: ["the train had already left"] },
      ],
      conversation: {
        goal: "Conte uma situação em que você chegou tarde demais ou descobriu algo que já tinha acontecido.",
        starter: "Have you ever arrived somewhere and found that something had already happened? Tell me about it.",
      },
      review: ["had + particípio: o passado antes do passado.", "by the time / already / never ... before.", "Com after/before, o passado simples também serve."],
    }),

    buildLesson("b1-m1-l2", M, 2, {
      title: "Tempos narrativos",
      objective: "Narrar com riqueza combinando passado simples, contínuo e perfeito.",
      explanation: [
        {
          title: "Cada tempo tem uma função",
          body: "**Passado contínuo** monta o cenário: **It was raining and people were rushing home.** **Passado simples** conta os fatos principais em ordem: **Suddenly, a man stopped me.** **Passado perfeito** volta no tempo para explicar: **I had seen him somewhere before.**",
        },
        {
          title: "Um exemplo completo",
          body: "**I was waiting for the bus when a woman asked me for directions. I had just moved to the city, so I didn't know the way.** Repare como o leitor entende tudo sem você dizer \"primeiro\" e \"depois\".",
        },
      ],
      vocabulary: [
        { en: "rush", pt: "correr / ter pressa", say: "RÂSH" },
        { en: "notice", pt: "notar", say: "NÔU-tis" },
        { en: "stranger", pt: "desconhecido", say: "STRÊIN-djer" },
        { en: "on my way", pt: "a caminho", say: "on mái UÊI" },
        { en: "it turned out", pt: "no fim das contas", say: "it TÂRND ÁUT" },
        { en: "embarrassed", pt: "envergonhado", say: "em-BÉ-râst" },
        { en: "scene", pt: "cena / cenário", say: "SÍIN" },
        { en: "mess", pt: "bagunça", say: "MÉS" },
        { en: "shout", pt: "gritar", say: "SHÁUT" },
      ],
      examples: [
        { en: "It was getting dark and I was walking home alone.", pt: "Estava escurecendo e eu voltava para casa sozinho." },
        { en: "Suddenly I noticed that someone had followed me.", pt: "De repente notei que alguém tinha me seguido." },
        { en: "It turned out he wanted to return my wallet.", pt: "No fim, ele só queria devolver minha carteira." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Cenário da história: \"The sun ___ and the birds were singing.\"", options: ["shone", "was shining", "had shone"], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "While we ___ (have) dinner, the lights went out.", accepted: ["were having"] },
        { type: "fill_blank", skill: "grammar", sentence: "I couldn't pay because I ___ (lose) my wallet earlier that day.", accepted: ["had lost"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Qual frase conta melhor a história?", options: ["I was arriving at the office and I was seeing that someone was breaking the window.", "When I arrived at the office, I saw that someone had broken the window.", "When I had arrived at the office, I was seeing that someone broke the window."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "No fim das contas, ele era meu vizinho.", accepted: ["It turned out he was my neighbor.", "It turned out that he was my neighbor.", "It turned out he was my neighbor.", "It turned out that he was my neighbor."] },
        { type: "word_order", skill: "grammar", prompt: "Estava chovendo quando saímos de casa.", answer: "It was raining when we left home.", distractors: ["had"] },
        { type: "listening", skill: "listening", prompt: "Ouça. Por que a pessoa estava envergonhada?", audio: "I felt so embarrassed. I had forgotten her name, and she was introducing me to everyone.", options: ["Tinha esquecido o nome dela.", "Chegou atrasada.", "Derrubou café nela."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It turned out to be a great day.", accepted: ["it turned out to be a great day"] },
      ],
      conversation: {
        goal: "Conte uma história real com cenário (passado contínuo), fatos (passado simples) e um flashback (passado perfeito).",
        starter: "Tell me about a day that didn't go as planned. Set the scene: where were you and what was happening?",
      },
      review: ["Contínuo: cenário. Simples: fatos em ordem. Perfeito: volta no tempo.", "It turned out (that)... para a reviravolta."],
    }),

    buildLesson("b1-m1-l3", M, 3, {
      title: "Conectivos de narrativa",
      objective: "Ligar ideias numa história com while, as soon as, by the time e outros.",
      explanation: [
        {
          title: "Tempo",
          body: "**as soon as** (assim que): **As soon as I saw her, I knew.** · **while / as** (enquanto) · **by the time** (até quando / quando já) · **until** (até que) · **eventually** (finalmente, depois de muito tempo).",
        },
        {
          title: "Contraste e causa",
          body: "**although / even though** (embora) · **however** (no entanto, no começo da frase seguinte) · **so** (então) · **because of** + substantivo: **because of the rain**.",
        },
        {
          title: "Falso amigo",
          body: "**eventually** = finalmente, no fim. \"Eventualmente\" (às vezes) é **occasionally / sometimes**.",
        },
      ],
      vocabulary: [
        { en: "as soon as", pt: "assim que", say: "éz SÚUN éz" },
        { en: "until", pt: "até (que)", say: "ân-TÍL" },
        { en: "eventually", pt: "finalmente / no fim", say: "i-VÉN-tchu-a-li" },
        { en: "although", pt: "embora", say: "ól-DHÔU" },
        { en: "however", pt: "no entanto", say: "rau-É-ver" },
        { en: "meanwhile", pt: "enquanto isso", say: "MÍIN-uáil" },
        { en: "because of", pt: "por causa de", say: "bi-CÓZ ov" },
        { en: "in the end", pt: "no final", say: "in dhi ÉND" },
        { en: "afterwards", pt: "depois", say: "ÉF-ter-uordz" },
      ],
      examples: [
        { en: "As soon as I got the email, I called my boss.", pt: "Assim que recebi o e-mail, liguei para meu chefe." },
        { en: "We waited for hours. Eventually, the bus arrived.", pt: "Esperamos horas. Finalmente, o ônibus chegou." },
        { en: "Although it was late, we decided to go out.", pt: "Embora fosse tarde, decidimos sair." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Eventually, she found a job.\"", options: ["Às vezes ela achava emprego.", "Finalmente, ela encontrou um emprego.", "Eventualmente, talvez ela ache um emprego."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "Call me as ___ as you land.", translation: "Me liga assim que pousar.", accepted: ["soon"] },
        { type: "fill_blank", skill: "grammar", sentence: "We stayed ___ the end of the party.", translation: "Ficamos até o fim da festa.", accepted: ["until", "till"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"The flight was delayed ___ the storm.\"", options: ["because", "because of", "although"], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Embora estivesse cansado, ele terminou o trabalho.", accepted: ["Although he was tired, he finished the work.", "Although he was tired, he finished the job.", "Even though he was tired, he finished the work.", "Even though he was tired, he finished the job."] },
        { type: "word_order", skill: "grammar", prompt: "Enquanto isso, a polícia estava procurando o carro.", answer: "Meanwhile, the police were looking for the car.", distractors: ["while"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "By the time the firefighters arrived, the neighbors had already put out the fire.", options: ["Os vizinhos apagaram o fogo antes de os bombeiros chegarem.", "Os bombeiros apagaram o fogo.", "Ninguém apagou o fogo."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "In the end, everything was fine.", accepted: ["in the end everything was fine"] },
      ],
      conversation: {
        goal: "Conte como você conseguiu algo difícil (um emprego, uma viagem, uma mudança) usando as soon as, although e eventually.",
        starter: "Tell me about something that took a long time to achieve. What happened in the end?",
      },
      review: ["as soon as, until, by the time, meanwhile.", "although / however / because of.", "eventually = finalmente (não 'às vezes')."],
    }),

    buildLesson("b1-m1-l4", M, 4, {
      title: "Discurso indireto I",
      objective: "Relatar o que alguém disse com said e told.",
      explanation: [
        {
          title: "O tempo verbal volta um passo",
          body: "\"I'm tired.\" → **She said (that) she was tired.** · \"I've finished.\" → **He said he had finished.** · \"I'll call you.\" → **She said she would call me.** · \"I can help.\" → **He said he could help.**",
          table: {
            head: ["Frase direta", "Relatada"],
            rows: [
              ["am / is / are", "was / were"],
              ["do / does", "did"],
              ["did / have done", "had done"],
              ["will", "would"],
              ["can", "could"],
            ],
          },
        },
        {
          title: "Say × tell",
          body: "**tell** precisa de quem ouviu: **She told me (that)...** **say** não: **She said (that)...** Nunca ~~She said me~~. Pronomes e tempo também mudam: today → that day, here → there.",
        },
      ],
      vocabulary: [
        { en: "said (say)", pt: "disse (dizer)", say: "SÉD" },
        { en: "told (tell)", pt: "contou / disse a", say: "TÔULD" },
        { en: "mention", pt: "mencionar", say: "MÉN-shan" },
        { en: "explain", pt: "explicar", say: "ex-PLÊIN" },
        { en: "promise", pt: "prometer", say: "PRÓ-mis" },
        { en: "according to", pt: "de acordo com", say: "a-CÓR-ding tu" },
        { en: "rumor", pt: "boato", say: "RÚ-mer" },
        { en: "admit", pt: "admitir", say: "ad-MÍT" },
        { en: "complain", pt: "reclamar", say: "com-PLÊIN" },
      ],
      examples: [
        { en: "She said she was moving to Lisbon.", pt: "Ela disse que estava se mudando para Lisboa." },
        { en: "He told me he had lost his job.", pt: "Ele me contou que tinha perdido o emprego." },
        { en: "They promised they would help us.", pt: "Eles prometeram que iam nos ajudar." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["She said me she was busy.", "She told me she was busy.", "She told she was busy."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "\"I love this city.\" → He said he ___ that city.", accepted: ["loved"] },
        { type: "fill_blank", skill: "grammar", sentence: "\"I'll be late.\" → She said she ___ be late.", accepted: ["would"] },
        { type: "fill_blank", skill: "grammar", sentence: "\"We've bought a house.\" → They told us they ___ bought a house.", accepted: ["had"] },
        { type: "translate", skill: "writing", prompt: "Ele disse que não podia vir.", accepted: ["He said he couldn't come.", "He said that he couldn't come.", "He said he could not come.", "He said that he could not come."] },
        { type: "word_order", skill: "grammar", prompt: "Ela me contou que estava grávida.", answer: "She told me she was pregnant.", distractors: ["said"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha o que o chefe disse.", audio: "My boss told me I could leave early on Friday.", options: ["Que eu podia sair mais cedo na sexta.", "Que eu tinha que ficar até tarde.", "Que a reunião era na sexta."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "She said she was tired.", accepted: ["she said she was tired", "she said that she was tired"] },
      ],
      conversation: {
        goal: "Conte ao professor uma conversa interessante que você teve esta semana, relatando o que a pessoa disse.",
        starter: "Did anyone tell you anything interesting this week? What did they say?",
      },
      review: ["O tempo volta um passo: is → was, will → would, can → could.", "tell + pessoa; say sem pessoa.", "today → that day; here → there."],
    }),

    buildLesson("b1-m1-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Narrativas",
      objective: "Comprovar que você conta histórias e relata falas.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "By the time I got there, everyone ___ (go) home.", accepted: ["had gone"] },
        { type: "fill_blank", skill: "grammar", sentence: "I ___ (walk) to work when I saw the accident.", accepted: ["was walking"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Eventually\" significa:", options: ["Às vezes", "Finalmente / no fim", "Eventualmente / talvez"], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "\"I can drive.\" → She said she ___ drive.", options: ["can", "could", "would"], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Assim que cheguei, comecei a trabalhar.", accepted: ["As soon as I arrived, I started working.", "As soon as I arrived, I started to work.", "As soon as I got there, I started working.", "As soon as I arrived, I began working."] },
        { type: "word_order", skill: "grammar", prompt: "Ele me disse que tinha visto o filme.", answer: "He told me he had seen the movie." },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["Although it was cold, we went swimming.", "Although it was cold, but we went swimming.", "However it was cold, we went swimming."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I realized I had left my passport at the hotel.", options: ["Percebi que tinha deixado o passaporte no hotel.", "Perdi o passaporte no aeroporto.", "O hotel ficou com o passaporte."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "He said he would call me.", accepted: ["he said he would call me", "he said that he would call me"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["as soon as", "assim que"], ["meanwhile", "enquanto isso"], ["although", "embora"], ["until", "até que"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
