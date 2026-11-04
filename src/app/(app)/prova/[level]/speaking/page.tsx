import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { EXAM_PASS, getLevelExam } from "@/content/level-exams";
import { getSession } from "@/lib/data";
import { loadLevelExam } from "@/lib/exams";
import { SpeakingExam } from "@/components/exam/speaking-exam";

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  return { title: `Prova ${level.toUpperCase()} · Speaking` };
}

export default async function SpeakingExamPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  const exam = getLevelExam(level);
  if (!exam) notFound();
  const { supabase, user } = await getSession();
  const { state } = await loadLevelExam(supabase, user.id, exam.level);
  const st = state.parts.speaking;
  return (
    <main className="mx-auto max-w-2xl space-y-4">
      <Link href={`/prova/${exam.level}`} className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft size={16} aria-hidden /> Prova de nível {exam.level}
      </Link>
      <header>
        <h1 className="font-display text-3xl font-bold">Speaking · {exam.level}</h1>
        <p className="mt-1 text-muted">
          Responda às duas perguntas falando. Avaliamos vocabulário, gramática, fluência, organização e se você respondeu ao que foi pedido. Nota mínima: {EXAM_PASS.speaking}%.
        </p>
      </header>
      <SpeakingExam blocked={st.passed || !!st.lock} level={exam.level} prompts={exam.speaking} maxSeconds={exam.speakingSeconds} passScore={EXAM_PASS.speaking} />
    </main>
  );
}
