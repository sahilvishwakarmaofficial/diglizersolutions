import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { seo, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, FinalCta } from "@/components/layout/SiteLayout";
import { industries } from "@/content/industries";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Industries", path: "/industries" },
];

export const Route = createFileRoute("/industries/")({
  head: () =>
    seo({
      title: "Industries We Work With | Diglizer Solution",
      description:
        "Healthcare and fertility, medical and surgical products, travel, education, retail, real estate and professional services — industry-aware creative and digital work.",
      path: "/industries",
    }),
  component: IndustriesIndex,
});

function IndustriesIndex() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Industries"
        title="Context changes the creative."
        lede="A fertility clinic, a surgical products manufacturer and a travel community do not need the same tone, the same channels or the same proof. We start from the category."
        breadcrumbs={crumbs}
      />

      <section className="section-y">
        <div className="container-wide grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              to="/industries/$slug" params={{ slug: industry.slug }}
              className="group bg-card p-8 transition-colors hover:bg-accent"
            >
              <h2 className="font-display text-xl font-bold">{industry.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {industry.summary}
              </p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Explore industry
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
