export function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" aria-hidden="true">
      <rect width="512" height="512" rx="112" fill="#0e4d57" />
      <path d="M310 118 V300 a92 92 0 0 1 -184 0" fill="none" stroke="#ffc845" strokeWidth="56" strokeLinecap="round" />
      <circle cx="310" cy="118" r="44" fill="#fff" />
      <circle cx="310" cy="118" r="20" fill="#0e4d57" />
      <circle cx="126" cy="300" r="30" fill="#fff" />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <Logo />
      <span className={`font-display text-lg font-bold leading-none ${compact ? "hidden sm:inline" : ""}`}>
        English Journey <span className="text-muted font-semibold">AI</span>
      </span>
    </span>
  );
}

/** Linha de metrô com os seis níveis CEFR — o motivo visual do produto. */
export function LevelLine({ current = "A1", inverted = false }: { current?: string; inverted?: boolean }) {
  const levels = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const ci = levels.indexOf(current);
  return (
    <ol className="flex items-center" aria-label={`Nível atual: ${current}`}>
      {levels.map((lv, i) => (
        <li key={lv} className="flex items-center">
          <span
            className={`grid size-10 place-items-center rounded-full border-4 text-xs font-bold ${
              i < ci
                ? "border-boarding bg-boarding text-boarding-ink"
                : i === ci
                  ? `border-boarding ${inverted ? "bg-atlantic text-white" : "bg-surface text-ink"}`
                  : inverted
                    ? "border-white/30 bg-transparent text-white/70"
                    : "border-line bg-surface text-muted"
            }`}
            aria-current={i === ci ? "step" : undefined}
          >
            {lv}
          </span>
          {i < levels.length - 1 && <span className={`h-1 w-4 sm:w-7 ${i < ci ? "bg-boarding" : inverted ? "bg-white/30" : "bg-line"}`} />}
        </li>
      ))}
    </ol>
  );
}
