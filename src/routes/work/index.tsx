import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";

import { seo, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, FinalCta } from "@/components/layout/SiteLayout";
import { WorkClientExperience } from "@/components/WorkClientExperience";
import { ClientLogo } from "@/components/ClientLogo";
import { VideoWork } from "@/components/VideoWork";
import { projects, workFilters } from "@/content/projects";
import { videoWork, clients, getClient } from "@/content/clients";
import { capabilities } from "@/content/capabilities";
import { industries } from "@/content/industries";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
];

export const Route = createFileRoute("/work/")({
  head: () =>
    seo({
      title: "Work, Case Studies & Client Experience | Diglizer Solution",
      description:
        "Selected case studies, creative projects and professional experience across healthcare, education, government, travel, culture, mobility, fashion and technology — by Diglizer Solution.",
      path: "/work",
    }),
  component: WorkIndex,
});

const featured = projects.filter((p) => p.featured);
const selected = projects.filter((p) => !p.featured);

function FeaturedPanel({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;
  const client = getClient(project.slug);

  return (
    <article className="grid gap-8 rounded-[2rem] border border-ink-border bg-ink-elevated/60 p-6 md:grid-cols-2 md:p-10">
      <div className="flex flex-col">
        {client && <ClientLogo client={client} size="md" className="self-start" />}
        <p className="eyebrow mt-6 text-ink-muted">
          {project.industry} · {project.location}
        </p>
        <h3 className="mt-3 font-display text-2xl font-bold leading-snug md:text-3xl">
          {project.title}
        </h3>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.services.slice(0, 6).map((service) => (
            <li
              key={service}
              className="rounded-full border border-ink-border px-3 py-1 text-xs font-medium text-ink-muted"
            >
              {service}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-4 pt-8">
          <Link
            to="/work/$slug"
            params={{ slug: project.slug }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold"
          >
            View Case Study <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {client?.website && client.websiteVerified && (
            <a
              href={client.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ink-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-ink-elevated"
            >
              Visit Official Website <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-ink-border bg-ink">
        {project.image ? (
          <img
            src={project.image}
            alt={project.imageAlt ?? `${project.client} project visual`}
            loading="lazy"
            decoding="async"
            width={1600}
            height={1000}
            className="aspect-[16/10] w-full object-cover"
          />
        ) : (
          <div className="flex aspect-[16/10] w-full items-center justify-center px-8 text-center">
            <span className="font-display text-xl font-bold leading-snug break-words">
              {project.client}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}

function SelectedProjectWork() {
  const [filter, setFilter] = useState("All");
  const visible =
    filter === "All" ? selected : selected.filter((p) => p.filters.includes(filter));

  return (
    <section className="section-y">
      <div className="container-wide">
        <p className="eyebrow text-gradient">Selected project work</p>
        <h2 className="display-2 mt-4 max-w-3xl">Shorter projects, confirmed scope.</h2>
        <p className="lede mt-6 max-w-3xl text-muted-foreground">
          Project pages are published only where confirmed scope and accurate material exist. Every
          other organisation stays in the client-experience directory below.
        </p>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter project work">
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

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((project) => {
            const client = getClient(project.slug);
            return (
              <Link
                key={project.slug}
                to="/work/$slug"
                params={{ slug: project.slug }}
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1"
              >
                {client && <ClientLogo client={client} size="sm" className="self-start" />}
                <h3 className="mt-5 font-display text-lg font-bold leading-snug break-words">
                  {project.client}
                </h3>
                <p className="eyebrow mt-2 text-muted-foreground">{project.industry}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.summary}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.services.slice(0, 3).map((service) => (
                    <li
                      key={service}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                    >
                      {service}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  View Project
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
          <p className="mt-10 text-sm text-muted-foreground">
            No published projects in this category yet — more work is being documented.
          </p>
        )}
      </div>
    </section>
  );
}

function ExploreBy() {
  return (
    <section className="section-y bg-muted/30">
      <div className="container-wide grid gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-gradient">Explore by service</p>
          <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">
            Find work by what was delivered.
          </h2>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {capabilities.map((capability) => (
              <li key={capability.slug}>
                <Link
                  to="/capabilities/$slug"
                  params={{ slug: capability.slug }}
                  className="block rounded-xl border border-border px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                >
                  {capability.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-gradient">Explore by industry</p>
          <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">
            Find work by the category it lives in.
          </h2>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {industries.map((industry) => (
              <li key={industry.slug}>
                <Link
                  to="/industries/$slug"
                  params={{ slug: industry.slug }}
                  className="block rounded-xl border border-border px-4 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                >
                  {industry.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function OfficialLinks() {
  const rows = clients.filter((c) => (c.website && c.websiteVerified) || c.instagram);
  return (
    <section className="section-y-compact">
      <div className="container-wide">
        <p className="eyebrow text-gradient">Official links and project evidence</p>
        <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">
          Verified sources, not claims.
        </h2>
        <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
          Only links confirmed as official are published. An official website confirms the
          organisation&apos;s identity — it is not presented as proof of project scope.
        </p>
        <ul className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {rows.map((client) => (
            <li key={client.slug} className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm font-semibold break-words">{client.displayName}</p>
              <div className="mt-2 flex flex-wrap gap-4 text-xs">
                {client.website && client.websiteVerified && (
                  <a
                    href={client.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Official website
                  </a>
                )}
                {client.instagram && (
                  <a
                    href={client.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Instagram
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WorkIndex() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        liquid="frame"
        eyebrow="Work & Experience"
        title="Work created to be noticed—and remembered."
        lede="Explore selected case studies, creative projects and professional experience across healthcare, education, government, travel, culture, mobility, fashion and technology."
        breadcrumbs={crumbs}
      >
        <p className="mt-8 text-sm text-ink-muted">
          <a href="#client-experience" className="font-semibold text-primary hover:underline">
            Jump to all clients &amp; professional experience
          </a>
        </p>
      </PageHero>

      <section className="section-y">
        <div className="container-wide">
          <p className="eyebrow text-gradient">Featured case studies</p>
          <h2 className="display-2 mt-4 max-w-3xl">Five engagements, documented in full.</h2>
          <div className="mt-10 grid gap-8">
            {featured.map((project) => (
              <FeaturedPanel key={project.slug} slug={project.slug} />
            ))}
          </div>
        </div>
      </section>

      <SelectedProjectWork />

      <section className="section-y-compact bg-ink text-ink-foreground">
        <div className="container-wide">
          <p className="eyebrow text-gradient">Video and Reels</p>
          <h2 className="mt-4 max-w-2xl font-display text-2xl font-bold md:text-3xl">
            Motion work across culture, health and retail.
          </h2>
          <div className="mt-10">
            <VideoWork items={videoWork} />
          </div>
        </div>
      </section>

      <ExploreBy />

      <WorkClientExperience />

      <OfficialLinks />

      <section className="section-y-compact bg-muted/30">
        <div className="container-wide">
          <p className="eyebrow text-gradient">Related insights</p>
          <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">
            The thinking behind the work.
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
            Practical guidance on digital marketing, performance, SEO and AI-search visibility.
          </p>
          <Link
            to="/insights"
            className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            Explore Insights <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
