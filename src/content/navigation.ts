import { capabilities } from "./capabilities";
import { industries } from "./industries";

export const mainNav = [
  { label: "Work", to: "/work" },
  { label: "Gallery", to: "/gallery" },
  { label: "Services", to: "/capabilities" },
  { label: "Industries", to: "/industries" },
  { label: "Insights", to: "/insights" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const capabilityNav = capabilities.map((c) => ({
  label: c.name,
  to: `/capabilities/${c.slug}`,
  description: c.summary,
  group: c.group,
}));

export const industryNav = industries.map((i) => ({
  label: i.name,
  to: `/industries/${i.slug}`,
  description: i.summary,
}));

export const insightsNav = [
  {
    label: "All Insights",
    to: "/insights",
    description: "Explore all published strategies, guides and practical resources.",
  },
  {
    label: "Digital Marketing",
    to: "/insights/digital-marketing",
    description: "Strategy, channels, content and connected digital growth.",
  },
  {
    label: "Performance Marketing",
    to: "/insights/performance-marketing",
    description: "Campaigns, funnels, advertising creative and conversion.",
  },
  {
    label: "SEO",
    to: "/insights/seo",
    description: "Search strategy, local visibility, technical foundations and content.",
  },
  {
    label: "AI SEO & GEO",
    to: "/insights/ai-seo-geo",
    description: "Generative Engine Optimization and AI-search discoverability.",
  },
];

export const insightsFeatured = {
  label: "Digital Marketing Strategy for Small Businesses",
  to: "/insights/digital-marketing/digital-marketing-strategy-for-small-businesses",
};

export const footerInsights = insightsNav;

export const footerLegal = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms", to: "/terms" },
  { label: "Cookie Policy", to: "/cookie-policy" },
  { label: "Accessibility", to: "/accessibility" },
];

export const footerCompany = [
  { label: "Work", to: "/work" },
  { label: "Gallery", to: "/gallery" },
  { label: "Services", to: "/capabilities" },
  { label: "Industries", to: "/industries" },
  { label: "About", to: "/about" },
  { label: "Insights", to: "/insights" },
  { label: "Founder", to: "/founder" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
  { label: "Start a Project", to: "/start-a-project" },
];
