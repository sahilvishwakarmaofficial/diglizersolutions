/**
 * Lightweight, original CSS/SVG swatches that hint at each style's visual
 * language. They are explicitly labelled as swatches — not rendered previews —
 * until original preview renders are supplied.
 */
const palettes: Record<string, { bg: string; fg: string; accent: string }> = {
  "pixel-art": { bg: "#2b1a4a", fg: "#f6c177", accent: "#fb2261" },
  chalkboard: { bg: "#1f3d2c", fg: "#eef2e6", accent: "#c9a46a" },
  "glow-sketch": { bg: "#08060c", fg: "#f2c14e", accent: "#f2c14e" },
  "retro-low-poly": { bg: "#3a2350", fg: "#f4a259", accent: "#7fb7be" },
  "comic-art": { bg: "#fde74c", fg: "#111111", accent: "#e63946" },
  "flat-vector": { bg: "#27426b", fg: "#a9d6f5", accent: "#e63946" },
  "minimal-line": { bg: "#050505", fg: "#ffffff", accent: "#ffffff" },
  "cinematic-cgi": { bg: "#060b14", fg: "#4fd1e8", accent: "#9be7f2" },
  "toy-brick": { bg: "#d9dde2", fg: "#f6c90e", accent: "#d62828" },
  "soft-3d-explainer": { bg: "#fde2d0", fg: "#9bd7c4", accent: "#f49f85" },
};

export function StyleSwatch({ id, name }: { id: string; name: string }) {
  const p = palettes[id] ?? { bg: "#10051f", fg: "#ffffff", accent: "#fb2261" };
  const pixel = id === "pixel-art" || id === "retro-low-poly";
  return (
    <figure className="relative overflow-hidden rounded-xl" style={{ background: p.bg }}>
      <svg
        viewBox="0 0 90 160"
        width="90"
        height="160"
        role="img"
        aria-label={`${name} style swatch — illustrative only, not a rendered preview`}
        className="aspect-[9/16] h-auto w-full"
        shapeRendering={pixel ? "crispEdges" : "geometricPrecision"}
      >
        <rect x="0" y="118" width="90" height="42" fill={p.fg} opacity="0.12" />
        <rect x="8" y="30" width="26" height="18" rx={pixel ? 0 : 2} fill="none" stroke={p.fg} strokeOpacity="0.45" />
        <circle cx="70" cy="28" r="7" fill="none" stroke={p.fg} strokeOpacity="0.45" />
        {/* walking figure */}
        <g stroke={p.fg} strokeWidth={pixel ? 4 : 3} strokeLinecap={pixel ? "butt" : "round"} fill="none">
          <circle cx="45" cy="62" r="7" fill={p.fg} stroke="none" />
          <line x1="45" y1="70" x2="45" y2="96" />
          <line x1="45" y1="96" x2="36" y2="118" />
          <line x1="45" y1="96" x2="55" y2="117" />
          <line x1="45" y1="78" x2="55" y2="86" />
        </g>
        <rect x="50" y="78" width="12" height="7" fill={p.accent} />
        <rect x="22" y="70" width="9" height="6" fill={p.accent} transform="rotate(-18 26 73)" />
        <path d="M30 74 Q38 60 52 78" stroke={p.accent} strokeDasharray="2 3" fill="none" />
      </svg>
      <figcaption className="absolute bottom-2 left-2 rounded-full bg-ink/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink-foreground">
        Swatch
      </figcaption>
    </figure>
  );
}
