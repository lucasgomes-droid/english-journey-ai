import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "b1-m6";

export const b1Module6: Module = {
  id: M,
  level: "B1",
  order: 6,
  title: "Saúde e bem-estar",
  description: "Hábitos, hospital, emoções e os phrasal verbs essenciais.",
  lessons: [
    buildLesson("b1-m6-l1", M, 1, {
      title: "Hábitos saudáveis",
      objective: "Falar de hábitos com verbos que mudam de sentido com -ing ou to.",
      explanation: [
        {
          title: "Mesmo verbo, sentido diferente",
          body: "**stop + -ing** = parar de fazer: **I stopped smoking.** × **stop + to** = parar para fazer: **I stopped to drink water.** · **remember + -ing** = lembrar de ter feito × **remember + to** = lembrar de fazer (tarefa): **Remember to take your medicine.** · **try + -ing** = experimentar × **try + to** = esforçar-se: **Try to sleep eight hours.**",
          table: {
            head: ["Verbo", "+ -ing", "+ to"],
            rows: [
              ["stop", "parar de", "parar para"],
              ["remember", "lembrar de ter feito", "lembrar de fazer"],
              ["forget", "esquecer que fez", "esquecer de fazer"],
              ["try", "experimentar", "tentar / esforçar-se"],
            ],
          },
        },
      ],
      vocabulary: [
        { en: "work out", pt: "malhar / treinar", say: "UÊRK ÁUT" },
        { en: "cut down on", pt: "reduzir (consumo)", say: "CÂT DÁUN on" },
        { en: "give up", pt: "largar (um hábito)", say: "GUÍV ÂP" },
        { en: "habit", pt: "hábito", say: "RÉ-bit" },
        { en: "balanced diet", pt: "alimentação equilibrada", say: "BÉ-lânst DÁI-et" },
        { en: "processed food", pt: "comida industrializada", say: "PRÓ-sest FÚUD" },
        { en: "get enough sleep", pt: "dormir o suficiente", say: "guét i-NÂF SLÍIP" },
        { en: "stretch", pt: "alongar", say: "STRÉTCH" },
        { en: "well-being", pt: "bem-estar", say: "uél-BÍI-ing" },
      ],
      examples: [
        { en: "I stopped drinking soda last year.", pt: "Parei de tomar refrigerante no ano passado." },
        { en: "Remember to stretch before you run.", pt: "Lembre de alongar antes de correr." },
        { en: "Try cutting down on processed food for a week.", pt: "Experimente reduzir comida industrializada por uma semana." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"Parei de fumar.\"", options: ["I stopped to smoke.", "I stopped smoking.", "I stopped smoke."], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Paramos para tomar um café.\"", options: ["We stopped to have a coffee.", "We stopped having a coffee."], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "Don't forget ___ (take) your vitamins.", accepted: ["to take"] },
        { type: "fill_blank", skill: "grammar", sentence: "I remember ___ (visit) that beach as a child.", accepted: ["visiting"] },
        { type: "translate", skill: "writing", prompt: "Estou tentando reduzir o açúcar.", accepted: ["I'm trying to cut down on sugar.", "I am trying to cut down on sugar.", "I'm trying to reduce sugar."] },
        { type: "word_order", skill: "grammar", prompt: "Ela malha três vezes por semana.", answer: "She works out three times a week.", distractors: ["make"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I gave up coffee, but I still drink tea.", options: ["Largou o café, mas ainda toma chá.", "Largou o chá.", "Toma muito café."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Try to get enough sleep.", accepted: ["try to get enough sleep"] },
      ],
      conversation: {
        goal: "Conte ao professor um hábito que você largou, um que quer começar e peça conselhos.",
        starter: "What healthy habits do you have? Is there anything you'd like to give up?",
      },
      review: ["stop/remember/forget/try mudam de sentido com -ing ou to.", "work out, cut down on, give up."],
    }),

    buildLesson("b1-m6-l2", M, 2, {
      title: "No hospital",
      objective: "Explicar sintomas em detalhe e fazer perguntas indiretas.",
      explanation: [
        {
          title: "Perguntas indiretas",
          body: "Mais educadas e comuns em situações sérias: **Can you tell me how long I'll have to wait?** · **Do you know if the doctor is available?** · **I'd like to know whether it's serious.** A ordem é de frase afirmativa e, sem palavra interrogativa, use **if/whether**.",
        },
        {
          title: "Descrevendo a dor",
          body: "**It's a sharp pain** (dor aguda, pontada) / **a dull pain** (dor surda, constante). **It hurts when I breathe.** **It started three days ago and it's getting worse.** **I feel dizzy.** (tonto) **I've been feeling nauseous.** (enjoado)",
        },
      ],
      vocabulary: [
        { en: "emergency room (ER)", pt: "pronto-socorro", say: "i-MÂR-djen-si RÚUM" },
        { en: "sharp pain", pt: "dor aguda / pontada", say: "SHÁRP PÊIN" },
        { en: "dizzy", pt: "tonto", say: "DÍ-zi" },
        { en: "nauseous", pt: "enjoado", say: "NÓ-shâs" },
        { en: "swollen", pt: "inchado", say: "SUÔU-len" },
        { en: "prescription", pt: "receita médica", say: "pres-KRÍP-shan" },
        { en: "health insurance", pt: "plano de saúde", say: "RÉLTH in-SHÚ-rens" },
        { en: "X-ray", pt: "raio-x", say: "ÉKS-rêi" },
        { en: "get worse", pt: "piorar", say: "guét UÂRS" },
      ],
      examples: [
        { en: "I've got a sharp pain in my chest when I breathe.", pt: "Tenho uma pontada no peito quando respiro." },
        { en: "Could you tell me how long the results will take?", pt: "Poderia me dizer quanto tempo os resultados vão levar?" },
        { en: "My ankle is swollen and it's getting worse.", pt: "Meu tornozelo está inchado e está piorando." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Pergunta indireta correta:", options: ["Can you tell me where is the pharmacy?", "Can you tell me where the pharmacy is?"], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "Do you know ___ the doctor speaks Portuguese?", translation: "Você sabe se o médico fala português?", accepted: ["if", "whether"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"I feel dizzy.\"", options: ["Estou tonto.", "Estou com fome.", "Estou com frio."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "The pain started yesterday and it's getting ___.", translation: "...e está piorando.", accepted: ["worse"] },
        { type: "translate", skill: "writing", prompt: "Você aceita meu plano de saúde?", accepted: ["Do you accept my health insurance?", "Do you take my health insurance?"] },
        { type: "word_order", skill: "grammar", prompt: "Gostaria de saber se é grave.", answer: "I'd like to know whether it's serious.", distractors: ["is"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "You'll need an X-ray. I'll also give you a prescription for the pain.", options: ["Vai precisar de raio-x e de uma receita para a dor.", "Não precisa de nada.", "Precisa ser operado."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It hurts when I breathe.", accepted: ["it hurts when i breathe"] },
      ],
      conversation: {
        goal: "No pronto-socorro: descreva um problema em detalhes (onde, desde quando, como é a dor) e faça perguntas indiretas ao médico.",
        starter: "Hello, I'm Dr. Adams. What brings you to the emergency room today?",
      },
      review: ["Perguntas indiretas: Can you tell me where X is? / Do you know if...?", "Descrever dor: sharp/dull, getting worse, dizzy, swollen."],
    }),

    buildLesson("b1-m6-l3", M, 3, {
      title: "Emoções",
      objective: "Descrever emoções e diferenciar adjetivos -ed e -ing.",
      explanation: [
        {
          title: "-ed × -ing",
          body: "**-ed** = como a pessoa se sente: **I'm bored.** (Estou entediado.) **-ing** = o que causa o sentimento: **The movie is boring.** (O filme é chato.) Dizer ~~I'm boring~~ significa \"eu sou chato\"!",
          table: {
            head: ["Sente (-ed)", "Causa (-ing)"],
            rows: [
              ["bored", "boring"],
              ["tired", "tiring"],
              ["interested", "interesting"],
              ["confused", "confusing"],
              ["embarrassed", "embarrassing"],
              ["overwhelmed", "overwhelming"],
            ],
          },
        },
        {
          title: "Falando de sentimentos",
          body: "**I've been feeling a bit down lately.** (meio pra baixo) · **I'm thrilled!** (empolgadíssimo) · **I was really upset.** (chateado) · **It got on my nerves.** (me irritou)",
        },
      ],
      vocabulary: [
        { en: "bored / boring", pt: "entediado / chato", say: "BÓRD / BÓ-ring" },
        { en: "confused / confusing", pt: "confuso / confuso (que confunde)", say: "con-FIÚZD / con-FIÚ-zing" },
        { en: "embarrassed", pt: "envergonhado", say: "em-BÉ-râst" },
        { en: "upset", pt: "chateado", say: "âp-SÉT" },
        { en: "down", pt: "pra baixo", say: "DÁUN" },
        { en: "thrilled", pt: "muito empolgado", say: "THRÍLD" },
        { en: "overwhelmed", pt: "sobrecarregado", say: "ou-ver-UÉLMD" },
        { en: "relieved", pt: "aliviado", say: "ri-LÍIVD" },
        { en: "anxious", pt: "ansioso", say: "ÉNK-shâs" },
      ],
      examples: [
        { en: "I was so embarrassed. It was an embarrassing mistake.", pt: "Fiquei tão envergonhado. Foi um erro constrangedor." },
        { en: "I've been feeling overwhelmed at work.", pt: "Tenho me sentido sobrecarregado no trabalho." },
        { en: "We were relieved when the results came back.", pt: "Ficamos aliviados quando os resultados saíram." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"Estou entediado.\"", options: ["I'm boring.", "I'm bored.", "I'm boredom."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "The instructions were really ___ (confuse).", translation: "As instruções eram muito confusas.", accepted: ["confusing"] },
        { type: "fill_blank", skill: "grammar", sentence: "She was ___ (interest) in the job offer.", accepted: ["interested"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"I've been feeling a bit down.\"", options: ["Tenho me sentido meio pra baixo.", "Caí no chão.", "Estou animado."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Foi um dia muito cansativo.", accepted: ["It was a very tiring day.", "It was a really tiring day."] },
        { type: "word_order", skill: "grammar", prompt: "Fiquei aliviado quando ele ligou.", answer: "I was relieved when he called.", distractors: ["relieving"] },
        { type: "listening", skill: "listening", prompt: "Ouça. Como a pessoa se sente?", audio: "I'm thrilled! I got the scholarship!", options: ["Muito empolgada.", "Triste.", "Entediada."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It was so embarrassing.", accepted: ["it was so embarrassing"] },
      ],
      conversation: {
        goal: "Conte ao professor um momento em que você ficou envergonhado, aliviado ou muito empolgado, descrevendo o que sentiu.",
        starter: "Tell me about a moment when you felt really relieved. What happened?",
      },
      review: ["-ed: como a pessoa se sente; -ing: o que causa.", "I'm bored (entediado) × I'm boring (chato!).", "down, upset, thrilled, overwhelmed, relieved."],
    }),

    buildLesson("b1-m6-l4", M, 4, {
      title: "Phrasal verbs I",
      objective: "Usar phrasal verbs essenciais, separáveis e inseparáveis.",
      explanation: [
        {
          title: "Separáveis",
          body: "O objeto pode ficar no meio: **turn off the light** = **turn the light off**. Com pronome, o pronome SEMPRE fica no meio: **turn it off** (nunca ~~turn off it~~). Outros: **pick up, put on, take off, fill in, give back, throw away, look up**.",
        },
        {
          title: "Inseparáveis",
          body: "O objeto vem depois: **look after the kids** (cuidar), **get on the bus**, **run into a friend** (encontrar por acaso), **come across** (deparar-se), **look forward to**.",
        },
        {
          title: "Dica",
          body: "Aprenda cada um com um exemplo do seu dia a dia. Dez phrasal verbs bem usados valem mais que cem decorados.",
        },
      ],
      vocabulary: [
        { en: "turn off / on", pt: "desligar / ligar", say: "tânr ÓF / ÓN" },
        { en: "put on / take off", pt: "vestir / tirar (roupa)", say: "pút ÓN / têik ÓF" },
        { en: "pick up", pt: "pegar / buscar", say: "PÍK ÂP" },
        { en: "throw away", pt: "jogar fora", say: "THRÔU a-UÊI" },
        { en: "look up", pt: "procurar (informação)", say: "LÚK ÂP" },
        { en: "fill in", pt: "preencher", say: "FÍL ÍN" },
        { en: "look after", pt: "cuidar de", say: "LÚK ÉF-ter" },
        { en: "run into", pt: "encontrar por acaso", say: "RÂN ÍN-tu" },
        { en: "find out", pt: "descobrir", say: "FÁIND ÁUT" },
        { en: "set up", pt: "montar / configurar", say: "SÉT ÂP" },
      ],
      examples: [
        { en: "Can you turn it off, please?", pt: "Pode desligar, por favor?" },
        { en: "I ran into my old teacher at the supermarket.", pt: "Encontrei meu antigo professor por acaso no mercado." },
        { en: "Please fill in this form and give it back to me.", pt: "Por favor, preencha este formulário e me devolva." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["Turn off it.", "Turn it off.", "Turn it of."], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"I ran into Ana yesterday.\"", options: ["Corri até a Ana.", "Encontrei a Ana por acaso.", "Atropelei a Ana."], answer: 1 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Who looks ___ your kids when you're at work?", translation: "Quem cuida dos seus filhos...?", accepted: ["after"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "I need to find ___ what time the store opens.", accepted: ["out"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["throw away", "jogar fora"], ["look up", "procurar informação"], ["put on", "vestir"], ["set up", "configurar"]] },
        { type: "translate", skill: "writing", prompt: "Tire os sapatos, por favor.", accepted: ["Take off your shoes, please.", "Please take off your shoes.", "Take your shoes off, please.", "Please take your shoes off."] },
        { type: "word_order", skill: "grammar", prompt: "Vou te buscar às sete.", answer: "I'll pick you up at seven.", distractors: ["get"] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Can you turn it down?", accepted: ["can you turn it down"] },
      ],
      conversation: {
        goal: "Descreva sua manhã de hoje usando pelo menos cinco phrasal verbs (wake up, get up, put on, pick up, set up...).",
        starter: "Walk me through your morning. What did you do from the moment you woke up?",
      },
      review: ["Separáveis: pronome no meio (turn it off).", "Inseparáveis: look after, run into, come across.", "Aprenda com exemplos da sua rotina."],
    }),

    buildLesson("b1-m6-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Saúde e bem-estar",
      objective: "Comprovar que você fala de hábitos, saúde, emoções e usa phrasal verbs.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"Lembre de trancar a porta.\"", options: ["Remember locking the door.", "Remember to lock the door."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "The lecture was so ___ (bore) that I fell asleep.", accepted: ["boring"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Pergunta indireta:", options: ["Do you know when does the pharmacy close?", "Do you know when the pharmacy closes?"], answer: 1 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Could you pick me ___ from the airport?", accepted: ["up"] },
        { type: "translate", skill: "writing", prompt: "Estou me sentindo sobrecarregado.", accepted: ["I'm feeling overwhelmed.", "I am feeling overwhelmed.", "I feel overwhelmed."] },
        { type: "word_order", skill: "grammar", prompt: "Ele parou de comer carne.", answer: "He stopped eating meat." },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Throw it away.\"", options: ["Jogue fora.", "Jogue para mim.", "Guarde."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I've got a sharp pain in my back, and I feel a bit dizzy.", options: ["Pontada nas costas e um pouco de tontura.", "Dor de cabeça e febre.", "Está tudo bem."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I was really confused.", accepted: ["i was really confused"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["relieved", "aliviado"], ["swollen", "inchado"], ["look after", "cuidar de"], ["give up", "largar"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
