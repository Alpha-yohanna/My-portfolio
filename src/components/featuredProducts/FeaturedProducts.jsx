import { motion } from "framer-motion";
import { featuredProducts } from "../../data/featuredProducts";
import { staggerChildren } from "../../lib/motion";
import FeaturedProductCard from "./FeaturedProductCard";

function FeaturedProducts() {
  return (
    <section id="featured-products" className="border-t border-white/5 py-28 md:py-36">
      <div className="mb-14 md:mb-20">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-soft">
          Featured Products
        </p>
        <h2 className="mt-4 font-display text-display-md text-ink">
          Products I'm engineering
          <br className="hidden sm:block" /> around real-world problems.
        </h2>
      </div>

      <motion.div
        variants={staggerChildren(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-6 md:grid-cols-3"
      >
        {featuredProducts.map((product) => (
          <FeaturedProductCard key={product.slug} product={product} />
        ))}
      </motion.div>
    </section>
  );
}

export default FeaturedProducts;
