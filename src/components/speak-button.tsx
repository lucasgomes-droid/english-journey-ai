"use client";

import { Volume2, Snail } from "lucide-react";
import { unlockAudio, useVoice, type VoiceName } from "@/lib/voice";

export function SpeakButton({ text, size = "md", withSlow = false, label, voice }: { text: string; size?: "sm" | "md" | "lg"; withSlow?: boolean; label?: string; voice?: VoiceName }) {
  const { speak, speaking } = useVoice();
  const dims = size === "lg" ? "size-20" : size === "sm" ? "size-8" : "size-10";
  const icon = size === "lg" ? 34 : size === "sm" ? 16 : 20;
  return (
    <span className="inline-flex items-center gap-2">
      <button
        type="button"
        onClick={() => {
          unlockAudio();
          speak(text, { voice });
        }}
        className={`${dims} grid shrink-0 place-items-center rounded-full bg-atlantic text-surface transition-transform hover:bg-atlantic-deep active:scale-95 ${speaking ? "ring-4 ring-boarding/60" : ""}`}
        aria-label={label ?? `Ouvir: ${text}`}
      >
        <Volume2 size={icon} aria-hidden />
      </button>
      {withSlow && (
        <button
          type="button"
          onClick={() => {
            unlockAudio();
            speak(text, { voice, rate: 0.7 });
          }}
          className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-surface text-atlantic hover:bg-surface-2"
          aria-label="Ouvir devagar"
          title="Ouvir devagar"
        >
          <Snail size={18} aria-hidden />
        </button>
      )}
    </span>
  );
}
