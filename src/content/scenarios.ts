import type { CefrLevel } from "./types";
/**
 * Conversa Livre / English in Real Life: situações com personagens.
 * Cada cenário funciona em qualquer nível (A1–C2); o nível ajusta a fala do personagem.
 */
export interface AvatarLook {
  skin: string;
  hair: string;
  hairStyle: "short" | "long" | "bun" | "curly" | "buzz" | "ponytail";
  shirt: string;
  bg: string;
  accessory?: "apron" | "cap" | "glasses" | "headset" | "tie" | "scrubs" | "vest";
}

export type CharacterVoice = "f1" | "f2" | "f3" | "m1" | "m2" | "m3";

/** Ambiente visual da cena. */
export type Place = "cafe" | "restaurant" | "airport" | "supermarket" | "office" | "street" | "hotel" | "hospital" | "store" | "home" | "car";

export const CATEGORIES = ["Cafés e restaurantes", "Rua e social", "Mercado e compras", "Viagens", "Trabalho", "Vida cotidiana", "Saúde"] as const;
export type Category = (typeof CATEGORIES)[number];

interface BaseScenario {
  id: string;
  title: string; // em português, como o aluno escolhe
  category: string;
  character: { name: string; role: string; look: AvatarLook; voice: CharacterVoice };
  /** Situação e papel do personagem (em inglês, para a IA). */
  setting: string;
  /** Objetivos que o aluno deve cumprir (em português). */
  goals: string[];
  /** Primeira fala do personagem. */
  opener: string;
}

export interface Scenario extends Omit<BaseScenario, "category"> {
  category: Category;
  place: Place;
  /** Missão em português, como o aluno lê antes de começar. */
  mission_pt: string;
  /** Complicações reais que o personagem pode criar a partir do B1 (em inglês, para a IA). */
  challenges: string[];
  /** O que muda a partir do B1, em português. */
  challenge_pt: string;
}

const S = (s: BaseScenario) => s;

