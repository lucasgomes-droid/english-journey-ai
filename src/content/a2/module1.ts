import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "a2-m1";

export const a2Module1: Module = {
  id: M,
  level: "A2",
  order: 1,
  title: "Experiências",
  description: "Contar histórias no passado, descrever cenas e falar do que você já viveu.",
  lessons: [
    buildLesson("a2-m1-l1", M, 1, {
      title: "Contando histórias",
      objective: "Narrar acontecimentos em ordem usando o passado simples e conectivos.",
      explanation: [
        {
          title: "Passado simples: revisão rápida",
          body: "Verbos regulares ganham **-ed**: work → **worked**, play → **played**, study → **studied**. Os irregulares têm forma própria: go → **went**, have → **had**, see → **saw**, get → **got**. Pergunta e negativa usam **did** + verbo na forma base: **Did you go?** / **I didn't go.**",
          table: {
            head: ["Base", "Passado", "Tradução"],
            rows: [
              ["go", "went", "ir"],
              ["see", "saw", "ver"],
              ["take", "took", "pegar / levar"],
              ["meet", "met", "conhecer / encontrar"],
              ["lose", "lost", "perder"],
              ["find", "found", "achar"],
            ],
          },
        },
        {
          title: "Conectivos para contar em ordem",
          body: "Para a história não virar uma lista solta, use: **first** (primeiro), **then** (depois), **after that** (depois disso), **later** (mais tarde), **finally** (por fim). Ex.: **First we went to the beach. Then we had lunch. After that, it started to rain.**",
        },
        {
          title: "Cuidado com o -ed",
          body: "Na pronúncia, o **-ed** quase nunca é uma sílaba: worked = /wɜrkt/, played = /pleɪd/. Só vira \"id\" depois de t e d: wanted, needed.",
        },
      ],
      vocabulary: [
        { en: "first", pt: "primeiro", say: "FÂRST" },
        { en: "then", pt: "então / depois", say: "DHÉN" },
        { en: "after that", pt: "depois disso", say: "ÉF-ter DHÉT" },
        { en: "later", pt: "mais tarde", say: "LÊI-ter" },
        { en: "finally", pt: "finalmente / por fim", say: "FÁI-na-li" },
        { en: "suddenly", pt: "de repente", say: "SÂ-dên-li" },
        { en: "lose", pt: "perder", say: "LUUZ" },
        { en: "find", pt: "achar / encontrar", say: "FÁIND" },
        { en: "happen", pt: "acontecer", say: "RÉ-pen" },
        { en: "story", pt: "história", say: "STÓ-ri" },
      ],
      examples: [
        { en: "First we went to the beach, then we had lunch.", pt: "Primeiro fomos à praia, depois almoçamos." },
        { en: "Suddenly, I lost my phone.", pt: "De repente, perdi meu celular." },
        { en: "Finally, a woman found it and called me.", pt: "Por fim, uma mulher achou e me ligou." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "Last year we ___ (go) to Chile.", translation: "No ano passado fomos para o Chile.", accepted: ["went"] },
        { type: "fill_blank", skill: "grammar", sentence: "I ___ (not / see) the message.", translation: "Eu não vi a mensagem.", accepted: ["didn't see", "did not see"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a pergunta correta.", options: ["Did you went to the party?", "Did you go to the party?", "You did go to the party?"], answer: 1, explain: "Depois de did, o verbo fica na forma base: go." },
        { type: "word_order", skill: "grammar", prompt: "Depois disso, nós pegamos um táxi.", answer: "After that, we took a taxi.", distractors: ["take"] },
        { type: "translate", skill: "writing", prompt: "De repente, começou a chover.", accepted: ["Suddenly, it started to rain.", "Suddenly it started to rain.", "Suddenly, it started raining.", "Suddenly it started raining.", "Suddenly, it began to rain."] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue o verbo ao passado.", pairs: [["meet", "met"], ["take", "took"], ["find", "found"], ["lose", "lost"]] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "First I had breakfast, then I went to work.", options: ["Primeiro trabalhei, depois tomei café.", "Primeiro tomei café, depois fui trabalhar.", "Não tomei café hoje."], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "What happened yesterday?", accepted: ["what happened yesterday"] },
      ],
      conversation: {
        goal: "Conte uma história curta de algo que aconteceu com você, usando first, then e after that.",
        starter: "Tell me about something funny or strange that happened to you. What happened first?",
      },
      review: ["Passado simples: -ed ou forma irregular.", "did + verbo base em perguntas e negativas.", "first, then, after that, finally para ordenar a história."],
    }),

    buildLesson("a2-m1-l2", M, 2, {
      title: "O que você estava fazendo?",
      objective: "Descrever cenas e ações em andamento no passado.",
      explanation: [
        {
          title: "Passado contínuo",
          body: "**was / were + verbo-ing** descreve algo que estava acontecendo num momento do passado: **At 8 pm I was having dinner.** (Às 20h eu estava jantando.) Use **was** com I/he/she/it e **were** com you/we/they.",
          table: {
            head: ["Afirmativa", "Negativa", "Pergunta"],
            rows: [
              ["I was working", "I wasn't working", "Was I working?"],
              ["She was sleeping", "She wasn't sleeping", "Was she sleeping?"],
              ["They were talking", "They weren't talking", "Were they talking?"],
            ],
          },
        },
        {
          title: "Quando algo interrompe",
          body: "A ação longa vai no passado contínuo; a curta, que interrompe, no passado simples: **I was walking home when it started to rain.** Com **while** (enquanto) usamos a ação longa: **While I was cooking, the phone rang.**",
        },
      ],
      vocabulary: [
        { en: "while", pt: "enquanto", say: "UÁIL" },
        { en: "when", pt: "quando", say: "UÉN" },
        { en: "ring (rang)", pt: "tocar (telefone)", say: "RÍNG / RÉNG" },
        { en: "fall (fell)", pt: "cair", say: "FÓL / FÉL" },
        { en: "break (broke)", pt: "quebrar", say: "BRÊIK / BRÔUK" },
        { en: "accident", pt: "acidente", say: "ÉK-si-dent" },
        { en: "drive", pt: "dirigir", say: "DRÁIV" },
        { en: "cross the street", pt: "atravessar a rua", say: "CRÓS dhe STRIIT" },
        { en: "noise", pt: "barulho", say: "NÓIZ" },
      ],
      examples: [
        { en: "I was driving when I saw the accident.", pt: "Eu estava dirigindo quando vi o acidente." },
        { en: "While she was sleeping, the phone rang.", pt: "Enquanto ela dormia, o telefone tocou." },
        { en: "What were you doing at ten last night?", pt: "O que você estava fazendo às dez ontem à noite?" },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "They ___ (watch) a movie when the lights went out.", translation: "Eles estavam vendo um filme quando a luz acabou.", accepted: ["were watching"] },
        { type: "fill_blank", skill: "grammar", sentence: "I ___ (cook) when you called.", accepted: ["was cooking"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Complete: \"While I ___ the street, I ___ my phone.\"", options: ["crossed / was dropping", "was crossing / dropped", "was crossing / was dropping"], answer: 1, explain: "Ação longa (estava atravessando) + ação curta que acontece no meio (deixei cair)." },
        { type: "translate", skill: "writing", prompt: "O que você estava fazendo?", accepted: ["What were you doing?"] },
        { type: "word_order", skill: "grammar", prompt: "Ela estava dormindo quando eu cheguei.", answer: "She was sleeping when I arrived.", distractors: ["were"] },
        { type: "multiple_choice", skill: "reading", prompt: "\"I was walking to work when I fell.\" O que aconteceu primeiro?", options: ["Ele caiu e depois andou.", "Ele estava andando e então caiu.", "Ele não foi trabalhar."], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "We were having dinner when the doorbell rang.", options: ["Estávamos jantando quando a campainha tocou.", "Jantamos depois que a campainha tocou.", "A campainha não tocou."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I wasn't listening.", accepted: ["i wasn't listening", "i was not listening"] },
      ],
      conversation: {
        goal: "Descreva o que você estava fazendo em momentos de ontem e conte algo que interrompeu.",
        starter: "What were you doing yesterday at 7 pm? Did anything interrupt you?",
      },
      review: ["was/were + -ing para ação em andamento no passado.", "Ação longa (contínuo) + ação curta (simples).", "while + ação longa; when + ação curta."],
    }),

    buildLesson("a2-m1-l3", M, 3, {
      title: "Você já...?",
      objective: "Falar de experiências de vida com o present perfect.",
      explanation: [
        {
          title: "Present perfect para experiências",
          body: "**have / has + particípio** fala de experiências na vida, sem dizer quando: **I have been to Argentina.** (Já estive na Argentina.) **She has never eaten sushi.** Com he/she/it usamos **has**. Na fala: I've, you've, she's.",
          table: {
            head: ["Base", "Passado", "Particípio"],
            rows: [
              ["be", "was/were", "been"],
              ["eat", "ate", "eaten"],
              ["see", "saw", "seen"],
              ["try", "tried", "tried"],
              ["fly", "flew", "flown"],
              ["ride", "rode", "ridden"],
            ],
          },
        },
        {
          title: "Ever e never",
          body: "**Have you ever...?** = Você já...? (alguma vez na vida). Resposta: **Yes, I have. / No, I haven't.** **Never** = nunca: **I've never flown.**",
        },
        {
          title: "Quando dizer QUANDO",
          body: "Se você disser o momento, volte ao passado simples: **I've been to Rio. I went there in 2019.** Nunca: ~~I have been to Rio in 2019~~.",
        },
      ],
      vocabulary: [
        { en: "ever", pt: "alguma vez / já", say: "É-ver" },
        { en: "never", pt: "nunca", say: "NÉ-ver" },
        { en: "been to", pt: "estado em / ido a", say: "BÍN tu" },
        { en: "try", pt: "experimentar / tentar", say: "TRÁI" },
        { en: "abroad", pt: "no exterior", say: "a-BRÓD" },
        { en: "fly", pt: "voar / ir de avião", say: "FLÁI" },
        { en: "ride a horse", pt: "andar a cavalo", say: "RÁID a RÓRS" },
        { en: "famous", pt: "famoso", say: "FÊI-mâs" },
        { en: "once", pt: "uma vez", say: "UÂNS" },
        { en: "twice", pt: "duas vezes", say: "TUÁIS" },
      ],
      examples: [
        { en: "Have you ever been abroad?", pt: "Você já foi para o exterior?" },
        { en: "I've tried sushi twice.", pt: "Já experimentei sushi duas vezes." },
        { en: "My dad has never flown.", pt: "Meu pai nunca andou de avião." },
      ],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "Have you ever ___ (see) snow?", translation: "Você já viu neve?", accepted: ["seen"] },
        { type: "fill_blank", skill: "grammar", sentence: "She ___ never been to Europe.", accepted: ["has"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Qual frase está correta?", options: ["I have been to Salvador in 2020.", "I went to Salvador in 2020.", "I have went to Salvador."], answer: 1, explain: "Com data (in 2020) usamos o passado simples." },
        { type: "translate", skill: "writing", prompt: "Eu nunca andei a cavalo.", accepted: ["I've never ridden a horse.", "I have never ridden a horse."] },
        { type: "translate", skill: "writing", prompt: "Você já comeu comida tailandesa?", accepted: ["Have you ever eaten Thai food?", "Have you ever had Thai food?", "Have you ever tried Thai food?"] },
        { type: "word_order", skill: "grammar", prompt: "Nós já estivemos em Londres duas vezes.", answer: "We have been to London twice.", distractors: ["went"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha a resposta certa.", audio: "Have you ever been to New York?", options: ["Yes, I have.", "Yes, I did.", "Yes, I am."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I've never tried it.", accepted: ["i've never tried it", "i have never tried it"] },
      ],
      conversation: {
        goal: "Pergunte e responda sobre experiências usando Have you ever...? e conte quando aconteceu.",
        starter: "Have you ever travelled to another country? Tell me about it.",
      },
      review: ["have/has + particípio para experiências.", "Have you ever...? Yes, I have / No, I haven't.", "Com data ou momento definido, use o passado simples."],
    }),

    buildLesson("a2-m1-l4", M, 4, {
      title: "Já e ainda não",
      objective: "Dizer o que você já fez, ainda não fez e acabou de fazer.",
      explanation: [
        {
          title: "Already, yet e just",
          body: "**already** = já (antes do esperado): **I've already finished.** **yet** = ainda (negativa) / já (pergunta), no fim da frase: **I haven't paid yet.** / **Have you paid yet?** **just** = acabei de: **She's just left.** (Ela acabou de sair.)",
          table: {
            head: ["Palavra", "Onde fica", "Exemplo"],
            rows: [
              ["already", "antes do particípio", "I've already eaten."],
              ["yet", "fim da frase (negativa/pergunta)", "Has he called yet?"],
              ["just", "antes do particípio", "We've just arrived."],
            ],
          },
        },
        {
          title: "Listas de tarefas",
          body: "É a estrutura perfeita para checklists: **I've already sent the email, but I haven't called the client yet.**",
        },
      ],
      vocabulary: [
        { en: "already", pt: "já", say: "ól-RÉ-di" },
        { en: "yet", pt: "ainda / já (pergunta)", say: "IÉT" },
        { en: "just", pt: "acabou de", say: "DJÂST" },
        { en: "finish", pt: "terminar", say: "FÍ-nish" },
        { en: "send (sent)", pt: "enviar", say: "SÉND / SÉNT" },
        { en: "pay (paid)", pt: "pagar", say: "PÊI / PÊID" },
        { en: "book", pt: "reservar", say: "BÚK" },
        { en: "pack", pt: "fazer a mala", say: "PÉK" },
        { en: "to-do list", pt: "lista de tarefas", say: "tu-DÚ list" },
      ],
      examples: [
        { en: "I've already booked the hotel.", pt: "Já reservei o hotel." },
        { en: "We haven't packed yet.", pt: "Ainda não fizemos as malas." },
        { en: "He's just sent the report.", pt: "Ele acabou de enviar o relatório." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"Você já pagou?\" (pergunta)", options: ["Have you paid yet?", "Have you yet paid?", "Did you already paid?"], answer: 0 },
        { type: "fill_blank", skill: "grammar", sentence: "I haven't finished ___.", translation: "Ainda não terminei.", accepted: ["yet"] },
        { type: "fill_blank", skill: "grammar", sentence: "They've ___ arrived. They're taking off their coats.", translation: "Eles acabaram de chegar.", accepted: ["just"] },
        { type: "translate", skill: "writing", prompt: "Eu já enviei o e-mail.", accepted: ["I've already sent the email.", "I have already sent the email.", "I've already sent the e-mail.", "I already sent the email."] },
        { type: "word_order", skill: "grammar", prompt: "Ela ainda não reservou os voos.", answer: "She hasn't booked the flights yet.", distractors: ["already"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue as palavras.", pairs: [["already", "já"], ["yet", "ainda"], ["just", "acabou de"], ["pack", "fazer a mala"]] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I've just had lunch, thanks.", options: ["Ainda não almocei.", "Acabei de almoçar.", "Vou almoçar mais tarde."], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Have you finished yet?", accepted: ["have you finished yet"] },
      ],
      conversation: {
        goal: "Fale da sua lista de tarefas da semana: o que já fez, o que ainda não fez e o que acabou de fazer.",
        starter: "What have you already done this week? Is there anything you haven't done yet?",
      },
      review: ["already: já (afirmativa).", "yet: ainda não / já? no fim da frase.", "just: acabou de."],
    }),

    buildLesson("a2-m1-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Experiências",
      objective: "Comprovar que você conta histórias e fala de experiências no passado.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "grammar", sentence: "Yesterday I ___ (meet) an old friend.", accepted: ["met"] },
        { type: "fill_blank", skill: "grammar", sentence: "We ___ (walk) in the park when it started to rain.", accepted: ["were walking"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a frase correta.", options: ["Have you ever been to Peru?", "Did you ever been to Peru?", "Have you ever went to Peru?"], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Eu ainda não terminei.", accepted: ["I haven't finished yet.", "I have not finished yet."] },
        { type: "word_order", skill: "grammar", prompt: "Primeiro nós comemos, depois fomos ao cinema.", answer: "First we ate, then we went to the cinema." },
        { type: "multiple_choice", skill: "grammar", prompt: "\"I ___ to Paris in 2018.\"", options: ["have been", "went", "have gone"], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "He has ___ left. You can still see his car.", accepted: ["just"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "What were you doing when I called?", options: ["O que você fez depois que eu liguei?", "O que você estava fazendo quando eu liguei?", "Por que você não me ligou?"], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I've never seen the sea.", accepted: ["i've never seen the sea", "i have never seen the sea"] },
        { type: "translate", skill: "writing", prompt: "Você já andou de avião?", accepted: ["Have you ever flown?", "Have you ever been on a plane?", "Have you ever travelled by plane?", "Have you ever traveled by plane?"] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
