/**
 * Speaking B — Construção de frases: o aluno recebe uma situação (em português), monta a resposta
 * em inglês (falando ou escrevendo), recebe a correção e repete a versão corrigida em voz alta.
 * 8 situações por nível, com a estrutura-alvo do currículo.
 */
import type { CefrLevel } from "./types";

export interface BuildSituation {
  id: string;
  level: CefrLevel;
  situation_pt: string;
  /** Estrutura que a resposta deve usar (mostrada como dica). */
  target: string;
  /** Uma resposta-modelo possível. */
  model: string;
}

const S = (
  id: string,
  level: CefrLevel,
  situation_pt: string,
  target: string,
  model: string,
): BuildSituation => ({ id, level, situation_pt, target, model });

export const BUILD_SITUATIONS: BuildSituation[] = [
  // A1
  S(
    "b-a1-1",
    "A1",
    "Você conhece alguém numa festa. Diga seu nome, sua idade e de onde você é.",
    "I'm… / I'm … years old / I'm from…",
    "Hi! I'm Lucas. I'm 30 years old and I'm from Brazil.",
  ),
  S(
    "b-a1-2",
    "A1",
    "Diga o que você faz e onde trabalha.",
    "I'm a/an… / I work in…",
    "I'm a warehouse assistant. I work in a warehouse.",
  ),
  S(
    "b-a1-3",
    "A1",
    "Descreva sua manhã: a que horas acorda e o que faz.",
    "present simple + at + hora",
    "I get up at six. I have coffee and I take the bus.",
  ),
  S(
    "b-a1-4",
    "A1",
    "Num café, peça uma bebida e algo para comer.",
    "Can I have…, please?",
    "Can I have a coffee and a sandwich, please?",
  ),
  S(
    "b-a1-5",
    "A1",
    "Pergunte a alguém o preço de uma camiseta.",
    "How much is…?",
    "Excuse me, how much is this T-shirt?",
  ),
  S(
    "b-a1-6",
    "A1",
    "Diga duas coisas que você sabe fazer e uma que não sabe.",
    "I can… / I can't…",
    "I can cook and I can swim, but I can't dance.",
  ),
  S(
    "b-a1-7",
    "A1",
    "Diga o que existe perto da sua casa.",
    "There is… / There are…",
    "There is a park near my house and there are two supermarkets.",
  ),
  S(
    "b-a1-8",
    "A1",
    "Diga o que você está fazendo agora.",
    "I'm + -ing",
    "I'm studying English and I'm drinking coffee.",
  ),
  // A2
  S(
    "b-a2-1",
    "A2",
    "Conte o que você fez no último fim de semana.",
    "past simple",
    "Last weekend I visited my parents and we had a barbecue.",
  ),
  S(
    "b-a2-2",
    "A2",
    "Diga seus planos para as próximas férias.",
    "I'm going to…",
    "I'm going to travel to the beach with my family.",
  ),
  S(
    "b-a2-3",
    "A2",
    "Compare a sua cidade com outra cidade que você conhece.",
    "comparativos (bigger than, more … than)",
    "São Paulo is bigger and busier than Campinas.",
  ),
  S(
    "b-a2-4",
    "A2",
    "Dê um conselho a um amigo que está muito cansado.",
    "You should…",
    "You should go to bed early and drink less coffee.",
  ),
  S(
    "b-a2-5",
    "A2",
    "Pergunte a alguém se já foi a outro país.",
    "Have you ever…?",
    "Have you ever been to another country?",
  ),
  S(
    "b-a2-6",
    "A2",
    "Explique a um colega uma regra do seu trabalho.",
    "You have to… / You can't…",
    "You have to wear safety shoes and you can't use your phone here.",
  ),
  S(
    "b-a2-7",
    "A2",
    "No hotel, diga que há um problema no quarto.",
    "There's a problem with… / doesn't work",
    "Excuse me, there's a problem with my room. The air conditioning doesn't work.",
  ),
  S(
    "b-a2-8",
    "A2",
    "Convide um amigo para sair e sugira um horário.",
    "Would you like to…? / How about…?",
    "Would you like to have dinner on Friday? How about eight o'clock?",
  ),
  // B1
  S(
    "b-b1-1",
    "B1",
    "Conte uma experiência que mudou sua forma de pensar.",
    "present perfect + past simple",
    "I've worked abroad once. When I lived in Dublin, I learnt to be more independent.",
  ),
  S(
    "b-b1-2",
    "B1",
    "Diga o que você faria se ganhasse na loteria.",
    "second conditional",
    "If I won the lottery, I'd buy a house and travel around the world.",
  ),
  S(
    "b-b1-3",
    "B1",
    "Dê sua opinião sobre trabalhar de casa, com um argumento a favor e um contra.",
    "In my opinion… / On the other hand…",
    "In my opinion, working from home saves time. On the other hand, it can feel lonely.",
  ),
  S(
    "b-b1-4",
    "B1",
    "Explique um problema no seu pedido online e diga o que você quer.",
    "I'd like… / Could you…?",
    "My order arrived damaged. Could you send a new one, please?",
  ),
  S(
    "b-b1-5",
    "B1",
    "Numa entrevista, fale de um ponto forte seu com um exemplo.",
    "I'm good at… + for example",
    "I'm good at solving problems. For example, I reorganised our stock system last year.",
  ),
  S(
    "b-b1-6",
    "B1",
    "Descreva uma pessoa que você admira usando 'who'.",
    "relative clauses (who/which)",
    "I admire my mother, who raised three children and still went back to university.",
  ),
  S(
    "b-b1-7",
    "B1",
    "Diga o que você vai fazer se chover amanhã.",
    "first conditional",
    "If it rains tomorrow, I'll stay at home and watch a film.",
  ),
  S(
    "b-b1-8",
    "B1",
    "Explique como um produto é feito ou entregue no seu trabalho.",
    "passive voice (is made / is delivered)",
    "The products are checked, packed and delivered the next day.",
  ),
  // B2
  S(
    "b-b2-1",
    "B2",
    "Diga o que teria acontecido se você tivesse feito outra escolha profissional.",
    "third conditional",
    "If I had studied engineering, I would have worked in a factory.",
  ),
  S(
    "b-b2-2",
    "B2",
    "Conte o que seu chefe disse numa reunião.",
    "reported speech",
    "My manager said that the project would be delayed and that we needed more people.",
  ),
  S(
    "b-b2-3",
    "B2",
    "Numa reunião, discorde educadamente de uma proposta.",
    "I see your point, but… / I'm not sure that…",
    "I see your point, but I'm not sure that cutting the budget is the best option.",
  ),
  S(
    "b-b2-4",
    "B2",
    "Especule sobre por que um colega não veio à reunião.",
    "modal perfects (must have / might have)",
    "He must have missed the train, or he might have forgotten about it.",
  ),
  S(
    "b-b2-5",
    "B2",
    "Apresente brevemente um resultado do seu trabalho.",
    "As you can see… / This shows that…",
    "As you can see, delivery times dropped by 20%, which shows that the new process works.",
  ),
  S(
    "b-b2-6",
    "B2",
    "Negocie um prazo maior com um cliente.",
    "Would it be possible to…? / provided that…",
    "Would it be possible to extend the deadline to Friday, provided that we send a draft on Wednesday?",
  ),
  S(
    "b-b2-7",
    "B2",
    "Argumente a favor de uma ideia, ligando duas razões.",
    "Not only… but also / Moreover",
    "Not only is it cheaper, but it is also faster. Moreover, customers prefer it.",
  ),
  S(
    "b-b2-8",
    "B2",
    "Use uma expressão idiomática para dizer que algo foi fácil.",
    "idioms (a piece of cake…)",
    "The test was a piece of cake.",
  ),
  // C1
  S(
    "c-c1-1",
    "C1",
    "Critique uma decisão da empresa de forma diplomática.",
    "hedging (It might be worth… / I wonder whether…)",
    "I wonder whether it might be worth reconsidering the timing of this decision.",
  ),
  S(
    "c-c1-2",
    "C1",
    "Explique um conceito complexo do seu trabalho para um leigo.",
    "In other words… / Put simply…",
    "Put simply, we keep less stock and order more often, so nothing sits on the shelves for long.",
  ),
  S(
    "c-c1-3",
    "C1",
    "Comece uma frase com ênfase usando inversão.",
    "inversion (Never have I… / Not only…)",
    "Never have I seen such a well-organised team.",
  ),
  S(
    "c-c1-4",
    "C1",
    "Resuma um problema e proponha uma solução em uma frase longa e clara.",
    "Given that… , I'd suggest…",
    "Given that our costs have risen sharply, I'd suggest renegotiating our main supplier contract.",
  ),
  S(
    "c-c1-5",
    "C1",
    "Dê um feedback negativo de forma construtiva.",
    "softeners + specific suggestion",
    "Overall it's a solid report, although the conclusion could be a little more specific.",
  ),
  S(
    "c-c1-6",
    "C1",
    "Use uma frase com 'what' para dar ênfase (cleft sentence).",
    "What I need is…",
    "What we really need is a clearer plan for the next quarter.",
  ),
  S(
    "c-c1-7",
    "C1",
    "Fale de uma tendência usando linguagem precisa.",
    "steadily / sharply / a marked increase",
    "There has been a marked increase in online orders, which have risen steadily since March.",
  ),
  S(
    "c-c1-8",
    "C1",
    "Concorde parcialmente com alguém e acrescente uma ressalva.",
    "That's true to some extent, but…",
    "That's true to some extent, but it depends on the size of the company.",
  ),
  // C2
  S(
    "c-c2-1",
    "C2",
    "Recuse um convite de trabalho sem fechar portas.",
    "nuanced refusal",
    "I'm genuinely flattered, but the timing isn't right for me; I'd love to stay in touch.",
  ),
  S(
    "c-c2-2",
    "C2",
    "Faça uma crítica irônica e leve a uma reunião longa demais.",
    "irony / understatement",
    "Well, that was a refreshingly brief meeting — only three hours.",
  ),
  S(
    "c-c2-3",
    "C2",
    "Expresse incerteza sofisticada sobre um resultado.",
    "It remains to be seen whether…",
    "It remains to be seen whether the new policy will have the desired effect.",
  ),
  S(
    "c-c2-4",
    "C2",
    "Defenda uma posição antecipando a objeção.",
    "Granted, … ; nevertheless…",
    "Granted, the cost is high; nevertheless, the long-term savings more than justify it.",
  ),
  S(
    "c-c2-5",
    "C2",
    "Explique uma nuance entre duas palavras parecidas.",
    "the difference lies in…",
    "The difference lies in connotation: 'determined' is praise, while 'stubborn' is criticism.",
  ),
  S(
    "c-c2-6",
    "C2",
    "Resuma um texto em uma frase com registro formal.",
    "formal register",
    "The article contends that remote work, while efficient, may erode informal learning.",
  ),
  S(
    "c-c2-7",
    "C2",
    "Use uma expressão idiomática avançada de forma natural.",
    "idiom in context",
    "Let's not reinvent the wheel; the old process works well enough.",
  ),
  S(
    "c-c2-8",
    "C2",
    "Negocie com firmeza, mas mantendo a cordialidade.",
    "firm but polite",
    "I appreciate the offer, but unless the price reflects the volume, we'll have to look elsewhere.",
  ),
];

export const buildFor = (level: CefrLevel) =>
  BUILD_SITUATIONS.filter((s) => s.level === level);
export const getBuild = (id: string) =>
  BUILD_SITUATIONS.find((s) => s.id === id);
