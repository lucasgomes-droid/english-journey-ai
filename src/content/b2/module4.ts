import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "b2-m4";

export const b2Module4: Module = {
  id: M,
  level: "B2",
  order: 4,
  title: "Inglês profissional",
  description: "Negociar, reportar status, dar feedback e fazer networking.",
  lessons: [
    buildLesson("b2-m4-l1", M, 1, {
      title: "Negociação",
      objective: "Negociar condições usando condicionais e propostas.",
      explanation: [
        {
          title: "Propor com condição",
          body: "**If you increase the order, we could offer a 10% discount.** · **Providing (that) you pay upfront, we can deliver next week.** · **We'd be willing to... as long as...**",
        },
        {
          title: "Ganhar tempo e recusar",
          body: "**I'll need to run that by my manager.** (consultar) · **That's a bit more than we were hoping to pay.** · **I'm afraid that's out of the question.** (fora de cogitação)",
        },
        {
          title: "Fechar",
          body: "**I think we have a deal.** · **Let's put that in writing.** · **So, just to recap what we've agreed...**",
        },
      ],
      vocabulary: [
        { en: "upfront", pt: "adiantado / à vista", say: "âp-FRÂNT" },
        { en: "willing to", pt: "disposto a", say: "UÍ-ling tu" },
        { en: "run by", pt: "consultar (alguém)", say: "RÂN BÁI" },
        { en: "out of the question", pt: "fora de cogitação", say: "áut ov dhe KUÉS-tchan" },
        { en: "deal", pt: "acordo / negócio", say: "DÍIL" },
        { en: "terms", pt: "condições", say: "TÂRMZ" },
        { en: "counteroffer", pt: "contraproposta", say: "CÁUN-ter-ó-fer" },
        { en: "recap", pt: "recapitular", say: "RÍ-kép" },
        { en: "bottom line", pt: "limite / o essencial", say: "BÓ-tom LÁIN" },
      ],
      examples: [
        { en: "If you sign a two-year contract, we could lower the price.", pt: "Se vocês assinarem por dois anos, poderíamos baixar o preço." },
        { en: "I'll need to run that by my director.", pt: "Vou precisar consultar meu diretor." },
        { en: "So, just to recap: delivery in May, payment in two installments.", pt: "Então, recapitulando: entrega em maio, pagamento em duas parcelas." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"That's out of the question.\"", options: ["Está fora de cogitação.", "Não entendi a pergunta.", "É uma boa pergunta."], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "___ you pay upfront, we can offer a discount. (desde que)", accepted: ["Providing", "Provided", "If", "As long as"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "We'd be ___ to extend the deadline.", translation: "Estaríamos dispostos a...", accepted: ["willing", "happy", "prepared"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Para ganhar tempo sem dizer não:", options: ["No way.", "I'll need to run that by my manager.", "Deal!"], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Acho que temos um acordo.", accepted: ["I think we have a deal.", "I think we've got a deal."] },
        { type: "word_order", skill: "grammar", prompt: "Vamos colocar isso por escrito.", answer: "Let's put that in writing.", distractors: ["on"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "That's a bit more than we were hoping to pay. Could you meet us halfway?", options: ["Está acima do esperado; pede um meio-termo.", "Aceita o preço.", "Desiste do negócio."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "What's your bottom line?", accepted: ["what's your bottom line", "what is your bottom line"] },
      ],
      conversation: {
        goal: "Negocie com o professor (fornecedor) preço, prazo e forma de pagamento. Faça contrapropostas e feche recapitulando.",
        starter: "Thanks for meeting with us. Our price for 500 units is twenty dollars each, delivery in eight weeks.",
      },
      review: ["Propor com condição: If you..., we could... / Providing that...", "Ganhar tempo: I'll need to run that by...", "Fechar: deal, put it in writing, recap."],
    }),

    buildLesson("b2-m4-l2", M, 2, {
      title: "Gestão de projetos",
      objective: "Reportar status com passiva e linguagem de andamento.",
      explanation: [
        {
          title: "Status com a passiva",
          body: "**The design has been approved.** · **Testing is being carried out this week.** · **The launch has been pushed back to June.** (adiado) A passiva foca no trabalho, não em quem fez.",
        },
        {
          title: "Linguagem de status",
          body: "**on track / ahead of schedule / behind schedule** · **We're running late on...** · **There's a risk that...** · **The main blocker is...** (impedimento) · **I'll keep you posted.** (Te mantenho informado.)",
        },
      ],
      vocabulary: [
        { en: "behind schedule", pt: "atrasado (no cronograma)", say: "bi-RÁIND SKÉ-djul" },
        { en: "ahead of schedule", pt: "adiantado", say: "a-RÉD ov SKÉ-djul" },
        { en: "push back", pt: "adiar", say: "PÚSH BÉK" },
        { en: "carry out", pt: "realizar", say: "CÉ-ri ÁUT" },
        { en: "blocker", pt: "impedimento", say: "BLÓ-ker" },
        { en: "stakeholder", pt: "parte interessada", say: "STÊIK-rôul-der" },
        { en: "milestone", pt: "marco / entrega", say: "MÁIL-stôun" },
        { en: "keep you posted", pt: "te manter informado", say: "KÍIP iu PÔUS-tid" },
        { en: "scope", pt: "escopo", say: "SKÔUP" },
      ],
      examples: [
        { en: "The first milestone has been delivered, and we're on track for the next one.", pt: "O primeiro marco foi entregue e estamos dentro do previsto para o próximo." },
        { en: "Unfortunately, the launch has been pushed back two weeks.", pt: "Infelizmente, o lançamento foi adiado em duas semanas." },
        { en: "The main blocker is the supplier. I'll keep you posted.", pt: "O principal impedimento é o fornecedor. Te mantenho informado." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "The contract has ___ signed.", accepted: ["been"] },
        { type: "fill_blank", skill: "grammar", sentence: "Tests are being ___ out this week. (realizados)", accepted: ["carried"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"We're behind schedule.\"", options: ["Estamos atrasados no cronograma.", "Estamos adiantados.", "Estamos no prazo."], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"The launch has been pushed back.\"", options: ["O lançamento foi antecipado.", "O lançamento foi adiado.", "O lançamento foi um sucesso."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Vou te manter informado.", accepted: ["I'll keep you posted.", "I will keep you posted.", "I'll keep you informed.", "I will keep you informed."] },
        { type: "word_order", skill: "grammar", prompt: "O orçamento ainda não foi aprovado.", answer: "The budget hasn't been approved yet.", distractors: ["didn't"] },
        { type: "listening", skill: "listening", prompt: "Ouça o status e escolha.", audio: "Phase one is complete, phase two is slightly behind schedule, and the main blocker is staffing.", options: ["Fase 1 pronta, fase 2 um pouco atrasada, falta de pessoal.", "Tudo atrasado.", "Tudo adiantado."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "We're on track.", accepted: ["we're on track", "we are on track"] },
      ],
      conversation: {
        goal: "Dê ao professor (seu diretor) um status de um projeto real ou inventado: o que foi feito, o que está atrasado, riscos e próximos passos.",
        starter: "Hi, I've got five minutes. Can you give me a quick update on the project?",
      },
      review: ["Passiva para status: has been approved / is being tested.", "on track, behind/ahead of schedule, pushed back.", "blocker, milestone, keep you posted."],
    }),

    buildLesson("b2-m4-l3", M, 3, {
      title: "Feedback",
      objective: "Dar e receber feedback com linguagem diplomática.",
      explanation: [
        {
          title: "Softeners (suavizadores)",
          body: "**a bit / slightly / perhaps / might want to**: **You might want to shorten the introduction.** · **It could perhaps be a little clearer.** · Pergunta em vez de ordem: **Have you considered...?** · **What if we tried...?**",
        },
        {
          title: "Estrutura útil",
          body: "Situação → comportamento → impacto → sugestão: **In yesterday's meeting, you interrupted the client a few times, which made it hard to close the deal. Next time, maybe let them finish first?**",
        },
        {
          title: "Recebendo",
          body: "**Thanks, that's really helpful.** · **Could you give me an example?** · **I hadn't thought of it that way.**",
        },
      ],
      vocabulary: [
        { en: "feedback", pt: "retorno / feedback", say: "FÍID-bék" },
        { en: "you might want to", pt: "talvez você queira", say: "iu mait UÓNT tu" },
        { en: "Have you considered...?", pt: "Você já pensou em...?", say: "rév iu con-SÍ-derd" },
        { en: "constructive", pt: "construtivo", say: "con-STRÂK-tiv" },
        { en: "impact", pt: "impacto", say: "ÍM-pékt" },
        { en: "improve", pt: "melhorar", say: "im-PRÚV" },
        { en: "strength", pt: "ponto forte", say: "STRÉNGTH" },
        { en: "area for improvement", pt: "ponto a melhorar", say: "É-ria for im-PRÚV-ment" },
      ],
      examples: [
        { en: "You might want to add more data to support your point.", pt: "Talvez você queira acrescentar mais dados para sustentar seu ponto." },
        { en: "Have you considered sending the agenda in advance?", pt: "Já pensou em enviar a pauta com antecedência?" },
        { en: "Thanks, that's really helpful. Could you give me an example?", pt: "Obrigado, isso ajuda muito. Pode me dar um exemplo?" },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Feedback mais diplomático:", options: ["Your report is bad.", "The report might be a bit clearer with a summary at the top.", "Rewrite everything."], answer: 1 },
        { type: "fill_blank", skill: "vocabulary", sentence: "You might ___ to check the numbers again.", accepted: ["want"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Have you ___ asking the client directly?", translation: "Já pensou em...?", accepted: ["considered", "thought of", "thought about"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Recebendo feedback com maturidade:", options: ["That's not my fault.", "I hadn't thought of it that way. Thanks.", "Whatever."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Pode me dar um exemplo?", accepted: ["Could you give me an example?", "Can you give me an example?"] },
        { type: "word_order", skill: "grammar", prompt: "E se tentássemos uma abordagem diferente?", answer: "What if we tried a different approach?", distractors: ["try"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Overall it was great. One area for improvement is timing; you ran a bit over.", options: ["Foi ótimo; ponto a melhorar: o tempo, passou um pouco.", "Foi péssimo.", "O tempo foi perfeito."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "That's really helpful.", accepted: ["that's really helpful", "that is really helpful"] },
      ],
      conversation: {
        goal: "Dê feedback a um colega (o professor) sobre uma apresentação dele: um elogio concreto e uma sugestão diplomática.",
        starter: "So, how did you think my presentation went? Be honest!",
      },
      review: ["Suavizar: might want to / perhaps / slightly.", "Pergunta em vez de ordem: Have you considered...?", "Situação → comportamento → impacto → sugestão."],
    }),

    buildLesson("b2-m4-l4", M, 4, {
      title: "Networking",
      objective: "Apresentar-se profissionalmente e criar conexões.",
      explanation: [
        {
          title: "Elevator pitch",
          body: "Em 20 segundos: quem você é, o que faz e o que te interessa. **I'm Lucas. I work in international trade at ICC, mostly helping companies import from Asia. Lately I've been looking into sustainable packaging.**",
        },
        {
          title: "Perguntas que abrem conversa",
          body: "**What do you do? / What line of work are you in?** · **How did you get into that?** (Como você entrou nisso?) · **What are you working on at the moment?** · **What brought you to this event?**",
        },
        {
          title: "Encerrar e conectar",
          body: "**It was great to meet you. Shall we connect on LinkedIn?** · **Do you have a card?** · **I'll drop you an email.** · **Let me introduce you to...**",
        },
      ],
      vocabulary: [
        { en: "line of work", pt: "área de atuação", say: "LÁIN ov UÊRK" },
        { en: "get into", pt: "entrar (numa área)", say: "guét ÍN-tu" },
        { en: "drop an email", pt: "mandar um e-mail", say: "DRÓP an Í-mêil" },
        { en: "connect", pt: "conectar-se", say: "co-NÉKT" },
        { en: "introduce", pt: "apresentar (pessoas)", say: "in-tro-DÚS" },
        { en: "background", pt: "formação / experiência", say: "BÉK-gráund" },
        { en: "be into", pt: "curtir / se interessar por", say: "bi ÍN-tu" },
        { en: "follow up", pt: "dar seguimento", say: "FÓ-lou ÂP" },
        { en: "business card", pt: "cartão de visita", say: "BÍZ-nes CÁRD" },
      ],
      examples: [
        { en: "What line of work are you in?", pt: "Em que área você trabalha?" },
        { en: "How did you get into logistics?", pt: "Como você entrou na área de logística?" },
        { en: "Great to meet you. I'll drop you an email next week.", pt: "Prazer em conhecer. Te mando um e-mail semana que vem." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"How did you get into marketing?\"", options: ["Como você entrou na área de marketing?", "Como você chegou ao marketing (prédio)?", "Por que você saiu do marketing?"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Let me ___ you to my colleague, Sarah.", translation: "Deixa eu te apresentar à...", accepted: ["introduce"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "I'll ___ you an email tomorrow.", accepted: ["drop", "send", "shoot"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Boa pergunta de networking:", options: ["How much do you earn?", "What are you working on at the moment?", "Are you married?"], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Vamos nos conectar no LinkedIn?", accepted: ["Shall we connect on LinkedIn?", "Should we connect on LinkedIn?", "Let's connect on LinkedIn."] },
        { type: "word_order", skill: "grammar", prompt: "Ultimamente tenho pesquisado sobre energia solar.", answer: "Lately I've been looking into solar energy.", distractors: ["search"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "My background is in engineering, but I moved into sales about five years ago.", options: ["Formação em engenharia; foi para vendas há uns 5 anos.", "Sempre trabalhou com vendas.", "Vai estudar engenharia."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It was great to meet you.", accepted: ["it was great to meet you"] },
      ],
      conversation: {
        goal: "Num evento, apresente seu elevator pitch, faça perguntas ao professor e termine com um próximo passo concreto.",
        starter: "Hi there, I don't think we've met. I'm Chris. What brings you to the conference?",
      },
      review: ["Elevator pitch: quem, o quê, o que te interessa.", "What line of work... / How did you get into...?", "Encerrar com próximo passo: connect, drop an email, introduce."],
    }),

    buildLesson("b2-m4-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Inglês profissional",
      objective: "Comprovar que você negocia, reporta, dá feedback e faz networking.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Ahead of schedule\" significa:", options: ["Adiantado", "Atrasado", "Cancelado"], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "The meeting has been pushed ___ to Thursday.", accepted: ["back"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "I'll need to run it ___ my boss.", accepted: ["by", "past"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Feedback diplomático:", options: ["You talk too much.", "You might want to give others more time to speak."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Em que área você trabalha?", accepted: ["What line of work are you in?", "What field do you work in?", "What area do you work in?", "What do you do?"] },
        { type: "word_order", skill: "grammar", prompt: "Estaríamos dispostos a reduzir o preço.", answer: "We would be willing to reduce the price." },
        { type: "translate", skill: "writing", prompt: "O relatório já foi enviado.", accepted: ["The report has already been sent.", "The report has been sent already.", "The report was already sent."] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "If you can commit to a larger order, we could offer free shipping.", options: ["Frete grátis se o pedido for maior.", "Desconto de 50%.", "Sem negociação."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I'll keep you posted.", accepted: ["i'll keep you posted", "i will keep you posted"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["deal", "acordo"], ["blocker", "impedimento"], ["upfront", "adiantado"], ["stakeholder", "parte interessada"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
