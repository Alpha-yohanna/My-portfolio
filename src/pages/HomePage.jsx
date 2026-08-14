import ProjectCarousel from "../components/ProjectCarousel";
import { featuredProject, services } from "../data/siteData";

function HomePage({ onNavigate }) {
  return (
    <>
      <section
        id="home"
        className="hero flex min-h-[78vh] flex-col items-center justify-center px-5 py-16 text-center"
      >
        <div className="w-full max-w-4xl">
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            Hi, I'm Alpha Dev.I build software people actually use.
          </h2>
          <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
            Thoughtful web development for businesses, personal brands, and
            teams that want a simple, professional online presence.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <button
              type="button"
              onClick={() => onNavigate("terms")}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-slate-200"
            >
              Book a Call
            </button>
            <button
              type="button"
              onClick={() => onNavigate("home", "work")}
              className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-8 py-4 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Explore Services
            </button>
          </div>
        </div>
      </section>

      <section id="work" className="py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-white">Projects</h2>
          </div>

          <div className="mt-10 grid gap-8 rounded-3xl border border-slate-800 bg-slate-950/70 p-8 shadow-sm sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <ProjectCarousel />

            <div className="text-center lg:text-left">
              <h3 className="text-3xl font-semibold text-white">
                {featuredProject.title}
              </h3>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
                {featuredProject.description}
              </p>
              <a
                href={featuredProject.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex w-fit items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-blue-600 hover:text-white"
              >
                Visit Live Website
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 text-center">
        <h2 className="text-3xl font-semibold">Services</h2>
        <ul className="mx-auto mt-8 grid max-w-xl gap-4 text-left sm:grid-cols-2">
          {services.map((service) => (
            <li
              key={service}
              className="rounded-3xl border border-slate-800 bg-slate-950/70 px-6 py-6 text-slate-200 shadow-sm transition hover:border-blue-600"
            >
              {service}
            </li>
          ))}
        </ul>
      </section>

      <section id="contact" className="py-20 text-center">
        <h2 className="text-3xl font-semibold">Contact</h2>
        <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-8 text-left sm:items-center sm:text-center">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 px-6 py-6 text-slate-200 shadow-sm">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
              Phone
            </p>
            <p className="mt-3 text-lg font-medium text-white">08033199422</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 px-6 py-6 text-slate-200 shadow-sm">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
              Email
            </p>
            <p className="mt-3 text-lg font-medium text-white">
              alphayohanna33@gmail.com
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 text-center">
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-800 bg-slate-950/70 px-8 py-8 shadow-sm">
          <h2 className="text-3xl font-semibold">Project Terms</h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-slate-300">
            Review the project agreement before booking a call.
          </p>
          <button
            type="button"
            onClick={() => onNavigate("terms")}
            className="mt-8 inline-flex rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            View Project Terms
          </button>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-950/70 p-8 text-center shadow-sm sm:p-10">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-400">
            About Me
          </p>
          <p className="mt-5 text-base leading-8 text-white sm:text-lg">
            I’m Alpha Yohanna, a software engineer who builds responsive
            websites, web apps, and practical digital tools for businesses and
            personal brands.
          </p>
          <p className="mt-4 text-base leading-8 text-white">
            My focus is simple: clean design, reliable code, and websites that
            help people understand your work quickly.
          </p>

          <div className="mx-auto mt-8 w-full max-w-xs overflow-hidden rounded-[1.75rem] border border-slate-800 bg-black/30 p-3">
            <img
              src="/Hero.jpeg"
              alt="Alpha Yohanna"
              className="max-h-[420px] w-full rounded-[1.25rem] object-contain object-center sm:h-[360px]"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
