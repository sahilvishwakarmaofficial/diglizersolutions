import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { featuredGallery, galleryCategoryLabels, galleryItems } from "@/content/gallery";

/** Homepage gallery preview — a small, lazy-loaded selection linking to /gallery. */
export function GalleryPreview() {
  const items = featuredGallery.slice(0, 6);
  if (items.length === 0) return null;

  return (
    <section className="section-y">
      <div className="container-wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-gradient">Gallery</p>
            <h2 className="display-2 mt-4 max-w-2xl">Creative work across formats.</h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
              Social media, campaigns, brand and product work designed for healthcare, public
              communication, culture and lifestyle organisations.
            </p>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            View the full gallery ({galleryItems.length} pieces)
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.id}>
              <Link
                to="/gallery"
                className="group block overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50"
              >
                <img
                  src={item.thumb}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 92vw"
                  className="block h-auto w-full"
                />
                <span className="block px-4 py-3">
                  <span className="block text-sm font-semibold">{item.client}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {galleryCategoryLabels[item.category]}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
