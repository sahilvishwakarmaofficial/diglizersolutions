import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { seo, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs, FinalCta } from "@/components/layout/SiteLayout";
import { MediaGallery } from "@/components/MediaGallery";
import { VideoWork } from "@/components/VideoWork";
import { VisitWebsite, ClientSocialLinks } from "@/components/ExternalLinks";
import { PricingLine } from "@/components/PricingSection";
import { getProject, getNextProject, type CaseStudySection } from "@/content/projects";
import { getCapability } from "@/content/capabilities";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const project = loaderData?.project;
    if (!project) return {};
    return seo({
      title: project.metaTitle,
      description: project.metaDescription,
      path: `/work/${project.slug}`,
      type: "article",
    });
  },
  component: CaseStudy,
});

function Section({ section }: { section: CaseStudySection }) {
  return (
    <div className="border-t border-border pt-10">
      <h2 className="font-display text-2xl font-bold">{section.heading}</h2>
      {section.paragraphs?.map((p) => (
        <p key={p} className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          {p}
        </p>
      ))}
      {section.bullets && (
        <ul className="mt-6 grid max-w-3xl gap-2 sm:grid-cols-2">
          {section.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-sm text-muted-foreground">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              {b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CaseStudy() {
  const { project } = Route.useLoaderData();
  const next = getNextProject(project.slug);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: project.client, path: `/work/${project.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <section className="bg-ink text-ink-foreground">
        <div className="container-wide py-14 md:py-20">
          <div className="mb-8 text-ink-muted">
            <Breadcrumbs items={crumbs} />
          </div>
          <p className="eyebrow text-gradient">{project.industry}</p>
          <h1 className="display-2 mt-4 max-w-4xl">{project.headline}</h1>
          <p className="lede mt-5 max-w-3xl text-ink-muted">{project.summary}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <VisitWebsite href={project.links.website} client={project.client} tone="dark" />
            <ClientSocialLinks links={project.links} client={project.client} tone="dark" />
          </div>

          <dl className="mt-10 grid gap-8 border-t border-ink-border pt-8 sm:grid-cols-3">
            <div>
              <dt className="eyebrow text-ink-muted">Client</dt>
              <dd className="mt-2 font-medium">{project.client}</dd>
            </div>
            <div>
              <dt className="eyebrow text-ink-muted">Location</dt>
              <dd className="mt-2 font-medium">{project.location}</dd>
            </div>
            <div>
              <dt className="eyebrow text-ink-muted">Services</dt>
              <dd className="mt-2 text-sm text-ink-muted">{project.services.join(", ")}</dd>
            </div>
          </dl>
        </div>
      </section>

      <figure className="container-wide -mt-8 md:-mt-12">
        <img
          src={project.image}
          alt={project.imageAlt}
          width={1600}
          height={1000}
          className="w-full rounded-2xl border border-border object-cover"
        />
        {project.provisionalMedia && (
          <figcaption className="mt-3 text-xs text-muted-foreground">
            Visual is a designed placeholder pending approved client media.
          </figcaption>
        )}
      </figure>

      <section className="section-y">
        <div className="container-wide space-y-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="font-display text-2xl font-bold">Overview</h2>
              {project.overview.map((p) => (
                <p key={p} className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
            {project.feature && (
              <figure className="overflow-hidden rounded-2xl border border-border">
                <img
                  src={project.feature.src}
                  alt={project.feature.alt}
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={900}
                  className="aspect-[4/3] w-full object-cover"
                />
                <figcaption className="bg-card px-5 py-3 text-xs text-muted-foreground">
                  {project.feature.caption}
                </figcaption>
              </figure>
            )}
          </div>

          <Section section={project.challenge} />
          <Section section={project.strategy} />

          {project.screens && project.screens.length > 0 && (
            <div className="border-t border-border pt-10">
              <h2 className="font-display text-2xl font-bold">Digital experience</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {project.screens.map((screen) => (
                  <figure
                    key={screen.src}
                    className="overflow-hidden rounded-2xl border border-border bg-muted"
                  >
                    <img
                      src={screen.src}
                      alt={screen.alt}
                      loading="lazy"
                      decoding="async"
                      width={1600}
                      height={1000}
                      className="w-full object-cover"
                    />
                    <figcaption className="bg-card px-5 py-3 text-xs text-muted-foreground">
                      {screen.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
              <div className="mt-6">
                <VisitWebsite href={project.links.website} client={project.client} />
              </div>
            </div>
          )}

          <Section section={project.solution} />
          {project.delivery && <Section section={project.delivery} />}

          {project.gallery.length > 0 && (
            <div className="border-t border-border pt-10">
              <MediaGallery
                items={project.gallery}
                eyebrow="Gallery"
                title="Selected work from the engagement"
                intro="Click any image to open the full-size viewer."
              />
            </div>
          )}

          {project.videos && project.videos.length > 0 && (
            <div className="border-t border-border pt-10">
              <h2 className="font-display text-2xl font-bold">Video and Reels</h2>
              <div className="mt-6">
                <VideoWork items={project.videos} tone="light" />
              </div>
            </div>
          )}

          <div className="border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold">Outcome</h2>
            <ul className="mt-6 grid max-w-3xl gap-3">
              {project.impact.map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-3xl text-xs text-muted-foreground">
              Outcomes are described qualitatively. We do not publish client performance figures
              without written approval.
            </p>
          </div>

          <div className="border-t border-border pt-10">
            <h2 className="font-display text-2xl font-bold">Capabilities used</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.relatedCapabilities.map((slug) => {
                const capability = getCapability(slug);
                if (!capability) return null;
                return (
                  <Link
                    key={slug}
                    to="/capabilities/$slug"
                    params={{ slug: slug }}
                    className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                  >
                    {capability.name}
                  </Link>
                );
              })}
            </div>
            <div className="mt-8 max-w-3xl">
              <PricingLine />
            </div>
          </div>

          {next && (
            <div className="border-t border-border pt-10">
              <p className="eyebrow text-muted-foreground">Next project</p>
              <Link
                to="/work/$slug"
                params={{ slug: next.slug }}
                className="mt-3 inline-block font-display text-3xl font-bold hover:text-primary"
              >
                {next.client}
              </Link>
            </div>
          )}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
