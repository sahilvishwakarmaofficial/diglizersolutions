/**
 * Central client directory, verified external links and media manifest.
 *
 * LINK POLICY: only officially verified URLs are stored here. Unverified
 * fields are intentionally left empty so the interface hides them — never
 * invent a website or social profile.
 *
 * MEDIA POLICY: every asset below is a designed, art-directed stand-in
 * (`provisional: true`) produced by Diglizer to represent the engagement.
 * Replace the file at `replacementPath` with approved client media and the
 * layout stays identical.
 */

export interface ClientLinks {
  website?: string;
  instagram?: string;
  instagramReels?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
}

export type MediaRatio = "1:1" | "4:5" | "9:16" | "16:9" | "3:2";

export interface MediaAsset {
  src: string;
  alt: string;
  caption: string;
  ratio: MediaRatio;
  kind: "social" | "website" | "packaging" | "video" | "photography" | "print" | "exhibition";
  provisional: boolean;
  /** Verified public source this asset represents, when one exists. */
  sourceUrl?: string;
}

export interface VideoAsset {
  title: string;
  client: string;
  workType: string;
  platform: string;
  poster: string;
  posterAlt: string;
  ratio: "16:9" | "9:16";
  /** Verified public source. Empty means the thumbnail is shown without a link. */
  href?: string;
  provisional: boolean;
}

export interface ClientEntry {
  slug: string;
  name: string;
  industry: string;
  industrySlug: string;
  services: string;
  dates?: string;
  /** Path to the case study, when one is published. */
  caseStudy?: string;
  links: ClientLinks;
  thumbnail: string;
  thumbnailAlt: string;
  provisionalMedia: boolean;
}

export const clientLinks: Record<string, ClientLinks> = {
  "genetics-cryobank": {
    website: "https://geneticscryobank.com/",
    instagram: "https://www.instagram.com/geneticscryobank/",
    instagramReels: "https://www.instagram.com/geneticscryobank/reels/",
  },
  grace26: {
    website: "https://grace26.in/",
  },
  tripwithowners: {
    website: "https://tripwithowners.com/",
  },
  "yashoda-ivf": {
    website: "https://yashodaivfcentre.com/",
    linkedin: "https://in.linkedin.com/company/yashoda-ivf-and-fertility-centre",
  },
  "pasbaan-e-adab": {
    website: "https://pasbaaneadab.com/",
    instagram: "https://www.instagram.com/pasbaaneadab/",
    linkedin: "https://in.linkedin.com/company/pasbaan-e-adab",
  },
  "aikaa-fashion": {
    website: "https://aikaafashion.com/",
  },
  /* Official identities not confidently verified yet — fields stay empty. */
  "siddhartha-logic": {},
  prober: {},
  "trek-power-adventures": {},
};

