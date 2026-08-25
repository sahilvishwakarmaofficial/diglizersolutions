import { createFileRoute } from "@tanstack/react-router";

import { LegalPage, legalHead } from "@/components/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () =>
    legalHead(
      "Terms of Use | Diglizer Solution",
      "The terms that apply to using the Diglizer Solution website, including intellectual property, acceptable use and limitation of liability.",
      "/terms",
    ),
  component: Terms,
});

function Terms() {
  return (
    <LegalPage
      name="Terms"
      path="/terms"
      title="Terms of Use"
      lede="These terms govern your use of this website. Engagements for services are governed separately by a signed proposal or agreement."
      sections={[
        {
          heading: "Using this website",
          paragraphs: [
            "By accessing this website you agree to use it lawfully and not to interfere with its operation, security or availability.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "All content on this website, including copy, design, code, brand marks and case-study material, belongs to Diglizer Solution or its clients and may not be copied, reproduced or republished without written permission.",
            "Client names and project descriptions are published with permission and remain the property of the respective owners.",
          ],
        },
        {
          heading: "Case studies and outcomes",
          paragraphs: [
            "Case studies describe work delivered and the approach taken. Outcomes are described qualitatively and are not a promise of comparable results for other businesses. Performance depends on market, category, budget and execution conditions.",
          ],
        },
        {
          heading: "Enquiries and proposals",
          paragraphs: [
            "Information submitted through this website does not create a contract. A commercial relationship begins only when scope, fees and timelines are agreed in writing.",
          ],
        },
        {
          heading: "Third-party links",
          paragraphs: [
            "This website may link to external sites. We are not responsible for the content, policies or availability of those sites.",
          ],
        },
        {
          heading: "Limitation of liability",
          paragraphs: [
            "This website is provided on an as-is basis. To the extent permitted by law, Diglizer Solution is not liable for indirect or consequential loss arising from use of this website or reliance on its content.",
          ],
        },
        {
          heading: "Governing law",
          paragraphs: [
            "These terms are governed by the laws of India, with jurisdiction in Maharashtra.",
          ],
        },
      ]}
    />
  );
}
