import { Reveal, useInView } from "./Reveal";

/**
 * Stage 2 of the marketing journey — relevance.
 *
 * Four disconnected liquid fragments represent the four common failures below.
 * As the section enters the viewport they flow back into one connected form:
 * the visual argument for a joined-up brand and marketing system.
 */

const problems = [
  {
    title: "Unclear positioning",
    copy: "The business is capable, but the market cannot quickly tell what it stands for or who it is for.",
  },
  {
    title: "Inconsistent communication",
    copy: "Every touchpoint looks like a different company — social, print, website and campaigns drift apart.",
  },
  {
    title: "Weak digital experiences",
    copy: "Traffic arrives but the experience does not explain, reassure or convert the people it reaches.",
  },
  {
    title: "Marketing without connected direction",
    copy: "Individual posts, ads and designs run without a shared idea, so spend rarely compounds.",
  },
];

/** Disconnected → reconnected fragment positions (viewBox 0 0 600 600). */
const fragments: { apart: [number, number]; together: [number, number]; r: number }[] = [
  { apart: [110, 130], together: [258, 268], r: 78 },
  { apart: [490, 140], together: [352, 262], r: 66 },
  { apart: [120, 470], together: [268, 356], r: 62 },
  { apart: [480, 470], together: [348, 348], r: 72 },
];

function ReassemblingLiquid({ joined }: { joined: boolean }) {
  return (
    <svg viewBox="0 0 600 600" className="h-full w-full" role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id="mp-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#694699" />
          <stop offset="55%" stopColor="#D46CFF" />
          <stop offset="100%" stopColor="#FB2261" />
        </linearGradient>
        <filter id="mp-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="b" />
          <feColorMatrix
            in="b"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11"
          />
        </filter>
      </defs>
      <g filter="url(#mp-goo)" opacity={0.75}>
        {fragments.map((fragment, index) => {
          const [x, y] = joined ? fragment.together : fragment.apart;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r={fragment.r}
              fill="url(#mp-grad)"
              className="liquid-fragment"
              style={{ transitionDelay: `${index * 90}ms` }}
            />
          );
        })}
      </g>
    </svg>
  );
}

export function MarketingProblem() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="section-y">
      <div ref={ref} className="container-wide grid grid-cols-1 gap-14 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <div>
          <Reveal as="p" className="eyebrow text-primary">
            The problem
          </Reveal>
          <Reveal as="h2" delay={60} className="display-2 mt-4 max-w-2xl">
            Visibility alone is not enough.
          </Reveal>
          <Reveal as="p" delay={120} className="lede mt-6 max-w-2xl text-muted-foreground">
            Brands need a clear position, recognisable creative, effective digital experiences and
            marketing systems that turn attention into action.
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {problems.map((problem, index) => (
              <Reveal
                as="li"
                key={problem.title}
                delay={160 + index * 70}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="font-display text-base font-bold">{problem.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{problem.copy}</p>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          <ReassemblingLiquid joined={inView} />
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Four disconnected efforts, rebuilt into one connected growth system.
          </p>
        </div>
      </div>
    </section>
  );
}
