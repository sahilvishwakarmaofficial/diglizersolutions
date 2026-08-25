/**
 * Central project/case-study content.
 * `provisional: true` marks media that is a designed stand-in and can be
 * replaced with approved client material without touching any component.
 * A developer-readable source manifest lives in docs/media-manifest.md.
 */

export interface CaseStudySection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface Project {
  slug: string;
  client: string;
  title: string;
  summary: string;
  industry: string;
  industrySlug: string;
  year?: string;
  location: string;
  tags: string[];
  filters: string[];
  services: string[];
  featured: boolean;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  image: string;
  imageAlt: string;
  provisionalMedia: boolean;
  overview: string[];
  challenge: CaseStudySection;
  strategy: CaseStudySection;
  solution: CaseStudySection;
  delivery?: CaseStudySection;
  impact: string[];
  relatedCapabilities: string[];
}

export const projects: Project[] = [
  {
    slug: "genetics-cryobank",
    client: "Genetics Cryobank",
    title: "Integrated creative and growth support for a specialist fertility brand",
    summary:
      "Integrated healthcare communication across campaigns, exhibitions and donor acquisition.",
    industry: "Healthcare and Fertility",
    industrySlug: "healthcare-fertility",
    location: "Mumbai, Pune and Gorakhpur",
    tags: ["Campaigns", "Performance Marketing", "Exhibition"],
    filters: ["Integrated", "Campaigns", "Performance Marketing", "Photography"],
    services: [
      "Campaign creative",
      "Meta advertising creative",
      "Campaign copy",
      "Lead-generation creative",
      "Exhibition and stall design",
      "WhatsApp communication templates",
    ],
    featured: true,
    metaTitle: "Genetics Cryobank Integrated Healthcare Marketing Case Study | Diglizer",
    metaDescription:
      "How Diglizer supported Genetics Cryobank with awareness campaigns, donor lead-generation creative, multi-city advertising and exhibition material.",
    headline: "Integrated creative and growth support for a specialist fertility brand.",
    image: "/media/case-genetics-cryobank.jpg",
    imageAlt:
      "Editorial composition representing Genetics Cryobank campaign and exhibition communication",
    provisionalMedia: true,
    overview: [
      "Genetics Cryobank operates in a category where accuracy, sensitivity and consistency matter more than volume of output. The engagement covered awareness communication, donor acquisition creative and physical presence at healthcare conferences.",
      "Work spanned digital campaign creative and copy through to exhibition material used at industry events, with a shared visual system holding it together.",
    ],
    challenge: {
      heading: "The challenge",
      paragraphs: [
        "Donor awareness and recruitment communication has to be respectful, factual and clear, while still competing for attention on platforms designed for entertainment.",
        "Campaigns also needed to work across cities with different languages, expectations and levels of category familiarity, without redesigning everything for each location.",
      ],
      bullets: [
        "Sensitive subject matter with strict platform restrictions",
        "Multiple cities requiring adapted rather than duplicated creative",
        "Digital and physical touchpoints that had to look like one organisation",
      ],
    },
    strategy: {
      heading: "Strategic response",
      paragraphs: [
        "We built a campaign system rather than individual posts: a consistent layout structure, typographic hierarchy and message framework that could be adapted per city and per audience.",
        "Communication was written to inform first and invite second, so the enquiry step felt like a reasonable next action rather than a hard sell.",
      ],
    },
    solution: {
      heading: "The solution",
      bullets: [
        "Sperm donor awareness campaign creative",
        "Donor lead-generation creatives and instant lead forms",
        "Campaigns adapted for Mumbai, Pune and Gorakhpur",
        "Location and PIN-code targeting support",
        "Recruitment advertisements",
        "Healthcare product creatives",
        "WhatsApp communication templates",
        "ACE Delhi exhibition material and ACE 2026 Agra conference material",
        "Stall panels, danglers, posters and selfie-point concepts",
      ],
    },
    delivery: {
      heading: "Delivery system",
      bullets: [
        "Creative templates structured for fast city-level adaptation",
        "Instant lead form flows with follow-up messaging templates",
        "Location-targeted campaign structure",
        "Exhibition artwork prepared to venue and vendor specifications",
      ],
    },
    impact: [
      "A brand-consistent campaign system used across digital and physical touchpoints",
      "Campaign material extended across multiple cities",
      "Lead-capture infrastructure established for donor enquiries",
      "Exhibition material delivered for national healthcare conferences",
    ],
    relatedCapabilities: ["performance-marketing", "brand-creative", "packaging-print"],
  },
  {
    slug: "grace26",
    client: "Grace26",
    title: "Building a modern B2B healthcare brand ecosystem",
    summary:
      "Packaging, product communication and digital infrastructure for a medical and surgical products brand.",
    industry: "Medical and Surgical",
    industrySlug: "medical-surgical",
    location: "India",
    tags: ["Branding", "Packaging", "Websites"],
    filters: ["Integrated", "Branding", "Packaging", "Websites"],
    services: [
      "Brand and communication development",
      "Packaging design",
      "Product catalogue organisation",
      "Website design and development",
      "Forms, database and email notifications",
      "Deployment support",
    ],
    featured: true,
    metaTitle: "Grace26 B2B Medical Brand & Website Case Study | Diglizer",
    metaDescription:
      "Brand communication, packaging, product catalogue structure and a full medical product website with forms, database and email notifications.",
    headline: "Building a modern B2B healthcare brand ecosystem.",
    image: "/media/case-grace26.jpg",
    imageAlt: "Editorial composition representing Grace26 medical product branding and website work",
    provisionalMedia: true,
    overview: [
      "Grace26 required a brand presence that could carry a wide medical and surgical product range across packaging, exhibitions and a working B2B website.",
      "The engagement connected design decisions to product data and technology, so the same catalogue structure informed packaging, print and web.",
    ],
    challenge: {
      heading: "The challenge",
      paragraphs: [
        "B2B medical buyers evaluate consistency and clarity. A broad product range with inconsistent presentation makes a manufacturer look smaller and less reliable than it is.",
        "The website also had to do real work: present categories properly, capture quotation enquiries and route them reliably.",
      ],
      bullets: [
        "Large product range needing a coherent category structure",
        "Packaging with mandatory information competing for space",
        "Enquiry and careers workflows requiring secure handling",
      ],
    },
    strategy: {
      heading: "Strategic response",
      paragraphs: [
        "We treated the product catalogue as the spine of the brand. Once categories, naming and specification presentation were settled, packaging, exhibition panels and the website could all follow the same logic.",
        "Technology choices favoured maintainability: structured data, protected form storage and email notification rather than a heavier system than the business needed.",
      ],
    },
    solution: {
      heading: "The solution",
      bullets: [
        "Brand and communication development",
        "Surgical mask and glove product communication",
        "Packaging and product mockups",
        "Product catalogue organisation and category structure",
        "Exhibition panels, standees, paper bags and corporate materials",
        "Responsive medical product website with product filters",
        "Contact and quotation forms with careers functionality",
      ],
    },
    delivery: {
      heading: "Delivery system",
      bullets: [
        "Database-backed enquiry storage with row-level protection",
        "Email notification integration for new enquiries",
        "Cloudflare deployment support",
        "Testing and issue resolution across devices",
      ],
    },
    impact: [
      "Website launched successfully with a working enquiry system",
      "Product catalogue organised into a usable category structure",
      "Brand consistency improved across packaging, print and web",
      "Exhibition material delivered for trade presence",
    ],
    relatedCapabilities: ["websites-technology", "packaging-print", "brand-creative"],
  },
  {
    slug: "tripwithowners",
    client: "TripWithOwners",
    title: "Creating a travel brand built around shared experiences",
    summary:
      "A travel community brand centred on shared experiences, adventure and connection.",
    industry: "Travel and Hospitality",
    industrySlug: "travel-hospitality",
    location: "Goa and Maharashtra",
    tags: ["Branding", "Websites", "Social Media"],
    filters: ["Integrated", "Branding", "Websites", "Social Media"],
    services: [
      "Travel brand positioning",
      "Visual direction",
      "Website information architecture",
      "Multi-page website design and development",
      "Enquiry forms and database integration",
      "Deployment, domain, sitemap and robots setup",
    ],
    featured: true,
    metaTitle: "TripWithOwners Travel Brand & Website Case Study | Diglizer",
    metaDescription:
      "Travel brand positioning, visual direction and a multi-page community travel website with itineraries, enquiry forms and deployment support.",
    headline: "Creating a travel brand built around shared experiences.",
    image: "/media/case-tripwithowners.jpg",
    imageAlt: "Editorial composition representing the TripWithOwners community travel brand",
    provisionalMedia: true,
    overview: [
      "TripWithOwners is built around group travel — the friendships, nightlife, adventure and downtime that make a trip memorable — with the organisers present rather than hidden behind a booking form.",
      "The brand and website had to feel like the experience while still answering practical questions clearly.",
    ],
    challenge: {
      heading: "The challenge",
      paragraphs: [
        "Community travel sells atmosphere, but travellers still need itinerary detail, inclusions and a straightforward way to enquire.",
        "The presentation had to stay roughly ninety percent about the experience and ten percent about the founders and networking, without either feeling bolted on.",
      ],
    },
    strategy: {
      heading: "Strategic response",
      paragraphs: [
        "We led with experience storytelling and kept logistics in a clear, scannable structure underneath it, so excitement and practicality did not compete.",
        "Information architecture was planned around one action: a completed enquiry with enough context to reply usefully.",
      ],
    },
    solution: {
      heading: "The solution",
      bullets: [
        "Travel brand positioning and visual direction",
        "Multi-page travel website",
        "Goa Community Escape itinerary presentation",
        "Experience-led page structure with clear inclusions",
        "Enquiry forms with secure storage",
        "Stock-image art direction and social communication",
      ],
    },
    delivery: {
      heading: "Delivery system",
      bullets: [
        "Database integration for enquiries",
        "Deployment and domain configuration",
        "Sitemap and robots setup for search visibility",
      ],
    },
    impact: [
      "Travel website launched with a working enquiry system",
      "Itinerary and experience content presented in a consistent structure",
      "Mobile user experience improved for on-the-go browsing",
    ],
    relatedCapabilities: ["websites-technology", "brand-creative", "social-media"],
  },
  {
    slug: "yashoda-ivf",
    client: "Yashoda IVF & Fertility Centre",
    title: "Building trust through consistent fertility communication",
    summary: "Consistent fertility communication and performance-led creative.",
    industry: "Healthcare and Fertility",
    industrySlug: "healthcare-fertility",
    year: "2024–2025",
    location: "Maharashtra",
    tags: ["Campaigns", "Social Media", "Performance Marketing"],
    filters: ["Campaigns", "Social Media", "Performance Marketing"],
    services: [
      "IVF and IUI campaign design",
      "Fertility awareness content",
      "Meta and Google advertising creative",
      "Festival communication",
      "Social media systems",
    ],
    featured: true,
    metaTitle: "Yashoda IVF Fertility Communication Case Study | Diglizer",
    metaDescription:
      "IVF and IUI campaign design, fertility awareness content and advertising creative delivered through a consistent social media system.",
    headline: "Building trust through consistent fertility communication.",
    image: "/media/case-yashoda-ivf.jpg",
    imageAlt: "Editorial composition representing Yashoda IVF fertility awareness communication",
    provisionalMedia: true,
    overview: [
      "Design management for a fertility centre across social media, awareness content and advertising creative, from 2024 to September 2025.",
      "The priority was steady, respectful communication that patients could recognise over months, not a single campaign spike.",
    ],
    challenge: {
      heading: "The challenge",
      paragraphs: [
        "Fertility audiences are researching quietly and comparing providers over long periods. Communication has to build familiarity without pressure or unsupported promises.",
        "Content also had to keep pace across awareness topics, promotional campaigns and festival moments.",
      ],
    },
    strategy: {
      heading: "Strategic response",
      paragraphs: [
        "A repeatable design system across post formats made the account instantly recognisable and reduced production time.",
        "Messaging stayed educational and factual, keeping treatment claims out of marketing copy.",
      ],
    },
    solution: {
      heading: "The solution",
      bullets: [
        "IVF and IUI campaign design",
        "Fertility awareness content series",
        "Promotional campaign creative",
        "Meta and Google advertising creative",
        "Festival and occasion communication",
        "Social media design system and calendar",
      ],
    },
    impact: [
      "Consistent visual identity maintained across a long engagement",
      "Awareness and campaign content produced on a regular publishing rhythm",
      "Advertising creative aligned with organic communication",
    ],
    relatedCapabilities: ["social-media", "performance-marketing", "brand-creative"],
  },
  {
    slug: "pasbaan-e-adab",
    client: "Pasbaan-e-Adab",
    title: "Extending culture through digital storytelling",
    summary: "Event design, video and digital storytelling for a cultural and literary platform.",
    industry: "Culture and Events",
    industrySlug: "culture-events",
    location: "Mumbai",
    tags: ["Video", "Social Media", "Events"],
    filters: ["Video", "Social Media", "Campaigns"],
    services: [
      "YouTube video editing",
      "Reels and short-form content",
      "Event creatives",
      "Cultural and literary communication",
      "Promotional video",
    ],
    featured: true,
    metaTitle: "Pasbaan-e-Adab Cultural Content & Video Case Study | Diglizer",
    metaDescription:
      "YouTube editing, reels, event creatives and promotional video supporting a literary and cultural platform in Mumbai.",
    headline: "Extending culture through digital storytelling.",
    image: "/media/case-pasbaan-e-adab.jpg",
    imageAlt: "Editorial composition representing Pasbaan-e-Adab cultural event content",
    provisionalMedia: true,
    overview: [
      "Literary and cultural programming produces rich material that is easy to under-use. The work focused on turning event footage and moments into content with a longer life.",
      "Design and editing respected the literary context rather than flattening it into generic event promotion.",
    ],
    challenge: {
      heading: "The challenge",
      paragraphs: [
        "Cultural audiences notice when the craft does not match the content. Typography, pacing and language choices all carry weight.",
        "Promotional windows before events are short, so assets have to be produced quickly without dropping standards.",
      ],
    },
    strategy: {
      heading: "Strategic response",
      paragraphs: [
        "We built a recognisable event design language and an editing approach that let single sessions produce long-form, short-form and still assets.",
      ],
    },
    solution: {
      heading: "The solution",
      bullets: [
        "YouTube video editing for full sessions",
        "Reels and short-form derivatives",
        "Event creatives and posters",
        "Promotional video",
        "Cultural and literary social content",
      ],
    },
    impact: [
      "Event footage reused across long-form and short-form formats",
      "Consistent event communication across promotional cycles",
    ],
    relatedCapabilities: ["video-content", "social-media", "brand-creative"],
  },
];

