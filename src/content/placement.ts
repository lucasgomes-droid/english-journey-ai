/**
 * Teste de nivelamento: 6 questões por nível (A1 a B2), com leitura e escuta.
 * O resultado é uma estimativa: o nível é o último em que você acertou pelo menos 4 de 6,
 * desde que tenha passado também nos anteriores.
 */
import type { CefrLevel } from "./types";

export interface PlacementQuestion {
  level: CefrLevel;
  prompt: string;
  /** Se houver, o app lê esta frase em voz alta (questão de escuta). */
  audio?: string;
  options: string[];
  answer: number;
}

const Q = (level: CefrLevel, prompt: string, options: string[], answer: number, audio?: string): PlacementQuestion => ({ level, prompt, options, answer, audio });

export const PLACEMENT: PlacementQuestion[] = [
  // A1
  Q("A1", "___ name is Carla.", ["Her", "She", "Hers"], 0),
  Q("A1", "They ___ from Brazil.", ["is", "are", "am"], 1),
  Q("A1", "___ you like coffee?", ["Are", "Does", "Do"], 2),
  Q("A1", "My brother ___ in a bank.", ["work", "works", "working"], 1),
  Q("A1", "Ouça e escolha o que a pessoa disse.", ["Eu tenho dois irmãos.", "Eu moro com dois amigos.", "Eu tenho vinte anos."], 0, "I have two brothers."),
  Q("A1", "Ouça: qual é o horário?", ["7:15", "7:50", "11:45"], 0, "It's a quarter past seven."),
  // A2
  Q("A2", "I ___ to Salvador last year.", ["have gone", "went", "go"], 1),
  Q("A2", "She's ___ than her sister.", ["more tall", "taller", "tallest"], 1),
  Q("A2", "Have you ever ___ sushi?", ["eat", "ate", "eaten"], 2),
  Q("A2", "I was sleeping when the phone ___.", ["rang", "was ringing", "rings"], 0),
  Q("A2", "Ouça e escolha.", ["Ela vai viajar amanhã de manhã.", "Ela viajou ontem de manhã.", "Ela não gosta de viajar."], 0, "She's flying to Lima tomorrow morning."),
  Q("A2", "Ouça e escolha o conselho.", ["Beba mais água.", "Durma mais cedo.", "Vá ao médico hoje."], 1, "You look tired. You should go to bed earlier."),
  // B1
  Q("B1", "If I ___ more time, I'd learn the guitar.", ["have", "had", "would have"], 1),
  Q("B1", "By the time we arrived, the movie ___.", ["already started", "had already started", "has already started"], 1),
  Q("B1", "She told me she ___ tired.", ["is being", "was", "were"], 1),
  Q("B1", "The man ___ car was stolen called the police.", ["who", "which", "whose"], 2),
  Q("B1", "Ouça. O que a pessoa quer dizer?", ["Ela concorda totalmente.", "Ela entende o ponto, mas discorda.", "Ela não ouviu a pergunta."], 1, "I see your point, but I'm not sure I agree."),
  Q("B1", "Ouça e escolha.", ["Ele estuda inglês há dois anos e continua estudando.", "Ele estudou inglês por dois anos e parou.", "Ele vai começar a estudar em dois anos."], 0, "I've been studying English for two years."),
  // B2
  Q("B2", "If she had left earlier, she ___ the train.", ["wouldn't miss", "wouldn't have missed", "didn't miss"], 1),
  Q("B2", "I'd rather you ___ tell anyone.", ["don't", "didn't", "won't"], 1),
  Q("B2", "Not only ___ late, but he also forgot the documents.", ["he was", "was he", "he is"], 1),
  Q("B2", "The project is ___ to be finished by June.", ["supposed", "suppose", "supposing"], 0),
  Q("B2", "Ouça. O que aconteceu?", ["Ela devia ter avisado antes.", "Ela avisou com antecedência.", "Ela vai avisar amanhã."], 0, "She should have told us earlier."),
  Q("B2", "Ouça e escolha o sentido.", ["O preço caiu bastante.", "As vendas se mantiveram estáveis apesar da crise.", "A empresa fechou por causa da crise."], 1, "Despite the crisis, sales remained fairly stable."),
  // C1
  Q("C1", "Had I known about the delay, I ___ a later train.", ["would take", "would have taken", "had taken"], 1),
  Q("C1", "The proposal was turned ___ because it was too expensive.", ["down", "off", "out"], 0),
  Q("C1", "She's very good at her job, ___ she can be a bit disorganised.", ["despite", "albeit", "although"], 2),
  Q("C1", "Which word best completes it? \"The results were ___ disappointing, given the effort involved.\"", ["somewhat", "somehow", "someway"], 0),
  Q("C1", "Ouça. Qual é a ideia?", ["A reunião foi cancelada.", "Vale a pena adiar a decisão até termos os números.", "Os números já estão prontos."], 1, "I'd hold off on making a decision until we've seen the figures."),
  Q("C1", "Ouça. O que a pessoa sente?", ["Ela está aliviada.", "Ela está irritada com o atraso.", "Ela está surpresa e contente."], 1, "Frankly, I'm fed up with these constant delays."),
  // C2
  Q("C2", "Little ___ that the decision would change everything.", ["did they realize", "they realized", "they did realize"], 0),
  Q("C2", "His argument doesn't hold ___ under close scrutiny.", ["water", "ground", "breath"], 0),
  Q("C2", "Choose the most natural: \"The report ___ to a number of inconsistencies.\"", ["alludes", "eludes", "elides"], 0),
  Q("C2", "\"She was, to all intents and purposes, the manager.\" means she was…", ["officially the manager", "the manager in practice, if not in title", "about to become the manager"], 1),
  Q("C2", "Ouça. O que a pessoa está fazendo?", ["Elogiando a ideia sem ressalvas.", "Discordando de forma educada e indireta.", "Pedindo mais tempo para responder."], 1, "That's certainly one way of looking at it, though I'm not entirely convinced."),
  Q("C2", "Ouça e escolha o sentido.", ["O plano saiu exatamente como previsto.", "O plano foi um fracasso total.", "Apesar de alguns contratempos, o plano funcionou no geral."], 2, "For all its teething problems, the scheme has, by and large, delivered."),
];

