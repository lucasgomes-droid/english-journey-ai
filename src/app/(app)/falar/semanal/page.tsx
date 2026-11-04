import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSession } from "@/lib/data";
import { WEEKLY_PROMPT } from "@/content/speaking-topics";
import { FreeSpeaking } from "@/components/free-speaking";
import { SpeakButton } from "@/components/speak-button";

export const metadata = { title: "Gravação semanal" };

const DATE = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric", timeZone: "America/Sao_Paulo" });

/** Início da janela de 7 dias (calculado no servidor a cada requisição). */
function sevenDaysAgo() {
  return Date.now() - 7 * 86_400_000;
}

export default async function SemanalPage() {
  const { supabase, user } = await getSession();
  const { data: rows } = await supabase
    .from("speaking_sessions")
    .select("id, created_at, wpm, words, unique_words, pauses, fillers, speech_seconds, transcript, audio_path")
    .eq("user_id", user.id)
    .eq("kind", "weekly")
    .order("created_at", { ascending: false })
    .limit(30);
  const sessions = rows ?? [];
  const paths = sessions.map((s) => s.audio_path).filter((p): p is string => Boolean(p));
  const signed = new Map<string, string>();
  if (paths.length) {
    const { data } = await supabase.storage.from("recordings").createSignedUrls(paths, 3600).catch(() => ({ data: null }));
    for (const s of data ?? []) if (s.signedUrl && s.path) signed.set(s.path, s.signedUrl);
  }
  const weekAgo = sevenDaysAgo();
  const doneThisWeek = sessions.some((s) => Date.parse(s.created_at) > weekAgo);
  const first = sessions[sessions.length - 1];
  const last = sessions[0];

  return (
    <main className="mx-auto max-w-2xl">
      <Link href="/praticar" className="inline-flex items-center gap-1 text-sm font-bold text-muted hover:text-ink">
        <ArrowLeft size={16} aria-hidden /> Praticar
      </Link>
      <h1 className="mt-1 font-display text-4xl font-bold">Gravação semanal</h1>
      <p className="mt-2 text-muted">
        Uma vez por semana, grave até 2 minutos respondendo sempre à mesma pergunta. Daqui a alguns meses você vai ouvir a diferença na sua própria voz.
      </p>
      <div className="mt-4 rounded-2xl bg-boarding/20 p-4">
        <p className="flex items-start gap-3 font-display text-xl font-bold" lang="en">
          {WEEKLY_PROMPT.en} <SpeakButton text={WEEKLY_PROMPT.en} size="sm" />
        </p>
        <p className="mt-1 text-sm">{WEEKLY_PROMPT.pt}</p>
      </div>
      {doneThisWeek && <p className="mt-4 rounded-xl bg-correct-bg p-3 text-sm text-correct">Você já gravou nesta semana. Pode gravar de novo se quiser; todas ficam no histórico.</p>}
      <div className="mt-6">
        <FreeSpeaking kind="weekly" maxSeconds={120} minSeconds={30} />
      </div>

      {sessions.length > 1 && first && last && (
        <section className="panel mt-8 p-5">
          <h2 className="font-display text-2xl font-bold">Sua evolução</h2>
          <p className="text-sm text-muted">
            Primeira gravação ({DATE.format(new Date(first.created_at))}) × mais recente ({DATE.format(new Date(last.created_at))})
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            {[
              ["palavras/min", first.wpm, last.wpm],
              ["palavras diferentes", first.unique_words, last.unique_words],
              ["pausas longas", first.pauses, last.pauses],
            ].map(([label, a, b]) => (
              <div key={label as string} className="rounded-xl bg-surface-2 p-3">
                <p className="font-display text-2xl font-bold">
                  {a} → {b}
                </p>
                <p className="text-sm text-muted">{label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {sessions.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-2xl font-bold">Histórico</h2>
          <ul className="mt-3 space-y-3">
            {sessions.map((s) => (
              <li key={s.id} className="panel p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-bold">{DATE.format(new Date(s.created_at))}</span>
                  <span className="text-sm text-muted">
                    {s.wpm} p/min · {s.words} palavras · {s.unique_words} diferentes · {s.pauses} pausas
                  </span>
                </div>
                {s.audio_path && signed.get(s.audio_path) ? (
                  <audio controls preload="none" src={signed.get(s.audio_path)} className="mt-3 w-full" />
                ) : (
                  <p className="mt-2 text-xs text-muted">Áudio não guardado nesta gravação.</p>
                )}
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm font-bold text-atlantic">Ver o que você disse</summary>
                  <p className="mt-1 text-sm text-muted" lang="en">
                    {s.transcript}
                  </p>
                </details>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
