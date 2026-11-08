import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "b1-m8";

export const b1Module8: Module = {
  id: M,
  level: "B1",
  order: 8,
  title: "Morar fora",
  description: "Alugar, resolver burocracia, fazer amigos e reclamar com eficiência.",
  lessons: [
    buildLesson("b1-m8-l1", M, 1, {
      title: "Alugando um imóvel",
      objective: "Entender um anúncio e negociar um aluguel.",
      explanation: [
        {
          title: "O anúncio",
          body: "**2-bed apartment / apartment** (2 quartos) · **furnished / unfurnished** (mobiliado) · **bills included** (contas incluídas) · **deposit** (caução) · **lease / tenancy agreement** (contrato) · **landlord / landlady** (proprietário) · **tenant** (inquilino).",
        },
        {
          title: "Perguntas que você precisa fazer",
          body: "**Is the rent negotiable?** · **How much is the deposit?** · **Are utilities included?** (água, luz, gás) · **How long is the minimum lease?** · **Are pets allowed?** · **When can I move in?**",
        },
        {
          title: "Negociando",
          body: "**Would you consider lowering the rent if I signed for a year?** · **Is there any flexibility on the price?** Use condicionais para soar educado e firme.",
        },
      ],
      vocabulary: [
        { en: "landlord", pt: "proprietário", say: "LÉND-lórd" },
        { en: "tenant", pt: "inquilino", say: "TÉ-nant" },
        { en: "rent", pt: "aluguel / alugar", say: "RÉNT" },
        { en: "deposit", pt: "caução", say: "di-PÓ-zit" },
        { en: "lease", pt: "contrato de aluguel", say: "LÍIS" },
        { en: "furnished", pt: "mobiliado", say: "FÂR-nisht" },
        { en: "utilities / bills", pt: "contas (água, luz, gás)", say: "iu-TÍ-li-tiz" },
        { en: "move in", pt: "mudar-se para", say: "MÚUV ÍN" },
        { en: "negotiable", pt: "negociável", say: "ni-GÔU-sha-bol" },
      ],
      examples: [
        { en: "Is the rent negotiable if I sign a one-year lease?", pt: "O aluguel é negociável se eu assinar um contrato de um ano?" },
        { en: "The apartment is furnished and bills are included.", pt: "O apartamento é mobiliado e as contas estão incluídas." },
        { en: "When would I be able to move in?", pt: "Quando eu poderia me mudar?" },
      ],
      exercises: [
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["landlord", "proprietário"], ["tenant", "inquilino"], ["deposit", "caução"], ["lease", "contrato"]] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Bills included\" significa:", options: ["Contas incluídas no aluguel.", "Precisa pagar as contas antes.", "Não há contas."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Are pets ___ in the building?", translation: "São permitidos animais?", accepted: ["allowed"] },
        { type: "fill_blank", skill: "grammar", sentence: "Would you consider ___ (lower) the rent?", accepted: ["lowering"] },
        { type: "translate", skill: "writing", prompt: "Quanto é a caução?", accepted: ["How much is the deposit?"] },
        { type: "word_order", skill: "grammar", prompt: "Quando eu posso me mudar?", answer: "When can I move in?", distractors: ["change"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "The rent is twelve hundred a month, plus one month's deposit. Utilities aren't included.", options: ["1.200 por mês, mais um mês de caução; contas à parte.", "1.200 com contas incluídas.", "Sem caução."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Is the rent negotiable?", accepted: ["is the rent negotiable"] },
      ],
      conversation: {
        goal: "Ligue para um proprietário: pergunte sobre o imóvel, as contas e a caução, e tente negociar o preço.",
        starter: "Hello, you're calling about the apartment on Green Street? What would you like to know?",
      },
      review: ["landlord, tenant, deposit, lease, bills included.", "Perguntas essenciais antes de alugar.", "Negociar: Would you consider...? / Is there any flexibility?"],
    }),

    buildLesson("b1-m8-l2", M, 2, {
      title: "Bancos e burocracia",
      objective: "Resolver serviços e dizer que mandou fazer algo (have something done).",
      explanation: [
        {
          title: "Have something done",
          body: "Quando outra pessoa faz o serviço para você: **I had my hair cut.** (Cortei o cabelo — no salão.) **I need to have my documents translated.** **We're having the kitchen painted.** Forma: **have + objeto + particípio**. Informal: **get something done**.",
        },
        {
          title: "No banco e em repartições",
          body: "**I'd like to open an account.** · **What documents do I need?** · **proof of address** (comprovante de residência) · **ID** (documento de identidade) · **fill in a form** · **make an appointment** · **The card should arrive within five working days.** (dias úteis)",
        },
      ],
      vocabulary: [
        { en: "open an account", pt: "abrir uma conta", say: "ÔU-pen an a-CÁUNT" },
        { en: "proof of address", pt: "comprovante de residência", say: "PRÚUF ov a-DRÉS" },
        { en: "ID", pt: "documento de identidade", say: "ái-DÍI" },
        { en: "working days", pt: "dias úteis", say: "UÊR-king dêiz" },
        { en: "fee", pt: "taxa", say: "FÍI" },
        { en: "transfer", pt: "transferência", say: "TRÉNS-fer" },
        { en: "translate", pt: "traduzir", say: "trénz-LÊIT" },
        { en: "renew", pt: "renovar", say: "ri-NÚ" },
        { en: "visa", pt: "visto", say: "VÍ-za" },
      ],
      examples: [
        { en: "I need to have my diploma translated.", pt: "Preciso mandar traduzir meu diploma." },
        { en: "What documents do I need to open an account?", pt: "Que documentos preciso para abrir uma conta?" },
        { en: "Your card will arrive within five working days.", pt: "Seu cartão chegará em até cinco dias úteis." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"Mandei consertar meu carro.\"", options: ["I repaired my car.", "I had my car repaired.", "I had repaired my car."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "I'm going to have my passport ___ (renew).", accepted: ["renewed"] },
        { type: "fill_blank", skill: "grammar", sentence: "She got her nails ___ (do) yesterday.", accepted: ["done"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Proof of address\" é:", options: ["Comprovante de residência.", "Endereço de e-mail.", "Prova escrita."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Eu gostaria de abrir uma conta.", accepted: ["I'd like to open an account.", "I would like to open an account.", "I'd like to open a bank account."] },
        { type: "word_order", skill: "grammar", prompt: "Nós vamos pintar a casa (com um pintor).", answer: "We are having the house painted.", distractors: ["painting"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "There's a small fee for international transfers.", options: ["Há uma pequena taxa para transferências internacionais.", "Transferências são grátis.", "Não fazemos transferências."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "What documents do I need?", accepted: ["what documents do i need"] },
      ],
      conversation: {
        goal: "Abra uma conta num banco no exterior: pergunte documentos, taxas e prazos.",
        starter: "Good morning, welcome to City Bank. How can I help you today?",
      },
      review: ["have/get + objeto + particípio: mandar fazer.", "open an account, proof of address, ID, fee, working days."],
    }),

    buildLesson("b1-m8-l3", M, 3, {
      title: "Fazendo amigos",
      objective: "Puxar e manter conversa com small talk e tag questions.",
      explanation: [
        {
          title: "Tag questions",
          body: "Pequenas perguntas no fim que convidam a responder: **It's cold today, isn't it?** · **You're from Brazil, aren't you?** · **You don't eat meat, do you?** Regra: frase positiva → tag negativa; negativa → positiva. O auxiliar se repete.",
          table: {
            head: ["Frase", "Tag"],
            rows: [
              ["It's hot,", "isn't it?"],
              ["You work here,", "don't you?"],
              ["She can drive,", "can't she?"],
              ["They didn't come,", "did they?"],
              ["I'm late,", "aren't I?"],
            ],
          },
        },
        {
          title: "Small talk que funciona",
          body: "Temas seguros: tempo, o lugar, o evento, trabalho, planos de fim de semana. Faça perguntas abertas (**How do you know the host?** · **What brings you here?**) e mostre interesse: **Oh really? How was that?**",
        },
      ],
      vocabulary: [
        { en: "small talk", pt: "conversa casual", say: "SMÓL TÓK" },
        { en: "How do you know...?", pt: "De onde você conhece...?", say: "RÁU du iu NÔU" },
        { en: "What brings you here?", pt: "O que te traz aqui?", say: "UÓT BRÍNGZ iu RÍR" },
        { en: "host", pt: "anfitrião", say: "RÔUST" },
        { en: "keep in touch", pt: "manter contato", say: "KÍIP in TÂTCH" },
        { en: "Nice talking to you", pt: "Foi bom conversar", say: "NÁIS TÓ-king tu iu" },
        { en: "have in common", pt: "ter em comum", say: "RÉV in CÓ-mon" },
        { en: "get to know", pt: "conhecer (melhor)", say: "guét tu NÔU" },
      ],
      examples: [
        { en: "It's a great party, isn't it?", pt: "A festa está ótima, não é?" },
        { en: "So, how do you know Paula?", pt: "Então, de onde você conhece a Paula?" },
        { en: "Nice talking to you. Let's keep in touch!", pt: "Foi bom conversar. Vamos manter contato!" },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "You're Brazilian, ___ you?", accepted: ["aren't"] },
        { type: "fill_blank", skill: "grammar", sentence: "She doesn't like coffee, ___ she?", accepted: ["does"] },
        { type: "fill_blank", skill: "grammar", sentence: "They went to the beach, ___ they?", accepted: ["didn't"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"You can swim, ___?\"", options: ["can you", "can't you", "don't you"], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Boa pergunta aberta para puxar conversa numa festa:", options: ["Are you OK?", "How do you know the host?", "Yes or no?"], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Foi bom conversar com você.", accepted: ["Nice talking to you.", "It was nice talking to you.", "It was nice talking with you.", "Nice talking with you."] },
        { type: "word_order", skill: "grammar", prompt: "O que te traz a Londres?", answer: "What brings you to London?", distractors: ["takes"] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It's freezing today, isn't it?", accepted: ["it's freezing today isn't it", "it is freezing today isn't it"] },
      ],
      conversation: {
        goal: "Você está numa festa e não conhece ninguém. Puxe conversa com o professor, use tag questions e termine combinando de manter contato.",
        starter: "Hi! Great music, isn't it? I don't think we've met.",
      },
      review: ["Tag questions: positiva → tag negativa e vice-versa.", "I'm late, aren't I?", "Perguntas abertas + mostrar interesse."],
    }),

    buildLesson("b1-m8-l4", M, 4, {
      title: "Reclamações",
      objective: "Reclamar de forma eficaz e diplomática.",
      explanation: [
        {
          title: "Linguagem diplomática",
          body: "Suavize sem perder a firmeza: **I'm afraid there seems to be a problem with...** · **I was a bit disappointed with...** · **I'm not entirely happy with...** · **Unfortunately,...**",
        },
        {
          title: "Peça uma solução concreta",
          body: "**I'd appreciate it if you could...** (Eu agradeceria se você pudesse...) · **Would it be possible to get a refund / a replacement?** · **If this isn't resolved by Friday, I'll have to...** (escalar, firme).",
        },
        {
          title: "Estrutura",
          body: "O que aconteceu (fatos e datas) → por que é um problema → o que você quer → até quando. Sem emoção, com fatos.",
        },
      ],
      vocabulary: [
        { en: "there seems to be", pt: "parece haver", say: "dhér SÍIMZ tu bi" },
        { en: "disappointed", pt: "decepcionado", say: "dis-a-PÓIN-tid" },
        { en: "I'd appreciate it if", pt: "eu agradeceria se", say: "áid a-PRÍ-shi-êit it if" },
        { en: "replacement", pt: "substituição / troca", say: "ri-PLÊIS-ment" },
        { en: "faulty", pt: "com defeito", say: "FÓL-ti" },
        { en: "resolve", pt: "resolver", say: "ri-ZÓLV" },
        { en: "manager", pt: "gerente", say: "MÉ-ni-djer" },
        { en: "compensation", pt: "compensação / indenização", say: "com-pen-SÊI-shan" },
        { en: "unacceptable", pt: "inaceitável", say: "ân-ak-SÉP-ta-bol" },
      ],
      examples: [
        { en: "I'm afraid there seems to be a mistake on my bill.", pt: "Receio que pareça haver um erro na minha conta." },
        { en: "I'd appreciate it if you could send a replacement.", pt: "Eu agradeceria se vocês pudessem mandar uma troca." },
        { en: "If this isn't resolved by Friday, I'll ask for a full refund.", pt: "Se não for resolvido até sexta, vou pedir reembolso total." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Reclamação diplomática:", options: ["Your service is terrible!", "I'm afraid there seems to be a problem with my order.", "Fix it now."], answer: 1 },
        { type: "fill_blank", skill: "vocabulary", sentence: "I'd ___ it if you could call me back today.", accepted: ["appreciate"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "The charger I bought is ___. It doesn't work. (com defeito)", accepted: ["faulty", "broken", "defective"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Would it be possible to get a replacement?\"", options: ["Seria possível trocar o produto?", "Posso falar com o gerente?", "Vocês aceitam cartão?"], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Fiquei um pouco decepcionado com o serviço.", accepted: ["I was a bit disappointed with the service.", "I was a little disappointed with the service.", "I was a bit disappointed by the service."] },
        { type: "word_order", skill: "grammar", prompt: "Gostaria de falar com o gerente, por favor.", answer: "I'd like to speak to the manager, please.", distractors: ["want"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha a solução oferecida.", audio: "We're very sorry. We'll refund the delivery fee and send a new one tomorrow.", options: ["Reembolsar o frete e mandar outro amanhã.", "Nenhuma solução.", "Só um pedido de desculpas."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "This is unacceptable.", accepted: ["this is unacceptable"] },
      ],
      conversation: {
        goal: "Reclame de um produto com defeito com o atendimento. Seja educado, firme, e consiga uma solução concreta com prazo.",
        starter: "Customer service, this is Mark speaking. How can I help you?",
      },
      review: ["Diplomático: I'm afraid there seems to be... / I was a bit disappointed.", "Pedir: I'd appreciate it if... / Would it be possible to...?", "Fatos → problema → pedido → prazo."],
    }),

    buildLesson("b1-m8-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Morar fora",
      objective: "Comprovar que você aluga, resolve serviços, faz amigos e reclama.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar a avaliação final do B1." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "You live near here, ___ you?", accepted: ["don't"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Vou cortar o cabelo amanhã (no salão).\"", options: ["I'm cutting my hair tomorrow.", "I'm having my hair cut tomorrow.", "I'm having cut my hair tomorrow."], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Tenant\" é:", options: ["Proprietário", "Inquilino", "Corretor"], answer: 1 },
        { type: "translate", skill: "writing", prompt: "As contas estão incluídas?", accepted: ["Are the bills included?", "Are bills included?", "Are utilities included?", "Are the utilities included?"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "I'm afraid there ___ to be a problem with my reservation.", accepted: ["seems"] },
        { type: "word_order", skill: "grammar", prompt: "Vamos manter contato.", answer: "Let's keep in touch." },
        { type: "fill_blank", skill: "grammar", sentence: "She can't come, ___ she?", accepted: ["can"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "You'll need your ID and proof of address to open the account.", options: ["Precisa de identidade e comprovante de residência.", "Só precisa do passaporte.", "Não precisa de documentos."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "When can I move in?", accepted: ["when can i move in"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["landlord", "proprietário"], ["fee", "taxa"], ["faulty", "com defeito"], ["host", "anfitrião"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