export interface SelectedProject {
  client: string;
  category: string;
  involvement: string;
  description: string;
}

export const selectedProjects: SelectedProject[] = [
  {
    client: "Siddhartha Logic",
    category: "Professional services",
    involvement: "Creative and communication design support",
    description:
      "Design support across brand communication material for a professional services organisation.",
  },
  {
    client: "Prober",
    category: "Technology and services",
    involvement: "Creative and digital design support",
    description: "Brand-consistent digital and communication design assets.",
  },
  {
    client: "EPIA Fertility",
    category: "Healthcare and fertility",
    involvement: "Healthcare communication design",
    description:
      "Fertility communication creative developed with the sensitivity the category requires.",
  },
  {
    client: "Aikaa Fashion",
    category: "Fashion and lifestyle",
    involvement: "Fashion creative and social content",
    description: "Visual direction and social media creative for a fashion and lifestyle audience.",
  },
  {
    client: "Eminence Stocks",
    category: "Finance and professional services",
    involvement: "Educational content and creative design",
    description:
      "Compliance-aware educational content design for a finance audience, without advice or return claims.",
  },
  {
    client: "Trek Power Adventures",
    category: "Travel and adventure",
    involvement: "Adventure travel creative",
    description: "Campaign and social creative supporting adventure travel communication.",
  },
];

export const clientStrip = [
  "Genetics Cryobank",
  "Grace26",
  "TripWithOwners",
  "Yashoda IVF",
  "Pasbaan-e-Adab",
  "Siddhartha Logic",
  "Prober",
  "EPIA Fertility",
  "Aikaa Fashion",
  "Eminence Stocks",
  "Trek Power Adventures",
];

export const workFilters = [
  "All",
  "Integrated",
  "Branding",
  "Campaigns",
  "Social Media",
  "Websites",
  "Video",
  "Packaging",
  "Performance Marketing",
  "Photography",
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getNextProject = (slug: string) => {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return projects[0];
  return projects[(index + 1) % projects.length];
};
