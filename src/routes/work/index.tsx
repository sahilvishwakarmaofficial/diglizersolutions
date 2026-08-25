import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { seo, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, FinalCta } from "@/components/layout/SiteLayout";
import { projects, selectedProjects, workFilters } from "@/content/projects";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
];

export const Route = createFileRoute("/work/")({
  head: () =>
    seo({
      title: "Our Work | Case Studies by Diglizer Solution",
      description:
        "Case studies across healthcare, medical products, travel, education and retail — branding, websites, campaigns and performance marketing by Diglizer Solution.",
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

      <section className="section-y">
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

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            {visible.map((project) => (
              <Link key={project.slug} to={`/work/${project.slug}`} className="group block">
                <div className="overflow-hidden rounded-2xl border border-border bg-muted">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    loading="lazy"
                    width={1600}
                    height={1000}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <p className="eyebrow mt-6 text-muted-foreground">
                  {project.industry} · {project.location}
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold leading-snug">
                  {project.client}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {project.summary}
                </p>
              </Link>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="mt-12 text-sm text-muted-foreground">
              No published case studies in this category yet — more work is being documented.
            </p>
          )}
        </div>
      </section>

      <section className="section-y bg-muted/40">
        <div className="container-wide">
          <p className="eyebrow text-gradient">Also worked with</p>
          <h2 className="display-2 mt-4 max-w-2xl">Selected engagements.</h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {selectedProjects.map((item) => (
              <div key={item.client} className="bg-card p-7">
                <h3 className="font-display text-lg font-bold">{item.client}</h3>
                <p className="eyebrow mt-2 text-muted-foreground">{item.category}</p>
                <p className="mt-3 text-sm font-medium">{item.involvement}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
