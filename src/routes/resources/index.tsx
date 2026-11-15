import { createFileRoute, Link } from "@tanstack/react-router";

import { seo, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, FinalCta } from "@/components/layout/SiteLayout";
import { resources } from "@/content/resources/ai-animation-styles";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/resources" },
];

export const Route = createFileRoute("/resources/")({
  head: () =>
    seo({
      title: "Free Creative Resources & Playbooks | Diglizer Solution",
      description:
        "Practical, copy-ready creative playbooks from Diglizer Solution for creators, editors and marketing teams working with video, design and AI-assisted content.",
      path: "/resources",
    }),
  component: ResourcesHub,
});

function ResourcesHub() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Resources"
        title="Free creative playbooks"
        lede="Practical, copy-ready resources for creators, editors, social-media teams and brands — written from real studio practice."
        breadcrumbs={crumbs}
      />
      <section className="section-y">
        <ul className="container-wide grid gap-6 md:grid-cols-2">
          {resources.map((r) => (
            <li key={r.slug} className="rounded-2xl border border-border bg-card p-7">
              <p className="eyebrow text-primary">Creative playbook</p>
              <h2 className="mt-3 font-display text-2xl font-bold">
                <Link to={r.path} className="hover:text-primary hover:underline underline-offset-4">
                  {r.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.excerpt}</p>
              <p className="mt-4 text-xs text-muted-foreground">
                By Sahil Vishwakarma · {r.readingMinutes} min read
              </p>
            </li>
          ))}
        </ul>
      </section>
      <FinalCta />
    </>
  );
}
