import { createFileRoute, redirect } from "@tanstack/react-router";

/** The Work section was retired — the Gallery is the single portfolio destination. */
export const Route = createFileRoute("/work")({
  beforeLoad: () => {
    throw redirect({ to: "/gallery", statusCode: 301 });
  },
  component: () => null,
});
