import { ArrowUpRight, Instagram, Linkedin, Youtube, Facebook, Globe } from "lucide-react";

import type { ClientLinks } from "@/content/clients";

export function VisitWebsite({
  href,
  label = "Visit Live Website",
  client,
  tone = "light",
}: {
  href?: string;
  label?: string;
  client: string;
  tone?: "light" | "dark";
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit the ${client} website (opens in a new tab)`}
      className={
        tone === "dark"
          ? "inline-flex items-center gap-2 rounded-full border border-ink-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-ink-elevated"
          : "inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
      }
    >
      <Globe className="h-4 w-4" aria-hidden="true" />
      {label}
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}

const socialIcons = {
  instagram: Instagram,
  instagramReels: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  facebook: Facebook,
} as const;

const socialLabels: Record<string, string> = {
  instagram: "Instagram",
  instagramReels: "Reels",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  facebook: "Facebook",
};

export function ClientSocialLinks({
  links,
  client,
  tone = "light",
}: {
  links: ClientLinks;
  client: string;
  tone?: "light" | "dark";
}) {
  const entries = (Object.keys(socialIcons) as (keyof typeof socialIcons)[])
    .map((key) => ({ key, href: links[key] }))
    .filter((item): item is { key: keyof typeof socialIcons; href: string } => Boolean(item.href));

  if (entries.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {entries.map(({ key, href }) => {
        const Icon = socialIcons[key];
        return (
          <li key={key}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${client} on ${socialLabels[key]} (opens in a new tab)`}
              className={
                tone === "dark"
                  ? "inline-flex items-center gap-2 rounded-full border border-ink-border px-4 py-2 text-xs font-medium transition-colors hover:bg-ink-elevated"
                  : "inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              }
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {socialLabels[key]}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
