import { capabilities } from "./capabilities";
import { industries } from "./industries";

export const mainNav = [
  { label: "Work", to: "/work" },
  { label: "Clients", to: "/clients" },
  { label: "Capabilities", to: "/capabilities" },
  { label: "Industries", to: "/industries" },
  { label: "About", to: "/about" },
  { label: "Insights", to: "/insights" },
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

export const footerLegal = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms", to: "/terms" },
  { label: "Cookie Policy", to: "/cookie-policy" },
  { label: "Accessibility", to: "/accessibility" },
];

export const footerCompany = [
  { label: "Work", to: "/work" },
  { label: "Clients", to: "/clients" },
  { label: "Capabilities", to: "/capabilities" },
  { label: "Industries", to: "/industries" },
  { label: "About", to: "/about" },
  { label: "Founder", to: "/founder" },
  { label: "Insights", to: "/insights" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];
