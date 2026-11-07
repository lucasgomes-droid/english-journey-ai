"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, useSyncExternalStore } from "react";

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
/**
 * Quem está esperando o fim do áudio compartilhado. Se outra fala começar (ou alguém parar o áudio),
 * essa espera é liberada — senão a conversa por voz ficava presa em "falando…" para sempre.
 */
let pendingEnd: (() => void) | null = null;
function releasePending() {
  const r = pendingEnd;
  pendingEnd = null;
  r?.();
}
const audioCache = new Map<string, string>(); // texto+voz → object URL

// Voz natural com problema (ex.: serviço fora do ar): evita tentar de novo por 10 min.
const BROKEN_KEY = "ej-tts-broken";
let neuralBroken = (() => {
  try {
    return typeof window !== "undefined" && Number(sessionStorage.getItem(BROKEN_KEY) ?? 0) > Date.now();
  } catch {
    return false;
  }
})();
function markNeuralBroken() {
  neuralBroken = true;
  try {
    sessionStorage.setItem(BROKEN_KEY, String(Date.now() + 10 * 60_000));
  } catch {
    /* sem armazenamento: vale só para esta página */
  }
}

// Aviso global quando nenhum áudio consegue tocar (para mostrar ajuda na tela).
type AudioIssue = null | "no-voice" | "blocked";
let audioIssue: AudioIssue = null;
const issueListeners = new Set<() => void>();
function setAudioIssue(v: AudioIssue) {
  if (audioIssue === v) return;
  audioIssue = v;
  issueListeners.forEach((l) => l());
}
export function useAudioIssue() {
  return useSyncExternalStore(
    (cb) => {
      issueListeners.add(cb);
      return () => issueListeners.delete(cb);
    },
    () => audioIssue,
    () => null,
  );
}
export const clearAudioIssue = () => setAudioIssue(null);

function getAudio() {
  if (typeof window === "undefined") return null;
  if (!sharedAudio) {
    sharedAudio = new Audio();
    sharedAudio.preload = "auto";
  }
  return sharedAudio;
}

