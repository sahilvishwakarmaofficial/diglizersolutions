/** Editable content for /resources/meta-ads-prompts. Original Diglizer rewrite; no automatic account actions. */

export const metaCategories = [
  "Reporting and Performance",
  "Optimisation and Scaling",
  "Audience and Delivery",
  "Creative and Copy",
  "Campaign Planning",
  "Trends and Timing",
  "Advanced Audit Frameworks",
] as const;
export type MetaCategory = (typeof metaCategories)[number];

export interface MetaPrompt {
  n: number;
  id: string;
  title: string;
  category: MetaCategory;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  purpose: string;
  whenToUse: string;
  requiredData: string[];
  placeholders: string[];
  task: string;
  tags: string[];
  related: number[];
  safety?: string;
  prompt: string;
}

const FRAME = `Structure every answer in five labelled parts:
1. Observed facts — only what the supplied data shows.
2. Calculated metrics — show the formula and inputs.
3. Inferences — clearly marked as interpretation.
4. Recommendations — prioritised, each linked to the evidence above.
5. Missing data — what you would need to be more confident.
If information is unavailable, write "insufficient data" rather than guessing. Treat any benchmark as a diagnostic reference only and compare primarily against this account's own history and business economics. Do not take, simulate or claim any action inside the ad account — recommend only.`;

const CONTEXT = `Context: I run Meta ads for a [BUSINESS TYPE] selling [PRODUCT OR SERVICE]. Campaign objective: [CAMPAIGN OBJECTIVE]. Conversion event: [CONVERSION EVENT]. Attribution setting: [ATTRIBUTION SETTING]. Currency: [CURRENCY].`;

type Raw = Omit<MetaPrompt, "n" | "id" | "prompt">;

