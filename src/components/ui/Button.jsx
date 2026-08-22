import { motion } from "framer-motion";
import clsx from "clsx";
import { ease, duration } from "../../lib/motion";

const variants = {
  primary:
    "bg-ink text-obsidian hover:bg-white",
  secondary:
    "glass-surface text-ink hover:border-ink/20",
  ghost:
    "text-ink/80 hover:text-ink",
};

const motionComponentCache = new Map([
  ["button", motion.create("button")],
  ["a", motion.create("a")],
]);

function getMotionComponent(as) {
  if (!motionComponentCache.has(as)) {
    motionComponentCache.set(as, motion.create(as));
  }
  return motionComponentCache.get(as);
}

function Button({
  as = "button",
  variant = "primary",
  className,
  children,
  ...props
}) {
  const MotionComponent = getMotionComponent(as);

  return (
    <MotionComponent
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ duration: duration.fast, ease: ease.premium }}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-medium tracking-wide transition-colors",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

export default Button;
