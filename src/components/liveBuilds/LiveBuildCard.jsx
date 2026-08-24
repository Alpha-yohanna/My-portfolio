import { motion } from "framer-motion";
import BrowserFrame from "./BrowserFrame";
import Button from "../ui/Button";
import StatusTag from "../ui/StatusTag";
import { fadeUp, staggerChildren } from "../../lib/motion";

function LiveBuildCard({ project, reverse }) {
  return (
    <motion.div
      variants={staggerChildren(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`grid items-center gap-10 py-14 md:grid-cols-2 md:gap-14 md:py-20 ${
        reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <motion.div variants={fadeUp}>
        <BrowserFrame url={project.url} title={project.name} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="flex items-center gap-3">
          <StatusTag status="live" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim">
            {project.category}
          </span>
        </div>

        <h3 className="mt-5 font-display text-3xl text-ink sm:text-4xl">
          {project.name}
        </h3>

        <p className="mt-5 max-w-lg text-base leading-8 text-ink-dim">
          {project.description}
        </p>

        <ul className="mt-6 space-y-2">
          {project.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-sm text-ink-dim"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-soft" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-ink-dim"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-nowrap gap-3 sm:gap-4">
          <Button
            as="a"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="flex-1 whitespace-nowrap px-4 sm:flex-none sm:px-7"
          >
            View Live ↗
          </Button>
          {project.repoUrl && (
            <Button
              as="a"
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="flex-1 whitespace-nowrap px-4 sm:flex-none sm:px-7"
            >
              View Source ↗
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default LiveBuildCard;
