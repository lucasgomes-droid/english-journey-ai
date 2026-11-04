import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "a2-m2";

export const a2Module2: Module = {
  id: M,
  level: "A2",
  order: 2,
  title: "Planos e futuro",
  description: "Planos, compromissos, previsões, promessas e convites.",
  lessons: [
    buildLesson("a2-m2-l1", M, 1, {
      title: "Planos",
      objective: "Falar de planos e intenções com going to.",
      explanation: [
        {
          title: "Going to",
          body: "**be + going to + verbo** = vou/vai fazer algo que já está decidido: **I'm going to travel in July.** **She's going to study medicine.** Pergunta: **Are you going to...?**",
          table: {
            head: ["Afirmativa", "Negativa", "Pergunta"],
            rows: [
              ["I'm going to rest.", "I'm not going to work.", "Am I going to...?"],
              ["He's going to buy a car.", "He isn't going to sell it.", "Is he going to...?"],
              ["We're going to move.", "We aren't going to stay.", "Are we going to...?"],
            ],
          },
        },
        {
          title: "Na fala: gonna",
          body: "Em conversas rápidas, **going to** soa como **gonna**: \"I'm gonna call you.\" É ótimo para entender, mas na escrita formal use going to.",
        },
        {
          title: "Expressões de tempo",
          body: "**tomorrow**, **next week / month / year**, **this weekend**, **in two weeks** (daqui a duas semanas), **soon** (em breve).",
        },
      ],
      vocabulary: [
        { en: "plan", pt: "plano / planejar", say: "PLÉN" },
        { en: "next week", pt: "semana que vem", say: "NÉKST UÍIK" },
        { en: "this weekend", pt: "este fim de semana", say: "DHÍS UÍK-end" },
        { en: "soon", pt: "em breve", say: "SUUN" },
        { en: "holiday", pt: "férias / feriado", say: "RÓ-li-dêi" },
        { en: "save money", pt: "economizar dinheiro", say: "SÊIV MÂ-ni" },
        { en: "move", pt: "mudar (de casa)", say: "MUUV" },
        { en: "rest", pt: "descansar", say: "RÉST" },
        { en: "learn", pt: "aprender", say: "LÂRN" },
      ],
      examples: [
        { en: "I'm going to save money for a trip.", pt: "Vou economizar dinheiro para uma viagem." },
        { en: "We're going to move next year.", pt: "Vamos nos mudar no ano que vem." },
        { en: "What are you going to do this weekend?", pt: "O que você vai fazer neste fim de semana?" },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "She's ___ to learn Spanish.", translation: "Ela vai aprender espanhol.", accepted: ["going"] },
        { type: "fill_blank", skill: "grammar", sentence: "We ___ going to stay at home. (negativa)", accepted: ["aren't", "are not", "'re not"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"O que você vai fazer amanhã?\"", options: ["What do you going to do tomorrow?", "What are you going to do tomorrow?", "What you are going to do tomorrow?"], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Eu vou descansar neste fim de semana.", accepted: ["I'm going to rest this weekend.", "I am going to rest this weekend."] },
        { type: "word_order", skill: "grammar", prompt: "Eles vão se mudar em breve.", answer: "They are going to move soon.", distractors: ["goes"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue as expressões.", pairs: [["soon", "em breve"], ["next week", "semana que vem"], ["save money", "economizar"], ["move", "mudar de casa"]] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I'm gonna call you later.", options: ["Vou te ligar mais tarde.", "Te liguei mais cedo.", "Não vou te ligar."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Are you going to travel?", accepted: ["are you going to travel"] },
      ],
      conversation: {
        goal: "Conte seus planos para o próximo fim de semana e para o ano que vem usando going to.",
        starter: "What are you going to do this weekend? And what about next year?",
      },
      review: ["be + going to + verbo para planos decididos.", "gonna = going to na fala rápida.", "next week, this weekend, soon."],
    }),

    buildLesson("a2-m2-l2", M, 2, {
      title: "Compromissos",
      objective: "Marcar compromissos usando o presente contínuo para o futuro.",
      explanation: [
        {
          title: "Presente contínuo para combinados",
          body: "Quando algo está **marcado** (com hora, lugar, outra pessoa), usamos **be + -ing**: **I'm meeting Ana at 6.** **We're having dinner with my parents on Sunday.** É a agenda.",
        },
        {
          title: "Perguntando sobre disponibilidade",
          body: "**Are you free on Friday?** (Você está livre na sexta?) **What are you doing tonight?** Respostas: **I'm busy, I'm working late.** / **Nothing special.**",
        },
        {
          title: "Dias e horários",
          body: "**on** + dia (on Monday, on May 5th) · **at** + hora (at 3 pm) · **in** + parte do dia (in the morning). **tonight** = hoje à noite.",
        },
      ],
      vocabulary: [
        { en: "appointment", pt: "compromisso / consulta", say: "a-PÓINT-ment" },
        { en: "meeting", pt: "reunião", say: "MÍI-ting" },
        { en: "free", pt: "livre", say: "FRÍI" },
        { en: "busy", pt: "ocupado", say: "BÍ-zi" },
        { en: "tonight", pt: "hoje à noite", say: "tu-NÁIT" },
        { en: "schedule", pt: "agenda / horário", say: "SKÉ-djul" },
        { en: "pick up", pt: "buscar (alguém)", say: "PÍK âp" },
        { en: "dentist", pt: "dentista", say: "DÉN-tist" },
        { en: "work late", pt: "trabalhar até tarde", say: "UÊRK LÊIT" },
      ],
      examples: [
        { en: "I'm seeing the dentist on Tuesday.", pt: "Vou ao dentista na terça." },
        { en: "Are you free tonight?", pt: "Você está livre hoje à noite?" },
        { en: "Sorry, I'm working late on Friday.", pt: "Desculpe, vou trabalhar até tarde na sexta." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "I ___ (meet) my boss at nine tomorrow.", translation: "Vou me encontrar com meu chefe às nove amanhã.", accepted: ["'m meeting", "am meeting"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Qual preposição? \"I'm free ___ Saturday.\"", options: ["in", "on", "at"], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "Qual preposição? \"The meeting is ___ 3 pm.\"", options: ["at", "on", "in"], answer: 0 },
        { type: "translate", skill: "writing", prompt: "O que você vai fazer hoje à noite?", accepted: ["What are you doing tonight?", "What are you going to do tonight?"] },
        { type: "translate", skill: "writing", prompt: "Desculpe, estou ocupado.", accepted: ["Sorry, I'm busy.", "Sorry, I am busy.", "I'm sorry, I'm busy."] },
        { type: "word_order", skill: "grammar", prompt: "Nós vamos jantar com os meus pais no domingo.", answer: "We're having dinner with my parents on Sunday.", distractors: ["in"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I'm picking up my son at five.", options: ["Vou buscar meu filho às cinco.", "Meu filho chega às cinco.", "Vou levar meu filho às cinco."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Are you free on Friday?", accepted: ["are you free on friday"] },
      ],
      conversation: {
        goal: "Combine um horário com o professor: diga sua agenda da semana e encontre um dia livre.",
        starter: "Let's meet for coffee this week. Are you free on Wednesday?",
      },
      review: ["be + -ing para compromissos marcados.", "on + dia, at + hora, in + parte do dia.", "Are you free...? I'm busy / I'm free."],
    }),

    buildLesson("a2-m2-l3", M, 3, {
      title: "Previsões e promessas",
      objective: "Prever, prometer e decidir na hora com will / won't.",
      explanation: [
        {
          title: "Will para decisões na hora",
          body: "Quando você decide **no momento da fala**: **The phone's ringing. — I'll get it!** (Eu atendo!) **I'm cold. — I'll close the window.**",
        },
        {
          title: "Promessas e previsões",
          body: "**I'll call you tomorrow, I promise.** · **I think it will rain.** · **You won't regret it.** (Você não vai se arrepender.) **won't** = will not.",
        },
        {
          title: "Will × going to",
          body: "**going to** = plano já decidido antes. **will** = decisão agora, promessa ou opinião sobre o futuro (I think..., probably...).",
        },
      ],
      vocabulary: [
        { en: "promise", pt: "prometer / promessa", say: "PRÓ-mis" },
        { en: "probably", pt: "provavelmente", say: "PRÓ-ba-bli" },
        { en: "I think", pt: "eu acho", say: "ái THÍNK" },
        { en: "help", pt: "ajudar", say: "RÉLP" },
        { en: "forget", pt: "esquecer", say: "for-GUÉT" },
        { en: "win", pt: "ganhar (jogo)", say: "UÍN" },
        { en: "rain", pt: "chover / chuva", say: "RÊIN" },
        { en: "future", pt: "futuro", say: "FIÚ-tcher" },
        { en: "won't", pt: "não vai (will not)", say: "UÔUNT" },
      ],
      examples: [
        { en: "I'll help you with your bags.", pt: "Eu te ajudo com as malas." },
        { en: "I won't forget, I promise.", pt: "Não vou esquecer, prometo." },
        { en: "I think Brazil will win.", pt: "Acho que o Brasil vai ganhar." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Alguém bate na porta. Você diz:", options: ["I'm going to open it.", "I'll open it.", "I open it."], answer: 1, explain: "Decisão tomada na hora: will." },
        { type: "fill_blank", skill: "grammar", sentence: "Don't worry, I ___ tell anyone.", translation: "Não se preocupe, não vou contar a ninguém.", accepted: ["won't", "will not"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Comprei as passagens. Vou para Recife em maio.\"", options: ["I'll go to Recife in May.", "I'm going to Recife in May.", "I go to Recife in May."], answer: 1, explain: "Já está decidido e comprado: plano (going to / presente contínuo)." },
        { type: "translate", skill: "writing", prompt: "Eu te ligo amanhã.", accepted: ["I'll call you tomorrow.", "I will call you tomorrow."] },
        { type: "translate", skill: "writing", prompt: "Acho que vai chover.", accepted: ["I think it will rain.", "I think it'll rain.", "I think it's going to rain."] },
        { type: "word_order", skill: "grammar", prompt: "Ela provavelmente vai se atrasar.", answer: "She will probably be late.", distractors: ["going"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I promise I won't be late.", options: ["Prometo que não vou me atrasar.", "Prometo que vou chegar cedo amanhã.", "Desculpe pelo atraso."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I'll help you.", accepted: ["i'll help you", "i will help you"] },
      ],
      conversation: {
        goal: "Faça previsões sobre o seu futuro e o do mundo, e faça uma promessa ao professor.",
        starter: "What do you think the world will be like in 20 years?",
      },
      review: ["will: decisão na hora, promessa, previsão com I think/probably.", "won't = will not.", "going to: plano decidido antes."],
    }),

    buildLesson("a2-m2-l4", M, 4, {
      title: "Convites",
      objective: "Convidar, aceitar e recusar com educação.",
      explanation: [
        {
          title: "Convidando",
          body: "**Would you like to come to my party?** (formal e gentil) · **Do you want to grab a coffee?** (informal) · **Let's go to the movies!** (Vamos...!) · **How about dinner on Friday?** (Que tal...?)",
        },
        {
          title: "Aceitando e recusando",
          body: "Aceitar: **I'd love to!** / **Sounds great!** / **Sure, why not?** Recusar com educação: **I'd love to, but I can't. I'm working.** / **Sorry, maybe another time?** Dica: em inglês, recusar sem dar um motivo soa seco.",
        },
        {
          title: "Would like × like",
          body: "**I like coffee** = gosto de café (sempre). **I'd like a coffee** = eu gostaria de um café (agora). **Would you like...?** é o jeito educado de oferecer ou convidar.",
        },
      ],
      vocabulary: [
        { en: "invite", pt: "convidar", say: "in-VÁIT" },
        { en: "Would you like to...?", pt: "Você gostaria de...?", say: "UÚD iu LÁIK tu" },
        { en: "Let's...", pt: "Vamos...", say: "LÉTS" },
        { en: "How about...?", pt: "Que tal...?", say: "RÁU a-BÁUT" },
        { en: "I'd love to", pt: "Eu adoraria", say: "áid LÂV tu" },
        { en: "Sounds great", pt: "Parece ótimo", say: "SÁUNDZ GRÊIT" },
        { en: "another time", pt: "outra hora", say: "a-NÂ-dher TÁIM" },
        { en: "party", pt: "festa", say: "PÁR-ti" },
        { en: "grab a coffee", pt: "tomar um café (informal)", say: "GRÉB a CÓ-fi" },
      ],
      examples: [
        { en: "Would you like to have dinner with us?", pt: "Você gostaria de jantar conosco?" },
        { en: "I'd love to, but I can't. I have class.", pt: "Eu adoraria, mas não posso. Tenho aula." },
        { en: "How about Saturday? — Sounds great!", pt: "Que tal sábado? — Parece ótimo!" },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Qual é a forma mais educada de convidar?", options: ["Come to my party.", "Would you like to come to my party?", "You come to my party?"], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Recuse com educação:", options: ["No.", "I don't want.", "I'd love to, but I'm busy that day."], answer: 2 },
        { type: "fill_blank", skill: "grammar", sentence: "___ go to the beach tomorrow!", translation: "Vamos à praia amanhã!", accepted: ["Let's", "Let us"] },
        { type: "fill_blank", skill: "grammar", sentence: "How ___ a pizza tonight?", translation: "Que tal uma pizza hoje à noite?", accepted: ["about"] },
        { type: "translate", skill: "writing", prompt: "Eu adoraria!", accepted: ["I'd love to!", "I would love to!", "I'd love to."] },
        { type: "word_order", skill: "grammar", prompt: "Você quer tomar um café amanhã?", answer: "Do you want to grab a coffee tomorrow?", distractors: ["would"] },
        { type: "listening", skill: "listening", prompt: "Ouça. A pessoa aceitou ou recusou?", audio: "Sorry, I can't this time. Maybe next week?", options: ["Aceitou.", "Recusou e sugeriu outra data.", "Não entendeu o convite."], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Sounds great!", accepted: ["sounds great"] },
      ],
      conversation: {
        goal: "Convide o professor para um programa, combine dia e hora; depois recuse um convite dele com educação.",
        starter: "Hey! I'm having a barbecue on Saturday. Would you like to come?",
      },
      review: ["Would you like to...? / Let's... / How about...?", "Aceitar: I'd love to! / Sounds great!", "Recusar dando um motivo: I'd love to, but..."],
    }),

    buildLesson("a2-m2-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Planos e futuro",
      objective: "Comprovar que você fala de planos, compromissos, previsões e convites.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "I'm going ___ buy a new phone.", accepted: ["to"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Seu amigo diz \"I'm thirsty\". Você responde:", options: ["I'm going to get you some water.", "I'll get you some water.", "I get you some water."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Você está livre no sábado?", accepted: ["Are you free on Saturday?"] },
        { type: "fill_blank", skill: "grammar", sentence: "I ___ forget your birthday again, I promise.", accepted: ["won't", "will not"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Vou ao médico amanhã às 10h\" (já marcado).", options: ["I'm seeing the doctor tomorrow at 10.", "I see the doctor tomorrow at 10.", "I'll to see the doctor tomorrow at 10."], answer: 0 },
        { type: "word_order", skill: "grammar", prompt: "Você gostaria de vir à minha festa?", answer: "Would you like to come to my party?" },
        { type: "translate", skill: "writing", prompt: "Que tal domingo?", accepted: ["How about Sunday?", "What about Sunday?"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "We're going to move to Curitiba next year.", options: ["Mudamos para Curitiba no ano passado.", "Vamos nos mudar para Curitiba no ano que vem.", "Queremos visitar Curitiba."], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I think it will be fine.", accepted: ["i think it will be fine", "i think it'll be fine"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Sounds great!\" significa:", options: ["Está muito alto!", "Parece ótimo!", "Que som estranho!"], answer: 1 },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
