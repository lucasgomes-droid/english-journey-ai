import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "c2-m6";

export const c2Module6: Module = {
  id: M,
  level: "C2",
  order: 6,
  title: "Pragmática e cultura",
  description: "Polidez e indiretividade, registro extremo, referências culturais e comunicação intercultural.",
  lessons: [
    buildLesson("c2-m6-l1", M, 1, {
      title: "Polidez e indiretividade",
      objective: "Navegar normas sociais com atos de fala indiretos.",
      explanation: [
        {
          title: "Pedidos indiretos",
          body: "Uma afirmação pode ser um pedido: **It's a bit cold in here.** (= feche a janela) · **I don't suppose you'd have a minute?** (= você teria um minuto?) · **I was hoping you might...** · Responder literalmente (\"Yes, it is cold\") é um erro pragmático.",
        },
        {
          title: "Recusar sem dizer não",
          body: "**I'll see what I can do.** (muitas vezes = não) · **That might be a bit tricky.** (= não dá) · **Let me get back to you on that.** · **I'd love to, but...** No mundo anglo-saxão, o \"não\" direto é raro em contextos formais.",
        },
      ],
      vocabulary: [
        { en: "speech act", pt: "ato de fala", say: "SPÍITCH ÉKT" },
        { en: "indirect", pt: "indireto", say: "in-dai-RÉKT" },
        { en: "I don't suppose", pt: "por acaso você não...", say: "ái dôunt sa-PÔUZ" },
        { en: "I was hoping", pt: "eu estava esperando que", say: "ái uóz RÔU-ping" },
        { en: "a bit tricky", pt: "meio complicado", say: "a BÍT TRÍ-ki" },
        { en: "I'll see what I can do", pt: "vou ver o que posso fazer", say: "ail SÍI uót ái can DÚ" },
        { en: "face-saving", pt: "que preserva a imagem", say: "FÊIS-sêi-ving" },
        { en: "hint", pt: "indireta / dica", say: "RÍNT" },
      ],
      examples: [
        { en: "I don't suppose you could lend me your car this weekend?", pt: "Por acaso você não poderia me emprestar o carro neste fim de semana?" },
        { en: "Friday might be a bit tricky for us.", pt: "Sexta pode ser meio complicado para nós. (= não dá)" },
        { en: "She dropped a hint that she wanted to leave.", pt: "Ela deu uma indireta de que queria ir embora." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Seu anfitrião diz: \"It's getting quite late...\" Ele provavelmente quer:", options: ["Que você vá embora.", "Saber as horas.", "Mais conversa."], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Cliente britânico: \"That might be a bit tricky.\" Provavelmente significa:", options: ["Não dá / é improvável.", "Vamos fazer com certeza.", "É fácil."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "I don't ___ you'd have a spare pen? (por acaso)", accepted: ["suppose"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "She dropped a ___ that she wanted a raise. (indireta)", accepted: ["hint"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Resposta pragmaticamente adequada a \"It's a bit cold in here\":", options: ["Yes, it is.", "Shall I close the window?"], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Eu estava esperando que você pudesse me ajudar.", accepted: ["I was hoping you could help me.", "I was hoping you might help me.", "I was hoping that you could help me."] },
        { type: "listening", skill: "listening", prompt: "Ouça. O que a pessoa realmente quer?", audio: "I don't suppose there's any chance of a lift to the station?", options: ["Uma carona até a estação.", "Saber onde fica a estação.", "Um elevador."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I'll see what I can do.", accepted: ["i'll see what i can do", "i will see what i can do"] },
      ],
      conversation: {
        goal: "Faça pedidos indiretos e recuse pedidos do professor sem dizer \"não\" diretamente.",
        starter: "Hey, I don't suppose you'd be free to help me move house on Sunday? It'd only take, oh, eight or nine hours.",
      },
      review: ["Afirmações podem ser pedidos: 'It's cold in here.'", "I don't suppose... / I was hoping...", "Recusas indiretas: a bit tricky / I'll see what I can do."],
    }),

    buildLesson("c2-m6-l2", M, 2, {
      title: "Registro extremo",
      objective: "Mudar de registro com fluidez, do muito formal à gíria.",
      explanation: [
        {
          title: "Uma ideia, cinco registros",
          body: "Congelado/legal: **The tenant shall vacate the premises.** · Formal: **We kindly request that you leave the property.** · Neutro: **Please leave the apartment.** · Informal: **You need to move out.** · Gíria: **Time to pack up and bounce.**",
        },
        {
          title: "Marcadores",
          body: "Formal: **shall, hereby, whereby, aforementioned, prior to, in accordance with**. Gíria: **bounce, chill, legit, sketchy** (suspeito), **bail** (desistir/sair), **dude, mate**.",
        },
      ],
      vocabulary: [
        { en: "hereby", pt: "pelo presente", say: "RÍR-bái" },
        { en: "whereby", pt: "pelo qual", say: "UÉR-bái" },
        { en: "prior to", pt: "antes de", say: "PRÁI-er tu" },
        { en: "in accordance with", pt: "de acordo com", say: "in a-CÓR-dans uidh" },
        { en: "vacate", pt: "desocupar", say: "vêi-KÊIT" },
        { en: "premises", pt: "instalações / imóvel", say: "PRÉ-mi-siz" },
        { en: "bail", pt: "desistir / vazar", say: "BÊIL" },
        { en: "sketchy", pt: "suspeito / duvidoso", say: "SKÉ-tchi" },
        { en: "legit", pt: "legítimo / de verdade", say: "le-DJÍT" },
      ],
      examples: [
        { en: "The tenant shall vacate the premises prior to 30 June.", pt: "O inquilino deverá desocupar o imóvel antes de 30 de junho." },
        { en: "This neighborhood looks a bit sketchy at night.", pt: "Este bairro parece meio suspeito à noite." },
        { en: "Sorry, I have to bail. Something came up.", pt: "Desculpa, vou ter que furar. Surgiu um imprevisto." },
      ],
      exercises: [
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue formal → neutro.", pairs: [["prior to", "before"], ["vacate", "leave"], ["premises", "property"], ["in accordance with", "according to"]] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Registro de \"The parties hereby agree...\":", options: ["Jurídico/congelado.", "Gíria.", "Informal."], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"That deal sounds sketchy.\"", options: ["Esse negócio parece suspeito.", "Esse negócio parece rascunhado.", "Esse negócio é ótimo."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Payment must be made ___ to delivery. (antes de)", accepted: ["prior"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Is this website ___? It looks fake. (legítimo, gíria)", accepted: ["legit"] },
        { type: "translate", skill: "writing", prompt: "De acordo com a lei, você deve pagar a taxa.", accepted: ["In accordance with the law, you must pay the fee.", "According to the law, you must pay the fee.", "In accordance with the law, you have to pay the fee."] },
        { type: "listening", skill: "listening", prompt: "Ouça. Registro?", audio: "Dude, this party's dead. Wanna bail?", options: ["Gíria.", "Formal."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Prior to the meeting.", accepted: ["prior to the meeting"] },
      ],
      conversation: {
        goal: "Diga a mesma mensagem em cinco registros: contrato, e-mail formal, neutro, informal e gíria.",
        starter: "Message: 'The event is cancelled because of the storm.' Give me five versions, from legal document to text to your best friend.",
      },
      review: ["Congelado → formal → neutro → informal → gíria.", "hereby, prior to, in accordance with, vacate.", "bail, sketchy, legit, bounce."],
    }),

    buildLesson("c2-m6-l3", M, 3, {
      title: "Referências culturais",
      objective: "Entender alusões culturais comuns em textos e conversas.",
      explanation: [
        {
          title: "Alusões literárias e históricas",
          body: "**a Catch-22** (situação sem saída) · **Orwellian** (vigilância/controle opressivo) · **an Achilles' heel** (ponto fraco) · **a Pandora's box** · **met his Waterloo** (sofreu a derrota final) · **Big Brother is watching** · **a Trojan horse** · **to cross the Rubicon** (passar do ponto sem volta).",
        },
        {
          title: "Cultura pop e bíblica",
          body: "**Houston, we have a problem.** · **the elephant in the room** (o assunto que ninguém menciona) · **a David and Goliath story** · **the writing on the wall** (sinais claros de desastre) · **a good Samaritan**.",
        },
      ],
      vocabulary: [
        { en: "Catch-22", pt: "situação sem saída", say: "KÉTCH tuén-ti-TÚ" },
        { en: "Orwellian", pt: "orwelliano (controle opressivo)", say: "or-UÉ-li-an" },
        { en: "Achilles' heel", pt: "calcanhar de Aquiles", say: "a-KÍ-liz RÍIL" },
        { en: "Pandora's box", pt: "caixa de Pandora", say: "pén-DÓ-raz BÓKS" },
        { en: "Trojan horse", pt: "cavalo de Troia", say: "TRÔU-djan RÓRS" },
        { en: "cross the Rubicon", pt: "passar do ponto sem volta", say: "CRÓS dhe RÚ-bi-con" },
        { en: "the elephant in the room", pt: "o assunto evitado", say: "dhi É-le-fant in dhe RÚUM" },
        { en: "the writing on the wall", pt: "sinais claros (de desastre)", say: "dhe RÁI-ting on dhe UÓL" },
        { en: "allusion", pt: "alusão", say: "a-LÚ-jan" },
      ],
      examples: [
        { en: "It's a Catch-22: you need experience to get a job, and a job to get experience.", pt: "É uma situação sem saída: precisa de experiência para ter emprego e de emprego para ter experiência." },
        { en: "Nobody mentioned the layoffs; it was the elephant in the room.", pt: "Ninguém mencionou as demissões; era o assunto que todos evitavam." },
        { en: "Public speaking is my Achilles' heel.", pt: "Falar em público é meu calcanhar de Aquiles." },
      ],
      exercises: [
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["Catch-22", "situação sem saída"], ["Achilles' heel", "ponto fraco"], ["Trojan horse", "cavalo de Troia"], ["Pandora's box", "caixa de Pandora"]] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"The new surveillance law is positively Orwellian.\"", options: ["A lei é de controle opressivo.", "A lei é muito liberal.", "A lei foi escrita por Orwell."], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"The writing was on the wall.\"", options: ["Os sinais de desastre eram claros.", "Havia pichação na parede.", "Estava tudo escrito no contrato."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Let's address the elephant in the ___.", accepted: ["room"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Once you sign, you've crossed the ___. There's no going back.", accepted: ["Rubicon"] },
        { type: "translate", skill: "writing", prompt: "É uma história de Davi contra Golias.", accepted: ["It's a David and Goliath story.", "It is a David and Goliath story.", "It's a David versus Goliath story."] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Opening that investigation would be opening Pandora's box.", options: ["Abriria uma série de problemas imprevisíveis.", "Resolveria tudo.", "Seria um presente."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "That's my Achilles' heel.", accepted: ["that's my achilles' heel", "that is my achilles' heel", "that's my achilles heel"] },
      ],
      conversation: {
        goal: "Descreva situações do trabalho e da política usando alusões culturais (Catch-22, elephant in the room, Trojan horse...).",
        starter: "Describe a situation at work or in the news that's a real Catch-22, or where there's an elephant in the room.",
      },
      review: ["Catch-22, Orwellian, Achilles' heel, Pandora's box, Trojan horse.", "elephant in the room, writing on the wall, cross the Rubicon.", "Alusões exigem cultura, não só língua."],
    }),

    buildLesson("c2-m6-l4", M, 4, {
      title: "Comunicação intercultural",
      objective: "Comunicar com eficiência entre culturas diferentes.",
      explanation: [
        {
          title: "Culturas de alto e baixo contexto",
          body: "**Low-context** (EUA, Alemanha, Holanda): diga explicitamente, contratos detalhados, \"sim\" é sim. **High-context** (Japão, Brasil, países árabes): significado no contexto, relação antes do negócio, \"sim\" pode ser \"entendi\". Ajuste: com low-context, seja direto e claro; com high-context, invista em relação e leia sinais.",
        },
        {
          title: "Inglês como língua franca",
          body: "Com não nativos: evite idioms e gírias, fale em frases curtas, confirme entendimento (**Just to make sure we're aligned: ...**), resuma por escrito depois. Muitas vezes, o falante de C2 se adapta mais que o nativo.",
        },
      ],
      vocabulary: [
        { en: "high-context", pt: "de alto contexto", say: "RÁI-cón-tekst" },
        { en: "low-context", pt: "de baixo contexto", say: "LÔU-cón-tekst" },
        { en: "lingua franca", pt: "língua franca", say: "LÍN-gua FRÉN-ka" },
        { en: "rapport", pt: "afinidade / conexão", say: "ra-PÓR" },
        { en: "misunderstanding", pt: "mal-entendido", say: "mis-ân-der-STÉN-ding" },
        { en: "aligned", pt: "alinhados", say: "a-LÁIND" },
        { en: "explicit", pt: "explícito", say: "ex-PLÍ-sit" },
        { en: "adapt", pt: "adaptar(-se)", say: "a-DÉPT" },
        { en: "etiquette", pt: "etiqueta", say: "É-ti-ket" },
      ],
      examples: [
        { en: "In low-context cultures, people expect you to say exactly what you mean.", pt: "Em culturas de baixo contexto, espera-se que você diga exatamente o que quer dizer." },
        { en: "Just to make sure we're aligned: delivery on the 10th, payment in 30 days.", pt: "Só para garantir que estamos alinhados: entrega dia 10, pagamento em 30 dias." },
        { en: "Building rapport first is essential in many cultures.", pt: "Criar afinidade primeiro é essencial em muitas culturas." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Com colegas de vários países (inglês como língua franca), é melhor:", options: ["Usar muitos idioms britânicos.", "Frases claras, sem gírias, confirmando entendimento.", "Falar o mais rápido possível."], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Numa cultura de alto contexto, \"sim\" pode significar:", options: ["\"Entendi\" (não necessariamente \"concordo\").", "Sempre \"concordo\".", "\"Não\"."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Just to make sure we're ___: the deadline is Monday.", accepted: ["aligned", "clear", "on the same page"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "In many cultures, you need to build ___ before talking business.", accepted: ["rapport", "trust", "relationships"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Lingua franca\":", options: ["Língua comum entre falantes de línguas diferentes.", "Língua francesa.", "Língua informal."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Houve um mal-entendido cultural.", accepted: ["There was a cultural misunderstanding.", "There has been a cultural misunderstanding."] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha a estratégia.", audio: "Let me summarize what we agreed, and I'll send it by email so everyone has it in writing.", options: ["Resumir e confirmar por escrito.", "Mudar de assunto.", "Encerrar sem acordo."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Let's make sure we're aligned.", accepted: ["let's make sure we're aligned", "let us make sure we are aligned", "let's make sure we are aligned"] },
      ],
      conversation: {
        goal: "Simule uma reunião com parceiros de culturas diferentes (o professor interpreta um alemão direto e um japonês indireto). Adapte sua comunicação a cada um.",
        starter: "Hans says: 'Your proposal has three problems.' Kenji says: 'It is a very interesting proposal... we will consider it carefully.' How do you respond to each?",
      },
      review: ["Alto × baixo contexto: ajuste a franqueza.", "Língua franca: claro, sem idioms, confirme e registre por escrito.", "rapport, aligned, explicit."],
    }),

    buildLesson("c2-m6-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Pragmática e cultura",
      objective: "Comprovar competência pragmática e cultural.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"It's getting late...\" dito pelo anfitrião é:", options: ["Um pedido indireto para encerrar.", "Uma informação sobre as horas."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "The tenant shall ___ the premises. (desocupar)", accepted: ["vacate", "leave"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Achilles' heel\":", options: ["Ponto fraco", "Lesão no pé", "Força"], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Cultura de baixo contexto prefere:", options: ["Comunicação explícita.", "Sinais indiretos."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Esse é o assunto que todos evitam.", accepted: ["That's the elephant in the room.", "That is the elephant in the room.", "It's the elephant in the room."] },
        { type: "word_order", skill: "grammar", prompt: "Por acaso você não teria um minuto?", answer: "I don't suppose you'd have a minute?" },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Sketchy\":", options: ["Suspeito", "Desenhado", "Rápido"], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça. A pessoa aceitou?", audio: "Next week might be a bit tricky, to be honest.", options: ["Provavelmente não.", "Sim, com certeza."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It's a real Catch-22.", accepted: ["it's a real catch-22", "it is a real catch-22", "it's a real catch 22"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["hint", "indireta"], ["prior to", "antes de"], ["rapport", "afinidade"], ["Trojan horse", "cavalo de Troia"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
