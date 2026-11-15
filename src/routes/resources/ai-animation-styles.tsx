import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, Instagram } from "lucide-react";

import { seo, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/layout/SiteLayout";
import { FounderPortrait } from "@/components/FounderPortrait";
import { CopyButton } from "@/components/resources/CopyButton";
import { StyleSwatch } from "@/components/resources/StyleSwatch";
import { siteConfig, absoluteUrl } from "@/config/site";
import {
  AI_ANIMATION as R,
  animationStyles,
  basePrompt,
  compilationPrompt,
  microPrompts,
  principles,
  steps,
} from "@/content/resources/ai-animation-styles";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Resources", path: "/resources" },
  { name: "AI Animation Styles", path: R.path },
];

const services = [
  { slug: "video-content", label: "Video and Content" },
  { slug: "brand-creative", label: "Brand and Creative" },
  { slug: "social-media", label: "Social Media" },
  { slug: "performance-marketing", label: "Performance Marketing" },
  { slug: "websites-technology", label: "Websites and Technology" },
];

const relatedArticles = [
  {
    category: "performance-marketing",
    slug: "meta-ads-funnel-for-local-businesses",
    title: "Meta Ads funnel for local businesses",
  },
  {
    category: "digital-marketing",
    slug: "digital-marketing-strategy-for-small-businesses",
    title: "Digital marketing strategy for small businesses",
  },
  {
    category: "ai-seo-geo",
    slug: "improve-brand-visibility-in-chatgpt-and-gemini",
    title: "Improving brand visibility in ChatGPT and Gemini",
  },
];

export const Route = createFileRoute("/resources/ai-animation-styles")({
  head: () => {
    const base = seo({
      title: R.seoTitle,
      description: R.description,
      path: R.path,
      type: "article",
      image: absoluteUrl(R.ogImage),
      publishedTime: R.published,
      modifiedTime: R.updated,
    });
    return {
      ...base,
      meta: [
        ...base.meta.filter((m) => m.name !== "author"),
        { name: "author", content: siteConfig.founder.name },
      ],
    };
  },
  component: AiAnimationStyles,
});

function PromptCard({ title, text, id }: { title: string; text: string; id?: string }) {
  return (
    <div id={id} className="overflow-hidden rounded-2xl border border-ink-border bg-ink-elevated">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-border px-5 py-3">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">{title}</p>
        <CopyButton text={text} />
      </div>
      <pre className="whitespace-pre-wrap break-words p-5 font-mono text-sm leading-relaxed text-ink-foreground md:p-7">
        {text}
      </pre>
    </div>
  );
}

