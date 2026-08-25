/**
 * CENTRAL CLIENT DATA SYSTEM — single source of truth for every client,
 * professional experience entry, verified link and media reference.
 *
 * LINK POLICY: only officially verified or identity-matched URLs are stored.
 * Unverified fields stay empty so the interface hides the button entirely —
 * never invent a website or social profile.
 *
 * MEDIA POLICY: assets flagged `provisional: true` are designed, art-directed
 * stand-ins produced by Diglizer. Replace the file at the same path with
 * approved client media and the layout stays identical.
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

export type RelationshipType =
  | "Diglizer Client"
  | "Founder Professional Experience"
  | "Freelance Engagement"
  | "Creative Collaboration"
  | "Project-Based Work";

/** Internal only — not published as a public label until wording is confirmed. */
export type ClientStatus = "Current" | "Previous" | "Project-Based";

export interface ClientEntry {
  name: string;
  displayName: string;
  slug: string;
  industry: string;
  /** Filter bucket used by the clients page. */
  category: string[];
  industrySlug?: string;
  relationshipType: RelationshipType;
  status: ClientStatus;
  shortContribution: string;
  fullDescription?: string;
  services: string[];
  logo?: string;
  logoAlt?: string;
  coverImage?: string;
  coverImageAlt?: string;
  gallery: MediaAsset[];
  videos: VideoAsset[];
  website?: string;
  instagram?: string;
  instagramReels?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  otherSocial?: { label: string; href: string }[];
  caseStudyUrl?: string;
  workUrl?: string;
  publicWorkUrls: string[];
  startYear?: string;
  endYear?: string;
  featured: boolean;
  websiteVerified: boolean;
  socialLinksVerified: boolean;
  mediaVerified: boolean;
  displayOrder: number;
  sourceManifest: string;
}

export const clientCategories = [
  "All",
  "Healthcare",
  "Fertility",
  "Medical",
  "Education",
  "Government",
  "Culture",
  "Fashion",
  "Travel",
  "Technology",
  "Professional Services",
];

