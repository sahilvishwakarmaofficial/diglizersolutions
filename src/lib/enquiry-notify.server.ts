/**
 * Server-only enquiry notification. Lives in a *.server.ts file so nothing in
 * this module — including the email credentials it uses — can reach the
 * browser bundle.
 */
import { EmailAPIError } from '@lovable.dev/email-js'

import { sendTemplateEmail } from './email-templates/send-email'

/** Notification recipients for every enquiry. */
const NOTIFY_TO = ['sahil.vishwakar34@gmail.com', 'diglizersolution@gmail.com']

/** Strips anything that could be used to inject an extra email header. */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim().slice(0, 120)
}

type NotifyResult = { status: string; providerId?: string; error?: string }

const EMAIL_FIELDS: Array<[string, string]> = [
  ['Name', 'name'],
  ['Email', 'email'],
  ['Phone', 'phone'],
  ['Company', 'company'],
  ['Service(s)', 'services'],
  ['Project type', 'project_type'],
  ['Industry', 'industry'],
  ['Budget', 'budget_range'],
  ['Timeline', 'timeline'],
  ['City', 'city'],
  ['Preferred contact', 'preferred_contact_method'],
  ['Main challenge', 'main_challenge'],
  ['Deliverables', 'deliverables'],
  ['Message', 'details'],
  ['Source page', 'source_page'],
]

/**
 * Sends the enquiry notification to both internal recipients. The returned
 * delivery status is stored alongside the enquiry — a failure here never
 * discards the saved record.
 */
export async function notify(
  record: Record<string, unknown>,
  referenceId: string,
): Promise<NotifyResult> {
  const visitorName = headerSafe(String(record['name'] ?? 'Website Visitor'))
  const visitorEmail = headerSafe(String(record['email'] ?? ''))

  const rows = EMAIL_FIELDS.map(([label, key]) => {
    const raw = record[key]
    const value = Array.isArray(raw) ? raw.join(', ') : raw
    if (value === undefined || value === null || value === '') return null
    return { label, value: String(value) }
  }).filter((row): row is { label: string; value: string } => row !== null)

  rows.push({ label: 'Submitted at', value: new Date().toISOString() })
  rows.push({ label: 'Reference ID', value: referenceId })

  const outcomes: string[] = []
  const failures: string[] = []

  for (const recipient of NOTIFY_TO) {
    try {
      const result = await sendTemplateEmail('enquiry-notification', recipient, {
        templateData: { visitorName, rows },
        idempotencyKey: `enquiry-notification-${referenceId}-${recipient}`,
        ...(visitorEmail ? { replyTo: visitorEmail } : {}),
      })
      outcomes.push(result.sent ? 'sent' : 'suppressed')
      if (!result.sent) {
        failures.push(`${recipient}: recipient_suppressed`)
      }
    } catch (error) {
      const detail =
        error instanceof EmailAPIError
          ? `${error.code ?? error.status}`
          : error instanceof Error
            ? error.message
            : 'send failed'
      console.error('[enquiries] notification send failed', { recipient, detail })
      outcomes.push('failed')
      failures.push(`${recipient}: ${detail}`)
    }
  }

  const status = outcomes.every((outcome) => outcome === 'sent')
    ? 'sent'
    : outcomes.includes('sent')
      ? 'partial'
      : 'failed'

  return {
    status,
    ...(failures.length ? { error: failures.join('; ') } : {}),
  }
}
