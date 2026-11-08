/**
 * Temas para falar livremente: desafio de 1 minuto (por nível),
 * gravação semanal e "fale sobre sua vida".
 */
import type { CefrLevel } from "./types";

export interface SpeakingTopic {
  id: string;
  level: CefrLevel;
  en: string;
  pt: string;
  /** Frases de apoio para começar. */
  starters: string[];
}

const T = (id: string, level: CefrLevel, en: string, pt: string, starters: string[]): SpeakingTopic => ({ id, level, en, pt, starters });

export const FLUENCY_TOPICS: SpeakingTopic[] = [
  T("a1-me", "A1", "Introduce yourself.", "Apresente-se: nome, idade, cidade, trabalho.", ["My name is…", "I'm … years old.", "I live in…", "I work as…"]),
  T("a1-family", "A1", "Talk about your family.", "Fale da sua família.", ["I have…", "My mother is…", "We live in…"]),
  T("a1-day", "A1", "Describe a normal day.", "Descreva um dia normal.", ["I wake up at…", "Then I…", "In the evening I…"]),
  T("a1-food", "A1", "What food do you like?", "Que comida você gosta?", ["I like…", "I don't like…", "My favorite food is…"]),
  T("a1-home", "A1", "Describe your house.", "Descreva sua casa.", ["My house has…", "There is a…", "My favorite room is…"]),
  T("a1-weekend", "A1", "What do you do on weekends?", "O que você faz no fim de semana?", ["On Saturdays I…", "I usually…", "Sometimes I…"]),
  T("a2-last-weekend", "A2", "What did you do last weekend?", "O que você fez no último fim de semana?", ["Last Saturday I…", "After that…", "It was…"]),
  T("a2-trip", "A2", "Tell me about a trip you took.", "Conte sobre uma viagem que você fez.", ["Last year I went to…", "We stayed at…", "The best part was…"]),
  T("a2-job", "A2", "Describe your job or studies.", "Descreva seu trabalho ou estudos.", ["I work at…", "Every day I have to…", "I like it because…"]),
  T("a2-city", "A2", "Describe your city.", "Descreva sua cidade.", ["My city is…", "There are…", "You should visit…"]),
  T("a2-plans", "A2", "What are your plans for next year?", "Quais seus planos para o ano que vem?", ["I'm going to…", "I want to…", "I hope…"]),
  T("a2-friend", "A2", "Describe your best friend.", "Descreva seu melhor amigo.", ["We met…", "He/She is very…", "We usually…"]),
  T("b1-english", "B1", "Why are you learning English?", "Por que você está aprendendo inglês?", ["The main reason is…", "In the future I'd like to…", "It's important because…"]),
  T("b1-challenge", "B1", "Talk about a challenge you overcame.", "Fale de um desafio que você superou.", ["A few years ago…", "At first it was hard because…", "In the end…"]),
  T("b1-tech", "B1", "How does technology affect your life?", "Como a tecnologia afeta sua vida?", ["I use my phone to…", "On the one hand…", "On the other hand…"]),
  T("b1-movie", "B1", "Describe a movie or series you recommend.", "Descreva um filme ou série que você recomenda.", ["It's about…", "What I liked most was…", "I'd recommend it to…"]),
  T("b1-advice", "B1", "Give advice to someone moving to your city.", "Dê conselhos a quem vai se mudar para sua cidade.", ["You should…", "Make sure you…", "Don't forget to…"]),
  T("b1-dream", "B1", "Describe your dream job.", "Descreva o trabalho dos seus sonhos.", ["If I could choose, I'd…", "I'd love to…", "The best thing would be…"]),
  T("b2-remote", "B2", "Is remote work better than working in an office?", "Trabalho remoto é melhor que no escritório?", ["In my opinion…", "One advantage is…", "However…"]),
  T("b2-social", "B2", "Are social networks good or bad for society?", "Redes sociais são boas ou ruins para a sociedade?", ["It depends on…", "Some people argue that…", "Personally, I think…"]),
  T("b2-decision", "B2", "Talk about an important decision you made.", "Fale de uma decisão importante que você tomou.", ["I had to decide whether…", "Looking back…", "If I had…"]),
  T("b2-education", "B2", "How would you improve education in your country?", "Como você melhoraria a educação no seu país?", ["First of all…", "It would help if…", "In the long run…"]),
  T("b2-travel", "B2", "What can people learn from traveling?", "O que as pessoas aprendem viajando?", ["Traveling teaches you…", "For example…", "That's why…"]),
  T("b2-money", "B2", "Does money bring happiness?", "Dinheiro traz felicidade?", ["To some extent…", "Studies suggest…", "At the end of the day…"]),
  T("c1-ai", "C1", "How will AI change the job market?", "Como a IA vai mudar o mercado de trabalho?", ["It's likely that…", "That said…", "What concerns me is…"]),
  T("c1-cities", "C1", "What makes a city a good place to live?", "O que torna uma cidade boa para viver?", ["Arguably…", "A key factor is…", "Take … for instance."]),
  T("c1-failure", "C1", "What role does failure play in success?", "Qual o papel do fracasso no sucesso?", ["It's often said that…", "In my experience…", "Ultimately…"]),
  T("c1-culture", "C1", "Compare Brazilian culture with another culture you know.", "Compare a cultura brasileira com outra que você conhece.", ["Whereas in Brazil…", "What struck me was…", "By contrast…"]),
  T("c2-ethics", "C2", "Should governments regulate what people eat?", "Governos devem regular o que as pessoas comem?", ["There's a case to be made for…", "Critics would argue…", "On balance…"]),
  T("c2-progress", "C2", "Is economic growth compatible with protecting the environment?", "Crescimento econômico é compatível com proteger o meio ambiente?", ["The tension between … and …", "It hinges on…", "All things considered…"]),
  T("c2-language", "C2", "How does the language you speak shape the way you think?", "A língua que você fala molda seu jeito de pensar?", ["It's been suggested that…", "Speaking for myself…", "Be that as it may…"]),
];

