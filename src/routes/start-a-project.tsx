import { createFileRoute } from "@tanstack/react-router";

import { seo, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/layout/SiteLayout";
import { ProjectEnquiryWizard } from "@/components/enquiry/ProjectEnquiryWizard";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Start a Project", path: "/start-a-project" },
];

export const Route = createFileRoute("/start-a-project")({
  head: () =>
    seo({
      title: "Start a Project | Diglizer Solution",
      description:
        "Tell us about your brand, website, content or growth project. Share the brief and we will come back with a considered next step.",
      path: "/start-a-project",
    }),
  component: StartAProject,
});

function StartAProject() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />
      <PageHero
        liquid="funnel"
        eyebrow="Start a project"
        title="Tell us what you are trying to build."
        lede="Three short steps. The more context you give, the more useful our first reply will be."
        breadcrumbs={crumbs}
      />

      <section className="section-y">
        <div className="container-wide max-w-3xl">
          <ProjectEnquiryWizard showPricingNote />
        </div>
      </section>
    </>
  );
}
