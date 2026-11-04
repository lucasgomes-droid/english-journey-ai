/**
 * Medidas de fluência a partir do áudio (WAV PCM 16-bit mono) e da transcrição.
 * Funções puras: rodam no servidor e nos testes.
 */

export interface AudioStats {
  seconds: number;
  /** Do primeiro ao último trecho com voz. */
  speechSeconds: number;
  /** Silêncios de 0,6 s ou mais no meio da fala. */
  pauses: number;
}

/** Lê um WAV PCM 16-bit mono. Retorna amostras -1..1 e a taxa. */
export function readWav(buf: ArrayBuffer): { samples: Float32Array; rate: number } | null {
  const v = new DataView(buf);
  if (buf.byteLength < 44 || v.getUint32(0, false) !== 0x52494646 /* RIFF */) return null;
  const rate = v.getUint32(24, true);
  const bits = v.getUint16(34, true);
  if (bits !== 16) return null;
  // Procura o bloco "data" (pode não estar no byte 36).
  let o = 12;
  while (o + 8 <= buf.byteLength) {
    const id = v.getUint32(o, false);
    const size = v.getUint32(o + 4, true);
    if (id === 0x64617461 /* data */) {
      const n = Math.min(size, buf.byteLength - o - 8) >> 1;
      const out = new Float32Array(n);
      for (let i = 0; i < n; i++) out[i] = v.getInt16(o + 8 + i * 2, true) / 32768;
      return { samples: out, rate };
    }
    o += 8 + size + (size & 1);
  }
  return null;
}

export function analyzeAudio(samples: Float32Array, rate: number, minPause = 0.6): AudioStats {
  const frame = Math.max(1, Math.round(rate * 0.03)); // 30 ms
  const energies: number[] = [];
  for (let i = 0; i + frame <= samples.length; i += frame) {
    let s = 0;
    for (let k = i; k < i + frame; k++) s += samples[k] * samples[k];
    energies.push(Math.sqrt(s / frame));
  }
  const seconds = samples.length / rate;
  if (!energies.length) return { seconds, speechSeconds: 0, pauses: 0 };
  // Limiar adaptativo: acima do ruído de fundo (percentil 20) e de um mínimo absoluto.
  const sorted = [...energies].sort((a, b) => a - b);
  const noise = sorted[Math.floor(sorted.length * 0.2)];
  const peak = sorted[Math.floor(sorted.length * 0.95)];
  const threshold = Math.max(0.01, noise * 2.5, peak * 0.08);
  const voiced = energies.map((e) => e > threshold);
  const first = voiced.indexOf(true);
  const last = voiced.lastIndexOf(true);
  if (first < 0) return { seconds, speechSeconds: 0, pauses: 0 };
  const frameSec = frame / rate;
  let pauses = 0;
  let run = 0;
  for (let i = first; i <= last; i++) {
    if (!voiced[i]) run++;
    else {
      if (run * frameSec >= minPause) pauses++;
      run = 0;
    }
  }
  return { seconds, speechSeconds: (last - first + 1) * frameSec, pauses };
}

const FILLERS = new Set(["um", "uh", "er", "erm", "hmm", "uhm", "ah", "eh", "ahn", "é", "tipo", "né"]);

export function textStats(transcript: string) {
  const tokens = transcript
    .toLowerCase()
    .replace(/[^a-zà-ú' ]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const fillers = tokens.filter((t) => FILLERS.has(t)).length;
  const words = tokens.filter((t) => !FILLERS.has(t));
  return { words: words.length, uniqueWords: new Set(words).size, fillers };
}

export function wordsPerMinute(words: number, speechSeconds: number) {
  return speechSeconds >= 3 ? Math.round((words / speechSeconds) * 60) : 0;
}

/** Faixa de referência por nível (palavras por minuto em fala espontânea de aprendiz). */
export function wpmComment(wpm: number) {
  if (wpm === 0) return "Fale um pouco mais para medir o ritmo.";
  if (wpm < 60) return "Ritmo lento: normal no começo. Tente frases curtas sem parar para traduzir.";
  if (wpm < 100) return "Ritmo de quem está ganhando confiança. Continue falando sem parar para pensar em cada palavra.";
  if (wpm < 140) return "Ritmo bom e natural para uma conversa.";
  return "Ritmo rápido. Garanta que as palavras saiam claras.";
}
