import { createFileRoute } from "@tanstack/react-router";

import { seo, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, FinalCta } from "@/components/layout/SiteLayout";
import { ClientDirectory } from "@/components/ClientDirectory";
import { PricingSection } from "@/components/PricingSection";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Clients", path: "/clients" },
];

export const Route = createFileRoute("/clients")({
  head: () =>
    seo({
      title: "Clients & Professional Experience | Diglizer Solution",
      description:
        "Explore Diglizer Solution's creative and digital experience across healthcare, fertility, education, government, culture, fashion, travel, technology and professional services.",
      path: "/clients",
    }),
  component: ClientsPage,
});

function ClientsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        liquid="network"
        eyebrow="Clients & Experience"
        title="Different industries. One standard of creative commitment."
        lede="Explore selected clients, collaborations and professional experience across brand design, graphic design, social media, video, websites, campaigns, packaging, photography and digital growth."
        breadcrumbs={crumbs}
      />

      <ClientDirectory
        eyebrow="Selected Experience"
        heading="Selected Clients & Professional Experience"
        intro="Our creative and digital experience spans healthcare, fertility, education, government, culture, fashion, travel, technology and professional services."
        showFilters
      />

      <section className="pb-12">
        <div className="container-wide">
          <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">
            Client names, trademarks and logos remain the property of their respective owners and
            are displayed solely to identify relevant professional experience. Project scope and
            involvement vary by engagement.
          </p>
        </div>
      </section>

      <PricingSection />

      <FinalCta />
    </>
  );
}
