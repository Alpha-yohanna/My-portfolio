import { navLinks } from "../data/siteData";

function Header({ menuOpen, onNavigate, onToggleMenu }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-900 bg-black/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-lg font-bold text-black">
            AY
          </div>
          <h1 className="text-lg font-semibold md:text-xl">Alpha Yohanna</h1>
        </button>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => onNavigate(link.view, link.section)}
                className="rounded-2xl px-4 py-2 text-sm text-white transition hover:bg-slate-800 md:text-base"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            className="p-2 text-white md:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={onToggleMenu}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M3 12h18" />
              <path d="M3 6h18" />
              <path d="M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      <nav
        className={`md:hidden ${menuOpen ? "block" : "hidden"} border-t border-slate-900 bg-slate-950/95 py-4`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5">
          {navLinks.map((link) => (
            <button
              key={`${link.label}-mobile`}
              type="button"
              className="rounded-2xl px-4 py-3 text-left text-sm text-white transition hover:bg-slate-800"
              onClick={() => onNavigate(link.view, link.section)}
            >
              {link.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Header;