const BASE: BaseScenario[] = [
  S({
    id: "new-friend", title: "Fazer um novo amigo", category: "Social",
    character: { name: "Maya", role: "estudante de intercâmbio", voice: "f1", look: { skin: "#8d5524", hair: "#1b1b1b", hairStyle: "curly", shirt: "#7fb069", bg: "#f6c177" } },
    setting: "You are Maya, a friendly exchange student from Seattle who just met the student at a language meetup in São Paulo. You are curious about Brazil and love music and food.",
    goals: ["Apresentar-se", "Dizer de onde é e o que faz", "Descobrir um interesse em comum", "Combinar de se encontrar de novo"],
    opener: "Hi! I don't think we've met. I'm Maya. What's your name?",
  }),
  S({
    id: "burger", title: "Na hamburgueria", category: "Compras",
    character: { name: "Joe", role: "atendente", voice: "m1", look: { skin: "#f1c27d", hair: "#c0392b", hairStyle: "short", shirt: "#e74c3c", bg: "#ffd166", accessory: "cap" } },
    setting: "You are Joe, a cashier at a busy burger place in Chicago. Take the order, ask about size, sides, drinks, sauces, for here or to go, and the payment. Occasionally mention a combo deal or that an item is sold out.",
    goals: ["Pedir um lanche", "Escolher acompanhamento e bebida", "Responder 'for here or to go?'", "Pagar"],
    opener: "Hey there! Welcome to Big Joe's. What can I get for you today?",
  }),
  S({
    id: "restaurant", title: "No restaurante", category: "Compras",
    character: { name: "Sofia", role: "garçonete", voice: "f2", look: { skin: "#e0ac69", hair: "#3b2219", hairStyle: "ponytail", shirt: "#2c3e50", bg: "#a8dadc", accessory: "apron" } },
    setting: "You are Sofia, a waitress at an Italian restaurant in New York. Greet, offer drinks, explain the specials, take the order, handle a problem (the dish came cold or wrong) and bring the check.",
    goals: ["Pedir bebida e prato", "Perguntar sobre o cardápio", "Reclamar de um problema com educação", "Pedir a conta"],
    opener: "Good evening and welcome! Can I start you off with something to drink?",
  }),
  S({
    id: "cafe", title: "Em um café", category: "Compras",
    character: { name: "Leo", role: "barista", voice: "m3", look: { skin: "#ffdbac", hair: "#2d2d2d", hairStyle: "short", shirt: "#ffffff", bg: "#cdb4db", accessory: "apron" } },
    setting: "You are Leo, a barista at a cozy coffee shop in New York. Take the order, ask about milk options, size and name for the cup, and chat a little.",
    goals: ["Pedir um café do seu jeito", "Escolher tamanho e leite", "Dizer seu nome para o copo", "Fazer um pouco de small talk"],
    opener: "Morning! What can I get started for you?",
  }),
  S({
    id: "sneaker-store", title: "Na loja de tênis", category: "Compras",
    character: { name: "Kai", role: "vendedora", voice: "f3", look: { skin: "#f5d0b5", hair: "#9be3d0", hairStyle: "bun", shirt: "#1d3557", bg: "#e9c46a" } },
    setting: "You are Kai, a salesperson at a sneaker store in Los Angeles. Help find a size, suggest models, talk about colors and price, mention a discount, and handle trying on and paying.",
    goals: ["Pedir um tamanho", "Perguntar preço e cores", "Experimentar", "Decidir e pagar"],
    opener: "Hi! Are you looking for anything in particular today?",
  }),
  S({
    id: "taxi", title: "No táxi / Uber", category: "Viagem",
    character: { name: "Marcus", role: "motorista", voice: "m2", look: { skin: "#5c3a21", hair: "#111111", hairStyle: "buzz", shirt: "#457b9d", bg: "#bde0fe" } },
    setting: "You are Marcus, a chatty rideshare driver in Miami. Confirm the destination, ask about the route, chat about the city and the weather, and handle a request to change the route or stop somewhere.",
    goals: ["Confirmar o destino", "Perguntar quanto tempo/quanto custa", "Pedir para mudar a rota", "Conversar sobre a cidade"],
    opener: "Hey, how's it going? You're going to the Hilton downtown, right?",
  }),
  S({
    id: "airport", title: "No aeroporto", category: "Viagem",
    character: { name: "Grace", role: "atendente de check-in", voice: "f3", look: { skin: "#ffe0bd", hair: "#d4a373", hairStyle: "bun", shirt: "#264653", bg: "#90e0ef", accessory: "tie" } },
    setting: "You are Grace, an airline check-in agent at JFK airport. Ask for the passport, destination, bags, seat preference, and explain the gate and boarding time. Sometimes the bag is overweight or the flight is delayed.",
    goals: ["Fazer check-in", "Despachar bagagem", "Escolher assento", "Entender portão e horário de embarque"],
    opener: "Good morning! Where are you flying to today? Can I see your passport, please?",
  }),
  S({
    id: "immigration", title: "Na imigração", category: "Viagem",
    character: { name: "Officer Brown", role: "agente de imigração", voice: "m2", look: { skin: "#c68642", hair: "#3d2b1f", hairStyle: "buzz", shirt: "#1d3557", bg: "#adb5bd", accessory: "vest" } },
    setting: "You are Officer Brown, a polite but serious immigration officer at a US airport. Ask about the purpose of the trip, length of stay, where they will stay, their job and round-trip ticket.",
    goals: ["Dizer o motivo da viagem", "Dizer quanto tempo vai ficar", "Informar onde vai se hospedar", "Responder com calma e clareza"],
    opener: "Next, please. Passport. What's the purpose of your visit?",
  }),
  S({
    id: "hotel", title: "No hotel", category: "Viagem",
    character: { name: "Daniel", role: "recepcionista", voice: "m3", look: { skin: "#f1c27d", hair: "#000000", hairStyle: "short", shirt: "#6d597a", bg: "#ffcad4", accessory: "tie" } },
    setting: "You are Daniel, a hotel receptionist in Chicago. Handle check-in, explain breakfast and Wi-Fi, and help with requests or problems (noisy room, broken air conditioning, late checkout).",
    goals: ["Fazer check-in", "Perguntar sobre café da manhã e Wi-Fi", "Resolver um problema no quarto", "Pedir late checkout"],
    opener: "Hello and welcome to the Riverside Hotel! Do you have a reservation with us?",
  }),
  S({
    id: "supermarket", title: "No supermercado", category: "Compras",
    character: { name: "Rosa", role: "funcionária", voice: "f2", look: { skin: "#d8a47f", hair: "#5e3023", hairStyle: "long", shirt: "#2a9d8f", bg: "#f4a261", accessory: "apron" } },
    setting: "You are Rosa, an employee at a supermarket in Los Angeles. Help the student find products, explain aisles, prices, discounts and checkout options.",
    goals: ["Perguntar onde fica um produto", "Perguntar preço e promoções", "Pagar no caixa"],
    opener: "Hi there! Can I help you find something?",
  }),
  S({
    id: "pharmacy", title: "Na farmácia", category: "Saúde",
    character: { name: "Dr. Patel", role: "farmacêutico", voice: "m1", look: { skin: "#a0673f", hair: "#1a1a1a", hairStyle: "short", shirt: "#ffffff", bg: "#b7e4c7", accessory: "glasses" } },
    setting: "You are Dr. Patel, a pharmacist in Boston. Ask about symptoms, how long, allergies, recommend an over-the-counter option and explain how to take it. Never give dangerous advice; suggest a doctor when appropriate.",
    goals: ["Explicar seus sintomas", "Dizer há quanto tempo", "Perguntar como tomar o remédio"],
    opener: "Hello! How can I help you today?",
  }),
  S({
    id: "doctor", title: "No médico", category: "Saúde",
    character: { name: "Dr. Kim", role: "médica", voice: "f1", look: { skin: "#f3d2b3", hair: "#0d0d0d", hairStyle: "ponytail", shirt: "#4cc9f0", bg: "#dee2e6", accessory: "scrubs" } },
    setting: "You are Dr. Kim, a primary care doctor in Seattle. Take a medical history: symptoms, pain level, duration, medication, allergies, and give simple next steps. Keep it realistic and calm.",
    goals: ["Descrever o problema", "Responder perguntas sobre dor e tempo", "Entender as orientações"],
    opener: "Hi, please have a seat. So, what brings you in today?",
  }),
  S({
    id: "job-interview", title: "Entrevista de emprego", category: "Trabalho",
    character: { name: "Ms. Carter", role: "recrutadora", voice: "f2", look: { skin: "#ffdbac", hair: "#6c4f3d", hairStyle: "bun", shirt: "#343a40", bg: "#caf0f8", accessory: "glasses" } },
    setting: "You are Ms. Carter, a recruiter at a tech company in Berlin interviewing for a role the student chooses. Ask about experience, strengths, weaknesses, a challenge they solved, salary expectations and questions for you.",
    goals: ["Apresentar sua experiência", "Falar de pontos fortes e fracos", "Contar um desafio que resolveu", "Fazer perguntas à empresa"],
    opener: "Thanks for coming in today. To start, could you tell me a little about yourself?",
  }),
  S({
    id: "meeting", title: "Reunião de trabalho", category: "Trabalho",
    character: { name: "Tom", role: "gerente de projeto", voice: "m1", look: { skin: "#e8beac", hair: "#f2cc8f", hairStyle: "short", shirt: "#3a86ff", bg: "#ffe5d9", accessory: "headset" } },
    setting: "You are Tom, a project manager running an online team meeting. Ask for a status update, discuss a delay, ask for opinions and agree on next steps.",
    goals: ["Dar um status do seu trabalho", "Explicar um atraso", "Dar sua opinião", "Combinar próximos passos"],
    opener: "Okay, let's get started. Could you give us a quick update on your part of the project?",
  }),
  S({
    id: "apartment", title: "Alugando um apartamento", category: "Dia a dia",
    character: { name: "Linda", role: "corretora", voice: "f1", look: { skin: "#ffe0bd", hair: "#b5838d", hairStyle: "long", shirt: "#e76f51", bg: "#e9edc9" } },
    setting: "You are Linda, a real estate agent showing an apartment in Boston. Explain rooms, rent, deposit, bills, lease length and rules (pets, noise), and answer questions.",
    goals: ["Perguntar o valor do aluguel e o que inclui", "Perguntar sobre contrato e depósito", "Negociar algo"],
    opener: "Welcome! So this is the apartment. What do you think so far?",
  }),
  S({
    id: "phone-call", title: "Ligação telefônica", category: "Trabalho",
    character: { name: "Sam", role: "atendente de suporte", voice: "m2", look: { skin: "#c68642", hair: "#2b2d42", hairStyle: "curly", shirt: "#8338ec", bg: "#ffbe0b", accessory: "headset" } },
    setting: "You are Sam, a customer service agent on the phone for an internet provider. Verify identity (name, date of birth — never ask for passwords or card numbers), understand the problem and offer a solution or a technician visit.",
    goals: ["Explicar o problema por telefone", "Soletrar seu nome", "Agendar uma solução"],
    opener: "Thank you for calling FastNet support, this is Sam speaking. How can I help you today?",
  }),
  S({
    id: "daily-life", title: "Conversa sobre o dia a dia", category: "Social",
    character: { name: "Ben", role: "vizinho", voice: "m3", look: { skin: "#f1c27d", hair: "#6f4e37", hairStyle: "short", shirt: "#52b788", bg: "#ffd6a5" } },
    setting: "You are Ben, the student's friendly neighbor. Chat about daily routine, work, weekend plans, hobbies, family and the news of the neighborhood.",
    goals: ["Falar da sua rotina", "Contar o que fez no fim de semana", "Perguntar sobre a vida do Ben"],
    opener: "Hey, neighbor! How's your week going so far?",
  }),
  S({
    id: "job-abroad", title: "Procurar emprego no exterior", category: "Trabalho",
    character: { name: "Aisha", role: "consultora de carreira", voice: "f3", look: { skin: "#7a4b2a", hair: "#121212", hairStyle: "bun", shirt: "#ef476f", bg: "#d8f3dc" } },
    setting: "You are Aisha, a career consultant in New York helping a Brazilian professional plan a move abroad: CV, LinkedIn, visas (general info only), interviews and cultural tips.",
    goals: ["Explicar sua área e experiência", "Perguntar sobre currículo e vistos", "Montar um plano"],
    opener: "Hi! So you're thinking about working abroad. Tell me, what do you do now?",
  }),
];

