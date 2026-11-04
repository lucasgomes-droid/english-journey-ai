import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "c1-m8";

export const c1Module8: Module = {
  id: M,
  level: "C1",
  order: 8,
  title: "Estilo pessoal",
  description: "Ênfase avançada, coesão, tom e revisão dos erros típicos de brasileiros.",
  lessons: [
    buildLesson("c1-m8-l1", M, 1, {
      title: "Ênfase avançada",
      objective: "Dar ritmo ao texto com fronting, cleft e auxiliar enfático.",
      explanation: [
        {
          title: "Fronting (antecipar)",
          body: "Mover um elemento para o início dá ênfase: **This I cannot accept.** · **Strange as it may seem, I enjoyed it.** (Por estranho que pareça) · **Much as I like him, I can't agree.** (Por mais que eu goste dele)",
        },
        {
          title: "Auxiliar enfático",
          body: "**do/does/did** na afirmativa: **I do understand your concern.** (Eu entendo SIM.) · **She did call, I promise.** · Muito útil para contrastar ou tranquilizar.",
        },
        {
          title: "Cleft avançado",
          body: "**The last thing I want is to offend anyone.** · **What really matters is that...** · **It is precisely this that worries me.**",
        },
      ],
      vocabulary: [
        { en: "strange as it may seem", pt: "por estranho que pareça", say: "STRÊINDJ éz it mêi SÍIM" },
        { en: "much as", pt: "por mais que", say: "MÂTCH éz" },
        { en: "I do understand", pt: "eu entendo sim", say: "ái DÚ ân-der-STÉND" },
        { en: "the last thing", pt: "a última coisa", say: "dhe LÉST THÍNG" },
        { en: "precisely", pt: "precisamente", say: "pri-SÁIS-li" },
        { en: "fronting", pt: "antecipação (ênfase)", say: "FRÂN-ting" },
        { en: "rhythm", pt: "ritmo", say: "RÍ-dhom" },
        { en: "reassure", pt: "tranquilizar", say: "ri-a-SHÚR" },
      ],
      examples: [
        { en: "Much as I'd like to help, I simply don't have time.", pt: "Por mais que eu queira ajudar, simplesmente não tenho tempo." },
        { en: "I do appreciate your patience.", pt: "Eu realmente agradeço a sua paciência." },
        { en: "The last thing we need is another delay.", pt: "A última coisa de que precisamos é outro atraso." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "Strange ___ it may seem, I prefer winter.", accepted: ["as"] },
        { type: "fill_blank", skill: "grammar", sentence: "___ as I love my job, I need a break. (por mais que)", accepted: ["Much"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Ênfase: \"Eu entendo SIM o problema.\"", options: ["I do understand the problem.", "I am understand the problem.", "I understanding the problem."], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "She ___ send the email. I saw it. (enfático, passado)", accepted: ["did"] },
        { type: "translate", skill: "writing", prompt: "A última coisa que eu quero é brigar.", accepted: ["The last thing I want is to fight.", "The last thing I want is to argue.", "The last thing I want is a fight."] },
        { type: "word_order", skill: "grammar", prompt: "Isso eu não posso aceitar.", answer: "This I cannot accept.", distractors: ["do"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I do see your point, but the timing is wrong.", options: ["Ele entende de verdade o ponto, mas o momento é errado.", "Ele não entende o ponto.", "Ele concorda totalmente."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It is precisely this that worries me.", accepted: ["it is precisely this that worries me", "it's precisely this that worries me"] },
      ],
      conversation: {
        goal: "Responda a críticas do professor tranquilizando e contrastando com auxiliar enfático e fronting.",
        starter: "Honestly, I don't think you care about this project at all.",
      },
      review: ["Fronting: Strange as it may seem / Much as I...", "Auxiliar enfático: I do understand / She did call.", "The last thing / precisely this."],
    }),

    buildLesson("c1-m8-l2", M, 2, {
      title: "Coesão",
      objective: "Escrever com fluidez usando referência e substituição.",
      explanation: [
        {
          title: "Referência",
          body: "Retome ideias sem repetir: **this approach, such a decision, the former/the latter, these, those, it, they**. Encapsular: **The government cut funding. This decision sparked protests.** (this decision resume a frase anterior).",
        },
        {
          title: "Variar o léxico",
          body: "Use sinônimos e hiperônimos: **smartphones → these devices → such technology**. Evita repetição e conecta frases.",
        },
        {
          title: "Fluxo de informação",
          body: "Comece frases com informação já conhecida e termine com a nova (**given → new**): **The study included 500 teachers. These teachers reported high stress levels.**",
        },
      ],
      vocabulary: [
        { en: "cohesion", pt: "coesão", say: "co-RÍI-jan" },
        { en: "such", pt: "tal", say: "SÂTCH" },
        { en: "spark", pt: "provocar / desencadear", say: "SPÁRK" },
        { en: "device", pt: "aparelho / dispositivo", say: "di-VÁIS" },
        { en: "approach", pt: "abordagem", say: "a-PRÔUTCH" },
        { en: "the former", pt: "o primeiro (de dois)", say: "dhe FÓR-mer" },
        { en: "repetition", pt: "repetição", say: "re-pe-TÍ-shan" },
        { en: "flow", pt: "fluxo / fluidez", say: "FLÔU" },
      ],
      examples: [
        { en: "The company froze hiring. This decision surprised investors.", pt: "A empresa congelou contratações. Essa decisão surpreendeu investidores." },
        { en: "Smartphones are everywhere. These devices have changed how we read.", pt: "Smartphones estão em todo lugar. Esses aparelhos mudaram nossa forma de ler." },
        { en: "Such an approach requires time and patience.", pt: "Tal abordagem exige tempo e paciência." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "writing", prompt: "Melhor continuação: \"Prices rose by 30%. ___ caused widespread anger.\"", options: ["Prices rose by 30%", "This increase", "It's"], answer: 1 },
        { type: "fill_blank", skill: "writing", sentence: "___ a decision cannot be taken lightly. (tal)", accepted: ["Such"] },
        { type: "multiple_choice", skill: "writing", prompt: "\"Tea and coffee contain caffeine, but ___ has less.\" (o primeiro)", options: ["the former", "the latter", "the first one of them"], answer: 0 },
        { type: "multiple_choice", skill: "writing", prompt: "Qual texto tem melhor coesão?", options: ["The app is popular. The app has 2 million users. The app is free.", "The app is popular. Free to download, it already has 2 million users."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Essa decisão provocou protestos.", accepted: ["This decision sparked protests.", "That decision sparked protests.", "This decision caused protests.", "This decision triggered protests."] },
        { type: "word_order", skill: "writing", prompt: "Essa abordagem tem duas vantagens.", answer: "This approach has two advantages.", distractors: ["such"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha a que \"this\" se refere.", audio: "The city banned cars from the center. This made the streets much quieter.", options: ["A proibição de carros no centro.", "As ruas.", "A cidade."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Such an approach takes time.", accepted: ["such an approach takes time"] },
      ],
      conversation: {
        goal: "Conte ao professor uma mudança na sua empresa ou cidade em um parágrafo falado coeso, sem repetir substantivos.",
        starter: "Tell me about a recent change at work or in your city. Try not to repeat the same nouns.",
      },
      review: ["this + substantivo resume ideias.", "Sinônimos e hiperônimos evitam repetição.", "Informação conhecida → nova."],
    }),

    buildLesson("c1-m8-l3", M, 3, {
      title: "Tom e registro",
      objective: "Ajustar polidez e franqueza conforme a situação.",
      explanation: [
        {
          title: "Escala de franqueza",
          body: "Direto → indireto: **You're wrong.** → **I don't agree.** → **I'm not sure I agree.** → **I wonder if there might be another way of looking at this.** Quanto mais hierarquia e distância, mais indireto.",
        },
        {
          title: "Suavizadores e distanciadores",
          body: "Passado para suavizar: **I was wondering if you could...** · **I wanted to ask...** · Modais: **Would it be possible...?** · **just / a little / slightly**: **Could I just ask a quick question?**",
        },
        {
          title: "Quando ser direto",
          body: "Em emergências, instruções e entre colegas próximos, franqueza é eficiência: **Stop. Don't touch that.** Excesso de polidez pode soar falso ou passivo-agressivo.",
        },
      ],
      vocabulary: [
        { en: "I was wondering if", pt: "eu queria saber se", say: "ái uóz UÂN-de-ring if" },
        { en: "blunt", pt: "direto / franco demais", say: "BLÂNT" },
        { en: "tactful", pt: "diplomático", say: "TÉKT-ful" },
        { en: "passive-aggressive", pt: "passivo-agressivo", say: "PÉ-siv a-GRÉ-siv" },
        { en: "straightforward", pt: "direto / simples", say: "strêit-FÓR-uord" },
        { en: "tone down", pt: "suavizar", say: "TÔUN DÁUN" },
        { en: "come across as", pt: "passar a impressão de", say: "câm a-CRÓS éz" },
        { en: "rapport", pt: "afinidade / conexão", say: "ra-PÓR" },
      ],
      examples: [
        { en: "I was wondering if you could send me the file by Friday.", pt: "Eu queria saber se você poderia me mandar o arquivo até sexta." },
        { en: "Your email came across as a bit blunt.", pt: "Seu e-mail passou a impressão de ser um pouco seco." },
        { en: "Could you tone it down a little in the client meeting?", pt: "Você poderia suavizar um pouco na reunião com o cliente?" },
      ],
      exercises: [
        { type: "multiple_choice", skill: "writing", prompt: "Pedido mais indireto ao diretor:", options: ["Send me the report.", "I was wondering if you could send me the report.", "Report. Now."], answer: 1 },
        { type: "fill_blank", skill: "vocabulary", sentence: "His comment came ___ as rude. (passou a impressão)", accepted: ["across"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Blunt\":", options: ["Franco demais / seco", "Diplomático", "Confuso"], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Situação de emergência. Melhor tom:", options: ["I was wondering if you might perhaps leave the building.", "Leave the building now."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Posso só fazer uma pergunta rápida?", accepted: ["Could I just ask a quick question?", "Can I just ask a quick question?"] },
        { type: "word_order", skill: "grammar", prompt: "Ela foi muito diplomática na reunião.", answer: "She was very tactful in the meeting.", distractors: ["blunt"] },
        { type: "listening", skill: "listening", prompt: "Ouça. O tom é:", audio: "I'm not entirely sure that's the best approach, but I'm happy to discuss it.", options: ["Indireto e diplomático.", "Agressivo.", "Irônico."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I was wondering if you could help.", accepted: ["i was wondering if you could help"] },
      ],
      conversation: {
        goal: "Diga a mesma coisa difícil (\"seu trabalho precisa ser refeito\") em três tons: para um amigo, um colega e um cliente importante.",
        starter: "Here's the situation: a report needs to be completely redone. Tell me how you'd say it to a friend, a colleague and a VIP client.",
      },
      review: ["Escala direto → indireto conforme hierarquia.", "I was wondering if / Would it be possible / just.", "Às vezes, direto é melhor."],
    }),

    buildLesson("c1-m8-l4", M, 4, {
      title: "Revisão de texto",
      objective: "Eliminar os erros persistentes de brasileiros.",
      explanation: [
        {
          title: "Os clássicos",
          body: "~~I have 30 years~~ → **I'm 30** · ~~It's depend~~ → **It depends** · ~~I'm agree~~ → **I agree** · ~~Make a question~~ → **Ask a question** · ~~Explain me~~ → **Explain to me** · ~~Since 3 years~~ → **for 3 years** · ~~The people is~~ → **People are** · ~~Informations / advices~~ → **information / advice** · ~~Actually~~ (atualmente) → **currently**.",
        },
        {
          title: "Falsos amigos de alto nível",
          body: "**pretend** (fingir, não pretender = intend) · **eventually** (no fim, não eventualmente) · **assist** (auxiliar; assistir = watch) · **push** (empurrar; puxar = pull) · **exquisite** (refinado, não esquisito) · **sensible** (sensato; sensível = sensitive) · **library** (biblioteca; livraria = bookstore).",
        },
      ],
      vocabulary: [
        { en: "intend", pt: "pretender", say: "in-TÉND" },
        { en: "pretend", pt: "fingir", say: "pri-TÉND" },
        { en: "currently", pt: "atualmente", say: "CÂ-rent-li" },
        { en: "sensible", pt: "sensato", say: "SÉN-si-bol" },
        { en: "sensitive", pt: "sensível", say: "SÉN-si-tiv" },
        { en: "exquisite", pt: "refinado / requintado", say: "ex-KUÍ-zit" },
        { en: "proofread", pt: "revisar (texto)", say: "PRÚUF-ríid" },
        { en: "fossilized error", pt: "erro fossilizado", say: "FÓ-si-láizd É-rer" },
      ],
      examples: [
        { en: "I intend to apply, but I won't pretend it's easy.", pt: "Pretendo me candidatar, mas não vou fingir que é fácil." },
        { en: "She's currently working on a sensitive project.", pt: "Ela atualmente trabalha num projeto sensível." },
        { en: "Always proofread before you hit send.", pt: "Sempre revise antes de clicar em enviar." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Correta:", options: ["It's depend on the price.", "It depends on the price."], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Pretendo viajar em julho.\"", options: ["I pretend to travel in July.", "I intend to travel in July."], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Ela é muito sensata.\"", options: ["She's very sensible.", "She's very sensitive."], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "Can you explain ___ me how it works?", accepted: ["to"] },
        { type: "fill_blank", skill: "grammar", sentence: "Can I ___ a question? (fazer)", accepted: ["ask"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Correta:", options: ["I need some informations.", "I need some information."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Atualmente trabalho com importação.", accepted: ["I currently work in imports.", "Currently I work in imports.", "I'm currently working in imports.", "I currently work with imports.", "I currently work in importing."] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It depends on the situation.", accepted: ["it depends on the situation"] },
      ],
      conversation: {
        goal: "Fale por 2 minutos sobre sua carreira. O professor vai caçar especificamente os erros clássicos de brasileiros e corrigir no final.",
        starter: "Tell me about your career so far and your plans. I'll be listening carefully for those classic mistakes!",
      },
      review: ["I'm 30 / It depends / I agree / ask a question / explain to me.", "for 3 years; information/advice sem plural.", "pretend × intend, actually × currently, sensible × sensitive."],
    }),

    buildLesson("c1-m8-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Estilo pessoal",
      objective: "Comprovar estilo, coesão, tom e precisão.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar a avaliação final do C1." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "Much ___ I admire her, I disagree.", accepted: ["as"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Eu ligo SIM para minha mãe todo dia.\"", options: ["I do call my mother every day.", "I am call my mother every day."], answer: 0 },
        { type: "multiple_choice", skill: "writing", prompt: "Coesão: \"Fees doubled. ___ led to complaints.\"", options: ["Fees doubled", "This rise", "It's"], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Blunt\" × \"tactful\": um e-mail diplomático é", options: ["tactful", "blunt"], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Ele fingiu estar doente.\"", options: ["He pretended to be sick.", "He intended to be sick."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Eu queria saber se você pode me ajudar.", accepted: ["I was wondering if you could help me.", "I was wondering if you can help me."] },
        { type: "word_order", skill: "grammar", prompt: "Por estranho que pareça, eu gostei.", answer: "Strange as it may seem, I liked it." },
        { type: "fill_blank", skill: "grammar", sentence: "I've lived here ___ ten years.", accepted: ["for"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Your message came across as a bit blunt.", options: ["Sua mensagem pareceu um pouco seca.", "Sua mensagem foi muito gentil.", "Sua mensagem não chegou."], answer: 0 },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["currently", "atualmente"], ["sensible", "sensato"], ["proofread", "revisar"], ["such", "tal"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
