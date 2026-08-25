import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";

import {
  clientsByVerification,
  clientCategories,
  type ClientEntry,
  type ClientLinks,
} from "@/content/clients";
import { ClientLogo } from "@/components/ClientLogo";
import { ClientSocialLinks, VisitWebsite } from "@/components/ExternalLinks";

const linksOf = (client: ClientEntry): ClientLinks => ({
  ...(client.website ? { website: client.website } : {}),
  ...(client.instagram ? { instagram: client.instagram } : {}),
  ...(client.facebook ? { facebook: client.facebook } : {}),
  ...(client.linkedin ? { linkedin: client.linkedin } : {}),
  ...(client.youtube ? { youtube: client.youtube } : {}),
});

function ExperienceRow({ client }: { client: ClientEntry }) {
  return (
    <li className="grid gap-6 border-b border-border py-8 last:border-b-0 md:grid-cols-[13rem_1fr] md:gap-10">
      <div className="flex items-start">
        <ClientLogo client={client} size="md" />
      </div>
      <div>
        <h3 className="font-display text-xl font-bold leading-snug break-words">
          {client.displayName}
        </h3>
        <p className="eyebrow mt-2 text-muted-foreground">
          {client.industry} · {client.relationshipType}
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {client.shortContribution}
        </p>
        {client.services.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {client.services.map((service) => (
              <li
                key={service}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {service}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-5 space-y-3">
          <ClientSocialLinks links={linksOf(client)} client={client.displayName} />
          <div className="flex flex-wrap items-center gap-4">
            {client.caseStudyUrl && (
              <Link
                to="/work/$slug"
                params={{ slug: client.caseStudyUrl }}
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                View project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
            {client.website && client.websiteVerified && (
              <VisitWebsite
                href={client.website}
                client={client.displayName}
                label="Visit official website"
              />
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

/**
 * The complete client and professional-experience directory. This is the only
 * detailed client listing on the website — the homepage shows logos only.
 */
export function WorkClientExperience() {
  const [filter, setFilter] = useState("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? clientsByVerification
        : clientsByVerification.filter((c) => c.category.includes(filter)),
    [filter],
  );

  return (
    <section id="client-experience" className="section-y scroll-mt-28 bg-ink text-ink-foreground">
      <div className="container-wide">
        <p className="eyebrow text-gradient">Client experience</p>
        <h2 className="display-2 mt-4 max-w-3xl">All Clients &amp; Professional Experience</h2>
        <p className="lede mt-6 max-w-3xl text-ink-muted">
          Our experience includes current and previous engagements, freelance work, founder
          professional experience, project-based collaborations and creative contributions.
        </p>
        <p className="mt-4 max-w-3xl text-sm text-ink-muted">
          Organisations with a verified official website are listed first. Ordering reflects link
          verification only — it does not rank the value of an engagement.
        </p>

        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter client experience">
          {clientCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
              className={
                filter === item
                  ? "rounded-full bg-gradient-brand px-4 py-2 text-sm font-semibold"
                  : "rounded-full border border-ink-border px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:border-primary hover:text-primary"
              }
            >
              {item}
            </button>
          ))}
        </div>

        <ul className="mt-4">
          {visible.map((client) => (
            <ExperienceRow key={client.slug} client={client} />
          ))}
        </ul>

        {visible.length === 0 && (
          <p className="mt-10 text-sm text-ink-muted">
            No organisations in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
