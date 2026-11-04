/** Treino de pronúncia com foco nas dificuldades de quem fala português. */
export interface PronSet {
  id: string;
  title: string;
  sound: string; // ex.: "/θ/ e /ð/"
  why: string; // por que é difícil para brasileiros
  how: string; // como fazer
  items: { en: string; pt: string }[];
}

export const PRON_SETS: PronSet[] = [
  {
    id: "th", title: "TH", sound: "/θ/ e /ð/",
    why: "Não existe em português. A tendência é trocar por T, F ou D (\"tank you\", \"dis\").",
    how: "Ponha a ponta da língua levemente entre os dentes e solte o ar. Em think é só ar; em this a garganta vibra.",
    items: [
      { en: "Thank you", pt: "Obrigado" }, { en: "I think so", pt: "Acho que sim" }, { en: "Three thousand", pt: "Três mil" },
      { en: "This is my brother", pt: "Este é meu irmão" }, { en: "The weather is better", pt: "O tempo está melhor" }, { en: "Thursday the thirteenth", pt: "Quinta-feira, dia treze" },
    ],
  },
  {
    id: "r", title: "R americano", sound: "/ɹ/",
    why: "O R brasileiro vibra ou vem da garganta. Em inglês a língua curva para trás, sem tocar em nada.",
    how: "Faça um bico leve e curve a ponta da língua para trás, sem encostar no céu da boca. No fim da palavra (car, water), não vire vogal nem \"rr\".",
    items: [
      { en: "Red car", pt: "Carro vermelho" }, { en: "Very interesting", pt: "Muito interessante" }, { en: "Right here", pt: "Bem aqui" },
      { en: "Your brother works here", pt: "Seu irmão trabalha aqui" }, { en: "Three rooms", pt: "Três quartos" }, { en: "Remember the river", pt: "Lembre do rio" },
    ],
  },
  {
    id: "h", title: "H aspirado", sound: "/h/",
    why: "Em português o H é mudo, então hello vira \"élou\" e house vira \"áus\".",
    how: "Solte ar como quem embaça um espelho: é um \"rr\" bem suave. E o R inicial (red) NÃO soa como H.",
    items: [
      { en: "Hello, how are you?", pt: "Olá, como vai?" }, { en: "Happy holidays", pt: "Boas festas" }, { en: "He has a house", pt: "Ele tem uma casa" },
      { en: "Help me, please", pt: "Me ajude, por favor" }, { en: "How much is the hotel?", pt: "Quanto custa o hotel?" }, { en: "I'm hungry", pt: "Estou com fome" },
    ],
  },
  {
    id: "vowels", title: "Vogais curtas e longas", sound: "/ɪ/ × /iː/, /æ/ × /ɛ/",
    why: "O português tem menos vogais. Ship e sheep, bad e bed acabam soando iguais e mudam o sentido.",
    how: "/iː/ é longo e sorrindo (sheep); /ɪ/ é curto e relaxado (ship). /æ/ abre bem a boca (bad); /ɛ/ é o \"é\" (bed).",
    items: [
      { en: "Ship and sheep", pt: "Navio e ovelha" }, { en: "Live and leave", pt: "Viver e partir" }, { en: "Bad bed", pt: "Cama ruim" },
      { en: "Sit on the seat", pt: "Sente no assento" }, { en: "Black cat", pt: "Gato preto" }, { en: "Full and fool", pt: "Cheio e bobo" },
    ],
  },
  {
    id: "finals", title: "Consoantes no fim", sound: "-t, -d, -k, -g",
    why: "Brasileiros acrescentam um \"i\" no final: \"doggi\", \"bedi\", \"Facebooki\".",
    how: "Termine a palavra na consoante e pare. Não solte vogal depois. Fale devagar no começo.",
    items: [
      { en: "Big dog", pt: "Cachorro grande" }, { en: "Good night", pt: "Boa noite" }, { en: "I like it", pt: "Eu gosto" },
      { en: "Book a desk", pt: "Reserve uma mesa" }, { en: "Hot pink", pt: "Rosa-choque" }, { en: "Bad weekend", pt: "Fim de semana ruim" },
    ],
  },
  {
    id: "ed", title: "Final -ed", sound: "/t/, /d/, /ɪd/",
    why: "A tendência é pronunciar sempre \"êd\" (workêd). Na maioria dos verbos o -ed não é uma sílaba.",
    how: "Depois de p, k, s, sh, ch: soa /t/ (worked). Depois de sons sonoros: /d/ (played). Só depois de t ou d vira sílaba /ɪd/ (wanted).",
    items: [
      { en: "I worked yesterday", pt: "Eu trabalhei ontem" }, { en: "She played tennis", pt: "Ela jogou tênis" }, { en: "We wanted more", pt: "Queríamos mais" },
      { en: "He watched a movie", pt: "Ele viu um filme" }, { en: "They needed help", pt: "Eles precisavam de ajuda" }, { en: "I stopped and called", pt: "Parei e liguei" },
    ],
  },
  {
    id: "contractions", title: "Contrações", sound: "I'm, don't, can't…",
    why: "Falar tudo por extenso (I am, do not) soa robótico. Nativos contraem quase sempre na fala.",
    how: "Junte as palavras numa sílaba só: I'm (áim), don't (dôunt), it's (íts), we're (uír), I'd (áid).",
    items: [
      { en: "I'm not sure", pt: "Não tenho certeza" }, { en: "I don't know", pt: "Não sei" }, { en: "It's okay", pt: "Tudo bem" },
      { en: "We're late", pt: "Estamos atrasados" }, { en: "I'd like a coffee", pt: "Eu queria um café" }, { en: "She can't come", pt: "Ela não pode vir" },
    ],
  },
  {
    id: "linking", title: "Ligação entre palavras", sound: "connected speech",
    why: "Falamos inglês palavra por palavra, separado. Nativos ligam a consoante final à vogal seguinte.",
    how: "Quando uma palavra termina em consoante e a próxima começa com vogal, junte: turn it off = \"tur-ni-toff\".",
    items: [
      { en: "Turn it off", pt: "Desligue" }, { en: "Pick it up", pt: "Pegue" }, { en: "An apple a day", pt: "Uma maçã por dia" },
      { en: "Check it out", pt: "Dá uma olhada" }, { en: "Not at all", pt: "De jeito nenhum" }, { en: "What about it?", pt: "E daí?" },
    ],
  },
];

export const getPronSet = (id: string) => PRON_SETS.find((p) => p.id === id);
