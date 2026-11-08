import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "c1-m1";

export const c1Module1: Module = {
  id: M,
  level: "C1",
  order: 1,
  title: "Precisão gramatical",
  description: "Inversões condicionais, subjuntivo, modais no passado e elipse.",
  lessons: [
    buildLesson("c1-m1-l1", M, 1, {
      title: "Inversão avançada",
      objective: "Usar inversões condicionais e de ênfase em registro formal.",
      explanation: [
        {
          title: "Condicionais sem if",
          body: "Em registro formal, o **if** some e o auxiliar vai para o início: **Had I known**, I would have called. (= If I had known) · **Should you need** any help, contact us. (= If you need) · **Were we to** lose the contract, we'd have to cut jobs. (= If we lost)",
          table: {
            head: ["Com if", "Com inversão"],
            rows: [
              ["If I had known...", "Had I known..."],
              ["If you should need...", "Should you need..."],
              ["If they were to refuse...", "Were they to refuse..."],
            ],
          },
        },
        {
          title: "Outras inversões de ênfase",
          body: "**Only then did I realize...** · **Not until the results came out did we celebrate.** · **So severe was the storm that flights were canceled.** · **Such was the demand that the site crashed.**",
        },
      ],
      vocabulary: [
        { en: "had I known", pt: "se eu soubesse (tivesse sabido)", say: "RÉD ái NÔUN" },
        { en: "should you need", pt: "caso você precise", say: "SHÚD iu NÍID" },
        { en: "were we to", pt: "se viéssemos a", say: "UÉR uí tu" },
        { en: "only then", pt: "só então", say: "ÔUN-li DHÉN" },
        { en: "so severe was", pt: "tão grave foi", say: "SÔU se-VÍR uóz" },
        { en: "such was", pt: "tal foi", say: "SÂTCH uóz" },
        { en: "query", pt: "dúvida / consulta", say: "KUÍ-ri" },
        { en: "unforeseen", pt: "imprevisto", say: "ân-for-SÍIN" },
      ],
      examples: [
        { en: "Should you have any further queries, please do not hesitate to contact us.", pt: "Caso tenha outras dúvidas, não hesite em nos contatar." },
        { en: "Had we invested earlier, we would be market leaders now.", pt: "Se tivéssemos investido antes, seríamos líderes de mercado agora." },
        { en: "Such was the demand that tickets sold out in minutes.", pt: "Tal foi a procura que os ingressos esgotaram em minutos." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "___ I known about the problem, I would have acted sooner.", accepted: ["Had"] },
        { type: "fill_blank", skill: "grammar", sentence: "___ you require assistance, please call reception.", accepted: ["Should"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Equivalente a \"If the company were to close...\":", options: ["Were the company to close...", "Was the company closing...", "Had the company to close..."], answer: 0 },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["Only then I realized the truth.", "Only then did I realize the truth.", "Only then realized I the truth."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "So loud ___ the music that we couldn't talk.", accepted: ["was"] },
        { type: "translate", skill: "writing", prompt: "Se eu tivesse sabido, não teria vindo. (com inversão)", accepted: ["Had I known, I wouldn't have come.", "Had I known, I would not have come."] },
        { type: "word_order", skill: "grammar", prompt: "Só depois que ela saiu nós percebemos o erro.", answer: "Not until she left did we notice the mistake.", distractors: ["had"] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Should you need anything, let me know.", accepted: ["should you need anything let me know"] },
      ],
      conversation: {
        goal: "Escreva oralmente com o professor um comunicado formal a clientes usando três inversões (Should you..., Had we..., Only then...).",
        starter: "Let's draft a formal announcement about a service change. How would you open it?",
      },
      review: ["Had I known / Should you need / Were we to.", "Only then did... / Not until... did...", "So + adjetivo + was... / Such was..."],
    }),

    buildLesson("c1-m1-l2", M, 2, {
      title: "Subjuntivo",
      objective: "Usar o subjuntivo em recomendações e exigências formais.",
      explanation: [
        {
          title: "Forma base para todos",
          body: "Depois de verbos e expressões de exigência/recomendação, o verbo fica na **forma base**, mesmo com he/she: **I suggest that he take a break.** (não ~~takes~~) · **It is essential that every employee be informed.** · Negativa: **not + base**: **We recommend that she not travel alone.**",
        },
        {
          title: "Gatilhos comuns",
          body: "Verbos: **suggest, recommend, insist, demand, request, propose, ask**. Expressões: **It is essential / vital / crucial / important / imperative that...** No inglês britânico informal, é comum usar **should**: **I suggest that he should take a break.**",
        },
      ],
      vocabulary: [
        { en: "it is essential that", pt: "é essencial que", say: "it iz i-SÉN-shal dhét" },
        { en: "it is vital that", pt: "é fundamental que", say: "it iz VÁI-tol dhét" },
        { en: "insist that", pt: "insistir que", say: "in-SÍST dhét" },
        { en: "demand", pt: "exigir", say: "di-MÉND" },
        { en: "request", pt: "solicitar", say: "ri-KUÉST" },
        { en: "propose", pt: "propor", say: "pro-PÔUZ" },
        { en: "imperative", pt: "imperativo / indispensável", say: "im-PÉ-ra-tiv" },
        { en: "comply with", pt: "cumprir (norma)", say: "com-PLÁI uidh" },
      ],
      examples: [
        { en: "The doctor recommended that he rest for a week.", pt: "O médico recomendou que ele descansasse por uma semana." },
        { en: "It is vital that the data be protected.", pt: "É fundamental que os dados sejam protegidos." },
        { en: "They insisted that she not be told.", pt: "Insistiram que ela não fosse informada." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"I suggest that he ___ the contract carefully.\"", options: ["reads", "read", "reading"], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "It is essential that every passenger ___ a valid passport. (have)", accepted: ["have"] },
        { type: "fill_blank", skill: "grammar", sentence: "The board demanded that the CEO ___ (resign).", accepted: ["resign"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Negativa no subjuntivo:", options: ["We recommend that he doesn't drive.", "We recommend that he not drive.", "We recommend that he no drives."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "It is crucial that the report ___ submitted by Friday.", accepted: ["be"] },
        { type: "translate", skill: "writing", prompt: "Sugiro que ela fale com o gerente.", accepted: ["I suggest that she speak to the manager.", "I suggest she speak to the manager.", "I suggest that she should speak to the manager.", "I suggest that she speak with the manager."] },
        { type: "word_order", skill: "grammar", prompt: "É fundamental que todos cumpram as regras.", answer: "It is vital that everyone comply with the rules.", distractors: ["complies"] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It is essential that he be informed.", accepted: ["it is essential that he be informed"] },
      ],
      conversation: {
        goal: "Como consultor, faça recomendações formais a uma empresa com problemas, usando subjuntivo.",
        starter: "Our staff turnover is very high. As our consultant, what do you recommend?",
      },
      review: ["Verbo de exigência + that + forma base (he take, she be).", "Negativa: that she not go.", "It is essential/vital/crucial that..."],
    }),

    buildLesson("c1-m1-l3", M, 3, {
      title: "Modais no passado",
      objective: "Especular sobre o passado com precisão.",
      explanation: [
        {
          title: "Graus de certeza no passado",
          body: "**must have done** (certeza que sim) · **can't / couldn't have done** (certeza que não) · **may / might / could have done** (talvez) · **might well have done** (bem provável) · **is bound to have done** (com certeza).",
        },
        {
          title: "Necessidade e obrigação no passado",
          body: "**needn't have done** = fez, mas não precisava · **didn't need to do** = não precisou (provavelmente não fez) · **should have / ought to have** = deveria ter (crítica) · **was supposed to** = era para.",
          table: {
            head: ["Forma", "Sentido"],
            rows: [
              ["She needn't have cooked.", "Ela cozinhou à toa."],
              ["She didn't need to cook.", "Não foi preciso cozinhar."],
              ["They might well have left.", "É bem possível que tenham saído."],
              ["He can't have known.", "Ele não pode ter sabido."],
            ],
          },
        },
      ],
      vocabulary: [
        { en: "might well have", pt: "é bem possível que tenha", say: "mait UÉL av" },
        { en: "can't have", pt: "não pode ter", say: "KÉNT av" },
        { en: "needn't have", pt: "não precisava ter", say: "NÍI-dent av" },
        { en: "ought to have", pt: "deveria ter", say: "ÓT tu av" },
        { en: "speculate", pt: "especular", say: "SPÉ-kiu-lêit" },
        { en: "misplace", pt: "perder (colocar em lugar errado)", say: "mis-PLÊIS" },
        { en: "overlook", pt: "deixar passar", say: "ou-ver-LÚK" },
        { en: "plausible", pt: "plausível", say: "PLÓ-zi-bol" },
      ],
      examples: [
        { en: "The email might well have gone to spam.", pt: "É bem possível que o e-mail tenha ido para o spam." },
        { en: "You needn't have brought a gift, but thank you!", pt: "Não precisava ter trazido presente, mas obrigado!" },
        { en: "Someone must have overlooked the error.", pt: "Alguém deve ter deixado passar o erro." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Você levou guarda-chuva e não choveu:", options: ["I didn't need to take an umbrella.", "I needn't have taken an umbrella."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "She can't ___ seen us. She was looking the other way.", accepted: ["have"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"É bem possível que ele tenha esquecido.\"", options: ["He might well have forgotten.", "He must forget.", "He can't have forgotten."], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "You ought to ___ asked before using my car.", accepted: ["have"] },
        { type: "translate", skill: "writing", prompt: "Eles devem ter perdido o voo.", accepted: ["They must have missed the flight.", "They must have missed their flight."] },
        { type: "word_order", skill: "grammar", prompt: "Ela não pode ter dito isso.", answer: "She can't have said that.", distractors: ["mustn't"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "You needn't have waited. I had my keys.", options: ["Não precisava ter esperado; eu tinha as chaves.", "Obrigado por esperar, eu estava sem chaves.", "Você deveria ter esperado."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It might well have been a mistake.", accepted: ["it might well have been a mistake"] },
      ],
      conversation: {
        goal: "Resolva um mistério com o professor: um colega sumiu no meio do dia. Especule com must have, might well have e can't have.",
        starter: "Our colleague Mark left his laptop open, his coffee half-finished, and nobody has seen him for three hours. What do you think happened?",
      },
      review: ["must / might well / can't have + particípio.", "needn't have (fez à toa) × didn't need to (não precisou).", "should / ought to have: crítica."],
    }),

    buildLesson("c1-m1-l4", M, 4, {
      title: "Elipse e substituição",
      objective: "Evitar repetições com so, not, do so, one e elipse.",
      explanation: [
        {
          title: "So e not",
          body: "Substituem uma frase inteira: **Will it rain? — I hope so. / I hope not.** · **Is he coming? — I think so. / I don't think so.** · **I'm afraid not.**",
        },
        {
          title: "Do so, one, the same",
          body: "**do so** (formal): **Employees may work from home if they wish to do so.** · **one / ones**: **I don't like this shirt. I prefer the blue one.** · **the same**: **I'll have the same.**",
        },
        {
          title: "Elipse",
          body: "Omitir o que já ficou claro: **I wanted to go, but I couldn't.** (go) · **She can speak French and so can I.** · **Not that I know of.** · **Sounds good.** (It sounds good)",
        },
      ],
      vocabulary: [
        { en: "I hope so / not", pt: "espero que sim / não", say: "ái RÔUP SÔU / NÓT" },
        { en: "I'm afraid not", pt: "infelizmente não", say: "áim a-FRÊID NÓT" },
        { en: "do so", pt: "fazê-lo", say: "DÚ SÔU" },
        { en: "so do I", pt: "eu também", say: "SÔU du ÁI" },
        { en: "neither do I", pt: "eu também não", say: "NÁI-dher du ÁI" },
        { en: "not that I know of", pt: "não que eu saiba", say: "NÓT dhét ái NÔU ov" },
        { en: "redundant", pt: "redundante", say: "ri-DÂN-dant" },
        { en: "the latter", pt: "o último (de dois)", say: "dhe LÉ-ter" },
      ],
      examples: [
        { en: "Is the store open on Sundays? — I'm afraid not.", pt: "A loja abre aos domingos? — Infelizmente não." },
        { en: "Visitors may take photos, but they must not do so with flash.", pt: "Visitantes podem tirar fotos, mas não podem fazê-lo com flash." },
        { en: "I don't eat meat. — Neither do I.", pt: "Não como carne. — Eu também não." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"Will the meeting be canceled?\" — \"I hope ___.\" (espero que não)", options: ["no", "not", "don't"], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "Is she coming? — I think ___.", accepted: ["so"] },
        { type: "fill_blank", skill: "grammar", sentence: "I love jazz. — So ___ I.", accepted: ["do"] },
        { type: "fill_blank", skill: "grammar", sentence: "I can't swim. — Neither ___ I.", accepted: ["can"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Evite repetir \"car\": \"I sold my old car and bought a new ___.\"", options: ["one", "it", "so"], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Não que eu saiba.", accepted: ["Not that I know of.", "Not as far as I know."] },
        { type: "word_order", skill: "grammar", prompt: "Eu queria ir, mas não pude.", answer: "I wanted to go, but I couldn't.", distractors: ["went"] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I'm afraid not.", accepted: ["i'm afraid not", "i am afraid not"] },
      ],
      conversation: {
        goal: "Responda perguntas rápidas do professor sem repetir a pergunta: use so/not, so do I, neither can I, one.",
        starter: "Quick-fire round! Do you think it'll rain tomorrow? Do you like spicy food? Can you drive?",
      },
      review: ["I think so / I hope not / I'm afraid not.", "So do I / Neither can I.", "do so (formal), one/ones, elipse."],
    }),

    buildLesson("c1-m1-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Precisão gramatical",
      objective: "Comprovar precisão em estruturas avançadas.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "___ you have any questions, please contact HR.", accepted: ["Should"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"It's vital that she ___ on time.\"", options: ["is", "be", "will be"], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "He must ___ left early. His car is gone.", accepted: ["have"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Você cozinhou para 10 e só vieram 3: \"I ___ so much food.\"", options: ["needn't have cooked", "didn't need to cook"], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "Is it going to be expensive? — I'm afraid ___.", accepted: ["so"] },
        { type: "translate", skill: "writing", prompt: "Só então percebi o erro. (com inversão)", accepted: ["Only then did I realize the mistake.", "Only then did I realize the mistake.", "Only then did I notice the mistake.", "Only then did I realize my mistake."] },
        { type: "word_order", skill: "grammar", prompt: "Recomendamos que ele não viaje sozinho.", answer: "We recommend that he not travel alone." },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Had we known\" equivale a:", options: ["If we had known", "If we knew", "When we know"], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Were the plan to fail, we would lose everything.", options: ["Se o plano falhasse, perderíamos tudo.", "O plano falhou e perdemos tudo.", "O plano vai funcionar."], answer: 0 },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["query", "dúvida"], ["overlook", "deixar passar"], ["comply with", "cumprir"], ["unforeseen", "imprevisto"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
