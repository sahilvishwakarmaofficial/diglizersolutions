import { createFileRoute, Link } from "@tanstack/react-router";

import { LiquidBrandObject } from "@/components/liquid/LiquidBrandObject";
import { InlineWhatsAppButton } from "@/components/WhatsAppButton";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/thank-you")({
  head: () =>
    seo({
      title: "Thank You | Diglizer Solution",
      description: "Your message has reached Diglizer Solution. We will be in touch shortly.",
      path: "/thank-you",
      noindex: true,
    }),
  component: ThankYou,
});

function ThankYou() {
  return (
    <section className="relative isolate section-y overflow-hidden bg-ink text-ink-foreground">
      <LiquidBrandObject
        state="contact"
        className="absolute -right-[18%] top-1/2 hidden h-[32rem] w-[32rem] -translate-y-1/2 opacity-60 md:block"
      />
      <div className="container-wide relative max-w-3xl">
        <p className="eyebrow text-gradient">Received</p>
        <h1 className="display-1 mt-5">Thank you — your message is with us.</h1>
        <p className="lede mt-6 text-ink-muted">
          We read every enquiry personally. Expect a considered reply, usually within one working
          day. Need a faster answer in the meantime?
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            to="/gallery"
            className="rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white"
          >
            Explore the gallery
          </Link>
          <Link
            to="/"
            className="rounded-full border border-ink-border px-6 py-3.5 text-sm font-semibold hover:bg-ink-elevated"
          >
            Back home
          </Link>
          <InlineWhatsAppButton />
        </div>
      </div>
    </section>
  );
}
