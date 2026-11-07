/**
 * Biblioteca de listening do A1 ao C2.
 * Diálogos são lidos com vozes diferentes por personagem; a velocidade aumenta com o nível.
 */
import type { CefrLevel } from "./types";
import { LISTENING_EXTRA } from "./listening-extra";
import { LISTENING_MORE } from "./listening-more";

export interface ListeningQuestion {
  prompt: string;
  options: string[];
  answer: number;
}

export interface ListeningItem {
  id: string;
  level: CefrLevel;
  title: string;
  topic: string;
  kind: "dialogue" | "monologue";
  lines: { speaker: string; text: string; accent?: "us" | "gb" | "au" }[];
  questions: ListeningQuestion[];
  /** Frase do áudio para ditado (escreva o que ouviu). */
  dictation: string;
}

export const LISTENING_RATE: Record<CefrLevel, number> = { A1: 0.8, A2: 0.88, B1: 0.95, B2: 1.0, C1: 1.05, C2: 1.1 };

const Q = (prompt: string, options: string[], answer: number): ListeningQuestion => ({ prompt, options, answer });

const BASE: ListeningItem[] = [
  // ---------------------------------------------------------------- A1
  {
    id: "l-a1-cafe", level: "A1", title: "No café", topic: "Pedidos", kind: "dialogue",
    lines: [
      { speaker: "Barista", text: "Hi! What can I get for you?" },
      { speaker: "Customer", text: "Hi. A small coffee with milk, please." },
      { speaker: "Barista", text: "Sure. Anything else?" },
      { speaker: "Customer", text: "Yes, a chocolate cake, please. How much is it?" },
      { speaker: "Barista", text: "That's six dollars and fifty cents." },
    ],
    questions: [
      Q("O que o cliente pediu para beber?", ["Chá", "Café pequeno com leite", "Suco"], 1),
      Q("O que mais ele pediu?", ["Bolo de chocolate", "Sanduíche", "Biscoito"], 0),
      Q("Quanto custou?", ["$5,60", "$6,50", "$16,50"], 1),
    ],
    dictation: "A small coffee with milk, please.",
  },
  {
    id: "l-a1-family", level: "A1", title: "A família da Emma", topic: "Família", kind: "monologue",
    lines: [
      { speaker: "Emma", text: "Hi, I'm Emma. I'm twenty-five and I live in London with my sister, Kate. Kate is a nurse. My parents live in a small town near the beach. My father is a teacher and my mother is a cook. I have a cat. His name is Max." },
    ],
    questions: [
      Q("Com quem Emma mora?", ["Com os pais", "Com a irmã", "Sozinha"], 1),
      Q("Qual é a profissão da Kate?", ["Professora", "Cozinheira", "Enfermeira"], 2),
      Q("Quem é Max?", ["O irmão", "O gato", "O pai"], 1),
    ],
    dictation: "I live in London with my sister.",
  },
  {
    id: "l-a1-day", level: "A1", title: "A rotina do Paul", topic: "Rotina", kind: "monologue",
    lines: [
      { speaker: "Paul", text: "I get up at six thirty every day. I have breakfast and I go to work by bus. I work in a bank. I have lunch at one o'clock. I go home at six. In the evening, I watch TV or read a book. I go to bed at eleven." },
    ],
    questions: [
      Q("A que horas Paul acorda?", ["6:00", "6:30", "7:30"], 1),
      Q("Como ele vai para o trabalho?", ["De carro", "De ônibus", "A pé"], 1),
      Q("Onde ele trabalha?", ["Num banco", "Numa escola", "Num hospital"], 0),
    ],
    dictation: "I go to work by bus.",
  },
  // ---------------------------------------------------------------- A2
  {
    id: "l-a2-weekend", level: "A2", title: "Como foi o fim de semana?", topic: "Passado", kind: "dialogue",
    lines: [
      { speaker: "Anna", text: "Hey Mark, how was your weekend?" },
      { speaker: "Mark", text: "It was great! I went to the mountains with some friends. We went hiking on Saturday." },
      { speaker: "Anna", text: "Nice! Was it cold?" },
      { speaker: "Mark", text: "A little, but it didn't rain. What about you?" },
      { speaker: "Anna", text: "I stayed at home. I was really tired, so I watched a series and ordered pizza." },
    ],
    questions: [
      Q("Onde Mark foi?", ["À praia", "Às montanhas", "Ao cinema"], 1),
      Q("Choveu no passeio do Mark?", ["Sim, muito", "Não", "Só no domingo"], 1),
      Q("O que Anna fez?", ["Ficou em casa, viu uma série e pediu pizza", "Foi trabalhar", "Visitou a família"], 0),
    ],
    dictation: "I was really tired, so I watched a series.",
  },
  {
    id: "l-a2-hotel", level: "A2", title: "Check-in no hotel", topic: "Viagem", kind: "dialogue",
    lines: [
      { speaker: "Receptionist", text: "Good afternoon. Do you have a reservation?" },
      { speaker: "Guest", text: "Yes, under the name Santos. Two nights." },
      { speaker: "Receptionist", text: "Here it is. Room four-oh-eight, on the fourth floor. Breakfast is from seven to ten in the restaurant." },
      { speaker: "Guest", text: "Great. Is the Wi-Fi free?" },
      { speaker: "Receptionist", text: "Yes, the password is on your key card. Checkout is at eleven." },
    ],
    questions: [
      Q("Quantas noites o hóspede vai ficar?", ["Uma", "Duas", "Quatro"], 1),
      Q("Qual é o quarto?", ["408", "480", "804"], 0),
      Q("Até que horas é o café da manhã?", ["9h", "10h", "11h"], 1),
    ],
    dictation: "Breakfast is from seven to ten in the restaurant.",
  },
  {
    id: "l-a2-plans", level: "A2", title: "Planos de férias", topic: "Futuro", kind: "monologue",
    lines: [
      { speaker: "Lucy", text: "Next month I'm going to visit Portugal with my best friend. We're going to stay in Lisbon for four days and then take a train to Porto. I want to try the food and see the old buildings. I'm a bit nervous because it's my first trip abroad, but I'm really excited." },
    ],
    questions: [
      Q("Para onde Lucy vai?", ["Espanha", "Portugal", "Itália"], 1),
      Q("Como elas vão de Lisboa ao Porto?", ["De ônibus", "De avião", "De trem"], 2),
      Q("Por que ela está nervosa?", ["É a primeira viagem ao exterior", "Tem medo de avião", "Não fala português"], 0),
    ],
    dictation: "It's my first trip abroad.",
  },
  // ---------------------------------------------------------------- B1
  {
    id: "l-b1-interview", level: "B1", title: "A job interview", topic: "Trabalho", kind: "dialogue",
    lines: [
      { speaker: "Interviewer", text: "So, why are you interested in this position?" },
      { speaker: "Candidate", text: "Well, I've been working in customer service for three years, and I'd like to move into a role with more responsibility. Your company has a great reputation for training." },
      { speaker: "Interviewer", text: "Can you tell me about a difficult situation you dealt with?" },
      { speaker: "Candidate", text: "Sure. Last year a client was really upset about a late delivery. I listened, apologized, and offered a discount on the next order. In the end, he became one of our most loyal customers." },
    ],
    questions: [
      Q("How long has the candidate worked in customer service?", ["One year", "Three years", "Five years"], 1),
      Q("Why does the candidate want this job?", ["Higher salary", "More responsibility and good training", "Shorter hours"], 1),
      Q("How did the candidate solve the problem?", ["He refunded the order", "He apologized and offered a discount", "He called his manager"], 1),
    ],
    dictation: "I'd like to move into a role with more responsibility.",
  },
  {
    id: "l-b1-voicemail", level: "B1", title: "A voicemail", topic: "Telefone", kind: "monologue",
    lines: [
      { speaker: "Dentist office", text: "Hi, this is Rachel from Bright Smile Dental Clinic, calling for Mr. Oliveira. I'm afraid Dr. Evans is sick tomorrow, so we need to reschedule your appointment. We have availability on Thursday at nine thirty or Friday afternoon at three. Please call us back at five-five-five, two-one-eight, four-four-seven-zero. Thanks, and sorry for the inconvenience." },
    ],
    questions: [
      Q("Why is the clinic calling?", ["To confirm the appointment", "To reschedule the appointment", "To ask for payment"], 1),
      Q("Which option is offered?", ["Thursday at 9:30", "Thursday at 3:00", "Wednesday at 9:30"], 0),
      Q("What should Mr. Oliveira do?", ["Send an email", "Call back", "Go to the clinic"], 1),
    ],
    dictation: "We need to reschedule your appointment.",
  },
  {
    id: "l-b1-city", level: "B1", title: "Moving to a new city", topic: "Experiências", kind: "monologue",
    lines: [
      { speaker: "Diego", text: "When I moved to Toronto, the hardest thing wasn't the cold, it was making friends. Everyone was polite, but people were busy. So I joined a running club and started volunteering at a food bank on Saturdays. After a few months, I had a group of friends I could really count on. If I had stayed at home every weekend, I would have felt much more lonely." },
    ],
    questions: [
      Q("What was the hardest thing for Diego?", ["The weather", "Making friends", "Finding a job"], 1),
      Q("What did he do to meet people?", ["Joined a running club and volunteered", "Went to bars", "Took English classes"], 0),
      Q("What does the last sentence mean?", ["He stayed at home a lot", "Going out helped him feel less lonely", "He moved back home"], 1),
    ],
    dictation: "I had a group of friends I could really count on.",
  },
  // ---------------------------------------------------------------- B2
  {
    id: "l-b2-remote", level: "B2", title: "Remote work debate", topic: "Opinião", kind: "dialogue",
    lines: [
      { speaker: "Laura", text: "Honestly, I think remote work has made us more productive. I save almost two hours of commuting every day." },
      { speaker: "James", text: "I see your point, but I'm not convinced it works for everyone. New employees, for example, miss out on learning from colleagues informally." },
      { speaker: "Laura", text: "That's fair. Maybe a hybrid model is the answer, with a couple of days in the office for collaboration." },
      { speaker: "James", text: "Exactly. As long as those office days are actually used for teamwork, and not just for sitting on video calls." },
    ],
    questions: [
      Q("What is Laura's main argument?", ["Offices are cheaper", "Remote work saves commuting time and boosts productivity", "Remote work is lonely"], 1),
      Q("What is James concerned about?", ["Salaries", "New employees missing informal learning", "Internet costs"], 1),
      Q("What do they finally agree on?", ["Fully remote work", "A hybrid model with purposeful office days", "Returning to the office full-time"], 1),
    ],
    dictation: "I'm not convinced it works for everyone.",
  },
  {
    id: "l-b2-news", level: "B2", title: "Local news report", topic: "Notícias", kind: "monologue",
    lines: [
      { speaker: "Reporter", text: "City officials have announced that the main bridge will be closed for repairs starting next Monday. The work is expected to last six weeks. Drivers are being advised to use the northern ring road, and extra buses will run during rush hour. Local businesses have expressed concern that the closure could reduce the number of customers, although the council claims the impact will be limited." },
    ],
    questions: [
      Q("How long will the repairs take?", ["Six days", "Six weeks", "Six months"], 1),
      Q("What alternative is offered to commuters?", ["Free taxis", "The northern ring road and extra buses", "A ferry"], 1),
      Q("What are local businesses worried about?", ["Noise", "Losing customers", "Higher taxes"], 1),
    ],
    dictation: "The work is expected to last six weeks.",
  },
  {
    id: "l-b2-story", level: "B2", title: "A travel disaster", topic: "Narrativa", kind: "monologue",
    lines: [
      { speaker: "Nina", text: "By the time we got to the airport, our flight had already been cancelled. Apparently, there had been a storm the night before and the whole schedule was a mess. We'd been planning that trip for months, so we were gutted. The airline put us on a flight the next morning, but we had to spend the night on the airport floor. Looking back, it's actually one of my favourite travel stories." },
    ],
    questions: [
      Q("Why was the flight cancelled?", ["A strike", "A storm the night before", "A technical problem"], 1),
      Q("How did Nina feel at first?", ["Relieved", "Very disappointed", "Indifferent"], 1),
      Q("How does she feel about it now?", ["She still regrets it", "It's one of her favourite stories", "She never travels anymore"], 1),
    ],
    dictation: "Our flight had already been cancelled.",
  },
  // ---------------------------------------------------------------- C1
  {
    id: "l-c1-podcast", level: "C1", title: "Podcast: the attention economy", topic: "Tecnologia", kind: "dialogue",
    lines: [
      { speaker: "Host", text: "So you argue that most apps aren't designed to be useful, but to be sticky. What's the distinction?" },
      { speaker: "Guest", text: "Well, a useful product solves your problem and lets you go. A sticky one is optimized for time spent, so every feature, from infinite scroll to unpredictable rewards, is tuned to keep you there a little longer than you intended." },
      { speaker: "Host", text: "But isn't that just good design?" },
      { speaker: "Guest", text: "It's effective design, certainly. Whether it's good depends on whose interests it serves. And when engagement is the business model, the user's wellbeing is, at best, a secondary consideration." },
    ],
    questions: [
      Q("What does the guest mean by a 'sticky' product?", ["One that is easy to use", "One optimized to maximize time spent", "One that is free"], 1),
      Q("How does the guest respond to 'isn't that just good design?'", ["He fully agrees", "He says it's effective, but 'good' depends on whose interests it serves", "He says design doesn't matter"], 1),
      Q("What is implied about engagement-based business models?", ["They prioritize user wellbeing", "User wellbeing tends to come second", "They are illegal"], 1),
    ],
    dictation: "Whether it's good depends on whose interests it serves.",
  },
  {
    id: "l-c1-lecture", level: "C1", title: "Lecture: urban heat islands", topic: "Ciência", kind: "monologue",
    lines: [
      { speaker: "Lecturer", text: "Cities tend to be noticeably warmer than the surrounding countryside, a phenomenon known as the urban heat island effect. Dark surfaces such as asphalt absorb solar radiation during the day and release it slowly at night, while the scarcity of vegetation reduces cooling through evaporation. The implications are far from trivial: higher energy consumption for air conditioning, poorer air quality and, crucially, increased mortality during heatwaves. Encouragingly, relatively simple interventions, like reflective roofs and urban trees, have been shown to mitigate the effect." },
    ],
    questions: [
      Q("Why do dark surfaces contribute to the effect?", ["They reflect sunlight", "They absorb heat by day and release it at night", "They block the wind"], 1),
      Q("Which consequence does the lecturer stress as 'crucial'?", ["Higher energy bills", "Increased mortality during heatwaves", "Traffic jams"], 1),
      Q("What is the lecturer's attitude towards solutions?", ["Pessimistic", "Cautiously optimistic", "Uninterested"], 1),
    ],
    dictation: "The implications are far from trivial.",
  },
  {
    id: "l-c1-negotiation", level: "C1", title: "Negotiating a contract", topic: "Negócios", kind: "dialogue",
    lines: [
      { speaker: "Supplier", text: "We could bring the unit price down by five percent, provided you commit to a two-year contract." },
      { speaker: "Buyer", text: "Two years is a big commitment given how volatile the market is. Would you consider eighteen months with an option to extend?" },
      { speaker: "Supplier", text: "Eighteen months is doable, but then we'd need to keep the discount at three percent." },
      { speaker: "Buyer", text: "Let's meet halfway: four percent over eighteen months, and we'll guarantee a minimum monthly volume." },
    ],
    questions: [
      Q("What condition does the supplier attach to the 5% discount?", ["Paying upfront", "A two-year commitment", "Buying more products"], 1),
      Q("Why is the buyer hesitant?", ["The market is unpredictable", "The quality is poor", "The supplier is new"], 0),
      Q("What does the buyer offer in exchange for 4%?", ["A longer contract", "A guaranteed minimum monthly volume", "Faster payment"], 1),
    ],
    dictation: "Let's meet halfway.",
  },
  // ---------------------------------------------------------------- C2
  {
    id: "l-c2-essay", level: "C2", title: "On the value of boredom", topic: "Ensaio", kind: "monologue",
    lines: [
      { speaker: "Narrator", text: "We have, it seems, declared war on boredom, and we are winning it decisively. Every queue, every commute, every idle minute is now filled before it has the chance to become empty. Yet one might ask whether this victory is entirely to be celebrated. Boredom, for all its discomfort, has long been the soil in which daydreams, and with them a surprising number of ideas, take root. To eradicate it altogether is not merely to lose a few dull moments; it is, perhaps, to forfeit the very conditions under which the mind wanders somewhere new." },
    ],
    questions: [
      Q("What is the speaker's stance on 'winning the war on boredom'?", ["Wholehearted approval", "Sceptical: the victory may come at a cost", "Indifference"], 1),
      Q("What metaphor is used for boredom?", ["A wall", "Soil in which ideas take root", "A storm"], 1),
      Q("What might we 'forfeit', according to the speaker?", ["Free time", "The conditions for the mind to wander and create", "Our patience"], 1),
    ],
    dictation: "To eradicate it altogether is not merely to lose a few dull moments.",
  },
  {
    id: "l-c2-debate", level: "C2", title: "Panel: AI and authorship", topic: "Debate", kind: "dialogue",
    lines: [
      { speaker: "Panelist A", text: "If a machine assembles a novel from statistical patterns, to call it the author strikes me as a category error. Authorship implies intention, and intention implies a mind." },
      { speaker: "Panelist B", text: "That presupposes we have a watertight account of intention in humans, which, frankly, we don't. Much of what we write is pattern recognition dressed up as inspiration." },
      { speaker: "Panelist A", text: "Granted, but the fact that the boundary is blurry hardly means there's no boundary at all. Dusk doesn't abolish the difference between day and night." },
    ],
    questions: [
      Q("Why does Panelist A reject the idea of AI as author?", ["AI makes mistakes", "Authorship requires intention, which requires a mind", "Novels are too long"], 1),
      Q("What is Panelist B's counterargument?", ["AI is conscious", "Human intention isn't clearly understood either", "Authorship doesn't matter"], 1),
      Q("What does the dusk analogy suggest?", ["Blurry boundaries can still be real boundaries", "There is no difference between humans and AI", "The debate is pointless"], 0),
    ],
    dictation: "Dusk doesn't abolish the difference between day and night.",
  },
  {
    id: "l-c2-interview", level: "C2", title: "Interview with a chef", topic: "Cultura", kind: "dialogue",
    lines: [
      { speaker: "Journalist", text: "Your restaurant has been called pretentious by some critics. Does that sting?" },
      { speaker: "Chef", text: "It would be disingenuous to say it doesn't. But I'd rather be accused of over-reaching than of playing it safe. The dishes that people now consider our signatures were, when we launched them, dismissed as gimmicks." },
      { speaker: "Journalist", text: "So criticism is part of the process?" },
      { speaker: "Chef", text: "It's the price of admission. If nobody bristles, you've probably cooked something forgettable." },
    ],
    questions: [
      Q("How does the chef feel about being called pretentious?", ["Completely unaffected", "It hurts somewhat, but he prefers ambition to caution", "He agrees with the critics"], 1),
      Q("What happened to the restaurant's signature dishes?", ["They were always popular", "They were first dismissed as gimmicks", "They were removed from the menu"], 1),
      Q("What does 'If nobody bristles' imply?", ["If no one reacts strongly, the food was probably unremarkable", "If no one complains, the service was good", "Customers should stay quiet"], 0),
    ],
    dictation: "I'd rather be accused of over-reaching than of playing it safe.",
  },
];

const ORDER: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
/** Todos os áudios, em ordem de nível. */
export const LISTENING: ListeningItem[] = [...BASE, ...LISTENING_EXTRA, ...LISTENING_MORE].sort((a, b) => ORDER.indexOf(a.level) - ORDER.indexOf(b.level));

export const getListening = (id: string) => LISTENING.find((l) => l.id === id);
