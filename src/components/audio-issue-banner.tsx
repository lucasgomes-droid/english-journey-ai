"use client";

import { Volume2, X } from "lucide-react";
import { clearAudioIssue, unlockAudio, useAudioIssue, useVoice } from "@/lib/voice";

/** Aparece quando o áudio não consegue tocar, com o passo a passo para resolver. */
export function AudioIssueBanner() {
  const issue = useAudioIssue();
  const { speak } = useVoice();
  if (!issue) return null;
  return (
    <div role="alert" className="fixed inset-x-3 bottom-24 z-40 mx-auto max-w-lg rounded-2xl border border-boarding bg-surface p-4 shadow-lg lg:bottom-6">
      <div className="flex items-start gap-3">
        <Volume2 size={22} className="mt-0.5 shrink-0 text-atlantic" aria-hidden />
        <div className="min-w-0 flex-1 text-sm">
          {issue === "no-voice" ? (
            <>
              <p className="font-bold">Seu celular não tem voz em inglês instalada.</p>
              <p className="mt-1 text-muted">
                No Android: Configurações → Idioma e entrada (ou Acessibilidade) → Saída de texto para fala → Mecanismo do Google → Instalar dados de voz → English (United States). Depois toque em “Testar som”.
              </p>
            </>
          ) : (
            <>
              <p className="font-bold">O áudio não saiu.</p>
              <p className="mt-1 text-muted">Confira o volume de mídia (não o da campainha) e se o celular não está no silencioso. Depois toque em “Testar som”.</p>
            </>
          )}
          <button
            type="button"
            className="btn mt-3 bg-boarding px-4 py-2 text-boarding-ink"
            onClick={() => {
              clearAudioIssue();
              unlockAudio();
              speak("Hello! Can you hear me?");
            }}
          >
            <Volume2 size={16} aria-hidden /> Testar som
          </button>
        </div>
        <button type="button" onClick={clearAudioIssue} className="p-1 text-muted" aria-label="Fechar aviso">
          <X size={18} aria-hidden />
        </button>
      </div>
    </div>
  );
}