type Extra = Pick<Scenario, "category" | "place" | "mission_pt" | "challenges" | "challenge_pt">;
const X = (category: Category, place: Place, mission_pt: string, challenge_pt: string, challenges: string[]): Extra => ({ category, place, mission_pt, challenge_pt, challenges });

const EXTRA: Record<string, Extra> = {
  "new-friend": X("Rua e social", "street", "Você está num encontro de idiomas em São Paulo e conhece a Maya. Seu objetivo é se apresentar, descobrir algo em comum e combinar de se ver de novo.", "A Maya fala mais rápido, usa gírias leves e muda de assunto.", ["Maya uses a slang word the student may not know", "Maya suggests a plan on a day the student is busy"]),
  burger: X("Cafés e restaurantes", "restaurant", "Você está numa hamburgueria em Chicago. Seu objetivo é pedir um lanche com acompanhamento e bebida, responder se é para comer ali ou levar e pagar.", "Um item acabou, o combo muda o preço e você precisa pedir para tirar um ingrediente.", ["the burger the student wants is sold out", "the student must ask to remove an ingredient (onions, pickles)", "the card machine is not working, ask for cash or another card"]),
  restaurant: X("Cafés e restaurantes", "restaurant", "Você está num restaurante italiano em Nova York. Seu objetivo é pedir bebida e prato, perguntar sobre o cardápio e pedir a conta.", "O prato chega errado ou frio e você precisa reclamar com educação e resolver.", ["the dish arrives wrong or cold", "there is an unexpected service charge on the check", "the kitchen is out of the special"]),
  cafe: X("Cafés e restaurantes", "cafe", "Você entrou numa cafeteria em Nova York. Seu objetivo é pedir um café, escolher o tamanho e o tipo de leite, perguntar o preço e dizer seu nome para o copo.", "O barista entende errado o pedido ou o nome, oferece algo diferente e faz small talk mais rápido.", ["the barista mishears the order or the name", "they ran out of oat milk", "the barista asks if the student wants to try the new seasonal drink"]),
  "sneaker-store": X("Mercado e compras", "store", "Você está numa loja de tênis em Los Angeles. Seu objetivo é pedir seu tamanho, perguntar preço e cores, experimentar e pagar.", "Seu tamanho não tem na cor que você quer e você precisa negociar uma alternativa ou desconto.", ["the size is not available in that color", "the discount only applies to some models", "the student needs to ask about the return policy"]),
  taxi: X("Viagens", "car", "Você pegou um carro de aplicativo em Miami. Seu objetivo é confirmar o destino, perguntar quanto tempo leva e conversar sobre a cidade.", "Tem trânsito, o motorista sugere outra rota e você precisa pedir uma parada no caminho.", ["heavy traffic, the driver suggests a different route", "the student needs to stop at a pharmacy on the way", "the address is slightly wrong"]),
  airport: X("Viagens", "airport", "Você está no balcão da companhia aérea no aeroporto JFK. Seu objetivo é fazer check-in, despachar a mala, escolher o assento e entender o portão e o horário de embarque.", "A mala está acima do peso ou o voo atrasou, e você precisa resolver.", ["the bag is 3 kg overweight", "the flight is delayed by two hours", "the student's preferred seat is not available"]),
  immigration: X("Viagens", "airport", "Você chegou aos Estados Unidos e está na imigração. Seu objetivo é explicar o motivo da viagem, quanto tempo vai ficar e onde vai se hospedar.", "O agente faz perguntas mais detalhadas e desconfiadas e pede comprovantes.", ["the officer asks for the round-trip ticket and hotel booking", "the officer asks follow-up questions about the student's job"]),
  hotel: X("Viagens", "hotel", "Você chegou a um hotel em Chicago. Seu objetivo é fazer check-in, perguntar sobre café da manhã e Wi-Fi e resolver um problema no quarto.", "O quarto não está pronto, há barulho ou o ar-condicionado quebrou, e você negocia uma solução.", ["the room is not ready yet", "the room is noisy and the hotel is almost full", "late checkout costs extra"]),
  supermarket: X("Mercado e compras", "supermarket", "Você está num supermercado em Los Angeles. Seu objetivo é encontrar um produto, perguntar o preço e as promoções e pagar no caixa.", "O produto acabou, você precisa de uma alternativa e o pagamento dá problema.", ["the product is out of stock", "the price on the shelf is different from the price at the checkout", "the card is declined the first time"]),
  pharmacy: X("Saúde", "hospital", "Você está numa farmácia em Boston. Seu objetivo é explicar seus sintomas, dizer há quanto tempo está assim e entender como tomar o remédio.", "O farmacêutico faz perguntas sobre alergias e outros remédios e recomenda ir ao médico.", ["the pharmacist asks about allergies and other medication", "the medicine needs a prescription"]),
  doctor: X("Saúde", "hospital", "Você está numa consulta médica em Seattle. Seu objetivo é descrever o problema, responder sobre dor e duração e entender as orientações.", "A médica usa termos mais técnicos e você precisa pedir para explicar.", ["the doctor uses a medical term the student must ask about", "the doctor asks for detailed history"]),
  "job-interview": X("Trabalho", "office", "Você está numa entrevista de emprego numa empresa de tecnologia em Berlim. Seu objetivo é se apresentar, falar da sua experiência e fazer perguntas à empresa.", "A recrutadora faz perguntas difíceis (fraquezas, salário, conflito) e pede exemplos concretos.", ["the recruiter asks for a concrete example after a vague answer", "the recruiter asks about salary expectations", "the recruiter asks about a conflict with a colleague"]),
  meeting: X("Trabalho", "office", "Você está numa reunião online de projeto. Seu objetivo é dar o status do seu trabalho, explicar um atraso e combinar os próximos passos.", "Um colega discorda, o gerente pressiona pelo prazo e você precisa negociar.", ["a colleague disagrees with the student's plan", "the manager pushes for an earlier deadline"]),
  apartment: X("Vida cotidiana", "home", "Você está visitando um apartamento para alugar em Boston. Seu objetivo é perguntar o valor do aluguel, o que está incluído e as regras do contrato.", "A corretora diz que há outro interessado e você precisa negociar rápido.", ["another person is interested and the agent pressures for a quick decision", "pets are not allowed"]),
  "phone-call": X("Trabalho", "office", "Você ligou para o suporte da sua internet. Seu objetivo é explicar o problema por telefone, soletrar seu nome e agendar uma solução.", "A ligação corta, o atendente pede para repetir e o técnico só tem horário ruim.", ["the line is bad and the agent asks the student to repeat", "the only technician slot is at an inconvenient time"]),
  "daily-life": X("Vida cotidiana", "home", "Você encontrou seu vizinho Ben no corredor. Seu objetivo é falar da sua rotina, do fim de semana, do clima e dos seus hobbies.", "O Ben conta uma novidade do bairro e pede um favor.", ["Ben asks the student a favor (water the plants while he travels)", "Ben complains about noise from another apartment"]),
  "job-abroad": X("Trabalho", "office", "Você está numa consultoria de carreira em Nova York. Seu objetivo é explicar sua área, perguntar sobre currículo e vistos e montar um plano.", "A consultora questiona seu plano e pede prioridades realistas.", ["the consultant challenges an unrealistic plan", "the consultant asks the student to summarize their main achievement in one sentence"]),
  directions: X("Rua e social", "street", "Você está perdido no centro de Edimburgo. Seu objetivo é perguntar como chegar a um lugar, entender as direções e confirmar a distância.", "A pessoa dá direções mais longas e rápidas, com pontos de referência, e você precisa confirmar.", ["the directions include landmarks and several turns", "the place the student wants is closed today; suggest another"]),
  "ask-help": X("Rua e social", "street", "Seu celular descarregou em Chicago e você precisa de ajuda. Seu objetivo é pedir ajuda a um desconhecido com educação, explicar a situação e agradecer.", "A pessoa está com pressa, desconfia no começo e você precisa ser claro e educado.", ["the stranger is in a hurry and hesitant at first", "the stranger suggests a different solution"]),
  "tourist-info": X("Rua e social", "street", "Você está num posto de informações turísticas em Nova York. Seu objetivo é perguntar o que fazer na cidade, horários e como chegar.", "Os horários mudaram, há obras no metrô e você precisa planejar outra opção.", ["a museum is closed on that day", "there is subway maintenance and the student needs another route"]),
  "return-item": X("Mercado e compras", "store", "Você voltou a uma loja para trocar um produto com defeito. Seu objetivo é explicar o problema, mostrar o recibo e escolher entre troca ou reembolso.", "Você está sem a nota fiscal ou passou do prazo e precisa negociar.", ["the student lost the receipt", "the return period ended two days ago", "only store credit is offered"]),
  "lost-luggage": X("Viagens", "airport", "Sua mala não chegou no aeroporto de Lisboa. Seu objetivo é registrar o problema, descrever a mala e combinar a entrega.", "A atendente pede detalhes precisos e só consegue entregar em outra data.", ["the agent needs a detailed description of the bag", "delivery is only possible in two days"]),
  coworker: X("Trabalho", "office", "É seu primeiro dia num escritório em Denver e a colega Nina explica uma tarefa. Seu objetivo é entender a tarefa, dizer quando não entendeu e pedir ajuda.", "Ela fala rápido, usa siglas e dá várias instruções de uma vez.", ["Nina uses an acronym the student will not know", "Nina gives three instructions in one sentence", "Nina is interrupted by a call and the student must summarize what to do"]),
  "make-plans": X("Vida cotidiana", "home", "Seu amigo Jake ligou para combinar um programa. Seu objetivo é marcar dia, horário e lugar e confirmar o plano.", "Os horários não batem e vocês precisam encontrar uma alternativa.", ["Jake is only free on a day the student can't", "the restaurant they choose is fully booked"]),
};

