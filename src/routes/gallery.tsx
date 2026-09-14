import { createFileRoute, Link } from "@tanstack/react-router";

import { seo, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, FinalCta } from "@/components/layout/SiteLayout";
import { GalleryExplorer } from "@/components/gallery/GalleryExplorer";
import {
  activeGalleryCategories,
  galleryCategoryLabels,
  galleryClients,
  galleryItems,
} from "@/content/gallery";
import { absoluteUrl } from "@/config/site";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
];

export const Route = createFileRoute("/gallery")({
  head: () =>
    seo({
      title: "Gallery | Social, Campaign & Brand Design Work | Diglizer Solution",
      description:
        "Browse Diglizer Solution's creative gallery: social media design, public-awareness campaigns, healthcare communication and brand work created across industries.",
      path: "/gallery",
    }),
  component: GalleryPage,
});

function GalleryPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Diglizer Solution Gallery",
    url: absoluteUrl("/gallery"),
    description:
      "Selected social media, campaign, brand and digital work created by Diglizer Solution across healthcare, public communication, culture and lifestyle.",
    numberOfItems: galleryItems.length,
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), collectionSchema]} />

      <PageHero
        liquid="portal"
        eyebrow="Gallery"
        title="Creative work across formats."
        lede="Explore selected social media, video, print, campaign, brand and digital work created across industries."
        breadcrumbs={crumbs}
      />

      <section className="section-y">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div className="space-y-5 text-muted-foreground">
              <p className="leading-relaxed">
                This gallery collects {galleryItems.length} pieces of design work produced for
                hospitals and fertility centres, police road-safety communication, literary and
                cultural festivals, and fashion and lifestyle brands. Each piece is filed by the
                organisation whose identity is visible in the artwork, and by the kind of work it
                represents.
              </p>
              <p className="leading-relaxed">
                Work spans{" "}
                {activeGalleryCategories
                  .map((category) => galleryCategoryLabels[category].toLowerCase())
                  .join(", ")}
                . For the story behind individual engagements, read the{" "}
                <Link to="/work" className="font-semibold text-primary underline-offset-4 hover:underline">
                  full case studies and client experience
                </Link>
                , or see how this work is produced under{" "}
                <Link
                  to="/capabilities/brand-creative"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  brand and creative
                </Link>{" "}
                and{" "}
                <Link
                  to="/capabilities/social-media"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  social media
                </Link>
                .
              </p>
              <p className="text-xs leading-relaxed">
                Client names, trademarks and logos shown within the artwork remain the property of
                their respective owners and appear solely to identify relevant professional work.
              </p>
            </div>

            <aside className="rounded-2xl border border-border bg-muted/40 p-7">
              <h2 className="font-display text-lg font-bold">Organisations featured</h2>
              <ul className="mt-4 flex flex-wrap gap-2 text-xs">
                {galleryClients.map((client) => (
                  <li
                    key={client.slug}
                    className="rounded-full border border-border px-3 py-1.5 text-muted-foreground"
                  >
                    {client.name}
                  </li>
                ))}
              </ul>
              <div className="mt-6 grid gap-2 text-sm">
                <Link
                  to="/industries/healthcare-fertility-hospitals"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Healthcare, fertility and hospital communication
                </Link>
                <Link
                  to="/industries/government-public-service"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Government and public-service campaigns
                </Link>
                <Link
                  to="/industries/culture-events-entertainment"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Culture, events and entertainment design
                </Link>
              </div>
            </aside>
          </div>

          <div className="mt-14">
            <GalleryExplorer />
          </div>

          <div className="mt-14 rounded-2xl border border-border p-8">
            <h2 className="font-display text-xl font-bold">Want work like this for your brand?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Tell us what you are launching, changing or trying to grow, and we will shape the
              creative system around it.
            </p>
            <Link
              to="/start-a-project"
              className="mt-6 inline-flex rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
