import type { Place } from "@/content/scenarios";

/**
 * Ambiente ilustrado da cena (SVG próprio, sem imagens de terceiros).
 * Cada lugar tem cores e objetos que o identificam: balcão e xícaras no café,
 * painel de voos no aeroporto, prateleiras no mercado etc.
 */
const PALETTE: Record<Place, { wall: string; floor: string; accent: string; label: string }> = {
  cafe: { wall: "#6b4f3a", floor: "#3e2c20", accent: "#f2c14e", label: "Cafeteria" },
  restaurant: { wall: "#7a2e2e", floor: "#3b1d1d", accent: "#f4d35e", label: "Restaurante" },
  airport: { wall: "#bcd4e6", floor: "#5c6b7a", accent: "#1d3557", label: "Aeroporto" },
  supermarket: { wall: "#e9f5db", floor: "#9aa59a", accent: "#2a9d8f", label: "Supermercado" },
  office: { wall: "#d9e2ec", floor: "#7b8794", accent: "#3a86ff", label: "Escritório" },
  street: { wall: "#8ecae6", floor: "#6c757d", accent: "#ffb703", label: "Rua" },
  hotel: { wall: "#f1e3d3", floor: "#8d6e63", accent: "#b08968", label: "Hotel" },
  hospital: { wall: "#e8f6f3", floor: "#a3b9b5", accent: "#2a9d8f", label: "Saúde" },
  store: { wall: "#fde2e4", floor: "#9d8189", accent: "#ef476f", label: "Loja" },
  home: { wall: "#ffe8cc", floor: "#a47148", accent: "#e76f51", label: "Casa" },
  car: { wall: "#90e0ef", floor: "#495057", accent: "#ffd166", label: "Carro" },
};

