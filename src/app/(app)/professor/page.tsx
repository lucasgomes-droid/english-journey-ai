import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { getSession } from "@/lib/data";
import { getLesson } from "@/content/curriculum";
import { CUSTOM_CHARACTER, getScenario, missionFor } from "@/content/scenarios";
import { isAiConfigured, isSttConfigured } from "@/lib/ai";
import { TutorChat, type ChatMsg } from "./tutor-chat";

export const metadata = { title: "Conversar" };

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

export default async function TutorPage({ searchParams }: { searchParams: Promise<{ c?: string; aula?: string; cenario?: string; nivel?: string; cena?: string; ligar?: string }> }) {
  const sp = await searchParams;
  const { supabase, user, profile } = await getSession();

  const [{ data: convs }, convRes, msgsRes] = await Promise.all([
    supabase.from("conversations").select("id, title, updated_at, mode").eq("user_id", user.id).order("updated_at", { ascending: false }).limit(30),
    sp.c ? supabase.from("conversations").select("id, scenario_id, custom_prompt, level_code, lesson_id").eq("id", sp.c).eq("user_id", user.id).maybeSingle() : Promise.resolve({ data: null }),
    sp.c
      ? supabase.from("messages").select("id, role, content, correction, tip").eq("conversation_id", sp.c).eq("user_id", user.id).order("id").limit(200)
      : Promise.resolve({ data: null }),
  ]);

  const conv = convRes.data;
  const conversationId = conv?.id ?? null;
  let initial: ChatMsg[] = (msgsRes.data ?? []).map((m) => ({ id: String(m.id), role: m.role, content: m.content, correction: m.correction, tip: m.tip }));

  // Personagem: de uma conversa existente ou da escolha atual.
  const scenario = getScenario(conv?.scenario_id ?? sp.cenario ?? "");
  const customPrompt = conv ? conv.custom_prompt : sp.cena?.trim().slice(0, 400) || null;
  const level = conv?.level_code ?? (LEVELS.includes(sp.nivel ?? "") ? sp.nivel! : (profile?.current_level ?? "A1"));
  const lesson = !conversationId && sp.aula ? getLesson(sp.aula) : undefined;

  if (!conversationId) {
    if (scenario) initial = [{ id: "starter", role: "assistant", content: scenario.opener, correction: null, tip: null }];
    else if (lesson?.conversation) initial = [{ id: "starter", role: "assistant", content: lesson.conversation.starter, correction: null, tip: null }];
  }
  const persona = scenario ? scenario.character : customPrompt ? CUSTOM_CHARACTER : null;
  const firstName = profile?.display_name.split(" ")[0] ?? "";
  const heading = scenario ? scenario.title : customPrompt ? "Minha cena" : lesson ? `Prática: ${lesson.title}` : "Professor Alex";

  return (
    <main className="grid gap-6 lg:grid-cols-[15rem_1fr]">
      <aside className="order-2 lg:order-1">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">Histórico</h2>
          <Link href="/conversar" className="btn-ghost px-3 py-1.5 text-sm">
            <Plus size={16} aria-hidden /> Nova
          </Link>
        </div>
        <ul className="mt-3 space-y-1">
          {(convs ?? []).map((cv) => (
            <li key={cv.id}>
              <Link href={`/professor?c=${cv.id}`} className={`block truncate rounded-xl px-3 py-2 ${cv.id === conversationId ? "bg-surface-2 font-bold" : "hover:bg-surface-2"}`}>
                {cv.title}
              </Link>
            </li>
          ))}
          {!convs?.length && <li className="text-sm text-muted">Suas conversas ficam salvas aqui.</li>}
        </ul>
      </aside>

      <section className="order-1 min-w-0 lg:order-2">
        <Link href="/conversar" className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
          <ArrowLeft size={16} aria-hidden /> Situações
        </Link>
        <h1 className="mt-1 font-display text-3xl font-bold sm:text-4xl">{heading}</h1>
        {!scenario && !customPrompt && (
          <p className="mt-1 text-muted">
            {lesson ? lesson.conversation?.goal : "Converse livremente em inglês, por texto ou voz. O Alex corrige seus erros e explica em português."}
          </p>
        )}
        {!isAiConfigured() ? (
          <div className="panel mt-6 p-6">
            <p className="font-display text-xl font-bold">A conversa com IA ainda não foi ativada</p>
            <p className="mt-2 text-muted">
              Defina a variável <code>AI_API_KEY</code> no servidor (Vercel → Settings → Environment Variables). O README explica como criar uma chave gratuita da Groq.
            </p>
          </div>
        ) : (
          <TutorChat
            key={conversationId ?? `new-${sp.aula ?? ""}-${scenario?.id ?? ""}-${customPrompt ?? ""}-${level}`}
            initial={initial}
            conversationId={conversationId}
            lessonId={lesson?.id ?? null}
            scenarioId={scenario?.id ?? null}
            customPrompt={customPrompt}
            level={scenario || customPrompt ? level : null}
            persona={persona}
            goals={scenario?.goals ?? []}
            scene={scenario ? { place: scenario.place, ...missionFor(scenario, level) } : null}
            voiceEnabled={isSttConfigured()}
            startInCall={sp.ligar === "1"}
            studentName={firstName}
            intensity={profile?.correction_intensity ?? "normal"}
          />
        )}
      </section>
    </main>
  );
}
