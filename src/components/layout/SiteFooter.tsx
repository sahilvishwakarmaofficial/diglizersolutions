import { Link } from "@tanstack/react-router";
import { Mail, Phone, MessageCircle } from "lucide-react";

import { siteConfig, activeSocialLinks, whatsappHref } from "@/config/site";
import {
  footerCompany,
  footerLegal,
  capabilityNav,
  industryNav,
  footerInsights,
} from "@/content/navigation";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const socials = activeSocialLinks();
  const wa = whatsappHref();

  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-wide py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <img
              src={siteConfig.logos.full}
              alt={`${siteConfig.name} logo`}
              width={1920}
              height={410}
              className="h-8 w-auto brightness-0 invert"
              loading="lazy"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-muted">
              {siteConfig.description}
            </p>
            <p className="mt-6 text-sm font-medium">Thane • Mumbai • India</p>
            <p className="mt-2 font-display text-lg font-bold">
              <span className="text-gradient">Let&apos;s discuss your project.</span>
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-ink-muted">
              {siteConfig.contact.email && (
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-2 hover:text-ink-foreground"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {siteConfig.contact.email}
                </a>
              )}
              {siteConfig.contact.phone && (
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 hover:text-ink-foreground"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {siteConfig.contact.phone}
                </a>
              )}
              {wa && (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-ink-foreground"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </a>
              )}
            </div>
          </div>

          <FooterColumn title="Company" links={footerCompany} />
          <FooterColumn title="Capabilities" links={capabilityNav} />
          <FooterColumn title="Industries" links={industryNav} />
          <FooterColumn title="Insights" links={footerInsights} />
        </div>

        <div className="rule-gradient mt-14" />

        <div className="mt-8 flex flex-col gap-6 text-sm text-ink-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.name}. Built with strategy, creativity and intent.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLegal.map((item) => (
              <Link key={item.to} to={item.to} className="hover:text-ink-foreground">
                {item.label}
              </Link>
            ))}
          </div>
          {socials.length > 0 && (
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink-foreground"
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; to: string }[];
}) {
  return (
    <div>
      <p className="eyebrow text-ink-muted">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="text-ink-muted transition-colors hover:text-ink-foreground">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
