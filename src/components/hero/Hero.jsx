import { useRef } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useSectionScrollProgress } from "../../hooks/useSectionScrollProgress";
import { fadeUp, staggerChildren } from "../../lib/motion";
import { scrollToTarget } from "../../lib/lenisSingleton";

function scrollToId(id) {
  scrollToTarget(`#${id}`);
}

function DotGrid({ className }) {
  return (
    <div className={`grid grid-cols-3 gap-1.5 ${className}`} aria-hidden="true">
      {Array.from({ length: 9 }).map((_, index) => (
        <span key={index} className="h-1 w-1 rounded-full bg-white/15" />
      ))}
    </div>
  );
}

function Hero() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const scrollProgress = useSectionScrollProgress(sectionRef);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-32 h-80 w-80 rounded-full bg-obsidian-100 blur-3xl sm:h-[26rem] sm:w-[26rem]" />
        <div className="absolute -bottom-40 -right-32 h-80 w-80 rounded-full bg-obsidian-100 blur-3xl sm:h-[26rem] sm:w-[26rem]" />

        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:block">
          <div className="h-[26rem] w-[26rem] rounded-full border border-white/[0.06]" />
          <div className="absolute inset-8 rounded-full border border-white/[0.05]" />
          <div className="absolute inset-16 rounded-full border border-white/[0.04]" />
        </div>

        <DotGrid className="absolute left-[12%] top-[28%] hidden sm:grid" />
        <DotGrid className="absolute right-[12%] top-[28%] hidden sm:grid" />
        <DotGrid className="absolute bottom-[24%] left-[16%] hidden sm:grid" />
        <DotGrid className="absolute bottom-[24%] right-[16%] hidden sm:grid" />

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/[0.04] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-obsidian" />
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
        className="relative w-full max-w-3xl text-center"
      >
        <motion.h1
          variants={fadeUp}
          className="font-sans text-3xl font-extrabold uppercase leading-tight tracking-tight text-ink sm:text-5xl md:text-6xl"
        >
          Software Engineer.
          <br />
          Product Builder. AI Explorer.
        </motion.h1>

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
            Explore My Work ↗
          </Button>
          <button
            type="button"
            onClick={() => scrollToId("contact")}
            className="font-mono text-sm uppercase tracking-[0.15em] text-ink-dim underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            Let's Talk
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
