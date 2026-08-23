import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../../data/navigation";
import CommandMenu from "./CommandMenu";
import Button from "../ui/Button";
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
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
          elevated
            ? "border-white/10 bg-obsidian/85 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={() => goToSection(null)}
            aria-label="Go to homepage"
            className="flex items-center gap-2.5"
          >
            <span className="font-display text-2xl font-bold tracking-tight text-ink">
              AY<span className="text-accent">.</span>
            </span>
            <span className="hidden flex-col text-left font-mono text-[10px] uppercase leading-tight tracking-[0.15em] text-ink-dim sm:flex">
              <span>Alpha</span>
              <span>Yohanna</span>
            </span>
          </button>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goToSection(item.section)}
                className="font-mono text-xs uppercase tracking-[0.15em] text-ink-dim transition-colors hover:text-ink"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button
              variant="secondary"
              className="!rounded-full !px-6 !py-2.5 text-xs"
              onClick={() => goToSection("contact")}
            >
              Let's Talk ↗
            </Button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-label="Open menu"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className="h-px w-5 bg-ink transition-colors" />
            <span className="h-px w-5 bg-ink transition-colors" />
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
