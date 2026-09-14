import { Link } from "@tanstack/react-router";

import { clients } from "@/content/clients";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Selected Experience — official client logos on a clean white field so every
 * coloured and dark mark stays legible, presented as a seamless right-to-left
 * marquee.
 *
 * Only officially supplied logo files are rendered. Organisations without an
 * approved logo file are set typographically — never recreated, traced or
 * recoloured. Motion is CSS transform only, pauses on hover and keyboard
 * focus, and is replaced by a static grid under `prefers-reduced-motion`.
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
  logo?: string;
  logoAlt?: string;
};

const marks: Mark[] = clients
  .slice()
  .sort((a, b) => {
    const withLogo = Number(Boolean(b.logo && b.logoVerified)) - Number(Boolean(a.logo && a.logoVerified));
    return withLogo !== 0 ? withLogo : a.displayName.localeCompare(b.displayName);
  })
  .map((client) => ({
    slug: client.slug,
    displayName: client.displayName,
    ...(client.logo && client.logoVerified ? { logo: client.logo } : {}),
    ...(client.logoAlt ? { logoAlt: client.logoAlt } : {}),
  }));

function LogoMark({ mark }: { mark: Mark }) {
  if (!mark.logo) {
    return (
      <span className="font-display text-[0.78rem] font-bold uppercase leading-tight tracking-[0.1em] text-[#3b2b4d]">
        {mark.displayName}
      </span>
    );
  }
  const dims = logoDimensions[mark.slug] ?? { width: 320, height: 160 };
  return (
    <img
      src={mark.logo}
      alt={mark.logoAlt ?? `${mark.displayName} logo`}
      width={dims.width}
      height={dims.height}
      loading="lazy"
      decoding="async"
      className="max-h-12 w-auto max-w-[9.5rem] object-contain"
    />
  );
}

function Cell({ mark, hidden }: { mark: Mark; hidden?: boolean }) {
  return (
    <li
      className="flex h-24 w-[11.5rem] shrink-0 items-center justify-center px-5 sm:w-[13rem]"
      {...(hidden ? { "aria-hidden": true } : {})}
    >
      <LogoMark mark={mark} />
    </li>
  );
}

export function ClientLogoMarquee() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="selected-experience-heading"
      className="relative overflow-hidden bg-white text-[#1B0B2A]"
    >
      {/* Controlled transition from the dark section above into the white field. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(to_bottom,#10051D,rgba(16,5,29,0)_100%)] opacity-90"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-24 h-px bg-[linear-gradient(90deg,transparent,#694699,#FB2261,transparent)] opacity-70"
      />

      <div className="container-wide relative pb-16 pt-28 md:pb-20 md:pt-32">
        <p className="eyebrow bg-[linear-gradient(90deg,#694699,#FB2261)] bg-clip-text text-transparent">
          Selected Experience
        </p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="selected-experience-heading" className="display-2 max-w-3xl text-[#1B0B2A]">
              Experience behind the impact.
            </h2>
            <p className="mt-5 max-w-3xl leading-relaxed text-[#5b5266]">
              Experience across brands, institutions, healthcare organisations, public
              communication, education, mobility, technology and lifestyle.
            </p>
          </div>
          <Link
            to="/work"
            className="text-sm font-semibold text-[#694699] underline-offset-4 hover:underline"
          >
            Explore All Work &amp; Experience →
          </Link>
        </div>
      </div>

      <div className="relative pb-14 md:pb-20">
        {reducedMotion ? (
          <ul className="container-wide grid grid-cols-2 items-center justify-items-center gap-y-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7">
            {marks.map((mark) => (
              <Cell key={mark.slug} mark={mark} />
            ))}
          </ul>
        ) : (
          <div
            className="marquee-viewport"
            style={{ ["--marquee-duration" as string]: "38s", ["--marquee-duration-mobile" as string]: "46s" }}
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

      <div className="container-wide pb-14 md:pb-16">
        <p className="max-w-3xl text-xs leading-relaxed text-[#6b6377]">
          Client names, trademarks, logos and official emblems remain the property of their
          respective owners and are shown solely to identify relevant professional experience.
          Where an approved logo file has not been supplied, the organisation name is set
          typographically rather than recreated.
        </p>
      </div>
    </section>
  );
}
