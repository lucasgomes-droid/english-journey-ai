import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "b2-m8";

export const b2Module8: Module = {
  id: M,
  level: "B2",
  order: 8,
  title: "Ênfase e estilo",
  description: "Frases clivadas, inversão, orações reduzidas e ajuste de registro.",
  lessons: [
    buildLesson("b2-m8-l1", M, 1, {
      title: "Frases clivadas",
      objective: "Enfatizar informações com what... is e it was... that.",
      explanation: [
        {
          title: "What + frase + is/was",
          body: "Destaca o que importa: **I need a vacation.** → **What I need is a vacation.** · **What annoys me is the noise.** · **What we did was (to) call the police.**",
        },
        {
          title: "It is/was + X + that/who",
          body: "Corrige ou destaca um elemento: **It was Ana who called, not Pedro.** · **It's the price that worries me.** · **It wasn't until midnight that we finished.** (Só à meia-noite terminamos.)",
        },
        {
          title: "Outras",
          body: "**All I want is...** (Tudo que eu quero é...) · **The reason why... is that...** · **The thing that surprised me was...**",
        },
      ],
      vocabulary: [
        { en: "What I need is", pt: "O que eu preciso é", say: "uót ái NÍID iz" },
        { en: "It was ... who", pt: "Foi ... quem", say: "it uóz ... RÚ" },
        { en: "It wasn't until", pt: "Só quando / só em", say: "it UÓ-zent ân-TÍL" },
        { en: "All I want is", pt: "Tudo que eu quero é", say: "ÓL ái UÓNT iz" },
        { en: "the reason why", pt: "o motivo pelo qual", say: "dhe RÍI-zon UÁI" },
        { en: "emphasize", pt: "enfatizar", say: "ÉM-fa-sáiz" },
        { en: "annoy", pt: "irritar", say: "a-NÓI" },
        { en: "realize", pt: "perceber", say: "RÍ-a-láiz" },
      ],
      examples: [
        { en: "What I love about this city is the food.", pt: "O que eu amo nesta cidade é a comida." },
        { en: "It was my sister who told me, not my mother.", pt: "Foi minha irmã quem me contou, não minha mãe." },
        { en: "It wasn't until I moved abroad that I realized how much I missed home.", pt: "Só quando me mudei para fora percebi o quanto sentia falta de casa." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "___ I need is a good night's sleep.", accepted: ["What", "All"] },
        { type: "fill_blank", skill: "grammar", sentence: "It was John ___ broke the window, not me.", accepted: ["who", "that"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Só quando ela ligou eu entendi.\"", options: ["It wasn't until she called that I understood.", "It was until she called I understood.", "Until she called, I didn't understood."], answer: 0 },
        { type: "multiple_choice", skill: "grammar", prompt: "Ênfase em \"the traffic\":", options: ["The traffic annoys me.", "What annoys me is the traffic.", "Me annoys the traffic."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Tudo que eu quero é paz.", accepted: ["All I want is peace.", "All I want is some peace."] },
        { type: "word_order", skill: "grammar", prompt: "O que me surpreendeu foi o preço.", answer: "What surprised me was the price.", distractors: ["that"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "It's not the money that matters, it's the experience.", options: ["Não é o dinheiro que importa, é a experiência.", "O dinheiro é o que mais importa.", "A experiência custa muito dinheiro."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "What I need is a vacation.", accepted: ["what i need is a vacation"] },
      ],
      conversation: {
        goal: "Fale do que você mais ama e do que mais te irrita no seu trabalho ou cidade usando frases clivadas.",
        starter: "What do you love most about where you live? And what really annoys you? Start with 'What I...'.",
      },
      review: ["What + frase + is/was...", "It was X who/that...", "It wasn't until... that..."],
    }),

    buildLesson("b2-m8-l2", M, 2, {
      title: "Inversão I",
      objective: "Usar inversão para ênfase com advérbios negativos.",
      explanation: [
        {
          title: "Advérbio negativo no início → ordem de pergunta",
          body: "**Never have I seen such a mess.** (Nunca vi tamanha bagunça.) · **Rarely do we get snow here.** · **Not only is it cheap, but it's also fast.** · **Hardly had I arrived when the phone rang.** · **Under no circumstances should you open this.**",
          table: {
            head: ["Normal", "Com inversão"],
            rows: [
              ["I have never seen...", "Never have I seen..."],
              ["We rarely go out.", "Rarely do we go out."],
              ["It is not only cheap...", "Not only is it cheap..."],
              ["You should not open it.", "Under no circumstances should you open it."],
            ],
          },
        },
        {
          title: "Registro",
          body: "É formal ou dramático: discursos, textos escritos, ênfase em apresentações. No dia a dia, a ordem normal é mais natural.",
        },
      ],
      vocabulary: [
        { en: "never have I", pt: "nunca eu", say: "NÉ-ver rév ái" },
        { en: "rarely", pt: "raramente", say: "RÉR-li" },
        { en: "seldom", pt: "raramente (formal)", say: "SÉL-dom" },
        { en: "not only ... but also", pt: "não só ... mas também", say: "nót ÔUN-li ... bât ÓL-sou" },
        { en: "hardly ... when", pt: "mal ... quando", say: "RÁRD-li ... uén" },
        { en: "under no circumstances", pt: "em hipótese alguma", say: "ân-der NÔU SÂR-cum-sténsiz" },
        { en: "little did I know", pt: "mal sabia eu", say: "LÍ-tol did ái NÔU" },
        { en: "on no account", pt: "de modo algum", say: "on NÔU a-CÁUNT" },
      ],
      examples: [
        { en: "Never have I tasted such delicious food.", pt: "Nunca provei comida tão deliciosa." },
        { en: "Not only did she win, but she also broke the record.", pt: "Ela não só ganhou, como também bateu o recorde." },
        { en: "Little did I know that my life was about to change.", pt: "Mal sabia eu que minha vida estava prestes a mudar." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["Never I have seen this.", "Never have I seen this.", "Never I saw this."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "Rarely ___ we eat out these days.", accepted: ["do"] },
        { type: "fill_blank", skill: "grammar", sentence: "Not only ___ he late, but he also forgot the tickets.", accepted: ["was"] },
        { type: "fill_blank", skill: "grammar", sentence: "Under no circumstances ___ you share your password.", accepted: ["should", "must"] },
        { type: "translate", skill: "writing", prompt: "Mal sabia eu que ele era o dono.", accepted: ["Little did I know that he was the owner.", "Little did I know he was the owner."] },
        { type: "word_order", skill: "grammar", prompt: "Mal tínhamos começado quando a luz acabou.", answer: "Hardly had we started when the power went out.", distractors: ["did"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Seldom do we see such talent in someone so young.", options: ["Raramente vemos tanto talento em alguém tão jovem.", "Sempre vemos jovens talentosos.", "Ele não tem talento."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Never have I been so happy.", accepted: ["never have i been so happy"] },
      ],
      conversation: {
        goal: "Faça um mini discurso dramático (formatura, prêmio, lançamento) usando três inversões.",
        starter: "Imagine you've just won an award. Give a short, dramatic speech. Use 'Never have I...' or 'Not only...'.",
      },
      review: ["Advérbio negativo no início + ordem de pergunta.", "Never have I / Rarely do we / Not only is it / Little did I know.", "Formal ou dramático."],
    }),

    buildLesson("b2-m8-l3", M, 3, {
      title: "Orações reduzidas",
      objective: "Escrever com concisão usando participle clauses.",
      explanation: [
        {
          title: "-ing (ação simultânea ou causa)",
          body: "**Walking home, I saw an accident.** (= While I was walking home) · **Not knowing what to do, she called her mother.** (= Because she didn't know)",
        },
        {
          title: "Particípio (passivo)",
          body: "**Built in 1890, the theater is the oldest in the city.** (= It was built...) · **Asked about the issue, the minister refused to comment.**",
        },
        {
          title: "Having + particípio (antes)",
          body: "**Having finished the report, he went home.** (= After he had finished) · Cuidado: o sujeito das duas partes precisa ser o mesmo. ~~Walking down the street, the rain started.~~ (a chuva não andava!)",
        },
      ],
      vocabulary: [
        { en: "having finished", pt: "tendo terminado", say: "RÉ-ving FÍ-nisht" },
        { en: "not knowing", pt: "sem saber", say: "nót NÔU-ing" },
        { en: "built", pt: "construído", say: "BÍLT" },
        { en: "located", pt: "localizado", say: "LÔU-kêi-tid" },
        { en: "concise", pt: "conciso", say: "con-SÁIS" },
        { en: "founded", pt: "fundado", say: "FÁUN-did" },
        { en: "surrounded by", pt: "cercado por", say: "sa-RÁUN-did bái" },
        { en: "realizing", pt: "percebendo", say: "RÍ-a-lái-zing" },
      ],
      examples: [
        { en: "Located in the city center, the hotel is close to everything.", pt: "Localizado no centro, o hotel fica perto de tudo." },
        { en: "Having lived in London, she speaks with a British accent.", pt: "Tendo morado em Londres, ela fala com sotaque britânico." },
        { en: "Not knowing the language, I used gestures.", pt: "Sem saber a língua, usei gestos." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Reduza: \"Because I didn't have money, I stayed home.\"", options: ["Not having money, I stayed home.", "Not had money, I stayed home.", "Having not money, I stayed home."], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "___ in 1950, the company now has 2,000 employees. (fundada)", accepted: ["Founded"] },
        { type: "fill_blank", skill: "grammar", sentence: "Having ___ (finish) dinner, we went for a walk.", accepted: ["finished"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Qual frase tem erro de sujeito?", options: ["Walking to work, I met an old friend.", "Walking to work, the rain started."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Cercada por montanhas, a cidade é muito fria.", accepted: ["Surrounded by mountains, the city is very cold.", "Surrounded by mountains, the town is very cold."] },
        { type: "word_order", skill: "grammar", prompt: "Percebendo o erro, ele pediu desculpas.", answer: "Realizing his mistake, he apologized.", distractors: ["realized"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Asked about the delay, the manager blamed the weather.", options: ["Perguntado sobre o atraso, o gerente culpou o tempo.", "O gerente perguntou sobre o tempo.", "Não houve atraso."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Having said that, I agree.", accepted: ["having said that i agree"] },
      ],
      conversation: {
        goal: "Descreva sua cidade e sua trajetória de forma concisa, como num texto de apresentação, usando orações reduzidas.",
        starter: "Write the 'About me' section of your LinkedIn out loud. Make it concise and elegant.",
      },
      review: ["-ing: ação simultânea ou causa.", "Particípio: sentido passivo (Built in...).", "Having + particípio: ação anterior. Mesmo sujeito!"],
    }),

    buildLesson("b2-m8-l4", M, 4, {
      title: "Registro",
      objective: "Ajustar o registro entre formal e informal.",
      explanation: [
        {
          title: "O mesmo, em dois tons",
          body: "Informal → formal: **get** → obtain/receive · **ask for** → request · **need** → require · **help** → assist · **buy** → purchase · **find out** → discover · **start** → commence · **enough** → sufficient · **sorry** → we apologize.",
          table: {
            head: ["Informal", "Formal"],
            rows: [
              ["We need more info.", "Further information is required."],
              ["Can you help?", "Would you be able to assist?"],
              ["Sorry for the wait.", "We apologize for the delay."],
              ["Let me know.", "Please do not hesitate to contact us."],
            ],
          },
        },
        {
          title: "Marcas de registro",
          body: "Formal: passiva, nominalização, palavras latinas, sem contrações. Informal: phrasal verbs, contrações, perguntas diretas, \"stuff\", \"a bunch of\". Nenhum é melhor: o erro é usar o tom errado para a situação.",
        },
      ],
      vocabulary: [
        { en: "require", pt: "exigir / precisar", say: "ri-KUÁI-er" },
        { en: "assist", pt: "auxiliar", say: "a-SÍST" },
        { en: "purchase", pt: "compra / comprar", say: "PÂR-tchas" },
        { en: "obtain", pt: "obter", say: "ob-TÊIN" },
        { en: "sufficient", pt: "suficiente", say: "sa-FÍ-shent" },
        { en: "commence", pt: "iniciar", say: "co-MÉNS" },
        { en: "inquire", pt: "informar-se / perguntar", say: "in-KUÁI-er" },
        { en: "register", pt: "registro / nível de formalidade", say: "RÉ-djis-ter" },
        { en: "casual", pt: "casual / informal", say: "KÉ-jual" },
      ],
      examples: [
        { en: "Further information is required to process your application.", pt: "São necessárias mais informações para processar sua inscrição." },
        { en: "Would you be able to assist me with this matter?", pt: "Você poderia me auxiliar com este assunto?" },
        { en: "Hey, can you give me a hand with this stuff?", pt: "Ei, me dá uma mão com essas coisas? (informal)" },
      ],
      exercises: [
        { type: "multiple_choice", skill: "writing", prompt: "Versão formal de \"We need more money\":", options: ["We need more cash.", "Additional funding is required.", "We want more money, OK?"], answer: 1 },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue informal → formal.", pairs: [["buy", "purchase"], ["help", "assist"], ["get", "obtain"], ["start", "commence"]] },
        { type: "fill_blank", skill: "writing", sentence: "We ___ for any inconvenience caused. (formal de 'sorry')", accepted: ["apologize", "apologize"] },
        { type: "multiple_choice", skill: "writing", prompt: "Qual é adequada para uma mensagem a um amigo?", options: ["I am writing to inquire about your availability.", "Hey, are you free on Saturday?"], answer: 1 },
        { type: "translate", skill: "writing", prompt: "São necessárias mais informações. (formal)", accepted: ["Further information is required.", "More information is required.", "Additional information is required."] },
        { type: "word_order", skill: "writing", prompt: "Você poderia me auxiliar?", answer: "Would you be able to assist me?", distractors: ["help"] },
        { type: "listening", skill: "listening", prompt: "Ouça. O registro é formal ou informal?", audio: "Passengers are kindly requested to remain seated until the aircraft has come to a complete stop.", options: ["Formal.", "Informal.", "Gíria."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Is that sufficient?", accepted: ["is that sufficient"] },
      ],
      conversation: {
        goal: "Diga a mesma coisa em dois registros: um pedido ao seu melhor amigo e o mesmo pedido ao diretor da empresa.",
        starter: "Ask me for a day off, first as if I were your best friend, then as if I were the company director.",
      },
      review: ["Formal: purchase, assist, require, obtain, passiva, sem contrações.", "Informal: phrasal verbs, contrações, perguntas diretas.", "O erro é usar o tom errado."],
    }),

    buildLesson("b2-m8-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Ênfase e estilo",
      objective: "Comprovar que você enfatiza e ajusta estilo e registro.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar a avaliação final do B2." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "___ I really need is more time.", accepted: ["What", "All"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["Rarely we go to the movies.", "Rarely do we go to the movies.", "Rarely go we to the movies."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "It wasn't ___ I left that I realized my mistake.", accepted: ["until"] },
        { type: "fill_blank", skill: "grammar", sentence: "Having ___ (read) the contract, she signed it.", accepted: ["read"] },
        { type: "multiple_choice", skill: "writing", prompt: "Formal de \"buy\":", options: ["purchase", "grab", "get"], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Foi a Maria quem resolveu o problema.", accepted: ["It was Maria who solved the problem.", "It was Maria that solved the problem.", "It was Maria who fixed the problem."] },
        { type: "word_order", skill: "grammar", prompt: "Não só é barato, como também é rápido.", answer: "Not only is it cheap, but it is also fast." },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Located near the beach, the hotel is ideal for families.", options: ["Localizado perto da praia, o hotel é ideal para famílias.", "O hotel fica longe da praia.", "O hotel não aceita crianças."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Little did I know.", accepted: ["little did i know"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["require", "exigir"], ["seldom", "raramente"], ["founded", "fundado"], ["assist", "auxiliar"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
