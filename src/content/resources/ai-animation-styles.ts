/** Editable content for the AI Animation Styles playbook (/resources/ai-animation-styles). */

export const AI_ANIMATION = {
  slug: "ai-animation-styles",
  path: "/resources/ai-animation-styles",
  title: "10 AI Animation Styles for Scroll-Stopping Videos",
  seoTitle: "10 AI Animation Styles & Remotion Prompts | Sahil Vishwakarma",
  description:
    "Explore 10 copy-ready AI animation styles, a reusable Remotion scene prompt and practical refinement tips by Sahil Vishwakarma of Diglizer Solution.",
  excerpt:
    "Turn one simple scene into ten visually different animations using AI coding tools, React and Remotion — with copy-ready prompts and refinement tips.",
  published: "2026-11-16",
  updated: "2026-11-16",
  readingMinutes: 9,
  poster: "/media/resources/ai-animation-base-scene-poster.webp",
  posterWidth: 864,
  posterHeight: 1536,
  ogImage: "/media/resources/ai-animation-styles-og.jpg",
};

export const basePrompt = `Code a five-second vertical animation at 1080 × 1920 and 60 fps using React and Remotion.

Show a side view of an office professional walking from left to right through a modern office while holding a stack of papers on one forearm.

The camera should track the person smoothly. The background should scroll past desks, computer monitors, a window, an indoor plant, a whiteboard with a chart, a wall clock and a water cooler.

At 2.7 seconds, one sheet should slip from the top of the stack and float behind the character.

Use one coordinated walk cycle connecting the hips, knees, shoulders and elbows. Keep the character's feet aligned with the floor to avoid visible foot sliding.

All movement must be deterministic. Do not use unseeded random values.

Keep the composition inside safe areas for Instagram Reels, YouTube Shorts and other 9:16 platforms.`;

export interface AnimationStyle {
  id: string;
  number: string;
  name: string;
  bestFor: string;
  tech: string;
  prompt: string;
}

export const animationStyles: AnimationStyle[] = [
  {
    id: "pixel-art",
    number: "01",
    name: "Pixel Art",
    bestFor: "Gaming content, nostalgic campaigns and playful product storytelling.",
    tech: "Canvas · nearest-neighbour scaling",
    prompt: `Use a 16-bit pixel-art game style. Draw the scene on a small internal canvas of approximately 180 × 320 and scale it to the final resolution using nearest-neighbour scaling so the pixels stay crisp.

Use a limited colour palette and animate the character in stepped sprite-like poses.

Include a lightweight game HUD with "TASKS 3/10", a step counter, an XP bar and three hearts. Add an "OFFICE QUEST" sign and a warm sunset outside the window.

When the sheet falls, remove one heart, display "−1" and change the sign to "OOPS".`,
  },
  {
    id: "chalkboard",
    number: "02",
    name: "Chalkboard",
    bestFor: "Educational content, explainers and process-based storytelling.",
    tech: "SVG noise · displacement",
    prompt: `Present the animation as a lesson drawn on a green chalkboard with a wooden frame and chalk tray.

Build all characters, objects and text using rough chalk-like strokes. Use SVG noise and displacement carefully to create texture without reducing legibility.

Animate notes as though they are being written by hand. Include "OFFICE 101", "SPEED > DEADLINE" and an arrow pointing towards the papers.

When the sheet falls, cross out the check mark, write "1 SHEET LOST" and change "PAPERS: 5" to "PAPERS: 4". Show the falling route as a dashed chalk line.`,
  },
  {
    id: "glow-sketch",
    number: "03",
    name: "Glow Sketch",
    bestFor: "Technology, music, futuristic storytelling and high-contrast social content.",
    tech: "SVG strokes · layered blur",
    prompt: `Use a black background with the office and character drawn using dotted golden lines.

Build the glow from a sharp primary stroke and a softer blurred duplicate rather than making every object heavily blurred.

Add a spotlight that follows the character, a glowing floor ring under the feet and a small "OFFICE" label at the top.

Keep the important outlines readable against the black background.`,
  },
  {
    id: "retro-low-poly",
    number: "04",
    name: "Retro Low-Poly Game",
    bestFor: "Gaming nostalgia, humorous content and stylised brand campaigns.",
    tech: "Three.js · low-res render",
    prompt: `Create an original early-2000s low-poly game aesthetic using Three.js.

Use simplified blocky models, low-resolution textures, flat lighting, restrained fog and warm sunset light through the office windows.

Render internally at approximately one-third of the final resolution and scale it up. Add subtle scanlines and controlled texture filtering.

Do not reproduce characters, environments or protected assets from any existing game.`,
  },
  {
    id: "comic-art",
    number: "05",
    name: "Comic Art",
    bestFor: "Storytelling, campaign hooks, dramatic reactions and creator-led content.",
    tech: "SVG halftone · panel layout",
    prompt: `Use bold pop-art comic styling with thick black outlines, halftone textures and directional speed lines.

Divide the composition into two panels: the office scene in the upper panel and a close-up of the character in the lower panel.

Add the caption "MEANWHILE, AT THE OFFICE..." and the speech bubble "Almost done...".

When the sheet falls, introduce an original burst reading "WHOOPS!" and change the lower panel to a surprised expression with "MY REPORT!"`,
  },
  {
    id: "flat-vector",
    number: "06",
    name: "Flat Vector",
    bestFor: "Corporate explainers, SaaS products, presentations and clean brand communication.",
    tech: "SVG shapes · soft shadows",
    prompt: `Create a flat vector corporate illustration with no heavy outlines, simple geometric forms and restrained soft shadows.

Use a dusk-blue office with a large window, a city skyline, a visible moon and ceiling lamps casting simple light cones.

Give the character a light-blue shirt, red tie and minimal facial features.

Add small directional lines to the loose sheet so its movement is immediately understandable.`,
  },
  {
    id: "minimal-line",
    number: "07",
    name: "Minimal Line",
    bestFor: "Design portfolios, artistic reels and sophisticated motion studies.",
    tech: "SVG line art · joint rigs",
    prompt: `Use a black background with thin white line art.

Represent the character as a clean articulated line figure with visible dot joints and small rotating rings around selected joints.

Add large, faint construction circles behind the subject. Make the loose sheet brighter than the other objects and show its route with a dashed line.

Place rows of small white pins along the lower edge and animate a subtle ripple as the character passes.`,
  },
  {
    id: "cinematic-cgi",
    number: "08",
    name: "Cinematic CGI",
    bestFor: "Premium technology, product films and cinematic brand teasers.",
    tech: "Three.js · tone mapping · bloom",
    prompt: `Build a cinematic night-office scene using Three.js.

Use a dark environment, layered atmospheric fog, a glossy reflective floor, cool cyan rim lighting, glowing monitors, city lights and restrained floating dust.

Use filmic tone mapping and a subtle bloom effect only on genuinely bright elements.

Maintain enough contrast for the character and falling sheet to remain readable on mobile screens.`,
  },
  {
    id: "toy-brick",
    number: "09",
    name: "Toy Brick",
    bestFor: "Playful explainers, family-friendly content and light-hearted product stories.",
    tech: "Three.js · clearcoat materials",
    prompt: `Build the scene from original glossy interlocking toy bricks with bevelled edges, visible studs, clearcoat materials and environment reflections.

Create an original toy character with a yellow cylindrical head, simple friendly expression, brown hair, white shirt, red tie and claw-shaped hands.

Animate the legs from the hips and use a light-grey tiled floor, bright daylight, soft shadows and a slightly defocused background.

Do not reproduce branded toy logos, packaging or copyrighted character designs.`,
  },
  {
    id: "soft-3d-explainer",
    number: "10",
    name: "Soft 3D Explainer",
    bestFor: "Startups, product explainers, healthcare communication and modern advertising.",
    tech: "3D materials · depth layers",
    prompt: `Create a smooth 3D explainer style using glossy toy-like plastic and soft clay materials.

Use gentle daylight with a pastel peach-and-mint office palette.

Place the camera close to the character at a slightly low three-quarter angle.

Keep the character sharp and render the background as a separate softened layer to simulate shallow depth of field. Add a soft contact shadow so the character remains grounded.`,
  },
];

