/** Central registry of published resources. Hub cards, related links and the sitemap list come from here. */

export type ResourceCategory =
  | "Digital Marketing"
  | "Performance Marketing"
  | "AI and Prompting"
  | "Video and Motion"
  | "Content and Social Media"
  | "Creative Systems";

export type ResourceType =
  | "Prompt Library"
  | "Step-by-Step Guide"
  | "Framework"
  | "Checklist"
  | "Interactive Tool"
  | "Creative Playbook";

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface ResourceMeta {
  slug: string;
  path: string;
  title: string;
  seoTitle: string;
  description: string;
  summary: string;
  categories: ResourceCategory[];
  resourceType: ResourceType;
  difficulty: Difficulty;
  readingMinutes: number;
  publishedAt: string;
  updatedAt: string;
  cover: string;
  coverAlt: string;
  ogImage: string;
  related: string[];
  services: { slug: string; label: string }[];
}

export const resourceCategories: ResourceCategory[] = [
  "Digital Marketing",
  "Performance Marketing",
  "AI and Prompting",
  "Video and Motion",
  "Content and Social Media",
  "Creative Systems",
];

export const resourceTypes: ResourceType[] = [
  "Prompt Library",
  "Step-by-Step Guide",
  "Framework",
  "Checklist",
  "Interactive Tool",
  "Creative Playbook",
];

export const difficulties: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];

const S = {
  perf: { slug: "performance-marketing", label: "Performance Marketing" },
  strategy: { slug: "strategy-consulting", label: "Strategy and Consulting" },
  brand: { slug: "brand-creative", label: "Brand and Creative" },
  web: { slug: "websites-technology", label: "Websites and Technology" },
  social: { slug: "social-media", label: "Social Media" },
  video: { slug: "video-content", label: "Video and Content" },
  photo: { slug: "photography-production", label: "Photography and Production" },
};

