import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Check, Loader2, Paperclip, X } from "lucide-react";

import { industries } from "@/content/industries";
import { budgetOptions, pricing } from "@/content/pricing";
import { supabase } from "@/integrations/supabase/client";
import { submitProjectEnquiry, type EnquiryInput } from "@/lib/enquiries.functions";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "diglizer.enquiry.v1";

const SERVICE_OPTIONS = [
  "Branding and Graphic Design",
  "Social Media Management",
  "Video and Content",
  "Website Design and Development",
  "Performance Marketing",
  "Photography and Production",
  "Packaging and Print",
  "Standee and Display Design",
  "Strategy and Consulting",
  "Other",
];

const TIMELINE_OPTIONS = ["As soon as possible", "1–2 months", "3–6 months", "Exploring options"];

const CONTACT_METHODS = ["Phone", "WhatsApp", "Email", "LinkedIn"];

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".pdf",
  ".doc",
  ".docx",
  ".zip",
];
const BLOCKED_EXTENSIONS = [".exe", ".bat", ".cmd", ".sh", ".msi", ".com", ".scr", ".jar"];

const STEP_LABELS = ["Scope", "Brief", "Contact"] as const;

interface FormState {
  services: string[];
  project_type: string;
  industry: string;
  budget_range: string;
  preferred_start_date: string;
  timeline: string;
  engagement_type: string;

  company: string;
  website: string;
  social_link: string;
  details: string;
  main_challenge: string;
  deliverables: string;
  target_audience: string;
  project_goals: string;
  existing_assets: string;
  reference_links: string;
  additional_info: string;
  attachment_path: string;
  attachment_name: string;

  name: string;
  email: string;
  phone: string;
  preferred_contact_method: string;
  best_time_to_contact: string;
  city: string;
  consent: boolean;
  referral_source: string;
}

const emptyForm: FormState = {
  services: [],
  project_type: "",
  industry: "",
  budget_range: "",
  preferred_start_date: "",
  timeline: "",
  engagement_type: "",

  company: "",
  website: "",
  social_link: "",
  details: "",
  main_challenge: "",
  deliverables: "",
  target_audience: "",
  project_goals: "",
  existing_assets: "",
  reference_links: "",
  additional_info: "",
  attachment_path: "",
  attachment_name: "",

  name: "",
  email: "",
  phone: "",
  preferred_contact_method: "",
  best_time_to_contact: "",
  city: "",
  consent: false,
  referral_source: "",
};

interface StoredProgress {
  step: number;
  form: FormState;
  savedAt: number;
  formStartedAt: number;
}

function readStorage(): StoredProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredProgress;
    if (!parsed || typeof parsed.step !== "number" || !parsed.form) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStorage(progress: StoredProgress) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Storage can fail in private-browsing modes — non-fatal.
  }
}

function clearStorage() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Non-fatal.
  }
}

function fileExtension(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot).toLowerCase() : "";
}

/** Small stable string hash — good enough for a client-side dedupe key. */
function hashString(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

const inputClass =
  "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

const labelClass = "block text-sm font-medium";

function getUtmParams() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
    utm_term: params.get("utm_term") ?? undefined,
    utm_content: params.get("utm_content") ?? undefined,
  };
}

export interface ProjectEnquiryWizardProps {
  /** Shows the "Projects start from ₹25,000" note near the budget field. */
  showPricingNote?: boolean;
  className?: string;
}

