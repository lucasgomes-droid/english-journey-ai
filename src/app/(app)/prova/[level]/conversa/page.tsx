import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Target } from "lucide-react";
import { EXAM_PASS, getLevelExam } from "@/content/level-exams";
import { getSession } from "@/lib/data";
import { loadLevelExam } from "@/lib/exams";
import { ConversationExam } from "@/components/exam/conversation-exam";

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  return { title: `Prova ${level.toUpperCase()} · Conversation` };
}

export default async function ConversationExamPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  const exam = getLevelExam(level);
  if (!exam) notFound();
  const { supabase, user } = await getSession();
  const { state } = await loadLevelExam(supabase, user.id, exam.level);
  const st = state.parts.conversation;
  return (
    <main className="mx-auto max-w-2xl space-y-4">
      <Link href={`/prova/${exam.level}`} className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft size={16} aria-hidden /> Prova de nível {exam.level}
      </Link>
      <header>
        <h1 className="font-display text-3xl font-bold">Conversation · {exam.conversation.title}</h1>
        <p className="mt-1 text-muted">{exam.conversation.setting_pt}</p>
        <p className="mt-3 flex gap-2 rounded-xl bg-boarding/20 p-3 text-sm">
          <Target size={18} className="shrink-0" aria-hidden /> <span><b>Sua missão:</b> {exam.conversation.goal_pt} Nota mínima: {EXAM_PASS.conversation}%.</span>
        </p>
      </header>
      <ConversationExam blocked={st.passed || !!st.lock} level={exam.level} total={exam.turns} passScore={EXAM_PASS.conversation} />
    </main>
  );
}
