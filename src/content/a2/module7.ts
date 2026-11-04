import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "a2-m7";

export const a2Module7: Module = {
  id: M,
  level: "A2",
  order: 7,
  title: "Pessoas e relações",
  description: "Amizades, há quanto tempo, como era antes e pronomes do dia a dia.",
  lessons: [
    buildLesson("a2-m7-l1", M, 1, {
      title: "Amizades",
      objective: "Falar de amigos e relações com phrasal verbs comuns.",
      explanation: [
        {
          title: "Phrasal verbs: verbo + partícula",
          body: "Muitos verbos mudam de sentido com uma partícula. Os mais usados para relações: **get on (well) with** (se dar bem com), **hang out** (sair, passar tempo junto), **fall out** (brigar, se desentender), **make up** (fazer as pazes), **catch up** (pôr o papo em dia), **ask out** (chamar para sair).",
        },
        {
          title: "Como aprender",
          body: "Não traduza partícula por partícula: aprenda o bloco inteiro com um exemplo. **I get on well with my sister.** = Eu me dou bem com minha irmã.",
        },
      ],
      vocabulary: [
        { en: "get on with", pt: "se dar bem com", say: "guét ÓN uidh" },
        { en: "hang out", pt: "sair / ficar junto", say: "RÉNG ÁUT" },
        { en: "fall out", pt: "brigar / se desentender", say: "FÓL ÁUT" },
        { en: "make up", pt: "fazer as pazes", say: "MÊIK ÂP" },
        { en: "catch up", pt: "pôr o papo em dia", say: "KÉTCH ÂP" },
        { en: "ask out", pt: "chamar para sair", say: "ÉSK ÁUT" },
        { en: "close friend", pt: "amigo próximo", say: "CLÔUS FRÉND" },
        { en: "trust", pt: "confiar", say: "TRÂST" },
        { en: "neighbor", pt: "vizinho", say: "NÊI-ber" },
      ],
      examples: [
        { en: "I get on really well with my colleagues.", pt: "Eu me dou muito bem com meus colegas." },
        { en: "We used to hang out every weekend.", pt: "A gente saía todo fim de semana." },
        { en: "Let's grab a coffee and catch up!", pt: "Vamos tomar um café e pôr o papo em dia!" },
      ],
      exercises: [
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue os phrasal verbs.", pairs: [["hang out", "sair junto"], ["fall out", "brigar"], ["make up", "fazer as pazes"], ["catch up", "pôr o papo em dia"]] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Do you get ___ well with your boss?", translation: "Você se dá bem com seu chefe?", accepted: ["on", "along"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"They fell out last year, but they made up.\"", options: ["Brigaram e fizeram as pazes.", "Caíram e se machucaram.", "Saíram juntos e se maquiaram."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Nós saímos juntos às vezes.", accepted: ["We hang out sometimes.", "We sometimes hang out.", "Sometimes we hang out."] },
        { type: "word_order", skill: "grammar", prompt: "Ele a chamou para sair.", answer: "He asked her out.", distractors: ["outed"] },
        { type: "translate", skill: "writing", prompt: "Eu confio na minha melhor amiga.", accepted: ["I trust my best friend."] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "We don't really get on. We always argue.", options: ["Eles se dão bem.", "Eles não se dão bem e sempre discutem.", "Eles nunca se viram."], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Let's catch up soon.", accepted: ["let's catch up soon", "let us catch up soon"] },
      ],
      conversation: {
        goal: "Fale de um amigo próximo: como se conheceram, o que fazem juntos e se já brigaram.",
        starter: "Tell me about a close friend. How did you meet, and what do you like doing together?",
      },
      review: ["get on with, hang out, fall out, make up, catch up, ask out.", "Aprenda o bloco inteiro, com exemplo."],
    }),

    buildLesson("a2-m7-l2", M, 2, {
      title: "Desde quando?",
      objective: "Dizer há quanto tempo algo acontece com for e since.",
      explanation: [
        {
          title: "O erro clássico do brasileiro",
          body: "\"Moro aqui há 5 anos\" NÃO é ~~I live here for 5 years~~. Em inglês, algo que começou no passado e continua usa o **present perfect**: **I've lived here for five years.**",
        },
        {
          title: "For × since",
          body: "**for** + período (quanto tempo): for two weeks, for a long time. **since** + ponto de início (desde quando): since 2019, since Monday, since I was a child.",
        },
        {
          title: "A pergunta",
          body: "**How long have you worked here?** (Há quanto tempo você trabalha aqui?) **How long have you known her?** (Há quanto tempo você a conhece?) Com ações em andamento também: **I've been studying English for a year.**",
        },
      ],
      vocabulary: [
        { en: "How long...?", pt: "Há quanto tempo...?", say: "RÁU LÓNG" },
        { en: "for", pt: "por / há (período)", say: "FÓR" },
        { en: "since", pt: "desde", say: "SÍNS" },
        { en: "known (know)", pt: "conhecido (conhecer)", say: "NÔUN" },
        { en: "a long time", pt: "muito tempo", say: "a LÓNG TÁIM" },
        { en: "married", pt: "casado", say: "MÉ-rid" },
        { en: "get married", pt: "casar-se", say: "guét MÉ-rid" },
        { en: "change", pt: "mudança / mudar", say: "TCHÊINDJ" },
        { en: "childhood", pt: "infância", say: "TCHÁILD-hud" },
      ],
      examples: [
        { en: "I've lived in Macatuba since 2015.", pt: "Moro em Macatuba desde 2015." },
        { en: "They've been married for ten years.", pt: "Eles são casados há dez anos." },
        { en: "How long have you known him?", pt: "Há quanto tempo você o conhece?" },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"Trabalho aqui há dois anos.\"", options: ["I work here for two years.", "I've worked here for two years.", "I'm working here since two years."], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "I've known her ___ we were kids.", options: ["for", "since"], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "We've been friends ___ twenty years.", options: ["for", "since"], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "How long ___ you lived in this city?", accepted: ["have"] },
        { type: "translate", skill: "writing", prompt: "Eu estudo inglês há um ano.", accepted: ["I've studied English for a year.", "I have studied English for a year.", "I've been studying English for a year.", "I have been studying English for a year.", "I've been studying English for one year.", "I've studied English for one year."] },
        { type: "word_order", skill: "grammar", prompt: "Eles são casados desde 2010.", answer: "They have been married since 2010.", distractors: ["for"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I haven't seen him since last Christmas.", options: ["Não o vejo desde o último Natal.", "Eu o vi no último Natal.", "Vou vê-lo no Natal."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "How long have you worked here?", accepted: ["how long have you worked here"] },
      ],
      conversation: {
        goal: "Responda perguntas de \"há quanto tempo\" sobre sua casa, trabalho, amigos e hobbies.",
        starter: "How long have you lived in your city? And how long have you been learning English?",
      },
      review: ["Começou no passado e continua: present perfect.", "for + período; since + início.", "How long have you...?"],
    }),

    buildLesson("a2-m7-l3", M, 3, {
      title: "Costumava...",
      objective: "Falar de hábitos do passado com used to.",
      explanation: [
        {
          title: "Used to",
          body: "**used to + verbo** = costumava (hábito ou estado do passado que não existe mais): **I used to play soccer every day.** **She used to have long hair.**",
        },
        {
          title: "Negativa e pergunta",
          body: "**I didn't use to like vegetables.** (sem -d depois de didn't) · **Did you use to live here?** Na fala, used to soa \"iússtu\".",
        },
        {
          title: "Cuidado",
          body: "**used to** (costumava) é diferente de **be used to** (estar acostumado): **I'm used to waking up early.** Neste nível, foque no primeiro.",
        },
      ],
      vocabulary: [
        { en: "used to", pt: "costumava", say: "IÚS-tu" },
        { en: "when I was a kid", pt: "quando eu era criança", say: "uén ái uóz a KÍD" },
        { en: "grow up (grew up)", pt: "crescer (cresci)", say: "GRÔU ÂP / GRÚ ÂP" },
        { en: "toy", pt: "brinquedo", say: "TÓI" },
        { en: "climb trees", pt: "subir em árvores", say: "CLÁIM TRÍIZ" },
        { en: "anymore", pt: "mais (não ... mais)", say: "é-ni-MÓR" },
        { en: "nowadays", pt: "hoje em dia", say: "NÁU-a-dêiz" },
        { en: "remember", pt: "lembrar", say: "ri-MÉM-ber" },
      ],
      examples: [
        { en: "When I was a kid, I used to climb trees.", pt: "Quando eu era criança, costumava subir em árvores." },
        { en: "I didn't use to like coffee, but now I love it.", pt: "Eu não gostava de café, mas agora adoro." },
        { en: "We used to live in the countryside.", pt: "A gente morava no interior." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "My grandfather ___ to work on a farm.", translation: "Meu avô trabalhava numa fazenda.", accepted: ["used"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a negativa correta.", options: ["I didn't used to smoke.", "I didn't use to smoke.", "I don't used to smoke."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Você costumava brincar na rua?", accepted: ["Did you use to play in the street?", "Did you use to play outside?", "Did you use to play on the street?"] },
        { type: "translate", skill: "writing", prompt: "Eu não moro mais lá.", accepted: ["I don't live there anymore.", "I don't live there any more.", "I do not live there anymore."] },
        { type: "word_order", skill: "grammar", prompt: "Ela costumava ter cabelo curto.", answer: "She used to have short hair.", distractors: ["uses"] },
        { type: "multiple_choice", skill: "reading", prompt: "\"I used to be shy.\" O que isso quer dizer?", options: ["Ainda sou tímido.", "Eu era tímido, mas não sou mais.", "Vou ficar tímido."], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "We used to go to the beach every summer.", options: ["A gente ia à praia todo verão.", "Vamos à praia no verão.", "Nunca fomos à praia."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I used to live there.", accepted: ["i used to live there"] },
      ],
      conversation: {
        goal: "Compare sua infância com a sua vida hoje: o que você costumava fazer e não faz mais.",
        starter: "What did you use to do when you were a child? Do you still do it?",
      },
      review: ["used to + verbo: hábito passado que acabou.", "didn't use to / Did you use to...?", "not ... anymore: não ... mais."],
    }),

    buildLesson("a2-m7-l4", M, 4, {
      title: "Pronomes",
      objective: "Usar something, anyone, nowhere e os reflexivos.",
      explanation: [
        {
          title: "Some-, any-, no-, every-",
          body: "**some-** em afirmativas e ofertas: **something, someone, somewhere**. **any-** em perguntas e negativas: **Is there anything I can do? I didn't see anyone.** **no-** já é negativo (não use outro not): **Nobody called.** **every-** = tudo/todos: **Everyone is here.**",
          table: {
            head: ["", "coisa", "pessoa", "lugar"],
            rows: [
              ["some-", "something", "someone / somebody", "somewhere"],
              ["any-", "anything", "anyone / anybody", "anywhere"],
              ["no-", "nothing", "no one / nobody", "nowhere"],
              ["every-", "everything", "everyone / everybody", "everywhere"],
            ],
          },
        },
        {
          title: "Reflexivos",
          body: "**myself, yourself, himself, herself, ourselves, themselves**: quando a ação volta para a própria pessoa ou para dizer \"sozinho\": **I cut myself.** **She built it herself.** **Enjoy yourself!** (Divirta-se!)",
        },
      ],
      vocabulary: [
        { en: "something", pt: "algo / alguma coisa", say: "SÂM-thing" },
        { en: "anyone", pt: "alguém / ninguém (neg.)", say: "É-ni-uân" },
        { en: "nobody", pt: "ninguém", say: "NÔU-bó-di" },
        { en: "nowhere", pt: "lugar nenhum", say: "NÔU-uér" },
        { en: "everything", pt: "tudo", say: "É-vri-thing" },
        { en: "everyone", pt: "todo mundo", say: "É-vri-uân" },
        { en: "myself", pt: "eu mesmo / me", say: "mái-SÉLF" },
        { en: "by yourself", pt: "sozinho (você)", say: "bái iór-SÉLF" },
        { en: "Help yourself!", pt: "Fique à vontade / Sirva-se!", say: "RÉLP iór-SÉLF" },
      ],
      examples: [
        { en: "Is there anything I can do?", pt: "Tem alguma coisa que eu possa fazer?" },
        { en: "Nobody knows the answer.", pt: "Ninguém sabe a resposta." },
        { en: "Did you make this cake yourself?", pt: "Você mesmo fez este bolo?" },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["I didn't see nobody.", "I didn't see anybody.", "I didn't see somebody."], answer: 1, explain: "Negativa com didn't + any-. Ou: I saw nobody." },
        { type: "fill_blank", skill: "grammar", sentence: "There's ___ at the door. Can you check? (alguém)", accepted: ["someone", "somebody"] },
        { type: "fill_blank", skill: "grammar", sentence: "___ loved the party. (todo mundo)", accepted: ["Everyone", "Everybody"] },
        { type: "fill_blank", skill: "grammar", sentence: "She taught ___ to play the guitar.", translation: "Ela aprendeu a tocar violão sozinha.", accepted: ["herself"] },
        { type: "translate", skill: "writing", prompt: "Não há nada na geladeira.", accepted: ["There's nothing in the fridge.", "There is nothing in the fridge.", "There isn't anything in the fridge."] },
        { type: "word_order", skill: "grammar", prompt: "Você quer beber alguma coisa?", answer: "Do you want something to drink?", distractors: ["nothing"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I looked everywhere, but I couldn't find my keys anywhere.", options: ["Procurei em todo lugar e não achei as chaves.", "Achei as chaves no carro.", "Não procurei as chaves."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Help yourself!", accepted: ["help yourself"] },
      ],
      conversation: {
        goal: "Planeje uma festa: pergunte se alguém pode ajudar, se falta alguma coisa e quem vai fazer o quê.",
        starter: "We're having people over tonight. Is there anything we need to buy?",
      },
      review: ["some- (afirmativa), any- (pergunta/negativa), no- (já negativo), every- (todos).", "Reflexivos: myself, yourself, herself...", "Nunca: didn't + nobody."],
    }),

    buildLesson("a2-m7-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Pessoas e relações",
      objective: "Comprovar que você fala de relações, tempo e passado habitual.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"Conheço o Rafael há 10 anos.\"", options: ["I know Rafael for 10 years.", "I've known Rafael for 10 years.", "I've known Rafael since 10 years."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "I ___ to live with my parents. Now I live alone.", accepted: ["used"] },
        { type: "fill_blank", skill: "grammar", sentence: "She's lived here ___ 2018.", accepted: ["since"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"We hang out a lot.\"", options: ["A gente sai muito junto.", "A gente pendura muita coisa.", "A gente briga muito."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Ninguém me ligou.", accepted: ["Nobody called me.", "No one called me.", "Nobody called.", "No one called."] },
        { type: "word_order", skill: "grammar", prompt: "Eu me dou bem com meu irmão.", answer: "I get on well with my brother." },
        { type: "translate", skill: "writing", prompt: "Há quanto tempo você mora aqui?", accepted: ["How long have you lived here?", "How long have you been living here?"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "They fell out, but they made up a week later.", options: ["Brigaram e fizeram as pazes uma semana depois.", "Nunca mais se falaram.", "Saíram juntos na semana passada."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Is there anything I can do?", accepted: ["is there anything i can do"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["nothing", "nada"], ["nowhere", "lugar nenhum"], ["everyone", "todo mundo"], ["myself", "eu mesmo"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