export const compilationPrompt = `Create a 1080 × 1920 compilation video with a restrained dark background.

Open with the title:
"10 AI Animation Styles for Scroll-Stopping Videos"

Place a numbered style list in one area and a vertical preview card in the other.

Show each animation style for approximately 1.2 seconds. Transition between styles using a clean horizontal wipe.

Finish with a compact comparison grid of six selected styles followed by:

"Which style would you use?"
"Created by Sahil Vishwakarma"
"Diglizer Solution"

Keep all text within mobile-safe margins and maintain sufficient contrast throughout.`;

export const microPrompts = [
  "Make the walk cycle 15% slower without changing the composition duration.",
  "Increase the character size while keeping the feet aligned to the floor.",
  "Reduce background detail so the main action reads faster.",
  "Make the falling sheet stay visible for longer.",
  "Improve the arm motion and prevent the papers from intersecting the body.",
  "Increase contrast for mobile viewing.",
  "Keep the animation deterministic and remove unseeded random values.",
  "Optimise the composition to render more efficiently.",
  "Keep every important element inside vertical-video safe margins.",
  "Create a clean loop without an obvious jump at the end.",
];

export const principles = [
  { title: "Define the format", copy: "Specify size, frame rate and duration." },
  { title: "Define the camera", copy: "Describe the angle, framing and tracking behaviour." },
  { title: "Define one clear event", copy: "Give the viewer one visual change to notice." },
  { title: "Define the motion system", copy: "Explain how body parts and objects should move together." },
  {
    title: "Define technical constraints",
    copy: "Request deterministic motion, safe margins, performance control and accessible contrast.",
  },
];

export const steps = [
  {
    title: "Choose your tool",
    copy: "Use Claude Code, another AI coding assistant capable of creating React projects, or your existing development workflow.",
  },
  {
    title: "Copy the base scene",
    copy: "The base prompt defines the dimensions, timing, subject, environment and main action.",
  },
  {
    title: "Add one visual style",
    copy: "Choose only one style prompt at a time so the generated direction remains clear and consistent.",
  },
  {
    title: "Render and refine",
    copy: "Render the composition through Remotion, review the motion and request specific adjustments such as slower movement, cleaner timing or stronger contrast.",
  },
];

/** Resources listed on the /resources hub. */
export const resources = [AI_ANIMATION];
