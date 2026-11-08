/** Conta datas (YYYY-MM-DD) por semana, das `weeks` semanas mais antigas até a atual (terminando hoje). */
export function weeklyCounts(
  dates: string[],
  todayIso: string,
  weeks: number,
): { start: string; count: number }[] {
  const today = Date.parse(`${todayIso}T12:00:00Z`);
  const out = Array.from({ length: weeks }, (_, i) => ({
    start: new Date(today - (weeks - i) * 7 * 86_400_000 + 86_400_000)
      .toISOString()
      .slice(0, 10),
    count: 0,
  }));
  for (const d of dates) {
    const age = Math.floor(
      (today - Date.parse(`${d}T12:00:00Z`)) / (7 * 86_400_000),
    );
    if (age >= 0 && age < weeks) out[weeks - 1 - age].count++;
  }
  return out;
}
