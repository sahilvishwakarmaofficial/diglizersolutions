import { useEffect, useId, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

/**
 * THE IMPACT ENGINE
 *
 * A purposeful transformation sequence: raw potential becomes noticeable
 * impact through strategy, creative, technology and growth. One liquid
 * material transforms across six states — never an empty decorative frame.
 *
 * Desktop: horizontal sequence, stage selectable + scroll driven.
 * Mobile: vertical story with the same real HTML content.
 */

type Stage = {
  id: string;
  label: string;
  copy: string;
  step: string;
  /** Morph parameters for the shared liquid material. */
  d: string;
  hue: number;
};

const stages: Stage[] = [
  {
    id: "raw",
    step: "IN",
    label: "Raw potential",
    copy: "An ambition waiting for direction.",
    d: "M96 30c40 6 62 26 66 62 4 38-16 66-58 74-44 8-76-14-82-52-6-40 26-90 74-84z",
    hue: -20,
  },
  {
    id: "strategy",
    step: "01",
    label: "Strategy",
    copy: "Positioning, planning and a clear path forward.",
    d: "M100 26c42 0 74 32 74 74s-32 74-74 74-74-32-74-74 32-74 74-74z",
    hue: 0,
  },
  {
    id: "creative",
    step: "02",
    label: "Creative",
    copy: "Identity, communication and memorable expression.",
    d: "M100 22c46 8 78 34 78 78 0 46-36 78-82 78-42 0-70-34-70-78 0-46 30-86 74-78z",
    hue: 20,
  },
  {
    id: "technology",
    step: "03",
    label: "Technology",
    copy: "Responsive experiences and usable digital systems.",
    d: "M40 34h120c10 0 14 6 14 14v104c0 8-4 14-14 14H40c-10 0-14-6-14-14V48c0-8 4-14 14-14z",
    hue: 40,
  },
  {
    id: "growth",
    step: "04",
    label: "Growth",
    copy: "Attention transformed into enquiry, action and momentum.",
    d: "M30 150c26-70 50-104 76-118 30-16 58-4 68 24 10 30-8 56-42 66-34 10-70 18-102 28z",
    hue: 60,
  },
  {
    id: "impact",
    step: "OUT",
    label: "Noticeable impact",
    copy: "A brand the market recognises, remembers and chooses.",
    d: "M46 30h56c44 0 74 32 74 70s-30 70-74 70H46c-12 0-18-6-18-18V48c0-12 6-18 18-18z",
    hue: 80,
  },
];

function LiquidStage({ stage }: { stage: Stage }) {
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8a57d8" />
          <stop offset="55%" stopColor="#d46cff" />
          <stop offset="100%" stopColor="#fb2261" />
        </linearGradient>
        <filter id={`${uid}-b`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
      <g style={{ filter: `hue-rotate(${stage.hue}deg)` }}>
        <path d={stage.d} fill={`url(#${uid}-g)`} opacity="0.5" filter={`url(#${uid}-b)`} />
        <path
          d={stage.d}
          fill={`url(#${uid}-g)`}
          style={{ transition: "d 900ms cubic-bezier(0.16,1,0.3,1)" }}
        />
        <path
          d={stage.d}
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.2"
          style={{ transition: "d 900ms cubic-bezier(0.16,1,0.3,1)" }}
        />
      </g>
    </svg>
  );
}

export function ImpactEngine() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const locked = useRef(false);

  /* Scroll progression through the section drives the stage — no hijacking. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      if (locked.current) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(Math.max(-rect.top / total, 0), 0.999);
      setActive(Math.floor(progress * stages.length));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const current = (stages[active] ?? stages[0]) as Stage;

  const select = (index: number) => {
    locked.current = true;
    setActive(index);
    window.setTimeout(() => {
      locked.current = false;
    }, 1200);
  };

  return (
    <section className="section-y" aria-labelledby="impact-engine-title">
      <div className="container-wide">
        <div ref={ref} className="frame-editorial relative overflow-hidden p-6 md:p-12 lg:p-16">
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#7651ff]/20 blur-3xl" />

          <p className="eyebrow text-gradient">The Impact Engine</p>
          <h2 id="impact-engine-title" className="display-2 mt-4 max-w-2xl">
            How visibility becomes growth.
          </h2>
          <p className="lede mt-5 max-w-2xl text-secondary-foreground">
            An ambitious brand becomes more valuable when strategy, creative, technology and
            marketing work as one connected system.
          </p>

          {/* Shared liquid stage + selectable sequence */}
          <div className="relative mt-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="relative mx-auto aspect-square w-full max-w-[22rem]">
              <LiquidStage stage={current} />
              <div className="absolute inset-x-0 -bottom-2 text-center">
                <span className="eyebrow text-muted-foreground">{current.step}</span>
              </div>
            </div>

            <ol className="grid gap-3 sm:grid-cols-2">
              {stages.map((stage, index) => {
                const isActive = index === active;
                const isPast = index < active;
                return (
                  <li key={stage.id}>
                    <button
                      type="button"
                      onClick={() => select(index)}
                      aria-current={isActive ? "step" : undefined}
                      className={[
                        "w-full rounded-2xl border p-5 text-left transition-all duration-500",
                        isActive
                          ? "border-white/60 bg-white/[0.07] shadow-[0_0_60px_-25px_rgba(180,156,255,0.9)]"
                          : isPast
                            ? "border-white/20 bg-white/[0.03]"
                            : "border-white/10",
                      ].join(" ")}
                    >
                      <span className="eyebrow text-gradient">{stage.step}</span>
                      <span className="mt-2 block font-display text-lg font-bold">
                        {stage.label}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">
                        {stage.copy}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="mt-12">
            <Link to="/capabilities" className="capsule">
              See how we apply this system
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
