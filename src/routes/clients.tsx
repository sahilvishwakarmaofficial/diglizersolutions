import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * The client directory now lives inside /work so there is a single evidence
 * destination. This route is a permanent redirect to that section.
 */
export const Route = createFileRoute("/clients")({
  beforeLoad: () => {
    throw redirect({ to: "/work", hash: "client-experience", statusCode: 301 });
  },
  component: () => null,
});
