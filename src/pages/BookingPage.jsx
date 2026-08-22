import { Link } from "react-router-dom";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

function BookingPage() {
  useDocumentTitle("Book a Call — Alpha Yohanna");

  return (
    <section className="px-5 pb-16 pt-32 md:pb-24 md:pt-40">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-950/70 p-8 text-center shadow-sm sm:p-10">
        <p className="text-sm uppercase tracking-[0.25em] text-blue-400">
          Booking
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-white">
          Continue to your booking
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
          You can now book a consultation call to discuss your project and next
          steps.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="rounded-2xl border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Back to Home
          </Link>
          <a
            href="https://calendly.com/alphayohanna33/new-meeting"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-blue-600 hover:text-white"
          >
            Book a Call Now
          </a>
        </div>
      </div>
    </section>
  );
}

export default BookingPage;
