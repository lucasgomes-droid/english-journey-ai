import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "a2-m8";

export const a2Module8: Module = {
  id: M,
  level: "A2",
  order: 8,
  title: "Mundo e notícias",
  description: "Consequências reais, voz passiva, -ing × to e como contar notícias.",
  lessons: [
    buildLesson("a2-m8-l1", M, 1, {
      title: "Primeira condicional",
      objective: "Falar de consequências reais com if + presente, will.",
      explanation: [
        {
          title: "If + presente, will + verbo",
          body: "Para situações possíveis e suas consequências: **If it rains, we'll stay home.** (Se chover, vamos ficar em casa.) Atenção: depois de **if** vem o **presente**, mesmo falando do futuro: ~~If it will rain~~.",
        },
        {
          title: "A ordem pode inverter",
          body: "**We'll stay home if it rains.** (sem vírgula quando o if vem depois). Com **unless** = a menos que: **We'll be late unless we leave now.**",
        },
        {
          title: "Meio ambiente",
          body: "Temas que aparecem muito: **If we recycle more, there will be less waste.** **If we don't save water, we'll have problems.**",
        },
      ],
      vocabulary: [
        { en: "if", pt: "se", say: "ÍF" },
        { en: "unless", pt: "a menos que", say: "ân-LÉS" },
        { en: "recycle", pt: "reciclar", say: "ri-SÁI-col" },
        { en: "waste", pt: "lixo / desperdício", say: "UÊIST" },
        { en: "pollution", pt: "poluição", say: "po-LÚ-shan" },
        { en: "environment", pt: "meio ambiente", say: "in-VÁI-ron-ment" },
        { en: "save", pt: "economizar / salvar", say: "SÊIV" },
        { en: "plastic", pt: "plástico", say: "PLÉS-tik" },
        { en: "climate", pt: "clima", say: "CLÁI-met" },
      ],
      examples: [
        { en: "If we use less plastic, the oceans will be cleaner.", pt: "Se usarmos menos plástico, os oceanos ficarão mais limpos." },
        { en: "If you study every day, you'll speak English soon.", pt: "Se você estudar todo dia, vai falar inglês logo." },
        { en: "I won't go unless you come with me.", pt: "Não vou a menos que você venha comigo." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "If it ___ (rain), I'll take an umbrella.", accepted: ["rains"] },
        { type: "fill_blank", skill: "grammar", sentence: "If you heat ice, it ___ melt.", translation: "Se você esquentar o gelo, ele vai derreter.", accepted: ["will", "'ll"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["If I will have time, I'll call you.", "If I have time, I'll call you.", "If I have time, I call you tomorrow."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Se você reciclar, vai ajudar o meio ambiente.", accepted: ["If you recycle, you'll help the environment.", "If you recycle, you will help the environment."] },
        { type: "word_order", skill: "grammar", prompt: "Vamos perder o ônibus a menos que a gente corra.", answer: "We'll miss the bus unless we run.", distractors: ["will"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["waste", "lixo"], ["pollution", "poluição"], ["environment", "meio ambiente"], ["unless", "a menos que"]] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "If you don't hurry, you'll miss the train.", options: ["Se não se apressar, vai perder o trem.", "O trem está atrasado.", "Você perdeu o trem."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "If it rains, we'll stay home.", accepted: ["if it rains we'll stay home", "if it rains we will stay home"] },
      ],
      conversation: {
        goal: "Discuta com o professor o que vai acontecer se as pessoas mudarem (ou não) alguns hábitos.",
        starter: "What will happen if people keep using so much plastic?",
      },
      review: ["If + presente, will + verbo.", "Nunca will depois de if.", "unless = a menos que."],
    }),

    buildLesson("a2-m8-l2", M, 2, {
      title: "Voz passiva simples",
      objective: "Descrever como algo é feito ou foi criado.",
      explanation: [
        {
          title: "Quando o foco é a coisa, não quem fez",
          body: "**be + particípio**: **Coffee is grown in Brazil.** (O café é cultivado no Brasil.) **The bridge was built in 1920.** (A ponte foi construída em 1920.) Para dizer quem fez: **by**: **The phone was invented by Bell.**",
          table: {
            head: ["Ativa", "Passiva"],
            rows: [
              ["They make cars here.", "Cars are made here."],
              ["Someone stole my bike.", "My bike was stolen."],
              ["Picasso painted it.", "It was painted by Picasso."],
            ],
          },
        },
        {
          title: "Particípios irregulares úteis",
          body: "make → **made**, build → **built**, write → **written**, steal → **stolen**, sell → **sold**, speak → **spoken**, find → **found**.",
        },
      ],
      vocabulary: [
        { en: "made in", pt: "feito em", say: "MÊID in" },
        { en: "built", pt: "construído", say: "BÍLT" },
        { en: "invented", pt: "inventado", say: "in-VÉN-tid" },
        { en: "grown", pt: "cultivado", say: "GRÔUN" },
        { en: "stolen", pt: "roubado", say: "STÔU-len" },
        { en: "written", pt: "escrito", say: "RÍ-ten" },
        { en: "spoken", pt: "falado", say: "SPÔU-ken" },
        { en: "sold", pt: "vendido", say: "SÔULD" },
        { en: "by", pt: "por (agente)", say: "BÁI" },
      ],
      examples: [
        { en: "Portuguese is spoken in Brazil and Portugal.", pt: "O português é falado no Brasil e em Portugal." },
        { en: "This house was built by my grandfather.", pt: "Esta casa foi construída pelo meu avô." },
        { en: "My wallet was stolen on the bus.", pt: "Minha carteira foi roubada no ônibus." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "These shoes are ___ (make) in Italy.", accepted: ["made"] },
        { type: "fill_blank", skill: "grammar", sentence: "The museum ___ opened in 1990.", translation: "O museu foi inaugurado em 1990.", accepted: ["was"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Meu carro foi roubado.\"", options: ["My car was stolen.", "My car stole.", "My car is steal."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "O inglês é falado no mundo todo.", accepted: ["English is spoken all over the world.", "English is spoken around the world.", "English is spoken everywhere in the world."] },
        { type: "word_order", skill: "grammar", prompt: "Este livro foi escrito por uma brasileira.", answer: "This book was written by a Brazilian woman.", distractors: ["wrote"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue base e particípio.", pairs: [["build", "built"], ["sell", "sold"], ["write", "written"], ["speak", "spoken"]] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Most of the coffee in the world is grown in Brazil.", options: ["A maior parte do café do mundo é cultivada no Brasil.", "O Brasil compra muito café.", "O café brasileiro é caro."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It was made by hand.", accepted: ["it was made by hand"] },
      ],
      conversation: {
        goal: "Descreva um produto ou lugar famoso do Brasil: onde é feito, quando foi construído, por quem.",
        starter: "Tell me about something your city or region is famous for. Where is it made?",
      },
      review: ["be + particípio: is made / was built.", "by + quem fez.", "made, built, written, stolen, sold, spoken."],
    }),

    buildLesson("a2-m8-l3", M, 3, {
      title: "Gerúndio e infinitivo",
      objective: "Usar corretamente verbo + -ing ou verbo + to.",
      explanation: [
        {
          title: "Verbos + -ing",
          body: "**enjoy, like, love, hate, don't mind, finish, stop, avoid** pedem **-ing**: **I enjoy cooking.** **She finished working at 6.** **I don't mind waiting.** (Não me importo de esperar.)",
        },
        {
          title: "Verbos + to",
          body: "**want, need, decide, plan, hope, learn, would like** pedem **to + verbo**: **I want to travel.** **We decided to stay.** **I'd like to order.**",
        },
        {
          title: "Depois de preposição: sempre -ing",
          body: "**I'm good at speaking.** **Thanks for helping.** **I'm interested in learning.** E como sujeito: **Swimming is good for you.**",
        },
      ],
      vocabulary: [
        { en: "enjoy", pt: "curtir / gostar de", say: "en-DJÓI" },
        { en: "don't mind", pt: "não se importar", say: "DÔUNT MÁIND" },
        { en: "avoid", pt: "evitar", say: "a-VÓID" },
        { en: "decide", pt: "decidir", say: "di-SÁID" },
        { en: "hope", pt: "esperar (ter esperança)", say: "RÔUP" },
        { en: "good at", pt: "bom em", say: "GÚD ét" },
        { en: "interested in", pt: "interessado em", say: "ÍN-tres-tid in" },
        { en: "give up", pt: "desistir", say: "GUÍV ÂP" },
        { en: "keep", pt: "continuar", say: "KÍIP" },
      ],
      examples: [
        { en: "I enjoy listening to podcasts in English.", pt: "Gosto de ouvir podcasts em inglês." },
        { en: "We decided to take the train.", pt: "Decidimos pegar o trem." },
        { en: "Don't give up learning!", pt: "Não desista de aprender!" },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "I enjoy ___ new places.", options: ["to visit", "visiting", "visit"], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "She wants ___ a new job.", options: ["to find", "finding", "find"], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "I'm good at ___ (cook).", accepted: ["cooking"] },
        { type: "fill_blank", skill: "grammar", sentence: "They hope ___ (move) abroad next year.", accepted: ["to move"] },
        { type: "translate", skill: "writing", prompt: "Eu não me importo de esperar.", accepted: ["I don't mind waiting.", "I do not mind waiting."] },
        { type: "word_order", skill: "grammar", prompt: "Ela parou de fumar no ano passado.", answer: "She stopped smoking last year.", distractors: ["to"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I'm interested in learning Spanish too.", options: ["Também tenho interesse em aprender espanhol.", "Já falo espanhol.", "Não gosto de espanhol."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Keep going!", accepted: ["keep going"] },
      ],
      conversation: {
        goal: "Fale do que você curte, evita, quer e decidiu fazer este ano.",
        starter: "What do you enjoy doing in your free time? And what do you want to learn this year?",
      },
      review: ["enjoy, finish, stop, avoid, don't mind + -ing.", "want, need, decide, hope, would like + to.", "Depois de preposição: -ing."],
    }),

    buildLesson("a2-m8-l4", M, 4, {
      title: "Contando notícias",
      objective: "Relatar acontecimentos recentes misturando present perfect e passado simples.",
      explanation: [
        {
          title: "A notícia e os detalhes",
          body: "Em inglês, a novidade costuma vir no **present perfect** (sem quando), e os detalhes no **passado simples** (com quando/como): **Have you heard? Ana has got a new job! She started on Monday.**",
        },
        {
          title: "Frases de conversa",
          body: "Para dar a notícia: **Guess what!** (Adivinha!) · **Did you hear about...?** Para reagir: **Really?** · **No way!** (Não acredito!) · **That's great news!** · **Oh no, that's terrible.**",
        },
      ],
      vocabulary: [
        { en: "Guess what!", pt: "Adivinha!", say: "GUÉS UÓT" },
        { en: "Have you heard?", pt: "Você ficou sabendo?", say: "rév iu RÂRD" },
        { en: "No way!", pt: "Não acredito!", say: "NÔU UÊI" },
        { en: "news", pt: "notícia(s)", say: "NÚUZ" },
        { en: "get promoted", pt: "ser promovido", say: "guét pro-MÔU-tid" },
        { en: "have a baby", pt: "ter um bebê", say: "rév a BÊI-bi" },
        { en: "break up", pt: "terminar (namoro)", say: "BRÊIK ÂP" },
        { en: "recently", pt: "recentemente", say: "RÍ-sent-li" },
        { en: "headline", pt: "manchete", say: "RÉD-láin" },
      ],
      examples: [
        { en: "Guess what! I've got promoted! They told me yesterday.", pt: "Adivinha! Fui promovido! Me contaram ontem." },
        { en: "Have you heard? Paula and Leo have broken up.", pt: "Ficou sabendo? A Paula e o Leo terminaram." },
        { en: "No way! When did it happen?", pt: "Não acredito! Quando aconteceu?" },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a melhor forma de dar a notícia e o detalhe.", options: ["I've bought a car. I've bought it last week.", "I've bought a car! I bought it last week.", "I bought a car. I've bought it last week."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "My sister ___ had a baby! She was born on Friday.", accepted: ["has", "'s"] },
        { type: "fill_blank", skill: "grammar", sentence: "When ___ it happen?", translation: "Quando aconteceu?", accepted: ["did"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Seu amigo conta algo incrível. Você reage:", options: ["No way!", "No problem.", "No, thanks."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Que ótima notícia!", accepted: ["That's great news!", "That is great news!", "What great news!"] },
        { type: "word_order", skill: "grammar", prompt: "Você ficou sabendo da festa?", answer: "Did you hear about the party?", distractors: ["heard"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Guess what! We've just won the contract.", options: ["Acabamos de ganhar o contrato!", "Perdemos o contrato.", "Vamos assinar o contrato amanhã."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Have you heard the news?", accepted: ["have you heard the news"] },
      ],
      conversation: {
        goal: "Conte três novidades (reais ou inventadas) ao professor e reaja às novidades dele.",
        starter: "Hey! Any news? What's new with you this week?",
      },
      review: ["Notícia: present perfect; detalhes: passado simples.", "Guess what! / Have you heard?", "Reações: No way! / That's great news!"],
    }),

    buildLesson("a2-m8-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Mundo e notícias",
      objective: "Comprovar que você usa condicionais, voz passiva, -ing/to e conta notícias.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar a avaliação final do A2." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "If you ___ (need) help, call me.", accepted: ["need"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Esses carros são feitos no Japão.\"", options: ["These cars make in Japan.", "These cars are made in Japan.", "These cars are make in Japan."], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "I'd like ___ a table for two.", options: ["booking", "to book", "book"], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "She avoids ___ (drive) at night.", accepted: ["driving"] },
        { type: "translate", skill: "writing", prompt: "Se chover, eu não vou.", accepted: ["If it rains, I won't go.", "If it rains, I will not go.", "I won't go if it rains."] },
        { type: "word_order", skill: "grammar", prompt: "A ponte foi construída em 1950.", answer: "The bridge was built in 1950." },
        { type: "translate", skill: "writing", prompt: "Adivinha! Eu passei na prova!", accepted: ["Guess what! I passed the exam!", "Guess what! I've passed the exam!", "Guess what! I passed the test!", "Guess what! I've passed the test!"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "If we don't leave now, we'll be late.", options: ["Se não sairmos agora, vamos nos atrasar.", "Já estamos atrasados.", "Vamos sair mais tarde."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "My phone was stolen.", accepted: ["my phone was stolen"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["enjoy", "curtir"], ["avoid", "evitar"], ["give up", "desistir"], ["news", "notícia"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
