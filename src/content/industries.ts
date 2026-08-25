export interface Industry {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  summary: string;
  challenges: string[];
  experience: string[];
  capabilities: string[];
  projects: string[];
  faqs: { question: string; answer: string }[];
}

export const industries: Industry[] = [
  {
    slug: "healthcare-fertility",
    name: "Healthcare and Fertility",
    metaTitle: "Healthcare & Fertility Marketing Agency | Diglizer Solution",
    metaDescription:
      "Ethical healthcare and fertility communication: awareness content, campaign creative, patient-trust messaging and advertising support from Thane and Mumbai.",
    headline: "Communication that earns trust before it asks for an enquiry.",
    summary:
      "Healthcare audiences make careful, emotional decisions. The work has to be accurate, sensitive and consistent across every channel.",
    challenges: [
      "Sensitive subjects require careful language and imagery",
      "Advertising platforms apply strict healthcare restrictions",
      "Patients compare several providers before making contact",
      "Clinical accuracy must survive translation into marketing",
    ],
    experience: [
      "Fertility awareness and treatment communication",
      "Donor awareness campaign creative",
      "Multi-city campaign adaptation with location targeting",
      "Exhibition and conference material for healthcare events",
      "WhatsApp and enquiry communication templates",
    ],
    capabilities: ["strategy-consulting", "brand-creative", "social-media", "performance-marketing"],
    projects: ["genetics-cryobank", "yashoda-ivf"],
    faqs: [
      {
        question: "Do you write medical claims?",
        answer:
          "No. We do not create success-rate or outcome claims. Clinical statements come from the clinical team and are presented responsibly.",
      },
      {
        question: "Can healthcare brands advertise on Meta and Google?",
        answer:
          "Within platform policy, yes. Creative and copy need to be written for those restrictions from the start rather than corrected after rejection.",
      },
    ],
  },
  {
    slug: "medical-surgical",
    name: "Medical and Surgical",
    metaTitle: "B2B Medical & Surgical Brand Communication | Diglizer Solution",
    metaDescription:
      "Product presentation, packaging, catalogues and B2B websites for medical and surgical product companies in Mumbai and across India.",
    headline: "Product credibility, built across packaging, catalogue and web.",
    summary:
      "B2B medical buyers evaluate specification, presentation and reliability. The brand has to look organised in every format.",
    challenges: [
      "Large product ranges that are difficult to navigate",
      "Mandatory product information competing with design",
      "Distributor and institutional audiences with different needs",
      "Quotation and enquiry workflows that need structure",
    ],
    experience: [
      "Product catalogue organisation and category structure",
      "Surgical consumables packaging and product communication",
      "Exhibition panels, standees and corporate collateral",
      "Medical product websites with filters, forms and notifications",
    ],
    capabilities: ["brand-creative", "packaging-print", "websites-technology", "photography-production"],
    projects: ["grace26"],
    faqs: [
      {
        question: "Can you structure a large product catalogue?",
        answer:
          "Yes. Category logic, naming and specification presentation are treated as design problems, not just data entry.",
      },
      {
        question: "Do you produce print-ready packaging artwork?",
        answer: "Yes, prepared to the supplied dieline and the printer's production specification.",
      },
    ],
  },
  {
    slug: "travel-hospitality",
    name: "Travel and Hospitality",
    metaTitle: "Travel & Hospitality Brand and Website Agency | Diglizer Solution",
    metaDescription:
      "Destination storytelling, itinerary presentation, travel websites and enquiry systems for travel brands and community trip organisers.",
    headline: "Experiences sold through atmosphere and clarity.",
    summary:
      "Travel decisions are emotional first and practical second. The brand needs to feel like the trip and answer the questions honestly.",
    challenges: [
      "Communicating an experience without over-promising",
      "Presenting itineraries, inclusions and pricing clearly",
      "Converting interest into enquiries quickly",
      "Seasonal content demands",
    ],
    experience: [
      "Travel brand positioning and visual direction",
      "Multi-page travel websites with itinerary structure",
      "Enquiry forms with secure storage and notifications",
      "Community trip campaign and social communication",
    ],
    capabilities: ["brand-creative", "websites-technology", "social-media", "video-content"],
    projects: ["tripwithowners", "trek-power-adventures"],
    faqs: [
      {
        question: "Can you build a booking or enquiry flow?",
        answer:
          "Yes. Most community travel brands start with a structured enquiry flow and add payment steps once volume justifies it.",
      },
      {
        question: "Do you handle destination content?",
        answer: "Yes, through art direction, copy and video editing built around each itinerary.",
      },
    ],
  },
  {
    slug: "fashion-lifestyle",
    name: "Fashion and Lifestyle",
    metaTitle: "Fashion & Lifestyle Creative Agency Mumbai | Diglizer Solution",
    metaDescription:
      "Visual identity, campaign photography, reels and paid social for fashion and lifestyle brands in Mumbai and Thane.",
    headline: "Taste, consistency and momentum.",
    summary:
      "Fashion brands live on visual rhythm. The work is about maintaining a recognisable standard at the pace social demands.",
    challenges: [
      "High content volume with limited production time",
      "Maintaining a consistent look across shoots",
      "Standing out in crowded social feeds",
      "Turning attention into purchase intent",
    ],
    experience: [
      "Brand and campaign visual direction",
      "Product and campaign photography",
      "Reels and short-form editing",
      "Paid social creative for fashion audiences",
    ],
    capabilities: ["brand-creative", "photography-production", "social-media", "performance-marketing"],
    projects: ["aikaa-fashion"],
    faqs: [
      {
        question: "Can you run monthly content production?",
        answer: "Yes, on a planned calendar with shoot days grouped to keep cost and turnaround predictable.",
      },
      {
        question: "Do you work with new labels?",
        answer: "Yes. Early-stage labels usually start with identity, a lookbook shoot and a social content system.",
      },
    ],
  },
  {
    slug: "professional-services",
    name: "Technology and Professional Services",
    metaTitle: "Technology & Professional Services Marketing | Diglizer Solution",
    metaDescription:
      "Trust-led communication, clear service explanation and brand design for technology and professional services firms in Mumbai and Thane.",
    headline: "Authority communicated without hype.",
    summary:
      "Financial and professional audiences respond to clarity and restraint. Educational content does more than promotional noise.",
    challenges: [
      "Regulatory sensitivity around claims and advice",
      "Complex services that need simple explanation",
      "Long consideration cycles",
      "Differentiating from look-alike competitors",
    ],
    experience: [
      "Educational and explanatory social content",
      "Brand and communication design for professional firms",
      "Website structure for service explanation and enquiries",
    ],
    capabilities: ["strategy-consulting", "brand-creative", "social-media", "websites-technology"],
    projects: ["siddhartha-logic", "prober"],
    faqs: [
      {
        question: "Do you provide investment advice or profit projections?",
        answer:
          "No. We do not create investment advice, return claims or profit projections. Content stays educational and compliance-aware.",
      },
      {
        question: "Can you work with our compliance team?",
        answer: "Yes. Review cycles are built into the calendar so approvals do not delay publishing.",
      },
    ],
  },
  {
    slug: "culture-events",
    name: "Culture and Events",
    metaTitle: "Cultural & Event Marketing Agency Mumbai | Diglizer Solution",
    metaDescription:
      "Event promotion, cultural storytelling, video editing, posters and reels for literary, cultural and community events.",
    headline: "Culture deserves craft, not templates.",
    summary:
      "Events need momentum before the date and a legacy after it. Both are content problems as much as design problems.",
    challenges: [
      "Short promotional windows",
      "Multi-format assets for print, stage and social",
      "Capturing the event well enough to reuse afterwards",
      "Respecting cultural and literary context",
    ],
    experience: [
      "Event creatives, posters and promotional design",
      "YouTube editing and short-form cultural content",
      "Event storytelling and highlight videos",
    ],
    capabilities: ["brand-creative", "video-content", "social-media", "photography-production"],
    projects: ["pasbaan-e-adab"],
    faqs: [
      {
        question: "Can you produce assets on an event timeline?",
        answer: "Yes, with a fixed asset list and approval schedule agreed before the promotional window opens.",
      },
      {
        question: "Do you edit long-form event video?",
        answer: "Yes — full sessions, highlight cuts and short-form derivatives from the same footage.",
      },
    ],
  },
  {
    slug: "startups-local-businesses",
    name: "Startups and Local Businesses",
    metaTitle: "Digital Marketing for Local Businesses in Thane | Diglizer Solution",
    metaDescription:
      "Brand launch, website, Google Business Profile support, local SEO, social content and lead generation for startups and local businesses in Thane and Mumbai.",
    headline: "Everything a growing business needs, in a sensible order.",
    summary:
      "Smaller budgets need sequencing. We prioritise the work that produces enquiries first and build the rest as the business grows.",
    challenges: [
      "Limited budget and internal marketing time",
      "Weak local search visibility",
      "No consistent brand assets",
      "Enquiries arriving with no system to manage them",
    ],
    experience: [
      "Brand launch kits and website builds",
      "Google Business Profile and local search support",
      "Social content systems for small teams",
      "Lead-generation campaigns with structured follow-up",
    ],
    capabilities: ["brand-creative", "websites-technology", "performance-marketing", "social-media"],
    projects: ["trek-power-adventures"],
    faqs: [
      {
        question: "What should a local business do first?",
        answer:
          "Usually a clear website with strong enquiry paths and a correctly configured Google Business Profile. Paid media works far better once those exist.",
      },
      {
        question: "Do you work on retainers or projects?",
        answer: "Both. Many businesses start with a defined project and move to a monthly scope afterwards.",
      },
    ],
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
