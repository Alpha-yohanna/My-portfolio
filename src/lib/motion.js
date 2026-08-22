export const ease = {
  premium: [0.16, 1, 0.3, 1],
};

export const duration = {
  fast: 0.3,
  base: 0.6,
  slow: 1,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.premium },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.base, ease: ease.premium },
  },
};

export const staggerChildren = (stagger = 0.08) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger },
  },
});
