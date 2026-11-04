/** Data local (YYYY-MM-DD) no fuso do aluno. */
export function localDate(date: Date, timeZone = "America/Sao_Paulo"): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
}

function daysBetween(a: string, b: string): number {
  const da = Date.UTC(+a.slice(0, 4), +a.slice(5, 7) - 1, +a.slice(8, 10));
  const db = Date.UTC(+b.slice(0, 4), +b.slice(5, 7) - 1, +b.slice(8, 10));
  return Math.round((db - da) / 86_400_000);
}

/** Atualiza a sequência de dias ao registrar estudo em `today`. */
export function nextStreak(lastStudyDate: string | null, current: number, today: string): number {
  if (!lastStudyDate) return 1;
  const diff = daysBetween(lastStudyDate, today);
  if (diff <= 0) return Math.max(current, 1); // já estudou hoje
  if (diff === 1) return current + 1;
  return 1; // quebrou a sequência
}

/** Sequência exibida: zera se o último estudo foi antes de ontem. */
export function displayStreak(lastStudyDate: string | null, current: number, today: string): number {
  if (!lastStudyDate) return 0;
  return daysBetween(lastStudyDate, today) <= 1 ? current : 0;
}
