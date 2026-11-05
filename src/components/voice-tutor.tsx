"use client";

import { useEffect, useRef, useState } from "react";
import { ClipboardCheck, Lightbulb, Loader2, Mic, PenLine, Send, Snail, Square, Volume2 } from "lucide-react";
import { Avatar } from "@/components/avatar";
import { TranslateInline, NotUnderstood } from "@/components/help";
import { PracticeCard, checkRepeat, type RepeatResult } from "@/components/practice-card";
import { ConversationReportSheet, type ReportView } from "@/components/conversation-report";
import { unlockAudio, useVoice, useVoiceCaps } from "@/lib/voice";
import { transcribeWav, useVoiceRecorder } from "@/lib/voice-recorder";
import { useTranslationPref } from "@/lib/translation";
import type { AvatarLook } from "@/content/scenarios";

export type TutorMode = "livre" | "professor" | "imersao";

export interface TutorMsg {
  id: string;
  role: "user" | "assistant";
  content: string;
  correction: { original: string; corrected: string; explanation_pt: string } | null;
  tip: string | null;
  practice: { en: string; pt: string; reason: string } | null;
  voice?: boolean;
}

type Status = "idle" | "listening" | "thinking" | "speaking" | "repeat";

const TEACHER: AvatarLook = { skin: "#e0ac69", hair: "#2d2d2d", hairStyle: "short", shirt: "#2f62b5", bg: "#f3c24f", accessory: "glasses" };
/** Velocidade da voz do professor por nível (mais devagar no começo). */
const RATE: Record<string, number> = { A1: 0.82, A2: 0.9, B1: 0.96, B2: 1, C1: 1, C2: 1.05 };
const MODE_LABEL: Record<TutorMode, string> = { livre: "Livre", professor: "Professor", imersao: "Imersão" };

/**
 * Professor particular por voz: toque no botão central e converse (português e inglês).
 * O professor ouve, responde falando, corrige sem travar a conversa e pede para você repetir
 * frases novas — a repetição é conferida pelo reconhecedor de fala.
 */
