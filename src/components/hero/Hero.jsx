import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useIsCoarsePointer } from "../../hooks/useIsCoarsePointer";
import { useSectionScrollProgress } from "../../hooks/useSectionScrollProgress";
import { fadeUp, staggerChildren } from "../../lib/motion";
import { scrollToTarget } from "../../lib/lenisSingleton";

function scrollToId(id) {
  scrollToTarget(`#${id}`);
}

const RINGS = [
  { size: 320, opacity: 0.07 },
  { size: 460, opacity: 0.06 },
  { size: 600, opacity: 0.045 },
  { size: 740, opacity: 0.03 },
];

const CLUSTERS = [
  {
    id: "upper-left",
    wrap: "left-[6%] top-[16%]",
    cols: 4,
    rows: 4,
    duration: 9,
    delay: 0,
    depth: 22,
    emberDot: { index: 5, duration: 8, delay: 1.4 },
    embers: [
      { angle: 215, distance: 16, mid: 7, duration: 4.6, delay: 0.3 },
      { angle: 227, distance: 19, mid: 8, duration: 5, delay: 2.1 },
      { angle: 240, distance: 22, mid: 9, duration: 5.8, delay: 3.8, streak: true },
    ],
  },
  {
    id: "upper-center",
    wrap: "left-1/2 top-[11%] -translate-x-1/2",
    cols: 5,
    rows: 2,
    duration: 11,
    delay: 0.6,
    depth: 12,
    hideMobile: true,
    emberDot: { index: 6, duration: 9, delay: 3.2 },
    embers: [
      { angle: 265, distance: 15, mid: 6, duration: 4.4, delay: 0.8 },
      { angle: 275, distance: 17, mid: 7, duration: 5.1, delay: 2.6 },
      { angle: 285, distance: 19, mid: 8, duration: 5.9, delay: 4.5, streak: true },
    ],
  },
  {
    id: "upper-right",
    wrap: "right-[6%] top-[16%]",
    cols: 4,
    rows: 4,
    duration: 10,
    delay: 1.1,
    depth: 22,
    emberDot: { index: 10, duration: 7.5, delay: 5 },
    embers: [
      { angle: 305, distance: 18, mid: 8, duration: 4.5, delay: 1.6, streak: true },
      { angle: 315, distance: 20, mid: 9, duration: 5.2, delay: 3.3 },
      { angle: 325, distance: 14, mid: 6, duration: 4, delay: 0.2 },
    ],
  },
  {
    id: "middle-left",
    wrap: "left-[3%] top-[48%] -translate-y-1/2",
    cols: 3,
    rows: 5,
    duration: 12.5,
    delay: 0.3,
    depth: 30,
    hideMobile: true,
    emberDot: { index: 7, duration: 8.5, delay: 0.5 },
    embers: [
      { angle: 170, distance: 17, mid: 7, duration: 5.4, delay: 0.6 },
      { angle: 183, distance: 19, mid: 8, duration: 4.9, delay: 2.4 },
      { angle: 195, distance: 24, mid: 10, duration: 6.2, delay: 4.2, streak: true },
    ],
  },
  {
    id: "middle-right",
    wrap: "right-[3%] top-[48%] -translate-y-1/2",
    cols: 3,
    rows: 5,
    duration: 8.5,
    delay: 0.9,
    depth: 30,
    hideMobile: true,
    emberDot: { index: 7, duration: 9.5, delay: 2.9 },
    embers: [
      { angle: 350, distance: 16, mid: 7, duration: 5, delay: 1.9, streak: true },
      { angle: 2, distance: 18, mid: 8, duration: 4.5, delay: 3.7 },
      { angle: 15, distance: 20, mid: 9, duration: 5.6, delay: 0.4 },
    ],
  },
  {
    id: "lower-left",
    wrap: "left-[10%] bottom-[12%]",
    cols: 4,
    rows: 3,
    duration: 10.5,
    delay: 1.4,
    depth: 18,
    emberDot: { index: 5, duration: 7, delay: 4 },
    embers: [
      { angle: 120, distance: 15, mid: 6, duration: 4.3, delay: 0.9 },
      { angle: 133, distance: 18, mid: 8, duration: 4.9, delay: 2.7 },
      { angle: 145, distance: 21, mid: 9, duration: 5.7, delay: 4.5, streak: true },
    ],
  },
  {
    id: "lower-right",
    wrap: "right-[10%] bottom-[12%]",
    cols: 4,
    rows: 3,
    duration: 9.5,
    delay: 0.2,
    depth: 18,
    emberDot: { index: 6, duration: 8, delay: 1.5 },
    embers: [
      { angle: 45, distance: 22, mid: 10, duration: 5.5, delay: 2.2, streak: true },
      { angle: 55, distance: 19, mid: 8, duration: 4.6, delay: 4 },
      { angle: 65, distance: 14, mid: 6, duration: 3.9, delay: 0.3 },
    ],
  },
];

