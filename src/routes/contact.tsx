import { createFileRoute, Link } from "@tanstack/react-router";

import { seo, breadcrumbSchema, organizationSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/layout/SiteLayout";
import { ProjectEnquiryWizard } from "@/components/enquiry/ProjectEnquiryWizard";
import { InlineWhatsAppButton } from "@/components/WhatsAppButton";
import { siteConfig } from "@/config/site";
import { track } from "@/lib/analytics";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact Diglizer Solution | Thane & Mumbai",
      description:
        "Get in touch with Diglizer Solution for branding, websites, content, social media, SEO and performance marketing across Thane, Mumbai and India.",
      path: "/contact",
    }),
  component: Contact,
});

const faqs = [
  {
    question: "How quickly do you reply?",
    answer: "We read every genuine enquiry personally and reply within one working day.",
  },
  {
    question: "Do I need a finished brief before reaching out?",
    answer:
      "No. The guided form below helps structure your requirement even if it isn't fully defined yet.",
  },
  {
    question: "Can we speak before sending a formal enquiry?",
    answer:
      "Yes — call or message us on WhatsApp any time, or use the enquiry form and mention you'd prefer a call first.",
  },
];

function Contact() {
  const tel = siteConfig.contact.phone ? `tel:${siteConfig.contact.phone.replace(/\s/g, "")}` : "";

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), organizationSchema]} />
      <PageHero
        liquid="contact"
        eyebrow="Contact"
        title="Start a conversation."
        lede="Tell us what you are working on. We reply to every genuine enquiry, usually within one working day."
        breadcrumbs={crumbs}
      />

      <section className="section-y">
        <div className="container-wide grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tel && (
            <a
              href={tel}
              onClick={() => track("phone_click")}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <p className="eyebrow text-muted-foreground">Call</p>
              <p className="mt-2 font-display text-lg font-semibold">{siteConfig.contact.phone}</p>
            </a>
          )}
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="eyebrow text-muted-foreground">WhatsApp</p>
            <div className="mt-3">
              <InlineWhatsAppButton label="Message us" />
            </div>
          </div>
          {siteConfig.contact.email && (
            <a
              href={`mailto:${siteConfig.contact.email}`}
              onClick={() => track("email_click")}
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary"
            >
              <p className="eyebrow text-muted-foreground">Email</p>
              <p className="mt-2 break-all font-display text-lg font-semibold">
                {siteConfig.contact.email}
              </p>
            </a>
          )}
          {socials.length > 0 && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="eyebrow text-muted-foreground">Follow Diglizer</p>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                {socials.map((social) => (
                  <li key={social.key}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Diglizer Solution on ${social.label} (opens in a new tab)`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      {social.label}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="section-y pt-0">
        <div className="container-wide max-w-3xl">
          <p className="eyebrow text-gradient">Guided enquiry</p>
          <h2 className="display-2 mt-3">Share a brief and we'll come prepared.</h2>
          <div className="mt-10">
            <ProjectEnquiryWizard />
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-wide grid gap-14 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-muted/40 p-8">
            <h2 className="font-display text-xl font-bold">Studio</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.contact.addressLocality}, {siteConfig.contact.addressRegion}.
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Working across Mumbai, Navi Mumbai and India.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold">Frequently asked</h2>
            <dl className="mt-6 space-y-6">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-semibold">{faq.question}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section-y pt-0">
        <div className="container-wide max-w-3xl rounded-2xl border border-border bg-card p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Every enquiry is read personally by our team — no bots, no generic replies.{" "}
            <Link to="/start-a-project" className="font-semibold text-primary hover:underline">
              Prefer a structured brief?
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
