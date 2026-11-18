import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown } from "lucide-react";

import { seo } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/SiteLayout";
import { FounderPortrait } from "@/components/FounderPortrait";
import { siteConfig, absoluteUrl } from "@/config/site";
import {
  formatDate,
  getResource,
  type ResourceMeta,
} from "@/content/resources/registry";

export interface SourceLink {
  label: string;
  href: string;
  note?: string;
}

export function resourceHead(r: ResourceMeta) {
  const base = seo({
    title: r.seoTitle,
    description: r.description,
    path: r.path,
    type: "article",
    image: absoluteUrl(r.ogImage),
    publishedTime: r.publishedAt,
    modifiedTime: r.updatedAt,
  });
  return {
    ...base,
    meta: [
      ...base.meta.filter((m) => m["name"] !== "author"),
      { name: "author", content: siteConfig.founder.name },
    ],
  };
}

export function resourceCrumbs(r: ResourceMeta) {
  return [
    { name: "Home", path: "/" },
    { name: "Resources", path: "/resources" },
    { name: r.title, path: r.path },
  ];
}

export function articleSchema(r: ResourceMeta, type: "Article" | "TechArticle" = "Article") {
  return {
    "@context": "https://schema.org",
    "@type": type,
    headline: r.title,
    description: r.description,
    image: absoluteUrl(r.ogImage),
    datePublished: r.publishedAt,
    dateModified: r.updatedAt,
    mainEntityOfPage: absoluteUrl(r.path),
    author: {
      "@type": "Person",
      "@id": `${siteConfig.domain}/founder#person`,
      name: siteConfig.founder.name,
      jobTitle: siteConfig.founder.role,
      url: absoluteUrl("/founder"),
      sameAs: siteConfig.founder.sameAs,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.domain}/#organization`,
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: absoluteUrl(siteConfig.logos.icon) },
    },
  };
}

export function itemListSchema(name: string, path: string, items: { name: string; anchor: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: `${absoluteUrl(path)}#${it.anchor}`,
    })),
  };
}

export function ResourceHero({
  r,
  eyebrow,
  h1,
  intro,
  actions,
}: {
  r: ResourceMeta;
  eyebrow: string;
  h1: string;
  intro: ReactNode;
  actions?: { href: string; label: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_85%_20%,color-mix(in_oklab,var(--brand-purple)_30%,transparent),transparent)]" />
      <div className="container-wide relative grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="min-w-0">
          <div className="mb-8 text-ink-muted">
            <Breadcrumbs items={resourceCrumbs(r)} />
          </div>
          <p className="eyebrow text-gradient">{eyebrow}</p>
          <h1 className="display-2 mt-4 max-w-3xl">{h1}</h1>
          <div className="lede mt-6 max-w-2xl text-ink-muted">{intro}</div>
          <p className="mt-6 text-sm">
            Created by{" "}
            <Link to="/founder" className="font-semibold underline underline-offset-4">
              {siteConfig.founder.name}
            </Link>
            <span className="block text-ink-muted">Founder &amp; Creative Director, Diglizer Solution</span>
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-muted">
            <li>
              Published <time dateTime={r.publishedAt}>{formatDate(r.publishedAt)}</time>
            </li>
            <li aria-hidden="true">·</li>
            <li>
              Updated <time dateTime={r.updatedAt}>{formatDate(r.updatedAt)}</time>
            </li>
            <li aria-hidden="true">·</li>
            <li>{r.readingMinutes} min read</li>
            <li aria-hidden="true">·</li>
            <li>Difficulty: {r.difficulty}</li>
          </ul>
          {actions && (
            <div className="mt-8 flex flex-wrap gap-3">
              {actions.map((a, i) => (
                <a
                  key={a.href}
                  href={a.href}
                  className={
                    i === 0
                      ? "inline-flex min-h-11 items-center rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white"
                      : "inline-flex min-h-11 items-center rounded-full border border-ink-border px-6 py-3 text-sm font-semibold hover:bg-ink-elevated"
                  }
                >
                  {a.label}
                </a>
              ))}
            </div>
          )}
        </div>
        <img
          src={r.ogImage}
          width={1200}
          height={630}
          alt={r.coverAlt}
          fetchPriority="high"
          decoding="async"
          className="hidden aspect-[1200/630] w-full rounded-3xl border border-ink-border object-cover lg:block"
        />
      </div>
    </section>
  );
}

/** Sticky contents on desktop, expandable menu on mobile. */
export function ResourceToc({ items }: { items: { id: string; label: string }[] }) {
  const list = (
    <ol className="space-y-1 text-sm">
      {items.map((it, i) => (
        <li key={it.id}>
          <a
            href={`#${it.id}`}
            className="flex min-h-9 items-start gap-2 rounded-lg px-2 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
            {it.label}
          </a>
        </li>
      ))}
    </ol>
  );
  return (
    <>
      <details className="group rounded-2xl border border-border bg-card lg:hidden">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
          On this page
          <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <nav aria-label="On this page" className="border-t border-border p-2">
          {list}
        </nav>
      </details>
      <nav aria-label="On this page" className="sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-auto lg:block">
        <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          On this page
        </p>
        {list}
      </nav>
    </>
  );
}

export function ResourceBody({ toc, children }: { toc: { id: string; label: string }[]; children: ReactNode }) {
  return (
    <div className="container-wide grid gap-10 py-12 lg:grid-cols-[15rem_minmax(0,1fr)] lg:py-16">
      <aside>
        <ResourceToc items={toc} />
      </aside>
      <div className="min-w-0 space-y-20">{children}</div>
    </div>
  );
}

