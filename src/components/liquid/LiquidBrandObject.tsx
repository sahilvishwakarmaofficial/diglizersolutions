import { useEffect, useRef, useState } from "react";

/**
 * LIQUID INTELLIGENCE — signature brand object.
 *
 * A single reusable, purely decorative SVG/CSS "liquid" form derived from the
 * Diglizer "D" geometry. It is NOT a logo replacement: the official logo stays
 * untouched in the navigation, footer and metadata.
 *
 * Deliberately implemented without WebGL so that:
 *  - no essential content ever lives inside a canvas,
 *  - there is nothing to fall back from when WebGL is unavailable,
 *  - mobile and low-power devices get the same identity at near-zero cost.
 *
 * Motion pauses when the element leaves the viewport or the tab is hidden,
 * and is fully disabled under `prefers-reduced-motion`.
 */

export type LiquidState =
  | "hero"
  | "nodes"
  | "portal"
  | "capability"
  | "industry"
  | "process"
  | "monogram"
  | "contact";

const statePresets: Record<LiquidState, { blobs: [number, number, number][]; spin: number }> = {
  // [cx, cy, r]
  hero: [
    [300, 300, 170],
    [430, 210, 96],
    [220, 420, 84],
  ] as never,
  nodes: [] as never,
  portal: [] as never,
  capability: [] as never,
  industry: [] as never,
  process: [] as never,
  monogram: [] as never,
  contact: [] as never,
} as never;
void statePresets;

const presets: Record<LiquidState, { blobs: [number, number, number][]; opacity: number }> = {
  hero: {
    blobs: [
      [300, 300, 176],
      [432, 208, 92],
      [214, 428, 78],
    ],
    opacity: 0.9,
  },
  nodes: {
    blobs: [
      [180, 250, 74],
      [330, 190, 52],
      [420, 340, 66],
      [250, 400, 44],
    ],
    opacity: 0.55,
  },
  portal: {
    blobs: [
      [300, 300, 210],
      [300, 300, 120],
    ],
    opacity: 0.6,
  },
  capability: {
    blobs: [
      [220, 240, 108],
      [380, 250, 88],
      [240, 400, 88],
      [390, 400, 108],
    ],
    opacity: 0.7,
  },
  industry: {
    blobs: [
      [300, 300, 190],
      [180, 330, 70],
    ],
    opacity: 0.5,
  },
  process: {
    blobs: [
      [120, 300, 60],
      [225, 300, 60],
      [330, 300, 60],
      [435, 300, 60],
      [520, 300, 60],
    ],
    opacity: 0.6,
  },
  monogram: {
    blobs: [
      [280, 300, 160],
      [370, 250, 70],
    ],
    opacity: 0.7,
  },
  contact: {
    blobs: [[300, 300, 200]],
    opacity: 0.55,
  },
};

let uid = 0;

export function LiquidBrandObject({
  state = "hero",
  className = "",
  showD = false,
}: {
  state?: LiquidState;
  className?: string;
  /** Renders the abstract Diglizer-inspired "D" counterform inside the liquid. */
  showD?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [id] = useState(() => `lq${++uid}`);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    let visible = false;
    const sync = () => setActive(visible && document.visibilityState === "visible");
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        sync();
      },
      { rootMargin: "120px" },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  const preset = presets[state];

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none select-none ${className}`}>
      <svg viewBox="0 0 600 600" className="h-full w-full" role="presentation">
        <defs>
          <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#694699" />
            <stop offset="55%" stopColor="#D46CFF" />
            <stop offset="100%" stopColor="#FB2261" />
          </linearGradient>
          <radialGradient id={`${id}-s`} cx="35%" cy="28%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <filter id={`${id}-goo`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="b" />
            <feColorMatrix
              in="b"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -12"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>

        <g filter={`url(#${id}-goo)`} opacity={preset.opacity}>
          {preset.blobs.map(([cx, cy, r], index) => (
            <circle
              key={`${cx}-${cy}-${r}`}
              cx={cx}
              cy={cy}
              r={r}
              fill={`url(#${id}-g)`}
              className={active ? "liquid-blob" : undefined}
              style={{ animationDelay: `${index * -2.6}s` }}
            />
          ))}
        </g>

        {/* Specular sheen — makes the material read as translucent resin. */}
        <ellipse cx="250" cy="230" rx="190" ry="150" fill={`url(#${id}-s)`} opacity="0.7" />

        {showD && (
          <g opacity="0.9">
            <path
              d="M232 176h74c72 0 124 52 124 124s-52 124-124 124h-74z"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.35"
              strokeWidth="2"
            />
            <rect x="196" y="176" width="22" height="22" fill="#ffffff" fillOpacity="0.5" />
            <rect x="196" y="216" width="15" height="15" fill="#ffffff" fillOpacity="0.35" />
            <rect x="196" y="248" width="9" height="9" fill="#ffffff" fillOpacity="0.22" />
          </g>
        )}
      </svg>
    </div>
  );
}

/** Soft liquid light wash used behind editorial sections. */
export function LiquidSectionTransition({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 h-40 bg-[radial-gradient(60%_120%_at_50%_0%,color-mix(in_oklab,var(--brand-pink)_16%,transparent),transparent)] ${className}`}
    />
  );
}
