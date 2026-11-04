import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "b2-m7";

export const b2Module7: Module = {
  id: M,
  level: "B2",
  order: 7,
  title: "Escuta e fala autênticas",
  description: "Fala rápida e sotaques, marcadores de discurso, anedotas e humor.",
  lessons: [
    buildLesson("b2-m7-l1", M, 1, {
      title: "Sotaques",
      objective: "Entender a fala rápida: reduções, ligações e sotaques diferentes.",
      explanation: [
        {
          title: "Reduções",
          body: "Na fala natural: **going to → gonna**, **want to → wanna**, **got to → gotta**, **don't know → dunno**, **What do you → Whaddaya**, **Did you → Didja**. Você não precisa falar assim, mas precisa entender.",
        },
        {
          title: "Ligação (linking)",
          body: "Consoante final + vogal se juntam: **turn it off** soa \"tur-ni-toff\"; **an apple** soa \"a-napple\". O **t** entre vogais no inglês americano vira um som de \"r\" rápido: **water** \"uó-rer\", **better** \"bé-rer\".",
        },
        {
          title: "Sotaques",
          body: "Britânico: **r** final quase some (car = \"cá\"), **a** longo em bath/can't. Americano: **r** forte, **t** suave. Australiano: \"day\" soa perto de \"dái\". Exponha-se a vários.",
        },
      ],
      vocabulary: [
        { en: "gonna", pt: "going to (falado)", say: "GÓ-na" },
        { en: "wanna", pt: "want to (falado)", say: "UÓ-na" },
        { en: "gotta", pt: "got to (falado)", say: "GÓ-ra" },
        { en: "dunno", pt: "don't know (falado)", say: "dâ-NÔU" },
        { en: "accent", pt: "sotaque", say: "ÉK-sent" },
        { en: "mumble", pt: "murmurar / falar enrolado", say: "MÂM-bol" },
        { en: "catch (what someone said)", pt: "entender / pegar", say: "KÉTCH" },
        { en: "Come again?", pt: "Como? Pode repetir?", say: "câm a-GUÉN" },
        { en: "slang", pt: "gíria", say: "SLÉNG" },
      ],
      examples: [
        { en: "Sorry, I didn't catch that. Could you say it again?", pt: "Desculpe, não peguei. Pode repetir?" },
        { en: "I'm gonna grab a coffee. Wanna come?", pt: "Vou pegar um café. Quer vir?" },
        { en: "I dunno, I've gotta check my schedule.", pt: "Sei lá, tenho que ver minha agenda." },
      ],
      exercises: [
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue a forma falada à escrita.", pairs: [["gonna", "going to"], ["wanna", "want to"], ["gotta", "got to"], ["dunno", "don't know"]] },
        { type: "listening", skill: "listening", prompt: "Ouça (fala rápida) e escolha.", audio: "Whaddaya wanna do tonight?", options: ["O que você quer fazer hoje à noite?", "Onde você estava ontem?", "Você quer jantar?"], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I've gotta go, I'm gonna be late.", options: ["Tenho que ir, vou me atrasar.", "Vou ficar mais um pouco.", "Já estou atrasado há uma hora."], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Você não entendeu o que disseram. Diga:", options: ["Sorry, I didn't catch that.", "I don't catch you.", "Repeat."], answer: 0 },
        { type: "multiple_choice", skill: "listening", prompt: "No inglês americano, \"water\" costuma soar como:", options: ["uó-ter (t forte)", "uó-rer (t como r rápido)", "uá-ta"], answer: 1 },
        { type: "fill_blank", skill: "vocabulary", sentence: "He speaks with a strong Scottish ___.", accepted: ["accent"] },
        { type: "translate", skill: "writing", prompt: "Desculpe, não entendi. Pode repetir?", accepted: ["Sorry, I didn't catch that. Could you repeat it?", "Sorry, I didn't catch that. Can you say it again?", "Sorry, I didn't catch that. Could you say it again?", "Sorry, I didn't understand. Could you repeat that?"] },
        { type: "listening", skill: "listening", prompt: "Escreva por extenso o que você ouviu (going to).", audio: "I'm going to call you later.", accepted: ["i'm going to call you later", "i am going to call you later"] },
      ],
      conversation: {
        goal: "Treine entender fala rápida: peça ao professor para falar mais rápido e informal, e use estratégias para pedir repetição.",
        starter: "Alright, I'm gonna speak a bit faster and more casually today. Ready? So whaddaya been up to lately?",
      },
      review: ["gonna, wanna, gotta, dunno.", "Linking: consoante + vogal se juntam; t entre vogais = 'r' rápido (EUA).", "Sorry, I didn't catch that."],
    }),

    buildLesson("b2-m7-l2", M, 2, {
      title: "Podcasts e entrevistas",
      objective: "Acompanhar falas longas usando marcadores de discurso.",
      explanation: [
        {
          title: "Marcadores que anunciam o que vem",
          body: "Mudança de assunto: **Anyway,... / By the way,...** · Exemplo: **For instance / Say,...** · Contraste: **Mind you,...** (por outro lado) · Ênfase: **Actually,... / The thing is,...** · Conclusão: **So basically,... / At the end of the day,...**",
        },
        {
          title: "Por que importam",
          body: "Num podcast, você não entende cada palavra, mas os marcadores dizem a estrutura: \"The thing is\" = vem o problema principal; \"Anyway\" = voltando ao assunto; \"Mind you\" = vem uma ressalva.",
        },
      ],
      vocabulary: [
        { en: "anyway", pt: "enfim / de qualquer forma", say: "É-ni-uêi" },
        { en: "by the way", pt: "a propósito", say: "bái dhe UÊI" },
        { en: "actually", pt: "na verdade", say: "ÉK-tchu-a-li" },
        { en: "the thing is", pt: "a questão é", say: "dhe THÍNG iz" },
        { en: "mind you", pt: "por outro lado / veja bem", say: "MÁIND iu" },
        { en: "at the end of the day", pt: "no fim das contas", say: "ét dhi ÉND ov dhe DÊI" },
        { en: "as I said", pt: "como eu disse", say: "éz ái SÉD" },
        { en: "speaking of", pt: "falando em", say: "SPÍI-king ov" },
        { en: "to be honest", pt: "para ser sincero", say: "tu bi Ó-nest" },
      ],
      examples: [
        { en: "The thing is, nobody really reads the terms and conditions.", pt: "A questão é que ninguém lê os termos e condições." },
        { en: "It's expensive. Mind you, it lasts for years.", pt: "É caro. Por outro lado, dura anos." },
        { en: "Anyway, as I was saying, the project starts in May.", pt: "Enfim, como eu dizia, o projeto começa em maio." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Actually\" significa:", options: ["Atualmente", "Na verdade", "Exatamente"], answer: 1, explain: "Falso amigo: atualmente = currently / nowadays." },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Que marcador anuncia uma ressalva?", options: ["Mind you", "By the way", "Anyway"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "At the end of the ___, it's your decision.", accepted: ["day"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "By the ___, did you call the bank?", translation: "A propósito...", accepted: ["way"] },
        { type: "translate", skill: "writing", prompt: "Para ser sincero, não gostei.", accepted: ["To be honest, I didn't like it.", "To be honest, I did not like it.", "Honestly, I didn't like it."] },
        { type: "word_order", skill: "grammar", prompt: "Falando em viagens, você já foi ao Chile?", answer: "Speaking of trips, have you ever been to Chile?", distractors: ["talking"] },
        { type: "listening", skill: "listening", prompt: "Ouça. O que vem depois de \"the thing is\"?", audio: "We have the budget and the team. The thing is, we don't have time.", options: ["O problema principal: falta de tempo.", "Uma solução.", "Uma piada."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Anyway, let's move on.", accepted: ["anyway let's move on", "anyway let us move on"] },
      ],
      conversation: {
        goal: "Faça uma \"entrevista de podcast\" com o professor sobre seu trabalho ou hobby, usando marcadores naturais.",
        starter: "Welcome to the show! So, tell our listeners a bit about what you do. Actually, let's start with how you got into it.",
      },
      review: ["anyway, by the way, actually, the thing is, mind you.", "Marcadores revelam a estrutura da fala.", "actually = na verdade (não 'atualmente')."],
    }),

    buildLesson("b2-m7-l3", M, 3, {
      title: "Contando anedotas",
      objective: "Contar histórias curtas com impacto, suspense e ênfase.",
      explanation: [
        {
          title: "Estrutura de anedota",
          body: "Gancho → cenário → complicação → clímax → desfecho → comentário. Gancho: **You'll never guess what happened to me yesterday.** · **So there I was,...** (presente narrativo dá vivacidade).",
        },
        {
          title: "Ênfase e suspense",
          body: "**And then, out of nowhere,...** · **To make matters worse,...** (Para piorar...) · **It turned out that...** · **Believe it or not,...** · Advérbios intensos: **absolutely terrified, completely lost**.",
        },
        {
          title: "Reagindo à anedota de alguém",
          body: "**No way! / You're kidding! / What happened next? / Oh, that's hilarious!**",
        },
      ],
      vocabulary: [
        { en: "You'll never guess", pt: "Você nunca vai adivinhar", say: "iul NÉ-ver GUÉS" },
        { en: "So there I was", pt: "Lá estava eu", say: "SÔU dhér ái UÓZ" },
        { en: "out of nowhere", pt: "do nada", say: "áut ov NÔU-uér" },
        { en: "to make matters worse", pt: "para piorar", say: "tu mêik MÉ-terz UÂRS" },
        { en: "believe it or not", pt: "acredite se quiser", say: "bi-LÍIV it or NÓT" },
        { en: "You're kidding!", pt: "Tá brincando!", say: "iur KÍ-ding" },
        { en: "terrified", pt: "apavorado", say: "TÉ-ri-fáid" },
        { en: "punchline", pt: "desfecho (da piada)", say: "PÂNTCH-láin" },
      ],
      examples: [
        { en: "You'll never guess who I bumped into at the airport.", pt: "Você nunca vai adivinhar com quem eu esbarrei no aeroporto." },
        { en: "To make matters worse, my phone died.", pt: "Para piorar, meu celular descarregou." },
        { en: "So there I was, in a foreign city, with no money and no phone.", pt: "Lá estava eu, numa cidade estrangeira, sem dinheiro e sem celular." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Melhor gancho para uma história:", options: ["You'll never guess what happened to me.", "Here is information.", "I want to say a thing."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "To make matters ___, it started raining.", accepted: ["worse"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Then, out of ___, a dog jumped on me.", accepted: ["nowhere"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Reação a uma história surpreendente:", options: ["You're kidding!", "OK.", "And?"], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Acredite se quiser, ele era o meu novo chefe.", accepted: ["Believe it or not, he was my new boss.", "Believe it or not, he turned out to be my new boss."] },
        { type: "word_order", skill: "grammar", prompt: "No fim, descobri que era tudo uma piada.", answer: "It turned out that it was all a joke.", distractors: ["discovered"] },
        { type: "listening", skill: "listening", prompt: "Ouça. Qual é a reviravolta?", audio: "I was panicking about my lost wallet. It turned out it was in my other jacket the whole time.", options: ["A carteira estava na outra jaqueta o tempo todo.", "A carteira foi roubada.", "Ele achou a carteira na rua."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "What happened next?", accepted: ["what happened next"] },
      ],
      conversation: {
        goal: "Conte uma anedota real (engraçada, assustadora ou embaraçosa) com gancho, suspense e desfecho. O professor vai reagir e fazer perguntas.",
        starter: "I love a good story. Tell me about the funniest or strangest thing that's ever happened to you.",
      },
      review: ["Gancho → cenário → complicação → clímax → desfecho.", "So there I was / out of nowhere / to make matters worse.", "Reações: No way! / You're kidding!"],
    }),

    buildLesson("b2-m7-l4", M, 4, {
      title: "Humor e ironia",
      objective: "Perceber understatement, sarcasmo e ironia.",
      explanation: [
        {
          title: "Understatement (atenuação irônica)",
          body: "Muito comum no humor britânico: dizer menos do que é. Após uma tempestade terrível: **It was a bit windy.** Sobre um desastre: **That didn't go quite as planned.**",
        },
        {
          title: "Sarcasmo",
          body: "Dizer o oposto, com entonação marcada: **Oh, great. Another meeting.** · **Well, that's just perfect.** · **Thanks a lot!** (quando não ajudaram). O tom de voz é a chave: arrastado e exagerado.",
        },
        {
          title: "Como reagir",
          body: "Se não tiver certeza, sorria e pergunte: **Are you being sarcastic?** Responder ao pé da letra é o erro mais comum de quem aprende.",
        },
      ],
      vocabulary: [
        { en: "sarcastic", pt: "sarcástico", say: "sar-KÉS-tik" },
        { en: "irony", pt: "ironia", say: "ÁI-ro-ni" },
        { en: "understatement", pt: "eufemismo / atenuação", say: "ân-der-STÊIT-ment" },
        { en: "tongue-in-cheek", pt: "em tom de brincadeira", say: "TÂNG in TCHÍIK" },
        { en: "dry humor", pt: "humor seco", say: "DRÁI RIÚ-mer" },
        { en: "joke", pt: "piada / brincar", say: "DJÔUK" },
        { en: "take it literally", pt: "levar ao pé da letra", say: "têik it LÍ-te-ra-li" },
        { en: "Just kidding", pt: "Só brincando", say: "DJÂST KÍ-ding" },
      ],
      examples: [
        { en: "Oh great, it's raining again. Just what I needed.", pt: "Ah, ótimo, chovendo de novo. Era tudo o que eu precisava. (sarcasmo)" },
        { en: "Losing the final 5–0 was not ideal.", pt: "Perder a final de 5 a 0 não foi o ideal. (understatement)" },
        { en: "Don't take it literally. He was being sarcastic.", pt: "Não leve ao pé da letra. Ele estava sendo sarcástico." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "listening", prompt: "Seu voo atrasou 6 horas e alguém diz \"Well, this is fun.\" A pessoa está:", options: ["Se divertindo de verdade.", "Sendo sarcástica.", "Elogiando o aeroporto."], answer: 1 },
        { type: "multiple_choice", skill: "listening", prompt: "Depois de um furacão: \"It was a little breezy.\" Isso é:", options: ["Understatement (atenuação irônica).", "Uma previsão do tempo.", "Uma reclamação exagerada."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Don't take it ___. It was a joke.", translation: "Não leve ao pé da letra.", accepted: ["literally", "seriously"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Are you being ___? (sarcástico)", accepted: ["sarcastic"] },
        { type: "translate", skill: "writing", prompt: "Só brincando!", accepted: ["Just kidding!", "Only joking!", "Just joking!", "I'm just kidding!"] },
        { type: "word_order", skill: "grammar", prompt: "Isso não saiu exatamente como planejado.", answer: "That didn't go quite as planned.", distractors: ["exactly"] },
        { type: "listening", skill: "listening", prompt: "Ouça. É sincero ou sarcástico?", audio: "Oh, wonderful. My laptop just crashed. Again.", options: ["Sarcástico.", "Sincero, está feliz.", "Neutro."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Thanks a lot.", accepted: ["thanks a lot"] },
      ],
      conversation: {
        goal: "O professor vai misturar frases sinceras e sarcásticas. Identifique cada uma e responda no mesmo tom.",
        starter: "Oh, I just love Monday mornings. Don't you? Nothing better than a two-hour meeting at 8 am.",
      },
      review: ["Understatement: dizer menos (It was a bit windy).", "Sarcasmo: dizer o oposto com entonação.", "Na dúvida: Are you being sarcastic?"],
    }),

    buildLesson("b2-m7-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Escuta e fala autênticas",
      objective: "Comprovar que você entende fala natural, marcadores e humor.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I dunno, I'm kinda tired. Wanna stay in?", options: ["Sei lá, estou meio cansado. Quer ficar em casa?", "Vamos sair agora!", "Não estou cansado."], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Actually\":", options: ["Na verdade", "Atualmente"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Sorry, I didn't ___ that. (entender/pegar)", accepted: ["catch", "get", "hear"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Mind you\" anuncia:", options: ["Uma ressalva.", "Uma ordem.", "Um cumprimento."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Para piorar, perdi o ônibus.", accepted: ["To make matters worse, I missed the bus."] },
        { type: "word_order", skill: "grammar", prompt: "Lá estava eu, sem dinheiro.", answer: "So there I was, with no money." },
        { type: "multiple_choice", skill: "listening", prompt: "\"Oh, brilliant. Another traffic jam.\" é:", options: ["Sarcasmo.", "Elogio."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "The thing is, at the end of the day, it's your call.", options: ["No fim das contas, a decisão é sua.", "Ligue para mim no fim do dia.", "A coisa terminou ontem."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva por extenso (want to).", audio: "Do you want to come?", accepted: ["do you want to come"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["out of nowhere", "do nada"], ["by the way", "a propósito"], ["just kidding", "só brincando"], ["accent", "sotaque"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
