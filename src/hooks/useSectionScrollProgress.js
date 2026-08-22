import { useEffect, useRef, useState } from "react";

export function useSectionScrollProgress(ref) {
  const [progress, setProgress] = useState(0);
  const frame = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const height = rect.height || 1;
      const raw = -rect.top / height;
      setProgress(Math.min(1, Math.max(0, raw)));
      frame.current = null;
    };

    const handleScroll = () => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame.current) window.cancelAnimationFrame(frame.current);
    };
  }, [ref]);

  return progress;
}
