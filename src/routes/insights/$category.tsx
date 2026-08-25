import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { seo, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, FinalCta } from "@/components/layout/SiteLayout";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { articlesByCategory, getCategory, insightCategories } from "@/content/insights";
import type { InsightCategorySlug } from "@/content/insights";
import { getClusters } from "@/lib/insights.functions";

const BEHAVIOUR: Record<InsightCategorySlug, string> = {
  "digital-marketing":
    "Several channel streams merge into one connected strategy — the guides here treat marketing as a single system rather than a list of tactics.",
  "performance-marketing":
    "Attention passes through a measured conversion path. These guides cover structure, creative and measurement without inventing benchmark numbers.",
  seo: "Disconnected pages become a structured, searchable information network — technical foundations, on-page work, local search and content architecture.",
  "ai-seo-geo":
    "Content becomes part of a generative answer layer. We explain generative engine optimisation accurately, with no claims about guaranteed inclusion in AI answers.",
};

const FAQS: Record<InsightCategorySlug, { q: string; a: string }[]> = {
  "digital-marketing": [
    {
      q: "Where should a small business start?",
      a: "With positioning and one channel executed properly, rather than a presence on every platform at once.",
    },
    {
      q: "How long before results appear?",
      a: "Paid channels can produce enquiries quickly; organic search, content and brand recognition compound over months. Anyone promising fixed timelines without seeing your market is guessing.",
    },
  ],
  "performance-marketing": [
    {
      q: "Is a bigger budget always better?",
      a: "No. Weak creative and unclear offers scale losses as efficiently as they scale wins. Structure and creative come first.",
    },
    {
      q: "Which metrics actually matter?",
      a: "The ones tied to business outcomes — qualified enquiries and cost per acquisition — not reach or impressions in isolation.",
    },
  ],
  seo: [
    {
      q: "Do I need to publish content constantly?",
      a: "No. A smaller number of thorough, maintained pages usually outperforms a large volume of thin ones.",
    },
    {
      q: "Is local SEO different?",
      a: "Yes. Local visibility depends heavily on an accurate business profile, consistent details and genuinely local relevance.",
    },
  ],
  "ai-seo-geo": [
    {
      q: "Can you guarantee my brand appears in AI answers?",
      a: "No, and nobody honestly can. What you can do is make your information clear, consistent, well-structured and verifiable so AI systems can represent it correctly.",
    },
    {
      q: "Is GEO separate from SEO?",
      a: "It overlaps heavily. Clear structure, accurate entity information and credible sources serve both.",
    },
  ],
};

export const Route = createFileRoute("/insights/$category")({
  loader: async ({ params }) => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    const clusters = await getClusters({
      data: { category: category.dbCategory, limit: 12, offset: 0 },
    });
    return { categorySlug: category.slug, clusters };
  },
  head: ({ params }) => {
    const category = getCategory(params.category);
    if (!category) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    return seo({
      title: `${category.name} Insights | Diglizer Solution`,
      description: category.description,
      path: `/insights/${category.slug}`,
    });
  },
  component: CategoryHub,
});

function CategoryHub() {
  const { categorySlug, clusters } = Route.useLoaderData();
  const category = getCategory(categorySlug)!;
  const articles = articlesByCategory(category.slug);
  const pillars = articles.filter((a) => a.pillarOrSupporting === "Pillar");
  const supporting = articles.filter((a) => a.pillarOrSupporting === "Supporting");

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
    { name: category.name, path: `/insights/${category.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        liquid="network"
        eyebrow={category.name}
        title={`${category.name} guidance you can act on.`}
        lede={category.description}
        breadcrumbs={crumbs}
      />

      <section className="section-y-compact">
        <div className="container-wide max-w-3xl">
          <p className="leading-relaxed text-muted-foreground">{BEHAVIOUR[category.slug]}</p>
        </div>
      </section>

      {pillars.length > 0 && (
        <section className="section-y-compact">
          <div className="container-wide">
            <p className="eyebrow text-gradient">Primary guides</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {pillars.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {supporting.length > 0 && (
        <section className="section-y-compact">
          <div className="container-wide">
            <p className="eyebrow text-gradient">Supporting articles</p>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {supporting.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-y bg-ink text-ink-foreground">
        <div className="container-wide">
          <p className="eyebrow text-gradient">Editorial library</p>
          <h2 className="mt-4 font-display text-2xl font-bold md:text-3xl">
            Topic clusters in {category.name}.
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {clusters.clusters.map((cluster) => (
              <li key={cluster.id} className="rounded-2xl border border-ink-border p-5">
                <p className="font-display text-base font-bold leading-snug">
                  {cluster.pillar_title}
                </p>
                <p className="mt-2 text-xs text-ink-muted">
                  {cluster.topic_count} source topics merged into one planned pillar
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-ink-muted">
            {clusters.total} clusters in this category. Only written and reviewed articles are
            published.
          </p>
        </div>
      </section>

      <section className="section-y-compact">
        <div className="container-wide grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-gradient">Category FAQs</p>
            <dl className="mt-6 space-y-6">
              {FAQS[category.slug].map((faq) => (
                <div key={faq.q}>
                  <dt className="font-semibold">{faq.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="eyebrow text-gradient">Other categories</p>
            <ul className="mt-6 space-y-3 text-sm">
              {insightCategories
                .filter((c) => c.slug !== category.slug)
                .map((c) => (
                  <li key={c.slug}>
                    <Link
                      to="/insights/$category"
                      params={{ category: c.slug }}
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              <li>
                <Link to="/work" className="text-primary underline-offset-4 hover:underline">
                  Related case studies in Work
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
