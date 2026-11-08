/**
 * Mini-aulas: lições curtas e independentes por situação (fora da trilha).
 * Ficam sempre abertas e cada uma termina numa conversa com personagem.
 */
import { buildLesson, type LessonInput } from "./builder";
import type { Lesson, Module, CefrLevel } from "./types";

const mini = (id: string, moduleId: string, order: number, scenarioId: string, input: Omit<LessonInput, "review"> & { review?: string[] }): Lesson => ({
  ...buildLesson(id, moduleId, order, { xp: 10, passScore: 50, review: [], ...input }),
  scenarioId,
});

const A1 = "mini-a1";
const A2 = "mini-a2";
const B1 = "mini-b1";
const B2 = "mini-b2";

const a1: Lesson[] = [
  mini("mini-introduce", A1, 1, "new-friend", {
    title: "Como se apresentar",
    objective: "Apresentar-se em 30 segundos: nome, origem, trabalho e um interesse.",
    explanation: [
      { title: "A fórmula", body: "**Hi, I'm [nome].** → **I'm from [cidade/país].** → **I'm a/an [profissão]** ou **I work in/at...** → **I love/like [hobby].** → termine com uma pergunta: **What about you?**" },
      { title: "Soando natural", body: "Diga **Nice to meet you** ao conhecer alguém e **Nice meeting you** ao se despedir. Para mostrar interesse: **Oh, really? That's cool!**" },
    ],
    vocabulary: [
      { en: "I'm from...", pt: "Eu sou de...", say: "áim from" },
      { en: "I work in...", pt: "Eu trabalho com/na área de...", say: "ái UÊRK in" },
      { en: "I'm into...", pt: "Eu curto...", say: "áim ÍN-tu" },
      { en: "What about you?", pt: "E você?", say: "UÓT a-báut iu" },
      { en: "That's cool!", pt: "Que legal!", say: "dhéts KÚUL" },
      { en: "Nice meeting you", pt: "Foi um prazer (na despedida)", say: "náis MÍ-tin iu" },
    ],
    examples: [
      { en: "Hi, I'm Carla. I'm from Recife, but I live in São Paulo.", pt: "Oi, sou a Carla. Sou de Recife, mas moro em São Paulo." },
      { en: "I work in marketing and I'm really into photography.", pt: "Trabalho com marketing e curto muito fotografia." },
      { en: "What about you? What do you do?", pt: "E você? O que você faz?" },
    ],
    exercises: [
      { type: "word_order", skill: "grammar", prompt: "Eu sou de Belo Horizonte.", answer: "I'm from Belo Horizonte." },
      { type: "multiple_choice", skill: "vocabulary", prompt: "Ao se despedir de alguém que acabou de conhecer:", options: ["Nice to meet you.", "Nice meeting you.", "Nice you."], answer: 1 },
      { type: "translate", skill: "writing", prompt: "E você?", accepted: ["What about you?", "And you?", "How about you?"] },
      { type: "fill_blank", skill: "grammar", sentence: "I'm really ___ music. (curto)", accepted: ["into"] },
      { type: "listening", skill: "listening", prompt: "O que a pessoa faz?", audio: "Hi, I'm Tom. I'm a nurse and I love surfing.", options: ["É enfermeiro e surfa", "É médico e corre", "É professor e surfa"], answer: 0 },
      { type: "translate", skill: "writing", prompt: "Eu trabalho com tecnologia.", accepted: ["I work in technology.", "I work in tech.", "I work in IT."] },
    ],
  }),
  mini("mini-order-food", A1, 2, "restaurant", {
    title: "Como pedir comida",
    objective: "Pedir comida e bebida num restaurante do começo ao fim.",
    explanation: [
      { title: "As 5 frases que resolvem", body: "**A table for two, please.** → **Can I see the menu?** → **I'd like the chicken, please.** → **Can I get a water?** → **Can I have the check, please?**" },
      { title: "Perguntas do garçom", body: "**Are you ready to order?** (prontos para pedir?) — **How would you like it?** (como quer o ponto/preparo?) — **Anything else?** — **Is everything OK?**" },
    ],
    vocabulary: [
      { en: "A table for two", pt: "Uma mesa para dois", say: "a TÊI-bol for TÚU" },
      { en: "Are you ready to order?", pt: "Prontos para pedir?", say: "ar iu RÉ-di tu ÓR-der" },
      { en: "I'd like...", pt: "Eu gostaria de...", say: "áid LÁIK" },
      { en: "starter", pt: "entrada", say: "STÁR-ter" },
      { en: "main course", pt: "prato principal", say: "MÊIN córs" },
      { en: "the check", pt: "a conta (EUA)", say: "dhe TCHÉK" },
      { en: "tip", pt: "gorjeta", say: "TÍP" },
    ],
    examples: [
      { en: "Are you ready to order? — Yes, I'd like the salmon, please.", pt: "Prontos para pedir? — Sim, eu gostaria do salmão." },
      { en: "How would you like your steak? — Medium, please.", pt: "Como quer o bife? — Ao ponto, por favor." },
      { en: "Can I have the check, please?", pt: "Pode trazer a conta, por favor?" },
    ],
    exercises: [
      { type: "multiple_choice", skill: "vocabulary", prompt: "\"Are you ready to order?\" significa:", options: ["Vocês já pagaram?", "Prontos para pedir?", "A mesa está pronta?"], answer: 1 },
      { type: "translate", skill: "writing", prompt: "Uma mesa para dois, por favor.", accepted: ["A table for two, please.", "Table for two, please."] },
      { type: "word_order", skill: "grammar", prompt: "Eu gostaria do frango, por favor.", answer: "I'd like the chicken, please." },
      { type: "listening", skill: "listening", prompt: "O que o cliente pediu?", audio: "I'd like the pasta and a glass of red wine, please.", options: ["Massa e vinho tinto", "Peixe e vinho branco", "Massa e água"], answer: 0 },
      { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["starter", "entrada"], ["main course", "prato principal"], ["tip", "gorjeta"], ["check", "conta"]] },
      { type: "translate", skill: "writing", prompt: "Pode trazer a conta, por favor?", accepted: ["Can I have the check, please?", "Can I have the check, please?", "Could I have the check, please?", "Could I have the check, please?", "Can we have the check, please?", "Can we have the check, please?"] },
    ],
  }),
  mini("mini-daily-life", A1, 3, "daily-life", {
    title: "Conversa sobre o dia a dia",
    objective: "Manter uma conversa curta sobre rotina, semana e planos.",
    explanation: [
      { title: "Perguntas que abrem conversa", body: "**How's your day going?** — **How was your weekend?** — **What are you up to today?** (o que vai fazer hoje?) — **Busy week?**" },
      { title: "Respostas com detalhe", body: "Não responda só \"good\". Dê um detalhe e devolva: **Pretty good! I had a long meeting, but now I'm free. How about you?**" },
    ],
    vocabulary: [
      { en: "How's it going?", pt: "Como vai? / Tudo certo?", say: "ráuz it GÔU-in" },
      { en: "pretty good", pt: "bem, até que bem", say: "PRÍ-ri GÚD" },
      { en: "What are you up to?", pt: "O que você está fazendo/vai fazer?", say: "uót ar iu ÂP tu" },
      { en: "not much", pt: "nada de mais", say: "nót MÂTCH" },
      { en: "busy", pt: "corrido, ocupado", say: "BÍ-zi" },
      { en: "How about you?", pt: "E você?", say: "ráu a-BÁUT iu" },
    ],
    examples: [
      { en: "How's your week going? — Pretty busy! Lots of work. How about you?", pt: "Como está sua semana? — Bem corrida! Muito trabalho. E você?" },
      { en: "What are you up to this weekend? — Not much, just relaxing.", pt: "O que vai fazer no fim de semana? — Nada de mais, só descansar." },
    ],
    exercises: [
      { type: "multiple_choice", skill: "vocabulary", prompt: "\"What are you up to?\" significa:", options: ["Onde você mora?", "O que você está fazendo?", "Você está bem?"], answer: 1 },
      { type: "multiple_choice", skill: "reading", prompt: "Melhor resposta para \"How was your weekend?\"", options: ["Good.", "It was great! I went to the beach. How about you?", "Yes."], answer: 1 },
      { type: "translate", skill: "writing", prompt: "Nada de mais.", accepted: ["Not much.", "Nothing much."] },
      { type: "word_order", skill: "grammar", prompt: "Como está indo o seu dia?", answer: "How's your day going?" },
      { type: "listening", skill: "listening", prompt: "Como foi a semana dela?", audio: "My week was really busy, but I'm happy it's Friday!", options: ["Tranquila", "Muito corrida", "Chata"], answer: 1 },
      { type: "translate", skill: "writing", prompt: "Como foi seu fim de semana?", accepted: ["How was your weekend?"] },
    ],
  }),
  mini("mini-directions", A1, 4, "taxi", {
    title: "Pedir informação e direções",
    objective: "Pedir ajuda para chegar a um lugar e entender a resposta.",
    explanation: [
      { title: "Peça com educação", body: "**Excuse me, is there a subway station near here?** — **How do I get to...?** — **Is it far?** — **Can I walk there?**" },
      { title: "Respostas comuns", body: "**It's a five-minute walk.** — **Go straight and turn left.** — **It's on your right.** — **You can't miss it.**" },
    ],
    vocabulary: [
      { en: "Is it far?", pt: "É longe?", say: "iz it FÁR" },
      { en: "a five-minute walk", pt: "cinco minutos a pé", say: "a FÁIV-mi-nit UÓK" },
      { en: "near here", pt: "perto daqui", say: "NÍER RÍER" },
      { en: "You can't miss it", pt: "Não tem como errar", say: "iu KÉNT mis it" },
      { en: "block", pt: "quarteirão", say: "BLÓK" },
      { en: "get lost", pt: "se perder", say: "guét LÓST" },
    ],
    examples: [
      { en: "Excuse me, is there a pharmacy near here? — Yes, it's two blocks away.", pt: "Com licença, tem uma farmácia perto daqui? — Sim, a dois quarteirões." },
      { en: "Is it far? — No, it's a five-minute walk.", pt: "É longe? — Não, cinco minutos a pé." },
    ],
    exercises: [
      { type: "translate", skill: "writing", prompt: "É longe?", accepted: ["Is it far?"] },
      { type: "multiple_choice", skill: "vocabulary", prompt: "\"It's a ten-minute walk\":", options: ["Dez minutos de carro", "Dez minutos a pé", "Dez quarteirões"], answer: 1 },
      { type: "word_order", skill: "grammar", prompt: "Tem um banco perto daqui?", answer: "Is there a bank near here?" },
      { type: "listening", skill: "listening", prompt: "Para que lado é?", audio: "Go straight for two blocks. It's on your right.", options: ["Dois quarteirões, à direita", "Dois quarteirões, à esquerda", "Um quarteirão, à direita"], answer: 0 },
      { type: "fill_blank", skill: "vocabulary", sentence: "You can't ___ it. (não tem como errar)", accepted: ["miss"] },
      { type: "translate", skill: "writing", prompt: "Com licença, como chego à praia?", accepted: ["Excuse me, how do I get to the beach?", "Excuse me, how can I get to the beach?"] },
    ],
  }),
];

