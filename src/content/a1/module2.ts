import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "a1-m2";

export const a1Module2: Module = {
  id: M,
  level: "A1",
  order: 2,
  title: "Meu mundo",
  description: "Países, família, profissões e objetos do dia a dia.",
  lessons: [
    buildLesson("a1-m2-l1", M, 1, {
      title: "Países e nacionalidades",
      objective: "Dizer de onde você é e perguntar a origem de outras pessoas.",
      explanation: [
        {
          title: "Where are you from?",
          body: "Para perguntar a origem: **Where are you from?** Responda com **I'm from Brazil** (país) ou **I'm Brazilian** (nacionalidade).",
        },
        {
          title: "Letra maiúscula",
          body: "Em inglês, países **e nacionalidades** sempre começam com letra maiúscula: **Brazilian**, **American**, **English** — inclusive o nome do idioma.",
        },
        {
          title: "País × nacionalidade",
          body: "Depois de **from** vem o país. Sem **from**, vem a nacionalidade.",
          table: {
            head: ["País", "Nacionalidade / idioma"],
            rows: [
              ["Brazil", "Brazilian"],
              ["the United States", "American"],
              ["England", "English"],
              ["Spain", "Spanish"],
              ["Japan", "Japanese"],
              ["Canada", "Canadian"],
            ],
          },
        },
      ],
      vocabulary: [
        { en: "where", pt: "onde", say: "UÉR" },
        { en: "from", pt: "de (origem)", say: "FRÓM" },
        { en: "Brazil", pt: "Brasil", say: "bra-ZÍL" },
        { en: "Brazilian", pt: "brasileiro(a)", say: "bra-ZÍ-lian" },
        { en: "country", pt: "país", say: "KÂN-tri" },
        { en: "city", pt: "cidade", say: "SÍ-ri" },
        { en: "language", pt: "idioma", say: "LÉN-güidj" },
        { en: "speak", pt: "falar (um idioma)", say: "SPÍIK" },
      ],
      examples: [
        { en: "Where are you from? — I'm from Brazil.", pt: "De onde você é? — Sou do Brasil." },
        { en: "I'm Brazilian. I speak Portuguese.", pt: "Sou brasileiro. Falo português." },
        { en: "She's from Toronto, a city in Canada.", pt: "Ela é de Toronto, uma cidade no Canadá." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Complete: \"I'm ___ Brazil.\"", options: ["of", "from", "in", "to"], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Qual é a nacionalidade de quem é do Japão?", options: ["Japan", "Japanish", "Japanese", "Japonese"], answer: 2 },
        { type: "translate", skill: "writing", prompt: "De onde você é?", accepted: ["Where are you from?"] },
        { type: "fill_blank", skill: "grammar", sentence: "I'm ___. I'm from Brazil.", translation: "Sou brasileiro. Sou do Brasil.", accepted: ["Brazilian"], explain: "Nacionalidades começam com maiúscula: Brazilian." },
        { type: "word_order", skill: "grammar", prompt: "Ela é de uma cidade no Canadá.", answer: "She's from a city in Canada.", distractors: ["of"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I'm from the United States.", options: ["I'm from England.", "I'm from the United States.", "I'm from Spain."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Eu falo português e inglês.", accepted: ["I speak Portuguese and English."] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Where are you from?", accepted: ["where are you from"] },
      ],
      conversation: {
        goal: "Conte ao professor de onde você é e que idiomas fala.",
        starter: "I'd love to know more about you. Where are you from?",
      },
      review: ["Where are you from? → I'm from + país.", "Nacionalidade e idioma com maiúscula."],
    }),

    buildLesson("a1-m2-l2", M, 2, {
      title: "Família",
      objective: "Falar sobre os membros da sua família usando possessivos.",
      explanation: [
        {
          title: "Possessivos",
          body: "Os possessivos vêm **antes** do substantivo e **não mudam** com masculino/feminino ou plural.",
          table: {
            head: ["Pessoa", "Possessivo", "Exemplo"],
            rows: [
              ["I", "my", "my mother"],
              ["you", "your", "your father"],
              ["he", "his", "his sister"],
              ["she", "her", "her brother"],
              ["we", "our", "our parents"],
              ["they", "their", "their children"],
            ],
          },
        },
        {
          title: "His ou her?",
          body: "Depende de **quem possui**, não da coisa possuída. \"A mãe dele\" = **his mother**. \"O pai dela\" = **her father**.",
        },
        {
          title: "O 's de posse",
          body: "Para dizer \"o carro do João\", use **John's car**. O dono vem primeiro, com **'s**.",
        },
      ],
      vocabulary: [
        { en: "mother", pt: "mãe", say: "MÂ-dher" },
        { en: "father", pt: "pai", say: "FÁ-dher" },
        { en: "parents", pt: "pais (pai e mãe)", say: "PÉ-rents" },
        { en: "brother", pt: "irmão", say: "BRÂ-dher" },
        { en: "sister", pt: "irmã", say: "SÍS-ter" },
        { en: "son", pt: "filho", say: "SÂN" },
        { en: "daughter", pt: "filha", say: "DÓ-ter" },
        { en: "husband", pt: "marido", say: "RÂZ-band" },
        { en: "wife", pt: "esposa", say: "UÁIF" },
        { en: "children", pt: "filhos, crianças", say: "TCHÍL-dren" },
      ],
      examples: [
        { en: "This is my sister. Her name is Laura.", pt: "Esta é minha irmã. O nome dela é Laura." },
        { en: "His parents are from Bahia.", pt: "Os pais dele são da Bahia." },
        { en: "Maria's husband is a doctor.", pt: "O marido da Maria é médico." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"O irmão dela\" é:", options: ["his brother", "her brother", "she brother", "hers brother"], answer: 1, explain: "Quem possui é ela → her." },
        { type: "fill_blank", skill: "grammar", sentence: "Tom and ___ wife are teachers.", translation: "Tom e a esposa dele são professores.", accepted: ["his"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue as palavras.", pairs: [["daughter", "filha"], ["son", "filho"], ["parents", "pais"], ["wife", "esposa"]] },
        { type: "translate", skill: "writing", prompt: "Minha mãe é professora.", accepted: ["My mother is a teacher.", "My mom is a teacher."] },
        { type: "translate", skill: "writing", prompt: "O carro do Pedro.", accepted: ["Pedro's car.", "Pedro's car"] },
        { type: "word_order", skill: "grammar", prompt: "Os filhos deles são felizes.", answer: "Their children are happy.", distractors: ["there"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "This is my daughter.", options: ["This is my doctor.", "This is my daughter.", "This is my father."], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Her brother is ten.", accepted: ["her brother is ten", "her brother is 10"] },
      ],
      conversation: {
        goal: "Descreva sua família: quantas pessoas, nomes e idades.",
        starter: "Tell me about your family. Do you have brothers or sisters?",
      },
      review: ["my, your, his, her, our, their antes do substantivo.", "his/her depende de quem possui.", "Nome + 's indica posse."],
    }),

    buildLesson("a1-m2-l3", M, 3, {
      title: "Profissões",
      objective: "Dizer sua profissão e perguntar o que alguém faz.",
      explanation: [
        {
          title: "A e an são obrigatórios",
          body: "Em inglês, profissão no singular leva artigo: **I'm a nurse**, **She's an engineer**. Em português falamos \"sou enfermeira\" sem artigo — por isso é um erro frequente.",
        },
        {
          title: "A ou an?",
          body: "Use **an** antes de **som** de vogal: **an engineer**, **an artist**. Use **a** antes de som de consoante: **a doctor**, **a teacher**.",
        },
        {
          title: "Perguntando a profissão",
          body: "A pergunta natural é **What do you do?** (O que você faz?). Responda com **I'm a/an...** ou **I work in/at...**",
        },
      ],
      vocabulary: [
        { en: "job", pt: "emprego, trabalho", say: "DJÓB" },
        { en: "work", pt: "trabalhar", say: "UÊRK" },
        { en: "doctor", pt: "médico(a)", say: "DÓK-ter" },
        { en: "nurse", pt: "enfermeiro(a)", say: "NÊRS" },
        { en: "engineer", pt: "engenheiro(a)", say: "en-dji-NÍER" },
        { en: "lawyer", pt: "advogado(a)", say: "LÓ-ier" },
        { en: "salesperson", pt: "vendedor(a)", say: "SÊILZ-pêr-son" },
        { en: "office", pt: "escritório", say: "Ó-fis" },
        { en: "company", pt: "empresa", say: "KÂM-pa-ni" },
      ],
      examples: [
        { en: "What do you do? — I'm an engineer.", pt: "O que você faz? — Sou engenheiro." },
        { en: "She works in a hospital. She's a nurse.", pt: "Ela trabalha num hospital. É enfermeira." },
        { en: "I work at a big company.", pt: "Trabalho numa empresa grande." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Complete: \"He's ___ engineer.\"", options: ["a", "an", "the", "—"], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "Qual frase está correta?", options: ["I'm doctor.", "I'm a doctor.", "I'm an doctor.", "I doctor."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "O que você faz?", accepted: ["What do you do?"] },
        { type: "translate", skill: "writing", prompt: "Eu sou advogado.", accepted: ["I'm a lawyer.", "I am a lawyer."] },
        { type: "fill_blank", skill: "grammar", sentence: "She ___ in an office.", translation: "Ela trabalha num escritório.", accepted: ["works"], explain: "Com he/she/it o verbo ganha -s: she works." },
        { type: "word_order", skill: "grammar", prompt: "Eu trabalho numa empresa grande.", answer: "I work at a big company.", distractors: ["an"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha a profissão.", audio: "My father is a nurse.", options: ["médico", "enfermeiro", "advogado"], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "What do you do?", accepted: ["what do you do"] },
      ],
      conversation: {
        goal: "Conte ao professor o que você faz e onde trabalha ou estuda.",
        starter: "So, what do you do? Do you work or study?",
      },
      review: ["Profissão leva a/an.", "an antes de som de vogal.", "What do you do? = O que você faz?"],
    }),

    buildLesson("a1-m2-l4", M, 4, {
      title: "Objetos: this, that e plural",
      objective: "Apontar e nomear objetos próximos e distantes, no singular e no plural.",
      explanation: [
        {
          title: "Perto ou longe",
          body: "**This** (este/esta) e **these** (estes/estas) para coisas perto. **That** (aquele/aquela) e **those** (aqueles/aquelas) para coisas longe.",
          table: {
            head: ["", "Singular", "Plural"],
            rows: [
              ["Perto", "this", "these"],
              ["Longe", "that", "those"],
            ],
          },
        },
        {
          title: "Plural",
          body: "A maioria ganha **-s**: book → books. Palavras terminadas em s, sh, ch, x ganham **-es**: box → boxes. Alguns são irregulares: **man → men**, **woman → women**, **child → children**.",
        },
        {
          title: "What's this?",
          body: "Pergunte **What's this?** / **What's that?** e responda **It's a pen.** No plural: **What are these? — They're keys.**",
        },
      ],
      vocabulary: [
        { en: "book", pt: "livro", say: "BÚK" },
        { en: "pen", pt: "caneta", say: "PÉN" },
        { en: "phone", pt: "celular, telefone", say: "FÔUN" },
        { en: "key", pt: "chave", say: "KÍ" },
        { en: "bag", pt: "bolsa, mochila", say: "BÉG" },
        { en: "table", pt: "mesa", say: "TÊI-bol" },
        { en: "chair", pt: "cadeira", say: "TCHÉR" },
        { en: "window", pt: "janela", say: "UÍN-dou" },
        { en: "watch", pt: "relógio de pulso", say: "UÓTCH" },
      ],
      examples: [
        { en: "What's this? — It's my phone.", pt: "O que é isto? — É meu celular." },
        { en: "Those chairs are new.", pt: "Aquelas cadeiras são novas." },
        { en: "These are my keys.", pt: "Estas são minhas chaves." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Complete: \"___ books here are mine.\" (perto, plural)", options: ["This", "That", "These", "Those"], answer: 2 },
        { type: "multiple_choice", skill: "grammar", prompt: "Plural de \"watch\":", options: ["watchs", "watches", "watchies", "watch"], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "Plural de \"woman\":", options: ["womans", "womens", "women", "woman"], answer: 2 },
        { type: "fill_blank", skill: "grammar", sentence: "What's ___? (aquilo, lá longe)", accepted: ["that"] },
        { type: "translate", skill: "writing", prompt: "Estas são minhas chaves.", accepted: ["These are my keys."] },
        { type: "word_order", skill: "grammar", prompt: "Aquela janela é grande.", answer: "That window is big.", distractors: ["this"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Those are my bags.", options: ["This is my bag.", "Those are my bags.", "These are my books."], answer: 1 },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue os objetos.", pairs: [["chair", "cadeira"], ["key", "chave"], ["table", "mesa"], ["pen", "caneta"]] },
      ],
      conversation: {
        goal: "Descreva ao professor cinco objetos que estão perto de você agora.",
        starter: "Look around you. What's on your table right now?",
      },
      review: ["this/these perto, that/those longe.", "Plural com -s, -es ou irregular.", "What's this? → It's a..."],
    }),

    buildLesson("a1-m2-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo 2",
      objective: "Comprovar que você domina nacionalidades, família, profissões e objetos.",
      explanation: [{ title: "Como funciona", body: "Exercícios de todo o módulo 2. Você precisa de **70%** para avançar." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "\"A esposa dele\" é:", options: ["her wife", "his wife", "he's wife"], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a frase correta.", options: ["She's engineer.", "She's a engineer.", "She's an engineer."], answer: 2 },
        { type: "translate", skill: "writing", prompt: "Eu sou do Brasil.", accepted: ["I'm from Brazil.", "I am from Brazil."] },
        { type: "fill_blank", skill: "grammar", sentence: "___ are my children. (perto)", accepted: ["These", "these"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Her husband is a lawyer.", options: ["O marido dela é advogado.", "O marido dele é advogado.", "O irmão dela é médico."], answer: 0 },
        { type: "word_order", skill: "grammar", prompt: "O que você faz?", answer: "What do you do?" },
        { type: "translate", skill: "writing", prompt: "Ela é americana.", accepted: ["She's American.", "She is American."] },
        { type: "multiple_choice", skill: "grammar", prompt: "Plural de \"child\":", options: ["childs", "children", "childes"], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Where are you from?", accepted: ["where are you from"] },
        { type: "multiple_choice", skill: "reading", prompt: "\"Ana's brother is a doctor in Lisbon.\" Quem é médico?", options: ["Ana", "O irmão da Ana", "O pai da Ana"], answer: 1 },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
