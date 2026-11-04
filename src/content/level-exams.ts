/**
 * Critérios de domínio de cada nível (alinhados ao CEFR) e o roteiro da prova de nível.
 *
 * A prova tem três partes. Para subir de nível o aluno precisa aprovar as três:
 * - Escrita (o teste final do nível na trilha): Reading, Writing, Listening, gramática e vocabulário.
 * - Speaking: duas respostas gravadas, avaliadas pela IA com base na transcrição e no ritmo.
 * - Conversation: uma conversa curta com um examinador de IA, avaliada no fim.
 */
import type { CefrLevel } from "./types";

export type ExamPart = "written" | "speaking" | "conversation";
export const EXAM_PARTS: ExamPart[] = ["written", "speaking", "conversation"];

/** Nota mínima de cada parte (0–100). */
export const EXAM_PASS: Record<ExamPart, number> = { written: 75, speaking: 60, conversation: 60 };

export const PART_LABEL: Record<ExamPart, string> = {
  written: "Escrita (Reading, Writing e Listening)",
  speaking: "Speaking",
  conversation: "Conversation",
};

export interface SpeakingPrompt {
  en: string;
  pt: string;
}

export interface LevelExam {
  level: CefrLevel;
  /** "Ao final deste nível, você consegue…" — o que a prova verifica. */
  canDo: string[];
  speaking: SpeakingPrompt[];
  /** Tempo máximo de cada resposta falada, em segundos. */
  speakingSeconds: number;
  /** Mínimo de palavras esperado em cada resposta (abaixo disso a nota é limitada). */
  minWords: number;
  conversation: {
    title: string;
    setting_pt: string;
    goal_pt: string;
    /** Papel do examinador (instrução para a IA). */
    examiner: string;
    opener: string;
  };
  /** Quantas falas do aluno a conversa tem. */
  turns: number;
}

