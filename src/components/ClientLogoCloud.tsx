import { Link } from "@tanstack/react-router";

import { clients } from "@/content/clients";

/**
 * Client logo cloud shown directly below the homepage hero.
 *
 * Official logo files are only rendered when a client has supplied one
 * (`logo` on the client entry). Where no approved logo asset exists, a
 * typographic name treatment is used instead — never a recreated,
 * traced or recoloured mark. Government emblems are never reproduced.
 */
export function ClientLogoCloud() {
  const ordered = [...clients].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section className="border-b border-border bg-background">
      <div className="container-wide py-12 md:py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="eyebrow text-muted-foreground">
            Selected clients and professional experience
          </p>
          <Link
            to="/clients"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            View the full client directory
          </Link>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {ordered.map((client) => (
            <li key={client.slug} className="bg-background">
              <div className="flex h-24 items-center justify-center px-5 text-center transition-colors hover:bg-muted/60">
                {client.logo ? (
                  <img
                    src={client.logo}
                    alt={client.logoAlt ?? `${client.displayName} logo`}
                    loading="lazy"
                    decoding="async"
                    className="max-h-10 w-auto object-contain"
                  />
                ) : (
                  <span className="font-display text-[0.8rem] font-bold uppercase leading-tight tracking-[0.08em] text-muted-foreground">
                    {client.displayName}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          Client names, trademarks, logos and official emblems remain the property of their
          respective owners and are shown solely to identify relevant professional experience.
          Where an approved logo file has not been supplied, the organisation name is set
          typographically rather than recreated.
        </p>
      </div>
    </section>
  );
}