const NEW: BaseScenario[] = [
  S({
    id: "directions", title: "Pedir informação na rua", category: "Rua e social",
    character: { name: "Olivia", role: "moradora da cidade", voice: "f2", look: { skin: "#f5d0b5", hair: "#a0522d", hairStyle: "long", shirt: "#3d5a80", bg: "#98c1d9" } },
    setting: "You are Olivia, a local in San Francisco walking down the street. A stranger asks you for directions. Give realistic directions (left, right, past the church, about ten minutes on foot) and react naturally.",
    goals: ["Pedir licença e perguntar o caminho", "Entender as direções", "Confirmar a distância ou o tempo", "Agradecer"],
    opener: "Oh, hi! You look a bit lost. Can I help you?",
  }),
  S({
    id: "ask-help", title: "Pedir ajuda a um desconhecido", category: "Rua e social",
    character: { name: "Chris", role: "pedestre", voice: "m1", look: { skin: "#8d5524", hair: "#1b1b1b", hairStyle: "buzz", shirt: "#e07a5f", bg: "#f2cc8f" } },
    setting: "You are Chris, a busy person walking to work in Chicago. A stranger approaches asking for help (dead phone, needs to find a station or call someone). Be a bit hesitant at first, then helpful.",
    goals: ["Chamar a atenção com educação", "Explicar o problema", "Pedir uma ajuda específica", "Agradecer"],
    opener: "Uh, sorry, I'm kind of in a hurry. What's up?",
  }),
  S({
    id: "tourist-info", title: "Perguntas sobre a cidade", category: "Rua e social",
    character: { name: "Hannah", role: "atendente de turismo", voice: "f1", look: { skin: "#ffe0bd", hair: "#e9c46a", hairStyle: "ponytail", shirt: "#2a9d8f", bg: "#e9edc9" } },
    setting: "You are Hannah, working at a tourist information desk in New York. Suggest things to do, opening hours, prices and how to get there by subway or on foot.",
    goals: ["Perguntar o que vale a pena visitar", "Perguntar horários e preços", "Perguntar como chegar"],
    opener: "Hi, welcome to NYC Visitor Information! What are you interested in seeing?",
  }),
  S({
    id: "return-item", title: "Trocar um produto", category: "Mercado e compras",
    character: { name: "Priya", role: "atendente de trocas", voice: "f3", look: { skin: "#a0673f", hair: "#121212", hairStyle: "bun", shirt: "#6d597a", bg: "#ffcad4" } },
    setting: "You are Priya at the customer service desk of an electronics store in Chicago. A customer wants to return or exchange a product. Ask what happened, ask for the receipt and explain the policy.",
    goals: ["Explicar o defeito", "Mostrar o recibo", "Escolher troca ou reembolso"],
    opener: "Hi there, how can I help you today?",
  }),
  S({
    id: "lost-luggage", title: "Bagagem extraviada", category: "Viagens",
    character: { name: "Ethan", role: "atendente de bagagens", voice: "m3", look: { skin: "#e8beac", hair: "#4a4e69", hairStyle: "short", shirt: "#22223b", bg: "#c9ada7", accessory: "vest" } },
    setting: "You are Ethan at the lost baggage desk at Lisbon airport. Ask for the flight, the baggage tag, a description of the bag, where the passenger is staying and a phone number (never ask for card numbers or passwords).",
    goals: ["Explicar que a mala não chegou", "Descrever a mala", "Combinar como ela vai ser entregue"],
    opener: "Hello. I'm sorry to hear your bag didn't arrive. Can I see your baggage tag?",
  }),
  S({
    id: "coworker", title: "Colega explica uma tarefa", category: "Trabalho",
    character: { name: "Nina", role: "colega de trabalho", voice: "f2", look: { skin: "#f3d2b3", hair: "#3a0ca3", hairStyle: "curly", shirt: "#4361ee", bg: "#caf0f8" } },
    setting: "You are Nina, a friendly but busy colleague in an office in Denver, explaining a task to a new team member on their first day (a report, a spreadsheet, a client email). The student should ask questions when they don't understand.",
    goals: ["Cumprimentar e se apresentar", "Dizer quando não entendeu", "Pedir para repetir ou explicar", "Confirmar o que precisa fazer"],
    opener: "Hey, welcome to the team! So, I need your help with the weekly sales report. Got a minute?",
  }),
  S({
    id: "make-plans", title: "Marcar um encontro", category: "Vida cotidiana",
    character: { name: "Jake", role: "amigo", voice: "m2", look: { skin: "#ffdbac", hair: "#6c4f3d", hairStyle: "curly", shirt: "#f77f00", bg: "#fcbf49" } },
    setting: "You are Jake, the student's friend, calling to make plans for the weekend (movies, dinner, a park). Discuss day, time and place, and be flexible but realistic about your schedule.",
    goals: ["Sugerir um programa", "Combinar dia e horário", "Escolher o lugar", "Confirmar o plano"],
    opener: "Hey! Are you free this weekend? We should do something.",
  }),
];

