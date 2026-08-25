import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";

import {
  clients as allClients,
  clientCategories,
  type ClientEntry,
  type ClientLinks,
} from "@/content/clients";
import { ClientSocialLinks, VisitWebsite } from "@/components/ExternalLinks";

const linksOf = (client: ClientEntry): ClientLinks => ({
  ...(client.website ? { website: client.website } : {}),
  ...(client.instagram ? { instagram: client.instagram } : {}),
  ...(client.facebook ? { facebook: client.facebook } : {}),
  ...(client.linkedin ? { linkedin: client.linkedin } : {}),
  ...(client.youtube ? { youtube: client.youtube } : {}),
});

function Tags({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {items.slice(0, 4).map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function ClientActions({ client }: { client: ClientEntry }) {
  return (
    <div className="mt-5 space-y-3">
      <ClientSocialLinks links={linksOf(client)} client={client.displayName} />
      <div className="flex flex-wrap items-center gap-3">
        {client.caseStudyUrl && (
          <Link
            to="/work/$slug"
            params={{ slug: client.caseStudyUrl }}
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            aria-label={`View work for ${client.displayName}`}
          >
            View Work <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
        {client.website && client.websiteVerified && (
          <VisitWebsite
            href={client.website}
            client={client.displayName}
            label="Visit Official Website"
          />
        )}
      </div>
    </div>
  );
}

function FeaturedCard({ client }: { client: ClientEntry }) {
  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card md:col-span-2 xl:col-span-2">
      {client.coverImage && (
        <img
          src={client.coverImage}
          alt={client.coverImageAlt ?? `${client.displayName} project visual`}
          loading="lazy"
          decoding="async"
          width={1600}
          height={1000}
          className="aspect-[16/10] w-full object-cover"
        />
      )}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="eyebrow text-muted-foreground">{client.industry}</p>
        <h3 className="mt-2 font-display text-2xl font-bold leading-snug break-words">
          {client.displayName}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {client.shortContribution}
        </p>
        <Tags items={client.services} />
        <ClientActions client={client} />
      </div>
    </li>
  );
}

function CompactCard({ client }: { client: ClientEntry }) {
  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      {client.coverImage ? (
        <img
          src={client.coverImage}
          alt={client.coverImageAlt ?? `${client.displayName} project visual`}
          loading="lazy"
          decoding="async"
          width={1600}
          height={1000}
          className="aspect-[16/10] w-full object-cover"
        />
      ) : (
        <div className="flex aspect-[16/7] w-full items-center justify-center border-b border-border bg-muted px-6">
          <span className="text-center font-display text-lg font-bold leading-snug break-words">
            {client.displayName}
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-bold leading-snug break-words">
          {client.displayName}
        </h3>
        <p className="eyebrow mt-2 text-muted-foreground">{client.industry}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {client.shortContribution}
        </p>
        <Tags items={client.services} />
        <ClientActions client={client} />
      </div>
    </li>
  );
}

export function ClientDirectory({
  heading = "Selected Clients & Professional Experience",
  intro = "Our creative and digital experience spans healthcare, fertility, education, government, culture, fashion, travel, technology and professional services.",
  showFilters = false,
  eyebrow = "Directory",
}: {
  heading?: string;
  intro?: string;
  showFilters?: boolean;
  eyebrow?: string;
}) {
  const [filter, setFilter] = useState("All");

  const visible = useMemo(
    () =>
      filter === "All" ? allClients : allClients.filter((c) => c.category.includes(filter)),
    [filter],
  );

  const featured = visible.filter((c) => c.featured);
  const rest = visible.filter((c) => !c.featured);

  return (
    <section className="section-y">
      <div className="container-wide">
        <p className="eyebrow text-gradient">{eyebrow}</p>
        <h2 className="display-2 mt-4 max-w-3xl">{heading}</h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">{intro}</p>

        {showFilters && (
          <div
            className="mt-10 -mx-1 flex gap-2 overflow-x-auto px-1 pb-2 md:flex-wrap md:overflow-visible"
            role="group"
            aria-label="Filter clients by industry"
          >
            {clientCategories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
                className={
                  filter === item
                    ? "shrink-0 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background"
                    : "shrink-0 rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                }
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {featured.length > 0 && (
          <ul className="mt-10 grid gap-6 md:grid-cols-4 xl:gap-8">
            {featured.map((client) => (
              <FeaturedCard key={client.slug} client={client} />
            ))}
          </ul>
        )}

        {rest.length > 0 && (
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {rest.map((client) => (
              <CompactCard key={client.slug} client={client} />
            ))}
          </ul>
        )}

        {visible.length === 0 && (
          <p className="mt-10 text-sm text-muted-foreground">
            No organisations in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
