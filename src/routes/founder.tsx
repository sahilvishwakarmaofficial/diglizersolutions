import { createFileRoute } from "@tanstack/react-router";

import { seo, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, FinalCta } from "@/components/layout/SiteLayout";
import { siteConfig, absoluteUrl } from "@/config/site";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Founder", path: "/founder" },
];

export const Route = createFileRoute("/founder")({
  head: () =>
    seo({
      title: `${siteConfig.founder.name} | Founder, Diglizer Solution`,
      description:
        "A note from the founder of Diglizer Solution on independence, craft and building creative and digital work that has to perform.",
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
    worksFor: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), personSchema]} />
      <PageHero
        eyebrow="Founder"
        title={siteConfig.founder.name}
        lede={siteConfig.founder.role}
        breadcrumbs={crumbs}
      />

      <section className="section-y">
        <div className="container-wide max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            I started Diglizer because I kept meeting good businesses with fragmented
            communication. A logo made in one place, a website in another, and advertising running
            against a message none of them had agreed on. The work was busy, but it was not
            building anything.
          </p>
          <p>
            My interest is in the join: how a positioning statement becomes a visual system, how
            that system becomes a website that loads fast and reads clearly, and how the same idea
            survives being compressed into a nine-second video or a WhatsApp message.
          </p>
          <p>
            We keep the studio small on purpose. Small means senior people on the work, short
            decision chains and no distance between the person who promised something and the
            person delivering it.
          </p>
          <p>
            Whatever we take on, the test is the same: did it make the business easier to
            understand, easier to trust and easier to buy from?
          </p>
          <p className="font-display text-xl font-bold text-foreground">
            {siteConfig.founder.name}
          </p>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
