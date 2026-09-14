/**
 * Founder portrait frame — the approved photograph of Sahil Vishwakarma.
 * The image is never distorted, aggressively cropped or colour-treated.
 */
export const FOUNDER_PORTRAIT = "/media/founder/sahil-vishwakarma-profile.webp";
export const FOUNDER_PORTRAIT_WIDTH = 1080;
export const FOUNDER_PORTRAIT_HEIGHT = 1350;

export function FounderPortrait({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`relative overflow-hidden rounded-2xl border border-border bg-ink ${className}`}>
      <img
        src={FOUNDER_PORTRAIT}
        alt="Sahil Vishwakarma, Founder and Creative Director of Diglizer Solution"
        loading={priority ? "eager" : "lazy"}
        {...(priority ? { fetchPriority: "high" as const } : {})}
        decoding="async"
        width={FOUNDER_PORTRAIT_WIDTH}
        height={FOUNDER_PORTRAIT_HEIGHT}
        className="aspect-[4/5] w-full object-cover"
        style={{ objectPosition: "center 22%" }}
      />
    </figure>
  );
}
