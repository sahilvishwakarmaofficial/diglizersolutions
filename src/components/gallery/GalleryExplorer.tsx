import { useCallback, useMemo, useState } from "react";
import { Play } from "lucide-react";

import {
  activeGalleryCategories,
  galleryCategoryLabels,
  galleryItems,
  type GalleryCategory,
  type GalleryItem,
} from "@/content/gallery";
import { GalleryLightbox } from "./GalleryLightbox";
import { cn } from "@/lib/utils";

const BATCH = 18;

type Filter = "all" | GalleryCategory;

export function GalleryExplorer({ items = galleryItems }: { items?: GalleryItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [visible, setVisible] = useState(BATCH);
  const [open, setOpen] = useState<number | null>(null);

  const categories = useMemo(
    () => activeGalleryCategories.filter((c) => items.some((i) => i.category === c)),
    [items],
  );

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.category === filter)),
    [filter, items],
  );

  const shown = filtered.slice(0, visible);

  const step = useCallback(
    (delta: number) =>
      setOpen((current) =>
        current === null ? current : (current + delta + filtered.length) % filtered.length,
      ),
    [filtered.length],
  );

  const select = (next: Filter) => {
    setFilter(next);
    setVisible(BATCH);
  };

  return (
    <div>
      <div
        role="group"
        aria-label="Filter gallery by type of work"
        className="flex flex-wrap gap-2"
      >
        <FilterButton active={filter === "all"} onClick={() => select("all")}>
          All Work
        </FilterButton>
        {categories.map((category) => (
          <FilterButton
            key={category}
            active={filter === category}
            onClick={() => select(category)}
          >
            {galleryCategoryLabels[category]}
          </FilterButton>
        ))}
      </div>

      <p className="mt-5 text-sm text-muted-foreground" aria-live="polite">
        Showing {shown.length} of {filtered.length} pieces of work.
      </p>

      <ul className="mt-8 gap-5 [column-fill:_balance] sm:columns-2 lg:columns-3">
        {shown.map((item, index) => (
          <li key={item.id} className="mb-5 break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpen(index)}
              className="group block w-full overflow-hidden rounded-xl border border-border bg-card text-left transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="relative block">
                <img
                  src={item.thumb}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading={index < 6 ? "eager" : "lazy"}
                  decoding="async"
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 92vw"
                  className="block h-auto w-full"
                />
                {item.mediaType === "video" && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-black/55 text-white">
                      <Play className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </span>
                )}
              </span>
              <span className="block px-4 py-3">
                <span className="block text-sm font-semibold text-foreground">{item.client}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                  {item.title} · {galleryCategoryLabels[item.category]}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {visible < filtered.length && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisible((v) => v + BATCH)}
            className="capsule px-7 py-3.5 text-sm font-semibold"
          >
            Load more work
          </button>
        </div>
      )}

      {open !== null && (
        <GalleryLightbox
          items={filtered}
          index={open}
          onClose={() => setOpen(null)}
          onStep={step}
        />
      )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "min-h-11 rounded-full border px-5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        active
          ? "border-transparent bg-gradient-brand text-white"
          : "border-border text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
