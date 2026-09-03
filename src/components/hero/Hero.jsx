import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import HeroVisualB, { HeroVisualBMobile } from "./HeroVisualB";
import EditorialContentBlock from "./EditorialContentBlock";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useIsCoarsePointer } from "../../hooks/useIsCoarsePointer";
import { useSectionScrollProgress } from "../../hooks/useSectionScrollProgress";
import { useHeroCycle } from "../../hooks/useHeroCycle";
import { scrollToTarget } from "../../lib/lenisSingleton";

const HERO_STATE_KEYS = ["black", "green", "cream", "navy"];

const ACCENT_YELLOW = "#f4c430";
const ACCENT_DARK = "#12160c";
const CREAM_INK = "#14203a";
const CREAM_ACCENT = "#c2410c";
const NAVY_ACCENT = "#2f6fed";

function scrollToId(id) {
  scrollToTarget(`#${id}`);
}

const RINGS = [
  { size: 320, opacity: 0.07 },
  { size: 460, opacity: 0.06 },
  { size: 600, opacity: 0.045 },
  { size: 740, opacity: 0.03 },
];

const RING_THEMES = [
  { key: "black", rgb: "255,255,255" },
  { key: "green", rgb: "228,185,74" },
  { key: "cream", rgb: "194,65,12" },
  { key: "navy", rgb: "47,111,237" },
];

const BLUR_THEMES = [
  { key: "black", color: "#1a1a1f", strength: 0.6 },
  { key: "green", color: "#3f5a22", strength: 0.6 },
  { key: "cream", color: "#c2410c", strength: 0.3 },
  { key: "navy", color: "#2f6fed", strength: 0.45 },
];

