/**
 * Founder portrait frame.
 * Replace `/media/founder-portrait.jpg` with Sahil's approved portrait and the
 * layout stays identical — the placeholder below is a branded panel, never a
 * stock person.
 */
export const FOUNDER_PORTRAIT = "/media/founder-portrait-placeholder.jpg";
export const FOUNDER_PORTRAIT_IS_PLACEHOLDER = true;

export function FounderPortrait({ className = "" }: { className?: string }) {
  return (
    <figure
      className={`relative overflow-hidden rounded-2xl border border-border bg-ink ${className}`}
    >
      <img
        src={FOUNDER_PORTRAIT}
        alt={
          FOUNDER_PORTRAIT_IS_PLACEHOLDER
            ? "Reserved portrait space for Sahil Vishwakarma, Founder and Creative Director"
            : "Sahil Vishwakarma, Founder and Creative Director of Diglizer Solution"
        }
        loading="lazy"
        decoding="async"
        width={1024}
        height={1280}
        className="aspect-[4/5] w-full object-cover"
        style={{ objectPosition: "center 30%" }}
      />
      {FOUNDER_PORTRAIT_IS_PLACEHOLDER && (
        <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-ink/70 px-5 py-3 text-xs text-ink-muted backdrop-blur-sm">
          <span>Founder portrait</span>
          <span aria-hidden="true" className="font-display text-base font-bold text-gradient">
            D
          </span>
        </figcaption>
      )}
    </figure>
  );
}
