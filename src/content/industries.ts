export interface Industry {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  summary: string;
  /** Short card description used on the index grid. */
  cardCopy: string;
  challenges: string[];
  experience: string[];
  capabilities: string[];
  /** Client slugs from src/content/clients.ts. */
  clients: string[];
  /** Published case-study slugs from src/content/projects.ts. */
  projects: string[];
  /** Service tags shown on the industry card. */
  services: string[];
  faqs: { question: string; answer: string }[];
}

export const industries: Industry[] = [
  {
    slug: "healthcare-fertility-hospitals",
    name: "Healthcare, Fertility & Hospitals",
    metaTitle: "Healthcare, Fertility & Hospital Design Agency | Diglizer Solution",
    metaDescription:
      "Healthcare, fertility and hospital communication: campaign creative, social media, Meta advertising design, logo and internal hospital branding from Thane and Mumbai.",
    headline: "Healthcare communication built around trust, clarity and care.",
    summary:
      "Healthcare communication must balance empathy, credibility, accessibility and responsible creative execution. We help healthcare and fertility organisations communicate complex services clearly across digital, social, advertising and brand touchpoints.",
    cardCopy:
      "Campaign creative, social media, advertising design, logo work and internal hospital branding for fertility clinics, hospitals and healthcare groups.",
    challenges: [
      "Sensitive subjects require careful language and imagery",
      "Advertising platforms apply strict healthcare restrictions",
      "Patients compare several providers before making contact",
      "Clinical accuracy must survive translation into marketing",
      "Communication has to work across digital, print and physical spaces",
    ],
    experience: [
      "Fertility awareness and treatment communication",
      "Donor awareness campaign creative and multi-city adaptation",
      "Hospital social-media post design and Meta Ads campaign creatives",
      "Logo design and internal hospital branding systems",
      "Exhibition and conference material for healthcare events",
      "Recruitment and awareness communication",
    ],
    capabilities: [
      "brand-creative",
      "social-media",
      "performance-marketing",
      "video-content",
      "websites-technology",
      "strategy-consulting",
    ],
    clients: ["genetics-cryobank", "yashoda-ivf", "suviksha-hospital", "mimas-world-hospitals"],
    projects: ["genetics-cryobank", "yashoda-ivf", "mimas-world-hospitals", "suviksha-hospital"],
    services: [
      "Healthcare branding",
      "Fertility communication",
      "Hospital graphic design",
      "Social-media campaigns",
      "Meta advertising creative",
      "Awareness communication",
      "Logo design",
      "Internal hospital branding",
      "Video content",
      "Website design",
      "Recruitment communication",
      "Exhibition design",
    ],
    faqs: [
      {
        question: "Do you write medical claims?",
        answer:
          "No. We do not create success-rate or outcome claims. Clinical statements come from the clinical team and are presented responsibly.",
      },
      {
        question: "What is the difference between the campaign work and the branding work?",
        answer:
          "Campaign and social-media design covers MIMAS World Hospitals and Suviksha Hospital. Fertility communication covers Genetics Cryobank and Yashoda IVF & Fertility Centre.",
      },
    ],
  },
  {
    slug: "medical-products-b2b-healthcare",
    name: "Medical Products & B2B Healthcare",
    metaTitle: "Medical Product & B2B Healthcare Design Agency | Diglizer Solution",
    metaDescription:
      "Medical-product websites, B2B catalogues, packaging, exhibition panels and enquiry systems for surgical and medical product companies across India.",
    headline: "Turning technical products into clear, credible buying experiences.",
    summary:
      "B2B medical buyers evaluate specification, presentation and reliability. The brand has to look organised in every format — from the packaging in a hospital store to the catalogue in a distributor's hand and the website behind the enquiry.",
    cardCopy:
      "Product websites, catalogues, packaging, exhibition material and enquiry systems for medical and surgical product companies.",
    challenges: [
      "Large product ranges that are difficult to navigate",
      "Mandatory product information competing with design",
      "Distributor and institutional audiences with different needs",
      "Quotation and enquiry workflows that need structure",
    ],
    experience: [
      "Medical-product website design, development and deployment",
      "Product category structure, filters and enquiry systems",
      "Packaging and print-ready production artwork",
      "B2B catalogues and product communication",
      "Exhibition panels, standees and corporate collateral",
      "Product mockups and presentation visuals",
    ],
    capabilities: [
      "websites-technology",
      "packaging-print",
      "brand-creative",
      "photography-production",
    ],
    clients: ["grace26", "genetics-cryobank"],
    projects: ["grace26", "genetics-cryobank"],
    services: [
      "Medical-product websites",
      "B2B catalogues",
      "Packaging",
      "Product communication",
      "Product photography",
      "Product mockups",
      "Exhibition panels",
      "Standees",
      "Enquiry systems",
      "Product filters",
      "Corporate communication",
    ],
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
    slug: "education-learning",
    name: "Education & Learning",
    metaTitle: "Education & College Graphic Design Agency | Diglizer Solution",
    metaDescription:
      "Admission campaigns, college branding, booklet design, exhibition creatives and LED panel design for educational institutions and learning platforms.",
    headline: "Education communication designed to inform, engage and inspire.",
    summary:
      "Educational institutions speak to students, parents, faculty and visitors across a wide mix of printed, digital and large-format touchpoints. The communication has to stay clear and consistent in all of them.",
    cardCopy:
      "Admission campaigns, institutional branding, booklets, exhibition creatives and LED panel design for colleges and learning platforms.",
    challenges: [
      "Several audiences reading the same message differently",
      "Admission cycles that compress a lot of communication into a short window",
      "Formats ranging from a booklet page to a large LED display",
      "Institutional credibility that must never look improvised",
    ],
    experience: [
      "Admission campaign posts and 'Admissions Open' creatives",
      "College branding materials and institutional communication",
      "Booklet design and print-ready artwork",
      "Exhibition creatives and event display communication",
      "LED panel designs for large-format display",
      "Educational content, social-media design and video editing",
    ],
    capabilities: ["brand-creative", "social-media", "video-content", "packaging-print"],
    clients: ["prober", "dnyanasadhana-college"],
    projects: ["prober", "dnyanasadhana-college"],
    services: [
      "Institutional graphic design",
      "Admission campaigns",
      "Social-media communication",
      "College branding",
      "Booklet design",
      "Exhibition creatives",
      "LED panel design",
      "Educational content",
      "Video editing",
      "Print communication",
    ],
    faqs: [
      {
        question: "Can you work to an admission calendar?",
        answer:
          "Yes. Admission communication is planned as a sequence so each creative arrives when the audience is actually deciding.",
      },
      {
        question: "Do you supply print-ready and large-format files?",
        answer:
          "Yes — booklets, exhibition panels and LED panel artwork are prepared to the required output specification.",
      },
    ],
  },
  {
    slug: "government-public-service",
    name: "Government & Public Service",
    metaTitle: "Public Awareness & Road Safety Campaign Design | Diglizer Solution",
    metaDescription:
      "Public-awareness and road-safety communication design: social-media creatives, print material and information design for civic and public-service messaging.",
    headline: "Public communication created with clarity, responsibility and respect.",
    summary:
      "Public messages have to be understood immediately by a very broad audience. The work prioritises the instruction itself — hierarchy, legibility and restraint before decoration.",
    cardCopy:
      "Road-safety and public-awareness communication design across social media and print, created responsibly and without implied endorsement.",
    challenges: [
      "A single message must reach audiences of every age and language",
      "Serious subjects that cannot be trivialised by design",
      "Formats ranging from a phone screen to a printed hoarding",
      "Official marks and emblems that must be preserved exactly",
    ],
    experience: [
      "Navi Mumbai Police awareness communication",
      "Thane Police awareness communication",
      "Collaborative road-safety communication with Cycle Pure Agarbathi",
      "Do-not-drink-and-drive and seat-belt awareness creatives",
      "Public-awareness social-media posts and print material",
    ],
    capabilities: ["brand-creative", "social-media", "packaging-print"],
    clients: ["maharashtra-police"],
    projects: ["maharashtra-police"],
    services: [
      "Public-awareness communication",
      "Road-safety campaign design",
      "Social-media creative",
      "Print communication",
      "Information design",
      "Government and civic design",
    ],
    faqs: [
      {
        question: "Is Diglizer an official agency for any government department?",
        answer:
          "No. The work shown is selected project-based public-awareness design experience. No government endorsement, state-wide contract or official appointment is claimed.",
      },
      {
        question: "How are official emblems handled?",
        answer:
          "Emblems, department names and collaborator logos are preserved exactly as supplied. They are never animated, recoloured or used decoratively.",
      },
    ],
  },
  {
    slug: "travel-hospitality-community",
    name: "Travel, Hospitality & Community",
    metaTitle: "Travel & Community Brand and Website Agency | Diglizer Solution",
    metaDescription:
      "Travel branding, itinerary design, destination campaigns, community communication and enquiry systems for travel brands and trip organisers.",
    headline: "Travel brands built around experiences people want to join.",
    summary:
      "Travel decisions are emotional first and practical second. The brand has to make the experience feel worth joining, then make the logistics effortless to understand.",
    cardCopy:
      "Travel branding, websites, itinerary design, destination campaigns and enquiry systems for community-led travel brands.",
    challenges: [
      "Selling an experience that does not exist yet",
      "Itineraries that must feel exciting and still be readable",
      "Seasonal demand that swings sharply",
      "Trust signals for first-time travellers joining a group",
    ],
    experience: [
      "Travel brand direction and community positioning",
      "Website design with trip, itinerary and experience pages",
      "Destination campaign content and social communication",
      "Enquiry and booking-intent flows",
      "Short-form travel video content",
    ],
    capabilities: [
      "brand-creative",
      "websites-technology",
      "social-media",
      "video-content",
      "photography-production",
    ],
    clients: ["tripwithowners"],
    projects: ["tripwithowners"],
    services: [
      "Travel branding",
      "Website design",
      "Itinerary design",
      "Social media",
      "Destination campaigns",
      "Community communication",
      "Enquiry systems",
      "Video content",
    ],
    faqs: [
      {
        question: "How do you present itineraries?",
        answer:
          "As a scannable day-by-day structure with the atmosphere carried by imagery and the logistics carried by clear typography.",
      },
      {
        question: "Do travel sites need a booking engine?",
        answer:
          "Not always. A well-structured enquiry flow often converts better for curated group travel than a full booking engine.",
      },
    ],
  },
  {
    slug: "fashion-jewellery-lifestyle",
    name: "Fashion, Jewellery & Lifestyle",
    metaTitle: "Fashion & Jewellery Campaign Design Agency | Diglizer Solution",
    metaDescription:
      "Fashion content, jewellery campaigns, Reels, Meta Ads creative and lifestyle branding for fashion, jewellery and lifestyle brands in Mumbai and India.",
    headline: "Visual experiences designed to create desire and recognition.",
    summary:
      "Fashion, jewellery and lifestyle brands are judged on the first frame. Consistency of styling, crop, colour and rhythm is what turns a feed into a brand.",
    cardCopy:
      "Campaign creative, product-promotion design, Reels and Meta advertising for fashion, jewellery and lifestyle brands.",
    challenges: [
      "Category conventions that make every brand look alike",
      "Product detail that has to survive a small screen",
      "Constant content demand across formats",
      "Advertising creative that must sell without shouting",
    ],
    experience: [
      "Fashion campaign creatives and social-media systems",
      "Jewellery product-promotion creatives",
      "Meta Ads campaign design",
      "Short-form Reels and content formats",
      "Lifestyle brand communication",
    ],
    capabilities: [
      "brand-creative",
      "social-media",
      "performance-marketing",
      "photography-production",
      "video-content",
    ],
    clients: ["aikaa-fashion", "mark-jewells"],
    projects: ["aikaa-fashion", "mark-jewells"],
    services: [
      "Fashion content",
      "Jewellery campaigns",
      "Product-promotion creative",
      "Reels",
      "Social-media design",
      "Meta Ads creative",
      "Lifestyle branding",
      "Campaign design",
    ],
    faqs: [
      {
        question: "Do you shoot product photography?",
        answer:
          "Yes, where the engagement includes it. Otherwise we art-direct and design around supplied product photography.",
      },
      {
        question: "Can one creative system cover organic and paid?",
        answer:
          "Yes — the organic system sets the visual language and the advertising creative adapts it for platform requirements.",
      },
    ],
  },
  {
    slug: "culture-events-entertainment",
    name: "Culture, Events & Entertainment",
    metaTitle: "Cultural Event & Video Content Design Agency | Diglizer Solution",
    metaDescription:
      "Event creatives, cultural campaigns, YouTube editing, Reels, poster design and literary communication for cultural platforms and event organisers.",
    headline: "Extending culture through design, motion and digital storytelling.",
    summary:
      "Cultural work lives twice — once in the room and once online. The design system has to serve the event and the archive of content that follows it.",
    cardCopy:
      "Event creatives, poster design, YouTube editing, Reels and literary communication for cultural platforms and festivals.",
    challenges: [
      "Programmes that change until the last moment",
      "Multilingual typography that must stay beautiful",
      "Long-form recordings that need to become short-form content",
      "Community audiences who notice inauthentic design instantly",
    ],
    experience: [
      "Event creatives, posters and festival communication",
      "Senior video editing for long-form cultural sessions",
      "YouTube content, thumbnails and Reels",
      "Literary and cultural social communication",
      "Event photography direction",
    ],
    capabilities: ["brand-creative", "video-content", "social-media", "photography-production"],
    clients: [],
    projects: [],
    services: [
      "Event creatives",
      "Cultural campaigns",
      "YouTube editing",
      "Reels",
      "Poster design",
      "Event videos",
      "Literary communication",
      "Social media",
    ],
    faqs: [
      {
        question: "Can you handle multilingual cultural typography?",
        answer:
          "Yes. Script pairing, line breaks and legibility are set deliberately rather than left to default type settings.",
      },
      {
        question: "Do you edit long-form recordings?",
        answer:
          "Yes — full session edits for YouTube plus derived short-form cuts for Reels and stories.",
      },
    ],
  },
  {
    slug: "technology-professional-services",
    name: "Technology & Professional Services",
    metaTitle: "B2B Technology & Professional Services Creative | Diglizer Solution",
    metaDescription:
      "Brand communication, graphic design, explainer content, video editing and B2B creative for technology companies and professional-services firms.",
    headline: "Complex services made clearer, sharper and easier to understand.",
    summary:
      "Technology and professional-services brands lose deals to confusion far more often than to competition. The work is about making the offer legible.",
    cardCopy:
      "Brand communication, B2B creative, explainer content and video for technology companies and professional-services firms.",
    challenges: [
      "Offers that are hard to describe in one sentence",
      "Technical teams writing for technical peers, not buyers",
      "Long buying cycles needing consistent proof",
      "Categories with very little visual differentiation",
    ],
    experience: [
      "Brand and graphic-design communication for service businesses",
      "Corporate presentation, promo and explainer editing",
      "Social-media systems for B2B audiences",
      "Website communication and content structure",
    ],
    capabilities: [
      "strategy-consulting",
      "brand-creative",
      "video-content",
      "websites-technology",
      "social-media",
    ],
    clients: ["prober"],
    projects: ["prober"],
    services: [
      "Brand communication",
      "Graphic design",
      "Video editing",
      "Social media",
      "Explainer content",
      "Website communication",
      "B2B creative",
    ],
    faqs: [
      {
        question: "Can you simplify a technical offer without losing accuracy?",
        answer:
          "Yes. We build a message hierarchy with the subject-matter team so the simple version stays true to the detailed one.",
      },
      {
        question: "Do you produce explainer video?",
        answer: "Yes — scripting, editing and motion for presentation, sales and social use.",
      },
    ],
  },
  {
    slug: "mobility-automotive-ev-technology",
    name: "Mobility, Automotive & EV Technology",
    metaTitle: "EV, Mobility & Automotive Design Agency | Diglizer Solution",
    metaDescription:
      "Graphic design, print design, standee artwork and display communication for electric mobility, automotive and EV technology brands from Thane and Mumbai.",
    headline: "Communication designed for a world in motion.",
    summary:
      "Electric mobility brands operate at the intersection of technology, infrastructure, sustainability and everyday consumer behaviour. We create clear graphic and physical communication that helps complex mobility offerings feel more accessible and professional.",
    cardCopy:
      "Graphic design, print design, standee artwork and display communication for electric mobility and automotive brands.",
    challenges: [
      "A new category has to be explained quickly and credibly",
      "Physical communication competes for attention in busy environments",
      "Technical specification has to stay readable at large format",
      "Sustainability messaging must remain accurate and specific",
    ],
    experience: [
      "Standee artwork for electric-mobility communication",
      "Print-ready artwork prepared for large-format production",
      "Display and event communication for mobility environments",
    ],
    capabilities: ["brand-creative", "strategy-consulting"],
    clients: ["ather-energy", "trusterra"],
    projects: ["ather-energy", "trusterra"],
    services: [
      "Graphic design",
      "Print design",
      "Standee design",
      "Display communication",
      "Large-format artwork",
      "Print-ready artwork",
      "Event communication",
      "Mobility communication",
      "EV-sector creative",
    ],
    faqs: [
      {
        question: "What mobility work has Diglizer delivered?",
        answer:
          "Selected graphic and print-design experience, including standee artwork, for Ather Energy and TrusTerra. Vehicle design, product design and campaign ownership are not claimed.",
      },
    ],
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);

/** Obsolete industry URLs redirect to the closest current route. */
export const legacyIndustryRedirects: Record<string, string> = {
  "healthcare-fertility": "healthcare-fertility-hospitals",
  healthcare: "healthcare-fertility-hospitals",
  fertility: "healthcare-fertility-hospitals",
  "medical-surgical": "medical-products-b2b-healthcare",
  "travel-hospitality": "travel-hospitality-community",
  "fashion-lifestyle": "fashion-jewellery-lifestyle",
  "fashion-retail": "fashion-jewellery-lifestyle",
  "culture-events": "culture-events-entertainment",
  "professional-services": "technology-professional-services",
  "finance-professional-services": "technology-professional-services",
  "startups-local-businesses": "technology-professional-services",
  education: "education-learning",
  government: "government-public-service",
  "real-estate": "technology-professional-services",
  mobility: "mobility-automotive-ev-technology",
  automotive: "mobility-automotive-ev-technology",
  ev: "mobility-automotive-ev-technology",
};
