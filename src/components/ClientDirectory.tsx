import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { clientDirectory } from "@/content/clients";
import { ClientSocialLinks, VisitWebsite } from "@/components/ExternalLinks";

export function ClientDirectory({
  heading = "Selected clients and professional experience",
  intro = "Client engagements and professional experience across healthcare, medical products, travel, culture, fashion and professional services.",
}: {
  heading?: string;
  intro?: string;
}) {
  return (
    <section className="section-y">
      <div className="container-wide">
        <p className="eyebrow text-gradient">Directory</p>
        <h2 className="display-2 mt-4 max-w-3xl">{heading}</h2>
        <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">{intro}</p>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {clientDirectory.map((client) => (
            <li
              key={client.slug}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
            >
              <img
                src={client.thumbnail}
                alt={client.thumbnailAlt}
                loading="lazy"
                decoding="async"
                width={1600}
                height={1000}
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-lg font-bold leading-snug">{client.name}</h3>
                <p className="eyebrow mt-2 text-muted-foreground">
                  {client.industry}
                  {client.dates ? ` · ${client.dates}` : ""}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {client.services}
                </p>
                <div className="mt-5 space-y-3">
                  <ClientSocialLinks links={client.links} client={client.name} />
                  <div className="flex flex-wrap items-center gap-3">
                    {client.caseStudy && (
                      <Link
                        to="/work/$slug"
                        params={{ slug: client.caseStudy }}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                      >
                        View case study <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    )}
                    {client.links.website && (
                      <VisitWebsite
                        href={client.links.website}
                        client={client.name}
                        label="Website"
                      />
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
