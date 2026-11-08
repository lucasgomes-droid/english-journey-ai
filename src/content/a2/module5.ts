import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "a2-m5";

export const a2Module5: Module = {
  id: M,
  level: "A2",
  order: 5,
  title: "Viagem",
  description: "Aeroporto, hotel, turismo e como resolver problemas na viagem.",
  lessons: [
    buildLesson("a2-m5-l1", M, 1, {
      title: "No aeroporto",
      objective: "Resolver check-in, bagagem e embarque.",
      explanation: [
        {
          title: "Check-in",
          body: "Frases que você vai ouvir: **Can I see your passport, please?** · **How many bags are you checking?** · **Did you pack your bags yourself?** · **Window or aisle?** (Janela ou corredor?)",
        },
        {
          title: "Perguntas indiretas (mais educadas)",
          body: "Em vez de **Where is gate 12?**, diga **Could you tell me where gate 12 is?** Repare: na pergunta indireta, a ordem volta a ser de frase normal (**where gate 12 is**, não ~~where is gate 12~~). Outra: **Do you know what time we board?**",
        },
        {
          title: "Avisos",
          body: "**boarding** (embarque), **delayed** (atrasado), **canceled** (cancelado), **final call** (última chamada), **gate** (portão).",
        },
      ],
      vocabulary: [
        { en: "passport", pt: "passaporte", say: "PÉS-port" },
        { en: "boarding pass", pt: "cartão de embarque", say: "BÓR-ding pés" },
        { en: "gate", pt: "portão", say: "GUÊIT" },
        { en: "aisle seat", pt: "assento no corredor", say: "ÁIL siit" },
        { en: "window seat", pt: "assento na janela", say: "UÍN-dou siit" },
        { en: "carry-on", pt: "bagagem de mão", say: "CÉ-ri on" },
        { en: "check in a bag", pt: "despachar uma mala", say: "TCHÉK in a BÉG" },
        { en: "delayed", pt: "atrasado", say: "di-LÊID" },
        { en: "board", pt: "embarcar", say: "BÓRD" },
        { en: "flight", pt: "voo", say: "FLÁIT" },
      ],
      examples: [
        { en: "I'd like an aisle seat, please.", pt: "Eu gostaria de um assento no corredor, por favor." },
        { en: "Could you tell me where gate 22 is?", pt: "Você poderia me dizer onde fica o portão 22?" },
        { en: "Our flight is delayed by two hours.", pt: "Nosso voo está atrasado duas horas." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Pergunta indireta correta:", options: ["Could you tell me where is the gate?", "Could you tell me where the gate is?", "Could you tell me where does the gate?"], answer: 1 },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["gate", "portão"], ["flight", "voo"], ["delayed", "atrasado"], ["carry-on", "bagagem de mão"]] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Window or ___? — Window, please.", translation: "Janela ou corredor?", accepted: ["aisle"] },
        { type: "translate", skill: "writing", prompt: "Eu tenho uma mala para despachar.", accepted: ["I have one bag to check in.", "I have a bag to check in.", "I've got one bag to check in.", "I have one bag to check."] },
        { type: "word_order", skill: "grammar", prompt: "Você sabe que horas nós embarcamos?", answer: "Do you know what time we board?", distractors: ["does"] },
        { type: "multiple_choice", skill: "reading", prompt: "Painel: \"LA 3045 – FINAL CALL – GATE 7\". O que isso significa?", options: ["O voo foi cancelado.", "Última chamada para embarque no portão 7.", "O voo está atrasado."], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "How many bags are you checking today?", options: ["Quantas malas você vai despachar hoje?", "Onde estão suas malas?", "Sua mala está muito pesada."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Can I see your passport, please?", accepted: ["can i see your passport please"] },
      ],
      conversation: {
        goal: "Faça o check-in: entregue o passaporte, despache a mala, escolha o assento e pergunte sobre o portão.",
        starter: "Good morning! Where are you flying to today?",
      },
      review: ["Frases do check-in: passport, bags, window/aisle.", "Pergunta indireta: Could you tell me where X is?", "delayed, canceled, boarding, gate."],
    }),

    buildLesson("a2-m5-l2", M, 2, {
      title: "No hotel",
      objective: "Fazer check-in e pedir serviços no hotel.",
      explanation: [
        {
          title: "Chegando",
          body: "**I have a reservation under the name Silva.** (Tenho uma reserva no nome Silva.) **I'd like to check in.** **What time is check-out?** **Is breakfast included?**",
        },
        {
          title: "Pedindo coisas: I'd like / Is there...?",
          body: "**I'd like** = eu gostaria (educado): **I'd like an extra towel.** **Is there a gym?** / **Are there any restaurants nearby?** (Tem algum restaurante perto?)",
        },
        {
          title: "Wi-Fi e senha",
          body: "**What's the Wi-Fi password?** Senha de Wi-Fi é **password**, e o quarto é **room**: **I'm in room 304.** (three-oh-four).",
        },
      ],
      vocabulary: [
        { en: "reservation", pt: "reserva", say: "re-zer-VÊI-shan" },
        { en: "check in", pt: "fazer o check-in", say: "TCHÉK ÍN" },
        { en: "check out", pt: "fazer o check-out", say: "TCHÉK ÁUT" },
        { en: "included", pt: "incluído", say: "in-CLÚ-did" },
        { en: "towel", pt: "toalha", say: "TÁU-el" },
        { en: "key card", pt: "cartão-chave", say: "KÍI card" },
        { en: "front desk", pt: "recepção", say: "FRÂNT DÉSK" },
        { en: "nearby", pt: "perto", say: "nír-BÁI" },
        { en: "password", pt: "senha", say: "PÉS-uord" },
      ],
      examples: [
        { en: "I have a reservation under the name Gomes.", pt: "Tenho uma reserva no nome Gomes." },
        { en: "Is breakfast included?", pt: "O café da manhã está incluído?" },
        { en: "Are there any pharmacies nearby?", pt: "Tem alguma farmácia aqui perto?" },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "I'd ___ a room for two nights.", translation: "Eu gostaria de um quarto para duas noites.", accepted: ["like"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Tem algum restaurante perto?\"", options: ["Is there any restaurants nearby?", "Are there any restaurants nearby?", "Have any restaurants nearby?"], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Qual é a senha do Wi-Fi?", accepted: ["What's the Wi-Fi password?", "What is the Wi-Fi password?", "What's the wifi password?", "What is the wifi password?"] },
        { type: "translate", skill: "writing", prompt: "A que horas é o check-out?", accepted: ["What time is check-out?", "What time is checkout?", "What time is check out?"] },
        { type: "word_order", skill: "grammar", prompt: "Eu tenho uma reserva no nome Costa.", answer: "I have a reservation under the name Costa.", distractors: ["in"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["towel", "toalha"], ["front desk", "recepção"], ["key card", "cartão-chave"], ["nearby", "perto"]] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Breakfast is served from seven to ten in the lobby.", options: ["O café é servido das 7 às 10 no saguão.", "O café não está incluído.", "O café é servido no quarto."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Is breakfast included?", accepted: ["is breakfast included"] },
      ],
      conversation: {
        goal: "Faça o check-in no hotel, pergunte sobre café da manhã e Wi-Fi e peça algo para o quarto.",
        starter: "Good evening, welcome to the Harbor Hotel. Do you have a reservation?",
      },
      review: ["I have a reservation under the name...", "I'd like... / Is there...? / Are there any...?", "check in, check out, included, front desk."],
    }),

    buildLesson("a2-m5-l3", M, 3, {
      title: "Turismo pela cidade",
      objective: "Pedir e entender informações turísticas e direções.",
      explanation: [
        {
          title: "Pedindo informações",
          body: "**What's worth seeing here?** (O que vale a pena ver aqui?) · **How do I get to the museum?** · **Is it far from here?** · **Can I walk there?**",
        },
        {
          title: "Entendendo o caminho",
          body: "O imperativo dá as instruções: **Go straight ahead**, **turn left/right**, **take the second street on the left**, **cross the bridge**. Sequenciadores: **first, then, after that, when you get to...**",
        },
        {
          title: "Transporte",
          body: "**take the subway / the bus / a taxi** · **get on / get off** (subir / descer do transporte): **Get off at the third stop.**",
        },
      ],
      vocabulary: [
        { en: "worth seeing", pt: "vale a pena ver", say: "UÂRTH SÍI-ing" },
        { en: "How do I get to...?", pt: "Como chego a...?", say: "RÁU du ái GUÉT tu" },
        { en: "go straight ahead", pt: "siga em frente", say: "gou STRÊIT a-RÉD" },
        { en: "turn left", pt: "vire à esquerda", say: "TÂRN LÉFT" },
        { en: "turn right", pt: "vire à direita", say: "TÂRN RÁIT" },
        { en: "corner", pt: "esquina", say: "CÓR-ner" },
        { en: "get off", pt: "descer (do transporte)", say: "guét ÓF" },
        { en: "stop", pt: "ponto / parada", say: "STÓP" },
        { en: "ticket", pt: "ingresso / bilhete", say: "TÍ-ket" },
        { en: "far", pt: "longe", say: "FÁR" },
      ],
      examples: [
        { en: "How do I get to the old town?", pt: "Como chego ao centro histórico?" },
        { en: "Go straight ahead and turn right at the corner.", pt: "Siga em frente e vire à direita na esquina." },
        { en: "Take bus 15 and get off at the third stop.", pt: "Pegue o ônibus 15 e desça no terceiro ponto." },
      ],
      exercises: [
        { type: "fill_blank", skill: "vocabulary", sentence: "Turn ___ at the bank. (à esquerda)", accepted: ["left"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Get off at the next stop\" significa:", options: ["Suba no próximo ponto.", "Desça no próximo ponto.", "Espere no próximo ponto."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Como eu chego à estação?", accepted: ["How do I get to the station?", "How can I get to the station?"] },
        { type: "translate", skill: "writing", prompt: "É longe daqui?", accepted: ["Is it far from here?", "Is it far?"] },
        { type: "word_order", skill: "grammar", prompt: "O que vale a pena ver aqui?", answer: "What's worth seeing here?", distractors: ["is"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["corner", "esquina"], ["far", "longe"], ["ticket", "ingresso"], ["stop", "ponto"]] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Go straight ahead, cross the bridge and the museum is on your left.", options: ["Atravesse a ponte; o museu fica à esquerda.", "Vire à direita; o museu fica atrás da ponte.", "O museu está fechado."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Can I walk there?", accepted: ["can i walk there"] },
      ],
      conversation: {
        goal: "Você é turista: pergunte o que vale a pena ver e como chegar lá a pé ou de transporte.",
        starter: "Hi! Are you visiting the city? Can I help you find something?",
      },
      review: ["How do I get to...? / Is it far?", "go straight, turn left/right, at the corner.", "take the bus, get off at..."],
    }),

    buildLesson("a2-m5-l4", M, 4, {
      title: "Problemas na viagem",
      objective: "Reclamar com educação e resolver um problema.",
      explanation: [
        {
          title: "Explicando o problema",
          body: "**There's a problem with my room.** · **The air conditioning doesn't work.** (não funciona) · **My luggage didn't arrive.** · **I was charged twice.** (Fui cobrado duas vezes.)",
        },
        {
          title: "Pedindo solução",
          body: "**Can you send someone to fix it?** · **Could I change rooms?** · **I'd like a refund.** (Gostaria de reembolso.) · **What can you do about it?** Seja firme e educado: comece com **I'm sorry to bother you, but...**",
        },
      ],
      vocabulary: [
        { en: "problem with", pt: "problema com", say: "PRÓ-blem uidh" },
        { en: "doesn't work", pt: "não funciona", say: "DÂ-zent UÊRK" },
        { en: "broken", pt: "quebrado", say: "BRÔU-ken" },
        { en: "luggage", pt: "bagagem", say: "LÂ-guidj" },
        { en: "lost", pt: "perdido / extraviado", say: "LÓST" },
        { en: "refund", pt: "reembolso", say: "RÍ-fând" },
        { en: "charge", pt: "cobrar", say: "TCHÁRDJ" },
        { en: "fix", pt: "consertar", say: "FÍKS" },
        { en: "complaint", pt: "reclamação", say: "com-PLÊINT" },
      ],
      examples: [
        { en: "Sorry to bother you, but the shower doesn't work.", pt: "Desculpe incomodar, mas o chuveiro não funciona." },
        { en: "My luggage didn't arrive. Can you help me?", pt: "Minha bagagem não chegou. Você pode me ajudar?" },
        { en: "I was charged twice for the same meal.", pt: "Fui cobrado duas vezes pela mesma refeição." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "The TV ___ work.", translation: "A TV não funciona.", accepted: ["doesn't", "does not"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Você quer o seu dinheiro de volta:", options: ["I'd like a refund.", "I'd like a receipt.", "I'd like a reservation."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Posso trocar de quarto?", accepted: ["Could I change rooms?", "Can I change rooms?", "Could I change my room?", "Can I change my room?"] },
        { type: "translate", skill: "writing", prompt: "Há um problema com a minha conta.", accepted: ["There's a problem with my bill.", "There is a problem with my bill.", "There's a problem with my account."] },
        { type: "word_order", skill: "grammar", prompt: "Você pode mandar alguém para consertar?", answer: "Can you send someone to fix it?", distractors: ["for"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["broken", "quebrado"], ["luggage", "bagagem"], ["fix", "consertar"], ["complaint", "reclamação"]] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I'm sorry, we can move you to another room right now.", options: ["Podemos mudar você de quarto agora.", "Não temos outro quarto.", "Você precisa pagar mais."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "My luggage didn't arrive.", accepted: ["my luggage didn't arrive", "my luggage did not arrive"] },
      ],
      conversation: {
        goal: "Reclame na recepção de um problema no quarto e negocie uma solução.",
        starter: "Front desk, good evening. How can I help you?",
      },
      review: ["There's a problem with... / ... doesn't work.", "Can you fix it? / Could I change rooms? / I'd like a refund.", "Comece com: Sorry to bother you, but..."],
    }),

    buildLesson("a2-m5-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Viagem",
      objective: "Comprovar que você se vira no aeroporto, no hotel e na cidade.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a pergunta educada correta.", options: ["Do you know where is the bathroom?", "Do you know where the bathroom is?"], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Eu gostaria de um assento na janela.", accepted: ["I'd like a window seat.", "I would like a window seat.", "I'd like a window seat, please."] },
        { type: "fill_blank", skill: "grammar", sentence: "Is ___ a supermarket near here?", accepted: ["there"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Our flight is canceled.\"", options: ["Nosso voo está atrasado.", "Nosso voo foi cancelado.", "Nosso voo está embarcando."], answer: 1 },
        { type: "word_order", skill: "grammar", prompt: "Vire à direita na segunda esquina.", answer: "Turn right at the second corner." },
        { type: "translate", skill: "writing", prompt: "O ar-condicionado não funciona.", accepted: ["The air conditioning doesn't work.", "The air conditioner doesn't work.", "The AC doesn't work.", "The air conditioning does not work."] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Get ___ at the next stop.", translation: "Desça no próximo ponto.", accepted: ["off"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Check-out is at eleven, and breakfast is not included.", options: ["Check-out às 11; café não incluído.", "Check-out às 12; café incluído.", "Check-in às 11."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "How do I get to the beach?", accepted: ["how do i get to the beach"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["gate", "portão"], ["towel", "toalha"], ["refund", "reembolso"], ["corner", "esquina"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
