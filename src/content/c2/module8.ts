import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "c2-m8";

export const c2Module8: Module = {
  id: M,
  level: "C2",
  order: 8,
  title: "Projeto final",
  description: "Pesquisa, texto longo, apresentação oral e revisão integrada de todas as habilidades.",
  lessons: [
    buildLesson("c2-m8-l1", M, 1, {
      title: "Pesquisa",
      objective: "Pesquisar em inglês: buscar, avaliar e sintetizar fontes.",
      explanation: [
        {
          title: "Buscar como um pesquisador",
          body: "Use palavras-chave e sinônimos em inglês, operadores (**\"exact phrase\"**, **site:.edu**, **filetype:pdf**) e bases como Google Scholar. Leia primeiro o **abstract** e a **conclusion**; só depois o artigo inteiro.",
        },
        {
          title: "Avaliar e sintetizar",
          body: "Pergunte: quem publicou, quando, com que método, quem financiou? Sintetize por temas, não fonte a fonte: **While Smith and Lee agree that..., Patel offers a contrasting view...** · **Taken together, the literature suggests...** · **A gap in the literature is...** (lacuna)",
        },
      ],
      vocabulary: [
        { en: "literature review", pt: "revisão de literatura", say: "LÍ-te-ra-tcher ri-VIÚ" },
        { en: "abstract", pt: "resumo (de artigo)", say: "ÉB-strékt" },
        { en: "peer-reviewed", pt: "revisado por pares", say: "PÍR ri-VIÚD" },
        { en: "gap", pt: "lacuna", say: "GÉP" },
        { en: "methodology", pt: "metodologia", say: "me-tho-DÓ-lo-dji" },
        { en: "keyword", pt: "palavra-chave", say: "KÍI-uârd" },
        { en: "credible", pt: "confiável / crível", say: "CRÉ-di-bol" },
        { en: "synthesize", pt: "sintetizar", say: "SÍN-the-sáiz" },
        { en: "funding", pt: "financiamento", say: "FÂN-ding" },
      ],
      examples: [
        { en: "Start with peer-reviewed articles and read the abstract first.", pt: "Comece por artigos revisados por pares e leia o resumo primeiro." },
        { en: "Taken together, the literature suggests a clear trend.", pt: "Em conjunto, a literatura indica uma tendência clara." },
        { en: "One gap in the literature is the lack of data from Latin America.", pt: "Uma lacuna na literatura é a falta de dados da América Latina." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "reading", prompt: "Ao avaliar uma fonte, pergunte:", options: ["Quem publicou, quando, com que método e quem financiou.", "Só se o título é bonito.", "Se tem muitas imagens."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Read the ___ first to see if the article is relevant. (resumo)", accepted: ["abstract", "summary"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "There is a ___ in the literature on this topic. (lacuna)", accepted: ["gap"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Peer-reviewed\":", options: ["Revisado por especialistas da área.", "Escrito por amigos.", "Publicado em rede social."], answer: 0 },
        { type: "multiple_choice", skill: "writing", prompt: "Síntese melhor:", options: ["Smith says X. Lee says Y. Patel says Z.", "While Smith and Lee agree on X, Patel challenges this view."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Em conjunto, os estudos indicam um aumento.", accepted: ["Taken together, the studies suggest an increase.", "Taken together, the studies indicate an increase.", "Together, the studies suggest an increase."] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Is the source credible?", accepted: ["is the source credible"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "The study was funded by the same company that sells the product, so treat the results with caution.", options: ["O estudo foi financiado pela empresa interessada: cautela.", "O estudo é independente.", "Não há financiamento."], answer: 0 },
      ],
      conversation: {
        goal: "Escolha um tema do seu interesse para o projeto final e planeje a pesquisa com o professor: perguntas, palavras-chave e fontes.",
        starter: "Let's plan your final project. What topic would you like to research, and what's your main question?",
      },
      review: ["Abstract e conclusão primeiro; fontes revisadas por pares.", "Avaliar: autor, data, método, financiamento.", "Sintetizar por temas: Taken together / A gap in the literature."],
    }),

    buildLesson("c2-m8-l2", M, 2, {
      title: "Produção escrita",
      objective: "Planejar, escrever e revisar um texto longo.",
      explanation: [
        {
          title: "Processo",
          body: "1) **Outline** (esqueleto com tese e tópicos). 2) **Rascunho** rápido, sem parar para corrigir. 3) **Revisão de conteúdo**: a tese está clara? cada parágrafo a sustenta? 4) **Revisão de estilo**: coesão, concisão, registro. 5) **Proofreading**: erros fossilizados, pontuação, ortografia.",
        },
        {
          title: "Checklist final",
          body: "Tese em uma frase? Frases-tópico? Transições? Hedging onde há incerteza? Sem repetição? Sem contrações (se formal)? Conclusão que não repete, mas amplia? Título informativo?",
        },
      ],
      vocabulary: [
        { en: "outline", pt: "esboço / estrutura", say: "ÁUT-láin" },
        { en: "draft", pt: "rascunho", say: "DRÉFT" },
        { en: "revise", pt: "revisar (conteúdo)", say: "ri-VÁIZ" },
        { en: "proofread", pt: "revisar (erros)", say: "PRÚUF-ríid" },
        { en: "topic sentence", pt: "frase-tópico", say: "TÓ-pik SÉN-tens" },
        { en: "transition", pt: "transição", say: "trén-ZÍ-shan" },
        { en: "word count", pt: "contagem de palavras", say: "UÊRD CÁUNT" },
        { en: "polish", pt: "polir / lapidar", say: "PÓ-lish" },
      ],
      examples: [
        { en: "Write a quick first draft, then revise it twice.", pt: "Escreva um primeiro rascunho rápido e depois revise duas vezes." },
        { en: "Each paragraph needs a clear topic sentence.", pt: "Cada parágrafo precisa de uma frase-tópico clara." },
        { en: "Leave a day before you proofread and polish the text.", pt: "Deixe passar um dia antes de revisar e lapidar o texto." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "writing", prompt: "Ordem do processo:", options: ["Outline → draft → revise → proofread", "Proofread → draft → outline", "Draft → publish"], answer: 0 },
        { type: "multiple_choice", skill: "writing", prompt: "\"Revise\" × \"proofread\": corrigir vírgulas e ortografia é", options: ["proofread", "revise"], answer: 0 },
        { type: "fill_blank", skill: "writing", sentence: "Start with an ___ of your main points. (esboço)", accepted: ["outline"] },
        { type: "fill_blank", skill: "writing", sentence: "My first ___ was too long. (rascunho)", accepted: ["draft"] },
        { type: "multiple_choice", skill: "writing", prompt: "Uma boa conclusão:", options: ["Repete a introdução palavra por palavra.", "Retoma a tese e amplia as implicações."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "Preciso polir o texto antes de enviar.", accepted: ["I need to polish the text before sending it.", "I need to polish the text before I send it.", "I need to polish the text before submitting it."] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Each paragraph needs a topic sentence.", accepted: ["each paragraph needs a topic sentence"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Don't edit while you draft. Get the ideas down first, then revise.", options: ["Escreva as ideias primeiro e revise depois.", "Corrija cada frase enquanto escreve.", "Não revise nunca."], answer: 0 },
      ],
      conversation: {
        goal: "Monte com o professor o outline completo do seu texto final (tese, 4 parágrafos com frase-tópico e conclusão) e escreva oralmente a introdução.",
        starter: "Let's build your outline. What's your thesis in one sentence?",
      },
      review: ["Outline → rascunho → revisão de conteúdo → estilo → proofreading.", "Tese clara, frases-tópico, transições.", "Conclusão amplia, não repete."],
    }),

    buildLesson("c2-m8-l3", M, 3, {
      title: "Apresentação oral",
      objective: "Apresentar por 10 minutos sem roteiro e responder perguntas.",
      explanation: [
        {
          title: "Sem roteiro, com estrutura",
          body: "Não decore o texto: decore a **estrutura** (abertura, 3 pontos, fechamento) e os **dados-chave**. Use cartões com palavras-chave. Ensaie em voz alta pelo menos três vezes, cronometrando.",
        },
        {
          title: "Perguntas difíceis",
          body: "**That's a great question. Let me make sure I understand: you're asking...** · **I don't have that figure to hand, but I'll follow up.** · **That's slightly outside the scope of today's talk, but briefly...** · Nunca invente: credibilidade é tudo.",
        },
      ],
      vocabulary: [
        { en: "rehearse", pt: "ensaiar", say: "ri-RÂRS" },
        { en: "cue cards", pt: "cartões de apoio", say: "KIÚ CÁRDZ" },
        { en: "to hand", pt: "à mão / disponível", say: "tu RÉND" },
        { en: "scope", pt: "escopo / alcance", say: "SKÔUP" },
        { en: "Q&A", pt: "perguntas e respostas", say: "KIÚ én ÊI" },
        { en: "eye contact", pt: "contato visual", say: "ÁI CÓN-tékt" },
        { en: "pace", pt: "ritmo / velocidade", say: "PÊIS" },
        { en: "wrap up", pt: "encerrar", say: "RÉP ÂP" },
      ],
      examples: [
        { en: "I rehearsed the talk five times with a timer.", pt: "Ensaiei a palestra cinco vezes com cronômetro." },
        { en: "I don't have that figure to hand, but I'll send it to you.", pt: "Não tenho esse número à mão, mas te envio." },
        { en: "That's slightly outside the scope of today's talk.", pt: "Isso foge um pouco do escopo da palestra de hoje." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Para falar sem roteiro, memorize:", options: ["A estrutura e os dados-chave.", "O texto palavra por palavra.", "Nada."], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Pergunta cuja resposta você não sabe:", options: ["Invente um número.", "I don't have that figure to hand, but I'll follow up."], answer: 1 },
        { type: "fill_blank", skill: "vocabulary", sentence: "I ___ the presentation three times. (ensaiei)", accepted: ["rehearsed", "practiced", "practised"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "That's outside the ___ of this talk. (escopo)", accepted: ["scope"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Q&A\":", options: ["Sessão de perguntas e respostas.", "Controle de qualidade.", "Questionário anual."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Deixa eu confirmar se entendi a pergunta.", accepted: ["Let me make sure I understand the question.", "Let me make sure I've understood the question.", "Let me check I understand the question."] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Let's wrap up with a few questions.", accepted: ["let's wrap up with a few questions", "let us wrap up with a few questions"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Slow down your pace and keep eye contact with the audience.", options: ["Fale mais devagar e mantenha contato visual.", "Fale mais rápido e leia os slides.", "Não olhe para o público."], answer: 0 },
      ],
      conversation: {
        goal: "Apresente seu projeto final ao professor por cerca de 5 minutos (sem ler) e responda a três perguntas difíceis.",
        starter: "The stage is yours. Present your final project, and be ready for some tough questions at the end.",
      },
      review: ["Memorize a estrutura, não o texto.", "Ensaie em voz alta com cronômetro.", "Perguntas: confirme, responda ou prometa retorno; nunca invente."],
    }),

    buildLesson("c2-m8-l4", M, 4, {
      title: "Revisão integrada",
      objective: "Integrar todas as habilidades e planejar a manutenção do inglês.",
      explanation: [
        {
          title: "Manter o nível",
          body: "Proficiência se perde sem uso. Rotina mínima: **ler** algo longo em inglês por semana, **ouvir** podcasts ou séries sem legenda, **falar** em conversas reais (ou com o professor do app), **escrever** algo por semana e **revisar** seu error log.",
        },
        {
          title: "Próximos passos",
          body: "Escolha um objetivo concreto: certificação (CPE/IELTS), um curso ou mestrado em inglês, trabalho internacional, ensinar alguém. **Teaching is the best way to learn.** Use o que aprendeu: o aprendizado só é seu quando você o usa.",
        },
      ],
      vocabulary: [
        { en: "proficiency", pt: "proficiência", say: "pro-FÍ-shen-si" },
        { en: "maintain", pt: "manter", say: "mein-TÊIN" },
        { en: "routine", pt: "rotina", say: "ru-TÍIN" },
        { en: "milestone", pt: "marco", say: "MÁIL-stôun" },
        { en: "lifelong learning", pt: "aprendizado ao longo da vida", say: "LÁIF-lóng LÂR-ning" },
        { en: "immersion", pt: "imersão", say: "i-MÂR-jan" },
        { en: "consistency", pt: "constância", say: "con-SÍS-ten-si" },
        { en: "rusty", pt: "enferrujado", say: "RÂS-ti" },
      ],
      examples: [
        { en: "Consistency matters more than intensity.", pt: "Constância importa mais que intensidade." },
        { en: "If you stop practicing, your English gets rusty.", pt: "Se você para de praticar, seu inglês enferruja." },
        { en: "Reaching C2 is a milestone, not the finish line.", pt: "Chegar ao C2 é um marco, não a linha de chegada." },
      ],
      exercises: [
        { type: "fill_blank", skill: "vocabulary", sentence: "My English got a bit ___ during the holidays. (enferrujado)", accepted: ["rusty"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "___ matters more than intensity. (constância)", accepted: ["Consistency"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Lifelong learning\":", options: ["Aprendizado ao longo da vida.", "Aprendizado rápido.", "Curso de longa duração."], answer: 0 },
        { type: "multiple_choice", skill: "grammar", prompt: "Revisão: correta?", options: ["Had I known, I'd have come.", "If I would have known, I'd have come."], answer: 0 },
        { type: "multiple_choice", skill: "grammar", prompt: "Revisão: correta?", options: ["It is vital that he be informed.", "It is vital that he is informing."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Chegar ao C2 é um marco, não o fim.", accepted: ["Reaching C2 is a milestone, not the end.", "Reaching C2 is a milestone, not the finish line.", "Getting to C2 is a milestone, not the end."] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Teaching is the best way to learn.", accepted: ["teaching is the best way to learn"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Read, listen, speak and write every week, and keep reviewing your error log.", options: ["Praticar as quatro habilidades toda semana e revisar o diário de erros.", "Estudar só gramática.", "Parar depois do C2."], answer: 0 },
      ],
      conversation: {
        goal: "Faça uma conversa de encerramento com o professor: o que você conquistou, o que ainda quer melhorar e seu plano para manter o inglês.",
        starter: "You've come a long way. Looking back, what's changed in your English, and what's your plan from here?",
      },
      review: ["Rotina semanal com as quatro habilidades + error log.", "Objetivo concreto: certificação, estudo, trabalho, ensinar.", "C2 é um marco, não a linha de chegada."],
    }),

    buildLesson("c2-m8-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Projeto final",
      objective: "Comprovar autonomia em pesquisa, escrita e apresentação.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar a avaliação final do C2." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Abstract\" (artigo):", options: ["Resumo", "Abstrato"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "There's a clear ___ in the literature. (lacuna)", accepted: ["gap"] },
        { type: "multiple_choice", skill: "writing", prompt: "Ordem do processo de escrita:", options: ["outline, draft, revise, proofread", "proofread, outline, draft"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "I don't have the figure to ___. I'll send it later.", accepted: ["hand"] },
        { type: "translate", skill: "writing", prompt: "Ensaiei três vezes.", accepted: ["I rehearsed three times.", "I practiced three times.", "I practised three times.", "I rehearsed it three times."] },
        { type: "word_order", skill: "grammar", prompt: "Constância importa mais que intensidade.", answer: "Consistency matters more than intensity." },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Peer-reviewed\":", options: ["Revisado por especialistas", "Revisado por amigos"], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "That's slightly outside the scope of today's talk, but I'm happy to discuss it afterwards.", options: ["Foge do tema, mas pode conversar depois.", "Não vai responder nunca.", "É o tema principal."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Write a quick first draft.", accepted: ["write a quick first draft"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["draft", "rascunho"], ["rehearse", "ensaiar"], ["rusty", "enferrujado"], ["funding", "financiamento"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