/** Situações do dia a dia (inglês para a vida toda, não só trabalho). */
const EVERYDAY: BaseScenario[] = [
  S({
    id: "bus-metro", title: "No ônibus ou metrô", category: "Vida cotidiana",
    character: { name: "Rosa", role: "passageira", voice: "f2", look: { skin: "#c68642", hair: "#2b2b2b", hairStyle: "bun", shirt: "#3d5a80", bg: "#e0fbfc" } },
    setting: "You are Rosa, a friendly local on the subway platform in New York. The student asks which train to take, where to buy or top up a card, how many stops, and where to change lines.",
    goals: ["Perguntar qual linha pegar", "Perguntar como comprar ou recarregar o cartão", "Confirmar onde descer ou fazer baldeação"],
    opener: "You look a bit lost. Can I help you?",
  }),
  S({
    id: "bank", title: "No banco", category: "Vida cotidiana",
    character: { name: "Mr. Clarke", role: "atendente do banco", voice: "m3", look: { skin: "#f1c27d", hair: "#5c4033", hairStyle: "short", shirt: "#1d3557", bg: "#a8dadc", accessory: "tie" } },
    setting: "You are Mr. Clarke, a bank clerk in New York helping a newcomer open a basic current account: explain the documents needed (ID, proof of address), the debit card, monthly fees and online banking. NEVER ask for passwords, PINs or full card numbers; if the student offers them, tell them never to share those.",
    goals: ["Dizer que quer abrir uma conta", "Perguntar quais documentos são necessários", "Perguntar sobre taxas e o cartão"],
    opener: "Good morning. How can I help you today?",
  }),
  S({
    id: "post-office", title: "Nos correios", category: "Vida cotidiana",
    character: { name: "Linda", role: "atendente dos correios", voice: "f1", look: { skin: "#ffdbac", hair: "#c0c0c0", hairStyle: "short", shirt: "#e63946", bg: "#f1faee", accessory: "glasses" } },
    setting: "You are Linda at a post office in Philadelphia. The student wants to send a package to Brazil: ask what's inside, weigh it, explain options (standard or express), prices, delivery time and tracking, and the customs form.",
    goals: ["Dizer o que quer enviar e para onde", "Escolher o tipo de envio", "Perguntar prazo e rastreamento"],
    opener: "Next, please! What can I do for you?",
  }),
  S({
    id: "gym", title: "Na academia", category: "Vida cotidiana",
    character: { name: "Marcus", role: "recepcionista da academia", voice: "m2", look: { skin: "#8d5524", hair: "#1b1b1b", hairStyle: "buzz", shirt: "#2a9d8f", bg: "#e9f5db" } },
    setting: "You are Marcus at the front desk of a gym in Miami. A new person wants to join: explain membership plans, opening hours, classes (yoga, spinning), a free trial and what to bring.",
    goals: ["Perguntar sobre planos e preços", "Perguntar horários e aulas", "Pedir uma aula experimental"],
    opener: "Hey, welcome to FitLife! Are you interested in joining?",
  }),
  S({
    id: "hairdresser", title: "No cabeleireiro ou barbeiro", category: "Vida cotidiana",
    character: { name: "Tony", role: "cabeleireiro", voice: "m1", look: { skin: "#e8beac", hair: "#2d2d2d", hairStyle: "curly", shirt: "#ffb703", bg: "#fff1e6", accessory: "apron" } },
    setting: "You are Tony, a chatty hairdresser in Chicago. Ask how the student wants their hair (shorter, just a trim, sides, fringe), confirm details, make small talk and say the price.",
    goals: ["Explicar o corte que quer", "Responder ao small talk", "Confirmar o resultado e pagar"],
    opener: "Hi! Take a seat. So, what are we doing today?",
  }),
  S({
    id: "neighbour", title: "Conversa com o vizinho", category: "Rua e social",
    character: { name: "Mrs. Patel", role: "vizinha", voice: "f3", look: { skin: "#a0673f", hair: "#3b3b3b", hairStyle: "long", shirt: "#9d4edd", bg: "#ffe5ec" } },
    setting: "You are Mrs. Patel, the student's friendly new neighbor in Chicago. Chat in the hallway: introductions, the building, trash collection day, the noise from a party last night, and offer help.",
    goals: ["Apresentar-se", "Perguntar sobre o prédio e o bairro", "Resolver com educação um assunto de barulho"],
    opener: "Oh, hello! You must be the new neighbor. I'm Mrs. Patel from 4B.",
  }),
  S({
    id: "party", title: "Numa festa de aniversário", category: "Rua e social",
    character: { name: "Olivia", role: "convidada da festa", voice: "f1", look: { skin: "#ffe0bd", hair: "#d4a373", hairStyle: "ponytail", shirt: "#ff006e", bg: "#fff3b0" } },
    setting: "You are Olivia, a guest at a friend's birthday party in Austin. Make small talk with the student: how they know the host, what they do, hobbies, food and music. Keep it light and fun.",
    goals: ["Puxar conversa", "Dizer como conhece o aniversariante", "Falar de hobbies", "Despedir-se com naturalidade"],
    opener: "Hi! Great party, right? How do you know Sam?",
  }),
  S({
    id: "complaint-call", title: "Reclamar com o atendimento (telefone)", category: "Vida cotidiana",
    character: { name: "Kevin", role: "atendente de telefone", voice: "m2", look: { skin: "#f3d2b3", hair: "#6c4f3d", hairStyle: "short", shirt: "#457b9d", bg: "#edf6f9", accessory: "headset" } },
    setting: "You are Kevin, a customer service agent for an internet provider. The student calls because the internet has been down for two days. Ask for the account name and address (never passwords or card numbers), run simple checks and offer a technician visit or a discount.",
    goals: ["Explicar o problema", "Dizer há quanto tempo acontece", "Pedir uma solução e combinar o próximo passo"],
    opener: "Thank you for calling NetFast, this is Kevin. How can I help you today?",
  }),
  S({
    id: "lost-wallet", title: "Perdi minha carteira", category: "Rua e social",
    character: { name: "Officer Diaz", role: "policial", voice: "f2", look: { skin: "#c68642", hair: "#1b1b1b", hairStyle: "bun", shirt: "#14213d", bg: "#e5e5e5", accessory: "cap" } },
    setting: "You are Officer Diaz at a police station in Miami. The student lost their wallet. Ask when and where it happened, what was inside, a description of the wallet and contact details; explain how to get a report number. Never ask for card numbers or passwords.",
    goals: ["Explicar o que aconteceu", "Descrever a carteira e o que havia nela", "Pedir o número do boletim"],
    opener: "Hi, how can I help you?",
  }),
  S({
    id: "dentist", title: "No dentista", category: "Saúde",
    character: { name: "Dr. Kim", role: "dentista", voice: "f3", look: { skin: "#ffe0bd", hair: "#1b1b1b", hairStyle: "bun", shirt: "#90e0ef", bg: "#caf0f8", accessory: "scrubs" } },
    setting: "You are Dr. Kim, a dentist in Seattle. Ask where it hurts, since when, if it hurts with cold or hot food, explain simply what you will do and when to come back.",
    goals: ["Explicar onde dói e desde quando", "Responder às perguntas da dentista", "Entender o tratamento e marcar o retorno"],
    opener: "Hello, have a seat. What brings you in today?",
  }),
  S({
    id: "delivery", title: "Pedido de delivery errado", category: "Cafés e restaurantes",
    character: { name: "Sam", role: "atendente do restaurante", voice: "m1", look: { skin: "#f1c27d", hair: "#e76f51", hairStyle: "short", shirt: "#f4a261", bg: "#fefae0" } },
    setting: "You are Sam, answering the phone at a pizza place in Boston. The student's delivery arrived wrong or incomplete. Apologize, ask what's missing, and offer to send the right order or a refund.",
    goals: ["Explicar o que veio errado", "Pedir o pedido certo ou reembolso", "Confirmar o tempo de entrega"],
    opener: "Tony's Pizza, Sam speaking. How can I help?",
  }),
  S({
    id: "small-talk", title: "Small talk no elevador", category: "Rua e social",
    character: { name: "Daniel", role: "vizinho de trabalho", voice: "m3", look: { skin: "#8d5524", hair: "#2b2b2b", hairStyle: "short", shirt: "#6a994e", bg: "#f2e8cf", accessory: "glasses" } },
    setting: "You are Daniel, someone the student often meets in the building's elevator in Seattle. Make short, natural small talk: the weather, the weekend, a local event. Keep replies short like real elevator conversations.",
    goals: ["Cumprimentar", "Comentar algo do dia (tempo, fim de semana)", "Encerrar com naturalidade"],
    opener: "Morning! Crazy weather today, isn't it?",
  }),
];

