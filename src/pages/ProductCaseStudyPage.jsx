import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getFeaturedProduct } from "../data/featuredProducts";
import { visualRegistry } from "../components/featuredProducts/visualRegistry";
import StatusTag from "../components/ui/StatusTag";
import Button from "../components/ui/Button";
import { fadeUp, staggerChildren } from "../lib/motion";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

function CaseStudySection({ number, title, children }) {
  return (
    <motion.div
      variants={fadeUp}
      className="border-t border-white/5 py-12 first:border-t-0 first:pt-0"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-ink-dim">{number}</span>
        <h2 className="font-display text-2xl text-ink sm:text-3xl">{title}</h2>
      </div>
      <div className="mt-5 max-w-2xl text-base leading-8 text-ink-dim">
        {children}
      </div>
    </motion.div>
  );
}

function ProductCaseStudyPage() {
  const { slug } = useParams();
  const product = getFeaturedProduct(slug);

  useDocumentTitle(
    product ? `${product.name} — Alpha Yohanna` : "Not Found — Alpha Yohanna",
  );

  if (!product) {
    return (
      <div className="mx-auto max-w-2xl px-5 pb-24 pt-40 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-soft">
          Not Found
        </p>
        <h1 className="mt-4 font-display text-display-md text-ink">
          That product doesn't exist.
        </h1>
        <Link
          to="/"
          className="mt-8 inline-block font-mono text-sm text-accent-soft hover:text-ink"
        >
          ← Back to portfolio
        </Link>
      </div>
    );
  }

  const Visual = visualRegistry[product.theme];

  return (
    <div className="mx-auto max-w-4xl px-5 pb-28 pt-32 md:pt-40">
      <Link
        to="/"
        className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim transition-colors hover:text-ink"
      >
        ← Back to Portfolio
      </Link>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren(0.1)}
        className="mt-8"
      >
        <motion.div variants={fadeUp} className="flex items-center gap-3">
          <StatusTag status="in-development" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-dim">
            {product.category}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mt-5 font-display text-display-lg text-ink"
        >
          {product.name}
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-3 text-sm text-ink-dim">
          {product.platform}
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mt-6 max-w-2xl text-lg leading-8 text-ink-dim"
        >
          {product.tagline}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10">
          <Visual />
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerChildren(0.05)}
        className="mt-8"
      >
        <CaseStudySection number="01" title="The Problem">
          <p>{product.problem}</p>
        </CaseStudySection>

        <CaseStudySection number="02" title="The Idea">
          <p>{product.idea}</p>
        </CaseStudySection>

        <CaseStudySection number="03" title="The Product">
          <p>{product.product}</p>
        </CaseStudySection>

        <CaseStudySection number="04" title="How It Works">
          <ol className="space-y-3">
            {product.howItWorks.map((step, index) => (
              <li key={step} className="flex gap-3">
                <span className="font-mono text-xs text-accent-soft">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </CaseStudySection>

        <CaseStudySection number="05" title="Key Features">
          <ul className="grid gap-2 sm:grid-cols-2">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5 text-sm">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-soft" />
                {feature}
              </li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection number="06" title="Technology">
          <div className="flex flex-wrap gap-2">
            {product.tech.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-ink-dim"
              >
                {item}
              </span>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection number="07" title="Vision">
          <p>{product.vision}</p>
        </CaseStudySection>
      </motion.div>

      <div className="mt-16 flex flex-wrap gap-4 border-t border-white/5 pt-12">
        <Button as={Link} to="/#featured-products" variant="secondary">
          ← Back to Featured Products
        </Button>
        <Button as={Link} to="/#contact" variant="ghost">
          Have thoughts on this? Let's talk
        </Button>
      </div>
    </div>
  );
}

export default ProductCaseStudyPage;
