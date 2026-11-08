/** Estado de uma palavra no vocabulário, a partir do histórico de revisão (SRS). Regras puras. */
export type WordStatus = "nova" | "aprendendo" | "firme" | "esquecida";

export interface WordHistory {
  repetitions: number;
  lapses: number;
  interval_days: number;
  due_at: string | null;
  last_reviewed_at: string | null;
}

export function wordStatus(
  h: WordHistory | undefined,
  nowMs: number,
): WordStatus {
  if (!h || (h.repetitions === 0 && h.lapses === 0 && !h.last_reviewed_at))
    return "nova";
  const overdueDays = h.due_at
    ? (nowMs - Date.parse(h.due_at)) / 86_400_000
    : 0;
  // Errou e ainda não recuperou, ou ficou muito tempo sem revisar depois de vencer.
  if (
    (h.lapses > 0 && h.repetitions <= 1) ||
    overdueDays > Math.max(3, h.interval_days)
  )
    return "esquecida";
  if (h.interval_days >= 21 && h.lapses <= 2) return "firme";
  return "aprendendo";
}

/** Prioridade de estudo: esquecidas → vencidas → aprendendo → novas → firmes. */
export function wordPriority(
  s: WordStatus,
  h: WordHistory | undefined,
  nowMs: number,
): number {
  const due = h?.due_at ? Date.parse(h.due_at) <= nowMs : false;
  return (
    { esquecida: 0, aprendendo: due ? 1 : 2, nova: 3, firme: 4 }[s] -
    (h?.lapses ?? 0) * 0.01
  );
}

export const STATUS_LABEL: Record<WordStatus, string> = {
  nova: "Nova",
  aprendendo: "Aprendendo",
  firme: "Firme",
  esquecida: "Esquecendo",
};
