import { AudioLines, BookOpen, CalendarCheck, Headphones, MessagesSquare, Phone, RotateCcw, Timer } from "lucide-react";
import { PAIR_SETS } from "@/content/minimal-pairs";
import { topicsFor } from "@/content/speaking-topics";
import { SCENARIOS } from "@/content/scenarios";
import { LISTENING } from "@/content/listening";
import type { DashboardData } from "@/lib/data";

export interface RoutineItem {
  href: string;
  icon: typeof BookOpen;
  title: string;
  detail: string;
  minutes: number;
  done: boolean;
}

/** Rotina do dia: o mínimo para evoluir todo dia — revisão, aula, fala, escuta e conversa. */
export function dailyRoutine(d: DashboardData): RoutineItem[] {
  const { profile, nextLesson } = d;
  const courseDone = !nextLesson && profile.current_level === "C2" && d.examPartsPassed.length === 3;
  const dayIndex = Math.floor(Date.parse(`${d.weekXp[6].date}T12:00:00Z`) / 86_400_000);
  const sceneToday = SCENARIOS[dayIndex % SCENARIOS.length];
  const levelListening = LISTENING.filter((l) => l.level === profile.current_level);
  const listeningToday = levelListening[dayIndex % Math.max(1, levelListening.length)] ?? LISTENING[0];
  const done = new Set(d.todayKinds);
  const levelTopics = topicsFor(profile.current_level);
  const speakTask = [
    { href: `/pronuncia/pares/${PAIR_SETS[dayIndex % PAIR_SETS.length].id}`, icon: AudioLines, title: "Fala do dia", detail: `Pares mínimos: ${PAIR_SETS[dayIndex % PAIR_SETS.length].title}` },
    levelTopics.length ? { href: `/falar/desafio/${levelTopics[dayIndex % levelTopics.length].id}`, icon: Timer, title: "Fala do dia", detail: `1 minuto: ${levelTopics[dayIndex % levelTopics.length].pt}` } : null,
    { href: `/pronuncia/shadowing/${listeningToday.id}`, icon: AudioLines, title: "Fala do dia", detail: `Shadowing: ${listeningToday.title}` },
  ].filter(Boolean)[dayIndex % 3] ?? { href: "/pronuncia", icon: AudioLines, title: "Fala do dia", detail: "Pronúncia" };
  const weeklyDue = !d.lastWeeklyAt || Date.parse(`${d.weekXp[6].date}T12:00:00Z`) - Date.parse(d.lastWeeklyAt) > 6 * 86_400_000;
  return [
    nextLesson && { href: `/aula/${nextLesson.id}`, icon: BookOpen, title: nextLesson.kind === "test" ? "Avaliação" : "Aula nova", detail: nextLesson.title, minutes: 10, done: done.has("lesson") || done.has("test") },
    !nextLesson && !courseDone && { href: `/prova/${profile.current_level}`, icon: BookOpen, title: "Prova de nível", detail: `Comprovar o ${profile.current_level}`, minutes: 15, done: done.has("test") },
    d.dueReviews > 0 && { href: "/revisao", icon: RotateCcw, title: "Revisão", detail: `${d.dueReviews} ${d.dueReviews === 1 ? "item" : "itens"}`, minutes: Math.min(10, Math.ceil(d.dueReviews / 3)), done: done.has("review") },
    { ...speakTask, minutes: 3, done: done.has("speaking") || done.has("pronunciation") },
    profile.daily_minutes >= 15 && { href: `/listening/${listeningToday.id}`, icon: Headphones, title: "Listening", detail: listeningToday.title, minutes: 5, done: done.has("listening") },
    profile.daily_minutes >= 20 && {
      href: dayIndex % 2 ? `/professor?cenario=${sceneToday.id}` : "/conversa",
      icon: dayIndex % 2 ? MessagesSquare : Phone,
      title: "Conversa do dia",
      detail: dayIndex % 2 ? sceneToday.title : "Professor por voz",
      minutes: Math.max(5, profile.daily_minutes - 25),
      done: done.has("chat") || done.has("scenario"),
    },
    weeklyDue && { href: "/falar/semanal", icon: CalendarCheck, title: "Gravação da semana", detail: "2 minutos para medir a evolução", minutes: 3, done: false },
  ].filter(Boolean) as RoutineItem[];
}
