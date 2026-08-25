import { Link } from "@tanstack/react-router";

import { clientsByVerification } from "@/content/clients";
import { LiquidBrandObject } from "@/components/liquid/LiquidBrandObject";

/**
 * Selected Experience — premium static logo cloud directly below the hero.
 *
 * Official logo files are only rendered when a client has supplied one
 * (`logo` on the client entry). Where no approved logo asset exists, a
 * typographic name treatment is used instead — never a recreated, traced or
 * recoloured mark. Government emblems are never reproduced.
 *
 * No animation, gradient or filter is applied to the logos themselves; the
 * restrained liquid light sits behind the grid only.
 */
export function ClientLogoCloud() {
  const ordered = clientsByVerification;

  return (
    <section className="relative overflow-hidden border-y border-border surface-plum">
      <LiquidBrandObject
        state="nodes"
        className="absolute -left-32 top-0 h-[30rem] w-[30rem] opacity-10"
      />
      <div className="container-wide relative py-[4.5rem] md:py-24">
        <p className="eyebrow text-gradient">Selected Experience</p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="display-2 max-w-3xl">Experience behind the impact.</h2>
            <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">
              Experience across brands, institutions, healthcare organisations, public
              communication, education, mobility, technology and lifestyle.
            </p>
          </div>
          <Link
            to="/clients"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Explore All Clients &amp; Experience →
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:gap-x-10 md:gap-y-9 lg:grid-cols-5 xl:grid-cols-7">
          {ordered.map((client) => {
            const label = client.caseStudyUrl
              ? `View ${client.displayName} case study`
              : `View ${client.displayName} experience`;
            const content = client.logo ? (
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
            );

            return (
              <li key={client.slug}>
                {client.caseStudyUrl ? (
                  <Link
                    to="/work/$slug"
                    params={{ slug: client.caseStudyUrl }}
                    aria-label={label}
                    className="flex h-20 items-center justify-center rounded-xl px-4 text-center transition-colors hover:bg-muted/60"
                  >
                    {content}
                  </Link>
                ) : (
                  <Link
                    to="/clients"
                    aria-label={label}
                    className="flex h-20 items-center justify-center rounded-xl px-4 text-center transition-colors hover:bg-muted/60"
                  >
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          Client names, trademarks, logos and official emblems remain the property of their
          respective owners and are shown solely to identify relevant professional experience. Where
          an approved logo file has not been supplied, the organisation name is set typographically
          rather than recreated.
        </p>
      </div>
    </section>
  );
}
