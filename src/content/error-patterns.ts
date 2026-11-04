/**
 * Padrões de dificuldade (Fase 4): as categorias em que os erros do aluno são agrupados,
 * com explicação em português, exemplos corretos, exercícios específicos e uma cena para usar
 * o conteúdo numa conversa.
 */
import type { Exercise } from "./types";

export type ErrorCategory =
  | "to-be"
  | "present"
  | "past"
  | "perfect"
  | "future"
  | "questions"
  | "negatives"
  | "prepositions"
  | "articles"
  | "modals"
  | "structure"
  | "vocabulary"
  | "listening"
  | "pronunciation";

export interface CategoryInfo {
  id: ErrorCategory;
  label: string;
  explanation_pt: string;
  examples: { en: string; pt: string }[];
  drills: Exercise[];
  /** Cena para praticar numa conversa (descrição em português, vira "Crie a sua situação"). */
  scene_pt: string;
  href?: string;
}

const mc = (id: string, prompt: string, options: string[], answer: number, explain?: string): Exercise => ({ id, type: "multiple_choice", skill: "grammar", prompt, options, answer, explain });
const li = (id: string, audio: string, options: string[], answer: number): Exercise => ({ id, type: "listening", skill: "listening", prompt: "Ouça e escolha o que você ouviu.", audio, options, answer });
const fb = (id: string, sentence: string, accepted: string[], explain?: string): Exercise => ({ id, type: "fill_blank", skill: "grammar", sentence, accepted, explain });

