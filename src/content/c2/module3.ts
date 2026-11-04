import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "c2-m3";

export const c2Module3: Module = {
  id: M,
  level: "C2",
  order: 3,
  title: "Fala de alto nível",
  description: "Debates acadêmicos, mediação, palestras com impacto e conversa nativa informal.",
  lessons: [
    buildLesson("c2-m3-l1", M, 1, {
      title: "Debates acadêmicos",
      objective: "Refutar com elegância em discussões de alto nível.",
      explanation: [
        {
          title: "Refutação elegante",
          body: "**With respect, I think that conflates two distinct issues.** (mistura duas questões) · **That rather begs the question of...** (pressupõe o que deveria provar) · **I'd take issue with the premise.** (questionaria a premissa) · **That's a fair point as far as it goes, but...**",
        },
        {
          title: "Precisão conceitual",
          body: "**Let's be clear about what we mean by...** · **I'd draw a distinction between X and Y.** · **That's an empirical question, not a moral one.** · **The burden of proof lies with...** (o ônus da prova é de...)",
        },
      ],
      vocabulary: [
        { en: "conflate", pt: "confundir / misturar (conceitos)", say: "con-FLÊIT" },
        { en: "beg the question", pt: "pressupor o que se quer provar", say: "BÉG dhe KUÉS-tchan" },
        { en: "take issue with", pt: "contestar", say: "têik Í-shu uidh" },
        { en: "premise", pt: "premissa", say: "PRÉ-mis" },
        { en: "as far as it goes", pt: "até onde vai", say: "éz FÁR éz it GÔUZ" },
        { en: "draw a distinction", pt: "fazer uma distinção", say: "DRÓ a dis-TÍNK-shan" },
        { en: "empirical", pt: "empírico", say: "em-PÍ-ri-col" },
        { en: "burden of proof", pt: "ônus da prova", say: "BÂR-den ov PRÚUF" },
      ],
      examples: [
        { en: "With respect, I think that conflates correlation with causation.", pt: "Com respeito, acho que isso confunde correlação com causalidade." },
        { en: "I'd take issue with the premise of the question.", pt: "Eu contestaria a premissa da pergunta." },
        { en: "The burden of proof lies with those making the claim.", pt: "O ônus da prova é de quem faz a afirmação." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"That conflates two issues.\"", options: ["Isso mistura duas questões distintas.", "Isso resolve duas questões.", "Isso separa bem duas questões."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "I'd take ___ with that claim. (contestaria)", accepted: ["issue"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "The burden of ___ lies with the prosecution.", accepted: ["proof"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "I'd draw a ___ between privacy and secrecy.", accepted: ["distinction"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"That's a fair point as far as it goes, but...\" indica:", options: ["Concessão parcial antes de refutar.", "Concordância total.", "Mudança de assunto."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Essa é uma questão empírica, não moral.", accepted: ["That's an empirical question, not a moral one.", "That is an empirical question, not a moral one.", "This is an empirical question, not a moral one."] },
        { type: "word_order", skill: "grammar", prompt: "Vamos deixar claro o que entendemos por sucesso.", answer: "Let's be clear about what we mean by success.", distractors: ["understand"] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "That rather begs the question.", accepted: ["that rather begs the question"] },
      ],
      conversation: {
        goal: "Debata com o professor um tema acadêmico controverso, refutando premissas e fazendo distinções conceituais.",
        starter: "My claim: 'Social media has made democracy weaker.' Challenge my premises and draw some distinctions.",
      },
      review: ["conflate, beg the question, take issue with the premise.", "draw a distinction, empirical vs moral.", "burden of proof."],
    }),

    buildLesson("c2-m3-l2", M, 2, {
      title: "Mediação",
      objective: "Mediar discussões parafraseando posições com neutralidade.",
      explanation: [
        {
          title: "Parafrasear e validar",
          body: "**If I've understood you correctly, your main concern is...** · **So what I'm hearing is...** · **Let me check I've got this right.** · Valide sem tomar partido: **That's a legitimate concern.**",
        },
        {
          title: "Encontrar terreno comum",
          body: "**It sounds as though you both agree that...** · **Where there seems to be common ground is...** · **What would a workable compromise look like?** · **Let's separate the issue from the people.**",
        },
      ],
      vocabulary: [
        { en: "mediate", pt: "mediar", say: "MÍ-di-êit" },
        { en: "common ground", pt: "terreno comum", say: "CÓ-mon GRÁUND" },
        { en: "legitimate", pt: "legítimo", say: "le-DJÍ-ti-mat" },
        { en: "workable", pt: "viável / funcional", say: "UÊR-ka-bol" },
        { en: "impartial", pt: "imparcial", say: "im-PÁR-shal" },
        { en: "de-escalate", pt: "desescalar / acalmar", say: "di-ÉS-ka-lêit" },
        { en: "grievance", pt: "queixa / mágoa", say: "GRÍI-vans" },
        { en: "reframe", pt: "reformular (perspectiva)", say: "ri-FRÊIM" },
      ],
      examples: [
        { en: "If I've understood you correctly, your main concern is the workload.", pt: "Se entendi bem, sua principal preocupação é a carga de trabalho." },
        { en: "It sounds as though you both agree on the goal, just not the timing.", pt: "Parece que vocês dois concordam com o objetivo, só não com o prazo." },
        { en: "What would a workable compromise look like?", pt: "Como seria um meio-termo viável?" },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Frase de mediador imparcial:", options: ["You're clearly right, Ana.", "So what I'm hearing is that you both want the project to succeed.", "Stop arguing."], answer: 1 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Where there seems to be common ___ is the budget.", accepted: ["ground"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "That's a ___ concern. (legítima)", accepted: ["legitimate", "valid", "fair"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Impartial\":", options: ["Imparcial", "Incompleto", "Impaciente"], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Deixa eu conferir se entendi direito.", accepted: ["Let me check I've got this right.", "Let me check that I've got this right.", "Let me make sure I've understood correctly.", "Let me check if I've got this right."] },
        { type: "word_order", skill: "grammar", prompt: "Vamos separar o problema das pessoas.", answer: "Let's separate the issue from the people.", distractors: ["of"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha o papel de quem fala.", audio: "It sounds as though you both want the same outcome. Can we focus on that?", options: ["Mediador.", "Um dos lados em conflito.", "Juiz que decide."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "That's a legitimate concern.", accepted: ["that's a legitimate concern", "that is a legitimate concern"] },
      ],
      conversation: {
        goal: "O professor interpreta dois colegas em conflito. Medie: parafraseie cada um, ache terreno comum e proponha um acordo.",
        starter: "Ana: 'He never meets deadlines!' Ben: 'She gives me impossible deadlines!' You're the mediator. Go.",
      },
      review: ["Parafrasear: If I've understood correctly... / So what I'm hearing is...", "Validar sem tomar partido.", "common ground, workable compromise."],
    }),

    buildLesson("c2-m3-l3", M, 3, {
      title: "Palestras",
      objective: "Palestrar com impacto: storytelling, pausas e retórica.",
      explanation: [
        {
          title: "Abertura que prende",
          body: "Comece com história, pergunta ou dado surpreendente, nunca com \"Hi, my name is...\": **Three years ago, I was fired by email.** · **What if everything you knew about sleep was wrong?**",
        },
        {
          title: "Técnicas de entrega",
          body: "**Pausa** antes da ideia principal. **Signposting** claro. **Callback** (retomar a história do início no final). **Rule of three**. Varie volume e ritmo. Feche com uma frase memorável e um pedido.",
        },
      ],
      vocabulary: [
        { en: "hook", pt: "gancho", say: "RÚK" },
        { en: "storytelling", pt: "narrativa / contar histórias", say: "STÓ-ri-té-ling" },
        { en: "callback", pt: "retomada (de algo do início)", say: "CÓL-bék" },
        { en: "delivery", pt: "modo de falar / entrega", say: "di-LÍ-ve-ri" },
        { en: "pause", pt: "pausa", say: "PÓZ" },
        { en: "memorable", pt: "memorável", say: "MÉ-mo-ra-bol" },
        { en: "resonate", pt: "ressoar / tocar o público", say: "RÉ-zo-nêit" },
        { en: "stage fright", pt: "medo de palco", say: "STÊIDJ FRÁIT" },
      ],
      examples: [
        { en: "Three years ago, I was fired by email. It was the best thing that ever happened to me.", pt: "Há três anos fui demitido por e-mail. Foi a melhor coisa que me aconteceu." },
        { en: "Remember that email I mentioned at the start? Here's how it ends.", pt: "Lembram daquele e-mail do começo? Eis como termina." },
        { en: "Her delivery was calm, and every pause resonated.", pt: "A forma de falar dela era calma, e cada pausa tocava o público." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Melhor abertura de palestra:", options: ["Hi, my name is Carlos and today I will talk about sleep.", "Last night, 40% of you slept less than six hours. Here's what that's doing to your brain."], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Callback\" numa palestra é:", options: ["Retomar no fim algo do início.", "Ligar de volta para alguém.", "Responder perguntas."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "A great opening needs a strong ___. (gancho)", accepted: ["hook"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "His story really ___ with the audience. (tocou)", accepted: ["resonated", "connected"] },
        { type: "translate", skill: "writing", prompt: "Eu tenho medo de palco.", accepted: ["I have stage fright.", "I've got stage fright.", "I get stage fright."] },
        { type: "word_order", skill: "grammar", prompt: "E se tudo o que você sabe estiver errado?", answer: "What if everything you know is wrong?", distractors: ["were"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha a técnica.", audio: "So remember the little girl from the beginning? Today, she runs the company.", options: ["Callback.", "Pergunta retórica.", "Dado estatístico."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It was the best thing that ever happened to me.", accepted: ["it was the best thing that ever happened to me"] },
      ],
      conversation: {
        goal: "Faça a abertura (1 minuto) de uma palestra estilo TED sobre algo que você domina, com gancho e promessa clara.",
        starter: "You're on a TED stage. The lights dim. You have one minute to open your talk. Begin.",
      },
      review: ["Abertura: história, pergunta ou dado surpreendente.", "Pausa, signposting, callback, rule of three.", "Feche com frase memorável e pedido."],
    }),

    buildLesson("c2-m3-l4", M, 4, {
      title: "Conversa informal nativa",
      objective: "Conversar sem esforço com gírias e expressões atuais.",
      explanation: [
        {
          title: "Expressões do dia a dia nativo",
          body: "**I'm swamped** (atolado de trabalho) · **It's not my thing** · **I'm on the fence** (em cima do muro) · **That's a stretch** (forçado) · **Fair enough** · **It slipped my mind** (esqueci) · **I'll play it by ear** (vou ver na hora) · **No worries** · **Touch wood / knock on wood** (bate na madeira).",
        },
        {
          title: "Gírias atuais (use com cuidado)",
          body: "**lowkey** (meio que, discretamente) · **vibe** · **FOMO** (medo de ficar de fora) · **ghost someone** (sumir sem explicação) · **cringe** (constrangedor) · **It's giving...** (tem cara de...) — mudam rápido; entenda mais do que use.",
        },
      ],
      vocabulary: [
        { en: "I'm swamped", pt: "estou atolado", say: "áim SUÓMPT" },
        { en: "on the fence", pt: "em cima do muro", say: "on dhe FÉNS" },
        { en: "that's a stretch", pt: "isso é forçar a barra", say: "dhéts a STRÉTCH" },
        { en: "it slipped my mind", pt: "esqueci", say: "it SLÍPT mái MÁIND" },
        { en: "play it by ear", pt: "ver na hora / improvisar", say: "PLÊI it bái ÍR" },
        { en: "lowkey", pt: "meio que / discretamente", say: "LÔU-kíi" },
        { en: "ghost", pt: "sumir sem explicação", say: "GÔUST" },
        { en: "cringe", pt: "constrangedor / vergonha alheia", say: "CRÍNDJ" },
        { en: "FOMO", pt: "medo de ficar de fora", say: "FÔU-mou" },
      ],
      examples: [
        { en: "Sorry I didn't call back. I'm swamped this week.", pt: "Desculpa não ter retornado. Estou atolado esta semana." },
        { en: "I'm still on the fence about the trip. Let's play it by ear.", pt: "Ainda estou em cima do muro sobre a viagem. Vamos vendo." },
        { en: "He just ghosted me after the second date.", pt: "Ele simplesmente sumiu depois do segundo encontro." },
      ],
      exercises: [
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["swamped", "atolado"], ["on the fence", "em cima do muro"], ["ghost", "sumir"], ["cringe", "vergonha alheia"]] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Sorry, it completely slipped my ___.", accepted: ["mind"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "We don't have a plan. Let's play it by ___.", accepted: ["ear"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Calling it a masterpiece is a bit of a stretch.\"", options: ["Chamar de obra-prima é forçar a barra.", "É uma obra-prima esticada.", "É uma obra-prima com certeza."], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Em reunião com um cliente formal, \"It's giving cringe\" é:", options: ["Inadequado.", "Perfeito."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Esqueci completamente.", accepted: ["It completely slipped my mind.", "I completely forgot.", "It totally slipped my mind."] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I lowkey want to skip the party, but I've got serious FOMO.", options: ["Meio que quer faltar à festa, mas tem medo de ficar de fora.", "Adora festas.", "Já decidiu não ir."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "No worries, fair enough.", accepted: ["no worries fair enough"] },
      ],
      conversation: {
        goal: "Bata papo com o professor como amigos nativos sobre planos e fofocas leves, entendendo e usando expressões atuais com naturalidade.",
        starter: "Dude, you've been MIA all week! What's going on? You coming to Jake's thing on Saturday or what?",
      },
      review: ["swamped, on the fence, slipped my mind, play it by ear, a stretch.", "Gírias: lowkey, ghost, cringe, FOMO.", "Entenda mais do que usa; contexto é tudo."],
    }),

    buildLesson("c2-m3-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Fala de alto nível",
      objective: "Comprovar fala sofisticada em contextos acadêmicos, profissionais e informais.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "vocabulary", sentence: "I'd take ___ with that premise.", accepted: ["issue"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Common ground\":", options: ["Terreno comum (acordo)", "Chão comum", "Terra pública"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "I'm totally ___ this week. No time at all. (atolado)", accepted: ["swamped", "snowed under", "busy"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Melhor abertura de palestra:", options: ["A surprising question or story.", "Reading the agenda aloud."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "O ônus da prova é de quem acusa.", accepted: ["The burden of proof lies with the accuser.", "The burden of proof is on the accuser.", "The burden of proof lies with those who accuse."] },
        { type: "word_order", skill: "grammar", prompt: "Se entendi bem, sua preocupação é o custo.", answer: "If I've understood correctly, your concern is the cost." },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"I'm on the fence.\"", options: ["Estou em dúvida / em cima do muro.", "Estou na cerca.", "Estou decidido."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "With respect, that conflates two very different things.", options: ["Isso mistura duas coisas muito diferentes.", "Isso esclarece tudo.", "Concordo totalmente."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Let's play it by ear.", accepted: ["let's play it by ear", "let us play it by ear"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["hook", "gancho"], ["impartial", "imparcial"], ["premise", "premissa"], ["ghost", "sumir"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