export const clientDirectory: ClientEntry[] = [
  {
    slug: "genetics-cryobank",
    name: "Genetics Cryobank",
    industry: "Healthcare and Fertility",
    industrySlug: "healthcare-fertility",
    services:
      "Senior graphic design, campaigns, exhibitions, donor advertising, lead-generation creative and communication",
    caseStudy: "genetics-cryobank",
    links: clientLinks["genetics-cryobank"]!,
    thumbnail: "/media/clients/genetics-social-grid.jpg",
    thumbnailAlt: "Genetics Cryobank campaign creative layouts",
    provisionalMedia: true,
  },
  {
    slug: "grace26",
    name: "Grace26",
    industry: "Medical and Surgical",
    industrySlug: "medical-surgical",
    services:
      "Website, packaging, catalogues, exhibition material, product communication and digital systems",
    caseStudy: "grace26",
    links: clientLinks.grace26!,
    thumbnail: "/media/clients/grace26-website.jpg",
    thumbnailAlt: "Grace26 medical products website on desktop and mobile",
    provisionalMedia: true,
  },
  {
    slug: "tripwithowners",
    name: "TripWithOwners",
    industry: "Travel and Community",
    industrySlug: "travel-hospitality",
    services: "Brand direction, website, itinerary, content and enquiry experience",
    caseStudy: "tripwithowners",
    links: clientLinks.tripwithowners!,
    thumbnail: "/media/clients/two-website.jpg",
    thumbnailAlt: "TripWithOwners community travel website homepage",
    provisionalMedia: true,
  },
  {
    slug: "yashoda-ivf",
    name: "Yashoda IVF & Fertility Centre",
    industry: "Healthcare and Fertility",
    industrySlug: "healthcare-fertility",
    services:
      "Graphic design management, fertility campaigns, social media and advertising creatives",
    dates: "2024–2025",
    caseStudy: "yashoda-ivf",
    links: clientLinks["yashoda-ivf"]!,
    thumbnail: "/media/clients/yashoda-social.jpg",
    thumbnailAlt: "Yashoda IVF fertility awareness social creatives",
    provisionalMedia: true,
  },
  {
    slug: "pasbaan-e-adab",
    name: "Pasbaan-e-Adab",
    industry: "Culture and Events",
    industrySlug: "culture-events",
    services: "Video editing, graphic design, Reels, YouTube and event communication",
    caseStudy: "pasbaan-e-adab",
    links: clientLinks["pasbaan-e-adab"]!,
    thumbnail: "/media/clients/pasbaan-events.jpg",
    thumbnailAlt: "Pasbaan-e-Adab literary event creatives",
    provisionalMedia: true,
  },
  {
    slug: "siddhartha-logic",
    name: "Siddhartha Logic",
    industry: "Technology and Professional Services",
    industrySlug: "professional-services",
    services: "Senior graphic design and video editing experience",
    caseStudy: "siddhartha-logic",
    links: clientLinks["siddhartha-logic"]!,
    thumbnail: "/media/clients/siddhartha-design.jpg",
    thumbnailAlt: "Professional services brand collateral and presentation design",
    provisionalMedia: true,
  },
  {
    slug: "prober",
    name: "Prober",
    industry: "Professional Services",
    industrySlug: "professional-services",
    services: "Freelance graphic design and video-editing work",
    caseStudy: "prober",
    links: clientLinks.prober!,
    thumbnail: "/media/clients/prober-design.jpg",
    thumbnailAlt: "Freelance design and video editing workspace with brand sheets",
    provisionalMedia: true,
  },
  {
    slug: "aikaa-fashion",
    name: "Aikaa Fashion",
    industry: "Fashion and Lifestyle",
    industrySlug: "fashion-lifestyle",
    services: "Social media posts, Reels and Meta advertising",
    caseStudy: "aikaa-fashion",
    links: clientLinks["aikaa-fashion"]!,
    thumbnail: "/media/clients/aikaa-social.jpg",
    thumbnailAlt: "Fashion campaign social creatives on a blush studio wall",
    provisionalMedia: true,
  },
  {
    slug: "trek-power-adventures",
    name: "Trek Power Adventures",
    industry: "Travel and Adventure",
    industrySlug: "travel-hospitality",
    services: "Brochure and video-related creative work",
    caseStudy: "trek-power-adventures",
    links: clientLinks["trek-power-adventures"]!,
    thumbnail: "/media/clients/trekpower-brochure.jpg",
    thumbnailAlt: "Adventure travel brochure spread on rock",
    provisionalMedia: true,
  },
];

export const getClient = (slug: string) => clientDirectory.find((c) => c.slug === slug);

/** Homepage motion strip and capability video sections. */
export const videoWork: VideoAsset[] = [
  {
    title: "Literary session edit for a cultural platform",
    client: "Pasbaan-e-Adab",
    workType: "Long-form editing",
    platform: "YouTube",
    poster: "/media/clients/pasbaan-video.jpg",
    posterAlt: "Video editing timeline with cultural event footage",
    ratio: "16:9",
    href: "https://pasbaaneadab.com/",
    provisional: true,
  },
  {
    title: "Awareness reel previews",
    client: "Genetics Cryobank",
    workType: "Short-form vertical",
    platform: "Instagram Reels",
    poster: "/media/clients/genetics-reels.jpg",
    posterAlt: "Vertical short-video frames for a healthcare awareness campaign",
    ratio: "9:16",
    href: "https://www.instagram.com/geneticscryobank/reels/",
    provisional: true,
  },
  {
    title: "Fashion campaign reels",
    client: "Aikaa Fashion",
    workType: "Short-form vertical",
    platform: "Instagram",
    poster: "/media/clients/aikaa-social.jpg",
    posterAlt: "Fashion campaign creatives used as reel covers",
    ratio: "9:16",
    href: "https://aikaafashion.com/",
    provisional: true,
  },
  {
    title: "Corporate presentation and promo edits",
    client: "Siddhartha Logic",
    workType: "Promo editing",
    platform: "Internal and social",
    poster: "/media/clients/siddhartha-design.jpg",
    posterAlt: "Professional services presentation and brand collateral",
    ratio: "16:9",
    provisional: true,
  },
  {
    title: "Adventure travel promo cutdowns",
    client: "Trek Power Adventures",
    workType: "Travel video",
    platform: "Social",
    poster: "/media/clients/trekpower-brochure.jpg",
    posterAlt: "Adventure travel brochure and itinerary spread",
    ratio: "16:9",
    provisional: true,
  },
];

export interface ManifestRow {
  client: string;
  asset: string;
  kind: string;
  page: string;
  provisional: boolean;
  sourceUrl: string;
  replacementPath: string;
}

/** Internal manifest — every replaceable asset on the site. */
export const mediaManifest: ManifestRow[] = clientDirectory.map((c) => ({
  client: c.name,
  asset: c.thumbnail,
  kind: "cover",
  page: "/work, /about, home",
  provisional: c.provisionalMedia,
  sourceUrl: c.links.website ?? "",
  replacementPath: c.thumbnail,
}));
