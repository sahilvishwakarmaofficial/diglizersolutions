import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";

import { seo, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, FinalCta } from "@/components/layout/SiteLayout";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { LiquidKnowledgeSphere } from "@/components/insights/LiquidKnowledgeSphere";
import {
  publishedArticles,
  insightCategories,
  articlesByCategory,
  articlesTagged,
  featuredArticle,
} from "@/content/insights";
import { getClusters, getLibrarySummary } from "@/lib/insights.functions";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Insights", path: "/insights" },
];

export const Route = createFileRoute("/insights/")({
  head: () =>
    seo({
      title: "Digital Marketing, Creative & Technology Insights | Diglizer Solution",
      description:
        "Practical guidance across digital marketing, performance marketing, SEO and AI-search visibility from Diglizer Solution, an independent creative and growth company in Thane.",
      path: "/insights",
    }),
  loader: async () => {
    const [summary, clusters] = await Promise.all([
      getLibrarySummary(),
      getClusters({ data: { limit: 12, offset: 0 } }),
    ]);
    return { summary, clusters };
  },
  component: InsightsHub,
});

const PAGE_SIZE = 12;

function InsightsHub() {
  const { summary, clusters } = Route.useLoaderData();
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const featured = featuredArticle();

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(query.trim().toLowerCase()), 250);
    return () => window.clearTimeout(id);
  }, [query]);

  const results = useMemo(() => {
    if (!debounced) return publishedArticles;
    return publishedArticles.filter((article) =>
      [article.title, article.excerpt, article.primaryKeyword, article.subcategory, ...article.tags]
        .join(" ")
        .toLowerCase()
        .includes(debounced),
    );
  }, [debounced]);

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        liquid="none"
        eyebrow="Insights"
        title="Intelligence designed to be useful."
        lede="Practical guidance across digital marketing, performance, SEO and AI-search visibility—shaped by creative and digital experience."
        breadcrumbs={crumbs}
      >
        <LiquidKnowledgeSphere className="pointer-events-none absolute -right-10 top-1/2 hidden h-[26rem] w-[20rem] -translate-y-1/2 opacity-60 lg:block" />
        <p className="mt-8 text-sm text-ink-muted">
          {publishedArticles.length} published guides · {summary.totalClusters} keyword clusters ·{" "}
          {summary.totalTopics.toLocaleString("en-IN")} topics in the editorial library
        </p>
      </PageHero>

      {featured && (
        <section className="section-y-compact">
          <div className="container-wide">
            <p className="eyebrow text-gradient">Featured insight</p>
            <div className="mt-6 grid gap-8 rounded-[2rem] border border-border bg-card p-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <h2 className="font-display text-2xl font-bold leading-snug md:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
                <Link
                  to="/insights/$category/$slug"
                  params={{ category: featured.category, slug: featured.slug }}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold"
                >
                  Read the guide <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <LiquidKnowledgeSphere className="hidden h-56 w-full lg:block" />
            </div>
          </div>
        </section>
      )}

      <section className="section-y-compact">
        <div className="container-wide">
          <p className="eyebrow text-gradient">Category portals</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {insightCategories.map((category) => (
              <Link
                key={category.slug}
                to="/insights/$category"
                params={{ category: category.slug }}
                className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1"
              >
                <h2 className="font-display text-lg font-bold">{category.name}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {category.description}
                </p>
                <p className="mt-4 text-xs text-muted-foreground">
                  {articlesByCategory(category.slug).length} published guides
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-gradient">Latest articles</p>
              <h2 className="display-2 mt-4">Guides worth your time.</h2>
            </div>
            <label className="w-full max-w-sm text-sm">
              <span className="sr-only">Search insights</span>
              <span className="relative block">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search strategies, guides and insights…"
                  className="w-full rounded-full border border-border bg-background py-3 pl-11 pr-4 text-sm outline-none focus:border-primary"
                />
              </span>
            </label>
          </div>

          {debounced && (
            <p className="mt-5 text-sm text-muted-foreground">
              {results.length} result{results.length === 1 ? "" : "s"} for “{query}”.{" "}
              <button
                type="button"
                onClick={() => setQuery("")}
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                Clear filters
              </button>
            </p>
          )}

          {results.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-border p-8">
              <p className="font-semibold">No guides match that search yet.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a broader term, or explore a category portal above. New guides are published
                regularly from our editorial library.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {results.slice(0, visible).map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
              {results.length > visible && (
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="mt-10 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:border-primary hover:text-primary"
                >
                  Load more guides
                </button>
              )}
            </>
          )}
        </div>
      </section>

      <TopicCollection
        eyebrow="Local business resources"
        title="Guidance for Thane and Mumbai businesses."
        tag="local"
      />
      <TopicCollection
        eyebrow="Healthcare and education marketing"
        title="Communication in regulated and considered categories."
        tag="healthcare"
        extraTag="education"
      />
      <TopicCollection
        eyebrow="AI search and GEO"
        title="Being understood by AI systems, not just search engines."
        tag="ai"
      />

      <section className="section-y bg-ink text-ink-foreground">
        <div className="container-wide">
          <p className="eyebrow text-gradient">Explore by topic</p>
          <h2 className="display-2 mt-4 max-w-3xl">
            {summary.totalTopics.toLocaleString("en-IN")} researched topics, organised into{" "}
            {summary.totalClusters} clusters.
          </h2>
          <p className="lede mt-6 max-w-3xl text-ink-muted">
            Our editorial library holds every researched topic as a source record. Overlapping
            variations are merged into one authoritative pillar rather than published as near
            duplicate pages, so nothing competes with itself in search.
          </p>

          <ul className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {clusters.clusters.map((cluster) => (
              <li key={cluster.id} className="rounded-2xl border border-ink-border p-5">
                <p className="eyebrow text-ink-muted">{cluster.category}</p>
                <p className="mt-2 font-display text-base font-bold leading-snug">
                  {cluster.pillar_title}
                </p>
                <p className="mt-2 text-xs text-ink-muted">
                  {cluster.topic_count} source topics merged · status: Imported Idea
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-ink-muted">
            Showing {clusters.clusters.length} of {clusters.total} clusters. Imported ideas are not
            published, indexed or listed as articles until they are written and reviewed.
          </p>
        </div>
      </section>

      <FinalCta
        title="Want guidance applied to your business, not just read about?"
        copy="Tell us what you are building, changing or trying to grow."
      />
    </>
  );
}

function TopicCollection({
  eyebrow,
  title,
  tag,
  extraTag,
}: {
  eyebrow: string;
  title: string;
  tag: string;
  extraTag?: string;
}) {
  const items = [...articlesTagged(tag), ...(extraTag ? articlesTagged(extraTag) : [])].filter(
    (article, index, all) => all.findIndex((a) => a.slug === article.slug) === index,
  );
  if (items.length === 0) return null;

  return (
    <section className="section-y-compact">
      <div className="container-wide">
        <p className="eyebrow text-gradient">{eyebrow}</p>
        <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">{title}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.slice(0, 3).map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
