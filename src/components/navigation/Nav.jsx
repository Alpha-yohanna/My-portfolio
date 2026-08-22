import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../../data/navigation";
import CommandMenu from "./CommandMenu";
import { scrollToTarget } from "../../lib/lenisSingleton";

function Nav() {
  const [hidden, setHidden] = useState(false);
  const [elevated, setElevated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const menuButtonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => {
    if (menuOpen) {
      menuButtonRef.current?.focus();
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setElevated(currentY > 24);
      setHidden(currentY > lastScrollY.current && currentY > 160);
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToSection = (sectionId) => {
    closeMenu();

    if (!sectionId) {
      if (location.pathname === "/") {
        scrollToTarget(0);
      } else {
        navigate("/");
      }
      return;
    }

    if (location.pathname === "/") {
      scrollToTarget(`#${sectionId}`);
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <div
          className={`flex w-full max-w-4xl items-center justify-between rounded-full px-5 py-3 transition-colors duration-500 ${
            elevated ? "glass-surface" : "border border-transparent"
          }`}
        >
          <button
            type="button"
            onClick={() => goToSection(null)}
            aria-label="Go to homepage"
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-sm font-semibold text-obsidian">
              AY
            </div>
            <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-ink sm:inline">
              Alpha Yohanna
            </span>
          </button>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {navItems
              .filter((item) => item.id !== "home")
              .map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goToSection(item.section)}
                  className="rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] text-ink-dim transition-colors hover:text-ink"
                >
                  {item.label}
                </button>
              ))}
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            className="rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:text-accent-soft"
          >
            Menu
          </button>
        </div>
      </motion.header>

      <CommandMenu
        open={menuOpen}
        onClose={closeMenu}
        onSelect={(item) => goToSection(item.section)}
      />
    </>
  );
}

export default Nav;
