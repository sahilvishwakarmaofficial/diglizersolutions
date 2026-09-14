import { useEffect, useState } from "react";

/**
 * Reports whether the visitor has asked for reduced motion.
 * Returns `false` during SSR and the first client render so hydration stays
 * stable, then updates immediately after mount.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}
