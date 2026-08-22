import { motion } from "framer-motion";
import { capabilities } from "../../data/capabilities";
import { fadeUp } from "../../lib/motion";

function Capabilities() {
  return (
    <section className="border-t border-white/5 py-28 md:py-36">
      <div className="mb-14 md:mb-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-soft">
          What I Build
        </p>
        <h2 className="mt-4 font-display text-display-md text-ink">
          Capabilities
        </h2>
      </div>

      <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability, index) => (
          <motion.div
            key={capability.number}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (index % 3) * 0.08 }}
            className="bg-obsidian p-8 transition-colors duration-300 hover:bg-obsidian-100"
          >
            <span className="font-mono text-xs text-ink-dim">
              {capability.number}
            </span>
            <h3 className="mt-4 font-display text-xl text-ink">
              {capability.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-ink-dim">
              {capability.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {capability.tech.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-dim"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Capabilities;
