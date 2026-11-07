"use client";

import { useRef, useState } from "react";
import { CheckCircle2, Loader2, Mic, Phone, Send, Square, Volume2 } from "lucide-react";
import { unlockAudio, useVoice, useVoiceCaps } from "@/lib/voice";
import { transcribeWav, useVoiceRecorder } from "@/lib/voice-recorder";
import { checkRepeat } from "@/components/practice-card";

type Turn = { role: "user" | "assistant"; content: string };
type Fix = { original: string; corrected: string; explanation_pt: string; example?: string | null };
interface Review {
  score: number;
  used: string[];
  missing: string[];
  best_sentence: string;
  try_next: string;
  feedback_pt: string;
}
type Status = "idle" | "speaking" | "turn" | "recording" | "thinking" | "retry" | "retrying" | "done";

/**
 * Conversa da aula: 2–3 minutos de ligação com o Alex sobre o tema que você acabou de estudar.
 * Ele pergunta (A1–A2) ou conversa naturalmente (B1+); corrige na hora e pede para tentar de novo;
 * no fim mostra o que você usou da aula e o que faltou. Conta para o domínio.
 */
export function LessonTalk({ lessonId }: { lessonId: string }) {
  const caps = useVoiceCaps();
  const voice = useVoice();
  const rec = useVoiceRecorder({ silenceMs: 0, maxSeconds: 45, noSpeechTimeoutMs: 0 });
  const [turns, setTurns] = useState<Turn[]>([]);
  const turnsRef = useRef<Turn[]>([]);
  const [status, setStatusState] = useState<Status>("idle");
  const statusRef = useRef<Status>("idle");
  const [fix, setFix] = useState<(Fix & { result?: "good" | "tried" }) | null>(null);
  const pending = useRef<{ reply: string; done: boolean } | null>(null);
  const [review, setReview] = useState<Review | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [text, setText] = useState("");
  const tries = useRef(0);

  const set = (s: Status) => {
    statusRef.current = s;
    setStatusState(s);
  };
  const push = (t: Turn) => {
    turnsRef.current = [...turnsRef.current, t];
    setTurns(turnsRef.current);
  };

  async function call(finish = false) {
    const res = await fetch("/api/lesson-talk", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lessonId, turns: turnsRef.current, finish }) });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Falha na conversa.");
    return data;
  }

  async function teacherSays(reply: string, done: boolean) {
    push({ role: "assistant", content: reply });
    set("speaking");
    await voice.speak(reply);
    if (done) return finish();
    set("turn");
  }

  async function start() {
    unlockAudio();
    setError(null);
    setReview(null);
    turnsRef.current = [];
    setTurns([]);
    set("thinking");
    try {
      const d = await call();
      await teacherSays(d.reply, false);
    } catch (e) {
      setError((e as Error).message);
      set("idle");
    }
  }

  async function answer(said: string) {
    if (!said.trim()) return set("turn");
    push({ role: "user", content: said.trim() });
    set("thinking");
    try {
      const d = await call();
      if (d.correction) {
        // Correção na hora: forma certa e nova tentativa; depois o Alex continua.
        pending.current = { reply: d.reply, done: d.done };
        tries.current = 0;
        setFix(d.correction);
        set("speaking");
        await voice.speak("Quase! A forma correta é:", { lang: "pt" });
        await voice.speak(d.correction.corrected);
        await voice.speak("Tenta de novo.", { lang: "pt" });
        return set("retry");
      }
      await teacherSays(d.reply, d.done);
    } catch (e) {
      setError((e as Error).message);
      set("turn");
    }
  }

  async function afterFix() {
    const p = pending.current;
    pending.current = null;
    if (p) await teacherSays(p.reply, p.done);
  }

  async function checkRetry(wav: Blob) {
    const f = fix!;
    set("thinking");
    try {
      const r = await checkRepeat(wav, f.corrected, `talk:${lessonId}`);
      tries.current++;
      set("speaking");
      if (r.verdict === "unclear" && tries.current < 2) {
        await voice.speak("Não consegui ouvir bem. Repete, por favor.", { lang: "pt" });
        return set("retry");
      }
      if (r.verdict === "good") {
        setFix({ ...f, result: "good" });
        await voice.speak("Isso! Muito bem.", { lang: "pt" });
        if (f.example) {
          await voice.speak("Mais um exemplo:", { lang: "pt" });
          await voice.speak(f.example);
        }
      } else if (tries.current < 2) {
        await voice.speak("Quase! Escuta de novo:", { lang: "pt" });
        await voice.speak(f.corrected);
        return set("retry");
      } else {
        setFix({ ...f, result: "tried" });
        await voice.speak("Boa tentativa. Vamos seguir.", { lang: "pt" });
      }
    } catch {
      /* sem conferência: segue a conversa */
    }
    await afterFix();
  }

  async function finish() {
    set("thinking");
    try {
      setReview(await call(true));
      set("done");
    } catch (e) {
      setError((e as Error).message);
      set("turn");
    }
  }

  async function mic() {
    if (status === "recording" || status === "retrying") return rec.stop();
    if (status !== "turn" && status !== "retry") return;
    unlockAudio();
    const retry = status === "retry";
    set(retry ? "retrying" : "recording");
    const wav = await rec.listen();
    if (!wav) return set(retry ? "retry" : "turn");
    if (retry) return checkRetry(wav);
    set("thinking");
    let said = "";
    try {
      said = await transcribeWav(wav);
    } catch (e) {
      setError((e as Error).message);
    }
    if (!said) return set("turn");
    await answer(said);
  }

  const userTurns = turns.filter((t) => t.role === "user").length;
  const label: Record<Status, string> = {
    idle: "",
    speaking: "Alex está falando…",
    turn: "Sua vez · toque no microfone para responder",
    recording: "Ouvindo… toque para enviar",
    thinking: "Alex está pensando…",
    retry: "Tente de novo · toque no microfone",
    retrying: "Ouvindo… toque para enviar",
    done: "",
  };

  if (status === "idle" && !review)
    return (
      <div>
        <p className="text-muted">Uma ligação de 2–3 minutos com o Alex sobre o que você acabou de estudar. Ele pergunta, você responde falando, e ele corrige na hora.</p>
        <button type="button" onClick={start} className="btn-go mt-3 inline-flex items-center gap-2">
          <Phone size={18} aria-hidden /> Começar a conversa
        </button>
        {error && (
          <p className="mt-2 text-sm text-wrong" role="alert">
            {error}
          </p>
        )}
      </div>
    );

  if (review)
    return (
      <div className="space-y-3" role="status">
        <p className="flex flex-wrap items-center gap-2 font-bold">
          {review.score >= 70 && review.used.length ? <CheckCircle2 className="text-correct" size={20} aria-hidden /> : null}
          {review.score >= 70 && review.used.length ? "Você usou a aula numa conversa!" : "Boa! Veja o que treinar:"} <span className="chip">{review.score}/100</span>
        </p>
        <p>{review.feedback_pt}</p>
        {review.used.length > 0 && (
          <p className="text-sm">
            <span className="font-bold">Você usou:</span>{" "}
            {review.used.map((u) => (
              <span key={u} lang="en" className="mr-1 inline-block rounded-full bg-correct-bg px-2 py-0.5 text-correct">
                {u}
              </span>
            ))}
          </p>
        )}
        {review.missing.length > 0 && (
          <p className="text-sm">
            <span className="font-bold">Faltou usar:</span> <span lang="en">{review.missing.join(" · ")}</span>
          </p>
        )}
        {review.try_next && (
          <p className="rounded-xl bg-surface-2 p-3 text-sm">
            Da próxima vez, tente: <strong lang="en">{review.try_next}</strong>{" "}
            <button type="button" onClick={() => voice.speak(review.try_next)} className="ml-1 inline-grid size-7 place-items-center rounded-full align-middle text-atlantic" aria-label="Ouvir a sugestão">
              <Volume2 size={15} aria-hidden />
            </button>
          </p>
        )}
        <button type="button" onClick={start} className="btn-ghost">
          Conversar de novo
        </button>
      </div>
    );

  return (
    <div>
      <ol className="max-h-72 space-y-2 overflow-y-auto" aria-label="Conversa da aula">
        {turns.map((t, i) => (
          <li key={i} className={`rounded-2xl px-3 py-2 ${t.role === "user" ? "ml-8 bg-atlantic text-surface" : "mr-8 bg-surface-2"}`} lang="en">
            {t.content}
          </li>
        ))}
      </ol>
      {fix && (
        <div className="mt-2 rounded-xl border border-boarding/60 bg-boarding/10 p-3 text-sm">
          <span className="text-wrong line-through" lang="en">
            {fix.original}
          </span>{" "}
          → <strong lang="en">{fix.corrected}</strong>
          <span className="block text-muted">{fix.explanation_pt}</span>
          {fix.result === "good" && <span className="mt-1 block font-bold text-correct">✓ Você repetiu certo.</span>}
        </div>
      )}
      <p className="mt-3 text-sm font-bold text-muted" aria-live="polite">
        {status === "thinking" && <Loader2 size={14} className="mr-1 inline animate-spin" aria-hidden />}
        {label[status]} {status !== "done" && userTurns > 0 && <span className="font-normal">· {userTurns} de 4 respostas</span>}
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        {caps.stt && (
          <button
            type="button"
            onClick={mic}
            disabled={!["turn", "retry", "recording", "retrying"].includes(status)}
            className={`grid size-16 place-items-center rounded-full ${status === "recording" || status === "retrying" ? "bg-wrong text-white" : "bg-boarding text-boarding-ink"} disabled:opacity-40`}
            aria-label={status === "recording" || status === "retrying" ? "Enviar" : status === "retry" ? "Tentar de novo" : "Responder falando"}
          >
            {status === "recording" || status === "retrying" ? <Square size={24} aria-hidden /> : <Mic size={26} aria-hidden />}
          </button>
        )}
        {status === "retry" && (
          <button type="button" onClick={() => (setFix((f) => (f ? { ...f, result: "tried" } : f)), afterFix())} className="text-sm text-muted underline">
            pular
          </button>
        )}
        {status === "turn" && (
          <form
            className="flex min-w-0 flex-1 gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const t = text;
              setText("");
              answer(t);
            }}
          >
            <label htmlFor="talk-text" className="sr-only">
              Responder escrevendo
            </label>
            <input id="talk-text" value={text} onChange={(e) => setText(e.target.value)} className="field min-w-0 flex-1" placeholder="ou escreva aqui…" lang="en" />
            <button type="submit" className="btn-ghost px-3" aria-label="Enviar resposta escrita" disabled={!text.trim()}>
              <Send size={18} aria-hidden />
            </button>
          </form>
        )}
      </div>
      {(error || rec.error) && (
        <p className="mt-2 text-sm text-wrong" role="alert">
          {error ?? rec.error}
        </p>
      )}
    </div>
  );
}
