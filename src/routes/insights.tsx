import { createFileRoute, Link } from "@tanstack/react-router";

import { seo, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero, FinalCta } from "@/components/layout/SiteLayout";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Insights", path: "/insights" },
];

export const Route = createFileRoute("/insights")({
  head: () =>
    seo({
      title: "Insights | Notes on Brand, Web and Growth | Diglizer Solution",
      description:
        "Practical notes from Diglizer Solution on branding, website performance, healthcare communication, SEO and paid media for Indian businesses.",
      path: "/insights",
    }),
  component: Insights,
});

const notes = [
  {
    topic: "Brand",
    title: "A logo is not an identity",
    copy: "Why type scale, colour behaviour and layout rules do more for recognition than the mark itself — and what to ask for instead.",
  },
  {
    topic: "Healthcare",
    title: "Advertising in a restricted category",
    copy: "How fertility and healthcare brands can build trust and generate enquiries while staying inside platform policy.",
  },
  {
    topic: "Web",
    title: "Speed is a content decision",
    copy: "Most slow websites are not slow because of code. They are slow because nobody edited the page.",
  },
  {
    topic: "Growth",
    title: "The metrics worth reporting",
    copy: "Reach and impressions rarely explain a business result. A short list of numbers that actually inform the next decision.",
  },
];

function Insights() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        eyebrow="Insights"
        title="Notes from the work."
        lede="Short, practical thinking on brand, web and growth. Full articles are being published progressively — the topics below are what we are writing on now."
        breadcrumbs={crumbs}
      />

      <section className="section-y">
        <div className="container-wide grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {notes.map((note) => (
            <article key={note.title} className="bg-card p-8">
              <p className="eyebrow text-muted-foreground">{note.topic}</p>
              <h2 className="mt-3 font-display text-xl font-bold">{note.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{note.copy}</p>
              <p className="mt-5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Coming soon
              </p>
            </article>
          ))}
        </div>
        <div className="container-wide mt-10">
          <p className="text-sm text-muted-foreground">
            Want us to write about something specific?{" "}
            <Link to="/contact" className="font-semibold text-primary hover:underline">
              Tell us
            </Link>
            .
          </p>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
