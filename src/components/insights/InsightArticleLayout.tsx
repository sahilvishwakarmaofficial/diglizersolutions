import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import type { InsightArticle } from "@/content/insights";
import { getArticleBySlug, getCategory } from "@/content/insights";
import { getInsightImage } from "@/content/insights/media";

import { Breadcrumbs } from "@/components/layout/SiteLayout";
import { LiquidKnowledgeSphere } from "./LiquidKnowledgeSphere";
import { getCapability } from "@/content/capabilities";
import { getIndustry } from "@/content/industries";

const CTA_COPY: Record<InsightArticle["category"], string> = {
  "digital-marketing": "Need a clearer digital strategy?",
  "performance-marketing": "Planning a campaign that needs stronger creative and structure?",
  seo: "Need a website that is easier to discover?",
  "ai-seo-geo": "Want to make your brand easier for search engines and AI systems to understand?",
};

const sectionId = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export function InsightArticleLayout({ article }: { article: InsightArticle }) {
  const category = getCategory(article.category);
  const heroImage = getInsightImage(article.slug);

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
    { name: category?.name ?? "Insights", path: `/insights/${article.category}` },
    { name: article.title, path: `/insights/${article.category}/${article.slug}` },
  ];

  return (
    <>
      <header className="relative isolate overflow-hidden bg-ink text-ink-foreground">
        <LiquidKnowledgeSphere className="pointer-events-none absolute -right-16 top-6 hidden h-[24rem] w-[18rem] opacity-40 lg:block" />
        <div className="container-wide relative py-14 md:py-20">
          <div className="text-ink-muted">
            <Breadcrumbs items={crumbs} />
          </div>
          <p className="eyebrow mt-8 text-gradient">
            {category?.name} · {article.searchIntent}
          </p>
          <h1 className="display-2 mt-4 max-w-4xl">{article.title}</h1>
          <p className="lede mt-6 max-w-3xl text-ink-muted">{article.excerpt}</p>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-muted">
            <div>
              <dt className="sr-only">Author</dt>
              <dd>
                {article.author.name} — {article.author.role}
              </dd>
            </div>
            <div>
              <dt className="sr-only">Published</dt>
              <dd>
                Published{" "}
                <time dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Updated</dt>
              <dd>
                Updated{" "}
                <time dateTime={article.updatedAt}>
                  {new Date(article.updatedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </dd>
            </div>
            <div>
              <dt className="sr-only">Reading time</dt>
              <dd>{article.readingMinutes} min read</dd>
            </div>
          </dl>
        </div>
      </header>

      {heroImage && (
        <figure className="container-wide -mt-6 md:-mt-10">
          <img
            src={heroImage.src}
            alt={heroImage.alt}
            width={heroImage.width}
            height={heroImage.height}
            className="aspect-[16/9] w-full rounded-3xl border border-border object-cover"
          />
          <figcaption className="mt-3 text-sm text-muted-foreground">
            {heroImage.caption}
          </figcaption>
        </figure>
      )}

      <div className="container-wide grid gap-12 py-14 lg:grid-cols-[16rem_minmax(0,1fr)] lg:py-20">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <details open className="rounded-2xl border border-border p-5 lg:open:block">
            <summary className="cursor-pointer text-sm font-semibold lg:cursor-default">
              On this page
            </summary>
            <nav aria-label="Table of contents" className="mt-4">
              <ol className="space-y-2 text-sm text-muted-foreground">
                {article.sections.map((section) => (
                  <li key={section.heading}>
                    <a href={`#${sectionId(section.heading)}`} className="hover:text-primary">
                      {section.heading}
                    </a>
                  </li>
                ))}
                {article.faqs.length > 0 && (
                  <li>
                    <a href="#faqs" className="hover:text-primary">
                      FAQs
                    </a>
                  </li>
                )}
                <li>
                  <a href="#key-takeaways" className="hover:text-primary">
                    Key takeaways
                  </a>
                </li>
              </ol>
            </nav>
          </details>
        </aside>

        <article className="max-w-[72ch]">
          {article.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-5 text-base leading-relaxed first:mt-0">
              {paragraph}
            </p>
          ))}

          {article.sections.map((section) => (
            <section
              key={section.heading}
              className="mt-12 scroll-mt-28"
              id={sectionId(section.heading)}
            >
              <h2 className="font-display text-2xl font-bold leading-snug">{section.heading}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="mt-4 leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
              {section.steps && (
                <ol className="mt-5 list-decimal space-y-2 pl-5 text-muted-foreground">
                  {section.steps.map((step) => (
                    <li key={step} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              )}
              {section.bullets && (
                <ul className="mt-5 list-disc space-y-2 pl-5 text-muted-foreground">
                  {section.bullets.map((item) => (
                    <li key={item} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {article.checklist && (
            <section className="mt-12 rounded-2xl border border-border bg-card p-6">
              <h2 className="font-display text-xl font-bold">{article.checklist.title}</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {article.checklist.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="text-primary">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {article.commonMistakes && (
            <section className="mt-10">
              <h2 className="font-display text-2xl font-bold">{article.commonMistakes.title}</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                {article.commonMistakes.items.map((item) => (
                  <li key={item} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {article.faqs.length > 0 && (
            <section id="faqs" className="mt-12 scroll-mt-28">
              <h2 className="font-display text-2xl font-bold">Frequently asked questions</h2>
              <dl className="mt-6 space-y-6">
                {article.faqs.map((faq) => (
                  <div key={faq.question}>
                    <dt className="font-semibold">{faq.question}</dt>
                    <dd className="mt-2 leading-relaxed text-muted-foreground">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <section
            id="key-takeaways"
            className="mt-12 scroll-mt-28 rounded-2xl border border-border p-6"
          >
            <h2 className="font-display text-xl font-bold">Key takeaways</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {article.keyTakeaways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          {article.sources.length > 0 && (
            <section className="mt-10">
              <h2 className="font-display text-lg font-bold">Sources</h2>
              <ul className="mt-3 space-y-2 text-sm">
                {article.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="mt-12 rounded-2xl border border-border bg-card p-6">
            <p className="eyebrow text-muted-foreground">Author</p>
            <h2 className="mt-2 font-display text-lg font-bold">{article.author.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{article.author.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Sahil is a multidisciplinary creative professional working across graphic design,
              video editing, social media, websites, photography, digital advertising, print
              communication and brand development.
            </p>
            <Link
              to="/founder"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
            >
              Meet the founder <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>

          <RelatedLinks article={article} />

          <section className="mt-12 rounded-2xl border border-ink-border bg-ink p-8 text-ink-foreground">
            <h2 className="font-display text-2xl font-bold">{CTA_COPY[article.category]}</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/start-a-project"
                className="rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold"
              >
                Start a Project
              </Link>
              <Link
                to="/gallery"
                className="rounded-full border border-ink-border px-6 py-3 text-sm font-semibold"
              >
                Explore the Gallery
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-ink-border px-6 py-3 text-sm font-semibold"
              >
                Contact Diglizer
              </Link>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}

function RelatedLinks({ article }: { article: InsightArticle }) {
  const services = article.relatedServices.map(getCapability).filter(Boolean);
  const industries = article.relatedIndustries.map(getIndustry).filter(Boolean);
  const related = article.relatedArticles.map(getArticleBySlug).filter(Boolean);

  return (
    <section className="mt-12 grid gap-8 sm:grid-cols-2">
      {services.length > 0 && (
        <div>
          <p className="eyebrow text-muted-foreground">Related services</p>
          <ul className="mt-3 space-y-2 text-sm">
            {services.map((service) => (
              <li key={service!.slug}>
                <Link
                  to="/capabilities/$slug"
                  params={{ slug: service!.slug }}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {service!.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {industries.length > 0 && (
        <div>
          <p className="eyebrow text-muted-foreground">Related industries</p>
          <ul className="mt-3 space-y-2 text-sm">
            {industries.map((industry) => (
              <li key={industry!.slug}>
                <Link
                  to="/industries/$slug"
                  params={{ slug: industry!.slug }}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {industry!.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {related.length > 0 && (
        <div>
          <p className="eyebrow text-muted-foreground">Related articles</p>
          <ul className="mt-3 space-y-2 text-sm">
            {related.map((item) => (
              <li key={item!.slug}>
                <Link
                  to="/insights/$category/$slug"
                  params={{ category: item!.category, slug: item!.slug }}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {item!.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
