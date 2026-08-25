import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { MessageCircle, Phone, Mail, Sparkles } from "lucide-react";

import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { LiquidBrandObject, type LiquidState } from "@/components/liquid/LiquidBrandObject";
import { whatsappHref, telHref, mailtoHref } from "@/config/site";


const BAR_HIDDEN_PATHS = [
  "/privacy-policy",
  "/terms",
  "/cookie-policy",
  "/accessibility",
  "/thank-you",
];

function MobileContactBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (BAR_HIDDEN_PATHS.includes(pathname)) return null;
  const tel = telHref();
  const mail = mailtoHref();
  if (!tel && !mail) return null;

  const itemClass =
    "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[0.7rem] font-semibold";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur md:hidden">
      <nav aria-label="Quick contact" className="container-wide flex items-stretch">
        {tel && (
          <a href={tel} className={itemClass} aria-label="Call Diglizer Solution">
            <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
            Call
          </a>
        )}
        {mail && (
          <a href={mail} className={itemClass} aria-label="Email Diglizer Solution">
            <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
            Email
          </a>
        )}
        <Link to="/start-a-project" className={itemClass} aria-label="Start a project enquiry">
          <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
          Enquire
        </Link>
      </nav>
    </div>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const wa = whatsappHref();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteHeader />
      {/* key forces the short liquid re-form on route change; content stays interactive. */}
      <main key={pathname} id="main" className="route-liquid-enter flex-1 pb-16 pt-16 md:pb-0 md:pt-20">
        {children}
      </main>

      <SiteFooter />
      <MobileContactBar />
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="fixed bottom-20 right-5 z-40 md:bottom-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card shadow-sm transition-transform hover:-translate-y-0.5"
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
  liquid = "portal",
  hue = 0,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  breadcrumbs?: { name: string; path: string }[];
  /** Liquid Intelligence state that expresses this page's role in the journey. */
  liquid?: LiquidState | "none";
  hue?: number;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-ink-foreground">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_70%_at_12%_0%,color-mix(in_oklab,var(--brand-purple)_26%,transparent),transparent)]" />
      {liquid !== "none" && (
        <LiquidBrandObject
          state={liquid}
          hue={hue}
          className="absolute -right-[22%] top-1/2 hidden h-[34rem] w-[34rem] -translate-y-1/2 opacity-70 md:block lg:-right-[10%] lg:h-[40rem] lg:w-[40rem]"
        />
      )}
      <div className="container-wide relative py-16 md:py-24">
        {breadcrumbs && (
          <div className="mb-8 text-ink-muted">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        {eyebrow && <p className="eyebrow text-gradient">{eyebrow}</p>}
        <h1 className="display-2 mt-4 max-w-4xl">{title}</h1>
        {lede && <p className="lede mt-6 max-w-3xl text-ink-muted">{lede}</p>}
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
