import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "b1-m4";

export const b1Module4: Module = {
  id: M,
  level: "B1",
  order: 4,
  title: "Trabalho",
  description: "Entrevistas, reuniões, e-mails profissionais e apresentações curtas.",
  lessons: [
    buildLesson("b1-m4-l1", M, 1, {
      title: "Entrevista de emprego",
      objective: "Responder às perguntas clássicas de entrevista.",
      explanation: [
        {
          title: "Present perfect contínuo",
          body: "Para falar de algo que começou no passado e continua, com foco na duração: **I've been working in logistics for six years.** **I've been studying English since 2024.** Forma: **have/has been + -ing**.",
        },
        {
          title: "As perguntas que sempre aparecem",
          body: "**Tell me about yourself.** · **Why do you want to work here?** · **What are your strengths and weaknesses?** · **Where do you see yourself in five years?** · **Why should we hire you?**",
        },
        {
          title: "Estrutura de resposta",
          body: "Situação → o que você fez → resultado: **In my last job, our deliveries were often late. I reorganized the schedule, and we cut delays by 30%.** Números convencem.",
        },
      ],
      vocabulary: [
        { en: "strength", pt: "ponto forte", say: "STRÉNGTH" },
        { en: "weakness", pt: "ponto fraco", say: "UÍIK-nes" },
        { en: "hire", pt: "contratar", say: "RÁI-er" },
        { en: "skill", pt: "habilidade", say: "SKÍL" },
        { en: "experience", pt: "experiência", say: "ex-PÍ-ri-ens" },
        { en: "achievement", pt: "conquista", say: "a-TCHÍIV-ment" },
        { en: "team player", pt: "pessoa que trabalha bem em equipe", say: "TÍIM PLÊI-er" },
        { en: "apply for", pt: "candidatar-se a", say: "a-PLÁI for" },
        { en: "position", pt: "vaga / cargo", say: "po-ZÍ-shan" },
        { en: "salary expectations", pt: "pretensão salarial", say: "SÉ-la-ri ex-pek-TÊI-shanz" },
      ],
      examples: [
        { en: "I've been working in customer service for five years.", pt: "Trabalho com atendimento ao cliente há cinco anos." },
        { en: "One of my strengths is that I stay calm under pressure.", pt: "Um dos meus pontos fortes é manter a calma sob pressão." },
        { en: "I'm applying for this position because I want new challenges.", pt: "Estou me candidatando a esta vaga porque quero novos desafios." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "I've been ___ (work) here since 2020.", accepted: ["working"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Estudo inglês há três anos (e continuo).\"", options: ["I study English for three years.", "I've been studying English for three years.", "I'm studying English since three years."], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"What are your weaknesses?\" pergunta sobre:", options: ["Seus pontos fortes.", "Seus pontos fracos.", "Seu salário."], answer: 1 },
        { type: "fill_blank", skill: "vocabulary", sentence: "I'd like to apply ___ the marketing position.", accepted: ["for"] },
        { type: "translate", skill: "writing", prompt: "Por que deveríamos contratar você?", accepted: ["Why should we hire you?"] },
        { type: "word_order", skill: "grammar", prompt: "Eu gerencio uma equipe de dez pessoas há dois anos.", answer: "I have been managing a team of ten people for two years.", distractors: ["since"] },
        { type: "listening", skill: "listening", prompt: "Ouça. O que o candidato conquistou?", audio: "In my last job, I reduced costs by twenty percent in one year.", options: ["Reduziu custos em 20% em um ano.", "Aumentou as vendas em 20%.", "Contratou 20 pessoas."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Tell me about yourself.", accepted: ["tell me about yourself"] },
      ],
      conversation: {
        goal: "Simule uma entrevista de emprego na sua área: o professor faz as perguntas clássicas e dá feedback no final.",
        starter: "Good morning, thanks for coming in. So, tell me a little about yourself.",
      },
      review: ["have/has been + -ing: começou e continua (duração).", "Perguntas clássicas de entrevista.", "Situação → ação → resultado, com números."],
    }),

    buildLesson("b1-m4-l2", M, 2, {
      title: "Reuniões",
      objective: "Participar de reuniões: abrir, opinar, interromper e encerrar.",
      explanation: [
        {
          title: "Conduzindo",
          body: "**Let's get started.** · **The purpose of this meeting is to...** · **Let's move on to the next point.** · **To sum up,...** · **Let's wrap up.** (Vamos encerrar.)",
        },
        {
          title: "Participando",
          body: "Interromper com educação: **Sorry to interrupt, but...** · **Can I just add something?** Pedir esclarecimento: **Could you clarify what you mean by...?** Voltar ao assunto: **Going back to what Ana said,...**",
        },
        {
          title: "Combinando ações",
          body: "**Who's going to take care of that?** · **I'll look into it.** (Vou verificar.) · **Let's follow up next week.** · **What's the deadline?**",
        },
      ],
      vocabulary: [
        { en: "agenda", pt: "pauta", say: "a-DJÉN-da" },
        { en: "move on", pt: "passar para o próximo", say: "MÚUV ÓN" },
        { en: "wrap up", pt: "encerrar", say: "RÉP ÂP" },
        { en: "clarify", pt: "esclarecer", say: "CLÉ-ri-fái" },
        { en: "look into", pt: "verificar / investigar", say: "LÚK in-tu" },
        { en: "follow up", pt: "dar seguimento", say: "FÓ-lou ÂP" },
        { en: "action point", pt: "item de ação / tarefa", say: "ÉK-shan póint" },
        { en: "to sum up", pt: "resumindo", say: "tu SÂM ÂP" },
        { en: "on track", pt: "dentro do previsto", say: "on TRÉK" },
      ],
      examples: [
        { en: "Let's move on to the next item on the agenda.", pt: "Vamos passar ao próximo item da pauta." },
        { en: "Sorry to interrupt, but I think we're missing something.", pt: "Desculpe interromper, mas acho que está faltando algo." },
        { en: "I'll look into it and get back to you by Friday.", pt: "Vou verificar e te retorno até sexta." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Para encerrar a reunião:", options: ["Let's get started.", "Let's wrap up.", "Let's move on."], answer: 1 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Could you ___ what you mean by \"soon\"?", translation: "Você poderia esclarecer...?", accepted: ["clarify", "explain"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "I'll look ___ it and send you an update.", accepted: ["into"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"The project is on track.\"", options: ["O projeto está atrasado.", "O projeto está dentro do previsto.", "O projeto foi cancelado."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Desculpe interromper, mas posso acrescentar algo?", accepted: ["Sorry to interrupt, but can I add something?", "Sorry to interrupt, but can I just add something?", "Sorry to interrupt, but could I add something?"] },
        { type: "word_order", skill: "grammar", prompt: "Vamos dar seguimento na semana que vem.", answer: "Let's follow up next week.", distractors: ["in"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "To sum up, we need to cut costs and hire two more people.", options: ["Resumindo: cortar custos e contratar mais duas pessoas.", "Resumindo: aumentar preços.", "A reunião foi adiada."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Let's get started.", accepted: ["let's get started", "let us get started"] },
      ],
      conversation: {
        goal: "Conduza uma reunião curta com o professor: abra, discuta dois pontos, defina tarefas e encerre.",
        starter: "Hi everyone. Shall we start? What's on the agenda today?",
      },
      review: ["Abrir/encerrar: Let's get started / Let's wrap up.", "Interromper: Sorry to interrupt, but...", "Ações: I'll look into it / follow up / deadline."],
    }),

    buildLesson("b1-m4-l3", M, 3, {
      title: "E-mails profissionais",
      objective: "Escrever e-mails formais claros e educados.",
      explanation: [
        {
          title: "Registro formal",
          body: "Formal: **I would like to request...**, **Could you please confirm...?**, **I apologize for the inconvenience.** Informal: **I want...**, **Can you...?**, **Sorry!** No trabalho, comece no formal e acompanhe o tom de quem te responde.",
        },
        {
          title: "Frases-padrão úteis",
          body: "**I'm writing in regard to...** (Escrevo a respeito de...) · **Further to our conversation,...** (Dando sequência à nossa conversa) · **Please do not hesitate to contact me.** · **I look forward to your reply.** · **Kind regards,**",
        },
        {
          title: "Estrutura curta",
          body: "1) Motivo em uma frase. 2) Detalhes. 3) O que você precisa e até quando. 4) Fechamento. Assunto claro: **Request: invoice correction – Order 4521**.",
        },
      ],
      vocabulary: [
        { en: "in regard to", pt: "a respeito de", say: "in ri-GÁRD tu" },
        { en: "further to", pt: "dando sequência a", say: "FÂR-dher tu" },
        { en: "request", pt: "solicitar / solicitação", say: "ri-KUÉST" },
        { en: "inconvenience", pt: "transtorno", say: "in-con-VÍ-ni-ens" },
        { en: "confirm", pt: "confirmar", say: "con-FÂRM" },
        { en: "hesitate", pt: "hesitar", say: "RÉ-zi-têit" },
        { en: "Kind regards", pt: "Atenciosamente", say: "KÁIND ri-GÁRDZ" },
        { en: "invoice", pt: "fatura / nota fiscal", say: "ÍN-vóis" },
        { en: "subject line", pt: "assunto (do e-mail)", say: "SÂB-djekt láin" },
      ],
      examples: [
        { en: "I'm writing in regard to the invoice you sent last week.", pt: "Escrevo a respeito da fatura que você enviou na semana passada." },
        { en: "Could you please confirm the delivery date?", pt: "Você poderia, por favor, confirmar a data de entrega?" },
        { en: "We apologize for any inconvenience this may cause.", pt: "Pedimos desculpas por qualquer transtorno que isso possa causar." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "writing", prompt: "Qual é a versão mais formal?", options: ["I want the report now.", "Send me the report.", "Could you please send me the report by Friday?"], answer: 2 },
        { type: "fill_blank", skill: "writing", sentence: "Please do not ___ to contact me if you have any questions.", accepted: ["hesitate"] },
        { type: "fill_blank", skill: "writing", sentence: "I'm writing in ___ to your job advertisement.", accepted: ["regard", "reference", "response"] },
        { type: "multiple_choice", skill: "writing", prompt: "Melhor assunto de e-mail:", options: ["Hello", "Problem!!!", "Request: correction of invoice 4521"], answer: 2 },
        { type: "translate", skill: "writing", prompt: "Pedimos desculpas pelo transtorno.", accepted: ["We apologize for the inconvenience.", "We apologize for the inconvenience.", "Sorry for the inconvenience.", "We are sorry for the inconvenience."] },
        { type: "word_order", skill: "writing", prompt: "Aguardo sua resposta.", answer: "I look forward to your reply.", distractors: ["wait"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha o tom.", audio: "Further to our phone call, I'm attaching the updated contract.", options: ["Formal: dando sequência à ligação, envia o contrato atualizado.", "Informal: está reclamando do contrato.", "Está cancelando o contrato."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Kind regards.", accepted: ["kind regards"] },
      ],
      conversation: {
        goal: "Escreva com o professor um e-mail formal a um fornecedor reclamando de um atraso e pedindo uma nova data.",
        starter: "Let's write a formal email. Your supplier is two weeks late with an order. How would you start?",
      },
      review: ["Formal: I would like to... / Could you please...?", "in regard to / further to / do not hesitate / look forward to.", "Motivo → detalhes → pedido com prazo → fechamento."],
    }),

    buildLesson("b1-m4-l4", M, 4, {
      title: "Apresentações curtas",
      objective: "Apresentar um tema com começo, meio e fim claros.",
      explanation: [
        {
          title: "Sinalização",
          body: "Diga ao público onde você está: **Today I'm going to talk about...** · **Firstly / Secondly / Finally,...** · **Let's take a look at this chart.** · **Moving on to...** · **To sum up / In conclusion,...** · **Thank you. Are there any questions?**",
        },
        {
          title: "Descrevendo números",
          body: "**Sales went up / rose by 15%.** · **Costs went down / fell slightly.** · **The number remained stable.** · **It peaked in March.** (atingiu o pico).",
        },
        {
          title: "Perguntas difíceis",
          body: "**That's a good question.** · **I'm not sure, but I'll find out and get back to you.** Não inventar é sinal de profissionalismo.",
        },
      ],
      vocabulary: [
        { en: "firstly", pt: "primeiramente", say: "FÂRST-li" },
        { en: "chart", pt: "gráfico", say: "TCHÁRT" },
        { en: "rise (rose)", pt: "subir", say: "RÁIZ / RÔUZ" },
        { en: "fall (fell)", pt: "cair", say: "FÓL / FÉL" },
        { en: "slightly", pt: "levemente", say: "SLÁIT-li" },
        { en: "significantly", pt: "significativamente", say: "sig-NÍ-fi-kant-li" },
        { en: "peak", pt: "pico / atingir o pico", say: "PÍIK" },
        { en: "in conclusion", pt: "em conclusão", say: "in con-CLÚ-jan" },
        { en: "get back to you", pt: "te dar um retorno", say: "guét BÉK tu iu" },
      ],
      examples: [
        { en: "Today I'm going to talk about our results for the year.", pt: "Hoje vou falar sobre nossos resultados do ano." },
        { en: "As you can see, sales rose significantly in the second half.", pt: "Como vocês podem ver, as vendas subiram bastante no segundo semestre." },
        { en: "That's a good question. I'll check and get back to you.", pt: "Boa pergunta. Vou verificar e te retorno." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Costs fell slightly.\"", options: ["Os custos caíram levemente.", "Os custos subiram muito.", "Os custos ficaram estáveis."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Sales went ___ by 10% last quarter. (subiram)", accepted: ["up"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Let's take a look ___ this chart.", accepted: ["at"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Para encerrar a apresentação:", options: ["Firstly,...", "Moving on to...", "To sum up,..."], answer: 2 },
        { type: "translate", skill: "writing", prompt: "Hoje vou falar sobre o novo projeto.", accepted: ["Today I'm going to talk about the new project.", "Today I am going to talk about the new project.", "Today I'll talk about the new project."] },
        { type: "word_order", skill: "grammar", prompt: "O número de clientes atingiu o pico em julho.", answer: "The number of customers peaked in July.", distractors: ["on"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Moving on to costs, they remained stable throughout the year.", options: ["Os custos ficaram estáveis o ano todo.", "Os custos caíram no fim do ano.", "Os custos dobraram."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Are there any questions?", accepted: ["are there any questions"] },
      ],
      conversation: {
        goal: "Faça uma apresentação de 1 a 2 minutos sobre o seu trabalho ou um projeto, usando sinalização. O professor faz uma pergunta no final.",
        starter: "The floor is yours! What are you going to present today?",
      },
      review: ["Sinalize: Today I'm going to... / Firstly / Moving on / To sum up.", "Números: rise, fall, remain stable, peak.", "Pergunta difícil: I'll get back to you."],
    }),

    buildLesson("b1-m4-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Trabalho",
      objective: "Comprovar que você se comunica em entrevistas, reuniões, e-mails e apresentações.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "She's been ___ (teach) for twenty years.", accepted: ["teaching"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Let's move on.\"", options: ["Vamos nos mudar.", "Vamos para o próximo ponto.", "Vamos encerrar."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Vou verificar e te retorno.", accepted: ["I'll look into it and get back to you.", "I'll check and get back to you.", "I will look into it and get back to you.", "I'll check it and get back to you."] },
        { type: "fill_blank", skill: "writing", sentence: "I look forward ___ hearing from you.", accepted: ["to"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Profits rose significantly.\"", options: ["Os lucros subiram bastante.", "Os lucros caíram um pouco.", "Os lucros ficaram iguais."], answer: 0 },
        { type: "word_order", skill: "grammar", prompt: "Um dos meus pontos fortes é a comunicação.", answer: "One of my strengths is communication." },
        { type: "translate", skill: "writing", prompt: "Você poderia, por favor, confirmar o horário?", accepted: ["Could you please confirm the time?", "Could you confirm the time, please?", "Can you please confirm the time?"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Sorry to interrupt, but could you clarify the deadline?", options: ["Pede para esclarecer o prazo.", "Pede para encerrar a reunião.", "Pede um aumento."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Why do you want to work here?", accepted: ["why do you want to work here"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["hire", "contratar"], ["agenda", "pauta"], ["invoice", "fatura"], ["chart", "gráfico"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
