"use client";

import { useEffect, useRef, useState } from "react";
import { ClipboardCheck, Keyboard, Lightbulb, Loader2, Mic, PenLine, Send, Snail, Square, Volume2, X } from "lucide-react";
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
  /** Abertura em português (quando o aluno falou em português). */
  intro?: string | null;
  correction: { original: string; corrected: string; explanation_pt: string } | null;
  tip: string | null;
  practice: { en: string; pt: string; reason: string } | null;
  voice?: boolean;
}

/**
 * idle: ligação ainda não começou · turn: vez do aluno (o professor espera) · recording: gravando a resposta ·
 * repeat: vez do aluno repetir a frase ensinada · repeating: gravando a repetição · thinking · speaking.
 */
type Status = "idle" | "turn" | "recording" | "repeat" | "repeating" | "thinking" | "speaking";

const TEACHER: AvatarLook = { skin: "#e0ac69", hair: "#2d2d2d", hairStyle: "short", shirt: "#2f62b5", bg: "#f3c24f", accessory: "glasses" };
/** Velocidade da voz do professor por nível (mais devagar no começo). */
const RATE: Record<string, number> = { A1: 0.82, A2: 0.9, B1: 0.96, B2: 1, C1: 1, C2: 1.05 };
/** Relógio fora do componente (evita o aviso de função impura do React Compiler). */
const now = () => Date.now();

const MODE_LABEL: Record<TutorMode, string> = { livre: "Livre", professor: "Professor", imersao: "Imersão" };
const HANDS_FREE_KEY = "ej-hands-free";

