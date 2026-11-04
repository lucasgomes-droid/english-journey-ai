import Link from "next/link";
import { Plus } from "lucide-react";
import { getSession } from "@/lib/data";
import { getLesson } from "@/content/curriculum";
import { isAiConfigured, isSttConfigured } from "@/lib/ai";
import { TutorChat, type ChatMsg } from "./tutor-chat";

export const metadata = { title: "Professor IA" };

export default async function TutorPage({ searchParams }: { searchParams: Promise<{ c?: string; aula?: string }> }) {
  const { c, aula } = await searchParams;
  const { supabase, user, profile } = await getSession();

  const { data: convs } = await supabase
    .from("conversations")
    .select("id, title, updated_at")
    .eq("user_id", user.id)
    .eq("mode", "tutor")
    .order("updated_at", { ascending: false })
    .limit(30);

  let initial: ChatMsg[] = [];
  let conversationId: string | null = null;
  if (c) {
    const { data: msgs } = await supabase
      .from("messages")
      .select("id, role, content, correction, tip")
      .eq("conversation_id", c)
      .eq("user_id", user.id)
      .order("id")
      .limit(200);
    if (msgs?.length) {
      conversationId = c;
      initial = msgs.map((m) => ({ id: String(m.id), role: m.role, content: m.content, correction: m.correction, tip: m.tip }));
    }
  }

  const lesson = !conversationId && aula ? getLesson(aula) : undefined;
  if (lesson?.conversation) {
    initial = [{ id: "starter", role: "assistant", content: lesson.conversation.starter, correction: null, tip: null }];
  }
  const firstName = profile?.display_name.split(" ")[0] ?? "";

  return (
    <main className="grid gap-6 lg:grid-cols-[15rem_1fr]">
      <aside className="order-2 lg:order-1">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Conversas</h2>
          <Link href="/professor" className="btn-ghost px-3 py-1.5 text-sm">
            <Plus size={16} aria-hidden /> Nova
          </Link>
        </div>
        <ul className="mt-3 space-y-1">
          {(convs ?? []).map((cv) => (
            <li key={cv.id}>
              <Link
                href={`/professor?c=${cv.id}`}
                className={`block truncate rounded-xl px-3 py-2 ${cv.id === conversationId ? "bg-surface-2 font-bold" : "hover:bg-surface-2"}`}
              >
                {cv.title}
              </Link>
            </li>
          ))}
          {!convs?.length && <li className="text-sm text-muted">Suas conversas ficam salvas aqui.</li>}
        </ul>
      </aside>

      <section className="order-1 lg:order-2">
        <h1 className="font-display text-4xl font-bold">Professor IA</h1>
        <p className="mt-1 text-muted">
          {lesson ? `Prática da aula “${lesson.title}”: ${lesson.conversation?.goal}` : "Converse livremente em inglês, por texto ou voz. O Alex corrige seus erros e explica em português."}
        </p>
        {!isAiConfigured() ? (
          <div className="panel mt-6 p-6">
            <p className="font-display text-xl font-bold">O professor de IA ainda não foi ativado</p>
            <p className="mt-2 text-muted">
              Para conversar, o administrador precisa definir a variável <code>AI_API_KEY</code> no servidor (Vercel → Settings → Environment Variables). O README explica como criar uma chave gratuita da Groq em poucos minutos.
            </p>
          </div>
        ) : (
          <TutorChat
            key={conversationId ?? `new-${aula ?? ""}`}
            initial={initial}
            conversationId={conversationId}
            lessonId={lesson?.id ?? null}
            voiceEnabled={isSttConfigured()}
            studentName={firstName}
          />
        )}
      </section>
    </main>
  );
}
