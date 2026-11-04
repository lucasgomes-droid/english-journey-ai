import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "c1-m4";

export const c1Module4: Module = {
  id: M,
  level: "C1",
  order: 4,
  title: "Vocabulário avançado",
  description: "Idioms por tema, conotação, collocations sofisticadas e linguagem figurada.",
  lessons: [
    buildLesson("c1-m4-l1", M, 1, {
      title: "Idioms II",
      objective: "Usar idioms de trabalho, dinheiro e relações com naturalidade.",
      explanation: [
        {
          title: "Trabalho",
          body: "**get the ball rolling** (dar o pontapé inicial) · **think outside the box** · **back to the drawing board** (voltar à estaca zero) · **cut corners** (fazer nas coxas, economizar no que não devia) · **learn the ropes** (aprender o básico de um trabalho) · **a long shot** (pouco provável).",
        },
        {
          title: "Dinheiro e relações",
          body: "**make ends meet** (fechar as contas do mês) · **tighten your belt** (apertar o cinto) · **in the red** (no vermelho) · **see eye to eye** (concordar) · **give someone the benefit of the doubt** · **bury the hatchet** (fazer as pazes).",
        },
      ],
      vocabulary: [
        { en: "get the ball rolling", pt: "dar o pontapé inicial", say: "guét dhe BÓL RÔU-ling" },
        { en: "back to the drawing board", pt: "voltar à estaca zero", say: "BÉK tu dhe DRÓ-ing BÓRD" },
        { en: "cut corners", pt: "fazer nas coxas / economizar onde não devia", say: "CÂT CÓR-nerz" },
        { en: "learn the ropes", pt: "aprender o básico", say: "LÂRN dhe RÔUPS" },
        { en: "a long shot", pt: "algo pouco provável", say: "a LÓNG SHÓT" },
        { en: "make ends meet", pt: "fechar as contas", say: "MÊIK ÉNDZ MÍIT" },
        { en: "in the red", pt: "no vermelho", say: "in dhe RÉD" },
        { en: "see eye to eye", pt: "concordar plenamente", say: "SÍI ÁI tu ÁI" },
        { en: "bury the hatchet", pt: "fazer as pazes", say: "BÉ-ri dhe RÉ-tchet" },
        { en: "the benefit of the doubt", pt: "o benefício da dúvida", say: "dhe BÉ-ne-fit ov dhe DÁUT" },
      ],
      examples: [
        { en: "Let's get the ball rolling with a quick round of introductions.", pt: "Vamos começar com uma rodada rápida de apresentações." },
        { en: "The client rejected the design, so it's back to the drawing board.", pt: "O cliente rejeitou o design, então voltamos à estaca zero." },
        { en: "We don't always see eye to eye, but we respect each other.", pt: "Nem sempre concordamos, mas nos respeitamos." },
      ],
      exercises: [
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["make ends meet", "fechar as contas"], ["in the red", "no vermelho"], ["bury the hatchet", "fazer as pazes"], ["a long shot", "pouco provável"]] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Don't cut corners on safety.\"", options: ["Não economize no que é essencial para a segurança.", "Não corte as esquinas.", "Não dirija rápido."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "It'll take a few weeks to learn the ___.", accepted: ["ropes"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Let's get the ball ___.", accepted: ["rolling"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"We see eye to eye on this.\"", options: ["Concordamos nisso.", "Nos olhamos nos olhos.", "Discordamos totalmente."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Voltamos à estaca zero.", accepted: ["It's back to the drawing board.", "We're back to the drawing board.", "Back to the drawing board.", "We are back to the drawing board."] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "Getting the contract is a long shot, but it's worth a try.", options: ["É pouco provável conseguir o contrato, mas vale tentar.", "O contrato já está garantido.", "O contrato é longo."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Let's bury the hatchet.", accepted: ["let's bury the hatchet", "let us bury the hatchet"] },
      ],
      conversation: {
        goal: "Conte ao professor sobre um projeto ou fase difícil da sua vida usando quatro idioms deste módulo com naturalidade.",
        starter: "Tell me about a project that didn't go as planned. How did you get the ball rolling again?",
      },
      review: ["Trabalho: get the ball rolling, back to the drawing board, cut corners, learn the ropes.", "Dinheiro: make ends meet, in the red, tighten your belt.", "Relações: see eye to eye, bury the hatchet."],
    }),

    buildLesson("c1-m4-l2", M, 2, {
      title: "Sinônimos e conotação",
      objective: "Escolher a palavra exata pela conotação positiva, neutra ou negativa.",
      explanation: [
        {
          title: "Mesmo sentido, outra carga",
          body: "**slim** (+) / **thin** (neutro) / **skinny** (−) · **confident** (+) / **arrogant** (−) · **thrifty** (econômico, +) / **stingy** (pão-duro, −) · **determined** (+) / **stubborn** (−) · **curious** (+) / **nosy** (intrometido, −).",
          table: {
            head: ["Positivo", "Neutro", "Negativo"],
            rows: [
              ["slim", "thin", "skinny"],
              ["thrifty", "careful with money", "stingy"],
              ["determined", "firm", "stubborn"],
              ["assertive", "direct", "pushy"],
            ],
          },
        },
        {
          title: "Por que importa",
          body: "Num e-mail, chamar alguém de **pushy** em vez de **assertive** muda tudo. Em descrições de produto, **cozy** (aconchegante) vende mais que **small**.",
        },
      ],
      vocabulary: [
        { en: "connotation", pt: "conotação", say: "co-no-TÊI-shan" },
        { en: "thrifty", pt: "econômico (positivo)", say: "THRÍF-ti" },
        { en: "stingy", pt: "pão-duro", say: "STÍN-dji" },
        { en: "stubborn", pt: "teimoso", say: "STÂ-bern" },
        { en: "assertive", pt: "assertivo", say: "a-SÂR-tiv" },
        { en: "pushy", pt: "insistente / forçador", say: "PÚ-shi" },
        { en: "nosy", pt: "intrometido", say: "NÔU-zi" },
        { en: "cozy", pt: "aconchegante", say: "CÔU-zi" },
        { en: "cramped", pt: "apertado", say: "CRÉMPT" },
      ],
      examples: [
        { en: "She's very assertive in meetings, never pushy.", pt: "Ela é muito assertiva nas reuniões, nunca forçada." },
        { en: "The apartment is cozy, though some might call it cramped.", pt: "O apartamento é aconchegante, embora alguns digam apertado." },
        { en: "My grandfather was thrifty, not stingy.", pt: "Meu avô era econômico, não pão-duro." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Elogio sobre alguém que não desiste:", options: ["stubborn", "determined"], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Crítica sobre alguém que pergunta demais da vida alheia:", options: ["curious", "nosy"], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Anúncio de imóvel pequeno (positivo):", options: ["cramped", "cozy", "tiny and dark"], answer: 1 },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue positivo → negativo.", pairs: [["thrifty", "stingy"], ["assertive", "pushy"], ["slim", "skinny"], ["confident", "arrogant"]] },
        { type: "fill_blank", skill: "vocabulary", sentence: "He's so ___. He never shares anything. (pão-duro)", accepted: ["stingy", "mean", "cheap"] },
        { type: "translate", skill: "writing", prompt: "Ela é teimosa, mas muito talentosa.", accepted: ["She's stubborn, but very talented.", "She is stubborn, but very talented.", "She's stubborn but very talented."] },
        { type: "listening", skill: "listening", prompt: "Ouça. A descrição é positiva ou negativa?", audio: "The salesman was incredibly pushy.", options: ["Negativa.", "Positiva.", "Neutra."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It's small but cozy.", accepted: ["it's small but cozy", "it is small but cozy", "it's small but cosy"] },
      ],
      conversation: {
        goal: "Descreva a mesma pessoa ou lugar duas vezes: como um amigo (positivo) e como um crítico (negativo).",
        starter: "Describe your boss, or a famous person, first as their biggest fan, then as their harshest critic.",
      },
      review: ["Mesmo sentido, conotação diferente.", "thrifty/stingy, determined/stubborn, assertive/pushy, curious/nosy.", "Escolha a palavra pelo efeito."],
    }),

    buildLesson("c1-m4-l3", M, 3, {
      title: "Collocations avançadas",
      objective: "Escrever com sofisticação usando advérbio + adjetivo e outras combinações.",
      explanation: [
        {
          title: "Advérbio + adjetivo",
          body: "Nativos têm combinações fixas: **highly unlikely, deeply concerned, bitterly disappointed, utterly ridiculous, fully aware, painfully slow, widely known, strongly recommend**. Trocar o advérbio (~~very concerned~~ → **deeply concerned**) eleva o registro.",
        },
        {
          title: "Verbo + substantivo formais",
          body: "**pose a threat** (representar ameaça) · **draw a conclusion** · **bear in mind** (ter em mente) · **meet demand** (atender à demanda) · **reach a consensus** · **raise concerns** · **address an issue**.",
        },
      ],
      vocabulary: [
        { en: "highly unlikely", pt: "altamente improvável", say: "RÁI-li ân-LÁIK-li" },
        { en: "deeply concerned", pt: "profundamente preocupado", say: "DÍIP-li con-SÂRND" },
        { en: "bitterly disappointed", pt: "amargamente decepcionado", say: "BÍ-ter-li dis-a-PÓIN-tid" },
        { en: "utterly", pt: "completamente", say: "Â-ter-li" },
        { en: "fully aware", pt: "plenamente ciente", say: "FÚ-li a-UÉR" },
        { en: "pose a threat", pt: "representar ameaça", say: "PÔUZ a THRÉT" },
        { en: "bear in mind", pt: "ter em mente", say: "BÉR in MÁIND" },
        { en: "reach a consensus", pt: "chegar a um consenso", say: "RÍITCH a con-SÉN-sâs" },
        { en: "raise concerns", pt: "levantar preocupações", say: "RÊIZ con-SÂRNZ" },
      ],
      examples: [
        { en: "We are fully aware of the risks involved.", pt: "Estamos plenamente cientes dos riscos envolvidos." },
        { en: "The new law has raised concerns among small businesses.", pt: "A nova lei levantou preocupações entre pequenas empresas." },
        { en: "Bear in mind that the deadline is non-negotiable.", pt: "Tenha em mente que o prazo é inegociável." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Collocation natural:", options: ["strongly unlikely", "highly unlikely", "deeply unlikely"], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Collocation natural:", options: ["bitterly disappointed", "highly disappointed", "fully disappointed"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Please bear in ___ that the office closes at 5.", accepted: ["mind"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "After hours of debate, we finally reached a ___.", accepted: ["consensus", "decision", "agreement"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Climate change poses a serious ___ to coastal cities.", accepted: ["threat", "risk"] },
        { type: "translate", skill: "writing", prompt: "Estamos profundamente preocupados com a situação.", accepted: ["We are deeply concerned about the situation.", "We're deeply concerned about the situation.", "We are deeply concerned by the situation."] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["draw", "a conclusion"], ["meet", "demand"], ["address", "an issue"], ["raise", "concerns"]] },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "That's utterly ridiculous.", accepted: ["that's utterly ridiculous", "that is utterly ridiculous"] },
      ],
      conversation: {
        goal: "Escreva oralmente com o professor um comunicado oficial sobre um problema, usando seis collocations avançadas.",
        starter: "There's been a data leak at your company. Draft a short official statement with me. How would you open it?",
      },
      review: ["highly unlikely, deeply concerned, fully aware, utterly ridiculous.", "pose a threat, bear in mind, reach a consensus, raise concerns.", "Trocar 'very' por advérbio preciso eleva o registro."],
    }),

    buildLesson("c1-m4-l4", M, 4, {
      title: "Linguagem figurada",
      objective: "Entender e usar metáforas comuns em textos e discursos.",
      explanation: [
        {
          title: "Metáforas do cotidiano",
          body: "Ideias como **comida**: **food for thought**, **half-baked idea** (ideia mal pensada). Discussão como **guerra**: **shoot down an idea**, **defend a position**, **under attack**. Tempo como **dinheiro**: **spend / waste / save time**. Vida como **viagem**: **at a crossroads** (numa encruzilhada), **a bumpy road**.",
        },
        {
          title: "Metonímia",
          body: "Usar algo associado para nomear: **The White House announced...** (o governo dos EUA) · **The pen is mightier than the sword.** · **Wall Street reacted badly.** (o mercado financeiro)",
        },
      ],
      vocabulary: [
        { en: "food for thought", pt: "algo para refletir", say: "FÚUD for THÓT" },
        { en: "half-baked", pt: "mal pensado", say: "RÁF-bêikt" },
        { en: "shoot down", pt: "derrubar (uma ideia)", say: "SHÚUT DÁUN" },
        { en: "at a crossroads", pt: "numa encruzilhada", say: "ét a CRÓS-rôudz" },
        { en: "a bumpy road", pt: "um caminho difícil", say: "a BÂM-pi RÔUD" },
        { en: "metaphor", pt: "metáfora", say: "MÉ-ta-for" },
        { en: "the tip of the iceberg", pt: "a ponta do iceberg", say: "dhe TÍP ov dhi ÁIS-bârg" },
        { en: "a breath of fresh air", pt: "um sopro de ar fresco / renovação", say: "a BRÉTH ov FRÉSH ÉR" },
      ],
      examples: [
        { en: "Your talk gave me a lot of food for thought.", pt: "Sua palestra me deu muito o que pensar." },
        { en: "The board shot down every proposal.", pt: "A diretoria derrubou todas as propostas." },
        { en: "These complaints are just the tip of the iceberg.", pt: "Essas reclamações são só a ponta do iceberg." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"A half-baked idea\" é:", options: ["Uma ideia mal pensada.", "Uma receita de bolo.", "Uma ideia brilhante."], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Brasília announced new taxes.\" Isso é:", options: ["Metonímia (o governo).", "Uma cidade falando.", "Erro gramatical."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "I'm at a ___: should I stay or take the job abroad?", accepted: ["crossroads"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "The new manager is a breath of fresh ___.", accepted: ["air"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["food for thought", "algo para refletir"], ["shoot down", "derrubar"], ["a bumpy road", "caminho difícil"], ["tip of the iceberg", "ponta do iceberg"]] },
        { type: "translate", skill: "writing", prompt: "Isso é só a ponta do iceberg.", accepted: ["That's just the tip of the iceberg.", "This is just the tip of the iceberg.", "It's just the tip of the iceberg.", "That's only the tip of the iceberg."] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "It's been a bumpy road, but we're finally seeing results.", options: ["Foi um caminho difícil, mas finalmente há resultados.", "A estrada está esburacada.", "Não houve resultados."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "That's food for thought.", accepted: ["that's food for thought", "that is food for thought"] },
      ],
      conversation: {
        goal: "Conte ao professor um momento de virada na sua vida usando linguagem figurada (crossroads, bumpy road, breath of fresh air).",
        starter: "Have you ever been at a crossroads in your life? What did you decide?",
      },
      review: ["Ideias = comida; discussão = guerra; vida = viagem.", "Metonímia: The White House, Wall Street.", "food for thought, half-baked, tip of the iceberg."],
    }),

    buildLesson("c1-m4-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Vocabulário avançado",
      objective: "Comprovar domínio de idioms, conotação, collocations e linguagem figurada.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Make ends meet\":", options: ["Fechar as contas do mês", "Terminar um projeto", "Conhecer pessoas"], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Versão negativa de \"determined\":", options: ["stubborn", "assertive", "thrifty"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "We are fully ___ of the problem.", accepted: ["aware"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "That's highly ___ to happen.", accepted: ["unlikely"] },
        { type: "translate", skill: "writing", prompt: "Tenha em mente que é caro.", accepted: ["Bear in mind that it's expensive.", "Bear in mind it's expensive.", "Bear in mind that it is expensive.", "Keep in mind that it's expensive."] },
        { type: "word_order", skill: "grammar", prompt: "A diretoria derrubou a ideia.", answer: "The board shot down the idea." },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"A breath of fresh air\" (sobre uma pessoa):", options: ["Uma renovação bem-vinda.", "Alguém que respira mal.", "Um ventilador."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "We're in the red this quarter, so we'll have to tighten our belts.", options: ["Estamos no vermelho e vamos apertar o cinto.", "Tivemos lucro recorde.", "Vamos comprar cintos."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "It poses a serious threat.", accepted: ["it poses a serious threat"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["nosy", "intrometido"], ["cozy", "aconchegante"], ["learn the ropes", "aprender o básico"], ["half-baked", "mal pensado"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
