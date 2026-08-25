import { createFileRoute } from "@tanstack/react-router";

import { LegalPage, legalHead } from "@/components/LegalPage";

export const Route = createFileRoute("/privacy-policy")({
  head: () =>
    legalHead(
      "Privacy Policy | Diglizer Solution",
      "How Diglizer Solution collects, uses, stores and protects personal information submitted through enquiry, contact and career forms.",
      "/privacy-policy",
    ),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <LegalPage
      name="Privacy Policy"
      path="/privacy-policy"
      title="Privacy Policy"
      lede="We collect only the information required to respond to enquiries and deliver work. This page explains what we collect, why, and how you can control it."
      sections={[
        {
          heading: "Information we collect",
          paragraphs: [
            "We collect information you provide directly through our contact, project enquiry and career forms.",
          ],
          bullets: [
            "Identity and contact details such as name, email, phone and company",
            "Project details you choose to share, including objectives, budget range and timelines",
            "Career information such as role interest, experience and portfolio links",
            "Basic technical data such as browser type and pages visited, when analytics is enabled",
          ],
        },
        {
          heading: "How we use information",
          paragraphs: [
            "Information is used to respond to your enquiry, prepare proposals, deliver agreed services, consider applications and improve our website.",
            "We do not sell personal information and we do not share it with third parties for their own marketing.",
          ],
        },
        {
          heading: "Legal basis and consent",
          paragraphs: [
            "We process information on the basis of your consent when you submit a form, and on the basis of legitimate interest when responding to business enquiries or fulfilling a contract.",
          ],
        },
        {
          heading: "Data retention",
          paragraphs: [
            "Enquiry and contact records are retained only as long as needed for business, accounting or legal purposes. Career submissions are held so we can consider you for future opportunities, and are removed on request.",
          ],
        },
        {
          heading: "Service providers",
          paragraphs: [
            "We use trusted infrastructure providers for hosting, database storage, email delivery and analytics. These providers process data on our instructions under their own security commitments.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: ["You may request the following at any time by contacting us."],
          bullets: [
            "Access to the personal information we hold about you",
            "Correction of inaccurate information",
            "Deletion of your information where no legal obligation requires retention",
            "Withdrawal of consent for future communication",
          ],
        },
        {
          heading: "Security",
          paragraphs: [
            "Form submissions are transmitted over encrypted connections and stored with access controls. No online transmission can be guaranteed as completely secure, but we take reasonable technical and organisational measures to protect your data.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "For any privacy question or request, please use the contact form on this website and mark your message as a privacy request.",
          ],
        },
      ]}
    />
  );
}
