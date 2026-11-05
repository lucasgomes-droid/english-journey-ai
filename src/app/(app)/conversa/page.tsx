import Link from "next/link";
import { History, MapPin } from "lucide-react";
import { getSession } from "@/lib/data";
import { isAiConfigured } from "@/lib/ai";
import { VoiceTutor, type TutorMode, type TutorMsg } from "@/components/voice-tutor";
import { TalkingPeople } from "@/components/illustrations";

export const metadata = { title: "Conversa" };

const MODES: { id: TutorMode; title: string; text: string }[] = [
  { id: "livre", title: "Livre", text: "Conversa natural, sem roteiro. Correções discretas, só no que importa." },
  { id: "professor", title: "Professor", text: "Correções detalhadas de gramática, vocabulário e pronúncia, com frases para repetir." },
  { id: "imersao", title: "Imersão", text: "Só inglês. Peça ajuda em português quando precisar." },
];
const DATE = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" });

export default async function ConversaPage({ searchParams }: { searchParams: Promise<{ c?: string; modo?: string }> }) {
  const sp = await searchParams;
  const { supabase, user, profile } = await getSession();
  const [convRes, msgsRes, histRes] = await Promise.all([
    sp.c ? supabase.from("conversations").select("id, tutor_mode, level_code").eq("id", sp.c).eq("user_id", user.id).not("tutor_mode", "is", null).maybeSingle() : Promise.resolve({ data: null }),
    sp.c ? supabase.from("messages").select("id, role, content, correction, tip, practice, via_voice").eq("conversation_id", sp.c).eq("user_id", user.id).order("id").limit(300) : Promise.resolve({ data: null }),
    supabase.from("conversations").select("id, title, tutor_mode, updated_at, report_score").eq("user_id", user.id).not("tutor_mode", "is", null).order("updated_at", { ascending: false }).limit(12),
  ]);
  const conv = convRes.data;
  const mode = ((conv?.tutor_mode as TutorMode | undefined) ?? (MODES.some((m) => m.id === sp.modo) ? sp.modo : "livre")) as TutorMode;
  const level = (conv?.level_code as string | undefined) ?? profile?.current_level ?? "A1";
  const initial: TutorMsg[] = conv
    ? (msgsRes.data ?? []).map((m) => {
        // Resposta com abertura em português fica salva como "abertura\ninglês".
        const nl = m.role === "assistant" ? (m.content as string).indexOf("\n") : -1;
        return { id: String(m.id), role: m.role, content: nl > 0 ? m.content.slice(nl + 1) : m.content, intro: nl > 0 ? m.content.slice(0, nl) : null, correction: m.correction, tip: m.tip, practice: m.practice, voice: m.via_voice };
      })
    : [];

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_20rem] [&>*]:min-w-0">
      <main className="space-y-4">
        <header>
          <h1 className="font-display text-3xl font-bold">Conversa com o professor</h1>
          <p className="mt-1 text-muted">Fale por voz, em português ou inglês, sobre qualquer assunto. O professor corrige, ensina e pede para você repetir as frases novas.</p>
        </header>

        <nav aria-label="Modo da conversa" className="grid grid-cols-3 gap-2">
          {MODES.map((m) => (
            <Link
              key={m.id}
              href={`/conversa?modo=${m.id}`}
              aria-current={m.id === mode ? "true" : undefined}
              className={`rounded-2xl border-2 p-2.5 text-center sm:p-3 sm:text-left ${m.id === mode ? "border-atlantic bg-surface" : "border-line bg-surface/60 hover:border-atlantic/50"}`}
            >
              <span className="block font-bold">
                <span className="hidden sm:inline">Modo </span>
                {m.title}
              </span>
              <span className="hidden text-sm text-muted sm:block">{m.text}</span>
            </Link>
          ))}
        </nav>
        {conv && <p className="text-sm text-muted">Continuando uma conversa no modo {MODES.find((m) => m.id === mode)!.title}. Escolher um modo acima começa uma conversa nova.</p>}

        {isAiConfigured() ? (
          <VoiceTutor key={conv?.id ?? `new-${mode}`} initial={initial} conversationId={conv?.id ?? null} mode={mode} level={level} studentName={profile?.display_name.split(" ")[0] ?? ""} />
        ) : (
          <p className="panel p-6">O professor de IA ainda não foi ativado no servidor (AI_API_KEY).</p>
        )}
      </main>

      <aside className="space-y-5" aria-label="Situações e histórico">
        <Link href="/conversar" className="panel flex items-center gap-4 p-5 hover:border-atlantic">
          <TalkingPeople className="h-20 w-24 shrink-0" />
          <span>
            <span className="flex items-center gap-1.5 font-display text-lg font-bold">
              <MapPin size={16} aria-hidden /> Situações reais
            </span>
            <span className="block text-sm text-muted">Café, aeroporto, mercado, trabalho… com missão e personagens.</span>
          </span>
        </Link>
        <section className="panel p-5" aria-labelledby="historico">
          <h2 id="historico" className="flex items-center gap-2 font-display text-lg font-bold">
            <History size={18} aria-hidden /> Conversas anteriores
          </h2>
          {histRes.data?.length ? (
            <ul className="mt-2 space-y-1">
              {histRes.data.map((h) => (
                <li key={h.id}>
                  <Link href={`/conversa?c=${h.id}`} className={`flex items-center justify-between gap-2 rounded-xl px-2 py-2 text-sm hover:bg-surface-2 ${h.id === conv?.id ? "bg-surface-2 font-bold" : ""}`}>
                    <span className="min-w-0 truncate">{h.title}</span>
                    <span className="shrink-0 text-xs text-muted">
                      {h.report_score !== null ? `${h.report_score} · ` : ""}
                      {DATE.format(new Date(h.updated_at))}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-muted">Suas conversas ficam salvas aqui, com o relatório de cada uma.</p>
          )}
        </section>
      </aside>
    </div>
  );
}
