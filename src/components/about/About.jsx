import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerChildren } from "../../lib/motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const PROFILE_IMAGES = [
  "/Alpha1.jpeg",
  "/Alpha2.jpeg",
  "/Alpha3.jpeg",
  "/Alpha4.jpeg",
  "/Alpha5.jpeg",
  "/Alpha6.jpeg",
  "/Alpha7.jpeg",
  "/Hero.jpeg",
];

function ProfileImageCarousel() {
  const [activeImage, setActiveImage] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    PROFILE_IMAGES.forEach((src) => {
      const image = new Image();
      image.src = src;
    });

    const interval = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % PROFILE_IMAGES.length);
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative mx-auto aspect-[978/700] w-full max-w-sm overflow-hidden rounded-3xl border border-white/10"
    >
      {PROFILE_IMAGES.map((src, index) => {
        const isActive = index === activeImage;

        return (
          <img
            key={src}
            src={src}
            alt={isActive ? "Alpha Yohanna" : ""}
            aria-hidden={!isActive}
            width={index === 7 ? 978 : index === 0 ? 1080 : 809}
            height={index === 7 ? 700 : 1080}
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover grayscale transition-all group-hover:grayscale-0 ${
              reducedMotion ? "duration-0" : "duration-700"
            }`}
            style={{
              opacity: isActive ? 1 : 0,
              objectPosition: index === 7 ? "center" : "center 30%",
            }}
          />
        );
      })}
    </motion.div>
  );
}

function About() {
  return (
    <section id="about" className="py-28 md:py-36">
      <div className="grid items-center gap-16 md:grid-cols-[1.1fr_0.9fr] md:gap-20">
        <motion.div
          variants={staggerChildren(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.3em] text-accent-soft"
          >
            About
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-6 font-display text-display-md text-ink"
          >
            Software Engineer.
            <br />
            Product Builder.
            <br />
            Creative Technologist.
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="mt-8 max-w-xl space-y-5 text-base leading-8 text-ink-dim sm:text-lg"
          >
            <p>
              I build software people actually use — from responsive web
              platforms to mobile products and the backend systems that hold
              them together. My work sits where clean engineering meets
              considered design.
            </p>
            <p>
              I start by understanding the problem before writing a line of
              code, then build in stages — architecture, interface,
              iteration — so what ships is both reliable and deliberate.
            </p>
            <p>
              Lately I'm drawn to products that pair practical utility with
              intelligent systems: tools that quietly make people's work
              easier, with automation and AI used only where they earn their
              place.
            </p>
          </motion.div>
        </motion.div>

        <ProfileImageCarousel />
      </div>
    </section>
  );
}

export default About;
