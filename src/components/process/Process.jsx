import { motion } from "framer-motion";
import { processStages } from "../../data/processStages";
import { fadeUp, staggerChildren } from "../../lib/motion";

function Process() {
  return (
    <section className="border-t border-white/5 py-28 md:py-36">
      <div className="mb-14 md:mb-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-soft">
          How I Build
        </p>
        <h2 className="mt-4 font-display text-display-md text-ink">
          From idea to product.
        </h2>
      </div>

      <motion.div
        variants={staggerChildren(0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="relative border-l border-white/10 pl-8 sm:pl-10"
      >
        {processStages.map((stage) => (
          <motion.div key={stage.number} variants={fadeUp} className="relative pb-10 last:pb-0">
            <span className="absolute -left-[calc(2rem+5px)] top-1 h-2.5 w-2.5 rounded-full bg-accent-soft sm:-left-[calc(2.5rem+5px)]" />
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="font-mono text-xs text-ink-dim">{stage.number}</span>
              <h3 className="font-display text-xl text-ink">{stage.title}</h3>
            </div>
            <p className="mt-2 max-w-lg text-sm leading-6 text-ink-dim">
              {stage.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Process;