/**
 * Ligação com o professor, como uma chamada de vídeo: o professor fica no topo, a conversa
 * aparece em legenda logo abaixo (sem precisar rolar a página) e o botão de falar fica embaixo.
 * Por padrão o professor ESPERA: você toca para responder e toca de novo para enviar,
 * no seu tempo. No modo "mãos livres", ele detecta sozinho quando você termina.
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
  const rec = useVoiceRecorder({ silenceMs: 0, maxSeconds: 90, noSpeechTimeoutMs: 0 });
  const [messages, setMessages] = useState<TutorMsg[]>(initial);
  const [status, setStatus] = useState<Status>(initial.length ? "turn" : "idle");
  const [handsFree, setHandsFree] = useState(false);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [repeats, setRepeats] = useState<Record<string, RepeatResult[]>>({});
  const [report, setReport] = useState<{ report: ReportView; savedPhrases: number } | null>(null);
  const [reporting, setReporting] = useState(false);
  const convRef = useRef(initialId);
  const [convId, setConvId] = useState(initialId);
  const statusRef = useRef<Status>(status);
  const practiceFor = useRef<TutorMsg | null>(null);
  const [practiceText, setPracticeText] = useState<string | null>(null);
  /** Frase que o aluno precisa repetir agora (ref para a lógica, estado para a tela). */
  const setPractice = (a: TutorMsg | null) => {
    practiceFor.current = a;
    setPracticeText(a?.practice?.en ?? null);
  };
  const repeatTries = useRef(0);
  const readyAt = useRef<number>(0);
  const speechAt = useRef<number | null>(null);
  const scroller = useRef<HTMLOListElement>(null);
  const seq = useRef(0);
  const rate = RATE[level] ?? 1;

  const set = (s: Status) => {
    statusRef.current = s;
    setStatus(s);
  };

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- preferência salva no aparelho
      setHandsFree(localStorage.getItem(HANDS_FREE_KEY) === "1");
    } catch {}
  }, []);
  // A legenda rola sozinha DENTRO da área da conversa (a página não se mexe).
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, status, repeats]);
  // Momento em que o aluno começou a falar (para medir o tempo de resposta).
  useEffect(() => {
    if (rec.state === "speaking" && speechAt.current === null) speechAt.current = now();
  }, [rec.state]);

  async function send(content: string, viaVoice: boolean): Promise<TutorMsg | null> {
    const msg = content.trim();
    if (!msg) return null;
    setError(null);
    const tempId = `u-${++seq.current}`;
    const responseMs = readyAt.current ? Math.max(0, (speechAt.current ?? now()) - readyAt.current) : undefined;
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
      const a: TutorMsg = { id: String(data.assistantMessageId ?? `a-${++seq.current}`), role: "assistant", content: data.reply, intro: data.introPt ?? null, correction: null, tip: data.tip, practice: data.practice };
      setMessages((m) => [...m.map((x) => (x.id === tempId ? { ...x, id: String(data.userMessageId), correction: data.correction } : x)), a]);
      return a;
    } catch (e) {
      setMessages((m) => m.filter((x) => x.id !== tempId));
      setText(msg);
      setError((e as Error).message);
      return null;
    }
  }

  /** Fala e sempre termina: se o áudio travar, segue depois do tempo esperado. */
  async function say(t: string, lang: "en" | "pt" = "en") {
    set("speaking");
    const limit = (t.split(/\s+/).length * 0.8) / rate * 1000 + 8000;
    let timer: ReturnType<typeof setTimeout> | undefined;
    await Promise.race([voice.speak(t, { rate: lang === "pt" ? 1.05 : rate, lang }), new Promise<void>((r) => (timer = setTimeout(r, limit)))]);
    clearTimeout(timer);
  }

  /** Depois que o professor fala, é a vez do aluno (ou de repetir a frase ensinada). */
  function yourTurn() {
    if (statusRef.current !== "speaking" && statusRef.current !== "thinking") return; // o aluno já interrompeu
    readyAt.current = now();
    speechAt.current = null;
    set(practiceFor.current ? "repeat" : "turn");
    if (handsFree) listen();
  }

  /** Resposta do professor: a abertura em português (voz em português) e depois o inglês. */
  async function reply(a: TutorMsg) {
    setPractice(a.practice ? a : null);
    repeatTries.current = 0;
    if (a.intro) await say(a.intro, "pt");
    if (statusRef.current === "speaking") await say(a.content);
    yourTurn();
  }

  /** Grava a vez do aluno. No modo normal, termina quando ele toca de novo; no mãos livres, no silêncio. */
  async function listen() {
    const repeating = !!practiceFor.current && (statusRef.current === "repeat" || statusRef.current === "speaking");
    set(repeating ? "repeating" : "recording");
    speechAt.current = null;
    const wav = await rec.listen(handsFree ? { silenceMs: 1800, maxSeconds: 60, noSpeechTimeoutMs: 15000 } : { silenceMs: 0, maxSeconds: 90, noSpeechTimeoutMs: 0 });
    if (statusRef.current !== "recording" && statusRef.current !== "repeating") return; // cancelado
    if (!wav) {
      set(repeating ? "repeat" : "turn");
      return;
    }
    set("thinking");
    if (repeating) return checkRepetition(wav);
    let said = "";
    try {
      said = await transcribeWav(wav);
    } catch (e) {
      setError((e as Error).message);
    }
    if (!said) {
      await say("Sorry, I didn't catch that. Could you say it again?");
      return yourTurn();
    }
    const a = await send(said, true);
    if (a) await reply(a);
    else set("turn");
  }

  /** Repetição da frase ensinada: conferida pelo reconhecedor; se não deu para ouvir, pede de novo. */
  async function checkRepetition(wav: Blob) {
    const a = practiceFor.current!;
    let r: RepeatResult;
    try {
      r = await checkRepeat(wav, a.practice!.en, `chat:${convRef.current}`);
    } catch (e) {
      setError((e as Error).message);
      setPractice(null);
      return set("turn");
    }
    setRepeats((x) => ({ ...x, [a.id]: [...(x[a.id] ?? []), r] }));
    repeatTries.current++;
    if (r.verdict === "unclear") {
      await say("Sorry, I didn't catch that. Could you say it again?");
    } else if (r.verdict === "good") {
      setPractice(null);
      await say(r.score === 100 ? "Perfect! Your turn now." : "Great job! Your turn now.");
    } else if (repeatTries.current >= 2) {
      setPractice(null);
      await say("Good effort. We'll practise that again later. Your turn!");
    } else {
      await say(`Almost! Listen: ${a.practice!.en}`);
    }
    yourTurn();
  }

  /** Botão central: começa a ligação, grava, envia, ou interrompe o professor para falar. */
  async function mainButton() {
    unlockAudio();
    setError(null);
    const s = statusRef.current;
    if (s === "idle") {
      const hello =
        mode === "imersao"
          ? `Hi ${studentName}! Let's talk only in English today. What's on your mind?`
          : `Hi ${studentName}! I'm Alex, your English teacher. You can speak English or Portuguese. Tap the button when you want to answer. What would you like to talk about?`;
      if (!messages.length) setMessages([{ id: "hello", role: "assistant", content: hello, correction: null, tip: null, practice: null }]);
      await say(messages.length ? "Welcome back! Tap the button when you're ready." : hello);
      return yourTurn();
    }
    if (s === "recording" || s === "repeating") return rec.stop(); // enviar
    if (s === "speaking") voice.stop(); // interromper o professor e falar
    if (s === "thinking") return;
    listen();
  }

  function skipRepeat() {
    setPractice(null);
    set("turn");
  }

  function cancelRecording() {
    rec.cancel();
    set(practiceFor.current ? "repeat" : "turn");
  }

  async function sendTyped() {
    if (statusRef.current === "thinking" || !text.trim()) return;
    unlockAudio();
    voice.stop();
    setPractice(null);
    const a = await send(text, false);
    setText("");
    if (a) await reply(a);
    else set("turn");
  }

  async function openReport() {
    if (!convRef.current) return;
    rec.cancel();
    voice.stop();
    setPractice(null);
    set("turn");
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

  /** Ouvir de novo (sem o microfone aberto). */
  async function sayAgain(m: TutorMsg, slow = false) {
    if (statusRef.current === "recording" || statusRef.current === "repeating") cancelRecording();
    if (m.intro && !slow) await voice.speak(m.intro, { lang: "pt" });
    await voice.speak(m.content, { rate: slow ? 0.7 : rate });
  }

  function toggleHandsFree() {
    const v = !handsFree;
    setHandsFree(v);
    try {
      localStorage.setItem(HANDS_FREE_KEY, v ? "1" : "0");
    } catch {}
  }

  const userTurns = messages.filter((m) => m.role === "user").length;
  const recording = status === "recording" || status === "repeating";
  const label: Record<Status, string> = {
    idle: messages.length ? "Toque para retomar a ligação" : "Toque para ligar para o professor",
    turn: handsFree ? "Pode falar quando quiser" : "Sua vez · toque para responder",
    recording: handsFree ? "Ouvindo… pare de falar para enviar" : rec.state === "speaking" ? "Ouvindo você… toque para enviar" : "Pode falar… toque para enviar",
    repeat: "Repita a frase · toque no microfone",
    repeating: "Repetindo… toque para enviar",
    thinking: "Alex está pensando…",
    speaking: "Alex está falando…",
  };
  const buttonLabel: Record<Status, string> = {
    idle: "Ligar para o professor",
    turn: "Responder falando",
    recording: "Enviar minha resposta",
    repeat: "Repetir a frase",
    repeating: "Enviar a repetição",
    thinking: "Aguarde",
    speaking: "Interromper e falar",
  };

  return (
    <div className="panel flex h-[calc(100dvh-13.5rem)] min-h-[28rem] flex-col overflow-hidden p-0 lg:h-[calc(100dvh-12rem)]">
      {/* Topo da ligação: professor, estado e encerrar */}
      <header className="flex items-center gap-3 border-b border-line px-4 py-3">
        <div className="relative shrink-0">
          <span
            aria-hidden
            className={`absolute -inset-1.5 rounded-full transition-transform duration-150 ${status === "speaking" ? "animate-pulse bg-boarding/60" : recording ? "bg-atlantic/30" : "bg-transparent"}`}
            style={{ transform: `scale(${recording ? 1 + rec.level * 0.4 : 1})` }}
          />
          <Avatar look={TEACHER} className="relative size-14 overflow-hidden rounded-full border-2 border-surface" title="Professor Alex" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg font-bold leading-tight">Professor Alex</p>
          <p className="truncate text-sm text-muted" aria-live="polite">
            {label[status]}
          </p>
        </div>
        <span className="hidden shrink-0 rounded-full bg-surface-2 px-2.5 py-1 text-xs font-bold text-muted sm:inline">
          {MODE_LABEL[mode]} · {level}
        </span>
        {userTurns >= 2 && (
          <button type="button" onClick={openReport} disabled={reporting} className="grid size-11 shrink-0 place-items-center rounded-full bg-wrong text-white" aria-label="Encerrar e ver relatório" title="Encerrar e ver relatório">
            {reporting ? <Loader2 size={18} className="animate-spin" aria-hidden /> : <ClipboardCheck size={18} aria-hidden />}
          </button>
        )}
      </header>

      {/* Legenda da conversa: rola sozinha, só aqui dentro */}
      <ol ref={scroller} className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4" aria-label="Legenda da conversa" aria-live="polite">
        {messages.map((m) => (
          <li key={m.id} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
            <div className={`max-w-[88%] rounded-2xl px-4 py-2.5 ${m.role === "user" ? "rounded-br-md bg-atlantic text-surface" : "rounded-bl-md bg-surface-2"}`}>
              {m.intro && (
                <span className="mb-1 block text-sm italic text-muted" lang="pt-BR">
                  {m.intro}
                </span>
              )}
              <span lang="en">{m.content}</span>
            </div>
            {m.role === "assistant" && (
              <div className="mt-1 flex flex-wrap items-center gap-1">
                <button type="button" onClick={() => (unlockAudio(), sayAgain(m))} className="inline-grid size-8 place-items-center rounded-full text-atlantic hover:bg-surface-2" aria-label="Ouvir de novo">
                  <Volume2 size={16} aria-hidden />
                </button>
                <button type="button" onClick={() => (unlockAudio(), sayAgain(m, true))} className="inline-grid size-8 place-items-center rounded-full text-atlantic hover:bg-surface-2" aria-label="Repetir mais devagar">
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
        {messages.length === 0 && (
          <li className="py-8 text-center text-muted">Toque no botão para ligar. Fale sobre qualquer assunto, em português ou inglês. O professor espera você terminar de pensar.</li>
        )}
      </ol>

      {error && <p className="mx-4 mb-2 rounded-xl bg-wrong-bg px-3 py-2 text-sm text-wrong">{error}</p>}

      {/* Controles da ligação */}
      <footer className="border-t border-line px-4 pb-4 pt-3">
        {typing && (
          <form
            className="mb-3 flex items-end gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              sendTyped();
            }}
          >
            <label htmlFor="tutor-text" className="sr-only">
              Mensagem
            </label>
            <input id="tutor-text" value={text} onChange={(e) => setText(e.target.value)} maxLength={1000} disabled={status === "thinking"} placeholder="Escreva (português ou inglês)" className="field min-h-12" autoFocus />
            <button type="submit" disabled={!text.trim() || status === "thinking"} className="btn-primary size-12 shrink-0 p-0" aria-label="Enviar">
              <Send size={20} aria-hidden />
            </button>
          </form>
        )}
        {practiceText && (status === "repeat" || status === "repeating") && (
          <p className="mb-2 text-center text-sm">
            Repita: <strong lang="en">{practiceText}</strong>{" "}
            <button type="button" onClick={skipRepeat} className="ml-1 text-muted underline">
              pular
            </button>
          </p>
        )}
        <div className="flex items-center justify-between gap-3">
          <div className="flex w-24 justify-start">
            <button type="button" onClick={() => setTyping((t) => !t)} className={`grid size-11 place-items-center rounded-full ${typing ? "bg-atlantic text-surface" : "bg-surface-2"}`} aria-label={typing ? "Fechar teclado" : "Escrever em vez de falar"} aria-pressed={typing}>
              {typing ? <X size={18} aria-hidden /> : <Keyboard size={18} aria-hidden />}
            </button>
          </div>
          {caps.stt ? (
            <div className="flex flex-col items-center gap-1">
              <button
                type="button"
                onClick={mainButton}
                disabled={status === "thinking"}
                className={`relative grid size-[72px] place-items-center rounded-full shadow-lg transition-transform active:scale-95 disabled:opacity-60 ${
                  recording ? "bg-wrong text-white" : status === "speaking" ? "bg-atlantic text-surface" : "bg-boarding text-boarding-ink"
                }`}
                aria-label={buttonLabel[status]}
              >
                {recording && <span aria-hidden className="absolute inset-0 rounded-full ring-4 ring-wrong/40" style={{ transform: `scale(${1 + rec.level * 0.5})` }} />}
                {status === "thinking" ? <Loader2 size={28} className="animate-spin" aria-hidden /> : recording ? <Send size={26} aria-hidden /> : status === "speaking" ? <Square size={24} aria-hidden /> : <Mic size={30} aria-hidden />}
              </button>
              <span className="text-xs font-bold text-muted">{buttonLabel[status]}</span>
              {recording && (
                <button type="button" onClick={cancelRecording} className="text-xs text-muted underline">
                  cancelar
                </button>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted">Reconhecimento de voz desativado; use o teclado.</p>
          )}
          <div className="flex w-24 justify-end">
            {messages.some((m) => m.role === "assistant") && <NotUnderstood text={[...messages].reverse().find((m) => m.role === "assistant")!.content} context="Conversation with the private English teacher" />}
          </div>
        </div>
        <label className="mt-3 flex items-center justify-center gap-2 text-xs text-muted">
          <input type="checkbox" checked={handsFree} onChange={toggleHandsFree} className="size-4 accent-[var(--atlantic)]" />
          Mãos livres (o professor percebe sozinho quando você termina)
        </label>
      </footer>

      {report && <ConversationReportSheet report={report.report} savedPhrases={report.savedPhrases} onClose={() => setReport(null)} />}
    </div>
  );
}
