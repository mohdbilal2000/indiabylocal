"use client";

import { LazyMotion, MotionConfig } from "motion/react";

const load = () => import("@/lib/motion-features").then((m) => m.default);

/**
 * Loads the animation engine in its own file, after the page is usable, and
 * only on pages that render this wrapper. Animations switch off for anyone
 * whose device asks for reduced motion.
 */
export function Motion({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={load} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
