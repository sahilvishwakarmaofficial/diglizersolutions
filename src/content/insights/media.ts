/**
 * Central Insights image registry.
 *
 * Every published article is permanently locked to exactly one image. The
 * files live in /public/media/insights/ and are never rotated, randomised or
 * reused across articles. To change an article's image, replace the file at
 * the same path — do not point two articles at one entry.
 *
 * Images are original brand-commissioned editorial artwork produced for
 * Diglizer Solution, so they carry no third-party licensing obligation.
 */

export interface InsightImage {
  /** Absolute path served from /public. */
  src: string;
  /** Descriptive alt text; never the article title, never keyword stuffing. */
  alt: string;
  /** Short caption shown under the hero image. */
  caption: string;
  width: number;
  height: number;
}

const IMAGE_DIR = "/media/insights";

export const insightImages: Record<string, InsightImage> = {
  "digital-marketing-strategy-for-small-businesses": {
    src: `${IMAGE_DIR}/digital-marketing-strategy-small-business.jpg`,
    alt: "A small business owner arranging printed marketing plans and a channel calendar on a desk",
    caption: "A written plan turns scattered marketing activity into decisions you can review.",
    width: 1600,
    height: 912,
  },
  "how-much-does-digital-marketing-cost-in-thane": {
    src: `${IMAGE_DIR}/digital-marketing-cost-in-thane.jpg`,
    alt: "A business owner and a consultant reviewing a printed scope of work across a meeting table",
    caption: "Cost follows scope — the conversation that matters is about deliverables, not rate cards.",
    width: 1600,
    height: 912,
  },
  "how-to-choose-a-digital-marketing-agency-in-mumbai": {
    src: `${IMAGE_DIR}/choosing-digital-marketing-agency-mumbai.jpg`,
    alt: "Several agency portfolios and capability decks laid out side by side on a desk for comparison",
    caption: "Compare agencies on relevant work and clear thinking, not on presentation polish alone.",
    width: 1600,
    height: 912,
  },
  "digital-marketing-for-educational-institutions": {
    src: `${IMAGE_DIR}/digital-marketing-for-educational-institutions.jpg`,
    alt: "An admissions counsellor speaking with a student and a parent at an institutional enquiry desk",
    caption: "Education marketing has two audiences in one conversation: the student and the parent.",
    width: 1600,
    height: 912,
  },
  "performance-marketing-strategy": {
    src: `${IMAGE_DIR}/performance-marketing-strategy.jpg`,
    alt: "A marketing specialist reviewing campaign performance dashboards on two monitors",
    caption: "Performance marketing is a measurement discipline before it is a media discipline.",
    width: 1600,
    height: 912,
  },
  "meta-ads-funnel-for-local-businesses": {
    src: `${IMAGE_DIR}/meta-ads-funnel-local-businesses.jpg`,
    alt: "A local shop owner filming a short vertical product video on a phone inside their store",
    caption: "Local funnels are won on honest, specific creative more than on clever targeting.",
    width: 1600,
    height: 912,
  },
  "healthcare-digital-marketing-strategy-and-compliance": {
    src: `${IMAGE_DIR}/healthcare-digital-marketing-strategy-compliance.jpg`,
    alt: "A hospital communications coordinator reviewing patient information leaflets at a clinic reception",
    caption: "In healthcare, clarity and restraint build more trust than persuasion does.",
    width: 1600,
    height: 912,
  },
  "seo-strategy-for-beginners": {
    src: `${IMAGE_DIR}/seo-strategy-for-beginners.jpg`,
    alt: "A desk with a laptop showing a site structure diagram beside a hand-drawn sitemap in a notebook",
    caption: "SEO starts with structure — what exists, how it is organised and how it is found.",
    width: 1600,
    height: 912,
  },
  "local-seo-guide-for-thane-businesses": {
    src: `${IMAGE_DIR}/local-seo-guide-for-thane-businesses.jpg`,
    alt: "A shopkeeper checking a phone at their storefront on a busy Thane market street",
    caption: "Local search is where nearby intent meets the details you control.",
    width: 1600,
    height: 912,
  },
  "website-seo-checklist-for-growing-businesses": {
    src: `${IMAGE_DIR}/website-seo-checklist-for-growing-businesses.jpg`,
    alt: "A printed website audit checklist with several items ticked, beside a laptop showing a page speed gauge",
    caption: "A checklist keeps technical SEO from becoming a matter of opinion.",
    width: 1600,
    height: 912,
  },
  "generative-engine-optimization-complete-guide": {
    src: `${IMAGE_DIR}/generative-engine-optimization-complete-guide.jpg`,
    alt: "Abstract network of glowing violet and pink nodes connected by fine threads of light",
    caption: "Generative engines read your brand as a set of connected, verifiable facts.",
    width: 1600,
    height: 912,
  },
  "how-to-improve-brand-visibility-in-chatgpt-and-gemini": {
    src: `${IMAGE_DIR}/improve-brand-visibility-chatgpt-gemini.jpg`,
    alt: "A person reading an AI assistant reply on a smartphone in a dimly lit room",
    caption: "AI assistants answer from sources — consistency across them is the real work.",
    width: 1600,
    height: 912,
  },
};

export const getInsightImage = (slug: string): InsightImage | undefined => insightImages[slug];