const a2: Lesson[] = [
  mini("mini-small-talk", A2, 1, "new-friend", {
    title: "Small talk sem travar",
    objective: "Puxar e manter conversa leve com desconhecidos.",
    explanation: [
      { title: "Temas seguros", body: "Tempo, o lugar onde vocês estão, trabalho, viagens, séries, comida. Evite no começo: salário, política, religião." },
      { title: "Técnica: comentário + pergunta", body: "**This place is amazing! Have you been here before?** — **Crazy weather today, right?** O \"right?\" no final convida o outro a falar." },
      { title: "Ganhando tempo", body: "Quando travar: **Let me think...**, **How can I put it...**, **You know...** são normais na fala nativa." },
    ],
    vocabulary: [
      { en: "Have you been here before?", pt: "Você já veio aqui antes?", say: "rév iu bin RÍER bi-FÓR" },
      { en: "crazy weather", pt: "tempo maluco", say: "KRÊI-zi UÉ-dher" },
      { en: "So, what brings you here?", pt: "E aí, o que te traz aqui?", say: "sôu uót BRÍNGZ iu ríer" },
      { en: "Let me think", pt: "Deixa eu pensar", say: "lét mi THÍNK" },
      { en: "No way!", pt: "Não acredito!", say: "nôu UÊI" },
      { en: "Same here", pt: "Eu também", say: "SÊIM ríer" },
    ],
    examples: [
      { en: "Crazy weather today, right? — Totally! It was sunny an hour ago.", pt: "Que tempo maluco hoje, né? — Demais! Estava sol há uma hora." },
      { en: "So, what brings you here? — My friend invited me. And you?", pt: "E aí, o que te traz aqui? — Um amigo me convidou. E você?" },
    ],
    exercises: [
      { type: "multiple_choice", skill: "reading", prompt: "Qual é um bom tema para começar small talk?", options: ["Quanto você ganha?", "O tempo ou o lugar", "Em quem você votou?"], answer: 1 },
      { type: "translate", skill: "writing", prompt: "Você já veio aqui antes?", accepted: ["Have you been here before?", "Have you ever been here before?"] },
      { type: "fill_blank", skill: "vocabulary", sentence: "I love this band! — Same ___!", accepted: ["here"] },
      { type: "listening", skill: "listening", prompt: "Escolha a resposta natural.", audio: "This place is amazing, right?", options: ["Yes, it is! Have you been here before?", "Yes.", "I am fine, thank you."], answer: 0 },
      { type: "word_order", skill: "grammar", prompt: "O que te traz aqui?", answer: "What brings you here?" },
      { type: "multiple_choice", skill: "vocabulary", prompt: "\"No way!\" expressa:", options: ["Recusa educada", "Surpresa: não acredito!", "Direção: não é por aqui"], answer: 1 },
    ],
  }),
  mini("mini-airport", A2, 2, "airport", {
    title: "Check-in no aeroporto",
    objective: "Fazer check-in, despachar mala e entender o embarque.",
    explanation: [
      { title: "O que vão te perguntar", body: "**Where are you flying to?** — **Can I see your passport?** — **Are you checking any bags?** — **Did you pack your bags yourself?** — **Window or aisle?**" },
      { title: "Palavras do cartão de embarque", body: "**gate** (portão), **boarding time** (horário de embarque), **seat** (assento), **delayed** (atrasado), **carry-on** (bagagem de mão)." },
    ],
    vocabulary: [
      { en: "check a bag", pt: "despachar uma mala", say: "TCHÉK a BÉG" },
      { en: "carry-on", pt: "bagagem de mão", say: "KÉ-ri-on" },
      { en: "window seat", pt: "assento na janela", say: "UÍN-dou SÍIT" },
      { en: "aisle seat", pt: "assento no corredor", say: "ÁIL SÍIT (s mudo)" },
      { en: "gate", pt: "portão", say: "GUÊIT" },
      { en: "boarding pass", pt: "cartão de embarque", say: "BÓR-din pés" },
      { en: "delayed", pt: "atrasado", say: "di-LÊID" },
    ],
    examples: [
      { en: "Are you checking any bags? — Just one, and this carry-on.", pt: "Vai despachar alguma mala? — Só uma, e esta de mão." },
      { en: "Boarding starts at 9:40 at gate 32.", pt: "O embarque começa às 9:40 no portão 32." },
    ],
    exercises: [
      { type: "multiple_choice", skill: "vocabulary", prompt: "\"Window or aisle?\" pergunta sobre:", options: ["Bagagem", "Assento", "Refeição"], answer: 1 },
      { type: "listening", skill: "listening", prompt: "Qual é o portão?", audio: "Your flight boards at gate twenty-four at ten fifteen.", options: ["Portão 24", "Portão 14", "Portão 40"], answer: 0 },
      { type: "translate", skill: "writing", prompt: "Eu gostaria de um assento na janela.", accepted: ["I'd like a window seat.", "I would like a window seat.", "Can I have a window seat?", "I'd like a window seat, please."] },
      { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["gate", "portão"], ["delayed", "atrasado"], ["carry-on", "bagagem de mão"], ["boarding pass", "cartão de embarque"]] },
      { type: "word_order", skill: "grammar", prompt: "Vou despachar uma mala.", answer: "I'm checking one bag." },
      { type: "listening", skill: "listening", prompt: "O que aconteceu com o voo?", audio: "I'm sorry, your flight is delayed by two hours.", options: ["Foi cancelado", "Está atrasado duas horas", "Mudou de portão"], answer: 1 },
    ],
  }),
  mini("mini-hotel", A2, 3, "hotel", {
    title: "Hotel: check-in e problemas",
    objective: "Fazer check-in e resolver problemas no quarto.",
    explanation: [
      { title: "Check-in", body: "**I have a reservation under [nome].** — **What time is breakfast?** — **What's the Wi-Fi password?** — **What time is checkout?**" },
      { title: "Reclamando com educação", body: "Use **There's a problem with...** e **Could you...?**: **There's a problem with the air conditioning. Could you send someone to fix it?** — **The room is too noisy. Is it possible to change rooms?**" },
    ],
    vocabulary: [
      { en: "reservation", pt: "reserva", say: "ré-zer-VÊI-shan" },
      { en: "under the name", pt: "no nome de", say: "ÂN-der dhe NÊIM" },
      { en: "checkout", pt: "saída (do hotel)", say: "TCHÉK-aut" },
      { en: "noisy", pt: "barulhento", say: "NÓI-zi" },
      { en: "doesn't work", pt: "não funciona", say: "DÂ-zent UÊRK" },
      { en: "towel", pt: "toalha", say: "TÁU-el" },
      { en: "late checkout", pt: "saída mais tarde", say: "LÊIT TCHÉK-aut" },
    ],
    examples: [
      { en: "Hi, I have a reservation under the name Silva.", pt: "Oi, tenho uma reserva no nome Silva." },
      { en: "The shower doesn't work. Could you send someone, please?", pt: "O chuveiro não funciona. Pode mandar alguém, por favor?" },
    ],
    exercises: [
      { type: "translate", skill: "writing", prompt: "Tenho uma reserva no nome Costa.", accepted: ["I have a reservation under the name Costa.", "I have a reservation under Costa.", "I've got a reservation under the name Costa."] },
      { type: "multiple_choice", skill: "grammar", prompt: "Reclamação educada:", options: ["Fix the TV now.", "The TV doesn't work. Could you help me?", "TV no work."], answer: 1 },
      { type: "fill_blank", skill: "grammar", sentence: "The air conditioning ___ work. (não funciona)", accepted: ["doesn't", "does not"] },
      { type: "listening", skill: "listening", prompt: "A que horas é o café da manhã?", audio: "Breakfast is served from six thirty to ten.", options: ["6:30 às 10", "7 às 10", "6 às 9:30"], answer: 0 },
      { type: "word_order", skill: "grammar", prompt: "É possível trocar de quarto?", answer: "Is it possible to change rooms?" },
      { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["towel", "toalha"], ["noisy", "barulhento"], ["reservation", "reserva"], ["checkout", "saída"]] },
    ],
  }),
  mini("mini-pharmacy", A2, 4, "pharmacy", {
    title: "Na farmácia: explicar sintomas",
    objective: "Explicar o que está sentindo e entender como tomar o remédio.",
    explanation: [
      { title: "Dizendo o que sente", body: "**I have a headache / a sore throat / a cough / a fever.** Para dor em geral: **My back hurts.** Há quanto tempo: **since yesterday**, **for two days**." },
      { title: "Instruções", body: "**Take one tablet twice a day.** (2x ao dia) — **after meals** (após as refeições) — **If it doesn't get better, see a doctor.**" },
    ],
    vocabulary: [
      { en: "headache", pt: "dor de cabeça", say: "RÉD-eik" },
      { en: "sore throat", pt: "dor de garganta", say: "SÓR THRÔUT" },
      { en: "cough", pt: "tosse", say: "KÓF" },
      { en: "fever", pt: "febre", say: "FÍ-ver" },
      { en: "hurt", pt: "doer", say: "RÊRT" },
      { en: "twice a day", pt: "duas vezes por dia", say: "TUÁIS a dei" },
      { en: "allergic to", pt: "alérgico a", say: "a-LÊR-djik tu" },
    ],
    examples: [
      { en: "I've had a sore throat since yesterday.", pt: "Estou com dor de garganta desde ontem." },
      { en: "Take one tablet every eight hours, after meals.", pt: "Tome um comprimido a cada oito horas, após as refeições." },
    ],
    exercises: [
      { type: "match_pairs", skill: "vocabulary", prompt: "Ligue os sintomas.", pairs: [["headache", "dor de cabeça"], ["cough", "tosse"], ["fever", "febre"], ["sore throat", "dor de garganta"]] },
      { type: "translate", skill: "writing", prompt: "Eu estou com dor de cabeça.", accepted: ["I have a headache.", "I've got a headache."] },
      { type: "fill_blank", skill: "grammar", sentence: "My back ___. (dói)", accepted: ["hurts"] },
      { type: "listening", skill: "listening", prompt: "Como tomar o remédio?", audio: "Take two tablets twice a day after meals.", options: ["2 comprimidos, 2x ao dia, após comer", "1 comprimido, 3x ao dia", "2 comprimidos antes de dormir"], answer: 0 },
      { type: "translate", skill: "writing", prompt: "Eu sou alérgico a penicilina.", accepted: ["I'm allergic to penicillin.", "I am allergic to penicillin."] },
      { type: "multiple_choice", skill: "vocabulary", prompt: "\"since Monday\" significa:", options: ["até segunda", "desde segunda", "na segunda"], answer: 1 },
    ],
  }),
];

