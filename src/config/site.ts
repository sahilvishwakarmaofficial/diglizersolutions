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
    email: "",
    phone: "",
    whatsapp: "",
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
    linkedin: "",
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
    sameAs: [] as string[],
  },
} as const;

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
