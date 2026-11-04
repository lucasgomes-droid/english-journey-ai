// Tipos do conteúdo pedagógico. O conteúdo vive no código (versionado no GitHub)
// e é espelhado no banco pelo script `npm run content:sql`.

export type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type Skill = "vocabulary" | "grammar" | "listening" | "reading" | "writing" | "speaking";

export interface VocabItem {
  id: string;
  en: string;
  pt: string;
  /** Pronúncia aproximada escrita para falantes de português. */
  say: string;
  example?: { en: string; pt: string };
}

export interface ExplanationBlock {
  title: string;
  /** Texto em português. Suporta **negrito** simples. */
  body: string;
  /** Tabela opcional (ex.: conjugações). */
  table?: { head: string[]; rows: string[][] };
}

interface ExerciseBase {
  id: string;
  skill: Skill;
  /** Dica opcional exibida após o erro. */
  explain?: string;
}

export interface MultipleChoiceExercise extends ExerciseBase {
  type: "multiple_choice";
  prompt: string;
  options: string[];
  /** Índice da opção correta. */
  answer: number;
}

export interface TranslateExercise extends ExerciseBase {
  type: "translate";
  /** Frase em português para traduzir para o inglês. */
  prompt: string;
  /** Traduções aceitas (a primeira é a exibida como correção). */
  accepted: string[];
}

export interface FillBlankExercise extends ExerciseBase {
  type: "fill_blank";
  /** Frase com "___" no lugar da lacuna. */
  sentence: string;
  translation?: string;
  accepted: string[];
}

export interface WordOrderExercise extends ExerciseBase {
  type: "word_order";
  /** Tradução em português da frase a montar. */
  prompt: string;
  /** Frase correta; as palavras são embaralhadas na tela. */
  answer: string;
  /** Palavras extras de distração (opcional). */
  distractors?: string[];
}

export interface ListeningExercise extends ExerciseBase {
  type: "listening";
  /** Texto falado pelo sintetizador de voz. */
  audio: string;
  /** Se houver opções, é múltipla escolha; senão o aluno digita o que ouviu. */
  options?: string[];
  answer?: number;
  /** Para ditado: transcrições aceitas. */
  accepted?: string[];
  prompt: string;
}

export interface MatchPairsExercise extends ExerciseBase {
  type: "match_pairs";
  prompt: string;
  pairs: [string, string][];
}

export type Exercise =
  | MultipleChoiceExercise
  | TranslateExercise
  | FillBlankExercise
  | WordOrderExercise
  | ListeningExercise
  | MatchPairsExercise;

export type ExerciseType = Exercise["type"];

export interface Lesson {
  id: string;
  moduleId: string;
  order: number;
  kind: "lesson" | "test";
  title: string;
  /** Objetivo da aula, em português. */
  objective: string;
  xp: number;
  explanation: ExplanationBlock[];
  vocabulary: VocabItem[];
  examples: { en: string; pt: string }[];
  exercises: Exercise[];
  /** Roteiro de conversa com o professor de IA ao final da aula. */
  conversation?: { goal: string; starter: string };
  /** Pontos-chave para revisão. */
  review: string[];
  /** Nota mínima (0–100) para concluir. */
  passScore: number;
  /** Mini-aula: situação de conversa ligada (Conversa livre). */
  scenarioId?: string;
}

export interface Module {
  id: string;
  level: CefrLevel;
  order: number;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Level {
  code: CefrLevel;
  name: string;
  description: string;
  modules: Module[];
}
