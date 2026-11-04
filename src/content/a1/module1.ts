import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "a1-m1";

export const a1Module1: Module = {
  id: M,
  level: "A1",
  order: 1,
  title: "Primeiros passos",
  description: "Cumprimentar, se apresentar, usar o verbo to be e contar até 20.",
  lessons: [
    buildLesson("a1-m1-l1", M, 1, {
      title: "Cumprimentos",
      objective: "Cumprimentar e se despedir de pessoas em situações formais e informais.",
      explanation: [
        {
          title: "Hello e hi",
          body: "**Hello** serve para qualquer situação. **Hi** é mais informal, usado com amigos e colegas. O H de hello e hi é aspirado, como o R de \"rato\" falado de leve — nunca mudo.",
        },
        {
          title: "Cumprimentos pela hora do dia",
          body: "Use **good morning** até o meio-dia, **good afternoon** até umas 18h e **good evening** à noite, ao chegar. **Good night** NÃO é cumprimento: é usado só para se despedir ou antes de dormir.",
          table: {
            head: ["Inglês", "Quando usar"],
            rows: [
              ["Good morning", "Manhã (chegando)"],
              ["Good afternoon", "Tarde (chegando)"],
              ["Good evening", "Noite (chegando)"],
              ["Good night", "Noite (saindo ou indo dormir)"],
            ],
          },
        },
        {
          title: "How are you?",
          body: "A resposta mais comum é **I'm fine, thanks. And you?** ou, mais natural no dia a dia, **I'm good, thanks!** Em seguida, devolva a pergunta: **And you?**",
        },
      ],
      vocabulary: [
        { en: "hello", pt: "olá", say: "rê-LOU", example: { en: "Hello, Anna!", pt: "Olá, Anna!" } },
        { en: "hi", pt: "oi", say: "RÁI", example: { en: "Hi, Tom!", pt: "Oi, Tom!" } },
        { en: "good morning", pt: "bom dia", say: "gud MÓR-nin" },
        { en: "good afternoon", pt: "boa tarde", say: "gud éf-ter-NUUN" },
        { en: "good evening", pt: "boa noite (ao chegar)", say: "gud ÍV-nin" },
        { en: "good night", pt: "boa noite (ao sair)", say: "gud NÁIT" },
        { en: "goodbye", pt: "tchau, adeus", say: "gud-BÁI" },
        { en: "see you later", pt: "até mais tarde", say: "SÍ iu LEI-ter" },
        { en: "thank you", pt: "obrigado(a)", say: "THÉNK iu (língua entre os dentes no TH)" },
        { en: "fine", pt: "bem", say: "FÁIN" },
      ],
      examples: [
        { en: "Good morning, Mr. Smith. How are you?", pt: "Bom dia, Sr. Smith. Como vai?" },
        { en: "I'm fine, thank you. And you?", pt: "Estou bem, obrigado. E você?" },
        { en: "Hi, Lucas! See you later!", pt: "Oi, Lucas! Até mais!" },
        { en: "Good night, Mom.", pt: "Boa noite, mãe." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Como se diz \"bom dia\" em inglês?", options: ["Good night", "Good morning", "Good evening", "Goodbye"], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Você está saindo de uma festa às 23h. O que diz?", options: ["Good evening", "Good afternoon", "Good night", "Good morning"], answer: 2, explain: "Good night é usado para se despedir à noite. Good evening é para chegar." },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha o que foi dito.", audio: "Good afternoon", options: ["Good morning", "Good afternoon", "Good evening"], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "I'm fine, thank you. And ___?", translation: "Estou bem, obrigado. E você?", accepted: ["you"] },
        { type: "translate", skill: "writing", prompt: "Olá! Como vai você?", accepted: ["Hello! How are you?", "Hi! How are you?", "Hello, how are you?", "Hi, how are you?"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue cada expressão à sua tradução.", pairs: [["goodbye", "tchau"], ["thank you", "obrigado"], ["see you later", "até mais tarde"], ["hi", "oi"]] },
        { type: "word_order", skill: "grammar", prompt: "Estou bem, obrigado.", answer: "I'm fine, thank you.", distractors: ["are"] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "See you later", accepted: ["see you later"] },
      ],
      conversation: {
        goal: "Cumprimente o professor, pergunte como ele está e se despeça.",
        starter: "Hi! Good morning! How are you today?",
      },
      review: [
        "Hello serve para tudo; hi é informal.",
        "Good night é só para despedida.",
        "Responda How are you? com I'm fine/good, thanks. And you?",
      ],
    }),

    buildLesson("a1-m1-l2", M, 2, {
      title: "Apresentando-se",
      objective: "Dizer seu nome, perguntar o nome de alguém e reagir a uma apresentação.",
      explanation: [
        {
          title: "Dizendo o nome",
          body: "Há duas formas comuns: **My name is Ana** (meu nome é Ana) e **I'm Ana** (eu sou a Ana). No dia a dia, **I'm** é a mais usada.",
        },
        {
          title: "Perguntando o nome",
          body: "**What's your name?** significa \"Qual é o seu nome?\". Em inglês usamos **what** (o quê) e não \"how\" (como) para perguntar o nome — um erro muito comum de brasileiros.",
        },
        {
          title: "Nice to meet you",
          body: "Ao conhecer alguém, diga **Nice to meet you** (prazer em te conhecer). A resposta é **Nice to meet you too** ou **You too**.",
        },
      ],
      vocabulary: [
        { en: "name", pt: "nome", say: "NÊIM" },
        { en: "my", pt: "meu, minha", say: "MÁI" },
        { en: "your", pt: "seu, sua (de você)", say: "IÓR" },
        { en: "what", pt: "o quê, qual", say: "UÓT" },
        { en: "nice to meet you", pt: "prazer em conhecer você", say: "NÁIS tu MÍT iu" },
        { en: "too", pt: "também", say: "TÚU" },
        { en: "friend", pt: "amigo(a)", say: "FRÉND" },
        { en: "this is", pt: "este(a) é", say: "DHIS iz (língua entre os dentes)" },
      ],
      examples: [
        { en: "Hi, I'm Lucas. What's your name?", pt: "Oi, sou o Lucas. Qual é o seu nome?" },
        { en: "My name is Sarah. Nice to meet you.", pt: "Meu nome é Sarah. Prazer em te conhecer." },
        { en: "Nice to meet you too.", pt: "O prazer é meu também." },
        { en: "This is my friend, Paul.", pt: "Este é meu amigo, Paul." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Qual é a forma correta de perguntar o nome?", options: ["How is your name?", "What's your name?", "Who your name?", "What your name is?"], answer: 1, explain: "Em inglês se pergunta o nome com what: What's your name?" },
        { type: "fill_blank", skill: "grammar", sentence: "___ name is Carla.", translation: "Meu nome é Carla.", accepted: ["my"] },
        { type: "translate", skill: "writing", prompt: "Prazer em te conhecer.", accepted: ["Nice to meet you.", "Nice to meet you", "Pleased to meet you."] },
        { type: "word_order", skill: "grammar", prompt: "Este é meu amigo.", answer: "This is my friend.", distractors: ["your"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha a resposta adequada.", audio: "Nice to meet you.", options: ["Nice to meet you too.", "Good night.", "My name is."], answer: 0 },
        { type: "multiple_choice", skill: "reading", prompt: "\"I'm Paulo.\" significa:", options: ["Eu sou o Paulo.", "Meu amigo é o Paulo.", "Você é o Paulo?", "Este é o Paulo."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Qual é o seu nome?", accepted: ["What's your name?", "What is your name?"] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "My name is Anna.", accepted: ["my name is anna"] },
      ],
      conversation: {
        goal: "Apresente-se ao professor e pergunte o nome dele.",
        starter: "Hello! I'm your English teacher. What's your name?",
      },
      review: ["I'm + nome ou My name is + nome.", "What's your name? (nunca How is your name?)", "Nice to meet you → You too."],
    }),

    buildLesson("a1-m1-l3", M, 3, {
      title: "O verbo to be",
      objective: "Usar am, is e are para falar quem você é e como está.",
      explanation: [
        {
          title: "Ser e estar ao mesmo tempo",
          body: "O verbo **to be** significa **ser** e **estar**. \"I am tired\" = estou cansado. \"I am a teacher\" = sou professor. O contexto mostra o sentido.",
          table: {
            head: ["Pessoa", "Forma completa", "Contração"],
            rows: [
              ["I (eu)", "I am", "I'm"],
              ["You (você)", "You are", "You're"],
              ["He (ele)", "He is", "He's"],
              ["She (ela)", "She is", "She's"],
              ["It (ele/ela — coisa, animal)", "It is", "It's"],
              ["We (nós)", "We are", "We're"],
              ["They (eles/elas)", "They are", "They're"],
            ],
          },
        },
        {
          title: "O sujeito é obrigatório",
          body: "Em português dizemos \"Está frio\" sem sujeito. Em inglês o sujeito é obrigatório: **It is cold**. Nunca diga só \"Is cold\".",
        },
        {
          title: "Negativa e pergunta",
          body: "Para negar, coloque **not** depois do verbo: **I am not**, **she is not (isn't)**, **they are not (aren't)**. Para perguntar, inverta: **Are you tired?** **Is he a doctor?**",
        },
      ],
      vocabulary: [
        { en: "tired", pt: "cansado(a)", say: "TÁI-erd" },
        { en: "happy", pt: "feliz", say: "RÉ-pi" },
        { en: "hungry", pt: "com fome", say: "RÂN-gri" },
        { en: "busy", pt: "ocupado(a)", say: "BÍ-zi" },
        { en: "student", pt: "estudante", say: "STÚ-dent" },
        { en: "teacher", pt: "professor(a)", say: "TÍ-tcher" },
        { en: "cold", pt: "frio", say: "KÔULD" },
        { en: "here", pt: "aqui", say: "RÍER" },
      ],
      examples: [
        { en: "I'm a student.", pt: "Eu sou estudante." },
        { en: "She's tired today.", pt: "Ela está cansada hoje." },
        { en: "It's cold here.", pt: "Está frio aqui." },
        { en: "Are you busy? — No, I'm not.", pt: "Você está ocupado? — Não, não estou." },
        { en: "They aren't hungry.", pt: "Eles não estão com fome." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "She ___ a teacher.", translation: "Ela é professora.", accepted: ["is"] },
        { type: "fill_blank", skill: "grammar", sentence: "We ___ happy.", translation: "Nós estamos felizes.", accepted: ["are"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Como dizer \"Está frio\"?", options: ["Is cold.", "It's cold.", "It cold.", "Are cold."], answer: 1, explain: "O sujeito é obrigatório em inglês: It is cold." },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a pergunta correta: \"Você está ocupado?\"", options: ["You are busy?", "Are you busy?", "Is you busy?", "Do you busy?"], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Eu estou cansado.", accepted: ["I'm tired.", "I am tired."] },
        { type: "word_order", skill: "grammar", prompt: "Eles não estão com fome.", answer: "They aren't hungry.", distractors: ["isn't"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha o que foi dito.", audio: "He's a student.", options: ["She's a student.", "He's a student.", "He's a teacher."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Ela é estudante.", accepted: ["She's a student.", "She is a student."], explain: "Antes de profissão no singular usamos a/an: a student." },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "We are happy.", accepted: ["we are happy", "we're happy"] },
      ],
      conversation: {
        goal: "Diga ao professor como você está hoje e se é estudante ou trabalha.",
        starter: "Hi again! Are you tired today, or are you happy and ready to learn?",
      },
      review: ["I am / you are / he-she-it is / we-they are.", "Sujeito sempre presente: It's cold.", "Negativa com not, pergunta invertendo: Are you...?"],
    }),

    buildLesson("a1-m1-l4", M, 4, {
      title: "Números de 0 a 20 e idade",
      objective: "Contar de 0 a 20, dizer sua idade e perguntar a idade de alguém.",
      explanation: [
        {
          title: "Idade usa o verbo to be",
          body: "Em português \"temos\" anos. Em inglês nós **somos** a idade: **I am 25** ou **I'm 25 years old**. Nunca diga \"I have 25 years\".",
        },
        {
          title: "Perguntando a idade",
          body: "**How old are you?** — literalmente \"quão velho você é?\". É a forma normal e não é ofensiva.",
        },
        {
          title: "Teen ou ty?",
          body: "Números de 13 a 19 terminam em **-teen** com a sílaba forte no final: thir**TEEN**, fif**TEEN**. Isso evita confusão com 30, 50 (**THIR**ty, **FIF**ty), que você verá depois.",
        },
      ],
      vocabulary: [
        { en: "zero", pt: "zero", say: "ZÍ-rou" },
        { en: "one", pt: "um", say: "UÂN" },
        { en: "two", pt: "dois", say: "TÚU" },
        { en: "three", pt: "três", say: "THRÍ (língua entre os dentes)" },
        { en: "four", pt: "quatro", say: "FÓR" },
        { en: "five", pt: "cinco", say: "FÁIV" },
        { en: "six", pt: "seis", say: "SÍKS" },
        { en: "seven", pt: "sete", say: "SÉ-ven" },
        { en: "eight", pt: "oito", say: "ÊIT" },
        { en: "nine", pt: "nove", say: "NÁIN" },
        { en: "ten", pt: "dez", say: "TÉN" },
        { en: "eleven", pt: "onze", say: "i-LÉ-ven" },
        { en: "twelve", pt: "doze", say: "TUÉLV" },
        { en: "thirteen", pt: "treze", say: "thêr-TÍIN" },
        { en: "fifteen", pt: "quinze", say: "fif-TÍIN" },
        { en: "twenty", pt: "vinte", say: "TUÉN-ti" },
        { en: "years old", pt: "anos de idade", say: "ÍERZ ôuld" },
      ],
      examples: [
        { en: "How old are you? — I'm twenty.", pt: "Quantos anos você tem? — Tenho vinte." },
        { en: "My brother is twelve years old.", pt: "Meu irmão tem doze anos." },
        { en: "Room number eight, please.", pt: "Quarto número oito, por favor." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Como dizer \"Eu tenho 18 anos\"?", options: ["I have 18 years.", "I'm 18 years old.", "I have 18 years old.", "I'm 18 years."], answer: 1, explain: "Idade usa to be: I'm 18 (years old)." },
        { type: "listening", skill: "listening", prompt: "Qual número você ouviu?", audio: "Fifteen", options: ["5", "15", "50"], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Qual número você ouviu?", audio: "Twelve", options: ["2", "12", "20"], answer: 1 },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue os números.", pairs: [["three", "3"], ["eight", "8"], ["eleven", "11"], ["twenty", "20"]] },
        { type: "translate", skill: "writing", prompt: "Quantos anos você tem?", accepted: ["How old are you?"] },
        { type: "fill_blank", skill: "grammar", sentence: "She ___ nine years old.", translation: "Ela tem nove anos.", accepted: ["is"] },
        { type: "word_order", skill: "grammar", prompt: "Meu irmão tem treze anos.", answer: "My brother is thirteen years old.", distractors: ["has"] },
        { type: "listening", skill: "listening", prompt: "Escreva o número que ouviu (por extenso, em inglês).", audio: "Seven", accepted: ["seven", "7"] },
      ],
      conversation: {
        goal: "Diga sua idade e pergunte a idade do professor.",
        starter: "Let's talk about numbers! How old are you?",
      },
      review: ["I'm + idade (nunca I have).", "How old are you?", "-teen com sílaba forte no final."],
    }),

    buildLesson("a1-m1-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo 1",
      objective: "Comprovar que você domina cumprimentos, apresentações, verbo to be e números até 20.",
      explanation: [
        { title: "Como funciona", body: "São exercícios misturados de todo o módulo. Você precisa de **70%** de acertos para liberar o próximo módulo. Pode refazer quantas vezes quiser." },
      ],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Você chega numa reunião às 19h. O que diz?", options: ["Good night", "Good evening", "Good afternoon"], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "They ___ my friends.", translation: "Eles são meus amigos.", accepted: ["are"] },
        { type: "translate", skill: "writing", prompt: "Meu nome é Pedro.", accepted: ["My name is Pedro.", "My name's Pedro.", "I'm Pedro.", "I am Pedro."] },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a frase correta.", options: ["I have 30 years.", "Is hot today.", "It's hot today.", "He are tired."], answer: 2 },
        { type: "listening", skill: "listening", prompt: "Qual número você ouviu?", audio: "Thirteen", options: ["3", "13", "30"], answer: 1 },
        { type: "word_order", skill: "grammar", prompt: "Você está com fome?", answer: "Are you hungry?" },
        { type: "translate", skill: "writing", prompt: "Ela não está ocupada.", accepted: ["She isn't busy.", "She is not busy.", "She's not busy."] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Nice to meet you.", accepted: ["nice to meet you"] },
        { type: "multiple_choice", skill: "reading", prompt: "\"What's your name?\" — \"I'm Julia. Nice to meet you.\" Qual é o nome dela?", options: ["Nice", "Julia", "Name"], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "How ___ are you? — I'm sixteen.", accepted: ["old"] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
