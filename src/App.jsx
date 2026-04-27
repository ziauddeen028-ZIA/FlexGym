import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   FLEX GYM — Brutalist Minimal Dark Theme
   Font: "Anton" (display) + "Outfit" (body)
   Accent: Neon Lime #C8FF00
───────────────────────────────────────────── */

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --black:   #080808;
    --dark:    #111111;
    --card:    #161616;
    --border:  #222222;
    --lime:    #C8FF00;
    --white:   #F5F5F5;
    --muted:   #666666;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--black);
    color: var(--white);
    font-family: 'Outfit', sans-serif;
    overflow-x: hidden;
    cursor: none;
  }

  /* custom cursor */
  .cursor {
    position: fixed;
    width: 10px; height: 10px;
    background: var(--lime);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease;
    mix-blend-mode: difference;
  }
  .cursor-ring {
    position: fixed;
    width: 36px; height: 36px;
    border: 1px solid var(--lime);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transition: all 0.3s ease;
    opacity: 0.5;
  }

  .display { font-family: 'Anton', sans-serif; letter-spacing: -0.01em; }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--black); }
  ::-webkit-scrollbar-thumb { background: var(--lime); }

  /* fade-up on scroll */
  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* hero text animation */
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-60px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .hero-line { animation: slideIn 0.9s cubic-bezier(0.22,1,0.36,1) forwards; opacity: 0; }
  .hero-line:nth-child(1) { animation-delay: 0.2s; }
  .hero-line:nth-child(2) { animation-delay: 0.4s; }
  .hero-line:nth-child(3) { animation-delay: 0.6s; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* nav link */
  .nav-link {
    color: var(--muted);
    text-decoration: none;
    font-size: 0.85rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-weight: 500;
    position: relative;
    transition: color 0.25s;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    left: 0; bottom: -3px;
    width: 0; height: 1px;
    background: var(--lime);
    transition: width 0.3s ease;
  }
  .nav-link:hover { color: var(--white); }
  .nav-link:hover::after { width: 100%; }

  /* lime pill button */
  .btn-lime {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--lime);
    color: var(--black);
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 14px 32px;
    border: none;
    cursor: none;
    transition: transform 0.2s, box-shadow 0.2s;
    text-decoration: none;
  }
  .btn-lime:hover {
    transform: scale(1.04);
    box-shadow: 0 0 30px rgba(200,255,0,0.35);
  }

  /* outline button */
  .btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: var(--lime);
    border: 1px solid var(--lime);
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 14px 32px;
    cursor: none;
    transition: all 0.25s;
    text-decoration: none;
  }
  .btn-outline:hover {
    background: var(--lime);
    color: var(--black);
    box-shadow: 0 0 24px rgba(200,255,0,0.3);
  }

  /* gallery hover */
  .gal-item {
    position: relative;
    overflow: hidden;
  }
  .gal-item img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    filter: brightness(0.65) grayscale(0.2);
    transition: transform 0.6s ease, filter 0.4s ease;
  }
  .gal-item:hover img {
    transform: scale(1.06);
    filter: brightness(0.9) grayscale(0);
  }
  .gal-item .gal-label {
    position: absolute;
    bottom: 16px; left: 16px;
    font-family: 'Anton', sans-serif;
    font-size: 0.9rem;
    letter-spacing: 0.12em;
    color: var(--lime);
    opacity: 0;
    transform: translateY(8px);
    transition: all 0.3s ease;
  }
  .gal-item:hover .gal-label {
    opacity: 1;
    transform: translateY(0);
  }

  /* feature card */
  .feat-card {
    border: 1px solid var(--border);
    background: var(--card);
    padding: 40px 32px;
    transition: border-color 0.3s, transform 0.3s;
    position: relative;
    overflow: hidden;
  }
  .feat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px; height: 0;
    background: var(--lime);
    transition: height 0.4s ease;
  }
  .feat-card:hover { border-color: #2a2a2a; transform: translateY(-4px); }
  .feat-card:hover::before { height: 100%; }

  /* number */
  .num {
    font-family: 'Anton', sans-serif;
    font-size: 5rem;
    color: rgba(200,255,0,0.07);
    line-height: 1;
    position: absolute;
    top: 16px; right: 20px;
    user-select: none;
  }

  /* WhatsApp */
  .wa {
    position: fixed;
    bottom: 28px; right: 28px;
    z-index: 500;
    background: #25D366;
    width: 54px; height: 54px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 24px rgba(37,211,102,0.45);
    cursor: none;
    transition: transform 0.2s;
    text-decoration: none;
  }
  .wa:hover { transform: scale(1.12); }

  @keyframes pingWa {
    0%   { transform: scale(1); opacity: 0.7; }
    100% { transform: scale(1.8); opacity: 0; }
  }
  .wa-ping {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: #25D366;
    animation: pingWa 2s ease-out infinite;
  }

  /* horizontal rule */
  .hr { height: 1px; background: var(--border); }

  /* mobile */
  @media (max-width: 768px) {
    body { cursor: auto; }
    .cursor, .cursor-ring { display: none; }
    body * { cursor: auto; }
    .btn-lime, .btn-outline, .wa { cursor: pointer; }
  }
`;

/* ── useReveal hook ───────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.15 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Custom Cursor ────────────────────────────────────── */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const move = e => {
      if (dot.current) { dot.current.style.left = e.clientX - 5 + "px"; dot.current.style.top = e.clientY - 5 + "px"; }
      if (ring.current) { ring.current.style.left = e.clientX - 18 + "px"; ring.current.style.top = e.clientY - 18 + "px"; }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={dot} className="cursor" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}

/* ── Navbar ───────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      padding: "0 5vw",
      height: 68,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(8,8,8,0.95)" : "transparent",
      borderBottom: scrolled ? "1px solid #1a1a1a" : "1px solid transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      transition: "all 0.4s ease",
    }}>
      {/* Logo */}
      <a href="#home" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: 2 }}>
        <span className="display" style={{ fontSize: "1.5rem", color: "var(--white)" }}>FLEX</span>
        <span className="display" style={{ fontSize: "1.5rem", color: "var(--lime)" }}>GYM</span>
      </a>

      {/* Links */}
      <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
        <a href="#home" className="nav-link">Home</a>
        <a href="#contact" className="nav-link">Contact</a>
        <a href="#contact" className="btn-lime" style={{ padding: "10px 22px", fontSize: "0.78rem" }}>Join Now</a>
      </div>
    </nav>
  );
}

/* ── Hero ─────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="home" style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden" }}>
      {/* BG Image */}
      <img
        src="https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=1800&q=85"
        alt="Gym"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center 30%",
          filter: "brightness(0.35)",
        }}
      />

      {/* overlay gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.2) 60%, transparent 100%)",
      }}/>

      {/* noise grain */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize: "200px",
      }}/>

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2,
        height: "100%",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "0 5vw",
        maxWidth: 900,
      }}>
        {/* eyebrow */}
        <div className="hero-line" style={{
          display: "flex", alignItems: "center", gap: 12, marginBottom: 24,
        }}>
          <div style={{ width: 32, height: 1, background: "var(--lime)" }}/>
          <span style={{ fontSize: "0.78rem", letterSpacing: "0.2em", color: "var(--lime)", textTransform: "uppercase", fontWeight: 500 }}>
            Chennai's Elite Gym
          </span>
        </div>

        <h1 className="display hero-line" style={{ fontSize: "clamp(5rem, 14vw, 11rem)", lineHeight: 0.88, color: "var(--white)" }}>
          NO
        </h1>
        <h1 className="display hero-line" style={{ fontSize: "clamp(5rem, 14vw, 11rem)", lineHeight: 0.88, color: "var(--lime)" }}>
          PAIN
        </h1>
        <h1 className="display hero-line" style={{ fontSize: "clamp(5rem, 14vw, 11rem)", lineHeight: 0.88, color: "var(--white)", marginBottom: 36 }}>
          NO GAIN
        </h1>

        <p style={{
          fontSize: "1rem", color: "rgba(245,245,245,0.55)", maxWidth: 380, lineHeight: 1.8,
          fontWeight: 300,
          animation: "fadeUp 0.8s ease 0.9s forwards", opacity: 0,
        }}>
          Forge your limits. Our elite facility gives you everything to become unstoppable.
        </p>

        <div style={{
          display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap",
          animation: "fadeUp 0.8s ease 1.1s forwards", opacity: 0,
        }}>
          <a href="#contact" className="btn-lime">Join Now →</a>
          <a href="#features" className="btn-outline">See Programs</a>
        </div>
      </div>

      {/* scroll indicator */}
      <div style={{
        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        animation: "fadeUp 1s ease 1.4s forwards", opacity: 0, zIndex: 2,
      }}>
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.18em", color: "var(--muted)", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, var(--lime), transparent)" }}/>
      </div>
    </section>
  );
}

/* ── About ────────────────────────────────────────────── */
function About() {
  useReveal();
  return (
    <section style={{ padding: "120px 5vw", background: "var(--black)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div className="reveal">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <div style={{ width: 24, height: 1, background: "var(--lime)" }}/>
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--lime)", textTransform: "uppercase" }}>About Us</span>
          </div>
          <h2 className="display" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: 0.92, marginBottom: 32 }}>
            BUILT FOR<br/><span style={{ color: "var(--lime)" }}>ATHLETES</span>
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.9, fontSize: "0.95rem", fontWeight: 300 }}>
            Fitness is not just a routine — it's an identity. At FLEX GYM, we've built a space where discipline meets design, where every rep counts, and every member belongs.
          </p>
          <p style={{ color: "var(--muted)", lineHeight: 1.9, fontSize: "0.95rem", fontWeight: 300, marginTop: 16 }}>
            Premium equipment. Expert guidance. Zero excuses.
          </p>
        </div>

        {/* Visual stat block */}
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          {[["500+", "Members"], ["8", "Years", "Active"], ["15+", "Trainers"], ["24/7", "Support"]].map(([num, label], i) => (
            <div key={i} style={{
              background: i === 0 ? "var(--lime)" : "var(--card)",
              padding: "36px 28px",
              borderTop: "1px solid var(--border)",
              borderLeft: i % 2 === 1 ? "1px solid var(--border)" : "none",
            }}>
              <div className="display" style={{ fontSize: "3rem", color: i === 0 ? "var(--black)" : "var(--white)", lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: "0.8rem", color: i === 0 ? "rgba(0,0,0,0.6)" : "var(--muted)", marginTop: 8, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){#about-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

/* ── Features ─────────────────────────────────────────── */
function Features() {
  const items = [
    { n: "01", icon: "⚡", title: "Modern Equipment", desc: "Premium machines and free weights, meticulously maintained. The tools to build the physique you want." },
    { n: "02", icon: "🎯", title: "Expert Trainers", desc: "Internationally certified coaches who build programmes around you — not templates." },
    { n: "03", icon: "🕐", title: "Flexible Timing", desc: "Open 5 AM to 11 PM, 365 days. Fit your workouts into life, not the other way around." },
  ];

  return (
    <section id="features" style={{ padding: "120px 5vw", background: "var(--dark)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 24, height: 1, background: "var(--lime)" }}/>
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--lime)", textTransform: "uppercase" }}>What We Offer</span>
          </div>
          <h2 className="display" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", lineHeight: 0.9 }}>
            WHY FLEX<span style={{ color: "var(--lime)" }}>.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {items.map((f, i) => (
            <div key={f.n} className={`feat-card reveal`} style={{ transitionDelay: `${i * 0.12}s` }}>
              <span className="num">{f.n}</span>
              <div style={{ fontSize: "1.8rem", marginBottom: 24 }}>{f.icon}</div>
              <h3 className="display" style={{ fontSize: "1.6rem", marginBottom: 16, lineHeight: 1 }}>{f.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.8, fontWeight: 300 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:768px){#features .feat-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

/* ── Gallery ──────────────────────────────────────────── */
const IMGS = [
  { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=80", label: "STRENGTH", rows: 2 },
  { src: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=700&q=80", label: "CARDIO" },
  { src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=700&q=80", label: "YOGA" },
  { src: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=700&q=80", label: "FUNCTIONAL", cols: 2 },
];

function Gallery() {
  return (
    <section style={{ padding: "120px 5vw", background: "var(--black)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 64, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 24, height: 1, background: "var(--lime)" }}/>
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--lime)", textTransform: "uppercase" }}>Gallery</span>
            </div>
            <h2 className="display" style={{ fontSize: "clamp(3rem, 7vw, 5rem)", lineHeight: 0.92 }}>
              FEEL THE<br/><span style={{ color: "var(--lime)" }}>ENERGY</span>
            </h2>
          </div>
          <p style={{ color: "var(--muted)", fontSize: "0.9rem", maxWidth: 260, lineHeight: 1.7, fontWeight: 300 }}>
            Step inside. Every corner is designed to push you further.
          </p>
        </div>

        {/* Grid */}
        <div className="reveal" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "220px 220px",
          gap: 4,
        }}>
          {/* Large left image */}
          <div className="gal-item" style={{ gridRow: "span 2" }}>
            <img src={IMGS[0].src} alt="Strength training" style={{ height: "100%" }} />
            <span className="gal-label">{IMGS[0].label}</span>
          </div>
          {/* Top middle */}
          <div className="gal-item">
            <img src={IMGS[1].src} alt="Cardio" />
            <span className="gal-label">{IMGS[1].label}</span>
          </div>
          {/* Top right */}
          <div className="gal-item">
            <img src={IMGS[2].src} alt="Yoga" />
            <span className="gal-label">{IMGS[2].label}</span>
          </div>
          {/* Bottom spanning 2 cols */}
          <div className="gal-item" style={{ gridColumn: "span 2" }}>
            <img src={IMGS[3].src} alt="Functional" />
            <span className="gal-label">{IMGS[3].label}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA Banner ───────────────────────────────────────── */
function CTABanner() {
  return (
    <section style={{
      padding: "100px 5vw",
      background: "var(--lime)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* big ghost text */}
      <div className="display" style={{
        position: "absolute",
        right: "-2vw", top: "50%", transform: "translateY(-50%)",
        fontSize: "clamp(6rem, 20vw, 16rem)",
        color: "rgba(0,0,0,0.07)",
        lineHeight: 1, userSelect: "none", pointerEvents: "none",
        whiteSpace: "nowrap",
      }}>FLEX</div>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <h2 className="display reveal" style={{
          fontSize: "clamp(3rem, 8vw, 6.5rem)",
          color: "var(--black)",
          lineHeight: 0.9,
          maxWidth: 700,
          marginBottom: 40,
        }}>
          START YOUR FITNESS JOURNEY TODAY
        </h2>
        <a href="#contact" className="reveal" style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          background: "var(--black)",
          color: "var(--lime)",
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 600,
          fontSize: "0.85rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          padding: "16px 36px",
          textDecoration: "none",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
        >Contact Us →</a>
      </div>
    </section>
  );
}

/* ── Contact ──────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" style={{ padding: "120px 5vw", background: "var(--dark)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 72 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ width: 24, height: 1, background: "var(--lime)" }}/>
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.2em", color: "var(--lime)", textTransform: "uppercase" }}>Find Us</span>
          </div>
          <h2 className="display" style={{ fontSize: "clamp(3rem, 7vw, 5rem)", lineHeight: 0.92 }}>
            GET IN<br/><span style={{ color: "var(--lime)" }}>TOUCH</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          {/* Left — info */}
          <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { label: "Phone", value: "+91 9876543210", sub: "Call or WhatsApp anytime" },
              { label: "Location", value: "Chennai, Tamil Nadu", sub: "Anna Nagar, 600040" },
              { label: "Hours", value: "5 AM – 11 PM", sub: "Open 365 days" },
            ].map((item, i) => (
              <div key={item.label} style={{
                padding: "36px 40px",
                background: "var(--card)",
                borderBottom: i < 2 ? "1px solid var(--border)" : "none",
              }}>
                <div style={{ fontSize: "0.7rem", color: "var(--lime)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>{item.label}</div>
                <div className="display" style={{ fontSize: "1.8rem", marginBottom: 6 }}>{item.value}</div>
                <div style={{ fontSize: "0.82rem", color: "var(--muted)" }}>{item.sub}</div>
              </div>
            ))}
          </div>

          {/* Right — message form */}
          <div className="reveal" style={{ background: "var(--card)", padding: "48px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
            <div className="display" style={{ fontSize: "1.4rem", color: "var(--lime)" }}>SEND A MESSAGE</div>
            {["Name", "Email"].map(f => (
              <div key={f}>
                <label style={{ fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: 10 }}>{f}</label>
                <input
                  type={f === "Email" ? "email" : "text"}
                  placeholder={f === "Name" ? "Your full name" : "you@example.com"}
                  style={{
                    width: "100%", background: "var(--black)",
                    border: "1px solid var(--border)", color: "var(--white)",
                    padding: "14px 16px", fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem",
                    outline: "none", transition: "border-color 0.25s",
                  }}
                  onFocus={e => e.target.style.borderColor = "var(--lime)"}
                  onBlur={e => e.target.style.borderColor = "var(--border)"}
                />
              </div>
            ))}
            <div>
              <label style={{ fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase", display: "block", marginBottom: 10 }}>Message</label>
              <textarea
                placeholder="I'd like to join FLEX GYM..."
                rows={4}
                style={{
                  width: "100%", background: "var(--black)",
                  border: "1px solid var(--border)", color: "var(--white)",
                  padding: "14px 16px", fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem",
                  outline: "none", resize: "vertical", transition: "border-color 0.25s",
                }}
                onFocus={e => e.target.style.borderColor = "var(--lime)"}
                onBlur={e => e.target.style.borderColor = "var(--border)"}
              />
            </div>
            <button className="btn-lime" style={{ alignSelf: "flex-start" }}>Send →</button>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){#contact-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "var(--black)", borderTop: "1px solid var(--border)", padding: "40px 5vw" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
          <span className="display" style={{ fontSize: "1.2rem", color: "var(--white)" }}>FLEX</span>
          <span className="display" style={{ fontSize: "1.2rem", color: "var(--lime)" }}>GYM</span>
        </div>
        <span style={{ color: "var(--muted)", fontSize: "0.8rem" }}>© 2024 FlexGym, Chennai. All rights reserved.</span>
        <div style={{ display: "flex", gap: 28 }}>
          {["Instagram", "Twitter", "Facebook"].map(s => (
            <a key={s} href="#" style={{ color: "var(--muted)", textDecoration: "none", fontSize: "0.78rem", letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.2s" }}
               onMouseEnter={e => e.target.style.color = "var(--lime)"}
               onMouseLeave={e => e.target.style.color = "var(--muted)"}>{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ── WhatsApp Float ───────────────────────────────────── */
function WAFloat() {
  return (
    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="wa">
      <div className="wa-ping" />
      <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413"/>
      </svg>
    </a>
  );
}

/* ── App ──────────────────────────────────────────────── */
export default function App() {
  useReveal();

  return (
    <>
      <style>{STYLES}</style>
      <Cursor />
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Gallery />
      <CTABanner />
      <Contact />
      <Footer />
      <WAFloat />
    </>
  );
}
