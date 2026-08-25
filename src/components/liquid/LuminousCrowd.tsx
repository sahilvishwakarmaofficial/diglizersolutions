import { useEffect, useId, useRef, useState } from "react";

/**
 * "Noticeable impact" hero scene.
 *
 * A crowd of dim silhouettes stands in depth; one central figure fills with
 * violet liquid light and carries a Diglizer-pink core. Pure SVG + CSS so it
 * is lightweight, reduced-motion safe and never blocks the hero copy.
 *
 * Decorative only — all hero information lives in real HTML beside it.
 */

type Figure = { x: number; scale: number; opacity: number };

const CROWD: Figure[] = [
  { x: 96, scale: 0.68, opacity: 0.28 },
  { x: 168, scale: 0.82, opacity: 0.38 },
  { x: 248, scale: 0.95, opacity: 0.5 },
  { x: 552, scale: 0.95, opacity: 0.5 },
  { x: 632, scale: 0.82, opacity: 0.38 },
  { x: 704, scale: 0.68, opacity: 0.28 },
];

/** Reduced crowd for small screens — keeps the hero cheap on mobile. */
const CROWD_LIGHT = CROWD.slice(1, 5);

function FigurePath({ x, scale, opacity, fill, filter }: Figure & { fill: string; filter?: string }) {
  return (
    <g
      transform={`translate(${x} ${560 - 300 * scale}) scale(${scale})`}
      opacity={opacity}
      filter={filter}
    >
      <ellipse cx="40" cy="52" rx="30" ry="34" fill={fill} />
      <path
        d="M40 88c-31 0-49 20-52 52l-8 86c-1 10 5 16 13 16h14l6 128c1 10 7 16 16 16h22c9 0 15-6 16-16l6-128h14c8 0 14-6 13-16l-8-86c-3-32-21-52-52-52z"
        fill={fill}
      />
    </g>
  );
}

export function LuminousCrowd({ className = "" }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      setTilt({ x: px * 14, y: py * 10 });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <svg
        viewBox="0 0 800 620"
        className="h-full w-full"
        role="presentation"
        style={{
          transform: `translate3d(${tilt.x}px, ${tilt.y}px, 0)`,
          transition: "transform 700ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <defs>
          <radialGradient id={`${uid}-aura`} cx="50%" cy="55%" r="50%">
            <stop offset="0%" stopColor="#b49cff" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#7651ff" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#7651ff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${uid}-fill`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#ff5a92" />
            <stop offset="38%" stopColor="#d46cff" />
            <stop offset="100%" stopColor="#e9e0ff" />
          </linearGradient>
          <filter id={`${uid}-soft`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id={`${uid}-glow`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="18" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* aura separating the noticeable brand from the crowd */}
        <ellipse cx="400" cy="330" rx="300" ry="290" fill={`url(#${uid}-aura)`} />

        {/* crowd in depth */}
        <g className="hidden sm:inline">
          {CROWD.map((figure) => (
            <FigurePath
              key={figure.x}
              {...figure}
              fill="#2b123b"
              filter={`url(#${uid}-soft)`}
            />
          ))}
        </g>
        <g className="sm:hidden">
          {CROWD_LIGHT.map((figure) => (
            <FigurePath key={figure.x} {...figure} fill="#2b123b" filter={`url(#${uid}-soft)`} />
          ))}
        </g>

        {/* light travelling up from the ground */}
        <ellipse cx="400" cy="586" rx="150" ry="22" fill="#8a57d8" opacity="0.5" filter={`url(#${uid}-soft)`} />

        {/* the noticeable figure */}
        <g filter={`url(#${uid}-glow)`}>
          <FigurePath x={350} scale={1.16} opacity={1} fill={`url(#${uid}-fill)`} />
        </g>

        {/* pink core */}
        <ellipse cx="400" cy="330" rx="26" ry="44" fill="#fb2261" opacity="0.75" filter={`url(#${uid}-soft)`}>
          <animate
            attributeName="opacity"
            values="0.55;0.9;0.55"
            dur="6s"
            repeatCount="indefinite"
          />
        </ellipse>
      </svg>
    </div>
  );
}
