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
  dedupe_key: z.string().trim().min(4).max(128),
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

/** Notification recipients for every enquiry. */
const NOTIFY_TO = ["sahil.vishwakar34@gmail.com", "diglizersolution@gmail.com"];

/** Escapes visitor-supplied values before they are placed into HTML. */
function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strips anything that could be used to inject an extra email header. */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, 120);
}

type NotifyResult = { status: string; providerId?: string; error?: string };

const EMAIL_FIELDS: Array<[string, string]> = [
  ["Name", "name"],
  ["Email", "email"],
  ["Phone", "phone"],
  ["Company", "company"],
  ["Service(s)", "services"],
  ["Project type", "project_type"],
  ["Industry", "industry"],
  ["Budget", "budget_range"],
  ["Timeline", "timeline"],
  ["City", "city"],
  ["Preferred contact", "preferred_contact_method"],
  ["Main challenge", "main_challenge"],
  ["Deliverables", "deliverables"],
  ["Message", "details"],
  ["Source page", "source_page"],
];

/**
 * Sends the enquiry notification through Resend. Returns a delivery status
 * that is stored alongside the enquiry — a failure here never discards the
 * saved record.
 */
async function notify(
  record: Record<string, unknown>,
  referenceId: string,
): Promise<NotifyResult> {
  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    console.warn(
      "[enquiries] enquiry saved but no email provider is configured (RESEND_API_KEY missing)",
      { reference: referenceId },
    );
    return { status: "not_configured", error: "No email provider configured" };
  }

  const from = process.env["ENQUIRY_FROM_EMAIL"] ?? "Diglizer Website <enquiries@diglizersolution.com>";
  const submittedAt = new Date().toISOString();
  const visitorName = headerSafe(String(record["name"] ?? "Website Visitor"));
  const visitorEmail = headerSafe(String(record["email"] ?? ""));

  const rows = EMAIL_FIELDS.map(([label, key]) => {
    const raw = record[key];
    const value = Array.isArray(raw) ? raw.join(", ") : raw;
    if (value === undefined || value === null || value === "") return null;
    return { label, value: String(value) };
  }).filter((row): row is { label: string; value: string } => row !== null);

  rows.push({ label: "Submitted at", value: submittedAt });
  rows.push({ label: "Reference ID", value: referenceId });

  const html = `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;color:#10051F">
<h2 style="color:#694699;margin:0 0 16px">New Diglizer Website Enquiry</h2>
<table cellpadding="8" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;max-width:640px">
${rows
  .map(
    (row) =>
      `<tr><td style="border-bottom:1px solid #eee;font-weight:bold;width:180px;vertical-align:top">${esc(
        row.label,
      )}</td><td style="border-bottom:1px solid #eee;white-space:pre-wrap">${esc(row.value)}</td></tr>`,
  )
  .join("")}
</table></body></html>`;

  const text = rows.map((row) => `${row.label}: ${row.value}`).join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: NOTIFY_TO,
        subject: `New Diglizer Website Enquiry — ${visitorName}`,
        html,
        text,
        ...(visitorEmail ? { reply_to: visitorEmail } : {}),
      }),
    });

    const body = (await response.json().catch(() => ({}))) as { id?: string; message?: string };
    if (!response.ok) {
      console.error(`[enquiries] email provider rejected send [${response.status}]`, body);
      return { status: "failed", error: `${response.status}: ${body.message ?? "unknown error"}` };
    }
    return { status: "accepted", ...(body.id ? { providerId: body.id } : {}) };
  } catch (error) {
    console.error("[enquiries] email send threw", error);
    return { status: "failed", error: error instanceof Error ? error.message : "send failed" };
  }
}

export const submitProjectEnquiry = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data: rawInput }): Promise<EnquiryResult> => {
    // Validate here rather than in .validator() so a schema failure becomes a
    // structured, field-level response instead of an opaque thrown error.
    const parsed = enquirySchema.safeParse(rawInput);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path.join(".");
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      console.error("[enquiries] validation failed", fieldErrors);
      return {
        ok: false,
        message: "Some details need attention before we can send this.",
        fieldErrors,
      };
    }
    const data = parsed.data;

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

    const { data: inserted, error } = await supabaseAdmin
      .from("project_enquiries")
      .insert({
        ...(cleaned as { name: string; email: string; details: string }),
        consent: true,
        consent_at: new Date().toISOString(),
        submission_status: "received",
      })
      .select("id")
      .single();

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

    // The enquiry is safely stored; email delivery is recorded against it but
    // never rolls the record back.
    const delivery = await notify(record, inserted.id);
    await supabaseAdmin
      .from("project_enquiries")
      .update({
        email_delivery_status: delivery.status,
        email_provider_id: delivery.providerId ?? null,
        email_error: delivery.error ?? null,
      })
      .eq("id", inserted.id);

    return { ok: true };
  });
