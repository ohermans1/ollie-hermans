import { useEffect, useMemo, useState } from "react";
import { apps } from "./data/apps";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#apps", label: "Apps" },
  { href: "#principles", label: "Approach" },
  { href: "#contact", label: "Contact" }
];

const focusAreas = [
  {
    title: "Product + Engineering In One Loop",
    body: "I define the product direction, design the UX flow, and ship production code myself."
  },
  {
    title: "Built For Merchant Reality",
    body: "Every decision is shaped by actual store workflows, not abstract feature checklists."
  },
  {
    title: "Reliable, Low-Maintenance Delivery",
    body: "I optimize for clean onboarding, stable behavior, and updates that do not create noise."
  }
];

const principles = [
  {
    title: "Keep Setup Light",
    body: "Most value should appear quickly, without long configuration sessions."
  },
  {
    title: "Design For Clarity",
    body: "Interfaces should be obvious at first glance and safe for non-technical teams."
  },
  {
    title: "Iterate From Real Usage",
    body: "Ratings, support patterns, and adoption data drive what gets improved next."
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
        threshold: 0.15,
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
      <div className="halo halo-one" aria-hidden="true" />
      <div className="halo halo-two" aria-hidden="true" />

      <header className="top-nav">
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">OH</span>
          <span className="brand-text">
            <strong>Ollie Hermans</strong>
            <small>Shopify App Developer</small>
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
          <a className="btn btn-small" href="#apps" onClick={() => setMenuOpen(false)}>
            View Apps
          </a>
        </nav>
      </header>

      <main>
        <section className="section hero">
          <div className="hero-main reveal">
            <p className="eyebrow">Independent Shopify Developer</p>
            <h1>
              I am Ollie Hermans. I build Shopify apps that are clean, practical,
              and genuinely easy to use.
            </h1>
            <p className="lead">
              My work is developer-led and product-first. I focus on creating
              dependable apps with low setup input, clear UI, and real merchant
              value from day one.
            </p>
            <div className="hero-actions">
              <a className="btn" href="#apps">
                Explore App Portfolio
              </a>
              <a className="btn btn-ghost" href="#contact">
                Contact Ollie
              </a>
            </div>
            <div className="hero-tags">
              <span>Shopify Ecosystem</span>
              <span>Product Engineering</span>
              <span>Low Input UX</span>
            </div>
          </div>

          <aside className="profile-card reveal" style={{ "--delay": "120ms" }}>
            <p className="profile-card-eyebrow">Developer Snapshot</p>
            <h2>Building and maintaining apps as long-term products</h2>
            <div className="stat-grid">
              <article>
                <span>Apps</span>
                <strong>{apps.length}</strong>
              </article>
              <article>
                <span>Reviews</span>
                <strong>{totalReviews}+</strong>
              </article>
              <article>
                <span>Avg. rating</span>
                <strong>{averageRating}/5</strong>
              </article>
            </div>
            <ul className="profile-list">
              <li>Owns product direction, implementation, and release quality.</li>
              <li>Builds for simple setup and low operational overhead.</li>
              <li>Maintains an active roadmap with practical iteration cycles.</li>
            </ul>
          </aside>
        </section>

        <section className="section about" id="about">
          <header className="section-head reveal">
            <p className="eyebrow">About Ollie</p>
            <h2>Developer-first execution with a strong product lens</h2>
            <p>
              I work at the intersection of product thinking and engineering
              detail. Instead of chasing complex feature sets, I focus on apps
              that feel immediate, stable, and useful in daily store operations.
            </p>
          </header>

          <div className="focus-grid">
            {focusAreas.map((item, index) => (
              <article
                className="focus-card reveal"
                key={item.title}
                style={{ "--delay": `${index * 80}ms` }}
              >
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section apps" id="apps">
          <header className="section-head reveal">
            <p className="eyebrow">App Portfolio</p>
            <h2>Apps I have built for Shopify merchants</h2>
            <p>
              This is my current live portfolio on the Shopify App Store, with
              merchant feedback and ratings visible for each product.
            </p>
          </header>

          <div className="apps-grid">
            {apps.map((app, index) => {
              const [title, subtitle] = app.name
                .split("|")
                .map((part) => part.trim());

              return (
                <article
                  className="app-card reveal"
                  key={app.name}
                  style={{ "--delay": `${index * 70}ms` }}
                >
                  <p className="app-number">App {String(index + 1).padStart(2, "0")}</p>
                  <h3>{title}</h3>
                  {subtitle && <p className="app-subtitle">{subtitle}</p>}
                  <p className="app-description">{app.description}</p>
                  <p className="app-rating">
                    {app.rating.toFixed(1)} / 5 rating from {app.reviews} reviews
                  </p>
                  <div className="app-badges">
                    <span>{app.pricing}</span>
                    <span>{app.status}</span>
                    {app.builtForShopify && <span>Built for Shopify</span>}
                  </div>
                  <a href={app.url} target="_blank" rel="noreferrer">
                    Open in Shopify App Store
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section principles" id="principles">
          <header className="section-head reveal">
            <p className="eyebrow">Approach</p>
            <h2>How I think about app quality</h2>
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

        <section className="section contact" id="contact">
          <div className="contact-copy reveal">
            <p className="eyebrow">Contact</p>
            <h2>Want to talk about the apps or product direction?</h2>
            <p>
              Reach out for product feedback, partnership opportunities, or
              questions about any app in the portfolio.
            </p>
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

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" required />

            <button className="btn" type="submit">
              Send Message
            </button>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <p>Built by Ollie Hermans.</p>
        <a href="#top">Back to top</a>
      </footer>
    </div>
  );
}

export default App;
