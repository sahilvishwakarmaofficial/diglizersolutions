import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { seo, breadcrumbSchema, organizationSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/layout/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { siteConfig, activeSocialLinks, whatsappHref } from "@/config/site";

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

const inputClass =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

function Contact() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    const { error } = await supabase.from("contact_messages").insert(form);
    setSubmitting(false);
    if (error) {
      toast.error("Message not sent. Please try again in a moment.");
      return;
    }
    navigate({ to: "/thank-you" });
  }

  const socials = activeSocialLinks();
  const wa = whatsappHref();
  const hasDirectContact = Boolean(siteConfig.contact.email || siteConfig.contact.phone || wa);

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
        <div className="container-wide grid gap-14 lg:grid-cols-[1.1fr_1fr]">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Name*
                <input
                  required
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="block text-sm font-medium">
                Email*
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="block text-sm font-medium">
                Phone
                <input
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="block text-sm font-medium">
                Subject
                <input
                  value={form.subject}
                  onChange={(e) => set("subject", e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>
            <label className="mt-6 block text-sm font-medium">
              Message*
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                className={inputClass}
              />
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="mt-8 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-white disabled:opacity-40"
            >
              {submitting ? "Sending…" : "Send message"}
            </button>
          </form>

          <aside className="rounded-2xl border border-border bg-muted/40 p-8">
            <h2 className="font-display text-xl font-bold">Studio</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Based in {siteConfig.contact.addressLocality},{" "}
              {siteConfig.contact.addressRegion}. Working with clients across Mumbai, Navi Mumbai
              and the rest of India.
            </p>

            {hasDirectContact ? (
              <ul className="mt-6 space-y-2 text-sm">
                {siteConfig.contact.email && (
                  <li>
                    <a className="hover:text-primary" href={`mailto:${siteConfig.contact.email}`}>
                      {siteConfig.contact.email}
                    </a>
                  </li>
                )}
                {siteConfig.contact.phone && (
                  <li>
                    <a
                      className="hover:text-primary"
                      href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </li>
                )}
                {wa && (
                  <li>
                    <a
                      className="hover:text-primary"
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp
                    </a>
                  </li>
                )}
              </ul>
            ) : (
              <p className="mt-6 text-sm text-muted-foreground">
                Direct phone and email details are being finalised — the form above reaches us
                straight away.
              </p>
            )}

            {socials.length > 0 && (
              <div className="mt-8">
                <p className="eyebrow text-muted-foreground">Follow</p>
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  {socials.map((s) => (
                    <a
                      key={s.key}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 border-t border-border pt-6">
              <p className="text-sm text-muted-foreground">
                Have a defined brief already?{" "}
                <Link to="/start-a-project" className="font-semibold text-primary hover:underline">
                  Start a project
                </Link>
                .
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
