import { createFileRoute, Link } from "@tanstack/react-router";

import { seo, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, FinalCta } from "@/components/layout/SiteLayout";
import { siteConfig } from "@/config/site";
import { FounderPortrait } from "@/components/FounderPortrait";
import { PricingSection } from "@/components/PricingSection";
import { ClientDirectory } from "@/components/ClientDirectory";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About Diglizer Solution | Creative & Digital Company in Thane",
      description:
        "Diglizer Solution is an independent creative, technology and digital growth company in Thane and Mumbai, working across brand, web and performance.",
      path: "/about",
    }),
  component: About,
});

const values = [
  {
    title: "Clarity over noise",
    copy: "We would rather say one true thing well than five things loudly.",
  },
  {
    title: "Craft with intent",
    copy: "Design decisions are argued for, not decorated after the fact.",
  },
  {
    title: "Honest measurement",
    copy: "We report what happened, including what did not work. No vanity metrics.",
  },
  {
    title: "Category responsibility",
    copy: "In healthcare, finance and education we write within the limits the category demands.",
  },
];

function About() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="About"
        title="An independent studio built around one accountable team."
        lede="Diglizer Solution exists because most brands do not need three vendors. They need one team that can think, design, build and grow — and stay answerable for the result."
        breadcrumbs={crumbs}
      />

      <section className="section-y">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <h2 className="display-2">Why we started</h2>
          <div className="space-y-6 leading-relaxed text-muted-foreground">
            <p>
              Diglizer Solution was founded in the Mumbai Metropolitan Region to close a familiar
              gap: strategy that never reaches the designers, design that never reaches the
              developers, and marketing that spends against a message nobody agreed on.
            </p>
            <p>
              We work as a small senior team. That means fewer handovers, faster decisions and a
              direct line to the person doing the work. It also means we take on projects where we
              can be genuinely useful, rather than everything that comes through the door.
            </p>
            <p>
              Our work spans fertility and healthcare communication, medical and surgical product
              brands, community travel, education, retail and professional services — categories
              with real constraints, where craft has to survive contact with regulation, logistics
              and sales teams.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-muted/40">
        <div className="container-wide">
          <p className="eyebrow text-gradient">What we hold to</p>
          <h2 className="display-2 mt-4">Values that show up in the work.</h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="bg-card p-7">
                <h3 className="font-display text-lg font-bold">{value.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-wide grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <FounderPortrait />
          <div>
            <p className="eyebrow text-gradient">Leadership</p>
            <h2 className="display-2 mt-4">{siteConfig.founder.name}</h2>
            <p className="mt-3 text-sm font-medium text-muted-foreground">
              {siteConfig.founder.role}
            </p>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Diglizer is led hands-on. Every engagement has founder involvement in direction and
              quality, which is the practical benefit of staying independent and deliberately small.
            </p>
            <Link
              to="/founder"
              className="mt-6 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Read the founder's note
            </Link>
          </div>
            <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-7">
            <h3 className="font-display text-lg font-bold">Where we work</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Based in {siteConfig.contact.addressLocality} and working across Mumbai, Navi Mumbai
              and India. Remote collaboration is standard; on-site is available where the work needs
              it — shoots, exhibitions and workshops.
            </p>
          </div>
          </div>
        </div>
      </section>

      <ClientDirectory />

      <PricingSection />

      <FinalCta />
    </>
  );
}
