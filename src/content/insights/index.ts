import type { InsightArticle, InsightCategoryMeta, InsightCategorySlug } from "./types";

import { digitalMarketingStrategySmallBusiness } from "./digital-marketing-strategy-small-business";
import { digitalMarketingCostInThane } from "./digital-marketing-cost-in-thane";
import { choosingDigitalMarketingAgencyMumbai } from "./choosing-digital-marketing-agency-mumbai";
import { healthcareDigitalMarketingStrategyCompliance } from "./healthcare-digital-marketing-strategy-compliance";
import { digitalMarketingForEducationalInstitutions } from "./digital-marketing-for-educational-institutions";
import { performanceMarketingStrategy } from "./performance-marketing-strategy";
import { metaAdsFunnelLocalBusinesses } from "./meta-ads-funnel-local-businesses";
import { seoStrategyForBeginners } from "./seo-strategy-for-beginners";
import { localSeoGuideForThaneBusinesses } from "./local-seo-guide-for-thane-businesses";
import { websiteSeoChecklistForGrowingBusinesses } from "./website-seo-checklist-for-growing-businesses";
import { generativeEngineOptimizationCompleteGuide } from "./generative-engine-optimization-complete-guide";
import { improveBrandVisibilityChatgptGemini } from "./improve-brand-visibility-chatgpt-gemini";

export type { InsightArticle, InsightCategorySlug, InsightCategoryMeta } from "./types";

/**
 * Hand-written, published articles. The 1,250-record editorial backlog lives in
 * the database (insight_topics) and is never published automatically.
 */
export const articles: InsightArticle[] = [
  digitalMarketingStrategySmallBusiness,
  digitalMarketingCostInThane,
  choosingDigitalMarketingAgencyMumbai,
  healthcareDigitalMarketingStrategyCompliance,
  digitalMarketingForEducationalInstitutions,
  performanceMarketingStrategy,
  metaAdsFunnelLocalBusinesses,
  seoStrategyForBeginners,
  localSeoGuideForThaneBusinesses,
  websiteSeoChecklistForGrowingBusinesses,
  generativeEngineOptimizationCompleteGuide,
  improveBrandVisibilityChatgptGemini,
];

export const publishedArticles: InsightArticle[] = articles
  .filter((a) => a.status === "Published")
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

export const insightCategories: InsightCategoryMeta[] = [
  {
    slug: "digital-marketing",
    dbCategory: "Digital Marketing",
    name: "Digital Marketing",
    description:
      "Strategy, channels and planning — how the separate parts of marketing work as one connected system.",
  },
  {
    slug: "performance-marketing",
    dbCategory: "Performance Marketing",
    name: "Performance Marketing",
    description:
      "Paid media, creative and measurement — turning attention into enquiries you can actually track.",
  },
  {
    slug: "seo",
    dbCategory: "SEO",
    name: "SEO",
    description:
      "Technical foundations, on-page work, local search and content structure that makes a site discoverable.",
  },
  {
    slug: "ai-seo-geo",
    dbCategory: "AI SEO & GEO",
    name: "AI SEO & GEO",
    description:
      "Generative engine optimisation — helping AI systems understand and represent your brand accurately.",
  },
];

export const getCategory = (slug: string): InsightCategoryMeta | undefined =>
  insightCategories.find((c) => c.slug === slug);

export const articlesByCategory = (slug: InsightCategorySlug): InsightArticle[] =>
  publishedArticles.filter((a) => a.category === slug);

export const getArticle = (category: string, slug: string): InsightArticle | undefined =>
  publishedArticles.find((a) => a.category === category && a.slug === slug);

export const getArticleBySlug = (slug: string): InsightArticle | undefined =>
  publishedArticles.find((a) => a.slug === slug);

export const articleRoutes = (): string[] =>
  publishedArticles.map((a) => `/insights/${a.category}/${a.slug}`);

export const featuredArticle = (): InsightArticle | undefined => publishedArticles[0];

export const articlesTagged = (tag: string): InsightArticle[] =>
  publishedArticles.filter((a) =>
    [...a.tags, a.subcategory].some((t) => t.toLowerCase().includes(tag.toLowerCase())),
  );

export const publishedCount = (slug: InsightCategorySlug): number => articlesByCategory(slug).length;