let synthPrimed = false;
/** Chame dentro de um toque: libera o áudio e a voz do aparelho para tocarem depois (iPhone e Android). */
export function unlockAudio() {
  const a = getAudio();
  if (a && !a.dataset.unlocked) {
    a.dataset.unlocked = "1";
    a.src = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YQAAAAA=";
    a.play().catch(() => {});
  }
  // O Chrome no Android só deixa a voz do aparelho falar depois de uma fala iniciada por um toque.
  if (!synthPrimed && typeof window !== "undefined" && "speechSynthesis" in window) {
    synthPrimed = true;
    try {
      const u = new SpeechSynthesisUtterance(" ");
      u.volume = 0;
      window.speechSynthesis.speak(u);
    } catch {
      /* ignora */
    }
  }
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

const DEVICE_CACHE = "ej-tts-v1";
const cacheKey = (voice: VoiceName, text: string) => `/__tts/${voice}/${encodeURIComponent(text.trim().replace(/\s+/g, " "))}`;

/** Áudio guardado NESTE aparelho (Cache Storage): toca de novo sem internet e sem gastar a cota de voz. */
async function deviceCached(text: string, voice: VoiceName): Promise<string | null> {
  try {
    if (typeof caches === "undefined") return null;
    const hit = await (await caches.open(DEVICE_CACHE)).match(cacheKey(voice, text));
    return hit ? URL.createObjectURL(await hit.blob()) : null;
  } catch {
    return null;
  }
}

/** Busca a voz natural: memória → aparelho → servidor (que tem o próprio cache compartilhado). */
async function fetchTts(text: string, voice: VoiceName, cachedOnly = false): Promise<string> {
  const key = `${voice}|${text}`;
  const hit = audioCache.get(key);
  if (hit) return hit;
  const local = await deviceCached(text, voice);
  if (local) {
    audioCache.set(key, local);
    return local;
  }
  if (cachedOnly) throw new Error("tts not cached");
  // Sem resposta em 12 s: desiste da voz natural e usa a do aparelho (não trava a conversa).
  const res = await fetch("/api/tts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text, voice }), signal: AbortSignal.timeout(12_000) });
  if (!res.ok) throw new Error(`tts ${res.status}`);
  const blob = await res.blob();
  try {
    if (typeof caches !== "undefined") await (await caches.open(DEVICE_CACHE)).put(cacheKey(voice, text), new Response(blob, { headers: { "Content-Type": blob.type } }));
  } catch {
    /* sem espaço ou modo privado: segue sem guardar */
  }
  const url = URL.createObjectURL(blob);
  audioCache.set(key, url);
  return url;
}

/** Com a voz natural indisponível, ainda dá para usá-la se TODOS os trechos já estiverem guardados no aparelho. */
async function allCached(chunks: string[], voice: VoiceName) {
  for (const c of chunks) if (!audioCache.has(`${voice}|${c}`) && !(await deviceCached(c, voice))) return false;
  return true;
}

/**
 * Fala um texto: voz natural do servidor quando disponível; senão, voz do navegador.
 * `speak` devolve uma Promise que termina quando o áudio acaba (útil no modo ligação).
 */
export function useVoice() {
  const caps = useVoiceCaps();
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
    releasePending();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const synth = window.speechSynthesis;
      // Cancelar sem nada tocando faz o Android descartar a próxima fala.
      if (synth.speaking || synth.pending) synth.cancel();
    }
    setSpeaking(false);
  }, []);

  /** Para tudo, inclusive a leitura de um diálogo em andamento. */
  const stop = useCallback(() => {
    lineRun.current++;
    halt();
  }, [halt]);

  useEffect(() => () => stop(), [stop]);

  /** Voz do próprio aparelho, em trechos curtos (o Android corta falas longas). */
  const browserSpeak = useCallback(
    async (text: string, rate: number, lang = "en") => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        setAudioIssue("no-voice");
        return;
      }
      const synth = window.speechSynthesis;
      const voices = synth.getVoices();
      const en = voices.filter((x) => x.lang?.toLowerCase().replace("_", "-").startsWith(lang));
      if (voices.length > 0 && en.length === 0) {
        if (lang !== "en") return; // sem voz em português: só mostra o texto
        setAudioIssue("no-voice");
      }
      const v = en.find((x) => x.lang.toLowerCase().replace("_", "-") === (lang === "en" ? "en-us" : "pt-br")) ?? en[0] ?? null;
      const my = token.current;
      for (const part of chunkText(text, 160)) {
        if (my !== token.current) return;
        const ok = await new Promise<boolean>((resolve) => {
          const u = new SpeechSynthesisUtterance(part);
          u.lang = v?.lang ?? (lang === "en" ? "en-US" : "pt-BR");
          if (v) u.voice = v;
          u.rate = rate;
          let started = false;
          // Se a fala nem começar em 4 s, o aparelho bloqueou ou não tem voz.
          const guard = setTimeout(() => resolve(started), 4000);
          u.onstart = () => {
            started = true;
            // Alguns navegadores nunca avisam o fim da fala: libera depois do tempo esperado.
            setTimeout(() => resolve(true), (part.split(/\s+/).length * 0.8) / Math.max(0.5, rate) * 1000 + 5000);
          };
          u.onend = () => {
            clearTimeout(guard);
            resolve(true);
          };
          u.onerror = (e) => {
            clearTimeout(guard);
            resolve(e.error === "interrupted" || e.error === "canceled");
          };
          synth.speak(u);
        });
        if (!ok) {
          setAudioIssue(en.length === 0 ? "no-voice" : "blocked");
          synth.cancel();
          return;
        }
      }
      setAudioIssue(null);
    },
    [],
  );

  const speak = useCallback(
    async (text: string, opts: { voice?: VoiceName; rate?: number; lang?: "en" | "pt" } = {}) => {
      halt();
      const my = ++token.current;
      const rate = opts.rate ?? 1;
      const voice = opts.voice ?? "f1";
      setSpeaking(true);
      try {
        // Português: a voz natural do servidor é só em inglês, então usa a voz do aparelho.
        if (opts.lang === "pt") {
          await browserSpeak(text, rate, "pt");
          return;
        }
        const chunks = caps.neural ? chunkText(text) : [];
        const cachedOnly = neuralBroken && chunks.length > 0 && (await allCached(chunks, voice));
        if (my !== token.current) return;
        if (caps.neural && (!neuralBroken || cachedOnly)) {
          let next: Promise<string> | null = fetchTts(chunks[0], voice, cachedOnly);
          for (let i = 0; i < chunks.length; i++) {
            const url = await next!;
            next = i + 1 < chunks.length ? fetchTts(chunks[i + 1], voice, cachedOnly) : null; // pré-carrega o próximo
            if (my !== token.current) return;
            const a = getAudio()!;
            a.src = url;
            a.playbackRate = rate;
            (a as HTMLAudioElement & { preservesPitch?: boolean }).preservesPitch = true;
            await new Promise<void>((resolve, reject) => {
              releasePending();
              // Trava de segurança: se o "fim do áudio" nunca chegar, segue em frente.
              const guard = setTimeout(done, (chunks[i].split(/\s+/).length * 0.75) / Math.max(0.5, rate) * 1000 + 6000);
              function done() {
                clearTimeout(guard);
                if (pendingEnd === done) pendingEnd = null;
                resolve();
              }
              pendingEnd = done;
              a.onended = done;
              a.onerror = () => {
                clearTimeout(guard);
                if (pendingEnd === done) pendingEnd = null;
                reject(new Error("audio"));
              };
              a.play().catch((e: DOMException) => {
                // Bloqueio de autoplay não é defeito da voz: só precisa de um toque.
                if (e?.name === "NotAllowedError") {
                  setAudioIssue("blocked");
                  done();
                } else if (e?.name === "AbortError") done();
                else {
                  clearTimeout(guard);
                  reject(e);
                }
              });
            });
            if (my !== token.current) return;
          }
          return;
        }
        await browserSpeak(text, rate * 0.95);
      } catch {
        if (my !== token.current) return;
        markNeuralBroken(); // falhou: usa a voz do aparelho daqui em diante
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
