"use client";

import { useCallback, useRef, useState } from "react";

/** Gravação de áudio pelo microfone (MediaRecorder). Funciona em Chrome, Edge, Firefox e Safari (iOS 14.3+). */
export function useRecorder(maxSeconds = 60) {
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resolver = useRef<((b: Blob | null) => void) | null>(null);

  const start = useCallback(async () => {
    setError(null);
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setError("Seu navegador não permite gravar áudio. Use Chrome, Edge ou Safari atualizados.");
      return false;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      const mime = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"].find((m) => MediaRecorder.isTypeSupported(m));
      const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      chunks.current = [];
      rec.ondataavailable = (e) => e.data.size && chunks.current.push(e.data);
      rec.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = chunks.current.length ? new Blob(chunks.current, { type: rec.mimeType || "audio/webm" }) : null;
        resolver.current?.(blob);
        resolver.current = null;
      };
      rec.start();
      recRef.current = rec;
      setRecording(true);
      timer.current = setTimeout(() => recRef.current?.state === "recording" && recRef.current.stop(), maxSeconds * 1000);
      return true;
    } catch (e) {
      const name = (e as DOMException)?.name;
      setError(name === "NotAllowedError" ? "Permissão do microfone negada. Libere o microfone nas configurações do navegador." : "Não foi possível acessar o microfone.");
      return false;
    }
  }, [maxSeconds]);

  const stop = useCallback(() => {
    return new Promise<Blob | null>((resolve) => {
      if (timer.current) clearTimeout(timer.current);
      const rec = recRef.current;
      setRecording(false);
      if (!rec || rec.state !== "recording") return resolve(null);
      resolver.current = resolve;
      rec.stop();
    });
  }, []);

  return { start, stop, recording, error, setError };
}
