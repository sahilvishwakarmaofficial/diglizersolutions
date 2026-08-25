/**
 * Minimal analytics helper. Pushes events to window.dataLayer when it exists
 * (GTM/GA4 style) and safely no-ops everywhere else (SSR, no dataLayer, etc.).
 */

export type AnalyticsEvent =
  | "enquiry_started"
  | "enquiry_scope_completed"
  | "enquiry_brief_completed"
  | "enquiry_submitted"
  | "whatsapp_click"
  | "phone_click"
  | "email_click";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: AnalyticsEvent, payload: Record<string, unknown> = {}): void {
  try {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload });
  } catch {
    // Analytics must never break the UI.
  }
}
