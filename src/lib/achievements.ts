export interface AchievementDef {
  code: string;
  title: string;
  description: string;
  icon: string; // nome de ícone lucide
}

export const ACHIEVEMENTS: AchievementDef[] = [
  { code: "first_lesson", title: "Primeiro passo", description: "Concluiu a primeira aula.", icon: "Footprints" },
  { code: "five_lessons", title: "Ganhando ritmo", description: "Concluiu 5 aulas.", icon: "Rocket" },
  { code: "module_done", title: "Unidade completa", description: "Passou na avaliação de uma unidade.", icon: "Flag" },
  { code: "perfect_lesson", title: "Sem erros", description: "Tirou 100% em uma aula.", icon: "Sparkles" },
  { code: "streak_3", title: "3 dias seguidos", description: "Estudou 3 dias em sequência.", icon: "Flame" },
  { code: "streak_7", title: "Uma semana firme", description: "Estudou 7 dias em sequência.", icon: "CalendarCheck" },
  { code: "xp_500", title: "500 XP", description: "Acumulou 500 pontos de experiência.", icon: "Trophy" },
  { code: "first_chat", title: "Primeira conversa", description: "Conversou com o professor de IA.", icon: "MessageCircle" },
  { code: "reviewer", title: "Memória afiada", description: "Fez 50 revisões.", icon: "Brain" },
  { code: "level_up", title: "Subiu de nível", description: "Passou em um teste de nível.", icon: "Award" },
];

export interface AchievementStats {
  lessonsCompleted: number;
  passedTestsCount: number;
  perfectLesson: boolean;
  streak: number;
  xp: number;
  chats: number;
  reviews: number;
  levelUps: number;
}

export function earnedAchievements(s: AchievementStats): string[] {
  const out: string[] = [];
  if (s.lessonsCompleted >= 1) out.push("first_lesson");
  if (s.lessonsCompleted >= 5) out.push("five_lessons");
  if (s.passedTestsCount >= 1) out.push("module_done");
  if (s.perfectLesson) out.push("perfect_lesson");
  if (s.streak >= 3) out.push("streak_3");
  if (s.streak >= 7) out.push("streak_7");
  if (s.xp >= 500) out.push("xp_500");
  if (s.chats >= 1) out.push("first_chat");
  if (s.reviews >= 50) out.push("reviewer");
  if (s.levelUps >= 1) out.push("level_up");
  return out;
}