export const PLACEMENT_LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

/**
 * Calcula o nível estimado. `answers[i]` é a opção escolhida na questão i (ou -1).
 * Retorna o nível estimado e o acerto por nível.
 */
export function scorePlacement(answers: number[]) {
  const byLevel = PLACEMENT_LEVELS.map((level) => {
    const qs = PLACEMENT.map((q, i) => ({ q, i })).filter((x) => x.q.level === level);
    const ok = qs.filter((x) => answers[x.i] === x.q.answer).length;
    return { level, ok, total: qs.length };
  });
  // Nível dominado: acertou 4+ de 6 neste e em todos os anteriores.
  let mastered: CefrLevel | null = null;
  for (const r of byLevel) {
    if (r.ok >= 4) mastered = r.level;
    else break;
  }
  const order: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
  // Começa no nível seguinte ao último dominado (A1 se não dominou nenhum; C2 se dominou tudo).
  const estimated: CefrLevel = mastered ? (order[order.indexOf(mastered) + 1] ?? "C2") : "A1";
  // Resultado por competência: compreensão oral (questões com áudio) × leitura e gramática.
  // Níveis que o aluno chegou a ver: até o nível estimado (o teste para no primeiro nível que vai mal).
  const shown = (q: PlacementQuestion) => PLACEMENT_LEVELS.indexOf(q.level) <= PLACEMENT_LEVELS.indexOf(estimated);
  const part = (audio: boolean) => {
    const qs = PLACEMENT.map((q, i) => ({ q, i })).filter((x) => Boolean(x.q.audio) === audio && shown(x.q));
    return { ok: qs.filter((x) => answers[x.i] === x.q.answer).length, total: qs.length };
  };
  const bySkill = [
    { skill: "Leitura e gramática", ...part(false) },
    { skill: "Compreensão oral", ...part(true) },
  ];
  return { estimated, mastered, byLevel, bySkill };
}

/** O teste para cedo: errou demais um nível (menos de 4 de 6), os seguintes não mudam o resultado. */
export function placementStopsAfter(answers: number[], index: number): boolean {
  const q = PLACEMENT[index];
  const next = PLACEMENT[index + 1];
  if (!next || next.level === q.level) return false;
  const qs = PLACEMENT.map((x, i) => ({ x, i })).filter((y) => y.x.level === q.level);
  return qs.filter((y) => answers[y.i] === y.x.answer).length < 4;
}
