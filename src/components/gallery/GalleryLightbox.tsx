import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { GalleryItem } from "@/content/gallery";
import { galleryCategoryLabels } from "@/content/gallery";

/**
 * Accessible gallery viewer: focus trapped while open, Escape to close,
 * arrow-key and swipe navigation, focus restored to the trigger on close.
 * Video items only begin playing on user interaction and are paused on close.
 */
export function GalleryLightbox({
  items,
  index,
  onClose,
  onStep,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const item = items[index];

  const close = useCallback(() => {
    videoRef.current?.pause();
    onClose();
  }, [onClose]);

  useEffect(() => {
    restoreTo.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      restoreTo.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === "ArrowRight") onStep(1);
      if (event.key === "ArrowLeft") onStep(-1);
      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, a[href], video[controls], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0]!;
        const last = focusable[focusable.length - 1]!;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close, onStep]);

  if (!item) return null;

  const isPortraitVideo = item.mediaType === "video" && item.height > item.width;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} — ${item.client}`}
      className="fixed inset-0 z-[80] flex flex-col bg-[#10051D]/97 p-4 backdrop-blur-sm"
      onTouchStart={(event) => {
        touchX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const start = touchX.current;
        const end = event.changedTouches[0]?.clientX ?? null;
        if (start !== null && end !== null && Math.abs(end - start) > 45) {
          onStep(end < start ? 1 : -1);
        }
        touchX.current = null;
      }}
    >
      <div className="flex items-center justify-between text-white">
        <p className="text-xs text-white/60">
          {index + 1} / {items.length}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Close gallery viewer</span>
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center gap-3 py-4">
        <button
          type="button"
          onClick={() => onStep(-1)}
          className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:inline-flex"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Previous artwork</span>
        </button>

        {item.mediaType === "video" && item.videoSrc ? (
          <video
            ref={videoRef}
            src={item.videoSrc}
            poster={item.src}
            controls
            preload="none"
            playsInline
            aria-label={item.alt}
            className={
              isPortraitVideo
                ? "max-h-[72vh] w-auto rounded-xl"
                : "max-h-[72vh] w-full max-w-4xl rounded-xl"
            }
          />
        ) : (
          <img
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            className="max-h-[72vh] w-auto max-w-full rounded-xl object-contain"
          />
        )}

        <button
          type="button"
          onClick={() => onStep(1)}
          className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/30 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:inline-flex"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only">Next artwork</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-white/70">
        <div>
          <p className="font-display text-base font-bold text-white">{item.client}</p>
          <p className="text-sm">
            {item.title} · {galleryCategoryLabels[item.category]}
          </p>
        </div>
        <div className="flex gap-3 sm:hidden">
          <button
            type="button"
            onClick={() => onStep(-1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Previous artwork</span>
          </button>
          <button
            type="button"
            onClick={() => onStep(1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only">Next artwork</span>
          </button>
        </div>
      </div>
    </div>
  );
}
