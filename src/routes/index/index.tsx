import { createFileRoute, redirect } from "@tanstack/react-router";

/** The old site's /index page permanently redirects to the homepage. */
export const Route = createFileRoute("/index/")({
  beforeLoad: () => {
    throw redirect({ to: "/", statusCode: 301 });
  },
  component: () => null,
});
