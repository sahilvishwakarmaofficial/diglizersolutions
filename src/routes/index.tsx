import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { seo, organizationSchema, websiteSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { FinalCta } from "@/components/layout/SiteLayout";
import { MediaGallery } from "@/components/MediaGallery";
import { VideoWork } from "@/components/VideoWork";
import { PricingSection } from "@/components/PricingSection";
import { FounderPortrait } from "@/components/FounderPortrait";
import { capabilities } from "@/content/capabilities";
import { industries } from "@/content/industries";
import { industryMedia } from "@/content/industryMedia";
import { projects, clientStrip } from "@/content/projects";
import { videoWork } from "@/content/clients";
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

function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const showcase = projects.flatMap((p) => p.gallery.slice(0, 1)).slice(0, 9);

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
        <div className="container-wide relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="eyebrow text-gradient">{siteConfig.tagline}</p>
            <h1 className="display-1 mt-5 max-w-4xl">
              An independent creative, technology and digital growth company.
            </h1>
            <p className="lede mt-6 max-w-2xl text-ink-muted">
              We help ambitious brands build stronger identities, sharper digital experiences and
              growth that can be measured — from Thane and Mumbai, for clients across India.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
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
            <p className="mt-6 text-sm text-ink-muted">
              <span className="font-semibold text-gradient">{pricing.statement}</span> Final
              investment depends on scope and deliverables.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { src: "/media/clients/genetics-social-grid.jpg", alt: "Healthcare campaign creatives", cls: "aspect-[4/5]" },
              { src: "/media/clients/grace26-website.jpg", alt: "Medical products website design", cls: "aspect-[4/5] mt-8" },
              { src: "/media/clients/two-travel.jpg", alt: "Community travel photography", cls: "aspect-square" },
              { src: "/media/clients/aikaa-social.jpg", alt: "Fashion campaign creatives", cls: "aspect-square mt-8" },
            ].map((item) => (
              <img
                key={item.src}
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                width={800}
                height={1000}
                className={`w-full rounded-xl border border-ink-border object-cover ${item.cls}`}
              />
            ))}
          </div>
        </div>

        <div className="container-wide relative pb-16">
          <dl className="grid grid-cols-2 gap-6 border-t border-ink-border pt-8 md:grid-cols-4">
            {[
              ["9", "Client engagements"],
              ["8", "Core capabilities"],
              ["7", "Industries served"],
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
      <section className="border-b border-border bg-background py-6">
        <div className="container-wide flex flex-wrap items-center gap-x-7 gap-y-2">
          <span className="eyebrow text-muted-foreground">Worked with</span>
          {clientStrip.map((client) => (
            <span key={client} className="text-sm font-medium text-muted-foreground">
              {client}
            </span>
          ))}
        </div>
      </section>

      {/* Positioning */}
      <section className="section-y-compact">
        <div className="container-wide grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="eyebrow text-gradient">Who we are</p>
            <h2 className="display-2 mt-4">
              Strategy, craft and engineering under one accountable roof.
            </h2>
          </div>
          <div className="space-y-5 leading-relaxed text-muted-foreground">
            <p>
              Diglizer Solution works at the intersection of brand, product and growth. Instead of
              splitting a brand across a design studio, a development vendor and a marketing
              agency, we hold the whole picture.
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
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((capability) => (
              <Link
                key={capability.slug}
                to="/capabilities/$slug"
                params={{ slug: capability.slug }}
                className="group bg-card p-6 transition-colors hover:bg-accent"
              >
                <span className="eyebrow text-muted-foreground">{capability.group}</span>
                <h3 className="mt-3 font-display text-lg font-bold leading-snug">
                  {capability.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {capability.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
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
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {featured.map((project) => (
              <Link
                key={project.slug}
                to="/work/$slug"
                params={{ slug: project.slug }}
                className="group block"
              >
                <div className="overflow-hidden rounded-2xl border border-border bg-muted">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    loading="lazy"
                    decoding="async"
                    width={1600}
                    height={1000}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <p className="eyebrow mt-5 text-muted-foreground">{project.industry}</p>
                <h3 className="mt-2 font-display text-xl font-bold leading-snug">
                  {project.client}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Visual showcase */}
      <section className="section-y bg-muted/40">
        <div className="container-wide">
          <MediaGallery
            items={showcase}
            eyebrow="Studio output"
            title="A look at the work itself."
            intro="Campaign creatives, packaging, websites, event design and social systems from live client engagements. Visuals marked as designed stand-ins are replaced as approved client media is released."
          />
        </div>
      </section>

      {/* Motion */}
      <section className="section-y bg-ink text-ink-foreground">
        <div className="container-wide">
          <p className="eyebrow text-gradient">Video and Reels</p>
          <h2 className="display-2 mt-4 max-w-2xl">Motion work, cut for the platform.</h2>
          <div className="mt-10">
            <VideoWork items={videoWork} />
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="section-y">
        <div className="container-wide">
          <p className="eyebrow text-gradient">How we work</p>
          <h2 className="display-2 mt-4 max-w-2xl">A five-step path from ambition to outcome.</h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {approach.map((item) => (
              <div key={item.step} className="bg-card p-6">
                <span className="font-display text-sm font-bold text-gradient">{item.step}</span>
                <h3 className="mt-3 font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder preview */}
      <section className="section-y bg-muted/40">
        <div className="container-wide grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <FounderPortrait />
          <div>
            <p className="eyebrow text-gradient">Founder</p>
            <h2 className="display-2 mt-4">{siteConfig.founder.name}</h2>
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              {siteConfig.founder.role}
            </p>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
              Diglizer is led hands-on. Every engagement has founder involvement in direction and
              quality — the practical benefit of staying independent and deliberately small.
            </p>
            <Link
              to="/founder"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Read the founder&apos;s note <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <PricingSection tone="dark" />

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
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry) => {
              const media = industryMedia[industry.slug];
              return (
                <Link
                  key={industry.slug}
                  to="/industries/$slug"
                  params={{ slug: industry.slug }}
                  className="group overflow-hidden rounded-2xl border border-border bg-card"
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
                  <div className="p-5">
                    <h3 className="font-display text-base font-bold leading-snug">
                      {industry.name}
                    </h3>
                    {media && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        {media.clients.join(" · ")}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