const EVERYDAY_EXTRA: Record<string, Extra> = {
  "bus-metro": X("Vida cotidiana", "street", "Você está numa estação de metrô em Nova York. Seu objetivo é descobrir qual linha pegar, como comprar o cartão e onde descer.", "A linha está em obras e você precisa de um caminho alternativo.", ["the line is closed for maintenance this weekend", "the student needs to change lines twice"]),
  bank: X("Vida cotidiana", "office", "Você está num banco em Nova York. Seu objetivo é abrir uma conta: perguntar documentos, taxas e como funciona o cartão.", "Falta um comprovante de endereço e você precisa entender a alternativa.", ["the student doesn't have proof of address yet", "there is a monthly fee unless the student deposits a minimum amount"]),
  "post-office": X("Vida cotidiana", "store", "Você está nos correios em Filadélfia. Seu objetivo é mandar um pacote para o Brasil, escolher o tipo de envio e entender prazo e rastreamento.", "O pacote passa do peso e há itens que não podem ir.", ["the package is over the weight limit for the cheaper option", "one item cannot be sent abroad (e.g. a battery)"]),
  gym: X("Vida cotidiana", "store", "Você está na recepção de uma academia em Miami. Seu objetivo é entender planos, horários e marcar uma aula experimental.", "O plano mais barato tem restrição de horário e há taxa de matrícula.", ["the cheapest plan only allows off-peak hours", "there is a joining fee this month"]),
  hairdresser: X("Vida cotidiana", "store", "Você está num salão em Chicago. Seu objetivo é explicar o corte que quer, conversar um pouco e pagar.", "O cabeleireiro entende errado o comprimento e você precisa corrigir com educação.", ["the hairdresser starts cutting shorter than the student wanted", "the price is higher than the sign"]),
  neighbour: X("Rua e social", "home", "Você encontra a vizinha no corredor do prédio em Chicago. Seu objetivo é se apresentar, perguntar sobre o prédio e resolver um assunto de barulho.", "A vizinha reclama de barulho e você precisa se desculpar ou explicar.", ["the neighbor complains about noise from the student's apartment", "the neighbor asks a favor (receiving a package)"]),
  party: X("Rua e social", "home", "Você está numa festa de aniversário em Austin. Seu objetivo é puxar conversa, contar como conhece o aniversariante e falar de hobbies.", "A conversa muda rápido de assunto e aparecem expressões informais.", ["Olivia uses an idiom the student may not know", "someone interrupts and the student has to join a group conversation"]),
  "complaint-call": X("Vida cotidiana", "home", "Você liga para a operadora de internet. Seu objetivo é explicar o problema, há quanto tempo acontece e conseguir uma solução.", "O atendente tenta encerrar sem resolver e você precisa insistir com educação.", ["the agent suggests restarting the router for the third time", "the technician can only come next week"]),
  "lost-wallet": X("Rua e social", "street", "Você está numa delegacia em Miami. Seu objetivo é explicar que perdeu a carteira, descrevê-la e pedir o número do boletim.", "A policial faz perguntas detalhadas de horário e lugar.", ["the officer asks for the exact time and place", "the student needs to explain what documents were inside"]),
  dentist: X("Saúde", "hospital", "Você está no dentista em Seattle. Seu objetivo é explicar a dor e entender o tratamento.", "A dentista usa termos técnicos e fala de custos.", ["the dentist uses a term like 'filling' or 'root canal'", "the treatment needs two appointments"]),
  delivery: X("Cafés e restaurantes", "home", "Seu delivery chegou errado. Seu objetivo é ligar, explicar o que veio errado e conseguir o pedido certo ou reembolso.", "O restaurante quer dar só um cupom e você negocia.", ["the restaurant offers only a coupon instead of a refund", "the new delivery will take an hour"]),
  "small-talk": X("Rua e social", "office", "Você encontra o Daniel no elevador em Seattle. Seu objetivo é fazer small talk rápido e natural.", "O Daniel puxa um assunto inesperado e o elevador é rápido: respostas curtas.", ["Daniel mentions a local event the student hasn't heard of", "Daniel asks about the student's weekend plans"]),
};

