import { useEffect } from "react";

const liftSelector = [
  ".hero-copy > *",
  ".section-head",
  ".metric-card",
  ".contact-card",
  ".status-card",
  ".game-card",
  ".review-card",
  ".price-card",
  ".terms-card",
  ".contact-panel"
].join(", ");

export function useRevealMotion(rootRef, reducedMotion = false) {
  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return undefined;
    }

    if (reducedMotion) {
      root.querySelectorAll(".reveal, .reveal-lift").forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      root.querySelectorAll(".reveal, .reveal-lift").forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    root.querySelectorAll(liftSelector).forEach((element, index) => {
      element.classList.add("reveal-lift");
      element.style.setProperty("--reveal-index", String(index % 5));
    });

    root.classList.add("motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14 }
    );

    root.querySelectorAll(".reveal, .reveal-lift").forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
    };
  }, [reducedMotion, rootRef]);
}
