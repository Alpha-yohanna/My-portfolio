import { motion } from "framer-motion";
import { fadeUp, staggerChildren } from "../../lib/motion";

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

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="group mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-white/10"
        >
          <img
            src="/Hero.jpeg"
            alt="Alpha Yohanna"
            width={978}
            height={700}
            loading="lazy"
            decoding="async"
            className="h-full max-h-[480px] w-full object-cover object-center grayscale transition-all duration-700 group-hover:grayscale-0"
          />
        </motion.div>
      </div>
    </section>
  );
}

export default About;
