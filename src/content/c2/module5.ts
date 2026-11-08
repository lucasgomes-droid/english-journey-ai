import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "c2-m5";

export const c2Module5: Module = {
  id: M,
  level: "C2",
  order: 5,
  title: "Compreensão total",
  description: "Análise literária, textos acadêmicos densos, mídia sem legendas e subtexto.",
  lessons: [
    buildLesson("c2-m5-l1", M, 1, {
      title: "Textos literários",
      objective: "Analisar estilo e escolhas do autor em textos literários.",
      explanation: [
        {
          title: "Vocabulário de análise",
          body: "**The author employs...** (emprega) · **The imagery evokes...** (evoca) · **The tone shifts from... to...** · **The juxtaposition of X and Y highlights...** · **This passage foreshadows...** · **The ambiguity invites multiple readings.**",
        },
        {
          title: "Recursos",
          body: "**alliteration** (aliteração) · **irony** · **metaphor / simile** (metáfora / comparação com like/as) · **free indirect speech** (discurso indireto livre) · **stream of consciousness** (fluxo de consciência).",
        },
      ],
      vocabulary: [
        { en: "employ", pt: "empregar / usar", say: "em-PLÓI" },
        { en: "evoke", pt: "evocar", say: "i-VÔUK" },
        { en: "shift", pt: "mudança / mudar", say: "SHÍFT" },
        { en: "simile", pt: "comparação (símile)", say: "SÍ-mi-li" },
        { en: "alliteration", pt: "aliteração", say: "a-li-te-RÊI-shan" },
        { en: "ambiguity", pt: "ambiguidade", say: "ém-bi-GUIÚ-i-ti" },
        { en: "stream of consciousness", pt: "fluxo de consciência", say: "STRÍIM ov CÓN-shâs-nes" },
        { en: "passage", pt: "trecho", say: "PÉ-sidj" },
        { en: "highlight", pt: "destacar", say: "RÁI-láit" },
      ],
      examples: [
        { en: "The author employs short sentences to create tension.", pt: "O autor emprega frases curtas para criar tensão." },
        { en: "The imagery of the empty house evokes loneliness.", pt: "A imagem da casa vazia evoca solidão." },
        { en: "The tone shifts from playful to menacing in the final paragraph.", pt: "O tom muda de brincalhão para ameaçador no último parágrafo." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "reading", prompt: "\"Her smile was like the sun.\" É um(a):", options: ["simile", "alliteration", "irony"], answer: 0 },
        { type: "multiple_choice", skill: "reading", prompt: "\"Peter Piper picked a peck...\" usa:", options: ["alliteration", "simile", "foreshadowing"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "The description ___ a sense of nostalgia. (evoca)", accepted: ["evokes", "creates", "conveys"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "The tone ___ from hopeful to bitter.", accepted: ["shifts", "changes", "moves"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"The ambiguity invites multiple readings.\"", options: ["A ambiguidade permite várias interpretações.", "O texto é muito claro.", "O livro tem muitos leitores."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "O autor usa ironia para criticar a sociedade.", accepted: ["The author uses irony to criticize society.", "The author employs irony to criticize society.", "The author uses irony to criticize society.", "The author employs irony to criticize society."] },
        { type: "listening", skill: "listening", prompt: "Ouça o trecho e escolha o recurso.", audio: "My thoughts raced: the keys, the door, had I locked it, Mother would be furious, the bus, the bus was late again.", options: ["Fluxo de consciência.", "Aliteração.", "Comparação."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "The passage foreshadows the ending.", accepted: ["the passage foreshadows the ending"] },
      ],
      conversation: {
        goal: "Analise com o professor um trecho literário curto (que ele lerá): tom, imagens, recursos e efeito sobre o leitor.",
        starter: "Listen: 'The town was dying quietly, the way old men do, without complaint.' Analyze this sentence with me.",
      },
      review: ["employ, evoke, the tone shifts, juxtaposition.", "simile, alliteration, irony, stream of consciousness.", "Ambiguidade permite múltiplas leituras."],
    }),

    buildLesson("c2-m5-l2", M, 2, {
      title: "Textos acadêmicos densos",
      objective: "Extrair argumentos implícitos de textos de pesquisa.",
      explanation: [
        {
          title: "Desmontar frases densas",
          body: "Ache o núcleo: sujeito + verbo principal. **The increasing reliance of policymakers on algorithmically generated risk assessments raises concerns.** → núcleo: **reliance raises concerns**.",
        },
        {
          title: "Pistas do argumento",
          body: "**Contrary to previous assumptions,...** (contra o consenso) · **This finding challenges...** · **Notwithstanding these limitations,...** (apesar dessas limitações) · **These results lend support to...** (reforçam) · **remains contested** (continua controverso).",
        },
      ],
      vocabulary: [
        { en: "notwithstanding", pt: "não obstante / apesar de", say: "nót-uidh-STÉN-ding" },
        { en: "lend support to", pt: "reforçar", say: "LÉND sa-PÓRT tu" },
        { en: "contested", pt: "contestado / controverso", say: "con-TÉS-tid" },
        { en: "challenge", pt: "desafiar / questionar", say: "TCHÉ-lendj" },
        { en: "reliance on", pt: "dependência de", say: "ri-LÁI-ans on" },
        { en: "hypothesis", pt: "hipótese", say: "rai-PÓ-the-sis" },
        { en: "robust", pt: "robusto / sólido", say: "rou-BÂST" },
        { en: "caveat", pt: "ressalva", say: "KÉ-vi-ét" },
        { en: "underpin", pt: "sustentar / fundamentar", say: "ân-der-PÍN" },
      ],
      examples: [
        { en: "Notwithstanding these limitations, the findings are robust.", pt: "Apesar dessas limitações, os resultados são sólidos." },
        { en: "These results lend support to the original hypothesis.", pt: "Esses resultados reforçam a hipótese original." },
        { en: "Contrary to previous assumptions, the effect was negligible.", pt: "Ao contrário do que se supunha, o efeito foi desprezível." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "reading", prompt: "Núcleo de \"The rapid growth of informal employment in urban areas complicates policy design.\"", options: ["growth complicates design", "areas complicates policy", "employment urban design"], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Notwithstanding\":", options: ["Apesar de / não obstante", "Por causa de", "Além de"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "These data lend ___ to our hypothesis.", accepted: ["support", "weight"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "The issue remains highly ___. (controverso)", accepted: ["contested", "controversial", "debated"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"One caveat is that the sample was small.\"", options: ["Uma ressalva é que a amostra era pequena.", "Uma vantagem é que a amostra era pequena.", "A amostra foi perfeita."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Esse resultado questiona a teoria dominante.", accepted: ["This finding challenges the dominant theory.", "This result challenges the dominant theory.", "This finding challenges the prevailing theory."] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Contrary to previous assumptions, screen time had no measurable effect on sleep in adults.", options: ["Ao contrário do que se pensava, tela não afetou o sono dos adultos.", "Tela piora muito o sono.", "O estudo foi com crianças."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "The findings are robust.", accepted: ["the findings are robust"] },
      ],
      conversation: {
        goal: "O professor lê um resumo de artigo científico denso. Explique em linguagem simples o que foi descoberto, as ressalvas e o que isso implica.",
        starter: "Abstract: 'Notwithstanding methodological caveats, these findings lend support to the hypothesis that bilingualism delays cognitive decline.' Explain it to a friend.",
      },
      review: ["Ache o núcleo: sujeito + verbo.", "notwithstanding, lend support to, challenge, contested, caveat.", "Contrary to previous assumptions..."],
    }),

    buildLesson("c2-m5-l3", M, 3, {
      title: "Mídia sem legendas",
      objective: "Entender fala sobreposta, sotaques e referências rápidas.",
      explanation: [
        {
          title: "Estratégias",
          body: "Não lute por cada palavra: siga **quem fala, sobre o quê e com que atitude**. Use o contexto visual e as palavras-chave. Fala sobreposta: foque em quem tem a palavra. Assistir sem legenda (ou com legenda em inglês) é o treino final.",
        },
        {
          title: "Fenômenos da fala espontânea",
          body: "**False starts** (começos interrompidos: \"I was— well, we were...\") · **trailing off** (deixar a frase no ar) · **backchanneling** (\"mm-hmm, yeah, right\") · **filler** (\"like, you know\") · **overlapping** (falar junto).",
        },
      ],
      vocabulary: [
        { en: "overlap", pt: "sobrepor(-se)", say: "ou-ver-LÉP" },
        { en: "false start", pt: "começo interrompido", say: "FÓLS STÁRT" },
        { en: "trail off", pt: "deixar a frase no ar", say: "TRÊIL ÓF" },
        { en: "backchannel", pt: "sinais de escuta (mm-hmm)", say: "BÉK-tché-nol" },
        { en: "gist", pt: "ideia geral", say: "DJÍST" },
        { en: "mumble", pt: "falar enrolado", say: "MÂM-bol" },
        { en: "subtitles", pt: "legendas", say: "SÂB-tái-tolz" },
        { en: "pick up on", pt: "perceber / captar", say: "PÍK ÂP on" },
      ],
      examples: [
        { en: "I didn't catch every word, but I got the gist.", pt: "Não peguei cada palavra, mas entendi a ideia geral." },
        { en: "She trailed off, as if she'd changed her mind.", pt: "Ela deixou a frase no ar, como se tivesse mudado de ideia." },
        { en: "Did you pick up on the sarcasm in his voice?", pt: "Você percebeu o sarcasmo na voz dele?" },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"I got the gist.\"", options: ["Entendi a ideia geral.", "Ganhei um presente.", "Peguei tudo, palavra por palavra."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Try watching without ___. (legendas)", accepted: ["subtitles", "captions"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Did you pick up ___ the tension between them?", accepted: ["on"] },
        { type: "multiple_choice", skill: "listening", prompt: "\"I was— well, actually, we were going to...\" é um exemplo de:", options: ["False start.", "Alliteration.", "Simile."], answer: 0 },
        { type: "multiple_choice", skill: "listening", prompt: "\"Mm-hmm, yeah, right\" enquanto o outro fala é:", options: ["Backchanneling (sinais de que está ouvindo).", "Interrupção agressiva.", "Discordância."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha a ideia geral.", audio: "So I was like, no way, and she was like, way, and then, I mean, we just, you know, left.", options: ["Discordaram de algo e acabaram indo embora.", "Fecharam um negócio.", "Brigaram fisicamente."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I mean, if you think about it... well, never mind.", options: ["A pessoa deixa a frase no ar e desiste.", "Conclui um argumento claro.", "Faz uma pergunta."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "I got the gist.", accepted: ["i got the gist"] },
      ],
      conversation: {
        goal: "O professor fala rápido, com começos interrompidos e frases no ar. Resuma a ideia geral e a atitude de quem fala.",
        starter: "So, yesterday, right, I was— well, we were supposed to— anyway, long story short, the whole thing just, you know, fell apart. Get it?",
      },
      review: ["Siga quem, o quê e com que atitude.", "false start, trail off, backchannel, overlap.", "get the gist / pick up on."],
    }),

    buildLesson("c2-m5-l4", M, 4, {
      title: "Ironia e subtexto",
      objective: "Captar o não dito: implicaturas, eufemismos e subtexto.",
      explanation: [
        {
          title: "Implicatura",
          body: "O que se quer dizer além das palavras. **A: Is the new guy any good? B: Well, he's always on time.** (Implica: não tem muito mais a elogiar.) **\"It's an interesting choice\"** muitas vezes = não gostei.",
        },
        {
          title: "Eufemismos corporativos e sociais",
          body: "**let go** (demitido) · **between jobs** (desempregado) · **economical with the truth** (mentindo) · **tired and emotional** (bêbado, humor britânico) · **with all due respect** (prepare-se para discordância) · **I hear what you're saying** (não concordo).",
        },
      ],
      vocabulary: [
        { en: "subtext", pt: "subtexto", say: "SÂB-tekst" },
        { en: "implicature", pt: "implicatura", say: "ím-pli-KÉ-tchur" },
        { en: "euphemism", pt: "eufemismo", say: "IÚ-fe-mizm" },
        { en: "let go", pt: "demitido (eufemismo)", say: "LÉT GÔU" },
        { en: "between jobs", pt: "desempregado (eufemismo)", say: "bi-TUÍIN DJÓBZ" },
        { en: "economical with the truth", pt: "mentindo (eufemismo)", say: "i-ko-NÓ-mi-col uidh dhe TRÚTH" },
        { en: "read between the lines", pt: "ler nas entrelinhas", say: "RÍID bi-TUÍIN dhe LÁINZ" },
        { en: "loaded", pt: "carregado de intenção", say: "LÔU-did" },
      ],
      examples: [
        { en: "When he said 'interesting choice', he meant he hated it.", pt: "Quando ele disse 'escolha interessante', quis dizer que odiou." },
        { en: "The minister was economical with the truth.", pt: "O ministro foi econômico com a verdade (mentiu)." },
        { en: "Read between the lines: they're not happy.", pt: "Leia nas entrelinhas: eles não estão contentes." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "reading", prompt: "\"Is she a good manager?\" — \"She has a lovely handwriting.\" O que se implica?", options: ["Não há muito o que elogiar como gestora.", "Ela é excelente gestora.", "Ela escreve à mão."], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"He was let go last month.\"", options: ["Foi demitido.", "Saiu de férias.", "Foi promovido."], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"I hear what you're saying\" muitas vezes significa:", options: ["Entendo, mas não concordo.", "Concordo totalmente.", "Não estou ouvindo bem."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "You need to read between the ___.", accepted: ["lines"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "He's currently between ___. (desempregado, eufemismo)", accepted: ["jobs"] },
        { type: "translate", skill: "writing", prompt: "Qual é o subtexto aqui?", accepted: ["What's the subtext here?", "What is the subtext here?"] },
        { type: "listening", skill: "listening", prompt: "Ouça. O que a pessoa realmente quer dizer?", audio: "Well, it's certainly a bold choice of color for the office.", options: ["Provavelmente não gostou da cor.", "Adorou a cor.", "Não reparou na cor."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "That's an interesting choice.", accepted: ["that's an interesting choice", "that is an interesting choice"] },
      ],
      conversation: {
        goal: "O professor fala só com eufemismos e indiretas. Decifre o que ele realmente quer dizer em cada frase.",
        starter: "So, about your presentation... it was certainly memorable. Very... brave. I hear what the client was saying, though.",
      },
      review: ["Implicatura: o que se quer dizer além das palavras.", "let go, between jobs, economical with the truth.", "'Interesting choice' / 'I hear what you're saying'."],
    }),

    buildLesson("c2-m5-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Compreensão total",
      objective: "Comprovar compreensão de nível nativo culto.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "multiple_choice", skill: "reading", prompt: "\"As brave as a lion\" é:", options: ["simile", "alliteration"], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Caveat\":", options: ["Ressalva", "Caverna", "Cuidado com o cão"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "___ these limitations, the study is valuable. (apesar de)", accepted: ["Notwithstanding", "Despite"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "I didn't understand everything, but I got the ___.", accepted: ["gist"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Economical with the truth\":", options: ["Mentindo", "Muito honesto", "Pão-duro"], answer: 0 },
        { type: "translate", skill: "writing", prompt: "O tom muda no último capítulo.", accepted: ["The tone shifts in the last chapter.", "The tone changes in the last chapter.", "The tone shifts in the final chapter.", "The tone changes in the final chapter."] },
        { type: "word_order", skill: "grammar", prompt: "Esses resultados reforçam a hipótese.", answer: "These results lend support to the hypothesis." },
        { type: "listening", skill: "listening", prompt: "Ouça. Qual é o subtexto?", audio: "Is the food good there? Well, the view is spectacular.", options: ["A comida provavelmente não é boa.", "A comida é ótima.", "Não há vista."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Read between the lines.", accepted: ["read between the lines"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["evoke", "evocar"], ["robust", "sólido"], ["trail off", "deixar a frase no ar"], ["euphemism", "eufemismo"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
