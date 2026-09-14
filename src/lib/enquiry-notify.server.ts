/**
 * Server-only enquiry notification. Lives in a *.server.ts file so the email
 * provider credentials can never reach the browser bundle.
 */

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
export async function notify(
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
