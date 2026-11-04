import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "c1-m6";

export const c1Module6: Module = {
  id: M,
  level: "C1",
  order: 6,
  title: "Compreensão avançada",
  description: "Inferência em textos longos, palestras, fala rápida informal e literatura.",
  lessons: [
    buildLesson("c1-m6-l1", M, 1, {
      title: "Textos longos",
      objective: "Inferir sentidos implícitos e a atitude do autor.",
      explanation: [
        {
          title: "Ler nas entrelinhas",
          body: "A atitude do autor aparece nas escolhas: advérbios (**surprisingly, regrettably, admittedly**), adjetivos com carga (**so-called experts**, **a mere 2%**), aspas irônicas e o que ele omite. Pergunte: o autor apoia, critica ou é neutro?",
        },
        {
          title: "Palavras que revelam atitude",
          body: "**so-called** (suposto, com ironia) · **a mere / only** (minimiza) · **as many as** (enfatiza que é muito) · **purportedly / allegedly** (supostamente) · **needless to say** (desnecessário dizer) · **to be fair** (para ser justo).",
        },
      ],
      vocabulary: [
        { en: "infer", pt: "inferir", say: "in-FÂR" },
        { en: "imply", pt: "sugerir / insinuar", say: "im-PLÁI" },
        { en: "so-called", pt: "suposto / assim chamado", say: "SÔU-cóld" },
        { en: "a mere", pt: "um mero / apenas", say: "a MÍR" },
        { en: "as many as", pt: "até / nada menos que", say: "éz MÉ-ni éz" },
        { en: "allegedly", pt: "supostamente", say: "a-LÉ-djid-li" },
        { en: "regrettably", pt: "lamentavelmente", say: "ri-GRÉ-ta-bli" },
        { en: "tone", pt: "tom", say: "TÔUN" },
        { en: "skim / scan", pt: "ler por alto / procurar informação", say: "SKÍM / SKÉN" },
      ],
      examples: [
        { en: "The so-called experts failed to predict the crisis.", pt: "Os supostos especialistas não previram a crise. (crítica)" },
        { en: "As many as 3,000 people attended.", pt: "Nada menos que 3.000 pessoas compareceram. (ênfase: muito)" },
        { en: "A mere 5% of the budget goes to education.", pt: "Meros 5% do orçamento vão para a educação. (crítica: pouco)" },
      ],
      exercises: [
        { type: "multiple_choice", skill: "reading", prompt: "\"The so-called reform changed nothing.\" A atitude do autor é:", options: ["Crítica", "Elogiosa", "Neutra"], answer: 0 },
        { type: "multiple_choice", skill: "reading", prompt: "\"A mere 10% of voters turned up.\" O autor acha que 10% é:", options: ["Pouco", "Muito", "Normal"], answer: 0 },
        { type: "multiple_choice", skill: "reading", prompt: "\"As many as 500 jobs could be lost.\" O autor enfatiza que 500 é:", options: ["Muito", "Pouco"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "The minister ___ received bribes. (supostamente)", accepted: ["allegedly"] },
        { type: "multiple_choice", skill: "reading", prompt: "\"Regrettably, the museum will close.\" O autor:", options: ["Lamenta o fechamento.", "Comemora o fechamento.", "Não tem opinião."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "O que o autor está sugerindo?", accepted: ["What is the author implying?", "What is the author suggesting?", "What's the author implying?", "What's the author suggesting?"] },
        { type: "listening", skill: "listening", prompt: "Ouça. Qual é a atitude do falante?", audio: "To be fair, the new system has some advantages, but it's hardly the revolution they promised.", options: ["Reconhece vantagens, mas é cético.", "Totalmente entusiasmado.", "Totalmente contra, sem ressalvas."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Needless to say, it failed.", accepted: ["needless to say it failed"] },
      ],
      conversation: {
        goal: "O professor vai ler trechos de opinião. Identifique a atitude do autor e as palavras que a revelam.",
        starter: "Here's a line from an editorial: 'The government's so-called green plan allocates a mere 2% to renewables.' What's the author's view?",
      },
      review: ["Atitude aparece em advérbios, adjetivos e omissões.", "so-called, a mere, as many as, allegedly, to be fair.", "Pergunte: apoia, critica ou é neutro?"],
    }),

    buildLesson("c1-m6-l2", M, 2, {
      title: "Palestras",
      objective: "Acompanhar palestras, anotar e sintetizar.",
      explanation: [
        {
          title: "Sinais do palestrante",
          body: "Estrutura: **I'll be looking at three aspects...** · Ponto importante: **The crucial thing here is... / What I want you to take away is...** · Digressão: **As an aside,... / Incidentally,...** · Volta: **Coming back to my main point...** · Resumo: **So, to recap...**",
        },
        {
          title: "Anotação eficiente",
          body: "Não anote frases inteiras: use palavras-chave, setas (→ causa), símbolos (↑ aumento, ↓ queda, ≈ aproximadamente, ∴ portanto) e abreviações (e.g., i.e., vs., w/).",
        },
      ],
      vocabulary: [
        { en: "as an aside", pt: "abrindo um parênteses", say: "éz an a-SÁID" },
        { en: "incidentally", pt: "a propósito / aliás", say: "in-si-DÉN-ta-li" },
        { en: "crucial", pt: "crucial", say: "CRÚ-shal" },
        { en: "take away", pt: "levar (como lição)", say: "TÊIK a-UÊI" },
        { en: "aspect", pt: "aspecto", say: "ÉS-pekt" },
        { en: "i.e.", pt: "isto é", say: "ái-Í" },
        { en: "e.g.", pt: "por exemplo", say: "Í-DJÍ" },
        { en: "digress", pt: "fazer digressão", say: "dai-GRÉS" },
        { en: "synthesize", pt: "sintetizar", say: "SÍN-the-sáiz" },
      ],
      examples: [
        { en: "As an aside, this method was first used in the 1950s.", pt: "Abrindo um parênteses, este método foi usado pela primeira vez nos anos 1950." },
        { en: "What I want you to take away from today is this.", pt: "O que quero que vocês levem de hoje é isto." },
        { en: "Coming back to my main point, cost is not the problem.", pt: "Voltando ao meu ponto principal, o custo não é o problema." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "listening", prompt: "\"As an aside...\" indica:", options: ["Uma digressão (algo paralelo).", "O ponto principal.", "A conclusão."], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"i.e.\" significa:", options: ["isto é", "por exemplo", "etc."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "The ___ thing here is timing. (crucial)", accepted: ["crucial", "key", "important"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Coming ___ to my main point...", accepted: ["back"] },
        { type: "multiple_choice", skill: "listening", prompt: "Melhor anotação para \"Prices rose sharply because of the drought\":", options: ["drought → prices ↑↑", "Prices rose sharply because of the drought (frase inteira)", "chuva"], answer: 0 },
        { type: "translate", skill: "writing", prompt: "O que quero que vocês levem daqui é isto.", accepted: ["What I want you to take away is this.", "What I want you to take away from this is this."] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha o ponto principal.", audio: "There are many factors, but what I want you to take away is that sleep matters more than diet.", options: ["O sono importa mais que a dieta.", "A dieta é o fator principal.", "Há só um fator."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "So, to recap.", accepted: ["so to recap"] },
      ],
      conversation: {
        goal: "O professor dará uma mini-palestra de 2 minutos. Anote e depois sintetize em três pontos.",
        starter: "I'm going to give you a short lecture on why cities are getting hotter. Take notes, then summarize the three main points.",
      },
      review: ["Sinais: The crucial thing is / As an aside / Coming back to / To recap.", "Anote com palavras-chave, setas e símbolos.", "Sintetize em poucos pontos."],
    }),

    buildLesson("c1-m6-l3", M, 3, {
      title: "Fala rápida e informal",
      objective: "Entender contrações informais, gírias e fala nativa espontânea.",
      explanation: [
        {
          title: "Contrações informais",
          body: "**gonna, wanna, gotta, dunno, kinda, sorta, lemme (let me), gimme (give me), y'know, ain't** (isn't/haven't, muito informal), **innit** (britânico: isn't it), **y'all** (vocês, sul dos EUA).",
        },
        {
          title: "Gírias frequentes",
          body: "**I'm beat** (exausto) · **It's a rip-off** (roubo, caro demais) · **No biggie** (sem problema) · **I'm down** (topo) · **That's sick** (incrível, jovem) · **Spill the tea** (conta a fofoca) · **chill** (relaxado / relaxar) · **hang on** (espera).",
        },
      ],
      vocabulary: [
        { en: "kinda", pt: "meio / tipo (kind of)", say: "KÁIN-da" },
        { en: "lemme", pt: "deixa eu (let me)", say: "LÉ-mi" },
        { en: "gimme", pt: "me dá (give me)", say: "GUÍ-mi" },
        { en: "I'm beat", pt: "estou morto (cansado)", say: "áim BÍIT" },
        { en: "rip-off", pt: "roubo (preço abusivo)", say: "RÍP-óf" },
        { en: "no biggie", pt: "sem problema", say: "nôu BÍ-gui" },
        { en: "I'm down", pt: "topo / estou dentro", say: "áim DÁUN" },
        { en: "chill", pt: "tranquilo / relaxar", say: "TCHÍL" },
        { en: "innit", pt: "né? (britânico)", say: "Í-nit" },
      ],
      examples: [
        { en: "Lemme know if you're down for pizza later.", pt: "Me avisa se você topa pizza mais tarde." },
        { en: "Twenty bucks for a coffee? That's a total rip-off.", pt: "Vinte dólares num café? Que roubo." },
        { en: "I'm beat. I'm gonna crash early tonight.", pt: "Estou morto. Vou dormir cedo hoje." },
      ],
      exercises: [
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["I'm beat", "estou exausto"], ["rip-off", "preço abusivo"], ["no biggie", "sem problema"], ["I'm down", "topo"]] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Lemme grab my stuff. Gimme a sec.", options: ["Deixa eu pegar minhas coisas. Me dá um segundo.", "Me empresta suas coisas.", "Vamos embora agora."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "It's kinda pricey, but the food's sick.", options: ["Meio caro, mas a comida é incrível.", "Barato e ruim.", "A comida faz mal."], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Ain't\" é:", options: ["Muito informal (isn't/haven't).", "Formal.", "Erro de digitação."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Don't worry, it's no ___.", accepted: ["biggie", "problem", "big deal"] },
        { type: "translate", skill: "writing", prompt: "Estou exausto. (gíria)", accepted: ["I'm beat.", "I'm exhausted.", "I'm wiped out.", "I'm knackered."] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Num e-mail ao diretor, \"gonna\" é:", options: ["Inadequado: escreva going to.", "Perfeito.", "Obrigatório."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva por extenso (let me know).", audio: "Let me know.", accepted: ["let me know"] },
      ],
      conversation: {
        goal: "Converse com o professor como dois amigos jovens combinando um fim de semana, entendendo e usando gírias (com moderação).",
        starter: "Hey! You down for a road trip this weekend? It's kinda last-minute, I know.",
      },
      review: ["kinda, lemme, gimme, y'know, innit, ain't.", "beat, rip-off, no biggie, I'm down, chill.", "Entenda tudo; use com moderação e no contexto certo."],
    }),

    buildLesson("c1-m6-l4", M, 4, {
      title: "Literatura",
      objective: "Ler ficção autêntica percebendo estilo, ponto de vista e recursos narrativos.",
      explanation: [
        {
          title: "Ferramentas de leitura",
          body: "**narrator** (narrador) em 1ª ou 3ª pessoa · **unreliable narrator** (narrador não confiável) · **foreshadowing** (prenúncio) · **flashback** · **imagery** (imagens sensoriais) · **tone** (tom) e **mood** (clima).",
        },
        {
          title: "Linguagem literária",
          body: "Ficção usa vocabulário raro e inversões: **Down the stairs came the old man.** Verbos de movimento expressivos: **stagger** (cambalear), **creep** (andar furtivamente), **dash** (disparar). Dica: leia pelo sentido geral primeiro; dicionário só para palavras que se repetem.",
        },
      ],
      vocabulary: [
        { en: "narrator", pt: "narrador", say: "NÉ-rêi-ter" },
        { en: "foreshadowing", pt: "prenúncio", say: "fór-SHÉ-dou-ing" },
        { en: "imagery", pt: "imagens (descritivas)", say: "Í-mi-dje-ri" },
        { en: "mood", pt: "clima / atmosfera", say: "MÚUD" },
        { en: "stagger", pt: "cambalear", say: "STÉ-guer" },
        { en: "creep (crept)", pt: "andar furtivamente", say: "CRÍIP / CRÉPT" },
        { en: "dash", pt: "disparar / correr", say: "DÉSH" },
        { en: "whisper", pt: "sussurrar", say: "UÍS-per" },
        { en: "gaze", pt: "olhar fixo / fitar", say: "GUÊIZ" },
        { en: "plot twist", pt: "reviravolta", say: "PLÓT TUÍST" },
      ],
      examples: [
        { en: "She crept down the stairs, careful not to wake anyone.", pt: "Ela desceu as escadas sem fazer barulho, cuidando para não acordar ninguém." },
        { en: "The narrator seems honest, but he's hiding something.", pt: "O narrador parece honesto, mas está escondendo algo." },
        { en: "The dark sky in chapter one foreshadows the tragedy.", pt: "O céu escuro no capítulo um prenuncia a tragédia." },
      ],
      exercises: [
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["stagger", "cambalear"], ["creep", "andar furtivamente"], ["whisper", "sussurrar"], ["gaze", "olhar fixo"]] },
        { type: "multiple_choice", skill: "reading", prompt: "\"Unreliable narrator\" é:", options: ["Narrador em quem não se pode confiar totalmente.", "Narrador que some do livro.", "Narrador que é o autor."], answer: 0 },
        { type: "multiple_choice", skill: "reading", prompt: "\"Down the road came a stranger.\" Esta frase usa:", options: ["Inversão literária.", "Erro de gramática.", "Pergunta."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "The ___ of the story is dark and tense. (clima)", accepted: ["mood", "atmosphere", "tone"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "He ___ out of the room before anyone could stop him. (disparou)", accepted: ["dashed", "rushed", "ran"] },
        { type: "translate", skill: "writing", prompt: "O final tem uma reviravolta incrível.", accepted: ["The ending has an amazing plot twist.", "The ending has an incredible plot twist.", "The ending has an amazing twist."] },
        { type: "listening", skill: "listening", prompt: "Ouça o trecho e escolha o clima.", audio: "The house was silent. Somewhere upstairs, a door creaked slowly open.", options: ["Tenso / de suspense.", "Alegre.", "Romântico."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "She whispered his name.", accepted: ["she whispered his name"] },
      ],
      conversation: {
        goal: "Fale sobre um livro que você leu (em qualquer língua): narrador, clima, uma cena marcante e o que achou do final.",
        starter: "What's a book that stayed with you? Who tells the story, and what's the mood like?",
      },
      review: ["narrator, unreliable narrator, foreshadowing, imagery, mood.", "Verbos expressivos: creep, dash, stagger, whisper.", "Leia pelo sentido geral primeiro."],
    }),

    buildLesson("c1-m6-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Compreensão avançada",
      objective: "Comprovar compreensão de textos e falas complexas.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "multiple_choice", skill: "reading", prompt: "\"The so-called solution made things worse.\" O autor está:", options: ["Criticando", "Elogiando"], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"e.g.\":", options: ["por exemplo", "isto é"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "The director ___ took the money. (supostamente)", accepted: ["allegedly", "supposedly", "reportedly"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I'm beat. That hike was no joke.", options: ["Está exausto; a trilha foi pesada.", "Ganhou uma aposta.", "Achou a trilha engraçada."], answer: 0 },
        { type: "multiple_choice", skill: "listening", prompt: "\"Incidentally...\" indica:", options: ["Um comentário paralelo.", "A conclusão.", "Um acidente."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "O narrador não é confiável.", accepted: ["The narrator is unreliable.", "The narrator is not reliable.", "The narrator isn't reliable."] },
        { type: "word_order", skill: "grammar", prompt: "Nada menos que mil pessoas protestaram.", answer: "As many as a thousand people protested." },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha o ponto principal.", audio: "Incidentally, the building is beautiful, but the crucial thing is that it's unsafe.", options: ["O prédio não é seguro.", "O prédio é bonito.", "O prédio é novo."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "That's a total rip-off.", accepted: ["that's a total rip-off", "that is a total rip-off", "that's a total rip off"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["infer", "inferir"], ["mood", "clima"], ["foreshadowing", "prenúncio"], ["a mere", "um mero"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
