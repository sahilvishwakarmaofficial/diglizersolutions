import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

/** The old site's /contact/contact.html page permanently redirects to Contact. */
export const Route = createFileRoute("/contact/$")({
  beforeLoad: ({ params }) => {
    if (params._splat === "contact.html") {
      throw redirect({ to: "/contact", statusCode: 301 });
    }
    throw notFound();
  },
  component: () => null,
});