export const resourceRegistry: ResourceMeta[] = [
  {
    slug: "ai-animation-styles",
    path: "/resources/ai-animation-styles",
    title: "10 AI Animation Styles for Scroll-Stopping Videos",
    seoTitle: "10 AI Animation Styles & Remotion Prompts | Sahil Vishwakarma",
    description:
      "Explore 10 copy-ready AI animation styles, a reusable Remotion scene prompt and practical refinement tips by Sahil Vishwakarma of Diglizer Solution.",
    summary:
      "Turn one simple scene into ten visually different animations with AI coding tools, React and Remotion.",
    categories: ["Video and Motion", "AI and Prompting"],
    resourceType: "Creative Playbook",
    difficulty: "Intermediate",
    readingMinutes: 9,
    publishedAt: "2026-11-16",
    updatedAt: "2026-11-16",
    cover: "/media/resources/ai-animation-styles-cover.webp",
    coverAlt: "Abstract purple and pink cover for the AI animation styles playbook",
    ogImage: "/media/resources/ai-animation-styles-og.jpg",
    related: ["motion-graphics-with-ai-code", "ai-video-editor-workflow", "ai-prompt-command-library"],
    services: [S.video, S.brand, S.social, S.perf],
  },
  {
    slug: "meta-ads-prompts",
    path: "/resources/meta-ads-prompts",
    title: "40 Meta Ads Prompts and Audit Framework",
    seoTitle: "40 Meta Ads Prompts and Audit Framework | Sahil Vishwakarma",
    description:
      "Use 40 practical Meta Ads prompts for reporting, campaign audits, creative analysis, audience insights, budget reviews and safer campaign planning.",
    summary:
      "Forty structured prompts and a full audit framework for reviewing Meta campaigns with evidence, not guesswork.",
    categories: ["Performance Marketing", "Digital Marketing", "AI and Prompting"],
    resourceType: "Framework",
    difficulty: "Intermediate",
    readingMinutes: 22,
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    cover: "/media/resources/meta-ads-prompts-cover.webp",
    coverAlt: "Abstract rising purple and pink ribbons suggesting campaign performance",
    ogImage: "/media/resources/meta-ads-prompts-og.jpg",
    related: ["ai-prompt-command-library", "ai-video-editor-workflow"],
    services: [S.perf, S.strategy, S.brand, S.web],
  },
  {
    slug: "ai-prompt-command-library",
    path: "/resources/ai-prompt-command-library",
    title: "AI Prompt Command Library for Creators and Businesses",
    seoTitle: "AI Prompt Library for Creators and Businesses | Sahil Vishwakarma",
    description:
      "Explore practical AI prompt templates for strategy, content, video, writing, design, business, productivity and better prompting.",
    summary:
      "Eighty original prompt commands across eight everyday creative and business jobs, plus a local prompt builder.",
    categories: ["AI and Prompting", "Content and Social Media", "Creative Systems"],
    resourceType: "Prompt Library",
    difficulty: "Beginner",
    readingMinutes: 25,
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    cover: "/media/resources/ai-prompt-command-library-cover.webp",
    coverAlt: "Stacked translucent purple and pink cards representing a prompt library",
    ogImage: "/media/resources/ai-prompt-command-library-og.jpg",
    related: ["meta-ads-prompts", "ai-animation-styles", "motion-graphics-with-ai-code"],
    services: [S.strategy, S.social, S.brand, S.web],
  },
  {
    slug: "motion-graphics-with-ai-code",
    path: "/resources/motion-graphics-with-ai-code",
    title: "Motion Graphics with AI Coding",
    seoTitle: "Motion Graphics with AI Coding and HyperFrames | Sahil Vishwakarma",
    description:
      "Learn how to plan and create motion graphics using AI coding tools, HyperFrames, HTML, CSS, animation timelines and FFmpeg.",
    summary:
      "How AI coding assistants build deterministic HTML motion graphics and render them to video — with moves, styles and prompts.",
    categories: ["Video and Motion", "AI and Prompting", "Creative Systems"],
    resourceType: "Step-by-Step Guide",
    difficulty: "Intermediate",
    readingMinutes: 18,
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    cover: "/media/resources/motion-graphics-with-ai-code-cover.webp",
    coverAlt: "Glowing card moving along purple and pink keyframe motion paths",
    ogImage: "/media/resources/motion-graphics-with-ai-code-og.jpg",
    related: ["ai-animation-styles", "ai-video-editor-workflow", "ai-prompt-command-library"],
    services: [S.video, S.brand, S.photo, S.social],
  },
  {
    slug: "ai-video-editor-workflow",
    path: "/resources/ai-video-editor-workflow",
    title: "Build an AI-Assisted Video Editing Workflow",
    seoTitle: "AI Video Editing Workflow with Whisper and FFmpeg | Sahil Vishwakarma",
    description:
      "Learn a practical AI-assisted video-editing workflow for organising footage, transcribing speech, planning edits, adding captions and reviewing final exports.",
    summary:
      "A seventeen-step, human-reviewed workflow from folder setup and transcription to storyboard, captions and quality control.",
    categories: ["Video and Motion", "Content and Social Media"],
    resourceType: "Step-by-Step Guide",
    difficulty: "Intermediate",
    readingMinutes: 20,
    publishedAt: "2026-11-18",
    updatedAt: "2026-11-18",
    cover: "/media/resources/ai-video-editor-workflow-cover.webp",
    coverAlt: "Film strip, audio waveform and editing timeline in purple and pink",
    ogImage: "/media/resources/ai-video-editor-workflow-og.jpg",
    related: ["motion-graphics-with-ai-code", "ai-animation-styles", "ai-prompt-command-library"],
    services: [S.video, S.social, S.brand, S.photo],
  },
];

export const featuredOrder = [
  "ai-animation-styles",
  "meta-ads-prompts",
  "ai-prompt-command-library",
  "motion-graphics-with-ai-code",
  "ai-video-editor-workflow",
];

export const getResource = (slug: string) => {
  const r = resourceRegistry.find((x) => x.slug === slug);
  if (!r) throw new Error(`Unknown resource ${slug}`);
  return r;
};

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
