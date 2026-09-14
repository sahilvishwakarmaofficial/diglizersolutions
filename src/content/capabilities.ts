export interface CapabilityFaq {
  question: string;
  answer: string;
}

export interface Capability {
  slug: string;
  name: string;
  group: "Strategy" | "Creative" | "Technology" | "Growth";
  headline: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  problem: string;
  explanation: string[];
  deliverables: string[];
  process: { step: string; detail: string }[];
  industries: string[];
  relatedProjects: string[];
  faqs: CapabilityFaq[];
}

export const capabilityGroups = [
  {
    name: "Strategy",
    description:
      "Understanding the business, the market and the customer before anything is designed or launched.",
    items: [
      "Brand strategy",
      "Digital growth strategy",
      "Audience understanding",
      "Campaign planning",
      "Creative direction",
      "Communication consulting",
    ],
  },
  {
    name: "Creative",
    description:
      "Identity, content and campaign work that makes a brand recognisable across every touchpoint.",
    items: [
      "Brand identity",
      "Graphic design",
      "Campaign development",
      "Social content",
      "Video and motion",
      "Packaging",
      "Photography",
    ],
  },
  {
    name: "Technology",
    description:
      "Websites and digital products built to be fast, findable, maintainable and genuinely useful.",
    items: [
      "Website strategy",
      "UX/UI design",
      "Website development",
      "Landing pages",
      "Forms and databases",
      "Integrations",
      "Deployment",
    ],
  },
  {
    name: "Growth",
    description:
      "Media, search and social systems that turn attention into measurable business conversations.",
    items: [
      "Social media management",
      "Meta Ads",
      "Google Ads",
      "SEO",
      "Local search",
      "Lead generation",
      "WhatsApp marketing",
      "Analytics and optimisation",
    ],
  },
] as const;

