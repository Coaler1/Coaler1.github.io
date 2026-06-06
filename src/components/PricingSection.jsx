import { useEffect, useRef, useState } from "react";
import { priceCards } from "../data/portfolio.js";

const currencies = [
  ["eur", "EUR"],
  ["usd", "USD"],
  ["robux", "Robux"]
];

export function PricingSection() {
  const [currency, setCurrency] = useState("eur");
  const [isSwitching, setIsSwitching] = useState(false);
  const switchTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      window.clearTimeout(switchTimeoutRef.current);
    };
  }, []);

  const selectCurrency = (value) => {
    if (value === currency) {
      return;
    }

    setCurrency(value);
    setIsSwitching(true);
    window.clearTimeout(switchTimeoutRef.current);
    switchTimeoutRef.current = window.setTimeout(() => setIsSwitching(false), 180);
  };

  return (
    <section className="section reveal" id="pricing">
      <div className="section-head">
        <div>
          <div className="eyebrow-subtle">Rates</div>
          <h2>Pricing</h2>
        </div>
      </div>

      <div className="pricing-toolbar" aria-label="Currency selector">
        {currencies.map(([value, label]) => (
          <button
            className={`currency-button${currency === value ? " is-active" : ""}`}
            type="button"
            onClick={() => selectCurrency(value)}
            key={value}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="pricing-grid">
        {priceCards.map((card) => (
          <div className={`price-card glass${card.featured ? " is-featured" : ""}`} key={card.label}>
            <div className="price-label">{card.label}</div>
            <div className={`price-value${isSwitching ? " is-switching" : ""}`}>{card.prices[currency]}</div>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
