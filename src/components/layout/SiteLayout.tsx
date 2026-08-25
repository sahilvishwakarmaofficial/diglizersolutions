import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";

import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { whatsappHref } from "@/config/site";

export function SiteLayout({ children }: { children: ReactNode }) {
  const wa = whatsappHref();

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1 pt-16 md:pt-20">
        {children}
      </main>
      <SiteFooter />
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-transform hover:-translate-y-0.5"
        >
          <MessageCircle className="h-5 w-5 text-primary" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {index === items.length - 1 ? (
              <span aria-current="page">{item.name}</span>
            ) : (
              <Link to={item.path} className="hover:text-foreground">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  lede,
  breadcrumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  breadcrumbs?: { name: string; path: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="container-wide py-16 md:py-24">
        {breadcrumbs && (
          <div className="mb-8 text-ink-muted">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        {eyebrow && <p className="eyebrow text-gradient">{eyebrow}</p>}
        <h1 className="display-2 mt-4 max-w-4xl">{title}</h1>
        {lede && <p className="lede mt-6 text-ink-muted">{lede}</p>}
        {children}
      </div>
    </section>
  );
}

export function FinalCta({
  title = "Have an ambition? Let's build what comes next.",
  copy = "Tell us what you are building, changing or trying to grow. We will help define the right creative and digital path.",
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <section className="section-y bg-ink text-ink-foreground">
      <div className="container-wide">
        <div className="rule-gradient" />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <h2 className="display-2 max-w-3xl">{title}</h2>
          <div>
            <p className="text-ink-muted">{copy}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/start-a-project"
                className="rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Start a Project
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-ink-border px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-ink-elevated"
              >
                Contact Diglizer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
