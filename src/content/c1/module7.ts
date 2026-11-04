import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "c1-m7";

export const c1Module7: Module = {
  id: M,
  level: "C1",
  order: 7,
  title: "Cultura e sociedade",
  description: "Política e economia, ciência e ética, variedades do inglês e humor nativo.",
  lessons: [
    buildLesson("c1-m7-l1", M, 1, {
      title: "Política e economia",
      objective: "Discutir atualidades com a linguagem da mídia.",
      explanation: [
        {
          title: "Economia",
          body: "**inflation** (inflação) · **interest rates** (juros) · **recession** · **GDP** (PIB) · **unemployment rate** · **budget deficit** · **tax cuts / tax hikes** · **the cost of living** · **The central bank raised rates to curb inflation.** (conter)",
        },
        {
          title: "Política",
          body: "**election / polls** (pesquisas) · **bill** (projeto de lei) · **pass a law** · **veto** · **coalition** · **opposition** · **policy** (política pública) × **politics** (a política em geral) · **grassroots** (de base) · **lobby**.",
        },
      ],
      vocabulary: [
        { en: "inflation", pt: "inflação", say: "in-FLÊI-shan" },
        { en: "interest rates", pt: "taxa de juros", say: "ÍN-trest RÊITS" },
        { en: "GDP", pt: "PIB", say: "DJÍ-DI-PÍ" },
        { en: "curb", pt: "conter / frear", say: "CÂRB" },
        { en: "bill", pt: "projeto de lei", say: "BÍL" },
        { en: "polls", pt: "pesquisas eleitorais", say: "PÔULZ" },
        { en: "policy", pt: "política (pública)", say: "PÓ-li-si" },
        { en: "cost of living", pt: "custo de vida", say: "CÓST ov LÍ-ving" },
        { en: "deficit", pt: "déficit", say: "DÉ-fi-sit" },
        { en: "grassroots", pt: "de base", say: "GRÉS-ruuts" },
      ],
      examples: [
        { en: "The central bank raised interest rates to curb inflation.", pt: "O banco central subiu os juros para conter a inflação." },
        { en: "The bill was passed by a narrow margin.", pt: "O projeto de lei foi aprovado por pequena margem." },
        { en: "The rising cost of living is the main concern in the polls.", pt: "O aumento do custo de vida é a principal preocupação nas pesquisas." },
      ],
      exercises: [
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["GDP", "PIB"], ["bill", "projeto de lei"], ["polls", "pesquisas eleitorais"], ["interest rates", "juros"]] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Policy\" × \"politics\": \"The government's new housing ___.\"", options: ["policy", "politics"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "The bank raised rates to ___ inflation. (conter)", accepted: ["curb", "control", "fight", "tackle"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "The unemployment ___ fell to 6%.", accepted: ["rate"] },
        { type: "translate", skill: "writing", prompt: "O custo de vida está subindo.", accepted: ["The cost of living is rising.", "The cost of living is going up.", "The cost of living is increasing."] },
        { type: "word_order", skill: "grammar", prompt: "O projeto de lei foi aprovado ontem.", answer: "The bill was passed yesterday.", distractors: ["approve"] },
        { type: "listening", skill: "listening", prompt: "Ouça a notícia e escolha.", audio: "With inflation easing, analysts expect interest rates to fall later this year.", options: ["Com a inflação cedendo, espera-se queda dos juros.", "A inflação disparou.", "Os juros vão subir."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "The economy is in recession.", accepted: ["the economy is in recession", "the economy is in a recession"] },
      ],
      conversation: {
        goal: "Explique ao professor a situação econômica do Brasil hoje (inflação, juros, emprego) de forma equilibrada, como um analista.",
        starter: "I'm a foreign investor. Can you give me a quick, balanced overview of the Brazilian economy right now?",
      },
      review: ["inflation, interest rates, GDP, cost of living, deficit.", "bill, polls, policy × politics.", "curb inflation, pass a bill."],
    }),

    buildLesson("c1-m7-l2", M, 2, {
      title: "Ciência e ética",
      objective: "Discutir dilemas com hedging avançado.",
      explanation: [
        {
          title: "Hedging avançado",
          body: "**There is a growing body of evidence that...** · **It remains unclear whether...** · **The findings should be interpreted with caution.** · **This raises important ethical questions about...** · **On the face of it,...** (à primeira vista)",
        },
        {
          title: "Vocabulário de dilemas",
          body: "**gene editing** · **informed consent** (consentimento informado) · **privacy** · **slippery slope** (ladeira escorregadia: um passo leva a outro pior) · **the greater good** (o bem maior) · **unintended consequences**.",
        },
      ],
      vocabulary: [
        { en: "a body of evidence", pt: "um conjunto de evidências", say: "a BÓ-di ov É-vi-dens" },
        { en: "it remains unclear", pt: "ainda não está claro", say: "it ri-MÊINZ ân-CLÍR" },
        { en: "with caution", pt: "com cautela", say: "uidh CÓ-shan" },
        { en: "informed consent", pt: "consentimento informado", say: "in-FÓRMD con-SÉNT" },
        { en: "slippery slope", pt: "ladeira escorregadia", say: "SLÍ-pe-ri SLÔUP" },
        { en: "the greater good", pt: "o bem maior", say: "dhe GRÊI-ter GÚD" },
        { en: "unintended", pt: "não intencional", say: "ân-in-TÉN-did" },
        { en: "on the face of it", pt: "à primeira vista", say: "on dhe FÊIS ov it" },
        { en: "breakthrough", pt: "avanço", say: "BRÊIK-thru" },
      ],
      examples: [
        { en: "There is a growing body of evidence that screen time affects sleep.", pt: "Há um conjunto crescente de evidências de que o tempo de tela afeta o sono." },
        { en: "It remains unclear whether the treatment is safe in the long term.", pt: "Ainda não está claro se o tratamento é seguro a longo prazo." },
        { en: "On the face of it, it's a good idea, but it could be a slippery slope.", pt: "À primeira vista é uma boa ideia, mas pode ser uma ladeira escorregadia." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Slippery slope\" num argumento é:", options: ["Um primeiro passo que levaria a consequências piores.", "Um piso molhado.", "Um argumento muito forte."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "The results should be interpreted with ___.", accepted: ["caution", "care"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "It remains ___ whether the drug works. (não está claro)", accepted: ["unclear", "uncertain"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Patients must give informed ___.", accepted: ["consent"] },
        { type: "translate", skill: "writing", prompt: "Isso levanta questões éticas importantes.", accepted: ["This raises important ethical questions.", "That raises important ethical questions.", "This raises important ethical issues."] },
        { type: "word_order", skill: "grammar", prompt: "À primeira vista, parece seguro.", answer: "On the face of it, it seems safe.", distractors: ["look"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "The technology could save lives, but it may have unintended consequences.", options: ["Pode salvar vidas, mas ter consequências não intencionais.", "É totalmente perigosa.", "Não tem nenhum risco."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It remains unclear.", accepted: ["it remains unclear"] },
      ],
      conversation: {
        goal: "Debata um dilema (edição genética, reconhecimento facial, IA na medicina) com hedging e vocabulário ético.",
        starter: "Should police be allowed to use facial recognition in public places? Weigh the benefits and the ethical concerns.",
      },
      review: ["a growing body of evidence / it remains unclear / with caution.", "informed consent, slippery slope, the greater good.", "On the face of it..."],
    }),

    buildLesson("c1-m7-l3", M, 3, {
      title: "Variedades do inglês",
      objective: "Reconhecer diferenças entre inglês britânico, americano e outros.",
      explanation: [
        {
          title: "Vocabulário diferente",
          body: "UK × US: **flat / apartment** · **lift / elevator** · **queue / line** · **holiday / vacation** · **mobile / cell phone** · **biscuit / cookie** · **chips / fries** · **crisps / chips** · **ground floor / first floor** · **rubbish / trash** · **trainers / sneakers**.",
          table: {
            head: ["Britânico", "Americano", "Português"],
            rows: [
              ["flat", "apartment", "apartamento"],
              ["lift", "elevator", "elevador"],
              ["queue", "line", "fila"],
              ["chips", "fries", "batata frita"],
              ["autumn", "fall", "outono"],
              ["trousers", "pants", "calça"],
            ],
          },
        },
        {
          title: "Ortografia e gramática",
          body: "Ortografia: **colour/color, centre/center, organise/organize, travelled/traveled**. Gramática: UK **Have you got...?** × US **Do you have...?** · UK **in the team** × US **on the team** · UK collective plural: **The team are playing well.**",
        },
        {
          title: "Outros ingleses",
          body: "Australiano (**arvo** = afternoon, **mate**), indiano (**prepone** = antecipar), irlandês (**grand** = ótimo), sul-africano. Nenhum é \"mais correto\": escolha um padrão e seja consistente.",
        },
      ],
      vocabulary: [
        { en: "flat (UK)", pt: "apartamento", say: "FLÉT" },
        { en: "queue (UK)", pt: "fila", say: "KIÚ" },
        { en: "lift (UK)", pt: "elevador", say: "LÍFT" },
        { en: "rubbish (UK)", pt: "lixo / bobagem", say: "RÂ-bish" },
        { en: "trousers (UK)", pt: "calça", say: "TRÁU-zerz" },
        { en: "pants (US)", pt: "calça (EUA) / cueca (UK)", say: "PÉNTS" },
        { en: "fall (US)", pt: "outono", say: "FÓL" },
        { en: "mate (UK/AU)", pt: "amigo / cara", say: "MÊIT" },
        { en: "consistent", pt: "consistente", say: "con-SÍS-tent" },
      ],
      examples: [
        { en: "We live in a flat on the ground floor. (UK)", pt: "Moramos num apartamento no térreo. (Reino Unido)" },
        { en: "Take the elevator to the first floor. (US)", pt: "Pegue o elevador até o térreo. (EUA)" },
        { en: "Careful: in the UK, 'pants' means underwear!", pt: "Cuidado: no Reino Unido, 'pants' é roupa íntima!" },
      ],
      exercises: [
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue britânico → americano.", pairs: [["flat", "apartment"], ["lift", "elevator"], ["queue", "line"], ["autumn", "fall"]] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Em Londres, \"I need new pants\" provavelmente significa:", options: ["Preciso de roupa íntima nova.", "Preciso de calça nova.", "Preciso de sapatos."], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Ortografia americana:", options: ["colour", "color"], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Ground floor\" (UK) = nos EUA:", options: ["first floor", "second floor", "basement"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "In the UK, people wait in a ___. In the US, in a line.", accepted: ["queue"] },
        { type: "translate", skill: "writing", prompt: "Você tem um celular? (estilo britânico)", accepted: ["Have you got a mobile?", "Have you got a mobile phone?"] },
        { type: "listening", skill: "listening", prompt: "Ouça. Que variedade parece ser?", audio: "I'll meet you by the lift after I've put the rubbish out, mate.", options: ["Britânica.", "Americana."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Let's take the elevator.", accepted: ["let's take the elevator", "let us take the elevator"] },
      ],
      conversation: {
        goal: "O professor alterna entre inglês britânico e americano. Identifique as diferenças e \"traduza\" de um para o outro.",
        starter: "Right, I'm going to speak British English first. 'I left my mobile in the flat, so I queued for ages at the shop.' What would an American say?",
      },
      review: ["flat/apartment, lift/elevator, queue/line, autumn/fall.", "colour/color, organise/organize; Have you got / Do you have.", "Escolha um padrão e seja consistente."],
    }),

    buildLesson("c1-m7-l4", M, 4, {
      title: "Humor",
      objective: "Entender trocadilhos, duplo sentido e humor nativo.",
      explanation: [
        {
          title: "Trocadilhos (puns)",
          body: "Jogam com palavras de som ou sentido duplo: **I used to be a banker, but I lost interest.** (interest = juros / interesse) · **Time flies like an arrow; fruit flies like a banana.** (fruit flies = moscas-das-frutas).",
        },
        {
          title: "Estilos de humor",
          body: "**self-deprecating** (rir de si mesmo, muito britânico) · **deadpan** (sério, sem expressão) · **dad jokes** (piadas bobas de pai) · **banter** (zoação amigável entre colegas). Entender a piada mostra domínio da língua e da cultura.",
        },
      ],
      vocabulary: [
        { en: "pun", pt: "trocadilho", say: "PÂN" },
        { en: "double meaning", pt: "duplo sentido", say: "DÂ-bol MÍI-ning" },
        { en: "deadpan", pt: "impassível / sério", say: "DÉD-pén" },
        { en: "self-deprecating", pt: "autodepreciativo", say: "sélf-DÉ-pre-kêi-ting" },
        { en: "banter", pt: "zoação amigável", say: "BÉN-ter" },
        { en: "dad joke", pt: "piada de tiozão", say: "DÉD DJÔUK" },
        { en: "get the joke", pt: "entender a piada", say: "guét dhe DJÔUK" },
        { en: "punchline", pt: "desfecho da piada", say: "PÂNTCH-láin" },
        { en: "witty", pt: "espirituoso", say: "UÍ-ti" },
      ],
      examples: [
        { en: "I used to be a banker, but I lost interest.", pt: "Eu era bancário, mas perdi o interesse (os juros). — trocadilho" },
        { en: "His deadpan delivery makes the jokes even funnier.", pt: "O jeito sério dele torna as piadas ainda mais engraçadas." },
        { en: "There's a lot of friendly banter in our office.", pt: "Tem muita zoação amigável no nosso escritório." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "reading", prompt: "\"I used to be a banker, but I lost interest.\" A graça está em:", options: ["\"interest\" = interesse e juros.", "\"banker\" = banco de praça.", "Não há trocadilho."], answer: 0 },
        { type: "multiple_choice", skill: "reading", prompt: "\"I'm reading a book about anti-gravity. It's impossible to put down.\" Trocadilho com:", options: ["put down = largar (o livro) / descer (gravidade)", "book = reservar", "reading = cidade inglesa"], answer: 0 },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["pun", "trocadilho"], ["banter", "zoação amigável"], ["deadpan", "sério, impassível"], ["witty", "espirituoso"]] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Sorry, I didn't get the ___. Can you explain?", accepted: ["joke"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"I'm so organised that I lost my to-do list.\" Esse humor é:", options: ["Autodepreciativo.", "Sarcástico com o outro.", "Agressivo."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Essa piada tem duplo sentido.", accepted: ["That joke has a double meaning.", "This joke has a double meaning."] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha a explicação.", audio: "Why don't skeletons fight each other? They don't have the guts.", options: ["\"guts\" = coragem e entranhas.", "Esqueletos são pacíficos.", "Não há trocadilho."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "That's a terrible pun.", accepted: ["that's a terrible pun", "that is a terrible pun"] },
      ],
      conversation: {
        goal: "Troque piadas e trocadilhos com o professor. Explique a graça de cada um (em inglês).",
        starter: "Here's one for you: 'I'm on a seafood diet. I see food and I eat it.' Do you get it? Explain it to me, then tell me one.",
      },
      review: ["pun, double meaning, punchline.", "deadpan, self-deprecating, banter, dad jokes.", "Explicar a piada mostra domínio."],
    }),

    buildLesson("c1-m7-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Cultura e sociedade",
      objective: "Comprovar que você discute atualidades, dilemas, variedades e humor.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Interest rates\":", options: ["Juros", "Interesses pessoais", "Taxa de câmbio"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "It ___ unclear whether the plan will work.", accepted: ["remains", "is"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Lift\" (UK) =", options: ["elevator", "ride", "line"], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Pun\":", options: ["Trocadilho", "Castigo", "Pão"], answer: 0 },
        { type: "translate", skill: "writing", prompt: "O projeto de lei foi aprovado.", accepted: ["The bill was passed.", "The bill has been passed.", "The bill was approved."] },
        { type: "word_order", skill: "grammar", prompt: "Os resultados devem ser interpretados com cautela.", answer: "The results should be interpreted with caution." },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Ortografia britânica:", options: ["organize", "organise"], answer: 1 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "On the face of it, the policy seems fair, but it could be a slippery slope.", options: ["Parece justa à primeira vista, mas pode abrir precedente perigoso.", "É totalmente injusta.", "Já foi revogada."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "The cost of living keeps rising.", accepted: ["the cost of living keeps rising"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["GDP", "PIB"], ["queue", "fila"], ["banter", "zoação"], ["curb", "conter"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
