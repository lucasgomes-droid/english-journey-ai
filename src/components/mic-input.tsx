"use client";

import { useState } from "react";
import { Loader2, Mic, Square } from "lucide-react";
import { transcribeWav, useVoiceRecorder } from "@/lib/voice-recorder";
import { unlockAudio, useVoiceCaps } from "@/lib/voice";

/**
 * Botão "responder falando": grava até você parar de falar, transcreve e
 * entrega o texto (que preenche a resposta). Mostra o que foi entendido.
 */
export function MicInput({ onText, disabled, size = "md", label = "Responder falando" }: { onText: (text: string) => void; disabled?: boolean; size?: "md" | "lg"; label?: string }) {
  const caps = useVoiceCaps();
  const rec = useVoiceRecorder({ silenceMs: 1100, maxSeconds: 20, noSpeechTimeoutMs: 8000 });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  if (!caps.stt) return null;

  async function go() {
    unlockAudio();
    setErr(null);
    if (rec.active) {
      rec.stop();
      return;
    }
    const wav = await rec.listen();
    if (!wav) {
      if (!rec.error) setErr("Não ouvi nada. Toque e fale.");
      return;
    }
    setBusy(true);
    try {
      const t = await transcribeWav(wav);
      if (t) onText(t.replace(/\s+/g, " ").trim());
      else setErr("Não entendi. Fale mais perto do microfone.");
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const dim = size === "lg" ? "size-16" : "size-12";
  return (
    <span className="inline-flex flex-col items-center gap-1">
      <button
        type="button"
        onClick={go}
        disabled={disabled || busy}
        className={`relative grid ${dim} shrink-0 place-items-center rounded-full transition-transform active:scale-95 ${rec.active ? "bg-wrong text-white" : "bg-boarding text-boarding-ink"} disabled:opacity-50`}
        aria-label={rec.active ? "Parar" : label}
        title={label}
      >
        {busy ? <Loader2 size={22} className="animate-spin" aria-hidden /> : rec.active ? <Square size={18} aria-hidden /> : <Mic size={size === "lg" ? 28 : 22} aria-hidden />}
        {rec.active && <span className="absolute inset-0 rounded-full ring-4 ring-wrong" style={{ opacity: 0.2 + rec.level * 0.8 }} aria-hidden />}
      </button>
      {(err || rec.error) && <span className="max-w-40 text-center text-xs text-wrong">{err ?? rec.error}</span>}
    </span>
  );
}
