import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import GlassPanel from "../components/ui/GlassPanel";
import Button from "../components/ui/Button";
import { bookingSteps, bookingDetails } from "../data/bookingSteps";
import { fadeUp, staggerChildren } from "../lib/motion";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const CALENDLY_URL = "https://calendly.com/alphayohanna33/new-meeting";

function BookingPage() {
  useDocumentTitle("Book a Call — Alpha Yohanna");

  return (
    <div className="relative mx-auto max-w-5xl px-5 pb-24 pt-32 md:pb-32 md:pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 bg-[radial-gradient(circle,rgba(242,140,40,0.32),transparent_65%)]" />
        <div className="absolute right-0 top-[420px] h-[500px] w-[600px] bg-[radial-gradient(circle,rgba(246,165,85,0.22),transparent_65%)]" />
      </div>

      <section className="relative overflow-hidden rounded-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerChildren(0.1)}
          className="mx-auto max-w-2xl"
        >
          <GlassPanel className="p-8 text-center sm:p-10">
            <motion.p
              variants={fadeUp}
              className="font-mono text-xs uppercase tracking-[0.3em] text-accent-soft"
            >
              Booking
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-4 font-display text-display-md text-ink"
            >
              Book a call
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-md text-base leading-8 text-ink-dim"
            >
              A short consultation call to talk through your project and
              figure out the right next step.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <Button as={Link} to="/" variant="secondary">
                Back to Home
              </Button>
              <Button
                as="a"
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                Book a Call Now ↗
              </Button>
            </motion.div>
          </GlassPanel>
        </motion.div>
      </section>

      <section className="border-t border-white/5 py-20 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerChildren(0.08)}
          className="mb-12 md:mb-16"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.3em] text-accent-soft"
          >
            What To Expect
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-display-md text-ink"
          >
            How the call works.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerChildren(0.08)}
          className="grid gap-4 sm:grid-cols-2"
        >
          {bookingSteps.map((step) => (
            <motion.div key={step.number} variants={fadeUp}>
              <GlassPanel className="h-full p-6 transition-colors hover:border-white/20 sm:p-7">
                <span className="font-mono text-xs text-ink-dim">
                  {step.number}
                </span>
                <h3 className="mt-3 font-display text-xl text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-dim">
                  {step.description}
                </p>
              </GlassPanel>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="border-t border-white/5 py-20 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerChildren(0.1)}
          className="mx-auto max-w-xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-center font-mono text-xs uppercase tracking-[0.3em] text-accent-soft"
          >
            Good To Know
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            {bookingDetails.map((detail) => (
              <GlassPanel key={detail.label} className="p-6">
                <p className="font-mono text-xs uppercase tracking-wide text-ink-dim">
                  {detail.label}
                </p>
                <p className="mt-2 text-lg text-ink">{detail.value}</p>
              </GlassPanel>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={staggerChildren(0.1)}
        className="border-t border-white/5 pt-20 text-center md:pt-28"
      >
        <motion.h2
          variants={fadeUp}
          className="mx-auto max-w-md font-display text-display-md text-ink"
        >
          Ready when you are.
        </motion.h2>

        <motion.div variants={fadeUp} className="mt-8 flex justify-center">
          <Button
            as="a"
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >
            Book a Call Now ↗
          </Button>
        </motion.div>

        <motion.p variants={fadeUp} className="mt-8 text-sm text-ink-dim">
          Working together?{" "}
          <Link
            to="/terms"
            className="text-accent-soft underline-offset-4 hover:underline"
          >
            Review the project terms
          </Link>
        </motion.p>
      </motion.section>
    </div>
  );
}

export default BookingPage;
