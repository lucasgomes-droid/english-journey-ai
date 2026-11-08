import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "b1-m7";

export const b1Module7: Module = {
  id: M,
  level: "B1",
  order: 7,
  title: "Cultura",
  description: "Filmes, arte, normas culturais e relatar perguntas e pedidos.",
  lessons: [
    buildLesson("b1-m7-l1", M, 1, {
      title: "Filmes e séries",
      objective: "Recomendar e criticar com so/such e too/enough.",
      explanation: [
        {
          title: "So × such",
          body: "**so + adjetivo**: **The ending was so sad.** · **such + (a) + adjetivo + substantivo**: **It was such a sad ending.** · Com resultado: **It was so good that I watched it twice.**",
        },
        {
          title: "Too × enough",
          body: "**too + adjetivo** = demais (problema): **It's too long.** · **adjetivo + enough** = suficiente: **It isn't funny enough.** · **enough + substantivo**: **There wasn't enough action.**",
        },
        {
          title: "Vocabulário de crítica",
          body: "**plot** (enredo), **cast** (elenco), **twist** (reviravolta), **spoiler**, **binge-watch** (maratonar), **overrated / underrated** (superestimado / subestimado), **It's worth watching.**",
        },
      ],
      vocabulary: [
        { en: "plot", pt: "enredo", say: "PLÓT" },
        { en: "cast", pt: "elenco", say: "KÉST" },
        { en: "twist", pt: "reviravolta", say: "TUÍST" },
        { en: "binge-watch", pt: "maratonar", say: "BÍNDJ-uótch" },
        { en: "overrated", pt: "superestimado", say: "ou-ver-RÊI-tid" },
        { en: "underrated", pt: "subestimado", say: "ân-der-RÊI-tid" },
        { en: "worth watching", pt: "vale a pena assistir", say: "UÂRTH UÓ-tching" },
        { en: "gripping", pt: "envolvente / que prende", say: "GRÍ-ping" },
        { en: "season", pt: "temporada", say: "SÍI-zon" },
      ],
      examples: [
        { en: "It was such a gripping series that I binge-watched it in two days.", pt: "Era uma série tão envolvente que maratonei em dois dias." },
        { en: "The plot was too slow, and the ending wasn't clear enough.", pt: "O enredo era lento demais e o final não foi claro o suficiente." },
        { en: "If you ask me, it's a bit overrated, but it's still worth watching.", pt: "Se quer saber, é meio superestimado, mas vale a pena assistir." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"It was ___ a good movie!\"", options: ["so", "such", "too"], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "\"The movie was ___ long that I fell asleep.\"", options: ["so", "such", "enough"], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "I'm not old ___ to watch that movie.", translation: "Não tenho idade suficiente...", accepted: ["enough"] },
        { type: "fill_blank", skill: "grammar", sentence: "It's ___ expensive. I can't afford it. (demais)", accepted: ["too"] },
        { type: "translate", skill: "writing", prompt: "Vale a pena assistir.", accepted: ["It's worth watching.", "It is worth watching."] },
        { type: "word_order", skill: "grammar", prompt: "O elenco é incrível, mas o enredo é fraco.", answer: "The cast is amazing, but the plot is weak.", distractors: ["such"] },
        { type: "listening", skill: "listening", prompt: "Ouça. Qual é a opinião?", audio: "Everyone loves it, but I think it's a bit overrated.", options: ["Acha a série um pouco superestimada.", "Acha a série perfeita.", "Nunca assistiu."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "No spoilers, please!", accepted: ["no spoilers please"] },
      ],
      conversation: {
        goal: "Recomende uma série ou filme ao professor sem dar spoilers, e critique um que você não gostou.",
        starter: "Have you watched anything good lately? Would you recommend it?",
      },
      review: ["so + adjetivo; such (a) + adjetivo + substantivo.", "too + adjetivo (demais); adjetivo + enough.", "plot, cast, twist, overrated, worth watching."],
    }),

    buildLesson("b1-m7-l2", M, 2, {
      title: "Música e arte",
      objective: "Descrever obras e experiências com adjetivos fortes.",
      explanation: [
        {
          title: "Adjetivos fortes",
          body: "Alguns adjetivos já são extremos: **amazing / brilliant** (muito bom), **awful / terrible** (muito ruim), **huge** (enorme), **tiny** (minúsculo), **freezing** (congelante), **exhausted** (exausto). Com eles use **absolutely / really**, nunca **very**: ~~very amazing~~ → **absolutely amazing**.",
          table: {
            head: ["Normal (very)", "Forte (absolutely)"],
            rows: [
              ["very good", "amazing / brilliant"],
              ["very bad", "awful / terrible"],
              ["very big", "huge"],
              ["very cold", "freezing"],
              ["very tired", "exhausted"],
              ["very funny", "hilarious"],
            ],
          },
        },
        {
          title: "Descrevendo arte",
          body: "**The painting is full of color.** · **The lyrics are really moving.** (letras emocionantes) · **It reminds me of...** (me lembra) · **It's not my cup of tea.** (não é a minha praia)",
        },
      ],
      vocabulary: [
        { en: "amazing", pt: "incrível", say: "a-MÊI-zing" },
        { en: "awful", pt: "horrível", say: "Ó-ful" },
        { en: "hilarious", pt: "hilário", say: "ri-LÉ-ri-âs" },
        { en: "lyrics", pt: "letra (de música)", say: "LÍ-riks" },
        { en: "moving", pt: "emocionante", say: "MÚ-ving" },
        { en: "remind of", pt: "lembrar (algo/alguém)", say: "ri-MÁIND ov" },
        { en: "exhibition", pt: "exposição", say: "ek-si-BÍ-shan" },
        { en: "not my cup of tea", pt: "não é a minha praia", say: "nót mái CÂP ov TÍI" },
        { en: "catchy", pt: "chiclete (música)", say: "KÉ-tchi" },
      ],
      examples: [
        { en: "The concert was absolutely amazing.", pt: "O show foi absolutamente incrível." },
        { en: "This song reminds me of my childhood.", pt: "Esta música me lembra minha infância." },
        { en: "Jazz isn't really my cup of tea.", pt: "Jazz não é muito a minha praia." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["The view was very amazing.", "The view was absolutely amazing.", "The view was absolutely good."], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Versão forte de \"very funny\":", options: ["hilarious", "huge", "awful"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "That song is so ___. I can't stop singing it! (chiclete)", accepted: ["catchy"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "This painting reminds me ___ my grandmother's house.", accepted: ["of"] },
        { type: "translate", skill: "writing", prompt: "As letras são muito emocionantes.", accepted: ["The lyrics are really moving.", "The lyrics are very moving."] },
        { type: "word_order", skill: "grammar", prompt: "Estava congelando no show.", answer: "It was freezing at the concert.", distractors: ["very"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "The exhibition was huge, but honestly, modern art isn't my cup of tea.", options: ["A exposição era enorme, mas arte moderna não é a praia dela.", "Adorou a exposição pequena.", "Não foi à exposição."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It was absolutely brilliant.", accepted: ["it was absolutely brilliant"] },
      ],
      conversation: {
        goal: "Fale de uma música, um artista ou uma obra que marcou você, usando adjetivos fortes e 'it reminds me of'.",
        starter: "What kind of music do you listen to? Is there a song that reminds you of a special moment?",
      },
      review: ["Adjetivos fortes + absolutely/really (nunca very).", "amazing, awful, huge, freezing, hilarious.", "remind of / not my cup of tea."],
    }),

    buildLesson("b1-m7-l3", M, 3, {
      title: "Diferenças culturais",
      objective: "Falar de normas culturais com be supposed to e be allowed to.",
      explanation: [
        {
          title: "Be supposed to",
          body: "= o que se espera / o combinado (norma, regra social): **You're supposed to tip 15% in the US.** · **We were supposed to meet at 8, but he was late.** (era para...)",
        },
        {
          title: "Be allowed to",
          body: "= ter permissão: **You're not allowed to smoke here.** · **Were you allowed to go out at night as a teenager?**",
        },
        {
          title: "Comparando culturas",
          body: "**In Brazil, it's common to...** · **whereas in the UK...** (enquanto) · **It's considered rude to...** (é considerado falta de educação) · **People tend to...** (as pessoas costumam).",
        },
      ],
      vocabulary: [
        { en: "be supposed to", pt: "dever (é o esperado)", say: "bi sa-PÔUZD tu" },
        { en: "be allowed to", pt: "ter permissão para", say: "bi a-LÁUD tu" },
        { en: "tip", pt: "gorjeta / dar gorjeta", say: "TÍP" },
        { en: "rude", pt: "mal-educado", say: "RÚUD" },
        { en: "polite", pt: "educado", say: "po-LÁIT" },
        { en: "custom", pt: "costume", say: "CÂS-tom" },
        { en: "whereas", pt: "enquanto (contraste)", say: "uér-ÉZ" },
        { en: "tend to", pt: "tender a / costumar", say: "TÉND tu" },
        { en: "punctual", pt: "pontual", say: "PÂNK-tchu-al" },
      ],
      examples: [
        { en: "In Japan, you're supposed to take your shoes off indoors.", pt: "No Japão, espera-se que você tire os sapatos dentro de casa." },
        { en: "In Brazil people tend to be late, whereas in Germany they're very punctual.", pt: "No Brasil as pessoas tendem a se atrasar, enquanto na Alemanha são muito pontuais." },
        { en: "It's considered rude to ask someone's salary.", pt: "É considerado falta de educação perguntar o salário de alguém." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"Era para o trem chegar às 9.\"", options: ["The train is supposed to arrive at 9.", "The train was supposed to arrive at 9.", "The train supposed to arrive at 9."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "You're not ___ to use your phone in the exam.", accepted: ["allowed", "supposed"] },
        { type: "fill_blank", skill: "grammar", sentence: "In the US, you're supposed ___ tip the waiter.", accepted: ["to"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"It's considered rude.\"", options: ["É considerado falta de educação.", "É considerado muito educado.", "É considerado engraçado."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Os brasileiros costumam ser muito simpáticos.", accepted: ["Brazilians tend to be very friendly.", "Brazilian people tend to be very friendly.", "Brazilians tend to be really friendly."] },
        { type: "word_order", skill: "grammar", prompt: "Nós não tínhamos permissão para sair à noite.", answer: "We weren't allowed to go out at night.", distractors: ["supposed"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "In the UK people queue for everything, whereas here it's more relaxed.", options: ["No Reino Unido fazem fila para tudo; aqui é mais tranquilo.", "Ninguém faz fila no Reino Unido.", "Aqui as filas são mais rígidas."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "You're supposed to tip.", accepted: ["you're supposed to tip", "you are supposed to tip"] },
      ],
      conversation: {
        goal: "Explique ao professor costumes brasileiros que estrangeiros estranham e compare com outro país.",
        starter: "What should a foreigner know before visiting Brazil? What are people supposed to do or not do?",
      },
      review: ["be supposed to: o esperado / o combinado.", "be allowed to: permissão.", "whereas, tend to, it's considered rude to..."],
    }),

    buildLesson("b1-m7-l4", M, 4, {
      title: "Discurso indireto II",
      objective: "Relatar perguntas, pedidos e ordens.",
      explanation: [
        {
          title: "Perguntas relatadas",
          body: "A pergunta vira frase normal (sem do/did, ordem afirmativa): \"Where do you live?\" → **She asked me where I lived.** · Sim/não usa **if/whether**: \"Are you OK?\" → **He asked if I was OK.**",
        },
        {
          title: "Pedidos e ordens",
          body: "**ask / tell + pessoa + to + verbo**: \"Please wait.\" → **She asked me to wait.** · \"Don't touch it!\" → **He told me not to touch it.**",
        },
        {
          title: "Outros verbos",
          body: "**advise** (aconselhar), **remind** (lembrar alguém), **warn** (avisar de perigo), **offer** (oferecer-se): **She reminded me to call my mom.** **He offered to help.**",
        },
      ],
      vocabulary: [
        { en: "asked if", pt: "perguntou se", say: "ÉSKT if" },
        { en: "wondered", pt: "se perguntou / queria saber", say: "UÂN-derd" },
        { en: "advise", pt: "aconselhar", say: "ad-VÁIZ" },
        { en: "remind", pt: "lembrar (alguém de algo)", say: "ri-MÁIND" },
        { en: "warn", pt: "avisar (de perigo)", say: "UÓRN" },
        { en: "offer", pt: "oferecer(-se)", say: "Ó-fer" },
        { en: "refuse", pt: "recusar(-se)", say: "ri-FIÚZ" },
        { en: "beg", pt: "implorar", say: "BÉG" },
      ],
      examples: [
        { en: "The officer asked me where I was staying.", pt: "O agente me perguntou onde eu estava hospedado." },
        { en: "She asked if I could help her.", pt: "Ela perguntou se eu podia ajudá-la." },
        { en: "The doctor told me not to lift heavy things.", pt: "O médico me disse para não levantar peso." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"Where do you work?\" → She asked me...", options: ["where do I work.", "where I worked.", "where did I work."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "\"Are you hungry?\" → He asked ___ I was hungry.", accepted: ["if", "whether"] },
        { type: "fill_blank", skill: "grammar", sentence: "\"Don't be late.\" → My boss told me ___ to be late.", accepted: ["not"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Can you close the door?\" → She asked me...", options: ["to close the door.", "closing the door.", "that I close the door."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Ele me lembrou de pagar a conta.", accepted: ["He reminded me to pay the bill."] },
        { type: "word_order", skill: "grammar", prompt: "Ela me perguntou quantos anos eu tinha.", answer: "She asked me how old I was.", distractors: ["did"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "They warned us not to swim there because of the currents.", options: ["Avisaram para não nadar lá por causa das correntes.", "Convidaram para nadar lá.", "Disseram que a água estava quente."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "He offered to help.", accepted: ["he offered to help"] },
      ],
      conversation: {
        goal: "Conte ao professor uma entrevista, consulta ou conversa com um chefe: que perguntas fizeram e o que pediram.",
        starter: "Think of the last time you had an interview or an important appointment. What did they ask you?",
      },
      review: ["Pergunta relatada: ordem afirmativa (where I lived), if/whether para sim/não.", "ask/tell + pessoa + (not) to + verbo.", "advise, remind, warn, offer."],
    }),

    buildLesson("b1-m7-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Cultura",
      objective: "Comprovar que você critica, descreve, compara culturas e relata perguntas.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"It was ___ boring movie.\"", options: ["so a", "such a", "too a"], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "The room isn't big ___ for ten people.", accepted: ["enough"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["It was very freezing.", "It was absolutely freezing.", "It was absolutely cold."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "We were ___ to meet at 7, but she forgot.", accepted: ["supposed"] },
        { type: "translate", skill: "writing", prompt: "Ela me pediu para esperar.", accepted: ["She asked me to wait."] },
        { type: "word_order", skill: "grammar", prompt: "Ele me perguntou se eu estava bem.", answer: "He asked me if I was okay." },
        { type: "multiple_choice", skill: "grammar", prompt: "\"What time does it start?\" → She asked...", options: ["what time it started.", "what time did it start.", "what time does it start."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "That series is a bit overrated, but the cast is brilliant.", options: ["A série é meio superestimada, mas o elenco é ótimo.", "A série é perfeita.", "O elenco é fraco."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It reminds me of home.", accepted: ["it reminds me of home"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["plot", "enredo"], ["rude", "mal-educado"], ["warn", "avisar"], ["lyrics", "letra"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
