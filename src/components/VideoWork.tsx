import { Play, ArrowUpRight } from "lucide-react";

import type { VideoAsset } from "@/content/clients";

/**
 * Video / Reel portfolio component. Nothing autoplays and no third-party
 * iframe is loaded — each item is a poster frame that links to the verified
 * public source when one exists.
 */
export function VideoWork({
  items,
  tone = "dark",
}: {
  items: VideoAsset[];
  tone?: "dark" | "light";
}) {
  if (items.length === 0) return null;

  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const frame = (
          <>
            <span
              className={`relative block overflow-hidden rounded-xl border ${
                tone === "dark" ? "border-ink-border" : "border-border"
              } ${item.ratio === "9:16" ? "aspect-[9/16]" : "aspect-video"}`}
            >
              <img
                src={item.poster}
                alt={item.posterAlt}
                loading="lazy"
                decoding="async"
                width={1600}
                height={1000}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <span className="absolute bottom-4 left-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-brand text-white">
                <Play className="h-4 w-4" aria-hidden="true" />
              </span>
            </span>
            <span className="mt-4 block">
              <span
                className={`eyebrow block ${tone === "dark" ? "text-ink-muted" : "text-muted-foreground"}`}
              >
                {item.client} · {item.platform}
              </span>
              <span className="mt-2 block font-display text-base font-bold leading-snug">
                {item.title}
              </span>
              <span
                className={`mt-1 block text-xs ${tone === "dark" ? "text-ink-muted" : "text-muted-foreground"}`}
              >
                {item.workType}
                {item.href ? " · View source" : ""}
              </span>
            </span>
          </>
        );

        return (
          <li key={`${item.client}-${item.title}`} className="group">
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.title} for ${item.client} on ${item.platform} (opens in a new tab)`}
                className="block"
              >
                {frame}
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                  Open <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </a>
            ) : (
              <div>{frame}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
