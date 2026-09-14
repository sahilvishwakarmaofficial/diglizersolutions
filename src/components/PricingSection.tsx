import { Link } from "@tanstack/react-router";

import { pricing } from "@/content/pricing";

export function PricingSection({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <section className={`section-y ${dark ? "bg-ink text-ink-foreground" : "bg-muted/40"}`}>
      <div className="container-wide">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border/60 px-7 py-12 text-center md:px-12 md:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#694699,#FB2261,transparent)]"
          />
          <p className="eyebrow text-gradient">Pricing</p>
          <h2 className="display-2 mt-4">{pricing.headline}</h2>
          <p className="mt-6 font-display text-4xl font-bold md:text-5xl">
            <span className="text-gradient">{pricing.statement}</span>
          </p>
          <p
            className={`mt-6 mx-auto max-w-2xl leading-relaxed ${dark ? "text-ink-muted" : "text-muted-foreground"}`}
          >
            {pricing.description}
          </p>
          <p
            className={`mt-3 mx-auto max-w-2xl text-sm ${dark ? "text-ink-muted" : "text-muted-foreground"}`}
          >
            {pricing.supporting}
          </p>
          <Link
            to="/start-a-project"
            className="mt-8 inline-block rounded-full bg-gradient-brand px-7 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            {pricing.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function PricingLine({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <p className={`text-sm ${tone === "dark" ? "text-ink-muted" : "text-muted-foreground"}`}>
      <span className="font-semibold text-gradient">{pricing.statement}</span> {pricing.supporting}
    </p>
  );
}
