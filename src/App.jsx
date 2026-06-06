import { useRef } from "react";
import { ContactSection } from "./components/ContactSection.jsx";
import { Header } from "./components/Header.jsx";
import { PricingSection } from "./components/PricingSection.jsx";
import { ReviewsSection } from "./components/ReviewsSection.jsx";
import { StaticSections } from "./components/StaticSections.jsx";
import { useReducedMotion } from "./hooks/useReducedMotion.js";
import { useRevealMotion } from "./hooks/useRevealMotion.js";
import { useScrollMotion } from "./hooks/useScrollMotion.js";

export default function App() {
  const appRef = useRef(null);
  const progressRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useRevealMotion(appRef, reducedMotion);
  useScrollMotion({ progressRef, rootRef: appRef, reducedMotion });

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" ref={progressRef}></div>
      <div className="shell" ref={appRef}>
        <Header />

        <main id="top">
          <StaticSections
            reviewsSection={<ReviewsSection />}
            pricingSection={<PricingSection />}
            contactSection={<ContactSection />}
          />
        </main>

        <footer className="footer">Coaler1 Roblox Developer</footer>
      </div>
    </>
  );
}
