import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "../lib/lenisSingleton";

export function useLenis(enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    setLenis(lenis);

    let frameId;
    const raf = (time) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      setLenis(null);
      lenis.destroy();
    };
  }, [enabled]);
}
