export function StaticSections({ reviewsSection, pricingSection, contactSection }) {
  return (
    <>
<section className="hero reveal">
                <div className="hero-panel glass">
                    <div className="roblox-stage" aria-hidden="true">
                        <div className="orbit-ring"></div>
                        <div className="cube">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div className="depth-orb" aria-hidden="true"></div>
                    <div className="depth-plate" aria-hidden="true"></div>
                    <div className="depth-shard" aria-hidden="true"></div>
                    <div className="hero-grid">
                        <div className="hero-copy">
                            <div className="eyebrow">
                                <span className="status-dot"></span>
                                Available for Roblox commissions
                            </div>
                            <h1>Coaler1</h1>
                            <p>
                                Roblox Lua scripter focused on clean gameplay systems, secure client-server logic,
                                datastores, UI polish, shops, economy loops, and complete playable experiences.
                            </p>
                            <div className="hero-actions">
                                <a className="button button-primary" href="#games">View Games</a>
                                <a className="button button-secondary" href="#contact">Contact Me</a>
                            </div>
                        </div>

                        <div className="hero-side">
                            <aside className="metric-card glass" aria-label="Commission highlights">
                                <div className="metric-item">
                                    <div>
                                        <span className="meta-label">Focus</span>
                                        <div className="metric-value">Gameplay Systems</div>
                                    </div>
                                    <div className="metric-note">LuaU<br />UI<br />Economy</div>
                                </div>
                                <div className="metric-item">
                                    <div>
                                        <span className="meta-label">Games</span>
                                        <div className="metric-value">2 Live Projects</div>
                                    </div>
                                    <div className="metric-note">Playable on<br />Roblox</div>
                                </div>
                                <div className="metric-item">
                                    <div>
                                        <span className="meta-label">Delivery</span>
                                        <div className="metric-value">After Full Payment</div>
                                    </div>
                                    <div className="metric-note">Release files only<br />after payment clears</div>
                                </div>
                            </aside>

                            <aside className="contact-card glass">
                                <span className="meta-label">Contact</span>
                                <div className="metric-value">Discord: <span className="mono">coaler1</span></div>
                                <p>
                                    Send your idea, budget, deadline, and the systems you need.
                                </p>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section reveal" id="status">
                <div className="status-strip">
                    <div className="status-card glass">
                        <span className="meta-label">Commission Status</span>
                        <div className="status-value">
                            <span className="status-dot"></span>
                            Open for Commissions
                        </div>
                        <p>Currently available for small systems, bug fixes, UI work, and custom Roblox gameplay features.</p>
                    </div>

                    <div className="status-card glass">
                        <span className="meta-label">Best Fit</span>
                        <div className="status-value">Scripted Systems</div>
                        <p>Shops, gamepasses, economy logic, leaderstats, datastores, rewards, and gameplay loops.</p>
                    </div>
                </div>
            </section>

            <section className="section reveal" id="games">
                <div className="section-head">
                    <div>
                        <div className="eyebrow-subtle">Featured work</div>
                        <h2>Games</h2>
                    </div>
                </div>

                <div className="games-grid">
                    <a className="game-card glass is-blue" href="https://www.roblox.com/games/106539620555081/Drop-My-Brainrot" target="_blank" rel="noreferrer">
                        <div className="card-top">
                            <div className="game-thumb">
                                <img src="DropMyBrainrot.png" alt="Drop My Brainrot Roblox thumbnail" />
                            </div>
                            <span className="pill">Live Roblox Experience</span>
                            <h3>Drop My Brainrot</h3>
                            <p>
                                Gameplay-focused Roblox project with live public access.
                            </p>
                        </div>
                        <div className="card-bottom">
                            <div className="stats">
                                <div className="stat">
                                    <span className="stat-value">Roblox</span>
                                    <span className="stat-label">Platform</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-value">Live</span>
                                    <span className="stat-label">Status</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-value">Gameplay</span>
                                    <span className="stat-label">Category</span>
                                </div>
                            </div>
                            <div className="card-link">Open Game Page</div>
                        </div>
                    </a>

                    <article className="game-card glass is-gold">
                        <div className="card-top">
                            <div className="game-thumb">
                                <video controls preload="metadata" src="Empire.mp4" />
                            </div>
                            <span className="pill">Template Showcase</span>
                            <h3>Build an Empire Template</h3>
                            <p>
                                Playable preview video for an empire-building Roblox template.
                            </p>
                        </div>
                        <div className="card-bottom">
                            <div className="stats">
                                <div className="stat">
                                    <span className="stat-value">Roblox</span>
                                    <span className="stat-label">Platform</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-value">Video</span>
                                    <span className="stat-label">Status</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-value">Template</span>
                                    <span className="stat-label">Category</span>
                                </div>
                            </div>
                            <div className="card-link">Watch Preview</div>
                        </div>
                    </article>

                    <article className="game-card glass is-gold">
                        <div className="card-top">
                            <div className="game-thumb">
                                <video controls preload="metadata" src="Poison.mp4" />
                            </div>
                            <span className="pill">Template Showcase</span>
                            <h3>Poison Template</h3>
                            <p>
                                Playable preview video for a poison-themed Roblox template.
                            </p>
                        </div>
                        <div className="card-bottom">
                            <div className="stats">
                                <div className="stat">
                                    <span className="stat-value">Roblox</span>
                                    <span className="stat-label">Platform</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-value">Video</span>
                                    <span className="stat-label">Status</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-value">Template</span>
                                    <span className="stat-label">Category</span>
                                </div>
                            </div>
                            <div className="card-link">Watch Preview</div>
                        </div>
                    </article>
                </div>
            </section>

            {reviewsSection}

            {pricingSection}

            <section className="section reveal" id="terms">
                <div className="section-head">
                    <div>
                        <div className="eyebrow-subtle">Commission Rules</div>
                        <h2>Terms of Service</h2>
                    </div>
                </div>

                <div className="terms-grid">
                    <div className="terms-card glass">
                        <h3>Payment</h3>
                        <p>Final product and source files are delivered after full payment.</p>
                    </div>

                    <div className="terms-card glass">
                        <h3>Roblox Tax</h3>
                        <p>Gamepass payments must cover Roblox tax so the agreed net amount arrives.</p>
                    </div>

                    <div className="terms-card glass">
                        <h3>Revisions</h3>
                        <p>Small scoped fixes are included. New features require a new quote.</p>
                    </div>

                    <div className="terms-card glass">
                        <h3>Client Requirements</h3>
                        <p>Provide brief, assets, access, deadline, and references before work starts.</p>
                    </div>
                </div>
            </section>

            <section className="section reveal" id="faq">
                <div className="section-head">
                    <div>
                        <div className="eyebrow-subtle">Questions</div>
                        <h2>FAQ</h2>
                    </div>
                </div>

                <div className="faq-grid">
                    <div className="terms-card glass">
                        <h3>Can I pay with Robux?</h3>
                        <p>Yes. Robux prices are based on DevEx value, and gamepass payments must cover Roblox tax.</p>
                    </div>

                    <div className="terms-card glass">
                        <h3>When do I get the files?</h3>
                        <p>The final product and source files are delivered after full payment has cleared.</p>
                    </div>

                    <div className="terms-card glass">
                        <h3>Do you fix bugs after delivery?</h3>
                        <p>Small scoped fixes are included. New features or bigger changes need a new quote.</p>
                    </div>

                    <div className="terms-card glass">
                        <h3>What should I send first?</h3>
                        <p>Send the idea, budget, deadline, examples, needed systems, and any assets or references.</p>
                    </div>
                </div>
            </section>

            {contactSection}
    </>
  );
}
