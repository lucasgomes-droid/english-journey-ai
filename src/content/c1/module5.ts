import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "c1-m5";

export const c1Module5: Module = {
  id: M,
  level: "C1",
  order: 5,
  title: "Inglês corporativo",
  description: "Liderança, negociação avançada, gestão de crises e entrevistas sênior.",
  lessons: [
    buildLesson("c1-m5-l1", M, 1, {
      title: "Liderança",
      objective: "Conduzir reuniões e influenciar equipes com linguagem de liderança.",
      explanation: [
        {
          title: "Inclusão e direção",
          body: "**Let's hear from someone who hasn't spoken yet.** · **What would it take to...?** (O que seria necessário para...?) · **I'd like us to aim for...** · **Let's park that for now.** (deixar para depois) · **Can I get a quick show of hands?**",
        },
        {
          title: "Delegar e cobrar com clareza",
          body: "**I'd like you to take ownership of...** (assumir) · **Who's going to own this?** · **Let's touch base on Friday.** (alinhar) · **Where are we with...?** · **I need this by end of day.**",
        },
      ],
      vocabulary: [
        { en: "take ownership", pt: "assumir a responsabilidade", say: "têik ÔU-ner-ship" },
        { en: "park (an issue)", pt: "deixar para depois", say: "PÁRK" },
        { en: "touch base", pt: "alinhar rapidamente", say: "TÂTCH BÊIS" },
        { en: "show of hands", pt: "levantar a mão (votação)", say: "SHÔU ov RÉNDZ" },
        { en: "empower", pt: "dar autonomia", say: "em-PÁU-er" },
        { en: "buy-in", pt: "adesão / apoio", say: "BÁI-in" },
        { en: "align", pt: "alinhar", say: "a-LÁIN" },
        { en: "accountable", pt: "responsável (que presta contas)", say: "a-CÁUN-ta-bol" },
        { en: "end of day (EOD)", pt: "fim do dia", say: "ÉND ov DÊI" },
      ],
      examples: [
        { en: "Good point. Let's park that for now and come back to it later.", pt: "Bom ponto. Vamos deixar isso para depois e voltar mais tarde." },
        { en: "I'd like you to take ownership of the client relationship.", pt: "Gostaria que você assumisse a relação com o cliente." },
        { en: "What would it take to get the team's buy-in?", pt: "O que seria necessário para ter a adesão da equipe?" },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Let's park that.\"", options: ["Vamos deixar esse assunto para depois.", "Vamos estacionar.", "Vamos encerrar a reunião."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Let's touch ___ on Monday.", accepted: ["base"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Who's going to take ___ of this project?", accepted: ["ownership", "charge"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Para incluir quem está quieto na reunião:", options: ["Be quiet, please.", "Let's hear from someone who hasn't spoken yet.", "Next item."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "O que seria necessário para terminar até sexta?", accepted: ["What would it take to finish by Friday?", "What would it take to get it done by Friday?"] },
        { type: "word_order", skill: "grammar", prompt: "Precisamos da adesão da diretoria.", answer: "We need buy-in from the board.", distractors: ["buy"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Where are we with the budget? I need it by end of day.", options: ["Pergunta o status do orçamento e precisa até o fim do dia.", "O orçamento foi aprovado.", "O prazo é semana que vem."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Can I get a quick show of hands?", accepted: ["can i get a quick show of hands"] },
      ],
      conversation: {
        goal: "Conduza uma reunião de equipe: inclua todos, delegue tarefas com dono e prazo, e adie um tema que fugiu do foco.",
        starter: "OK team leader, the floor is yours. We have twenty minutes and three issues to cover.",
      },
      review: ["Incluir: Let's hear from... / show of hands.", "Delegar: take ownership, who's going to own this, by EOD.", "park, touch base, buy-in."],
    }),

    buildLesson("c1-m5-l2", M, 2, {
      title: "Negociação avançada",
      objective: "Negociar acordos complexos com concessões condicionais.",
      explanation: [
        {
          title: "Concessões amarradas",
          body: "Nunca dê algo sem pedir algo: **We could consider extending the deadline, provided that you increase the volume.** · **I'm prepared to move on price if you can be flexible on payment terms.**",
        },
        {
          title: "Testar e sondar",
          body: "**What if we were to...?** · **Hypothetically, if we agreed to X, would you be willing to Y?** · **What's driving that figure?** (o que justifica esse número?) · **Is that your final offer?**",
        },
        {
          title: "Impasse",
          body: "**We seem to have reached a stalemate.** (impasse) · **Let's take a step back and look at the bigger picture.** · **What's the sticking point?** (o ponto que trava)",
        },
      ],
      vocabulary: [
        { en: "concession", pt: "concessão", say: "con-SÉ-shan" },
        { en: "be prepared to", pt: "estar disposto a", say: "bi pri-PÉRD tu" },
        { en: "move on price", pt: "ceder no preço", say: "MÚUV on PRÁIS" },
        { en: "stalemate", pt: "impasse", say: "STÊIL-mêit" },
        { en: "sticking point", pt: "ponto de discórdia", say: "STÍ-king PÓINT" },
        { en: "leverage", pt: "poder de barganha", say: "LÉ-ve-ridj" },
        { en: "win-win", pt: "bom para os dois lados", say: "UÍN-uín" },
        { en: "walk away", pt: "desistir do negócio", say: "UÓK a-UÊI" },
        { en: "hypothetically", pt: "hipoteticamente", say: "rai-po-THÉ-ti-ca-li" },
      ],
      examples: [
        { en: "We're prepared to move on price if you commit to three years.", pt: "Estamos dispostos a ceder no preço se vocês se comprometerem por três anos." },
        { en: "What's the sticking point here?", pt: "Qual é o ponto que está travando aqui?" },
        { en: "Hypothetically, if we waived the fee, would you sign today?", pt: "Hipoteticamente, se dispensássemos a taxa, vocês assinariam hoje?" },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"We've reached a stalemate.\"", options: ["Chegamos a um impasse.", "Fechamos o acordo.", "Ficamos sem tempo."], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "We could lower the price, ___ that you pay upfront.", accepted: ["provided", "providing"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "We're prepared to ___ on price.", translation: "Estamos dispostos a ceder no preço.", accepted: ["move", "be flexible"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Boa tática de negociação:", options: ["Dar concessões sem pedir nada.", "Amarrar cada concessão a um pedido.", "Aceitar a primeira oferta."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Qual é o ponto que está travando?", accepted: ["What's the sticking point?", "What is the sticking point?"] },
        { type: "word_order", skill: "grammar", prompt: "E se fôssemos dividir os custos?", answer: "What if we were to split the costs?", distractors: ["will"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "If we can't agree on the warranty, we'll have to walk away.", options: ["Se não houver acordo sobre a garantia, vão desistir do negócio.", "A garantia está aprovada.", "Vão caminhar até o escritório."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Let's look at the bigger picture.", accepted: ["let's look at the bigger picture", "let us look at the bigger picture"] },
      ],
      conversation: {
        goal: "Negocie um contrato de dois anos com o professor: amarre concessões, sonde com hipóteses e saia de um impasse.",
        starter: "We'd love to work with you, but your price is 15% above our budget, and we need delivery in four weeks, not eight.",
      },
      review: ["Concessões amarradas: X, provided that Y.", "Sondar: What if we were to...? / Hypothetically...", "Impasse: stalemate, sticking point, bigger picture."],
    }),

    buildLesson("c1-m5-l3", M, 3, {
      title: "Gestão de crises",
      objective: "Comunicar más notícias com clareza, empatia e responsabilidade.",
      explanation: [
        {
          title: "A estrutura",
          body: "1) Reconheça o problema sem rodeios. 2) Assuma responsabilidade. 3) Explique o que está sendo feito. 4) Dê próximos passos e prazo. **We're aware of the issue and we take full responsibility. Our team is working to resolve it, and we'll update you by 6 pm.**",
        },
        {
          title: "Linguagem de mitigação",
          body: "Empatia: **We understand how frustrating this must be.** · Ação: **We have taken immediate steps to...** · Prevenção: **We are putting measures in place to ensure this doesn't happen again.** · Evite culpar terceiros e jargão.",
        },
      ],
      vocabulary: [
        { en: "take full responsibility", pt: "assumir total responsabilidade", say: "têik FÚL ris-pon-si-BÍ-li-ti" },
        { en: "immediate steps", pt: "medidas imediatas", say: "i-MÍ-di-at STÉPS" },
        { en: "outage", pt: "interrupção (serviço)", say: "ÁU-tidj" },
        { en: "breach", pt: "violação / vazamento", say: "BRÍITCH" },
        { en: "affected", pt: "afetado", say: "a-FÉK-tid" },
        { en: "mitigate", pt: "mitigar", say: "MÍ-ti-guêit" },
        { en: "transparent", pt: "transparente", say: "trens-PÉ-rent" },
        { en: "reassure", pt: "tranquilizar", say: "ri-a-SHÚR" },
        { en: "measures", pt: "medidas", say: "MÉ-jerz" },
      ],
      examples: [
        { en: "We understand how frustrating this must be for our customers.", pt: "Entendemos como isso deve ser frustrante para nossos clientes." },
        { en: "We have taken immediate steps to secure all accounts.", pt: "Tomamos medidas imediatas para proteger todas as contas." },
        { en: "We are putting measures in place to ensure this doesn't happen again.", pt: "Estamos implementando medidas para garantir que isso não se repita." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "writing", prompt: "Melhor primeira frase numa crise:", options: ["It wasn't our fault.", "We're aware of the issue and we take full responsibility.", "No comment."], answer: 1 },
        { type: "fill_blank", skill: "vocabulary", sentence: "We have taken immediate ___ to fix the problem.", accepted: ["steps", "action", "measures"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "We understand how frustrating this ___ be.", accepted: ["must"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"A data breach\" é:", options: ["Um vazamento de dados.", "Um backup de dados.", "Uma pausa para dados."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Vamos atualizar vocês até as 18h.", accepted: ["We will update you by 6 pm.", "We'll update you by 6 pm.", "We will update you by 6 p.m.", "We'll update you by 6 p.m.", "We will update you by six pm."] },
        { type: "word_order", skill: "grammar", prompt: "Nenhum cliente foi afetado.", answer: "No customers were affected.", distractors: ["affect"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "The outage was caused by a technical fault on our side, not a cyberattack.", options: ["A falha foi técnica, do lado da empresa, não um ataque.", "Foi um ataque hacker.", "Não houve interrupção."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "We take full responsibility.", accepted: ["we take full responsibility"] },
      ],
      conversation: {
        goal: "Você é o porta-voz: comunique uma crise (atraso grave, vazamento, recall) a clientes irritados. O professor fará perguntas difíceis.",
        starter: "I'm a journalist. Your company's app has been down for 12 hours. What do you have to say to your customers?",
      },
      review: ["Reconhecer → responsabilidade → ação → próximos passos com prazo.", "Empatia + ação + prevenção.", "Sem culpar terceiros, sem jargão."],
    }),

    buildLesson("c1-m5-l4", M, 4, {
      title: "Entrevistas avançadas",
      objective: "Convencer em entrevistas sênior com STAR e storytelling.",
      explanation: [
        {
          title: "Método STAR",
          body: "**Situation** (contexto) → **Task** (seu desafio) → **Action** (o que VOCÊ fez, com \"I\") → **Result** (resultado mensurável). Ex.: **Our biggest client threatened to leave (S). I had to keep the account (T). I set up weekly reviews and fixed three recurring issues (A). We renewed for three years and grew the account by 25% (R).**",
        },
        {
          title: "Perguntas sênior",
          body: "**Tell me about a time you failed.** (mostre aprendizado) · **How do you handle conflict in your team?** · **What's your leadership style?** · **Why are you leaving your current role?** (seja positivo: **I'm looking for a bigger challenge**)",
        },
      ],
      vocabulary: [
        { en: "track record", pt: "histórico comprovado", say: "TRÉK RÉ-cord" },
        { en: "spearhead", pt: "liderar (iniciativa)", say: "SPÍR-red" },
        { en: "streamline", pt: "otimizar / simplificar", say: "STRÍIM-láin" },
        { en: "exceed", pt: "superar", say: "ek-SÍID" },
        { en: "handle conflict", pt: "lidar com conflitos", say: "RÉN-dol CÓN-flikt" },
        { en: "leadership style", pt: "estilo de liderança", say: "LÍI-der-ship STÁIL" },
        { en: "lesson learned", pt: "lição aprendida", say: "LÉ-son LÂRND" },
        { en: "measurable", pt: "mensurável", say: "MÉ-je-ra-bol" },
        { en: "step up", pt: "assumir mais responsabilidade", say: "STÉP ÂP" },
      ],
      examples: [
        { en: "I spearheaded a project that streamlined our import process.", pt: "Liderei um projeto que otimizou nosso processo de importação." },
        { en: "We exceeded our sales target by 18%.", pt: "Superamos nossa meta de vendas em 18%." },
        { en: "The lesson I learned was to involve stakeholders early.", pt: "A lição que aprendi foi envolver as partes interessadas cedo." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Ordem do método STAR:", options: ["Situation, Task, Action, Result", "Start, Talk, Answer, Repeat", "Skill, Team, Action, Reason"], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Na parte Action, use:", options: ["\"We\" sempre.", "\"I\": o que você fez.", "\"They\"."], answer: 1 },
        { type: "fill_blank", skill: "vocabulary", sentence: "She has a proven track ___ in sales.", accepted: ["record"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "We ___ our target by 20%. (superamos)", accepted: ["exceeded", "beat", "surpassed"] },
        { type: "translate", skill: "writing", prompt: "Estou procurando um desafio maior.", accepted: ["I'm looking for a bigger challenge.", "I am looking for a bigger challenge.", "I'm looking for a greater challenge."] },
        { type: "word_order", skill: "grammar", prompt: "Eu liderei a reestruturação da equipe.", answer: "I spearheaded the restructuring of the team.", distractors: ["headed"] },
        { type: "listening", skill: "listening", prompt: "Ouça. Que parte do STAR é esta?", audio: "As a result, customer complaints dropped by forty percent in six months.", options: ["Result", "Situation", "Task"], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Tell me about a time you failed.", accepted: ["tell me about a time you failed"] },
      ],
      conversation: {
        goal: "Entrevista para um cargo de gestão: responda com STAR a três perguntas comportamentais. O professor dará feedback.",
        starter: "Thanks for coming in. Let's start with this: tell me about a time you had to lead a team through a difficult change.",
      },
      review: ["STAR: Situation, Task, Action (I), Result (número).", "track record, spearhead, streamline, exceed.", "Falhas: mostre a lição aprendida."],
    }),

    buildLesson("c1-m5-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Inglês corporativo",
      objective: "Comprovar comunicação corporativa de alto nível.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "vocabulary", sentence: "Who's going to take ___ of the budget?", accepted: ["ownership", "charge"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Sticking point\":", options: ["Ponto de discórdia", "Ponto de encontro", "Ponto final"], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "We'll extend the deadline, ___ that you add more staff.", accepted: ["provided", "providing"] },
        { type: "multiple_choice", skill: "writing", prompt: "Comunicação de crise adequada:", options: ["Mistakes happen. Move on.", "We take full responsibility and have taken immediate steps."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Vamos alinhar na sexta.", accepted: ["Let's touch base on Friday.", "Let's touch base Friday."] },
        { type: "word_order", skill: "grammar", prompt: "Superamos a meta em dez por cento.", answer: "We exceeded the target by ten percent." },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Walk away\" numa negociação:", options: ["Desistir do negócio", "Fazer uma pausa para caminhar", "Aceitar tudo"], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Good point, but let's park that and come back to it after lunch.", options: ["Deixar o assunto para depois do almoço.", "Encerrar a reunião.", "Discutir o tema agora."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "We seem to have reached a stalemate.", accepted: ["we seem to have reached a stalemate"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["buy-in", "adesão"], ["outage", "interrupção"], ["leverage", "poder de barganha"], ["streamline", "otimizar"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
