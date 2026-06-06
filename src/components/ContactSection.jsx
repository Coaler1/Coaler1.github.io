import { useEffect, useRef, useState } from "react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const copyDiscord = async () => {
    try {
      await navigator.clipboard.writeText("coaler1");
    } catch {
      const tempInput = document.createElement("input");
      tempInput.value = "coaler1";
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      tempInput.remove();
    }

    setCopied(true);
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section className="section reveal" id="contact">
      <div className="section-head">
        <div>
          <div className="eyebrow-subtle">Start a commission</div>
          <h2>Contact</h2>
        </div>
      </div>

      <div className="contact-grid">
        <div className="contact-panel glass is-main">
          <span className="meta-label">Discord</span>
          <h3 className="mono">coaler1</h3>
          <p>Best place for quotes, commission details, and progress updates.</p>
          <button className="copy-button" type="button" onClick={copyDiscord}>
            {copied ? "Copied" : "Copy Discord"}
          </button>
        </div>

        <a className="contact-panel contact-link glass" href="https://github.com/Coaler1" target="_blank" rel="noreferrer">
          <span className="meta-label">GitHub</span>
          <h3>Coaler1</h3>
          <p>Developer profile.</p>
        </a>

        <div className="contact-panel glass">
          <span className="meta-label">Brief Template</span>
          <h3>Idea, Budget, Deadline</h3>
          <p>Add systems, examples, assets, and payment type.</p>
        </div>
      </div>
    </section>
  );
}
