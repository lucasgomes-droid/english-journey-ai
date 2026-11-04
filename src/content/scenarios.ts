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

export interface Scenario {
  id: string;
  title: string; // em português, como o aluno escolhe
  category: "Dia a dia" | "Viagem" | "Trabalho" | "Saúde" | "Social" | "Compras";
  character: { name: string; role: string; look: AvatarLook };
  /** Situação e papel do personagem (em inglês, para a IA). */
  setting: string;
  /** Objetivos que o aluno deve cumprir (em português). */
  goals: string[];
  /** Primeira fala do personagem. */
  opener: string;
}

const S = (s: Scenario) => s;

export const SCENARIOS: Scenario[] = [
  S({
    id: "new-friend", title: "Fazer um novo amigo", category: "Social",
    character: { name: "Maya", role: "estudante de intercâmbio", look: { skin: "#8d5524", hair: "#1b1b1b", hairStyle: "curly", shirt: "#7fb069", bg: "#f6c177" } },
    setting: "You are Maya, a friendly exchange student from Toronto who just met the student at a language meetup in São Paulo. You are curious about Brazil and love music and food.",
    goals: ["Apresentar-se", "Dizer de onde é e o que faz", "Descobrir um interesse em comum", "Combinar de se encontrar de novo"],
    opener: "Hi! I don't think we've met. I'm Maya. What's your name?",
  }),
  S({
    id: "burger", title: "Na hamburgueria", category: "Compras",
    character: { name: "Joe", role: "atendente", look: { skin: "#f1c27d", hair: "#c0392b", hairStyle: "short", shirt: "#e74c3c", bg: "#ffd166", accessory: "cap" } },
    setting: "You are Joe, a cashier at a busy burger place in Chicago. Take the order, ask about size, sides, drinks, sauces, for here or to go, and the payment. Occasionally mention a combo deal or that an item is sold out.",
    goals: ["Pedir um lanche", "Escolher acompanhamento e bebida", "Responder 'for here or to go?'", "Pagar"],
    opener: "Hey there! Welcome to Big Joe's. What can I get for you today?",
  }),
  S({
    id: "restaurant", title: "No restaurante", category: "Compras",
    character: { name: "Sofia", role: "garçonete", look: { skin: "#e0ac69", hair: "#3b2219", hairStyle: "ponytail", shirt: "#2c3e50", bg: "#a8dadc", accessory: "apron" } },
    setting: "You are Sofia, a waitress at an Italian restaurant in New York. Greet, offer drinks, explain the specials, take the order, handle a problem (the dish came cold or wrong) and bring the check.",
    goals: ["Pedir bebida e prato", "Perguntar sobre o cardápio", "Reclamar de um problema com educação", "Pedir a conta"],
    opener: "Good evening and welcome! Can I start you off with something to drink?",
  }),
  S({
    id: "cafe", title: "Em um café", category: "Compras",
    character: { name: "Leo", role: "barista", look: { skin: "#ffdbac", hair: "#2d2d2d", hairStyle: "short", shirt: "#ffffff", bg: "#cdb4db", accessory: "apron" } },
    setting: "You are Leo, a barista at a cozy coffee shop in London. Take the order, ask about milk options, size and name for the cup, and chat a little.",
    goals: ["Pedir um café do seu jeito", "Escolher tamanho e leite", "Dizer seu nome para o copo", "Fazer um pouco de small talk"],
    opener: "Morning! What can I get started for you?",
  }),
  S({
    id: "sneaker-store", title: "Na loja de tênis", category: "Compras",
    character: { name: "Kai", role: "vendedora", look: { skin: "#f5d0b5", hair: "#9be3d0", hairStyle: "bun", shirt: "#1d3557", bg: "#e9c46a" } },
    setting: "You are Kai, a salesperson at a sneaker store in Los Angeles. Help find a size, suggest models, talk about colors and price, mention a discount, and handle trying on and paying.",
    goals: ["Pedir um tamanho", "Perguntar preço e cores", "Experimentar", "Decidir e pagar"],
    opener: "Hi! Are you looking for anything in particular today?",
  }),
  S({
    id: "taxi", title: "No táxi / Uber", category: "Viagem",
    character: { name: "Marcus", role: "motorista", look: { skin: "#5c3a21", hair: "#111111", hairStyle: "buzz", shirt: "#457b9d", bg: "#bde0fe" } },
    setting: "You are Marcus, a chatty rideshare driver in Miami. Confirm the destination, ask about the route, chat about the city and the weather, and handle a request to change the route or stop somewhere.",
    goals: ["Confirmar o destino", "Perguntar quanto tempo/quanto custa", "Pedir para mudar a rota", "Conversar sobre a cidade"],
    opener: "Hey, how's it going? You're going to the Hilton downtown, right?",
  }),
  S({
    id: "airport", title: "No aeroporto", category: "Viagem",
    character: { name: "Grace", role: "atendente de check-in", look: { skin: "#ffe0bd", hair: "#d4a373", hairStyle: "bun", shirt: "#264653", bg: "#90e0ef", accessory: "tie" } },
    setting: "You are Grace, an airline check-in agent at JFK airport. Ask for the passport, destination, bags, seat preference, and explain the gate and boarding time. Sometimes the bag is overweight or the flight is delayed.",
    goals: ["Fazer check-in", "Despachar bagagem", "Escolher assento", "Entender portão e horário de embarque"],
    opener: "Good morning! Where are you flying to today? Can I see your passport, please?",
  }),
  S({
    id: "immigration", title: "Na imigração", category: "Viagem",
    character: { name: "Officer Brown", role: "agente de imigração", look: { skin: "#c68642", hair: "#3d2b1f", hairStyle: "buzz", shirt: "#1d3557", bg: "#adb5bd", accessory: "vest" } },
    setting: "You are Officer Brown, a polite but serious immigration officer at a US airport. Ask about the purpose of the trip, length of stay, where they will stay, their job and return ticket.",
    goals: ["Dizer o motivo da viagem", "Dizer quanto tempo vai ficar", "Informar onde vai se hospedar", "Responder com calma e clareza"],
    opener: "Next, please. Passport. What's the purpose of your visit?",
  }),
  S({
    id: "hotel", title: "No hotel", category: "Viagem",
    character: { name: "Daniel", role: "recepcionista", look: { skin: "#f1c27d", hair: "#000000", hairStyle: "short", shirt: "#6d597a", bg: "#ffcad4", accessory: "tie" } },
    setting: "You are Daniel, a hotel receptionist in Dublin. Handle check-in, explain breakfast and Wi-Fi, and help with requests or problems (noisy room, broken air conditioning, late checkout).",
    goals: ["Fazer check-in", "Perguntar sobre café da manhã e Wi-Fi", "Resolver um problema no quarto", "Pedir late checkout"],
    opener: "Hello and welcome to the Riverside Hotel! Do you have a reservation with us?",
  }),
  S({
    id: "supermarket", title: "No supermercado", category: "Compras",
    character: { name: "Rosa", role: "funcionária", look: { skin: "#d8a47f", hair: "#5e3023", hairStyle: "long", shirt: "#2a9d8f", bg: "#f4a261", accessory: "apron" } },
    setting: "You are Rosa, an employee at a supermarket in Sydney. Help the student find products, explain aisles, prices, discounts and checkout options.",
    goals: ["Perguntar onde fica um produto", "Perguntar preço e promoções", "Pagar no caixa"],
    opener: "Hi there! Can I help you find something?",
  }),
  S({
    id: "pharmacy", title: "Na farmácia", category: "Saúde",
    character: { name: "Dr. Patel", role: "farmacêutico", look: { skin: "#a0673f", hair: "#1a1a1a", hairStyle: "short", shirt: "#ffffff", bg: "#b7e4c7", accessory: "glasses" } },
    setting: "You are Dr. Patel, a pharmacist in Manchester. Ask about symptoms, how long, allergies, recommend an over-the-counter option and explain how to take it. Never give dangerous advice; suggest a doctor when appropriate.",
    goals: ["Explicar seus sintomas", "Dizer há quanto tempo", "Perguntar como tomar o remédio"],
    opener: "Hello! How can I help you today?",
  }),
  S({
    id: "doctor", title: "No médico", category: "Saúde",
    character: { name: "Dr. Kim", role: "médica", look: { skin: "#f3d2b3", hair: "#0d0d0d", hairStyle: "ponytail", shirt: "#4cc9f0", bg: "#dee2e6", accessory: "scrubs" } },
    setting: "You are Dr. Kim, a general practitioner in Vancouver. Take a medical history: symptoms, pain level, duration, medication, allergies, and give simple next steps. Keep it realistic and calm.",
    goals: ["Descrever o problema", "Responder perguntas sobre dor e tempo", "Entender as orientações"],
    opener: "Hi, please have a seat. So, what brings you in today?",
  }),
  S({
    id: "job-interview", title: "Entrevista de emprego", category: "Trabalho",
    character: { name: "Ms. Carter", role: "recrutadora", look: { skin: "#ffdbac", hair: "#6c4f3d", hairStyle: "bun", shirt: "#343a40", bg: "#caf0f8", accessory: "glasses" } },
    setting: "You are Ms. Carter, a recruiter at a tech company in Berlin interviewing for a role the student chooses. Ask about experience, strengths, weaknesses, a challenge they solved, salary expectations and questions for you.",
    goals: ["Apresentar sua experiência", "Falar de pontos fortes e fracos", "Contar um desafio que resolveu", "Fazer perguntas à empresa"],
    opener: "Thanks for coming in today. To start, could you tell me a little about yourself?",
  }),
  S({
    id: "meeting", title: "Reunião de trabalho", category: "Trabalho",
    character: { name: "Tom", role: "gerente de projeto", look: { skin: "#e8beac", hair: "#f2cc8f", hairStyle: "short", shirt: "#3a86ff", bg: "#ffe5d9", accessory: "headset" } },
    setting: "You are Tom, a project manager running an online team meeting. Ask for a status update, discuss a delay, ask for opinions and agree on next steps.",
    goals: ["Dar um status do seu trabalho", "Explicar um atraso", "Dar sua opinião", "Combinar próximos passos"],
    opener: "Okay, let's get started. Could you give us a quick update on your part of the project?",
  }),
  S({
    id: "apartment", title: "Alugando um apartamento", category: "Dia a dia",
    character: { name: "Linda", role: "corretora", look: { skin: "#ffe0bd", hair: "#b5838d", hairStyle: "long", shirt: "#e76f51", bg: "#e9edc9" } },
    setting: "You are Linda, a real estate agent showing an apartment in Boston. Explain rooms, rent, deposit, bills, lease length and rules (pets, noise), and answer questions.",
    goals: ["Perguntar o valor do aluguel e o que inclui", "Perguntar sobre contrato e depósito", "Negociar algo"],
    opener: "Welcome! So this is the apartment. What do you think so far?",
  }),
  S({
    id: "phone-call", title: "Ligação telefônica", category: "Trabalho",
    character: { name: "Sam", role: "atendente de suporte", look: { skin: "#c68642", hair: "#2b2d42", hairStyle: "curly", shirt: "#8338ec", bg: "#ffbe0b", accessory: "headset" } },
    setting: "You are Sam, a customer service agent on the phone for an internet provider. Verify identity (name, date of birth — never ask for passwords or card numbers), understand the problem and offer a solution or a technician visit.",
    goals: ["Explicar o problema por telefone", "Soletrar seu nome", "Agendar uma solução"],
    opener: "Thank you for calling FastNet support, this is Sam speaking. How can I help you today?",
  }),
  S({
    id: "daily-life", title: "Conversa sobre o dia a dia", category: "Social",
    character: { name: "Ben", role: "vizinho", look: { skin: "#f1c27d", hair: "#6f4e37", hairStyle: "short", shirt: "#52b788", bg: "#ffd6a5" } },
    setting: "You are Ben, the student's friendly neighbor. Chat about daily routine, work, weekend plans, hobbies, family and the news of the neighborhood.",
    goals: ["Falar da sua rotina", "Contar o que fez no fim de semana", "Perguntar sobre a vida do Ben"],
    opener: "Hey, neighbor! How's your week going so far?",
  }),
  S({
    id: "job-abroad", title: "Procurar emprego no exterior", category: "Trabalho",
    character: { name: "Aisha", role: "consultora de carreira", look: { skin: "#7a4b2a", hair: "#121212", hairStyle: "bun", shirt: "#ef476f", bg: "#d8f3dc" } },
    setting: "You are Aisha, a career consultant in London helping a Brazilian professional plan a move abroad: CV, LinkedIn, visas (general info only), interviews and cultural tips.",
    goals: ["Explicar sua área e experiência", "Perguntar sobre currículo e vistos", "Montar um plano"],
    opener: "Hi! So you're thinking about working abroad. Tell me, what do you do now?",
  }),
];

export const getScenario = (id: string) => SCENARIOS.find((s) => s.id === id);

/** Personagem genérico para situações criadas pelo aluno. */
export const CUSTOM_CHARACTER: Scenario["character"] = {
  name: "Robin",
  role: "personagem da sua cena",
  look: { skin: "#e0ac69", hair: "#264653", hairStyle: "ponytail", shirt: "#f4a261", bg: "#bde0fe" },
};
