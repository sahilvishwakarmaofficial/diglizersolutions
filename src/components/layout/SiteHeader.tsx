import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

import { siteConfig } from "@/config/site";
import { mainNav, capabilityNav, industryNav } from "@/content/navigation";
import { cn } from "@/lib/utils";

function LogoLink({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" aria-label={`${siteConfig.name} home`} onClick={onClick} className="shrink-0">
      <img
        src={siteConfig.logos.full}
        alt={`${siteConfig.name} logo`}
        width={1920}
        height={410}
        className="hidden h-7 w-auto sm:block md:h-8"
      />
      <img
        src={siteConfig.logos.icon}
        alt={`${siteConfig.shortName} symbol`}
        width={512}
        height={480}
        className="h-8 w-auto sm:hidden"
      />
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
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <div className="container-wide flex h-16 items-center justify-between gap-6 md:h-20">
        <LogoLink />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => {
            const hasMenu = item.label === "Capabilities" || item.label === "Industries";
            return (
              <div key={item.to} className={cn("group relative", hasMenu && "static")}>
                <Link
                  to={item.to}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                    isActive(item.to) ? "text-primary" : "text-foreground/80",
                  )}
                >
                  {item.label}
                  {hasMenu && <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />}
                </Link>
                {item.label === "Capabilities" && (
                  <MegaMenu
                    items={capabilityNav}
                    indexTo="/capabilities"
                    indexLabel="Explore all capabilities"
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
            className="hidden rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
          >
            Start a Project
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink text-ink-foreground lg:hidden">
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
