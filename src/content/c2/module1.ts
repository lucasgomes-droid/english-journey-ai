import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "c2-m1";

export const c2Module1: Module = {
  id: M,
  level: "C2",
  order: 1,
  title: "Domínio gramatical",
  description: "Estruturas raras, modalidade sutil, gramática da fala e pontuação com ritmo.",
  lessons: [
    buildLesson("c2-m1-l1", M, 1, {
      title: "Estruturas raras",
      objective: "Usar estruturas literárias e formais com naturalidade.",
      explanation: [
        {
          title: "Condicionais literárias",
          body: "**Were it not for** your help, I would have failed. (Não fosse pela sua ajuda...) · **Had it not been for** the rain, we'd have won. · **But for** his warning, we'd be lost. (Não fosse o aviso dele...)",
        },
        {
          title: "Concessões elegantes",
          body: "**Be that as it may,...** (Seja como for) · **Come what may,...** (Aconteça o que acontecer) · **Try as I might, I couldn't...** (Por mais que eu tentasse) · **However hard it may be,...**",
        },
        {
          title: "Subjuntivo cristalizado",
          body: "**So be it.** (Que assim seja) · **Suffice it to say...** (Basta dizer que) · **Far be it from me to...** (Longe de mim...) · **If need be,...** (Se for preciso)",
        },
      ],
      vocabulary: [
        { en: "were it not for", pt: "não fosse por", say: "uér it NÓT for" },
        { en: "but for", pt: "não fosse", say: "BÂT for" },
        { en: "be that as it may", pt: "seja como for", say: "BÍ dhét éz it MÊI" },
        { en: "come what may", pt: "aconteça o que acontecer", say: "CÂM uót MÊI" },
        { en: "try as I might", pt: "por mais que eu tentasse", say: "TRÁI éz ái MÁIT" },
        { en: "suffice it to say", pt: "basta dizer que", say: "sa-FÁIS it tu SÊI" },
        { en: "far be it from me", pt: "longe de mim", say: "FÁR bi it from MÍ" },
        { en: "if need be", pt: "se for preciso", say: "if NÍID bi" },
      ],
      examples: [
        { en: "Were it not for her support, the project would never have survived.", pt: "Não fosse pelo apoio dela, o projeto jamais teria sobrevivido." },
        { en: "Try as I might, I couldn't convince him.", pt: "Por mais que eu tentasse, não consegui convencê-lo." },
        { en: "Suffice it to say, the meeting did not go well.", pt: "Basta dizer que a reunião não foi bem." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "___ it not for the map, we would be lost.", accepted: ["Were"] },
        { type: "fill_blank", skill: "grammar", sentence: "Try as I ___, I couldn't open the door.", accepted: ["might"] },
        { type: "fill_blank", skill: "grammar", sentence: "Suffice it to ___, he wasn't pleased.", accepted: ["say"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Seja como for, temos que continuar.\"", options: ["Be that as it may, we must continue.", "Be it as may, we must continue.", "As it may be that, we must continue."], answer: 0 },
        { type: "multiple_choice", skill: "grammar", prompt: "\"But for his advice...\" significa:", options: ["Não fosse o conselho dele...", "Mas pelo conselho dele...", "Só pelo conselho dele..."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Longe de mim criticar, mas...", accepted: ["Far be it from me to criticize, but...", "Far be it from me to criticize, but..."] },
        { type: "word_order", skill: "grammar", prompt: "Vamos terminar, aconteça o que acontecer.", answer: "Come what may, we will finish.", distractors: ["happen"] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Be that as it may, we must act.", accepted: ["be that as it may we must act"] },
      ],
      conversation: {
        goal: "Faça um discurso curto e solene (posse, homenagem, despedida) usando quatro estruturas raras.",
        starter: "You've been asked to give a short farewell speech for a retiring colleague who helped you enormously. Begin.",
      },
      review: ["Were it not for / Had it not been for / But for.", "Be that as it may / Come what may / Try as I might.", "Suffice it to say / Far be it from me / If need be."],
    }),

    buildLesson("c2-m1-l2", M, 2, {
      title: "Modalidade sutil",
      objective: "Expressar matizes finos de certeza, desejo e avaliação.",
      explanation: [
        {
          title: "Avaliação de situações",
          body: "**It's as well that...** (Ainda bem que) · **It's just as well we left early.** · **You may as well...** (Você bem que poderia / não custa nada) · **I might have known!** (Eu devia ter imaginado!)",
        },
        {
          title: "Desejo e dever arcaicos/elevados",
          body: "**Would that I could stay longer.** (Quem dera eu pudesse ficar mais) · **You would do well to listen.** (Seria sensato você ouvir) · **I dare say...** (Ouso dizer / imagino) · **How dare you!**",
        },
        {
          title: "Especulação refinada",
          body: "**It's not inconceivable that...** (Não é impossível que) · **There's every likelihood that...** (Há toda probabilidade) · **In all likelihood,...** (Muito provavelmente)",
        },
      ],
      vocabulary: [
        { en: "just as well", pt: "ainda bem", say: "DJÂST éz UÉL" },
        { en: "may as well", pt: "bem que poderia / tanto faz", say: "MÊI éz UÉL" },
        { en: "I might have known", pt: "eu devia ter imaginado", say: "ái MÁIT av NÔUN" },
        { en: "would that", pt: "quem dera", say: "UÚD dhét" },
        { en: "would do well to", pt: "seria sensato", say: "uud DÚ UÉL tu" },
        { en: "I dare say", pt: "ouso dizer / imagino", say: "ái DÉR SÊI" },
        { en: "not inconceivable", pt: "não impossível", say: "nót in-con-SÍI-va-bol" },
        { en: "in all likelihood", pt: "muito provavelmente", say: "in ÓL LÁIK-li-hud" },
      ],
      examples: [
        { en: "It's just as well you brought a coat. It's freezing.", pt: "Ainda bem que você trouxe casaco. Está congelando." },
        { en: "We've missed the bus, so we may as well walk.", pt: "Perdemos o ônibus, então bem que podemos ir a pé." },
        { en: "You would do well to read the contract carefully.", pt: "Seria sensato você ler o contrato com atenção." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "It's just as ___ we booked in advance.", accepted: ["well"] },
        { type: "fill_blank", skill: "grammar", sentence: "Nothing's on TV. We may as ___ go to bed.", accepted: ["well"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Ele atrasou de novo. Você diz:", options: ["I might have known!", "I may known!", "I would know!"], answer: 0 },
        { type: "multiple_choice", skill: "grammar", prompt: "\"You would do well to apologize.\" significa:", options: ["Seria sensato você pedir desculpas.", "Você se desculpou bem.", "Você não precisa se desculpar."], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "In all ___, the meeting will be postponed. (muito provavelmente)", accepted: ["likelihood", "probability"] },
        { type: "translate", skill: "writing", prompt: "Não é impossível que ele volte.", accepted: ["It's not inconceivable that he'll come back.", "It is not inconceivable that he will come back.", "It's not inconceivable that he will return.", "It's not impossible that he'll come back."] },
        { type: "word_order", skill: "grammar", prompt: "Quem dera eu pudesse ajudar.", answer: "Would that I could help.", distractors: ["wish"] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I dare say you're right.", accepted: ["i dare say you're right", "i dare say you are right"] },
      ],
      conversation: {
        goal: "Comente situações do cotidiano com modalidade sutil (just as well, may as well, I might have known, would do well to).",
        starter: "The train's been canceled, it's starting to rain, and the café across the road is closing. Comment on the situation.",
      },
      review: ["It's just as well / may as well / I might have known.", "Would that / would do well to / I dare say.", "In all likelihood / not inconceivable."],
    }),

    buildLesson("c2-m1-l3", M, 3, {
      title: "Gramática da fala",
      objective: "Falar como um nativo culto: elipse, heads e tails.",
      explanation: [
        {
          title: "Elipse conversacional",
          body: "Nativos omitem sujeito e auxiliar: **(Have you) Seen Tom?** · **(I) Told you so.** · **(It) Sounds good.** · **(Are you) Coming?** · **(Do you) Want some?**",
        },
        {
          title: "Heads (cabeça)",
          body: "Anunciar o tema antes: **That new manager, she's really sharp.** · **The thing about London, it's so expensive.** Ajuda o ouvinte a acompanhar.",
        },
        {
          title: "Tails (cauda)",
          body: "Reforçar no fim: **He's a great cook, your brother.** · **It's awesome, this place.** · **She's very clever, isn't she, Ana?** Soa informal e caloroso.",
        },
      ],
      vocabulary: [
        { en: "ellipsis", pt: "elipse", say: "i-LÍP-sis" },
        { en: "Told you so", pt: "Eu te disse", say: "TÔULD iu SÔU" },
        { en: "sharp", pt: "perspicaz", say: "SHÁRP" },
        { en: "Wanna...?", pt: "A fim de...? (informal)", say: "UÓ-na" },
        { en: "Guess so", pt: "Acho que sim", say: "GUÉS SÔU" },
        { en: "Could be", pt: "Pode ser", say: "CÚD bi" },
        { en: "spoken grammar", pt: "gramática da fala", say: "SPÔU-ken GRÉ-mar" },
        { en: "Ages ago", pt: "Há séculos", say: "ÊI-djiz a-GÔU" },
      ],
      examples: [
        { en: "Seen my keys anywhere? — Nope. Tried the kitchen?", pt: "Viu minhas chaves? — Não. Tentou a cozinha?" },
        { en: "That restaurant on the corner, it's amazing.", pt: "Aquele restaurante da esquina, é incrível." },
        { en: "She's a brilliant teacher, your sister.", pt: "Ela é uma professora brilhante, sua irmã." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"Want some coffee?\" é forma reduzida de:", options: ["Do you want some coffee?", "I want some coffee.", "Want you some coffee?"], answer: 0 },
        { type: "multiple_choice", skill: "grammar", prompt: "Qual frase usa um \"tail\"?", options: ["It's beautiful, this beach.", "This beach is beautiful.", "Is this beach beautiful?"], answer: 0 },
        { type: "multiple_choice", skill: "grammar", prompt: "Qual frase usa um \"head\"?", options: ["My boss, he never listens.", "My boss never listens."], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "Told you ___! (Eu te disse!)", accepted: ["so"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Em um e-mail formal, \"Sounds good, will do\" é:", options: ["Informal demais.", "Perfeito.", "Errado gramaticalmente."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Viu o Tom? (estilo falado)", accepted: ["Seen Tom?", "Have you seen Tom?"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Gorgeous, this weather. Wanna go for a walk?", options: ["Que tempo bom. A fim de uma caminhada?", "O tempo está péssimo.", "Vamos de carro?"], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Could be.", accepted: ["could be"] },
      ],
      conversation: {
        goal: "Converse informalmente com o professor como velhos amigos, usando elipse, heads e tails de forma natural.",
        starter: "Hey! Long time no see. Been busy? That new job of yours, how's it going?",
      },
      review: ["Elipse: (Have you) Seen...? / (It) Sounds good.", "Head: That restaurant, it's...", "Tail: It's awesome, this place."],
    }),

    buildLesson("c2-m1-l4", M, 4, {
      title: "Pontuação e ritmo",
      objective: "Controlar o ritmo do texto com ponto e vírgula, dois-pontos e travessão.",
      explanation: [
        {
          title: "Ponto e vírgula (;)",
          body: "Liga duas frases completas muito relacionadas: **The plan was bold; the execution, sadly, was not.** Também separa itens longos de uma lista que já têm vírgulas.",
        },
        {
          title: "Dois-pontos (:) e travessão (—)",
          body: "Dois-pontos anunciam explicação ou lista: **There was only one problem: money.** Travessão dá ênfase ou interrupção: **She had everything — talent, money, luck — except time.** No inglês, a vírgula NÃO separa duas frases completas (~~It was late, we went home~~ → It was late, **so** we went home / It was late; we went home).",
        },
        {
          title: "Vírgula de Oxford",
          body: "Vírgula antes do último item: **red, white, and blue**. Opcional, mas evita ambiguidade. Escolha um padrão e seja consistente.",
        },
      ],
      vocabulary: [
        { en: "semicolon", pt: "ponto e vírgula", say: "sé-mi-CÔU-lon" },
        { en: "colon", pt: "dois-pontos", say: "CÔU-lon" },
        { en: "dash", pt: "travessão", say: "DÉSH" },
        { en: "comma splice", pt: "vírgula unindo frases (erro)", say: "CÓ-ma SPLÁIS" },
        { en: "Oxford comma", pt: "vírgula antes do 'and'", say: "ÓKS-ford CÓ-ma" },
        { en: "full stop / period", pt: "ponto final", say: "FÚL STÓP / PÍ-ri-od" },
        { en: "parenthesis", pt: "parêntese", say: "pa-RÉN-the-sis" },
        { en: "rhythm", pt: "ritmo", say: "RÍ-dhom" },
      ],
      examples: [
        { en: "The idea was brilliant; the timing was terrible.", pt: "A ideia era brilhante; o momento, terrível." },
        { en: "There was only one thing missing: trust.", pt: "Só faltava uma coisa: confiança." },
        { en: "He had one goal — and only one — to win.", pt: "Ele tinha um objetivo — e só um — vencer." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "writing", prompt: "Qual está correta?", options: ["It was raining, we stayed home.", "It was raining; we stayed home."], answer: 1, explain: "Vírgula sozinha não une duas frases completas (comma splice)." },
        { type: "multiple_choice", skill: "writing", prompt: "Melhor pontuação para anunciar uma explicação:", options: ["There was one problem, money.", "There was one problem: money."], answer: 1 },
        { type: "multiple_choice", skill: "writing", prompt: "\"Comma splice\" é:", options: ["Unir duas frases completas só com vírgula (erro).", "Usar vírgula antes de 'and'.", "Usar travessão."], answer: 0 },
        { type: "fill_blank", skill: "writing", sentence: "It was late, ___ we went home. (conjunção para corrigir a vírgula)", accepted: ["so"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Semicolon\" é:", options: ["Ponto e vírgula", "Dois-pontos", "Travessão"], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Só faltava uma coisa: tempo.", accepted: ["Only one thing was missing: time.", "There was only one thing missing: time.", "Just one thing was missing: time."] },
        { type: "listening", skill: "listening", prompt: "Ouça. Onde caberia um travessão?", audio: "She had everything, talent, money, luck, except time.", options: ["Antes e depois de 'talent, money, luck'.", "Depois de 'time'.", "Em nenhum lugar."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu (sem pontuação).", audio: "The plan was bold.", accepted: ["the plan was bold"] },
      ],
      conversation: {
        goal: "Dite ao professor um parágrafo sobre você e decidam juntos onde usar ponto e vírgula, dois-pontos e travessão para dar ritmo.",
        starter: "Dictate a short paragraph about a turning point in your life. Then we'll punctuate it for maximum impact.",
      },
      review: [";  une frases completas relacionadas.", ":  anuncia explicação ou lista; — dá ênfase.", "Evite comma splice."],
    }),

    buildLesson("c2-m1-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Domínio gramatical",
      objective: "Comprovar domínio de estruturas de nível de proficiência.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "___ it not been for you, I'd have quit.", accepted: ["Had"] },
        { type: "fill_blank", skill: "grammar", sentence: "Be that as it ___, we need a decision today.", accepted: ["may"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Ainda bem que trouxemos água.\"", options: ["It's just as well we brought water.", "It's as good we brought water."], answer: 0 },
        { type: "multiple_choice", skill: "grammar", prompt: "Correta:", options: ["It was late, we left.", "It was late; we left."], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "\"Tail\":", options: ["He's very funny, your dad.", "Your dad is very funny."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Basta dizer que foi um desastre.", accepted: ["Suffice it to say it was a disaster.", "Suffice it to say that it was a disaster.", "Suffice to say it was a disaster."] },
        { type: "word_order", skill: "grammar", prompt: "Por mais que eu tentasse, não consegui dormir.", answer: "Try as I might, I couldn't sleep." },
        { type: "fill_blank", skill: "grammar", sentence: "We missed the movie, so we may as ___ have dinner.", accepted: ["well"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Were it not for the delay, we would have arrived on time.", options: ["Não fosse o atraso, teríamos chegado na hora.", "Chegamos na hora apesar do atraso.", "Não houve atraso."], answer: 0 },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["semicolon", "ponto e vírgula"], ["colon", "dois-pontos"], ["if need be", "se for preciso"], ["come what may", "aconteça o que acontecer"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
