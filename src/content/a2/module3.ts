import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "a2-m3";

export const a2Module3: Module = {
  id: M,
  level: "A2",
  order: 3,
  title: "Comparando",
  description: "Comparativos, superlativos, as...as e descrição de pessoas.",
  lessons: [
    buildLesson("a2-m3-l1", M, 1, {
      title: "Comparativos",
      objective: "Comparar duas coisas com -er e more... than.",
      explanation: [
        {
          title: "Adjetivos curtos: -er",
          body: "Adjetivos de uma sílaba ganham **-er**: cheap → **cheaper**, old → **older**. Terminados em consoante-vogal-consoante dobram a última: big → **bigger**, hot → **hotter**. Terminados em -y: easy → **easier**. Depois vem **than**: **São Paulo is bigger than Rio.**",
        },
        {
          title: "Adjetivos longos: more",
          body: "Com duas sílabas ou mais (sem -y): **more** + adjetivo: **more expensive**, **more interesting**, **more comfortable**. Nunca junte os dois: ~~more cheaper~~.",
        },
        {
          title: "Irregulares",
          body: "**good → better** (melhor) · **bad → worse** (pior) · **far → farther/further** (mais longe).",
          table: {
            head: ["Adjetivo", "Comparativo"],
            rows: [
              ["cheap", "cheaper"],
              ["big", "bigger"],
              ["easy", "easier"],
              ["expensive", "more expensive"],
              ["good", "better"],
              ["bad", "worse"],
            ],
          },
        },
      ],
      vocabulary: [
        { en: "cheap", pt: "barato", say: "TCHÍIP" },
        { en: "expensive", pt: "caro", say: "ex-PÉN-siv" },
        { en: "comfortable", pt: "confortável", say: "CÂM-fer-ta-bol" },
        { en: "safe", pt: "seguro", say: "SÊIF" },
        { en: "dangerous", pt: "perigoso", say: "DÊIN-dje-râs" },
        { en: "quiet", pt: "tranquilo / silencioso", say: "KUÁI-et" },
        { en: "noisy", pt: "barulhento", say: "NÓI-zi" },
        { en: "better", pt: "melhor", say: "BÉ-ter" },
        { en: "worse", pt: "pior", say: "UÂRS" },
        { en: "than", pt: "do que", say: "DHÉN" },
      ],
      examples: [
        { en: "The bus is cheaper than the taxi.", pt: "O ônibus é mais barato que o táxi." },
        { en: "This hotel is more comfortable than the other one.", pt: "Este hotel é mais confortável que o outro." },
        { en: "My English is better than last year.", pt: "Meu inglês está melhor que no ano passado." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "My city is ___ (quiet) than yours.", accepted: ["quieter"] },
        { type: "fill_blank", skill: "grammar", sentence: "This phone is ___ (expensive) than that one.", accepted: ["more expensive"] },
        { type: "fill_blank", skill: "grammar", sentence: "Today is ___ (hot) than yesterday.", accepted: ["hotter"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["The movie was more better than the book.", "The movie was better than the book.", "The movie was gooder than the book."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "O trânsito hoje está pior.", accepted: ["The traffic is worse today.", "Traffic is worse today.", "The traffic today is worse."] },
        { type: "word_order", skill: "grammar", prompt: "O metrô é mais rápido que o ônibus.", answer: "The subway is faster than the bus.", distractors: ["more"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "The small apartment is cheaper but noisier.", options: ["O apartamento pequeno é mais caro e silencioso.", "O apartamento pequeno é mais barato, mas mais barulhento.", "Os dois apartamentos custam igual."], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It's safer than before.", accepted: ["it's safer than before", "it is safer than before"] },
      ],
      conversation: {
        goal: "Compare sua cidade com outra que você conhece: preço, segurança, clima e trânsito.",
        starter: "Is your city bigger or smaller than São Paulo? What's better about it?",
      },
      review: ["Curtos: -er + than (bigger, easier).", "Longos: more + adjetivo + than.", "good → better; bad → worse."],
    }),

    buildLesson("a2-m3-l2", M, 2, {
      title: "Superlativos",
      objective: "Dizer o melhor, o pior, o maior com the -est e the most.",
      explanation: [
        {
          title: "O mais...",
          body: "Curtos: **the + -est**: the cheapest, the biggest, the easiest. Longos: **the most** + adjetivo: the most beautiful, the most expensive. Irregulares: **the best**, **the worst**.",
          table: {
            head: ["Adjetivo", "Comparativo", "Superlativo"],
            rows: [
              ["tall", "taller", "the tallest"],
              ["happy", "happier", "the happiest"],
              ["popular", "more popular", "the most popular"],
              ["good", "better", "the best"],
              ["bad", "worse", "the worst"],
            ],
          },
        },
        {
          title: "Com in e of / com present perfect",
          body: "**the tallest building in the world** (in + lugar). **the best day of my life**. Muito comum: **the best movie I've ever seen** (o melhor filme que já vi).",
        },
      ],
      vocabulary: [
        { en: "the best", pt: "o melhor", say: "dhe BÉST" },
        { en: "the worst", pt: "o pior", say: "dhe UÂRST" },
        { en: "tall", pt: "alto", say: "TÓL" },
        { en: "beautiful", pt: "bonito / lindo", say: "BIÚ-ti-ful" },
        { en: "popular", pt: "popular", say: "PÓ-piu-lar" },
        { en: "crowded", pt: "lotado", say: "CRÁU-did" },
        { en: "building", pt: "prédio", say: "BÍL-ding" },
        { en: "in the world", pt: "no mundo", say: "in dhe UÂRLD" },
        { en: "ever", pt: "já (na vida)", say: "É-ver" },
      ],
      examples: [
        { en: "This is the best pizza in town.", pt: "Esta é a melhor pizza da cidade." },
        { en: "December is the most crowded month.", pt: "Dezembro é o mês mais lotado." },
        { en: "It was the worst trip I've ever had.", pt: "Foi a pior viagem que já fiz." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "Mount Everest is the ___ (high) mountain in the world.", accepted: ["highest"] },
        { type: "fill_blank", skill: "grammar", sentence: "This is the ___ (interesting) book I've ever read.", accepted: ["most interesting"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Foi o pior dia da minha vida.\"", options: ["It was the worse day of my life.", "It was the worst day of my life.", "It was the most bad day of my life."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Qual é o restaurante mais barato aqui?", accepted: ["What's the cheapest restaurant here?", "What is the cheapest restaurant here?", "Which is the cheapest restaurant here?"] },
        { type: "word_order", skill: "grammar", prompt: "Ela é a pessoa mais engraçada da família.", answer: "She is the funniest person in the family.", distractors: ["most"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue os pares.", pairs: [["good", "the best"], ["bad", "the worst"], ["big", "the biggest"], ["easy", "the easiest"]] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "It's the most popular beach in the city.", options: ["É a praia mais popular da cidade.", "É a praia mais bonita do país.", "É uma praia pouco conhecida."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "That was the best day ever.", accepted: ["that was the best day ever"] },
      ],
      conversation: {
        goal: "Fale dos recordes da sua vida: a melhor viagem, a pior comida, o lugar mais bonito que você já visitou.",
        starter: "What's the most beautiful place you've ever been to?",
      },
      review: ["the + -est (curtos) / the most (longos).", "the best / the worst.", "the best ... I've ever ..."],
    }),

    buildLesson("a2-m3-l3", M, 3, {
      title: "Tão... quanto",
      objective: "Comparar com nuance usando as...as e not as...as.",
      explanation: [
        {
          title: "Igualdade",
          body: "**as + adjetivo + as** = tão... quanto: **My brother is as tall as me.** (Meu irmão é tão alto quanto eu.)",
        },
        {
          title: "Negativa: menos",
          body: "**not as + adjetivo + as** = não tão... quanto (= menos): **The test wasn't as hard as I thought.** (A prova não foi tão difícil quanto eu pensava.) Soa mais gentil que dizer \"pior\".",
        },
        {
          title: "Quase e muito",
          body: "Para dar nuance ao comparativo: **a bit cheaper** (um pouco mais barato), **much bigger** / **a lot bigger** (muito maior), **almost as good as** (quase tão bom quanto).",
        },
      ],
      vocabulary: [
        { en: "as ... as", pt: "tão ... quanto", say: "éz ... éz" },
        { en: "not as ... as", pt: "não tão ... quanto", say: "NÓT éz ... éz" },
        { en: "a bit", pt: "um pouco", say: "a BÍT" },
        { en: "much / a lot", pt: "muito (com comparativo)", say: "MÂTCH / a LÓT" },
        { en: "almost", pt: "quase", say: "ÓL-moust" },
        { en: "hard", pt: "difícil / duro", say: "RÁRD" },
        { en: "spicy", pt: "apimentado", say: "SPÁI-si" },
        { en: "similar", pt: "parecido", say: "SÍ-mi-lar" },
        { en: "different from", pt: "diferente de", say: "DÍ-frent from" },
      ],
      examples: [
        { en: "The sequel isn't as good as the first movie.", pt: "A continuação não é tão boa quanto o primeiro filme." },
        { en: "She's almost as tall as her father.", pt: "Ela é quase tão alta quanto o pai." },
        { en: "This one is a bit cheaper.", pt: "Este é um pouco mais barato." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "Rio isn't as big ___ São Paulo.", accepted: ["as"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"A comida não estava tão apimentada quanto eu esperava.\"", options: ["The food wasn't as spicy as I expected.", "The food wasn't so spicy than I expected.", "The food was less spicy as I expected."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Meu carro é tão velho quanto o seu.", accepted: ["My car is as old as yours.", "My car's as old as yours."] },
        { type: "fill_blank", skill: "grammar", sentence: "This laptop is ___ lighter than my old one. (muito)", accepted: ["much", "a lot"] },
        { type: "word_order", skill: "grammar", prompt: "O inglês não é tão difícil quanto parece.", answer: "English isn't as hard as it looks.", distractors: ["than"] },
        { type: "multiple_choice", skill: "reading", prompt: "\"Tom is not as fast as Ana.\" Quem é mais rápido?", options: ["Tom", "Ana", "Os dois são iguais"], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "The new version is almost as good as the original.", options: ["A nova versão é muito pior.", "A nova versão é quase tão boa quanto a original.", "A nova versão é melhor que a original."], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It's a bit more expensive.", accepted: ["it's a bit more expensive", "it is a bit more expensive"] },
      ],
      conversation: {
        goal: "Compare duas pessoas ou dois lugares de forma gentil, usando as...as e not as...as.",
        starter: "Are you similar to anyone in your family? How are you different?",
      },
      review: ["as ... as: igualdade.", "not as ... as: menos (forma gentil).", "a bit / much / almost para dar nuance."],
    }),

    buildLesson("a2-m3-l4", M, 4, {
      title: "Descrevendo pessoas",
      objective: "Descrever aparência e personalidade com look like e be like.",
      explanation: [
        {
          title: "Três perguntas que confundem",
          body: "**What does she look like?** = Como ela é fisicamente? · **What is she like?** = Como ela é (personalidade)? · **What does she like?** = Do que ela gosta? Repare: like muda de sentido.",
        },
        {
          title: "Aparência",
          body: "**She's tall/short.** **He has short dark hair and brown eyes.** **He has a beard.** (barba) Cabelo: **long / short / curly / straight / blond / dark**.",
        },
        {
          title: "Personalidade",
          body: "**friendly** (simpático), **shy** (tímido), **funny** (engraçado), **hard-working** (esforçado), **lazy** (preguiçoso), **outgoing** (extrovertido). Cuidado: **nice** é simpático/legal, não \"bonito\".",
        },
      ],
      vocabulary: [
        { en: "look like", pt: "parecer (fisicamente)", say: "LÚK láik" },
        { en: "curly hair", pt: "cabelo cacheado", say: "CÂR-li RÉR" },
        { en: "straight hair", pt: "cabelo liso", say: "STRÊIT RÉR" },
        { en: "beard", pt: "barba", say: "BÍRD" },
        { en: "friendly", pt: "simpático", say: "FRÉND-li" },
        { en: "shy", pt: "tímido", say: "SHÁI" },
        { en: "outgoing", pt: "extrovertido", say: "áut-GÔU-ing" },
        { en: "hard-working", pt: "esforçado / trabalhador", say: "rard-UÊR-king" },
        { en: "lazy", pt: "preguiçoso", say: "LÊI-zi" },
        { en: "funny", pt: "engraçado", say: "FÂ-ni" },
      ],
      examples: [
        { en: "What does your brother look like? — He's tall with curly hair.", pt: "Como é seu irmão? — Alto, de cabelo cacheado." },
        { en: "What's your boss like? — She's friendly but very demanding.", pt: "Como é sua chefe? — Simpática, mas muito exigente." },
        { en: "You look like your mother.", pt: "Você se parece com a sua mãe." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Você quer saber a PERSONALIDADE de alguém:", options: ["What does he look like?", "What is he like?", "What does he like?"], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "Você quer saber a APARÊNCIA de alguém:", options: ["What does she look like?", "How is she?", "What does she like?"], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "She ___ long straight hair.", translation: "Ela tem cabelo longo e liso.", accepted: ["has"] },
        { type: "translate", skill: "writing", prompt: "Meu pai é muito trabalhador.", accepted: ["My father is very hard-working.", "My dad is very hard-working.", "My father is very hardworking.", "My dad is very hardworking."] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue os adjetivos.", pairs: [["shy", "tímido"], ["outgoing", "extrovertido"], ["lazy", "preguiçoso"], ["friendly", "simpático"]] },
        { type: "word_order", skill: "grammar", prompt: "Ele tem olhos castanhos e uma barba curta.", answer: "He has brown eyes and a short beard.", distractors: ["is"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "She's really outgoing, but her brother is quite shy.", options: ["Ela é extrovertida e o irmão é tímido.", "Os dois são tímidos.", "Ela é tímida e o irmão é extrovertido."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "What's she like?", accepted: ["what's she like", "what is she like"] },
      ],
      conversation: {
        goal: "Descreva a aparência e a personalidade de alguém importante para você.",
        starter: "Tell me about your best friend. What does he or she look like? And what's he or she like?",
      },
      review: ["look like = aparência; be like = personalidade; like = gostar.", "has + cabelo/olhos/barba.", "nice = simpático, não 'bonito'."],
    }),

    buildLesson("a2-m3-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Comparando",
      objective: "Comprovar que você compara coisas e descreve pessoas.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "Trains are ___ (fast) than buses.", accepted: ["faster"] },
        { type: "fill_blank", skill: "grammar", sentence: "It's the ___ (good) coffee in town.", accepted: ["best"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["She is more taller than me.", "She is taller than me.", "She is tall than me."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Este é o filme mais engraçado que eu já vi.", accepted: ["This is the funniest movie I've ever seen.", "This is the funniest film I've ever seen.", "This is the funniest movie I have ever seen."] },
        { type: "fill_blank", skill: "grammar", sentence: "The exam wasn't as difficult ___ I expected.", accepted: ["as"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"What's your teacher like?\" Resposta adequada:", options: ["She likes pizza.", "She's patient and funny.", "She looks like her sister."], answer: 1 },
        { type: "word_order", skill: "grammar", prompt: "Meu apartamento é muito menor que o seu.", answer: "My apartment is much smaller than yours." },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "He has short dark hair and he wears glasses.", options: ["Ele tem cabelo curto e escuro e usa óculos.", "Ele tem cabelo longo e loiro.", "Ele não usa óculos."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It was the worst day of my life.", accepted: ["it was the worst day of my life"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue os opostos.", pairs: [["cheap", "expensive"], ["quiet", "noisy"], ["safe", "dangerous"], ["shy", "outgoing"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
