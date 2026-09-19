import { getArticleBySlug, type InsightArticle } from "./insights";

/**
 * Editorially chosen article pairings so every capability and industry page
 * offers crawlable, relevant links into the Insights library.
 */
const capabilityMap: Record<string, string[]> = {
  "strategy-consulting": [
    "digital-marketing-strategy-for-small-businesses",
    "how-to-choose-a-digital-marketing-agency-in-mumbai",
    "how-much-does-digital-marketing-cost-in-thane",
  ],
  "brand-creative": [
    "digital-marketing-strategy-for-small-businesses",
    "how-to-choose-a-digital-marketing-agency-in-mumbai",
  ],
  "social-media": [
    "meta-ads-funnel-for-local-businesses",
    "digital-marketing-strategy-for-small-businesses",
  ],
  "video-content": [
    "meta-ads-funnel-for-local-businesses",
    "digital-marketing-for-educational-institutions",
  ],
  "websites-technology": [
    "website-seo-checklist-for-growing-businesses",
    "seo-strategy-for-beginners",
    "generative-engine-optimization-complete-guide",
  ],
  "performance-marketing": [
    "performance-marketing-strategy",
    "meta-ads-funnel-for-local-businesses",
    "how-much-does-digital-marketing-cost-in-thane",
  ],
  "photography-production": [
    "digital-marketing-strategy-for-small-businesses",
    "meta-ads-funnel-for-local-businesses",
  ],
  "packaging-print": [
    "how-to-choose-a-digital-marketing-agency-in-mumbai",
    "digital-marketing-strategy-for-small-businesses",
  ],
};

const industryMap: Record<string, string[]> = {
  "healthcare-fertility-hospitals": [
    "healthcare-digital-marketing-strategy-and-compliance",
    "local-seo-guide-for-thane-businesses",
    "meta-ads-funnel-for-local-businesses",
  ],
  "medical-products-b2b-healthcare": [
    "healthcare-digital-marketing-strategy-and-compliance",
    "website-seo-checklist-for-growing-businesses",
  ],
  "education-learning": [
    "digital-marketing-for-educational-institutions",
    "meta-ads-funnel-for-local-businesses",
  ],
  "government-public-service": [
    "digital-marketing-strategy-for-small-businesses",
    "local-seo-guide-for-thane-businesses",
  ],
  "travel-hospitality-community": [
    "local-seo-guide-for-thane-businesses",
    "meta-ads-funnel-for-local-businesses",
  ],
  "fashion-jewellery-lifestyle": [
    "meta-ads-funnel-for-local-businesses",
    "performance-marketing-strategy",
  ],
  "culture-events-entertainment": [
    "meta-ads-funnel-for-local-businesses",
    "digital-marketing-strategy-for-small-businesses",
  ],
  "technology-professional-services": [
    "generative-engine-optimization-complete-guide",
    "how-to-improve-brand-visibility-in-chatgpt-and-gemini",
    "website-seo-checklist-for-growing-businesses",
  ],
  "mobility-automotive-ev-technology": [
    "performance-marketing-strategy",
    "how-much-does-digital-marketing-cost-in-thane",
  ],
};

function resolve(slugs: string[] | undefined): InsightArticle[] {
  if (!slugs) return [];
  return slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is InsightArticle => Boolean(article));
}

export const insightsForCapability = (slug: string): InsightArticle[] =>
  resolve(capabilityMap[slug]);

export const insightsForIndustry = (slug: string): InsightArticle[] => resolve(industryMap[slug]);
