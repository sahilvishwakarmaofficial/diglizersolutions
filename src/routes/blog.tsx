import { createFileRoute, redirect } from "@tanstack/react-router";

/** The old site's /blog page permanently redirects to Insights. */
export const Route = createFileRoute("/blog")({
  beforeLoad: () => {
    throw redirect({ to: "/insights", statusCode: 301 });
  },
  component: () => null,
});
