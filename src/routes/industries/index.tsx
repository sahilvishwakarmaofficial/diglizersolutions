import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { seo, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, FinalCta } from "@/components/layout/SiteLayout";
import { industries } from "@/content/industries";
import { industryMedia } from "@/content/industryMedia";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Industries", path: "/industries" },
];

export const Route = createFileRoute("/industries/")({
  head: () =>
    seo({
      title: "Industries We Work With | Diglizer Solution",
      description:
        "Healthcare and fertility, medical products and B2B healthcare, education, government, travel, fashion and jewellery, culture and events, technology and professional services.",
      path: "/industries",
    }),
  component: IndustriesIndex,
});

function IndustriesIndex() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        liquid="industry"
        eyebrow="Industries"
        title="Context changes the creative."
        lede="A fertility clinic, a surgical products manufacturer and a travel community do not need the same tone, the same channels or the same proof. We start from the category."
        breadcrumbs={crumbs}
      />

      <section className="section-y">
        <div className="container-wide grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => {
            const media = industryMedia[industry.slug];
            return (
              <Link
                key={industry.slug}
                to="/industries/$slug"
                params={{ slug: industry.slug }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-primary"
              >
                {media && (
                  <img
                    src={media.image}
                    alt={media.imageAlt}
                    loading="lazy"
                    decoding="async"
                    width={1200}
                    height={800}
                    className="aspect-[3/2] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                )}
                <div className="flex flex-1 flex-col p-7">
                  <h2 className="font-display text-xl font-bold">{industry.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {industry.cardCopy}
                  </p>
                  <ul className="mt-4 flex flex-1 flex-wrap gap-2">
                    {industry.services.slice(0, 4).map((service) => (
                      <li
                        key={service}
                        className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>
                  {media && (
                    <p className="mt-4 text-xs text-muted-foreground">
                      {media.clients.join(" · ")}
                    </p>
                  )}
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Explore industry
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
