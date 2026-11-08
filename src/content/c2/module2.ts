import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "c2-m2";

export const c2Module2: Module = {
  id: M,
  level: "C2",
  order: 2,
  title: "Escrita de alto nível",
  description: "Ensaios críticos, resenhas, escrita executiva e escrita criativa.",
  lessons: [
    buildLesson("c2-m2-l1", M, 1, {
      title: "Ensaios críticos",
      objective: "Argumentar com sofisticação, nuance e voz própria.",
      explanation: [
        {
          title: "Além do \"pró e contra\"",
          body: "Um ensaio C2 não lista lados: constrói uma tese com nuance, problematiza termos e reconhece limites. **While the case for X is compelling, it rests on an assumption that deserves scrutiny.** · **This is not to say that... ; rather,...**",
        },
        {
          title: "Movimentos argumentativos",
          body: "Problematizar: **What counts as 'success' here?** · Qualificar: **This holds true only insofar as...** (somente na medida em que) · Conceder: **One need not deny X to see that Y.** · Sintetizar: **What emerges, then, is a more complex picture.**",
        },
      ],
      vocabulary: [
        { en: "scrutiny", pt: "escrutínio / exame minucioso", say: "SKRÚ-ti-ni" },
        { en: "rest on", pt: "basear-se em", say: "RÉST on" },
        { en: "insofar as", pt: "na medida em que", say: "in-sou-FÁR éz" },
        { en: "assumption", pt: "pressuposto", say: "a-SÂMP-shan" },
        { en: "this is not to say", pt: "isso não quer dizer", say: "dhís iz NÓT tu SÊI" },
        { en: "rather", pt: "antes / pelo contrário", say: "RÉ-dher" },
        { en: "emerge", pt: "emergir / surgir", say: "i-MÂRDJ" },
        { en: "nuanced", pt: "matizado / com nuances", say: "NÚ-anst" },
        { en: "untenable", pt: "insustentável", say: "ân-TÉ-na-bol" },
      ],
      examples: [
        { en: "This is not to say that technology is harmful; rather, its benefits are unevenly distributed.", pt: "Isso não quer dizer que a tecnologia é prejudicial; antes, seus benefícios são mal distribuídos." },
        { en: "The argument holds only insofar as we accept its central assumption.", pt: "O argumento só se sustenta na medida em que aceitamos seu pressuposto central." },
        { en: "What emerges, then, is a far more nuanced picture.", pt: "O que emerge, então, é um quadro muito mais matizado." },
      ],
      exercises: [
        { type: "fill_blank", skill: "writing", sentence: "This is not to ___ that the policy failed; rather, it was poorly implemented.", accepted: ["say"] },
        { type: "fill_blank", skill: "writing", sentence: "The claim holds true only ___ as the data are reliable. (na medida em que)", accepted: ["insofar", "in so far"] },
        { type: "multiple_choice", skill: "writing", prompt: "Frase mais típica de ensaio C2:", options: ["There are pros and cons.", "The case for reform, while compelling, rests on a questionable assumption.", "Some people agree and some people don't."], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Untenable\":", options: ["Insustentável", "Intocável", "Inteligente"], answer: 0 },
        { type: "fill_blank", skill: "writing", sentence: "The argument ___ on the assumption that people act rationally.", accepted: ["rests", "relies", "depends"] },
        { type: "translate", skill: "writing", prompt: "O que emerge é um quadro mais complexo.", accepted: ["What emerges is a more complex picture.", "What emerges is a more complicated picture."] },
        { type: "word_order", skill: "writing", prompt: "Essa visão merece um exame minucioso.", answer: "This view deserves closer scrutiny.", distractors: ["deserve"] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "That position is untenable.", accepted: ["that position is untenable"] },
      ],
      conversation: {
        goal: "Defenda oralmente uma tese matizada sobre um tema complexo, problematizando termos e qualificando suas afirmações.",
        starter: "Thesis: 'Meritocracy is a myth.' Don't simply agree or disagree. Build a nuanced position.",
      },
      review: ["Tese matizada, não lista de prós e contras.", "insofar as / this is not to say...; rather / rests on.", "Problematizar, qualificar, conceder, sintetizar."],
    }),

    buildLesson("c2-m2-l2", M, 2, {
      title: "Resenhas",
      objective: "Escrever avaliações equilibradas e com autoridade.",
      explanation: [
        {
          title: "Elogio e crítica precisos",
          body: "Elogio: **a tour de force · deftly handled · beautifully paced · thought-provoking**. Crítica: **falls flat · overlong · heavy-handed** (sem sutileza) · **fails to live up to its promise**. Equilíbrio: **For all its flaws, the movie is...** (Apesar de todas as falhas...)",
        },
        {
          title: "Estrutura",
          body: "Gancho → contexto (o que é, de quem) → análise (o que funciona, o que não) → veredito. Evite resumir a obra toda: avalie.",
        },
      ],
      vocabulary: [
        { en: "tour de force", pt: "obra-prima / feito notável", say: "TÚR de FÓRS" },
        { en: "deftly", pt: "habilmente", say: "DÉFT-li" },
        { en: "thought-provoking", pt: "instigante", say: "THÓT-pro-vôu-king" },
        { en: "fall flat", pt: "não funcionar / não ter graça", say: "FÓL FLÉT" },
        { en: "heavy-handed", pt: "sem sutileza", say: "RÉ-vi-RÉN-did" },
        { en: "overlong", pt: "longo demais", say: "ou-ver-LÓNG" },
        { en: "live up to", pt: "corresponder a", say: "LÍV ÂP tu" },
        { en: "for all its flaws", pt: "apesar de todas as falhas", say: "for ÓL its FLÓZ" },
        { en: "verdict", pt: "veredito", say: "VÂR-dikt" },
      ],
      examples: [
        { en: "For all its flaws, the novel remains a tour de force.", pt: "Apesar de todas as falhas, o romance continua sendo uma obra notável." },
        { en: "The jokes fall flat and the second half is overlong.", pt: "As piadas não funcionam e a segunda metade é longa demais." },
        { en: "The movie fails to live up to the hype.", pt: "O filme não corresponde ao hype." },
      ],
      exercises: [
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["fall flat", "não funcionar"], ["heavy-handed", "sem sutileza"], ["thought-provoking", "instigante"], ["overlong", "longo demais"]] },
        { type: "fill_blank", skill: "vocabulary", sentence: "The sequel fails to live ___ to the original.", accepted: ["up"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "For all its ___, it's worth reading. (falhas)", accepted: ["flaws", "faults", "shortcomings"] },
        { type: "multiple_choice", skill: "writing", prompt: "Resenha equilibrada:", options: ["It's the worst thing ever made.", "Despite a heavy-handed ending, the movie is beautifully paced and deftly acted.", "I liked it."], answer: 1 },
        { type: "multiple_choice", skill: "writing", prompt: "Numa resenha, evite:", options: ["Resumir a obra inteira sem avaliar.", "Dar um veredito.", "Citar pontos fortes."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "O roteiro foi conduzido com habilidade.", accepted: ["The script was deftly handled.", "The screenplay was deftly handled.", "The script was skillfully handled."] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha o veredito.", audio: "Overlong and occasionally heavy-handed, but ultimately thought-provoking.", options: ["Positivo com ressalvas.", "Totalmente negativo.", "Totalmente positivo, sem ressalvas."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It's a tour de force.", accepted: ["it's a tour de force", "it is a tour de force"] },
      ],
      conversation: {
        goal: "Faça uma resenha oral de 1 minuto de um filme, série ou livro: gancho, contexto, análise e veredito equilibrado.",
        starter: "You're a critic on a radio show. Review the last movie or series you watched in about a minute.",
      },
      review: ["Elogio: tour de force, deftly, thought-provoking.", "Crítica: falls flat, heavy-handed, overlong, fails to live up to.", "For all its flaws... + veredito."],
    }),

    buildLesson("c2-m2-l3", M, 3, {
      title: "Escrita profissional",
      objective: "Escrever documentos executivos com concisão e clareza.",
      explanation: [
        {
          title: "Corte sem dó",
          body: "**In order to** → to · **due to the fact that** → because · **at this point in time** → now · **make a decision** → decide · **it is important to note that** → (corte) · **the reason why is because** → because.",
          table: {
            head: ["Prolixo", "Conciso"],
            rows: [
              ["In order to", "To"],
              ["Due to the fact that", "Because"],
              ["At this point in time", "Now"],
              ["Conduct an analysis of", "Analyze"],
              ["In the event that", "If"],
            ],
          },
        },
        {
          title: "BLUF: Bottom Line Up Front",
          body: "Executivos leem a primeira linha. Comece pela conclusão ou pedido: **Recommendation: approve the Q3 budget by Friday. Reasons below.**",
        },
      ],
      vocabulary: [
        { en: "concise", pt: "conciso", say: "con-SÁIS" },
        { en: "wordy", pt: "prolixo", say: "UÊR-di" },
        { en: "bottom line", pt: "conclusão principal", say: "BÓ-tom LÁIN" },
        { en: "executive summary", pt: "resumo executivo", say: "ig-ZÉ-kiu-tiv SÂ-ma-ri" },
        { en: "actionable", pt: "acionável / prático", say: "ÉK-sha-na-bol" },
        { en: "streamline", pt: "enxugar / otimizar", say: "STRÍIM-láin" },
        { en: "redundant", pt: "redundante", say: "ri-DÂN-dant" },
        { en: "plain English", pt: "linguagem clara", say: "PLÊIN ÍN-glish" },
      ],
      examples: [
        { en: "Bottom line: we need two more engineers to meet the deadline.", pt: "Resumindo: precisamos de mais dois engenheiros para cumprir o prazo." },
        { en: "We postponed the launch because the tests failed.", pt: "Adiamos o lançamento porque os testes falharam." },
        { en: "The executive summary should fit on one page.", pt: "O resumo executivo deve caber em uma página." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "writing", prompt: "Versão concisa de \"Due to the fact that it rained\":", options: ["Because it rained", "Owing to the circumstance that it rained", "Due to the rain fact"], answer: 0 },
        { type: "fill_blank", skill: "writing", sentence: "\"In order to improve\" → \"___ improve\"", accepted: ["To"] },
        { type: "fill_blank", skill: "writing", sentence: "\"At this point in time\" → \"___\"", accepted: ["now", "Now", "currently"] },
        { type: "multiple_choice", skill: "writing", prompt: "BLUF significa:", options: ["Começar pela conclusão ou pedido.", "Deixar a conclusão para o fim.", "Escrever com humor."], answer: 0 },
        { type: "multiple_choice", skill: "writing", prompt: "Mais conciso:", options: ["We will conduct an analysis of the data.", "We will analyze the data."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Recomendação: aprovar o orçamento até sexta.", accepted: ["Recommendation: approve the budget by Friday.", "Recommendation: to approve the budget by Friday."] },
        { type: "word_order", skill: "writing", prompt: "Adiamos o lançamento porque os testes falharam.", answer: "We postponed the launch because the tests failed.", distractors: ["fact"] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Keep it short and actionable.", accepted: ["keep it short and actionable"] },
      ],
      conversation: {
        goal: "Reescreva com o professor um e-mail prolixo em versão executiva de no máximo cinco linhas, começando pelo BLUF.",
        starter: "Here's a wordy email: 'I am writing in order to inform you that due to the fact that the supplier has experienced delays, at this point in time we are not in a position to...' Fix it.",
      },
      review: ["Corte: in order to → to; due to the fact that → because.", "BLUF: conclusão primeiro.", "Plain English, actionable."],
    }),

    buildLesson("c2-m2-l4", M, 4, {
      title: "Escrita criativa",
      objective: "Desenvolver voz e estilo em textos ficcionais curtos.",
      explanation: [
        {
          title: "Show, don't tell",
          body: "Em vez de dizer a emoção, mostre-a: **She was nervous.** → **She checked her phone for the third time in a minute, then put it face down.**",
        },
        {
          title: "Verbos fortes e detalhes concretos",
          body: "**walked slowly** → **trudged / ambled** · **said quietly** → **murmured** · **looked at** → **glanced / stared / peered**. Detalhes sensoriais específicos (cheiro de café queimado, o rangido da porta) dão vida.",
        },
        {
          title: "Ritmo",
          body: "Alterne frases longas e curtas. A curta, depois de uma longa, bate forte. **The rain had been falling for hours, soaking the streets and emptying the cafés one by one. Then it stopped.**",
        },
      ],
      vocabulary: [
        { en: "show, don't tell", pt: "mostre, não conte", say: "SHÔU dôunt TÉL" },
        { en: "trudge", pt: "arrastar-se (andando)", say: "TRÂDJ" },
        { en: "amble", pt: "andar devagar, passear", say: "ÉM-bol" },
        { en: "murmur", pt: "murmurar", say: "MÂR-mer" },
        { en: "glance", pt: "olhar de relance", say: "GLÉNS" },
        { en: "peer", pt: "espiar / olhar com esforço", say: "PÍR" },
        { en: "vivid", pt: "vívido", say: "VÍ-vid" },
        { en: "voice", pt: "voz (autoral)", say: "VÓIS" },
        { en: "creak", pt: "rangido / ranger", say: "CRÍIK" },
      ],
      examples: [
        { en: "He trudged home through the snow, his breath clouding in front of him.", pt: "Ele se arrastou até em casa pela neve, a respiração formando nuvens à sua frente." },
        { en: "She glanced at the door, then back at the letter.", pt: "Ela olhou de relance para a porta, depois de volta para a carta." },
        { en: "The house was silent. Then the floor creaked.", pt: "A casa estava em silêncio. Então o assoalho rangeu." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "writing", prompt: "Qual frase \"mostra\" em vez de \"contar\"?", options: ["He was angry.", "He slammed the door so hard the pictures shook."], answer: 1 },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["trudge", "arrastar-se"], ["murmur", "murmurar"], ["glance", "olhar de relance"], ["creak", "ranger"]] },
        { type: "fill_blank", skill: "vocabulary", sentence: "She ___ through the foggy window, trying to see outside. (espiou)", accepted: ["peered", "looked", "stared"] },
        { type: "multiple_choice", skill: "writing", prompt: "Efeito de uma frase curta depois de uma longa:", options: ["Impacto / ênfase.", "Confusão.", "Nenhum."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Então a porta rangeu.", accepted: ["Then the door creaked."] },
        { type: "word_order", skill: "writing", prompt: "Ele murmurou algo e saiu.", answer: "He murmured something and left.", distractors: ["said"] },
        { type: "listening", skill: "listening", prompt: "Ouça. Que emoção a cena mostra?", audio: "Her hands trembled as she opened the envelope, and she read the first line twice.", options: ["Nervosismo / ansiedade.", "Tédio.", "Raiva."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Then it stopped.", accepted: ["then it stopped"] },
      ],
      conversation: {
        goal: "Crie com o professor uma microficção de 5 a 6 frases: mostre a emoção, use verbos fortes e alterne o ritmo.",
        starter: "Let's write a very short story together. It starts with a phone ringing at 3 am. Your first sentence?",
      },
      review: ["Show, don't tell.", "Verbos fortes: trudge, murmur, glance, peer.", "Alterne frases longas e curtas."],
    }),

    buildLesson("c2-m2-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Escrita de alto nível",
      objective: "Comprovar escrita sofisticada em vários gêneros.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "fill_blank", skill: "writing", sentence: "This is not to say it's useless; ___, it's misused.", accepted: ["rather"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Falls flat\":", options: ["Não funciona", "Fica achatado", "É excelente"], answer: 0 },
        { type: "fill_blank", skill: "writing", sentence: "\"In the event that\" → \"___\"", accepted: ["if", "If"] },
        { type: "multiple_choice", skill: "writing", prompt: "Show, don't tell:", options: ["She was tired.", "She rubbed her eyes and yawned for the third time."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "O filme não correspondeu às expectativas.", accepted: ["The movie didn't live up to expectations.", "The movie failed to live up to expectations.", "The movie didn't live up to expectations.", "The movie failed to live up to expectations."] },
        { type: "word_order", skill: "writing", prompt: "O argumento se baseia num pressuposto frágil.", answer: "The argument rests on a weak assumption." },
        { type: "multiple_choice", skill: "writing", prompt: "BLUF = ", options: ["Bottom Line Up Front", "Big Letter Under Footnote"], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "For all its flaws, it's a genuinely thought-provoking book.", options: ["Apesar das falhas, é um livro instigante.", "É um livro sem falhas.", "É um livro chato."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Keep it concise.", accepted: ["keep it concise"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["scrutiny", "escrutínio"], ["wordy", "prolixo"], ["deftly", "habilmente"], ["vivid", "vívido"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
