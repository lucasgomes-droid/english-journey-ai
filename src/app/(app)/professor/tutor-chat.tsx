"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Mic, Square, Send, Volume2, Lightbulb, PenLine } from "lucide-react";
import { useSpeech } from "@/lib/speech";
import { useRecorder } from "@/lib/recorder";

export interface ChatMsg {
  id: string;
  role: "user" | "assistant";
  content: string;
  correction: { original: string; corrected: string; explanation_pt: string } | null;
  tip: string | null;
  failed?: boolean;
}

export function TutorChat({
  initial,
  conversationId: initialId,
  lessonId,
  voiceEnabled,
  studentName,
}: {
  initial: ChatMsg[];
  conversationId: string | null;
  lessonId: string | null;
  voiceEnabled: boolean;
  studentName: string;
}) {
  const [messages, setMessages] = useState<ChatMsg[]>(initial);
  const [conversationId, setConversationId] = useState(initialId);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);
  const seq = useRef(0);
  const router = useRouter();
  const { speak, supported: ttsSupported } = useSpeech();
  const rec = useRecorder(60);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, sending]);

  async function send(content: string, viaVoice = false) {
    const msg = content.trim();
    if (!msg || sending) return;
    setError(null);
    setText("");
    const tempId = `u-${++seq.current}`;
    setMessages((m) => [...m, { id: tempId, role: "user", content: msg, correction: null, tip: null }]);
    setSending(true);
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, message: msg, lessonId: conversationId ? null : lessonId, viaVoice }),
      });
      const data = await res.json();
      const isNew = data.conversationId && data.conversationId !== conversationId;
      if (isNew) setConversationId(data.conversationId);
      if (isNew && res.ok) router.replace(`/professor?c=${data.conversationId}`, { scroll: false });
      if (!res.ok) {
        setMessages((m) => m.map((x) => (x.id === tempId ? { ...x, failed: true } : x)));
        setError(data.error ?? "Não foi possível obter resposta.");
        return;
      }
      setMessages((m) => [
        ...m.map((x) => (x.id === tempId ? { ...x, id: String(data.userMessageId), correction: data.correction } : x)),
        { id: String(data.assistantMessageId ?? `a-${++seq.current}`), role: "assistant", content: data.reply, correction: null, tip: data.tip },
      ]);
      if (autoSpeak) speak(data.reply);
    } catch {
      setMessages((m) => m.map((x) => (x.id === tempId ? { ...x, failed: true } : x)));
      setError("Sem conexão. Verifique sua internet e tente de novo.");
    } finally {
      setSending(false);
    }
  }

  async function toggleRecord() {
    if (rec.recording) {
      const blob = await rec.stop();
      if (!blob) return;
      setTranscribing(true);
      try {
        const form = new FormData();
        form.append("audio", blob, "speech");
        const res = await fetch("/api/transcribe", { method: "POST", body: form });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Falha na transcrição.");
        if (!data.text) {
          setError("Não consegui entender o áudio. Fale mais perto do microfone e tente de novo.");
          return;
        }
        await send(data.text, true);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setTranscribing(false);
      }
    } else {
      await rec.start();
    }
  }

  const busy = sending || transcribing;

  return (
    <div className="panel mt-6 flex h-[calc(100dvh-16rem)] min-h-[28rem] flex-col lg:h-[calc(100dvh-14rem)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-boarding font-display font-bold text-boarding-ink">A</span>
          <div>
            <p className="font-bold">Alex</p>
            <p className="text-sm text-muted">Seu professor de inglês</p>
          </div>
        </div>
        {ttsSupported && (
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input type="checkbox" checked={autoSpeak} onChange={(e) => setAutoSpeak(e.target.checked)} className="size-4 accent-[var(--atlantic)]" />
            Ler respostas em voz alta
          </label>
        )}
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-4" aria-live="polite">
        {messages.length === 0 && (
          <div className="mx-auto max-w-md py-8 text-center text-muted">
            <p className="font-display text-xl font-bold text-ink">Say hi to Alex{studentName ? `, ${studentName}` : ""}!</p>
            <p className="mt-2">Escreva ou grave algo em inglês. Se não souber dizer, escreva em português que o Alex te ajuda.</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {["Hi! How are you?", "Can you help me practice introductions?", "Como eu digo 'estou com fome'?"].map((s) => (
                <button key={s} type="button" onClick={() => send(s)} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink hover:bg-surface-2">
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
              {m.role === "assistant" && ttsSupported && (
                <button type="button" onClick={() => speak(m.content)} className="ml-2 inline-grid size-7 place-items-center rounded-full align-middle text-atlantic hover:bg-surface" aria-label="Ouvir resposta">
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
                  <span className="text-wrong line-through" lang="en">{m.correction.original}</span> → <strong lang="en">{m.correction.corrected}</strong>
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
        {sending && <p className="text-sm text-muted">Alex está escrevendo…</p>}
        <div ref={endRef} />
      </div>

      {(error || rec.error) && <p className="mx-4 mb-2 rounded-xl bg-wrong-bg px-3 py-2 text-sm text-wrong">{error ?? rec.error}</p>}

      <form
        className="flex items-end gap-2 border-t border-line p-3"
        onSubmit={(e) => {
          e.preventDefault();
          send(text);
        }}
      >
        {voiceEnabled && (
          <button
            type="button"
            onClick={toggleRecord}
            disabled={sending || transcribing}
            className={`grid size-12 shrink-0 place-items-center rounded-full ${rec.recording ? "animate-pulse bg-wrong text-white" : "bg-boarding text-boarding-ink"}`}
            aria-label={rec.recording ? "Parar e enviar gravação" : "Falar em inglês"}
            title={rec.recording ? "Parar e enviar" : "Falar"}
          >
            {rec.recording ? <Square size={18} aria-hidden /> : <Mic size={22} aria-hidden />}
          </button>
        )}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(text);
            }
          }}
          rows={1}
          maxLength={1000}
          placeholder={rec.recording ? "Gravando… toque no quadrado para enviar" : transcribing ? "Transcrevendo sua fala…" : "Escreva em inglês"}
          disabled={busy || rec.recording}
          className="field max-h-32 min-h-12 resize-none"
          lang="en"
          aria-label="Mensagem"
        />
        <button type="submit" disabled={!text.trim() || busy} className="btn-primary size-12 shrink-0 p-0" aria-label="Enviar">
          <Send size={20} aria-hidden />
        </button>
      </form>
    </div>
  );
}