const b1: Lesson[] = [
  mini("mini-phone", B1, 1, "phone-call", {
    title: "Falando ao telefone",
    objective: "Atender, fazer e encerrar ligações com segurança.",
    explanation: [
      { title: "Frases-padrão", body: "**This is [nome] speaking.** — **Could I speak to...?** — **Can you hold on a second?** — **Sorry, you're breaking up.** (a ligação está falhando) — **Could you say that again, a bit slower?**" },
      { title: "Confirmando informações", body: "Repita para confirmar: **Just to confirm, that's Tuesday at 3 p.m., right?** Soletre com palavras: **S as in Sam, I as in Italy.**" },
    ],
    vocabulary: [
      { en: "hold on", pt: "aguardar na linha", say: "RÔULD on" },
      { en: "breaking up", pt: "cortando, falhando", say: "BRÊI-kin âp" },
      { en: "call back", pt: "retornar a ligação", say: "kól BÉK" },
      { en: "leave a message", pt: "deixar recado", say: "LÍIV a MÉ-sidj" },
      { en: "just to confirm", pt: "só para confirmar", say: "djâst tu kon-FÊRM" },
      { en: "put you through", pt: "transferir a ligação", say: "pút iu THRÚU" },
    ],
    examples: [
      { en: "Sorry, you're breaking up. Could you repeat that?", pt: "Desculpe, está cortando. Pode repetir?" },
      { en: "She's not available right now. Would you like to leave a message?", pt: "Ela não está disponível. Quer deixar recado?" },
    ],
    exercises: [
      { type: "multiple_choice", skill: "vocabulary", prompt: "\"Can you hold on a second?\"", options: ["Pode desligar?", "Pode aguardar um instante?", "Pode ligar de volta?"], answer: 1 },
      { type: "translate", skill: "writing", prompt: "Posso deixar um recado?", accepted: ["Can I leave a message?", "Could I leave a message?"] },
      { type: "listening", skill: "listening", prompt: "Qual o problema na ligação?", audio: "Sorry, you're breaking up. I'll call you back.", options: ["A ligação está falhando", "A pessoa está ocupada", "O número está errado"], answer: 0 },
      { type: "word_order", skill: "grammar", prompt: "Só para confirmar, é na terça às três?", answer: "Just to confirm, it's Tuesday at three?" },
      { type: "fill_blank", skill: "vocabulary", sentence: "I'll ___ you through to the manager. (transferir)", accepted: ["put"] },
      { type: "translate", skill: "writing", prompt: "Aqui é a Ana falando.", accepted: ["This is Ana speaking.", "This is Ana.", "Ana speaking."] },
    ],
  }),
  mini("mini-interview", B1, 2, "job-interview", {
    title: "Entrevista: fale sobre você",
    objective: "Responder \"Tell me about yourself\" e falar de pontos fortes.",
    explanation: [
      { title: "Estrutura presente → passado → futuro", body: "**Currently, I'm a [cargo] at [empresa], where I [resultado].** → **Before that, I worked in...** → **Now I'm looking for a role where I can...**" },
      { title: "Use números e verbos fortes", body: "**I led a team of five.** — **I increased sales by 20%.** — **I managed / built / improved / reduced...** Evite só listar tarefas." },
      { title: "Ponto fraco", body: "Mostre um fraco real e o que faz para melhorar: **I used to take on too much, so now I prioritize with my team every Monday.**" },
    ],
    vocabulary: [
      { en: "currently", pt: "atualmente", say: "KÂ-rent-li" },
      { en: "I'm responsible for", pt: "sou responsável por", say: "áim ris-PÓN-si-bol for" },
      { en: "I led", pt: "eu liderei", say: "ái LÉD" },
      { en: "strength", pt: "ponto forte", say: "STRÉNGTH" },
      { en: "weakness", pt: "ponto fraco", say: "UÍK-nes" },
      { en: "achievement", pt: "conquista, resultado", say: "a-TCHÍIV-ment" },
    ],
    examples: [
      { en: "Currently, I'm a data analyst at a retail company, where I reduced report time by 40%.", pt: "Atualmente sou analista de dados numa varejista, onde reduzi em 40% o tempo dos relatórios." },
      { en: "One of my strengths is communication. I often present results to directors.", pt: "Um dos meus pontos fortes é a comunicação. Apresento resultados para diretores com frequência." },
    ],
    exercises: [
      { type: "multiple_choice", skill: "reading", prompt: "Melhor começo para \"Tell me about yourself\":", options: ["I was born in 1990 in a small town...", "Currently, I'm a project manager at X, where I lead a team of six.", "I like pizza and movies."], answer: 1 },
      { type: "translate", skill: "writing", prompt: "Atualmente, eu sou engenheiro.", accepted: ["Currently, I'm an engineer.", "Currently I am an engineer.", "I'm currently an engineer.", "Currently, I am an engineer."] },
      { type: "fill_blank", skill: "grammar", sentence: "I ___ (lead, passado) a team of five people.", accepted: ["led"] },
      { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["strength", "ponto forte"], ["weakness", "ponto fraco"], ["achievement", "conquista"], ["currently", "atualmente"]] },
      { type: "listening", skill: "listening", prompt: "Qual resultado a pessoa citou?", audio: "In my last job, I increased online sales by thirty percent.", options: ["Aumentou vendas em 30%", "Reduziu custos em 30%", "Contratou 30 pessoas"], answer: 0 },
      { type: "word_order", skill: "grammar", prompt: "Eu sou responsável pelo orçamento.", answer: "I'm responsible for the budget." },
    ],
  }),
];