export function Section({ id, title, intro, children }: { id: string; title: string; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="display-3 max-w-3xl">{title}</h2>
      {intro && <div className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{intro}</div>}
      {children && <div className="mt-8">{children}</div>}
    </section>
  );
}

export function Callout({ tone = "info", title, children }: { tone?: "info" | "warn"; title: string; children: ReactNode }) {
  return (
    <div
      role="note"
      className={`rounded-2xl border p-5 text-sm leading-relaxed ${
        tone === "warn" ? "border-brand-pink/40 bg-brand-pink/5" : "border-primary/30 bg-primary/5"
      }`}
    >
      <p className={`font-semibold ${tone === "warn" ? "text-brand-pink" : "text-primary"}`}>
        {tone === "warn" ? "Important: " : "Note: "}
        {title}
      </p>
      <div className="mt-2 text-muted-foreground">{children}</div>
    </div>
  );
}

export function ResourceCard({ r, headingLevel = "h3" }: { r: ResourceMeta; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-colors focus-within:ring-2 focus-within:ring-primary hover:border-primary">
      <img
        src={r.cover}
        width={800}
        height={420}
        alt={r.coverAlt}
        loading="lazy"
        decoding="async"
        className="aspect-[1200/630] w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-6">
        <p className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">{r.categories[0]}</span>
          <span className="rounded-full bg-muted px-2.5 py-1 text-muted-foreground">{r.resourceType}</span>
        </p>
        <H className="mt-4 font-display text-xl font-bold leading-snug">
          <Link to={r.path} className="after:absolute after:inset-0 focus-visible:outline-none">
            {r.title}
          </Link>
        </H>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{r.summary}</p>
        <p className="mt-5 text-xs text-muted-foreground">
          By {siteConfig.founder.name} · Updated <time dateTime={r.updatedAt}>{formatDate(r.updatedAt)}</time>
          <br />
          {r.readingMinutes} min read · {r.difficulty}
        </p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
          View Resource <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}

export function RelatedResources({ r }: { r: ResourceMeta }) {
  return (
    <Section id="related" title="Related resources">
      <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {r.related.map((slug) => (
          <li key={slug}>
            <ResourceCard r={getResource(slug)} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function SourcesList({ sources, acknowledgement }: { sources: SourceLink[]; acknowledgement?: string }) {
  return (
    <Section id="sources" title="Sources and tool references">
      <ul className="space-y-3 text-sm">
        {sources.map((s) => (
          <li key={s.href}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline underline-offset-4"
            >
              {s.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {s.note && <span className="text-muted-foreground"> — {s.note}</span>}
          </li>
        ))}
      </ul>
      {acknowledgement && <p className="mt-6 text-xs text-muted-foreground">{acknowledgement}</p>}
      <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted-foreground">
        Educational disclaimer: this resource is general guidance, not professional, legal or financial
        advice. Tools, platform policies and features change; check official documentation before acting.
        Diglizer Solution is not affiliated with the tools or platforms mentioned.
      </p>
    </Section>
  );
}

export function AuthorBlock() {
  return (
    <section id="author" className="scroll-mt-28">
      <div className="grid items-center gap-8 rounded-3xl border border-border bg-card p-6 md:grid-cols-[12rem_1fr] md:p-10">
        <FounderPortrait className="max-w-[12rem]" />
        <div>
          <h2 className="display-3">Created by Sahil Vishwakarma</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Sahil Vishwakarma is the Founder and Creative Director of Diglizer Solution. He works across
            digital marketing, graphic design, video editing, social media, websites, photography,
            performance advertising and brand communication.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            These resources organise complex creative and marketing workflows into practical systems that
            creators, marketers and business owners can understand and adapt.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/founder" className="inline-flex min-h-11 items-center rounded-full border border-border px-5 text-sm font-semibold hover:bg-muted">
              Meet Sahil
            </Link>
            <Link to="/gallery" className="inline-flex min-h-11 items-center rounded-full border border-border px-5 text-sm font-semibold hover:bg-muted">
              Explore the Gallery
            </Link>
            <a
              href={siteConfig.founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full border border-border px-5 text-sm font-semibold hover:bg-muted"
            >
              Connect on LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesCta({ r }: { r: ResourceMeta }) {
  return (
    <section className="section-y bg-ink text-ink-foreground">
      <div className="container-wide grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="display-2 max-w-3xl">Need execution—not just the resource?</h2>
          <p className="mt-6 max-w-2xl text-ink-muted">
            Diglizer Solution connects strategy, creative, technology and growth to help businesses turn
            ideas into usable content, campaigns and digital experiences.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/start-a-project" className="inline-flex min-h-11 items-center rounded-full bg-gradient-brand px-6 text-sm font-semibold text-white">
              Discuss Your Project
            </Link>
            <Link to="/resources" className="inline-flex min-h-11 items-center rounded-full border border-ink-border px-6 text-sm font-semibold hover:bg-ink-elevated">
              Browse all Resources
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">Relevant services</h3>
          <ul className="mt-4 divide-y divide-ink-border border-y border-ink-border">
            {r.services.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/capabilities/$slug"
                  params={{ slug: s.slug }}
                  className="flex min-h-11 items-center justify-between py-3 text-sm font-semibold hover:text-brand-pink"
                >
                  {s.label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
      {items.map((t) => (
        <li key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
          {t}
        </li>
      ))}
    </ul>
  );
}

export const inputClass =
  "mt-1 block w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