export const LEVEL_EXAMS: LevelExam[] = [
  {
    level: "A1",
    canDo: [
      "Cumprimentar, se apresentar e falar de onde é, idade e profissão.",
      "Falar da família, da casa e da rotina com frases simples.",
      "Pedir comida e bebida, perguntar preços e comprar coisas simples.",
      "Entender números, horas, datas e instruções curtas ditas devagar.",
      "Ler e escrever mensagens curtas (um bilhete, um formulário).",
    ],
    speaking: [
      { en: "Introduce yourself: your name, age, where you are from and what you do.", pt: "Apresente-se: nome, idade, de onde é e o que faz." },
      { en: "Describe your typical day, from the morning to the night.", pt: "Descreva seu dia típico, da manhã até a noite." },
    ],
    speakingSeconds: 45,
    minWords: 15,
    conversation: {
      title: "Conhecendo alguém novo",
      setting_pt: "Você está numa festa e conhece uma pessoa nova.",
      goal_pt: "Responda às perguntas e faça pelo menos uma pergunta de volta.",
      examiner: "You are Sam, a friendly person meeting the student at a party. Ask simple personal questions (name, country, job, family, hobbies). Use very short, simple A1 sentences.",
      opener: "Hi! I'm Sam. What's your name?",
    },
    turns: 5,
  },
  {
    level: "A2",
    canDo: [
      "Contar o que fez no passado (fim de semana, viagem) e falar de planos.",
      "Resolver situações do dia a dia: loja, restaurante, transporte, hotel.",
      "Pedir e dar direções e informações simples.",
      "Entender o assunto principal de anúncios e conversas curtas e claras.",
      "Escrever mensagens e e-mails curtos sobre assuntos do dia a dia.",
    ],
    speaking: [
      { en: "Tell me about your last weekend. What did you do?", pt: "Conte como foi seu último fim de semana. O que você fez?" },
      { en: "What are your plans for your next holiday?", pt: "Quais são seus planos para as próximas férias?" },
    ],
    speakingSeconds: 50,
    minWords: 25,
    conversation: {
      title: "No hotel",
      setting_pt: "Você chega a um hotel e fala com a recepção.",
      goal_pt: "Faça o check-in, peça informações e resolva um pequeno problema.",
      examiner: "You are a hotel receptionist. The student is checking in. Ask for their name and how many nights, mention breakfast times, and at some point tell them their room isn't ready yet so they need to decide what to do. Use simple A2 English.",
      opener: "Good afternoon, welcome to the Riverside Hotel. Do you have a reservation?",
    },
    turns: 6,
  },
  {
    level: "B1",
    canDo: [
      "Dar opiniões e justificar com exemplos.",
      "Contar experiências, sonhos e planos com detalhes e conectivos.",
      "Lidar com a maioria das situações de viagem e de trabalho simples.",
      "Entender os pontos principais de áudios sobre temas conhecidos.",
      "Escrever textos simples e coesos sobre temas de interesse.",
    ],
    speaking: [
      { en: "Describe a challenge you faced and how you dealt with it.", pt: "Descreva um desafio que você enfrentou e como lidou com ele." },
      { en: "Is it better to live in a big city or in a small town? Give reasons.", pt: "É melhor morar numa cidade grande ou pequena? Justifique." },
    ],
    speakingSeconds: 60,
    minWords: 40,
    conversation: {
      title: "Reclamação na loja",
      setting_pt: "Você comprou um fone de ouvido que parou de funcionar e volta à loja.",
      goal_pt: "Explique o problema, negocie uma solução (troca ou reembolso) e chegue a um acordo.",
      examiner: "You are a shop assistant. The student bought headphones two weeks ago that stopped working. Ask what happened, ask for the receipt, first offer only a repair that takes three weeks, and negotiate. Use natural B1 English.",
      opener: "Hi there, how can I help you today?",
    },
    turns: 6,
  },
  {
    level: "B2",
    canDo: [
      "Argumentar sobre temas variados, comparando vantagens e desvantagens.",
      "Participar de reuniões e conversas com nativos com fluência razoável.",
      "Entender palestras, notícias e filmes em linguagem padrão.",
      "Escrever textos claros e detalhados: e-mails formais, opiniões, relatórios.",
      "Corrigir mal-entendidos e reformular o que disse.",
    ],
    speaking: [
      { en: "Some people say remote work is the future. What do you think? Consider both sides.", pt: "Há quem diga que o trabalho remoto é o futuro. O que você acha? Considere os dois lados." },
      { en: "Describe a decision that changed your life and what you would do differently.", pt: "Descreva uma decisão que mudou sua vida e o que faria diferente." },
    ],
    speakingSeconds: 75,
    minWords: 60,
    conversation: {
      title: "Entrevista de emprego",
      setting_pt: "Você está numa entrevista para uma vaga numa empresa internacional.",
      goal_pt: "Fale da sua experiência, responda a perguntas difíceis e faça boas perguntas.",
      examiner: "You are an interviewer at an international company. Ask about experience, a time the student handled a conflict, a weakness, and why they want the job. Follow up on vague answers. Use natural B2 English.",
      opener: "Thanks for coming in. To start, could you tell me a bit about your background?",
    },
    turns: 6,
  },
  {
    level: "C1",
    canDo: [
      "Expressar-se com fluência e espontaneidade, sem procurar palavras.",
      "Usar a língua com flexibilidade em contextos sociais, acadêmicos e profissionais.",
      "Entender textos longos e exigentes e perceber sentidos implícitos.",
      "Produzir textos bem estruturados sobre temas complexos.",
      "Defender um ponto de vista, ceder e negociar com nuance.",
    ],
    speaking: [
      { en: "To what extent should governments regulate artificial intelligence? Justify your position.", pt: "Até que ponto os governos devem regular a inteligência artificial? Justifique." },
      { en: "Describe a cultural difference you have noticed between Brazil and another country and what it reveals.", pt: "Descreva uma diferença cultural que você notou entre o Brasil e outro país e o que ela revela." },
    ],
    speakingSeconds: 90,
    minWords: 85,
    conversation: {
      title: "Negociação com um cliente",
      setting_pt: "Você negocia o prazo e o preço de um projeto com um cliente exigente.",
      goal_pt: "Defenda sua proposta, lide com objeções e feche um acordo sem perder o cliente.",
      examiner: "You are a demanding client negotiating a project deadline and price with the student's company. Push back on price, ask for a shorter deadline, raise objections and use some indirect language. Use natural C1 English.",
      opener: "I've read your proposal. Frankly, the price is well above what we budgeted. Talk me through it.",
    },
    turns: 7,
  },
  {
    level: "C2",
    canDo: [
      "Entender praticamente tudo o que ouve ou lê, inclusive ironia e subtexto.",
      "Expressar-se com precisão, distinguindo nuances finas de sentido.",
      "Reformular e resumir argumentos de várias fontes com coerência.",
      "Adaptar o registro com naturalidade (formal, informal, diplomático).",
      "Lidar com temas abstratos e polêmicos com segurança.",
    ],
    speaking: [
      { en: "'Progress is impossible without change.' Discuss, with examples from history or your own experience.", pt: "\"Não há progresso sem mudança.\" Discuta, com exemplos da história ou da sua experiência." },
      { en: "Summarise both sides of a debate you care about and say where you stand, and why.", pt: "Resuma os dois lados de um debate que importa para você e diga sua posição, e por quê." },
    ],
    speakingSeconds: 100,
    minWords: 110,
    conversation: {
      title: "Debate em painel",
      setting_pt: "Você participa de um painel sobre o futuro do trabalho e é questionado pelo mediador.",
      goal_pt: "Sustente sua posição, responda a contra-argumentos e use registro adequado.",
      examiner: "You are a sharp panel moderator. Debate the future of work with the student: challenge their claims, introduce counter-arguments, use irony and idioms occasionally, and ask them to reconcile contradictions. Use natural C2 English.",
      opener: "Let's start with a provocation: some argue that within a decade most office jobs will simply disappear. Do you buy that?",
    },
    turns: 7,
  },
];

export function getLevelExam(level: string): LevelExam | undefined {
  return LEVEL_EXAMS.find((e) => e.level === level.toUpperCase());
}