export const CATEGORIES_INFO: CategoryInfo[] = [
  {
    id: "to-be",
    label: "Verbo to be (am, is, are, was, were)",
    explanation_pt: "O to be é o “ser/estar”. Ele é obrigatório: em inglês não existe frase sem verbo. Idade, nome, profissão e sentimentos usam to be: “I am 30” (e não “I have 30”).",
    examples: [
      { en: "I'm 30 years old.", pt: "Eu tenho 30 anos." },
      { en: "She is tired today.", pt: "Ela está cansada hoje." },
      { en: "We were at home yesterday.", pt: "Nós estávamos em casa ontem." },
    ],
    drills: [
      mc("ep-tobe-1", "Como dizer “Eu tenho 25 anos”?", ["I have 25 years.", "I am 25 years old.", "I'm have 25."], 1),
      fb("ep-tobe-2", "My brothers ___ at work now.", ["are"]),
      fb("ep-tobe-3", "Where ___ you last night?", ["were"]),
      mc("ep-tobe-4", "Qual está correta?", ["He hungry.", "He is hungry.", "He are hungry."], 1),
    ],
    scene_pt: "Estou me apresentando para um novo colega: falo minha idade, profissão, de onde sou e como estou me sentindo hoje.",
  },
  {
    id: "present",
    label: "Presente (simples e contínuo, he/she + s)",
    explanation_pt: "No presente simples, he/she/it ganha -s no verbo: “she works”. Para o que acontece agora, use am/is/are + -ing: “I'm working”. Rotina = simples; agora = contínuo.",
    examples: [
      { en: "She works from home on Fridays.", pt: "Ela trabalha de casa às sextas." },
      { en: "I'm cooking right now.", pt: "Estou cozinhando agora." },
      { en: "He doesn't like coffee.", pt: "Ele não gosta de café." },
    ],
    drills: [
      fb("ep-pres-1", "My sister ___ (live) in Lisbon.", ["lives"]),
      mc("ep-pres-2", "Qual está correta?", ["He go to the gym every day.", "He goes to the gym every day.", "He going to the gym every day."], 1),
      mc("ep-pres-3", "Agora mesmo:", ["I study for an exam right now.", "I'm studying for an exam right now."], 1),
      fb("ep-pres-4", "Listen! The baby ___ (cry).", ["is crying", "'s crying"]),
    ],
    scene_pt: "Um amigo me liga e pergunta sobre minha rotina e o que estou fazendo agora; respondo falando de mim e da minha família.",
  },
  {
    id: "past",
    label: "Passado (did, -ed, verbos irregulares)",
    explanation_pt: "No passado, o verbo muda uma vez só: “I went”. Em pergunta e negativa quem carrega o passado é o did, e o verbo volta ao normal: “Did you go?”, “I didn't go” (e não “didn't went”).",
    examples: [
      { en: "I went to the beach last weekend.", pt: "Fui à praia no fim de semana passado." },
      { en: "Did you see the game?", pt: "Você viu o jogo?" },
      { en: "We didn't buy anything.", pt: "Nós não compramos nada." },
    ],
    drills: [
      fb("ep-past-1", "Yesterday I ___ (eat) pizza.", ["ate"]),
      mc("ep-past-2", "Qual está correta?", ["I didn't went to work.", "I didn't go to work.", "I not went to work."], 1),
      mc("ep-past-3", "Pergunta no passado:", ["Did you liked the movie?", "Did you like the movie?", "You liked the movie did?"], 1),
      fb("ep-past-4", "She ___ (buy) a new phone last week.", ["bought"]),
    ],
    scene_pt: "Encontro um amigo na segunda-feira e conto como foi meu fim de semana; ele faz perguntas sobre o que eu fiz.",
  },
  {
    id: "perfect",
    label: "Present perfect (have done, for/since)",
    explanation_pt: "O present perfect liga passado e presente: experiências (“I've been to Chile”) e coisas que começaram e continuam (“I've lived here for 5 years”). Com data exata no passado, use o passado simples.",
    examples: [
      { en: "I've worked here for three years.", pt: "Trabalho aqui há três anos." },
      { en: "Have you ever been to London?", pt: "Você já foi a Londres?" },
      { en: "She has just arrived.", pt: "Ela acabou de chegar." },
    ],
    drills: [
      mc("ep-perf-1", "“Moro aqui há 5 anos.”", ["I live here for 5 years.", "I've lived here for 5 years.", "I lived here since 5 years."], 1),
      fb("ep-perf-2", "I've known her ___ 2019.", ["since"]),
      mc("ep-perf-3", "Com data exata:", ["I've visited Rome in 2020.", "I visited Rome in 2020."], 1),
      fb("ep-perf-4", "Have you ___ tried sushi?", ["ever"]),
    ],
    scene_pt: "Numa entrevista, o recrutador pergunta há quanto tempo trabalho na minha área e quais experiências já tive.",
  },
  {
    id: "future",
    label: "Futuro (will, going to, presente contínuo)",
    explanation_pt: "Planos já decididos: going to ou presente contínuo (“I'm meeting Ana tomorrow”). Decisões na hora, promessas e previsões: will (“I'll help you”).",
    examples: [
      { en: "I'm going to travel in July.", pt: "Vou viajar em julho." },
      { en: "I'll call you later.", pt: "Eu te ligo mais tarde." },
      { en: "We're having dinner with my parents on Sunday.", pt: "Vamos jantar com meus pais no domingo." },
    ],
    drills: [
      mc("ep-fut-1", "O telefone toca. Você diz:", ["I'm going to answer it!", "I'll get it!"], 1),
      fb("ep-fut-2", "Next year I'm ___ to study in Canada.", ["going"]),
      mc("ep-fut-3", "Qual está correta?", ["I will to travel tomorrow.", "I will travel tomorrow."], 1),
      mc("ep-fut-4", "Plano já marcado:", ["I see the dentist tomorrow at 3.", "I'm seeing the dentist tomorrow at 3."], 1),
    ],
    scene_pt: "Combino com um amigo os planos para as próximas férias e para o fim de semana.",
  },
  {
    id: "questions",
    label: "Fazer perguntas (do/does/did, wh-)",
    explanation_pt: "Em inglês, a pergunta precisa de um auxiliar antes do sujeito: “Do you like…?”, “Where does she work?”, “What did you do?”. Com to be, basta inverter: “Are you ready?”.",
    examples: [
      { en: "Where do you work?", pt: "Onde você trabalha?" },
      { en: "What time does the store open?", pt: "Que horas a loja abre?" },
      { en: "How long have you lived here?", pt: "Há quanto tempo você mora aqui?" },
    ],
    drills: [
      mc("ep-q-1", "“Onde você mora?”", ["Where you live?", "Where do you live?", "Where you do live?"], 1),
      fb("ep-q-2", "___ she speak English?", ["Does"]),
      mc("ep-q-3", "Qual está correta?", ["What you did yesterday?", "What did you do yesterday?", "What did you did yesterday?"], 1),
      fb("ep-q-4", "How much ___ this cost?", ["does"]),
    ],
    scene_pt: "Conheço uma pessoa nova numa festa e preciso fazer várias perguntas para conhecê-la melhor (onde mora, o que faz, do que gosta).",
  },
  {
    id: "negatives",
    label: "Frases negativas (don't, doesn't, didn't, isn't)",
    explanation_pt: "A negativa usa o auxiliar + not: “I don't know”, “She doesn't eat meat”, “We didn't go”. Com to be e modais, o not vem direto: “It isn't open”, “You can't park here”. Nunca “I no like”.",
    examples: [
      { en: "I don't eat meat.", pt: "Eu não como carne." },
      { en: "He doesn't have a car.", pt: "Ele não tem carro." },
      { en: "It wasn't my fault.", pt: "Não foi culpa minha." },
    ],
    drills: [
      mc("ep-neg-1", "“Eu não gosto de chá.”", ["I no like tea.", "I don't like tea.", "I not like tea."], 1),
      fb("ep-neg-2", "She ___ work on Sundays.", ["doesn't", "does not"]),
      mc("ep-neg-3", "Qual está correta?", ["He doesn't likes it.", "He doesn't like it."], 1),
      fb("ep-neg-4", "They ___ at home yesterday. (to be)", ["weren't", "were not"]),
    ],
    scene_pt: "Num restaurante, explico ao garçom o que eu não como, o que não quero no prato e que o pedido não veio certo.",
  },
  {
    id: "prepositions",
    label: "Preposições (in, on, at, to, for)",
    explanation_pt: "Horas usam at (at 7), dias usam on (on Monday), meses/anos/cidades usam in (in May, in Rio). Movimento para um lugar usa to (go to work), mas “go home” não leva to.",
    examples: [
      { en: "The meeting is on Monday at 10.", pt: "A reunião é segunda às 10." },
      { en: "I'm going to the bank.", pt: "Vou ao banco." },
      { en: "She lives in São Paulo.", pt: "Ela mora em São Paulo." },
    ],
    drills: [
      fb("ep-prep-1", "I was born ___ 1995.", ["in"]),
      fb("ep-prep-2", "See you ___ Friday!", ["on"]),
      mc("ep-prep-3", "Qual está correta?", ["I go to home at 6.", "I go home at 6.", "I go in home at 6."], 1),
      fb("ep-prep-4", "The class starts ___ 8 o'clock.", ["at"]),
    ],
    scene_pt: "Marco uma consulta por telefone e combino dia, horário e endereço com a recepcionista.",
  },
  {
    id: "articles",
    label: "Artigos, plurais e quantidades (a/an/the, some, much/many)",
    explanation_pt: "Use a/an para uma coisa qualquer (a car, an apple) e the para algo específico. Profissão leva a: “I'm a teacher”. Many com o que se conta (many friends), much com o que não se conta (much time).",
    examples: [
      { en: "I'm an engineer.", pt: "Sou engenheiro." },
      { en: "How many people are coming?", pt: "Quantas pessoas vêm?" },
      { en: "Can I have some water?", pt: "Pode me dar um pouco de água?" },
    ],
    drills: [
      mc("ep-art-1", "“Sou médica.”", ["I'm doctor.", "I'm a doctor.", "I'm the doctor."], 1),
      fb("ep-art-2", "She has ___ orange in her bag.", ["an"]),
      mc("ep-art-3", "Qual está correta?", ["How much apples do you want?", "How many apples do you want?"], 1),
      mc("ep-art-4", "Qual está correta?", ["I need an informations.", "I need some information."], 1),
    ],
    scene_pt: "Estou no mercado pedindo ajuda para encontrar produtos e perguntando quantidades e preços.",
  },
  {
    id: "modals",
    label: "Modais e condicionais (can, should, would, if)",
    explanation_pt: "Depois de can, should, must, would e will o verbo vem sem to: “I can swim”, “You should rest”. Nas condicionais: “If it rains, I'll stay” (real) e “If I had money, I would travel” (imaginário).",
    examples: [
      { en: "Could you help me, please?", pt: "Você poderia me ajudar, por favor?" },
      { en: "You should see a doctor.", pt: "Você deveria ir ao médico." },
      { en: "If I had more time, I would study more.", pt: "Se eu tivesse mais tempo, estudaria mais." },
    ],
    drills: [
      mc("ep-mod-1", "Qual está correta?", ["I can to speak English.", "I can speak English."], 1),
      mc("ep-mod-2", "Conselho:", ["You should to rest.", "You should rest."], 1),
      fb("ep-mod-3", "If it rains tomorrow, we ___ stay home.", ["will", "'ll"]),
      mc("ep-mod-4", "Imaginário:", ["If I have a car, I would drive.", "If I had a car, I would drive."], 1),
    ],
    scene_pt: "Peço favores e conselhos a um colega de trabalho e discutimos o que faríamos em situações diferentes.",
  },
  {
    id: "structure",
    label: "Estrutura da frase (ordem, sujeito, conectivos)",
    explanation_pt: "Em inglês a frase quase sempre tem sujeito + verbo + complemento, e o sujeito não some: “It's raining” (e não “Is raining”). O adjetivo vem antes do substantivo: “a big house”.",
    examples: [
      { en: "It's very cold today.", pt: "Está muito frio hoje." },
      { en: "I have a red car.", pt: "Tenho um carro vermelho." },
      { en: "I called her because I was worried.", pt: "Liguei para ela porque estava preocupado." },
    ],
    drills: [
      mc("ep-str-1", "“Está chovendo.”", ["Is raining.", "It's raining."], 1),
      mc("ep-str-2", "Qual está correta?", ["I bought a car red.", "I bought a red car."], 1),
      mc("ep-str-3", "Qual está correta?", ["Always I drink coffee.", "I always drink coffee."], 1),
      mc("ep-str-4", "“É importante descansar.”", ["Is important to rest.", "It's important to rest."], 1),
    ],
    scene_pt: "Descrevo para um colega um problema que tive no trabalho e explico o porquê de cada decisão.",
  },
  {
    id: "vocabulary",
    label: "Vocabulário e expressões",
    explanation_pt: "Muitas palavras parecidas com o português têm outro sentido (falsos cognatos): “actually” = na verdade, “pretend” = fingir, “push” = empurrar. Aprenda palavras em blocos: “make a decision”, “take a photo”.",
    examples: [
      { en: "Actually, I prefer tea.", pt: "Na verdade, prefiro chá." },
      { en: "Can you take a photo of us?", pt: "Pode tirar uma foto da gente?" },
      { en: "I need to make a decision.", pt: "Preciso tomar uma decisão." },
    ],
    drills: [
      mc("ep-voc-1", "“Na verdade”:", ["Actually", "Currently"], 0),
      mc("ep-voc-2", "“Tomar uma decisão”:", ["take a decision", "make a decision"], 1),
      mc("ep-voc-3", "“Pretend” significa:", ["Pretender", "Fingir"], 1),
      mc("ep-voc-4", "“Tirar uma foto”:", ["take a photo", "remove a photo"], 0),
    ],
    scene_pt: "Conto para um amigo sobre uma viagem, usando expressões naturais como make plans, take photos e have fun.",
  },
  {
    id: "listening",
    label: "Compreensão auditiva",
    explanation_pt: "Na fala real, as palavras se juntam: “want to” vira “wanna”, “did you” vira “didja”. Ouça primeiro o sentido geral, depois os detalhes; use a velocidade lenta e repita em voz alta (shadowing).",
    examples: [
      { en: "Do you wanna grab a coffee?", pt: "Quer tomar um café?" },
      { en: "What did you do? (wha-didja-do)", pt: "O que você fez?" },
      { en: "I'm gonna be late.", pt: "Vou me atrasar." },
    ],
    drills: [
      li("ep-lis-1", "Do you wanna grab a coffee later?", ["Quer tomar um café mais tarde?", "Você já tomou café?"], 0),
      li("ep-lis-2", "I'm gonna be about ten minutes late.", ["Vou chegar uns dez minutos atrasado.", "Cheguei dez minutos antes."], 0),
      li("ep-lis-3", "Didja get my message?", ["Você recebeu minha mensagem?", "Você mandou a mensagem?"], 0),
      li("ep-lis-4", "Lemme know if you need anything.", ["Me avise se precisar de algo.", "Eu não preciso de nada."], 0),
    ],
    scene_pt: "Uma pessoa me dá instruções rápidas na estação de trem e eu preciso confirmar o que entendi.",
    href: "/listening",
  },
  {
    id: "pronunciation",
    label: "Pronúncia (sons difíceis para brasileiros)",
    explanation_pt: "Os sons que mais confundem brasileiros: th (think × sink), o r no início (red × head), vogais curtas e longas (ship × sheep) e o -ed final. Treine com pares mínimos e grave sua voz para comparar.",
    examples: [
      { en: "I think so.", pt: "Acho que sim." },
      { en: "The red car is ready.", pt: "O carro vermelho está pronto." },
      { en: "This ship is cheap.", pt: "Este navio é barato." },
    ],
    drills: [
      li("ep-pro-1", "think", ["think", "sink"], 0),
      li("ep-pro-2", "sheep", ["ship", "sheep"], 1),
      li("ep-pro-3", "head", ["red", "head"], 1),
      li("ep-pro-4", "three", ["three", "tree"], 0),
    ],
    scene_pt: "Leio em voz alta meu pedido num restaurante e o garçom pede para eu repetir algumas palavras.",
    href: "/pronuncia",
  },
];