const WASH_THEMES = [
  {
    key: "green",
    background:
      "linear-gradient(90deg, rgba(244,243,238,0.025) 1px, transparent 1px), linear-gradient(0deg, rgba(244,243,238,0.025) 1px, transparent 1px), radial-gradient(ellipse 70% 60% at 78% 45%, rgba(156,184,75,0.16), transparent 60%), linear-gradient(160deg, #0b0f08 0%, #16210d 35%, #253817 65%, #34491f 100%)",
    backgroundSize: "64px 64px, 64px 64px, auto, auto",
  },
  {
    key: "cream",
    background:
      "radial-gradient(ellipse 65% 60% at 50% 45%, rgba(255,255,255,0) 45%, rgba(194,65,12,0.18) 100%), linear-gradient(180deg, #f6ecd9 0%, #f1e2c9 100%)",
  },
  {
    key: "navy",
    background:
      "radial-gradient(ellipse 70% 60% at 25% 40%, rgba(47,111,237,0.16), transparent 60%), linear-gradient(160deg, #050a1a 0%, #0a1128 40%, #0d1730 70%, #101d3d 100%)",
  },
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

function Hero({ heroReady = true }) {
  const sectionRef = useRef(null);
  const parallaxRefs = useRef([]);
  const frameRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const isCoarsePointer = useIsCoarsePointer();
  const scrollProgress = useSectionScrollProgress(sectionRef);
  const [heroInView, setHeroInView] = useState(true);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const dominant = useHeroCycle(sectionRef, {
    active: heroReady && heroInView,
    reducedMotion,
    states: HERO_STATE_KEYS,
  });

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

  const blurA = reducedMotion ? undefined : "blur(calc((1 - var(--w-black)) * 4px))";
  const blurG = reducedMotion ? undefined : "blur(calc((1 - var(--w-green)) * 4px))";

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-black px-5 pt-28 sm:px-8 lg:px-16 xl:px-24"
      style={{ "--w-black": 1, "--w-green": 0, "--w-cream": 0, "--w-navy": 0 }}
    >
      {/* Green / Cream / Navy backgrounds — crossfade in over the permanent black base */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        {WASH_THEMES.map((theme) => (
          <div
            key={theme.key}
            className="absolute inset-0"
            style={{
              opacity: `var(--w-${theme.key})`,
              backgroundImage: theme.background,
              backgroundSize: theme.backgroundSize,
            }}
          />
        ))}
      </div>

      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {["-left-40 -top-32", "-bottom-40 -right-32"].map((pos) =>
          BLUR_THEMES.map((theme) => (
            <div
              key={`${pos}-${theme.key}`}
              className={`absolute ${pos} h-80 w-80 rounded-full blur-3xl sm:h-[26rem] sm:w-[26rem]`}
              style={{ backgroundColor: theme.color, opacity: `calc(${theme.strength} * var(--w-${theme.key}))` }}
            />
          )),
        )}

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {RING_THEMES.map((theme) =>
            RINGS.map((ring) => (
              <div
                key={`${theme.key}-${ring.size}`}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                style={{
                  width: `min(${ring.size}px, 92vw)`,
                  height: `min(${ring.size}px, 92vw)`,
                  borderColor: `rgba(${theme.rgb},${ring.opacity})`,
                  opacity: `var(--w-${theme.key})`,
                }}
              />
            )),
          )}
        </div>

        <div style={{ opacity: "var(--w-black)" }}>
          {CLUSTERS.map((cluster) => (
            <ParticleCluster key={cluster.id} cluster={cluster} parallaxRef={registerParallaxRef} />
          ))}

          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgba(255,255,255,0.08),transparent_70%)]" />
        </div>
      </div>

      <HeroVisualB
        mountReady={heroReady}
        reducedMotion={reducedMotion}
        isCoarsePointer={isCoarsePointer}
        heroInView={heroInView}
        registerParallaxRef={registerParallaxRef}
      />

      <div
        style={
          reducedMotion
            ? undefined
            : {
                opacity: 1 - scrollProgress * 1.4,
                transform: `translateY(${scrollProgress * 40}px)`,
              }
        }
        className="relative z-0 w-full"
      >
        <div className="relative grid w-full">
          {/* Black — original, centered editorial serif */}
          <div
            className="[grid-area:1/1] mx-auto w-full max-w-3xl text-center"
            style={{
              opacity: "var(--w-black)",
              transform: "translateY(calc((1 - var(--w-black)) * -14px))",
              filter: blurA,
            }}
            inert={dominant !== "black"}
          >
            <h1 className="font-display text-display-md text-ink">
              Software Engineer.
              <br />
              Product Builder. AI Explorer.
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-ink-dim sm:text-lg">
              Building digital products, intelligent systems, and experiences
              that turn ideas into reality.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
            </div>
          </div>

          {/* Green — left-aligned, bold editorial */}
          <div
            className="[grid-area:1/1] w-full max-w-xl text-left"
            style={{
              opacity: "var(--w-green)",
              transform: "translateY(calc((1 - var(--w-green)) * 14px))",
              filter: blurG,
            }}
            inert={dominant !== "green"}
          >
            <h1 className="font-sans text-[clamp(2.5rem,5.8vw,4.75rem)] font-black uppercase leading-[0.95] tracking-tight text-ink">
              Software Engineer.
              <br />
              Product Builder.
              <br />
              <span style={{ color: ACCENT_DARK }}>AI</span>{" "}
              <span style={{ color: ACCENT_YELLOW }}>Explorer.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-ink/80 sm:text-lg">
              Building digital products, intelligent systems, and experiences
              that turn ideas into reality.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button variant="primary" onClick={() => scrollToId("work")}>
                Explore My Work →
              </Button>
              <button
                type="button"
                onClick={() => scrollToId("contact")}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-[#9cb84b]/10 px-6 py-3.5 font-mono text-sm uppercase tracking-[0.15em] text-ink transition-colors hover:border-white/40"
              >
                Let's Talk →
              </button>
            </div>

            <HeroVisualBMobile
              mountReady={heroReady}
              reducedMotion={reducedMotion}
              heroInView={heroInView}
            />
          </div>

          {/* Cream — warm editorial, deep-navy serif with rust accent */}
          <EditorialContentBlock
            stateKey="cream"
            dominant={dominant}
            reducedMotion={reducedMotion}
            textColor={CREAM_INK}
            dimTextColor={`${CREAM_INK}99`}
            accentColor={CREAM_ACCENT}
          />

          {/* Navy — technical editorial, white serif with electric-blue accent */}
          <EditorialContentBlock
            stateKey="navy"
            dominant={dominant}
            reducedMotion={reducedMotion}
            textColor="#f4f3ee"
            dimTextColor="rgba(244,243,238,0.75)"
            accentColor={NAVY_ACCENT}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