export function ProjectEnquiryWizard({ showPricingNote, className }: ProjectEnquiryWizardProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [resumeBanner, setResumeBanner] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formStartedAtRef = useRef<number>(Date.now());
  const hasStartedRef = useRef(false);
  const dedupeKeyRef = useRef<string | null>(null);

  // Resume progress on mount.
  useEffect(() => {
    const saved = readStorage();
    if (saved) {
      setForm(saved.form);
      setStep(saved.step);
      formStartedAtRef.current = saved.formStartedAt;
      hasStartedRef.current = true;
      if (saved.step > 0) {
        const completedLabel = STEP_LABELS[saved.step - 1];
        const nextLabel = STEP_LABELS[saved.step];
        if (completedLabel && nextLabel) {
          setResumeBanner(
            `You've completed ${completedLabel}. Continue with your ${nextLabel}.`,
          );
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist progress whenever it changes.
  useEffect(() => {
    if (!hasStartedRef.current) return;
    writeStorage({
      step,
      form,
      savedAt: Date.now(),
      formStartedAt: formStartedAtRef.current,
    });
  }, [step, form]);

  function markStarted() {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      formStartedAtRef.current = Date.now();
      track("enquiry_started");
    }
  }

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    markStarted();
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key as string]) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  };

  const toggleService = (name: string) => {
    markStarted();
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(name)
        ? prev.services.filter((s) => s !== name)
        : [...prev.services, name],
    }));
  };

  function validateStep(index: number): Record<string, string> {
    const next: Record<string, string> = {};
    if (index === 0) {
      if (form.services.length === 0) next["services"] = "Select at least one service.";
    }
    if (index === 1) {
      if (!form.company.trim()) next["company"] = "Company or brand name is required.";
      if (form.details.trim().length < 10)
        next["details"] = "Please describe the project in a little more detail.";
      if (!form.main_challenge.trim()) next["main_challenge"] = "This field is required.";
      if (!form.deliverables.trim()) next["deliverables"] = "This field is required.";
    }
    if (index === 2) {
      if (!form.name.trim()) next["name"] = "Full name is required.";
      if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next["email"] = "Enter a valid email address.";
      if (!form.consent) next["consent"] = "Please confirm you agree to be contacted.";
    }
    return next;
  }

  function goNext() {
    const found = validateStep(step);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    setErrors({});
    if (step === 0) track("enquiry_scope_completed");
    if (step === 1) track("enquiry_brief_completed");
    setStep((s) => Math.min(s + 1, 2));
  }

  function goBack() {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  }

  function startOver() {
    if (typeof window !== "undefined" && !window.confirm("Start over and clear everything you've entered?")) {
      return;
    }
    clearStorage();
    setForm(emptyForm);
    setStep(0);
    setErrors({});
    setResumeBanner(null);
    hasStartedRef.current = false;
    dedupeKeyRef.current = null;
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const ext = fileExtension(file.name);

    if (BLOCKED_EXTENSIONS.includes(ext) || !ALLOWED_EXTENSIONS.includes(ext)) {
      toast.error("That file type isn't supported. Please attach an image, PDF, document or zip.");
      event.target.value = "";
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      toast.error("That file is larger than 10MB. Please attach a smaller file.");
      event.target.value = "";
      return;
    }

    setUploading(true);
    try {
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
      const { error } = await supabase.storage.from("enquiry-uploads").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (error) throw error;
      set("attachment_path", path);
      set("attachment_name", file.name);
      toast.success("File attached.");
    } catch {
      toast.error("Couldn't upload that file. You can still submit without it.");
    } finally {
      setUploading(false);
    }
  }

  function removeAttachment() {
    set("attachment_path", "");
    set("attachment_name", "");
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (submitting) return;

    const found = validateStep(2);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    if (!dedupeKeyRef.current) {
      dedupeKeyRef.current = hashString(
        JSON.stringify({
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          company: form.company.trim().toLowerCase(),
          details: form.details.trim(),
          bucket: Math.floor(Date.now() / (5 * 60 * 1000)),
        }),
      );
    }

    setSubmitting(true);

    const utm = getUtmParams();
    const payload: EnquiryInput = {
      services: form.services,
      project_type: form.project_type || undefined,
      industry: form.industry || undefined,
      budget_range: form.budget_range || undefined,
      preferred_start_date: form.preferred_start_date || undefined,
      timeline: form.timeline || undefined,
      engagement_type: form.engagement_type || undefined,

      company: form.company.trim(),
      website: form.website || undefined,
      social_link: form.social_link || undefined,
      details: form.details.trim(),
      main_challenge: form.main_challenge.trim(),
      deliverables: form.deliverables.trim(),
      target_audience: form.target_audience || undefined,
      project_goals: form.project_goals || undefined,
      existing_assets: form.existing_assets || undefined,
      reference_links: form.reference_links || undefined,
      additional_info: form.additional_info || undefined,
      attachment_path: form.attachment_path || undefined,

      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone || undefined,
      preferred_contact_method: form.preferred_contact_method || undefined,
      best_time_to_contact: form.best_time_to_contact || undefined,
      city: form.city || undefined,
      consent: true,
      referral_source: form.referral_source || undefined,

      source_page: typeof window !== "undefined" ? window.location.pathname : undefined,
      referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
      landing_page: typeof window !== "undefined" ? window.location.href : undefined,
      ...utm,
      dedupe_key: dedupeKeyRef.current,
      form_started_at: formStartedAtRef.current,
      website_url: "",
    };

    try {
      const result = await submitProjectEnquiry({ data: payload });
      if (result.ok) {
        track("enquiry_submitted");
        toast.success("Your enquiry is with us. We'll be in touch shortly.");
        clearStorage();
        navigate({ to: "/thank-you" });
      } else {
        toast.error(result.message ?? "We couldn't send that. Please try again.");
      }
    } catch {
      toast.error("We couldn't send that. Please try again or reach us on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  }

  const industryNames = useMemo(() => industries.map((i) => i.name), []);
  const statusMessage = `Step ${step + 1} of 3: ${STEP_LABELS[step]}`;

  return (
    <div className={className}>
      {resumeBanner && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-muted/40 px-5 py-4 text-sm">
          <span>{resumeBanner}</span>
          <button
            type="button"
            onClick={startOver}
            className="font-semibold text-primary hover:underline"
          >
            Start Over
          </button>
        </div>
      )}

      <ol className="flex gap-2 sm:gap-4" aria-label="Enquiry progress">
        {STEP_LABELS.map((label, index) => {
          const isActive = index === step;
          const isCompleted = index < step;
          return (
            <li key={label} className="flex-1">
              <div
                className={cn(
                  "flex h-9 items-center justify-center gap-2 rounded-full border text-xs font-semibold transition-colors",
                  isActive && "border-transparent bg-gradient-brand text-white",
                  isCompleted && !isActive && "border-primary/60 text-primary",
                  !isActive && !isCompleted && "border-border text-muted-foreground",
                )}
              >
                {isCompleted && !isActive ? (
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <span>{index + 1}.</span>
                )}
                <span>{label}</span>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="sr-only" role="status" aria-live="polite">
        {statusMessage}
      </p>

      <form onSubmit={handleSubmit} className="mt-10" noValidate>
        {/* Honeypot — hidden from real users, visible to naive bots. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_url_hp">Leave this field empty</label>
          <input
            id="website_url_hp"
            name="website_url_hp"
            tabIndex={-1}
            autoComplete="off"
            onChange={(e) => set("project_type", form.project_type)}
            value=""
            readOnly
          />
        </div>

        {step === 0 && (
          <fieldset>
            <legend className="font-display text-2xl font-bold">
              What do you need help with?
            </legend>
            <p className="mt-2 text-sm text-muted-foreground">
              Select every service that applies.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {SERVICE_OPTIONS.map((service) => {
                const active = form.services.includes(service);
                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                      active
                        ? "border-primary bg-accent"
                        : "border-border hover:border-primary",
                    )}
                  >
                    {service}
                  </button>
                );
              })}
            </div>
            {errors["services"] && <p className="mt-2 text-xs text-destructive">{errors["services"]}</p>}

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <label className={labelClass}>
                Project type
                <input
                  value={form.project_type}
                  onChange={(e) => set("project_type", e.target.value)}
                  placeholder="e.g. New brand identity, website redesign"
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Industry
                <select
                  value={form.industry}
                  onChange={(e) => set("industry", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select</option>
                  {industryNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </label>
              <label className={labelClass}>
                Budget
                <select
                  value={form.budget_range}
                  onChange={(e) => set("budget_range", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select</option>
                  {budgetOptions.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
                {showPricingNote && (
                  <span className="mt-2 block text-xs text-muted-foreground">
                    {pricing.statement}
                  </span>
                )}
              </label>
              <label className={labelClass}>
                Expected timeline
                <select
                  value={form.timeline}
                  onChange={(e) => set("timeline", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select</option>
                  {TIMELINE_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
              <label className={labelClass}>
                Preferred start date
                <input
                  type="date"
                  value={form.preferred_start_date}
                  onChange={(e) => set("preferred_start_date", e.target.value)}
                  className={inputClass}
                />
              </label>
              <fieldset className={labelClass}>
                <legend>Engagement type</legend>
                <div className="mt-2 flex gap-4 text-sm font-normal">
                  {["One-time project", "Ongoing partnership"].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="engagement_type"
                        value={option}
                        checked={form.engagement_type === option}
                        onChange={(e) => set("engagement_type", e.target.value)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset>
            <legend className="font-display text-2xl font-bold">
              Tell us what you're building.
            </legend>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <label className={labelClass}>
                Company or brand name*
                <input
                  required
                  value={form.company}
                  onChange={(e) => set("company", e.target.value)}
                  className={inputClass}
                />
                {errors["company"] && <p className="mt-1 text-xs text-destructive">{errors["company"]}</p>}
              </label>
              <label className={labelClass}>
                Existing website
                <input
                  value={form.website}
                  onChange={(e) => set("website", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Social link
                <input
                  value={form.social_link}
                  onChange={(e) => set("social_link", e.target.value)}
                  placeholder="Instagram, LinkedIn, etc."
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Target audience
                <input
                  value={form.target_audience}
                  onChange={(e) => set("target_audience", e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>

            <label className="mt-6 block text-sm font-medium">
              Project description*
              <textarea
                required
                rows={5}
                value={form.details}
                onChange={(e) => set("details", e.target.value)}
                className={inputClass}
                placeholder="What exists today and what you're trying to build."
              />
              {errors["details"] && <p className="mt-1 text-xs text-destructive">{errors["details"]}</p>}
            </label>

            <label className="mt-6 block text-sm font-medium">
              Main challenge*
              <textarea
                required
                rows={3}
                value={form.main_challenge}
                onChange={(e) => set("main_challenge", e.target.value)}
                className={inputClass}
                placeholder="The main problem you're trying to solve."
              />
              {errors["main_challenge"] && (
                <p className="mt-1 text-xs text-destructive">{errors["main_challenge"]}</p>
              )}
            </label>

            <label className="mt-6 block text-sm font-medium">
              Required deliverables*
              <textarea
                required
                rows={3}
                value={form.deliverables}
                onChange={(e) => set("deliverables", e.target.value)}
                className={inputClass}
                placeholder="e.g. Logo, website, 10 social posts a month"
              />
              {errors["deliverables"] && (
                <p className="mt-1 text-xs text-destructive">{errors["deliverables"]}</p>
              )}
            </label>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <label className={labelClass}>
                Project goals
                <textarea
                  rows={3}
                  value={form.project_goals}
                  onChange={(e) => set("project_goals", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Existing assets
                <textarea
                  rows={3}
                  value={form.existing_assets}
                  onChange={(e) => set("existing_assets", e.target.value)}
                  placeholder="Brand guidelines, past design files, content library, etc."
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Reference links
                <textarea
                  rows={3}
                  value={form.reference_links}
                  onChange={(e) => set("reference_links", e.target.value)}
                  placeholder="Brands, websites or work you like."
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Anything else?
                <textarea
                  rows={3}
                  value={form.additional_info}
                  onChange={(e) => set("additional_info", e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>

            <div className="mt-6">
              <p className={labelClass}>Attachment (optional)</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Image, PDF, Word document or zip file. Max 10MB.
              </p>
              {form.attachment_name ? (
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm">
                  <Paperclip className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <span className="flex-1 truncate">{form.attachment_name}</span>
                  <button
                    type="button"
                    onClick={removeAttachment}
                    aria-label="Remove attachment"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.webp,.gif,.pdf,.doc,.docx,.zip"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="mt-2 block w-full text-sm text-muted-foreground file:mr-4 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-semibold file:text-foreground"
                />
              )}
              {uploading && (
                <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" /> Uploading…
                </p>
              )}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend className="font-display text-2xl font-bold">How do we reach you?</legend>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <label className={labelClass}>
                Full name*
                <input
                  required
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  className={inputClass}
                />
                {errors["name"] && <p className="mt-1 text-xs text-destructive">{errors["name"]}</p>}
              </label>
              <label className={labelClass}>
                Business email*
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  className={inputClass}
                />
                {errors["email"] && <p className="mt-1 text-xs text-destructive">{errors["email"]}</p>}
              </label>
              <label className={labelClass}>
                Phone / WhatsApp
                <input
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                Preferred contact method
                <select
                  value={form.preferred_contact_method}
                  onChange={(e) => set("preferred_contact_method", e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select</option>
                  {CONTACT_METHODS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </label>
              <label className={labelClass}>
                Best time to contact
                <input
                  value={form.best_time_to_contact}
                  onChange={(e) => set("best_time_to_contact", e.target.value)}
                  placeholder="e.g. Weekday mornings"
                  className={inputClass}
                />
              </label>
              <label className={labelClass}>
                City
                <input
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  className={inputClass}
                />
              </label>
              <label className={cn(labelClass, "sm:col-span-2")}>
                How did you hear about us?
                <input
                  value={form.referral_source}
                  onChange={(e) => set("referral_source", e.target.value)}
                  className={inputClass}
                />
              </label>
            </div>

            <div className="mt-8 rounded-xl border border-border bg-muted/30 p-5">
              <p className="eyebrow text-muted-foreground">Review</p>
              <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-muted-foreground">Service(s)</dt>
                  <dd>{form.services.join(", ") || "—"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Project type</dt>
                  <dd>{form.project_type || "—"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Budget</dt>
                  <dd>{form.budget_range || "—"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Timeline</dt>
                  <dd>{form.timeline || "—"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Company</dt>
                  <dd>{form.company || "—"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Preferred contact</dt>
                  <dd>{form.preferred_contact_method || "—"}</dd>
                </div>
              </dl>
            </div>

            <label className="mt-6 flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => set("consent", e.target.checked)}
                className="mt-1"
              />
              <span>
                I agree to be contacted by Diglizer Solution about this enquiry.*
              </span>
            </label>
            {errors["consent"] && <p className="mt-1 text-xs text-destructive">{errors["consent"]}</p>}
          </fieldset>
        )}

        <div className="mt-10 flex flex-wrap items-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="rounded-full border border-border px-6 py-3.5 text-sm font-semibold"
            >
              Back
            </button>
          )}
          {step < 2 ? (
            <button
              type="button"
              onClick={goNext}
              className="rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-white"
            >
              {step === 0 ? "Continue to Brief" : "Continue to Contact"}
            </button>
          ) : (
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-white disabled:opacity-40"
            >
              {submitting ? "Sending…" : "Submit Project Enquiry"}
            </button>
          )}
          {hasStartedRef.current && (
            <button
              type="button"
              onClick={startOver}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              Start Over
            </button>
          )}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          Your details are used only to respond to this enquiry.
        </p>
      </form>
    </div>
  );
}