export const clients: ClientEntry[] = [
  {
    name: "Genetics Cryobank",
    displayName: "Genetics Cryobank",
    slug: "genetics-cryobank",
    industry: "Healthcare and Fertility",
    category: ["Healthcare", "Fertility"],
    industrySlug: "healthcare-fertility",
    relationshipType: "Diglizer Client",
    status: "Current",
    shortContribution:
      "Integrated graphic design, donor campaigns, exhibition communication, recruitment creatives, social media and lead-generation support.",
    fullDescription:
      "Sperm donor campaigns across Mumbai, Pune and Gorakhpur, recruitment creatives, social media posts and Reels, ACE exhibition communication, posters, danglers and product communication.",
    services: ["Graphic Design", "Campaigns", "Social Media", "Exhibition", "Lead Generation"],
    coverImage: "/media/clients/genetics-social-grid.jpg",
    coverImageAlt: "Genetics Cryobank campaign creative layouts",
    gallery: [],
    videos: [],
    website: "https://geneticscryobank.com/",
    instagram: "https://www.instagram.com/geneticscryobank/",
    instagramReels: "https://www.instagram.com/geneticscryobank/reels/",
    caseStudyUrl: "genetics-cryobank",
    publicWorkUrls: ["https://www.instagram.com/geneticscryobank/reels/"],
    featured: true,
    websiteVerified: true,
    socialLinksVerified: true,
    mediaVerified: false,
    displayOrder: 1,
    sourceManifest: "Official website and official Instagram profile supplied by the client.",
  },
  {
    name: "Yashoda IVF & Fertility Centre",
    displayName: "Yashoda IVF & Fertility Centre",
    slug: "yashoda-ivf",
    industry: "Healthcare and Fertility",
    category: ["Healthcare", "Fertility"],
    industrySlug: "healthcare-fertility",
    relationshipType: "Founder Professional Experience",
    status: "Previous",
    shortContribution:
      "Graphic design management, IVF and IUI campaigns, fertility awareness, social media communication and advertising creatives.",
    fullDescription:
      "IVF and IUI creatives, fertility awareness posts, festival communication, Meta and Google advertising creatives and promotional communication.",
    services: ["Graphic Design", "Campaigns", "Social Media", "Performance Creative"],
    coverImage: "/media/clients/yashoda-social.jpg",
    coverImageAlt: "Yashoda IVF fertility awareness social creatives",
    gallery: [],
    videos: [],
    website: "https://yashodaivf.com/",
    linkedin: "https://in.linkedin.com/company/yashoda-ivf-and-fertility-centre",
    caseStudyUrl: "yashoda-ivf",
    publicWorkUrls: [],
    startYear: "2024",
    endYear: "2025",
    featured: true,
    websiteVerified: true,
    socialLinksVerified: true,
    mediaVerified: false,
    displayOrder: 2,
    sourceManifest: "Website supplied by the client; LinkedIn company page identity matched.",
  },
  {
    name: "Grace26",
    displayName: "Grace26",
    slug: "grace26",
    industry: "Medical and Surgical",
    category: ["Medical", "Healthcare"],
    industrySlug: "medical-surgical",
    relationshipType: "Diglizer Client",
    status: "Current",
    shortContribution:
      "Website design and development, packaging, catalogues, exhibition material, product communication, backend integrations and deployment support.",
    fullDescription:
      "Live website with desktop and mobile screens, product pages, enquiry forms, careers page, packaging, catalogues, exhibition panels and product mockups.",
    services: ["Website", "Packaging", "Catalogue", "Exhibition", "Product Communication"],
    coverImage: "/media/clients/grace26-website.jpg",
    coverImageAlt: "Grace26 medical products website on desktop and mobile",
    gallery: [],
    videos: [],
    website: "https://grace26.in/",
    caseStudyUrl: "grace26",
    publicWorkUrls: ["https://grace26.in/"],
    featured: true,
    websiteVerified: true,
    socialLinksVerified: false,
    mediaVerified: false,
    displayOrder: 3,
    sourceManifest: "Official website supplied by the client.",
  },
  {
    name: "TripWithOwners",
    displayName: "TripWithOwners",
    slug: "tripwithowners",
    industry: "Travel and Community",
    category: ["Travel"],
    industrySlug: "travel-hospitality",
    relationshipType: "Diglizer Client",
    status: "Current",
    shortContribution:
      "Brand direction, travel website, itinerary design, experience presentation, enquiry systems and digital communication.",
    fullDescription:
      "Live website with desktop and mobile screens, Goa trip pages, itinerary design, travel communication, experience pages and enquiry flow. Official social handle: @tripwithowners (platform URLs pending verification).",
    services: ["Brand Direction", "Website", "Content", "Enquiry Systems"],
    coverImage: "/media/clients/two-website.jpg",
    coverImageAlt: "TripWithOwners community travel website homepage",
    gallery: [],
    videos: [],
    website: "https://tripwithowners.com/",
    caseStudyUrl: "tripwithowners",
    publicWorkUrls: ["https://tripwithowners.com/"],
    featured: true,
    websiteVerified: true,
    socialLinksVerified: false,
    mediaVerified: false,
    displayOrder: 4,
    sourceManifest:
      "Official website supplied by the client. Social handle @tripwithowners supplied; platform URLs not yet verified so no social button is shown.",
  },
  {
    name: "Pasbaan-e-Adab",
    displayName: "Pasbaan-e-Adab",
    slug: "pasbaan-e-adab",
    industry: "Culture and Events",
    category: ["Culture"],
    industrySlug: "culture-events",
    relationshipType: "Diglizer Client",
    status: "Current",
    shortContribution:
      "Graphic design, senior video editing, YouTube content, Reels, event communication and cultural storytelling.",
    fullDescription:
      "Event creatives, cultural photography, YouTube videos, Reels, literary communication, festival posts and video thumbnails.",
    services: ["Graphic Design", "Video Editing", "Reels", "Event Communication"],
    coverImage: "/media/clients/pasbaan-events.jpg",
    coverImageAlt: "Pasbaan-e-Adab literary event creatives",
    gallery: [],
    videos: [],
    website: "https://pasbaaneadab.com/",
    instagram: "https://www.instagram.com/pasbaaneadab/",
    linkedin: "https://in.linkedin.com/company/pasbaan-e-adab",
    caseStudyUrl: "pasbaan-e-adab",
    publicWorkUrls: ["https://www.instagram.com/pasbaaneadab/"],
    featured: true,
    websiteVerified: true,
    socialLinksVerified: true,
    mediaVerified: false,
    displayOrder: 5,
    sourceManifest: "Official website, Instagram and LinkedIn company page verified.",
  },
  {
    name: "Siddhartha Logic",
    displayName: "Siddhartha Logic",
    slug: "siddhartha-logic",
    industry: "Technology and Professional Services",
    category: ["Technology", "Professional Services"],
    industrySlug: "professional-services",
    relationshipType: "Founder Professional Experience",
    status: "Previous",
    shortContribution: "Senior graphic-design and video-editing experience.",
    services: ["Graphic Design", "Video Editing", "Motion"],
    coverImage: "/media/clients/siddhartha-design.jpg",
    coverImageAlt: "Professional services brand collateral and presentation design",
    gallery: [],
    videos: [],
    instagram: "https://www.instagram.com/siddhartha_logic/",
    caseStudyUrl: "siddhartha-logic",
    publicWorkUrls: ["https://www.instagram.com/siddhartha_logic/"],
    featured: false,
    websiteVerified: false,
    socialLinksVerified: true,
    mediaVerified: false,
    displayOrder: 6,
    sourceManifest:
      "Official Instagram profile supplied and verified. No official website supplied, so no website button is shown.",
  },
  {
    name: "Prober",
    displayName: "Prober",
    slug: "prober",
    industry: "Education and Professional Services",
    category: ["Education", "Professional Services"],
    industrySlug: "professional-services",
    relationshipType: "Freelance Engagement",
    status: "Project-Based",
    shortContribution: "Freelance graphic-design and video-editing work.",
    services: ["Graphic Design", "Video Editing"],
    coverImage: "/media/clients/prober-design.jpg",
    coverImageAlt: "Freelance design and video editing workspace with brand sheets",
    gallery: [],
    videos: [],
    website: "https://proberedu.com/",
    caseStudyUrl: "prober",
    publicWorkUrls: [],
    featured: false,
    websiteVerified: true,
    socialLinksVerified: false,
    mediaVerified: false,
    displayOrder: 7,
    sourceManifest: "Official website supplied by the client.",
  },
  {
    name: "Aikaa Fashion",
    displayName: "Aikaa Fashion",
    slug: "aikaa-fashion",
    industry: "Fashion and Lifestyle",
    category: ["Fashion"],
    industrySlug: "fashion-lifestyle",
    relationshipType: "Diglizer Client",
    status: "Current",
    shortContribution: "Social media content, campaign creatives, Reels and Meta advertising.",
    services: ["Social Media", "Campaigns", "Reels", "Meta Ads"],
    coverImage: "/media/clients/aikaa-social.jpg",
    coverImageAlt: "Fashion campaign social creatives on a blush studio wall",
    gallery: [],
    videos: [],
    website: "https://aikaafashion.com/",
    caseStudyUrl: "aikaa-fashion",
    publicWorkUrls: ["https://aikaafashion.com/"],
    featured: false,
    websiteVerified: true,
    socialLinksVerified: false,
    mediaVerified: false,
    displayOrder: 8,
    sourceManifest: "Official website supplied and verified.",
  },
  {
    name: "Satish Pradhan Dnyanasadhana College, Thane",
    displayName: "Satish Pradhan Dnyanasadhana College, Thane",
    slug: "dnyanasadhana-college",
    industry: "Education",
    category: ["Education"],
    relationshipType: "Project-Based Work",
    status: "Project-Based",
    shortContribution:
      "Creative and communication work supporting college events and institutional communication.",
    services: ["Graphic Design", "Event Communication"],
    gallery: [],
    videos: [],
    website: "https://www.dnyanasadhanacollege.org/",
    publicWorkUrls: [],
    featured: false,
    websiteVerified: true,
    socialLinksVerified: false,
    mediaVerified: false,
    displayOrder: 9,
    sourceManifest:
      "Official college website supplied. Project scope limited to supplied creative work; no additional claims made.",
  },
  {
    name: "Maharashtra Police",
    displayName: "Maharashtra Police",
    slug: "maharashtra-police",
    industry: "Government and Public Service",
    category: ["Government"],
    relationshipType: "Project-Based Work",
    status: "Project-Based",
    shortContribution:
      "Project-based creative and communication work. No endorsement, partnership or state-wide contract is implied.",
    services: ["Graphic Design", "Communication"],
    gallery: [],
    videos: [],
    website: "https://www.mahapolice.gov.in/",
    instagram: "https://www.instagram.com/dgpmaharashtra/",
    publicWorkUrls: [],
    featured: false,
    websiteVerified: true,
    socialLinksVerified: true,
    mediaVerified: false,
    displayOrder: 10,
    sourceManifest:
      "Official government website and official DGP Maharashtra Instagram profile. Emblem is not reproduced; a typographic name treatment is used.",
  },
  {
    name: "Suviksha Hospital",
    displayName: "Suviksha Hospital",
    slug: "suviksha-hospital",
    industry: "Healthcare",
    category: ["Healthcare"],
    relationshipType: "Project-Based Work",
    status: "Project-Based",
    shortContribution: "Healthcare design and communication work delivered on a project basis.",
    services: ["Graphic Design", "Healthcare Communication"],
    gallery: [],
    videos: [],
    publicWorkUrls: [],
    featured: false,
    websiteVerified: false,
    socialLinksVerified: false,
    mediaVerified: false,
    displayOrder: 11,
    sourceManifest:
      "Potential website https://suvikshahospital.com/ awaiting identity confirmation (logo, location, contact). Not published until matched.",
  },
  {
    name: "MIMAS World Hospitals",
    displayName: "MIMAS World Hospitals",
    slug: "mimas-world-hospitals",
    industry: "Healthcare and Multispeciality Care",
    category: ["Healthcare"],
    relationshipType: "Project-Based Work",
    status: "Project-Based",
    shortContribution: "Healthcare graphic design and communication work.",
    services: ["Graphic Design", "Healthcare Communication"],
    gallery: [],
    videos: [],
    website: "https://mimasworldhospitals.com/",
    publicWorkUrls: [],
    featured: false,
    websiteVerified: true,
    socialLinksVerified: false,
    mediaVerified: false,
    displayOrder: 12,
    sourceManifest: "Official website supplied by the client.",
  },
  {
    name: "Advaith Hospital",
    displayName: "Advaith Hospital",
    slug: "advaith-hospital",
    industry: "Healthcare",
    category: ["Healthcare"],
    relationshipType: "Project-Based Work",
    status: "Project-Based",
    shortContribution: "Healthcare design and communication work delivered on a project basis.",
    services: ["Graphic Design", "Healthcare Communication"],
    gallery: [],
    videos: [],
    publicWorkUrls: [],
    featured: false,
    websiteVerified: false,
    socialLinksVerified: false,
    mediaVerified: false,
    displayOrder: 13,
    sourceManifest:
      "No link published — similarly named hospitals exist. Awaiting location, logo and contact confirmation.",
  },
  {
    name: "Xpert Super Speciality Trulife",
    displayName: "Xpert Super Speciality Trulife",
    slug: "xpert-super-speciality-trulife",
    industry: "Healthcare and Fertility",
    category: ["Healthcare", "Fertility"],
    relationshipType: "Project-Based Work",
    status: "Project-Based",
    shortContribution:
      "Fertility and super-speciality healthcare creative and communication work.",
    services: ["Graphic Design", "Healthcare Communication"],
    gallery: [],
    videos: [],
    publicWorkUrls: [],
    featured: false,
    websiteVerified: false,
    socialLinksVerified: false,
    mediaVerified: false,
    displayOrder: 14,
    sourceManifest:
      "No link published — must not be confused with unrelated international Trulife brands. Awaiting identity confirmation.",
  },
  {
    name: "Mark Jewells",
    displayName: "Mark Jewells",
    slug: "mark-jewells",
    industry: "Jewellery and Lifestyle",
    category: ["Fashion"],
    relationshipType: "Project-Based Work",
    status: "Project-Based",
    shortContribution:
      "Jewellery brand design, campaign and digital communication work delivered on a project basis.",
    services: ["Graphic Design", "Campaigns", "Social Media"],
    gallery: [],
    videos: [],
    website: "https://markjewells.com/",
    publicWorkUrls: [],
    featured: false,
    websiteVerified: true,
    socialLinksVerified: false,
    mediaVerified: false,
    displayOrder: 15,
    sourceManifest:
      "Official website supplied and verified. Not connected to any similarly named jewellery business.",
  },
  {
    name: "Medibrain",
    displayName: "Medibrain",
    slug: "medibrain",
    industry: "Healthcare",
    category: ["Healthcare"],
    relationshipType: "Project-Based Work",
    status: "Project-Based",
    shortContribution: "Healthcare design and communication work delivered on a project basis.",
    services: ["Graphic Design", "Healthcare Communication"],
    gallery: [],
    videos: [],
    publicWorkUrls: [],
    featured: false,
    websiteVerified: false,
    socialLinksVerified: false,
    mediaVerified: false,
    displayOrder: 16,
    sourceManifest:
      "Potential website https://medibrainsuperspeciality.com/ awaiting identity confirmation. medibrain.jp is explicitly excluded.",
  },
  {
    name: "Mahadevi Hospital",
    displayName: "Mahadevi Hospital",
    slug: "mahadevi-hospital",
    industry: "Healthcare",
    category: ["Healthcare"],
    relationshipType: "Project-Based Work",
    status: "Project-Based",
    shortContribution: "Healthcare design and communication work delivered on a project basis.",
    services: ["Graphic Design", "Healthcare Communication"],
    gallery: [],
    videos: [],
    publicWorkUrls: [],
    featured: false,
    websiteVerified: false,
    socialLinksVerified: false,
    mediaVerified: false,
    displayOrder: 17,
    sourceManifest:
      "No link published — directory listings and unrelated hospitals excluded. Awaiting location, logo, website and project assets.",
  },
];

