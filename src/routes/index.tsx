import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Phone, Mail, Linkedin } from "lucide-react";

import { seo, organizationSchema, websiteSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { ClientLogoCloud } from "@/components/ClientLogoCloud";
import { PricingSection } from "@/components/PricingSection";
import { LiquidBrandObject } from "@/components/liquid/LiquidBrandObject";
import { MarketingProblem } from "@/components/liquid/MarketingProblem";
import { LuminousCrowd } from "@/components/liquid/LuminousCrowd";
import { ImpactEngine } from "@/components/ImpactEngine";

import { industries } from "@/content/industries";
import { projects } from "@/content/projects";
import { getClient } from "@/content/clients";
import { siteConfig, telHref, mailtoHref } from "@/config/site";
import { pricing } from "@/content/pricing";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "Diglizer Solution | Creative, Technology & Growth Company in Thane",
      description:
        "Diglizer Solution is an independent creative, technology and growth company in Thane, serving organisations across Mumbai, Navi Mumbai and India. Projects start from ₹25,000.",
      path: "/",
    }),
  component: Home,
});

const rotatingWords = ["Strategy", "Creative", "Technology", "Growth"];

const capabilityStates = [
  {
    number: "01",
    name: "Strategy",
    slug: "strategy-consulting",
    items: [
      "Brand strategy",
      "Communication planning",
      "Campaign direction",
      "Digital planning",
      "Content direction",
    ],
  },
  {
    number: "02",
    name: "Creative",
    slug: "brand-creative",
    items: [
      "Graphic design",
      "Brand identity",
      "Social-media creative",
      "Video editing",
      "Photography direction",
      "Print and packaging",
      "Campaign creative",
    ],
  },
  {
    number: "03",
    name: "Technology",
    slug: "websites-technology",
    items: [
      "Website design",
      "Website development",
      "Digital experiences",
      "Landing pages",
      "Enquiry systems",
      "Content systems",
    ],
  },
  {
    number: "04",
    name: "Growth",
    slug: "performance-marketing",
    items: [
      "Performance marketing",
      "Meta advertising",
      "Lead-generation systems",
      "Social-media growth",
      "Campaign optimisation",
    ],
  },
];

const processStages = [
  { step: "01", title: "Discover", copy: "Business, audience, category and constraints first." },
  { step: "02", title: "Define", copy: "Positioning, message architecture and the single idea." },
  { step: "03", title: "Design", copy: "Identity, campaigns and content as one connected system." },
  { step: "04", title: "Deliver", copy: "Production, build and launch across every touchpoint." },
  { step: "05", title: "Grow", copy: "Performance, optimisation and compounding visibility." },
];

const featuredSlugs = [
  "genetics-cryobank",
  "yashoda-ivf",
  "grace26",
  "tripwithowners",
  "pasbaan-e-adab",
];

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_18%_0%,rgba(105,70,153,0.35),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_78%_45%,rgba(118,81,255,0.28),transparent)]" />

      <div className="container-wide relative grid items-center gap-10 py-14 md:py-20 lg:min-h-[640px] lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div className="relative z-10">
          <p className="eyebrow text-gradient">
            Independent creative, technology and growth company
          </p>
          <h1 className="display-1 mt-6 max-w-3xl">We make brands impossible to ignore.</h1>

          <p
            className="mt-5 flex items-baseline gap-3 font-display text-base font-bold uppercase tracking-[0.18em]"
            aria-label="Strategy, Creative, Technology and Growth"
          >
            <span className="relative inline-block h-[1.4em] w-[9em] overflow-hidden">
              {rotatingWords.map((word, index) => (
                <span
                  key={word}
                  className="rotating-word text-gradient"
                  style={{ animationDelay: `${index * 2}s` }}
                >
                  {word}
                </span>
              ))}
            </span>
          </p>

          <p className="lede mt-5 max-w-xl text-secondary-foreground">
            Diglizer Solution combines strategy, creativity, technology and performance marketing to
            help ambitious businesses become more visible, valuable and competitive.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/work" className="capsule-primary px-7 py-4 uppercase tracking-[0.08em]">
              Explore Our Work
            </Link>
            <Link
              to="/start-a-project"
              className="capsule px-7 py-4 uppercase tracking-[0.08em]"
            >
              Start a Project
            </Link>
          </div>

          <dl className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <div>
              <dt className="sr-only">Locations</dt>
              <dd>Thane • Mumbai • Working across India</dd>
            </div>
            {siteConfig.contact.phone && (
              <div>
                <dt className="sr-only">Phone</dt>
                <dd>
                  <a href={telHref()} className="font-semibold underline-offset-4 hover:underline">
                    Call {siteConfig.contact.phone}
                  </a>
                </dd>
              </div>
            )}
            <div>
              <dt className="sr-only">Pricing</dt>
              <dd className="font-semibold text-gradient">{pricing.statement}</dd>
            </div>
          </dl>
        </div>

        <div className="relative order-first h-64 opacity-70 sm:h-80 lg:order-none lg:h-[34rem] lg:opacity-100">
          <LuminousCrowd className="absolute inset-0" />
        </div>
      </div>
    </section>
  );
}


