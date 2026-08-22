import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const STEPS = [
  "INITIALIZING EXPERIENCE",
  "LOADING PROJECTS",
  "ENTERING PORTFOLIO",
];

function LoadingScreen({ onComplete }) {
  const reducedMotion = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      const timer = window.setTimeout(() => setLeaving(true), 250);
      return () => window.clearTimeout(timer);
    }

    const stepDuration = 420;
    const interval = window.setInterval(() => {
      setStepIndex((current) => {
        if (current >= STEPS.length - 1) {
          window.clearInterval(interval);
          window.setTimeout(() => setLeaving(true), stepDuration);
          return current;
        }
        return current + 1;
      });
    }, stepDuration);

    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!leaving && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian"
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
            ALPHA YOHANNA
          </p>

          {!reducedMotion && (
            <div className="mt-8 h-5">
              <AnimatePresence mode="wait">
                <motion.p
                  key={stepIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="font-mono text-xs uppercase tracking-[0.3em] text-ink-dim"
                >
                  {STEPS[stepIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          )}

          <div aria-hidden="true" className="mt-10 h-px w-40 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: reducedMotion ? 0.2 : STEPS.length * 0.42,
                ease: "linear",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
