import { useEffect, useMemo, useState } from "react";
import { apps } from "./data/apps";

const navItems = [
  { href: "#apps", label: "Apps" },
  { href: "#principles", label: "Principles" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" }
];

const rangeHighlights = [
  {
    title: "Low Input By Design",
    body: "Setup is intentionally short. Most stores can install, configure, and start using each app quickly."
  },
  {
    title: "Set And Forget Defaults",
    body: "Core settings are pre-tuned to reduce decision fatigue and keep merchants focused on operations."
  },
  {
    title: "Productized, Not Bespoke",
    body: "autoApp is a product range with shared standards, update cycles, and support paths across all apps."
  }
];

const principles = [
  {
    title: "Solve One Pain Point Properly",
    body: "Each app is focused on a narrow, high-value workflow so merchants get value immediately."
  },
  {
    title: "Keep Controls Merchant Friendly",
    body: "Clear wording, sensible defaults, and minimal setup steps keep day-to-day use straightforward."
  },
  {
    title: "Ship Improvements Continuously",
    body: "Ratings, usage signals, and support feedback shape practical product updates over time."
  }
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const totalReviews = useMemo(
    () => apps.reduce((sum, app) => sum + app.reviews, 0),
    []
  );

  const averageRating = useMemo(() => {
    const weightedTotal = apps.reduce(
      (sum, app) => sum + app.rating * app.reviews,
      0
    );
    return (weightedTotal / totalReviews).toFixed(1);
  }, [totalReviews]);

  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -36px 0px"
      }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("hashchange", closeMenu);
    return () => window.removeEventListener("hashchange", closeMenu);
  }, []);

  return (
    <div className="site-shell" id="top">
      <div className="orb orb-one" aria-hidden="true" />
      <div className="orb orb-two" aria-hidden="true" />
      <div className="orb orb-three" aria-hidden="true" />

      <header className="top-nav">
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">OH</span>
          <span className="brand-text">
            <strong>Ollie Hermans</strong>
            <small>autoApp Range</small>
          </span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="nav-links"
          onClick={() => setMenuOpen((open) => !open)}
        >
          Menu
        </button>

        <nav id="nav-links" className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            className="button button-small"
            href="#apps"
            onClick={() => setMenuOpen(false)}
          >
            Browse Range
          </a>
        </nav>
      </header>

      <main>
        <section className="hero section">
          <div className="hero-copy reveal">
            <p className="eyebrow">Shopify Product Builder</p>
            <h1>
              autoApp is a range of simple Shopify apps built to be low input
              and just work.
            </h1>
            <p className="lead">
              I build and maintain my own Shopify apps under the autoApp range.
              The focus is practical automation, clear UX, and reliable default
              behavior for busy merchant teams.
            </p>
            <div className="app-pill-row">
              {apps.map((app) => (
                <span key={app.name}>{app.name.split("|")[0].trim()}</span>
              ))}
            </div>
            <div className="hero-actions">
              <a className="button" href="#apps">
                See The Apps
              </a>
              <a className="button button-ghost" href="#principles">
                How They Are Built
              </a>
            </div>
          </div>

          <aside className="hero-panel reveal" style={{ "--delay": "120ms" }}>
            <p className="hero-panel-label">autoApp Snapshot</p>
            <h2>Focused products with a productized-only model</h2>
            <div className="hero-metrics">
              <article>
                <span>Apps</span>
                <p>{apps.length}</p>
              </article>
              <article>
                <span>Reviews</span>
                <p>{totalReviews}+</p>
              </article>
              <article>
                <span>Avg. rating</span>
                <p>{averageRating}/5</p>
              </article>
            </div>
            <ul className="hero-bullets">
              <li>Built for clean onboarding and fast merchant adoption.</li>
              <li>Designed to reduce setup friction and maintenance load.</li>
              <li>Range-only focus with shared roadmap and support.</li>
            </ul>
          </aside>
        </section>

        <section className="section signal-row reveal">
          <article>
            <strong>{apps.length}</strong>
            <span>active apps in the range</span>
          </article>
          <article>
            <strong>{totalReviews}+</strong>
            <span>merchant reviews across products</span>
          </article>
          <article>
            <strong>{averageRating}/5</strong>
            <span>weighted average product rating</span>
          </article>
          <article>
            <strong>Low Input</strong>
            <span>setup model designed to just work</span>
          </article>
        </section>

        <section className="section highlight-grid" id="range">
          {rangeHighlights.map((item, index) => (
            <article
              className="highlight-card reveal"
              key={item.title}
              style={{ "--delay": `${index * 80}ms` }}
            >
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </section>

        <section className="section apps-panel" id="apps">
          <header className="section-head reveal">
            <p className="eyebrow">autoApp Portfolio</p>
            <h2>Live Shopify apps designed for practical everyday outcomes</h2>
            <p>
              Each app below is part of the autoApp range and available on the
              Shopify App Store.
            </p>
          </header>

          <div className="apps-grid">
            {apps.map((app, index) => (
              <article
                className="app-card reveal"
                key={app.name}
                style={{ "--delay": `${index * 70}ms` }}
              >
                <p className="app-index">
                  autoApp {String(index + 1).padStart(2, "0")}
                </p>
                <h3>{app.name}</h3>
                <p className="app-description">{app.description}</p>
                <p className="app-rating">
                  Rating: {app.rating.toFixed(1)} / 5 | {app.reviews} reviews
                </p>
                <div className="app-badges">
                  <span>{app.pricing}</span>
                  <span>{app.status}</span>
                  {app.builtForShopify && <span>Built for Shopify</span>}
                </div>
                <a href={app.url} target="_blank" rel="noreferrer">
                  Open In Shopify App Store
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section principles" id="principles">
          <header className="section-head reveal">
            <p className="eyebrow">Product Principles</p>
            <h2>How autoApp products stay simple and useful</h2>
          </header>
          <div className="principles-grid">
            {principles.map((item, index) => (
              <article
                className="principle-card reveal"
                key={item.title}
                style={{ "--delay": `${index * 90}ms` }}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section about" id="about">
          <article className="about-card reveal">
            <p className="eyebrow">About The Range</p>
            <h2>Independent Shopify app products with a low-noise philosophy</h2>
            <p>
              autoApp exists to give Shopify merchants dependable tools that
              are easy to adopt and easy to keep running.
            </p>
            <ul className="about-list">
              <li>Simple setup and merchant-safe defaults.</li>
              <li>Focused scope with clear job-to-be-done per app.</li>
              <li>Continuous product improvements from real usage feedback.</li>
              <li>One consistent product standard across the full range.</li>
            </ul>
          </article>
        </section>

        <section className="section contact" id="contact">
          <div className="contact-copy reveal">
            <p className="eyebrow">Contact</p>
            <h2>Questions, feedback, or product collaboration ideas?</h2>
            <p>
              Use this form for autoApp support, feature requests, and
              collaboration discussions.
            </p>
            <p className="contact-note">This inbox is for the autoApp range.</p>
            <div className="contact-links">
              <a href="mailto:hello@olliehermans.com">hello@olliehermans.com</a>
              <a href="https://olliehermans.com" target="_blank" rel="noreferrer">
                olliehermans.com
              </a>
            </div>
          </div>

          <form
            className="contact-form reveal"
            style={{ "--delay": "100ms" }}
            action="https://formsubmit.co/81cdcc0159da5217857d1aa484cb4331"
            method="POST"
          >
            <input type="hidden" name="_captcha" value="false" />
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" required />

            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />

            <label htmlFor="message">Support request, feedback, or idea</label>
            <textarea id="message" name="message" rows="5" required />

            <button className="button" type="submit">
              Send Message
            </button>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <p>autoApp range by Ollie Hermans.</p>
        <a href="#top">Back to top</a>
      </footer>
    </div>
  );
}

export default App;
