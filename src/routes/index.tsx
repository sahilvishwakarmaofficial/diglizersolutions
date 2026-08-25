import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { seo, organizationSchema, websiteSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { FinalCta } from "@/components/layout/SiteLayout";
import { capabilities } from "@/content/capabilities";
import { industries } from "@/content/industries";
import { projects, clientStrip } from "@/content/projects";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Diglizer Solution | Creative, Technology & Digital Growth Company",
      description:
        "Diglizer Solution is an independent creative, technology and digital growth company in Thane and Mumbai, building brands, digital experiences and measurable growth.",
      path: "/",
    }),
  component: Home,
});

const approach = [
  {
    step: "01",
    title: "Understand",
    copy: "We start with the business, the audience and the constraints — not with a moodboard.",
  },
  {
    step: "02",
    title: "Define",
    copy: "Positioning, message architecture and the single idea that the work has to carry.",
  },
  {
    step: "03",
    title: "Create",
    copy: "Identity, campaigns, content and product design built as one connected system.",
  },
  {
    step: "04",
    title: "Build",
    copy: "Websites, platforms and tooling engineered for speed, clarity and search visibility.",
  },
  {
    step: "05",
    title: "Grow",
    copy: "Performance, SEO and content compounding into demand you can actually measure.",
  },
];

function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <img
          src="/media/hero-collage.jpg"
          alt=""
          aria-hidden="true"
          width={1600}
          height={1200}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="container-wide relative py-24 md:py-36">
          <p className="eyebrow text-gradient">{siteConfig.tagline}</p>
          <h1 className="display-1 mt-6 max-w-5xl">
            An independent creative, technology and digital growth company.
          </h1>
          <p className="lede mt-8 max-w-2xl text-ink-muted">
            We help ambitious brands build stronger identities, sharper digital experiences and
            growth that can be measured — from our base in Thane and Mumbai, for clients across
            India.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/start-a-project"
              className="rounded-full bg-gradient-brand px-7 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Start a Project
            </Link>
            <Link
              to="/work"
              className="rounded-full border border-ink-border px-7 py-4 text-sm font-semibold transition-colors hover:bg-ink-elevated"
            >
              See Our Work
            </Link>
          </div>
          <dl className="mt-16 grid max-w-3xl grid-cols-2 gap-8 border-t border-ink-border pt-8 md:grid-cols-4">
            {[
              ["8", "Core capabilities"],
              ["7", "Industries served"],
              ["11+", "Brands supported"],
              ["1", "Accountable partner"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-bold">{value}</span>
                  <span className="mt-1 block text-xs uppercase tracking-widest text-ink-muted">
                    {label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Client strip */}
      <section className="border-b border-border bg-background py-8">
        <div className="container-wide flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="eyebrow text-muted-foreground">Trusted by</span>
          {clientStrip.map((client) => (
            <span key={client} className="text-sm font-medium text-muted-foreground">
              {client}
            </span>
          ))}
        </div>
      </section>

      {/* Positioning */}
      <section className="section-y">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="eyebrow text-gradient">Who we are</p>
            <h2 className="display-2 mt-4">
              Strategy, craft and engineering under one accountable roof.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              Diglizer Solution works at the intersection of brand, product and growth. Instead of
              splitting a brand across a design studio, a development vendor and a marketing agency,
              we hold the whole picture — so the identity, the website and the campaigns say the
              same thing.
            </p>
            <p>
              We work with healthcare and fertility brands, medical product companies, travel
              communities, education, retail and professional services. The categories differ; the
              discipline does not.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              More about the studio <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-y bg-muted/40">
        <div className="container-wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-gradient">Capabilities</p>
              <h2 className="display-2 mt-4 max-w-2xl">What we do, end to end.</h2>
            </div>
            <Link
              to="/capabilities"
              className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              All capabilities
            </Link>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((capability) => (
              <Link
                key={capability.slug}
                to="/capabilities/$slug" params={{ slug: capability.slug }}
                className="group bg-card p-7 transition-colors hover:bg-accent"
              >
                <span className="eyebrow text-muted-foreground">{capability.group}</span>
                <h3 className="mt-3 font-display text-lg font-bold leading-snug">
                  {capability.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {capability.summary}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Explore
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured work */}
      <section className="section-y">
        <div className="container-wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-gradient">Selected work</p>
              <h2 className="display-2 mt-4 max-w-2xl">Work built to do a job.</h2>
            </div>
            <Link
              to="/work"
              className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              View all work
            </Link>
          </div>
          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            {featured.map((project) => (
              <Link key={project.slug} to="/work/$slug" params={{ slug: project.slug }} className="group block">
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
                <p className="eyebrow mt-6 text-muted-foreground">{project.industry}</p>
                <h3 className="mt-3 font-display text-xl font-bold leading-snug">
                  {project.client}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section-y bg-ink text-ink-foreground">
        <div className="container-wide">
          <p className="eyebrow text-gradient">How we work</p>
          <h2 className="display-2 mt-4 max-w-2xl">A five-step path from ambition to outcome.</h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-ink-border sm:grid-cols-2 lg:grid-cols-5">
            {approach.map((item) => (
              <div key={item.step} className="bg-ink-elevated p-7">
                <span className="font-display text-sm font-bold text-gradient">{item.step}</span>
                <h3 className="mt-4 font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-y">
        <div className="container-wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-gradient">Industries</p>
              <h2 className="display-2 mt-4 max-w-2xl">Category context matters.</h2>
            </div>
            <Link
              to="/industries"
              className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              All industries
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                to="/industries/$slug" params={{ slug: industry.slug }}
                className="rounded-full border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
              >
                {industry.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
