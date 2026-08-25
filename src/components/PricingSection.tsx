import { Link } from "@tanstack/react-router";

import { pricing } from "@/content/pricing";

export function PricingSection({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <section className={`section-y ${dark ? "bg-ink text-ink-foreground" : "bg-muted/40"}`}>
      <div className="container-wide grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow text-gradient">Pricing</p>
          <h2 className="display-2 mt-4">{pricing.headline}</h2>
          <p className="mt-6 font-display text-3xl font-bold md:text-4xl">
            <span className="text-gradient">{pricing.statement}</span>
          </p>
          <p
            className={`mt-5 max-w-xl leading-relaxed ${dark ? "text-ink-muted" : "text-muted-foreground"}`}
          >
            {pricing.description}
          </p>
          <p className={`mt-3 max-w-xl text-sm ${dark ? "text-ink-muted" : "text-muted-foreground"}`}>
            {pricing.supporting}
          </p>
          <Link
            to="/start-a-project"
            className="mt-8 inline-block rounded-full bg-gradient-brand px-7 py-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            {pricing.cta}
          </Link>
        </div>
        <figure className="overflow-hidden rounded-2xl border border-border">
          <img
            src="/media/digital/design-system.jpg"
            alt="Project planning board with type scale, colour tokens and component cards"
            loading="lazy"
            decoding="async"
            width={1600}
            height={1000}
            className="aspect-[16/10] w-full object-cover"
          />
        </figure>
      </div>
    </section>
  );
}

export function PricingLine({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <p className={`text-sm ${tone === "dark" ? "text-ink-muted" : "text-muted-foreground"}`}>
      <span className="font-semibold text-gradient">{pricing.statement}</span>{" "}
      {pricing.supporting}
    </p>
  );
}
