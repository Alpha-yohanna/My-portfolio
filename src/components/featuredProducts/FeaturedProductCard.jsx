import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import StatusTag from "../ui/StatusTag";
import { fadeUp } from "../../lib/motion";
import { visualRegistry } from "./visualRegistry";

function FeaturedProductCard({ product }) {
  const Visual = visualRegistry[product.theme];

  return (
    <motion.div
      variants={fadeUp}
      className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-obsidian-100/40 transition-colors hover:border-white/20"
    >
      <Link to={`/products/${product.slug}`} className="block p-6 pb-0">
        <Visual compact />
      </Link>

      <div className="flex flex-1 flex-col p-6 pt-4">
        <div className="flex items-center gap-3">
          <StatusTag status="in-development" />
        </div>

        <h3 className="mt-4 font-display text-2xl text-ink">{product.name}</h3>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-dim">
          {product.category}
        </p>

        <p className="mt-4 flex-1 text-sm leading-6 text-ink-dim">
          {product.tagline}
        </p>

        <Link
          to={`/products/${product.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent-soft transition-colors group-hover:text-ink"
        >
          View Case Study
          <span aria-hidden>→</span>
        </Link>
      </div>
    </motion.div>
  );
}

export default FeaturedProductCard;