export const SCENARIOS: Scenario[] = [...BASE, ...NEW, ...EVERYDAY].map((s) => ({ ...s, ...(EXTRA[s.id] ?? EVERYDAY_EXTRA[s.id]) }));

/** Missão adaptada ao nível: no A1–A2 a cena é simples; do B1 em diante surgem complicações reais. */
export function missionFor(s: Scenario, level: string): { mission: string; challenge: string | null } {
  const advanced = !["A1", "A2"].includes(level);
  return { mission: s.mission_pt, challenge: advanced ? s.challenge_pt : null };
}

export const getScenario = (id: string) => SCENARIOS.find((s) => s.id === id);

/** Personagem genérico para situações criadas pelo aluno. */
export const CUSTOM_CHARACTER: Scenario["character"] = {
  name: "Robin",
  role: "personagem da sua cena",
  voice: "f2",
  look: { skin: "#e0ac69", hair: "#264653", hairStyle: "ponytail", shirt: "#f4a261", bg: "#bde0fe" },
};

/**
 * Abertura por nível: no A1 a primeira fala do personagem é curta e previsível (A1 de verdade).
 * Do A2 em diante usa a abertura natural da cena. A conversa em si se adapta pelo prompt de nível.
 */
const OPENER_A1: Record<string, string> = {
  "new-friend": "Hi! I'm Maya. What's your name?",
  burger: "Hello! What do you want to eat?",
  restaurant: "Good evening! A table for one?",
  cafe: "Good morning! What do you want to drink?",
  "sneaker-store": "Hello! Do you need help?",
  taxi: "Hello! Where do you want to go?",
  airport: "Good morning! Your passport, please.",
  immigration: "Hello. Passport, please. Where are you from?",
  hotel: "Hello! Welcome. What is your name?",
  supermarket: "Hi! Can I help you?",
  pharmacy: "Hello! How can I help you?",
  doctor: "Hello. Sit down, please. What is the problem?",
  "job-interview": "Hello! Nice to meet you. What is your name?",
  meeting: "Good morning, everyone. How are you today?",
  apartment: "Hello! This is the apartment. Do you like it?",
  "phone-call": "Hello, FastNet. How can I help you?",
  "daily-life": "Hi, neighbor! How are you today?",
  "job-abroad": "Hello! What is your job?",
  directions: "Hi! Are you lost? Can I help you?",
  "ask-help": "Sorry, I am busy. What is it?",
  "tourist-info": "Hello! What do you want to see?",
  "return-item": "Hello! How can I help you?",
  "lost-luggage": "Hello. Is your bag lost? What color is it?",
  coworker: "Hi! Welcome to the team. Do you have a minute?",
  "make-plans": "Hey! Are you free on Saturday?",
  "bus-metro": "Hi! Where do you want to go?",
  bank: "Good morning. How can I help you?",
  "post-office": "Hello! What do you want to send?",
  gym: "Hi! Welcome to FitLife. Do you want to join?",
  hairdresser: "Hi! Sit down, please. Short or long?",
  neighbour: "Hello! Are you the new neighbor? I'm Mrs. Patel.",
  party: "Hi! Nice party! Who are you?",
  "complaint-call": "Hello, NetFast. What is the problem?",
  "lost-wallet": "Hello. How can I help you?",
  dentist: "Hello. Sit down, please. Where does it hurt?",
  delivery: "Hello, Tony's Pizza. How can I help?",
  "small-talk": "Good morning! It's cold today, right?",
};

export function openerFor(s: Pick<Scenario, "id" | "opener">, level: CefrLevel): string {
  return level === "A1" ? (OPENER_A1[s.id] ?? s.opener) : s.opener;
}
