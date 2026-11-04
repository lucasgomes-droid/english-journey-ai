import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "a1-m3";

export const a1Module3: Module = {
  id: M,
  level: "A1",
  order: 3,
  title: "Dia a dia",
  description: "Rotina, horas, comida e perguntas com do/does no presente simples.",
  lessons: [
    buildLesson("a1-m3-l1", M, 1, {
      title: "Minha rotina",
      objective: "Descrever sua rotina diária com o presente simples.",
      explanation: [
        {
          title: "Presente simples",
          body: "Usamos o **present simple** para hábitos e rotinas: **I wake up at 7.** **I work from Monday to Friday.**",
        },
        {
          title: "O -s da terceira pessoa",
          body: "Com **he, she, it**, o verbo ganha **-s**: I work → **she works**. Verbos terminados em o, sh, ch ganham **-es**: go → **goes**, watch → **watches**. **Have** vira **has**.",
          table: {
            head: ["I / you / we / they", "he / she / it"],
            rows: [
              ["work", "works"],
              ["go", "goes"],
              ["watch", "watches"],
              ["have", "has"],
              ["study", "studies"],
            ],
          },
        },
        {
          title: "Advérbios de frequência",
          body: "**always** (sempre), **usually** (geralmente), **sometimes** (às vezes), **never** (nunca) vêm **antes** do verbo principal: **I usually have coffee.**",
        },
      ],
      vocabulary: [
        { en: "wake up", pt: "acordar", say: "UÊIK âp" },
        { en: "get up", pt: "levantar-se", say: "GUÉT âp" },
        { en: "have breakfast", pt: "tomar café da manhã", say: "rév BRÉK-fâst" },
        { en: "go to work", pt: "ir para o trabalho", say: "GÔU tu UÊRK" },
        { en: "have lunch", pt: "almoçar", say: "rév LÂNTCH" },
        { en: "go home", pt: "ir para casa", say: "GÔU RÔUM" },
        { en: "watch TV", pt: "assistir TV", say: "UÓTCH ti-VÍ" },
        { en: "go to bed", pt: "ir dormir", say: "GÔU tu BÉD" },
        { en: "always", pt: "sempre", say: "ÓL-ueiz" },
        { en: "usually", pt: "geralmente", say: "IÚ-jua-li" },
        { en: "never", pt: "nunca", say: "NÉ-ver" },
      ],
      examples: [
        { en: "I wake up at six and have breakfast.", pt: "Acordo às seis e tomo café da manhã." },
        { en: "She goes to work by bus.", pt: "Ela vai para o trabalho de ônibus." },
        { en: "We never watch TV in the morning.", pt: "Nunca assistimos TV de manhã." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "He ___ (go) to work at eight.", translation: "Ele vai para o trabalho às oito.", accepted: ["goes"] },
        { type: "fill_blank", skill: "grammar", sentence: "My sister ___ (watch) TV every night.", accepted: ["watches"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Onde fica o advérbio? \"Eu sempre almoço ao meio-dia.\"", options: ["I have always lunch at noon.", "I always have lunch at noon.", "Always I have lunch at noon."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Eu acordo às sete.", accepted: ["I wake up at seven.", "I wake up at 7.", "I get up at seven.", "I get up at 7."] },
        { type: "translate", skill: "writing", prompt: "Ela tem dois filhos.", accepted: ["She has two children.", "She has two kids.", "She has 2 children."], explain: "Com she, have vira has." },
        { type: "word_order", skill: "grammar", prompt: "Nós geralmente vamos para casa às seis.", answer: "We usually go home at six.", distractors: ["goes"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "She never has breakfast.", options: ["Ela sempre toma café.", "Ela nunca toma café da manhã.", "Ela às vezes almoça."], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I go to bed at eleven.", accepted: ["i go to bed at eleven", "i go to bed at 11"] },
      ],
      conversation: {
        goal: "Descreva um dia normal seu, do acordar até ir dormir.",
        starter: "Tell me about your typical day. What time do you wake up?",
      },
      review: ["Presente simples para rotina.", "he/she/it + -s/-es; have → has.", "always/usually/never antes do verbo."],
    }),

    buildLesson("a1-m3-l2", M, 2, {
      title: "Que horas são?",
      objective: "Perguntar e dizer as horas e marcar horários.",
      explanation: [
        {
          title: "Perguntando as horas",
          body: "**What time is it?** — Que horas são? Responda com **It's...**: **It's three o'clock** (3 em ponto), **It's three thirty** (3:30).",
        },
        {
          title: "AM e PM",
          body: "Em países de língua inglesa é comum o relógio de 12 horas: **a.m.** (da meia-noite ao meio-dia) e **p.m.** (do meio-dia à meia-noite). 15h = **3 p.m.**",
        },
        {
          title: "At + horário",
          body: "Para dizer quando algo acontece, use **at**: **The meeting is at 10 a.m.** — **What time is the class? At seven.**",
        },
      ],
      vocabulary: [
        { en: "time", pt: "hora, tempo", say: "TÁIM" },
        { en: "o'clock", pt: "em ponto", say: "o-KLÓK" },
        { en: "half past", pt: "e meia", say: "RÉF pést" },
        { en: "quarter past", pt: "e quinze", say: "KUÓR-ter pést" },
        { en: "noon", pt: "meio-dia", say: "NÚUN" },
        { en: "midnight", pt: "meia-noite", say: "MÍD-nait" },
        { en: "early", pt: "cedo", say: "ÊR-li" },
        { en: "late", pt: "tarde, atrasado", say: "LÊIT" },
        { en: "meeting", pt: "reunião", say: "MÍ-tin" },
      ],
      examples: [
        { en: "What time is it? — It's half past two.", pt: "Que horas são? — São duas e meia." },
        { en: "The meeting is at 9 a.m.", pt: "A reunião é às 9 da manhã." },
        { en: "Sorry, I'm late!", pt: "Desculpe, estou atrasado!" },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"It's four o'clock\" significa:", options: ["São 4:15", "São 4 em ponto", "São 4:30"], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "20h no relógio de 12 horas:", options: ["8 a.m.", "8 p.m.", "10 p.m."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "The class is ___ seven.", translation: "A aula é às sete.", accepted: ["at"] },
        { type: "translate", skill: "writing", prompt: "Que horas são?", accepted: ["What time is it?", "What's the time?"] },
        { type: "word_order", skill: "grammar", prompt: "A reunião é ao meio-dia.", answer: "The meeting is at noon.", distractors: ["in"] },
        { type: "listening", skill: "listening", prompt: "Que horas você ouviu?", audio: "It's half past six.", options: ["6:00", "6:15", "6:30"], answer: 2 },
        { type: "listening", skill: "listening", prompt: "Que horas você ouviu?", audio: "It's a quarter past nine.", options: ["9:15", "9:45", "9:25"], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Desculpe, estou atrasado.", accepted: ["Sorry, I'm late.", "Sorry, I am late.", "I'm sorry, I'm late."] },
      ],
      conversation: {
        goal: "Combine com o professor um horário para uma aula de inglês.",
        starter: "Let's schedule our next class. What time is good for you?",
      },
      review: ["What time is it? → It's...", "o'clock, half past, quarter past.", "at + horário."],
    }),

    buildLesson("a1-m3-l3", M, 3, {
      title: "Comida e bebida",
      objective: "Dizer do que você gosta e não gosta, e pedir algo educadamente.",
      explanation: [
        {
          title: "Like e don't like",
          body: "**I like coffee.** / **I don't like tea.** Com he/she: **She likes pizza.** / **She doesn't like fish.** (Na negativa com does, o verbo volta sem -s.)",
        },
        {
          title: "Pedindo com educação",
          body: "**I'd like...** (eu gostaria de) é a forma educada de pedir: **I'd like a coffee, please.** É bem mais natural que \"I want\" num restaurante.",
        },
        {
          title: "Some e any",
          body: "**some** em frases afirmativas e ofertas (**Would you like some water?**); **any** em negativas e perguntas (**I don't have any milk.**).",
        },
      ],
      vocabulary: [
        { en: "water", pt: "água", say: "UÓ-ter" },
        { en: "coffee", pt: "café", say: "KÓ-fi" },
        { en: "juice", pt: "suco", say: "DJÚUS" },
        { en: "bread", pt: "pão", say: "BRÉD" },
        { en: "chicken", pt: "frango", say: "TCHÍ-ken" },
        { en: "rice and beans", pt: "arroz e feijão", say: "RÁIS end BÍINZ" },
        { en: "fruit", pt: "fruta", say: "FRÚUT" },
        { en: "I'd like", pt: "eu gostaria", say: "ÁID láik" },
        { en: "please", pt: "por favor", say: "PLÍIZ" },
      ],
      examples: [
        { en: "I like chicken, but I don't like fish.", pt: "Gosto de frango, mas não gosto de peixe." },
        { en: "I'd like an orange juice, please.", pt: "Eu gostaria de um suco de laranja, por favor." },
        { en: "Would you like some bread?", pt: "Você gostaria de um pouco de pão?" },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "She ___ (like) coffee.", accepted: ["likes"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Ele não gosta de peixe.\"", options: ["He don't like fish.", "He doesn't likes fish.", "He doesn't like fish."], answer: 2, explain: "Com doesn't o verbo fica sem -s." },
        { type: "multiple_choice", skill: "grammar", prompt: "A forma mais educada de pedir no restaurante:", options: ["I want water.", "Give me water.", "I'd like some water, please."], answer: 2 },
        { type: "fill_blank", skill: "grammar", sentence: "I don't have ___ juice.", translation: "Eu não tenho suco nenhum.", accepted: ["any"] },
        { type: "translate", skill: "writing", prompt: "Eu gostaria de um café, por favor.", accepted: ["I'd like a coffee, please.", "I would like a coffee, please.", "I'd like a coffee please.", "I'd like coffee, please."] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue os alimentos.", pairs: [["bread", "pão"], ["juice", "suco"], ["chicken", "frango"], ["water", "água"]] },
        { type: "listening", skill: "listening", prompt: "O que a pessoa pediu?", audio: "I'd like some rice and chicken, please.", options: ["Arroz e frango", "Pão e suco", "Arroz e feijão"], answer: 0 },
        { type: "word_order", skill: "grammar", prompt: "Você gostaria de um pouco de água?", answer: "Would you like some water?", distractors: ["any"] },
      ],
      conversation: {
        goal: "Conte ao professor suas comidas favoritas e o que você não gosta.",
        starter: "I'm hungry! What's your favorite food?",
      },
      review: ["like/likes; don't/doesn't like.", "I'd like... please para pedir.", "some em afirmativas e ofertas; any em negativas."],
    }),

    buildLesson("a1-m3-l4", M, 4, {
      title: "Perguntas com do e does",
      objective: "Fazer perguntas e respostas curtas no presente simples.",
      explanation: [
        {
          title: "O auxiliar do/does",
          body: "Perguntas no presente simples usam **do** (I, you, we, they) ou **does** (he, she, it) no início: **Do you like music?** **Does she work here?** O verbo principal fica na forma básica: Does she **work** (e não works).",
        },
        {
          title: "Respostas curtas",
          body: "Responda com o auxiliar, não com o verbo: **Do you speak English? — Yes, I do. / No, I don't.** — **Does he live here? — Yes, he does. / No, he doesn't.**",
        },
        {
          title: "Palavras interrogativas",
          body: "Combine com **where, what, when, what time**: **Where do you live?** **What time does the store open?**",
        },
      ],
      vocabulary: [
        { en: "live", pt: "morar, viver", say: "LÍV" },
        { en: "like", pt: "gostar", say: "LÁIK" },
        { en: "need", pt: "precisar", say: "NÍID" },
        { en: "want", pt: "querer", say: "UÓNT" },
        { en: "study", pt: "estudar", say: "STÂ-di" },
        { en: "when", pt: "quando", say: "UÉN" },
        { en: "store", pt: "loja", say: "STÓR" },
        { en: "open", pt: "abrir, aberto", say: "ÔU-pen" },
      ],
      examples: [
        { en: "Do you live in São Paulo? — Yes, I do.", pt: "Você mora em São Paulo? — Sim, moro." },
        { en: "Does your brother study English? — No, he doesn't.", pt: "Seu irmão estuda inglês? — Não." },
        { en: "What time does the store open?", pt: "Que horas a loja abre?" },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "___ you speak Spanish?", accepted: ["Do", "do"] },
        { type: "fill_blank", skill: "grammar", sentence: "___ she live near here?", accepted: ["Does", "does"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a pergunta correta.", options: ["Does he works here?", "Does he work here?", "Do he work here?"], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Do you like pizza?\" — resposta curta positiva:", options: ["Yes, I like.", "Yes, I do.", "Yes, I am."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Onde você mora?", accepted: ["Where do you live?"] },
        { type: "word_order", skill: "grammar", prompt: "Que horas a loja abre?", answer: "What time does the store open?", distractors: ["opens"] },
        { type: "listening", skill: "listening", prompt: "Escolha a resposta adequada para o que você ouviu.", audio: "Does your sister study English?", options: ["Yes, she does.", "Yes, she is.", "Yes, I do."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Do you need help?", accepted: ["do you need help"] },
      ],
      conversation: {
        goal: "Faça três perguntas ao professor usando do ou does.",
        starter: "Now it's your turn to ask me questions! What do you want to know about me?",
      },
      review: ["do (I/you/we/they), does (he/she/it).", "Depois de does, verbo sem -s.", "Respostas curtas: Yes, I do / No, he doesn't."],
    }),

    buildLesson("a1-m3-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo 3",
      objective: "Comprovar que você domina rotina, horas, comida e perguntas no presente simples.",
      explanation: [{ title: "Como funciona", body: "Exercícios de todo o módulo 3. Você precisa de **70%** para avançar." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "My father ___ (have) lunch at noon.", accepted: ["has"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a frase correta.", options: ["She doesn't likes tea.", "She don't like tea.", "She doesn't like tea."], answer: 2 },
        { type: "translate", skill: "writing", prompt: "Que horas são?", accepted: ["What time is it?", "What's the time?"] },
        { type: "listening", skill: "listening", prompt: "Que horas você ouviu?", audio: "It's half past eight.", options: ["8:00", "8:30", "8:15"], answer: 1 },
        { type: "word_order", skill: "grammar", prompt: "Eu nunca tomo café da manhã.", answer: "I never have breakfast." },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Does he speak English?\" — resposta negativa:", options: ["No, he doesn't.", "No, he don't.", "No, he isn't."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Eu gostaria de água, por favor.", accepted: ["I'd like water, please.", "I'd like some water, please.", "I would like some water, please.", "I would like water, please.", "I'd like a water, please."] },
        { type: "fill_blank", skill: "grammar", sentence: "Where ___ they live?", accepted: ["do"] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "She goes to work at seven.", accepted: ["she goes to work at seven", "she goes to work at 7"] },
        { type: "multiple_choice", skill: "reading", prompt: "\"Tom gets up at 6, has breakfast and goes to work by bus.\" Como Tom vai ao trabalho?", options: ["De carro", "De ônibus", "A pé"], answer: 1 },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
