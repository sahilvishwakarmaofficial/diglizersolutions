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
    industrySlug: "healthcare-fertility-hospitals",
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
    industrySlug: "healthcare-fertility-hospitals",
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
    industrySlug: "medical-products-b2b-healthcare",
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
    industrySlug: "travel-hospitality-community",
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
    industrySlug: "culture-events-entertainment",
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
    industrySlug: "technology-professional-services",
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
    industrySlug: "technology-professional-services",
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
    industrySlug: "fashion-jewellery-lifestyle",
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
    industry: "Education & Learning",
    category: ["Education"],
    industrySlug: "education-learning",
    relationshipType: "Project-Based Work",
    status: "Project-Based",
    shortContribution:
      "Graphic design and institutional communication across admission campaigns, college branding, booklets, exhibitions and LED display creatives.",
    fullDescription:
      "Graphic-design services covering admission campaign posts, \u201cAdmissions Open\u201d creatives, social-media designs, college branding materials, institutional communication, booklet design, exhibition creatives, LED panel designs, event and display communication and print-ready artwork.",
    services: [
      "Graphic Design",
      "Admission Campaigns",
      "Social Media",
      "Booklet Design",
      "Exhibition Creative",
      "LED Panel Design",
      "Print Design",
      "Education",
    ],
    gallery: [],
    videos: [],
    website: "https://www.dnyanasadhanacollege.org/",
    caseStudyUrl: "dnyanasadhana-college",
    publicWorkUrls: [],
    featured: false,
    websiteVerified: true,
    socialLinksVerified: false,
    mediaVerified: false,
    displayOrder: 9,
    sourceManifest:
      "Official college website supplied and verified. Scope limited to supplied graphic-design work; no additional claims made.",
  },
  {
    name: "Maharashtra Police",
    displayName: "Maharashtra Police",
    slug: "maharashtra-police",
    industry: "Government & Public Service",
    category: ["Government"],
    industrySlug: "government-public-service",
    relationshipType: "Project-Based Work",
    status: "Project-Based",
    shortContribution:
      "Graphic design, print material and social-media creatives for road-safety and public-awareness communication involving Navi Mumbai Police and Thane Police.",
    fullDescription:
      "Selected public-awareness design experience involving Navi Mumbai Police and Thane Police, including road-safety campaigns, do-not-drink-and-drive and seat-belt awareness creatives, social-media posts, print material and collaborative road-safety communication with Cycle Pure Agarbathi. No endorsement, partnership or state-wide contract is implied.",
    services: [
      "Graphic Design",
      "Public-Awareness Campaign",
      "Social Media",
      "Print Design",
      "Government",
    ],
    gallery: [],
    videos: [],
    website: "https://www.mahapolice.gov.in/",
    instagram: "https://www.instagram.com/dgpmaharashtra/",
    caseStudyUrl: "maharashtra-police",
    publicWorkUrls: [],
    featured: false,
    websiteVerified: true,
    socialLinksVerified: true,
    mediaVerified: false,
    displayOrder: 10,
    sourceManifest:
      "Official government website and official DGP Maharashtra Instagram profile. Emblems are never reproduced, recoloured or animated; a typographic name treatment is used.",
  },
  {
    name: "Suviksha Hospital",
    displayName: "Suviksha Hospital",
    slug: "suviksha-hospital",
    industry: "Healthcare & Hospitals",
    category: ["Healthcare"],
    industrySlug: "healthcare-fertility-hospitals",
    relationshipType: "Project-Based Work",
    status: "Project-Based",
    shortContribution:
      "Social-media and Meta advertising creatives developed for healthcare communication.",
    fullDescription:
      "Graphic-design services for Suviksha Hospital covering social-media post design, Meta Ads campaign creatives, healthcare campaign design and digital graphic-design support.",
    services: ["Graphic Design", "Social Media", "Meta Ads Creative", "Healthcare Communication"],
    gallery: [],
    videos: [],
    caseStudyUrl: "suviksha-hospital",
    publicWorkUrls: [],
    featured: false,
    websiteVerified: false,
    socialLinksVerified: false,
    mediaVerified: false,
    displayOrder: 11,
    sourceManifest:
      "No link published \u2014 exact organisation identity (logo, location, contact) not yet confirmed. Similarly named hospitals are explicitly excluded.",
  },
  {
    name: "MIMAS World Hospitals",
    displayName: "MIMAS World Hospitals",
    slug: "mimas-world-hospitals",
    industry: "Healthcare & Hospitals",
    category: ["Healthcare"],
    industrySlug: "healthcare-fertility-hospitals",
    relationshipType: "Project-Based Work",
    status: "Project-Based",
    shortContribution:
      "Graphic-design support across healthcare social-media communication and Meta advertising creatives.",
    fullDescription:
      "Graphic-design services for MIMAS World Hospitals covering social-media post design, healthcare campaign creatives, Meta Ads campaign creatives and digital advertising creatives.",
    services: ["Graphic Design", "Social Media", "Meta Ads Creative", "Healthcare Communication"],
    gallery: [],
    videos: [],
    website: "https://mimasworldhospitals.com/",
    caseStudyUrl: "mimas-world-hospitals",
    publicWorkUrls: [],
    featured: false,
    websiteVerified: true,
    socialLinksVerified: false,
    mediaVerified: false,
    displayOrder: 12,
    sourceManifest: "Official website supplied and verified by the client.",
  },
  {
    name: "Advaith Hospital",
    displayName: "Advaith Hospital",
    slug: "advaith-hospital",
    industry: "Healthcare & Hospitals",
    category: ["Healthcare"],
    industrySlug: "healthcare-fertility-hospitals",
    relationshipType: "Project-Based Work",
    status: "Project-Based",
    shortContribution:
      "Healthcare social-media posts and Meta advertising creatives designed for clear digital communication.",
    fullDescription:
      "Graphic-design services for Advaith Hospital covering social-media post design, Meta Ads campaign creatives, hospital campaign design and digital graphic-design support.",
    services: ["Graphic Design", "Social Media", "Meta Ads Creative", "Healthcare Communication"],
    gallery: [],
    videos: [],
    caseStudyUrl: "advaith-hospital",
    publicWorkUrls: [],
    featured: false,
    websiteVerified: false,
    socialLinksVerified: false,
    mediaVerified: false,
    displayOrder: 13,
    sourceManifest:
      "No link published \u2014 similarly named hospitals exist and must not be substituted. Awaiting location, logo and contact confirmation.",
  },
  {
    name: "Xpert Super Speciality Trulife",
    displayName: "Xpert Super Speciality Trulife",
    slug: "xpert-super-speciality-trulife",
    industry: "Healthcare & Fertility",
    category: ["Healthcare", "Fertility"],
    industrySlug: "healthcare-fertility-hospitals",
    relationshipType: "Project-Based Work",
    status: "Project-Based",
    shortContribution:
      "Social-media and Meta advertising creatives for fertility and super-speciality healthcare communication.",
    fullDescription:
      "Graphic-design services for Xpert Super Speciality Trulife covering social-media post design, Meta Ads campaign creatives, healthcare campaigns, fertility campaigns and digital graphic-design support.",
    services: ["Graphic Design", "Social Media", "Meta Ads Creative", "Healthcare Communication"],
    gallery: [],
    videos: [],
    caseStudyUrl: "xpert-super-speciality-trulife",
    publicWorkUrls: [],
    featured: false,
    websiteVerified: false,
    socialLinksVerified: false,
    mediaVerified: false,
    displayOrder: 14,
    sourceManifest:
      "No link published \u2014 must not be connected to any unrelated international Trulife organisation. Awaiting identity confirmation.",
  },
  {
    name: "Mark Jewells",
    displayName: "Mark Jewells",
    slug: "mark-jewells",
    industry: "Fashion, Jewellery & Lifestyle",
    category: ["Fashion"],
    industrySlug: "fashion-jewellery-lifestyle",
    relationshipType: "Project-Based Work",
    status: "Project-Based",
    shortContribution:
      "Social-media and Meta advertising creatives designed to showcase jewellery products with clarity and visual appeal.",
    fullDescription:
      "Graphic-design services for Mark Jewells covering social-media post design, product-promotion creatives, jewellery campaign design and Meta Ads campaign creatives.",
    services: ["Graphic Design", "Social Media", "Meta Ads Creative", "Jewellery"],
    gallery: [],
    videos: [],
    website: "https://markjewells.com/",
    caseStudyUrl: "mark-jewells",
    publicWorkUrls: ["https://markjewells.com/"],
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
    industry: "Healthcare & Hospitals",
    category: ["Healthcare"],
    industrySlug: "healthcare-fertility-hospitals",
    relationshipType: "Project-Based Work",
    status: "Project-Based",
    shortContribution:
      "Logo concept development, graphic design and internal hospital-branding communication.",
    fullDescription:
      "Logo design, logo concept development, brand-symbol exploration, graphic-design services, visual-identity development, internal hospital branding, environmental branding concepts and interior branding communication.",
    services: ["Logo Design", "Graphic Design", "Internal Branding", "Healthcare Communication"],
    gallery: [],
    videos: [],
    caseStudyUrl: "medibrain",
    publicWorkUrls: [],
    featured: false,
    websiteVerified: false,
    socialLinksVerified: false,
    mediaVerified: false,
    displayOrder: 16,
    sourceManifest:
      "No link published \u2014 exact organisation identity not yet confirmed. Unrelated organisations of the same name are explicitly excluded.",
  },
  {
    name: "Mahadevi Hospital",
    displayName: "Mahadevi Hospital",
    slug: "mahadevi-hospital",
    industry: "Healthcare & Hospitals",
    category: ["Healthcare"],
    industrySlug: "healthcare-fertility-hospitals",
    relationshipType: "Project-Based Work",
    status: "Project-Based",
    shortContribution: "Logo design, visual identity and internal hospital-branding services.",
    fullDescription:
      "Logo design, logo concept development, graphic-design services, hospital visual identity, internal hospital branding and environmental branding concepts.",
    services: ["Logo Design", "Graphic Design", "Internal Branding", "Healthcare Communication"],
    gallery: [],
    videos: [],
    caseStudyUrl: "mahadevi-hospital",
    publicWorkUrls: [],
    featured: false,
    websiteVerified: false,
    socialLinksVerified: false,
    mediaVerified: false,
    displayOrder: 17,
    sourceManifest:
      "No link published \u2014 directory listings and unrelated hospitals excluded. Awaiting location, logo, website and project assets.",
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
