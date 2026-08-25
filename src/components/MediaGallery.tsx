import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ArrowUpRight } from "lucide-react";

import type { MediaAsset } from "@/content/clients";

const ratioClass: Record<string, string> = {
  "1:1": "aspect-square",
  "4:5": "aspect-[4/5]",
  "9:16": "aspect-[9/16]",
  "16:9": "aspect-[16/9]",
  "3:2": "aspect-[3/2]",
};

/**
 * Reusable "Selected Social Work" / project gallery.
 * Editorial grid with an accessible lightbox: arrow keys, Escape, swipe.
 */
export function MediaGallery({
  items,
  title = "Selected work",
  eyebrow,
  intro,
  columns = 3,
}: {
  items: MediaAsset[];
  title?: string;
  eyebrow?: string;
  intro?: string;
  columns?: 2 | 3;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpen((current) =>
        current === null ? current : (current + delta + items.length) % items.length,
      ),
    [items.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close, step]);

  if (items.length === 0) return null;
  const active = open === null ? null : items[open];

  return (
    <div>
      {(eyebrow || title) && (
        <div className="mb-6">
          {eyebrow && <p className="eyebrow text-gradient">{eyebrow}</p>}
          {title && <h2 className="display-3 mt-3">{title}</h2>}
          {intro && <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{intro}</p>}
        </div>
      )}

      <ul
        className={`grid gap-4 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}
      >
        {items.map((item, index) => (
          <li key={`${item.src}-${index}`}>
            <button
              type="button"
              onClick={() => setOpen(index)}
              className="group block w-full overflow-hidden rounded-xl border border-border bg-muted text-left"
              aria-label={`Open ${item.caption} in the gallery viewer`}
            >
              <span className={`block overflow-hidden ${ratioClass[item.ratio] ?? "aspect-[16/9]"}`}>
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                  width={1600}
                  height={1000}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </span>
              <span className="flex items-center justify-between gap-3 bg-card px-4 py-3">
                <span className="text-xs font-medium text-muted-foreground">{item.caption}</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          className="fixed inset-0 z-[70] flex flex-col bg-ink/95 p-4 backdrop-blur-sm"
          onTouchStart={(event) => {
            touchX.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const start = touchX.current;
            const end = event.changedTouches[0]?.clientX ?? null;
            if (start !== null && end !== null && Math.abs(end - start) > 45) {
              step(end < start ? 1 : -1);
            }
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between text-ink-foreground">
            <p className="text-xs text-ink-muted">
              {(open ?? 0) + 1} / {items.length}
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Close gallery"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-border"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center gap-3 py-4">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-border text-ink-foreground sm:inline-flex"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <img
              src={active.src}
              alt={active.alt}
              className="max-h-[70vh] w-auto max-w-full rounded-xl object-contain"
            />
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink-border text-ink-foreground sm:inline-flex"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-ink-muted">
            <p className="text-sm">{active.caption}</p>
            {active.sourceUrl && (
              <a
                href={active.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-ink-foreground underline-offset-4 hover:underline"
              >
                View original source <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
