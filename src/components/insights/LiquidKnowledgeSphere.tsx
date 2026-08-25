import { useId } from "react";

/**
 * Decorative "Liquid Knowledge Sphere" — information particles organising
 * themselves into connected topic clusters. Pure SVG/CSS, no WebGL, hidden
 * from assistive technology and static under prefers-reduced-motion.
 */
export function LiquidKnowledgeSphere({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const nodes = [
    { x: 100, y: 60 },
    { x: 156, y: 96 },
    { x: 150, y: 162 },
    { x: 96, y: 196 },
    { x: 44, y: 158 },
    { x: 48, y: 92 },
  ];

  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 200 256" className="h-full w-full" role="presentation">
        <defs>
          <radialGradient id={`${id}-core`} cx="42%" cy="34%">
            <stop offset="0%" stopColor="var(--soft-pink)" stopOpacity="0.95" />
            <stop offset="45%" stopColor="var(--liquid-violet)" stopOpacity="0.75" />
            <stop offset="100%" stopColor="var(--brand-purple)" stopOpacity="0.25" />
          </radialGradient>
          <linearGradient id={`${id}-thread`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--electric-lavender)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--brand-pink)" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        <circle cx="100" cy="128" r="72" fill={`url(#${id}-core)`} />
        <circle
          cx="100"
          cy="128"
          r="88"
          fill="none"
          stroke="var(--ink-border)"
          strokeWidth="1"
        />

        {nodes.map((n, i) => (
          <g key={`${n.x}-${n.y}`}>
            <line
              x1="100"
              y1="128"
              x2={n.x}
              y2={n.y}
              stroke={`url(#${id}-thread)`}
              strokeWidth="1.25"
            />
            <circle
              cx={n.x}
              cy={n.y}
              r="5"
              fill="var(--electric-lavender)"
              className="liquid-node"
              style={{ animationDelay: `${i * 240}ms` }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
