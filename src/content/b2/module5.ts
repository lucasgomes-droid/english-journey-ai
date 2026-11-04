import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "b2-m5";

export const b2Module5: Module = {
  id: M,
  level: "B2",
  order: 5,
  title: "Vocabulário em profundidade",
  description: "Collocations, phrasal verbs avançados, formação de palavras e expressões idiomáticas.",
  lessons: [
    buildLesson("b2-m5-l1", M, 1, {
      title: "Collocations",
      objective: "Combinar palavras como um nativo: make/do, strong/heavy e outras.",
      explanation: [
        {
          title: "O que são",
          body: "Combinações que \"soam certas\" para nativos. Não há lógica rígida: aprende-se em blocos. **make a decision** (não ~~do a decision~~), **heavy traffic** (não ~~strong traffic~~), **strong coffee** (não ~~heavy coffee~~).",
        },
        {
          title: "Make × do",
          body: "**make** = criar, produzir: make a mistake, make money, make progress, make an effort, make a complaint. **do** = tarefas, atividades: do homework, do business, do research, do someone a favor, do your best.",
          table: {
            head: ["make", "do"],
            rows: [
              ["a decision", "research"],
              ["a mistake", "business"],
              ["progress", "your best"],
              ["an effort", "a favor"],
              ["money", "the dishes"],
            ],
          },
        },
        {
          title: "Adjetivo + substantivo",
          body: "**heavy rain / heavy traffic** · **strong wind / strong accent** · **high price / low salary** · **deep sleep** · **bitter disappointment** · **a quick shower**.",
        },
      ],
      vocabulary: [
        { en: "make progress", pt: "progredir", say: "mêik PRÓ-gres" },
        { en: "make an effort", pt: "esforçar-se", say: "mêik an É-fert" },
        { en: "do research", pt: "pesquisar", say: "du ri-SÂRTCH" },
        { en: "heavy traffic", pt: "trânsito pesado", say: "RÉ-vi TRÉ-fik" },
        { en: "strong accent", pt: "sotaque forte", say: "STRÓNG ÉK-sent" },
        { en: "take a risk", pt: "correr um risco", say: "têik a RÍSK" },
        { en: "pay attention", pt: "prestar atenção", say: "pêi a-TÉN-shan" },
        { en: "meet a deadline", pt: "cumprir um prazo", say: "MÍIT a DÉD-láin" },
        { en: "raise a question", pt: "levantar uma questão", say: "RÊIZ a KUÉS-tchan" },
        { en: "break the news", pt: "dar a notícia (ruim)", say: "BRÊIK dhe NÚUZ" },
      ],
      examples: [
        { en: "You're making great progress with your English.", pt: "Você está progredindo muito no inglês." },
        { en: "We worked all weekend to meet the deadline.", pt: "Trabalhamos o fim de semana todo para cumprir o prazo." },
        { en: "Who's going to break the news to the team?", pt: "Quem vai dar a notícia para a equipe?" },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Tomar uma decisão\"", options: ["do a decision", "make a decision", "take a decision on"], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Trânsito pesado\"", options: ["strong traffic", "heavy traffic", "big traffic"], answer: 1 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Can you ___ me a favor?", accepted: ["do"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Everyone ___ mistakes. It's normal.", accepted: ["makes"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "We need to ___ the deadline. (cumprir)", accepted: ["meet"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue as collocations.", pairs: [["take", "a risk"], ["pay", "attention"], ["raise", "a question"], ["do", "research"]] },
        { type: "translate", skill: "writing", prompt: "Ela tem um sotaque forte.", accepted: ["She has a strong accent.", "She's got a strong accent."] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "We made a lot of progress.", accepted: ["we made a lot of progress"] },
      ],
      conversation: {
        goal: "Conte ao professor sobre um projeto ou desafio usando pelo menos seis collocations (make progress, meet a deadline, take a risk...).",
        starter: "Tell me about a challenge you faced recently. What decisions did you have to make?",
      },
      review: ["make: criar/produzir; do: tarefas.", "heavy traffic, strong coffee, take a risk, meet a deadline.", "Aprenda em blocos, não palavra por palavra."],
    }),

    buildLesson("b2-m5-l2", M, 2, {
      title: "Phrasal verbs II",
      objective: "Usar phrasal verbs de três partes e de sentido figurado.",
      explanation: [
        {
          title: "Verbo + partícula + preposição",
          body: "**look forward to** (aguardar ansioso) · **come up with** (inventar, propor uma ideia) · **put up with** (tolerar) · **get away with** (escapar impune) · **run out of** (ficar sem) · **catch up with** (alcançar) · **cut down on** (reduzir) · **face up to** (encarar).",
        },
        {
          title: "Sempre inseparáveis",
          body: "Phrasal verbs de três partes não se separam: **I can't put up with the noise.** → **I can't put up with it.**",
        },
      ],
      vocabulary: [
        { en: "come up with", pt: "propor / inventar", say: "câm ÂP uidh" },
        { en: "put up with", pt: "tolerar / aguentar", say: "pút ÂP uidh" },
        { en: "get away with", pt: "escapar impune", say: "guét a-UÊI uidh" },
        { en: "run out of", pt: "ficar sem", say: "rân ÁUT ov" },
        { en: "catch up with", pt: "alcançar / colocar em dia", say: "kétch ÂP uidh" },
        { en: "face up to", pt: "encarar", say: "fêis ÂP tu" },
        { en: "look down on", pt: "menosprezar", say: "lúk DÁUN on" },
        { en: "go along with", pt: "concordar / acompanhar", say: "gou a-LÓNG uidh" },
        { en: "get round to", pt: "arranjar tempo para", say: "guét RÁUND tu" },
      ],
      examples: [
        { en: "We need to come up with a better plan.", pt: "Precisamos propor um plano melhor." },
        { en: "I don't know how you put up with that noise.", pt: "Não sei como você aguenta esse barulho." },
        { en: "We've run out of coffee again!", pt: "Ficamos sem café de novo!" },
      ],
      exercises: [
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["come up with", "propor"], ["put up with", "tolerar"], ["run out of", "ficar sem"], ["get away with", "escapar impune"]] },
        { type: "fill_blank", skill: "vocabulary", sentence: "We've run out ___ milk.", accepted: ["of"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "She came up ___ a brilliant idea.", accepted: ["with"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"He thinks he can get away with it.\"", options: ["Ele acha que vai escapar impune.", "Ele acha que vai fugir com isso.", "Ele acha que vai se livrar do objeto."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Nunca arranjo tempo para ler.", accepted: ["I never get round to reading.", "I never get around to reading."] },
        { type: "word_order", skill: "grammar", prompt: "Você precisa encarar a verdade.", answer: "You need to face up to the truth.", distractors: ["with"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I've got so much work to catch up on after the holidays.", options: ["Tem muito trabalho para colocar em dia depois das férias.", "Está de férias.", "Terminou todo o trabalho."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I can't put up with it anymore.", accepted: ["i can't put up with it anymore", "i cannot put up with it anymore", "i can't put up with it any more"] },
      ],
      conversation: {
        goal: "Fale de coisas que você tolera e não tolera, ideias que propôs e coisas que nunca arranja tempo para fazer.",
        starter: "What's something you can't put up with? And what's something you never get round to doing?",
      },
      review: ["come up with, put up with, run out of, get away with.", "catch up with/on, face up to, get round to.", "Três partes: inseparáveis."],
    }),

    buildLesson("b2-m5-l3", M, 3, {
      title: "Formação de palavras",
      objective: "Deduzir e criar palavras com prefixos e sufixos.",
      explanation: [
        {
          title: "Prefixos de sentido",
          body: "**un-/in-/im-/ir-/il-** (negação): unreliable, inefficient, impossible, irrelevant, illegal · **mis-** (errado): misunderstand · **re-** (de novo): rethink · **over-/under-** (demais/de menos): overpriced, underestimate · **pre-/post-**: pre-war, postgraduate.",
        },
        {
          title: "Sufixos que mudam a classe",
          body: "Substantivo: **-tion** (decide → decision), **-ment** (develop → development), **-ness** (happy → happiness), **-ity** (able → ability). Adjetivo: **-ful / -less** (useful, useless), **-able** (affordable), **-ive** (creative). Verbo: **-ize / -en** (modernize, widen). Advérbio: **-ly**.",
          table: {
            head: ["Verbo", "Substantivo", "Adjetivo"],
            rows: [
              ["decide", "decision", "decisive"],
              ["create", "creation / creativity", "creative"],
              ["rely", "reliability", "reliable"],
              ["succeed", "success", "successful"],
            ],
          },
        },
      ],
      vocabulary: [
        { en: "reliable", pt: "confiável", say: "ri-LÁI-a-bol" },
        { en: "unreliable", pt: "não confiável", say: "ân-ri-LÁI-a-bol" },
        { en: "misunderstand", pt: "entender errado", say: "mis-ân-der-STÉND" },
        { en: "overpriced", pt: "caro demais", say: "ou-ver-PRÁIST" },
        { en: "underestimate", pt: "subestimar", say: "ân-der-ÉS-ti-mêit" },
        { en: "affordable", pt: "acessível (preço)", say: "a-FÓR-da-bol" },
        { en: "irrelevant", pt: "irrelevante", say: "i-RÉ-le-vant" },
        { en: "widen", pt: "alargar", say: "UÁI-den" },
        { en: "awareness", pt: "consciência / conscientização", say: "a-UÉR-nes" },
      ],
      examples: [
        { en: "The service is cheap but unreliable.", pt: "O serviço é barato, mas pouco confiável." },
        { en: "Don't underestimate the competition.", pt: "Não subestime a concorrência." },
        { en: "The campaign aims to raise awareness about recycling.", pt: "A campanha quer aumentar a conscientização sobre reciclagem." },
      ],
      exercises: [
        { type: "fill_blank", skill: "vocabulary", sentence: "It's a very ___ car. It never breaks down. (rely)", accepted: ["reliable"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Her ___ surprised everyone. (succeed)", translation: "O sucesso dela surpreendeu a todos.", accepted: ["success"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "That restaurant is ___. $50 for a sandwich! (caro demais)", accepted: ["overpriced"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Negativo de \"legal\":", options: ["unlegal", "illegal", "inlegal"], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Substantivo de \"develop\":", options: ["developness", "development", "develoption"], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Acho que você me entendeu errado.", accepted: ["I think you misunderstood me.", "I think you've misunderstood me."] },
        { type: "word_order", skill: "grammar", prompt: "Os preços precisam ser mais acessíveis.", answer: "Prices need to be more affordable.", distractors: ["accessible"] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It's completely irrelevant.", accepted: ["it's completely irrelevant", "it is completely irrelevant"] },
      ],
      conversation: {
        goal: "Descreva produtos e serviços que você usa com adjetivos formados por prefixos e sufixos (reliable, overpriced, user-friendly...).",
        starter: "Tell me about a product or service you'd never recommend. What's wrong with it?",
      },
      review: ["Prefixos: un-, in-, im-, ir-, il-, mis-, re-, over-, under-.", "Sufixos: -tion, -ment, -ness, -ity, -ful, -less, -able.", "Use para deduzir palavras novas."],
    }),

    buildLesson("b2-m5-l4", M, 4, {
      title: "Expressões idiomáticas I",
      objective: "Entender e usar idioms frequentes no dia a dia.",
      explanation: [
        {
          title: "Idioms mais úteis",
          body: "**a piece of cake** (moleza) · **break the ice** (quebrar o gelo) · **hit the nail on the head** (acertar em cheio) · **once in a blue moon** (muito raramente) · **cost an arm and a leg** (custar os olhos da cara) · **under the weather** (meio doente) · **on the same page** (alinhados) · **call it a day** (encerrar o dia) · **the ball is in your court** (a decisão é sua).",
        },
        {
          title: "Como usar",
          body: "Use com moderação: um ou dois numa conversa soam naturais; dez soam forçados. E cuidado ao traduzir literalmente: **raining cats and dogs** = chovendo canivete.",
        },
      ],
      vocabulary: [
        { en: "a piece of cake", pt: "moleza", say: "a PÍIS ov KÊIK" },
        { en: "break the ice", pt: "quebrar o gelo", say: "BRÊIK dhi ÁIS" },
        { en: "hit the nail on the head", pt: "acertar em cheio", say: "RÍT dhe NÊIL on dhe RÉD" },
        { en: "once in a blue moon", pt: "muito raramente", say: "UÂNS in a BLÚ MÚUN" },
        { en: "cost an arm and a leg", pt: "custar os olhos da cara", say: "CÓST an ÁRM and a LÉG" },
        { en: "under the weather", pt: "meio doente", say: "ÂN-der dhe UÉ-dher" },
        { en: "on the same page", pt: "alinhados", say: "on dhe SÊIM PÊIDJ" },
        { en: "call it a day", pt: "encerrar o dia", say: "CÓL it a DÊI" },
        { en: "the ball is in your court", pt: "a decisão é sua", say: "dhe BÓL iz in iór CÓRT" },
      ],
      examples: [
        { en: "The exam was a piece of cake.", pt: "A prova foi moleza." },
        { en: "That phone cost an arm and a leg.", pt: "Aquele celular custou os olhos da cara." },
        { en: "We've done enough for today. Let's call it a day.", pt: "Já fizemos bastante hoje. Vamos encerrar." },
      ],
      exercises: [
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["a piece of cake", "moleza"], ["under the weather", "meio doente"], ["once in a blue moon", "muito raramente"], ["call it a day", "encerrar o dia"]] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"You hit the nail on the head.\"", options: ["Você acertou em cheio.", "Você se machucou.", "Você errou feio."], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Para garantir que todos estão alinhados:", options: ["Let's make sure we're on the same page.", "Let's break a leg.", "Let's call it a day."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "A good joke can help break the ___ at a meeting.", accepted: ["ice"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "I've made my offer. The ball is in your ___.", accepted: ["court"] },
        { type: "translate", skill: "writing", prompt: "Estou meio doente hoje.", accepted: ["I'm a bit under the weather today.", "I'm feeling under the weather today.", "I'm under the weather today.", "I am a bit under the weather today."] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I only go to the cinema once in a blue moon.", options: ["Vai ao cinema muito raramente.", "Vai toda semana.", "Vai em noites de lua cheia."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It was a piece of cake.", accepted: ["it was a piece of cake"] },
      ],
      conversation: {
        goal: "Conte ao professor uma história da sua semana usando dois ou três idioms de forma natural.",
        starter: "How was your week? Anything that cost an arm and a leg, or something that was a piece of cake?",
      },
      review: ["piece of cake, break the ice, hit the nail on the head.", "once in a blue moon, cost an arm and a leg, under the weather.", "Use com moderação."],
    }),

    buildLesson("b2-m5-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Vocabulário em profundidade",
      objective: "Comprovar que você usa collocations, phrasal verbs, formação de palavras e idioms.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Fazer uma pesquisa\"", options: ["make research", "do research", "take research"], answer: 1 },
        { type: "fill_blank", skill: "vocabulary", sentence: "We've run ___ of time.", accepted: ["out"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "The instructions were ___. Nobody understood them. (clear → oposto)", accepted: ["unclear"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"It cost an arm and a leg.\"", options: ["Custou muito caro.", "Machucou o braço.", "Foi barato."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Ela propôs uma solução.", accepted: ["She came up with a solution.", "She proposed a solution.", "She suggested a solution."] },
        { type: "word_order", skill: "grammar", prompt: "Não subestime o problema.", answer: "Don't underestimate the problem." },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Adjetivo de \"create\":", options: ["creatful", "creative", "creatable"], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I don't know how she puts up with her boss.", options: ["Não sei como ela aguenta o chefe.", "Ela é a chefe.", "Ela pediu demissão."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Let's call it a day.", accepted: ["let's call it a day", "let us call it a day"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["take", "a risk"], ["meet", "a deadline"], ["make", "an effort"], ["pay", "attention"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
