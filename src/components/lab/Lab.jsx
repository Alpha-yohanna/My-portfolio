import { motion } from "framer-motion";
import { labNotes } from "../../data/labNotes";
import { fadeUp, staggerChildren } from "../../lib/motion";
import { scrollToTarget } from "../../lib/lenisSingleton";

function Lab() {
  return (
    <section id="lab" className="border-t border-white/5 py-28 md:py-36">
      <div className="mb-14 md:mb-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-soft">
          The Lab
        </p>
        <h2 className="mt-4 font-display text-display-md text-ink">
          Still exploring what comes next.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-8 text-ink-dim">
          A running log of the experiments behind this very site — not
          finished products, just things I'm actively testing.
        </p>
      </div>

      <motion.div
        variants={staggerChildren(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="space-y-px overflow-hidden rounded-2xl border border-dashed border-white/15"
      >
        {labNotes.map((entry) => (
          <motion.button
            key={entry.id}
            type="button"
            variants={fadeUp}
            onClick={() => scrollToTarget(`#${entry.anchor}`)}
            className="group flex w-full flex-col gap-2 border-b border-dashed border-white/10 bg-obsidian-100/40 p-6 text-left transition-colors last:border-b-0 hover:bg-obsidian-100 sm:flex-row sm:items-baseline sm:gap-6 sm:p-8"
          >
            <span className="font-mono text-xs text-ink-dim">
              {entry.index}
            </span>

            <div className="flex-1">
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="font-display text-xl text-ink">
                  {entry.title}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-wide text-accent-soft">
                  {entry.tag}
                </span>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-dim">
                {entry.note}
              </p>
            </div>

            <span
              aria-hidden
              className="font-mono text-xs text-ink-dim opacity-0 transition-opacity group-hover:opacity-100"
            >
              jump to section →
            </span>
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
}

export default Lab;
