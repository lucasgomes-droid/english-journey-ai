import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "b2-m1";

export const b2Module1: Module = {
  id: M,
  level: "B2",
  order: 1,
  title: "Tempos avançados",
  description: "Futuro contínuo e perfeito, passado perfeito contínuo, formas do futuro e hábitos com will/would.",
  lessons: [
    buildLesson("b2-m1-l1", M, 1, {
      title: "Futuro contínuo e perfeito",
      objective: "Projetar o futuro com precisão: o que estará acontecendo e o que já terá acontecido.",
      explanation: [
        {
          title: "Future continuous: will be + -ing",
          body: "Algo em andamento num momento do futuro: **This time tomorrow I'll be flying to Lisbon.** (Amanhã a esta hora estarei voando.) Também soa educado para perguntar planos: **Will you be using the car tonight?**",
        },
        {
          title: "Future perfect: will have + particípio",
          body: "Algo concluído ANTES de um momento futuro: **By 2030, I'll have paid off my apartment.** (Até 2030, terei quitado.) Quase sempre com **by** (até) ou **by the time**.",
          table: {
            head: ["Estrutura", "Exemplo"],
            rows: [
              ["will be + -ing", "At 9 pm I'll be watching the game."],
              ["will have + particípio", "By Friday we'll have finished the report."],
              ["will have been + -ing", "In May I'll have been working here for ten years."],
            ],
          },
        },
      ],
      vocabulary: [
        { en: "this time tomorrow", pt: "amanhã a esta hora", say: "dhís TÁIM tu-MÓ-rou" },
        { en: "by (+ data)", pt: "até (prazo)", say: "BÁI" },
        { en: "pay off", pt: "quitar", say: "PÊI ÓF" },
        { en: "retire", pt: "aposentar-se", say: "ri-TÁI-er" },
        { en: "milestone", pt: "marco", say: "MÁIL-stôun" },
        { en: "graduate", pt: "formar-se", say: "GRÉ-dju-êit" },
        { en: "be on the way", pt: "estar a caminho", say: "bi on dhe UÊI" },
        { en: "long-term", pt: "de longo prazo", say: "LÓNG-târm" },
      ],
      examples: [
        { en: "This time next week, I'll be lying on a beach.", pt: "Semana que vem a esta hora, estarei deitado numa praia." },
        { en: "By the end of the year, we'll have opened three new stores.", pt: "Até o fim do ano, teremos aberto três lojas novas." },
        { en: "Will you be using the meeting room this afternoon?", pt: "Você vai usar a sala de reunião hoje à tarde?" },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "By 2030, I'll ___ paid off my loan.", accepted: ["have"] },
        { type: "fill_blank", skill: "grammar", sentence: "Don't call at 8. I'll ___ having dinner.", accepted: ["be"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Até sexta, terei terminado o projeto.\"", options: ["By Friday I'll finish the project.", "By Friday I'll have finished the project.", "By Friday I'll be finishing the project."], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "Pergunta educada sobre planos:", options: ["Will you use the car tonight?", "Will you be using the car tonight?", "Are you use the car tonight?"], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Amanhã a esta hora estarei voando para Londres.", accepted: ["This time tomorrow I'll be flying to London.", "This time tomorrow I will be flying to London.", "At this time tomorrow I'll be flying to London."] },
        { type: "word_order", skill: "grammar", prompt: "Em maio, terei trabalhado aqui por dez anos.", answer: "In May, I will have worked here for ten years.", distractors: ["since"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "By the time you get here, we'll have eaten.", options: ["Quando você chegar, já teremos comido.", "Vamos esperar você para comer.", "Estamos comendo agora."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I'll be working late tonight.", accepted: ["i'll be working late tonight", "i will be working late tonight"] },
      ],
      conversation: {
        goal: "Projete sua vida: o que você estará fazendo daqui a um ano e o que terá conquistado daqui a cinco.",
        starter: "Let's look into the future. What will you be doing this time next year? And what will you have achieved in five years?",
      },
      review: ["will be + -ing: em andamento no futuro / pergunta educada.", "will have + particípio: concluído até um prazo (by).", "will have been + -ing: duração até um ponto futuro."],
    }),

    buildLesson("b2-m1-l2", M, 2, {
      title: "Passado perfeito contínuo",
      objective: "Explicar situações passadas pela atividade que vinha acontecendo antes.",
      explanation: [
        {
          title: "had been + -ing",
          body: "Uma atividade contínua ANTES de um momento passado, muitas vezes explicando um resultado: **Her eyes were red because she had been crying.** (Os olhos estavam vermelhos porque ela vinha chorando.) **We had been waiting for two hours when the bus finally came.**",
        },
        {
          title: "Simples × contínuo",
          body: "**had done**: ação concluída, resultado (I had written three emails). **had been doing**: atividade, duração, processo (I had been writing emails all morning). Verbos de estado (know, own, believe) ficam no simples.",
        },
      ],
      vocabulary: [
        { en: "exhausted", pt: "exausto", say: "ig-ZÓS-tid" },
        { en: "soaked", pt: "encharcado", say: "SÔUKT" },
        { en: "out of breath", pt: "sem fôlego", say: "áut ov BRÉTH" },
        { en: "rumor had it", pt: "diziam os boatos", say: "RÚ-mer RÉD it" },
        { en: "struggle", pt: "batalhar / ter dificuldade", say: "STRÂ-gol" },
        { en: "finally", pt: "finalmente", say: "FÁI-na-li" },
        { en: "for ages", pt: "há séculos", say: "for ÊI-djiz" },
        { en: "puzzled", pt: "intrigado", say: "PÂ-zold" },
      ],
      examples: [
        { en: "He was out of breath because he had been running.", pt: "Ele estava sem fôlego porque vinha correndo." },
        { en: "We had been dating for five years when we got married.", pt: "Namorávamos havia cinco anos quando nos casamos." },
        { en: "I had been struggling with the problem for ages before I asked for help.", pt: "Eu vinha batalhando com o problema havia séculos antes de pedir ajuda." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "The ground was wet. It had ___ raining all night.", accepted: ["been"] },
        { type: "fill_blank", skill: "grammar", sentence: "She was tired because she ___ been working since 6 am.", accepted: ["had"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Foco na atividade/duração:", options: ["I had read the book.", "I had been reading for hours when she called.", "I have read for hours when she called."], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "Verbo de estado: \"I ___ him for years before we worked together.\"", options: ["had been knowing", "had known"], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Estávamos esperando havia uma hora quando ele chegou.", accepted: ["We had been waiting for an hour when he arrived.", "We'd been waiting for an hour when he arrived.", "We had been waiting for one hour when he arrived."] },
        { type: "word_order", skill: "grammar", prompt: "Ela estava encharcada porque tinha andado na chuva.", answer: "She was soaked because she had been walking in the rain.", distractors: ["has"] },
        { type: "listening", skill: "listening", prompt: "Ouça. Por que ele estava exausto?", audio: "He was exhausted. He'd been studying for his exams all week.", options: ["Vinha estudando a semana toda.", "Tinha corrido uma maratona.", "Não dormiu por causa do barulho."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I had been waiting for ages.", accepted: ["i had been waiting for ages", "i'd been waiting for ages"] },
      ],
      conversation: {
        goal: "Explique situações do passado mostrando o que vinha acontecendo antes (por que estava cansado, irritado, feliz...).",
        starter: "Think of a time you were completely exhausted. What had you been doing?",
      },
      review: ["had been + -ing: atividade contínua antes de um momento passado.", "Explica resultados visíveis no passado.", "Verbos de estado: só had + particípio."],
    }),

    buildLesson("b2-m1-l3", M, 3, {
      title: "Formas do futuro",
      objective: "Falar do futuro com nuance: iminente, programado e quase acontecendo.",
      explanation: [
        {
          title: "Iminente",
          body: "**be about to** = estar prestes a: **The movie is about to start.** · **be on the verge of / on the point of** = à beira de: **The company is on the verge of bankruptcy.**",
        },
        {
          title: "Programado / oficial",
          body: "**be due to** = previsto para: **The train is due to arrive at 10:15.** · **be to** (formal, notícias): **The president is to visit Japan next month.** · **be set to** = deve (manchetes): **Prices are set to rise.**",
        },
        {
          title: "Probabilidade",
          body: "**be bound to** = com certeza vai: **It's bound to rain, it always does.** · **be likely / unlikely to**: **She's likely to get the promotion.**",
        },
      ],
      vocabulary: [
        { en: "be about to", pt: "estar prestes a", say: "bi a-BÁUT tu" },
        { en: "on the verge of", pt: "à beira de", say: "on dhe VÂRDJ ov" },
        { en: "be due to", pt: "estar previsto para", say: "bi DÚ tu" },
        { en: "be set to", pt: "estar para (manchete)", say: "bi SÉT tu" },
        { en: "be bound to", pt: "com certeza vai", say: "bi BÁUND tu" },
        { en: "be likely to", pt: "ser provável que", say: "bi LÁIK-li tu" },
        { en: "bankruptcy", pt: "falência", say: "BÉNK-râpt-si" },
        { en: "breakthrough", pt: "avanço decisivo", say: "BRÊIK-thru" },
      ],
      examples: [
        { en: "Hurry up! The doors are about to close.", pt: "Corre! As portas estão prestes a fechar." },
        { en: "The report is due to be published on Monday.", pt: "O relatório está previsto para segunda." },
        { en: "Scientists are on the verge of a major breakthrough.", pt: "Cientistas estão à beira de um grande avanço." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"O avião está prestes a decolar.\"", options: ["The plane is about to take off.", "The plane is due take off.", "The plane is bound take off."], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "The flight is ___ to land at 6:40.", translation: "O voo está previsto para pousar às 6:40.", accepted: ["due", "scheduled", "expected"] },
        { type: "fill_blank", skill: "grammar", sentence: "Don't worry, he's ___ to call. He always does. (com certeza)", accepted: ["bound", "sure", "certain"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Manchete: \"Fuel prices set to rise.\"", options: ["Preços dos combustíveis devem subir.", "Preços dos combustíveis caíram.", "Preços foram congelados."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "É provável que ela consiga o emprego.", accepted: ["She's likely to get the job.", "She is likely to get the job.", "It's likely that she'll get the job.", "It is likely that she will get the job."] },
        { type: "word_order", skill: "grammar", prompt: "A empresa está à beira da falência.", answer: "The company is on the verge of bankruptcy.", distractors: ["edge"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I was just about to call you!", options: ["Eu estava prestes a te ligar!", "Acabei de te ligar.", "Não vou te ligar."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "The train is due at ten.", accepted: ["the train is due at ten", "the train is due at 10"] },
      ],
      conversation: {
        goal: "Leia manchetes imaginárias com o professor e discuta o que está prestes a acontecer no seu trabalho, cidade ou país.",
        starter: "What's about to change in your life or job? Is anything due to happen soon?",
      },
      review: ["about to / on the verge of: iminente.", "due to / be to / set to: programado ou previsto.", "bound to / likely to: probabilidade."],
    }),

    buildLesson("b2-m1-l4", M, 4, {
      title: "Hábitos com will e would",
      objective: "Descrever hábitos típicos (e irritantes) com will e would.",
      explanation: [
        {
          title: "Will para hábitos presentes",
          body: "**will** descreve comportamento típico: **My grandfather will sit on the porch for hours.** Com ênfase (falado forte), mostra irritação: **He WILL leave his socks everywhere!**",
        },
        {
          title: "Would para hábitos passados",
          body: "**would** = costumava (ações repetidas, não estados): **Every summer we would go to my aunt's farm.** Com estados use **used to**: **I used to have long hair.** (~~I would have long hair~~).",
        },
        {
          title: "Be always + -ing",
          body: "Hábito irritante no presente: **She's always interrupting me!** (Ela vive me interrompendo!)",
        },
      ],
      vocabulary: [
        { en: "would (habit)", pt: "costumava (ações)", say: "UÚD" },
        { en: "tend to", pt: "tender a", say: "TÉND tu" },
        { en: "be always -ing", pt: "viver fazendo (irritante)", say: "bi ÓL-ueiz" },
        { en: "porch", pt: "varanda", say: "PÓRTCH" },
        { en: "nag", pt: "encher o saco / reclamar", say: "NÉG" },
        { en: "get on my nerves", pt: "me irritar", say: "guét on mái NÂRVZ" },
        { en: "routine", pt: "rotina", say: "ru-TÍIN" },
        { en: "summer vacation", pt: "férias de verão", say: "SÂ-mer RÓ-li-dêiz" },
      ],
      examples: [
        { en: "When I was a kid, my dad would read to us every night.", pt: "Quando eu era criança, meu pai lia para nós toda noite." },
        { en: "My colleague is always borrowing my charger!", pt: "Meu colega vive pegando meu carregador!" },
        { en: "Cats will sleep up to sixteen hours a day.", pt: "Gatos costumam dormir até dezesseis horas por dia." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Hábito passado (ação):", options: ["Every Sunday we would visit my grandmother.", "Every Sunday we would be visiting my grandmother."], answer: 0 },
        { type: "multiple_choice", skill: "grammar", prompt: "Estado passado:", options: ["I would have a dog.", "I used to have a dog."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "He's always ___ (complain) about the weather!", accepted: ["complaining"] },
        { type: "fill_blank", skill: "grammar", sentence: "In summer, we ___ swim in the river every afternoon. (costumávamos)", accepted: ["would", "used to"] },
        { type: "translate", skill: "writing", prompt: "Isso me irrita.", accepted: ["It gets on my nerves.", "That gets on my nerves.", "It annoys me.", "That annoys me."] },
        { type: "word_order", skill: "grammar", prompt: "Minha avó contava histórias por horas.", answer: "My grandmother would tell stories for hours.", distractors: ["will"] },
        { type: "listening", skill: "listening", prompt: "Ouça. Qual é o tom?", audio: "You're always losing your keys!", options: ["Irritação com um hábito.", "Elogio.", "Pergunta neutra."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "We would go there every summer.", accepted: ["we would go there every summer", "we'd go there every summer"] },
      ],
      conversation: {
        goal: "Descreva hábitos da sua infância com would e reclame (com humor) de hábitos irritantes de alguém com 'always'.",
        starter: "What would you do on summer vacation as a child? And does anyone you live with have an annoying habit?",
      },
      review: ["will: comportamento típico.", "would: ações repetidas no passado (não estados).", "be always + -ing: hábito irritante."],
    }),

    buildLesson("b2-m1-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Tempos avançados",
      objective: "Comprovar que você domina os tempos avançados.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "By next June, I will have ___ (finish) my degree.", accepted: ["finished"] },
        { type: "fill_blank", skill: "grammar", sentence: "Her hands were dirty because she had been ___ (garden).", accepted: ["gardening"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"The meeting is ___ to start. Sit down!\"", options: ["about", "due", "bound"], answer: 0 },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["I would live in Recife as a child.", "I used to live in Recife as a child."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Às 10 da noite estarei dormindo.", accepted: ["At 10 pm I'll be sleeping.", "At 10 pm I will be sleeping.", "At ten pm I'll be sleeping.", "At 10 p.m. I'll be sleeping.", "At ten o'clock I'll be sleeping."] },
        { type: "word_order", skill: "grammar", prompt: "Ele vive esquecendo o guarda-chuva.", answer: "He is always forgetting his umbrella." },
        { type: "multiple_choice", skill: "grammar", prompt: "\"It's ___ to happen sooner or later.\" (com certeza)", options: ["bound", "about", "due"], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "We had been driving for six hours when the car broke down.", options: ["Dirigiam havia seis horas quando o carro quebrou.", "O carro quebrou antes de saírem.", "Dirigiram seis horas sem problemas."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Will you be joining us?", accepted: ["will you be joining us"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["on the verge of", "à beira de"], ["pay off", "quitar"], ["milestone", "marco"], ["bankruptcy", "falência"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
