import { lazy, Suspense, useRef } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useIsCoarsePointer } from "../../hooks/useIsCoarsePointer";
import { useSectionScrollProgress } from "../../hooks/useSectionScrollProgress";
import { fadeUp, staggerChildren } from "../../lib/motion";
import { scrollToTarget } from "../../lib/lenisSingleton";

const HeroScene = lazy(() => import("../three/HeroScene"));

function scrollToId(id) {
  scrollToTarget(`#${id}`);
}

function Hero() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const isCoarsePointer = useIsCoarsePointer();
  const scrollProgress = useSectionScrollProgress(sectionRef);

  // scrollProgress reaches 1 once the hero has fully scrolled out of view —
  // reuse it to stop the WebGL render loop instead of running it for the
  // entire session while the canvas sits invisible far below the fold.
  const heroInView = scrollProgress < 1;
  const show3D = !reducedMotion && !isCoarsePointer && heroInView;

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {show3D ? (
          <Suspense fallback={null}>
            <HeroScene
              scrollProgress={scrollProgress}
              enablePointer={!isCoarsePointer}
            />
          </Suspense>
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_50%_35%,rgba(91,91,240,0.18),transparent_60%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-obsidian" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_48%,rgba(8,8,10,0.6),transparent_72%)]" />
      </div>

      <motion.div
        variants={staggerChildren(0.12)}
        initial="hidden"
        animate="visible"
        style={
          reducedMotion
            ? undefined
            : {
                opacity: 1 - scrollProgress * 1.4,
                transform: `translateY(${scrollProgress * 40}px)`,
              }
        }
        className="w-full max-w-4xl text-center"
      >
        <motion.h1
          variants={fadeUp}
          className="font-display text-display-xl text-ink"
        >
          ALPHA
          <br />
          YOHANNA
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-accent-soft sm:text-sm"
        >
          Software Engineer · Product Builder · AI Explorer
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-xl text-base leading-8 text-ink-dim sm:text-lg"
        >
          Building digital products, intelligent systems, and experiences
          that turn ideas into reality.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button variant="primary" onClick={() => scrollToId("work")}>
            Explore Work
          </Button>
          <Button variant="secondary" onClick={() => scrollToId("contact")}>
            Let's Talk
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
