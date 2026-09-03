import { useEffect, useState } from "react";
import HeroScene from "../three/HeroScene";
import TechnicalDiagram from "./TechnicalDiagram";

function useIsDesktop() {
  const query = "(min-width: 1024px)";
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === "undefined" ? true : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const listener = (event) => setIsDesktop(event.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  return isDesktop;
}

const CREAM_INK = "#12213b";
const CREAM_ACCENT = "#c2410c";
const GREEN_ACCENT = "#e4b94a";
const NAVY_ACCENT = "#2f6fed";

const NODES = [
  { id: "n1", top: "24%", left: "62%", depth: 8 },
  { id: "n2", top: "17%", left: "84%", depth: 14 },
  { id: "n3", top: "40%", left: "90%", depth: 6 },
];

function NodeNetwork() {
  return (
    <svg className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
      <line x1="62%" y1="24%" x2="84%" y2="17%" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
      <line x1="84%" y1="17%" x2="90%" y2="40%" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" />
      <line x1="62%" y1="24%" x2="90%" y2="40%" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
    </svg>
  );
}

function BarcodeMark({ color }) {
  const bars = [3, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 3];
  return (
    <div className="flex items-end gap-[2px]" style={{ color }}>
      {bars.map((h, index) => (
        <span
          key={index}
          className="inline-block w-[2px] bg-current"
          style={{ height: `${h * 4}px`, opacity: 0.5 + (index % 3) * 0.15 }}
        />
      ))}
    </div>
  );
}

function IssueFooter({ color, dim }) {
  return (
    <div className="absolute bottom-[8%] right-[4%] text-right" style={{ color: dim }}>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color }}>
        Issue No. 01
      </p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em]">Digital Edition</p>
      <div className="mt-3 flex justify-end">
        <BarcodeMark color={color} />
      </div>
    </div>
  );
}

const CHAPTER_TAGS = [
  { id: "01", label: "Engineering", pos: "left-[6%] top-[14%]" },
  { id: "02", label: "Product", pos: "right-[6%] top-[14%]" },
  { id: "03", label: "AI Explorer", pos: "left-[6%] bottom-[14%]" },
];

function ChapterTags({ color }) {
  return (
    <>
      {CHAPTER_TAGS.map((tag) => (
        <div key={tag.id} className={`absolute ${tag.pos} flex items-center gap-2`} style={{ color }}>
          <span className="font-mono text-[11px] tracking-[0.15em]">
            {tag.id} / {tag.label.toUpperCase()}
          </span>
          <span className="h-px w-10 bg-current opacity-50" />
          <span className="h-1 w-1 rounded-full bg-current" />
        </div>
      ))}
    </>
  );
}

function StackedLabels({ color }) {
  return (
    <div className="absolute right-[6%] top-[54%] space-y-1 text-right" style={{ color }}>
      {["Engineering", "Products", "AI Systems"].map((label) => (
        <p key={label} className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-70">
          {label}
        </p>
      ))}
    </div>
  );
}

function Watermark() {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute right-[2%] top-[4%] select-none font-sans text-[15rem] font-black uppercase leading-none text-white/[0.05] xl:text-[19rem]"
        style={{ opacity: "calc(var(--w-green) + var(--w-navy))" }}
      >
        AY
      </span>
      <span
        aria-hidden="true"
        className="absolute right-[2%] top-[4%] select-none font-sans text-[15rem] font-black uppercase leading-none xl:text-[19rem]"
        style={{ opacity: "var(--w-cream)", color: `${CREAM_INK}0d` }}
      >
        AY
      </span>
    </>
  );
}

function DiagramLayer({ registerParallaxRef }) {
  return (
    <div ref={registerParallaxRef} data-depth="6" className="absolute inset-[6%] right-[8%]">
      <TechnicalDiagram
        className="absolute inset-0 h-full w-full"
        style={{ color: GREEN_ACCENT, opacity: "var(--w-green)" }}
      />
      <TechnicalDiagram
        className="absolute inset-0 h-full w-full"
        style={{ color: CREAM_ACCENT, opacity: "var(--w-cream)" }}
      />
      <TechnicalDiagram
        className="absolute inset-0 h-full w-full"
        style={{ color: NAVY_ACCENT, opacity: "var(--w-navy)" }}
      />
    </div>
  );
}

function TechnicalGraphics({ registerParallaxRef }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
      <Watermark />

      <DiagramLayer registerParallaxRef={registerParallaxRef} />

      <div style={{ color: GREEN_ACCENT, opacity: "var(--w-green)" }}>
        <NodeNetwork />
        {NODES.map((node) => (
          <span
            key={node.id}
            ref={registerParallaxRef}
            data-depth={node.depth}
            className="hero-breathe absolute h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_10px_rgba(244,196,48,0.5)]"
            style={{ top: node.top, left: node.left, animationDuration: "7s" }}
          />
        ))}
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${GREEN_ACCENT}40, transparent)` }}
        />
      </div>

      <span
        className="absolute left-[54%] top-[70%] font-mono text-xs"
        style={{ color: "#f4f3ee", opacity: "calc((var(--w-green) + var(--w-navy)) * 0.2)" }}
      >
        +
      </span>
      <span
        className="absolute right-[6%] bottom-[26%] font-mono text-xs"
        style={{ color: "#f4f3ee", opacity: "calc((var(--w-green) + var(--w-navy)) * 0.2)" }}
      >
        +
      </span>

      <div style={{ color: CREAM_INK, opacity: "var(--w-cream)" }}>
        <ChapterTags color={CREAM_INK} />
        <IssueFooter color={CREAM_ACCENT} dim={`${CREAM_INK}99`} />
      </div>

      <div style={{ opacity: "var(--w-navy)" }}>
        <StackedLabels color="#f4f3ee" />
        <IssueFooter color={NAVY_ACCENT} dim="rgba(244,243,238,0.6)" />
      </div>
    </div>
  );
}

function HeroVisualB({
  mountReady,
  reducedMotion,
  isCoarsePointer,
  heroInView,
  registerParallaxRef,
}) {
  const isDesktop = useIsDesktop();

  if (!mountReady) return null;

  return (
    <>
      <TechnicalGraphics registerParallaxRef={registerParallaxRef} />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[4%] top-1/2 -z-10 hidden h-[62%] w-[38%] -translate-y-1/2 lg:block"
        style={{ opacity: "var(--w-green)" }}
      >
        {isDesktop && (
          <HeroScene
            reducedMotion={reducedMotion}
            enablePointer={!isCoarsePointer}
            active={heroInView}
          />
        )}
      </div>
    </>
  );
}

export function HeroVisualBMobile({ mountReady, reducedMotion, heroInView }) {
  if (!mountReady) return null;

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto mt-8 h-40 w-40 lg:hidden"
      style={{ opacity: "calc(var(--w-green) * 0.6)" }}
    >
      <HeroScene
        reducedMotion={reducedMotion}
        enablePointer={false}
        speedMultiplier={0.5}
        minimal
        active={heroInView}
      />
    </div>
  );
}

export default HeroVisualB;
