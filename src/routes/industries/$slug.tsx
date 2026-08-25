import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";

import { seo, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs, FinalCta } from "@/components/layout/SiteLayout";
import { getIndustry, legacyIndustryRedirects } from "@/content/industries";
import { getClient } from "@/content/clients";
import { getCapability } from "@/content/capabilities";
import { getProject } from "@/content/projects";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const target = legacyIndustryRedirects[params.slug];
    if (target) {
      throw redirect({ to: "/industries/$slug", params: { slug: target }, statusCode: 301 });
    }
    const industry = getIndustry(params.slug);
    if (!industry) throw notFound();
    return { industry };
  },
  head: ({ loaderData }) => {
    const industry = loaderData?.industry;
    if (!industry) return {};
    return seo({
      title: industry.metaTitle,
      description: industry.metaDescription,
      path: `/industries/${industry.slug}`,
    });
  },
  component: IndustryPage,
});

function IndustryPage() {
  const { industry } = Route.useLoaderData();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Industries", path: "/industries" },
    { name: industry.name, path: `/industries/${industry.slug}` },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: industry.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema]} />

      <section className="bg-ink text-ink-foreground">
        <div className="container-wide py-16 md:py-24">
          <div className="mb-8 text-ink-muted">
            <Breadcrumbs items={crumbs} />
          </div>
          <p className="eyebrow text-gradient">Industry</p>
          <h1 className="display-2 mt-4 max-w-4xl">{industry.name}</h1>
          <p className="lede mt-6 max-w-3xl">{industry.headline}</p>
          <p className="mt-6 max-w-3xl text-ink-muted">{industry.summary}</p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-wide grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold">What makes this category hard</h2>
            <ul className="mt-6 grid gap-3">
              {industry.challenges.map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">Where we have worked</h2>
            <ul className="mt-6 grid gap-3">
              {industry.experience.map((item) => (
                <li key={item} className="flex gap-3 text-muted-foreground">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-y-compact">
        <div className="container-wide">
          <h2 className="font-display text-2xl font-bold">Organisations in this category</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industry.clients.map((slug) => {
              const client = getClient(slug);
              if (!client) return null;
              return (
                <li key={slug} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="font-display text-lg font-bold leading-snug break-words">
                    {client.displayName}
                  </h3>
                  <p className="eyebrow mt-2 text-muted-foreground">{client.relationshipType}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {client.shortContribution}
                  </p>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted-foreground">
            Client names, trademarks and logos remain the property of their respective owners and
            are shown solely to identify relevant professional experience.
          </p>
        </div>
      </section>

      <section className="section-y bg-muted/40">
        <div className="container-wide grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold">Capabilities that fit</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {industry.capabilities.map((slug) => {
                const capability = getCapability(slug);
                if (!capability) return null;
                return (
                  <Link
                    key={slug}
                    to="/capabilities/$slug" params={{ slug: slug }}
                    className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                  >
                    {capability.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">Related work</h2>
            <ul className="mt-6 space-y-3">
              {industry.projects.map((slug) => {
                const project = getProject(slug);
                if (!project) return null;
                return (
                  <li key={slug}>
                    <Link
                      to="/work/$slug" params={{ slug: slug }}
                      className="font-display text-lg font-bold hover:text-primary"
                    >
                      {project.client}
                    </Link>
                    <p className="text-sm text-muted-foreground">{project.summary}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-wide">
          <h2 className="display-2">Questions we are asked</h2>
          <dl className="mt-10 max-w-3xl divide-y divide-border border-y border-border">
            {industry.faqs.map((faq) => (
              <div key={faq.question} className="py-6">
                <dt className="font-display text-lg font-bold">{faq.question}</dt>
                <dd className="mt-2 leading-relaxed text-muted-foreground">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