function FeaturedWork() {
  const panels = featuredSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is (typeof projects)[number] => Boolean(p));

  return (
    <section className="relative section-y overflow-hidden bg-ink text-ink-foreground">
      <LiquidBrandObject
        state="portal"
        className="absolute -left-40 top-10 h-[34rem] w-[34rem] opacity-40"
      />
      <div className="container-wide relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-gradient">Featured work</p>
            <h2 className="display-2 mt-4 max-w-2xl">Work that carries a business objective.</h2>
          </div>
          <Link
            to="/work"
            className="inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline"
          >
            All work <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-12 grid gap-5 lg:grid-cols-2">
          {panels.map((project, index) => {
            const client = getClient(project.slug);
            return (
              <li
                key={project.slug}
                className={
                  index === 0
                    ? "glass-panel rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1 lg:col-span-2"
                    : "glass-panel rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1"
                }
              >
                <p className="eyebrow text-ink-muted">{project.industry}</p>
                <h3 className="display-3 mt-3">{project.client}</h3>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted">
                  {project.summary}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {project.services.slice(0, 5).map((service) => (
                    <li
                      key={service}
                      className="rounded-full border border-ink-border px-3 py-1 text-xs font-medium text-ink-muted"
                    >
                      {service}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Link
                    to="/work/$slug"
                    params={{ slug: project.slug }}
                    className="inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 hover:underline"
                  >
                    View Case Study <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  {client?.website && client.websiteVerified && (
                    <a
                      href={client.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-ink-muted underline-offset-4 hover:underline"
                    >
                      Visit Official Website
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section className="section-y">
      <div className="container-wide">
        <p className="eyebrow text-gradient">Capabilities</p>
        <h2 className="display-2 mt-4 max-w-3xl">
          Four states of the same material: strategy, creative, technology and growth.
        </h2>

        <div className="mt-14 space-y-4">
          {capabilityStates.map((state) => (
            <article
              key={state.slug}
              className="relative grid grid-cols-1 gap-6 overflow-hidden rounded-3xl border border-border bg-card p-8 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10"
            >
              <LiquidBrandObject
                state="capability"
                className="absolute -right-16 -top-16 h-64 w-64 opacity-15"
              />
              <span className="relative font-display text-4xl font-bold text-gradient">
                {state.number}
              </span>
              <div className="relative">
                <h3 className="font-display text-2xl font-bold">{state.name}</h3>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  {state.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <Link
                to="/capabilities/$slug"
                params={{ slug: state.slug }}
                className="relative inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                Explore {state.name} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustryRows() {
  return (
    <section className="relative section-y overflow-hidden bg-muted/40">
      <div className="container-wide relative">
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

        <ul className="mt-12 divide-y divide-border border-y border-border">
          {industries.map((industry, index) => (
            <li key={industry.slug}>
              <Link
                to="/industries/$slug"
                params={{ slug: industry.slug }}
                className="group grid gap-3 py-7 transition-colors hover:bg-background/70 md:grid-cols-[4rem_1fr_1.1fr_auto] md:items-baseline md:gap-8 md:px-4"
              >
                <span className="font-display text-sm font-bold tracking-[0.2em] text-gradient">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold leading-snug">{industry.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {industry.clients
                      .map((slug) => getClient(slug)?.displayName)
                      .filter(Boolean)
                      .slice(0, 4)
                      .join(" · ")}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{industry.cardCopy}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Explore Industry
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
  );
}

function Process() {
  return (
    <section className="relative section-y overflow-hidden bg-ink text-ink-foreground">
      <LiquidBrandObject
        state="process"
        className="absolute inset-x-0 bottom-0 h-72 w-full opacity-25"
      />
      <div className="container-wide relative">
        <p className="eyebrow text-gradient">Process</p>
        <h2 className="display-2 mt-4 max-w-3xl">
          One continuous path from the first conversation to compounding growth.
        </h2>
        <ol className="mt-14 grid gap-10 md:grid-cols-3 lg:grid-cols-5">
          {processStages.map((stage) => (
            <li key={stage.step}>
              <span className="font-display text-sm font-bold tracking-[0.2em] text-gradient">
                {stage.step}
              </span>
              <div className="rule-gradient mt-4" />
              <h3 className="mt-5 font-display text-lg font-bold">{stage.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{stage.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FounderPreview() {
  return (
    <section className="section-y">
      <div className="container-wide grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div className="relative mx-auto flex h-64 w-64 items-center justify-center rounded-[2.5rem] border border-border">
          <LiquidBrandObject
            state="monogram"
            className="absolute inset-0 h-full w-full opacity-30"
          />
          <span className="relative font-display text-7xl font-bold tracking-tight text-gradient">
            SV
          </span>
        </div>
        <div>
          <p className="eyebrow text-gradient">Founder &amp; Creative Director</p>
          <h2 className="display-2 mt-4">{siteConfig.founder.name}</h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            Sahil is a multidisciplinary creative professional working across graphic design, video
            editing, social media, websites, photography, digital advertising, print communication
            and brand development.
          </p>
          <Link
            to="/founder"
            className="mt-7 inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Meet the Founder <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function HomeCta() {
  const tel = telHref();
  const mail = mailtoHref();

  return (
    <section className="relative section-y overflow-hidden bg-ink text-ink-foreground">
      <LiquidBrandObject
        state="contact"
        className="absolute -right-24 bottom-0 h-[32rem] w-[32rem] opacity-40"
      />
      <div className="container-wide relative">
        <div className="rule-gradient" />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <h2 className="display-2 max-w-3xl">Ready to shape what comes next?</h2>
          <div>
            <p className="text-ink-muted">
              Bring us the ambition. We&apos;ll help shape the strategy, creative, technology and
              growth system around it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/start-a-project"
                className="rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Start a Project
              </Link>
              {tel && (
                <a
                  href={tel}
                  className="inline-flex items-center gap-2 rounded-full border border-ink-border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-ink-elevated"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" /> Call Now
                </a>
              )}
              {mail && (
                <a
                  href={mail}
                  className="inline-flex items-center gap-2 rounded-full border border-ink-border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-ink-elevated"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" /> Email Us
                </a>
              )}
              {siteConfig.founder.linkedin && (
                <a
                  href={siteConfig.founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ink-border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-ink-elevated"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
                </a>
              )}
            </div>
            <p className="mt-6 text-sm text-ink-muted">
              {siteConfig.founder.linkedinLabel} · {siteConfig.contact.phone} ·{" "}
              {siteConfig.contact.email}
            </p>
            <p className="mt-2 text-sm font-semibold text-gradient">{pricing.statement}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema]} />
      <Hero />
      <ImpactEngine />
      <ClientLogoCloud />
      <MarketingProblem />
      <FeaturedWork />
      <Capabilities />
      <IndustryRows />
      <Process />
      <FounderPreview />
      <PricingSection />
      <HomeCta />
    </>
  );
}
