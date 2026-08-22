let instance = null;

export function setLenis(lenis) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

export function scrollToTarget(target, options = {}) {
  if (instance) {
    instance.scrollTo(target, { offset: 0, immediate: false, ...options });
    return;
  }

  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
    return;
  }

  const node = typeof target === "string" ? document.querySelector(target) : target;
  node?.scrollIntoView({ behavior: "smooth", block: "start" });
}
