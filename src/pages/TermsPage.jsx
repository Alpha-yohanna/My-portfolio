import { Link } from "react-router-dom";
import { contactInfo } from "../data/siteData";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

function TermsPage() {
  useDocumentTitle("Project Terms — Alpha Yohanna");

  return (
    <section className="px-5 pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-slate-950/70 p-8 shadow-sm sm:p-10">
        <p className="text-sm uppercase tracking-[0.25em] text-blue-400">
          Project Agreement & Booking Terms
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-white">
          Project Terms
        </h2>
        <p className="mt-5 text-base leading-8 text-slate-300">
          Please review the terms below before confirming your project.
        </p>

        <ul className="mt-8 space-y-4 text-left text-slate-200">
          <li>
            A <strong>50% upfront, non-refundable payment</strong> is required
            to start the project. The remaining balance is paid at agreed
            milestones after approval.
          </li>
          <li>
            The project includes <strong>one meeting per week</strong>.
            Additional meetings may incur extra charges.
          </li>
          <li>
            Work will follow the agreed project scope. Extra features, major
            changes, or additional revisions may require extra time and payment.
          </li>
          <li>
            Timely feedback and approvals help keep the project on schedule.
            Delays may extend the delivery timeline.
          </li>
          <li>
            If the project is cancelled, payments made are non-refundable, and
            completed work beyond the last paid milestone must be paid for.
          </li>
          <li>
            Only paid work will be delivered. Ownership of the final project
            transfers to the client after full payment.
          </li>
          <li>
            <strong>7–14 days of free post-launch support</strong> is included
            for bug fixes and minor adjustments. New features or ongoing
            maintenance will be billed separately.
          </li>
          <li>
            Important approvals and project communication should be made through
            <strong> WhatsApp or email</strong>.
          </li>
          <li>
            By making the initial payment, the client confirms they have read
            and agreed to these terms.
          </li>
        </ul>

        <div className="mt-10 rounded-2xl border border-slate-800 bg-black/40 p-6">
          <h3 className="text-xl font-semibold text-white">
            Reach out directly
          </h3>
          <div className="mt-4 space-y-3 text-slate-300">
            <p>
              Email:{" "}
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-blue-400 underline"
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
                className="text-blue-400 underline"
              >
                {contactInfo.phoneDisplay}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="rounded-2xl border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Back to Home
          </Link>
          <Link
            to="/booking"
            className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-blue-600 hover:text-white"
          >
            I agree & continue
          </Link>
        </div>
      </div>
    </section>
  );
}

export default TermsPage;
