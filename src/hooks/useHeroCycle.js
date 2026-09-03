import { useEffect, useRef, useState } from "react";

const HOLD_MS = 7000;
const RAMP_MS = 2500;
const SEGMENT_MS = HOLD_MS + RAMP_MS;

// Caps how much elapsed time a single frame can contribute. Browsers can
// stall or heavily throttle requestAnimationFrame (backgrounded/occluded
// tabs, system sleep, headless automation) for many seconds at a stretch;
// without a cap the next frame's real wall-clock gap would be applied in one
// jump, snapping straight past intermediate states. Clamping means a long
// stall just pauses visible progress instead of skipping states.
const MAX_FRAME_MS = 100;

function easeInOutCubic(p) {
  return p < 0.5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2;
}

// Computes a live weight (0..1) for every state in `states`, where exactly
// one state is fully dominant during its hold window and, during a ramp,
// weight smoothly transfers from the outgoing state to the next one in
// sequence. Weights always sum to 1 across the full array, so any number of
// states can crossfade in a strict cycle (A->B->C->D->A->...).
function computeWeights(elapsed, count) {
  const cycleMs = SEGMENT_MS * count;
  const t = elapsed % cycleMs;
  const segment = Math.floor(t / SEGMENT_MS);
  const localT = t - segment * SEGMENT_MS;
  const weights = new Array(count).fill(0);
  const next = (segment + 1) % count;

  if (localT < HOLD_MS) {
    weights[segment] = 1;
  } else {
    const p = easeInOutCubic((localT - HOLD_MS) / RAMP_MS);
    weights[segment] = 1 - p;
    weights[next] = p;
  }

  return { weights, dominantIndex: localT < HOLD_MS + RAMP_MS / 2 ? segment : next };
}

// Drives a perpetual N-state crossfade by writing one --w-<key> custom
// property per state directly onto the section element every frame,
// bypassing React state so the continuous animation never triggers a
// re-render. `dominant` is exposed as ordinary state, but only changes once
// per transition (for pointer-events/inert), not every frame. `states` must
// be a stable array reference (define it as a module-level constant).
export function useHeroCycle(sectionRef, { active, reducedMotion, states }) {
  const [dominant, setDominant] = useState(states[0]);
  const dominantRef = useRef(states[0]);
  const rafRef = useRef(null);
  const elapsedRef = useRef(0);
  const lastTickRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const applyWeights = (weights) => {
      states.forEach((key, index) => {
        node.style.setProperty(`--w-${key}`, weights[index].toFixed(4));
      });
    };

    if (reducedMotion) {
      applyWeights(states.map((_, index) => (index === 0 ? 1 : 0)));
      if (dominantRef.current !== states[0]) {
        dominantRef.current = states[0];
        setDominant(states[0]);
      }
      return undefined;
    }

    if (!active) {
      lastTickRef.current = null;
      return undefined;
    }

    const tick = (now) => {
      if (lastTickRef.current != null) {
        const delta = Math.max(0, Math.min(now - lastTickRef.current, MAX_FRAME_MS));
        elapsedRef.current += delta;
      }
      lastTickRef.current = now;

      const { weights, dominantIndex } = computeWeights(elapsedRef.current, states.length);
      applyWeights(weights);

      const nextDominant = states[dominantIndex];
      if (dominantRef.current !== nextDominant) {
        dominantRef.current = nextDominant;
        setDominant(nextDominant);
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTickRef.current = null;
    };
  }, [sectionRef, active, reducedMotion, states]);

  return dominant;
}
