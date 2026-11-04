import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "b2-m6";

export const b2Module6: Module = {
  id: M,
  level: "B2",
  order: 6,
  title: "Mídia e informação",
  description: "Verbos de relato precisos, passiva impessoal, avaliar fontes e resumir.",
  lessons: [
    buildLesson("b2-m6-l1", M, 1, {
      title: "Discurso indireto avançado",
      objective: "Relatar com verbos precisos: claim, deny, urge, admit.",
      explanation: [
        {
          title: "Além de said e told",
          body: "Cada verbo tem sua estrutura: **claim (that)** (alegar) · **deny + -ing** (negar): **He denied stealing the money.** · **admit + -ing / that**: **She admitted making a mistake.** · **urge + pessoa + to** (insistir): **Experts urged people to stay home.** · **accuse + pessoa + of + -ing**: **They accused him of lying.** · **apologize for + -ing**.",
          table: {
            head: ["Verbo", "Estrutura", "Exemplo"],
            rows: [
              ["claim", "+ that", "She claimed that she was innocent."],
              ["deny", "+ -ing", "He denied taking the money."],
              ["urge", "+ pessoa + to", "They urged us to leave."],
              ["accuse", "+ pessoa + of -ing", "They accused her of cheating."],
              ["refuse", "+ to", "He refused to comment."],
            ],
          },
        },
      ],
      vocabulary: [
        { en: "claim", pt: "alegar", say: "CLÊIM" },
        { en: "deny", pt: "negar", say: "di-NÁI" },
        { en: "admit", pt: "admitir", say: "ad-MÍT" },
        { en: "urge", pt: "pedir com insistência", say: "ÂRDJ" },
        { en: "accuse of", pt: "acusar de", say: "a-KIÚZ ov" },
        { en: "refuse", pt: "recusar-se", say: "ri-FIÚZ" },
        { en: "insist on", pt: "insistir em", say: "in-SÍST on" },
        { en: "spokesperson", pt: "porta-voz", say: "SPÔUKS-pêr-son" },
        { en: "statement", pt: "declaração", say: "STÊIT-ment" },
      ],
      examples: [
        { en: "The minister denied knowing about the payments.", pt: "O ministro negou saber dos pagamentos." },
        { en: "Doctors urged the public to get vaccinated.", pt: "Médicos pediram com insistência que a população se vacinasse." },
        { en: "A spokesperson refused to comment.", pt: "Um porta-voz se recusou a comentar." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "He denied ___ (break) the window.", accepted: ["breaking", "having broken"] },
        { type: "fill_blank", skill: "grammar", sentence: "They accused her ___ lying.", accepted: ["of"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["The company refused commenting.", "The company refused to comment.", "The company refused of commenting."], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Ele admitiu ter cometido um erro.\"", options: ["He admitted to make a mistake.", "He admitted making a mistake.", "He admitted me a mistake."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "A polícia pediu que os moradores ficassem em casa.", accepted: ["The police urged residents to stay at home.", "The police urged residents to stay home.", "The police asked residents to stay at home.", "The police asked residents to stay home."] },
        { type: "word_order", skill: "grammar", prompt: "Ela insistiu em pagar a conta.", answer: "She insisted on paying the bill.", distractors: ["to"] },
        { type: "listening", skill: "listening", prompt: "Ouça a notícia e escolha.", audio: "The CEO admitted that the company had made serious mistakes, but denied hiding information.", options: ["Admitiu erros, mas negou esconder informações.", "Negou erros e admitiu esconder informações.", "Recusou-se a falar."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "He refused to comment.", accepted: ["he refused to comment"] },
      ],
      conversation: {
        goal: "Relate uma notícia recente ao professor usando verbos precisos (claimed, denied, urged, admitted).",
        starter: "What's a news story you've followed recently? Who said what?",
      },
      review: ["claim that / deny -ing / admit -ing.", "urge + pessoa + to / refuse to.", "accuse of -ing / insist on -ing."],
    }),

    buildLesson("b2-m6-l2", M, 2, {
      title: "Passiva impessoal",
      objective: "Relatar informações com distanciamento: it is said that / he is believed to.",
      explanation: [
        {
          title: "Duas formas",
          body: "**It is said / believed / reported that + frase**: **It is believed that the fire started in the kitchen.** · **Sujeito + is said / believed + to + verbo**: **The fire is believed to have started in the kitchen.** · Sobre o passado use **to have + particípio**.",
        },
        {
          title: "Por que usar",
          body: "Jornais e relatórios usam para não afirmar algo como certo nem citar fonte específica. É um tipo de hedging.",
        },
      ],
      vocabulary: [
        { en: "it is said that", pt: "dizem que", say: "it iz SÉD dhét" },
        { en: "it is believed that", pt: "acredita-se que", say: "it iz bi-LÍIVD dhét" },
        { en: "be reported to", pt: "segundo relatos", say: "bi ri-PÓR-tid tu" },
        { en: "be thought to", pt: "pensa-se que", say: "bi THÓT tu" },
        { en: "be estimated", pt: "estima-se", say: "bi ÉS-ti-mêi-tid" },
        { en: "suspect", pt: "suspeito / suspeitar", say: "SÂS-pekt" },
        { en: "flee (fled)", pt: "fugir", say: "FLÍI / FLÉD" },
        { en: "worth", pt: "que vale", say: "UÂRTH" },
      ],
      examples: [
        { en: "It is estimated that two million people visited the fair.", pt: "Estima-se que dois milhões de pessoas visitaram a feira." },
        { en: "The suspect is believed to have fled the country.", pt: "Acredita-se que o suspeito tenha fugido do país." },
        { en: "The painting is said to be worth ten million dollars.", pt: "Dizem que o quadro vale dez milhões de dólares." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "It is ___ that the economy will grow. (acredita-se)", accepted: ["believed", "thought", "expected"] },
        { type: "fill_blank", skill: "grammar", sentence: "He is said ___ be very rich.", accepted: ["to"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Sobre o passado: \"The thieves are thought ___ through the window.\"", options: ["to enter", "to have entered", "entering"], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["It is reported that the minister has resigned.", "It reports that the minister has resigned.", "The minister is reported resign."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Dizem que o hotel é assombrado.", accepted: ["The hotel is said to be haunted.", "It is said that the hotel is haunted.", "It's said that the hotel is haunted."] },
        { type: "word_order", skill: "grammar", prompt: "Estima-se que o projeto custará um bilhão.", answer: "It is estimated that the project will cost a billion.", distractors: ["estimates"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "The singer is reported to have cancelled the rest of the tour.", options: ["Segundo relatos, a cantora cancelou o resto da turnê.", "A cantora confirmou novos shows.", "A turnê começa amanhã."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It is believed to be true.", accepted: ["it is believed to be true"] },
      ],
      conversation: {
        goal: "Atue como repórter: o professor dá fatos de uma notícia e você os apresenta com distanciamento (it is believed, is said to...).",
        starter: "Breaking news: a famous painting has disappeared from a museum overnight. Report it like a journalist!",
      },
      review: ["It is said/believed/reported that...", "Sujeito + is said to + verbo / to have + particípio.", "Usado em notícias para não afirmar como certo."],
    }),

    buildLesson("b2-m6-l3", M, 3, {
      title: "Fake news e fontes",
      objective: "Avaliar informações com modais de probabilidade.",
      explanation: [
        {
          title: "Graus de certeza",
          body: "**This must be fake.** (quase certeza) · **It could well be true.** (bem possível) · **It's highly unlikely that...** (muito improvável) · **There's no way that's real.** (informal) · **It's bound to be exaggerated.**",
        },
        {
          title: "Avaliando fontes",
          body: "**reliable / trustworthy source** (fonte confiável) · **biased** (tendencioso) · **clickbait** · **fact-check** (checar) · **misleading** (enganoso) · **out of context** · **Who's behind this?** · **Can it be verified?**",
        },
      ],
      vocabulary: [
        { en: "trustworthy", pt: "confiável", say: "TRÂST-uêr-dhi" },
        { en: "biased", pt: "tendencioso", say: "BÁI-âst" },
        { en: "misleading", pt: "enganoso", say: "mis-LÍI-ding" },
        { en: "fact-check", pt: "checar os fatos", say: "FÉKT-tchék" },
        { en: "clickbait", pt: "caça-cliques", say: "CLÍK-bêit" },
        { en: "highly unlikely", pt: "muito improvável", say: "RÁI-li ân-LÁIK-li" },
        { en: "could well", pt: "pode muito bem", say: "cud UÉL" },
        { en: "verify", pt: "verificar", say: "VÉ-ri-fái" },
        { en: "spread", pt: "espalhar", say: "SPRÉD" },
      ],
      examples: [
        { en: "That headline is misleading. The study says something different.", pt: "Essa manchete é enganosa. O estudo diz outra coisa." },
        { en: "It's highly unlikely that a lemon cures cancer.", pt: "É muito improvável que limão cure câncer." },
        { en: "Before you share it, fact-check it.", pt: "Antes de compartilhar, cheque os fatos." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Biased\" significa:", options: ["Tendencioso", "Confiável", "Engraçado"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "That's a very ___ headline. It doesn't match the article. (enganosa)", accepted: ["misleading"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Grau de certeza alto de que é falso:", options: ["It might be fake.", "It must be fake.", "It could be fake."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "It could ___ be true. Let's check. (bem possível)", accepted: ["well"] },
        { type: "translate", skill: "writing", prompt: "É uma fonte confiável?", accepted: ["Is it a reliable source?", "Is it a trustworthy source?", "Is this a reliable source?", "Is this a trustworthy source?"] },
        { type: "word_order", skill: "grammar", prompt: "Fake news se espalha mais rápido que a verdade.", answer: "Fake news spreads faster than the truth.", distractors: ["spread"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "The quote is real, but it was taken completely out of context.", options: ["A citação é real, mas foi tirada de contexto.", "A citação é inventada.", "A citação está correta e no contexto."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Can it be verified?", accepted: ["can it be verified"] },
      ],
      conversation: {
        goal: "O professor vai mostrar \"notícias\" duvidosas. Avalie cada uma: grau de certeza, fonte e o que você checaria.",
        starter: "I just read online that drinking coffee makes you live twenty years longer. What do you make of that?",
      },
      review: ["must / could well / highly unlikely / bound to.", "reliable, biased, misleading, clickbait, fact-check.", "Fonte, contexto e verificação."],
    }),

    buildLesson("b2-m6-l4", M, 4, {
      title: "Resumos",
      objective: "Resumir textos com paráfrase e nominalização.",
      explanation: [
        {
          title: "Parafrasear",
          body: "Diga a mesma ideia com outras palavras e estrutura: **The number of tourists rose sharply.** → **There was a sharp increase in tourism.** Troque sinônimos, mude a classe gramatical, inverta a ordem.",
        },
        {
          title: "Nominalização",
          body: "Transformar verbos em substantivos deixa o texto mais conciso e formal: **The company decided to expand, which surprised investors.** → **The company's decision to expand surprised investors.** · develop → development, fail → failure, grow → growth.",
        },
        {
          title: "Estrutura do resumo",
          body: "**The article / report discusses...** · **According to the author,...** · **The main argument is that...** · **The author concludes that...** Sem opinião pessoal e sem detalhes secundários.",
        },
      ],
      vocabulary: [
        { en: "summarize", pt: "resumir", say: "SÂ-ma-ráiz" },
        { en: "paraphrase", pt: "parafrasear", say: "PÉ-ra-frêiz" },
        { en: "main point", pt: "ponto principal", say: "MÊIN PÓINT" },
        { en: "growth", pt: "crescimento", say: "GRÔUTH" },
        { en: "failure", pt: "fracasso / falha", say: "FÊIL-iur" },
        { en: "increase in", pt: "aumento de", say: "ÍN-criis in" },
        { en: "according to", pt: "segundo", say: "a-CÓR-ding tu" },
        { en: "conclude", pt: "concluir", say: "con-CLÚUD" },
        { en: "key findings", pt: "principais descobertas", say: "KÍI FÁIN-dingz" },
      ],
      examples: [
        { en: "The report discusses the rapid growth of online shopping.", pt: "O relatório discute o rápido crescimento das compras online." },
        { en: "According to the author, the main cause is a lack of investment.", pt: "Segundo o autor, a causa principal é a falta de investimento." },
        { en: "The key findings suggest a sharp increase in remote work.", pt: "As principais descobertas indicam um forte aumento do trabalho remoto." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "writing", prompt: "Nominalização de \"Prices rose quickly\":", options: ["There was a rapid rise in prices.", "Prices are rising quickly now.", "Quickly the prices rose."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "The ___ of the project surprised everyone. (fail)", accepted: ["failure"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Economic ___ slowed down last year. (grow)", accepted: ["growth"] },
        { type: "multiple_choice", skill: "writing", prompt: "Num resumo, você deve:", options: ["Dar sua opinião pessoal.", "Manter só as ideias principais, com suas palavras.", "Copiar as frases do texto."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Segundo o autor, o problema é a falta de investimento.", accepted: ["According to the author, the problem is the lack of investment.", "According to the author, the problem is a lack of investment."] },
        { type: "word_order", skill: "writing", prompt: "O artigo discute os efeitos das redes sociais.", answer: "The article discusses the effects of social media.", distractors: ["about"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha o melhor resumo.", audio: "More and more people are leaving big cities. Rents are high, and remote work means they no longer need to live near the office.", options: ["Pessoas deixam grandes cidades por aluguéis caros e trabalho remoto.", "Os aluguéis estão caindo.", "Todos voltaram aos escritórios."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "The author concludes that change is necessary.", accepted: ["the author concludes that change is necessary"] },
      ],
      conversation: {
        goal: "O professor vai contar uma notícia longa. Resuma em três frases, com suas palavras e sem opinião.",
        starter: "I'm going to tell you about an article I read. Then you summarize it in three sentences, OK?",
      },
      review: ["Parafrasear: sinônimos + nova estrutura.", "Nominalização: decide → decision, grow → growth.", "Resumo: ideias principais, sem opinião."],
    }),

    buildLesson("b2-m6-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Mídia e informação",
      objective: "Comprovar que você relata, avalia e resume informações.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "She denied ___ (take) the documents.", accepted: ["taking", "having taken"] },
        { type: "fill_blank", skill: "grammar", sentence: "It is ___ that 30% of the forest has been lost. (estima-se)", accepted: ["estimated", "believed", "thought"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"The ship is believed ___ in 1912.\"", options: ["to sink", "to have sunk", "sinking"], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Misleading\":", options: ["Enganoso", "Liderança", "Perdido"], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Eles nos pediram com insistência para sair.", accepted: ["They urged us to leave.", "They urged us to go."] },
        { type: "word_order", skill: "grammar", prompt: "Houve um forte aumento do desemprego.", answer: "There was a sharp increase in unemployment." },
        { type: "fill_blank", skill: "grammar", sentence: "They accused him ___ cheating.", accepted: ["of"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "It's highly unlikely that the story is true. The source is anonymous and biased.", options: ["Muito improvável que seja verdade; fonte anônima e tendenciosa.", "A história foi confirmada.", "A fonte é muito confiável."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "According to the report, sales fell.", accepted: ["according to the report sales fell"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["claim", "alegar"], ["deny", "negar"], ["growth", "crescimento"], ["spokesperson", "porta-voz"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
