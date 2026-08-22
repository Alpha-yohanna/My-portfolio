import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems } from "../../data/navigation";

function CommandMenu({ open, onClose, onSelect }) {
  const firstItemRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    firstItemRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-obsidian/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={onClose}
        >
          <nav
            aria-label="Section links"
            className="flex flex-col items-center gap-2 px-6"
            onClick={(event) => event.stopPropagation()}
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                ref={index === 0 ? firstItemRef : undefined}
                type="button"
                onClick={() => onSelect(item)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex items-center gap-5 py-3 text-left"
              >
                <span className="font-mono text-xs text-ink-dim">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-3xl text-ink/70 transition-colors group-hover:text-ink sm:text-5xl">
                  {item.label}
                </span>
              </motion.button>
            ))}
          </nav>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="absolute right-6 top-6 font-mono text-xs uppercase tracking-[0.2em] text-ink-dim transition-colors hover:text-ink"
          >
            Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CommandMenu;
