import { useReducedMotion } from "framer-motion";

export function useMotionConfig() {
  const reduced = useReducedMotion();

  return {
    reduced,
    fadeUp: reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.5 },
        },
    fadeIn: reduced
      ? {}
      : {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true },
          transition: { duration: 0.4 },
        },
  };
}