export const featuredClients = clients.filter((c) => c.featured);
export const otherClients = clients.filter((c) => !c.featured);

export const getClient = (slug: string) => clients.find((c) => c.slug === slug);

/** Legacy shape kept for project/case-study content. */
export const clientLinks: Record<string, ClientLinks> = Object.fromEntries(
  clients.map((c) => [
    c.slug,
    {
      ...(c.website ? { website: c.website } : {}),
      ...(c.instagram ? { instagram: c.instagram } : {}),
      ...(c.instagramReels ? { instagramReels: c.instagramReels } : {}),
      ...(c.facebook ? { facebook: c.facebook } : {}),
      ...(c.linkedin ? { linkedin: c.linkedin } : {}),
      ...(c.youtube ? { youtube: c.youtube } : {}),
    } satisfies ClientLinks,
  ]),
);

export const clientLinksFor = (slug: string): ClientLinks => clientLinks[slug] ?? {};

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
    href: "https://www.instagram.com/siddhartha_logic/",
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

/** Internal media-source manifest — every replaceable asset on the site. */
export const mediaManifest: ManifestRow[] = clients
  .filter((c) => Boolean(c.coverImage))
  .map((c) => ({
    client: c.name,
    asset: c.coverImage!,
    kind: "cover",
    page: "/clients, /work, home",
    provisional: !c.mediaVerified,
    sourceUrl: c.website ?? "",
    replacementPath: c.coverImage!,
  }));
