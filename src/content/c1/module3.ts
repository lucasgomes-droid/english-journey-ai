import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "c1-m3";

export const c1Module3: Module = {
  id: M,
  level: "C1",
  order: 3,
  title: "Fala persuasiva",
  description: "Retórica, apresentações complexas, discussões de alto nível e improviso.",
  lessons: [
    buildLesson("c1-m3-l1", M, 1, {
      title: "Retórica",
      objective: "Persuadir com tríades, perguntas retóricas e contraste.",
      explanation: [
        {
          title: "Recursos clássicos",
          body: "**Tríade** (regra de três): **It's faster, cheaper and safer.** · **Pergunta retórica**: **Do we really want to wait another ten years?** · **Contraste**: **It's not a cost; it's an investment.** · **Repetição (anáfora)**: **We will listen. We will learn. We will act.**",
        },
        {
          title: "Ethos, pathos, logos",
          body: "Credibilidade (**In my fifteen years in the industry...**), emoção (**Imagine a child who...**) e lógica (**The numbers are clear: ...**). Um bom discurso usa os três.",
        },
      ],
      vocabulary: [
        { en: "persuade", pt: "persuadir", say: "per-SUÊID" },
        { en: "rhetorical question", pt: "pergunta retórica", say: "re-TÓ-ri-col KUÉS-tchan" },
        { en: "compelling", pt: "convincente / irresistível", say: "com-PÉ-ling" },
        { en: "audience", pt: "público", say: "Ó-di-ens" },
        { en: "appeal to", pt: "apelar a", say: "a-PÍIL tu" },
        { en: "credibility", pt: "credibilidade", say: "cre-di-BÍ-li-ti" },
        { en: "call to action", pt: "chamada para ação", say: "CÓL tu ÉK-shan" },
        { en: "investment", pt: "investimento", say: "in-VÉST-ment" },
      ],
      examples: [
        { en: "It's not a cost; it's an investment in our future.", pt: "Não é um custo; é um investimento no nosso futuro." },
        { en: "Can we really afford to do nothing?", pt: "Podemos mesmo nos dar ao luxo de não fazer nada?" },
        { en: "This plan is simple, affordable and proven.", pt: "Este plano é simples, acessível e comprovado." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Qual é uma tríade?", options: ["It's good.", "It's quick, cheap and reliable.", "It's very, very good."], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Qual é uma pergunta retórica?", options: ["What time is it?", "Do we really want our children to inherit this mess?", "Where is the bathroom?"], answer: 1 },
        { type: "fill_blank", skill: "vocabulary", sentence: "It's not a problem; it's an ___. (oportunidade)", accepted: ["opportunity"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "End your speech with a clear call to ___.", accepted: ["action"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"In my twenty years as a nurse...\" apela a:", options: ["Credibilidade (ethos)", "Emoção (pathos)", "Lógica (logos)"], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Podemos mesmo esperar mais?", accepted: ["Can we really wait any longer?", "Can we really afford to wait any longer?", "Can we really wait longer?"] },
        { type: "word_order", skill: "grammar", prompt: "Vamos ouvir, vamos aprender e vamos agir.", answer: "We will listen, we will learn and we will act.", distractors: ["going"] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "The numbers are clear.", accepted: ["the numbers are clear"] },
      ],
      conversation: {
        goal: "Faça um discurso de 1 minuto convencendo o professor a apoiar uma causa, usando tríade, pergunta retórica e contraste.",
        starter: "You have one minute to convince me to support your idea. Go!",
      },
      review: ["Tríade, pergunta retórica, contraste, repetição.", "Ethos, pathos, logos.", "Termine com call to action."],
    }),

    buildLesson("c1-m3-l2", M, 2, {
      title: "Apresentações complexas",
      objective: "Apresentar dados e ideias complexas com sinalização avançada.",
      explanation: [
        {
          title: "Sinalização avançada",
          body: "**I'd like to begin by... · Let me draw your attention to... · This brings me to my next point... · To put this into perspective,... · What this means in practice is... · Let me just recap the key takeaways.**",
        },
        {
          title: "Descrevendo dados com nuance",
          body: "**rose steadily / fluctuated / plummeted** (despencou) / **soared** (disparou) / **leveled off** (estabilizou) · **a marginal increase / a twofold increase** (dobrou) · **accounted for 40% of** (representou 40%).",
        },
      ],
      vocabulary: [
        { en: "draw attention to", pt: "chamar atenção para", say: "DRÓ a-TÉN-shan tu" },
        { en: "put into perspective", pt: "colocar em perspectiva", say: "pút in-tu per-SPÉK-tiv" },
        { en: "plummet", pt: "despencar", say: "PLÂ-met" },
        { en: "soar", pt: "disparar", say: "SÓR" },
        { en: "level off", pt: "estabilizar", say: "LÉ-vol ÓF" },
        { en: "fluctuate", pt: "oscilar", say: "FLÂK-tchu-êit" },
        { en: "account for", pt: "representar / explicar", say: "a-CÁUNT for" },
        { en: "takeaway", pt: "conclusão principal / lição", say: "TÊIK-a-uêi" },
        { en: "twofold", pt: "duplo / dobrado", say: "TÚ-fould" },
      ],
      examples: [
        { en: "To put this into perspective, that's the population of a small city.", pt: "Para colocar em perspectiva, é a população de uma cidade pequena." },
        { en: "Online sales soared in 2020 and have since leveled off.", pt: "As vendas online dispararam em 2020 e desde então se estabilizaram." },
        { en: "Exports accounted for 40% of total revenue.", pt: "As exportações representaram 40% da receita total." },
      ],
      exercises: [
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["soar", "disparar"], ["plummet", "despencar"], ["level off", "estabilizar"], ["fluctuate", "oscilar"]] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Services account ___ 60% of GDP.", accepted: ["for"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Let me draw your ___ to this chart.", accepted: ["attention"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"A twofold increase\" significa:", options: ["Aumento pela metade", "Dobrou", "Aumento de 2%"], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Isso me leva ao próximo ponto.", accepted: ["This brings me to my next point.", "That brings me to my next point.", "This leads me to my next point."] },
        { type: "word_order", skill: "grammar", prompt: "Na prática, isso significa custos menores.", answer: "In practice, this means lower costs.", distractors: ["mean"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Prices plummeted in March, then fluctuated for the rest of the year.", options: ["Preços despencaram em março e depois oscilaram.", "Preços dispararam em março.", "Preços ficaram estáveis o ano todo."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Let me recap the key takeaways.", accepted: ["let me recap the key takeaways"] },
      ],
      conversation: {
        goal: "Apresente ao professor dados do seu trabalho (vendas, clientes, metas) com sinalização avançada e verbos de tendência.",
        starter: "Imagine I'm the board. Walk me through last year's numbers and what they mean for us.",
      },
      review: ["Draw attention to / put into perspective / what this means in practice.", "soar, plummet, level off, fluctuate, account for.", "Recapitule as key takeaways."],
    }),

    buildLesson("c1-m3-l3", M, 3, {
      title: "Discussões de alto nível",
      objective: "Argumentar com nuance usando concessão e refutação.",
      explanation: [
        {
          title: "Conceder para refutar",
          body: "Mostre que entende o outro lado antes de discordar: **Admittedly, the costs are high. That said, the long-term savings are considerable.** · **While it's true that..., it doesn't follow that...** (não significa que) · **Granted,... but...**",
        },
        {
          title: "Pressionar a lógica",
          body: "**That's a false dichotomy.** (falsa escolha) · **That argument doesn't hold water.** (não se sustenta) · **Correlation isn't causation.** · **That's beside the point.** (não vem ao caso)",
        },
      ],
      vocabulary: [
        { en: "admittedly", pt: "é verdade que / reconhecidamente", say: "ad-MÍ-tid-li" },
        { en: "that said", pt: "dito isso", say: "dhét SÉD" },
        { en: "it doesn't follow that", pt: "não significa que", say: "it DÂ-zent FÓ-lou dhét" },
        { en: "granted", pt: "admito que", say: "GRÉN-tid" },
        { en: "hold water", pt: "se sustentar (argumento)", say: "RÔULD UÓ-ter" },
        { en: "false dichotomy", pt: "falso dilema", say: "FÓLS dai-KÓ-to-mi" },
        { en: "beside the point", pt: "fora de questão / irrelevante", say: "bi-SÁID dhe PÓINT" },
        { en: "nuance", pt: "nuance", say: "NÚ-ans" },
      ],
      examples: [
        { en: "Admittedly, the plan is ambitious. That said, it's achievable.", pt: "É verdade que o plano é ambicioso. Dito isso, é alcançável." },
        { en: "While it's true that crime rose, it doesn't follow that the policy failed.", pt: "Embora o crime tenha aumentado, isso não significa que a política fracassou." },
        { en: "That argument doesn't hold water.", pt: "Esse argumento não se sustenta." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"That argument doesn't hold water.\"", options: ["O argumento não se sustenta.", "O argumento é molhado.", "O argumento é forte."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Admittedly, it's expensive. That ___, it's worth it.", accepted: ["said"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Correlation isn't ___.", translation: "Correlação não é causalidade.", accepted: ["causation"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Either we cut jobs or we close.\" Isso pode ser:", options: ["A false dichotomy.", "A rhetorical question.", "A call to action."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Isso não vem ao caso.", accepted: ["That's beside the point.", "That is beside the point."] },
        { type: "word_order", skill: "grammar", prompt: "Admito que é arriscado, mas vale a pena.", answer: "Granted, it's risky, but it's worth it.", distractors: ["grant"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "While it's true that sales fell, it doesn't follow that the product is bad.", options: ["As vendas caíram, mas isso não significa que o produto é ruim.", "O produto é ruim porque as vendas caíram.", "As vendas subiram."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "That said, it is achievable.", accepted: ["that said it is achievable", "that said it's achievable"] },
      ],
      conversation: {
        goal: "Discuta um tema complexo (renda básica universal, energia nuclear) concedendo pontos e refutando com nuance.",
        starter: "Universal basic income: a brilliant idea or an economic disaster? Make your case, and acknowledge the other side.",
      },
      review: ["Conceder: Admittedly / Granted / While it's true that...", "Refutar: That said / it doesn't follow that...", "Lógica: false dichotomy, doesn't hold water, beside the point."],
    }),

    buildLesson("c1-m3-l4", M, 4, {
      title: "Improviso",
      objective: "Responder sem preparação, com fillers naturais e reformulação.",
      explanation: [
        {
          title: "Ganhar tempo com elegância",
          body: "**That's an interesting question.** · **Let me think about that for a second.** · **I hadn't really considered that, but...** · **Off the top of my head,...** (de cabeça, sem pensar muito)",
        },
        {
          title: "Reformular e corrigir-se",
          body: "**What I mean is... · Let me put it another way. · Or rather,... · Actually, scratch that.** (esquece o que eu disse). Corrigir-se com naturalidade é sinal de fluência, não de erro.",
        },
        {
          title: "Estrutura rápida",
          body: "Para qualquer pergunta: **posição → motivo → exemplo → conclusão** em 30 segundos.",
        },
      ],
      vocabulary: [
        { en: "off the top of my head", pt: "de cabeça / assim de pronto", say: "óf dhe TÓP ov mái RÉD" },
        { en: "let me put it another way", pt: "deixa eu dizer de outro jeito", say: "let mi PÚT it a-NÂ-dher UÊI" },
        { en: "or rather", pt: "ou melhor", say: "or RÉ-dher" },
        { en: "scratch that", pt: "esquece o que eu disse", say: "SKRÉTCH dhét" },
        { en: "on the spot", pt: "na hora / de improviso", say: "on dhe SPÓT" },
        { en: "rephrase", pt: "reformular", say: "ri-FRÊIZ" },
        { en: "tricky", pt: "complicado / capcioso", say: "TRÍ-ki" },
        { en: "spontaneous", pt: "espontâneo", say: "spon-TÊI-ni-âs" },
      ],
      examples: [
        { en: "Off the top of my head, I'd say around two hundred.", pt: "De cabeça, eu diria uns duzentos." },
        { en: "It's expensive, or rather, it's not cheap for what it offers.", pt: "É caro, ou melhor, não é barato pelo que oferece." },
        { en: "That's a tricky one. Let me think for a second.", pt: "Essa é complicada. Deixa eu pensar um segundo." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Pergunta difícil de surpresa. Você diz:", options: ["I don't know.", "That's a tricky one. Let me think for a second.", "Next question."], answer: 1 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Off the top of my ___, I'd say it's about 50 km.", accepted: ["head"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Let me put it another ___.", accepted: ["way"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Scratch that.\"", options: ["Esquece o que eu disse.", "Coce isso.", "Anote isso."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Ou melhor, foi um erro meu.", accepted: ["Or rather, it was my mistake.", "Or rather, it was my fault."] },
        { type: "word_order", skill: "grammar", prompt: "Eu não tinha pensado nisso, mas faz sentido.", answer: "I hadn't really considered that, but it makes sense.", distractors: ["does"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "What I mean is, we don't need more meetings, we need better ones.", options: ["Não precisamos de mais reuniões, mas de reuniões melhores.", "Precisamos de mais reuniões.", "Vamos cancelar todas as reuniões."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "That's an interesting question.", accepted: ["that's an interesting question", "that is an interesting question"] },
      ],
      conversation: {
        goal: "Improviso: o professor faz perguntas inesperadas e você responde em 30 segundos com posição, motivo, exemplo e conclusão.",
        starter: "No preparation! First question: if you could abolish one law, which would it be and why?",
      },
      review: ["Ganhar tempo: That's an interesting question / Off the top of my head.", "Reformular: What I mean is / Or rather / Let me put it another way.", "Posição → motivo → exemplo → conclusão."],
    }),

    buildLesson("c1-m3-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Fala persuasiva",
      objective: "Comprovar que você persuade, apresenta, debate e improvisa.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Soared\":", options: ["Disparou", "Despencou", "Estabilizou"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Admittedly, it's risky. That ___, it's our only option.", accepted: ["said"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Recurso: \"It's not a cost, it's an investment.\"", options: ["Contraste", "Tríade", "Pergunta retórica"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Women account ___ 55% of our customers.", accepted: ["for"] },
        { type: "translate", skill: "writing", prompt: "Deixa eu dizer de outro jeito.", accepted: ["Let me put it another way.", "Let me say it another way.", "Let me put it differently."] },
        { type: "word_order", skill: "grammar", prompt: "Esse argumento não se sustenta.", answer: "That argument doesn't hold water." },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"On the spot\":", options: ["Na hora / de improviso", "No lugar errado", "Com manchas"], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "To put this into perspective, we lose a customer every ten minutes.", options: ["Perdemos um cliente a cada dez minutos.", "Ganhamos dez clientes por minuto.", "Não perdemos clientes."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Can we really afford to wait?", accepted: ["can we really afford to wait"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["compelling", "convincente"], ["granted", "admito que"], ["or rather", "ou melhor"], ["takeaway", "lição principal"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
