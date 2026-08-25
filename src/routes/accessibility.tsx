import { createFileRoute } from "@tanstack/react-router";

import { LegalPage, legalHead } from "@/components/LegalPage";

export const Route = createFileRoute("/accessibility")({
  head: () =>
    legalHead(
      "Accessibility Statement | Diglizer Solution",
      "Our commitment to accessible design: standards followed, measures taken and how to report an accessibility barrier on the Diglizer Solution website.",
      "/accessibility",
    ),
  component: Accessibility,
});

function Accessibility() {
  return (
    <LegalPage
      name="Accessibility"
      path="/accessibility"
      title="Accessibility Statement"
      lede="We want this website to be usable by as many people as possible, including people using screen readers, keyboard navigation and assistive technology."
      sections={[
        {
          heading: "Standard we work towards",
          paragraphs: [
            "This website is built with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA as the reference standard.",
          ],
        },
        {
          heading: "Measures taken",
          paragraphs: ["Accessibility is considered during design and build, not added afterwards."],
          bullets: [
            "Semantic HTML structure with a single main heading per page",
            "Visible focus states and a skip-to-content link",
            "Keyboard operable navigation, menus and forms",
            "Descriptive alternative text for meaningful images",
            "Colour contrast checked against AA thresholds",
            "Labelled form fields with clear error and success messaging",
            "Responsive layouts that support zoom and small screens",
          ],
        },
        {
          heading: "Known limitations",
          paragraphs: [
            "Some third-party embeds and provisional imagery may not yet meet the same standard. We review and improve these as the site evolves.",
          ],
        },
        {
          heading: "Feedback",
          paragraphs: [
            "If you encounter a barrier on this website, please tell us through the contact form and describe the page and the issue. We aim to respond within a few working days.",
          ],
        },
      ]}
    />
  );
}
