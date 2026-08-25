import { seo, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/layout/SiteLayout";
import { siteConfig } from "@/config/site";

export type LegalSection = { heading: string; paragraphs: string[]; bullets?: string[] };

export function legalHead(title: string, description: string, path: string) {
  return seo({ title, description, path });
}

export function LegalPage({
  name,
  path,
  title,
  lede,
  sections,
}: {
  name: string;
  path: string;
  title: string;
  lede: string;
  sections: LegalSection[];
}) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name, path },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero eyebrow="Legal" title={title} lede={lede} breadcrumbs={crumbs} />

      <section className="section-y">
        <div className="container-wide max-w-3xl">
          <p className="text-sm text-muted-foreground">
            This policy applies to {siteConfig.name} and the {siteConfig.domain} website.
          </p>
          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <div key={section.heading} className="border-t border-border pt-8">
                <h2 className="font-display text-2xl font-bold">{section.heading}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p} className="mt-4 leading-relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-5 space-y-2">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-sm text-muted-foreground">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
