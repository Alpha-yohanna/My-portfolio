import Button from "../ui/Button";
import { scrollToTarget } from "../../lib/lenisSingleton";

function scrollToId(id) {
  scrollToTarget(`#${id}`);
}

// Shared left-aligned, serif-headline layout for the Cream and Navy states.
// Both reference images use the same editorial composition and typography —
// only the palette (passed in as props) differs — so one parameterized
// block renders both instead of duplicating near-identical markup.
function EditorialContentBlock({
  stateKey,
  dominant,
  textColor,
  dimTextColor,
  accentColor,
  reducedMotion,
  children,
}) {
  return (
    <div
      className="[grid-area:1/1] w-full max-w-xl text-left"
      style={{
        opacity: `var(--w-${stateKey})`,
        transform: `translateY(calc((1 - var(--w-${stateKey})) * 14px))`,
        filter: reducedMotion ? undefined : `blur(calc((1 - var(--w-${stateKey})) * 4px))`,
        color: textColor,
      }}
      inert={dominant !== stateKey}
    >
      <h1 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-normal leading-[1.08] tracking-tight">
        Software Engineer.
        <br />
        Product Builder.
        <br />
        <span style={{ color: accentColor }}>AI Explorer.</span>
      </h1>

      <p className="mt-6 max-w-md text-base leading-7 sm:text-lg" style={{ color: dimTextColor }}>
        Building digital products, intelligent systems, and experiences that
        turn ideas into reality.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Button
          variant="primary"
          onClick={() => scrollToId("work")}
          style={{ backgroundColor: accentColor, color: "#ffffff" }}
        >
          Explore My Work →
        </Button>
        <button
          type="button"
          onClick={() => scrollToId("contact")}
          className="inline-flex items-center gap-2 rounded-full border px-6 py-3.5 font-mono text-sm uppercase tracking-[0.15em] transition-opacity hover:opacity-80"
          style={{
            borderColor: `${accentColor}66`,
            backgroundColor: `${accentColor}1a`,
            color: textColor,
          }}
        >
          Let's Talk →
        </button>
      </div>

      {children}
    </div>
  );
}

export default EditorialContentBlock;