const b2: Lesson[] = [
  mini("mini-meetings", B2, 1, "meeting", {
    title: "Reuniões: opinar e discordar",
    objective: "Dar opinião, discordar com diplomacia e propor próximos passos.",
    explanation: [
      { title: "Opinião", body: "**From my perspective,...** — **I'd argue that...** — **The way I see it,...** Mais suave: **I might be wrong, but...**" },
      { title: "Discordar sem criar conflito", body: "**I see your point, but...** — **I'm not sure I agree, because...** — **That's a fair point. Have we considered...?** Evite \"You're wrong\"." },
      { title: "Fechando", body: "**So, to sum up,...** — **Let's take this offline.** (falar disso depois, fora da reunião) — **Who's going to own this?** (quem fica responsável?)" },
    ],
    vocabulary: [
      { en: "From my perspective", pt: "Do meu ponto de vista", say: "from mái per-SPÉK-tiv" },
      { en: "I see your point, but", pt: "Entendo seu ponto, mas", say: "ái SÍ ior póint bât" },
      { en: "take it offline", pt: "falar disso depois, em particular", say: "têik it óf-LÁIN" },
      { en: "action items", pt: "tarefas definidas", say: "ÉK-shan ái-temz" },
      { en: "to sum up", pt: "resumindo", say: "tu SÂM âp" },
      { en: "own this", pt: "ser responsável por isso", say: "ÔUN dhis" },
    ],
    examples: [
      { en: "I see your point, but I'm not sure we have the budget for that.", pt: "Entendo seu ponto, mas não sei se temos verba para isso." },
      { en: "To sum up, Ana will own the launch and we'll review it on Friday.", pt: "Resumindo, a Ana fica responsável pelo lançamento e revisamos na sexta." },
    ],
    exercises: [
      { type: "multiple_choice", skill: "reading", prompt: "Forma mais diplomática de discordar:", options: ["You're wrong.", "No.", "I see your point, but have we considered the costs?"], answer: 2 },
      { type: "multiple_choice", skill: "vocabulary", prompt: "\"Let's take this offline\" significa:", options: ["Vamos desligar a internet", "Vamos conversar sobre isso depois, separadamente", "Vamos cancelar o projeto"], answer: 1 },
      { type: "translate", skill: "writing", prompt: "Do meu ponto de vista, precisamos de mais tempo.", accepted: ["From my perspective, we need more time.", "From my point of view, we need more time.", "In my view, we need more time."] },
      { type: "fill_blank", skill: "vocabulary", sentence: "So, to ___ up, we'll launch in May.", accepted: ["sum"] },
      { type: "listening", skill: "listening", prompt: "Quem fica responsável?", audio: "Okay, so Mark will own the client presentation, and Julia will handle the budget.", options: ["Mark: apresentação; Julia: orçamento", "Julia: apresentação; Mark: orçamento", "Os dois fazem tudo"], answer: 0 },
      { type: "word_order", skill: "grammar", prompt: "Eu posso estar errado, mas acho que é arriscado.", answer: "I might be wrong, but I think it's risky." },
    ],
  }),
];

const mod = (id: string, level: CefrLevel, order: number, lessons: Lesson[]): Module => ({ id, level, order, title: `Mini-aulas ${level}`, description: "Lições curtas por situação", lessons });

export const MINI_MODULES: Module[] = [mod(A1, "A1", 101, a1), mod(A2, "A2", 101, a2), mod(B1, "B1", 101, b1), mod(B2, "B2", 101, b2)];
export const MINI_LESSONS: Lesson[] = MINI_MODULES.flatMap((m) => m.lessons);
export const isMiniLesson = (id: string) => id.startsWith("mini-");
export const miniLevel = (lesson: Lesson) => MINI_MODULES.find((m) => m.id === lesson.moduleId)?.level ?? "A1";
