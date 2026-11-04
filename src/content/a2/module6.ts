import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "a2-m6";

export const a2Module6: Module = {
  id: M,
  level: "A2",
  order: 6,
  title: "Trabalho e estudos",
  description: "Descrever o trabalho, telefonar, escrever e-mails curtos e falar de quantidades.",
  lessons: [
    buildLesson("a2-m6-l1", M, 1, {
      title: "Meu trabalho",
      objective: "Descrever seu trabalho, rotina e projetos atuais.",
      explanation: [
        {
          title: "Simples × contínuo",
          body: "**Presente simples** para o que é sempre verdade ou rotina: **I work in sales. I usually answer emails in the morning.** **Presente contínuo** para o que está acontecendo nesta fase: **I'm working on a new project this month.**",
        },
        {
          title: "Falando da profissão",
          body: "**What do you do?** = O que você faz (profissão)? Resposta: **I'm an engineer.** / **I work as a designer.** / **I work for a bank.** (para uma empresa) / **I work in marketing.** (numa área)",
        },
        {
          title: "Verbos que não vão para -ing",
          body: "Verbos de estado ficam no simples mesmo agora: **I need**, **I know**, **I like**, **I want**: ~~I'm needing~~ → **I need help now.**",
        },
      ],
      vocabulary: [
        { en: "What do you do?", pt: "O que você faz? (profissão)", say: "UÓT du iu DÚ" },
        { en: "work for", pt: "trabalhar para (empresa)", say: "UÊRK for" },
        { en: "work in", pt: "trabalhar na área de", say: "UÊRK in" },
        { en: "colleague", pt: "colega de trabalho", say: "CÓ-liig" },
        { en: "boss", pt: "chefe", say: "BÓS" },
        { en: "customer", pt: "cliente", say: "CÂS-to-mer" },
        { en: "deadline", pt: "prazo", say: "DÉD-láin" },
        { en: "be in charge of", pt: "ser responsável por", say: "bi in TCHÁRDJ ov" },
        { en: "project", pt: "projeto", say: "PRÓ-djekt" },
        { en: "salary", pt: "salário", say: "SÉ-la-ri" },
      ],
      examples: [
        { en: "I work for a logistics company. I'm in charge of imports.", pt: "Trabalho numa empresa de logística. Sou responsável pelas importações." },
        { en: "This month I'm working on a big project.", pt: "Este mês estou trabalhando num projeto grande." },
        { en: "We have a tight deadline.", pt: "Temos um prazo apertado." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"Este mês estou trabalhando de casa.\"", options: ["This month I work from home.", "This month I'm working from home.", "This month I'm work from home."], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["I'm needing a new laptop.", "I need a new laptop."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "She works ___ Google.", translation: "Ela trabalha para o Google.", accepted: ["for", "at"] },
        { type: "translate", skill: "writing", prompt: "O que você faz?", accepted: ["What do you do?", "What do you do for a living?"] },
        { type: "translate", skill: "writing", prompt: "Sou responsável pelo atendimento ao cliente.", accepted: ["I'm in charge of customer service.", "I am in charge of customer service.", "I'm responsible for customer service.", "I am responsible for customer service."] },
        { type: "word_order", skill: "grammar", prompt: "Meus colegas são muito prestativos.", answer: "My colleagues are very helpful.", distractors: ["is"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I work in marketing, but right now I'm helping the sales team.", options: ["Trabalha em vendas e ajuda o marketing.", "Trabalha em marketing e no momento ajuda vendas.", "Está desempregado."], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "We have a tight deadline.", accepted: ["we have a tight deadline"] },
      ],
      conversation: {
        goal: "Conte o que você faz, do que é responsável e em que projeto está trabalhando agora.",
        starter: "So, what do you do? What are you working on these days?",
      },
      review: ["Simples: rotina e fatos; contínuo: o que está acontecendo nesta fase.", "work for (empresa) / work in (área) / work as (cargo).", "need, know, like, want: sem -ing."],
    }),

    buildLesson("a2-m6-l2", M, 2, {
      title: "Ao telefone",
      objective: "Fazer e atender uma ligação simples.",
      explanation: [
        {
          title: "Fazendo a ligação",
          body: "**Hi, this is Lucas from ICC.** (Ao telefone: **this is**, não ~~I am~~.) **Can I speak to Ms. Brown, please?** **I'm calling about the order.** (Estou ligando sobre o pedido.)",
        },
        {
          title: "Atendendo",
          body: "**Who's calling, please?** · **Hold on a second.** (Um momento.) · **I'm afraid she's not available.** (Infelizmente ela não está disponível.) · **Can I take a message?** · **I'll call back later.**",
        },
        {
          title: "Quando você não entende",
          body: "**Sorry, could you speak more slowly?** · **Could you spell that, please?** · **The line is bad.** (A ligação está ruim.) Soletrar é essencial: treine seu nome e e-mail em inglês.",
        },
      ],
      vocabulary: [
        { en: "This is...", pt: "Aqui é... (ao telefone)", say: "DHÍS iz" },
        { en: "Hold on", pt: "Aguarde", say: "RÔULD ÓN" },
        { en: "available", pt: "disponível", say: "a-VÊI-la-bol" },
        { en: "take a message", pt: "anotar um recado", say: "TÊIK a MÉ-sidj" },
        { en: "call back", pt: "ligar de volta", say: "CÓL BÉK" },
        { en: "spell", pt: "soletrar", say: "SPÉL" },
        { en: "I'm calling about...", pt: "Estou ligando sobre...", say: "áim CÓ-ling a-BÁUT" },
        { en: "I'm afraid...", pt: "Infelizmente...", say: "áim a-FRÊID" },
        { en: "hang up", pt: "desligar", say: "RÉNG ÂP" },
      ],
      examples: [
        { en: "Hi, this is Ana from Delta Logistics. Can I speak to Mr. Hill?", pt: "Oi, aqui é a Ana, da Delta Logistics. Posso falar com o Sr. Hill?" },
        { en: "I'm afraid he's in a meeting. Can I take a message?", pt: "Infelizmente ele está em reunião. Posso anotar um recado?" },
        { en: "Could you spell your last name, please?", pt: "Você pode soletrar seu sobrenome, por favor?" },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Ao telefone, você se identifica:", options: ["I am Paula.", "This is Paula.", "Here is Paula."], answer: 1 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Can I ___ a message?", translation: "Posso anotar um recado?", accepted: ["take"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "I'll call ___ in ten minutes.", translation: "Ligo de volta em dez minutos.", accepted: ["back"] },
        { type: "translate", skill: "writing", prompt: "Posso falar com a Sra. Lee, por favor?", accepted: ["Can I speak to Ms. Lee, please?", "Could I speak to Ms. Lee, please?", "Can I speak to Mrs. Lee, please?", "May I speak to Ms. Lee, please?", "Can I speak with Ms. Lee, please?"] },
        { type: "translate", skill: "writing", prompt: "Estou ligando sobre a reunião.", accepted: ["I'm calling about the meeting.", "I am calling about the meeting."] },
        { type: "word_order", skill: "grammar", prompt: "Infelizmente ela não está disponível.", answer: "I'm afraid she's not available.", distractors: ["scared"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Hold on a second, I'll put you through.", options: ["Aguarde, vou transferir sua ligação.", "Desculpe, ele já saiu.", "Pode ligar mais tarde?"], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Who's calling, please?", accepted: ["who's calling please", "who is calling please"] },
      ],
      conversation: {
        goal: "Ligue para uma empresa, peça para falar com alguém, deixe um recado e soletre seu nome.",
        starter: "Good morning, Bright Solutions. How can I help you?",
      },
      review: ["This is... from...", "Can I speak to...? / I'm calling about...", "Hold on / take a message / call back / spell."],
    }),

    buildLesson("a2-m6-l3", M, 3, {
      title: "E-mails curtos",
      objective: "Escrever um e-mail curto, formal ou informal.",
      explanation: [
        {
          title: "Estrutura",
          body: "Abertura → motivo → pedido → despedida. Formal: **Dear Mr. Smith,** / **I'm writing to ask about...** / **Could you please...?** / **I look forward to hearing from you.** / **Best regards,** Informal: **Hi Tom,** / **Just a quick note to...** / **Thanks!** / **Cheers,**",
        },
        {
          title: "Frases úteis",
          body: "**Please find attached the report.** (Segue em anexo o relatório.) · **Let me know if you have any questions.** · **Sorry for the late reply.** · **As discussed,...** (Conforme conversamos,...)",
        },
        {
          title: "Falso amigo",
          body: "**attend** = comparecer (attend a meeting), não \"atender\". Atender o telefone = **answer the phone**.",
        },
      ],
      vocabulary: [
        { en: "Dear", pt: "Prezado(a)", say: "DÍR" },
        { en: "I'm writing to...", pt: "Escrevo para...", say: "áim RÁI-ting tu" },
        { en: "attached", pt: "em anexo", say: "a-TÉTCHT" },
        { en: "reply", pt: "resposta / responder", say: "ri-PLÁI" },
        { en: "look forward to", pt: "aguardar com expectativa", say: "lúk FÓR-uord tu" },
        { en: "Best regards", pt: "Atenciosamente", say: "BÉST ri-GÁRDZ" },
        { en: "Let me know", pt: "Me avise", say: "LÉT mi NÔU" },
        { en: "attend", pt: "comparecer", say: "a-TÉND" },
        { en: "as discussed", pt: "conforme conversado", say: "éz dis-KÂST" },
      ],
      examples: [
        { en: "Dear Ms. Taylor, I'm writing to confirm our meeting on Friday.", pt: "Prezada Sra. Taylor, escrevo para confirmar nossa reunião na sexta." },
        { en: "Please find attached the invoice.", pt: "Segue em anexo a fatura." },
        { en: "Let me know if you have any questions. Best regards, Lucas", pt: "Me avise se tiver dúvidas. Atenciosamente, Lucas" },
      ],
      exercises: [
        { type: "multiple_choice", skill: "writing", prompt: "Melhor abertura para um e-mail formal a um cliente:", options: ["Hey dude,", "Dear Mr. Clark,", "Yo Clark!"], answer: 1 },
        { type: "fill_blank", skill: "writing", sentence: "Please find ___ the contract.", translation: "Segue em anexo o contrato.", accepted: ["attached"] },
        { type: "fill_blank", skill: "writing", sentence: "I look forward to ___ from you.", accepted: ["hearing"] },
        { type: "translate", skill: "writing", prompt: "Desculpe pela demora na resposta.", accepted: ["Sorry for the late reply.", "Sorry for the delay in replying.", "I'm sorry for the late reply.", "Sorry for my late reply."] },
        { type: "translate", skill: "writing", prompt: "Me avise se você tiver alguma dúvida.", accepted: ["Let me know if you have any questions.", "Please let me know if you have any questions.", "Let me know if you have any doubts."] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"I can't attend the meeting\" significa:", options: ["Não posso atender a reunião.", "Não posso comparecer à reunião.", "Não entendi a reunião."], answer: 1 },
        { type: "word_order", skill: "writing", prompt: "Escrevo para perguntar sobre o pedido.", answer: "I'm writing to ask about the order.", distractors: ["for"] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Best regards.", accepted: ["best regards"] },
      ],
      conversation: {
        goal: "Dite ao professor um e-mail curto pedindo uma reunião; ele vai corrigir o tom e a estrutura.",
        starter: "Let's write an email together. Who are you writing to, and why?",
      },
      review: ["Dear... / I'm writing to... / Best regards.", "Please find attached... / Let me know if...", "attend = comparecer."],
    }),

    buildLesson("a2-m6-l4", M, 4, {
      title: "Quantidades",
      objective: "Falar de quantidades com much, many, a lot of, a few e a little.",
      explanation: [
        {
          title: "Contável × incontável",
          body: "**Contáveis** (dá para contar: books, people, ideas) usam **many / a few**. **Incontáveis** (money, time, water, information, advice) usam **much / a little**. **a lot of** serve para os dois: **a lot of people, a lot of money**.",
          table: {
            head: ["", "Contável", "Incontável"],
            rows: [
              ["muito(s)", "many / a lot of", "much / a lot of"],
              ["pouco(s)", "a few", "a little"],
              ["quanto(s)?", "How many?", "How much?"],
            ],
          },
        },
        {
          title: "Na prática",
          body: "**much** e **many** são mais comuns em perguntas e negativas: **I don't have much time.** Na afirmativa, prefira **a lot of**: **We have a lot of work.** Atenção: **information**, **advice** e **news** são incontáveis: ~~informations~~.",
        },
      ],
      vocabulary: [
        { en: "How much...?", pt: "Quanto(a)...?", say: "RÁU MÂTCH" },
        { en: "How many...?", pt: "Quantos(as)...?", say: "RÁU MÉ-ni" },
        { en: "a lot of", pt: "muito(s)", say: "a LÓT ov" },
        { en: "a few", pt: "alguns / poucos", say: "a FIÚ" },
        { en: "a little", pt: "um pouco", say: "a LÍ-tol" },
        { en: "budget", pt: "orçamento", say: "BÂ-djet" },
        { en: "information", pt: "informação", say: "in-for-MÊI-shan" },
        { en: "enough", pt: "suficiente", say: "i-NÂF" },
        { en: "too much", pt: "demais", say: "TÚ MÂTCH" },
      ],
      examples: [
        { en: "How much time do we have?", pt: "Quanto tempo nós temos?" },
        { en: "We only have a few days and a little money.", pt: "Só temos alguns dias e um pouco de dinheiro." },
        { en: "There isn't enough budget for that.", pt: "Não há orçamento suficiente para isso." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "How ___ people are coming?", options: ["much", "many"], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "How ___ does it cost?", options: ["much", "many"], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "I need a ___ minutes to finish. (alguns)", accepted: ["few"] },
        { type: "fill_blank", skill: "grammar", sentence: "Can I have a ___ milk in my coffee? (um pouco)", accepted: ["little"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["She gave me some good advices.", "She gave me some good advice.", "She gave me a good advices."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Nós não temos muito tempo.", accepted: ["We don't have much time.", "We do not have much time.", "We don't have a lot of time."] },
        { type: "word_order", skill: "grammar", prompt: "Há muitas pessoas na reunião.", answer: "There are a lot of people in the meeting.", distractors: ["much"] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "How many tickets do you need?", accepted: ["how many tickets do you need"] },
      ],
      conversation: {
        goal: "Planeje um evento com o professor: quantas pessoas, quanto dinheiro, quanta comida.",
        starter: "We're organizing the team party. How many people are coming, and how much money do we have?",
      },
      review: ["many/a few: contáveis; much/a little: incontáveis.", "a lot of: os dois.", "information, advice, news: incontáveis."],
    }),

    buildLesson("a2-m6-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Trabalho e estudos",
      objective: "Comprovar que você fala do trabalho, telefona, escreve e-mails e usa quantidades.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"Ela trabalha na área de finanças.\"", options: ["She works in finance.", "She is working on finance.", "She works for finance."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Aqui é o Pedro, da Alfa.", accepted: ["This is Pedro from Alfa.", "Hi, this is Pedro from Alfa.", "This is Pedro, from Alfa."] },
        { type: "fill_blank", skill: "grammar", sentence: "How ___ emails did you get today?", accepted: ["many"] },
        { type: "fill_blank", skill: "writing", sentence: "I'm writing ___ confirm the order.", accepted: ["to"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["I'm knowing the answer.", "I know the answer."], answer: 1 },
        { type: "word_order", skill: "grammar", prompt: "Posso anotar um recado?", answer: "Can I take a message?" },
        { type: "translate", skill: "writing", prompt: "Nós temos um prazo apertado.", accepted: ["We have a tight deadline.", "We've got a tight deadline."] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I'm afraid Mr. Hill is in a meeting. Can I take a message?", options: ["O Sr. Hill está em reunião; posso anotar um recado?", "O Sr. Hill vai ligar agora.", "O Sr. Hill não trabalha mais aqui."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Please find attached the report.", accepted: ["please find attached the report"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["deadline", "prazo"], ["colleague", "colega"], ["budget", "orçamento"], ["attend", "comparecer"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
