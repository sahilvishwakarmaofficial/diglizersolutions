import { Link } from "@tanstack/react-router";

import { clients } from "@/content/clients";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Selected Experience — the section keeps the dark plum Diglizer treatment and
 * only the contained logo band is white, so every coloured and dark mark stays
 * legible while the surrounding section remains part of the dark composition.
 *
 * Only organisations with an officially supplied logo file are shown. Motion is
 * CSS transform only, pauses on hover and keyboard focus, and is replaced by a
 * static grid under `prefers-reduced-motion`.
 */

/** Intrinsic dimensions of the stored logo files, used to prevent layout shift. */
const logoDimensions: Record<string, { width: number; height: number }> = {
  "aikaa-fashion": { width: 107, height: 28 },
  "ather-energy": { width: 318, height: 40 },
  "dnyanasadhana-college": { width: 172, height: 172 },
  "genetics-cryobank": { width: 600, height: 457 },
  grace26: { width: 600, height: 198 },
  "maharashtra-police": { width: 320, height: 320 },
  "mark-jewells": { width: 483, height: 455 },
  "mimas-world-hospitals": { width: 148, height: 160 },
  prober: { width: 208, height: 42 },
  "suviksha-hospital": { width: 600, height: 139 },
  tripwithowners: { width: 600, height: 600 },
  trusterra: { width: 243, height: 60 },
  "yashoda-ivf": { width: 600, height: 159 },
};

type Mark = {
  slug: string;
  displayName: string;
  logo: string;
  logoAlt?: string;
};

const marks: Mark[] = clients
  .filter((client): client is typeof client & { logo: string } =>
    Boolean(client.logo && client.logoVerified),
  )
  .slice()
  .sort((a, b) => a.displayName.localeCompare(b.displayName))
  .map((client) => ({
    slug: client.slug,
    displayName: client.displayName,
    logo: client.logo,
    ...(client.logoAlt ? { logoAlt: client.logoAlt } : {}),
  }));

function Cell({ mark, hidden }: { mark: Mark; hidden?: boolean }) {
  const dims = logoDimensions[mark.slug] ?? { width: 320, height: 160 };
  return (
    <li
      className="flex h-20 w-[10.5rem] shrink-0 items-center justify-center px-5 sm:w-[12rem]"
      {...(hidden ? { "aria-hidden": true } : {})}
    >
      <img
        src={mark.logo}
        alt={mark.logoAlt ?? `${mark.displayName} logo`}
        width={dims.width}
        height={dims.height}
        loading="lazy"
        decoding="async"
        className="max-h-11 w-auto max-w-[8.5rem] object-contain"
      />
    </li>
  );
}

export function ClientLogoMarquee() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="selected-experience-heading"
      className="relative overflow-hidden bg-ink text-ink-foreground"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_0%,rgba(105,70,153,0.35),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_85%_80%,rgba(251,34,97,0.16),transparent)]"
      />

      <div className="container-wide relative section-y">
        <p className="eyebrow text-gradient">Selected Experience</p>
        <h2 id="selected-experience-heading" className="display-2 mt-4 max-w-3xl">
          Experience behind the impact.
        </h2>
        <p className="mt-5 max-w-3xl leading-relaxed text-ink-muted">
          Experience across brands, institutions, healthcare organisations, public communication,
          education, mobility, technology and lifestyle.
        </p>

        <div className="mt-12 overflow-hidden rounded-[24px] border border-[#E4DCEF] bg-white py-7 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.55)]">
          {reducedMotion ? (
            <ul className="grid grid-cols-2 items-center justify-items-center gap-y-3 px-6 sm:grid-cols-3 lg:grid-cols-5">
              {marks.map((mark) => (
                <Cell key={mark.slug} mark={mark} />
              ))}
            </ul>
          ) : (
            <div
              className="marquee-viewport"
              style={{
                ["--marquee-duration" as string]: "34s",
                ["--marquee-duration-mobile" as string]: "42s",
              }}
            >
              <div className="marquee-track">
                <ul className="flex items-center">
                  {marks.map((mark) => (
                    <Cell key={mark.slug} mark={mark} />
                  ))}
                </ul>
                {/* Visual duplicate only — hidden from assistive technology so each
                    organisation is announced exactly once. */}
                <ul className="flex items-center" aria-hidden="true">
                  {marks.map((mark) => (
                    <Cell key={`dup-${mark.slug}`} mark={mark} hidden />
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-3xl text-xs leading-relaxed text-ink-muted">
            Client names, trademarks and official logos remain the property of their respective
            owners and are shown only to identify relevant professional experience.
          </p>
          <Link to="/gallery" className="text-sm font-semibold underline-offset-4 hover:underline">
            Explore the Gallery →
          </Link>
        </div>
      </div>
    </section>
  );
}
