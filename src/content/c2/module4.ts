import { buildLesson } from "../builder";
import type { Module } from "../types";

const M = "c2-m4";

export const c2Module4: Module = {
  id: M,
  level: "C2",
  order: 4,
  title: "Lexicon",
  description: "Vocabulário raro, provérbios, jargões profissionais e etimologia.",
  lessons: [
    buildLesson("c2-m4-l1", M, 1, {
      title: "Vocabulário raro",
      objective: "Entender e usar palavras de baixa frequência de textos sofisticados.",
      explanation: [
        {
          title: "Palavras que aparecem em jornais de qualidade",
          body: "**ubiquitous** (onipresente) · **ephemeral** (efêmero) · **pragmatic** · **meticulous** · **conundrum** (enigma, dilema) · **exacerbate** (agravar) · **mitigate** (atenuar) · **juxtapose** (justapor) · **candid** (franco) · **serendipity** (acaso feliz).",
        },
        {
          title: "Use com precisão",
          body: "Palavras raras impressionam só quando exatas. **exacerbate** = piorar algo que já é ruim (**exacerbate tensions**); **mitigate** = reduzir dano (**mitigate risks**). Não use para \"parecer chique\".",
        },
      ],
      vocabulary: [
        { en: "ubiquitous", pt: "onipresente", say: "iu-BÍ-kui-tâs" },
        { en: "ephemeral", pt: "efêmero", say: "i-FÉ-me-ral" },
        { en: "meticulous", pt: "meticuloso", say: "me-TÍ-kiu-lâs" },
        { en: "conundrum", pt: "dilema / enigma", say: "co-NÂN-drum" },
        { en: "exacerbate", pt: "agravar", say: "ig-ZÉ-ser-bêit" },
        { en: "mitigate", pt: "atenuar", say: "MÍ-ti-guêit" },
        { en: "juxtapose", pt: "justapor", say: "DJÂKS-ta-pôuz" },
        { en: "candid", pt: "franco / sincero", say: "KÉN-did" },
        { en: "serendipity", pt: "acaso feliz", say: "sé-ren-DÍ-pi-ti" },
        { en: "pragmatic", pt: "pragmático", say: "prég-MÉ-tik" },
      ],
      examples: [
        { en: "Smartphones have become ubiquitous.", pt: "Os smartphones se tornaram onipresentes." },
        { en: "The new tax could exacerbate inequality.", pt: "O novo imposto pode agravar a desigualdade." },
        { en: "Meeting my business partner was pure serendipity.", pt: "Conhecer meu sócio foi puro acaso feliz." },
      ],
      exercises: [
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["ubiquitous", "onipresente"], ["ephemeral", "efêmero"], ["candid", "franco"], ["conundrum", "dilema"]] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"The cuts will ___ the crisis.\" (piorar)", options: ["mitigate", "exacerbate", "juxtapose"], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Measures to ___ the risks.\" (atenuar)", options: ["mitigate", "exacerbate"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "She's ___ about details; nothing escapes her. (meticulosa)", accepted: ["meticulous"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Finding that book was pure ___. (acaso feliz)", accepted: ["serendipity", "luck"] },
        { type: "translate", skill: "writing", prompt: "A fama na internet é efêmera.", accepted: ["Internet fame is ephemeral.", "Fame on the internet is ephemeral.", "Online fame is ephemeral."] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "To be candid, the proposal is pragmatic but uninspiring.", options: ["Francamente, a proposta é prática mas sem brilho.", "A proposta é inspiradora.", "A proposta é impraticável."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "That's quite a conundrum.", accepted: ["that's quite a conundrum", "that is quite a conundrum"] },
      ],
      conversation: {
        goal: "Discuta um tema atual com o professor usando com precisão cinco palavras raras desta aula.",
        starter: "Social media: are its effects ephemeral or lasting? Be candid, and try to use some of today's words precisely.",
      },
      review: ["ubiquitous, ephemeral, meticulous, conundrum, candid.", "exacerbate (piorar) × mitigate (atenuar).", "Precisão acima de exibição."],
    }),

    buildLesson("c2-m4-l2", M, 2, {
      title: "Idioms e provérbios",
      objective: "Usar provérbios e expressões culturais no contexto certo.",
      explanation: [
        {
          title: "Provérbios clássicos",
          body: "**Don't count your chickens before they hatch.** (Não conte com o ovo antes da galinha) · **The early bird catches the worm.** (Deus ajuda quem cedo madruga) · **When in Rome, do as the Romans do.** · **Every cloud has a silver lining.** (Há males que vêm para o bem) · **Actions speak louder than words.**",
        },
        {
          title: "Citados pela metade",
          body: "Nativos costumam só aludir: **Well, when in Rome...** · **Don't count your chickens...** · **Every cloud...** Reconhecer a alusão é sinal de C2.",
        },
      ],
      vocabulary: [
        { en: "proverb", pt: "provérbio", say: "PRÓ-verb" },
        { en: "silver lining", pt: "lado bom", say: "SÍL-ver LÁI-ning" },
        { en: "the early bird", pt: "quem madruga", say: "dhi ÂR-li BÂRD" },
        { en: "when in Rome", pt: "em Roma, como os romanos", say: "uén in RÔUM" },
        { en: "speak louder than words", pt: "falar mais alto que palavras", say: "SPÍIK LÁU-der dhén UÊRDZ" },
        { en: "the last straw", pt: "a gota d'água", say: "dhe LÉST STRÓ" },
        { en: "a blessing in disguise", pt: "uma bênção disfarçada", say: "a BLÉ-sing in dis-GÁIZ" },
        { en: "allude to", pt: "aludir a", say: "a-LÚUD tu" },
      ],
      examples: [
        { en: "Losing that job was a blessing in disguise.", pt: "Perder aquele emprego foi uma bênção disfarçada." },
        { en: "We haven't signed yet, so let's not count our chickens.", pt: "Ainda não assinamos, então não vamos contar com o ovo." },
        { en: "His third delay was the last straw.", pt: "O terceiro atraso dele foi a gota d'água." },
      ],
      exercises: [
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["the last straw", "a gota d'água"], ["silver lining", "lado bom"], ["blessing in disguise", "bênção disfarçada"], ["proverb", "provérbio"]] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Equivalente a \"Deus ajuda quem cedo madruga\":", options: ["The early bird catches the worm.", "When in Rome...", "Actions speak louder than words."], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "Don't count your ___ before they hatch.", accepted: ["chickens"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "Every cloud has a silver ___.", accepted: ["lining"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Alguém diz só \"Well, when in Rome...\" e pede comida local. Está aludindo a:", options: ["Fazer como os locais.", "Viajar para a Itália.", "Pedir pizza."], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Ações falam mais alto que palavras.", accepted: ["Actions speak louder than words."] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "The flight was canceled, but every cloud... I got an extra day in Lisbon.", options: ["Há males que vêm para o bem.", "Ficou chovendo em Lisboa.", "Perdeu a viagem."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "That was the last straw.", accepted: ["that was the last straw"] },
      ],
      conversation: {
        goal: "Conte histórias da sua vida que ilustrem três provérbios, aludindo a eles de forma natural.",
        starter: "Tell me about something bad that turned out to be a blessing in disguise.",
      },
      review: ["Provérbios clássicos e equivalentes em português.", "the last straw, silver lining, blessing in disguise.", "Nativos aludem pela metade: 'Every cloud...'"],
    }),

    buildLesson("c2-m4-l3", M, 3, {
      title: "Jargões profissionais",
      objective: "Transitar entre jargões jurídico, médico e financeiro.",
      explanation: [
        {
          title: "Jurídico",
          body: "**liability** (responsabilidade legal) · **breach of contract** (quebra de contrato) · **clause** · **plaintiff / defendant** (autor / réu) · **settle out of court** (fazer acordo extrajudicial) · **null and void** (nulo).",
        },
        {
          title: "Financeiro e médico",
          body: "Financeiro: **assets / liabilities** (ativos / passivos) · **cash flow** · **return on investment (ROI)** · **write off** (dar baixa) · **bull / bear market**. Médico: **chronic / acute** · **benign / malignant** · **side effects** · **diagnosis / prognosis**.",
        },
      ],
      vocabulary: [
        { en: "liability", pt: "responsabilidade legal / passivo", say: "lai-a-BÍ-li-ti" },
        { en: "breach of contract", pt: "quebra de contrato", say: "BRÍITCH ov CÓN-trékt" },
        { en: "settle out of court", pt: "fazer acordo extrajudicial", say: "SÉ-tol áut ov CÓRT" },
        { en: "defendant", pt: "réu", say: "di-FÉN-dant" },
        { en: "cash flow", pt: "fluxo de caixa", say: "KÉSH FLÔU" },
        { en: "write off", pt: "dar baixa", say: "RÁIT ÓF" },
        { en: "bear market", pt: "mercado em queda", say: "BÉR MÁR-ket" },
        { en: "benign", pt: "benigno", say: "bi-NÁIN" },
        { en: "prognosis", pt: "prognóstico", say: "prog-NÔU-sis" },
        { en: "chronic", pt: "crônico", say: "CRÓ-nik" },
      ],
      examples: [
        { en: "The two companies agreed to settle out of court.", pt: "As duas empresas concordaram em fazer um acordo extrajudicial." },
        { en: "Healthy cash flow matters more than profit in the short term.", pt: "Um fluxo de caixa saudável importa mais que lucro no curto prazo." },
        { en: "Fortunately, the tumor was benign and the prognosis is good.", pt: "Felizmente, o tumor era benigno e o prognóstico é bom." },
      ],
      exercises: [
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["defendant", "réu"], ["cash flow", "fluxo de caixa"], ["benign", "benigno"], ["chronic", "crônico"]] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Breach of contract\":", options: ["Quebra de contrato", "Assinatura de contrato", "Renovação de contrato"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "They decided to settle out of ___.", accepted: ["court"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "The bank had to write ___ the bad debt.", accepted: ["off"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Bear market\":", options: ["Mercado em queda", "Mercado em alta", "Mercado de ursos"], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Quais são os efeitos colaterais?", accepted: ["What are the side effects?"] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "The clause limits the supplier's liability to the value of the contract.", options: ["A cláusula limita a responsabilidade do fornecedor ao valor do contrato.", "O fornecedor tem responsabilidade ilimitada.", "O contrato foi anulado."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "The contract is null and void.", accepted: ["the contract is null and void"] },
      ],
      conversation: {
        goal: "Explique a um leigo (o professor) um termo técnico da sua área em linguagem simples, depois use-o num caso real.",
        starter: "I'm not from your field at all. Explain a technical term from your job to me as if I were twelve.",
      },
      review: ["Jurídico: liability, breach of contract, settle out of court.", "Financeiro: cash flow, write off, bear/bull market.", "Médico: chronic/acute, benign/malignant, prognosis."],
    }),

    buildLesson("c2-m4-l4", M, 4, {
      title: "Etimologia",
      objective: "Deduzir palavras novas pelas raízes latinas e germânicas.",
      explanation: [
        {
          title: "Duas camadas do inglês",
          body: "Palavras germânicas são curtas e cotidianas (**begin, ask, help, buy**); latinas/francesas são formais (**commence, inquire, assist, purchase**). Por isso o brasileiro entende bem o inglês formal: as raízes latinas são \"nossas\".",
        },
        {
          title: "Raízes úteis",
          body: "**bene-** (bem): benefit, benevolent · **mal-** (mal): malfunction · **-cide** (matar): pesticide · **chron-** (tempo): chronic, chronology · **-phobia** · **dict-** (dizer): predict, contradict · **port-** (levar): export, portable · **spect-** (ver): inspect, perspective.",
        },
      ],
      vocabulary: [
        { en: "etymology", pt: "etimologia", say: "é-ti-MÓ-lo-dji" },
        { en: "root", pt: "raiz", say: "RÚUT" },
        { en: "benevolent", pt: "benevolente", say: "be-NÉ-vo-lent" },
        { en: "malfunction", pt: "mau funcionamento", say: "mél-FÂNK-shan" },
        { en: "contradict", pt: "contradizer", say: "con-tra-DÍKT" },
        { en: "chronology", pt: "cronologia", say: "cro-NÓ-lo-dji" },
        { en: "Germanic", pt: "germânico", say: "djer-MÉ-nik" },
        { en: "Latinate", pt: "de origem latina", say: "LÉ-ti-nêit" },
        { en: "cognate", pt: "cognato", say: "CÓG-nêit" },
      ],
      examples: [
        { en: "'Begin' is Germanic; 'commence' is Latinate and more formal.", pt: "'Begin' é germânico; 'commence' é latino e mais formal." },
        { en: "If you know 'dict' means 'say', you can guess 'contradict'.", pt: "Se você sabe que 'dict' é 'dizer', deduz 'contradict'." },
        { en: "Cognates make formal English easier for Brazilians.", pt: "Cognatos tornam o inglês formal mais fácil para brasileiros." },
      ],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "Mais formal (latina):", options: ["buy", "purchase"], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Mais cotidiana (germânica):", options: ["inquire", "ask"], answer: 1 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"spect-\" significa:", options: ["ver", "levar", "dizer"], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Pela raiz, \"benevolent\" significa:", options: ["Que quer o bem", "Que quer o mal", "Que é rápido"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "The machine stopped because of a ___. (mau funcionamento)", accepted: ["malfunction"] },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue germânica → latina.", pairs: [["begin", "commence"], ["help", "assist"], ["ask", "inquire"], ["buy", "purchase"]] },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha o registro.", audio: "The ceremony will commence shortly. Please refrain from using flash photography.", options: ["Formal, palavras latinas.", "Informal, palavras germânicas."], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Escreva o que você ouviu.", audio: "Don't contradict me.", accepted: ["don't contradict me", "do not contradict me"] },
      ],
      conversation: {
        goal: "Brinque com o professor de deduzir o sentido de palavras desconhecidas pelas raízes e de trocar registros (germânico ↔ latino).",
        starter: "I'll give you some rare words, and you guess their meaning from the roots: 'circumspect', 'malevolent', 'synchronize'.",
      },
      review: ["Germânico = cotidiano; latino = formal.", "Raízes: bene, mal, dict, spect, port, chron.", "Cognatos ajudam brasileiros no inglês formal."],
    }),

    buildLesson("c2-m4-test", M, 5, {
      kind: "test",
      title: "Avaliação do módulo: Lexicon",
      objective: "Comprovar vocabulário de proficiência.",
      explanation: [{ title: "Como funciona", body: "Exercícios misturados de todo o módulo. Você precisa de **70%** para liberar o próximo módulo." }],
      vocabulary: [],
      examples: [],
      exercises: [
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Ubiquitous\":", options: ["Onipresente", "Raro", "Ambíguo"], answer: 0 },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"Mitigate\" × \"exacerbate\": reduzir danos é", options: ["mitigate", "exacerbate"], answer: 0 },
        { type: "fill_blank", skill: "vocabulary", sentence: "It turned out to be a blessing in ___.", accepted: ["disguise"] },
        { type: "fill_blank", skill: "vocabulary", sentence: "The parties settled out of ___.", accepted: ["court"] },
        { type: "multiple_choice", skill: "vocabulary", prompt: "Mais formal:", options: ["commence", "start"], answer: 0 },
        { type: "translate", skill: "writing", prompt: "Foi a gota d'água.", accepted: ["It was the last straw.", "That was the last straw."] },
        { type: "word_order", skill: "grammar", prompt: "O prognóstico é muito bom.", answer: "The prognosis is very good." },
        { type: "multiple_choice", skill: "vocabulary", prompt: "\"port-\" (export, portable) significa:", options: ["levar", "ver", "dizer"], answer: 0 },
        { type: "listening", skill: "listening", prompt: "Ouça e escolha.", audio: "The company's cash flow is healthy, despite the bear market.", options: ["Fluxo de caixa saudável apesar do mercado em queda.", "A empresa está quebrando.", "O mercado está em alta."], answer: 0 },
        { type: "match_pairs", skill: "vocabulary", prompt: "Ligue.", pairs: [["candid", "franco"], ["defendant", "réu"], ["silver lining", "lado bom"], ["cognate", "cognato"]] },
      ],
      review: ["Revise os pontos onde errou antes de tentar novamente."],
    }),
  ],
};