export const getCategory = (id: string) => CATEGORIES_INFO.find((c) => c.id === id);

/** Categoria de um tema gramatical do currículo (texto do syllabus). */
export function categoryForGrammar(grammar: string): ErrorCategory {
  const g = grammar.toLowerCase();
  if (/negativ|don't|doesn't|didn't|won't|isn't/.test(g) && !/pergunta/.test(g)) return "negatives";
  if (/do\/does|perguntas|how much|how many|how do you|what time|where are you|what's your|how old|tag question|indiret/.test(g)) return "questions";
  if (/preposi|in\/on|on\/in|at \+/.test(g)) return "prepositions";
  if (/present perfect|for\/since|ever\/never|already\/yet|have been/.test(g)) return "perfect";
  if (/will|going to|futuro|be about to/.test(g)) return "future";
  if (/passado|did|went|used to|had \+|-ed/.test(g)) return "past";
  if (/to be|am \/ is|i'm/.test(g)) return "to-be";
  if (/presente|-ing|rotina/.test(g)) return "present";
  if (/a \/ an|artigo|some\/any|much|many|plura|contáve|quantificador|this\/that|there is/.test(g)) return "articles";
  if (/can|could|should|must|would|modal|if \+|condiciona|wish|have to|might/.test(g)) return "modals";
  if (/ordem|adjetivo|who \/ which|relativ|passiva|is made|clause|conectiv|conjun|cleft|inversão|fronting|never have i/.test(g)) return "structure";
  return "vocabulary";
}

const PREPS = new Set(["in", "on", "at", "to", "for", "from", "of", "with", "by", "about", "into", "since", "during"]);
const ARTS = new Set(["a", "an", "the", "some", "any", "much", "many"]);
const AUX_Q = new Set(["do", "does", "did"]);
const NEG = new Set(["not", "don't", "doesn't", "didn't", "isn't", "aren't", "wasn't", "weren't", "can't", "won't", "no"]);
const BE = new Set(["am", "is", "are", "was", "were", "i'm", "you're", "he's", "she's", "it's", "we're", "they're", "be"]);
const PERF = new Set(["have", "has", "had", "been", "i've", "you've", "we've", "they've", "since", "ever", "already", "yet"]);
const FUT = new Set(["will", "'ll", "going", "gonna", "i'll", "won't"]);
const MODALS = new Set(["can", "could", "should", "would", "must", "might", "may", "would've", "if"]);

const tok = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z' ]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);

/** Classifica uma correção (frase original × corrigida) numa categoria, pelas palavras que mudaram. */
export function classifyCorrection(original: string, corrected: string): ErrorCategory {
  const a = tok(original);
  const b = tok(corrected);
  // Diferença por contagem (multiconjunto): "What you do?" → "What do you do?" acrescenta um "do".
  const minus = (x: string[], y: string[]) => {
    const left = [...y];
    return x.filter((w) => {
      const i = left.indexOf(w);
      if (i >= 0) {
        left.splice(i, 1);
        return false;
      }
      return true;
    });
  };
  const removed = minus(a, b);
  const added = minus(b, a);
  const changed = [...removed, ...added];
  if (!changed.length) return a.join(" ") !== b.join(" ") ? "structure" : "vocabulary";
  const has = (set: Set<string>) => changed.some((w) => set.has(w));
  const addedHas = (set: Set<string>) => added.some((w) => set.has(w));
  if (corrected.trim().endsWith("?") && (has(AUX_Q) || has(BE))) return "questions";
  if (has(NEG)) return "negatives";
  if (addedHas(PERF)) return "perfect";
  if (addedHas(FUT)) return "future";
  if (has(MODALS)) return "modals";
  // "can to swim" → "can swim": o "to" depois de modal é erro de modal, não de preposição.
  if (removed.includes("to") && a.some((w, i) => MODALS.has(w) && a[i + 1] === "to")) return "modals";
  if (has(PREPS)) return "prepositions";
  if (has(ARTS)) return "articles";
  if (has(BE)) return "to-be";
  if (has(AUX_Q)) return "questions";
  if (changed.some((w) => /ed$/.test(w) || ["went", "ate", "saw", "got", "did", "bought", "made", "took", "came", "was", "were"].includes(w))) return "past";
  if (changed.some((w) => /(ing|s)$/.test(w)) && removed.length && added.length && removed.some((r) => added.some((x) => x.startsWith(r.slice(0, 3))))) return "present";
  return "vocabulary";
}
