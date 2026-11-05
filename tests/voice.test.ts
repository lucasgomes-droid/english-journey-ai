import { describe, expect, it } from "vitest";
import { downsample, encodeWav } from "@/lib/voice-recorder";
import { chunkText } from "@/lib/voice";
import { wordCheck, PHONEME_TIPS } from "@/lib/word-check";
import { PRON_SETS } from "@/content/pronunciation";
import { SCENARIOS } from "@/content/scenarios";

describe("áudio", () => {
  it("gera WAV PCM 16 kHz mono válido", async () => {
    const wav = encodeWav(new Float32Array(16000).fill(0.5), 16000);
    const buf = new DataView(await wav.arrayBuffer());
    const tag = (o: number) => String.fromCharCode(buf.getUint8(o), buf.getUint8(o + 1), buf.getUint8(o + 2), buf.getUint8(o + 3));
    expect(tag(0)).toBe("RIFF");
    expect(tag(8)).toBe("WAVE");
    expect(buf.getUint16(22, true)).toBe(1); // mono
    expect(buf.getUint32(24, true)).toBe(16000);
    expect(buf.getUint16(34, true)).toBe(16);
    expect(wav.size).toBe(44 + 16000 * 2);
  });
  it("reamostra 48 kHz → 16 kHz", () => {
    expect(downsample(new Float32Array(48000), 48000).length).toBe(16000);
  });
});

describe("voz natural: divisão do texto", () => {
  it("respeita ~190 caracteres e não perde palavras", () => {
    const text = "Hello there! ".repeat(40) + "This is a very long sentence, with commas, that keeps going and going without a period for a long time, really long, way more than the limit allows for one request";
    const chunks = chunkText(text);
    expect(chunks.every((c) => c.length <= 190)).toBe(true);
    expect(chunks.join(" ").replace(/\s+/g, " ")).toBe(text.replace(/\s+/g, " ").trim());
  });
});

describe("verificação de palavras (sem análise fonética)", () => {
  it("marca palavras reconhecidas e omitidas", () => {
    const r = wordCheck("I think so", "I sink so");
    expect(r.words.map((w) => w.accuracy)).toEqual([100, 0, 100]);
    expect(r.completeness).toBe(67);
  });
  it("aceita contrações", () => {
    expect(wordCheck("I'm not sure", "I am not sure").completeness).toBe(100);
  });
});

describe("conteúdo de fala", () => {
  it("treinos de pronúncia completos", () => {
    expect(PRON_SETS.length).toBeGreaterThanOrEqual(8);
    for (const p of PRON_SETS) expect(p.items.length).toBeGreaterThanOrEqual(5);
    expect(PHONEME_TIPS["θ"]).toBeTruthy();
  });
  it("todo personagem tem voz", () => {
    for (const s of SCENARIOS) expect(s.character.voice).toMatch(/^[fm][123]$/);
  });
});

import { judgePair, PAIR_SETS } from "../src/content/minimal-pairs";
describe("pares mínimos", () => {
  it("decide entre alvo, outra palavra e incerto", () => {
    expect(judgePair("I said think.", "think", "sink")).toBe("target");
    expect(judgePair("I said sink.", "think", "sink")).toBe("other");
    expect(judgePair("I said thing.", "think", "sink")).toBe("unclear");
    expect(judgePair("Think, sink", "think", "sink")).toBe("unclear");
  });
  it("conteúdo consistente", () => {
    for (const s of PAIR_SETS) {
      expect(s.pairs.length).toBeGreaterThanOrEqual(5);
      for (const p of s.pairs) {
        expect(p.a).not.toBe(p.b);
        expect(p.a).toMatch(/^[a-z]+$/);
        expect(p.b).toMatch(/^[a-z]+$/);
      }
    }
  });
});

import { judgeRepeat, wordSoundTips } from "@/lib/sound-tips";
describe("dicas de som por palavra (sem análise fonética)", () => {
  it("aponta os sons difíceis prováveis e trata reconhecimento ruim como 'repita'", () => {
    expect(wordSoundTips("think").join(" ")).toMatch(/TH surdo/);
    expect(wordSoundTips("this").join(" ")).toMatch(/TH sonoro/);
    expect(wordSoundTips("house").join(" ")).toMatch(/H aspirado/);
    expect(wordSoundTips("red").join(" ")).toMatch(/R americano/);
    expect(wordSoundTips("worked").join(" ")).toMatch(/-ED final/);
    expect(wordSoundTips("sheep").join(" ")).toMatch(/I longo/);
    expect(judgeRepeat(0, "")).toBe("unclear");
    expect(judgeRepeat(20, "uh")).toBe("unclear");
    expect(judgeRepeat(60, "I work in a house")).toBe("improve");
    expect(judgeRepeat(100, "I work in a warehouse")).toBe("good");
  });
});
