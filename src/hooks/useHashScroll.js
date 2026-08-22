import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenis } from "../lib/lenisSingleton";

export function useHashScroll() {
  const location = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const lenis = getLenis();

      if (location.hash) {
        const id = location.hash.slice(1);
        const el = document.getElementById(id);
        if (!el) return;
        if (lenis) {
          lenis.scrollTo(el, { offset: 0, immediate: false });
        } else {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
      }

      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);
}
