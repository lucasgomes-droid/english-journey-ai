"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useSpeech } from "./speech";

/** O que o servidor tem configurado (vem do layout). */
export interface VoiceCaps {
  /** Voz natural (Azure ou Groq). */
  neural: boolean;
  /** Avaliação fonética de pronúncia (Azure). */
  phonetic: boolean;
  /** Reconhecimento de fala (Whisper). */
  stt: boolean;
}

const VoiceCapsContext = createContext<VoiceCaps>({ neural: false, phonetic: false, stt: false });

export function VoiceCapsProvider({ caps, children }: { caps: VoiceCaps; children: React.ReactNode }) {
  return <VoiceCapsContext.Provider value={caps}>{children}</VoiceCapsContext.Provider>;
}
export const useVoiceCaps = () => useContext(VoiceCapsContext);

export type VoiceName = "f1" | "f2" | "f3" | "m1" | "m2" | "m3";

// Um único <audio> compartilhado: desbloqueado no primeiro toque (exigência do iPhone).
let sharedAudio: HTMLAudioElement | null = null;
let neuralBroken = false; // se a voz natural falhar, usa a do navegador pelo resto da sessão
const audioCache = new Map<string, string>(); // texto+voz → object URL

function getAudio() {
  if (typeof window === "undefined") return null;
  if (!sharedAudio) {
    sharedAudio = new Audio();
    sharedAudio.preload = "auto";
  }
  return sharedAudio;
}

/** Chame dentro de um clique para liberar áudio automático depois (iOS/Safari). */
export function unlockAudio() {
  const a = getAudio();
  if (!a || a.dataset.unlocked) return;
  a.dataset.unlocked = "1";
  a.src = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA=";
  a.play().catch(() => {});
}

/** Divide em trechos de até ~190 caracteres, respeitando o fim das frases. */
export function chunkText(text: string, max = 190): string[] {
  const sentences = text.replace(/\s+/g, " ").trim().match(/[^.!?]+[.!?]*/g) ?? [text];
  const out: string[] = [];
  let cur = "";
  for (const s of sentences.map((x) => x.trim()).filter(Boolean)) {
    if ((cur + " " + s).trim().length <= max) cur = (cur + " " + s).trim();
    else {
      if (cur) out.push(cur);
      if (s.length <= max) cur = s;
      else {
        // frase gigante: corta por vírgulas/espaços
        let rest = s;
        while (rest.length > max) {
          let cut = rest.lastIndexOf(",", max);
          if (cut < max / 2) cut = rest.lastIndexOf(" ", max);
          out.push(rest.slice(0, cut + 1).trim());
          rest = rest.slice(cut + 1).trim();
        }
        cur = rest;
      }
    }
  }
  if (cur) out.push(cur);
  return out;
}

async function fetchTts(text: string, voice: VoiceName): Promise<string> {
  const key = `${voice}|${text}`;
  const hit = audioCache.get(key);
  if (hit) return hit;
  const res = await fetch("/api/tts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text, voice }) });
  if (!res.ok) throw new Error(`tts ${res.status}`);
  const url = URL.createObjectURL(await res.blob());
  audioCache.set(key, url);
  return url;
}

/**
 * Fala um texto: voz natural do servidor quando disponível; senão, voz do navegador.
 * `speak` devolve uma Promise que termina quando o áudio acaba (útil no modo ligação).
 */
export function useVoice() {
  const caps = useVoiceCaps();
  const browser = useSpeech();
  const [speaking, setSpeaking] = useState(false);
  const token = useRef(0);
  const lineRun = useRef(0);

  /** Para o áudio atual (uso interno entre frases). */
  const halt = useCallback(() => {
    token.current++;
    const a = getAudio();
    if (a) {
      a.pause();
      a.onended = null;
    }
    browser.stop();
    setSpeaking(false);
  }, [browser]);

  /** Para tudo, inclusive a leitura de um diálogo em andamento. */
  const stop = useCallback(() => {
    lineRun.current++;
    halt();
  }, [halt]);

  useEffect(() => () => stop(), [stop]);

  const browserSpeak = useCallback(
    (text: string, rate: number) =>
      new Promise<void>((resolve) => {
        if (typeof window === "undefined" || !("speechSynthesis" in window)) return resolve();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "en-US";
        const v = window.speechSynthesis.getVoices().find((x) => x.lang?.toLowerCase().startsWith("en-us")) ?? null;
        if (v) u.voice = v;
        u.rate = rate;
        u.onend = () => resolve();
        u.onerror = () => resolve();
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      }),
    [],
  );

  const speak = useCallback(
    async (text: string, opts: { voice?: VoiceName; rate?: number } = {}) => {
      halt();
      const my = ++token.current;
      const rate = opts.rate ?? 1;
      const voice = opts.voice ?? "f1";
      setSpeaking(true);
      try {
        if (caps.neural && !neuralBroken) {
          const chunks = chunkText(text);
          let next: Promise<string> | null = fetchTts(chunks[0], voice);
          for (let i = 0; i < chunks.length; i++) {
            const url = await next!;
            next = i + 1 < chunks.length ? fetchTts(chunks[i + 1], voice) : null; // pré-carrega o próximo
            if (my !== token.current) return;
            const a = getAudio()!;
            a.src = url;
            a.playbackRate = rate;
            (a as HTMLAudioElement & { preservesPitch?: boolean }).preservesPitch = true;
            await new Promise<void>((resolve, reject) => {
              a.onended = () => resolve();
              a.onerror = () => reject(new Error("audio"));
              a.play().catch(reject);
            });
            if (my !== token.current) return;
          }
          return;
        }
        await browserSpeak(text, rate * 0.95);
      } catch {
        if (my !== token.current) return;
        neuralBroken = true; // falhou: usa a voz do navegador daqui em diante
        await browserSpeak(text, rate * 0.95);
      } finally {
        if (my === token.current) setSpeaking(false);
      }
    },
    [caps.neural, halt, browserSpeak],
  );

  /** Lê um diálogo com uma voz por personagem. */
  const speakLines = useCallback(
    async (lines: { speaker: string; text: string }[], opts: { rate?: number; onLine?: (i: number) => void } = {}) => {
      const speakers = Array.from(new Set(lines.map((l) => l.speaker)));
      const palette: VoiceName[] = ["f1", "m1", "f2", "m2", "f3", "m3"];
      const run = ++lineRun.current;
      for (let i = 0; i < lines.length; i++) {
        if (lineRun.current !== run) return; // interrompido
        opts.onLine?.(i);
        await speak(lines[i].text, { voice: palette[speakers.indexOf(lines[i].speaker) % palette.length], rate: opts.rate });
      }
      if (lineRun.current === run) opts.onLine?.(-1);
    },
    [speak],
  );

  /** Toca uma gravação (ex.: a voz do próprio aluno). Termina quando o áudio acaba. */
  const playBlob = useCallback(
    async (blob: Blob) => {
      halt();
      const my = ++token.current;
      const a = getAudio();
      if (!a) return;
      const url = URL.createObjectURL(blob);
      setSpeaking(true);
      try {
        a.src = url;
        a.playbackRate = 1;
        await new Promise<void>((resolve) => {
          a.onended = () => resolve();
          a.onerror = () => resolve();
          a.play().catch(() => resolve());
        });
      } finally {
        URL.revokeObjectURL(url);
        if (my === token.current) setSpeaking(false);
      }
    },
    [halt],
  );

  return { speak, speakLines, playBlob, stop, speaking, neural: caps.neural && !neuralBroken };
}
