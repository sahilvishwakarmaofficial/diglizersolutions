import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";

/**
 * Server-side contract for the guided enquiry wizard used on /start-a-project
 * and /contact. Validation, rate limiting and the Supabase insert all happen
 * here — the client never talks to the database directly for this flow.
 */

const trimmedOptional = z
  .string()
  .trim()
  .max(4000)
  .optional()
  .or(z.literal("").transform(() => undefined));

export const enquirySchema = z.object({
  // Step 1 — scope
  services: z.array(z.string().trim().min(1)).default([]),
  project_type: trimmedOptional,
  industry: trimmedOptional,
  budget_range: trimmedOptional,
  preferred_start_date: trimmedOptional,
  timeline: trimmedOptional,
  engagement_type: trimmedOptional,

  // Step 2 — brief
  company: z.string().trim().min(1, "Company or brand name is required").max(200),
  website: trimmedOptional,
  social_link: trimmedOptional,
  details: z.string().trim().min(10, "Please describe the project in a little more detail"),
  main_challenge: z.string().trim().min(1, "Tell us the main challenge you're facing"),
  deliverables: z.string().trim().min(1, "Let us know the deliverables you need"),
  target_audience: trimmedOptional,
  project_goals: trimmedOptional,
  existing_assets: trimmedOptional,
  reference_links: trimmedOptional,
  additional_info: trimmedOptional,
  attachment_path: trimmedOptional,

  // Step 3 — contact
  name: z.string().trim().min(1, "Full name is required").max(200),
  email: z.string().trim().email("Enter a valid business email"),
  phone: trimmedOptional,
  preferred_contact_method: trimmedOptional,
  best_time_to_contact: trimmedOptional,
  city: trimmedOptional,
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm you agree to be contacted" }),
  }),
  referral_source: trimmedOptional,

  // Tracking / anti-spam
  source_page: trimmedOptional,
  referrer: trimmedOptional,
  landing_page: trimmedOptional,
  utm_source: trimmedOptional,
  utm_medium: trimmedOptional,
  utm_campaign: trimmedOptional,
  utm_term: trimmedOptional,
  utm_content: trimmedOptional,
  dedupe_key: z.string().trim().min(8).max(128),
  form_started_at: z.number(),
  // Honeypot — must stay empty. Named to look attractive to bots.
  website_url: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export type EnquiryResult =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: Record<string, string> };

/**
 * Extremely small in-memory rate limiter. Good enough to blunt naive bots;
 * a single serverless instance resets this on cold start, which is fine —
 * the real backstop is the honeypot + timing check + dedupe key.
 */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 8;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const existing = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  existing.push(now);
  hits.set(ip, existing);
  return existing.length > RATE_LIMIT_MAX;
}

/**
 * No-op notification hook. Wire up a real provider (e.g. Resend) once a key
 * is configured — this intentionally does nothing but log until then.
 */
async function notify(record: Record<string, unknown>): Promise<void> {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    console.log("[enquiries] notify() no-op — no email provider configured", {
      email: record["email"],
      name: record["name"],
    });
    return;
  }
  // Intentionally left unimplemented: no credentials were provided.
  console.log("[enquiries] email provider configured but notify() is not implemented yet");
}

export const submitProjectEnquiry = createServerFn({ method: "POST" })
  .validator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }): Promise<EnquiryResult> => {
    // Honeypot check.
    if (data.website_url) {
      return { ok: true };
    }

    // Minimum time-on-form check (must take at least 3 seconds).
    if (Date.now() - data.form_started_at < 3000) {
      return { ok: true };
    }

    const ip = getRequestIP() ?? "unknown";
    if (isRateLimited(ip)) {
      return { ok: false, message: "Too many submissions. Please try again in a few minutes." };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const {
      website_url: _honeypot,
      form_started_at: _formStartedAt,
      ...record
    } = data;

    // Drop undefined optional fields so the insert matches the generated
    // column types (which use null, not undefined).
    const cleaned = Object.fromEntries(
      Object.entries(record).filter(([, value]) => value !== undefined),
    ) as Record<string, unknown>;

    const { error } = await supabaseAdmin.from("project_enquiries").insert({
      ...(cleaned as { name: string; email: string; details: string }),
      consent: true,
      consent_at: new Date().toISOString(),
      submission_status: "received",
    });

    if (error) {
      // Duplicate submission (same dedupe_key) — treat as a soft success.
      if (error.code === "23505") {
        return { ok: true };
      }
      console.error("[enquiries] insert failed", error);
      return {
        ok: false,
        message: "We couldn't save that just now. Please try again or reach us on WhatsApp.",
      };
    }

    await notify(record);

    return { ok: true };
  });