function Props({ place, accent }: { place: Place; accent: string }) {
  switch (place) {
    case "cafe":
      return (
        <g>
          <rect x="0" y="108" width="400" height="22" fill="#a47148" />
          <rect x="250" y="40" width="120" height="50" rx="6" fill="#2b2118" />
          <text x="262" y="60" fontSize="11" fill="#f2c14e" fontFamily="sans-serif">MENU</text>
          <rect x="262" y="66" width="80" height="3" fill="#f2c14e" opacity=".6" />
          <rect x="262" y="74" width="60" height="3" fill="#f2c14e" opacity=".6" />
          {[40, 75, 110].map((x) => (
            <g key={x}>
              <rect x={x} y="92" width="20" height="16" rx="3" fill="#fff" />
              <path d={`M${x + 20} 96 q8 4 0 8`} stroke="#fff" strokeWidth="3" fill="none" />
            </g>
          ))}
          <circle cx="200" cy="30" r="10" fill={accent} opacity=".8" />
          <line x1="200" y1="0" x2="200" y2="20" stroke="#2b2118" strokeWidth="2" />
        </g>
      );
    case "restaurant":
      return (
        <g>
          <rect x="30" y="100" width="140" height="10" fill="#f8f9fa" />
          <rect x="230" y="100" width="140" height="10" fill="#f8f9fa" />
          {[70, 300].map((x) => (
            <g key={x}>
              <rect x={x} y="80" width="6" height="20" fill="#e9ecef" />
              <ellipse cx={x + 3} cy="80" rx="8" ry="4" fill={accent} />
            </g>
          ))}
          <rect x="160" y="25" width="80" height="45" rx="4" fill="#3b1d1d" stroke={accent} strokeWidth="3" />
        </g>
      );
    case "airport":
      return (
        <g>
          <rect x="30" y="20" width="170" height="60" rx="4" fill="#1d3557" />
          {[32, 46, 60].map((y) => (
            <g key={y}>
              <rect x="40" y={y} width="60" height="6" fill="#ffd166" />
              <rect x="110" y={y} width="30" height="6" fill="#a8dadc" />
              <rect x="150" y={y} width="35" height="6" fill="#06d6a0" />
            </g>
          ))}
          <path d="M270 40 l60 -8 l10 6 l-55 12 z" fill="#fff" />
          <rect x="230" y="96" width="150" height="14" fill="#adb5bd" />
          <rect x="250" y="84" width="34" height="24" rx="4" fill="#e63946" />
        </g>
      );
    case "supermarket":
      return (
        <g>
          {[20, 50, 80].map((y) => (
            <rect key={y} x="20" y={y} width="360" height="5" fill="#6c757d" />
          ))}
          {Array.from({ length: 18 }, (_, i) => (
            <rect key={i} x={26 + i * 20} y={8 + (i % 3) * 30} width="14" height="12" rx="2" fill={["#e76f51", "#2a9d8f", "#f4a261", "#e9c46a"][i % 4]} />
          ))}
          <rect x="300" y="100" width="50" height="20" rx="3" fill={accent} />
        </g>
      );
    case "office":
      return (
        <g>
          <rect x="40" y="20" width="110" height="60" fill="#bde0fe" stroke="#fff" strokeWidth="4" />
          <line x1="95" y1="20" x2="95" y2="80" stroke="#fff" strokeWidth="4" />
          <rect x="200" y="96" width="170" height="10" fill="#495057" />
          <rect x="250" y="62" width="60" height="34" rx="3" fill="#212529" />
          <rect x="255" y="67" width="50" height="24" fill={accent} opacity=".7" />
          <circle cx="355" cy="80" r="14" fill="#52b788" />
          <rect x="350" y="86" width="10" height="12" fill="#a47148" />
        </g>
      );
    case "street":
      return (
        <g>
          {[
            [10, 30, 70, 90, "#e07a5f"],
            [90, 10, 80, 110, "#3d405b"],
            [180, 40, 60, 80, "#81b29a"],
            [250, 20, 70, 100, "#f2cc8f"],
            [330, 35, 70, 85, "#6d597a"],
          ].map(([x, y, w, h, c]) => (
            <g key={x as number}>
              <rect x={x as number} y={y as number} width={w as number} height={h as number} fill={c as string} />
              {[0, 1, 2].map((r) => (
                <rect key={r} x={(x as number) + 10} y={(y as number) + 10 + r * 22} width="12" height="12" fill="#fff" opacity=".7" />
              ))}
            </g>
          ))}
          <rect x="0" y="120" width="400" height="6" fill={accent} opacity=".8" />
        </g>
      );
    case "hotel":
      return (
        <g>
          <rect x="60" y="85" width="280" height="25" rx="4" fill="#7f5539" />
          <rect x="170" y="20" width="60" height="40" rx="4" fill={accent} />
          <text x="182" y="45" fontSize="12" fill="#fff" fontFamily="sans-serif">HOTEL</text>
          <circle cx="300" cy="78" r="6" fill="#ffd166" />
          {[40, 340].map((x) => (
            <rect key={x} x={x} y="10" width="16" height="80" fill="#e6ccb2" />
          ))}
        </g>
      );
    case "hospital":
      return (
        <g>
          <rect x="175" y="15" width="50" height="50" rx="6" fill="#fff" />
          <rect x="193" y="22" width="14" height="36" fill={accent} />
          <rect x="182" y="33" width="36" height="14" fill={accent} />
          <rect x="40" y="90" width="120" height="16" rx="4" fill="#90a4ae" />
          <rect x="260" y="40" width="100" height="70" fill="#cfe8e3" />
          {[52, 70, 88].map((y) => (
            <rect key={y} x="270" y={y} width="80" height="8" fill="#fff" />
          ))}
        </g>
      );
    case "store":
      return (
        <g>
          {[30, 120, 210, 300].map((x, i) => (
            <g key={x}>
              <rect x={x} y="20" width="70" height="4" fill="#6c757d" />
              <path d={`M${x + 20} 24 l-10 40 h40 l-10 -40 z`} fill={["#ef476f", "#118ab2", "#06d6a0", "#ffd166"][i]} />
            </g>
          ))}
          <rect x="140" y="98" width="120" height="14" rx="3" fill="#6d597a" />
        </g>
      );
    case "home":
      return (
        <g>
          <rect x="40" y="25" width="90" height="60" fill="#bde0fe" stroke="#fff" strokeWidth="4" />
          <rect x="220" y="80" width="150" height="30" rx="8" fill={accent} />
          <rect x="230" y="70" width="40" height="16" rx="5" fill="#f4a261" />
          <circle cx="180" cy="40" r="12" fill="#52b788" />
          <rect x="176" y="48" width="8" height="20" fill="#a47148" />
        </g>
      );
    case "car":
      return (
        <g>
          <rect x="0" y="0" width="400" height="60" fill="#caf0f8" />
          <path d="M0 60 L400 60 L400 160 L0 160 Z" fill="#343a40" />
          <circle cx="110" cy="105" r="34" fill="none" stroke="#adb5bd" strokeWidth="8" />
          <rect x="250" y="70" width="110" height="40" rx="6" fill="#212529" />
          <rect x="265" y="80" width="80" height="20" rx="3" fill={accent} opacity=".7" />
        </g>
      );
  }
}

export function SceneBackdrop({ place, className = "" }: { place: Place; className?: string }) {
  const p = PALETTE[place];
  return (
    <svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-label={`Ambiente: ${p.label}`}>
      <rect width="400" height="160" fill={p.wall} />
      <rect y="120" width="400" height="40" fill={p.floor} />
      <Props place={place} accent={p.accent} />
    </svg>
  );
}

export const placeLabel = (p: Place) => PALETTE[p].label;
