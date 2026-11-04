/**
 * Repetição espaçada baseada no algoritmo SM-2 (SuperMemo 2), com
 * ajustes simples: erros voltam no mesmo dia e o intervalo máximo é 180 dias.
 */
export interface SrsState {
  ease: number; // fator de facilidade (mín. 1.3)
  intervalDays: number;
  repetitions: number;
  lapses: number;
}

export const NEW_SRS: SrsState = { ease: 2.5, intervalDays: 0, repetitions: 0, lapses: 0 };

/** quality: 0–5 (5 = perfeito, 4 = correto com hesitação, 3 = correto difícil, <3 = errou). */
export function reviewSrs(state: SrsState, quality: number, now = new Date()): SrsState & { dueAt: Date } {
  const q = Math.max(0, Math.min(5, Math.round(quality)));
  let { ease, intervalDays, repetitions, lapses } = state;

  if (q < 3) {
    repetitions = 0;
    lapses += 1;
    intervalDays = 0; // volta ainda hoje (em ~10 min)
  } else {
    repetitions += 1;
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 3;
    else intervalDays = Math.round(intervalDays * ease);
  }
  ease = Math.max(1.3, ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  intervalDays = Math.min(180, intervalDays);

  const dueAt = new Date(now);
  if (intervalDays === 0) dueAt.setMinutes(dueAt.getMinutes() + 10);
  else dueAt.setDate(dueAt.getDate() + intervalDays);

  return { ease: Number(ease.toFixed(2)), intervalDays, repetitions, lapses, dueAt };
}
