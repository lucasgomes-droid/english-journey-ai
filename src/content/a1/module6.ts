import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "a1-m6";

export const a1Module6: Module = {
  id: M,
  level: "A1",
  order: 6,
  title: "Compras e serviços",
  description: "Preços, quantidades, compras de roupa e pedidos num café.",
  lessons: [
    buildLesson("a1-m6-l1", M, 1, {
      title: "Números grandes e preços",
      objective: "Contar até 1000 e perguntar e dizer preços.",
      explanation: [
        {
          title: "Dezenas: -ty",
          body: "20 **twenty**, 30 **thirty**, 40 **forty** (sem \"u\"!), 50 **fifty**, 60 **sixty**, 70 **seventy**, 80 **eighty**, 90 **ninety**. A força vai no começo: **THIR**ty — diferente de thir**TEEN**.",
        },
        {
          title: "Centenas",
          body: "100 = **a/one hundred**. 250 = **two hundred and fifty** (no inglês britânico com \"and\"; nos EUA muitas vezes sem). **hundred** não vai para o plural: two hundred (não \"hundreds\").",
        },
        {
          title: "Perguntando o preço",
          body: "**How much is this?** (singular) / **How much are these?** (plural). Resposta: **It's 15 dollars** / **They're 20 euros**. $9.99 se lê **nine ninety-nine**.",
        },
      ],
      vocabulary: [
        { en: "thirty", pt: "trinta", say: "THÊR-ti" },
        { en: "forty", pt: "quarenta", say: "FÓR-ti" },
        { en: "fifty", pt: "cinquenta", say: "FÍF-ti" },
        { en: "hundred", pt: "cem, centena", say: "RÂN-dred" },
        { en: "thousand", pt: "mil", say: "THÁU-zand" },
        { en: "price", pt: "preço", say: "PRÁIS" },
        { en: "cheap", pt: "barato", say: "TCHÍIP" },
        { en: "expensive", pt: "caro", say: "eks-PÉN-siv" },
        { en: "cash", pt: "dinheiro vivo", say: "KÉSH" },
        { en: "card", pt: "cartão", say: "KÁRD" },
      ],
      examples: [
        { en: "How much is this bag? — It's forty-five dollars.", pt: "Quanto custa esta bolsa? — Quarenta e cinco dólares." },
        { en: "These shoes are very expensive!", pt: "Estes sapatos são muito caros!" },
        { en: "Can I pay by card?", pt: "Posso pagar com cartão?" },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Como se escreve 40?", options: ["fourty", "forty", "fourteen"], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Qual número você ouviu?", audio: "Thirty", options: ["13", "30", "33"], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Qual preço você ouviu?", audio: "It's two hundred and fifty dollars.", options: ["$215", "$250", "$2,050"], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "Pergunta para \"estes sapatos\":", options: ["How much is these shoes?", "How much are these shoes?", "How many are these shoes?"], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Quanto custa isto?", accepted: ["How much is this?", "How much does this cost?"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue as palavras.", pairs: [["cheap", "barato"], ["expensive", "caro"], ["cash", "dinheiro"], ["price", "preço"]] },
        { type: "word_order", skill: "grammar", prompt: "Posso pagar com cartão?", answer: "Can I pay by card?", distractors: ["with"] },
        { type: "listening", skill: "listening", prompt: "Escreva o número que ouviu (em algarismos).", audio: "Ninety-nine", accepted: ["99", "ninety-nine", "ninety nine"] },
      ],
      conversation: { goal: "Pergunte preços de três itens como se estivesse numa loja.", starter: "Hi! Welcome to our store. Can I help you?" },
      review: ["-ty com força no início: THIRty.", "forty sem u; hundred sem plural.", "How much is/are...?"],
    }),

    buildLesson("a1-m6-l2", M, 2, {
      title: "Quanto e quantos",
      objective: "Fazer uma lista de compras com contáveis e incontáveis.",
      explanation: [
        {
          title: "Contável × incontável",
          body: "Contáveis têm plural: **an apple, two apples**. Incontáveis não: **water, rice, milk, bread, money** — não dizemos \"two waters\" (em geral) nem \"a rice\".",
        },
        {
          title: "How many × how much",
          body: "**How many** + contável no plural: **How many eggs?** **How much** + incontável: **How much milk?**",
        },
        {
          title: "Medidas",
          body: "Para incontáveis use recipientes: **a bottle of water**, **a loaf of bread**, **a kilo of rice**, **a carton of milk**, **a can of soda**.",
        },
      ],
      vocabulary: [
        { en: "apple", pt: "maçã", say: "É-pol" },
        { en: "egg", pt: "ovo", say: "ÉG" },
        { en: "milk", pt: "leite", say: "MÍLK" },
        { en: "cheese", pt: "queijo", say: "TCHÍIZ" },
        { en: "bottle", pt: "garrafa", say: "BÓ-rol" },
        { en: "kilo", pt: "quilo", say: "KÍ-lou" },
        { en: "loaf of bread", pt: "pão (inteiro, de forma)", say: "LÔUF ov BRÉD" },
        { en: "shopping list", pt: "lista de compras", say: "SHÓ-pin list" },
        { en: "need", pt: "precisar", say: "NÍID" },
        { en: "a few", pt: "alguns, poucos", say: "a FIÚ" },
      ],
      examples: [
        { en: "How many eggs do we need? — A dozen.", pt: "Quantos ovos precisamos? — Uma dúzia." },
        { en: "How much milk is there? — Not much.", pt: "Quanto leite tem? — Pouco." },
        { en: "I need a bottle of water and a kilo of rice.", pt: "Preciso de uma garrafa de água e um quilo de arroz." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"How ___ apples?\"", options: ["much", "many"], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "\"How ___ water?\"", options: ["much", "many"], answer: 0 },
        { type: "multiple_choice", skill: "grammar", prompt: "Qual é incontável?", options: ["egg", "apple", "rice"], answer: 2 },
        { type: "fill_blank", skill: "vocabulary", sentence: "a ___ of water", translation: "uma garrafa de água", accepted: ["bottle"] },
        { type: "translate", skill: "writing", prompt: "Quantos ovos você precisa?", accepted: ["How many eggs do you need?"] },
        { type: "translate", skill: "writing", prompt: "Quanto queijo nós temos?", accepted: ["How much cheese do we have?", "How much cheese have we got?"] },
        { type: "listening", skill: "listening", prompt: "O que a pessoa precisa?", audio: "I need two kilos of apples and some milk.", options: ["Maçãs e leite", "Ovos e leite", "Maçãs e queijo"], answer: 0 },
        { type: "word_order", skill: "grammar", prompt: "Precisamos de um pão.", answer: "We need a loaf of bread.", distractors: ["many"] },
      ],
      conversation: { goal: "Monte com o professor uma lista de compras para o jantar.", starter: "Let's cook dinner tonight! What do we need from the supermarket?" },
      review: ["How many + plural contável.", "How much + incontável.", "a bottle/kilo/loaf of..."],
    }),

    buildLesson("a1-m6-l3", M, 3, {
      title: "Na loja de roupas",
      objective: "Comprar uma roupa: pedir tamanho, experimentar e pagar.",
      explanation: [
        {
          title: "Frases-chave",
          body: "**Can I try it on?** (Posso experimentar?) — **Where are the fitting rooms?** (provadores) — **Do you have this in a medium?** (Tem este em M?) — **I'll take it** (Vou levar).",
        },
        {
          title: "Too e not... enough",
          body: "**too** = demais: **It's too big** (grande demais). **not big enough** = não é grande o suficiente. Atenção: **too** vem antes do adjetivo, **enough** vem depois.",
        },
        { title: "Tamanhos", body: "**small (S), medium (M), large (L), extra large (XL)**. Sapato: **What size are you?** — **I'm a size 40** (tamanho europeu) ou **size 9** (EUA)." },
      ],
      vocabulary: [
        { en: "size", pt: "tamanho", say: "SÁIZ" },
        { en: "try on", pt: "experimentar (roupa)", say: "TRÁI ón" },
        { en: "fitting room", pt: "provador", say: "FÍ-rin rum" },
        { en: "small", pt: "pequeno", say: "SMÓL" },
        { en: "medium", pt: "médio", say: "MÍ-di-um" },
        { en: "large", pt: "grande", say: "LÁRDJ" },
        { en: "too big", pt: "grande demais", say: "TÚU BÍG" },
        { en: "I'll take it", pt: "vou levar", say: "ÁIL TÊIK it" },
        { en: "receipt", pt: "recibo, nota", say: "ri-SÍIT (o p é mudo)" },
        { en: "sale", pt: "promoção, liquidação", say: "SÊIL" },
      ],
      examples: [
        { en: "Can I try this jacket on?", pt: "Posso experimentar esta jaqueta?" },
        { en: "It's too small. Do you have it in a large?", pt: "Está pequeno demais. Tem em G?" },
        { en: "It fits perfectly. I'll take it!", pt: "Serviu perfeitamente. Vou levar!" },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Posso experimentar?\"", options: ["Can I try it on?", "Can I take it?", "Can I wear it?"], answer: 0 },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Grande demais\":", options: ["big too", "too big", "big enough"], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "It's not big ___. (o suficiente)", accepted: ["enough"] },
        { type: "translate", skill: "writing", prompt: "Onde ficam os provadores?", accepted: ["Where are the fitting rooms?", "Where is the fitting room?", "Where's the fitting room?"] },
        { type: "translate", skill: "writing", prompt: "Vou levar.", accepted: ["I'll take it.", "I will take it."] },
        { type: "listening", skill: "listening", prompt: "Qual o problema com a camisa?", audio: "This shirt is too small for me.", options: ["Grande demais", "Pequena demais", "Cara demais"], answer: 1 },
        { type: "word_order", skill: "grammar", prompt: "Você tem isto em tamanho médio?", answer: "Do you have this in a medium?", distractors: ["size"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue as palavras.", pairs: [["receipt", "recibo"], ["sale", "promoção"], ["size", "tamanho"], ["large", "grande"]] },
      ],
      conversation: { goal: "Compre uma jaqueta: pergunte tamanho, experimente e pague.", starter: "Hello! Are you looking for anything special today?" },
      review: ["Can I try it on?", "too + adjetivo; adjetivo + enough.", "I'll take it."],
    }),

    buildLesson("a1-m6-l4", M, 4, {
      title: "No café",
      objective: "Pedir comida e bebida num café ou lanchonete.",
      explanation: [
        {
          title: "Pedindo",
          body: "**Can I have a coffee, please?** e **I'd like a sandwich, please** são as formas mais naturais. O atendente pode perguntar: **For here or to go?** (comer aqui ou levar) e **Anything else?** (mais alguma coisa?).",
        },
        {
          title: "Oferecendo: Would you like...?",
          body: "**Would you like some sugar?** = Você quer açúcar? Resposta: **Yes, please.** / **No, thank you.**",
        },
        { title: "Pagando", body: "**Can I have the bill/check, please?** (a conta — bill no Reino Unido, check nos EUA)." },
      ],
      vocabulary: [
        { en: "menu", pt: "cardápio", say: "MÉ-niu" },
        { en: "sandwich", pt: "sanduíche", say: "SÉN-uitch" },
        { en: "cake", pt: "bolo", say: "KÊIK" },
        { en: "tea", pt: "chá", say: "TÍ" },
        { en: "sugar", pt: "açúcar", say: "SHÚ-gar" },
        { en: "to go", pt: "para viagem", say: "tu GÔU" },
        { en: "for here", pt: "para comer aqui", say: "for RÍER" },
        { en: "anything else", pt: "mais alguma coisa", say: "É-ni-thin ÉLS" },
        { en: "bill", pt: "conta (restaurante)", say: "BÍL" },
        { en: "small coffee", pt: "café pequeno", say: "SMÓL KÓ-fi" },
      ],
      examples: [
        { en: "Can I have a small coffee and a piece of cake, please?", pt: "Pode me ver um café pequeno e um pedaço de bolo, por favor?" },
        { en: "For here or to go? — To go, please.", pt: "Para comer aqui ou levar? — Para levar, por favor." },
        { en: "Would you like anything else? — No, that's all, thanks.", pt: "Mais alguma coisa? — Não, é só isso, obrigado." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"For here or to go?\" significa:", options: ["Aqui ou lá?", "Comer aqui ou levar?", "Pagar aqui ou no caixa?"], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "Pedido mais natural:", options: ["Give me a tea.", "Can I have a tea, please?", "I want tea now."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Pode me trazer a conta, por favor?", accepted: ["Can I have the check, please?", "Can I have the check, please?", "Could I have the check, please?", "Could I have the check, please?", "The bill, please.", "The check, please."] },
        { type: "fill_blank", skill: "grammar", sentence: "___ you like some sugar?", accepted: ["Would", "would"] },
        { type: "listening", skill: "listening", prompt: "O que o cliente pediu?", audio: "Can I have a tea and a cheese sandwich, please?", options: ["Café e bolo", "Chá e sanduíche de queijo", "Chá e bolo"], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Qual é a resposta adequada?", audio: "Anything else?", options: ["No, that's all, thanks.", "Yes, I'm fine.", "To go, please."], answer: 0 },
        { type: "word_order", skill: "grammar", prompt: "Eu gostaria de um pedaço de bolo.", answer: "I'd like a piece of cake.", distractors: ["want"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue as palavras.", pairs: [["menu", "cardápio"], ["bill", "conta"], ["sugar", "açúcar"], ["cake", "bolo"]] },
      ],
      conversation: { goal: "Faça um pedido completo num café: bebida, comida, para levar e pagar.", starter: "Hi there! What can I get for you today?" },
      review: ["Can I have...? / I'd like...", "For here or to go?", "Can I have the check?"],
    }),

    buildLesson("a1-m6-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo 6",
      objective: "Comprovar que você domina preços, quantidades, compras e pedidos.",
      explanation: [{ title: "Como funciona", body: "Exercícios de todo o módulo 6. Você precisa de **70%** para avançar." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "listening", skill: "listening", prompt: "Qual preço você ouviu?", audio: "It's sixty dollars.", options: ["$16", "$60", "$66"], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "\"How ___ bread do we need?\"", options: ["much", "many"], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Quanto custam estes sapatos?", accepted: ["How much are these shoes?", "How much do these shoes cost?"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Pequeno demais\":", options: ["too small", "small too", "small enough"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "a ___ of rice (quilo)", accepted: ["kilo"] },
        { type: "word_order", skill: "grammar", prompt: "Posso experimentar isto?", answer: "Can I try this on?" },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Anything else?\" significa:", options: ["Tudo bem?", "Mais alguma coisa?", "Algo errado?"], answer: 1 },
        { type: "listening", skill: "listening", prompt: "O cliente vai comer aqui?", audio: "To go, please.", options: ["Sim", "Não, vai levar"], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Eu gostaria de um chá, por favor.", accepted: ["I'd like a tea, please.", "I would like a tea, please.", "I'd like tea, please.", "I'd like a cup of tea, please."] },
        { type: "multiple_choice", skill: "reading", prompt: "\"The jacket is $80, but it's on sale: now it's $50.\" Quanto custa agora?", options: ["$80", "$50", "$30"], answer: 1 },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