const raw: Raw[] = [
  // Reporting and Performance
  { title: "Weekly Performance Snapshot", category: "Reporting and Performance", difficulty: "Beginner", purpose: "Summarise a week of results in plain language for a decision-maker.", whenToUse: "Every Monday before planning the week.", requiredData: ["Campaign-level export for [DATE RANGE] and [COMPARISON PERIOD]", "Spend, results, cost per result, CTR, CPM, frequency"], placeholders: ["[DATE RANGE]", "[COMPARISON PERIOD]", "[TARGET CPA]"], task: "Compare [DATE RANGE] with [COMPARISON PERIOD]. Summarise spend, results and cost per result against [TARGET CPA], list the three biggest movements and explain the likely driver of each.", tags: ["Spend", "CPA", "CTR", "CPM"], related: [2, 3, 8] },
  { title: "Client-Ready Report Narrative", category: "Reporting and Performance", difficulty: "Beginner", purpose: "Turn raw numbers into a short, honest report a non-specialist can follow.", whenToUse: "Monthly reporting to owners or stakeholders.", requiredData: ["Monthly campaign summary", "Business goal for the month"], placeholders: ["[DATE RANGE]", "[CAMPAIGN NAME]"], task: "Write a 200-word report for [DATE RANGE] covering what happened, why it likely happened and what we will test next. Avoid jargon; define any metric you mention once.", tags: ["Reporting", "Communication"], related: [1, 4] },
  { title: "Metric Movement Diagnosis", category: "Reporting and Performance", difficulty: "Intermediate", purpose: "Explain why cost per result changed by decomposing it into its drivers.", whenToUse: "When CPA or CPL moves sharply.", requiredData: ["CPM, CTR (link), landing-page view rate, conversion rate for both periods"], placeholders: ["[DATE RANGE]", "[COMPARISON PERIOD]"], task: "Decompose the change in cost per result into CPM, click-through rate and post-click conversion rate. Quantify how much of the change each factor explains.", tags: ["CPA", "CPM", "CTR", "CVR"], related: [1, 9, 26] },
  { title: "Funnel Drop-off Report", category: "Reporting and Performance", difficulty: "Intermediate", purpose: "Find where people leave between impression and conversion.", whenToUse: "When clicks are healthy but conversions are weak.", requiredData: ["Impressions, link clicks, landing-page views, add-to-cart or form starts, conversions"], placeholders: ["[CONVERSION EVENT]", "[DATE RANGE]"], task: "Build a step-by-step funnel table with the rate between each step, flag the weakest step and suggest checks for it.", tags: ["Funnel", "Landing page"], related: [3, 30] },
  { title: "ROAS and Profitability Check", category: "Reporting and Performance", difficulty: "Intermediate", purpose: "Check whether reported ROAS is actually profitable for this business.", whenToUse: "Before deciding to scale an e-commerce campaign.", requiredData: ["Revenue, spend, gross margin %, average order value, returns rate"], placeholders: ["[TARGET ROAS]", "[CURRENCY]"], task: "Calculate break-even ROAS from the margin data, compare it with reported ROAS and [TARGET ROAS], and explain attribution limits that could inflate or deflate the reported figure.", tags: ["ROAS", "Margin"], related: [6, 15] },
  { title: "Lead Quality Review", category: "Reporting and Performance", difficulty: "Intermediate", purpose: "Look beyond cost per lead to lead usefulness.", whenToUse: "Lead-generation campaigns where sales feedback exists.", requiredData: ["Leads by ad set", "Qualified / contacted / converted counts from CRM (anonymised)"], placeholders: ["[TARGET CPL]", "[DATE RANGE]"], task: "Calculate cost per qualified lead and cost per sale by ad set, compare with [TARGET CPL] and identify where cheap leads are hiding poor quality.", tags: ["CPL", "Lead quality"], related: [5, 31], safety: "Use anonymised or aggregated lead data only. Never paste personal contact details into an AI tool." },
  // Optimisation and Scaling
  { title: "Bulk Pause Review", category: "Optimisation and Scaling", difficulty: "Intermediate", purpose: "Produce a reviewed shortlist of ads that may deserve pausing — for a human to decide.", whenToUse: "Weekly hygiene on accounts with many ads.", requiredData: ["Ad-level results with spend, results, CPA, frequency, days live"], placeholders: ["[TARGET CPA]", "[AMOUNT]"], task: "List ads that spent more than [AMOUNT] with CPA above 1.5× [TARGET CPA] after enough delivery to judge. For each, give the evidence and a confidence level. Do not recommend pausing anything still in its learning phase without saying so.", tags: ["CPA", "Hygiene"], related: [8, 10], safety: "This is a review list only. A person must make and apply any pause decision inside Ads Manager." },
  { title: "Budget Increase Review", category: "Optimisation and Scaling", difficulty: "Advanced", purpose: "Decide whether a campaign is ready for more budget and by how much.", whenToUse: "When a campaign has been stable below target cost.", requiredData: ["14–28 days of daily spend, results, CPA, frequency", "Current budget"], placeholders: ["[TARGET CPA]", "[AMOUNT]"], task: "Assess stability, headroom and frequency. Propose a cautious increase range with the reasoning, the signals that would justify stopping and a review date.", tags: ["Scaling", "Budget"], related: [7, 9, 36], safety: "Recommendation only. Budget changes must be made manually after review." },
  { title: "Scaling Readiness Score", category: "Optimisation and Scaling", difficulty: "Advanced", purpose: "Score readiness across tracking, creative depth, audience size and economics.", whenToUse: "Before a planned growth push.", requiredData: ["Account overview", "Creative count", "Audience sizes", "Margin data"], placeholders: ["[TARGET CPA]", "[TARGET ROAS]"], task: "Score each factor 1–5 with evidence, total the score and list the two blockers to fix first.", tags: ["Scaling"], related: [8, 36] },
  { title: "Creative Rotation Plan", category: "Optimisation and Scaling", difficulty: "Intermediate", purpose: "Plan when to introduce new creatives before fatigue sets in.", whenToUse: "Ongoing always-on campaigns.", requiredData: ["Ad-level CTR and frequency trend by week"], placeholders: ["[DATE RANGE]"], task: "Identify ads with falling CTR and rising frequency, estimate how long each format typically stays effective in this account and propose a refresh calendar.", tags: ["Creative fatigue", "Frequency"], related: [7, 19] },
  { title: "Campaign Consolidation Review", category: "Optimisation and Scaling", difficulty: "Advanced", purpose: "Spot budget fragmentation that starves ad sets of learning.", whenToUse: "Accounts with many small ad sets.", requiredData: ["Ad set list with budgets, audiences, weekly results"], placeholders: ["[CONVERSION EVENT]"], task: "Find overlapping or under-funded ad sets, estimate weekly conversions per ad set and suggest a simpler structure for human review.", tags: ["Structure", "Learning phase"], related: [37, 38] },
  { title: "Bid Strategy Comparison", category: "Optimisation and Scaling", difficulty: "Advanced", purpose: "Compare results under different bid strategies honestly.", whenToUse: "After testing cost caps or bid caps.", requiredData: ["Results by bid strategy and period"], placeholders: ["[TARGET CPA]"], task: "Compare delivery volume, CPA and stability by bid strategy and explain trade-offs. Flag where sample sizes are too small to conclude.", tags: ["Bidding"], related: [8] },
  // Audience and Delivery
  { title: "Audience Performance Breakdown", category: "Audience and Delivery", difficulty: "Beginner", purpose: "See which audience types deliver efficiently.", whenToUse: "Monthly or after adding new audiences.", requiredData: ["Results by ad set / audience"], placeholders: ["[TARGET CPA]"], task: "Rank audiences by cost per result and volume, separate prospecting from retargeting and note any audience with too little data to judge.", tags: ["Audience"], related: [14, 15] },
  { title: "Age and Gender Insight", category: "Audience and Delivery", difficulty: "Beginner", purpose: "Read demographic breakdowns without over-reacting.", whenToUse: "When considering demographic exclusions.", requiredData: ["Age × gender breakdown of spend and results"], placeholders: ["[DATE RANGE]"], task: "Summarise where results concentrate, compare cost per result by segment and explain why excluding segments can reduce delivery efficiency.", tags: ["Demographics"], related: [13, 16] },
  { title: "Retargeting Health Check", category: "Audience and Delivery", difficulty: "Intermediate", purpose: "Check retargeting is helping, not just harvesting existing demand.", whenToUse: "When retargeting looks unusually efficient.", requiredData: ["Retargeting audience sizes, frequency, CPA vs prospecting"], placeholders: ["[ATTRIBUTION SETTING]"], task: "Assess audience size, frequency pressure and overlap with prospecting, and suggest how to test incremental value.", tags: ["Retargeting", "Frequency"], related: [13, 35] },
  { title: "Geography Performance", category: "Audience and Delivery", difficulty: "Beginner", purpose: "Compare cities or regions for a local business.", whenToUse: "Businesses serving several areas.", requiredData: ["Region breakdown of spend and results"], placeholders: ["[BUSINESS TYPE]"], task: "Rank locations by cost per result and volume and flag locations the business cannot actually serve.", tags: ["Geography"], related: [17] },
  { title: "Placement and Device Review", category: "Audience and Delivery", difficulty: "Intermediate", purpose: "Understand how placements and devices contribute.", whenToUse: "When a placement dominates spend.", requiredData: ["Placement and device breakdowns"], placeholders: ["[DATE RANGE]"], task: "Compare placements and devices by CPM, CTR and cost per result. Check whether creatives are formatted correctly for the strongest placements.", tags: ["Placement", "Device"], related: [16, 22] },
  { title: "Frequency and Reach Balance", category: "Audience and Delivery", difficulty: "Intermediate", purpose: "Spot when the same people see ads too often.", whenToUse: "Small local audiences or long-running campaigns.", requiredData: ["Weekly reach, frequency, CTR, CPA"], placeholders: ["[DATE RANGE]"], task: "Plot the relationship between frequency and CTR/CPA over time and describe the point where returns appear to diminish for this account.", tags: ["Frequency", "Reach"], related: [10, 15] },
  // Creative and Copy
  { title: "Creative Performance Ranking", category: "Creative and Copy", difficulty: "Beginner", purpose: "Rank creatives on more than one metric.", whenToUse: "Monthly creative review.", requiredData: ["Ad-level spend, CTR, hook rate, CPA"], placeholders: ["[TARGET CPA]"], task: "Rank creatives by cost per result, then explain which visual and message elements the strongest ones share.", tags: ["Creative"], related: [20, 21] },
  { title: "Hook and Retention Analysis", category: "Creative and Copy", difficulty: "Intermediate", purpose: "Diagnose video drop-off in the first seconds.", whenToUse: "Video-led campaigns.", requiredData: ["3-second views, ThruPlays, average watch time by ad"], placeholders: ["[DATE RANGE]"], task: "Calculate hook rate (3-second views ÷ impressions) and hold rate (ThruPlays ÷ 3-second views) per video and suggest edits for the weakest openings.", tags: ["Video retention", "Hook rate"], related: [19, 23] },
  { title: "Ad Copy Variations", category: "Creative and Copy", difficulty: "Beginner", purpose: "Draft distinct copy angles to test.", whenToUse: "Preparing a new test.", requiredData: ["Product details, audience, current best ad copy"], placeholders: ["[PRODUCT OR SERVICE]", "[BUSINESS TYPE]"], task: "Write five copy variations for [PRODUCT OR SERVICE], each using a different angle (problem, outcome, proof, objection, offer). Keep claims factual and avoid exaggerated promises.", tags: ["Copy"], related: [19, 24], safety: "Check every claim against Meta's Advertising Standards and local rules before use." },
  { title: "Creative Format Brief", category: "Creative and Copy", difficulty: "Intermediate", purpose: "Brief a designer or editor for placement-ready assets.", whenToUse: "Before production.", requiredData: ["Winning concepts", "Placements in use"], placeholders: ["[CAMPAIGN NAME]"], task: "Write a production brief covering formats (1:1, 4:5, 9:16), safe areas, first-frame message, captions and CTA for [CAMPAIGN NAME].", tags: ["Creative", "Placement"], related: [17, 21] },
  { title: "Creative Fatigue Detector", category: "Creative and Copy", difficulty: "Intermediate", purpose: "Separate fatigue from other causes of decline.", whenToUse: "When a once-strong ad weakens.", requiredData: ["Daily CTR, CPM, frequency, CPA for the ad"], placeholders: ["[DATE RANGE]"], task: "Determine whether decline is driven by fatigue (rising frequency, falling CTR) or by auction changes (rising CPM), and suggest the appropriate response.", tags: ["Creative fatigue"], related: [10, 20] },
  { title: "Landing-Page Message Match", category: "Creative and Copy", difficulty: "Intermediate", purpose: "Check the ad promise matches the page.", whenToUse: "High CTR but low conversion.", requiredData: ["Ad copy and visual description", "Landing-page headline and offer"], placeholders: ["[PRODUCT OR SERVICE]"], task: "Compare the ad's promise, offer and tone with the landing page and list mismatches that could reduce conversion.", tags: ["Landing page"], related: [4, 21] },
  // Campaign Planning
  { title: "Campaign Brief Builder", category: "Campaign Planning", difficulty: "Beginner", purpose: "Turn a business goal into a clear campaign brief.", whenToUse: "Start of every new campaign.", requiredData: ["Goal, offer, audience, budget, timeline"], placeholders: ["[BUSINESS TYPE]", "[CAMPAIGN OBJECTIVE]", "[AMOUNT]"], task: "Produce a one-page brief: objective, audience hypotheses, offer, key message, creative needs, budget split, measurement plan and risks.", tags: ["Planning"], related: [26, 27] },
  { title: "Test Plan Design", category: "Campaign Planning", difficulty: "Intermediate", purpose: "Design a clean test with one variable.", whenToUse: "Before A/B testing.", requiredData: ["Hypothesis, budget, expected conversion volume"], placeholders: ["[AMOUNT]", "[CONVERSION EVENT]"], task: "Design a test with one variable, estimate the budget and duration needed for a readable result and define the decision rule in advance.", tags: ["Testing"], related: [25, 28] },
  { title: "Funnel Campaign Map", category: "Campaign Planning", difficulty: "Intermediate", purpose: "Map campaigns to awareness, consideration and conversion.", whenToUse: "Planning a quarter.", requiredData: ["Business goal, audiences, assets"], placeholders: ["[BUSINESS TYPE]"], task: "Propose a simple funnel structure with the role, audience, creative and success metric of each stage, keeping the structure as lean as possible.", tags: ["Funnel", "Structure"], related: [25, 37] },
  { title: "Offer Positioning Review", category: "Campaign Planning", difficulty: "Intermediate", purpose: "Strengthen the offer before spending on ads.", whenToUse: "New product or weak conversion.", requiredData: ["Offer details, competitor offers (public)"], placeholders: ["[PRODUCT OR SERVICE]"], task: "Evaluate the offer's clarity, urgency, risk reversal and differentiation. Suggest improvements that do not rely on false scarcity.", tags: ["Offer"], related: [21, 25] },
  { title: "Tracking Setup Checklist", category: "Campaign Planning", difficulty: "Intermediate", purpose: "Confirm measurement is in place before launch.", whenToUse: "Before launching conversion campaigns.", requiredData: ["Pixel / Conversions API status, events list, test results"], placeholders: ["[CONVERSION EVENT]"], task: "Produce a checklist for Pixel, Conversions API, event deduplication, domain verification and event priority, marking each as confirmed, unconfirmed or insufficient data.", tags: ["Tracking"], related: [32] },
  { title: "Launch Day Review", category: "Campaign Planning", difficulty: "Beginner", purpose: "Catch setup errors in the first 24–48 hours.", whenToUse: "Day 1–2 after launch.", requiredData: ["Early delivery data, ad review status"], placeholders: ["[CAMPAIGN NAME]"], task: "Check for delivery issues, rejected ads, wrong placements, broken links and unexpected spend pacing. Warn against judging performance on this little data.", tags: ["Launch"], related: [29, 4] },
  // Trends and Timing
  { title: "Day and Hour Patterns", category: "Trends and Timing", difficulty: "Intermediate", purpose: "Find timing patterns without over-scheduling.", whenToUse: "Accounts with enough volume.", requiredData: ["Results by day of week and hour"], placeholders: ["[DATE RANGE]"], task: "Identify consistent timing patterns, state sample sizes and recommend whether scheduling changes are justified.", tags: ["Timing"], related: [33] },
  { title: "Seasonality Planner", category: "Trends and Timing", difficulty: "Intermediate", purpose: "Prepare for seasonal demand and auction pressure.", whenToUse: "6–8 weeks before festivals or sale periods.", requiredData: ["Previous year's results for the same period if available"], placeholders: ["[BUSINESS TYPE]", "[DATE RANGE]"], task: "Outline expected demand and CPM changes for the season, a creative calendar and a budget-pacing plan. Mark assumptions where historic data is missing.", tags: ["Seasonality", "CPM"], related: [31, 34] },
  { title: "Month-over-Month Trend", category: "Trends and Timing", difficulty: "Beginner", purpose: "See the direction of travel across several months.", whenToUse: "Quarterly reviews.", requiredData: ["Monthly totals for 3–12 months"], placeholders: ["[CURRENCY]"], task: "Summarise trends in spend, cost per result and volume, and separate likely seasonal effects from account changes.", tags: ["Trends"], related: [1, 32] },
  { title: "Anomaly Investigation", category: "Trends and Timing", difficulty: "Advanced", purpose: "Investigate a sudden spike or crash.", whenToUse: "Unexpected daily changes.", requiredData: ["Daily metrics around the anomaly", "Change history"], placeholders: ["[DATE RANGE]"], task: "List possible causes (tracking, auction, creative, edits, external events), the evidence for each and the next check to confirm or rule it out.", tags: ["Diagnostics"], related: [3, 29] },
  // Advanced Audit Frameworks
  { title: "Full Account Audit", category: "Advanced Audit Frameworks", difficulty: "Advanced", purpose: "Run the complete 22-area audit in one structured pass.", whenToUse: "New account handover or quarterly deep review.", requiredData: ["Account exports for [DATE RANGE]", "Business economics", "Tracking status"], placeholders: ["[DATE RANGE]", "[TARGET CPA]", "[TARGET ROAS]"], task: "Audit the account across every area in the Advanced Audit Framework on this page. Score each area red / amber / green with evidence, then produce a prioritised action plan.", tags: ["Audit"], related: [36, 37, 40] },
  { title: "Scaling Risk Audit", category: "Advanced Audit Frameworks", difficulty: "Advanced", purpose: "Identify what is likely to break first when spend grows.", whenToUse: "Before significant budget growth.", requiredData: ["Daily performance, creative inventory, audience sizes"], placeholders: ["[AMOUNT]"], task: "Assess creative depth, audience saturation, tracking robustness and cash-flow risk for scaling to [AMOUNT] per day.", tags: ["Scaling"], related: [8, 9] },
  { title: "Structure and Fragmentation Audit", category: "Advanced Audit Frameworks", difficulty: "Advanced", purpose: "Audit campaign structure for overlap and learning-phase problems.", whenToUse: "Complex accounts.", requiredData: ["Campaign and ad set tree with budgets and weekly conversions"], placeholders: ["[CONVERSION EVENT]"], task: "Map the structure, identify overlap, ad sets stuck in learning and budget fragmentation, and propose a simplified structure for review.", tags: ["Structure", "Learning phase"], related: [11, 38] },
  { title: "Learning Phase Audit", category: "Advanced Audit Frameworks", difficulty: "Advanced", purpose: "Find ad sets that never exit learning and why.", whenToUse: "When many ad sets show 'Learning limited'.", requiredData: ["Ad set delivery status, weekly conversions, edit history"], placeholders: ["[CONVERSION EVENT]"], task: "List affected ad sets, the likely reason (volume, frequent edits, narrow audience) and options to resolve each.", tags: ["Learning phase"], related: [11, 37] },
  { title: "Attribution Sanity Audit", category: "Advanced Audit Frameworks", difficulty: "Advanced", purpose: "Compare Meta-reported results with other sources.", whenToUse: "When numbers disagree with sales or analytics.", requiredData: ["Meta results, analytics results, backend sales for same period"], placeholders: ["[ATTRIBUTION SETTING]"], task: "Compare the three sources, explain structural reasons for differences and suggest a practical source of truth for decisions.", tags: ["Attribution", "Tracking"], related: [5, 29] },
  { title: "Prioritised Action Plan", category: "Advanced Audit Frameworks", difficulty: "Intermediate", purpose: "Turn audit findings into an ordered plan.", whenToUse: "After any audit.", requiredData: ["Audit findings"], placeholders: ["[DATE RANGE]"], task: "Rank actions by expected impact, effort and risk. Group into this week, this month and later, with an owner and a measurement for each.", tags: ["Action plan"], related: [35, 36] },
];

