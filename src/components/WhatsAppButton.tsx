import { useEffect, useState } from "react";

import { whatsappHref } from "@/config/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const ACCESSIBLE_LABEL = "Chat with Diglizer Solution on WhatsApp";
const FALLBACK_MESSAGE =
  "Hi Diglizer Solution, I'm interested in discussing a creative or digital project.";

function resolveHref(): string {
  const href = whatsappHref();
  if (href) {
    return `${href}?text=${encodeURIComponent(FALLBACK_MESSAGE)}`;
  }
  return `https://wa.me/918424884119?text=${encodeURIComponent(FALLBACK_MESSAGE)}`;
}

/** Official WhatsApp glyph, inline so the green stays scoped to the icon only. */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="none">
      <path
        d="M16 3.2c-7.1 0-12.8 5.7-12.8 12.8 0 2.25.59 4.44 1.71 6.37L3.2 28.8l6.66-1.65a12.75 12.75 0 0 0 6.14 1.57h.01c7.06 0 12.79-5.72 12.79-12.79C28.8 8.9 23.07 3.2 16 3.2Z"
        fill="#25D366"
      />
      <path
        d="M22.1 18.86c-.34-.17-2-.98-2.31-1.1-.31-.11-.53-.17-.76.17-.22.34-.87 1.1-1.07 1.32-.2.23-.39.25-.73.09-.34-.17-1.44-.53-2.74-1.69-1.01-.9-1.7-2.02-1.9-2.36-.2-.34-.02-.53.15-.7.15-.15.34-.39.51-.59.17-.2.22-.34.34-.57.11-.23.06-.43-.03-.6-.09-.17-.76-1.83-1.04-2.5-.27-.66-.55-.57-.76-.58l-.65-.01c-.22 0-.6.09-.91.43-.31.34-1.2 1.17-1.2 2.86s1.23 3.32 1.4 3.55c.17.23 2.42 3.69 5.86 5.18.82.35 1.46.56 1.96.72.82.26 1.57.22 2.16.13.66-.1 2-.82 2.28-1.61.28-.79.28-1.47.2-1.61-.08-.14-.31-.23-.65-.4Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function handleClick() {
  track("whatsapp_click");
}

const ringStyle = {
  backgroundImage: "var(--gradient-brand)",
};

/**
 * Floating WhatsApp control. Appears only after the visitor scrolls past the
 * hero, and only on desktop — placement inside SiteLayout is owned elsewhere.
 */
export function FloatingWhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]") ?? null;
    const threshold = hero instanceof HTMLElement ? hero.offsetHeight : window.innerHeight * 0.8;

    function onScroll() {
      setVisible(window.scrollY > threshold);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={resolveHref()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={ACCESSIBLE_LABEL}
      className={cn(
        "fixed bottom-8 right-8 z-40 hidden h-16 w-16 items-center justify-center rounded-full shadow-[0_18px_40px_-16px_rgba(16,5,29,0.85)] transition-all duration-300 ease-out md:flex",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "hover:-translate-y-0.5",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <span aria-hidden="true" className="absolute inset-0 rounded-full p-[2px]" style={ringStyle}>
        <span className="block h-full w-full rounded-full bg-card" />
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-[3px] rounded-full bg-gradient-to-b from-white/10 to-transparent"
      />
      <WhatsAppGlyph className="relative h-8 w-8" />
    </a>
  );
}

/** Inline WhatsApp control for use within page content (contact, thank-you, etc). */
export function InlineWhatsAppButton({
  label = "Chat on WhatsApp",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={resolveHref()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={ACCESSIBLE_LABEL}
      className={cn(
        "group relative inline-flex items-center gap-3 rounded-full p-[1.5px] transition-transform duration-200 ease-out hover:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      style={ringStyle}
    >
      <span className="flex items-center gap-3 rounded-full bg-card px-6 py-3.5">
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-background/60">
          <WhatsAppGlyph className="h-5 w-5" />
        </span>
        <span className="text-sm font-semibold text-foreground">{label}</span>
      </span>
    </a>
  );
}
