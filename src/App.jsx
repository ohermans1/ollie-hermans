import { useEffect, useMemo, useState } from "react";
import portraitImage from "./assets/ollie-and-maisie.webp";
import { apps } from "./data/apps";

const navItems = [
  { href: "#apps", label: "Apps" },
  { href: "#approach", label: "Approach" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" }
];

const capabilityItems = [
  {
    title: "Practical Product Thinking",
    body: "Every app solves a clear merchant problem first, not just a technical challenge."
  },
  {
    title: "Fast Iteration Loops",
    body: "Ship quickly, monitor how merchants use the app, then improve where it matters."
  },
  {
    title: "Clean Shopify Execution",
    body: "Reliable architecture, straightforward onboarding, and low-friction store integration."
  }
];

const approachItems = [
  {
    title: "Understand The Workflow",
    body: "Map the merchant task, conversion risk, and handoff points before building."
  },
  {
    title: "Build For Merchant Speed",
    body: "Keep setup simple, remove noise, and make value obvious in the first session."
  },
  {
    title: "Measure Real Outcomes",
    body: "Use ratings, adoption, and retention signals to prioritize future updates."
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
        threshold: 0.2,
        rootMargin: "0px 0px -30px 0px"
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
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="top-nav">
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">OH</span>
          <span className="brand-text">
            <strong>Ollie Hermans</strong>
            <small>Shopify App Expert</small>
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
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Work With Ollie
          </a>
        </nav>
      </header>

      <main>
        <section className="hero-layout section">
          <div className="hero-copy reveal">
            <p className="eyebrow">Shopify App Portfolio</p>
            <h1>
              Modern Shopify apps designed to save time, improve SEO, and help
              merchants scale with confidence.
            </h1>
            <p className="lead">
              I build practical Shopify apps focused on real operator workflows:
              faster content production, stronger SEO structure, better
              conversion support, and cleaner stock management.
            </p>
            <div className="hero-actions">
              <a className="button" href="#apps">
                Explore The Apps
              </a>
              <a className="button button-ghost" href="#contact">
                Start A Conversation
              </a>
            </div>
            <ul className="hero-points">
              <li>Purpose-built for merchant outcomes, not feature bloat.</li>
              <li>Focused on automation, discoverability, and clean UX.</li>
              <li>Backed by live App Store ratings and ongoing iteration.</li>
            </ul>
          </div>

          <aside className="hero-card reveal" style={{ "--delay": "120ms" }}>
            <div className="hero-image-wrap">
              <img src={portraitImage} alt="Ollie Hermans" />
            </div>
            <div className="hero-card-copy">
              <h2>Ollie Hermans</h2>
              <p>Helping Shopify brands grow through useful app products.</p>
            </div>
            <div className="hero-tags">
              <span>Shopify Apps</span>
              <span>AI SEO</span>
              <span>Merchant Workflows</span>
            </div>
          </aside>
        </section>

        <section className="section stats reveal">
          <article>
            <p>{apps.length}</p>
            <span>Live Shopify apps</span>
          </article>
          <article>
            <p>{totalReviews}+</p>
            <span>Total App Store reviews</span>
          </article>
          <article>
            <p>{averageRating} / 5</p>
            <span>Weighted average rating</span>
          </article>
        </section>

        <section className="section capabilities">
          {capabilityItems.map((item, index) => (
            <article
              className="capability-card reveal"
              key={item.title}
              style={{ "--delay": `${index * 70}ms` }}
            >
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </section>

        <section className="section apps-panel" id="apps">
          <header className="section-head reveal">
            <p className="eyebrow">The App Collection</p>
            <h2>Focused apps solving high-impact ecommerce bottlenecks</h2>
            <p>
              Everything below is live on the Shopify App Store and built with
              a simple goal: deliver practical value quickly for real merchants.
            </p>
          </header>

          <div className="apps-grid">
            {apps.map((app, index) => (
              <article
                className="app-card reveal"
                key={app.name}
                style={{ "--delay": `${index * 70}ms` }}
              >
                <p className="app-index">App {String(index + 1).padStart(2, "0")}</p>
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

        <section className="section approach" id="approach">
          <header className="section-head reveal">
            <p className="eyebrow">How I Build</p>
            <h2>Simple process with product discipline</h2>
          </header>
          <div className="approach-grid">
            {approachItems.map((item, index) => (
              <article
                className="approach-card reveal"
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
            <p className="eyebrow">About Ollie</p>
            <h2>Commerce context plus hands-on execution</h2>
            <p>
              I focus on the intersection of product usability and business
              outcome. That means app ideas are shaped by how merchants
              actually run their stores, not by trend-driven complexity.
            </p>
            <p>
              The result is a portfolio of lean, practical apps that solve real
              friction points and keep improving over time.
            </p>
          </article>
        </section>

        <section className="section contact" id="contact">
          <div className="contact-copy reveal">
            <p className="eyebrow">Contact</p>
            <h2>Need a Shopify app partner that can move fast?</h2>
            <p>
              If you are looking to improve your store operations, SEO, or
              conversion support with focused app products, I can help.
            </p>
            <div className="contact-links">
              <a href="mailto:hello@olliehermans.com">hello@olliehermans.com</a>
              <a href="https://www.olliehermans.com" target="_blank" rel="noreferrer">
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

            <label htmlFor="message">What are you building?</label>
            <textarea id="message" name="message" rows="5" required />

            <button className="button" type="submit">
              Send Message
            </button>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <p>Built for Ollie Hermans - Shopify app expert.</p>
        <a href="#top">Back to top</a>
      </footer>
    </div>
  );
}

export default App;
