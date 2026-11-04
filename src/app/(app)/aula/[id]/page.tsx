import { notFound, redirect } from "next/navigation";
import { getLesson, getModule, isLessonUnlocked, ALL_LESSONS } from "@/content/curriculum";
import { getCompletedLessons, getSession } from "@/lib/data";
import { loadLevelExam } from "@/lib/exams";
import type { CefrLevel } from "@/content/types";
import { LessonPlayer } from "./lesson-player";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return { title: getLesson(id)?.title ?? "Aula" };
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = getLesson(id);
  if (!lesson) notFound();
  const { supabase, user, profile } = await getSession();
  const { completed } = await getCompletedLessons(supabase, user.id);
  if (!completed.has(id) && !isLessonUnlocked(id, completed, profile?.current_level)) redirect("/trilha");
  // Teste final = parte escrita da prova: com plano de recuperação aberto, a nova tentativa espera.
  let lockedHref: string | null = null;
  if (lesson.moduleId.endsWith("-final")) {
    const level = getModule(lesson.moduleId)!.level as CefrLevel;
    const { state } = await loadLevelExam(supabase, user.id, level);
    if (state.parts.written.lock === "plan") lockedHref = `/prova/${level}`;
  }

  const idx = ALL_LESSONS.findIndex((l) => l.id === id);
  const next = idx >= 0 ? ALL_LESSONS[idx + 1] : undefined; // mini-aulas não têm "próxima"
  return <LessonPlayer lesson={lesson} moduleTitle={getModule(lesson.moduleId)?.title ?? ""} nextLessonId={next?.id ?? null} lockedHref={lockedHref} />;
}