export const metaPrompts: MetaPrompt[] = raw.map((p, i) => ({
  ...p,
  n: i + 1,
  id: `prompt-${i + 1}`,
  prompt: `Act as a careful Meta Ads analyst.\n\n${CONTEXT}\n\nTask: ${p.task}\n\nData provided: ${p.requiredData.join("; ")}.\n\n${FRAME}`,
}));

export const benchmarkNote =
  "Results vary according to the campaign objective, geography, industry, offer, price, funnel, attribution setting and conversion quality. Compare the account primarily against its own historical performance and business economics.";

export const auditAreas: { area: string; check: string }[] = [
  { area: "Account context", check: "Business model, margins, goals and what counts as a good result." },
  { area: "Tracking and attribution", check: "Pixel and Conversions API health, deduplication, attribution window." },
  { area: "Delivery", check: "Spend pacing, delivery status and rejected ads." },
  { area: "Frequency", check: "Exposure per person over time against CTR and CPA." },
  { area: "Auction and CPM", check: "CPM trend and whether cost changes come from the auction." },
  { area: "Creative performance", check: "Results by creative concept, not only by ad." },
  { area: "Video retention", check: "Hook rate, hold rate and average watch time." },
  { area: "Click quality", check: "Link CTR vs all CTR, landing-page view rate." },
  { area: "Landing-page continuity", check: "Message match, speed and mobile usability." },
  { area: "Funnel events", check: "Rates between each tracked step." },
  { area: "Conversion economics", check: "Break-even CPA / ROAS against actual results." },
  { area: "Audience performance", check: "Prospecting vs retargeting, overlap and size." },
  { area: "Placement", check: "Results and creative fit per placement." },
  { area: "Geography", check: "Serviceable areas and cost by location." },
  { area: "Device", check: "Mobile vs desktop behaviour after the click." },
  { area: "Campaign structure", check: "Clarity and simplicity of the campaign tree." },
  { area: "Budget fragmentation", check: "Budget spread too thin across ad sets." },
  { area: "Learning phase", check: "Ad sets stuck in learning and why." },
  { area: "Creative fatigue", check: "Declining CTR with rising frequency." },
  { area: "Retargeting", check: "Incrementality and frequency pressure." },
  { area: "Scaling readiness", check: "Stability, creative depth and economics." },
  { area: "Prioritised action plan", check: "Ordered actions with owners and measures." },
];

export const benchmarkRanges = [
  { metric: "Link CTR (feed, prospecting)", range: "Often around 0.8%–2%", note: "Varies widely by category and creative." },
  { metric: "Frequency (7-day, prospecting)", range: "Watch closely above ~3", note: "Small local audiences saturate faster." },
  { metric: "Video hook rate", range: "Commonly 20%–35%", note: "Depends on format and placement." },
  { metric: "Landing-page view rate", range: "Ideally most link clicks", note: "A large gap suggests speed or tracking issues." },
];

export const organiserStages = [
  { title: "Ad Brief", copy: "Define the goal, audience, offer, message and success measure in one page." },
  { title: "Campaign Sheet", copy: "List campaigns, ad sets, budgets, audiences, placements and creatives in a spreadsheet for review." },
  { title: "Manual Build Checklist", copy: "Build the campaign by hand in Ads Manager, ticking off naming, tracking, URLs, UTM tags and placements." },
  { title: "Final Review", copy: "A second person checks budget, audience, creative, copy, links and policy compliance before anyone presses publish." },
];
