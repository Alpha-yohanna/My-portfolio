import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../../hooks/useInView";

function BrowserFrame({ url, title }) {
  const [frameRef, inView] = useInView({ rootMargin: "300px" });
  const [loaded, setLoaded] = useState(false);
  const domain = new URL(url).hostname.replace("www.", "");

  return (
    <div
      ref={frameRef}
      className="overflow-hidden rounded-2xl border border-white/10 bg-obsidian-100 shadow-glass"
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-obsidian-200 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 truncate rounded-full bg-white/5 px-3 py-1 font-mono text-[11px] text-ink-dim">
          {domain}
        </span>
      </div>

      <div className="relative aspect-[16/10] w-full bg-obsidian-300">
        {inView && (
          <motion.iframe
            src={url}
            title={title}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full"
          />
        )}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
              Loading live preview…
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default BrowserFrame;
