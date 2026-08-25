/**
 * Central editable configuration for Diglizer Solution.
 * Every contact detail, social link, analytics ID and verification token lives
 * here. Leave a value as an empty string to hide that item gracefully in the UI.
 */

import fullLogo from "@/assets/diglizer-logo-full.webp.asset.json";
import iconLogo from "@/assets/diglizer-logo-icon.webp.asset.json";

export const siteConfig = {
  name: "Diglizer Solution",
  shortName: "Diglizer",
  domain: "https://diglizer.com",
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

  social: {
    instagram: "",
    linkedin: "https://in.linkedin.com/in/sahil-vishwakarma-designer",
    facebook: "",
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

  founder: {
    name: "Sahil Vishwakarma",
    role: "Founder and Creative Director",
    linkedin: "https://in.linkedin.com/in/sahil-vishwakarma-designer",
    linkedinLabel: "Sahil Vishwakarma — Founder, Diglizer Solution",
    sameAs: ["https://in.linkedin.com/in/sahil-vishwakarma-designer"] as string[],
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

export const whatsappHref = () =>
  siteConfig.contact.whatsapp
    ? `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`
    : "";

export const absoluteUrl = (path: string) =>
  `${siteConfig.domain}${path.startsWith("/") ? path : `/${path}`}`;
