import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../../data/navigation";
import CommandMenu from "./CommandMenu";
import Button from "../ui/Button";
import Logo from "../ui/Logo";
import { scrollToTarget } from "../../lib/lenisSingleton";

function Nav() {
  const [hidden, setHidden] = useState(false);
  const [elevated, setElevated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
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

  useEffect(() => {
    if (location.pathname !== "/") return undefined;

    const sections = navItems
      .map((item) => document.getElementById(item.section))
      .filter(Boolean);

    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [location.pathname]);

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
        className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 transition-colors duration-500 ${
          elevated ? "bg-black/85 backdrop-blur-md" : "bg-black/40"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <button
            type="button"
            onClick={() => goToSection(null)}
            aria-label="Go to homepage"
            className="flex items-center gap-2.5"
          >
            <Logo className="h-8 w-auto" />
            <span className="hidden flex-col text-left font-mono text-[10px] uppercase leading-tight tracking-[0.15em] text-ink-dim sm:flex">
              <span>Alpha</span>
              <span>Yohanna</span>
            </span>
          </button>

          <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.section;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goToSection(item.section)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative pb-1 font-mono text-xs uppercase tracking-[0.15em] transition-colors ${
                    isActive ? "text-ink" : "text-ink-dim hover:text-ink"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-ink"
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </button>
              );
            })}
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
