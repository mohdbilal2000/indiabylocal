"use client";

import { LazyMotion, MotionConfig } from "motion/react";

const basic = () => import("@/lib/motion-basic").then((m) => m.default);
const withDrag = () => import("@/lib/motion-features").then((m) => m.default);

/**
 * Loads the animation engine in its own file, only where it is used, and only
 * after the page is usable. `drag` selects the larger build that includes
 * dragging (the booking sheet); everything else gets the small one.
 * Animations switch off for anyone whose device asks for reduced motion.
 */
export function Motion({ children, drag = false }: { children: React.ReactNode; drag?: boolean }) {
  return (
    <LazyMotion features={drag ? withDrag : basic} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
