import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { seo, organizationSchema, websiteSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { FinalCta } from "@/components/layout/SiteLayout";
import { ClientLogoCloud } from "@/components/ClientLogoCloud";
import { PricingSection } from "@/components/PricingSection";

import { capabilities } from "@/content/capabilities";
import { industries } from "@/content/industries";
import { projects } from "@/content/projects";
import { siteConfig } from "@/config/site";
import { pricing } from "@/content/pricing";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Diglizer Solution | Creative, Technology & Digital Growth Company",
      description:
        "Diglizer Solution is an independent creative, technology and digital growth company in Thane and Mumbai. Branding, websites, content and performance. Projects start from ₹25,000.",
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
    copy: "Positioning, message architecture and the single idea the work has to carry.",
  },
  {
    step: "03",
    title: "Create",
    copy: "Identity, campaigns, content and product design built as one connected system.",
  },
  {
    step: "04",
    title: "Build",
    copy: "Websites and platforms engineered for speed, clarity and search visibility.",
  },
  {
    step: "05",
    title: "Grow",
    copy: "Performance, SEO and content compounding into demand you can measure.",
  },
];

const proofPoints = [
  { figure: "17", label: "Organisations served across nine categories" },
  { figure: "8", label: "Industries with category-specific experience" },
  { figure: "₹25,000", label: "Starting investment for a defined project" },
  { figure: "1 day", label: "Typical response time to a genuine enquiry" },
];

/** Decorative Diglizer geometry — pure SVG, no photography. */
function BrandGeometry() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 600"
      className="pointer-events-none absolute -right-24 -top-24 h-[38rem] w-[38rem] opacity-70 md:opacity-90"
    >
      <defs>
        <linearGradient id="dg-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-purple, #694699)" />
          <stop offset="100%" stopColor="var(--brand-pink, #FB2261)" />
        </linearGradient>
      </defs>
      <circle cx="300" cy="300" r="230" fill="none" stroke="url(#dg-grad)" strokeWidth="1" />
      <circle cx="300" cy="300" r="170" fill="none" stroke="url(#dg-grad)" strokeWidth="1" opacity="0.7" />
      <circle cx="300" cy="300" r="110" fill="none" stroke="url(#dg-grad)" strokeWidth="1" opacity="0.5" />
      <rect x="286" y="60" width="28" height="28" fill="url(#dg-grad)" opacity="0.9" />
      <rect x="286" y="112" width="18" height="18" fill="url(#dg-grad)" opacity="0.6" />
      <rect x="286" y="152" width="10" height="10" fill="url(#dg-grad)" opacity="0.35" />
    </svg>
  );
}

function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema]} />

      {/* Hero — typography, CSS and SVG only. No photography. */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <BrandGeometry />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_0%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent)]" />
        <div className="container-wide relative py-24 md:py-32">
          <p className="eyebrow text-gradient">{siteConfig.tagline}</p>
          <h1 className="display-1 mt-6 max-w-5xl">
            An independent creative, technology and{" "}
            <span className="text-gradient">digital growth</span> company.
          </h1>
          <p className="lede mt-7 max-w-2xl text-ink-muted">
            We help ambitious brands build stronger identities, sharper digital experiences and
            growth that can be measured — from Thane and Mumbai, for clients across India.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
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
          <p className="mt-7 text-sm text-ink-muted">
            <span className="font-semibold text-gradient">{pricing.statement}</span> Final
            investment depends on scope and deliverables.
          </p>

          <dl className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-ink-border bg-ink-border sm:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map((item) => (
              <div key={item.label} className="bg-ink px-6 py-7">
                <dt className="font-display text-3xl font-bold text-gradient">{item.figure}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-muted">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ClientLogoCloud />

      {/* Capabilities */}
      <section className="section-y">
        <div className="container-wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-gradient">Capabilities</p>
              <h2 className="display-2 mt-4 max-w-2xl">
                One studio across brand, content, product and growth.
              </h2>
            </div>
            <Link
              to="/capabilities"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              All capabilities <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => (
              <li key={capability.slug} className="bg-background">
                <Link
                  to="/capabilities/$slug"
                  params={{ slug: capability.slug }}
                  className="group flex h-full flex-col p-8 transition-colors hover:bg-muted/50"
                >
                  <h3 className="font-display text-xl font-bold">{capability.name}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {capability.summary}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Explore
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Approach */}
      <section className="section-y bg-ink text-ink-foreground">
        <div className="container-wide">
          <p className="eyebrow text-gradient">How we work</p>
          <h2 className="display-2 mt-4 max-w-3xl">
            A five-step method that keeps creative tied to the business objective.
          </h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-3 lg:grid-cols-5">
            {approach.map((item) => (
              <li key={item.step}>
                <span className="font-display text-sm font-bold tracking-[0.2em] text-gradient">
                  {item.step}
                </span>
                <div className="rule-gradient mt-4" />
                <h3 className="mt-5 font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Featured work — text-led index, imagery lives inside case studies */}
      <section className="section-y">
        <div className="container-wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-gradient">Selected work</p>
              <h2 className="display-2 mt-4 max-w-2xl">Work that carries a business objective.</h2>
            </div>
            <Link
              to="/work"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              All work <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-12 divide-y divide-border border-y border-border">
            {featured.map((project) => (
              <li key={project.slug}>
                <Link
                  to="/work/$slug"
                  params={{ slug: project.slug }}
                  className="group grid gap-4 py-8 transition-colors hover:bg-muted/40 md:grid-cols-[1fr_1.4fr_auto] md:items-baseline md:gap-10 md:px-4"
                >
                  <div>
                    <h3 className="font-display text-2xl font-bold leading-snug">
                      {project.client}
                    </h3>
                    <p className="eyebrow mt-2 text-muted-foreground">
                      {project.industry} · {project.location}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    View case study
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Industries */}
      <section className="section-y-compact bg-muted/40">
        <div className="container-wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-gradient">Industries</p>
              <h2 className="display-2 mt-4 max-w-2xl">Context changes the creative.</h2>
            </div>
            <Link
              to="/industries"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              All industries <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-3">
            {industries.map((industry) => (
              <li key={industry.slug}>
                <Link
                  to="/industries/$slug"
                  params={{ slug: industry.slug }}
                  className="inline-flex rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                >
                  {industry.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PricingSection />

      <FinalCta />
    </>
  );
}
