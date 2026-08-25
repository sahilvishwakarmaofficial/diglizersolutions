import { createFileRoute, Link } from "@tanstack/react-router";
import { Linkedin, ArrowUpRight } from "lucide-react";

import { seo, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs, FinalCta } from "@/components/layout/SiteLayout";
import { FounderPortrait } from "@/components/FounderPortrait";
import { siteConfig, absoluteUrl } from "@/config/site";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Founder", path: "/founder" },
];

const FOUNDER_LINKEDIN = "https://in.linkedin.com/in/sahil-vishwakarma-designer";

const expertise = [
  "Brand and visual identity direction",
  "Campaign and advertising creative",
  "Website design and digital experience",
  "Video editing and short-form content",
  "Packaging, catalogues and exhibition design",
  "Performance and social media creative",
];

const experience = [
  {
    client: "Genetics Cryobank",
    role: "Senior graphic design, campaigns and exhibition communication",
  },
  { client: "Yashoda IVF & Fertility Centre", role: "Graphic design management, 2024–2025" },
  { client: "Grace26", role: "Website, packaging and product communication" },
  { client: "TripWithOwners", role: "Brand direction and digital experience" },
  { client: "Pasbaan-e-Adab", role: "Video editing, Reels and event design" },
  { client: "Siddhartha Logic", role: "Senior graphic design and video editing" },
  { client: "Prober", role: "Freelance design and video editing" },
  { client: "Aikaa Fashion", role: "Social media, Reels and Meta advertising" },
  { client: "Satish Pradhan Dnyanasadhana College, Thane", role: "Institutional and event creative" },
  { client: "Maharashtra Police", role: "Project-based design and communication" },
  { client: "Suviksha Hospital", role: "Healthcare design and communication" },
  { client: "MIMAS World Hospitals", role: "Healthcare design and communication" },
  { client: "Advaith Hospital", role: "Healthcare design and communication" },
  { client: "Xpert Super Speciality Trulife", role: "Fertility and healthcare creative" },
  { client: "Mark Jewells", role: "Jewellery brand and campaign design" },
  { client: "Medibrain", role: "Healthcare design and communication" },
  { client: "Mahadevi Hospital", role: "Healthcare design and communication" },
];

export const Route = createFileRoute("/founder")({
  head: () =>
    seo({
      title: `${siteConfig.founder.name} | Founder, Diglizer Solution`,
      description:
        "A note from Sahil Vishwakarma, founder of Diglizer Solution, on independence, craft and building creative and digital work that has to perform.",
      path: "/founder",
    }),
  component: Founder,
});

function Founder() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.founder.name,
    jobTitle: siteConfig.founder.role,
    url: absoluteUrl("/founder"),
    sameAs: [FOUNDER_LINKEDIN],
    worksFor: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), personSchema]} />

      <section className="bg-ink text-ink-foreground">
        <div className="container-wide grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <FounderPortrait className="max-w-sm" />
          <div>
            <div className="mb-6 text-ink-muted">
              <Breadcrumbs items={crumbs} />
            </div>
            <p className="eyebrow text-gradient">Founder</p>
            <h1 className="display-2 mt-4">{siteConfig.founder.name}</h1>
            <p className="mt-3 text-lg text-ink-muted">{siteConfig.founder.role}</p>
            <p className="mt-6 max-w-2xl leading-relaxed text-ink-muted">
              Creative and digital practitioner working across brand identity, campaign design,
              websites, packaging and video — with hands-on experience in healthcare, medical
              products, travel, culture, fashion and professional services.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={FOUNDER_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sahil Vishwakarma on LinkedIn (opens in a new tab)"
                className="inline-flex items-center gap-2 rounded-full border border-ink-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-ink-elevated"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" /> LinkedIn
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                to="/start-a-project"
                className="rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white"
              >
                Work with us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-wide grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              I started Diglizer because I kept meeting good businesses with fragmented
              communication. A logo made in one place, a website in another, and advertising
              running against a message none of them had agreed on. The work was busy, but it was
              not building anything.
            </p>
            <p>
              My interest is in the join: how a positioning statement becomes a visual system, how
              that system becomes a website that loads fast and reads clearly, and how the same
              idea survives being compressed into a nine-second video.
            </p>
            <p>
              We keep the studio small on purpose. Small means senior people on the work, short
              decision chains and no distance between the person who promised something and the
              person delivering it.
            </p>
            <p className="font-display text-xl font-bold text-foreground">
              {siteConfig.founder.name}
            </p>
          </div>

          <aside className="space-y-8">
            <div className="rounded-2xl border border-border bg-muted/40 p-7">
              <h2 className="font-display text-lg font-bold">Areas of expertise</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {expertise.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border p-7">
              <h2 className="font-display text-lg font-bold">
                Selected clients and professional experience
              </h2>
              <ul className="mt-4 space-y-3 text-sm">
                {experience.map((item) => (
                  <li key={item.client}>
                    <p className="font-semibold">{item.client}</p>
                    <p className="text-muted-foreground">{item.role}</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
