import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { budgetOptions, pricing } from "@/content/pricing";
import { seo, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/layout/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import { capabilities } from "@/content/capabilities";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Start a Project", path: "/start-a-project" },
];

export const Route = createFileRoute("/start-a-project")({
  head: () =>
    seo({
      title: "Start a Project | Diglizer Solution",
      description:
        "Tell us about your brand, website, content or growth project. Share the brief and we will come back with a considered next step.",
      path: "/start-a-project",
    }),
  component: StartAProject,
});

const budgets = budgetOptions;

const timelines = ["As soon as possible", "1–2 months", "3–6 months", "Exploring options"];

const inputClass =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary";

function StartAProject() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [services, setServices] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    budget_range: "",
    timeline: "",
    details: "",
    referral_source: "",
  });

  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleService = (name: string) =>
    setServices((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name],
    );

  const canContinue =
    step === 0
      ? services.length > 0
      : step === 1
        ? form.details.trim().length > 10
        : form.name.trim() !== "" && form.email.trim() !== "";

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!canContinue || submitting) return;
    setSubmitting(true);
    const { error } = await supabase.from("project_enquiries").insert({
      ...form,
      services,
    });
    setSubmitting(false);
    if (error) {
      toast.error("We couldn't send that. Please try again or email us directly.");
      return;
    }
    navigate({ to: "/thank-you" });
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Start a project"
        title="Tell us what you are trying to build."
        lede="Three short steps. The more context you give, the more useful our first reply will be."
        breadcrumbs={crumbs}
      />

      <section className="section-y">
        <div className="container-wide max-w-3xl">
          <ol className="flex gap-2" aria-label="Progress">
            {["Scope", "Brief", "Contact"].map((label, index) => (
              <li key={label} className="flex-1">
                <div
                  className={
                    index <= step ? "h-1 rounded-full bg-gradient-brand" : "h-1 rounded-full bg-border"
                  }
                />
                <span className="mt-2 block text-xs font-medium text-muted-foreground">
                  {index + 1}. {label}
                </span>
              </li>
            ))}
          </ol>

          <form onSubmit={handleSubmit} className="mt-10">
            {step === 0 && (
              <fieldset>
                <legend className="font-display text-2xl font-bold">
                  What do you need help with?
                </legend>
                <p className="mt-2 text-sm text-muted-foreground">Select everything that applies.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {capabilities.map((capability) => {
                    const active = services.includes(capability.name);
                    return (
                      <button
                        key={capability.slug}
                        type="button"
                        onClick={() => toggleService(capability.name)}
                        aria-pressed={active}
                        className={
                          active
                            ? "rounded-xl border border-primary bg-accent px-4 py-3 text-left text-sm font-medium"
                            : "rounded-xl border border-border px-4 py-3 text-left text-sm font-medium transition-colors hover:border-primary"
                        }
                      >
                        {capability.name}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {step === 1 && (
              <fieldset>
                <legend className="font-display text-2xl font-bold">About the project</legend>
                <label className="mt-6 block text-sm font-medium">
                  What are you trying to achieve?
                  <textarea
                    required
                    rows={6}
                    value={form.details}
                    onChange={(e) => set("details", e.target.value)}
                    className={inputClass}
                    placeholder="Business context, what exists today, and what success looks like."
                  />
                </label>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <label className="block text-sm font-medium">
                    Indicative budget
                    <select
                      value={form.budget_range}
                      onChange={(e) => set("budget_range", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select</option>
                      {budgets.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-sm font-medium">
                    Timeline
                    <select
                      value={form.timeline}
                      onChange={(e) => set("timeline", e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select</option>
                      {timelines.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <fieldset>
                <legend className="font-display text-2xl font-bold">How do we reach you?</legend>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
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
                    Company
                    <input
                      value={form.company}
                      onChange={(e) => set("company", e.target.value)}
                      className={inputClass}
                    />
                  </label>
                  <label className="block text-sm font-medium">
                    Existing website
                    <input
                      value={form.website}
                      onChange={(e) => set("website", e.target.value)}
                      className={inputClass}
                    />
                  </label>
                  <label className="block text-sm font-medium">
                    How did you hear about us?
                    <input
                      value={form.referral_source}
                      onChange={(e) => set("referral_source", e.target.value)}
                      className={inputClass}
                    />
                  </label>
                </div>
              </fieldset>
            )}

            <div className="mt-10 flex flex-wrap items-center gap-3">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="rounded-full border border-border px-6 py-3.5 text-sm font-semibold"
                >
                  Back
                </button>
              )}
              {step < 2 ? (
                <button
                  type="button"
                  disabled={!canContinue}
                  onClick={() => setStep((s) => s + 1)}
                  className="rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-white disabled:opacity-40"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canContinue || submitting}
                  className="rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-white disabled:opacity-40"
                >
                  {submitting ? "Sending…" : "Send enquiry"}
                </button>
              )}
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              Your details are used only to respond to this enquiry.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
