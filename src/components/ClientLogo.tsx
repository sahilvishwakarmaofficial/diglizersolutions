import type { ClientEntry } from "@/content/clients";
import { cn } from "@/lib/utils";

/**
 * Client identities are shown exactly as supplied by the official source.
 * Logos are stored locally, never recoloured, gradient-filled, cropped or
 * animated. When no logo has been verified we show a clean typographic mark
 * built from the exact organisation name.
 */
export function ClientLogo({
  client,
  size = "md",
  className,
}: {
  client: ClientEntry;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const heights = { sm: "h-8", md: "h-10", lg: "h-12" } as const;

  if (client.logo && client.logoVerified) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-xl bg-[#f8f7fa] px-4 py-3",
          className,
        )}
      >
        <img
          src={client.logo}
          alt={client.logoAlt ?? `${client.displayName} logo`}
          loading="lazy"
          decoding="async"
          width={320}
          height={160}
          className={cn(heights[size], "w-auto max-w-[10rem] object-contain")}
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-xl border border-border bg-secondary px-4 py-3 text-center",
        className,
      )}
    >
      <span className="font-display text-sm font-bold uppercase leading-tight tracking-[0.12em] break-words">
        {client.displayName}
      </span>
    </span>
  );
}
