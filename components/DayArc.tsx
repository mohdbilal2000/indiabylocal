import type { Stop } from "@/lib/data";

/**
 * The day as one line: a low arc from the first stop to the last, with a dot
 * per stop. Pure SVG and CSS, so it costs nothing to ship and is still when
 * the visitor prefers reduced motion. See docs/08-experience.md.
 */
export function DayArc({ stops, compact = false }: { stops: Stop[]; compact?: boolean }) {
  if (stops.length < 2) return null;
  const n = stops.length;
  const W = 400;
  const H = compact ? 46 : 72;
  const pad = 12;
  const base = H - 10;
  const rise = base - 10;
  const peak = base - 2 * rise;
  // Points on the same quadratic curve the path draws.
  const at = (i: number) => {
    const t = i / (n - 1);
    return {
      x: (1 - t) * (1 - t) * pad + 2 * (1 - t) * t * (W / 2) + t * t * (W - pad),
      y: (1 - t) * (1 - t) * base + 2 * (1 - t) * t * peak + t * t * base,
    };
  };
  const first = stops[0];
  const last = stops[n - 1];
  const label = `The day in ${n} stops, from ${first.time} to ${last.time}`;
  return (
    <figure className="day-arc m-0">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} className="block h-auto w-full">
        <path
          d={`M ${pad} ${base} Q ${W / 2} ${peak} ${W - pad} ${base}`}
          pathLength={1}
          className="day-arc-line"
        />
        {stops.map((s, i) => {
          const p = at(i);
          return (
            <circle
              key={s.time + s.title}
              cx={p.x}
              cy={p.y}
              r={compact ? 4.5 : 6}
              className="day-arc-stop"
              style={{ animationDelay: `${200 + i * 80}ms` }}
            />
          );
        })}
      </svg>
      <figcaption className="nums flex justify-between text-caption text-muted">
        <span>
          {first.time} {compact ? "" : first.title}
        </span>
        <span>
          {compact ? "" : `${last.title} `}
          {last.time}
        </span>
      </figcaption>
    </figure>
  );
}
