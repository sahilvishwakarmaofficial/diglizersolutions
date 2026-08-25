import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { seo, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, FinalCta } from "@/components/layout/SiteLayout";
import { ClientDirectory } from "@/components/ClientDirectory";
import { VideoWork } from "@/components/VideoWork";
import { PricingSection } from "@/components/PricingSection";
import { projects, workFilters } from "@/content/projects";
import { videoWork } from "@/content/clients";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
];

export const Route = createFileRoute("/work/")({
  head: () =>
    seo({
      title: "Our Work | Case Studies by Diglizer Solution",
      description:
        "Case studies across healthcare, medical products, travel, culture, fashion and professional services — branding, websites, campaigns and performance marketing by Diglizer Solution.",
      path: "/work",
    }),
  component: WorkIndex,
});

function WorkIndex() {
  const [filter, setFilter] = useState("All");
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.filters.includes(filter));

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Work"
        title="Work that carries a business objective."
        lede="Every project here started with a problem worth solving — a category that is hard to advertise in, a product range that was hard to navigate, or a community that needed a brand."
        breadcrumbs={crumbs}
      />

      <section className="section-y-compact">
        <div className="container-wide">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter work">
            {workFilters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={filter === item}
                className={
                  filter === item
                    ? "rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background"
                    : "rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                }
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-6">
            {visible.map((project, index) => {
              const wide = index % 4 === 0 || index % 4 === 3;
              return (
                <Link
                  key={project.slug}
                  to="/work/$slug"
                  params={{ slug: project.slug }}
                  className={`group block ${wide ? "md:col-span-4" : "md:col-span-2"}`}
                >
                  <div className="overflow-hidden rounded-2xl border border-border bg-muted">
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      loading="lazy"
                      decoding="async"
                      width={1600}
                      height={1000}
                      className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
                        wide ? "aspect-[16/9]" : "aspect-[4/3]"
                      }`}
                    />
                  </div>
                  <p className="eyebrow mt-5 text-muted-foreground">
                    {project.industry} · {project.location}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold leading-snug">
                    {project.client}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {project.summary}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    View case study
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </div>

          {visible.length === 0 && (
            <p className="mt-12 text-sm text-muted-foreground">
              No published case studies in this category yet — more work is being documented.
            </p>
          )}
        </div>
      </section>

      <section className="section-y bg-ink text-ink-foreground">
        <div className="container-wide">
          <p className="eyebrow text-gradient">Video and Reels</p>
          <h2 className="display-2 mt-4 max-w-2xl">Motion work across culture, health and retail.</h2>
          <div className="mt-10">
            <VideoWork items={videoWork} />
          </div>
        </div>
      </section>

      <ClientDirectory />

      <PricingSection />

      <FinalCta />
    </>
  );
}
