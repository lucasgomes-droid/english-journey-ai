import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "a2-m4";

export const a2Module4: Module = {
  id: M,
  level: "A2",
  order: 4,
  title: "Obrigações e conselhos",
  description: "Regras, conselhos, saúde e pedidos educados.",
  lessons: [
    buildLesson("a2-m4-l1", M, 1, {
      title: "Regras",
      objective: "Falar de regras e obrigações com have to, must e mustn't.",
      explanation: [
        {
          title: "Have to e don't have to",
          body: "**have to** = ter que (obrigação externa: regras, chefe, lei): **I have to wear a uniform.** **don't have to** = não precisa (é opcional!): **You don't have to come.** Com he/she/it: **has to / doesn't have to**.",
        },
        {
          title: "Must e mustn't",
          body: "**must** = tem que (forte, regra escrita ou opinião pessoal): **You must wear a seatbelt.** **mustn't** = é proibido: **You mustn't smoke here.** Atenção: **mustn't ≠ don't have to**.",
          table: {
            head: ["Frase", "Sentido"],
            rows: [
              ["You have to pay.", "É obrigatório pagar."],
              ["You don't have to pay.", "Não precisa pagar (é grátis)."],
              ["You mustn't pay.", "É proibido pagar."],
            ],
          },
        },
        {
          title: "No passado",
          body: "**had to** = tive que: **I had to work on Sunday.** (must não tem passado).",
        },
      ],
      vocabulary: [
        { en: "have to", pt: "ter que", say: "RÉV tu" },
        { en: "must", pt: "dever / ter que", say: "MÂST" },
        { en: "mustn't", pt: "não pode (proibido)", say: "MÂ-sânt" },
        { en: "rule", pt: "regra", say: "RUUL" },
        { en: "allowed", pt: "permitido", say: "a-LÁUD" },
        { en: "wear", pt: "usar (roupa)", say: "UÉR" },
        { en: "uniform", pt: "uniforme", say: "IÚ-ni-form" },
        { en: "seatbelt", pt: "cinto de segurança", say: "SÍIT-belt" },
        { en: "on time", pt: "no horário", say: "on TÁIM" },
      ],
      examples: [
        { en: "We have to be at work on time.", pt: "Temos que chegar ao trabalho no horário." },
        { en: "You don't have to bring anything.", pt: "Você não precisa trazer nada." },
        { en: "You mustn't use your phone during the exam.", pt: "É proibido usar o celular durante a prova." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "A entrada é grátis. Você diz:", options: ["You mustn't pay.", "You don't have to pay.", "You have to pay."], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "Placa: proibido fumar.", options: ["You mustn't smoke.", "You don't have to smoke.", "You have to smoke."], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "She ___ to work on Saturdays.", translation: "Ela tem que trabalhar aos sábados.", accepted: ["has"] },
        { type: "fill_blank", skill: "grammar", sentence: "Yesterday I ___ to stay late.", translation: "Ontem eu tive que ficar até tarde.", accepted: ["had"] },
        { type: "translate", skill: "writing", prompt: "Você não precisa usar uniforme.", accepted: ["You don't have to wear a uniform.", "You do not have to wear a uniform."] },
        { type: "word_order", skill: "grammar", prompt: "Nós temos que chegar às oito.", answer: "We have to arrive at eight.", distractors: ["must"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Dogs are not allowed in the restaurant.", options: ["Cachorros são bem-vindos.", "Cachorros não são permitidos no restaurante.", "O restaurante vende comida para cachorros."], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "You must wear a seatbelt.", accepted: ["you must wear a seatbelt", "you must wear a seat belt"] },
      ],
      conversation: {
        goal: "Explique as regras do seu trabalho, escola ou casa: o que é obrigatório, opcional e proibido.",
        starter: "What are the rules at your job or school? What do you have to do every day?",
      },
      review: ["have to: obrigação; don't have to: não precisa.", "mustn't: proibido.", "Passado: had to."],
    }),

    buildLesson("a2-m4-l2", M, 2, {
      title: "Conselhos",
      objective: "Dar e pedir conselhos com should e shouldn't.",
      explanation: [
        {
          title: "Should",
          body: "**should + verbo** = deveria: **You should sleep more.** **You shouldn't drink so much coffee.** Pergunta: **What should I do?** É mais leve que must: é um conselho, não uma ordem.",
        },
        {
          title: "Outras formas de aconselhar",
          body: "**Why don't you...?** (Por que você não...?) · **If I were you, I'd...** (Se eu fosse você, eu...) · **Maybe you could...** (Talvez você pudesse...).",
        },
      ],
      vocabulary: [
        { en: "should", pt: "deveria", say: "SHÚD" },
        { en: "shouldn't", pt: "não deveria", say: "SHÚ-dent" },
        { en: "advice", pt: "conselho", say: "ad-VÁIS" },
        { en: "If I were you", pt: "Se eu fosse você", say: "if ái UÉR iu" },
        { en: "stressed", pt: "estressado", say: "STRÉST" },
        { en: "tired", pt: "cansado", say: "TÁI-erd" },
        { en: "take a break", pt: "fazer uma pausa", say: "TÊIK a BRÊIK" },
        { en: "exercise", pt: "fazer exercício", say: "ÉK-ser-sáiz" },
        { en: "worry", pt: "preocupar-se", say: "UÂ-ri" },
      ],
      examples: [
        { en: "You look tired. You should take a break.", pt: "Você parece cansado. Deveria fazer uma pausa." },
        { en: "Why don't you talk to your boss?", pt: "Por que você não fala com seu chefe?" },
        { en: "If I were you, I'd study every day.", pt: "Se eu fosse você, estudaria todo dia." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "You ___ go to bed so late. (não deveria)", accepted: ["shouldn't", "should not"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["You should to rest.", "You should rest.", "You should resting."], answer: 1, explain: "Depois de should, verbo sem to." },
        { type: "translate", skill: "writing", prompt: "O que eu devo fazer?", accepted: ["What should I do?"] },
        { type: "translate", skill: "writing", prompt: "Você deveria beber mais água.", accepted: ["You should drink more water."] },
        { type: "word_order", skill: "grammar", prompt: "Por que você não pede ajuda?", answer: "Why don't you ask for help?", distractors: ["should"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Seu amigo diz \"I'm so stressed.\" Um bom conselho é:", options: ["You should take a break.", "You must stressed.", "You don't have to relax."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "If I were you, I'd see a doctor.", options: ["Se eu fosse você, iria ao médico.", "Eu sou médico.", "Você deveria ver um filme."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "You shouldn't worry.", accepted: ["you shouldn't worry", "you should not worry"] },
      ],
      conversation: {
        goal: "Conte um problema (real ou inventado) e peça conselhos; depois aconselhe o professor sobre o problema dele.",
        starter: "I want to learn English faster, but I don't have much time. What should I do?",
      },
      review: ["should / shouldn't + verbo (sem to).", "Why don't you...? / If I were you, I'd...", "Conselho é mais leve que must."],
    }),

    buildLesson("a2-m4-l3", M, 3, {
      title: "Na farmácia e no médico",
      objective: "Explicar um problema de saúde e entender orientações.",
      explanation: [
        {
          title: "Sintomas",
          body: "**I've got a headache / a sore throat / a fever.** (Estou com dor de cabeça / dor de garganta / febre.) **My back hurts.** (Minhas costas doem.) **I feel sick.** (Estou enjoado/passando mal.)",
        },
        {
          title: "Há quanto tempo?",
          body: "O médico pergunta: **How long have you had it?** Responda: **For two days.** / **Since Monday.** Outras: **Are you allergic to anything?** **Are you taking any medicine?**",
        },
        {
          title: "Na farmácia",
          body: "**Can you recommend something for a cold?** · **How often should I take it?** — **Twice a day, after meals.** (Duas vezes por dia, depois das refeições.)",
        },
      ],
      vocabulary: [
        { en: "headache", pt: "dor de cabeça", say: "RÉD-êik" },
        { en: "sore throat", pt: "dor de garganta", say: "SÓR THRÔUT" },
        { en: "fever", pt: "febre", say: "FÍI-ver" },
        { en: "cough", pt: "tosse", say: "CÓF" },
        { en: "cold", pt: "resfriado", say: "CÔULD" },
        { en: "hurt", pt: "doer", say: "RÂRT" },
        { en: "medicine", pt: "remédio", say: "MÉD-sin" },
        { en: "allergic to", pt: "alérgico a", say: "a-LÂR-djik tu" },
        { en: "pharmacy", pt: "farmácia", say: "FÁR-ma-si" },
        { en: "twice a day", pt: "duas vezes por dia", say: "TUÁIS a DÊI" },
      ],
      examples: [
        { en: "I've got a sore throat and a cough.", pt: "Estou com dor de garganta e tosse." },
        { en: "How long have you had the fever? — Since yesterday.", pt: "Há quanto tempo está com febre? — Desde ontem." },
        { en: "Take one tablet twice a day.", pt: "Tome um comprimido duas vezes por dia." },
      ],
      exercises: [
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue os sintomas.", pairs: [["headache", "dor de cabeça"], ["fever", "febre"], ["cough", "tosse"], ["sore throat", "dor de garganta"]] },
        { type: "fill_blank", skill: "grammar", sentence: "My back ___.", translation: "Minhas costas doem.", accepted: ["hurts"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"How long have you had this cough?\"", options: ["Since three days.", "For three days.", "In three days."], answer: 1, explain: "for + período (for three days); since + ponto de início (since Monday)." },
        { type: "translate", skill: "writing", prompt: "Sou alérgico a penicilina.", accepted: ["I'm allergic to penicillin.", "I am allergic to penicillin."] },
        { type: "translate", skill: "writing", prompt: "Estou com dor de cabeça.", accepted: ["I've got a headache.", "I have a headache.", "I have got a headache."] },
        { type: "word_order", skill: "grammar", prompt: "Você pode recomendar algo para resfriado?", answer: "Can you recommend something for a cold?", distractors: ["to"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Take this medicine three times a day after meals.", options: ["Tome três vezes por dia, depois das refeições.", "Tome uma vez por dia, antes de dormir.", "Tome só se tiver febre."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I feel sick.", accepted: ["i feel sick"] },
      ],
      conversation: {
        goal: "Você está numa farmácia no exterior: explique seus sintomas, há quanto tempo, e pergunte como tomar o remédio.",
        starter: "Hello, how can I help you today?",
      },
      review: ["I've got a + sintoma; my ... hurts.", "for + período; since + início.", "How often should I take it? Twice a day."],
    }),

    buildLesson("a2-m4-l4", M, 4, {
      title: "Pedidos educados",
      objective: "Pedir favores e permissão com educação.",
      explanation: [
        {
          title: "Do mais direto ao mais educado",
          body: "**Can you...?** (informal) → **Could you...?** (educado) → **Would you mind + -ing...?** (muito educado): **Would you mind opening the window?** (Você se importaria de abrir a janela?)",
        },
        {
          title: "Respondendo a would you mind",
          body: "Cuidado: a pergunta é \"você se importa?\". Para aceitar diga **No, not at all.** / **Of course not.** (Não me importo.) Dizer \"Yes\" significa que você se importa!",
        },
        {
          title: "Pedindo permissão",
          body: "**Can I...?** / **Could I...?** / **May I...?** (formal): **Could I use your phone?** **May I come in?**",
        },
      ],
      vocabulary: [
        { en: "Could you...?", pt: "Você poderia...?", say: "CÚD iu" },
        { en: "Would you mind...?", pt: "Você se importaria de...?", say: "UÚD iu MÁIND" },
        { en: "favor", pt: "favor", say: "FÊI-ver" },
        { en: "borrow", pt: "pegar emprestado", say: "BÓ-rou" },
        { en: "lend", pt: "emprestar", say: "LÉND" },
        { en: "turn down", pt: "abaixar (volume)", say: "TÂRN DÁUN" },
        { en: "repeat", pt: "repetir", say: "ri-PÍIT" },
        { en: "Not at all", pt: "De jeito nenhum / imagina", say: "NÓT ét ÓL" },
        { en: "May I...?", pt: "Posso...? (formal)", say: "MÊI ái" },
      ],
      examples: [
        { en: "Could you repeat that, please?", pt: "Você poderia repetir, por favor?" },
        { en: "Would you mind turning down the music?", pt: "Você se importaria de abaixar a música?" },
        { en: "Can I borrow your pen? — Sure, here you are.", pt: "Posso pegar sua caneta emprestada? — Claro, aqui está." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Complete: \"Would you mind ___ the door?\"", options: ["close", "to close", "closing"], answer: 2 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Would you mind waiting a minute?\" Você aceita esperar. Responde:", options: ["Yes, I would.", "No, not at all.", "Yes, I mind."], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Borrow ou lend? \"Can you ___ me some money?\"", options: ["borrow", "lend"], answer: 1, explain: "lend = emprestar (dar); borrow = pegar emprestado." },
        { type: "translate", skill: "writing", prompt: "Você poderia falar mais devagar?", accepted: ["Could you speak more slowly?", "Could you speak slower?", "Could you speak more slowly, please?", "Could you please speak more slowly?"] },
        { type: "translate", skill: "writing", prompt: "Posso entrar?", accepted: ["May I come in?", "Can I come in?", "Could I come in?"] },
        { type: "word_order", skill: "grammar", prompt: "Você poderia me fazer um favor?", answer: "Could you do me a favor?", distractors: ["make"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Could I borrow your charger for a minute?", options: ["Posso pegar seu carregador emprestado um minuto?", "Você pode carregar meu celular?", "Onde fica a tomada?"], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Could you repeat that, please?", accepted: ["could you repeat that please"] },
      ],
      conversation: {
        goal: "Peça três favores ao professor com níveis diferentes de educação e responda aos pedidos dele.",
        starter: "Hi, neighbor! Sorry to bother you. Could you do me a favor?",
      },
      review: ["Can → Could → Would you mind + -ing.", "Would you mind...? → No, not at all (= aceito).", "borrow (pegar) × lend (emprestar)."],
    }),

    buildLesson("a2-m4-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Obrigações e conselhos",
      objective: "Comprovar que você fala de regras, conselhos, saúde e pedidos.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"Não precisa trazer comida.\"", options: ["You mustn't bring food.", "You don't have to bring food.", "You shouldn't to bring food."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "You ___ see a doctor. (deveria)", accepted: ["should"] },
        { type: "translate", skill: "writing", prompt: "Eu tive que trabalhar no domingo.", accepted: ["I had to work on Sunday."] },
        { type: "fill_blank", skill: "grammar", sentence: "Would you mind ___ (help) me?", accepted: ["helping"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"I've had a fever ___ Tuesday.\"", options: ["for", "since", "from"], answer: 1 },
        { type: "word_order", skill: "grammar", prompt: "Se eu fosse você, eu descansaria.", answer: "If I were you, I'd rest." },
        { type: "translate", skill: "writing", prompt: "Você poderia repetir, por favor?", accepted: ["Could you repeat, please?", "Could you repeat that, please?", "Could you repeat it, please?", "Could you please repeat that?"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "You mustn't park here.", options: ["Você pode estacionar aqui.", "É proibido estacionar aqui.", "Você não precisa estacionar."], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "My head hurts.", accepted: ["my head hurts"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["borrow", "pegar emprestado"], ["lend", "emprestar"], ["advice", "conselho"], ["rule", "regra"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
