import { motion } from "framer-motion";
import { engineeringStack } from "../../data/engineeringStack";
import { fadeUp, staggerChildren } from "../../lib/motion";

function EngineeringStack() {
  return (
    <section id="stack" className="border-t border-white/5 py-28 md:py-36">
      <div className="mb-14 md:mb-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-soft">
          Engineering Stack
        </p>
        <h2 className="mt-4 font-display text-display-md text-ink">
          What I actually build with.
        </h2>
      </div>

      <motion.div
        variants={staggerChildren(0.06)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {engineeringStack.map((item) => (
          <motion.div
            key={item.name}
            variants={fadeUp}
            className="group bg-obsidian p-7 transition-colors duration-300 hover:bg-obsidian-100"
          >
            <span className="font-mono text-[10px] uppercase tracking-wide text-ink-dim">
              {item.category}
            </span>
            <h3 className="mt-3 font-display text-lg text-ink">{item.name}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-dim">{item.use}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default EngineeringStack;
