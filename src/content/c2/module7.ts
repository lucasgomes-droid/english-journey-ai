import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "c2-m7";

export const c2Module7: Module = {
  id: M,
  level: "C2",
  order: 7,
  title: "Precisão e autoavaliação",
  description: "Erros fossilizados, prosódia, tradução natural e preparação para exames.",
  lessons: [
    buildLesson("c2-m7-l1", M, 1, {
      title: "Erros fossilizados",
      objective: "Diagnosticar e eliminar erros persistentes que ainda escapam.",
      explanation: [
        {
          title: "Os que sobrevivem até o C2",
          body: "Preposições: **depend on** (não of), **married to** (não with), **arrive in/at** (não to), **discuss something** (sem about). Artigos: **Life is short** (sem the), **the Brazilian economy**. Ordem: **I don't know what it is** (não ~~what is it~~). Contáveis: **a piece of advice**. Tempo: **I've known her for years** (não ~~I know her for years~~).",
        },
        {
          title: "Como eliminar",
          body: "Mantenha um **error log** (diário de erros) com a forma errada e a certa. Revise na repetição espaçada (o app já faz isso com as correções das conversas). Grave-se falando e escute caçando um erro específico por vez.",
        },
      ],
      vocabulary: [
        { en: "fossilized", pt: "fossilizado", say: "FÓ-si-láizd" },
        { en: "error log", pt: "diário de erros", say: "É-rer LÓG" },
        { en: "depend on", pt: "depender de", say: "di-PÉND on" },
        { en: "married to", pt: "casado com", say: "MÉ-rid tu" },
        { en: "discuss", pt: "discutir (sem about)", say: "dis-KÂS" },
        { en: "a piece of advice", pt: "um conselho", say: "a PÍIS ov ad-VÁIS" },
        { en: "self-correct", pt: "autocorrigir-se", say: "sélf-co-RÉKT" },
        { en: "slip", pt: "deslize", say: "SLÍP" },
      ],
      examples: [
        { en: "It depends on the weather.", pt: "Depende do tempo." },
        { en: "She's married to a Canadian.", pt: "Ela é casada com um canadense." },
        { en: "We discussed the proposal yesterday.", pt: "Discutimos a proposta ontem." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Correta:", options: ["It depends of you.", "It depends on you."], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "Correta:", options: ["We discussed about the plan.", "We discussed the plan."], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "Correta:", options: ["I don't know what is it.", "I don't know what it is."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "He's married ___ my cousin.", accepted: ["to"] },
        { type: "fill_blank", skill: "grammar", sentence: "We arrived ___ London at midnight.", accepted: ["in"] },
        { type: "multiple_choice", skill: "grammar", prompt: "Correta:", options: ["The life is short.", "Life is short."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Conheço ela há anos.", accepted: ["I've known her for years.", "I have known her for years."] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Can I give you a piece of advice?", accepted: ["can i give you a piece of advice"] },
      ],
      conversation: {
        goal: "Fale por 3 minutos sobre um tema livre. O professor vai listar seus erros recorrentes para montar seu error log pessoal.",
        starter: "Talk to me about anything for three minutes: your week, your plans, a strong opinion. I'll be building your personal error log.",
      },
      review: ["depend on, married to, arrive in/at, discuss (sem about).", "what it is (ordem afirmativa); Life is short (sem the).", "Error log + revisão espaçada."],
    }),

    buildLesson("c2-m7-l2", M, 2, {
      title: "Pronúncia refinada",
      objective: "Falar com prosódia natural: ênfase, entonação e ritmo.",
      explanation: [
        {
          title: "Inglês é ritmado pelo acento",
          body: "Palavras de conteúdo (substantivos, verbos, adjetivos) são fortes; palavras gramaticais (a, to, of, and, can) ficam fracas, com schwa /ə/: **I want to GO to the BEACH** soa \"ai WÓN-tə GÔU tə dhə BÍITCH\". Brasileiros tendem a pronunciar tudo com a mesma força.",
        },
        {
          title: "Ênfase contrastiva",
          body: "A palavra enfatizada muda o sentido: **I didn't say she stole it.** (outra pessoa disse) · **I didn't say SHE stole it.** (alguém roubou, não ela) · **I didn't say she STOLE it.** (talvez pegou emprestado).",
        },
        {
          title: "Entonação",
          body: "Descendente: certeza, afirmação, perguntas com wh- (**Where do you live?↘**). Ascendente: dúvida, perguntas sim/não (**Are you coming?↗**), listas incompletas. Tag questions descendentes pedem confirmação; ascendentes são perguntas reais.",
        },
      ],
      vocabulary: [
        { en: "prosody", pt: "prosódia", say: "PRÓ-so-di" },
        { en: "stress", pt: "acento / ênfase", say: "STRÉS" },
        { en: "schwa", pt: "vogal neutra /ə/", say: "SHUÁ" },
        { en: "intonation", pt: "entonação", say: "in-to-NÊI-shan" },
        { en: "weak form", pt: "forma fraca", say: "UÍIK FÓRM" },
        { en: "rising", pt: "ascendente", say: "RÁI-zing" },
        { en: "falling", pt: "descendente", say: "FÓ-ling" },
        { en: "contrastive stress", pt: "ênfase contrastiva", say: "con-TRÉS-tiv STRÉS" },
      ],
      examples: [
        { en: "I'd like a cup of tea.", pt: "Eu queria uma xícara de chá. (\"a cup ə tea\", 'of' fraco)" },
        { en: "I didn't say SHE stole it.", pt: "Eu não disse que foi ELA que roubou." },
        { en: "You're coming, aren't you?↘", pt: "Você vem, né? (pedindo confirmação)" },
      ],
      exercises: [
        { type: "multiple_choice", skill: "listening", prompt: "Em \"I want to go to the beach\", quais palavras são fortes?", options: ["want, go, beach", "I, to, the", "todas igualmente"], answer: 0 },
        { type: "multiple_choice", skill: "listening", prompt: "\"I didn't say SHE stole it\" sugere que:", options: ["Alguém roubou, mas não ela.", "Ela pegou emprestado.", "Outra pessoa disse."], answer: 0 },
        { type: "multiple_choice", skill: "listening", prompt: "Pergunta sim/não costuma ter entonação:", options: ["Ascendente.", "Descendente."], answer: 0 },
        { type: "multiple_choice", skill: "listening", prompt: "Na forma fraca, \"can\" em \"I can swim\" soa como:", options: ["/kən/ (\"kãn\" curto)", "/kæn/ (\"ken\" forte)"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "The neutral vowel /ə/ is called ___.", accepted: ["schwa"] },
        { type: "translate", skill: "writing", prompt: "A entonação muda o sentido.", accepted: ["Intonation changes the meaning.", "The intonation changes the meaning."] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha o sentido.", audio: "I didn't say she STOLE it.", options: ["Talvez ela tenha pegado emprestado.", "Outra pessoa roubou.", "Eu nunca disse nada."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I'd like a cup of tea.", accepted: ["i'd like a cup of tea", "i would like a cup of tea"] },
      ],
      conversation: {
        goal: "Leia a mesma frase com ênfases diferentes e explique ao professor como o sentido muda; depois treine as formas fracas.",
        starter: "Say this sentence three times, stressing a different word each time: 'I never said he took the money.' What changes?",
      },
      review: ["Palavras de conteúdo fortes; gramaticais fracas (schwa).", "Ênfase contrastiva muda o sentido.", "Entonação: ↘ certeza/wh-; ↗ sim/não/dúvida."],
    }),

    buildLesson("c2-m7-l3", M, 3, {
      title: "Tradução e interpretação",
      objective: "Traduzir pela ideia, com naturalidade, e não palavra por palavra.",
      explanation: [
        {
          title: "Equivalência, não literalidade",
          body: "**Deu ruim** → *It went wrong / Things went south.* · **Fica a dica** → *Just saying / Food for thought.* · **Saudade** → *I miss it / longing / nostalgia* (depende do contexto) · **Tanto faz** → *Either way is fine / I don't mind.* · **Já era** → *It's over / That ship has sailed.*",
        },
        {
          title: "Armadilhas",
          body: "Estrutura: **Faz 2 anos que moro aqui** → *I've lived here for two years.* · **Tem um carro na garagem** → *There's a car in the garage* (não ~~It has a car~~) · **Ela é muito simpática** → *She's very nice/friendly* (não ~~sympathetic~~ = solidária).",
        },
      ],
      vocabulary: [
        { en: "equivalence", pt: "equivalência", say: "i-KUÍ-va-lens" },
        { en: "literal", pt: "literal", say: "LÍ-te-ral" },
        { en: "go south", pt: "dar errado", say: "gou SÁUTH" },
        { en: "that ship has sailed", pt: "já era / passou a oportunidade", say: "dhét SHÍP haz SÊILD" },
        { en: "longing", pt: "anseio / saudade", say: "LÓN-ging" },
        { en: "either way", pt: "tanto faz / de qualquer forma", say: "ÍI-dher UÊI" },
        { en: "sympathetic", pt: "solidário / compreensivo", say: "sim-pa-THÉ-tik" },
        { en: "render", pt: "traduzir / verter", say: "RÉN-der" },
      ],
      examples: [
        { en: "The meeting went south when the CEO arrived.", pt: "A reunião deu ruim quando o CEO chegou." },
        { en: "Pizza or sushi? Either way is fine with me.", pt: "Pizza ou sushi? Tanto faz para mim." },
        { en: "She was very sympathetic when I told her about my loss.", pt: "Ela foi muito solidária quando contei sobre minha perda." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "writing", prompt: "\"Deu ruim\":", options: ["It gave bad.", "Things went south.", "It was bad given."], answer: 1 },
        { type: "multiple_choice", skill: "writing", prompt: "\"Já era, perdemos a vaga.\"", options: ["That ship has sailed; we lost the spot.", "It already was, we lost the spot."], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Ela é muito simpática\" (agradável):", options: ["She's very sympathetic.", "She's very nice."], answer: 1 },
        { type: "multiple_choice", skill: "writing", prompt: "\"Tem um problema no sistema.\"", options: ["It has a problem in the system.", "There's a problem with the system."], answer: 1 },
        { type: "fill_blank", skill: "writing", sentence: "Tea or coffee? ___ way is fine. (tanto faz)", accepted: ["Either"] },
        { type: "translate", skill: "writing", prompt: "Faz três anos que trabalho aqui.", accepted: ["I've worked here for three years.", "I have worked here for three years.", "I've been working here for three years.", "I have been working here for three years."] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha a melhor tradução.", audio: "Things went south pretty quickly after that.", options: ["As coisas deram errado bem rápido depois disso.", "As coisas foram para o sul.", "Tudo melhorou depois disso."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "That ship has sailed.", accepted: ["that ship has sailed"] },
      ],
      conversation: {
        goal: "Traduza com o professor expressões brasileiras do dia a dia (\"vou dar um jeito\", \"que mico\", \"fala sério\") pela ideia, não pela letra.",
        starter: "How would you say these in natural English: 'Vou dar um jeito', 'Que mico!', 'Fala sério!' and 'Deixa pra lá'?",
      },
      review: ["Traduza a ideia, não as palavras.", "went south, that ship has sailed, either way.", "There is (não 'it has'); nice (não 'sympathetic')."],
    }),

    buildLesson("c2-m7-l4", M, 4, {
      title: "Preparação para exames",
      objective: "Conhecer formatos e estratégias de CPE e IELTS 8+.",
      explanation: [
        {
          title: "Os exames",
          body: "**Cambridge C2 Proficiency (CPE)**: Reading & Use of English, Writing, Listening, Speaking; nunca expira. **IELTS Academic**: 4 módulos, nota de 0 a 9; 8+ ≈ C2; vale 2 anos para imigração/universidades. **TOEFL iBT**: 0–120; 114+ ≈ C2.",
        },
        {
          title: "Estratégias",
          body: "Reading: leia as perguntas antes, procure paráfrases (não as mesmas palavras). Writing: planeje 5 minutos, gerencie o tempo, revise erros fossilizados. Speaking: desenvolva respostas (motivo + exemplo), use o tempo todo, peça para repetir se precisar (**Could you rephrase the question?**). Listening: antecipe o tipo de resposta.",
        },
      ],
      vocabulary: [
        { en: "band score", pt: "nota (IELTS)", say: "BÉND SCÓR" },
        { en: "paraphrase", pt: "paráfrase", say: "PÉ-ra-frêiz" },
        { en: "time management", pt: "gestão do tempo", say: "TÁIM MÉ-nidj-ment" },
        { en: "rephrase", pt: "reformular", say: "ri-FRÊIZ" },
        { en: "mock test", pt: "simulado", say: "MÓK TÉST" },
        { en: "certificate", pt: "certificado", say: "ser-TÍ-fi-cat" },
        { en: "expire", pt: "expirar / vencer", say: "ex-PÁI-er" },
        { en: "task response", pt: "adequação à tarefa", say: "TÉSK ris-PÓNS" },
      ],
      examples: [
        { en: "I need a band 8 in IELTS for the master's program.", pt: "Preciso de nota 8 no IELTS para o mestrado." },
        { en: "Could you rephrase the question, please?", pt: "Você poderia reformular a pergunta, por favor?" },
        { en: "Take at least three mock tests before the real exam.", pt: "Faça pelo menos três simulados antes da prova real." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Qual certificado não expira?", options: ["Cambridge C2 Proficiency (CPE)", "IELTS"], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "No reading, as respostas costumam aparecer:", options: ["Com paráfrases, não as mesmas palavras.", "Sempre com as mesmas palavras da pergunta."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "I need a ___ score of 8 in IELTS.", accepted: ["band"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Could you ___ the question? (reformular)", accepted: ["rephrase", "repeat"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "No speaking, uma boa resposta:", options: ["Yes. / No.", "Dá a opinião, um motivo e um exemplo."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Vou fazer um simulado amanhã.", accepted: ["I'm going to take a mock test tomorrow.", "I'll take a mock test tomorrow.", "I'm taking a mock test tomorrow.", "I'm going to do a mock test tomorrow."] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Spend five minutes planning your essay before you start writing.", options: ["Planeje a redação por cinco minutos antes de escrever.", "Escreva sem planejar.", "A redação tem cinco minutos."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Could you rephrase the question?", accepted: ["could you rephrase the question"] },
      ],
      conversation: {
        goal: "Simulado do IELTS Speaking Part 3 com o professor: perguntas abstratas, respostas desenvolvidas, e feedback com uma nota estimada.",
        starter: "IELTS Speaking, Part 3. Let's talk about technology and society. Do you think technology has made people less patient? Why?",
      },
      review: ["CPE (não expira), IELTS 8+, TOEFL 114+.", "Reading: paráfrases; Writing: planejar e revisar; Speaking: motivo + exemplo.", "Simulados com tempo real."],
    }),

    buildLesson("c2-m7-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Precisão e autoavaliação",
      objective: "Comprovar precisão e autonomia de nível C2.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Correta:", options: ["She's married with a doctor.", "She's married to a doctor."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "It all depends ___ the budget.", accepted: ["on", "upon"] },
        { type: "multiple_choice", skill: "listening", prompt: "Palavras gramaticais (to, of, a) em fala natural são:", options: ["Fracas, com schwa.", "Fortes."], answer: 0 },
        { type: "multiple_choice", skill: "writing", prompt: "\"Tanto faz\":", options: ["Either way is fine.", "So much makes."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Não sei o que é isso.", accepted: ["I don't know what it is.", "I don't know what that is.", "I do not know what it is.", "I don't know what this is."] },
        { type: "word_order", skill: "grammar", prompt: "Discutimos o problema ontem.", answer: "We discussed the problem yesterday." },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Sympathetic\":", options: ["Solidário / compreensivo", "Simpático"], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha o sentido.", audio: "I didn't say HE was rude.", options: ["Outra pessoa foi grosseira, não ele.", "Ele foi educado.", "Eu não disse nada."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Things went south.", accepted: ["things went south"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["schwa", "vogal neutra"], ["mock test", "simulado"], ["error log", "diário de erros"], ["band score", "nota do IELTS"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