export function VoiceTutor({
  initial,
  conversationId: initialId,
  mode,
  level,
  studentName,
}: {
  initial: TutorMsg[];
  conversationId: string | null;
  mode: TutorMode;
  level: string;
  studentName: string;
}) {
  const caps = useVoiceCaps();
  const voice = useVoice();
  const translation = useTranslationPref();
  const rec = useVoiceRecorder({ silenceMs: 1300, maxSeconds: 45, noSpeechTimeoutMs: 20000 });
  const [messages, setMessages] = useState<TutorMsg[]>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [repeats, setRepeats] = useState<Record<string, RepeatResult[]>>({});
  const [report, setReport] = useState<{ report: ReportView; savedPhrases: number } | null>(null);
  const [reporting, setReporting] = useState(false);
  const convRef = useRef(initialId);
  const [convId, setConvId] = useState(initialId);
  const statusRef = useRef<Status>("idle");
  const loopOn = useRef(false);
  const readyAt = useRef<number>(0);
  const speechAt = useRef<number | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const seq = useRef(0);
  const rate = RATE[level] ?? 1;

  const set = (s: Status) => {
    statusRef.current = s;
    setStatus(s);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, status]);
  // Momento em que o aluno começou a falar (para medir o tempo de resposta).
  useEffect(() => {
    if (rec.state === "speaking" && speechAt.current === null) speechAt.current = Date.now();
  }, [rec.state]);

  async function send(content: string, viaVoice: boolean): Promise<TutorMsg | null> {
    const msg = content.trim();
    if (!msg) return null;
    setError(null);
    const tempId = `u-${++seq.current}`;
    const responseMs = readyAt.current ? Math.max(0, (speechAt.current ?? Date.now()) - readyAt.current) : undefined;
    setMessages((m) => [...m, { id: tempId, role: "user", content: msg, correction: null, tip: null, practice: null, voice: viaVoice }]);
    set("thinking");
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: convRef.current, message: msg, viaVoice, tutorMode: mode, responseMs: responseMs && responseMs < 600_000 ? responseMs : undefined }),
      });
      const data = await res.json();
      if (data.conversationId && data.conversationId !== convRef.current) {
        convRef.current = data.conversationId;
        setConvId(data.conversationId);
        window.history.replaceState(null, "", `/conversa?c=${data.conversationId}`);
      }
      if (!res.ok) throw new Error(data.error ?? "Não foi possível obter resposta.");
      const a: TutorMsg = { id: String(data.assistantMessageId ?? `a-${++seq.current}`), role: "assistant", content: data.reply, correction: null, tip: data.tip, practice: data.practice };
      setMessages((m) => [...m.map((x) => (x.id === tempId ? { ...x, id: String(data.userMessageId), correction: data.correction } : x)), a]);
      return a;
    } catch (e) {
      setMessages((m) => m.filter((x) => x.id !== tempId));
      setText(msg);
      setError((e as Error).message);
      return null;
    }
  }

  async function say(t: string) {
    set("speaking");
    await voice.speak(t, { rate });
    readyAt.current = Date.now();
    speechAt.current = null;
  }

  /** Repetição durante a conversa: até 2 tentativas, com retorno falado curto. */
  async function repeatTurn(a: TutorMsg) {
    const p = a.practice!;
    for (let attempt = 0; attempt < 3 && loopOn.current; attempt++) {
      set("repeat");
      const wav = await rec.listen({ silenceMs: 1100, maxSeconds: 15, noSpeechTimeoutMs: 9000 });
      if (!loopOn.current || !wav) return;
      set("thinking");
      let r: RepeatResult;
      try {
        r = await checkRepeat(wav, p.en, `chat:${convRef.current}`);
      } catch (e) {
        setError((e as Error).message);
        return;
      }
      setRepeats((x) => ({ ...x, [a.id]: [...(x[a.id] ?? []), r] }));
      if (r.verdict === "good") return say(r.score === 100 ? "Perfect!" : "Great job!");
      if (r.verdict === "unclear") {
        await say("Sorry, I didn't catch that. Could you say it again?");
        continue;
      }
      if (attempt >= 1) return say("Good effort. We'll practise that again later.");
      await say(`Almost! Listen: ${p.en}`);
    }
  }

  async function loop() {
    while (loopOn.current) {
      set("listening");
      speechAt.current = null;
      const wav = await rec.listen();
      if (!loopOn.current) return;
      if (!wav) {
        loopOn.current = false;
        set("idle");
        return;
      }
      set("thinking");
      let said = "";
      try {
        said = await transcribeWav(wav);
      } catch (e) {
        setError((e as Error).message);
      }
      if (!loopOn.current) return;
      if (!said) {
        await say("Sorry, I didn't catch that. Could you say it again?");
        continue;
      }
      const a = await send(said, true);
      if (!loopOn.current) return;
      if (!a) {
        loopOn.current = false;
        set("idle");
        return;
      }
      await say(a.content);
      if (a.practice && loopOn.current) await repeatTurn(a);
    }
  }

  async function toggle() {
    unlockAudio();
    if (loopOn.current) {
      loopOn.current = false;
      rec.cancel();
      voice.stop();
      set("idle");
      return;
    }
    setError(null);
    loopOn.current = true;
    if (messages.length === 0) {
      const hello =
        mode === "imersao"
          ? `Hi ${studentName}! Let's talk only in English today. What's on your mind?`
          : `Hi ${studentName}! I'm Alex, your English teacher. You can speak English or Portuguese. What would you like to talk about?`;
      setMessages([{ id: "hello", role: "assistant", content: hello, correction: null, tip: null, practice: null }]);
      await say(hello);
    }
    if (loopOn.current) loop();
  }

  async function sendTyped() {
    if (statusRef.current === "thinking") return;
    unlockAudio();
    const a = await send(text, false);
    setText("");
    if (a) await say(a.content);
    set("idle");
  }

  async function openReport() {
    if (!convRef.current) return;
    loopOn.current = false;
    rec.cancel();
    voice.stop();
    set("idle");
    setReporting(true);
    try {
      const res = await fetch("/api/tutor/report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ conversationId: convRef.current }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Não foi possível gerar o relatório.");
      setReport(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setReporting(false);
    }
  }

  const userTurns = messages.filter((m) => m.role === "user").length;
  const active = status !== "idle";
  const label: Record<Status, string> = {
    idle: messages.length ? "Toque para continuar a conversa" : "Toque para começar a conversar",
    listening: rec.state === "speaking" ? "Ouvindo você…" : "Pode falar (português ou inglês)",
    thinking: "Pensando…",
    speaking: "Alex está falando…",
    repeat: "Repita a frase em voz alta",
  };

  return (
    <div className="grid gap-4">
      {/* Professor + botão central */}
      <section className="panel flex flex-col items-center gap-3 p-5 text-center sm:p-6">
        <div className="relative">
          <span
            aria-hidden
            className={`absolute -inset-3 rounded-full transition-transform duration-150 ${status === "speaking" ? "animate-pulse bg-boarding/40" : status === "listening" || status === "repeat" ? "bg-atlantic/20" : "bg-transparent"}`}
            style={{ transform: `scale(${status === "listening" || status === "repeat" ? 1 + rec.level * 0.35 : 1})` }}
          />
          <Avatar look={TEACHER} className="relative size-24 overflow-hidden rounded-full border-4 border-surface sm:size-28" title="Professor Alex" />
        </div>
        <p className="font-display text-xl font-bold">Professor Alex</p>
        <p className="text-sm text-muted" aria-live="polite">
          {label[status]}
        </p>
        {caps.stt ? (
          <button
            type="button"
            onClick={toggle}
            className={`relative grid size-20 place-items-center rounded-full shadow-lg transition-transform active:scale-95 ${active ? "bg-wrong text-white" : "bg-boarding text-boarding-ink"}`}
            aria-label={active ? "Encerrar a conversa por voz" : "Iniciar conversa por voz"}
            aria-pressed={active}
          >
            {status === "thinking" ? <Loader2 size={30} className="animate-spin" aria-hidden /> : active ? <Square size={26} aria-hidden /> : <Mic size={32} aria-hidden />}
          </button>
        ) : (
          <p className="text-sm text-muted">O reconhecimento de voz não está ativo no servidor; converse digitando.</p>
        )}
        <p className="text-xs text-muted">
          Modo {MODE_LABEL[mode]} · nível {level}
        </p>
      </section>

      {/* Transcrição em tempo real */}
      <section className="panel flex min-h-[18rem] flex-col p-4" aria-label="Transcrição da conversa">
        <ol className="flex-1 space-y-4" aria-live="polite">
          {messages.map((m) => (
            <li key={m.id} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
              <span className="mb-1 text-xs font-bold text-muted">{m.role === "user" ? `Você${m.voice ? " (voz)" : ""}` : "Alex"}</span>
              <div lang="en" className={`max-w-[88%] rounded-2xl px-4 py-2.5 ${m.role === "user" ? "rounded-br-md bg-atlantic text-surface" : "rounded-bl-md bg-surface-2"}`}>
                {m.content}
              </div>
              {m.role === "assistant" && (
                <div className="mt-1 flex flex-wrap items-center gap-1">
                  <button type="button" onClick={() => (unlockAudio(), voice.speak(m.content, { rate }))} className="inline-grid size-8 place-items-center rounded-full text-atlantic hover:bg-surface-2" aria-label="Ouvir de novo">
                    <Volume2 size={16} aria-hidden />
                  </button>
                  <button type="button" onClick={() => (unlockAudio(), voice.speak(m.content, { rate: 0.7 }))} className="inline-grid size-8 place-items-center rounded-full text-atlantic hover:bg-surface-2" aria-label="Repetir mais devagar">
                    <Snail size={16} aria-hidden />
                  </button>
                  {translation.on && mode !== "imersao" && <TranslateInline text={m.content} />}
                </div>
              )}
              {m.correction && (
                <div className="mt-1.5 max-w-[88%] rounded-xl border border-boarding bg-boarding/15 px-3 py-2 text-sm">
                  <p className="flex items-center gap-1.5 font-bold">
                    <PenLine size={14} aria-hidden /> Correção
                  </p>
                  <p>
                    <span className="text-wrong line-through" lang="en">
                      {m.correction.original}
                    </span>{" "}
                    → <strong lang="en">{m.correction.corrected}</strong>
                  </p>
                  <p className="text-muted">{m.correction.explanation_pt}</p>
                </div>
              )}
              {m.tip && (
                <p className="mt-1.5 flex max-w-[88%] items-start gap-1.5 text-sm text-muted">
                  <Lightbulb size={14} className="mt-1 shrink-0 text-gold" aria-hidden />
                  {m.tip}
                </p>
              )}
              {m.practice && <PracticeCard en={m.practice.en} pt={m.practice.pt} context={`chat:${convId ?? "new"}`} rate={rate} external={repeats[m.id]} />}
            </li>
          ))}
          {messages.length === 0 && <li className="py-6 text-center text-muted">Fale sobre qualquer assunto: trabalho, viagens, rotina, tecnologia, entrevistas… Pode misturar português e inglês.</li>}
        </ol>
        <div ref={endRef} />
        {error && <p className="mt-3 rounded-xl bg-wrong-bg px-3 py-2 text-sm text-wrong">{error}</p>}
        <form
          className="mt-4 flex items-end gap-2 border-t border-line pt-3"
          onSubmit={(e) => {
            e.preventDefault();
            sendTyped();
          }}
        >
          <label htmlFor="tutor-text" className="sr-only">
            Mensagem
          </label>
          <input id="tutor-text" value={text} onChange={(e) => setText(e.target.value)} maxLength={1000} disabled={active} placeholder="Ou escreva (português ou inglês)" className="field min-h-12" />
          <button type="submit" disabled={!text.trim() || active} className="btn-primary size-12 shrink-0 p-0" aria-label="Enviar">
            <Send size={20} aria-hidden />
          </button>
        </form>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          {messages.some((m) => m.role === "assistant") ? <NotUnderstood text={[...messages].reverse().find((m) => m.role === "assistant")!.content} context="Conversation with the private English teacher" /> : <span />}
          {userTurns >= 2 && (
            <button type="button" onClick={openReport} disabled={reporting} className="btn-ghost rounded-full px-4 py-2 text-sm">
              {reporting ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <ClipboardCheck size={16} aria-hidden />} Encerrar e ver relatório
            </button>
          )}
        </div>
      </section>

      {report && <ConversationReportSheet report={report.report} savedPhrases={report.savedPhrases} onClose={() => setReport(null)} />}
    </div>
  );
}
