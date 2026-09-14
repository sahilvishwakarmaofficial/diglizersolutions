import { siteConfig, absoluteUrl } from "@/config/site";

type MetaTag = Record<string, string>;

export interface SeoInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
}

export function seo({
  title,
  description,
  path,
  image,
  type = "website",
  noindex = false,
  publishedTime,
  modifiedTime,
}: SeoInput): { meta: MetaTag[]; links: MetaTag[] } {
  const url = absoluteUrl(path);
  const meta: MetaTag[] = [
    { title },
    { name: "description", content: description },
    { name: "author", content: siteConfig.name },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:site_name", content: siteConfig.name },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];

  if (image) {
    meta.push({ property: "og:image", content: image });
    meta.push({ name: "twitter:image", content: image });
  }
  if (noindex) meta.push({ name: "robots", content: "noindex, nofollow" });
  if (publishedTime) meta.push({ property: "article:published_time", content: publishedTime });
  if (modifiedTime) meta.push({ property: "article:modified_time", content: modifiedTime });

  return { meta, links: [{ rel: "canonical", href: url }] };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.domain}/#organization`,
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: siteConfig.domain,
  logo: absoluteUrl(siteConfig.logos.icon),
  description: siteConfig.description,
  slogan: siteConfig.tagline,
  founder: {
    "@type": "Person",
    name: siteConfig.founder.name,
    jobTitle: siteConfig.founder.role,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.contact.addressLocality,
    addressRegion: siteConfig.contact.addressRegion,
    addressCountry: siteConfig.contact.addressCountry,
  },
  areaServed: siteConfig.contact.serviceAreas.map((area) => ({ "@type": "Place", name: area })),
  sameAs: [
    siteConfig.social.instagram,
    siteConfig.social.facebook,
    siteConfig.social.linkedin,
  ].filter(Boolean),
  ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
  ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.domain}/#website`,
  url: siteConfig.domain,
  name: siteConfig.name,
  publisher: { "@id": `${siteConfig.domain}/#organization` },
};
