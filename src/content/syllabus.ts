/**
 * Mapa completo do curso (scope & sequence) do A1 ao C2, alinhado ao CEFR.
 * Cada entrada vira uma aula. Quando uma aula ainda não tem conteúdo escrito em
 * src/content/<nível>/, ela aparece na trilha como "em produção" — nunca como
 * aula falsa. Este arquivo é o contrato do que o curso inteiro vai cobrir.
 */
import type { CefrLevel } from "./types";

export interface SyllabusLesson {
  title: string;
  /** Gramática / estrutura principal. */
  grammar: string;
  /** Tema de vocabulário. */
  vocab: string;
  /** "Ao final, você consegue..." */
  canDo: string;
}

export interface SyllabusModule {
  title: string;
  lessons: SyllabusLesson[];
}

export interface SyllabusLevel {
  code: CefrLevel;
  /** Horas guiadas estimadas para concluir o nível. */
  hours: number;
  /** Vocabulário ativo acumulado ao final do nível. */
  words: number;
  modules: SyllabusModule[];
}

const L = (title: string, grammar: string, vocab: string, canDo: string): SyllabusLesson => ({ title, grammar, vocab, canDo });

export const SYLLABUS: SyllabusLevel[] = [
  {
    code: "A1",
    hours: 90,
    words: 700,
    modules: [
      { title: "Primeiros passos", lessons: [
        L("Cumprimentos", "hello / good morning / how are you", "cumprimentos e despedidas", "cumprimentar e se despedir"),
        L("Apresentando-se", "my name is / I'm / what's your name", "apresentações", "dizer e perguntar nomes"),
        L("O verbo to be", "am / is / are, negativa e pergunta", "estados e profissões básicas", "dizer como está e quem é"),
        L("Números de 0 a 20 e idade", "how old are you / I'm 20", "números 0–20", "dizer e perguntar a idade"),
      ]},
      { title: "Meu mundo", lessons: [
        L("Países e nacionalidades", "where are you from / I'm from", "países, nacionalidades, idiomas", "dizer de onde você é"),
        L("Família", "possessivos my/your/his/her + 's", "família", "falar da família"),
        L("Profissões", "a / an, what do you do", "profissões e locais de trabalho", "dizer o que faz"),
        L("Objetos: this, that e plural", "this/that/these/those, plurais", "objetos do dia a dia", "nomear e apontar objetos"),
      ]},
      { title: "Dia a dia", lessons: [
        L("Minha rotina", "presente simples (afirmativa), advérbios de frequência", "rotina diária", "descrever a rotina"),
        L("Que horas são?", "what time is it / at + hora", "horas e partes do dia", "dizer e marcar horários"),
        L("Comida e bebida", "like/don't like, I'd like, some/any", "comida e bebida", "dizer preferências e pedir"),
        L("Perguntas com do e does", "do/does, respostas curtas", "verbos comuns", "fazer perguntas no presente"),
      ]},
      { title: "Casa e cidade", lessons: [
        L("Alfabeto e soletrar", "how do you spell...?", "alfabeto, e-mail, endereço", "soletrar nomes e e-mails"),
        L("Cores e roupas", "adjetivo antes do substantivo", "cores e roupas", "descrever o que alguém veste"),
        L("Minha casa", "there is / there are", "cômodos e móveis", "descrever a casa"),
        L("Onde fica?", "preposições in/on/under/next to/between", "lugares da cidade", "dizer onde as coisas estão"),
      ]},
      { title: "Habilidades e tempo livre", lessons: [
        L("O que você sabe fazer?", "can / can't", "habilidades", "falar de habilidades"),
        L("Hobbies", "like / love / hate + -ing", "hobbies e esportes", "falar do que gosta de fazer"),
        L("Dias, meses e datas", "on/in + datas, números ordinais", "dias, meses, aniversários", "dizer datas"),
        L("O tempo e as estações", "it's sunny / it's raining", "clima e estações", "falar do tempo"),
      ]},
      { title: "Compras e serviços", lessons: [
        L("Números grandes e preços", "how much is/are", "números até 1000, dinheiro", "perguntar e dizer preços"),
        L("Quanto e quantos", "how much / how many, contáveis", "mercado e quantidades", "fazer lista de compras"),
        L("Na loja de roupas", "can I try...? / too big", "tamanhos e compras", "comprar uma roupa"),
        L("No café", "can I have...? / would you like...?", "cardápio de café", "pedir num café"),
      ]},
      { title: "Agora e em movimento", lessons: [
        L("O que você está fazendo?", "presente contínuo", "ações do momento", "dizer o que está acontecendo agora"),
        L("Rotina ou agora?", "presente simples × contínuo", "atividades", "diferenciar hábito e momento"),
        L("Transporte", "by bus / on foot, how do you get to...?", "meios de transporte", "falar como se locomove"),
        L("Pedindo direções", "imperativo: turn left, go straight", "direções", "pedir e dar direções simples"),
      ]},
      { title: "Ontem", lessons: [
        L("Was e were", "passado do to be", "expressões de tempo passado", "dizer onde estava"),
        L("Verbos regulares no passado", "-ed e pronúncia /t/ /d/ /ɪd/", "atividades do fim de semana", "contar o que fez"),
        L("Verbos irregulares", "went, had, saw, ate, got...", "viagens curtas", "contar uma história simples"),
        L("Perguntas no passado", "did / didn't", "fim de semana", "perguntar sobre o passado"),
      ]},
    ],
  },
  {
    code: "A2",
    hours: 180,
    words: 1500,
    modules: [
      { title: "Experiências", lessons: [
        L("Contando histórias", "passado simples (revisão) + conectivos then/after that", "eventos de vida", "narrar acontecimentos em ordem"),
        L("O que você estava fazendo?", "passado contínuo", "acidentes e interrupções", "descrever cenas no passado"),
        L("Você já...?", "present perfect com ever/never", "experiências", "falar de experiências de vida"),
        L("Já e ainda não", "present perfect com already/yet/just", "tarefas", "dizer o que já fez"),
      ]},
      { title: "Planos e futuro", lessons: [
        L("Planos", "going to", "férias e planos", "falar de planos"),
        L("Compromissos", "presente contínuo para futuro", "agenda", "marcar compromissos"),
        L("Previsões e promessas", "will / won't", "futuro, decisões rápidas", "prometer e prever"),
        L("Convites", "would you like to...? / let's", "eventos sociais", "convidar, aceitar e recusar"),
      ]},
      { title: "Comparando", lessons: [
        L("Comparativos", "-er / more than", "adjetivos de descrição", "comparar coisas"),
        L("Superlativos", "the -est / the most", "lugares e recordes", "dizer o melhor e o pior"),
        L("Tão... quanto", "as...as, not as...as", "pessoas e cidades", "comparar com nuance"),
        L("Descrevendo pessoas", "look like / be like", "aparência e personalidade", "descrever pessoas"),
      ]},
      { title: "Obrigações e conselhos", lessons: [
        L("Regras", "have to / don't have to / must / mustn't", "trabalho e escola", "falar de regras"),
        L("Conselhos", "should / shouldn't", "saúde e problemas", "dar conselhos"),
        L("Na farmácia e no médico", "I've got a... / how long...?", "sintomas e remédios", "explicar um problema de saúde"),
        L("Pedidos educados", "could you...? / would you mind...?", "favores", "pedir com educação"),
      ]},
      { title: "Viagem", lessons: [
        L("No aeroporto", "perguntas indiretas simples", "check-in, bagagem, embarque", "resolver o básico no aeroporto"),
        L("No hotel", "I'd like to... / is there...?", "hotel e serviços", "fazer check-in e pedir serviços"),
        L("Turismo pela cidade", "imperativo + sequenciadores", "atrações e passeios", "pedir informações turísticas"),
        L("Problemas na viagem", "there's a problem with..., can you...?", "reclamações", "resolver um problema"),
      ]},
      { title: "Trabalho e estudos", lessons: [
        L("Meu trabalho", "presente simples × contínuo (revisão)", "tarefas e rotina de trabalho", "descrever o trabalho"),
        L("Ao telefone", "can I speak to...? / I'll call back", "telefonemas", "fazer uma ligação simples"),
        L("E-mails curtos", "I'm writing to... / please find", "e-mail informal e formal", "escrever um e-mail curto"),
        L("Quantidades", "a lot of / much / many / a few / a little", "orçamento e recursos", "falar de quantidades"),
      ]},
      { title: "Pessoas e relações", lessons: [
        L("Amizades", "phrasal verbs comuns: get on with, hang out", "relacionamentos", "falar de amigos"),
        L("Desde quando?", "present perfect com for/since", "vida e mudanças", "dizer há quanto tempo"),
        L("Costumava...", "used to", "infância", "falar do passado habitual"),
        L("Pronomes", "something/anyone/nowhere, reflexivos", "situações do dia a dia", "usar pronomes indefinidos"),
      ]},
      { title: "Mundo e notícias", lessons: [
        L("Primeira condicional", "if + presente, will", "meio ambiente", "falar de consequências reais"),
        L("Voz passiva simples", "is made / was built", "produtos e invenções", "descrever como algo é feito"),
        L("Gerúndio e infinitivo", "enjoy -ing / want to", "preferências", "usar verbos com -ing ou to"),
        L("Contando notícias", "passado simples × present perfect", "notícias", "relatar acontecimentos recentes"),
      ]},
    ],
  },
  {
    code: "B1",
    hours: 350,
    words: 2500,
    modules: [
      { title: "Narrativas", lessons: [
        L("Passado perfeito", "had + particípio", "histórias e mistérios", "contar histórias com sequência de tempo"),
        L("Tempos narrativos", "passado simples, contínuo e perfeito juntos", "acontecimentos marcantes", "narrar com riqueza"),
        L("Conectivos de narrativa", "while, as soon as, by the time", "viagens e aventuras", "ligar ideias na história"),
        L("Discurso indireto I", "said that / told me", "conversas", "relatar o que alguém disse"),
      ]},
      { title: "Hipóteses", lessons: [
        L("Segunda condicional", "if + passado, would", "sonhos e dilemas", "falar de situações imaginárias"),
        L("Wish e if only", "wish + passado", "arrependimentos e desejos", "expressar desejos"),
        L("Zero e primeira condicional", "fatos × possibilidades reais", "ciência e rotina", "diferenciar condicionais"),
        L("Unless, in case, as long as", "conjunções condicionais", "segurança e planejamento", "usar condições variadas"),
      ]},
      { title: "Opiniões", lessons: [
        L("Dando opinião", "I reckon / in my view / as far as I'm concerned", "temas do cotidiano", "defender um ponto de vista"),
        L("Concordar e discordar", "I see your point, but...", "debates", "discordar com educação"),
        L("Modais de dedução", "must / might / can't have", "mistérios", "fazer deduções"),
        L("Linguagem vaga e hesitação", "kind of / sort of / I mean", "conversa natural", "soar natural ao falar"),
      ]},
      { title: "Trabalho", lessons: [
        L("Entrevista de emprego", "present perfect contínuo", "carreira e competências", "responder em entrevistas"),
        L("Reuniões", "linguagem de reunião: let's move on", "projetos", "participar de reuniões"),
        L("E-mails profissionais", "registro formal, frases-padrão", "negócios", "escrever e-mails formais"),
        L("Apresentações curtas", "sinalização: firstly, to sum up", "apresentações", "apresentar um tema"),
      ]},
      { title: "Sociedade", lessons: [
        L("Voz passiva completa", "todos os tempos na passiva", "crimes e leis", "descrever processos e notícias"),
        L("Orações relativas", "who / which / that / whose / where", "pessoas e lugares", "dar detalhes sem repetir"),
        L("Tecnologia", "used to × be used to × get used to", "tecnologia e hábitos", "falar de adaptação"),
        L("Meio ambiente", "quantificadores: few/little/plenty of", "ecologia", "discutir problemas ambientais"),
      ]},
      { title: "Saúde e bem-estar", lessons: [
        L("Hábitos saudáveis", "verbos + gerúndio/infinitivo (mudança de sentido)", "saúde", "falar de hábitos"),
        L("No hospital", "perguntas indiretas", "emergências e sintomas", "explicar sintomas em detalhe"),
        L("Emoções", "adjetivos -ed × -ing", "sentimentos", "descrever emoções"),
        L("Phrasal verbs I", "separáveis e inseparáveis", "vida diária", "usar 30 phrasal verbs essenciais"),
      ]},
      { title: "Cultura", lessons: [
        L("Filmes e séries", "so / such, too / enough", "entretenimento", "recomendar e criticar"),
        L("Música e arte", "adjetivos fortes: amazing, awful", "artes", "descrever obras"),
        L("Diferenças culturais", "be supposed to / be allowed to", "costumes", "falar de normas culturais"),
        L("Discurso indireto II", "perguntas e ordens indiretas", "entrevistas", "relatar perguntas"),
      ]},
      { title: "Morar fora", lessons: [
        L("Alugando um imóvel", "linguagem de contrato simples", "aluguel e moradia", "negociar um aluguel"),
        L("Bancos e burocracia", "have something done", "serviços", "resolver serviços"),
        L("Fazendo amigos", "small talk e tag questions", "socialização", "puxar e manter conversa"),
        L("Reclamações", "linguagem diplomática", "problemas de consumo", "reclamar de forma eficaz"),
      ]},
    ],
  },
  {
    code: "B2",
    hours: 500,
    words: 4000,
    modules: [
      { title: "Tempos avançados", lessons: [
        L("Futuro contínuo e perfeito", "will be doing / will have done", "planos de longo prazo", "projetar o futuro com precisão"),
        L("Passado perfeito contínuo", "had been doing", "causas e consequências", "explicar situações passadas"),
        L("Formas do futuro", "be about to / be due to / be on the verge of", "eventos", "falar de futuro com nuance"),
        L("Hábitos com will e would", "will/would para hábitos", "personalidade", "descrever hábitos típicos"),
      ]},
      { title: "Condicionais e desejos", lessons: [
        L("Terceira condicional", "if + had done, would have", "decisões de vida", "falar de passado imaginário"),
        L("Condicionais mistas", "passado → presente e vice-versa", "consequências", "combinar tempos em hipóteses"),
        L("Arrependimentos", "should have / could have / wish + had", "erros e lições", "expressar arrependimento"),
        L("It's time / I'd rather", "subjuntivo informal", "preferências", "expressar preferências sofisticadas"),
      ]},
      { title: "Argumentação", lessons: [
        L("Ensaio argumentativo", "estrutura: tese, argumentos, contra-argumento", "temas sociais", "escrever um ensaio B2"),
        L("Conectivos avançados", "nevertheless, whereas, despite", "debates", "ligar ideias complexas"),
        L("Hedging", "it could be argued / tends to", "ciência e mídia", "atenuar afirmações"),
        L("Debates", "interromper e retomar a palavra", "polêmicas", "participar de debates"),
      ]},
      { title: "Inglês profissional", lessons: [
        L("Negociação", "condicionais em negociação", "acordos e contratos", "negociar condições"),
        L("Gestão de projetos", "passiva e linguagem de status", "prazos e entregas", "reportar status"),
        L("Feedback", "linguagem diplomática e softeners", "desempenho", "dar e receber feedback"),
        L("Networking", "small talk profissional", "eventos", "se apresentar profissionalmente"),
      ]},
      { title: "Vocabulário em profundidade", lessons: [
        L("Collocations", "make/do, strong/heavy", "collocations frequentes", "combinar palavras naturalmente"),
        L("Phrasal verbs II", "phrasal verbs de três partes", "trabalho e relações", "usar phrasal verbs avançados"),
        L("Formação de palavras", "prefixos e sufixos", "família de palavras", "deduzir e criar palavras"),
        L("Expressões idiomáticas I", "idioms comuns", "situações cotidianas", "entender idioms frequentes"),
      ]},
      { title: "Mídia e informação", lessons: [
        L("Discurso indireto avançado", "reporting verbs: claim, deny, urge", "notícias", "relatar com verbos precisos"),
        L("Passiva impessoal", "it is said that / he is believed to", "jornalismo", "relatar informações com distanciamento"),
        L("Fake news e fontes", "modais de probabilidade", "mídia", "avaliar informações"),
        L("Resumos", "paráfrase e nominalização", "textos informativos", "resumir textos"),
      ]},
      { title: "Escuta e fala autênticas", lessons: [
        L("Sotaques", "redução e ligação na fala rápida", "variedades do inglês", "entender sotaques diferentes"),
        L("Podcasts e entrevistas", "marcadores de discurso", "temas atuais", "acompanhar falas longas"),
        L("Contando anedotas", "tempos narrativos + ênfase", "histórias pessoais", "contar histórias com impacto"),
        L("Humor e ironia", "understatement e sarcasmo", "cultura", "perceber humor e ironia"),
      ]},
      { title: "Ênfase e estilo", lessons: [
        L("Frases clivadas", "what I need is... / it was... that", "ênfase", "enfatizar informações"),
        L("Inversão I", "never have I / not only... but also", "estilo formal", "usar inversão para ênfase"),
        L("Orações reduzidas", "participle clauses", "descrições", "escrever com concisão"),
        L("Registro", "formal × informal", "contextos variados", "ajustar o registro"),
      ]},
    ],
  },
  {
    code: "C1",
    hours: 700,
    words: 8000,
    modules: [
      { title: "Precisão gramatical", lessons: [
        L("Inversão avançada", "had I known / should you need / little did I", "estilo formal", "usar inversões condicionais"),
        L("Subjuntivo", "I suggest he be / it's vital that", "recomendações formais", "usar o subjuntivo"),
        L("Modais no passado", "needn't have / might well have", "especulação", "especular com precisão"),
        L("Elipse e substituição", "so / not / do so", "conversa e escrita", "evitar repetições"),
      ]},
      { title: "Escrita acadêmica", lessons: [
        L("Estrutura acadêmica", "parágrafo, coesão, referência", "pesquisa", "escrever textos acadêmicos"),
        L("Linguagem impessoal", "nominalização e passiva", "ciência", "escrever com objetividade"),
        L("Citar e parafrasear", "reporting verbs acadêmicos", "fontes", "integrar fontes ao texto"),
        L("Relatórios e propostas", "linguagem de recomendação", "negócios", "escrever relatórios"),
      ]},
      { title: "Fala persuasiva", lessons: [
        L("Retórica", "tríades, perguntas retóricas", "discursos", "persuadir uma audiência"),
        L("Apresentações complexas", "sinalização avançada", "dados e gráficos", "apresentar dados"),
        L("Discussões de alto nível", "concessão e refutação", "temas abstratos", "argumentar com nuance"),
        L("Improviso", "fillers naturais e reformulação", "perguntas difíceis", "responder sem preparar"),
      ]},
      { title: "Vocabulário avançado", lessons: [
        L("Idioms II", "idioms por tema", "trabalho, dinheiro, emoções", "usar idioms com naturalidade"),
        L("Sinônimos e conotação", "nuance e conotação", "descrição", "escolher a palavra exata"),
        L("Collocations avançadas", "adverb + adjective", "escrita formal", "escrever com sofisticação"),
        L("Linguagem figurada", "metáfora e metonímia", "literatura e mídia", "entender sentido figurado"),
      ]},
      { title: "Inglês corporativo", lessons: [
        L("Liderança", "linguagem de influência", "gestão", "liderar reuniões"),
        L("Negociação avançada", "concessões condicionais", "contratos", "negociar acordos complexos"),
        L("Gestão de crises", "linguagem de mitigação", "comunicação", "comunicar más notícias"),
        L("Entrevistas avançadas", "STAR e storytelling", "carreira", "convencer em entrevistas sênior"),
      ]},
      { title: "Compreensão avançada", lessons: [
        L("Textos longos", "inferência e atitude do autor", "artigos de opinião", "entender implícitos"),
        L("Palestras", "anotar e sintetizar", "ciência e sociedade", "acompanhar palestras"),
        L("Fala rápida e informal", "contrações informais: gonna, dunno", "conversa nativa", "entender fala rápida"),
        L("Literatura", "estilo narrativo", "contos", "ler ficção autêntica"),
      ]},
      { title: "Cultura e sociedade", lessons: [
        L("Política e economia", "linguagem de mídia", "atualidades", "discutir atualidades"),
        L("Ciência e ética", "hedging avançado", "tecnologia e bioética", "discutir dilemas"),
        L("Variedades do inglês", "britânico × americano × outros", "cultura", "reconhecer variedades"),
        L("Humor", "trocadilhos e duplo sentido", "cultura pop", "entender humor nativo"),
      ]},
      { title: "Estilo pessoal", lessons: [
        L("Ênfase avançada", "fronting e cleft avançado", "escrita criativa", "dar ritmo ao texto"),
        L("Coesão", "referência e substituição", "textos longos", "escrever com fluidez"),
        L("Tom e registro", "polidez e franqueza", "e-mails sensíveis", "ajustar o tom"),
        L("Revisão de texto", "erros persistentes de brasileiros", "autoedição", "revisar o próprio texto"),
      ]},
    ],
  },
  {
    code: "C2",
    hours: 1000,
    words: 16000,
    modules: [
      { title: "Domínio gramatical", lessons: [
        L("Estruturas raras", "were it not for / be that as it may", "estilo elevado", "usar estruturas literárias"),
        L("Modalidade sutil", "would that / it's as well that", "nuance", "expressar matizes de certeza"),
        L("Gramática da fala", "ellipsis, heads and tails", "conversa espontânea", "falar como nativo culto"),
        L("Pontuação e ritmo", "ponto e vírgula, travessão", "escrita avançada", "controlar o ritmo do texto"),
      ]},
      { title: "Escrita de alto nível", lessons: [
        L("Ensaios críticos", "argumentação sofisticada", "filosofia e sociedade", "escrever ensaios críticos"),
        L("Resenhas", "avaliação equilibrada", "livros, filmes, ideias", "resenhar com autoridade"),
        L("Escrita profissional", "concisão e clareza", "documentos executivos", "escrever documentos executivos"),
        L("Escrita criativa", "voz e estilo", "narrativa", "escrever ficção curta"),
      ]},
      { title: "Fala de alto nível", lessons: [
        L("Debates acadêmicos", "refutação elegante", "temas complexos", "debater em alto nível"),
        L("Mediação", "parafrasear posições", "conflitos", "mediar discussões"),
        L("Palestras", "storytelling e retórica", "conferências", "palestrar com impacto"),
        L("Conversa informal nativa", "gírias e expressões atuais", "vida social", "conversar sem esforço"),
      ]},
      { title: "Lexicon", lessons: [
        L("Vocabulário raro", "palavras de baixa frequência", "leitura avançada", "entender textos sofisticados"),
        L("Idioms e provérbios", "uso contextual", "cultura", "usar expressões culturais"),
        L("Jargões profissionais", "jurídico, médico, financeiro", "áreas técnicas", "transitar entre jargões"),
        L("Etimologia", "raízes latinas e germânicas", "formação de palavras", "deduzir palavras novas"),
      ]},
      { title: "Compreensão total", lessons: [
        L("Textos literários", "análise de estilo", "clássicos", "analisar literatura"),
        L("Textos acadêmicos densos", "argumentos implícitos", "artigos científicos", "ler pesquisa"),
        L("Mídia sem legendas", "fala sobreposta e sotaques", "programas e podcasts", "entender tudo o que ouve"),
        L("Ironia e subtexto", "implicatura", "crônicas", "captar o não dito"),
      ]},
      { title: "Pragmática e cultura", lessons: [
        L("Polidez e indiretividade", "atos de fala", "contextos sociais", "navegar normas sociais"),
        L("Registro extremo", "do muito formal ao gíria", "situações diversas", "mudar de registro com fluidez"),
        L("Referências culturais", "alusões", "cultura anglófona", "entender alusões"),
        L("Comunicação intercultural", "estratégias", "equipes globais", "comunicar entre culturas"),
      ]},
      { title: "Precisão e autoavaliação", lessons: [
        L("Erros fossilizados", "diagnóstico personalizado", "seus erros recorrentes", "eliminar erros persistentes"),
        L("Pronúncia refinada", "prosódia e ênfase", "fala expressiva", "falar com entonação nativa"),
        L("Tradução e interpretação", "equivalência", "PT ⇄ EN", "traduzir com naturalidade"),
        L("Preparação para exames", "formato CPE / IELTS 8+", "simulados", "fazer exames de proficiência"),
      ]},
      { title: "Projeto final", lessons: [
        L("Pesquisa", "integração de habilidades", "tema à escolha", "pesquisar em inglês"),
        L("Produção escrita", "texto longo", "tema à escolha", "produzir um texto longo"),
        L("Apresentação oral", "apresentação de 10 minutos", "tema à escolha", "apresentar sem roteiro"),
        L("Avaliação final C2", "todas as habilidades", "geral", "comprovar proficiência"),
      ]},
    ],
  },
];

export const syllabusLevel = (code: CefrLevel) => SYLLABUS.find((s) => s.code === code)!;
export const syllabusLessonCount = (code: CefrLevel) => syllabusLevel(code).modules.reduce((s, m) => s + m.lessons.length, 0);
