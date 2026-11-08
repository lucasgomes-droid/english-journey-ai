/**
 * Leitura por módulo (A1–B1): um texto curto do dia a dia + 3 perguntas de compreensão.
 * Entram no fim do teste de cada módulo (skill "reading"), com IDs novos (`<teste>-r1…r3`),
 * sem mudar os IDs que já existem. A1: ~70 palavras · A2: ~110 · B1: ~160.
 */
import { READINGS_ADVANCED } from "./readings-advanced";

export interface ReadingQuestion {
  q: string;
  options: string[];
  answer: number;
}
export interface Reading {
  moduleId: string;
  title: string;
  text: string;
  questions: ReadingQuestion[];
}

export const READINGS: Reading[] = [
  // ---------------------------------------------------------------- A1 (por unidade)
  {
    moduleId: "a1-m2",
    title: "My new gym card",
    text: "Name: Lucas Gomes. Age: 30. Country: Brazil. Nationality: Brazilian. Phone: 555 0147. Lucas's birthday is on 12 March. The gym opens at six o'clock in the morning and closes at ten at night. Lucas goes on Mondays, Wednesdays and Fridays at seven thirty in the evening.",
    questions: [
      { q: "Quantos anos o Lucas tem?", options: ["13", "30", "33"], answer: 1 },
      { q: "Quando é o aniversário dele?", options: ["12 de março", "2 de maio", "12 de maio"], answer: 0 },
      { q: "A que horas ele vai à academia?", options: ["Às 6h", "Às 19h30", "Às 22h"], answer: 1 },
    ],
  },
  {
    moduleId: "a1-m1",
    title: "A new neighbor",
    text: "Hi! My name is Carla. I'm 28 years old and I'm from Recife, in Brazil. I live in Chicago now. I'm a nurse. My new neighbor is Tom. He is from Canada. He is very friendly. Every morning he says, \"Good morning, Carla! How are you?\" and I say, \"I'm fine, thanks. And you?\"",
    questions: [
      { q: "De onde é a Carla?", options: ["Do Canadá", "Do Brasil", "De Portugal"], answer: 1 },
      { q: "Qual é a profissão dela?", options: ["Professora", "Enfermeira", "Médica"], answer: 1 },
      { q: "Como é o Tom?", options: ["Simpático", "Tímido", "Bravo"], answer: 0 },
    ],
  },
  {
    moduleId: "a1-m4",
    title: "My family",
    text: "This is my family. My husband's name is Paulo. He is a mechanic. We have two children: Ana is eight and Leo is five. My mother lives with us. She is 65. We also have a dog. His name is Max and he is black and white. Our house is small, but we are happy.",
    questions: [
      { q: "Quantos filhos eles têm?", options: ["Um", "Dois", "Três"], answer: 1 },
      { q: "Quem mora com a família?", options: ["A mãe", "O irmão", "A avó do Paulo"], answer: 0 },
      { q: "Como é o cachorro?", options: ["Marrom", "Preto e branco", "Pequeno e branco"], answer: 1 },
    ],
  },
  {
    moduleId: "a1-m3",
    title: "Marcos's day",
    text: "Marcos gets up at six o'clock. He has coffee and bread for breakfast. He takes the bus to work at seven. He works in a supermarket. He has lunch at twelve thirty. In the evening he goes to the gym on Mondays and Wednesdays. He watches TV and goes to bed at eleven.",
    questions: [
      { q: "Como o Marcos vai para o trabalho?", options: ["De carro", "De ônibus", "A pé"], answer: 1 },
      { q: "Onde ele trabalha?", options: ["Num supermercado", "Num banco", "Numa academia"], answer: 0 },
      { q: "Quando ele vai à academia?", options: ["Todo dia", "Segunda e quarta", "Só no sábado"], answer: 1 },
    ],
  },
  {
    moduleId: "a1-m6",
    title: "Where is the pharmacy?",
    text: "I live on Green Street. There is a big park near my house. There is a bakery next to the bank, and the pharmacy is across from the bakery. There isn't a supermarket on my street, but there is one on the corner of Green Street and Main Street. The bus stop is in front of the park.",
    questions: [
      { q: "Onde fica a farmácia?", options: ["Ao lado do banco", "Em frente à padaria", "Na esquina"], answer: 1 },
      { q: "Tem supermercado na Green Street?", options: ["Sim, ao lado do parque", "Não, fica na esquina com a Main Street", "Não tem supermercado no bairro"], answer: 1 },
      { q: "Onde fica o ponto de ônibus?", options: ["Em frente ao parque", "Atrás do banco", "Ao lado da farmácia"], answer: 0 },
    ],
  },
  {
    moduleId: "a1-final",
    title: "Free time",
    text: "On weekends I love cooking for my friends. I can make good pizza, but I can't make cakes! On Saturday mornings I play football with my brother. I don't like swimming because the water is cold. On Sunday afternoons I usually read a book or listen to music. I never work on Sundays.",
    questions: [
      { q: "O que a pessoa NÃO sabe fazer?", options: ["Pizza", "Bolo", "Futebol"], answer: 1 },
      { q: "Por que ela não gosta de nadar?", options: ["A água é fria", "Não sabe nadar", "Não tem tempo"], answer: 0 },
      { q: "O que ela faz no domingo à tarde?", options: ["Trabalha", "Joga futebol", "Lê ou ouve música"], answer: 2 },
    ],
  },
  {
    moduleId: "a1-m5",
    title: "At the market",
    text: "Customer: Excuse me, how much are these apples?\nSeller: They're two dollars a kilo.\nCustomer: OK, I'd like two kilos, please. And do you have bananas?\nSeller: Yes, they're over there. One dollar fifty a kilo.\nCustomer: Great. Can I pay by card?\nSeller: Sorry, only cash today.",
    questions: [
      { q: "Quanto custa o quilo da maçã?", options: ["1,50 dólar", "2 dólares", "4 dólares"], answer: 1 },
      { q: "Quantos quilos de maçã a cliente quer?", options: ["Um", "Dois", "Três"], answer: 1 },
      { q: "Como ela precisa pagar hoje?", options: ["Só em dinheiro", "Só no cartão", "Como quiser"], answer: 0 },
    ],
  },
  {
    moduleId: "a1-m7",
    title: "A message to a friend",
    text: "Hi Julia! I'm at the airport now. I'm waiting for my flight to Lisbon. It's raining here and the flight is late. A lot of people are sitting on the floor! I'm drinking a coffee and reading my English book. I'm not hungry. See you tonight! Love, Bia",
    questions: [
      { q: "Onde a Bia está agora?", options: ["Em Lisboa", "No aeroporto", "No trem"], answer: 1 },
      { q: "Como está o voo?", options: ["Atrasado", "Cancelado", "No horário"], answer: 0 },
      { q: "O que a Bia está fazendo?", options: ["Comendo", "Dormindo", "Tomando café e lendo"], answer: 2 },
    ],
  },
  {
    moduleId: "a1-m8",
    title: "Last Saturday",
    text: "Last Saturday was a great day. In the morning I visited my grandmother. We had lunch together and she told me stories about her childhood. In the afternoon I went to the beach with my friends. The weather was hot and sunny. We played volleyball. In the evening I was very tired, so I stayed home and watched a movie.",
    questions: [
      { q: "Quem a pessoa visitou de manhã?", options: ["A avó", "Os amigos", "A tia"], answer: 0 },
      { q: "Como estava o tempo à tarde?", options: ["Chuvoso", "Quente e ensolarado", "Frio"], answer: 1 },
      { q: "O que ela fez à noite?", options: ["Foi a uma festa", "Ficou em casa e viu um filme", "Jogou vôlei"], answer: 1 },
    ],
  },
  // ---------------------------------------------------------------- A2
  {
    moduleId: "a2-m1",
    title: "Have you ever...?",
    text: "I've lived in three different countries, but I've never been to Asia. I've worked as a waiter, a driver and a receptionist. The most interesting job was at a hotel in Lisbon, because I met people from all over the world. I've also tried some unusual food, like snails in France. I didn't like them very much! This year I've already visited two new cities, and I want to see Japan before I'm forty.",
    questions: [
      { q: "Em quantos países a pessoa já morou?", options: ["Dois", "Três", "Quatro"], answer: 1 },
      { q: "Por que o trabalho no hotel foi o mais interessante?", options: ["O salário era alto", "Conheceu gente do mundo todo", "Era perto de casa"], answer: 1 },
      { q: "O que a pessoa quer fazer antes dos 40?", options: ["Morar na França", "Conhecer o Japão", "Trabalhar num hotel"], answer: 1 },
    ],
  },
  {
    moduleId: "a2-m2",
    title: "Weekend plans",
    text: "Next weekend is going to be busy. On Friday evening I'm meeting my cousins at a new Italian restaurant. We've booked a table for eight o'clock. On Saturday I'm going to clean the apartment in the morning, because my parents are arriving in the afternoon. They're staying with me until Monday. I think it will rain on Sunday, so we're probably going to visit a museum instead of the park.",
    questions: [
      { q: "Com quem a pessoa vai jantar na sexta?", options: ["Com os pais", "Com os primos", "Com colegas de trabalho"], answer: 1 },
      { q: "Por que ela vai limpar o apartamento no sábado?", options: ["Os pais chegam à tarde", "Vai dar uma festa", "Vai se mudar"], answer: 0 },
      { q: "Por que talvez visitem um museu no domingo?", options: ["O parque está fechado", "Provavelmente vai chover", "Os pais preferem museus"], answer: 1 },
    ],
  },
  {
    moduleId: "a2-m3",
    title: "Choosing a phone",
    text: "I need a new phone and I can't decide. The Nova X is cheaper than the Zeta 5, and it's lighter too. But the Zeta 5 has a better camera and the battery lasts longer: about two days, compared with one day for the Nova X. My sister says the Zeta 5 is the best phone she has ever had. For me, the battery is the most important thing, because I travel a lot for work.",
    questions: [
      { q: "Qual celular é mais barato?", options: ["Nova X", "Zeta 5", "Os dois custam igual"], answer: 0 },
      { q: "Quanto dura a bateria do Zeta 5?", options: ["Um dia", "Uns dois dias", "Uma semana"], answer: 1 },
      { q: "O que é mais importante para a pessoa?", options: ["A câmera", "O preço", "A bateria"], answer: 2 },
    ],
  },
  {
    moduleId: "a2-m4",
    title: "Advice for a new job",
    text: "Starting a new job? Here is some advice. You should arrive a little early on the first day. You don't have to know everything, so don't be afraid to ask questions. You must follow the safety rules, especially in a warehouse or a factory. You shouldn't use your phone during meetings. And try to learn your colleagues' names in the first week: people really like it when you remember them.",
    questions: [
      { q: "O que você deveria fazer no primeiro dia?", options: ["Chegar um pouco mais cedo", "Saber tudo sobre a empresa", "Não fazer perguntas"], answer: 0 },
      { q: "O que é obrigatório (must)?", options: ["Usar o celular nas reuniões", "Seguir as regras de segurança", "Chegar uma hora antes"], answer: 1 },
      { q: "Por que aprender o nome dos colegas?", options: ["É uma regra da empresa", "As pessoas gostam quando você lembra", "Para fazer relatórios"], answer: 1 },
    ],
  },
  {
    moduleId: "a2-m5",
    title: "A problem at the hotel",
    text: "When we arrived at the hotel, the receptionist couldn't find our booking. We showed her the confirmation email on my phone, and after ten minutes she gave us a room on the third floor. Unfortunately, the air conditioning wasn't working and it was very hot. We called reception and they moved us to a bigger room with a view of the sea. In the end, the problem was good for us!",
    questions: [
      { q: "Qual foi o primeiro problema?", options: ["O quarto estava sujo", "Não acharam a reserva", "O hotel estava lotado"], answer: 1 },
      { q: "O que não funcionava no quarto?", options: ["O ar-condicionado", "O chuveiro", "A TV"], answer: 0 },
      { q: "Como terminou a história?", options: ["Eles foram para outro hotel", "Ganharam um quarto maior com vista para o mar", "Receberam o dinheiro de volta"], answer: 1 },
    ],
  },
  {
    moduleId: "a2-m6",
    title: "Studying at night",
    text: "Renata works in an office from nine to five, and three evenings a week she studies English online. It isn't easy, because she is often tired after work. She has found some tricks: she studies for only twenty minutes before dinner, she listens to podcasts on the bus, and she practices speaking with a colleague at lunch. Her goal is to get a job at an international company next year.",
    questions: [
      { q: "Quantas noites por semana a Renata estuda?", options: ["Duas", "Três", "Todas"], answer: 1 },
      { q: "Onde ela ouve podcasts?", options: ["No ônibus", "Na academia", "No escritório"], answer: 0 },
      { q: "Qual é o objetivo dela?", options: ["Morar fora", "Trabalhar numa empresa internacional", "Dar aulas de inglês"], answer: 1 },
    ],
  },
  {
    moduleId: "a2-m7",
    title: "Old friends",
    text: "I met my best friend, Diego, when we were seven. We were in the same class and we used to play football every day after school. When we were teenagers, his family moved to Chile and we didn't see each other for ten years. Last month he found me on social media. He's coming to visit in December, and I can't wait to see him again.",
    questions: [
      { q: "Quantos anos eles tinham quando se conheceram?", options: ["Sete", "Dez", "Quinze"], answer: 0 },
      { q: "Por que pararam de se ver?", options: ["Brigaram", "A família do Diego se mudou para o Chile", "Mudaram de escola"], answer: 1 },
      { q: "Como voltaram a se falar?", options: ["Pelas redes sociais", "Por um amigo em comum", "Numa viagem"], answer: 0 },
    ],
  },
  {
    moduleId: "a2-m8",
    title: "Local news",
    text: "A new bike lane opened in the city center yesterday. The lane is four kilometers long and connects the train station to the university. The mayor said that more people will cycle to work and the air will be cleaner. Some shop owners are worried because there are fewer parking spaces now. A survey says that 60% of residents support the project.",
    questions: [
      { q: "O que foi inaugurado?", options: ["Uma estação de trem", "Uma ciclovia", "Um estacionamento"], answer: 1 },
      { q: "Por que alguns comerciantes estão preocupados?", options: ["Há menos vagas para estacionar", "As lojas vão fechar", "O trânsito aumentou"], answer: 0 },
      { q: "Quantos moradores apoiam o projeto?", options: ["40%", "50%", "60%"], answer: 2 },
    ],
  },
  // ---------------------------------------------------------------- B1
  {
    moduleId: "b1-m1",
    title: "The day I missed my flight",
    text: "I had been planning the trip for months, so I was really excited. On the morning of the flight, I woke up late because my phone had died during the night. I jumped into a taxi, but there was an accident on the highway and we were stuck for forty minutes. By the time I got to the airport, the gate had already closed. I was furious with myself. Luckily, the woman at the information desk was incredibly kind: she found me a seat on an evening flight for a small fee. While I was waiting, I met another traveler who had missed the same flight, and we ended up having dinner together. Looking back, it was one of the best days of the trip.",
    questions: [
      { q: "Why did the writer wake up late?", options: ["The alarm was off", "The phone battery had died", "They went to bed very late"], answer: 1 },
      { q: "Why was the taxi delayed?", options: ["There was an accident on the highway", "The driver got lost", "It was raining heavily"], answer: 0 },
      { q: "How does the writer feel about that day now?", options: ["It was a disaster", "It was one of the best days of the trip", "They still feel angry"], answer: 1 },
    ],
  },
  {
    moduleId: "b1-m2",
    title: "If I could live anywhere",
    text: "People often ask me where I would live if I could choose any place in the world. If money weren't a problem, I'd probably move to a small town near the sea, somewhere warm but not too hot. I'd work from home three days a week and spend the rest of my time learning to surf. However, I know that if I left my city, I'd miss my friends and family a lot. And if I didn't have my job, I wouldn't be able to pay for any of it! So, for now, I take short trips to the coast whenever I can and imagine what my life would be like there.",
    questions: [
      { q: "Where would the writer like to live?", options: ["In a big city", "In a small town near the sea", "In the mountains"], answer: 1 },
      { q: "What would they miss if they left?", options: ["Their job", "Their friends and family", "The cold weather"], answer: 1 },
      { q: "What does the writer do now?", options: ["Takes short trips to the coast", "Works from home every day", "Surfs every weekend"], answer: 0 },
    ],
  },
  {
    moduleId: "b1-m3",
    title: "Should phones be banned in schools?",
    text: "Several countries have banned cell phones in classrooms, and the debate is growing. Supporters say that students concentrate better and talk to each other more during breaks. Some teachers also report fewer cases of online bullying during the school day. On the other hand, many parents want to be able to contact their children, especially in an emergency. Some students argue that phones can be useful learning tools, for example to look up information or record lessons. In my opinion, a total ban is too extreme. I think schools should keep phones away during lessons but allow them in specific activities, when the teacher decides they are useful.",
    questions: [
      { q: "What is one argument FOR the ban?", options: ["Students concentrate better", "Parents can contact children", "Phones help to record lessons"], answer: 0 },
      { q: "Why do many parents disagree with a ban?", options: ["Phones are expensive", "They want to contact their children in emergencies", "Teachers use phones too"], answer: 1 },
      { q: "What is the writer's opinion?", options: ["A total ban is the best solution", "Phones should be allowed all the time", "Phones should be used only when the teacher decides"], answer: 2 },
    ],
  },
  {
    moduleId: "b1-m4",
    title: "An email to a manager",
    text: "Dear Ms. Taylor,\nI'm writing about the delivery schedule for next week. Unfortunately, two of our drivers will be on vacation from Monday to Wednesday, so we won't be able to deliver all the orders on time. I'd like to suggest two options: we could hire a temporary driver for three days, or we could ask some customers if they would accept their deliveries on Thursday. I've already checked, and the temporary driver would cost around $450. Could you let me know which option you prefer by Friday? I'm happy to discuss it in a call if that's easier.\nBest regards,\nRafael",
    questions: [
      { q: "What is the problem?", options: ["A truck has broken down", "Two drivers will be on vacation", "Customers canceled orders"], answer: 1 },
      { q: "Which is one of Rafael's suggestions?", options: ["Hire a temporary driver", "Cancel all the orders", "Deliver everything on Monday"], answer: 0 },
      { q: "What does Rafael ask Ms. Taylor to do?", options: ["Call the customers", "Choose an option by Friday", "Pay the driver"], answer: 1 },
    ],
  },
  {
    moduleId: "b1-m5",
    title: "Volunteering",
    text: "When I moved to Boston, I didn't know anyone, so I decided to volunteer at a food bank on Saturday mornings. At first I was nervous because my English wasn't very good, but the other volunteers were patient and helped me with new words. We sort donations, pack boxes and give them to families who need them. After six months, I've made real friends, my English has improved a lot and I understand the city much better. I've also realized how many people struggle to pay for basic things, even in a rich country. I'd recommend volunteering to anyone who has just moved abroad.",
    questions: [
      { q: "Why did the writer start volunteering?", options: ["To find a job", "Because they didn't know anyone", "Because the university required it"], answer: 1 },
      { q: "How did the other volunteers help?", options: ["They paid for English classes", "They helped with new words", "They found an apartment for the writer"], answer: 1 },
      { q: "What did the writer realize?", options: ["Many people struggle to pay for basic things", "Boston is a cheap city", "Volunteering is boring"], answer: 0 },
    ],
  },
  {
    moduleId: "b1-m6",
    title: "Sleep better",
    text: "Many adults sleep less than seven hours a night, and experts say this affects our mood, memory and even our immune system. The good news is that small changes can make a big difference. Try to go to bed and get up at the same time every day, even at weekends. Avoid coffee after three in the afternoon, and stop looking at screens at least half an hour before bed, because the light keeps your brain awake. If you can't fall asleep after twenty minutes, get up and do something relaxing, like reading, instead of staying in bed and worrying.",
    questions: [
      { q: "What can lack of sleep affect?", options: ["Only our weight", "Mood, memory and the immune system", "Only our eyes"], answer: 1 },
      { q: "When should you stop drinking coffee?", options: ["After 3 p.m.", "After dinner", "One hour before bed"], answer: 0 },
      { q: "What should you do if you can't fall asleep after 20 minutes?", options: ["Stay in bed and wait", "Look at your phone", "Get up and do something relaxing"], answer: 2 },
    ],
  },
  {
    moduleId: "b1-m7",
    title: "A movie review",
    text: "I didn't expect much from \"The Last Summer\", but it turned out to be one of the best movies I've seen this year. It tells the story of three friends who spend their final vacation together before going to different universities. The acting is natural, and the dialogue feels like real conversations between young people. The photography of the small fishing village is beautiful. My only criticism is that the second half is a bit slow, and one of the characters isn't developed enough. Even so, I'd definitely recommend it, especially if you enjoy quiet, emotional stories rather than action.",
    questions: [
      { q: "What is the movie about?", options: ["Three friends' last vacation together", "A fishing competition", "A university professor"], answer: 0 },
      { q: "What did the reviewer criticize?", options: ["The acting", "The photography", "The slow second half"], answer: 2 },
      { q: "Who would enjoy the movie most?", options: ["People who love action movies", "People who like quiet, emotional stories", "Children"], answer: 1 },
    ],
  },
  {
    moduleId: "b1-m8",
    title: "Renting an apartment abroad",
    text: "Renting an apartment in another country can be stressful, so here are some tips. First, never send money before you've seen the apartment, either in person or on a live video call: fake adverts are common. Ask what the rent includes; in some places, bills such as electricity and internet are extra. Read the contract carefully and check how much notice you have to give before leaving. Take photos of everything on the day you move in, so you can prove what condition the apartment was in. Finally, find out if you need a local guarantor, because many landlords ask for one from foreigners.",
    questions: [
      { q: "Why shouldn't you send money before seeing the apartment?", options: ["Because fake adverts are common", "Because it's illegal", "Because prices change"], answer: 0 },
      { q: "Why should you take photos when you move in?", options: ["To post on social media", "To prove the condition of the apartment", "To show your family"], answer: 1 },
      { q: "What do many landlords ask foreigners for?", options: ["A local guarantor", "A year of rent in advance", "A job contract"], answer: 0 },
    ],
  },
];

export const readingFor = (moduleId: string) => READINGS.find((r) => r.moduleId === moduleId) ?? READINGS_ADVANCED.find((r) => r.moduleId === moduleId);
