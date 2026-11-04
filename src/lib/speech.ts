"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Text-to-Speech com a Web Speech API do navegador (gratuita, sem chave).
 * Prefere vozes en-US de melhor qualidade quando disponíveis.
 */
function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const en = voices.filter((v) => v.lang?.toLowerCase().startsWith("en"));
  const us = en.filter((v) => v.lang.toLowerCase().replace("_", "-") === "en-us");
  const preferred = ["Google US English", "Samantha", "Microsoft Aria", "Microsoft Jenny", "Microsoft Guy", "Alex"];
  for (const name of preferred) {
    const hit = us.find((v) => v.name.includes(name)) ?? en.find((v) => v.name.includes(name));
    if (hit) return hit;
  }
  return us.find((v) => v.localService) ?? us[0] ?? en[0];
}

export function useSpeech() {
  const [supported, setSupported] = useState(true);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | undefined>();
  const [enVoices, setEnVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- detecção de recurso do navegador
      setSupported(false);
      return;
    }
    const load = () => {
      const all = window.speechSynthesis.getVoices();
      setVoice(pickVoice(all));
      setEnVoices(all.filter((v) => v.lang?.toLowerCase().startsWith("en")));
    };
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", load);
  }, []);

  const speak = useCallback(
    (text: string, opts: { rate?: number } = {}) => {
      if (!supported || typeof window === "undefined") return;
      const synth = window.speechSynthesis;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = voice?.lang ?? "en-US";
      if (voice) u.voice = voice;
      u.rate = opts.rate ?? 0.95;
      u.onstart = () => setSpeaking(true);
      u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      synth.speak(u);
    },
    [supported, voice],
  );

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  /**
   * Lê um diálogo em sequência, com uma voz diferente por personagem
   * (ou tom diferente, se o aparelho tiver só uma voz em inglês).
   */
  const speakLines = useCallback(
    (lines: { speaker: string; text: string }[], opts: { rate?: number; onLine?: (i: number) => void; onEnd?: () => void } = {}) => {
      if (!supported || typeof window === "undefined") return;
      const synth = window.speechSynthesis;
      synth.cancel();
      const speakers = Array.from(new Set(lines.map((l) => l.speaker)));
      const pool = enVoices.length ? enVoices : voice ? [voice] : [];
      const primary = voice ?? pool[0];
      const others = pool.filter((v) => v !== primary && v.lang.toLowerCase().replace("_", "-").startsWith("en-"));
      lines.forEach((line, i) => {
        const u = new SpeechSynthesisUtterance(line.text);
        const idx = speakers.indexOf(line.speaker);
        const v = idx === 0 ? primary : (others[(idx - 1) % Math.max(1, others.length)] ?? primary);
        if (v) {
          u.voice = v;
          u.lang = v.lang;
        } else u.lang = "en-US";
        u.rate = opts.rate ?? 0.95;
        // Mesma voz para todos? Diferencia pelo tom.
        u.pitch = v === primary && idx > 0 ? 0.75 + (idx % 2) * 0.5 : 1;
        u.onstart = () => {
          setSpeaking(true);
          opts.onLine?.(i);
        };
        if (i === lines.length - 1) {
          u.onend = () => {
            setSpeaking(false);
            opts.onEnd?.();
          };
        }
        u.onerror = () => setSpeaking(false);
        synth.speak(u);
      });
    },
    [supported, voice, enVoices],
  );

  return { speak, speakLines, stop, speaking, supported };
}

/** Embaralhamento determinístico (mesmo resultado no servidor e no navegador). */
export function seededShuffle<T>(items: T[], seed: string): T[] {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  const rand = () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
