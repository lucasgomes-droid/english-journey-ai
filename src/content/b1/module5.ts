import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "b1-m5";

export const b1Module5: Module = {
  id: M,
  level: "B1",
  order: 5,
  title: "Sociedade",
  description: "Voz passiva completa, orações relativas, adaptação e meio ambiente.",
  lessons: [
    buildLesson("b1-m5-l1", M, 1, {
      title: "Voz passiva completa",
      objective: "Descrever processos e notícias na voz passiva em vários tempos.",
      explanation: [
        {
          title: "be no tempo certo + particípio",
          body: "O verbo **be** carrega o tempo: **is made** (presente) · **was built** (passado) · **is being repaired** (agora) · **has been sold** (present perfect) · **will be announced** (futuro) · **must be signed** (modal).",
          table: {
            head: ["Tempo", "Exemplo"],
            rows: [
              ["Presente", "Emails are checked every day."],
              ["Contínuo", "The road is being repaired."],
              ["Present perfect", "The suspect has been arrested."],
              ["Passado", "The museum was opened in 1990."],
              ["Futuro", "The results will be published tomorrow."],
              ["Modal", "The form must be signed."],
            ],
          },
        },
        {
          title: "Quando usar",
          body: "Em notícias, processos e textos formais, quando quem fez é desconhecido, óbvio ou menos importante: **My car has been stolen!** (não importa quem).",
        },
      ],
      vocabulary: [
        { en: "arrest", pt: "prender", say: "a-RÉST" },
        { en: "announce", pt: "anunciar", say: "a-NÁUNS" },
        { en: "publish", pt: "publicar", say: "PÂ-blish" },
        { en: "repair", pt: "consertar / reforma", say: "ri-PÉR" },
        { en: "injured", pt: "ferido", say: "ÍN-djerd" },
        { en: "launch", pt: "lançar / lançamento", say: "LÓNTCH" },
        { en: "process", pt: "processo", say: "PRÓ-ses" },
        { en: "sign", pt: "assinar", say: "SÁIN" },
        { en: "award", pt: "prêmio / premiar", say: "a-UÓRD" },
      ],
      examples: [
        { en: "The bridge is being repaired, so the road is closed.", pt: "A ponte está sendo reformada, então a rua está fechada." },
        { en: "Two people have been injured in the accident.", pt: "Duas pessoas ficaram feridas no acidente." },
        { en: "The winner will be announced on Friday.", pt: "O vencedor será anunciado na sexta." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "The new product will ___ launched next month.", accepted: ["be"] },
        { type: "fill_blank", skill: "grammar", sentence: "My laptop is ___ repaired right now.", accepted: ["being"] },
        { type: "fill_blank", skill: "grammar", sentence: "Three people have ___ arrested.", accepted: ["been"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"O contrato deve ser assinado hoje.\"", options: ["The contract must sign today.", "The contract must be signed today.", "The contract must be sign today."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Os resultados serão publicados amanhã.", accepted: ["The results will be published tomorrow."] },
        { type: "word_order", skill: "grammar", prompt: "O prêmio foi dado a uma cientista brasileira.", answer: "The award was given to a Brazilian scientist.", distractors: ["gave"] },
        { type: "listening", skill: "listening", prompt: "Ouça a notícia e escolha.", audio: "The airport has been closed because of the storm.", options: ["O aeroporto foi fechado por causa da tempestade.", "A tempestade passou e o aeroporto abriu.", "O aeroporto está em obras."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "The road is being repaired.", accepted: ["the road is being repaired"] },
      ],
      conversation: {
        goal: "Explique ao professor como algo é produzido na sua empresa ou região (café, um produto, um serviço), usando a voz passiva.",
        starter: "Tell me how something is made or produced where you live. What happens first?",
      },
      review: ["be (no tempo certo) + particípio.", "is being done / has been done / will be done / must be done.", "Ideal para notícias e processos."],
    }),

    buildLesson("b1-m5-l2", M, 2, {
      title: "Orações relativas",
      objective: "Dar detalhes sem repetir, com who, which, that, whose e where.",
      explanation: [
        {
          title: "Qual pronome",
          body: "**who** = pessoas · **which** = coisas · **that** = pessoas ou coisas (informal) · **whose** = cujo (posse) · **where** = onde · **when** = quando. **The woman who called you is my boss.** **The man whose car was stolen...**",
        },
        {
          title: "Definindo × explicando",
          body: "Sem vírgula, a oração define de quem se fala: **The students who passed got a certificate.** (só os que passaram). Com vírgula, só acrescenta informação: **My brother, who lives in Porto, is a chef.** Com vírgula, nunca use **that**.",
        },
        {
          title: "Omitindo o pronome",
          body: "Quando o pronome é objeto, pode sair: **The book (that) I'm reading is great.**",
        },
      ],
      vocabulary: [
        { en: "who", pt: "que / quem (pessoas)", say: "RÚ" },
        { en: "which", pt: "que / o qual (coisas)", say: "UÍTCH" },
        { en: "whose", pt: "cujo", say: "RÚZ" },
        { en: "where", pt: "onde", say: "UÉR" },
        { en: "neighborhood", pt: "bairro", say: "NÊI-ber-hud" },
        { en: "owner", pt: "dono", say: "ÔU-ner" },
        { en: "grew up", pt: "cresceu", say: "GRÚ ÂP" },
        { en: "recommend", pt: "recomendar", say: "re-co-MÉND" },
      ],
      examples: [
        { en: "That's the restaurant where we had our first date.", pt: "Esse é o restaurante onde tivemos nosso primeiro encontro." },
        { en: "I have a friend whose father is a pilot.", pt: "Tenho um amigo cujo pai é piloto." },
        { en: "The app (that) you recommended is really useful.", pt: "O app que você recomendou é muito útil." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"The woman ___ lives next door is a doctor.\"", options: ["which", "who", "whose"], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "\"That's the town ___ I grew up.\"", options: ["which", "where", "who"], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "I met a guy ___ sister works with you.", translation: "Conheci um cara cuja irmã trabalha com você.", accepted: ["whose"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["My mother, that is a nurse, works nights.", "My mother, who is a nurse, works nights.", "My mother who is a nurse, works nights."], answer: 1, explain: "Com vírgulas (informação extra) use who/which, nunca that." },
        { type: "translate", skill: "writing", prompt: "Este é o livro que eu estou lendo.", accepted: ["This is the book I'm reading.", "This is the book that I'm reading.", "This is the book which I'm reading.", "This is the book I am reading.", "This is the book that I am reading."] },
        { type: "word_order", skill: "grammar", prompt: "O carro que eu comprei é elétrico.", answer: "The car that I bought is electric.", distractors: ["who"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "The man whose dog bit me apologized.", options: ["O homem cujo cachorro me mordeu pediu desculpas.", "O cachorro do homem fugiu.", "Eu pedi desculpas ao homem."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "That's the place where we met.", accepted: ["that's the place where we met", "that is the place where we met"] },
      ],
      conversation: {
        goal: "Descreva pessoas e lugares importantes na sua vida usando who, which, whose e where.",
        starter: "Tell me about a place that's special to you, and about the people who you usually go there with.",
      },
      review: ["who (pessoas), which (coisas), that (ambos), whose (cujo), where (onde).", "Com vírgulas: informação extra, sem that.", "Pronome objeto pode ser omitido."],
    }),

    buildLesson("b1-m5-l3", M, 3, {
      title: "Tecnologia",
      objective: "Falar de adaptação com used to, be used to e get used to.",
      explanation: [
        {
          title: "Três estruturas parecidas",
          body: "**used to + verbo** = costumava (passado): **I used to write letters.** · **be used to + -ing/substantivo** = estar acostumado: **I'm used to working from home.** · **get used to + -ing/substantivo** = se acostumar: **I'm getting used to the new app.**",
          table: {
            head: ["Estrutura", "Sentido", "Exemplo"],
            rows: [
              ["used to + verbo", "costumava", "We used to pay in cash."],
              ["be used to + -ing", "estar acostumado", "I'm used to paying by phone."],
              ["get used to + -ing", "acostumar-se", "My parents got used to video calls."],
            ],
          },
        },
        {
          title: "O erro mais comum",
          body: "Depois de **be/get used to** vem **-ing**, porque \"to\" aqui é preposição: ~~I'm used to work~~ → **I'm used to working**.",
        },
      ],
      vocabulary: [
        { en: "be used to", pt: "estar acostumado a", say: "bi IÚST tu" },
        { en: "get used to", pt: "acostumar-se a", say: "guét IÚST tu" },
        { en: "device", pt: "aparelho", say: "di-VÁIS" },
        { en: "update", pt: "atualização / atualizar", say: "âp-DÊIT" },
        { en: "screen", pt: "tela", say: "SKRÍIN" },
        { en: "online banking", pt: "banco pela internet", say: "ón-láin BÉN-king" },
        { en: "addicted to", pt: "viciado em", say: "a-DÍK-tid tu" },
        { en: "keep up with", pt: "acompanhar", say: "KÍIP ÂP uidh" },
      ],
      examples: [
        { en: "We used to rent DVDs. Now everything is streaming.", pt: "A gente alugava DVDs. Agora é tudo streaming." },
        { en: "I'm not used to typing on such a small screen.", pt: "Não estou acostumado a digitar numa tela tão pequena." },
        { en: "My grandmother got used to online banking quickly.", pt: "Minha avó se acostumou rápido com o banco pela internet." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"Estou acostumado a acordar cedo.\"", options: ["I used to wake up early.", "I'm used to waking up early.", "I'm used to wake up early."], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Eu acordava cedo (não acordo mais).\"", options: ["I used to wake up early.", "I'm used to waking up early.", "I get used to waking up early."], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "It took me a month to get used to ___ (drive) on the left.", accepted: ["driving"] },
        { type: "fill_blank", skill: "grammar", sentence: "She isn't used ___ the cold weather yet.", accepted: ["to"] },
        { type: "translate", skill: "writing", prompt: "Você vai se acostumar.", accepted: ["You'll get used to it.", "You will get used to it."] },
        { type: "word_order", skill: "grammar", prompt: "É difícil acompanhar as novas tecnologias.", answer: "It's hard to keep up with new technology.", distractors: ["follow"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I used to hate video calls, but now I'm used to them.", options: ["Odiava videochamadas, mas agora está acostumado.", "Sempre gostou de videochamadas.", "Ainda odeia videochamadas."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I'm getting used to it.", accepted: ["i'm getting used to it", "i am getting used to it"] },
      ],
      conversation: {
        goal: "Compare como as coisas eram antes da tecnologia atual e como você se adaptou (ou não).",
        starter: "How has technology changed your daily life? What did you use to do that you don't do anymore?",
      },
      review: ["used to + verbo: costumava.", "be used to + -ing: estar acostumado.", "get used to + -ing: acostumar-se."],
    }),

    buildLesson("b1-m5-l4", M, 4, {
      title: "Meio ambiente",
      objective: "Discutir problemas ambientais com quantificadores precisos.",
      explanation: [
        {
          title: "Few × a few, little × a little",
          body: "**a few / a little** = alguns, um pouco (visão positiva). **few / little** = poucos, pouco (visão negativa, \"quase nada\"): **Few people recycle here.** (Pouca gente recicla — é um problema.) **We have a little time.** (dá para fazer algo).",
        },
        {
          title: "Outros quantificadores",
          body: "**plenty of** (de sobra) · **a great deal of** (muito, formal, incontável) · **a large number of** (muitos, contável) · **hardly any** (quase nenhum) · **too much / too many** (demais) · **not enough** (não o suficiente).",
        },
      ],
      vocabulary: [
        { en: "few", pt: "poucos (negativo)", say: "FIÚ" },
        { en: "a few", pt: "alguns", say: "a FIÚ" },
        { en: "plenty of", pt: "de sobra / muito", say: "PLÉN-ti ov" },
        { en: "hardly any", pt: "quase nenhum", say: "RÁRD-li É-ni" },
        { en: "greenhouse gas", pt: "gás de efeito estufa", say: "GRÍIN-haus GÉS" },
        { en: "deforestation", pt: "desmatamento", say: "di-fó-res-TÊI-shan" },
        { en: "renewable energy", pt: "energia renovável", say: "ri-NÚ-a-bol É-ner-dji" },
        { en: "drought", pt: "seca", say: "DRÁUT" },
        { en: "carbon footprint", pt: "pegada de carbono", say: "CÁR-bon FÚT-print" },
      ],
      examples: [
        { en: "Few cities have enough recycling centers.", pt: "Poucas cidades têm centros de reciclagem suficientes." },
        { en: "There's plenty of sun here for solar energy.", pt: "Tem sol de sobra aqui para energia solar." },
        { en: "Hardly any rain has fallen this year.", pt: "Quase não choveu este ano." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Visão negativa: \"___ people take the bus here, so traffic is terrible.\"", options: ["A few", "Few", "A little"], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "\"We still have ___ time. Let's try.\" (um pouco, positivo)", options: ["a little", "little", "few"], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "There are too ___ cars in the city center.", accepted: ["many"] },
        { type: "fill_blank", skill: "grammar", sentence: "There's ___ any water left in the reservoir. (quase nenhuma)", accepted: ["hardly", "scarcely"] },
        { type: "translate", skill: "writing", prompt: "Precisamos de mais energia renovável.", accepted: ["We need more renewable energy."] },
        { type: "word_order", skill: "grammar", prompt: "O desmatamento é um problema enorme no Brasil.", answer: "Deforestation is a huge problem in Brazil.", distractors: ["the"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "There's plenty of wind on the coast, but few turbines.", options: ["Há muito vento no litoral, mas poucas turbinas.", "Não há vento no litoral.", "Há muitas turbinas no litoral."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "We don't have enough time.", accepted: ["we don't have enough time", "we do not have enough time"] },
      ],
      conversation: {
        goal: "Discuta um problema ambiental da sua região e proponha soluções realistas.",
        starter: "What's the biggest environmental problem where you live? What could be done about it?",
      },
      review: ["few/little = pouco (negativo); a few/a little = algum (positivo).", "plenty of, hardly any, too many/much, not enough.", "Vocabulário de meio ambiente."],
    }),

    buildLesson("b1-m5-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Sociedade",
      objective: "Comprovar que você usa passiva, relativas, used to e quantificadores.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "The tickets have already ___ sold.", accepted: ["been"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"The company ___ I work for is Brazilian.\"", options: ["who", "which", "whose"], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Ele está se acostumando a morar sozinho.\"", options: ["He's used to live alone.", "He's getting used to living alone.", "He used to living alone."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "She's the colleague ___ husband is a chef.", accepted: ["whose"] },
        { type: "translate", skill: "writing", prompt: "A estrada está sendo consertada.", accepted: ["The road is being repaired.", "The road is being fixed."] },
        { type: "word_order", skill: "grammar", prompt: "Poucas pessoas sabem disso.", answer: "Few people know about it." },
        { type: "multiple_choice", skill: "grammar", prompt: "\"There are ___ jobs in the area.\" (muitos)", options: ["a great deal of", "a large number of", "a little"], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "The new hospital will be opened next year.", options: ["O novo hospital será inaugurado no ano que vem.", "O hospital foi fechado.", "O hospital está em obras há um ano."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I'm used to it.", accepted: ["i'm used to it", "i am used to it"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["drought", "seca"], ["deforestation", "desmatamento"], ["device", "aparelho"], ["arrest", "prender"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
