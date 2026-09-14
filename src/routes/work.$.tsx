import { createFileRoute, redirect } from "@tanstack/react-router";

/** Every retired case-study URL permanently redirects to the Gallery. */
export const Route = createFileRoute("/work/$")({
  beforeLoad: () => {
    throw redirect({ to: "/gallery", statusCode: 301 });
  },
  component: () => null,
});
