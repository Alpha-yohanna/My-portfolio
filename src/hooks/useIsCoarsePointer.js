import { useEffect, useState } from "react";

export function useIsCoarsePointer() {
  const [isCoarse, setIsCoarse] = useState(() =>
    typeof window === "undefined"
      ? false
      : window.matchMedia("(pointer: coarse)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(pointer: coarse)");
    const listener = (event) => setIsCoarse(event.matches);

    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return isCoarse;
}
