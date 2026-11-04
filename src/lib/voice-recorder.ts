"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Gravação do microfone em PCM com detecção de silêncio (VAD simples por energia).
 * Gera WAV 16 kHz mono 16-bit — formato aceito tanto pelo Whisper quanto pela
 * avaliação de pronúncia do Azure.
 */
export interface RecorderOptions {
  /** Encerra sozinho após este silêncio depois de começar a falar (ms). 0 = desativado. */
  silenceMs?: number;
  /** Tempo máximo de gravação (s). */
  maxSeconds?: number;
  /** Desiste se ninguém falar neste tempo (ms). */
  noSpeechTimeoutMs?: number;
}

type Resolver = (wav: Blob | null) => void;

export function encodeWav(samples: Float32Array, sampleRate: number): Blob {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  const write = (o: number, s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(o + i, s.charCodeAt(i));
  };
  write(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  write(8, "WAVE");
  write(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM
  view.setUint16(22, 1, true); // mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  write(36, "data");
  view.setUint32(40, samples.length * 2, true);
  let o = 44;
  for (let i = 0; i < samples.length; i++, o += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(o, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return new Blob([buffer], { type: "audio/wav" });
}

/** Reamostragem linear simples para 16 kHz. */
export function downsample(input: Float32Array, from: number, to = 16000): Float32Array {
  if (from === to) return input;
  const ratio = from / to;
  const out = new Float32Array(Math.floor(input.length / ratio));
  for (let i = 0; i < out.length; i++) {
    const pos = i * ratio;
    const i0 = Math.floor(pos);
    const i1 = Math.min(i0 + 1, input.length - 1);
    out[i] = input[i0] + (input[i1] - input[i0]) * (pos - i0);
  }
  return out;
}

export function useVoiceRecorder(defaults: RecorderOptions = {}) {
  const [state, setState] = useState<"idle" | "listening" | "speaking">("idle");
  const [level, setLevel] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const procRef = useRef<ScriptProcessorNode | null>(null);
  const chunks = useRef<Float32Array[]>([]);
  const resolver = useRef<Resolver | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const cleanup = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    procRef.current?.disconnect();
    procRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    const ctx = ctxRef.current;
    ctxRef.current = null;
    if (ctx && ctx.state !== "closed") ctx.close().catch(() => {});
    setLevel(0);
  }, []);

  const finish = useCallback(
    (keep: boolean) => {
      const ctx = ctxRef.current;
      const rate = ctx?.sampleRate ?? 48000;
      const total = chunks.current.reduce((s, c) => s + c.length, 0);
      let wav: Blob | null = null;
      if (keep && total > rate * 0.3) {
        const all = new Float32Array(total);
        let o = 0;
        for (const c of chunks.current) {
          all.set(c, o);
          o += c.length;
        }
        wav = encodeWav(downsample(all, rate), 16000);
      }
      chunks.current = [];
      cleanup();
      setState("idle");
      const r = resolver.current;
      resolver.current = null;
      r?.(wav);
    },
    [cleanup],
  );

  /** Começa a ouvir. Resolve com o WAV quando a pessoa termina de falar (ou null). */
  const listen = useCallback(
    async (opts: RecorderOptions = {}): Promise<Blob | null> => {
      const { silenceMs = 1300, maxSeconds = 30, noSpeechTimeoutMs = 9000 } = { ...defaults, ...opts };
      setError(null);
      if (resolver.current) finish(false);
      if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
        setError("Seu navegador não permite usar o microfone. Use Chrome, Edge ou Safari atualizados.");
        return null;
      }
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
      } catch (e) {
        const name = (e as DOMException)?.name;
        setError(name === "NotAllowedError" ? "Permissão do microfone negada. Libere o microfone nas configurações do navegador." : "Não foi possível acessar o microfone.");
        return null;
      }
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      await ctx.resume().catch(() => {});
      const src = ctx.createMediaStreamSource(stream);
      const proc = ctx.createScriptProcessor(4096, 1, 1);
      ctxRef.current = ctx;
      streamRef.current = stream;
      procRef.current = proc;
      chunks.current = [];

      let noise = 0.01;
      let calibrated = 0;
      let spoke = false;
      let lastVoice = 0;
      const startedAt = performance.now();

      proc.onaudioprocess = (ev) => {
        const data = ev.inputBuffer.getChannelData(0);
        chunks.current.push(new Float32Array(data));
        let sum = 0;
        for (let i = 0; i < data.length; i++) sum += data[i] * data[i];
        const rms = Math.sqrt(sum / data.length);
        setLevel(Math.min(1, rms * 12));
        const now = performance.now();
        // Calibra o ruído ambiente nos primeiros ~300 ms.
        if (calibrated < 3) {
          noise = (noise * calibrated + rms) / (calibrated + 1);
          calibrated++;
          return;
        }
        const threshold = Math.max(0.015, noise * 2.5);
        if (rms > threshold) {
          if (!spoke) setState("speaking");
          spoke = true;
          lastVoice = now;
        }
        if (silenceMs > 0 && spoke && now - lastVoice > silenceMs) finish(true);
        else if (!spoke && noSpeechTimeoutMs > 0 && now - startedAt > noSpeechTimeoutMs) finish(false);
      };
      src.connect(proc);
      proc.connect(ctx.destination);
      setState("listening");
      timers.current.push(setTimeout(() => finish(true), maxSeconds * 1000));

      return new Promise<Blob | null>((resolve) => {
        resolver.current = resolve;
      });
    },
    [defaults, finish],
  );

  /** Para agora e entrega o que foi gravado. */
  const stop = useCallback(() => finish(true), [finish]);
  /** Cancela sem entregar áudio. */
  const cancel = useCallback(() => finish(false), [finish]);

  useEffect(() => () => cleanup(), [cleanup]);

  return { listen, stop, cancel, state, level, error, setError, active: state !== "idle" };
}

/** Envia WAV para transcrição no servidor (Whisper). */
export async function transcribeWav(wav: Blob): Promise<string> {
  const form = new FormData();
  form.append("audio", wav, "speech.wav");
  const res = await fetch("/api/transcribe", { method: "POST", body: form });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Falha na transcrição.");
  return (data.text as string) ?? "";
}
