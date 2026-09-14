/**
 * Central editable configuration for Diglizer Solution.
 * Every contact detail, social link, analytics ID and verification token lives
 * here. Leave a value as an empty string to hide that item gracefully in the UI.
 *
 * `domain` is the single source of truth for canonical URLs, Open Graph URLs,
 * the sitemap and structured data. Change it here when the production custom
 * domain goes live and every generated URL follows.
 */

import fullLogo from "@/assets/diglizer-logo-full.webp.asset.json";
import iconLogo from "@/assets/diglizer-logo-icon.webp.asset.json";

export const siteConfig = {
  name: "Diglizer Solution",
  shortName: "Diglizer",
  domain: "https://diglizersolution.com",
  tagline: "Creativity. Technology. Growth.",
  description:
    "Diglizer Solution is an independent creative, technology and digital growth company helping ambitious brands build stronger identities, digital experiences and measurable growth.",
  positioning:
    "Independent creative, technology and digital growth company based in the Mumbai Metropolitan Region.",

  /* Contact — empty values are hidden in the interface until confirmed. */
  contact: {
    email: "diglizersolution@gmail.com",
    phone: "+91 84248 84119",
    whatsapp: "918424884119",
    addressLocality: "Thane",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
    serviceAreas: ["Thane", "Mumbai", "Navi Mumbai", "Maharashtra", "India"],
    businessHours: "",
    googleBusinessProfile: "",
    googleReviewLink: "",
  },

  /* Official Diglizer Solution company profiles. */
  social: {
    instagram: "https://www.instagram.com/diglizersolution/",
    linkedin: "https://in.linkedin.com/company/diglizer-solution",
    facebook: "https://www.facebook.com/diglizersolutions",
    youtube: "",
    behance: "",
  },

  analytics: {
    ga4MeasurementId: "",
    gtmContainerId: "",
    metaPixelId: "",
    clarityProjectId: "",
    googleAdsConversionId: "",
    googleSiteVerification: "",
    bingSiteVerification: "",
  },

  logos: {
    full: fullLogo.url,
    icon: iconLogo.url,
    favicon: "/favicon.png",
    appleTouchIcon: "/apple-touch-icon.png",
    appIcon512: "/app-icon-512.png",
  },

  /* Personal profiles of the founder — kept separate from company profiles. */
  founder: {
    name: "Sahil Vishwakarma",
    role: "Founder and Creative Director",
    linkedin: "https://www.linkedin.com/in/iamsahilvishwakarma/",
    instagram: "https://www.instagram.com/iamsahilvishwakarma/",
    facebook: "https://www.facebook.com/iamsahilvishwakarma",
    linkedinLabel: "Sahil Vishwakarma — Founder, Diglizer Solution",
    sameAs: [
      "https://www.linkedin.com/in/iamsahilvishwakarma/",
      "https://www.instagram.com/iamsahilvishwakarma/",
      "https://www.facebook.com/iamsahilvishwakarma",
    ] as string[],
  },
};

/** Ready-to-use hrefs. Empty string when the detail is not configured. */
export const telHref = () =>
  siteConfig.contact.phone ? `tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}` : "";

export const mailtoHref = () =>
  siteConfig.contact.email ? `mailto:${siteConfig.contact.email}` : "";


export type SocialKey = keyof typeof siteConfig.social;

export const socialLabels: Record<SocialKey, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  youtube: "YouTube",
  behance: "Behance",
};

export const activeSocialLinks = () =>
  (Object.keys(siteConfig.social) as SocialKey[])
    .filter((key) => siteConfig.social[key])
    .map((key) => ({ key, label: socialLabels[key], href: siteConfig.social[key] }));

/** Personal profiles of the founder, for the Founder page only. */
export const founderSocialLinks = () =>
  (
    [
      { key: "linkedin", label: "LinkedIn", href: siteConfig.founder.linkedin },
      { key: "instagram", label: "Instagram", href: siteConfig.founder.instagram },
      { key: "facebook", label: "Facebook", href: siteConfig.founder.facebook },
    ] as const
  ).filter((item) => item.href);

export const whatsappHref = () =>
  siteConfig.contact.whatsapp
    ? `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`
    : "";

export const absoluteUrl = (path: string) =>
  `${siteConfig.domain}${path.startsWith("/") ? path : `/${path}`}`;
