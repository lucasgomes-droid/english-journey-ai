import type { AvatarLook } from "@/content/scenarios";

/** Retrato ilustrado original (SVG), gerado a partir de parâmetros simples. */
export function Avatar({ look, className, title }: { look: AvatarLook; className?: string; title?: string }) {
  const { skin, hair, hairStyle, shirt, bg, accessory } = look;
  const shade = "rgba(0,0,0,0.12)";
  return (
    <svg viewBox="0 0 200 220" preserveAspectRatio="xMidYMid slice" className={className} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <rect width="200" height="220" fill={bg} />
      <circle cx="160" cy="40" r="46" fill="#ffffff" opacity="0.25" />
      {/* cabelo de trás */}
      {hairStyle === "long" && <path d="M52 92c0-44 22-66 48-66s48 22 48 66v70H52z" fill={hair} />}
      {hairStyle === "ponytail" && <path d="M138 70c22 8 26 40 14 70-6-18-12-30-22-40z" fill={hair} />}
      {/* corpo */}
      <path d="M30 220c0-48 30-74 70-74s70 26 70 74z" fill={accessory === "scrubs" ? "#4cc9f0" : shirt} />
      <path d="M86 146h28v16c0 8-28 8-28 0z" fill={skin} />
      <path d="M86 150c8 6 20 6 28 0v6c-8 6-20 6-28 0z" fill={shade} />
      {accessory === "apron" && <path d="M68 168h64v52H68z" fill="#fefae0" opacity="0.92" />}
      {accessory === "apron" && <path d="M76 168l-8-18M124 168l8-18" stroke="#fefae0" strokeWidth="6" />}
      {accessory === "tie" && <path d="M100 160l-7 8 7 40 7-40z" fill="#c1121f" />}
      {accessory === "vest" && <path d="M48 220c2-36 16-54 40-62l12 62zM152 220c-2-36-16-54-40-62l-12 62z" fill="#212529" opacity="0.85" />}
      {accessory === "scrubs" && <path d="M86 160l14 22 14-22" fill="none" stroke="#ffffff" strokeWidth="4" />}
      {/* cabeça */}
      <ellipse cx="62" cy="104" rx="8" ry="11" fill={skin} />
      <ellipse cx="138" cy="104" rx="8" ry="11" fill={skin} />
      <ellipse cx="100" cy="98" rx="38" ry="46" fill={skin} />
      {/* cabelo da frente */}
      {hairStyle === "short" && <path d="M62 92c-2-34 18-50 40-50 24 0 40 16 36 50-6-14-18-24-38-26-18 2-30 12-38 26z" fill={hair} />}
      {hairStyle === "buzz" && <path d="M64 86c2-28 18-40 36-40s34 12 36 40c-10-10-22-16-36-16s-26 6-36 16z" fill={hair} />}
      {hairStyle === "long" && <path d="M62 96c-4-36 16-54 38-54s42 18 38 54c-10-20-22-30-38-34-16 4-28 14-38 34z" fill={hair} />}
      {hairStyle === "ponytail" && <path d="M62 94c-2-34 18-52 38-52s42 16 38 52c-12-16-24-26-40-28-14 2-26 12-36 28z" fill={hair} />}
      {hairStyle === "bun" && (
        <>
          <circle cx="100" cy="40" r="18" fill={hair} />
          <path d="M62 94c-2-34 18-50 38-50s42 16 38 50c-12-16-24-24-38-26-16 2-28 10-38 26z" fill={hair} />
        </>
      )}
      {hairStyle === "curly" && (
        <g fill={hair}>
          {[[66, 76], [78, 60], [94, 52], [110, 52], [126, 60], [136, 76], [140, 94], [60, 94], [86, 66], [114, 66]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="14" />
          ))}
        </g>
      )}
      {accessory === "cap" && (
        <>
          <path d="M60 80c0-24 18-38 40-38s40 14 40 38z" fill="#d62828" />
          <path d="M100 76h52c4 0 4 8 0 8h-52z" fill="#9d0208" />
          <rect x="74" y="56" width="52" height="8" fill="#ffffff" opacity="0.8" />
        </>
      )}
      {accessory === "headset" && (
        <>
          <path d="M60 100c0-34 18-54 40-54s40 20 40 54" fill="none" stroke="#212529" strokeWidth="6" />
          <rect x="54" y="94" width="12" height="20" rx="5" fill="#212529" />
          <path d="M60 112c2 18 14 24 28 24" fill="none" stroke="#212529" strokeWidth="4" />
        </>
      )}
      {/* rosto */}
      <ellipse cx="86" cy="102" rx="4.5" ry="5.5" fill="#1b1b1b" />
      <ellipse cx="114" cy="102" rx="4.5" ry="5.5" fill="#1b1b1b" />
      <circle cx="87.5" cy="100" r="1.4" fill="#ffffff" />
      <circle cx="115.5" cy="100" r="1.4" fill="#ffffff" />
      <path d="M80 90c4-3 9-3 12 0M108 90c4-3 9-3 12 0" stroke={hair} strokeWidth="3" strokeLinecap="round" fill="none" />
      <ellipse cx="78" cy="118" rx="7" ry="4" fill="#e76f51" opacity="0.25" />
      <ellipse cx="122" cy="118" rx="7" ry="4" fill="#e76f51" opacity="0.25" />
      <path d="M98 108c-2 6 0 9 4 9" stroke={shade} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M88 124c7 8 17 8 24 0" stroke="#7f2d2d" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {accessory === "glasses" && (
        <g fill="none" stroke="#1b1b1b" strokeWidth="3">
          <circle cx="86" cy="102" r="11" />
          <circle cx="114" cy="102" r="11" />
          <path d="M97 102h6" />
        </g>
      )}
    </svg>
  );
}
