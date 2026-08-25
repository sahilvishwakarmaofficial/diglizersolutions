import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

import { siteConfig, telHref, mailtoHref, whatsappHref } from "@/config/site";
import { mainNav, capabilityNav, industryNav } from "@/content/navigation";
import { cn } from "@/lib/utils";

function LogoLink({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" aria-label={`${siteConfig.name} home`} onClick={onClick} className="shrink-0">
      <span className="flex items-center gap-2.5">
        <img
          src={siteConfig.logos.icon}
          alt={`${siteConfig.name} logo`}
          width={512}
          height={480}
          className="h-8 w-auto md:h-9"
        />
        <span className="hidden font-display text-[1.05rem] font-extrabold uppercase leading-none tracking-[0.14em] text-foreground sm:block">
          Diglizer
          <span className="mt-0.5 block text-[0.52rem] font-bold tracking-[0.42em] text-muted-foreground">
            Solutions
          </span>
        </span>
      </span>
    </Link>
  );
}

function MegaMenu({
  items,
  indexTo,
  indexLabel,
}: {
  items: { label: string; to: string; description: string }[];
  indexTo: string;
  indexLabel: string;
}) {
  return (
    <div className="absolute left-1/2 top-full w-[min(72rem,calc(100vw-4rem))] -translate-x-1/2 pt-4 opacity-0 invisible transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
      <div className="rounded-2xl border border-border bg-popover p-6 shadow-lg">
        <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-xl px-4 py-3 transition-colors hover:bg-accent"
            >
              <span className="block text-sm font-semibold">{item.label}</span>
              <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                {item.description}
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-4 border-t border-border pt-4">
          <Link
            to={indexTo}
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            {indexLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 transition-all duration-300 md:pt-5">
      <div className="container-wide">
        <div
          className={cn(
            "flex items-center justify-between gap-6 rounded-full border px-4 transition-all duration-300 md:px-6",
            scrolled
              ? "h-14 border-white/25 bg-[#12061f]/85 backdrop-blur-xl md:h-16"
              : "h-16 border-white/40 bg-[#12061f]/50 backdrop-blur-md md:h-[4.5rem]",
          )}
        >
          <LogoLink />

          <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex">
            {mainNav.map((item) => {
              const hasMenu = item.label === "Services" || item.label === "Industries";
              return (
                <div key={item.to} className={cn("group relative", hasMenu && "static")}>
                  <Link
                    to={item.to}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.8rem] font-semibold uppercase tracking-[0.06em] transition-colors hover:text-primary",
                      isActive(item.to) ? "text-primary" : "text-foreground/85",
                    )}
                  >
                    {item.label}
                    {hasMenu && <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />}
                  </Link>
                  {item.label === "Services" && (
                    <MegaMenu
                      items={capabilityNav}
                      indexTo="/capabilities"
                      indexLabel="Explore all services"
                    />
                  )}
                  {item.label === "Industries" && (
                    <MegaMenu
                      items={industryNav}
                      indexTo="/industries"
                      indexLabel="Explore all industries"
                    />
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/start-a-project"
              className="capsule-primary hidden uppercase tracking-[0.08em] sm:inline-flex"
            >
              Start a Project
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 xl:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>


      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#12061f] text-ink-foreground xl:hidden">
          <div className="container-wide flex h-16 items-center justify-between">
            <img
              src={siteConfig.logos.icon}
              alt={`${siteConfig.shortName} symbol`}
              width={512}
              height={480}
              className="h-8 w-auto"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-border"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="container-wide flex-1 overflow-y-auto pb-12 pt-6">
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {mainNav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="border-b border-ink-border py-4 text-2xl font-semibold tracking-tight"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <p className="eyebrow mt-8 text-ink-muted">Capabilities</p>
            <div className="mt-3 grid gap-2">
              {capabilityNav.map((item) => (
                <Link key={item.to} to={item.to} className="text-sm text-ink-muted">
                  {item.label}
                </Link>
              ))}
            </div>
            <p className="eyebrow mt-8 text-ink-muted">Contact</p>
            <div className="mt-3 grid gap-2 text-sm text-ink-muted">
              {siteConfig.contact.phone && (
                <a href={telHref()} className="min-h-11 py-2">
                  {siteConfig.contact.phone}
                </a>
              )}
              {siteConfig.contact.email && (
                <a href={mailtoHref()} className="min-h-11 py-2 break-all">
                  {siteConfig.contact.email}
                </a>
              )}
              {whatsappHref() && (
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-11 py-2"
                >
                  WhatsApp
                </a>
              )}
              {siteConfig.founder.linkedin && (
                <a
                  href={siteConfig.founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-11 py-2"
                >
                  LinkedIn
                </a>
              )}
            </div>
            <Link
              to="/start-a-project"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gradient-brand px-6 py-4 text-base font-semibold text-white"
            >
              Start a Project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
