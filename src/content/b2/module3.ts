import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "b2-m3";

export const b2Module3: Module = {
  id: M,
  level: "B2",
  order: 3,
  title: "Argumentação",
  description: "Ensaio argumentativo, conectivos avançados, linguagem cautelosa e debates.",
  lessons: [
    buildLesson("b2-m3-l1", M, 1, {
      title: "Ensaio argumentativo",
      objective: "Estruturar um texto B2: tese, argumentos, contra-argumento e conclusão.",
      explanation: [
        {
          title: "Estrutura em quatro partes",
          body: "1) **Introdução**: contexto + tese (**This essay will argue that...**). 2) **Argumento 1** com exemplo. 3) **Argumento 2** com exemplo. 4) **Contra-argumento + refutação** (**Some people claim that... However,...**). 5) **Conclusão**: retome a tese com outras palavras (**In conclusion, ...**).",
        },
        {
          title: "Frases de tópico",
          body: "Cada parágrafo abre com uma frase que resume a ideia: **One of the main advantages of remote work is flexibility.** O resto do parágrafo explica e dá exemplo.",
        },
        {
          title: "Registro",
          body: "Evite contrações (it is, do not), gírias e \"I think\" repetido. Prefira **It could be argued that...**, **There is no doubt that...**",
        },
      ],
      vocabulary: [
        { en: "thesis", pt: "tese", say: "THÍI-sis" },
        { en: "claim", pt: "afirmar / alegação", say: "CLÊIM" },
        { en: "evidence", pt: "evidência", say: "É-vi-dens" },
        { en: "counter-argument", pt: "contra-argumento", say: "CÁUN-ter ÁR-giu-ment" },
        { en: "refute", pt: "refutar", say: "ri-FIÚT" },
        { en: "drawback", pt: "desvantagem", say: "DRÓ-bék" },
        { en: "benefit", pt: "benefício", say: "BÉ-ne-fit" },
        { en: "in conclusion", pt: "em conclusão", say: "in con-CLÚ-jan" },
        { en: "it could be argued", pt: "pode-se argumentar", say: "it cud bi ÁR-giud" },
      ],
      examples: [
        { en: "This essay will argue that public transport should be free.", pt: "Este ensaio vai defender que o transporte público deveria ser gratuito." },
        { en: "Some people claim that it is too expensive. However, the evidence suggests otherwise.", pt: "Alguns afirmam que é caro demais. No entanto, as evidências sugerem o contrário." },
        { en: "In conclusion, the benefits clearly outweigh the drawbacks.", pt: "Em conclusão, os benefícios claramente superam as desvantagens." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "writing", prompt: "Qual frase é mais adequada para um ensaio formal?", options: ["I think social media is kinda bad.", "It could be argued that social media has a negative impact on teenagers.", "Social media is, like, terrible."], answer: 1 },
        { type: "multiple_choice", skill: "writing", prompt: "Onde vai o contra-argumento?", options: ["Na introdução, antes da tese.", "Num parágrafo próprio, seguido de refutação.", "Não se usa contra-argumento."], answer: 1 },
        { type: "fill_blank", skill: "vocabulary", sentence: "The benefits clearly ___ the drawbacks. (superam)", accepted: ["outweigh"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Some people ___ that it is a waste of money. (afirmam)", accepted: ["claim", "argue"] },
        { type: "translate", skill: "writing", prompt: "As evidências sugerem o contrário.", accepted: ["The evidence suggests otherwise.", "Evidence suggests otherwise.", "The evidence suggests the opposite."] },
        { type: "word_order", skill: "writing", prompt: "Uma das principais desvantagens é o custo.", answer: "One of the main drawbacks is the cost.", distractors: ["benefit"] },
        { type: "listening", skill: "listening", prompt: "Ouça. Que parte do ensaio é esta?", audio: "Opponents of the policy claim that it would harm small businesses. However, this concern is largely unfounded.", options: ["Contra-argumento e refutação.", "Introdução.", "Conclusão."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "This essay will argue that it is necessary.", accepted: ["this essay will argue that it is necessary"] },
      ],
      conversation: {
        goal: "Planeje oralmente com o professor um ensaio sobre um tema polêmico: tese, dois argumentos, um contra-argumento e conclusão.",
        starter: "Let's plan an essay: 'Should university education be free?' What's your thesis?",
      },
      review: ["Introdução com tese → argumentos → contra-argumento + refutação → conclusão.", "Frase de tópico em cada parágrafo.", "Registro formal: sem contrações e gírias."],
    }),

    buildLesson("b2-m3-l2", M, 2, {
      title: "Conectivos avançados",
      objective: "Ligar ideias complexas com precisão.",
      explanation: [
        {
          title: "Contraste",
          body: "**although / even though** + frase · **despite / in spite of** + substantivo ou -ing: **Despite the rain, we went out.** **Despite being tired, she finished.** · **nevertheless / nonetheless** (ainda assim) · **whereas / while** (enquanto, comparando): **I love coffee, whereas my wife prefers tea.**",
        },
        {
          title: "Adição, causa e consequência",
          body: "Adição: **moreover, furthermore, in addition**. Causa: **due to, owing to** + substantivo; **since, as** + frase. Consequência: **therefore, consequently, as a result, thus**.",
          table: {
            head: ["Função", "Conectivos"],
            rows: [
              ["Contraste", "despite, although, nevertheless, whereas"],
              ["Adição", "moreover, furthermore, in addition"],
              ["Causa", "due to, owing to, since, as"],
              ["Consequência", "therefore, consequently, as a result"],
            ],
          },
        },
        {
          title: "Erro comum",
          body: "~~Despite it was raining~~ → **Despite the rain** / **Although it was raining**. \"Despite\" não pega frase com sujeito e verbo (a menos que use **despite the fact that**).",
        },
      ],
      vocabulary: [
        { en: "despite", pt: "apesar de", say: "dis-PÁIT" },
        { en: "nevertheless", pt: "ainda assim", say: "né-ver-dhe-LÉS" },
        { en: "whereas", pt: "enquanto (contraste)", say: "uér-ÉZ" },
        { en: "moreover", pt: "além disso", say: "mór-ÔU-ver" },
        { en: "furthermore", pt: "além do mais", say: "FÂR-dher-mór" },
        { en: "due to", pt: "devido a", say: "DÚ tu" },
        { en: "therefore", pt: "portanto", say: "DHÉR-fór" },
        { en: "consequently", pt: "consequentemente", say: "CÓN-se-kuent-li" },
        { en: "thus", pt: "assim / desse modo", say: "DHÂS" },
      ],
      examples: [
        { en: "Despite the high cost, the project was approved.", pt: "Apesar do alto custo, o projeto foi aprovado." },
        { en: "Sales fell due to the crisis. Consequently, several stores closed.", pt: "As vendas caíram devido à crise. Consequentemente, várias lojas fecharam." },
        { en: "The plan is risky. Nevertheless, it is our best option.", pt: "O plano é arriscado. Ainda assim, é nossa melhor opção." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["Despite it was late, we continued.", "Despite the late hour, we continued.", "Despite of the late hour, we continued."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "The flight was canceled ___ to bad weather.", accepted: ["due", "owing"] },
        { type: "fill_blank", skill: "grammar", sentence: "In spite ___ feeling sick, she went to work.", accepted: ["of"] },
        { type: "multiple_choice", skill: "grammar", prompt: "\"He is very talented. ___, he lacks discipline.\"", options: ["Moreover", "Nevertheless", "Therefore"], answer: 1 },
        { type: "multiple_choice", skill: "grammar", prompt: "\"The company invested in training. ___, productivity rose.\"", options: ["As a result", "Whereas", "Despite"], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Além disso, é mais barato.", accepted: ["Moreover, it is cheaper.", "Furthermore, it is cheaper.", "In addition, it is cheaper.", "Moreover, it's cheaper.", "Furthermore, it's cheaper."] },
        { type: "word_order", skill: "grammar", prompt: "Eu prefiro praia, enquanto ela prefere montanha.", answer: "I prefer the beach, whereas she prefers the mountains.", distractors: ["despite"] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Therefore, we need a new plan.", accepted: ["therefore we need a new plan"] },
      ],
      conversation: {
        goal: "Discuta com o professor prós e contras de um tema (carros elétricos, trabalho híbrido) usando pelo menos seis conectivos avançados.",
        starter: "Electric cars: are they really the solution? Give me your arguments, and connect your ideas carefully.",
      },
      review: ["despite / in spite of + substantivo ou -ing.", "nevertheless, whereas, moreover, due to, therefore.", "Despite the fact that + frase."],
    }),

    buildLesson("b2-m3-l3", M, 3, {
      title: "Hedging",
      objective: "Atenuar afirmações para soar preciso e profissional.",
      explanation: [
        {
          title: "Por que atenuar",
          body: "Em inglês acadêmico e profissional, afirmações absolutas soam ingênuas ou arrogantes. Compare: **Social media causes depression.** × **Social media may contribute to depression in some teenagers.**",
        },
        {
          title: "Ferramentas",
          body: "Modais: **may, might, could** · Verbos: **seem, appear, tend to, suggest** · Advérbios: **possibly, arguably, generally, to some extent** · Expressões: **It could be argued that..., There is some evidence that..., In most cases...**",
        },
      ],
      vocabulary: [
        { en: "tend to", pt: "tender a", say: "TÉND tu" },
        { en: "appear to", pt: "parecer", say: "a-PÍR tu" },
        { en: "suggest", pt: "sugerir / indicar", say: "sâ-DJÉST" },
        { en: "arguably", pt: "possivelmente / pode-se dizer", say: "ÁR-giu-a-bli" },
        { en: "to some extent", pt: "até certo ponto", say: "tu sâm ex-TÉNT" },
        { en: "in most cases", pt: "na maioria dos casos", say: "in MÔUST KÊI-siz" },
        { en: "contribute to", pt: "contribuir para", say: "con-TRÍ-biut tu" },
        { en: "likely", pt: "provável", say: "LÁIK-li" },
      ],
      examples: [
        { en: "The results suggest that the method may be effective.", pt: "Os resultados indicam que o método pode ser eficaz." },
        { en: "Younger employees tend to prefer flexible hours.", pt: "Funcionários mais jovens tendem a preferir horários flexíveis." },
        { en: "This is arguably the best solution we have.", pt: "Esta é possivelmente a melhor solução que temos." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "writing", prompt: "Versão mais cautelosa:", options: ["Coffee causes heart disease.", "Excessive coffee consumption may increase the risk of heart disease.", "Coffee is the worst drink."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "People ___ to spend more in December. (tendem)", accepted: ["tend"] },
        { type: "fill_blank", skill: "grammar", sentence: "The data ___ that the policy is working. (indicam)", accepted: ["suggest", "suggests", "indicate", "indicates"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Arguably, it's the city's best museum.\"", options: ["Pode-se dizer que é o melhor museu da cidade.", "Discutimos sobre o museu.", "Com certeza absoluta é o melhor museu."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Na maioria dos casos, funciona.", accepted: ["In most cases, it works.", "In most cases it works."] },
        { type: "word_order", skill: "grammar", prompt: "O problema parece ser mais sério do que pensávamos.", answer: "The problem appears to be more serious than we thought.", distractors: ["seem"] },
        { type: "listening", skill: "listening", prompt: "Ouça. A afirmação é cautelosa ou absoluta?", audio: "There is some evidence that remote work may increase productivity.", options: ["Cautelosa.", "Absoluta.", "É uma pergunta."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "To some extent, that's true.", accepted: ["to some extent that's true", "to some extent that is true"] },
      ],
      conversation: {
        goal: "Reescreva oralmente com o professor afirmações exageradas da internet usando hedging.",
        starter: "Here's a headline: 'Video games make children violent.' How would a careful researcher say that?",
      },
      review: ["may/might/could, seem/appear/tend to, suggest.", "arguably, generally, to some extent, in most cases.", "Atenuar soa preciso, não fraco."],
    }),

    buildLesson("b2-m3-l4", M, 4, {
      title: "Debates",
      objective: "Participar de debates: interromper, retomar a palavra e pressionar argumentos.",
      explanation: [
        {
          title: "Pegando e mantendo a palavra",
          body: "Interromper: **If I could just come in here...** · **Can I just stop you there?** Retomar quando interrompem você: **Let me finish my point.** · **As I was saying,...** · **Hang on, I haven't finished.**",
        },
        {
          title: "Pressionando o outro lado",
          body: "**What evidence do you have for that?** · **That's a sweeping generalization.** (generalização exagerada) · **With all due respect, that's not the point.** · **That may be true, but it doesn't address...**",
        },
        {
          title: "Concedendo sem perder",
          body: "**I'll grant you that...** (Admito que...) · **Fair point, but...** · **I take your point, however...**",
        },
      ],
      vocabulary: [
        { en: "come in", pt: "entrar na conversa", say: "câm ÍN" },
        { en: "As I was saying", pt: "Como eu ia dizendo", say: "éz ái uóz SÊI-ing" },
        { en: "with all due respect", pt: "com todo respeito", say: "uidh ÓL DÚ ris-PÉKT" },
        { en: "sweeping generalization", pt: "generalização exagerada", say: "SUÍI-ping dje-ne-ra-lai-ZÊI-shan" },
        { en: "address (an issue)", pt: "abordar (uma questão)", say: "a-DRÉS" },
        { en: "grant", pt: "conceder / admitir", say: "GRÉNT" },
        { en: "point", pt: "argumento / ponto", say: "PÓINT" },
        { en: "rebuttal", pt: "réplica / refutação", say: "ri-BÂ-tol" },
      ],
      examples: [
        { en: "If I could just come in here, the numbers tell a different story.", pt: "Se eu puder entrar aqui, os números contam outra história." },
        { en: "With all due respect, that's a sweeping generalization.", pt: "Com todo respeito, isso é uma generalização exagerada." },
        { en: "I'll grant you that it's expensive, but it pays for itself.", pt: "Admito que é caro, mas se paga sozinho." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Alguém te interrompeu. Para retomar:", options: ["Shut up.", "Let me finish my point.", "You're wrong."], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"That's a sweeping generalization.\"", options: ["Isso é uma generalização exagerada.", "Isso é uma ótima conclusão.", "Isso é um detalhe técnico."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "With all due ___, I disagree.", accepted: ["respect"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "I'll ___ you that, but it doesn't solve the problem.", translation: "Admito isso, mas...", accepted: ["grant"] },
        { type: "translate", skill: "writing", prompt: "Que evidência você tem disso?", accepted: ["What evidence do you have for that?", "What evidence do you have of that?", "What evidence do you have?"] },
        { type: "word_order", skill: "grammar", prompt: "Como eu ia dizendo, o custo é alto demais.", answer: "As I was saying, the cost is too high.", distractors: ["told"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "That may be true, but it doesn't address the main problem.", options: ["Pode ser verdade, mas não aborda o problema principal.", "Concorda totalmente.", "Diz que é mentira."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Can I just stop you there?", accepted: ["can i just stop you there"] },
      ],
      conversation: {
        goal: "Debata com o professor: ele vai interromper e generalizar. Retome a palavra, conceda um ponto e refute.",
        starter: "I'll take the opposite side. My position: 'Smartphones should be banned in all schools.' Go ahead and argue against it.",
      },
      review: ["Entrar: If I could just come in here...", "Retomar: Let me finish / As I was saying.", "Conceder e refutar: I'll grant you that..., but..."],
    }),

    buildLesson("b2-m3-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Argumentação",
      objective: "Comprovar que você argumenta por escrito e oralmente.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "multiple_choice", skill: "grammar", prompt: "Escolha a correta.", options: ["Despite he was tired, he worked.", "Despite being tired, he worked.", "Despite of being tired, he worked."], answer: 1 },
        { type: "fill_blank", skill: "grammar", sentence: "Costs increased. ___, prices went up. (consequentemente)", accepted: ["Consequently", "Therefore", "As a result"] },
        { type: "multiple_choice", skill: "writing", prompt: "Afirmação com hedging:", options: ["This is the only solution.", "This appears to be the most effective solution.", "This is definitely perfect."], answer: 1 },
        { type: "fill_blank", skill: "vocabulary", sentence: "The advantages ___ the disadvantages. (superam)", accepted: ["outweigh"] },
        { type: "translate", skill: "writing", prompt: "Ainda assim, é a nossa melhor opção.", accepted: ["Nevertheless, it is our best option.", "Nonetheless, it is our best option.", "Nevertheless, it's our best option.", "Even so, it's our best option."] },
        { type: "word_order", skill: "grammar", prompt: "Com todo respeito, esse não é o ponto.", answer: "With all due respect, that's not the point." },
        { type: "multiple_choice", skill: "writing", prompt: "Em um ensaio formal, evite:", options: ["Contrações e gírias.", "Conectivos.", "Exemplos."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "I take your point. However, the evidence suggests otherwise.", options: ["Entende o argumento, mas as evidências dizem o contrário.", "Concorda e não tem mais nada a dizer.", "Não entendeu o argumento."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Moreover, it is cheaper.", accepted: ["moreover it is cheaper", "moreover it's cheaper"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["drawback", "desvantagem"], ["thus", "assim"], ["arguably", "pode-se dizer"], ["rebuttal", "refutação"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
