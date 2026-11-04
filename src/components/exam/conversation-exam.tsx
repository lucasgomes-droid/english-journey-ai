"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Send } from "lucide-react";
import { unlockAudio, useVoice } from "@/lib/voice";
import { MicInput } from "@/components/mic-input";
import { SpeakButton } from "@/components/speak-button";
import { ExamResult, RubricBars, type ExamFeedbackView } from "./exam-result";

interface Turn {
  role: "examiner" | "student";
  text: string;
}
interface Final {
  score: number;
  rubric: Record<string, number>;
  feedback: ExamFeedbackView;
  passed: boolean;
  levelPassed: boolean;
  leveledUpTo: string | null;
}

export function ConversationExam({ blocked, level, total, passScore }: { blocked?: boolean; level: string; total: number; passScore: number }) {
  const router = useRouter();
  const { speak } = useVoice();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [final, setFinal] = useState<Final | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const said = turns.filter((t) => t.role === "student").length;

  async function call(body: object) {
    const res = await fetch("/api/exam/conversation", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Falha na conversa.");
    return data;
  }

  async function start() {
    unlockAudio();
    setBusy(true);
    setError(null);
    try {
      const d = await call({ action: "start", level });
      setSessionId(d.sessionId);
      setTurns(d.turns);
      speak(d.turns[0].text);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function send(text: string, voice: boolean) {
    const t = text.trim();
    if (!t || !sessionId || busy) return;
    unlockAudio();
    setBusy(true);
    setError(null);
    setTurns((x) => [...x, { role: "student", text: t }]);
    setDraft("");
    try {
      const d = await call({ action: "turn", sessionId, text: t, voice });
      if (d.done) {
        setFinal(d);
        router.refresh();
      } else {
        setTurns((x) => [...x, { role: "examiner", text: d.reply }]);
        speak(d.reply);
      }
    } catch (e) {
      setTurns((x) => x.slice(0, -1));
      setDraft(t);
      setError((e as Error).message);
    } finally {
      setBusy(false);
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }), 50);
    }
  }

  if (blocked && !final)
    return (
      <div className="panel p-6 text-center">
        <p className="text-muted">Esta parte não está disponível agora: ou você já foi aprovado, ou falta cumprir uma etapa anterior ou o plano de recuperação.</p>
        <Link href={`/prova/${level}`} className="btn-go mt-4 inline-flex">
          Voltar à prova
        </Link>
      </div>
    );

  if (final)
    return (
      <ExamResult level={level} score={final.score} passScore={passScore} passed={final.passed} levelPassed={final.levelPassed} leveledUpTo={final.leveledUpTo} feedback={final.feedback}>
        <section className="panel p-5">
          <h3 className="mb-3 font-bold">Como você foi em cada critério</h3>
          <RubricBars rubric={final.rubric} />
        </section>
      </ExamResult>
    );

  if (!sessionId)
    return (
      <div className="panel flex flex-col items-center gap-3 p-6 text-center">
        <p className="text-muted">Responda falando sempre que puder (é uma prova de conversação). Se o microfone falhar, você pode digitar.</p>
        <button className="btn-go" onClick={start} disabled={busy}>
          {busy ? <Loader2 className="animate-spin" size={18} aria-hidden /> : null} Começar a conversa
        </button>
        {error && <p className="w-full rounded-xl bg-wrong-bg px-3 py-2 text-sm text-wrong">{error}</p>}
      </div>
    );

  return (
    <div className="space-y-4">
      <p className="text-sm font-bold text-muted" aria-live="polite">
        Fala {Math.min(said + 1, total)} de {total}
      </p>
      <ul className="space-y-3" aria-live="polite">
        {turns.map((t, i) => (
          <li key={i} className={`flex ${t.role === "student" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${t.role === "student" ? "bg-atlantic text-surface" : "panel"}`} lang="en">
              {t.role === "examiner" ? (
                <span className="flex items-start gap-2">
                  <span>{t.text}</span> <SpeakButton text={t.text} size="sm" />
                </span>
              ) : (
                t.text
              )}
            </div>
          </li>
        ))}
        {busy && (
          <li className="flex items-center gap-2 text-sm text-muted">
            <Loader2 className="animate-spin" size={16} aria-hidden /> {said >= total ? "O examinador está avaliando a conversa…" : "Respondendo…"}
          </li>
        )}
      </ul>
      <div ref={endRef} />

      <div className="panel sticky bottom-20 flex flex-col gap-3 p-4 lg:bottom-4">
        <MicInput size="lg" label="Responder falando" disabled={busy} onText={(t) => send(t, true)} />
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            send(draft, false);
          }}
        >
          <label htmlFor="exam-draft" className="sr-only">
            Sua resposta
          </label>
          <input id="exam-draft" value={draft} onChange={(e) => setDraft(e.target.value)} disabled={busy} maxLength={600} placeholder="Ou digite sua resposta…" className="field min-h-12 flex-1" lang="en" />
          <button className="btn-go px-4" disabled={busy || !draft.trim()} aria-label="Enviar">
            <Send size={18} aria-hidden />
          </button>
        </form>
        {error && <p className="rounded-xl bg-wrong-bg px-3 py-2 text-sm text-wrong">{error}</p>}
      </div>
    </div>
  );
}
