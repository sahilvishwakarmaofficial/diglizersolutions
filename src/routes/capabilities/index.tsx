import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { seo, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, FinalCta } from "@/components/layout/SiteLayout";
import { capabilities, capabilityGroups } from "@/content/capabilities";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Capabilities", path: "/capabilities" },
];

export const Route = createFileRoute("/capabilities/")({
  head: () =>
    seo({
      title: "Capabilities | Branding, Websites, Content & Growth | Diglizer",
      description:
        "Strategy, brand and creative, websites and development, social media, performance marketing, SEO, video and packaging — the full Diglizer Solution capability set.",
      path: "/capabilities",
    }),
  component: CapabilitiesIndex,
});

function CapabilitiesIndex() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Capabilities"
        title="One team across strategy, creative, technology and growth."
        lede="Each capability stands on its own — and works better when combined. Most engagements start with one and expand into a connected programme."
        breadcrumbs={crumbs}
      />

      <section className="section-y">
        <div className="container-wide space-y-16">
          {capabilityGroups.map((group) => (
            <div key={group.name}>
              <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                <h2 className="display-2">{group.name}</h2>
                <p className="max-w-xl text-sm text-muted-foreground">{group.description}</p>
              </div>
              <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
                {capabilities
                  .filter((c) => c.group === group.name)
                  .map((capability) => (
                    <Link
                      key={capability.slug}
                      to={`/capabilities/${capability.slug}`}
                      className="group bg-card p-8 transition-colors hover:bg-accent"
                    >
                      <h3 className="font-display text-xl font-bold">{capability.name}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {capability.summary}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                        Explore capability
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
