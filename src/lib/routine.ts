import { AudioLines, BookOpen, CalendarCheck, Headphones, MessagesSquare, PenLine, RotateCcw, Shuffle, Target } from "lucide-react";
import type { DashboardData } from "@/lib/data";
import { DONE_BY, planDay, type BlockKind, type PlanInput } from "@/lib/planner";

export interface RoutineItem {
  href: string;
  icon: typeof BookOpen;
  title: string;
  detail: string;
  minutes: number;
  done: boolean;
}

export const BLOCK_ICON: Record<BlockKind, typeof BookOpen> = {
  review: RotateCcw,
  lesson: BookOpen,
  test: BookOpen,
  reinforce: Target,
  listening: Headphones,
  speaking: AudioLines,
  conversation: MessagesSquare,
  writing: PenLine,
  vocabulary: Shuffle,
  weekly: CalendarCheck,
};

const SKILL_KEY: Record<string, string> = { listening: "listening", speaking: "speaking", writing: "writing", vocabulary: "vocabulary", grammar: "grammar", reading: "reading" };

/** Entrada do planejador a partir do painel (sem o reforço por objetivo, que é calculado no Praticar). */
export function planInputFrom(d: DashboardData, reinforce: PlanInput["reinforce"] = []): PlanInput {
  const p = d.profile;
  const courseDone = !d.nextLesson && p.current_level === "C2" && d.examPartsPassed.length === 3;
  const today = Date.parse(`${d.weekXp[6].date}T12:00:00Z`);
  return {
    level: p.current_level,
    minutes: p.daily_minutes,
    studyDays: p.study_days?.length ? p.study_days : [0, 1, 2, 3, 4, 5, 6],
    focus: p.focus_skills ?? [],
    weak: d.skills.filter((s) => s.accuracy !== null && s.answers >= 5 && s.accuracy < 70).map((s) => SKILL_KEY[s.skill] ?? s.skill),
    dueReviews: d.dueReviews,
    reviewLimit: p.daily_review_limit ?? 20,
    nextLesson: d.nextLesson ? { id: d.nextLesson.id, title: d.nextLesson.title, kind: d.nextLesson.kind } : null,
    examDue: !d.nextLesson && !courseDone,
    reinforce,
    weeklyDue: !d.lastWeeklyAt || today - Date.parse(d.lastWeeklyAt) > 6 * 86_400_000,
  };
}

/** Rotina de hoje = o dia de hoje do cronograma (mesma regra do Praticar). */
export function dailyRoutine(d: DashboardData): RoutineItem[] {
  const dayNum = Math.floor(Date.parse(`${d.weekXp[6].date}T12:00:00Z`) / 86_400_000);
  const done = new Set(d.todayKinds);
  return planDay(planInputFrom(d), dayNum).map((b) => ({ href: b.href, icon: BLOCK_ICON[b.kind], title: b.title, detail: b.detail, minutes: b.minutes, done: DONE_BY[b.kind].some((k) => done.has(k)) }));
}
