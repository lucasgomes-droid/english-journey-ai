"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Square, Send, Volume2, Lightbulb, PenLine, Phone, PhoneOff, Pause, Play, Loader2, ClipboardCheck, Target } from "lucide-react";
import { Avatar } from "@/components/avatar";
import type { AvatarLook, Place } from "@/content/scenarios";
import { SceneBackdrop } from "@/components/scene-backdrop";
import { ConversationReportSheet, type ReportView } from "@/components/conversation-report";
import { unlockAudio, useVoice, type VoiceName } from "@/lib/voice";
import { transcribeWav, useVoiceRecorder } from "@/lib/voice-recorder";

export interface ChatMsg {
  id: string;
  role: "user" | "assistant";
  content: string;
  correction: { original: string; corrected: string; explanation_pt: string } | null;
  tip: string | null;
  failed?: boolean;
}

interface Reply {
  reply: string;
  correction: ChatMsg["correction"];
  tip: string | null;
  sceneComplete: boolean;
}

type CallState = "off" | "listening" | "thinking" | "speaking" | "paused";

export function TutorChat({
  initial,
  conversationId: initialId,
  lessonId,
  voiceEnabled,
  studentName,
  scenarioId = null,
  customPrompt = null,
  level = null,
  persona = null,
  goals = [],
  startInCall = false,
  scene = null,
}: {
  initial: ChatMsg[];
  conversationId: string | null;
  lessonId: string | null;
  voiceEnabled: boolean;
  studentName: string;
  scenarioId?: string | null;
  customPrompt?: string | null;
  level?: string | null;
  persona?: { name: string; role: string; look: AvatarLook; voice?: VoiceName } | null;
  goals?: string[];
  startInCall?: boolean;
  scene?: { place: Place; mission: string; challenge: string | null } | null;
}) {
  const [messages, setMessages] = useState<ChatMsg[]>(initial);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [sceneDone, setSceneDone] = useState(false);
  const [call, setCall] = useState<CallState>("off");
  const [callNotes, setCallNotes] = useState<NonNullable<ChatMsg["correction"]>[]>([]);
  const [summary, setSummary] = useState<NonNullable<ChatMsg["correction"]>[] | null>(null);
  const [lastHeard, setLastHeard] = useState("");
  const [lastReply, setLastReply] = useState("");
  const [report, setReport] = useState<{ report: ReportView; savedPhrases: number } | null>(null);
  const [reporting, setReporting] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const seq = useRef(0);
  const convRef = useRef(initialId);
  const callRef = useRef<CallState>("off");
  const voice = useVoice();
  const rec = useVoiceRecorder({ silenceMs: 1300, maxSeconds: 45 });
  const charVoice: VoiceName = persona?.voice ?? "m1";
  const name = persona?.name ?? "Alex";

  // Leitura via função: o estado da ligação muda durante os awaits.
  const callNow = (): CallState => callRef.current;
  const setCallState = (s: CallState) => {
    callRef.current = s;
    setCall(s);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, sending]);

  /** Envia uma mensagem e devolve a resposta (ou null em caso de erro). */
  async function send(content: string, viaVoice = false): Promise<Reply | null> {
    const msg = content.trim();
    if (!msg) return null;
    setError(null);
    setText("");
    const tempId = `u-${++seq.current}`;
    setMessages((m) => [...m, { id: tempId, role: "user", content: msg, correction: null, tip: null }]);
    setSending(true);
    try {
      const cid = convRef.current;
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cid ? { conversationId: cid, message: msg, viaVoice } : { conversationId: null, message: msg, lessonId, scenarioId, customPrompt, level, viaVoice }),
      });
      const data = await res.json();
      if (data.conversationId && data.conversationId !== convRef.current) {
        convRef.current = data.conversationId;
        // Atualiza a URL sem recarregar a tela (não interrompe uma ligação).
        window.history.replaceState(null, "", `/professor?c=${data.conversationId}`);
      }
      if (!res.ok) {
        setMessages((m) => m.map((x) => (x.id === tempId ? { ...x, failed: true } : x)));
        setError(data.error ?? "Não foi possível obter resposta.");
        return null;
      }
      setMessages((m) => [
        ...m.map((x) => (x.id === tempId ? { ...x, id: String(data.userMessageId), correction: data.correction } : x)),
        { id: String(data.assistantMessageId ?? `a-${++seq.current}`), role: "assistant", content: data.reply, correction: null, tip: data.tip },
      ]);
      if (data.sceneComplete) setSceneDone(true);
      return { reply: data.reply, correction: data.correction, tip: data.tip, sceneComplete: Boolean(data.sceneComplete) };
    } catch {
      setMessages((m) => m.map((x) => (x.id === tempId ? { ...x, failed: true } : x)));
      setError("Sem conexão. Verifique sua internet e tente de novo.");
      return null;
    } finally {
      setSending(false);
    }
  }

  async function sendTyped(content: string) {
    if (sending) return;
    const r = await send(content);
    if (r && autoSpeak) voice.speak(r.reply, { voice: charVoice });
  }

  /** Botão do microfone (modo normal): grava até você parar de falar e envia. */
  async function talkOnce() {
    unlockAudio();
    if (rec.active) {
      rec.stop();
      return;
    }
    voice.stop();
    const wav = await rec.listen();
    if (!wav) return;
    setTranscribing(true);
    try {
      const said = await transcribeWav(wav);
      if (!said) {
        setError("Não consegui entender. Fale mais perto do microfone e tente de novo.");
        return;
      }
      const r = await send(said, true);
      if (r && autoSpeak) voice.speak(r.reply, { voice: charVoice });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setTranscribing(false);
    }
  }

  // ------------------------------------------------------------------ ligação
  async function callLoop() {
    while (callNow() !== "off" && callNow() !== "paused") {
      setCallState("listening");
      const wav = await rec.listen({ silenceMs: 1300, noSpeechTimeoutMs: 20000, maxSeconds: 45 });
      if (callNow() === "off" || callNow() === "paused") return;
      if (!wav) {
        setCallState("paused"); // ninguém falou: pausa em vez de ficar em loop
        return;
      }
      setCallState("thinking");
      let said = "";
      try {
        said = await transcribeWav(wav);
      } catch (e) {
        setError((e as Error).message);
      }
      if (callNow() === "off") return;
      if (!said) continue;
      setLastHeard(said);
      const r = await send(said, true);
      if (callNow() === "off") return;
      if (!r) {
        setCallState("paused");
        return;
      }
      if (r.correction) setCallNotes((n) => [...n, r.correction!]);
      setLastReply(r.reply);
      setCallState("speaking");
      await voice.speak(r.reply, { voice: charVoice });
    }
  }

  async function startCall() {
    unlockAudio();
    setError(null);
    setCallNotes([]);
    setSummary(null);
    setCallState("speaking");
    // Se a conversa está começando, o personagem fala primeiro.
    const opener = messages.length === 1 && messages[0].role === "assistant" ? messages[0].content : null;
    const hello = opener ?? (messages.length === 0 ? `Hi${studentName ? ` ${studentName}` : ""}! I'm ${name}. What would you like to talk about?` : "");
    setLastReply(hello);
    if (opener) await voice.speak(opener, { voice: charVoice });
    else if (messages.length === 0) await voice.speak(`Hi${studentName ? ` ${studentName}` : ""}! I'm ${name}. What would you like to talk about?`, { voice: charVoice });
    if (callNow() === "off") return;
    setCallState("listening");
    callLoop();
  }

  function pauseOrResume() {
    if (call === "paused") {
      setCallState("listening");
      callLoop();
    } else {
      setCallState("paused");
      rec.cancel();
      voice.stop();
    }
  }

  function endCall() {
    setCallState("off");
    rec.cancel();
    voice.stop();
    setSummary(callNotes);
  }

  useEffect(() => {
    if (startInCall && voiceEnabled) {
      // Inicia a ligação ao abrir a partir do botão "Ligar".
      const t = setTimeout(() => startCall(), 300);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const busy = sending || transcribing;
  const userTurns = messages.filter((m) => m.role === "user" && !m.failed).length;

  async function openReport() {
    if (!convRef.current) return;
    setSummary(null);
    setReporting(true);
    setError(null);
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

  return (
    <div className="panel mt-6 flex h-[calc(100dvh-16rem)] min-h-[28rem] flex-col lg:h-[calc(100dvh-14rem)]">
      <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          {persona ? (
            <Avatar look={persona.look} className="size-11 shrink-0 overflow-hidden rounded-full" />
          ) : (
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-boarding font-display font-bold text-boarding-ink">A</span>
          )}
          <div className="min-w-0">
            <p className="font-bold">{name}</p>
            <p className="truncate text-sm text-muted">
              {persona ? persona.role : "Seu professor de inglês"}
              {level ? ` · nível ${level}` : ""}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <label className="hidden cursor-pointer items-center gap-2 text-sm sm:flex">
            <input type="checkbox" checked={autoSpeak} onChange={(e) => setAutoSpeak(e.target.checked)} className="size-4 accent-[var(--atlantic)]" />
            Ler em voz alta
          </label>
          {userTurns >= 2 && (
            <button type="button" onClick={openReport} disabled={reporting || busy} className="btn-ghost px-3 py-2 text-sm" aria-label="Encerrar e ver relatório">
              {reporting ? <Loader2 size={16} className="animate-spin" aria-hidden /> : <ClipboardCheck size={16} aria-hidden />}
              <span className="hidden sm:inline">Relatório</span>
            </button>
          )}
          {voiceEnabled && (
            <button type="button" onClick={startCall} className="btn-go px-4 py-2" aria-label="Iniciar ligação só por voz">
              <Phone size={18} aria-hidden /> Ligar
            </button>
          )}
        </div>
      </div>

      {(scene || goals.length > 0) && (
        <details className="border-b border-line text-sm" open={messages.length <= 1}>
          <summary className="cursor-pointer px-4 py-2 font-bold">
            <Target size={14} className="mr-1 inline align-[-2px]" aria-hidden /> Sua missão nesta cena
          </summary>
          {scene && (
            <div className="relative mx-4 mb-2 h-24 overflow-hidden rounded-2xl sm:h-28">
              <SceneBackdrop place={scene.place} className="absolute inset-0 size-full" />
              {persona && <Avatar look={persona.look} className="absolute bottom-0 left-4 size-20 overflow-hidden rounded-t-full border-4 border-surface sm:size-24" />}
            </div>
          )}
          <div className="px-4 pb-3">
            {scene && <p>{scene.mission}</p>}
            {scene?.challenge && <p className="mt-1 text-muted">Neste nível: {scene.challenge}</p>}
            {goals.length > 0 && (
              <ul className="mt-2 list-disc pl-5 text-muted">
                {goals.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            )}
            <p className="mt-2 text-xs text-muted">Quando terminar, toque em “Relatório” para ver sua nota, seus erros e expressões novas.</p>
          </div>
        </details>
      )}
      {sceneDone && (
        <p role="status" className="border-b border-line bg-correct-bg px-4 py-2 text-sm font-bold text-correct">
          Cena concluída! +15 XP.{" "}
          <button type="button" onClick={openReport} className="underline">
            Ver relatório da conversa
          </button>
        </p>
      )}
      <div className="flex-1 space-y-4 overflow-y-auto p-4" aria-live="polite">
        {messages.length === 0 && (
          <div className="mx-auto max-w-md py-8 text-center text-muted">
            <p className="font-display text-xl font-bold text-ink">
              {customPrompt ? "Comece a sua cena!" : `Say hi to ${name}${studentName ? `, ${studentName}` : ""}!`}
            </p>
            <p className="mt-2">
              {customPrompt
                ? `Situação: “${customPrompt}”. Diga a primeira frase em inglês, ou toque em Ligar para conversar só por voz.`
                : "Fale ou escreva em inglês. Para treinar a conversa de verdade, toque em Ligar: é só voz, como uma ligação."}
            </p>
            <div className={`mt-4 flex-wrap justify-center gap-2 ${customPrompt ? "hidden" : "flex"}`}>
              {["Hi! How are you?", "Can you help me practice introductions?", "Como eu digo 'estou com fome'?"].map((s) => (
                <button key={s} type="button" onClick={() => sendTyped(s)} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink hover:bg-surface-2">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m) => (
          <div key={m.id} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
            <div
              lang="en"
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${m.role === "user" ? "rounded-br-md bg-atlantic text-surface" : "rounded-bl-md bg-surface-2"} ${m.failed ? "opacity-60" : ""}`}
            >
              {m.content}
              {m.role === "assistant" && (
                <button
                  type="button"
                  onClick={() => (unlockAudio(), voice.speak(m.content, { voice: charVoice }))}
                  className="ml-2 inline-grid size-7 place-items-center rounded-full align-middle text-atlantic hover:bg-surface"
                  aria-label="Ouvir resposta"
                >
                  <Volume2 size={16} aria-hidden />
                </button>
              )}
            </div>
            {m.correction && (
              <div className="mt-1.5 max-w-[85%] rounded-xl border border-boarding bg-boarding/15 px-3 py-2 text-sm">
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
              <p className="mt-1.5 flex max-w-[85%] items-start gap-1.5 text-sm text-muted">
                <Lightbulb size={14} className="mt-1 shrink-0 text-[#d49b00]" aria-hidden />
                {m.tip}
              </p>
            )}
            {m.failed && <p className="mt-1 text-sm text-wrong">Não enviada</p>}
          </div>
        ))}
        {sending && (
          <p className="text-sm text-muted">
            {name} está {voice.neural ? "respondendo" : "escrevendo"}…
          </p>
        )}
        <div ref={endRef} />
      </div>

      {(error || rec.error) && call === "off" && <p className="mx-4 mb-2 rounded-xl bg-wrong-bg px-3 py-2 text-sm text-wrong">{error ?? rec.error}</p>}

      <form
        className="flex items-end gap-2 border-t border-line p-3"
        onSubmit={(e) => {
          e.preventDefault();
          sendTyped(text);
        }}
      >
        {voiceEnabled && (
          <button
            type="button"
            onClick={talkOnce}
            disabled={sending || transcribing || call !== "off"}
            className={`relative grid size-12 shrink-0 place-items-center rounded-full ${rec.active && call === "off" ? "bg-wrong text-white" : "bg-boarding text-boarding-ink"}`}
            aria-label={rec.active ? "Parar e enviar" : "Falar em inglês"}
            title={rec.active ? "Parar e enviar" : "Falar (envia sozinho quando você parar de falar)"}
          >
            {transcribing ? <Loader2 size={20} className="animate-spin" aria-hidden /> : rec.active && call === "off" ? <Square size={18} aria-hidden /> : <Mic size={22} aria-hidden />}
            {rec.active && call === "off" && <span className="absolute inset-0 rounded-full ring-4 ring-wrong" style={{ opacity: 0.2 + rec.level * 0.8 }} aria-hidden />}
          </button>
        )}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendTyped(text);
            }
          }}
          rows={1}
          maxLength={1000}
          placeholder={rec.active ? "Ouvindo… pare de falar para enviar" : transcribing ? "Transcrevendo sua fala…" : "Escreva em inglês"}
          disabled={busy || rec.active}
          className="field max-h-32 min-h-12 resize-none"
          lang="en"
          aria-label="Mensagem"
        />
        <button type="submit" disabled={!text.trim() || busy} className="btn-primary size-12 shrink-0 p-0" aria-label="Enviar">
          <Send size={20} aria-hidden />
        </button>
      </form>

      {/* Ligação: só voz */}
      {call !== "off" && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#0b2f35] px-6 py-10 text-white" role="dialog" aria-modal="true" aria-label={`Ligação com ${name}`}>
          <p className="text-sm text-white/70">Ligação · nível {level ?? "do seu perfil"}</p>
          <div className="flex flex-col items-center">
            <div className="relative">
              <span
                className="absolute -inset-4 rounded-full bg-boarding/30 transition-transform duration-100"
                style={{ transform: `scale(${call === "listening" ? 1 + rec.level * 0.35 : call === "speaking" ? 1.08 : 1})` }}
                aria-hidden
              />
              {persona ? (
                <Avatar look={persona.look} className="relative size-40 overflow-hidden rounded-full border-4 border-white/20" />
              ) : (
                <span className="relative grid size-40 place-items-center rounded-full bg-boarding font-display text-6xl font-bold text-boarding-ink">A</span>
              )}
            </div>
            <p className="mt-6 font-display text-3xl font-bold">{name}</p>
            <p className="mt-2 flex items-center gap-2 text-lg text-white/85" aria-live="polite">
              {call === "listening" && (rec.state === "speaking" ? "Ouvindo você…" : "Pode falar")}
              {call === "thinking" && (
                <>
                  <Loader2 size={18} className="animate-spin" aria-hidden /> Pensando…
                </>
              )}
              {call === "speaking" && `${name} está falando…`}
              {call === "paused" && "Pausado. Toque em continuar quando quiser."}
            </p>
            {lastReply && (
              <p className="mt-5 max-w-md rounded-2xl bg-white/10 px-4 py-3 text-center text-lg leading-snug" lang="en">
                {lastReply}
              </p>
            )}
            {lastHeard && <p className="mt-3 max-w-md text-center text-sm text-white/60">Você disse: “{lastHeard}”</p>}
            {callNotes.length > 0 && <p className="mt-2 text-sm text-boarding">{callNotes.length} {callNotes.length === 1 ? "ponto para melhorar" : "pontos para melhorar"} no resumo</p>}
            {(error || rec.error) && <p className="mt-3 max-w-md text-center text-sm text-[#ffb4ab]">{error ?? rec.error}</p>}
          </div>
          <div className="flex items-center gap-6">
            <button type="button" onClick={pauseOrResume} className="grid size-16 place-items-center rounded-full bg-white/15 hover:bg-white/25" aria-label={call === "paused" ? "Continuar" : "Pausar"}>
              {call === "paused" ? <Play size={26} aria-hidden /> : <Pause size={26} aria-hidden />}
            </button>
            <button type="button" onClick={endCall} className="grid size-20 place-items-center rounded-full bg-[#e5484d] hover:brightness-110" aria-label="Encerrar ligação">
              <PhoneOff size={32} aria-hidden />
            </button>
          </div>
        </div>
      )}

      {/* Resumo da ligação */}
      {summary && (
        <div className="fixed inset-0 z-50 grid place-items-end bg-black/50 sm:place-items-center" role="dialog" aria-modal="true" aria-labelledby="resumo-titulo">
          <div className="animate-pop max-h-[85dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-surface p-6 sm:rounded-3xl">
            <h2 id="resumo-titulo" className="font-display text-2xl font-bold">
              Resumo da ligação
            </h2>
            {summary.length === 0 ? (
              <p className="mt-2 text-muted">Nenhuma correção nesta ligação. Muito bem! Tente um nível acima para se desafiar.</p>
            ) : (
              <>
                <p className="mt-1 text-muted">Pontos para melhorar. Eles também entram na sua revisão.</p>
                <ul className="mt-4 space-y-3">
                  {summary.map((c, i) => (
                    <li key={i} className="rounded-xl border border-boarding/60 bg-boarding/10 p-3 text-sm">
                      <span className="text-wrong line-through" lang="en">
                        {c.original}
                      </span>{" "}
                      → <strong lang="en">{c.corrected}</strong>
                      <button type="button" onClick={() => voice.speak(c.corrected, { voice: charVoice })} className="ml-1 inline-grid size-6 place-items-center align-middle text-atlantic" aria-label="Ouvir a forma correta">
                        <Volume2 size={14} aria-hidden />
                      </button>
                      <span className="mt-1 block text-muted">{c.explanation_pt}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {userTurns >= 2 && (
              <button type="button" onClick={openReport} className="btn-go mt-6 w-full">
                <ClipboardCheck size={18} aria-hidden /> Ver relatório completo
              </button>
            )}
            <button type="button" onClick={() => setSummary(null)} className={`btn-primary w-full ${userTurns >= 2 ? "mt-2" : "mt-6"}`}>
              Fechar
            </button>
          </div>
        </div>
      )}
      {report && <ConversationReportSheet report={report.report} savedPhrases={report.savedPhrases} onClose={() => setReport(null)} />}
    </div>
  );
}
