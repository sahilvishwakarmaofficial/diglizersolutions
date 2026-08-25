/**
 * Central project/case-study content.
 * `provisional: true` marks media that is a designed stand-in and can be
 * replaced with approved client material without touching any component.
 * Verified external links live in src/content/clients.ts.
 */

import { clientLinks, type ClientLinks, type MediaAsset, type VideoAsset } from "./clients";

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
  /** Editorial grid weight on the work page. */
  span?: "wide" | "standard";
  metaTitle: string;
  metaDescription: string;
  headline: string;
  image: string;
  imageAlt: string;
  provisionalMedia: boolean;
  links: ClientLinks;
  /** Full-width media band inside the case study. */
  feature?: MediaAsset;
  /** Device/website composition. */
  screens?: MediaAsset[];
  gallery: MediaAsset[];
  videos?: VideoAsset[];
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
    span: "wide",
    metaTitle: "Genetics Cryobank Integrated Healthcare Marketing Case Study | Diglizer",
    metaDescription:
      "How Diglizer supported Genetics Cryobank with awareness campaigns, donor lead-generation creative, multi-city advertising and exhibition material.",
    headline: "Integrated creative and growth support for a specialist fertility brand.",
    image: "/media/clients/genetics-social-grid.jpg",
    imageAlt: "Genetics Cryobank campaign creative layouts pinned in a grid",
    provisionalMedia: true,
    links: clientLinks["genetics-cryobank"]!,
    feature: {
      src: "/media/clients/genetics-exhibition.jpg",
      alt: "Healthcare conference exhibition stall with printed panels and danglers",
      caption: "Exhibition system — stall panels, danglers and standees for national conferences",
      ratio: "16:9",
      kind: "exhibition",
      provisional: true,
    },
    gallery: [
      {
        src: "/media/clients/genetics-social-grid.jpg",
        alt: "Grid of fertility awareness campaign posts",
        caption: "Awareness campaign system",
        ratio: "16:9",
        kind: "social",
        provisional: true,
        sourceUrl: "https://www.instagram.com/geneticscryobank/",
      },
      {
        src: "/media/clients/genetics-reels.jpg",
        alt: "Vertical short-video frames from a healthcare awareness campaign",
        caption: "Reel and story frames",
        ratio: "16:9",
        kind: "video",
        provisional: true,
        sourceUrl: "https://www.instagram.com/geneticscryobank/reels/",
      },
      {
        src: "/media/clients/genetics-exhibition.jpg",
        alt: "Exhibition stall panels and hanging danglers",
        caption: "ACE conference exhibition graphics",
        ratio: "16:9",
        kind: "exhibition",
        provisional: true,
      },
      {
        src: "/media/digital/analytics.jpg",
        alt: "Abstract campaign performance panels",
        caption: "Lead-form and city-level campaign structure",
        ratio: "16:9",
        kind: "social",
        provisional: true,
      },
      {
        src: "/media/case-genetics-cryobank.jpg",
        alt: "Atmospheric visual representing cryogenic storage",
        caption: "Category atmosphere visual",
        ratio: "16:9",
        kind: "photography",
        provisional: true,
      },
      {
        src: "/media/digital/content-calendar.jpg",
        alt: "Content calendar with scheduled campaign posts",
        caption: "Multi-city publishing calendar",
        ratio: "16:9",
        kind: "social",
        provisional: true,
      },
    ],
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
      "Website strategy",
      "UX/UI design",
      "Website development",
      "Product structure",
      "Form integration",
      "Backend database",
      "Email notifications",
      "Deployment support",
      "Packaging and communication",
    ],
    featured: true,
    span: "wide",
    metaTitle: "Grace26 B2B Medical Brand & Website Case Study | Diglizer",
    metaDescription:
      "Brand communication, packaging, product catalogue structure and a full medical product website with forms, database and email notifications.",
    headline: "Building a modern B2B healthcare brand ecosystem.",
    image: "/media/clients/grace26-website.jpg",
    imageAlt: "Grace26 medical products website shown on laptop and phone",
    provisionalMedia: true,
    links: clientLinks["grace26"]!,
    feature: {
      src: "/media/clients/grace26-packaging.jpg",
      alt: "Surgical mask and glove packaging with catalogue sheets",
      caption: "Packaging and product communication across the surgical range",
      ratio: "16:9",
      kind: "packaging",
      provisional: true,
    },
    screens: [
      {
        src: "/media/clients/grace26-website.jpg",
        alt: "Grace26 website homepage and product grid on desktop",
        caption: "Homepage, product listing and category structure on desktop",
        ratio: "16:9",
        kind: "website",
        provisional: true,
        sourceUrl: "https://grace26.in/",
      },
      {
        src: "/media/clients/grace26-mobile.jpg",
        alt: "Grace26 product detail and enquiry form on mobile",
        caption: "Product detail, healthcare solutions and enquiry form on mobile",
        ratio: "16:9",
        kind: "website",
        provisional: true,
        sourceUrl: "https://grace26.in/",
      },
    ],
    gallery: [
      {
        src: "/media/clients/grace26-packaging.jpg",
        alt: "Medical packaging system",
        caption: "Surgical mask and glove packaging",
        ratio: "16:9",
        kind: "packaging",
        provisional: true,
      },
      {
        src: "/media/clients/grace26-website.jpg",
        alt: "Website product listing",
        caption: "Product listing and filters",
        ratio: "16:9",
        kind: "website",
        provisional: true,
      },
      {
        src: "/media/clients/grace26-mobile.jpg",
        alt: "Mobile enquiry form",
        caption: "Enquiry and careers forms",
        ratio: "16:9",
        kind: "website",
        provisional: true,
      },
      {
        src: "/media/case-grace26.jpg",
        alt: "Product mockups and catalogue spreads",
        caption: "Catalogues and product mockups",
        ratio: "16:9",
        kind: "print",
        provisional: true,
      },
      {
        src: "/media/digital/design-system.jpg",
        alt: "Design system board with type scale and colour tokens",
        caption: "Header, footer and component system",
        ratio: "16:9",
        kind: "website",
        provisional: true,
      },
      {
        src: "/media/clients/genetics-exhibition.jpg",
        alt: "Exhibition panels and standees",
        caption: "Exhibition panels and trade material",
        ratio: "16:9",
        kind: "exhibition",
        provisional: true,
      },
    ],
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
    summary: "A travel community brand centred on shared experiences, adventure and connection.",
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
    span: "standard",
    metaTitle: "TripWithOwners Travel Brand & Website Case Study | Diglizer",
    metaDescription:
      "Travel brand positioning, visual direction and a multi-page community travel website with itineraries, enquiry forms and deployment support.",
    headline: "Creating a travel brand built around shared experiences.",
    image: "/media/clients/two-website.jpg",
    imageAlt: "TripWithOwners community travel website homepage on a desktop screen",
    provisionalMedia: true,
    links: clientLinks["tripwithowners"]!,
    feature: {
      src: "/media/clients/two-travel.jpg",
      alt: "Goa coastline, beach bonfire, coastal road and campsite at night",
      caption: "Experience-led art direction — adventure, nightlife, friendship and downtime",
      ratio: "16:9",
      kind: "photography",
      provisional: true,
    },
    screens: [
      {
        src: "/media/clients/two-website.jpg",
        alt: "TripWithOwners homepage with itinerary cards on desktop",
        caption: "Homepage, trips and experiences on desktop",
        ratio: "16:9",
        kind: "website",
        provisional: true,
        sourceUrl: "https://tripwithowners.com/",
      },
      {
        src: "/media/clients/two-mobile.jpg",
        alt: "TripWithOwners trips, Goa itinerary and enquiry form on mobile",
        caption: "Trips, Goa Community Escape itinerary and enquiry on mobile",
        ratio: "16:9",
        kind: "website",
        provisional: true,
        sourceUrl: "https://tripwithowners.com/",
      },
    ],
    gallery: [
      {
        src: "/media/clients/two-website.jpg",
        alt: "Travel website homepage",
        caption: "Homepage",
        ratio: "16:9",
        kind: "website",
        provisional: true,
      },
      {
        src: "/media/clients/two-mobile.jpg",
        alt: "Travel website on mobile",
        caption: "Trips and private trips on mobile",
        ratio: "16:9",
        kind: "website",
        provisional: true,
      },
      {
        src: "/media/clients/two-travel.jpg",
        alt: "Goa travel photography grid",
        caption: "Gallery and experience photography direction",
        ratio: "16:9",
        kind: "photography",
        provisional: true,
      },
      {
        src: "/media/case-tripwithowners.jpg",
        alt: "Community travel brand visual",
        caption: "Community and about storytelling",
        ratio: "16:9",
        kind: "social",
        provisional: true,
      },
    ],
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
    span: "standard",
    metaTitle: "Yashoda IVF Fertility Communication Case Study | Diglizer",
    metaDescription:
      "IVF and IUI campaign design, fertility awareness content and advertising creative delivered through a consistent social media system.",
    headline: "Building trust through consistent fertility communication.",
    image: "/media/clients/yashoda-social.jpg",
    imageAlt: "Yashoda IVF fertility awareness social creatives laid out on a warm surface",
    provisionalMedia: true,
    links: clientLinks["yashoda-ivf"]!,
    feature: {
      src: "/media/clients/yashoda-campaign.jpg",
      alt: "Festival fertility clinic advertisement as poster and tablet layout",
      caption: "Festival and occasion communication across print and digital",
      ratio: "16:9",
      kind: "social",
      provisional: true,
    },
    gallery: [
      {
        src: "/media/clients/yashoda-social.jpg",
        alt: "Fertility awareness post series",
        caption: "Awareness content series",
        ratio: "16:9",
        kind: "social",
        provisional: true,
      },
      {
        src: "/media/clients/yashoda-campaign.jpg",
        alt: "Festival campaign layouts",
        caption: "Festival campaign layouts",
        ratio: "16:9",
        kind: "social",
        provisional: true,
      },
      {
        src: "/media/case-yashoda-ivf.jpg",
        alt: "IVF and IUI campaign creative",
        caption: "IVF and IUI campaign design",
        ratio: "16:9",
        kind: "social",
        provisional: true,
      },
      {
        src: "/media/digital/content-calendar.jpg",
        alt: "Content calendar with scheduled posts",
        caption: "Publishing calendar and design system",
        ratio: "16:9",
        kind: "social",
        provisional: true,
      },
    ],
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
    span: "wide",
    metaTitle: "Pasbaan-e-Adab Cultural Content & Video Case Study | Diglizer",
    metaDescription:
      "YouTube editing, reels, event creatives and promotional video supporting a literary and cultural platform in Mumbai.",
    headline: "Extending culture through digital storytelling.",
    image: "/media/clients/pasbaan-events.jpg",
    imageAlt: "Literary festival event creatives displayed on a dark wall",
    provisionalMedia: true,
    links: clientLinks["pasbaan-e-adab"]!,
    feature: {
      src: "/media/clients/pasbaan-photo.jpg",
      alt: "Warmly lit auditorium stage set for a poetry gathering",
      caption: "Event photography and coverage across the programme",
      ratio: "16:9",
      kind: "photography",
      provisional: true,
    },
    gallery: [
      {
        src: "/media/clients/pasbaan-events.jpg",
        alt: "Literary festival posters",
        caption: "Event creatives and posters",
        ratio: "16:9",
        kind: "print",
        provisional: true,
      },
      {
        src: "/media/clients/pasbaan-video.jpg",
        alt: "Video editing timeline with event footage",
        caption: "YouTube session editing",
        ratio: "16:9",
        kind: "video",
        provisional: true,
      },
      {
        src: "/media/clients/pasbaan-photo.jpg",
        alt: "Cultural event auditorium photography",
        caption: "Public-event photography",
        ratio: "16:9",
        kind: "photography",
        provisional: true,
      },
      {
        src: "/media/case-pasbaan-e-adab.jpg",
        alt: "Cultural stage performance visual",
        caption: "Programme communication",
        ratio: "16:9",
        kind: "photography",
        provisional: true,
      },
      {
        src: "/media/clients/genetics-reels.jpg",
        alt: "Vertical short-video frames",
        caption: "Reels and short-form derivatives",
        ratio: "16:9",
        kind: "video",
        provisional: true,
      },
      {
        src: "/media/digital/content-calendar.jpg",
        alt: "Content calendar for event promotion",
        caption: "Pre-event promotional cycle",
        ratio: "16:9",
        kind: "social",
        provisional: true,
      },
    ],
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
  {
    slug: "siddhartha-logic",
    client: "Siddhartha Logic",
    title: "Senior design and video support for a professional services organisation",
    summary: "Graphic design and video editing across brand and communication material.",
    industry: "Technology and Professional Services",
    industrySlug: "professional-services",
    location: "Mumbai",
    tags: ["Branding", "Video"],
    filters: ["Branding", "Video"],
    services: ["Senior graphic design", "Video editing", "Presentation and collateral design"],
    featured: false,
    span: "standard",
    metaTitle: "Siddhartha Logic Design & Video Case Study | Diglizer Solution",
    metaDescription:
      "Senior graphic design and video editing experience supporting brand and communication material for a professional services organisation.",
    headline: "Senior design and video support for a professional services organisation.",
    image: "/media/clients/siddhartha-design.jpg",
    imageAlt: "Professional services brand collateral and presentation design on a dark desk",
    provisionalMedia: true,
    links: clientLinks["siddhartha-logic"]!,
    gallery: [
      {
        src: "/media/clients/siddhartha-design.jpg",
        alt: "Brand collateral and presentation design",
        caption: "Collateral and presentation design",
        ratio: "16:9",
        kind: "print",
        provisional: true,
      },
      {
        src: "/media/digital/design-system.jpg",
        alt: "Design system board",
        caption: "Consistent communication system",
        ratio: "16:9",
        kind: "social",
        provisional: true,
      },
      {
        src: "/media/clients/pasbaan-video.jpg",
        alt: "Video editing timeline",
        caption: "Video editing and promo cutdowns",
        ratio: "16:9",
        kind: "video",
        provisional: true,
      },
    ],
    overview: [
      "Professional-experience engagement covering senior graphic design and video editing for an organisation with a steady communication calendar.",
    ],
    challenge: {
      heading: "The challenge",
      paragraphs: [
        "Output volume was high and turnaround short, so consistency had to come from reusable structure rather than case-by-case design decisions.",
      ],
    },
    strategy: {
      heading: "Strategic response",
      paragraphs: [
        "Templates, type hierarchy and a fixed colour discipline made frequent output recognisable without repeating the same layout.",
      ],
    },
    solution: {
      heading: "The solution",
      bullets: [
        "Senior graphic design across communication material",
        "Video editing for promotional and informational content",
        "Presentation and collateral systems",
      ],
    },
    impact: ["A consistent visual language across a high-frequency output cycle"],
    relatedCapabilities: ["brand-creative", "video-content"],
  },
  {
    slug: "prober",
    client: "Prober",
    title: "Freelance design and editing support",
    summary: "Freelance graphic design and video-editing work delivered to brand guidelines.",
    industry: "Professional Services",
    industrySlug: "professional-services",
    location: "India",
    tags: ["Branding", "Video"],
    filters: ["Branding", "Video"],
    services: ["Freelance graphic design", "Video editing"],
    featured: false,
    span: "standard",
    metaTitle: "Prober Freelance Design & Video Case Study | Diglizer Solution",
    metaDescription:
      "Freelance graphic design and video-editing work delivered to brand guidelines for a professional services client.",
    headline: "Freelance design and editing support.",
    image: "/media/clients/prober-design.jpg",
    imageAlt: "Freelance design workspace with brand sheets, swatches and a video edit",
    provisionalMedia: true,
    links: clientLinks["prober"]!,
    gallery: [
      {
        src: "/media/clients/prober-design.jpg",
        alt: "Brand guideline sheets and colour swatches",
        caption: "Brand-consistent design assets",
        ratio: "16:9",
        kind: "print",
        provisional: true,
      },
      {
        src: "/media/digital/design-system.jpg",
        alt: "Design tokens and component cards",
        caption: "Working to an existing system",
        ratio: "16:9",
        kind: "social",
        provisional: true,
      },
      {
        src: "/media/clients/pasbaan-video.jpg",
        alt: "Video timeline editing",
        caption: "Video editing support",
        ratio: "16:9",
        kind: "video",
        provisional: true,
      },
    ],
    overview: [
      "Freelance design and editing support produced inside an existing brand system, prioritising accuracy and turnaround.",
    ],
    challenge: {
      heading: "The challenge",
      paragraphs: [
        "Working inside someone else's brand system means the work has to disappear into the existing language rather than announce itself.",
      ],
    },
    strategy: {
      heading: "Strategic response",
      paragraphs: [
        "Guideline-first production, with asset naming and file structure that made handover simple.",
      ],
    },
    solution: {
      heading: "The solution",
      bullets: ["Graphic design assets", "Video editing", "Digital and communication collateral"],
    },
    impact: ["Reliable, guideline-accurate output across design and video"],
    relatedCapabilities: ["brand-creative", "video-content"],
  },
  {
    slug: "aikaa-fashion",
    client: "Aikaa Fashion",
    title: "Social content and Meta advertising for a fashion label",
    summary: "Social media posts, Reels and Meta advertising creative for a fashion audience.",
    industry: "Fashion and Lifestyle",
    industrySlug: "fashion-lifestyle",
    location: "Mumbai",
    tags: ["Social Media", "Campaigns", "Video"],
    filters: ["Social Media", "Campaigns", "Video", "Performance Marketing"],
    services: ["Social media posts", "Reels", "Meta advertising creative"],
    featured: false,
    span: "standard",
    metaTitle: "Aikaa Fashion Social & Meta Ads Case Study | Diglizer Solution",
    metaDescription:
      "Social media posts, Reels and Meta advertising creative developed for a fashion and lifestyle audience.",
    headline: "Social content and Meta advertising for a fashion label.",
    image: "/media/clients/aikaa-social.jpg",
    imageAlt: "Fashion campaign creatives arranged on a blush studio wall",
    provisionalMedia: true,
    links: clientLinks["aikaa-fashion"]!,
    gallery: [
      {
        src: "/media/clients/aikaa-social.jpg",
        alt: "Fashion campaign social creatives",
        caption: "Campaign creatives and lookbook posts",
        ratio: "16:9",
        kind: "social",
        provisional: true,
        sourceUrl: "https://aikaafashion.com/",
      },
      {
        src: "/media/digital/content-calendar.jpg",
        alt: "Content calendar for a fashion label",
        caption: "Content calendar and publishing rhythm",
        ratio: "16:9",
        kind: "social",
        provisional: true,
      },
      {
        src: "/media/clients/genetics-reels.jpg",
        alt: "Vertical reel frames",
        caption: "Reel formats and covers",
        ratio: "16:9",
        kind: "video",
        provisional: true,
      },
      {
        src: "/media/digital/analytics.jpg",
        alt: "Abstract campaign structure panels",
        caption: "Meta advertising creative variants",
        ratio: "16:9",
        kind: "social",
        provisional: true,
      },
    ],
    overview: [
      "Fashion moves quickly and rewards a recognisable feed. The work covered organic social, Reels and advertising creative built from the same seasonal direction.",
    ],
    challenge: {
      heading: "The challenge",
      paragraphs: [
        "Fashion audiences scroll fast. Product needs to look desirable in the first frame while still reading as one coherent label across the grid.",
      ],
    },
    strategy: {
      heading: "Strategic response",
      paragraphs: [
        "A seasonal art direction with fixed crop, type and colour rules kept organic posts, Reels and paid creative visually connected.",
      ],
    },
    solution: {
      heading: "The solution",
      bullets: ["Social media post series", "Reels and covers", "Meta advertising creative variants"],
    },
    impact: ["A consistent seasonal feed across organic and paid placements"],
    relatedCapabilities: ["social-media", "performance-marketing", "video-content"],
  },
];

export const clientStrip = [
  "Genetics Cryobank",
  "Yashoda IVF & Fertility Centre",
  "Grace26",
  "TripWithOwners",
  "Pasbaan-e-Adab",
  "Siddhartha Logic",
  "Prober",
  "Aikaa Fashion",
  "Satish Pradhan Dnyanasadhana College, Thane",
  "Maharashtra Police",
  "Suviksha Hospital",
  "MIMAS World Hospitals",
  "Advaith Hospital",
  "Xpert Super Speciality Trulife",
  "Mark Jewells",
  "Medibrain",
  "Mahadevi Hospital",
];

export const workFilters = [
  "All",
  "Healthcare",
  "Fertility",
  "Websites",
  "Branding",
  "Social Media",
  "Video",
  "Campaigns",
  "Packaging",
  "Education",
  "Government",
  "Fashion",
  "Travel",
  "Technology",
];


export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getNextProject = (slug: string) => {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return projects[0];
  return projects[(index + 1) % projects.length];
};