function AiAnimationStyles() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: R.title,
    description: R.description,
    image: absoluteUrl(R.ogImage),
    datePublished: R.published,
    dateModified: R.updated,
    mainEntityOfPage: absoluteUrl(R.path),
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

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), articleSchema]} />

      {/* 1 — Hero */}
      <section id="hero" className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--ink-foreground)_1px,transparent_1px),linear-gradient(90deg,var(--ink-foreground)_1px,transparent_1px)] [background-size:48px_48px]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_30%,color-mix(in_oklab,var(--brand-purple)_30%,transparent),transparent)]" />
        <div className="container-wide relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <div className="mb-8 text-ink-muted">
              <Breadcrumbs items={crumbs} />
            </div>
            <p className="eyebrow text-gradient">Free creative playbook</p>
            <h1 className="display-2 mt-4 max-w-3xl">{R.title}</h1>
            <p className="lede mt-6 max-w-2xl text-ink-muted">
              Turn one simple scene into ten visually different animations using AI coding tools,
              React and Remotion. Copy the base prompt, choose a style and adapt the details to your
              own idea.
            </p>
            <p className="mt-6 text-sm">
              Created by{" "}
              <Link to="/founder" className="font-semibold underline underline-offset-4">
                {siteConfig.founder.name}
              </Link>
              <span className="block text-ink-muted">
                Founder &amp; Creative Director, Diglizer Solution
              </span>
            </p>
            <p className="mt-2 text-xs text-ink-muted">
              Published <time dateTime={R.published}>16 November 2026</time> · Updated{" "}
              <time dateTime={R.updated}>16 November 2026</time> · {R.readingMinutes} min read
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#styles"
                className="rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Explore the 10 Styles
              </a>
              <a
                href="#base-prompt"
                className="rounded-full border border-ink-border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-ink-elevated"
              >
                Copy the Base Prompt
              </a>
            </div>
            <p className="mt-6 max-w-xl text-xs text-ink-muted">
              Built for creators, editors, social-media teams and brands experimenting with
              AI-assisted motion design.
            </p>
          </div>

          <figure className="mx-auto w-full max-w-[19rem]">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-ink-border shadow-[0_30px_80px_-30px_var(--brand-purple)]">
              <img
                src={R.poster}
                width={R.posterWidth}
                height={R.posterHeight}
                alt="Illustrated still of the base scene: an office professional walking left to right with a stack of papers while one sheet floats behind"
                fetchPriority="high"
                decoding="async"
                className="aspect-[9/16] w-full object-cover"
              />
              <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide">
                Placeholder still
              </span>
            </div>
            <figcaption className="mt-3 text-center text-xs text-ink-muted">
              Base scene, 9:16. The original preview video is in production and will replace this
              still.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 2 — Value strip */}
      <section id="value" aria-label="What this playbook includes" className="border-b border-border">
        <ul className="container-wide grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            "10 distinct visual directions",
            "One reusable base scene",
            "Copy-ready structured prompts",
            "Built for vertical social video",
          ].map((item, i) => (
            <li key={item} className="flex items-center gap-3 text-sm font-semibold">
              <span className="font-mono text-xs text-primary">0{i + 1}</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* 3 — How to use */}
      <section id="how-to-use" className="section-y">
        <div className="container-wide">
          <h2 className="display-3 max-w-3xl">From prompt to animation in four steps</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            You do not need ten completely different concepts. Start with one controlled scene,
            then change the visual language.
          </p>
          <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-border bg-card p-6">
                <p className="font-mono text-sm text-primary">0{i + 1}</p>
                <h3 className="mt-3 font-display text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.copy}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-xs text-muted-foreground">
            Note: AI-generated code may require debugging, dependency installation and manual
            creative refinement. Results vary by tool and model.
          </p>
        </div>
      </section>

      {/* 4 — Base scene */}
      <section id="base-prompt" className="section-y bg-ink text-ink-foreground">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="display-3">Start with one controlled scene</h2>
            <p className="mt-4 text-ink-muted">
              This scene is intentionally detailed enough to establish timing and movement while
              remaining flexible enough for different visual styles.
            </p>
          </div>
          <PromptCard title="Base Scene" text={basePrompt} />
        </div>
      </section>

      {/* 5 — Ten styles */}
      <section id="styles" className="section-y">
        <div className="container-wide">
          <h2 className="display-3">Choose your visual language</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Apply one of the following style directions after the base prompt. Keep the scene and
            timing consistent so the effect of each visual language is easy to compare.
          </p>
          <div className="mt-10 space-y-4">
            {animationStyles.map((style, i) => (
              <details
                key={style.id}
                id={`style-${style.id}`}
                open={i === 0}
                className="group rounded-2xl border border-border bg-card"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:p-6 [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-sm text-primary">{style.number}</span>
                  <span className="flex-1">
                    <h3 className="font-display text-lg font-bold md:text-xl">{style.name}</h3>
                    <span className="mt-1 block text-sm text-muted-foreground">
                      <strong className="font-semibold text-foreground">Best for:</strong>{" "}
                      {style.bestFor}
                    </span>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180"
                  />
                </summary>
                <div className="grid gap-6 border-t border-border p-5 md:grid-cols-[9rem_1fr] md:p-6">
                  <div className="w-28 md:w-full">
                    <StyleSwatch id={style.id} name={style.name} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                        Technical direction: {style.tech}
                      </span>
                      <CopyButton text={style.prompt} tone="light" label="Copy Style Prompt" />
                    </div>
                    <pre className="mt-4 whitespace-pre-wrap break-words rounded-xl bg-muted p-5 font-mono text-sm leading-relaxed">
                      {style.prompt}
                    </pre>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Comparison grid */}
      <section id="comparison" className="section-y-compact bg-muted/40">
        <div className="container-wide">
          <h2 className="display-3">Compare the ten directions</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            The same scene, ten visual languages. These are illustrative swatches; original preview
            renders will be added as they are produced.
          </p>
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {animationStyles.map((style) => (
              <li key={style.id}>
                <a
                  href={`#style-${style.id}`}
                  className="block rounded-2xl border border-border bg-card p-3 transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <StyleSwatch id={style.id} name={style.name} />
                  <p className="mt-3 font-mono text-xs text-primary">{style.number}</p>
                  <p className="font-display text-sm font-bold">{style.name}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{style.bestFor}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7 — Compilation */}
      <section id="compilation" className="section-y bg-ink text-ink-foreground">
        <div className="container-wide grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-gradient">Bonus</p>
            <h2 className="display-3 mt-3">Turn all ten versions into one compilation</h2>
          </div>
          <PromptCard title="Compilation" text={compilationPrompt} />
        </div>
      </section>

      {/* 8 — Micro prompts */}
      <section id="refine" className="section-y">
        <div className="container-wide">
          <h2 className="display-3">Refine the result without starting again</h2>
          <ul className="mt-10 grid gap-3 md:grid-cols-2">
            {microPrompts.map((prompt) => (
              <li
                key={prompt}
                className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-4"
              >
                <p className="text-sm leading-relaxed">{prompt}</p>
                <CopyButton text={prompt} tone="light" label="Copy" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 9 — Principles */}
      <section id="principles" className="section-y-compact bg-muted/40">
        <div className="container-wide">
          <h2 className="display-3">Direction matters more than adjectives</h2>
          <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {principles.map((p, i) => (
              <li key={p.title}>
                <p className="font-mono text-sm text-primary">{i + 1}</p>
                <h3 className="mt-2 font-display text-base font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 10 — Creator */}
      <section id="creator" className="section-y">
        <div className="container-wide grid items-center gap-10 rounded-3xl border border-border bg-card p-6 md:grid-cols-[14rem_1fr] md:p-10">
          <FounderPortrait className="max-w-[14rem]" />
          <div>
            <h2 className="display-3">Created by Sahil Vishwakarma</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Sahil Vishwakarma is the Founder and Creative Director of Diglizer Solution. He works
              across graphic design, video editing, social media, websites, photography, digital
              advertising, print communication and brand development.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              This playbook is part of his ongoing exploration of how creative direction and
              emerging technology can help brands communicate more clearly and produce more
              distinctive content.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/founder" className="rounded-full border border-border px-5 py-3 text-sm font-semibold hover:bg-muted">
                Meet Sahil
              </Link>
              <Link to="/gallery" className="rounded-full border border-border px-5 py-3 text-sm font-semibold hover:bg-muted">
                Explore Diglizer's Work
              </Link>
              <Link to="/start-a-project" className="rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-white">
                Discuss a Video Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11 — Service CTA */}
      <section id="services" className="section-y bg-ink text-ink-foreground">
        <div className="container-wide grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="display-2 max-w-3xl">
              Need the idea, execution and campaign—not just the prompt?
            </h2>
            <p className="mt-6 max-w-2xl text-ink-muted">
              Diglizer Solution connects creative direction, video production, social content and
              performance marketing so the finished work has a clear business purpose.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/start-a-project" className="rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white">
                Discuss Your Project
              </Link>
              <Link
                to="/capabilities/$slug"
                params={{ slug: "video-content" }}
                className="rounded-full border border-ink-border px-6 py-3.5 text-sm font-semibold hover:bg-ink-elevated"
              >
                Explore Video and Content
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
              Relevant services
            </h3>
            <ul className="mt-4 divide-y divide-ink-border border-y border-ink-border">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/capabilities/$slug"
                    params={{ slug: s.slug }}
                    className="flex items-center justify-between py-3.5 text-sm font-semibold hover:text-brand-pink"
                  >
                    {s.label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
              Related insights
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {relatedArticles.map((a) => (
                <li key={a.slug}>
                  <Link
                    to="/insights/$category/$slug"
                    params={{ category: a.category, slug: a.slug }}
                    className="underline underline-offset-4 hover:text-brand-pink"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 12 — Follow (no newsletter list exists yet, so no signup form is shown) */}
      <section id="follow" className="section-y-compact">
        <div className="container-wide flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-card p-8 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold">Get the next creative playbook</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              New practical resources on AI-assisted content, visual storytelling, video and digital
              growth are shared on Instagram first.
            </p>
          </div>
          <a
            href={siteConfig.founder.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Sahil Vishwakarma on Instagram (opens in a new tab)"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white"
          >
            <Instagram className="h-4 w-4" aria-hidden="true" /> Follow Sahil on Instagram
          </a>
        </div>
      </section>
    </>
  );
}
