/**
 * Terceira leva de listening (4 por nível): formatos da vida real — avisos, recados de voz,
 * notícias, podcasts e conversas naturais com hesitações — e sotaques britânico e australiano
 * em algumas falas (tocados com a voz do aparelho quando ele tem esse sotaque).
 */
import type { ListeningItem, ListeningQuestion } from "./listening";

const Q = (prompt: string, options: string[], answer: number): ListeningQuestion => ({ prompt, options, answer });

export const LISTENING_MORE: ListeningItem[] = [
  // ---------------------------------------------------------------- A1
  {
    id: "l-a1-voicemail", level: "A1", title: "Recado no celular", topic: "Recado de voz", kind: "monologue",
    lines: [
      { speaker: "Anna", text: "Hi, it's Anna. It's Friday, three o'clock." },
      { speaker: "Anna", text: "I'm at the café near the station." },
      { speaker: "Anna", text: "Call me back, please. My number is 555 0192." },
      { speaker: "Anna", text: "See you later. Bye!" },
    ],
    questions: [
      Q("Onde a Anna está?", ["Na estação", "No café perto da estação", "Em casa"], 1),
      Q("Que horas são no recado?", ["Duas horas", "Três horas", "Cinco horas"], 1),
      Q("O que ela pede?", ["Para ligar de volta", "Para ir ao café", "Para mandar mensagem"], 0),
    ],
    dictation: "Call me back, please.",
  },
  {
    id: "l-a1-hotel-gb", level: "A1", title: "Recepção do hotel em Londres", topic: "Hotel", kind: "dialogue",
    lines: [
      { speaker: "Receptionist", text: "Good evening. Welcome to the Park Hotel.", accent: "gb" },
      { speaker: "Guest", text: "Hi. I have a room for two nights. My name is Silva." },
      { speaker: "Receptionist", text: "Yes, Mr Silva. Room 304, on the third floor.", accent: "gb" },
      { speaker: "Guest", text: "What time is breakfast?" },
      { speaker: "Receptionist", text: "From seven to ten, in the restaurant.", accent: "gb" },
    ],
    questions: [
      Q("Quantas noites o hóspede vai ficar?", ["Uma", "Duas", "Três"], 1),
      Q("Em que andar fica o quarto?", ["Primeiro", "Segundo", "Terceiro"], 2),
      Q("Até que horas tem café da manhã?", ["Nove", "Dez", "Onze"], 1),
    ],
    dictation: "What time is breakfast?",
  },
  {
    id: "l-a1-family-photo", level: "A1", title: "A foto da família", topic: "Família", kind: "dialogue",
    lines: [
      { speaker: "Leo", text: "Is this your family?" },
      { speaker: "Bia", text: "Yes! This is my mother, and this is my father." },
      { speaker: "Leo", text: "And who is the boy?" },
      { speaker: "Bia", text: "That's my brother, Lucas. He's ten." },
      { speaker: "Leo", text: "And the dog?" },
      { speaker: "Bia", text: "That's Toby. He's very old!" },
    ],
    questions: [
      Q("Quem é o menino?", ["O primo", "O irmão", "O amigo"], 1),
      Q("Quantos anos ele tem?", ["Dez", "Doze", "Dois"], 0),
      Q("Como é o cachorro?", ["Novo", "Muito velho", "Pequeno"], 1),
    ],
    dictation: "This is my mother.",
  },
  {
    id: "l-a1-supermarket-au", level: "A1", title: "No supermercado em Sydney", topic: "Compras", kind: "dialogue",
    lines: [
      { speaker: "Cashier", text: "G'day! Do you need a bag?", accent: "au" },
      { speaker: "Customer", text: "Yes, please. One bag." },
      { speaker: "Cashier", text: "That's twenty-two dollars and forty cents.", accent: "au" },
      { speaker: "Customer", text: "Can I pay by card?" },
      { speaker: "Cashier", text: "No worries. Just tap here.", accent: "au" },
    ],
    questions: [
      Q("Quanto custam as compras?", ["$12,40", "$22,40", "$24,20"], 1),
      Q("Como o cliente paga?", ["Em dinheiro", "No cartão", "Com o celular"], 1),
      Q("\"No worries\" significa…", ["Sem problemas", "Não tem", "Não pode"], 0),
    ],
    dictation: "Can I pay by card?",
  },
  // ---------------------------------------------------------------- A2
  {
    id: "l-a2-train-announcement", level: "A2", title: "Aviso na estação", topic: "Aviso público", kind: "monologue",
    lines: [
      { speaker: "Announcer", text: "Attention, please. The 10:15 train to Manchester is running about twenty minutes late.", accent: "gb" },
      { speaker: "Announcer", text: "This train will now leave from platform six, not platform two.", accent: "gb" },
      { speaker: "Announcer", text: "We apologise for the delay.", accent: "gb" },
    ],
    questions: [
      Q("Para onde vai o trem?", ["Londres", "Manchester", "Liverpool"], 1),
      Q("Quanto tempo de atraso?", ["10 minutos", "15 minutos", "20 minutos"], 2),
      Q("De qual plataforma o trem vai sair agora?", ["Dois", "Seis", "Dez"], 1),
    ],
    dictation: "We apologise for the delay.",
  },
  {
    id: "l-a2-weekend-chat", level: "A2", title: "Como foi o fim de semana?", topic: "Conversa natural", kind: "dialogue",
    lines: [
      { speaker: "Kate", text: "Hey! So, how was your weekend?" },
      { speaker: "Ravi", text: "Um, it was OK. On Saturday I just stayed home and, you know, watched some series." },
      { speaker: "Kate", text: "Nice. Anything good?" },
      { speaker: "Ravi", text: "Yeah, a Spanish one about a bank robbery. And on Sunday I went cycling by the river." },
      { speaker: "Kate", text: "Oh, lucky you. It rained all day here, so I cleaned the whole flat!" },
    ],
    questions: [
      Q("O que o Ravi fez no sábado?", ["Saiu com amigos", "Ficou em casa vendo séries", "Andou de bicicleta"], 1),
      Q("Onde ele andou de bicicleta?", ["No parque", "Perto do rio", "Na praia"], 1),
      Q("Por que a Kate limpou o apartamento?", ["Choveu o dia todo", "Ia receber visitas", "Estava muito sujo"], 0),
    ],
    dictation: "It rained all day here.",
  },
  {
    id: "l-a2-pharmacy-au", level: "A2", title: "Na farmácia", topic: "Saúde", kind: "dialogue",
    lines: [
      { speaker: "Pharmacist", text: "Hi there. What can I do for you?", accent: "au" },
      { speaker: "Customer", text: "I've got a sore throat and a bit of a cough." },
      { speaker: "Pharmacist", text: "How long have you had it?", accent: "au" },
      { speaker: "Customer", text: "Since Monday." },
      { speaker: "Pharmacist", text: "OK. Take these lozenges three times a day, and drink lots of water. If you're not better in five days, see a doctor.", accent: "au" },
    ],
    questions: [
      Q("Qual é o problema?", ["Dor de cabeça", "Dor de garganta e tosse", "Febre alta"], 1),
      Q("Quantas vezes por dia tomar as pastilhas?", ["Duas", "Três", "Quatro"], 1),
      Q("Quando procurar um médico?", ["Hoje", "Se não melhorar em cinco dias", "Na segunda"], 1),
    ],
    dictation: "Drink lots of water.",
  },
  {
    id: "l-a2-news-weather", level: "A2", title: "Previsão do tempo no rádio", topic: "Rádio", kind: "monologue",
    lines: [
      { speaker: "Presenter", text: "And now the weather. Tomorrow will start cloudy, with some rain in the morning." },
      { speaker: "Presenter", text: "In the afternoon it will be sunny and warmer, around twenty-four degrees." },
      { speaker: "Presenter", text: "But take an umbrella on Sunday: there will be storms in the evening." },
    ],
    questions: [
      Q("Como vai começar o dia de amanhã?", ["Nublado e com chuva", "Com sol", "Com neve"], 0),
      Q("Qual a temperatura à tarde?", ["14 graus", "20 graus", "24 graus"], 2),
      Q("O que vai acontecer no domingo à noite?", ["Tempestades", "Muito frio", "Sol"], 0),
    ],
    dictation: "There will be storms in the evening.",
  },
  // ---------------------------------------------------------------- B1
  {
    id: "l-b1-voicemail-work", level: "B1", title: "Recado do chefe", topic: "Recado de voz", kind: "monologue",
    lines: [
      { speaker: "Mark", text: "Hi, it's Mark. Sorry to call so late. Listen, the meeting with the client has been moved to Thursday morning, nine thirty." },
      { speaker: "Mark", text: "Could you bring the updated figures and print five copies? Oh, and they've asked if we can keep it under an hour." },
      { speaker: "Mark", text: "Text me if there's a problem. Thanks!" },
    ],
    questions: [
      Q("What has changed?", ["The meeting place", "The meeting day and time", "The client"], 1),
      Q("How many copies should be printed?", ["Three", "Five", "Nine"], 1),
      Q("What did the client ask?", ["To have a shorter meeting", "To meet online", "To get the figures by email"], 0),
    ],
    dictation: "Could you bring the updated figures?",
  },
  {
    id: "l-b1-podcast-habits", level: "B1", title: "Podcast: criar hábitos", topic: "Podcast", kind: "monologue",
    lines: [
      { speaker: "Host", text: "Welcome back to the show. Today we're talking about habits, and why most of us give up after a couple of weeks." },
      { speaker: "Host", text: "The main problem is that we start too big. Instead of promising to run five kilometres every day, try putting on your trainers and walking for five minutes." },
      { speaker: "Host", text: "Once that feels automatic, you can add a bit more. And connect the new habit to something you already do, like after your morning coffee." },
    ],
    questions: [
      Q("Why do people usually give up, according to the host?", ["They start too big", "They are lazy", "They don't have time"], 0),
      Q("What is suggested instead of running 5 km?", ["Joining a gym", "Walking for five minutes", "Running twice a week"], 1),
      Q("How can you remember a new habit?", ["Use an app", "Connect it to something you already do", "Ask a friend"], 1),
    ],
    dictation: "The main problem is that we start too big.",
  },
  {
    id: "l-b1-flat-gb", level: "B1", title: "Visitando um apartamento", topic: "Moradia", kind: "dialogue",
    lines: [
      { speaker: "Agent", text: "So, this is the living room. It gets loads of light in the afternoon.", accent: "gb" },
      { speaker: "Tenant", text: "It's lovely. Are the bills included in the rent?" },
      { speaker: "Agent", text: "Water is, but electricity and internet aren't. You'd also need to pay a deposit of five weeks' rent.", accent: "gb" },
      { speaker: "Tenant", text: "I see. And is it OK to have a cat?" },
      { speaker: "Agent", text: "I'm afraid the landlord doesn't allow pets, sorry.", accent: "gb" },
    ],
    questions: [
      Q("Which bill is included in the rent?", ["Electricity", "Internet", "Water"], 2),
      Q("How much is the deposit?", ["One month", "Five weeks' rent", "Two months"], 1),
      Q("Can the tenant have a cat?", ["Yes", "Only a small one", "No, pets aren't allowed"], 2),
    ],
    dictation: "Are the bills included in the rent?",
  },
  {
    id: "l-b1-customer-call", level: "B1", title: "Ligação para o suporte", topic: "Atendimento", kind: "dialogue",
    lines: [
      { speaker: "Agent", text: "Thanks for holding. How can I help?" },
      { speaker: "Customer", text: "Hi, I ordered a pair of headphones last week, but the box arrived empty." },
      { speaker: "Agent", text: "Oh no, I'm really sorry about that. Can I have your order number?" },
      { speaker: "Customer", text: "Sure, it's B as in bravo, seven, two, nine, four." },
      { speaker: "Agent", text: "Got it. I'll send a new pair today by express delivery, at no extra cost. You should get it by Wednesday." },
    ],
    questions: [
      Q("What was the problem?", ["The headphones were broken", "The box arrived empty", "The wrong colour arrived"], 1),
      Q("What is the order number?", ["B7294", "D7294", "B7249"], 0),
      Q("What will the company do?", ["Give a refund", "Send a new pair by express delivery", "Ask the customer to return the box"], 1),
    ],
    dictation: "The box arrived empty.",
  },
  // ---------------------------------------------------------------- B2
  {
    id: "l-b2-news-transport", level: "B2", title: "Notícia: transporte público grátis", topic: "Notícias", kind: "monologue",
    lines: [
      { speaker: "Reporter", text: "From next month, buses in the city will be free for anyone under twenty-five, in a trial that will run until the end of the year.", accent: "gb" },
      { speaker: "Reporter", text: "The council says the aim is to cut traffic and help young people who are struggling with the cost of living.", accent: "gb" },
      { speaker: "Reporter", text: "Critics, however, argue that the money would be better spent on more frequent services, since many routes are already overcrowded at peak times.", accent: "gb" },
    ],
    questions: [
      Q("Who will travel for free?", ["Everyone", "People under 25", "Students only"], 1),
      Q("How long will the trial last?", ["One month", "Until the end of the year", "Two years"], 1),
      Q("What do critics suggest instead?", ["Cheaper tickets for everyone", "More frequent services", "More cycle lanes"], 1),
    ],
    dictation: "Many routes are already overcrowded at peak times.",
  },
  {
    id: "l-b2-job-interview", level: "B2", title: "Entrevista de emprego", topic: "Trabalho", kind: "dialogue",
    lines: [
      { speaker: "Interviewer", text: "Can you tell me about a time you had to deal with a difficult deadline?" },
      { speaker: "Candidate", text: "Sure. In my last job, a client brought a delivery forward by a week. I reorganised the team's priorities, postponed two smaller tasks and we stayed late a couple of days." },
      { speaker: "Interviewer", text: "And how did it turn out?" },
      { speaker: "Candidate", text: "We delivered on time, although, to be honest, I'd communicate the risks to the client earlier next time." },
    ],
    questions: [
      Q("What did the client do?", ["Cancelled the order", "Moved the delivery a week earlier", "Asked for a discount"], 1),
      Q("How did the candidate solve it?", ["Hired more people", "Reorganised priorities and postponed smaller tasks", "Asked for more time"], 1),
      Q("What would the candidate do differently?", ["Work faster", "Communicate the risks earlier", "Say no to the client"], 1),
    ],
    dictation: "We delivered on time.",
  },
  {
    id: "l-b2-debate-remote", level: "B2", title: "Debate: trabalho remoto", topic: "Debate", kind: "dialogue",
    lines: [
      { speaker: "Laura", text: "I honestly think remote work has made people more productive. No commute, fewer interruptions." },
      { speaker: "Tom", text: "That's true for some tasks, but I'd argue we've lost a lot of the informal learning that happens in an office.", accent: "au" },
      { speaker: "Laura", text: "Fair point, but that could be solved with a couple of office days a week." },
      { speaker: "Tom", text: "Maybe. My worry is that junior staff end up feeling isolated and nobody notices.", accent: "au" },
    ],
    questions: [
      Q("What advantage of remote work does Laura mention?", ["Higher salaries", "No commute and fewer interruptions", "More meetings"], 1),
      Q("What does Tom think has been lost?", ["Informal learning in the office", "Team salaries", "Holidays"], 0),
      Q("What is Tom's main worry?", ["Managers work too much", "Junior staff feeling isolated", "Offices are too expensive"], 1),
    ],
    dictation: "That's true for some tasks.",
  },
  {
    id: "l-b2-podcast-money", level: "B2", title: "Podcast: finanças pessoais", topic: "Podcast", kind: "monologue",
    lines: [
      { speaker: "Host", text: "One of the most common questions we get is: should I pay off my debts or start saving first?" },
      { speaker: "Host", text: "The short answer is that it depends on the interest rate. If you're paying a high rate on a credit card, clearing that debt is usually the best investment you can make." },
      { speaker: "Host", text: "That said, it's worth keeping a small emergency fund, even while you're paying things off, so that one unexpected bill doesn't push you back into debt." },
    ],
    questions: [
      Q("What does the decision depend on?", ["Your salary", "The interest rate", "Your age"], 1),
      Q("What is usually the best investment?", ["Buying shares", "Paying off high-interest debt", "Buying property"], 1),
      Q("Why keep an emergency fund?", ["To travel", "So an unexpected bill doesn't create new debt", "To get a better credit score"], 1),
    ],
    dictation: "It depends on the interest rate.",
  },
  // ---------------------------------------------------------------- C1
  {
    id: "l-c1-lecture-sleep", level: "C1", title: "Palestra: o cérebro e o sono", topic: "Palestra", kind: "monologue",
    lines: [
      { speaker: "Lecturer", text: "It's tempting to think of sleep as a passive state, a kind of switching off. In reality, the brain is remarkably active during the night.", accent: "gb" },
      { speaker: "Lecturer", text: "During deep sleep, it consolidates what we've learnt during the day, essentially deciding which memories are worth keeping.", accent: "gb" },
      { speaker: "Lecturer", text: "Which is why cramming all night before an exam is, ironically, one of the least effective strategies you could adopt.", accent: "gb" },
    ],
    questions: [
      Q("What misconception does the lecturer mention?", ["That dreams are meaningless", "That sleep is a passive state", "That we need eight hours"], 1),
      Q("What happens during deep sleep?", ["The brain consolidates learning", "The body stops working", "We dream the most"], 0),
      Q("What is said about studying all night before an exam?", ["It's the best strategy", "It's ironically one of the least effective", "It only works for some people"], 1),
    ],
    dictation: "The brain is remarkably active during the night.",
  },
  {
    id: "l-c1-supplier-deal", level: "C1", title: "Negociação com fornecedor", topic: "Negócios", kind: "dialogue",
    lines: [
      { speaker: "Buyer", text: "We'd be prepared to commit to a two-year contract, but only if the unit price comes down by at least eight percent." },
      { speaker: "Supplier", text: "Eight percent is a stretch, given rising material costs. Could we meet halfway, say five, with free delivery included?" },
      { speaker: "Buyer", text: "Five could work, provided you guarantee delivery within forty-eight hours." },
      { speaker: "Supplier", text: "I'd have to run that past my operations team, but I don't foresee a problem." },
    ],
    questions: [
      Q("What is the buyer's initial condition?", ["A 2-year contract with 8% off", "Free delivery only", "A one-year trial"], 0),
      Q("What does the supplier offer?", ["8% and faster delivery", "5% plus free delivery", "No discount but a longer contract"], 1),
      Q("What must the supplier still do?", ["Check with the operations team", "Lower the price again", "Sign immediately"], 0),
    ],
    dictation: "Could we meet halfway?",
  },
  {
    id: "l-c1-radio-interview", level: "C1", title: "Entrevista no rádio: cidades inteligentes", topic: "Entrevista", kind: "dialogue",
    lines: [
      { speaker: "Presenter", text: "Smart cities are often sold as a way of making urban life more efficient. Are you convinced?" },
      { speaker: "Expert", text: "Partly. Sensors can genuinely reduce congestion and energy waste. But there's a trade-off we rarely discuss: who owns all that data, and what else might it be used for?", accent: "au" },
      { speaker: "Presenter", text: "So, regulation before technology?" },
      { speaker: "Expert", text: "Ideally alongside it. Waiting for perfect rules means falling behind, but rushing ahead without them is how trust gets lost.", accent: "au" },
    ],
    questions: [
      Q("What benefit does the expert accept?", ["Lower taxes", "Less congestion and energy waste", "More jobs"], 1),
      Q("What concern does the expert raise?", ["Data ownership and use", "The cost of sensors", "Noise"], 0),
      Q("What is the expert's view on regulation?", ["It should come long before technology", "It should develop alongside technology", "It isn't necessary"], 1),
    ],
    dictation: "There's a trade-off we rarely discuss.",
  },
  {
    id: "l-c1-feedback-meeting", level: "C1", title: "Conversa de feedback", topic: "Trabalho", kind: "dialogue",
    lines: [
      { speaker: "Manager", text: "Overall, it's been a strong quarter for you. The client presentations in particular were excellent." },
      { speaker: "Employee", text: "Thanks, I appreciate that. Is there anything you'd like me to work on?" },
      { speaker: "Manager", text: "If I'm honest, you sometimes take on too much yourself. Delegating more would free you up for the strategic work." },
      { speaker: "Employee", text: "That's fair. I suppose I worry things won't get done properly, but I can see it's holding me back." },
    ],
    questions: [
      Q("What did the manager praise?", ["The reports", "The client presentations", "Punctuality"], 1),
      Q("What should the employee improve?", ["Delegating more", "Arriving earlier", "Talking less in meetings"], 0),
      Q("Why does the employee avoid delegating?", ["Lack of time", "Worry that things won't be done properly", "No team to delegate to"], 1),
    ],
    dictation: "You sometimes take on too much yourself.",
  },
  // ---------------------------------------------------------------- C2
  {
    id: "l-c2-panel-ai", level: "C2", title: "Painel: IA e criatividade", topic: "Debate", kind: "dialogue",
    lines: [
      { speaker: "Chair", text: "Let's turn to the question everyone's been skirting around: is AI a threat to creative work?", accent: "gb" },
      { speaker: "Novelist", text: "I'd resist the word threat. What it does threaten is the bottom end of the market, the formulaic stuff that was arguably never very creative to begin with." },
      { speaker: "Illustrator", text: "With respect, that's easy to say from the top of the profession. The bottom end is where most of us earn a living, and where newcomers learn their craft.", accent: "au" },
      { speaker: "Novelist", text: "Point taken. Though I'd still argue the answer lies in how we value human work, not in trying to halt the technology." },
    ],
    questions: [
      Q("What does the novelist say AI threatens?", ["All creative work", "The formulaic, low end of the market", "Only illustration"], 1),
      Q("How does the illustrator respond?", ["She fully agrees", "She says that's where most people earn a living and learn", "She says AI is harmless"], 1),
      Q("Where does the novelist see the solution?", ["Banning the technology", "How we value human work", "Lower prices"], 1),
    ],
    dictation: "I'd resist the word threat.",
  },
  {
    id: "l-c2-comedy-ironic", level: "C2", title: "Monólogo irônico", topic: "Humor e ironia", kind: "monologue",
    lines: [
      { speaker: "Comedian", text: "I've finally achieved work-life balance. I now feel equally guilty at work and at home.", accent: "gb" },
      { speaker: "Comedian", text: "My manager says my door is always open. Which would be lovely, if I had a door. Or an office. Or, frankly, a chair that doesn't sink every twenty minutes.", accent: "gb" },
      { speaker: "Comedian", text: "Still, they did give us a wellbeing webinar. At eight p.m. On a Friday.", accent: "gb" },
    ],
    questions: [
      Q("What is the joke about work-life balance?", ["He works less now", "He feels equally guilty in both places", "He works from home"], 1),
      Q("Why is 'my door is always open' ironic?", ["He doesn't even have a door or office", "The manager is never there", "The door is broken"], 0),
      Q("What is ironic about the wellbeing webinar?", ["It was very long", "It was at 8 p.m. on a Friday", "It was cancelled"], 1),
    ],
    dictation: "My manager says my door is always open.",
  },
  {
    id: "l-c2-academic-q", level: "C2", title: "Pergunta numa conferência", topic: "Acadêmico", kind: "dialogue",
    lines: [
      { speaker: "Audience", text: "Thank you for a fascinating talk. I wonder, though, whether your sample, which was drawn entirely from university students, might limit how far the findings can be generalised?" },
      { speaker: "Speaker", text: "That's an entirely legitimate concern, and one we flag in the paper. We'd be cautious about extrapolating to older populations.", accent: "gb" },
      { speaker: "Speaker", text: "That said, the effect held across three countries, which suggests it isn't merely a cultural artefact. A follow-up with a broader sample is already under way.", accent: "gb" },
    ],
    questions: [
      Q("What does the audience member question?", ["The statistics", "Whether results generalise beyond students", "The cost of the study"], 1),
      Q("How does the speaker respond?", ["Rejects the concern", "Acknowledges it and says they flag it", "Says it doesn't matter"], 1),
      Q("What supports the findings, according to the speaker?", ["The effect held in three countries", "The sample was huge", "Older people were included"], 0),
    ],
    dictation: "That's an entirely legitimate concern.",
  },
  {
    id: "l-c2-voicemail-tense", level: "C2", title: "Recado tenso de um cliente", topic: "Recado de voz", kind: "monologue",
    lines: [
      { speaker: "Client", text: "Hello, this is Helen Ward. I'm ringing, yet again, about the invoice you assured me would be corrected by Monday." },
      { speaker: "Client", text: "I don't wish to be difficult, but this is now the third time I've had to chase it, and it's starting to reflect rather poorly on your firm." },
      { speaker: "Client", text: "I'd appreciate a call back today, before I'm obliged to take it further." },
    ],
    questions: [
      Q("Why is Helen calling?", ["To place a new order", "About an invoice that still hasn't been corrected", "To cancel a meeting"], 1),
      Q("How many times has she chased it?", ["Once", "Twice", "Three times"], 2),
      Q("What is implied at the end?", ["She is happy to wait", "She may escalate the matter", "She will pay anyway"], 1),
    ],
    dictation: "I'd appreciate a call back today.",
  },
];
