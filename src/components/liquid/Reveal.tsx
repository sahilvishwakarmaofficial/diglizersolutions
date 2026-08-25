import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Scroll-reveal primitive for the Liquid Intelligence system.
 *
 * Purely CSS/transform based — no layout thrash, no library. Content is always
 * present in the DOM and crawlable; only opacity/transform are animated, and
 * both are skipped entirely under `prefers-reduced-motion`.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  variant = "up",
  className = "",
}: {
  children: ReactNode;
  as?: ElementType;
  /** ms */
  delay?: number;
  variant?: "up" | "fade" | "left" | "right" | "scale";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      data-shown={shown ? "true" : "false"}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}

/**
 * Tracks whether an element is inside the viewport, used to drive progressive
 * liquid states (e.g. fragments reconnecting as the reader scrolls).
 */
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}
