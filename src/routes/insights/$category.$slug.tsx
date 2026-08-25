import { createFileRoute, notFound } from "@tanstack/react-router";

import { seo } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { InsightArticleLayout } from "@/components/insights/InsightArticleLayout";
import { getArticle, getCategory } from "@/content/insights";
import { getInsightImage } from "@/content/insights/media";

import { siteConfig, absoluteUrl } from "@/config/site";

export const Route = createFileRoute("/insights/$category/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.category, params.slug);
    if (!article) throw notFound();
    return { category: params.category, slug: params.slug };
  },
  head: ({ params }) => {
    const article = getArticle(params.category, params.slug);
    if (!article) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const image = getInsightImage(article.slug);
    return seo({
      title: article.metaTitle,
      description: article.metaDescription,
      path: `/insights/${article.category}/${article.slug}`,
      type: "article",
      ...(image ? { image: absoluteUrl(image.src) } : {}),
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    });
  },

  component: ArticlePage,
});

function ArticlePage() {
  const { category, slug } = Route.useLoaderData();
  const article = getArticle(category, slug)!;
  const categoryMeta = getCategory(article.category);
  const url = absoluteUrl(`/insights/${article.category}/${article.slug}`);

  const schema: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.metaDescription,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      ...(getInsightImage(article.slug)
        ? { image: [absoluteUrl(getInsightImage(article.slug)!.src)] }
        : {}),
      mainEntityOfPage: url,

      author: {
        "@type": "Person",
        name: article.author.name,
        jobTitle: article.author.role,
        url: siteConfig.founder.linkedin,
      },
      publisher: { "@type": "Organization", name: siteConfig.name },
      articleSection: categoryMeta?.name,
      keywords: [article.primaryKeyword, ...article.secondaryKeywords].join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { name: "Home", path: "/" },
        { name: "Insights", path: "/insights" },
        { name: categoryMeta?.name ?? "Insights", path: `/insights/${article.category}` },
        { name: article.title, path: `/insights/${article.category}/${article.slug}` },
      ].map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path),
      })),
    },
  ];

  if (article.faqs.length > 0) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: article.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return (
    <>
      <JsonLd data={schema} />
      <InsightArticleLayout article={article} />
    </>
  );
}
