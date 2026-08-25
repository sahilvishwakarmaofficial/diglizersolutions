import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { seo, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, FinalCta } from "@/components/layout/SiteLayout";
import { supabase } from "@/integrations/supabase/client";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Careers", path: "/careers" },
];

export const Route = createFileRoute("/careers")({
  head: () =>
    seo({
      title: "Careers & Collaboration | Diglizer Solution",
      description:
        "Join the Diglizer Solution network of designers, developers, editors, writers and marketers. Share an expression of interest for roles, internships and freelance collaboration.",
      path: "/careers",
    }),
  component: Careers,
});

const roles = [
  "Graphic design",
  "Video editing",
  "Social media",
  "Content writing",
  "Web development",
  "Photography",
  "Performance marketing",
  "Business development",
  "Internship",
  "Freelance collaboration",
];

const workTypes = ["Full-time", "Part-time", "Freelance", "Internship"];

const inputClass =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

function Careers() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    role: "Graphic design",
    work_type: "Full-time",
    portfolio_url: "",
    linkedin_url: "",
    experience: "",
    message: "",
  });
  const [consent, setConsent] = useState(false);

  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (submitting) return;
    if (!consent) {
      toast.error("Please confirm consent before submitting.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("career_applications").insert(form);
    setSubmitting(false);
    if (error) {
      toast.error("Application not sent. Please try again in a moment.");
      return;
    }
    navigate({ to: "/thank-you" });
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        liquid="growth"
        eyebrow="Careers"
        title="Build what's next with us."
        lede="We work with a growing network of specialists and creative collaborators, engaged based on project requirements. Share your work and we will reach out when a fit appears."
        breadcrumbs={crumbs}
      />

      <section className="section-y">
        <div className="container-wide">
          <p className="eyebrow text-gradient">Opportunity areas</p>
          <h2 className="display-2 mt-4 max-w-3xl">Disciplines we collaborate across.</h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <div key={role} className="bg-card p-6">
                <p className="font-display text-lg font-bold">{role}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm text-muted-foreground">
            We do not publish placeholder vacancies. Every expression of interest is reviewed and
            kept on file for upcoming projects.
          </p>
        </div>
      </section>

      <section className="section-y bg-muted/40">
        <div className="container-wide max-w-3xl">
          <h2 className="display-2">Expression of interest</h2>
          <form onSubmit={handleSubmit} className="mt-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Full name*
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
                Location
                <input
                  value={form.location}
                  onChange={(e) => set("location", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="block text-sm font-medium">
                Role*
                <select
                  required
                  value={form.role}
                  onChange={(e) => set("role", e.target.value)}
                  className={inputClass}
                >
                  {roles.map((role) => (
                    <option key={role}>{role}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium">
                Work type
                <select
                  value={form.work_type}
                  onChange={(e) => set("work_type", e.target.value)}
                  className={inputClass}
                >
                  {workTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium">
                Portfolio URL
                <input
                  type="url"
                  placeholder="https://"
                  value={form.portfolio_url}
                  onChange={(e) => set("portfolio_url", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="block text-sm font-medium">
                LinkedIn URL
                <input
                  type="url"
                  placeholder="https://"
                  value={form.linkedin_url}
                  onChange={(e) => set("linkedin_url", e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>

            <label className="mt-6 block text-sm font-medium">
              Experience
              <input
                placeholder="e.g. 3 years in motion design"
                value={form.experience}
                onChange={(e) => set("experience", e.target.value)}
                className={inputClass}
              />
            </label>

            <label className="mt-6 block text-sm font-medium">
              Short introduction
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                className={inputClass}
              />
            </label>

            <label className="mt-6 flex items-start gap-3 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-border"
              />
              I consent to Diglizer Solution storing these details to consider me for current and
              future opportunities.
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="mt-8 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-white disabled:opacity-40"
            >
              {submitting ? "Sending…" : "Submit interest"}
            </button>
          </form>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
