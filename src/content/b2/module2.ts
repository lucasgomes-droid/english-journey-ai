import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "b2-m2";

export const b2Module2: Module = {
  id: M,
  level: "B2",
  order: 2,
  title: "Condicionais e desejos",
  description: "Passado imaginário, condicionais mistas, arrependimentos e preferências sofisticadas.",
  lessons: [
    buildLesson("b2-m2-l1", M, 1, {
      title: "Terceira condicional",
      objective: "Falar de um passado que não aconteceu e suas consequências.",
      explanation: [
        {
          title: "If + had + particípio, would have + particípio",
          body: "Imagina um passado diferente: **If I had studied, I would have passed.** (Se eu tivesse estudado, teria passado.) Na fala: **If I'd known, I'd have called you.** (I'd = I had na primeira parte; I would na segunda.)",
        },
        {
          title: "Variações",
          body: "**could have** (poderia ter) e **might have** (talvez tivesse): **If we had left earlier, we could have caught the train.** · Negativa: **If it hadn't rained, we wouldn't have canceled.**",
        },
        {
          title: "Pronúncia",
          body: "Na fala rápida, **would have** soa \"wouda\" e **could have** soa \"coulda\". Nunca escreva ~~would of~~.",
        },
      ],
      vocabulary: [
        { en: "If I'd known", pt: "Se eu soubesse (tivesse sabido)", say: "if áid NÔUN" },
        { en: "would have", pt: "teria", say: "UÚ-dav" },
        { en: "could have", pt: "poderia ter", say: "CÚ-dav" },
        { en: "turn down", pt: "recusar", say: "TÂRN DÁUN" },
        { en: "catch (caught)", pt: "pegar (trem/ônibus)", say: "KÉTCH / CÓT" },
        { en: "opportunity", pt: "oportunidade", say: "o-por-TIÚ-ni-ti" },
        { en: "luckily", pt: "por sorte", say: "LÂ-ki-li" },
        { en: "outcome", pt: "resultado", say: "ÁUT-câm" },
      ],
      examples: [
        { en: "If I'd known about the party, I would have come.", pt: "Se eu soubesse da festa, teria vindo." },
        { en: "If she hadn't turned down the offer, she'd be in Paris now.", pt: "Se ela não tivesse recusado a oferta, estaria em Paris agora." },
        { en: "We could have won if we had played better.", pt: "Poderíamos ter ganhado se tivéssemos jogado melhor." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "If I had seen you, I would ___ said hello.", accepted: ["have"] },
        { type: "fill_blank", skill: "grammar", sentence: "If we ___ (not / miss) the bus, we wouldn't have been late.", accepted: ["hadn't missed", "had not missed"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["If I would have known, I would have helped.", "If I had known, I would have helped.", "If I knew, I would have helped."], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "Qual escrita está correta?", options: ["I would of called you.", "I would have called you."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Se você tivesse me contado, eu teria ajudado.", accepted: ["If you had told me, I would have helped.", "If you'd told me, I'd have helped.", "If you had told me, I'd have helped.", "If you'd told me, I would have helped."] },
        { type: "word_order", skill: "grammar", prompt: "Poderíamos ter evitado o problema.", answer: "We could have avoided the problem.", distractors: ["of"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "If it hadn't been for you, I would've given up.", options: ["Se não fosse por você, eu teria desistido.", "Desisti por sua causa.", "Você desistiu antes de mim."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "If I'd known, I'd have called.", accepted: ["if i'd known i'd have called", "if i had known i would have called"] },
      ],
      conversation: {
        goal: "Conte uma decisão importante do seu passado e imagine o que teria acontecido se você tivesse escolhido diferente.",
        starter: "Think about a big decision you made. What would have happened if you had chosen differently?",
      },
      review: ["If + had + particípio, would have + particípio.", "could have / might have.", "Nunca 'would of'."],
    }),

    buildLesson("b2-m2-l2", M, 2, {
      title: "Condicionais mistas",
      objective: "Combinar tempos: passado que afeta o presente e vice-versa.",
      explanation: [
        {
          title: "Passado → presente",
          body: "Uma condição passada com resultado AGORA: **If I had taken that job, I would be living in London now.** (Se tivesse aceitado, estaria morando em Londres agora.)",
        },
        {
          title: "Presente → passado",
          body: "Uma característica permanente que explicaria o passado: **If I were braver, I would have asked her out.** (Se eu fosse mais corajoso, teria chamado ela para sair.)",
        },
      ],
      vocabulary: [
        { en: "career", pt: "carreira", say: "ca-RÍR" },
        { en: "brave", pt: "corajoso", say: "BRÊIV" },
        { en: "settle down", pt: "sossegar / estabelecer-se", say: "SÉ-tol DÁUN" },
        { en: "path", pt: "caminho", say: "PÉTH" },
        { en: "fluent", pt: "fluente", say: "FLÚ-ent" },
        { en: "abroad", pt: "no exterior", say: "a-BRÓD" },
        { en: "otherwise", pt: "caso contrário", say: "Â-dher-uáiz" },
        { en: "stuck", pt: "preso / travado", say: "STÂK" },
      ],
      examples: [
        { en: "If I had learned English as a child, I'd be fluent now.", pt: "Se eu tivesse aprendido inglês criança, seria fluente agora." },
        { en: "If he weren't so stubborn, he would have listened to us.", pt: "Se ele não fosse tão teimoso, teria nos ouvido." },
        { en: "If we hadn't moved, we wouldn't know each other.", pt: "Se não tivéssemos nos mudado, não nos conheceríamos." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Passado → presente: \"If I had saved money, I ___ a car now.\"", options: ["would have", "would have had", "had"], answer: 0 },
        { type: "multiple_choice", skill: "grammar", prompt: "Presente → passado: \"If I ___ shy, I would have spoken at the meeting.\"", options: ["weren't", "hadn't been", "am not"], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "If she had taken the job, she ___ be living in Dubai now.", accepted: ["would", "might", "could"] },
        { type: "fill_blank", skill: "grammar", sentence: "If I ___ (be) taller, I would have joined the basketball team.", accepted: ["were", "was"] },
        { type: "translate", skill: "writing", prompt: "Se eu tivesse dormido, não estaria cansado agora.", accepted: ["If I had slept, I wouldn't be tired now.", "If I'd slept, I wouldn't be tired now.", "If I had slept, I would not be tired now."] },
        { type: "word_order", skill: "grammar", prompt: "Se não tivéssemos nos conhecido, eu estaria solteiro.", answer: "If we hadn't met, I would be single.", distractors: ["have"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "If I'd studied medicine, I'd be a doctor now.", options: ["Se tivesse estudado medicina, seria médico agora.", "É médico porque estudou medicina.", "Vai estudar medicina."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I wouldn't be here now.", accepted: ["i wouldn't be here now", "i would not be here now"] },
      ],
      conversation: {
        goal: "Fale de uma escolha do passado que mudou sua vida hoje, e de uma característica sua que mudaria uma história passada.",
        starter: "If you had chosen a different career, what would you be doing now?",
      },
      review: ["If + had done, would + verbo (now): passado → presente.", "If + passado, would have done: presente → passado."],
    }),

    buildLesson("b2-m2-l3", M, 3, {
      title: "Arrependimentos",
      objective: "Expressar arrependimento e crítica com should have e wish + had.",
      explanation: [
        {
          title: "Should have / shouldn't have",
          body: "Arrependimento ou crítica sobre o passado: **I should have saved more money.** (Eu deveria ter economizado.) **You shouldn't have said that.** (Você não devia ter dito isso.)",
        },
        {
          title: "Wish / if only + had + particípio",
          body: "Desejo sobre o passado: **I wish I had listened to my parents.** · **If only I hadn't sent that email!**",
        },
        {
          title: "Needn't have",
          body: "Fez algo desnecessário: **You needn't have bought flowers!** (Não precisava ter comprado flores!) Compare: **didn't need to** = não precisou (e talvez nem tenha feito).",
        },
      ],
      vocabulary: [
        { en: "should have", pt: "deveria ter", say: "SHÚ-dav" },
        { en: "shouldn't have", pt: "não deveria ter", say: "SHÚ-dent-av" },
        { en: "needn't have", pt: "não precisava ter", say: "NÍI-dent-av" },
        { en: "regret", pt: "arrepender-se", say: "ri-GRÉT" },
        { en: "hindsight", pt: "olhando para trás", say: "RÁIND-sáit" },
        { en: "blame", pt: "culpar", say: "BLÊIM" },
        { en: "look back", pt: "olhar para trás", say: "LÚK BÉK" },
        { en: "mistake", pt: "erro", say: "mis-TÊIK" },
      ],
      examples: [
        { en: "With hindsight, I should have asked for help sooner.", pt: "Olhando para trás, eu deveria ter pedido ajuda antes." },
        { en: "I wish I hadn't quit the piano.", pt: "Queria não ter largado o piano." },
        { en: "You needn't have waited for me!", pt: "Você não precisava ter me esperado!" },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "I should ___ brought an umbrella.", accepted: ["have"] },
        { type: "fill_blank", skill: "grammar", sentence: "I wish I ___ (not / eat) so much last night.", accepted: ["hadn't eaten", "had not eaten"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Você não deveria ter dirigido tão rápido.\"", options: ["You shouldn't drive so fast.", "You shouldn't have driven so fast.", "You didn't should drive so fast."], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "Você levou comida, mas a festa tinha comida de sobra:", options: ["I needn't have brought food.", "I didn't bring food.", "I mustn't have brought food."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Queria ter estudado mais.", accepted: ["I wish I had studied more.", "I wish I'd studied more."] },
        { type: "word_order", skill: "grammar", prompt: "Se ao menos eu não tivesse enviado aquele e-mail!", answer: "If only I hadn't sent that email!", distractors: ["didn't"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Looking back, I should have trusted my instincts.", options: ["Olhando para trás, deveria ter confiado no instinto.", "Confiei no meu instinto e deu certo.", "Não tenho instinto."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "You shouldn't have done that.", accepted: ["you shouldn't have done that", "you should not have done that"] },
      ],
      conversation: {
        goal: "Fale de dois arrependimentos (um sério e um engraçado) e de algo que você fez sem necessidade.",
        starter: "Is there anything you wish you had done differently? It can be something big or something silly.",
      },
      review: ["should(n't) have + particípio: arrependimento/crítica.", "wish / if only + had + particípio.", "needn't have: fez sem necessidade."],
    }),

    buildLesson("b2-m2-l4", M, 4, {
      title: "It's time / I'd rather",
      objective: "Expressar preferências e urgência com estruturas sofisticadas.",
      explanation: [
        {
          title: "It's (high) time + passado",
          body: "Já passou da hora: **It's time we left.** **It's high time you found a job.** (O passado aqui indica que deveria já estar acontecendo.) Neutro: **It's time to leave.**",
        },
        {
          title: "Would rather",
          body: "Preferência própria: **I'd rather stay home.** (Prefiro ficar em casa.) **I'd rather walk than take the bus.** Preferência sobre outra pessoa + passado: **I'd rather you didn't smoke here.** (Preferia que você não fumasse aqui.)",
        },
        {
          title: "Had better",
          body: "Conselho forte com tom de aviso: **You'd better hurry or you'll miss the flight.** (É melhor você se apressar.)",
        },
      ],
      vocabulary: [
        { en: "It's high time", pt: "já passou da hora", say: "its RÁI TÁIM" },
        { en: "I'd rather", pt: "eu prefiro", say: "áid RÉ-dher" },
        { en: "You'd better", pt: "é melhor você", say: "iud BÉ-ter" },
        { en: "would sooner", pt: "preferiria", say: "uud SÚ-ner" },
        { en: "postpone", pt: "adiar", say: "post-PÔUN" },
        { en: "face the music", pt: "encarar as consequências", say: "FÊIS dhe MIÚ-zik" },
        { en: "make up your mind", pt: "decidir-se", say: "mêik âp iór MÁIND" },
        { en: "rather than", pt: "em vez de", say: "RÉ-dher dhén" },
      ],
      examples: [
        { en: "It's high time we updated the website.", pt: "Já passou da hora de atualizarmos o site." },
        { en: "I'd rather you didn't tell anyone yet.", pt: "Preferia que você não contasse a ninguém ainda." },
        { en: "You'd better make up your mind soon.", pt: "É melhor você se decidir logo." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "It's high time you ___ (start) saving money.", accepted: ["started"] },
        { type: "fill_blank", skill: "grammar", sentence: "I'd rather you ___ (not / call) me after 10 pm.", accepted: ["didn't call", "did not call"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Prefiro ficar em casa hoje.\"", options: ["I'd rather to stay home tonight.", "I'd rather stay home tonight.", "I'd rather staying home tonight."], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "\"É melhor você levar um casaco.\"", options: ["You'd better take a coat.", "You'd better to take a coat.", "You better took a coat."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Prefiro andar a pegar um táxi.", accepted: ["I'd rather walk than take a taxi.", "I would rather walk than take a taxi.", "I'd rather walk than get a taxi."] },
        { type: "word_order", skill: "grammar", prompt: "Já está na hora de irmos.", answer: "It's time we went.", distractors: ["go"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I'd rather we postponed the meeting until next week.", options: ["Preferia adiar a reunião para semana que vem.", "Quer antecipar a reunião.", "A reunião foi cancelada."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "You'd better hurry.", accepted: ["you'd better hurry", "you had better hurry"] },
      ],
      conversation: {
        goal: "Discuta com o professor mudanças que já passou da hora de acontecerem (no seu trabalho, cidade ou vida) e suas preferências.",
        starter: "What is it high time you changed in your life? And would you rather work from home or in an office?",
      },
      review: ["It's (high) time + passado.", "would rather + verbo / + pessoa + passado.", "had better + verbo: conselho com aviso."],
    }),

    buildLesson("b2-m2-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Condicionais e desejos",
      objective: "Comprovar que você domina condicionais e desejos avançados.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "If I'd left on time, I wouldn't ___ missed the flight.", accepted: ["have"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"If I had accepted the offer, I ___ in Canada now.\"", options: ["would live", "would have lived", "will live"], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "You ___ have told me earlier! (deveria)", accepted: ["should"] },
        { type: "fill_blank", skill: "grammar", sentence: "I'd rather you ___ (stay) here.", accepted: ["stayed"] },
        { type: "translate", skill: "writing", prompt: "Queria não ter dito aquilo.", accepted: ["I wish I hadn't said that.", "I wish I had not said that."] },
        { type: "word_order", skill: "grammar", prompt: "É melhor você não se atrasar.", answer: "You'd better not be late." },
        { type: "multiple_choice", skill: "grammar", prompt: "\"It's time we ___ home.\"", options: ["go", "went", "going"], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "If I weren't so busy, I would have joined you.", options: ["Se não fosse tão ocupado, teria ido com vocês.", "Foi com eles porque estava livre.", "Vai com eles amanhã."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I should have known.", accepted: ["i should have known"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["hindsight", "olhando para trás"], ["turn down", "recusar"], ["postpone", "adiar"], ["regret", "arrepender-se"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
