/**
 * Editorial content model for the Insights system.
 * These types describe hand-written, published articles that live in
 * src/content/insights/*.ts. They are intentionally independent of the
 * Supabase insight_topics / insight_clusters tables, which hold the full
 * 1,250-topic editorial backlog (see src/lib/insights.functions.ts).
 */

export type InsightCategorySlug =
  | "digital-marketing"
  | "performance-marketing"
  | "seo"
  | "ai-seo-geo";

export interface InsightCategoryMeta {
  slug: InsightCategorySlug;
  /** Matches the `category` column in insight_topics / insight_clusters. */
  dbCategory: "Digital Marketing" | "Performance Marketing" | "SEO" | "AI SEO & GEO";
  name: string;
  description: string;
}

export type SearchIntent = "Informational" | "Commercial" | "Transactional" | "Navigational";
export type PillarOrSupporting = "Pillar" | "Supporting";
export type CtaType = "start-a-project" | "contact" | "capability" | "industry";

export interface InsightFaq {
  question: string;
  answer: string;
}

export interface InsightSection {
  heading: string;
  paragraphs?: string[];
  /** Rendered as an ordered list when present. */
  steps?: string[];
  /** Rendered as a bulleted list when present. */
  bullets?: string[];
}

export interface InsightArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: InsightCategorySlug;
  subcategory: string;
  tags: string[];
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: SearchIntent;
  /** insight_clusters.slug this article maps to. */
  clusterSlug: string;
  pillarOrSupporting: PillarOrSupporting;
  author: {
    name: string;
    role: string;
  };
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  metaTitle: string;
  metaDescription: string;
  heroImageDirection: string;

  intro: string[];
  sections: InsightSection[];
  checklist?: { title: string; items: string[] };
  commonMistakes?: { title: string; items: string[] };
  faqs: InsightFaq[];
  keyTakeaways: string[];

  /** Slugs from src/content/capabilities.ts */
  relatedServices: string[];
  /** Slugs from src/content/industries.ts */
  relatedIndustries: string[];
  /** Slugs from src/content/projects.ts */
  relatedCaseStudies: string[];
  /** Slugs of other insight articles. */
  relatedArticles: string[];

  ctaType: CtaType;
  sources: { label: string; url: string }[];

  status: "Published";
}
