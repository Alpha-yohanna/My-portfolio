import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import GlassPanel from "../ui/GlassPanel";
import { contactInfo } from "../../data/siteData";
import { fadeUp, staggerChildren } from "../../lib/motion";

function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-white/5 py-28 text-center md:py-36"
    >
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
          Contact
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="mx-auto mt-4 max-w-2xl font-display text-display-lg text-ink"
        >
          Let's build something.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-5 max-w-md text-base leading-8 text-ink-dim"
        >
          Have an idea, product, or problem worth solving?
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex justify-center">
          <Button as={Link} to="/booking" variant="primary">
            Start a Project ↗
          </Button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mx-auto mt-16 grid max-w-xl gap-4 text-left sm:grid-cols-2"
        >
          <GlassPanel as="a" href={`tel:${contactInfo.phoneTel}`} className="p-6 transition-colors hover:border-white/20">
            <p className="font-mono text-xs uppercase tracking-wide text-ink-dim">
              Phone
            </p>
            <p className="mt-2 text-lg text-ink">{contactInfo.phoneDisplay}</p>
          </GlassPanel>

          <GlassPanel as="a" href={`mailto:${contactInfo.email}`} className="p-6 transition-colors hover:border-white/20">
            <p className="font-mono text-xs uppercase tracking-wide text-ink-dim">
              Email
            </p>
            <p className="mt-2 break-all text-lg text-ink">{contactInfo.email}</p>
          </GlassPanel>
        </motion.div>

        <motion.p variants={fadeUp} className="mt-8 text-sm text-ink-dim">
          Prefer WhatsApp?{" "}
          <a
            href={contactInfo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-soft underline-offset-4 hover:underline"
          >
            Message directly
          </a>
        </motion.p>

        <motion.p variants={fadeUp} className="mt-16 text-sm text-ink-dim">
          Working together?{" "}
          <Link
            to="/terms"
            className="text-accent-soft underline-offset-4 hover:underline"
          >
            Review the project terms
          </Link>
        </motion.p>
      </motion.div>
    </section>
  );
}

export default Contact;
