import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  });

  useEffect(() => {
    if (!window.matchMedia) {
      return undefined;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);

    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  return reducedMotion;
}
