/** Segunda leva de áudios do listening (3 por nível). */
import type { ListeningItem, ListeningQuestion } from "./listening";

const Q = (prompt: string, options: string[], answer: number): ListeningQuestion => ({ prompt, options, answer });

export const LISTENING_EXTRA: ListeningItem[] = [
  // ---------------------------------------------------------------- A1
  {
    id: "l-a1-shop", level: "A1", title: "Na loja de roupas", topic: "Compras", kind: "dialogue",
    lines: [
      { speaker: "Assistant", text: "Hello. Can I help you?" },
      { speaker: "Customer", text: "Yes, please. Do you have this T-shirt in blue?" },
      { speaker: "Assistant", text: "Yes, we do. What size are you?" },
      { speaker: "Customer", text: "Medium, please. How much is it?" },
      { speaker: "Assistant", text: "It's fifteen dollars." },
      { speaker: "Customer", text: "Great. I'll take it." },
    ],
    questions: [
      Q("Que cor a cliente quer?", ["Vermelha", "Azul", "Preta"], 1),
      Q("Qual é o tamanho?", ["Pequeno", "Médio", "Grande"], 1),
      Q("Quanto custa a camiseta?", ["$15", "$50", "$5"], 0),
    ],
    dictation: "Do you have this T-shirt in blue?",
  },
  {
    id: "l-a1-weather", level: "A1", title: "Como está o tempo?", topic: "Tempo", kind: "dialogue",
    lines: [
      { speaker: "Mia", text: "Hi, Dad! How's the weather in Toronto?" },
      { speaker: "Dad", text: "It's very cold today. It's snowing!" },
      { speaker: "Mia", text: "Wow! Here in Rio it's hot and sunny." },
      { speaker: "Dad", text: "Lucky you! Are you at the beach?" },
      { speaker: "Mia", text: "Yes, I'm at the beach with my friends." },
    ],
    questions: [
      Q("Como está o tempo em Toronto?", ["Quente e ensolarado", "Muito frio, nevando", "Chovendo"], 1),
      Q("Onde está a Mia?", ["Em Toronto", "Em casa", "Na praia, no Rio"], 2),
      Q("Com quem ela está?", ["Com amigos", "Com a mãe", "Sozinha"], 0),
    ],
    dictation: "It's very cold today.",
  },
  {
    id: "l-a1-directions", level: "A1", title: "Onde fica o banco?", topic: "Direções", kind: "dialogue",
    lines: [
      { speaker: "Tourist", text: "Excuse me. Where is the bank, please?" },
      { speaker: "Woman", text: "Go straight on and turn left. The bank is next to the supermarket." },
      { speaker: "Tourist", text: "Is it far?" },
      { speaker: "Woman", text: "No, it's about five minutes on foot." },
      { speaker: "Tourist", text: "Thank you very much!" },
    ],
    questions: [
      Q("Para onde a pessoa deve virar?", ["Direita", "Esquerda", "Não precisa virar"], 1),
      Q("O banco fica ao lado de quê?", ["Do supermercado", "Da farmácia", "Do hotel"], 0),
      Q("Quanto tempo a pé?", ["Uns 5 minutos", "Uns 15 minutos", "Uma hora"], 0),
    ],
    dictation: "The bank is next to the supermarket.",
  },
  // ---------------------------------------------------------------- A2
  {
    id: "l-a2-doctor", level: "A2", title: "No médico", topic: "Saúde", kind: "dialogue",
    lines: [
      { speaker: "Doctor", text: "Good morning. What seems to be the problem?" },
      { speaker: "Patient", text: "I've got a sore throat and a bad cough." },
      { speaker: "Doctor", text: "How long have you had it?" },
      { speaker: "Patient", text: "Since Sunday. And I had a fever last night." },
      { speaker: "Doctor", text: "OK. Take this medicine three times a day, and you should drink a lot of water. If you don't feel better in three days, come back." },
    ],
    questions: [
      Q("Quais são os sintomas?", ["Dor de cabeça e febre", "Dor de garganta e tosse", "Dor nas costas"], 1),
      Q("Desde quando?", ["Desde domingo", "Desde ontem", "Há uma semana"], 0),
      Q("Quando voltar ao médico?", ["Amanhã", "Se não melhorar em três dias", "Nunca"], 1),
    ],
    dictation: "I've got a sore throat and a bad cough.",
  },
  {
    id: "l-a2-invite", level: "A2", title: "Um convite", topic: "Convites", kind: "dialogue",
    lines: [
      { speaker: "Jake", text: "Hey Ana, would you like to come to my birthday party on Saturday?" },
      { speaker: "Ana", text: "I'd love to, but I'm working on Saturday. What time does it start?" },
      { speaker: "Jake", text: "At eight in the evening, at my place." },
      { speaker: "Ana", text: "Oh, I finish at seven, so I can come a bit later. Is that OK?" },
      { speaker: "Jake", text: "Of course! See you then." },
    ],
    questions: [
      Q("Qual é o convite?", ["Um jantar", "Festa de aniversário", "Um jogo de futebol"], 1),
      Q("A que horas começa?", ["Às 7", "Às 8 da noite", "Às 9"], 1),
      Q("O que a Ana decide?", ["Não vai", "Vai chegar um pouco mais tarde", "Vai chegar mais cedo"], 1),
    ],
    dictation: "Would you like to come to my birthday party?",
  },
  {
    id: "l-a2-childhood", level: "A2", title: "Quando eu era criança", topic: "Passado", kind: "monologue",
    lines: [
      { speaker: "Rafael", text: "When I was a kid, I lived on a farm in Minas Gerais. I used to wake up very early and help my grandfather with the animals. We didn't have a TV, so in the evenings we used to play cards and tell stories. Now I live in São Paulo and I work in an office. I don't see animals anymore, but I still love playing cards." },
    ],
    questions: [
      Q("Onde o Rafael morava?", ["Numa fazenda em Minas", "Em São Paulo", "Na praia"], 0),
      Q("O que faziam à noite?", ["Viam TV", "Jogavam cartas e contavam histórias", "Iam à cidade"], 1),
      Q("O que ele ainda adora?", ["Acordar cedo", "Os animais", "Jogar cartas"], 2),
    ],
    dictation: "We didn't have a TV.",
  },
  // ---------------------------------------------------------------- B1
  {
    id: "l-b1-complaint", level: "B1", title: "A complaint call", topic: "Reclamação", kind: "dialogue",
    lines: [
      { speaker: "Agent", text: "Thanks for calling Fast Delivery. How can I help?" },
      { speaker: "Customer", text: "I ordered a laptop two weeks ago, and it still hasn't arrived. The website says it was delivered on Monday, but I never received it." },
      { speaker: "Agent", text: "I'm really sorry about that. Could you give me your order number?" },
      { speaker: "Customer", text: "Sure, it's 4-7-2-9-1." },
      { speaker: "Agent", text: "Thank you. It looks like it was left with a neighbour by mistake. I'll open an investigation, and if we can't find it in forty-eight hours, we'll send you a new one." },
    ],
    questions: [
      Q("Qual é o problema?", ["O notebook chegou quebrado", "O notebook não chegou", "O preço estava errado"], 1),
      Q("O que provavelmente aconteceu?", ["Foi entregue a um vizinho por engano", "Ficou na transportadora", "Foi devolvido"], 0),
      Q("Qual é a solução?", ["Reembolso imediato", "Investigar e, se não achar em 48 h, mandar outro", "Esperar mais duas semanas"], 1),
    ],
    dictation: "It still hasn't arrived.",
  },
  {
    id: "l-b1-wish", level: "B1", title: "If I won the lottery", topic: "Hipóteses", kind: "dialogue",
    lines: [
      { speaker: "Sam", text: "What would you do if you won the lottery?" },
      { speaker: "Lia", text: "Honestly? I'd travel around the world for a year. And you?" },
      { speaker: "Sam", text: "I'd probably buy a house for my parents first. Then I'd quit my job and open a small coffee shop." },
      { speaker: "Lia", text: "A coffee shop? I didn't know you liked coffee that much!" },
      { speaker: "Sam", text: "I wish I had more time to learn about it. It's my secret dream." },
    ],
    questions: [
      Q("O que a Lia faria?", ["Compraria uma casa", "Viajaria pelo mundo por um ano", "Abriria um café"], 1),
      Q("O que o Sam faria primeiro?", ["Pediria demissão", "Compraria uma casa para os pais", "Viajaria"], 1),
      Q("Qual é o sonho secreto do Sam?", ["Ter um café", "Morar fora", "Ser professor"], 0),
    ],
    dictation: "I wish I had more time.",
  },
  {
    id: "l-b1-meeting", level: "B1", title: "A team meeting", topic: "Trabalho", kind: "dialogue",
    lines: [
      { speaker: "Manager", text: "OK, let's get started. The main point today is the new website. Paula, how's it going?" },
      { speaker: "Paula", text: "We're almost done with the design, but we're having some problems with the payment system." },
      { speaker: "Manager", text: "Will we be able to launch on the first of June?" },
      { speaker: "Paula", text: "I'm not sure. I'd suggest moving the launch to the fifteenth, just to be safe." },
      { speaker: "Manager", text: "Fine, let's go with the fifteenth. Let's move on to the budget." },
    ],
    questions: [
      Q("Qual é o problema?", ["O design", "O sistema de pagamento", "O orçamento"], 1),
      Q("O que a Paula sugere?", ["Lançar no dia 1º", "Adiar para o dia 15", "Cancelar o site"], 1),
      Q("Qual é o próximo assunto?", ["O orçamento", "Contratações", "Férias"], 0),
    ],
    dictation: "Let's move on to the budget.",
  },
  // ---------------------------------------------------------------- B2
  {
    id: "l-b2-feedback", level: "B2", title: "Giving feedback", topic: "Trabalho", kind: "dialogue",
    lines: [
      { speaker: "Lead", text: "Thanks for the report, Diego. Overall, it's really solid. I particularly liked the market analysis." },
      { speaker: "Diego", text: "Thanks. Was there anything you think could be improved?" },
      { speaker: "Lead", text: "Just one thing. The conclusion feels a bit rushed. It might be worth adding a couple of concrete recommendations, so the board knows exactly what we're asking for." },
      { speaker: "Diego", text: "That makes sense. I'll have a revised version ready by Thursday." },
    ],
    questions: [
      Q("O que a líder elogiou?", ["A conclusão", "A análise de mercado", "O design"], 1),
      Q("O que precisa melhorar?", ["A introdução", "A conclusão, com recomendações concretas", "Os gráficos"], 1),
      Q("Quando sai a nova versão?", ["Até quinta", "Até sexta", "Na semana que vem"], 0),
    ],
    dictation: "The conclusion feels a bit rushed.",
  },
  {
    id: "l-b2-regret", level: "B2", title: "A missed opportunity", topic: "Arrependimento", kind: "monologue",
    lines: [
      { speaker: "Carol", text: "Ten years ago I was offered a job in Berlin, and I turned it down because I was afraid of leaving my comfort zone. If I had accepted, I would have learned German and probably built a completely different career. I should have trusted myself more. That said, I don't dwell on it. The experience taught me to say yes to things that scare me, and that's exactly why I moved to Lisbon last year." },
    ],
    questions: [
      Q("Por que ela recusou a vaga em Berlim?", ["O salário era baixo", "Medo de sair da zona de conforto", "Não falava alemão"], 1),
      Q("Como ela lida com isso hoje?", ["Se arrepende todos os dias", "Não fica remoendo; aprendeu a dizer sim", "Quer voltar a Berlim"], 1),
      Q("O que ela fez no ano passado?", ["Mudou para Lisboa", "Aprendeu alemão", "Mudou de carreira"], 0),
    ],
    dictation: "I should have trusted myself more.",
  },
  {
    id: "l-b2-social", level: "B2", title: "Social media and teenagers", topic: "Debate", kind: "dialogue",
    lines: [
      { speaker: "Host", text: "Should schools ban phones completely?" },
      { speaker: "Teacher", text: "In my experience, banning them during lessons has made a huge difference. Students are more focused and actually talk to each other at break time." },
      { speaker: "Parent", text: "I see your point, but a total ban seems unrealistic. Kids need to learn to use technology responsibly, and that can't happen if we simply take it away." },
      { speaker: "Teacher", text: "Fair enough. Perhaps the answer is clear rules rather than a complete ban." },
    ],
    questions: [
      Q("O que o professor observou com a proibição em aula?", ["Mais foco e mais conversa", "Mais indisciplina", "Nenhuma diferença"], 0),
      Q("Qual é a posição da mãe/pai?", ["Proibição total", "Proibição total é irreal; é preciso ensinar o uso responsável", "Celular liberado sempre"], 1),
      Q("Onde chegam no final?", ["Regras claras em vez de proibição total", "Proibição total", "Nenhum acordo"], 0),
    ],
    dictation: "A total ban seems unrealistic.",
  },
  // ---------------------------------------------------------------- C1
  {
    id: "l-c1-pitch", level: "C1", title: "A startup pitch", topic: "Negócios", kind: "monologue",
    lines: [
      { speaker: "Founder", text: "Every year, small farmers lose up to a third of their harvest before it even reaches the market. Our app connects them directly with local restaurants, cutting out three layers of intermediaries. In our pilot in Minas Gerais, farmers' income rose by twenty-two percent, while restaurants paid less for fresher produce. We're now raising half a million dollars to expand to three more states, and we're confident we can break even within eighteen months." },
    ],
    questions: [
      Q("Qual problema o app resolve?", ["Falta de restaurantes", "Perda da colheita e intermediários demais", "Preço alto de sementes"], 1),
      Q("Qual foi o resultado do piloto?", ["Renda dos agricultores subiu 22%", "Restaurantes pagaram mais", "A colheita caiu"], 0),
      Q("Para que é o investimento?", ["Expandir para mais três estados", "Pagar dívidas", "Contratar agricultores"], 0),
    ],
    dictation: "We're confident we can break even within eighteen months.",
  },
  {
    id: "l-c1-sleep", level: "C1", title: "Radio: the science of sleep", topic: "Ciência", kind: "dialogue",
    lines: [
      { speaker: "Host", text: "So is it true that we can catch up on lost sleep at the weekend?" },
      { speaker: "Scientist", text: "Only partially, I'm afraid. A long lie-in can reduce the immediate tiredness, but research suggests it doesn't fully reverse the effects on concentration or metabolism. What matters most is consistency: going to bed and waking up at roughly the same time, even on Sundays." },
      { speaker: "Host", text: "That's going to be unpopular with our listeners!" },
      { speaker: "Scientist", text: "I know. But the body clock thrives on routine, arguably more than on the total number of hours." },
    ],
    questions: [
      Q("Dá para recuperar o sono no fim de semana?", ["Sim, totalmente", "Só em parte", "Não, de jeito nenhum"], 1),
      Q("O que mais importa segundo a cientista?", ["Dormir 10 horas", "Regularidade nos horários", "Cochilar à tarde"], 1),
      Q("Como o apresentador reage?", ["Diz que a ideia vai ser impopular", "Concorda feliz", "Muda de assunto"], 0),
    ],
    dictation: "The body clock thrives on routine.",
  },
  {
    id: "l-c1-crisis", level: "C1", title: "Handling a crisis", topic: "Comunicação", kind: "monologue",
    lines: [
      { speaker: "CEO", text: "I want to address yesterday's outage directly. For about four hours, many of you couldn't access your accounts, and that's simply not acceptable. The cause was a faulty update on our side, not an attack, and no data was compromised. We've already rolled it back and put additional checks in place. Every affected customer will receive a full month's credit. I'm sorry for the disruption, and we'll publish a detailed report by Friday." },
    ],
    questions: [
      Q("O que causou a falha?", ["Um ataque hacker", "Uma atualização com defeito", "Queda de energia"], 1),
      Q("Houve vazamento de dados?", ["Sim", "Não", "Ainda não se sabe"], 1),
      Q("Qual é a compensação?", ["Um mês de crédito", "Reembolso de um ano", "Nenhuma"], 0),
    ],
    dictation: "No data was compromised.",
  },
  // ---------------------------------------------------------------- C2
  {
    id: "l-c2-language", level: "C2", title: "Lecture: language and thought", topic: "Linguística", kind: "monologue",
    lines: [
      { speaker: "Lecturer", text: "The strong version of the claim, that language determines thought, has been largely discredited. Speakers of languages without a future tense can, of course, plan for the future. The weaker version, however, holds up remarkably well: the habitual distinctions a language forces you to make nudge your attention in particular directions. Whether that nudge amounts to a meaningful difference in worldview is, to my mind, still very much an open question." },
    ],
    questions: [
      Q("Qual versão foi praticamente desacreditada?", ["A forte: a língua determina o pensamento", "A fraca", "Nenhuma"], 0),
      Q("O que a versão fraca afirma?", ["Que a língua não tem efeito", "Que as distinções da língua direcionam a atenção", "Que só existe pensamento sem língua"], 1),
      Q("Qual é a posição do professor no fim?", ["Assunto encerrado", "Ainda é uma questão em aberto", "A versão forte está certa"], 1),
    ],
    dictation: "It is still very much an open question.",
  },
  {
    id: "l-c2-satire", level: "C2", title: "A satirical column", topic: "Humor", kind: "monologue",
    lines: [
      { speaker: "Columnist", text: "In a bold move to tackle the housing crisis, the council has announced that rents will henceforth be measured not in pounds but in personal sacrifices. A one-bedroom flat will cost roughly one hobby, two friendships and any lingering hope of owning a dog. Officials insist this is a great deal, pointing out that tenants will finally have something to talk about at dinner parties they can no longer afford to attend." },
    ],
    questions: [
      Q("Qual é o tom do texto?", ["Notícia séria", "Sátira", "Anúncio publicitário"], 1),
      Q("Qual problema real está por trás da piada?", ["Aluguéis caros", "Falta de transporte", "Desemprego"], 0),
      Q("Qual é a ironia final?", ["Os inquilinos terão assunto para jantares que não podem pagar", "Os inquilinos ganharão cachorros", "O aluguel ficará grátis"], 0),
    ],
    dictation: "Rents will be measured in personal sacrifices.",
  },
  {
    id: "l-c2-mediation", level: "C2", title: "Mediating a dispute", topic: "Mediação", kind: "dialogue",
    lines: [
      { speaker: "Mediator", text: "Let me see if I've understood both positions. Marta, your concern is less about the money than about being kept out of the loop on decisions." },
      { speaker: "Marta", text: "Exactly. I found out about the change from a client, which was frankly humiliating." },
      { speaker: "Mediator", text: "And Tom, you're saying the decision had to be made overnight, and there simply wasn't time to consult everyone." },
      { speaker: "Tom", text: "That's right, though I accept I should have called her the next morning at the very least." },
      { speaker: "Mediator", text: "So it sounds as though what's really needed is a protocol for urgent decisions, rather than a debate about this particular one." },
    ],
    questions: [
      Q("Qual é a queixa principal da Marta?", ["O dinheiro", "Ficar de fora das decisões", "O cliente"], 1),
      Q("O que o Tom admite?", ["Que deveria ter ligado na manhã seguinte", "Que a decisão foi errada", "Nada"], 0),
      Q("O que a mediadora propõe?", ["Desfazer a decisão", "Um protocolo para decisões urgentes", "Demitir alguém"], 1),
    ],
    dictation: "What's really needed is a protocol for urgent decisions.",
  },
];
