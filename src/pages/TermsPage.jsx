import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GlassPanel from "../components/ui/GlassPanel";
import Button from "../components/ui/Button";
import { contactInfo } from "../data/siteData";
import { fadeUp, staggerChildren } from "../lib/motion";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const terms = [
  <>
    A <strong className="text-ink">50% upfront, non-refundable payment</strong> is
    required to start the project. The remaining balance is paid at agreed
    milestones after approval.
  </>,
  <>
    The project includes <strong className="text-ink">one meeting per week</strong>.
    Additional meetings may incur extra charges.
  </>,
  <>
    Work will follow the agreed project scope. Extra features, major changes,
    or additional revisions may require extra time and payment.
  </>,
  <>
    Timely feedback and approvals help keep the project on schedule. Delays
    may extend the delivery timeline.
  </>,
  <>
    If the project is cancelled, payments made are non-refundable, and
    completed work beyond the last paid milestone must be paid for.
  </>,
  <>
    Only paid work will be delivered. Ownership of the final project
    transfers to the client after full payment.
  </>,
  <>
    <strong className="text-ink">7–14 days of free post-launch support</strong> is
    included for bug fixes and minor adjustments. New features or ongoing
    maintenance will be billed separately.
  </>,
  <>
    Important approvals and project communication should be made through
    <strong className="text-ink"> WhatsApp or email</strong>.
  </>,
  <>
    By making the initial payment, the client confirms they have read and
    agreed to these terms.
  </>,
];

function TermsPage() {
  useDocumentTitle("Project Terms — Alpha Yohanna");

  return (
    <section className="px-5 pb-16 pt-32 md:pb-24 md:pt-40">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren(0.08)}
        className="mx-auto max-w-3xl"
      >
        <GlassPanel className="p-8 sm:p-10">
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.3em] text-accent-soft"
          >
            Project Agreement &amp; Booking Terms
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-display-md text-ink"
          >
            Project Terms
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-base leading-8 text-ink-dim"
          >
            Please review the terms below before confirming your project.
          </motion.p>

          <motion.ul
            variants={staggerChildren(0.04)}
            className="mt-8 space-y-4"
          >
            {terms.map((term, index) => (
              <motion.li
                key={index}
                variants={fadeUp}
                className="flex gap-3 text-left text-sm leading-7 text-ink-dim sm:text-base"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-soft" />
                <span>{term}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            variants={fadeUp}
            className="mt-10 rounded-2xl border border-white/5 bg-obsidian-200/60 p-6"
          >
            <h2 className="font-display text-lg text-ink">
              Reach out directly
            </h2>
            <div className="mt-4 space-y-3 text-sm text-ink-dim">
              <p>
                Email:{" "}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-accent-soft underline-offset-4 hover:underline"
                >
                  {contactInfo.email}
                </a>
              </p>
              <p>
                WhatsApp:{" "}
                <a
                  href={contactInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-soft underline-offset-4 hover:underline"
                >
                  {contactInfo.phoneDisplay}
                </a>
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Button as={Link} to="/" variant="secondary">
              Back to Home
            </Button>
            <Button as={Link} to="/booking" variant="primary">
              I agree &amp; continue
            </Button>
          </motion.div>
        </GlassPanel>
      </motion.div>
    </section>
  );
}

export default TermsPage;