export const topicsFor = (level: CefrLevel) => FLUENCY_TOPICS.filter((t) => t.level === level);
export const getTopic = (id: string) => FLUENCY_TOPICS.find((t) => t.id === id);

/** Gravação semanal: sempre o mesmo pedido, para comparar a evolução. */
export const WEEKLY_PROMPT = {
  en: "Introduce yourself and tell me about your week: what you did, how you felt and what's coming next.",
  pt: "Apresente-se e conte sobre a sua semana: o que fez, como se sentiu e o que vem pela frente.",
};

/** Temas de "Fale sobre sua vida". */
export const LIFE_TOPICS = [
  { id: "work", title: "Trabalho ou estudos", question: "O que você faz? Onde trabalha ou estuda, o que faz no dia a dia, do que gosta e do que não gosta?" },
  { id: "routine", title: "Minha rotina", question: "Como é um dia normal seu, do acordar até dormir?" },
  { id: "family", title: "Família e amigos", question: "Com quem você mora? Fale da sua família e dos seus amigos." },
  { id: "hobbies", title: "Hobbies", question: "O que você gosta de fazer no tempo livre? Esportes, séries, música, jogos…" },
  { id: "city", title: "Minha cidade", question: "Onde você mora? Como é a cidade, o que tem de bom e de ruim?" },
  { id: "why", title: "Por que inglês", question: "Por que você quer falar inglês? Viagem, trabalho, um sonho?" },
  { id: "plans", title: "Planos e sonhos", question: "Quais seus planos para este ano e para o futuro?" },
  { id: "travel", title: "Viagens", question: "Para onde você já viajou ou quer viajar? Conte uma história." },
] as const;
export type LifeTopicId = (typeof LIFE_TOPICS)[number]["id"];
