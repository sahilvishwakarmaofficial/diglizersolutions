import { createFileRoute } from "@tanstack/react-router";

import { LegalPage, legalHead } from "@/components/LegalPage";

export const Route = createFileRoute("/cookie-policy")({
  head: () =>
    legalHead(
      "Cookie Policy | Diglizer Solution",
      "What cookies and similar technologies the Diglizer Solution website uses, why they are used, and how you can control them.",
      "/cookie-policy",
    ),
  component: CookiePolicy,
});

function CookiePolicy() {
  return (
    <LegalPage
      name="Cookie Policy"
      path="/cookie-policy"
      title="Cookie Policy"
      lede="We keep tracking minimal. This page explains the cookies and similar technologies this website may use and how to control them."
      sections={[
        {
          heading: "What cookies are",
          paragraphs: [
            "Cookies are small text files stored by your browser. They allow a website to remember preferences and to understand how pages are used.",
          ],
        },
        {
          heading: "Categories we may use",
          paragraphs: ["Depending on which services are enabled, this website may use:"],
          bullets: [
            "Essential cookies required for security, routing and form submission",
            "Analytics cookies that measure page views and traffic sources in aggregate",
            "Marketing cookies set by advertising platforms when campaigns are running",
          ],
        },
        {
          heading: "Third-party technologies",
          paragraphs: [
            "Analytics and advertising tools such as Google Analytics, Google Tag Manager, Meta Pixel or Microsoft Clarity are only active when their identifiers are configured for this site. When they are not configured, no such scripts are loaded.",
          ],
        },
        {
          heading: "Managing cookies",
          paragraphs: [
            "You can block or delete cookies in your browser settings at any time. Blocking essential cookies may affect form submission and site functionality.",
          ],
        },
        {
          heading: "Updates",
          paragraphs: [
            "This policy is updated whenever the technologies used on the site change.",
          ],
        },
      ]}
    />
  );
}
