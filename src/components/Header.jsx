import { navItems } from "../data/portfolio.js";

export function Header() {
  return (
    <header className="topbar glass">
      <a className="brand" href="#top">
        <span className="brand-mark">
          <img src="https://github.com/Coaler1.png" alt="Coaler1 profile picture" />
        </span>
        <span className="brand-copy">
          <small>Roblox Developer</small>
          <span>Coaler1</span>
        </span>
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        {navItems.map(([label, href]) => (
          <a href={href} key={href}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