function EmberParticle({ angle, distance, mid, duration, delay, streak }) {
  return (
    <span
      className="hero-ember-spin absolute left-1/2 top-1/2"
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <span
        className={`hero-ember-particle ${streak ? "hero-ember-particle--streak" : ""}`}
        style={{
          "--ember-mid": `${mid}px`,
          "--ember-distance": `${distance}px`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />
    </span>
  );
}

function ParticleCluster({ cluster, parallaxRef }) {
  const { wrap, cols, rows, duration, delay, depth, hideMobile, emberDot, embers } = cluster;

  return (
    <div
      className={`absolute ${wrap} ${hideMobile ? "hidden sm:block" : ""}`}
      aria-hidden="true"
    >
      <div ref={parallaxRef} data-depth={depth} className="hero-parallax">
        <div className="relative">
          <div
            className="hero-breathe grid gap-[9px]"
            style={{
              gridTemplateColumns: `repeat(${cols}, 3px)`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            }}
          >
            {Array.from({ length: cols * rows }).map((_, index) => {
              const isEmberDot = emberDot?.index === index;
              return (
                <span
                  key={index}
                  className={`block h-[3px] w-[3px] rounded-full bg-white/60 ${
                    isEmberDot ? "hero-ember-dot" : ""
                  }`}
                  style={
                    isEmberDot
                      ? {
                          animationDuration: `${emberDot.duration}s`,
                          animationDelay: `${emberDot.delay}s`,
                        }
                      : undefined
                  }
                />
              );
            })}
          </div>

          {embers?.map((ember, index) => (
            <EmberParticle key={index} {...ember} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const sectionRef = useRef(null);
  const parallaxRefs = useRef([]);
  const frameRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const isCoarsePointer = useIsCoarsePointer();
  const scrollProgress = useSectionScrollProgress(sectionRef);

  parallaxRefs.current = [];
  const registerParallaxRef = (node) => {
    if (node) parallaxRefs.current.push(node);
  };

  useEffect(() => {
    if (reducedMotion || isCoarsePointer) return undefined;
    const section = sectionRef.current;
    if (!section) return undefined;

    const handleMouseMove = (event) => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - 0.5;
        const ny = (event.clientY - rect.top) / rect.height - 0.5;

        parallaxRefs.current.forEach((node) => {
          const depth = Number(node.dataset.depth || 0);
          node.style.transform = `translate3d(${nx * depth}px, ${ny * depth}px, 0)`;
        });

        frameRef.current = null;
      });
    };

    const handleMouseLeave = () => {
      parallaxRefs.current.forEach((node) => {
        node.style.transform = "translate3d(0, 0, 0)";
      });
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [reducedMotion, isCoarsePointer]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black px-5 pt-28"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-32 h-80 w-80 rounded-full bg-obsidian-50 opacity-60 blur-3xl sm:h-[26rem] sm:w-[26rem]" />
        <div className="absolute -bottom-40 -right-32 h-80 w-80 rounded-full bg-obsidian-50 opacity-60 blur-3xl sm:h-[26rem] sm:w-[26rem]" />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {RINGS.map((ring) => (
            <div
              key={ring.size}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
              style={{
                width: `min(${ring.size}px, 92vw)`,
                height: `min(${ring.size}px, 92vw)`,
                borderColor: `rgba(255,255,255,${ring.opacity})`,
              }}
            />
          ))}
        </div>

        {CLUSTERS.map((cluster) => (
          <ParticleCluster key={cluster.id} cluster={cluster} parallaxRef={registerParallaxRef} />
        ))}

        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgba(255,255,255,0.08),transparent_70%)]" />
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
          className="font-display text-display-md text-ink"
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
