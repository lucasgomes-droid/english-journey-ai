import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "b1-m3";

export const b1Module3: Module = {
  id: M,
  level: "B1",
  order: 3,
  title: "Opiniões",
  description: "Defender um ponto de vista, discordar com educação, deduzir e soar natural.",
  lessons: [
    buildLesson("b1-m3-l1", M, 1, {
      title: "Dando opinião",
      objective: "Defender um ponto de vista com expressões variadas.",
      explanation: [
        {
          title: "Além do I think",
          body: "**In my opinion / In my view,...** (formal) · **As far as I'm concerned,...** (no que me diz respeito) · **I guess...** (informal) · **Personally, I feel that...** · **If you ask me,...** (se quer saber minha opinião).",
        },
        {
          title: "Justificando",
          body: "Uma opinião convence quando tem motivo e exemplo: **The main reason is that...** · **For example / For instance,...** · **That's why I believe...**",
        },
        {
          title: "Cuidado",
          body: "Não diga ~~In my opinion, I think~~ (redundante). E \"I agree\" é verbo: ~~I am agree~~.",
        },
      ],
      vocabulary: [
        { en: "in my view", pt: "na minha visão", say: "in mái VIÚ" },
        { en: "as far as I'm concerned", pt: "no que me diz respeito", say: "éz FÁR éz áim con-SÂRND" },
        { en: "I guess", pt: "eu acho (informal)", say: "ái GUÉS" },
        { en: "if you ask me", pt: "se quer saber", say: "if iu ÉSK mi" },
        { en: "the main reason", pt: "o motivo principal", say: "dhe MÊIN RÍI-zon" },
        { en: "for instance", pt: "por exemplo", say: "for ÍNS-tans" },
        { en: "point of view", pt: "ponto de vista", say: "PÓINT ov VIÚ" },
        { en: "believe", pt: "acreditar", say: "bi-LÍIV" },
        { en: "worth it", pt: "vale a pena", say: "UÂRTH it" },
      ],
      examples: [
        { en: "In my view, working from home is more productive.", pt: "Na minha visão, trabalhar de casa é mais produtivo." },
        { en: "If you ask me, the movie was overrated.", pt: "Se quer saber, o filme foi superestimado." },
        { en: "The main reason is that we save time commuting.", pt: "O motivo principal é que economizamos tempo de deslocamento." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["I am agree with you.", "I agree with you.", "I'm agreeing you."], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Qual expressão é mais formal?", options: ["I guess", "If you ask me", "In my view"], answer: 2 },
        { type: "fill_blank", skill: "vocabulary", sentence: "As far as I'm ___, it's a great idea.", accepted: ["concerned"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "The main ___ is that it's cheaper.", accepted: ["reason"] },
        { type: "translate", skill: "writing", prompt: "Na minha opinião, vale a pena.", accepted: ["In my opinion, it's worth it.", "In my opinion, it is worth it.", "In my view, it's worth it.", "In my view, it is worth it."] },
        { type: "word_order", skill: "grammar", prompt: "Pessoalmente, eu acho que é caro demais.", answer: "Personally, I think it's too expensive.", distractors: ["agree"] },
        { type: "listening", skill: "listening", prompt: "Ouça. Qual é a opinião da pessoa?", audio: "If you ask me, public transport should be free.", options: ["O transporte público deveria ser gratuito.", "O transporte público é caro demais para manter.", "Não tem opinião."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "That's why I believe it works.", accepted: ["that's why i believe it works", "that is why i believe it works"] },
      ],
      conversation: {
        goal: "Defenda uma opinião sobre um tema do dia a dia (redes sociais, trabalho remoto, cidade × interior) com motivo e exemplo.",
        starter: "Do you think people should work four days a week? What's your view?",
      },
      review: ["In my view / As far as I'm concerned / If you ask me.", "Motivo + exemplo: The main reason is... For instance...", "I agree (nunca 'I am agree')."],
    }),

    buildLesson("b1-m3-l2", M, 2, {
      title: "Concordar e discordar",
      objective: "Discordar com educação e chegar a um meio-termo.",
      explanation: [
        {
          title: "Concordando",
          body: "**Absolutely. / Exactly. / I couldn't agree more.** (Concordo plenamente.) **That's a good point.** **You've got a point there.**",
        },
        {
          title: "Discordando sem ofender",
          body: "Em inglês, discordar direto (\"No, you're wrong\") soa agressivo. Suavize: **I see your point, but...** · **I'm not sure I agree.** · **I see what you mean, but on the other hand...** · **That's true to some extent, however...**",
        },
        {
          title: "Meio-termo",
          body: "**Maybe we could meet halfway.** · **It depends on...** · **Let's agree to disagree.** (Vamos concordar em discordar.)",
        },
      ],
      vocabulary: [
        { en: "I couldn't agree more", pt: "concordo plenamente", say: "ái CÚ-dent a-GRÍI MÓR" },
        { en: "I see your point", pt: "entendo seu ponto", say: "ái SÍI iór PÓINT" },
        { en: "to some extent", pt: "até certo ponto", say: "tu SÂM ex-TÉNT" },
        { en: "on the other hand", pt: "por outro lado", say: "on dhi Â-dher RÉND" },
        { en: "it depends", pt: "depende", say: "it di-PÉNDZ" },
        { en: "meet halfway", pt: "chegar a um meio-termo", say: "MÍIT ráf-UÊI" },
        { en: "disagree", pt: "discordar", say: "dis-a-GRÍI" },
        { en: "fair enough", pt: "justo / tudo bem", say: "FÉR i-NÂF" },
      ],
      examples: [
        { en: "I see your point, but I'm not sure it would work here.", pt: "Entendo seu ponto, mas não sei se funcionaria aqui." },
        { en: "That's true to some extent, however it's very expensive.", pt: "É verdade até certo ponto; no entanto, é muito caro." },
        { en: "Fair enough. Let's agree to disagree.", pt: "Justo. Vamos concordar em discordar." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "A forma mais educada de discordar:", options: ["You're wrong.", "I see your point, but I don't think that's the case.", "No way, that's stupid."], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"I couldn't agree more\" significa:", options: ["Não posso concordar.", "Concordo plenamente.", "Concordo um pouco."], answer: 1 },
        { type: "fill_blank", skill: "vocabulary", sentence: "That's true to some ___, but it's not the whole story.", accepted: ["extent"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "On the other ___, it could save us money.", accepted: ["hand"] },
        { type: "translate", skill: "writing", prompt: "Depende da situação.", accepted: ["It depends on the situation.", "That depends on the situation."] },
        { type: "word_order", skill: "grammar", prompt: "Entendo o que você quer dizer, mas eu discordo.", answer: "I see what you mean, but I disagree.", distractors: ["agree"] },
        { type: "listening", skill: "listening", prompt: "Ouça. A pessoa concorda ou discorda?", audio: "You've got a point there, but I'm not convinced.", options: ["Concorda totalmente.", "Reconhece o argumento, mas não está convencida.", "Não entendeu."], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Let's agree to disagree.", accepted: ["let's agree to disagree", "let us agree to disagree"] },
      ],
      conversation: {
        goal: "O professor vai defender opiniões polêmicas. Concorde com algumas e discorde de outras com educação.",
        starter: "I think everyone should learn to cook before they turn eighteen. Do you agree?",
      },
      review: ["Concordar: Absolutely / I couldn't agree more.", "Discordar suave: I see your point, but...", "Meio-termo: It depends / meet halfway."],
    }),

    buildLesson("b1-m3-l3", M, 3, {
      title: "Modais de dedução",
      objective: "Fazer deduções sobre o presente e o passado.",
      explanation: [
        {
          title: "Presente",
          body: "**must** = deve (tenho quase certeza que sim): **She must be tired, she worked all night.** **can't** = não pode ser (quase certeza que não): **That can't be Tom, he's in Paris.** **might / may / could** = talvez: **He might be at the gym.**",
        },
        {
          title: "Passado: modal + have + particípio",
          body: "**must have** + particípio: **They must have left already.** (Devem ter saído.) **can't have**: **She can't have seen us.** (Ela não pode ter nos visto.) **might have**: **I might have left it in the car.** (Posso ter deixado no carro.)",
          table: {
            head: ["Certeza", "Presente", "Passado"],
            rows: [
              ["~100% sim", "must be", "must have been"],
              ["talvez", "might / may / could be", "might have been"],
              ["~100% não", "can't be", "can't have been"],
            ],
          },
        },
      ],
      vocabulary: [
        { en: "must be", pt: "deve ser / estar", say: "MÂST bi" },
        { en: "can't be", pt: "não pode ser", say: "KÉNT bi" },
        { en: "might", pt: "pode ser que", say: "MÁIT" },
        { en: "must have", pt: "deve ter (feito)", say: "MÂST-av" },
        { en: "evidence", pt: "evidência", say: "É-vi-dens" },
        { en: "guess", pt: "palpite / adivinhar", say: "GUÉS" },
        { en: "obviously", pt: "obviamente", say: "ÓB-vi-âs-li" },
        { en: "exhausted", pt: "exausto", say: "ig-ZÓS-tid" },
      ],
      examples: [
        { en: "The lights are off. They must be asleep.", pt: "As luzes estão apagadas. Devem estar dormindo." },
        { en: "That can't be right. Let me check again.", pt: "Isso não pode estar certo. Deixa eu conferir de novo." },
        { en: "I can't find my keys. I might have left them at work.", pt: "Não acho minhas chaves. Posso ter deixado no trabalho." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Ela trabalhou 14 horas hoje. \"She ___ be exhausted.\"", options: ["must", "can't", "might not"], answer: 0 },
        { type: "multiple_choice", skill: "grammar", prompt: "Ele está de férias na Itália. \"That ___ be him at the office.\"", options: ["must", "can't", "might"], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "The ground is wet. It must ___ rained last night.", accepted: ["have"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Ela não pode ter dito isso.\"", options: ["She can't have said that.", "She mustn't have said that.", "She can't said that."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Ele pode estar na academia.", accepted: ["He might be at the gym.", "He may be at the gym.", "He could be at the gym."] },
        { type: "word_order", skill: "grammar", prompt: "Eles devem ter perdido o ônibus.", answer: "They must have missed the bus.", distractors: ["to"] },
        { type: "listening", skill: "listening", prompt: "Ouça. Qual é a dedução?", audio: "Nobody's answering. They might have gone out.", options: ["Talvez tenham saído.", "Com certeza estão em casa.", "Estão dormindo."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "That can't be true.", accepted: ["that can't be true", "that cannot be true"] },
      ],
      conversation: {
        goal: "O professor vai descrever situações misteriosas. Faça deduções com must, might e can't.",
        starter: "Your colleague arrived at work today with wet hair, a big smile and sand on his shoes. What do you think?",
      },
      review: ["must (certeza sim), might/may/could (talvez), can't (certeza não).", "Passado: modal + have + particípio.", "Nunca: must to / can't said."],
    }),

    buildLesson("b1-m3-l4", M, 4, {
      title: "Linguagem vaga e hesitação",
      objective: "Soar natural ao falar, ganhando tempo e suavizando o que diz.",
      explanation: [
        {
          title: "Ganhando tempo sem travar",
          body: "Em vez de silêncio ou \"éééé\", nativos usam: **Well,...** · **Let me think...** · **How can I put it?** · **You know,...** · **I mean,...** (quer dizer, para corrigir ou explicar).",
        },
        {
          title: "Linguagem vaga",
          body: "**kind of / sort of** (meio que): **I'm kind of tired.** · **-ish** (mais ou menos): **at sevenish**, **tallish** · **or something / and stuff like that** (ou algo assim) · **around / about** (por volta de).",
        },
        {
          title: "Quando não lembra a palavra",
          body: "**What's the word...?** · **It's a kind of...** · **It's the thing you use to...** Descrever é uma habilidade de fluência, não um fracasso.",
        },
      ],
      vocabulary: [
        { en: "kind of", pt: "meio que / tipo", say: "KÁIND ov" },
        { en: "sort of", pt: "meio que", say: "SÓRT ov" },
        { en: "I mean", pt: "quer dizer", say: "ái MÍIN" },
        { en: "you know", pt: "sabe", say: "iu NÔU" },
        { en: "Let me think", pt: "deixa eu pensar", say: "LÉT mi THÍNK" },
        { en: "or something", pt: "ou algo assim", say: "or SÂM-thing" },
        { en: "-ish", pt: "mais ou menos (sufixo)", say: "ISH" },
        { en: "stuff", pt: "coisas", say: "STÂF" },
        { en: "basically", pt: "basicamente", say: "BÊI-sik-li" },
      ],
      examples: [
        { en: "Well, let me think... I'd say it's kind of complicated.", pt: "Bom, deixa eu pensar... diria que é meio complicado." },
        { en: "Let's meet at sevenish.", pt: "Vamos nos encontrar lá pelas sete." },
        { en: "It's the thing you use to open wine bottles.", pt: "É aquela coisa que você usa para abrir garrafas de vinho." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Let's meet at eightish\" significa:", options: ["Exatamente às 8.", "Lá pelas 8.", "Depois das 8 em ponto."], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Você esqueceu a palavra \"saca-rolhas\". O que diz?", options: ["I don't know. Sorry.", "It's the thing you use to open wine bottles.", "Saca-rolhas!"], answer: 1 },
        { type: "fill_blank", skill: "vocabulary", sentence: "I'm ___ of hungry. Let's eat something.", accepted: ["kind", "sort"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "She's a teacher or ___. I'm not sure.", accepted: ["something"] },
        { type: "translate", skill: "writing", prompt: "Quer dizer, não é tão ruim.", accepted: ["I mean, it's not that bad.", "I mean, it isn't that bad.", "I mean, it's not so bad."] },
        { type: "word_order", skill: "grammar", prompt: "Basicamente, é um tipo de aplicativo.", answer: "Basically, it's a kind of app.", distractors: ["sort"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "It was sort of strange, you know? Like nobody was there.", options: ["Foi meio estranho, como se não houvesse ninguém.", "Estava lotado.", "Foi normal."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Let me think about it.", accepted: ["let me think about it"] },
      ],
      conversation: {
        goal: "Descreva ao professor objetos e palavras que você não sabe em inglês, sem usar o português. Use kind of, I mean e let me think.",
        starter: "Let's play a game. Describe something in your kitchen without saying its name, and I'll guess.",
      },
      review: ["Ganhar tempo: Well / Let me think / I mean.", "Vago: kind of, sort of, -ish, or something.", "Descrever quando esquecer a palavra."],
    }),

    buildLesson("b1-m3-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Opiniões",
      objective: "Comprovar que você opina, discorda, deduz e fala com naturalidade.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["I'm agree.", "I agree.", "I am agreeing."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "He hasn't eaten all day. He ___ be hungry.", accepted: ["must"] },
        { type: "fill_blank", skill: "grammar", sentence: "She can't ___ finished already. She only started ten minutes ago.", accepted: ["have"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Discordar com educação:", options: ["I see your point, but...", "You don't know anything.", "Wrong."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Por outro lado, é mais barato.", accepted: ["On the other hand, it's cheaper.", "On the other hand, it is cheaper."] },
        { type: "word_order", skill: "grammar", prompt: "Se quer saber, foi meio chato.", answer: "If you ask me, it was kind of boring." },
        { type: "translate", skill: "writing", prompt: "Posso ter deixado no carro.", accepted: ["I might have left it in the car.", "I may have left it in the car.", "I could have left it in the car."] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "As far as I'm concerned, the meeting was a waste of time.", options: ["Para mim, a reunião foi perda de tempo.", "A reunião foi muito útil.", "Não fui à reunião."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I couldn't agree more.", accepted: ["i couldn't agree more", "i could not agree more"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["to some extent", "até certo ponto"], ["I mean", "quer dizer"], ["fair enough", "justo"], ["for instance", "por exemplo"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
