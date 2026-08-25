import type { LiquidState } from "./LiquidBrandObject";

export type LiquidVariant = { state: LiquidState; hue: number };

const fallback: LiquidVariant = { state: "portal", hue: 0 };

/**
 * One material, many meaningful states. Each service page gets the liquid form
 * that best explains what that capability actually does for a business.
 */
const capabilityMap: Record<string, LiquidVariant> = {
  "strategy-consulting": { state: "nodes", hue: 0 },
  "brand-creative": { state: "grid", hue: -8 },
  "social-media": { state: "timeline", hue: 12 },
  "video-content": { state: "timeline", hue: -18 },
  "websites-technology": { state: "portal", hue: 6 },
  "performance-marketing": { state: "funnel", hue: 18 },
  "photography-production": { state: "capability", hue: -12 },
  "packaging-print": { state: "surface", hue: 24 },
};

/**
 * Nine industry environments — one template, controlled variation in form,
 * movement and lighting rather than nine unrelated identities.
 */
const industryMap: Record<string, LiquidVariant> = {
  "healthcare-fertility-hospitals": { state: "portal", hue: -6 },
  "medical-products-b2b-healthcare": { state: "grid", hue: 8 },
  "education-learning": { state: "capability", hue: -16 },
  "government-public-service": { state: "surface", hue: 14 },
  "travel-hospitality-community": { state: "growth", hue: -22 },
  "fashion-jewellery-lifestyle": { state: "monogram", hue: 20 },
  "culture-events-entertainment": { state: "timeline", hue: -28 },
  "technology-professional-services": { state: "network", hue: 4 },
  "mobility-automotive-ev-technology": { state: "growth", hue: 30 },
};

export const capabilityLiquid = (slug: string): LiquidVariant => capabilityMap[slug] ?? fallback;
export const industryLiquid = (slug: string): LiquidVariant => industryMap[slug] ?? fallback;
