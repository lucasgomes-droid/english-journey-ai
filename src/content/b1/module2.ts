import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "b1-m2";

export const b1Module2: Module = {
  id: M,
  level: "B1",
  order: 2,
  title: "Hipóteses",
  description: "Situações imaginárias, desejos e condições de vários tipos.",
  lessons: [
    buildLesson("b1-m2-l1", M, 1, {
      title: "Segunda condicional",
      objective: "Falar de situações imaginárias ou pouco prováveis.",
      explanation: [
        {
          title: "If + passado, would + verbo",
          body: "Para o que é imaginário no presente ou futuro: **If I had more money, I would travel more.** (Se eu tivesse mais dinheiro, viajaria mais.) O passado aqui não fala do passado: indica que é hipotético.",
        },
        {
          title: "Were para todos",
          body: "Com o verbo be, o padrão (e o mais elegante) é **were** para todas as pessoas: **If I were you...**, **If she were here...** Na fala informal você vai ouvir \"if I was\".",
        },
        {
          title: "Primeira × segunda",
          body: "**If I get the job, I'll move.** (é possível, estou concorrendo) × **If I got a job in Japan, I'd move.** (é imaginário, improvável).",
        },
      ],
      vocabulary: [
        { en: "would", pt: "(futuro do pretérito: -ria)", say: "UÚD" },
        { en: "I'd", pt: "eu (iria, faria...)", say: "ÁID" },
        { en: "win the lottery", pt: "ganhar na loteria", say: "uín dhe LÓ-te-ri" },
        { en: "afford", pt: "ter condições de pagar", say: "a-FÓRD" },
        { en: "quit", pt: "largar / pedir demissão", say: "KUÍT" },
        { en: "imagine", pt: "imaginar", say: "i-MÉ-djin" },
        { en: "anywhere", pt: "qualquer lugar", say: "É-ni-uér" },
        { en: "superpower", pt: "superpoder", say: "SÚ-per-páuer" },
        { en: "likely", pt: "provável", say: "LÁIK-li" },
      ],
      examples: [
        { en: "If I won the lottery, I'd buy a house by the sea.", pt: "Se eu ganhasse na loteria, compraria uma casa na praia." },
        { en: "What would you do if you could live anywhere?", pt: "O que você faria se pudesse morar em qualquer lugar?" },
        { en: "If I were you, I wouldn't quit now.", pt: "Se eu fosse você, não pediria demissão agora." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "If I ___ (have) a car, I would drive to work.", accepted: ["had"] },
        { type: "fill_blank", skill: "grammar", sentence: "If she spoke English, she ___ get a better job.", accepted: ["would", "could"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["If I would know, I would tell you.", "If I knew, I would tell you.", "If I know, I would tell you."], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "Situação real e possível (você está concorrendo à vaga):", options: ["If I get the job, I'll move to Recife.", "If I got the job, I'd move to Recife."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "O que você faria se ganhasse na loteria?", accepted: ["What would you do if you won the lottery?"] },
        { type: "word_order", skill: "grammar", prompt: "Se eu fosse você, eu aceitaria a oferta.", answer: "If I were you, I would accept the offer.", distractors: ["will"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "If I could afford it, I'd quit my job and travel.", options: ["Se pudesse pagar, largaria o emprego e viajaria.", "Larguei o emprego para viajar.", "Não gosto de viajar."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "If I were you, I'd wait.", accepted: ["if i were you i'd wait", "if i were you i would wait"] },
      ],
      conversation: {
        goal: "Responda perguntas imaginárias do professor e faça as suas: superpoderes, loteria, morar em outro país.",
        starter: "If you could have one superpower, what would it be and why?",
      },
      review: ["If + passado, would + verbo: imaginário.", "If I were you... (conselho).", "Possível: 1ª condicional; imaginário: 2ª."],
    }),

    buildLesson("b1-m2-l2", M, 2, {
      title: "Wish e if only",
      objective: "Expressar desejos e arrependimentos sobre o presente.",
      explanation: [
        {
          title: "Wish + passado",
          body: "Para desejar que o presente fosse diferente: **I wish I had more time.** (Queria ter mais tempo.) **I wish I were taller.** **I wish I could speak French.**",
        },
        {
          title: "If only",
          body: "**If only** é mais intenso, quase um lamento: **If only I knew her number!** (Se ao menos eu soubesse o número dela!)",
        },
        {
          title: "Wish + would",
          body: "Para reclamar do comportamento de alguém: **I wish you would stop interrupting me.** (Queria que você parasse de me interromper.)",
        },
      ],
      vocabulary: [
        { en: "wish", pt: "desejar / queria que", say: "UÍSH" },
        { en: "if only", pt: "se ao menos", say: "if ÔUN-li" },
        { en: "regret", pt: "arrepender-se / arrependimento", say: "ri-GRÉT" },
        { en: "spare time", pt: "tempo livre", say: "SPÉR TÁIM" },
        { en: "interrupt", pt: "interromper", say: "in-te-RÂPT" },
        { en: "complain", pt: "reclamar", say: "com-PLÊIN" },
        { en: "fluent", pt: "fluente", say: "FLÚ-ent" },
        { en: "noisy", pt: "barulhento", say: "NÓI-zi" },
      ],
      examples: [
        { en: "I wish I could speak English fluently.", pt: "Queria falar inglês fluentemente." },
        { en: "If only it weren't so expensive!", pt: "Se ao menos não fosse tão caro!" },
        { en: "I wish my neighbors would be quieter.", pt: "Queria que meus vizinhos fizessem menos barulho." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "I wish I ___ (live) closer to work.", accepted: ["lived"] },
        { type: "fill_blank", skill: "grammar", sentence: "I wish I ___ play the guitar. (soubesse/pudesse)", accepted: ["could"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Queria que você parasse de reclamar.\"", options: ["I wish you stop complaining.", "I wish you would stop complaining.", "I wish you will stop complaining."], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["I wish I am on holiday.", "I wish I were on holiday.", "I wish I will be on holiday."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Queria ter mais tempo livre.", accepted: ["I wish I had more spare time.", "I wish I had more free time."] },
        { type: "word_order", skill: "grammar", prompt: "Se ao menos eu soubesse a resposta!", answer: "If only I knew the answer!", distractors: ["know"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I wish it wasn't raining. I wanted to go to the beach.", options: ["Queria que não estivesse chovendo.", "Adoro quando chove.", "Fui à praia na chuva."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I wish I had more time.", accepted: ["i wish i had more time"] },
      ],
      conversation: {
        goal: "Fale de três coisas que você queria que fossem diferentes na sua vida hoje e por quê.",
        starter: "If you could change three things about your life right now, what would they be? Start with 'I wish...'.",
      },
      review: ["wish + passado: presente diferente.", "wish + could: habilidade.", "wish + would: reclamar de alguém."],
    }),

    buildLesson("b1-m2-l3", M, 3, {
      title: "Zero e primeira condicional",
      objective: "Diferenciar fatos gerais de possibilidades reais.",
      explanation: [
        {
          title: "Zero: sempre verdade",
          body: "**If/When + presente, presente**: verdades gerais e regras. **If you heat ice, it melts.** **If I drink coffee at night, I can't sleep.** Aqui \"if\" ≈ \"when\" (sempre que).",
        },
        {
          title: "Primeira: resultado provável no futuro",
          body: "**If + presente, will**: **If you press this button, the machine will start.** (uma situação específica, futura).",
        },
        {
          title: "Variações",
          body: "Imperativo: **If you see Ana, tell her to call me.** Modais: **If it rains, we might stay home.**",
        },
      ],
      vocabulary: [
        { en: "melt", pt: "derreter", say: "MÉLT" },
        { en: "boil", pt: "ferver", say: "BÓIL" },
        { en: "press", pt: "apertar", say: "PRÉS" },
        { en: "plant", pt: "planta / plantar", say: "PLÉNT" },
        { en: "water", pt: "regar / água", say: "UÓ-ter" },
        { en: "die", pt: "morrer", say: "DÁI" },
        { en: "might", pt: "talvez / poderia", say: "MÁIT" },
        { en: "otherwise", pt: "senão / caso contrário", say: "Â-dher-uáiz" },
      ],
      examples: [
        { en: "If you don't water plants, they die.", pt: "Se você não rega as plantas, elas morrem." },
        { en: "If you leave now, you'll catch the bus.", pt: "Se sair agora, você pega o ônibus." },
        { en: "If you see Paulo, tell him I said hi.", pt: "Se vir o Paulo, manda um oi." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Fato científico:", options: ["If you heat water to 100°C, it boils.", "If you heated water to 100°C, it would boil.", "If you will heat water, it boils."], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "If I eat too much sugar, I ___ (get) a headache. (sempre)", accepted: ["get"] },
        { type: "fill_blank", skill: "grammar", sentence: "If you ___ (study) tonight, you'll pass the test tomorrow.", accepted: ["study"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Se chover, talvez a gente fique em casa.\"", options: ["If it rains, we might stay home.", "If it might rain, we stay home.", "If it rained, we might stayed home."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Se você vir a Ana, diga para ela me ligar.", accepted: ["If you see Ana, tell her to call me.", "If you see Ana, ask her to call me."] },
        { type: "word_order", skill: "grammar", prompt: "Corra, senão vamos perder o voo.", answer: "Hurry, otherwise we'll miss the flight.", distractors: ["unless"] },
        { type: "listening", skill: "listening", prompt: "Ouça. É um fato geral ou uma situação específica?", audio: "When I drink coffee after six, I can't sleep.", options: ["Fato geral (acontece sempre).", "Situação específica de amanhã.", "Situação imaginária."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "If you press this button, it starts.", accepted: ["if you press this button it starts"] },
      ],
      conversation: {
        goal: "Explique ao professor regras da sua casa ou trabalho (zero) e planos que dependem de algo (primeira).",
        starter: "What happens at your workplace if someone is late? And what will you do if it rains this weekend?",
      },
      review: ["Zero: if + presente, presente (sempre).", "Primeira: if + presente, will (futuro provável).", "Também: if + imperativo / might."],
    }),

    buildLesson("b1-m2-l4", M, 4, {
      title: "Unless, in case, as long as",
      objective: "Usar conjunções condicionais variadas.",
      explanation: [
        {
          title: "Unless = if not",
          body: "**I'll go unless it rains.** = I'll go if it doesn't rain. Cuidado: não use outra negativa: ~~unless it doesn't rain~~.",
        },
        {
          title: "As long as / provided that",
          body: "= desde que, contanto que: **You can borrow my car as long as you bring it back tonight.** **Provided that** é mais formal.",
        },
        {
          title: "In case",
          body: "= por precaução, caso: **Take an umbrella in case it rains.** (Leve, para o caso de chover.) Não é o mesmo que if: com \"in case\" você leva o guarda-chuva de qualquer jeito.",
        },
      ],
      vocabulary: [
        { en: "unless", pt: "a menos que", say: "ân-LÉS" },
        { en: "as long as", pt: "desde que", say: "éz LÓNG éz" },
        { en: "provided that", pt: "contanto que (formal)", say: "pro-VÁI-did dhét" },
        { en: "in case", pt: "caso / por precaução", say: "in KÊIS" },
        { en: "otherwise", pt: "senão", say: "Â-dher-uáiz" },
        { en: "condition", pt: "condição", say: "con-DÍ-shan" },
        { en: "deposit", pt: "depósito / caução", say: "di-PÓ-zit" },
        { en: "charger", pt: "carregador", say: "TCHÁR-djer" },
      ],
      examples: [
        { en: "We won't finish on time unless we get more help.", pt: "Não vamos terminar no prazo a menos que tenhamos mais ajuda." },
        { en: "You can stay as long as you keep the room clean.", pt: "Pode ficar desde que mantenha o quarto limpo." },
        { en: "Take your charger in case your battery dies.", pt: "Leve o carregador caso a bateria acabe." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"I won't go ___ you come with me.\"", options: ["unless", "in case", "as long as"], answer: 0 },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Bring some cash ___ they don't accept cards.\"", options: ["unless", "in case", "provided"], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "You can use my laptop as ___ as you're careful.", accepted: ["long"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["Unless it doesn't rain, we'll play.", "Unless it rains, we'll play.", "Unless it will rain, we'll play."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Leve um casaco caso esfrie.", accepted: ["Take a jacket in case it gets cold.", "Take a coat in case it gets cold.", "Bring a jacket in case it gets cold.", "Bring a coat in case it gets cold."] },
        { type: "word_order", skill: "grammar", prompt: "Você pode sair desde que volte antes da meia-noite.", answer: "You can go out as long as you come back before midnight.", distractors: ["unless"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "You'll get your deposit back provided that there's no damage.", options: ["Você recebe o depósito de volta desde que não haja estragos.", "Você perde o depósito de qualquer jeito.", "Não há depósito."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Call me in case you get lost.", accepted: ["call me in case you get lost"] },
      ],
      conversation: {
        goal: "Negocie com o professor as condições para emprestar algo seu (carro, apartamento) usando as long as, unless e in case.",
        starter: "Could I borrow your car this weekend? I promise I'll be careful!",
      },
      review: ["unless = if not (sem outra negativa).", "as long as / provided that = desde que.", "in case = por precaução."],
    }),

    buildLesson("b1-m2-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Hipóteses",
      objective: "Comprovar que você usa condicionais e desejos.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "If I ___ (be) rich, I'd help my community.", accepted: ["were", "was"] },
        { type: "fill_blank", skill: "grammar", sentence: "I wish I ___ (know) how to cook.", accepted: ["knew"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Water freezes ___ the temperature drops below zero.\"", options: ["if", "unless", "in case"], answer: 0 },
        { type: "multiple_choice", skill: "grammar", prompt: "\"We'll lose the game ___ we train harder.\"", options: ["unless", "as long as", "in case"], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Se eu pudesse, moraria em Portugal.", accepted: ["If I could, I would live in Portugal.", "If I could, I'd live in Portugal."] },
        { type: "word_order", skill: "grammar", prompt: "Queria que você me ouvisse.", answer: "I wish you would listen to me." },
        { type: "translate", skill: "writing", prompt: "Leve água caso fique com sede.", accepted: ["Take some water in case you get thirsty.", "Take water in case you get thirsty.", "Bring water in case you get thirsty.", "Bring some water in case you get thirsty."] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "If only I had studied English when I was younger.", options: ["Se ao menos eu tivesse estudado inglês quando era mais novo.", "Estudei inglês quando era novo.", "Vou estudar inglês quando for mais velho."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "What would you do?", accepted: ["what would you do"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["unless", "a menos que"], ["as long as", "desde que"], ["in case", "caso"], ["wish", "desejar"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
