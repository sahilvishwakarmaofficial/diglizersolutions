import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { seo, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs, FinalCta } from "@/components/layout/SiteLayout";
import { getCapability } from "@/content/capabilities";
import { getIndustry } from "@/content/industries";
import { getProject } from "@/content/projects";
import { absoluteUrl } from "@/config/site";

export const Route = createFileRoute("/capabilities/$slug")({
  loader: ({ params }) => {
    const capability = getCapability(params.slug);
    if (!capability) throw notFound();
    return { capability };
  },
  head: ({ loaderData }) => {
    const capability = loaderData?.capability;
    if (!capability) return {};
    return seo({
      title: capability.metaTitle,
      description: capability.metaDescription,
      path: `/capabilities/${capability.slug}`,
    });
  },
  component: CapabilityPage,
});

function CapabilityPage() {
  const { capability } = Route.useLoaderData();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Capabilities", path: "/capabilities" },
    { name: capability.name, path: `/capabilities/${capability.slug}` },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: capability.name,
    description: capability.metaDescription,
    url: absoluteUrl(`/capabilities/${capability.slug}`),
    provider: { "@type": "ProfessionalService", name: "Diglizer Solution" },
    areaServed: ["Thane", "Mumbai", "India"],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: capability.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), serviceSchema, faqSchema]} />

      <section className="bg-ink text-ink-foreground">
        <div className="container-wide py-16 md:py-24">
          <div className="mb-8 text-ink-muted">
            <Breadcrumbs items={crumbs} />
          </div>
          <p className="eyebrow text-gradient">{capability.group}</p>
          <h1 className="display-2 mt-4 max-w-4xl">{capability.name}</h1>
          <p className="lede mt-6 max-w-3xl">{capability.headline}</p>
          <p className="mt-6 max-w-3xl text-ink-muted">{capability.summary}</p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-wide grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-bold">The problem we usually meet</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">{capability.problem}</p>
            <h2 className="mt-12 font-display text-2xl font-bold">How we approach it</h2>
            {capability.explanation.map((p) => (
              <p key={p} className="mt-4 leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
          <aside className="rounded-2xl border border-border bg-muted/40 p-8">
            <h2 className="eyebrow text-muted-foreground">What you get</h2>
            <ul className="mt-5 grid gap-2.5">
              {capability.deliverables.map((item) => (
                <li key={item} className="flex gap-3 text-sm">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section-y bg-muted/40">
        <div className="container-wide">
          <h2 className="display-2">Process</h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {capability.process.map((item, index) => (
              <div key={item.step} className="bg-card p-7">
                <span className="font-display text-sm font-bold text-gradient">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold">{item.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-wide grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold">Industries where this applies</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {capability.industries.map((slug) => {
                const industry = getIndustry(slug);
                if (!industry) return null;
                return (
                  <Link
                    key={slug}
                    to={`/industries/${slug}`}
                    className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
                  >
                    {industry.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">Related work</h2>
            <ul className="mt-6 space-y-3">
              {capability.relatedProjects.map((slug) => {
                const project = getProject(slug);
                if (!project) return null;
                return (
                  <li key={slug}>
                    <Link
                      to={`/work/${slug}`}
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

      <section className="section-y bg-muted/40">
        <div className="container-wide">
          <h2 className="display-2">Questions we are asked</h2>
          <dl className="mt-10 max-w-3xl divide-y divide-border border-y border-border">
            {capability.faqs.map((faq) => (
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