export const capabilities: Capability[] = [
  {
    slug: "strategy-consulting",
    name: "Strategy and Consulting",
    group: "Strategy",
    headline: "Clarity before creativity.",
    metaTitle: "Digital Marketing Strategy Agency in Thane | Diglizer Solution",
    metaDescription:
      "Brand positioning, audience research, campaign planning and digital strategy consulting for businesses in Thane, Mumbai and across India.",
    summary:
      "We start with the business objective, not the deliverable, so every design and media decision has a reason behind it.",
    problem:
      "Many businesses commission logos, reels, websites and advertising separately, then discover that none of it adds up to a clear position in the market. Budget is spent on output rather than direction.",
    explanation: [
      "Strategy at Diglizer is deliberately practical. We work through what the business sells, who actually buys it, what competitors are saying and where the current digital presence is losing attention.",
      "The outcome is a written direction the whole team can work from: how the brand should be positioned, which audiences matter, what to say to them and which channels deserve budget first.",
      "We keep the document short enough to be used. A strategy that nobody reads has no value, so we prioritise decisions over decks.",
    ],
    deliverables: [
      "Brand positioning",
      "Digital strategy",
      "Audience research",
      "Competitor review",
      "Campaign planning",
      "Content strategy",
      "Creative direction",
      "Channel planning",
      "Customer journey review",
      "Growth consultation",
    ],
    process: [
      {
        step: "Business review",
        detail: "Objectives, offers, margins, sales process and current results.",
      },
      {
        step: "Market and audience",
        detail: "Who is being spoken to, and what they need to believe before enquiring.",
      },
      {
        step: "Positioning",
        detail: "A clear statement of what the brand stands for and how it differs.",
      },
      { step: "Plan", detail: "Channel priorities, creative direction and a sequence of work." },
    ],
    industries: ["healthcare-fertility", "medical-surgical", "startups-local-businesses"],
    relatedProjects: ["genetics-cryobank", "grace26"],
    faqs: [
      {
        question: "Do we need strategy work if we only want a website?",
        answer:
          "Not always. If the positioning and audience are already clear, we can move directly into design. If they are not, a short strategy phase usually saves rework later.",
      },
      {
        question: "How long does a strategy engagement take?",
        answer:
          "A focused positioning and channel plan typically takes two to three weeks, depending on how quickly information and stakeholder time are available.",
      },
    ],
  },
  {
    slug: "brand-creative",
    name: "Brand and Creative",
    group: "Creative",
    headline: "Identity built to be recognised, trusted and remembered.",
    metaTitle: "Branding & Creative Agency in Thane, Mumbai | Diglizer Solution",
    metaDescription:
      "Logo and brand identity design, brand guidelines, graphic design and campaign creative for brands in Thane and Mumbai.",
    summary:
      "Identity systems, campaign creative and everyday design that hold together across print, screen and social.",
    problem:
      "Brands lose credibility when every asset looks like it came from a different company. Inconsistent type, colour and tone quietly cost trust before a customer ever speaks to sales.",
    explanation: [
      "We build identity as a system rather than a single logo file: type scale, colour behaviour, layout rules, photography direction and templates the team can actually use.",
      "Campaign creative then works inside that system, so a hospital poster, an exhibition panel and an Instagram carousel still feel like one organisation.",
      "Where a brand already exists, we often refine rather than replace — protecting recognition while raising the standard of execution.",
    ],
    deliverables: [
      "Brand strategy",
      "Visual identity",
      "Logo systems",
      "Brand guidelines",
      "Graphic design",
      "Campaign concepts",
      "Advertising creative",
      "Social media design",
      "Brochures",
      "Catalogues",
      "Corporate communication",
    ],
    process: [
      { step: "Direction", detail: "Reference, tone and territory agreed before design begins." },
      { step: "Design", detail: "Identity or campaign routes developed in real applications." },
      { step: "System", detail: "Guidelines, templates and file handover." },
      { step: "Rollout", detail: "Application across digital, print and environment." },
    ],
    industries: ["medical-surgical", "fashion-lifestyle", "culture-events"],
    relatedProjects: ["grace26", "genetics-cryobank"],
    faqs: [
      {
        question: "Can you work with our existing logo?",
        answer:
          "Yes. Many engagements keep the existing mark and build a stronger system around it — type, colour, layout and templates.",
      },
      {
        question: "Do you provide print-ready files?",
        answer:
          "Yes. Packaging, panels and print collateral are supplied as production-ready artwork with the correct formats and bleeds.",
      },
    ],
  },
  {
    slug: "social-media",
    name: "Social Media",
    group: "Growth",
    headline: "Make every interaction feel unmistakably yours.",
    metaTitle: "Social Media Marketing Agency in Thane | Diglizer Solution",
    metaDescription:
      "Social media management, content calendars, carousel and reel design, and campaign support for brands in Thane and Mumbai.",
    summary:
      "Planned content systems rather than scattered posting — designed for consistency and easier approval cycles.",
    problem:
      "Social accounts stall when content is produced post by post. There is no calendar, no design system and no clear reason for each piece to exist.",
    explanation: [
      "We plan content in themes so each month has a purpose: education, proof, product, culture and offers in a considered mix.",
      "Design templates keep production fast without making the feed repetitive, and captions are written for the platform rather than copied across all of them.",
      "Reporting focuses on what changed and what to do next, not a screenshot of vanity metrics.",
    ],
    deliverables: [
      "Social strategy",
      "Content calendars",
      "Post and carousel design",
      "Reels",
      "Captions",
      "Publishing support",
      "Community-management support",
      "Campaigns",
      "Reporting",
      "Platform consistency",
    ],
    process: [
      { step: "Audit", detail: "Current content, audience and competitor benchmarks." },
      { step: "Calendar", detail: "Monthly themes, formats and publishing rhythm." },
      { step: "Production", detail: "Design, copy, editing and approvals." },
      { step: "Review", detail: "What performed, what to adjust next cycle." },
    ],
    industries: ["healthcare-fertility", "fashion-lifestyle", "culture-events"],
    relatedProjects: ["yashoda-ivf"],
    faqs: [
      {
        question: "Do you handle publishing or only design?",
        answer:
          "Both are available. Some clients prefer to publish internally with our calendar and assets; others ask us to schedule and publish.",
      },
      {
        question: "Which platforms do you work with?",
        answer:
          "Primarily Instagram, Facebook, LinkedIn and YouTube, with content adapted per platform rather than duplicated.",
      },
    ],
  },
  {
    slug: "video-content",
    name: "Video and Content",
    group: "Creative",
    headline: "Stories designed to hold attention and move people.",
    metaTitle: "Video Editing & Content Agency in Mumbai | Diglizer Solution",
    metaDescription:
      "Reels editing, YouTube editing, corporate and promotional video, motion graphics and content writing for brands in Mumbai and Thane.",
    summary:
      "Short-form and long-form video built around a message, with editing discipline that respects the viewer's time.",
    problem:
      "Video budgets are often spent on production value while the first three seconds, the structure and the call to action are left to chance.",
    explanation: [
      "We treat editing as storytelling: what the viewer needs to understand, in what order, and what should happen next.",
      "Short-form work is cut for silent viewing with legible typography and captions; long-form work is paced for retention rather than length.",
      "Motion graphics and content writing sit alongside editing so the message stays consistent from script to caption.",
    ],
    deliverables: [
      "Short-form video",
      "Reels",
      "YouTube editing",
      "Corporate video",
      "Promotional video",
      "Event highlights",
      "Product video",
      "Motion graphics",
      "Content writing",
      "Campaign copy",
    ],
    process: [
      { step: "Brief", detail: "Message, audience, platform and duration." },
      { step: "Structure", detail: "Script or edit outline agreed before the timeline is built." },
      { step: "Edit", detail: "Cut, grade, sound, graphics and captions." },
      { step: "Versions", detail: "Platform-specific aspect ratios and lengths." },
    ],
    industries: ["culture-events", "healthcare-fertility", "travel-hospitality"],
    relatedProjects: ["tripwithowners"],
    faqs: [
      {
        question: "Can you edit footage we already have?",
        answer:
          "Yes. A large share of our video work is post-production on client-supplied event, product or interview footage.",
      },
      {
        question: "Do you provide captions and subtitles?",
        answer:
          "Yes, including burned-in captions for social and SRT files where the platform supports them.",
      },
    ],
  },
  {
    slug: "websites-technology",
    name: "Websites and Technology",
    group: "Technology",
    headline: "Digital experiences built to perform beyond the first impression.",
    metaTitle: "Website Design & Development Company in Thane | Diglizer Solution",
    metaDescription:
      "Website strategy, UX/UI design, responsive development, landing pages, forms and integrations for businesses in Thane and Mumbai.",
    summary:
      "Websites planned around enquiries and search visibility, then built to stay fast and maintainable.",
    problem:
      "Many business websites look acceptable but fail commercially: unclear structure, weak enquiry paths, slow mobile performance and no reliable way to update content.",
    explanation: [
      "We start with information architecture — what pages must exist, what each one has to prove, and how a visitor reaches an enquiry from any entry point.",
      "Design and development follow with responsive layouts, accessible components, real form handling and secure database storage where enquiries need to be retained.",
      "Deployment, analytics, sitemap and robots configuration are part of the build, not an afterthought.",
    ],
    deliverables: [
      "Website strategy",
      "Information architecture",
      "UX/UI design",
      "Responsive development",
      "Business websites",
      "Healthcare websites",
      "Travel websites",
      "Product catalogue websites",
      "Landing pages",
      "Forms",
      "Database integration",
      "Email notifications",
      "Deployment",
      "Analytics",
      "Technical maintenance",
    ],
    process: [
      { step: "Architecture", detail: "Page map, content requirements and conversion paths." },
      { step: "Design", detail: "Responsive layouts and component system." },
      { step: "Build", detail: "Development, forms, integrations and testing." },
      { step: "Launch", detail: "Deployment, search configuration and handover." },
    ],
    industries: ["medical-surgical", "travel-hospitality", "startups-local-businesses"],
    relatedProjects: ["grace26", "tripwithowners"],
    faqs: [
      {
        question: "Can you work with our existing hosting or domain?",
        answer:
          "Usually yes. We review the current setup and recommend changes only where performance, security or search visibility require it.",
      },
      {
        question: "Do enquiries get stored securely?",
        answer:
          "Yes. Form submissions are validated on the server and stored in a protected database, with email notification where credentials are configured.",
      },
    ],
  },
  {
    slug: "performance-marketing",
    name: "Performance Marketing",
    group: "Growth",
    headline: "Creative that earns attention. Media that turns it into action.",
    metaTitle: "Performance Marketing & Meta Ads Agency in Thane | Diglizer Solution",
    metaDescription:
      "Meta and Google advertising, lead-generation funnels, location targeting, creative testing and reporting for brands in Thane and Mumbai.",
    summary:
      "Paid media planned around one measurable action, with creative built specifically for the placement.",
    problem:
      "Campaigns underperform when the creative is repurposed from a brochure, the landing experience is generic and no one agrees on what a good result looks like.",
    explanation: [
      "We define the action first — a form, a call, a WhatsApp conversation — then build creative and landing experiences for that single job.",
      "Audience and location strategy is planned deliberately, including city and PIN-code level targeting where the offer is geographically specific.",
      "Testing is structured: a limited number of variables at a time, with reporting that explains what changed and why.",
    ],
    deliverables: [
      "Paid media strategy",
      "Meta advertising",
      "Google advertising",
      "Lead-generation funnels",
      "Landing pages",
      "Audience strategy",
      "Location targeting",
      "Creative testing",
      "Retargeting",
      "Tracking",
      "Reporting",
      "Optimisation",
    ],
    process: [
      { step: "Objective", detail: "The single action the campaign must produce." },
      { step: "Setup", detail: "Accounts, tracking, audiences and landing experience." },
      { step: "Creative", detail: "Formats and messages built for the placement." },
      { step: "Optimise", detail: "Structured testing and regular reporting." },
    ],
    industries: ["healthcare-fertility", "fashion-lifestyle", "startups-local-businesses"],
    relatedProjects: ["genetics-cryobank", "yashoda-ivf"],
    faqs: [
      {
        question: "Do you guarantee a number of leads?",
        answer:
          "No. Guaranteed lead volumes or returns are not something any honest agency can promise. We commit to disciplined setup, creative quality and transparent reporting.",
      },
      {
        question: "Who holds the ad accounts?",
        answer:
          "The client. We work inside your Meta and Google accounts so the data, history and access stay with your business.",
      },
    ],
  },
  {
    slug: "photography-production",
    name: "Photography and Production",
    group: "Creative",
    headline: "Visuals that make the value of your brand visible.",
    metaTitle: "Product & Corporate Photography in Thane, Mumbai | Diglizer Solution",
    metaDescription:
      "Product photography, corporate portraits, event coverage, brand campaigns and videography across Thane and Mumbai.",
    summary:
      "Photography planned against the places the images will actually be used — catalogue, website, ads and social.",
    problem:
      "Shoots often produce beautiful frames that do not fit the crops, formats and messages the brand needs afterwards.",
    explanation: [
      "We plan shot lists from the deliverables: hero crops, catalogue angles, vertical social frames and space for typography.",
      "On product work, consistency across the range matters more than any single dramatic frame, so lighting and staging are standardised.",
      "Post-production is handled to the same standard as the capture, with retouching that stays honest to the product.",
    ],
    deliverables: [
      "Product photography",
      "Corporate portraits",
      "Event coverage",
      "Social media shoots",
      "Brand campaigns",
      "Commercial photography",
      "Videography",
      "Post-production",
    ],
    process: [
      { step: "Shot planning", detail: "Deliverables mapped to frames and formats." },
      { step: "Production", detail: "Set, lighting, styling and capture." },
      { step: "Selection", detail: "Curated selects rather than raw dumps." },
      { step: "Post", detail: "Retouching, formats and delivery." },
    ],
    industries: ["fashion-lifestyle", "medical-surgical", "culture-events"],
    relatedProjects: ["grace26"],
    faqs: [
      {
        question: "Do you shoot on location?",
        answer:
          "Yes — offices, clinics, events and retail spaces across Thane and Mumbai, alongside studio product work.",
      },
      {
        question: "How are images delivered?",
        answer: "As web-optimised and print-resolution sets, named and organised by intended use.",
      },
    ],
  },
  {
    slug: "packaging-print",
    name: "Packaging and Print",
    group: "Creative",
    headline: "Physical brand experiences designed with digital-level precision.",
    metaTitle: "Packaging & Print Design Agency in Mumbai | Diglizer Solution",
    metaDescription:
      "Packaging concepts, print-ready artwork, medical packaging, catalogues, brochures, standees and exhibition panels for brands in Mumbai and Thane.",
    summary:
      "Packaging, catalogues and exhibition material produced as artwork that survives real production.",
    problem:
      "Print work fails quietly: wrong dieline, unreadable regulatory text, colour that shifts on press, or panels designed without considering viewing distance.",
    explanation: [
      "We design to the dieline and the production method from the first draft, not after approval.",
      "For medical and surgical products, mandatory information is treated as part of the design rather than an obstacle to it.",
      "Exhibition graphics are set for the distance they will be read from, with the brand legible before the detail is.",
    ],
    deliverables: [
      "Packaging concepts",
      "Print-ready artwork",
      "Medical packaging",
      "Product boxes",
      "Labels",
      "Catalogues",
      "Brochures",
      "Standees",
      "Exhibition panels",
      "Corporate stationery",
    ],
    process: [
      { step: "Specification", detail: "Dielines, materials, print method and mandatory content." },
      { step: "Design", detail: "Concepts shown in realistic application." },
      { step: "Artwork", detail: "Production files with bleeds, profiles and proofs." },
      { step: "Press support", detail: "Vendor coordination and checks where required." },
    ],
    industries: ["medical-surgical", "fashion-lifestyle", "startups-local-businesses"],
    relatedProjects: ["grace26", "genetics-cryobank"],
    faqs: [
      {
        question: "Can you coordinate with our printer?",
        answer:
          "Yes. We supply files in the printer's required specification and review proofs before the run.",
      },
      {
        question: "Do you handle medical product packaging?",
        answer:
          "Yes, including product boxes, labels and catalogues where mandatory product information must be presented clearly.",
      },
    ],
  },
];

export const getCapability = (slug: string) => capabilities.find((c) => c.slug === slug);
