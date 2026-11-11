import type { ArtKind } from "@/lib/data";

/**
 * Line illustrations that stand in for photographs. Real listings carry
 * the guide's own photos; these are drawn so nothing on the site is a
 * stock picture pretending to be the tour.
 */
export function Art({
  kind,
  rise = false,
  className = "",
}: {
  kind: ArtKind;
  rise?: boolean;
  className?: string;
}) {
  const ink = "var(--color-brand)";
  const sky = "var(--color-surface-alt)";
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-label={LABELS[kind]}
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <rect width="400" height="300" fill={sky} />
      <circle cx="292" cy="96" r="46" fill="var(--color-action)" className={rise ? "sun-rise" : undefined} />
      <g fill={ink} stroke={ink} strokeLinejoin="round">
        {kind === "taj" && <Taj sky={sky} />}
        {kind === "fort" && <Fort sky={sky} />}
        {kind === "palace" && <Palace sky={sky} />}
        {kind === "lanes" && <Lanes sky={sky} />}
        {kind === "arch" && <Arch sky={sky} />}
      </g>
    </svg>
  );
}

const LABELS: Record<ArtKind, string> = {
  taj: "Illustration of the Taj Mahal at sunrise",
  fort: "Illustration of a red sandstone fort wall and gate",
  palace: "Illustration of a tiered palace facade with arched windows",
  lanes: "Illustration of old-city shopfronts under bunting",
  arch: "Illustration of a monumental stone arch",
};

function Taj({ sky }: { sky: string }) {
  return (
    <>
      <rect x="60" y="222" width="280" height="12" stroke="none" />
      <rect x="138" y="160" width="124" height="62" stroke="none" />
      <path d="M166 160 C148 122 186 104 200 80 C214 104 252 122 234 160 Z" stroke="none" />
      <path d="M200 80 V60" strokeWidth="3" fill="none" />
      <path d="M140 160 C137 146 150 142 152 132 C154 142 167 146 164 160 Z" stroke="none" />
      <path d="M236 160 C233 146 246 142 248 132 C250 142 263 146 260 160 Z" stroke="none" />
      <path d="M184 222 V190 Q200 166 216 190 V222 Z" fill={sky} stroke="none" />
      {[82, 112, 278, 308].map((x, i) => {
        const tall = i === 0 || i === 3;
        const top = tall ? 122 : 142;
        return (
          <g key={x} stroke="none">
            <rect x={x} y={top} width="10" height={222 - top} />
            <circle cx={x + 5} cy={top - 4} r="7" />
          </g>
        );
      })}
      <path d="M90 252 H310 M120 266 H280" strokeWidth="3" fill="none" opacity="0.35" strokeLinecap="round" />
    </>
  );
}

function Fort({ sky }: { sky: string }) {
  const teeth = Array.from({ length: 13 }, (_, i) => 98 + i * 16);
  return (
    <>
      <rect x="90" y="158" width="220" height="84" stroke="none" />
      {teeth.map((x) => (
        <rect key={x} x={x} y="146" width="9" height="14" stroke="none" />
      ))}
      {[40, 304].map((x) => (
        <g key={x} stroke="none">
          <rect x={x} y="124" width="56" height="118" />
          <path d={`M${x + 8} 124 C${x + 8} 100 ${x + 48} 100 ${x + 48} 124 Z`} />
          <rect x={x + 26} y="88" width="4" height="16" />
        </g>
      ))}
      <path d="M172 242 V200 Q200 164 228 200 V242 Z" fill={sky} stroke="none" />
      <rect x="30" y="242" width="340" height="8" stroke="none" />
    </>
  );
}

function Palace({ sky }: { sky: string }) {
  const tiers = [
    { y: 196, w: 280, n: 9 },
    { y: 150, w: 216, n: 7 },
    { y: 104, w: 152, n: 5 },
  ];
  return (
    <>
      {tiers.map((t) => {
        const x0 = 200 - t.w / 2;
        const step = t.w / t.n;
        return (
          <g key={t.y} stroke="none">
            <rect x={x0} y={t.y} width={t.w} height="46" />
            {Array.from({ length: t.n }, (_, i) => {
              const cx = x0 + step * i + step / 2;
              return (
                <path
                  key={i}
                  d={`M${cx - 8} ${t.y + 40} V${t.y + 22} Q${cx} ${t.y + 8} ${cx + 8} ${t.y + 22} V${t.y + 40} Z`}
                  fill={sky}
                />
              );
            })}
          </g>
        );
      })}
      <path d="M176 104 C170 82 194 76 200 60 C206 76 230 82 224 104 Z" stroke="none" />
      <rect x="50" y="242" width="300" height="8" stroke="none" />
    </>
  );
}

function Lanes({ sky }: { sky: string }) {
  const flags = Array.from({ length: 11 }, (_, i) => 36 + i * 33);
  return (
    <>
      <path d="M20 70 Q200 112 380 70" fill="none" strokeWidth="2" />
      {flags.map((x, i) => {
        const y = 70 + 42 * (1 - ((x - 200) / 180) ** 2) * 0.5 + 2;
        return (
          <path
            key={x}
            d={`M${x - 9} ${y} H${x + 9} L${x} ${y + 18} Z`}
            fill={i % 2 ? "var(--color-action)" : "var(--color-brand)"}
            stroke="none"
          />
        );
      })}
      {[40, 150, 260].map((x) => (
        <g key={x} stroke="none">
          <rect x={x} y="150" width="100" height="92" />
          <path d={`M${x - 6} 150 H${x + 106} L${x + 96} 132 H${x + 4} Z`} />
          <path d={`M${x + 22} 242 V192 Q${x + 50} 164 ${x + 78} 192 V242 Z`} fill={sky} />
        </g>
      ))}
      <rect x="20" y="242" width="360" height="8" stroke="none" />
    </>
  );
}

function Arch({ sky }: { sky: string }) {
  return (
    <>
      <rect x="112" y="96" width="176" height="146" stroke="none" />
      <rect x="100" y="84" width="200" height="14" stroke="none" />
      <rect x="128" y="66" width="144" height="20" stroke="none" />
      <path d="M160 242 V168 Q200 112 240 168 V242 Z" fill={sky} stroke="none" />
      <path d="M124 242 V206 Q134 192 144 206 V242 Z" fill={sky} stroke="none" />
      <path d="M256 242 V206 Q266 192 276 206 V242 Z" fill={sky} stroke="none" />
      <rect x="40" y="242" width="320" height="8" stroke="none" />
    </>
  );
}
