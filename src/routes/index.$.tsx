import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

/** The old site's /index/index.html page permanently redirects to the homepage. */
export const Route = createFileRoute("/index/$")({
  beforeLoad: ({ params }) => {
    if (params._splat === "index.html") {
      throw redirect({ to: "/", statusCode: 301 });
    }
    throw notFound();
  },
  component: () => null,
});
