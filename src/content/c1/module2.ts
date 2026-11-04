import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "c1-m2";

export const c1Module2: Module = {
  id: M,
  level: "C1",
  order: 2,
  title: "Escrita acadêmica",
  description: "Estrutura, linguagem impessoal, citação de fontes e relatórios.",
  lessons: [
    buildLesson("c1-m2-l1", M, 1, {
      title: "Estrutura acadêmica",
      objective: "Escrever parágrafos acadêmicos coesos com referência clara.",
      explanation: [
        {
          title: "O parágrafo PEEL",
          body: "**Point** (frase-tópico) → **Evidence** (dado, estudo, exemplo) → **Explanation** (por que a evidência sustenta o ponto) → **Link** (conexão com a tese ou o próximo parágrafo).",
        },
        {
          title: "Coesão por referência",
          body: "Evite repetir substantivos: **this trend, such an approach, the former / the latter, these findings, the aforementioned study**. **This** sozinho é vago; prefira **this + substantivo**: ~~This shows...~~ → **This increase shows...**",
        },
        {
          title: "Sinalização acadêmica",
          body: "**This paper examines... · The aim of this study is to... · It is worth noting that... · In light of these findings,... · Taken together, these results suggest...**",
        },
      ],
      vocabulary: [
        { en: "examine", pt: "examinar", say: "ig-ZÉ-min" },
        { en: "findings", pt: "resultados / descobertas", say: "FÁIN-dingz" },
        { en: "the former / the latter", pt: "o primeiro / o último", say: "dhe FÓR-mer / dhe LÉ-ter" },
        { en: "it is worth noting", pt: "vale notar", say: "it iz UÂRTH NÔU-ting" },
        { en: "in light of", pt: "à luz de", say: "in LÁIT ov" },
        { en: "taken together", pt: "em conjunto", say: "TÊI-ken tu-GUÉ-dher" },
        { en: "trend", pt: "tendência", say: "TRÉND" },
        { en: "coherent", pt: "coerente", say: "co-RÍ-rent" },
        { en: "aforementioned", pt: "supracitado", say: "a-fór-MÉN-shand" },
      ],
      examples: [
        { en: "This paper examines the impact of remote work on productivity.", pt: "Este artigo examina o impacto do trabalho remoto na produtividade." },
        { en: "In light of these findings, further research is needed.", pt: "À luz desses resultados, são necessárias mais pesquisas." },
        { en: "Both options were considered; the latter proved more cost-effective.", pt: "As duas opções foram consideradas; a última se mostrou mais econômica." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "writing", prompt: "Ordem do parágrafo PEEL:", options: ["Point, Evidence, Explanation, Link", "Evidence, Link, Point, Explanation", "Link, Point, Evidence, Explanation"], answer: 0 },
        { type: "multiple_choice", skill: "writing", prompt: "Referência mais clara:", options: ["This shows the problem.", "This sharp increase shows the scale of the problem."], answer: 1 },
        { type: "fill_blank", skill: "writing", sentence: "In ___ of these results, the policy should be revised.", accepted: ["light"] },
        { type: "fill_blank", skill: "writing", sentence: "It is worth ___ that the sample was small.", accepted: ["noting", "mentioning"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Coffee and tea were tested; the latter...\" refere-se a:", options: ["café", "chá"], answer: 1 },
        { type: "translate", skill: "writing", prompt: "O objetivo deste estudo é analisar os custos.", accepted: ["The aim of this study is to analyze the costs.", "The aim of this study is to analyse the costs.", "The objective of this study is to analyze the costs.", "The purpose of this study is to analyze the costs."] },
        { type: "word_order", skill: "writing", prompt: "Em conjunto, esses resultados sugerem uma mudança.", answer: "Taken together, these results suggest a change.", distractors: ["suggests"] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Further research is needed.", accepted: ["further research is needed"] },
      ],
      conversation: {
        goal: "Monte oralmente com o professor um parágrafo PEEL sobre um tema da sua área, com evidência e conexão.",
        starter: "Give me a claim related to your field of work, and let's build an academic paragraph around it.",
      },
      review: ["PEEL: Point, Evidence, Explanation, Link.", "Referência: this + substantivo, the former/the latter.", "In light of / It is worth noting / Taken together."],
    }),

    buildLesson("c1-m2-l2", M, 2, {
      title: "Linguagem impessoal",
      objective: "Escrever com objetividade usando nominalização e passiva.",
      explanation: [
        {
          title: "Tirar o \"eu\"",
          body: "**I think the results are wrong.** → **The results appear to be questionable.** · **We tested 50 people.** → **Fifty participants were tested.** · **You can see that...** → **It can be seen that...**",
        },
        {
          title: "Nominalização densa",
          body: "**Because the population grew rapidly, the city expanded.** → **Rapid population growth led to urban expansion.** Verbos viram substantivos e o texto fica conciso e acadêmico.",
        },
        {
          title: "Estruturas impessoais",
          body: "**There is evidence that... · It has been suggested that... · It is widely accepted that... · The data indicate that...**",
        },
      ],
      vocabulary: [
        { en: "participant", pt: "participante", say: "par-TÍ-si-pant" },
        { en: "widely accepted", pt: "amplamente aceito", say: "UÁID-li ak-SÉP-tid" },
        { en: "indicate", pt: "indicar", say: "ÍN-di-kêit" },
        { en: "expansion", pt: "expansão", say: "ex-PÉN-shan" },
        { en: "lead to", pt: "levar a", say: "LÍID tu" },
        { en: "objectivity", pt: "objetividade", say: "ob-djek-TÍ-vi-ti" },
        { en: "questionable", pt: "questionável", say: "KUÉS-tcha-na-bol" },
        { en: "decline", pt: "declínio / declinar", say: "di-CLÁIN" },
      ],
      examples: [
        { en: "It is widely accepted that sleep affects memory.", pt: "É amplamente aceito que o sono afeta a memória." },
        { en: "A decline in sales was observed in the third quarter.", pt: "Observou-se um declínio nas vendas no terceiro trimestre." },
        { en: "Rapid urbanization has led to severe housing shortages.", pt: "A rápida urbanização levou a graves déficits habitacionais." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "writing", prompt: "Versão impessoal de \"We think the method works\":", options: ["The method appears to be effective.", "We really believe it works.", "I'm sure it works."], answer: 0 },
        { type: "multiple_choice", skill: "writing", prompt: "Nominalização de \"Prices increased, so people bought less\":", options: ["The price increase led to a reduction in consumption.", "Prices are up and people buy less now.", "People were buying less because prices increased."], answer: 0 },
        { type: "fill_blank", skill: "writing", sentence: "It has been ___ that the policy is ineffective. (sugerido)", accepted: ["suggested", "argued", "claimed"] },
        { type: "fill_blank", skill: "writing", sentence: "The data ___ a clear trend. (indicam)", accepted: ["indicate", "show", "reveal", "suggest"] },
        { type: "translate", skill: "writing", prompt: "Cem participantes foram entrevistados.", accepted: ["One hundred participants were interviewed.", "A hundred participants were interviewed.", "100 participants were interviewed."] },
        { type: "word_order", skill: "writing", prompt: "Pode-se observar que a taxa caiu.", answer: "It can be seen that the rate fell.", distractors: ["you"] },
        { type: "listening", skill: "listening", prompt: "Ouça. O registro é:", audio: "It is widely accepted that early intervention leads to better outcomes.", options: ["Acadêmico e impessoal.", "Informal.", "Gíria."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "A decline was observed.", accepted: ["a decline was observed"] },
      ],
      conversation: {
        goal: "Transforme com o professor frases informais e pessoais em linguagem acadêmica impessoal.",
        starter: "Here's an informal sentence: 'We asked loads of people and most of them hate their commute.' Make it academic.",
      },
      review: ["Tire o 'eu': passiva e sujeitos impessoais.", "Nominalização: growth, decline, expansion.", "It is widely accepted that / The data indicate that."],
    }),

    buildLesson("c1-m2-l3", M, 3, {
      title: "Citar e parafrasear",
      objective: "Integrar fontes ao texto com verbos de relato acadêmicos.",
      explanation: [
        {
          title: "Verbos de relato com nuance",
          body: "Neutros: **states, notes, observes, reports**. Concordância do autor com a ideia: **argues, maintains, contends**. Mostram evidência: **demonstrates, shows**. Mais fracos: **suggests, implies**. Distanciamento: **claims, alleges** (você não necessariamente concorda).",
        },
        {
          title: "Formatos",
          body: "**Smith (2020) argues that...** · **According to Smith (2020),...** · **As Smith (2020) points out,...** · **It has been argued that... (Smith, 2020).** Paráfrase muda palavras E estrutura; citação direta vai entre aspas e com página.",
        },
      ],
      vocabulary: [
        { en: "argue", pt: "argumentar / defender", say: "ÁR-giu" },
        { en: "maintain", pt: "sustentar (uma posição)", say: "mein-TÊIN" },
        { en: "point out", pt: "apontar / observar", say: "PÓINT ÁUT" },
        { en: "demonstrate", pt: "demonstrar", say: "DÉ-mon-strêit" },
        { en: "imply", pt: "implicar / insinuar", say: "im-PLÁI" },
        { en: "allege", pt: "alegar", say: "a-LÉDJ" },
        { en: "plagiarism", pt: "plágio", say: "PLÊI-dja-rizm" },
        { en: "cite", pt: "citar", say: "SÁIT" },
        { en: "source", pt: "fonte", say: "SÓRS" },
      ],
      examples: [
        { en: "As Smith (2020) points out, the sample excluded rural areas.", pt: "Como Smith (2020) observa, a amostra excluiu áreas rurais." },
        { en: "Jones maintains that the policy failed, whereas Lee argues otherwise.", pt: "Jones sustenta que a política fracassou, enquanto Lee defende o contrário." },
        { en: "The study demonstrates a clear link between sleep and memory.", pt: "O estudo demonstra uma ligação clara entre sono e memória." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Qual verbo mostra distanciamento (você talvez não concorde)?", options: ["demonstrates", "claims", "shows"], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Qual verbo indica prova forte?", options: ["suggests", "demonstrates", "implies"], answer: 1 },
        { type: "fill_blank", skill: "writing", sentence: "As Brown (2019) points ___, the data are incomplete.", accepted: ["out"] },
        { type: "fill_blank", skill: "writing", sentence: "___ to the report, unemployment has fallen.", accepted: ["According"] },
        { type: "multiple_choice", skill: "writing", prompt: "Uma boa paráfrase:", options: ["Muda só uma palavra.", "Muda palavras e estrutura e cita a fonte.", "Copia o texto sem aspas."], answer: 1 },
        { type: "translate", skill: "writing", prompt: "O autor argumenta que a lei é injusta.", accepted: ["The author argues that the law is unfair.", "The author argues that the law is unjust."] },
        { type: "word_order", skill: "writing", prompt: "Pesquisas anteriores implicam uma relação causal.", answer: "Previous research implies a causal relationship.", distractors: ["imply"] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "The study demonstrates a clear link.", accepted: ["the study demonstrates a clear link"] },
      ],
      conversation: {
        goal: "Relate ao professor dois pontos de vista opostos sobre um tema, usando verbos de relato variados e precisos.",
        starter: "Imagine two experts disagree about whether AI will create or destroy jobs. Report both positions academically.",
      },
      review: ["states/notes (neutro), argues/maintains (posição), demonstrates (prova), claims (distância).", "According to... / As X points out...", "Paráfrase = palavras e estrutura novas + fonte."],
    }),

    buildLesson("c1-m2-l4", M, 4, {
      title: "Relatórios e propostas",
      objective: "Escrever relatórios com recomendações claras.",
      explanation: [
        {
          title: "Estrutura de relatório",
          body: "**Title → Introduction (purpose) → Findings (com subtítulos) → Conclusion → Recommendations.** Abertura: **The purpose of this report is to assess...** Achados: **It was found that... / The majority of respondents...**",
        },
        {
          title: "Linguagem de recomendação",
          body: "**It is recommended that... (subjuntivo)** · **The company should consider...** · **It would be advisable to...** · **A pilot scheme could be introduced.** · **Priority should be given to...**",
        },
        {
          title: "Proposta",
          body: "Convence o leitor a agir: problema → solução → benefícios → custos → próximos passos. **This proposal outlines... · The expected benefits include...**",
        },
      ],
      vocabulary: [
        { en: "assess", pt: "avaliar", say: "a-SÉS" },
        { en: "respondents", pt: "entrevistados", say: "ris-PÓN-dents" },
        { en: "advisable", pt: "aconselhável", say: "ad-VÁI-za-bol" },
        { en: "pilot scheme", pt: "projeto-piloto", say: "PÁI-lot SKÍIM" },
        { en: "priority", pt: "prioridade", say: "prai-Ó-ri-ti" },
        { en: "outline", pt: "delinear / esboço", say: "ÁUT-láin" },
        { en: "implement", pt: "implementar", say: "ÍM-ple-ment" },
        { en: "feasible", pt: "viável", say: "FÍI-zi-bol" },
        { en: "cost-effective", pt: "custo-benefício bom", say: "CÓST i-FÉK-tiv" },
      ],
      examples: [
        { en: "The purpose of this report is to assess staff satisfaction.", pt: "O objetivo deste relatório é avaliar a satisfação dos funcionários." },
        { en: "The majority of respondents favored flexible hours.", pt: "A maioria dos entrevistados preferiu horários flexíveis." },
        { en: "It is recommended that a pilot scheme be introduced in March.", pt: "Recomenda-se que um projeto-piloto seja introduzido em março." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "writing", prompt: "Abertura de relatório:", options: ["Hi, here's my report.", "The purpose of this report is to evaluate the new system.", "So, basically, I looked at stuff."], answer: 1 },
        { type: "fill_blank", skill: "writing", sentence: "It is recommended that the policy ___ reviewed annually.", accepted: ["be"] },
        { type: "fill_blank", skill: "writing", sentence: "The majority of ___ were satisfied. (entrevistados)", accepted: ["respondents", "participants"] },
        { type: "fill_blank", skill: "writing", sentence: "It would be ___ to delay the launch. (aconselhável)", accepted: ["advisable", "wise", "sensible"] },
        { type: "translate", skill: "writing", prompt: "Esta proposta descreve um novo sistema de treinamento.", accepted: ["This proposal outlines a new training system.", "This proposal describes a new training system.", "This proposal outlines a new training scheme."] },
        { type: "word_order", skill: "writing", prompt: "Deve-se dar prioridade à segurança.", answer: "Priority should be given to safety.", distractors: ["must"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "The plan is technically feasible, but it may not be cost-effective in the short term.", options: ["É viável, mas talvez não compense no curto prazo.", "É inviável e caro.", "É barato e rápido."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It was found that costs had risen.", accepted: ["it was found that costs had risen"] },
      ],
      conversation: {
        goal: "Apresente ao professor um mini-relatório oral sobre um problema do seu trabalho, com achados e três recomendações.",
        starter: "You've been asked to report on a problem at your workplace. What did you find, and what do you recommend?",
      },
      review: ["Estrutura: propósito → achados → conclusão → recomendações.", "It is recommended that... be / It would be advisable to...", "Proposta: problema, solução, benefícios, custos, próximos passos."],
    }),

    buildLesson("c1-m2-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Escrita acadêmica",
      objective: "Comprovar que você escreve em registro acadêmico e profissional.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "multiple_choice", skill: "writing", prompt: "Mais acadêmico:", options: ["Lots of people think so.", "It is widely accepted that this is the case."], answer: 1 },
        { type: "fill_blank", skill: "writing", sentence: "As Silva (2021) points ___, the results are limited.", accepted: ["out"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Feasible\":", options: ["Viável", "Festivo", "Fácil"], answer: 0 },
        { type: "fill_blank", skill: "writing", sentence: "It is recommended that staff ___ trained. ", accepted: ["be"] },
        { type: "translate", skill: "writing", prompt: "À luz desses resultados, a política deve mudar.", accepted: ["In light of these results, the policy should change.", "In light of these findings, the policy should change.", "In light of these results, the policy must change."] },
        { type: "word_order", skill: "writing", prompt: "Este artigo examina o papel da tecnologia.", answer: "This paper examines the role of technology." },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Verbo de relato com distanciamento:", options: ["alleges", "demonstrates", "proves"], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "The majority of respondents favoured a four-day week.", options: ["A maioria preferiu semana de quatro dias.", "Ninguém quis mudança.", "A minoria preferiu quatro dias."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "The data indicate a clear trend.", accepted: ["the data indicate a clear trend", "the data indicates a clear trend"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["assess", "avaliar"], ["findings", "resultados"], ["source", "fonte"], ["outline", "delinear"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
