import { useState, useEffect, useRef } from "react";
 
/* ─── Font + Global CSS injection ────────────────────────────────────────── */
function GlobalStyles() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap";
    document.head.appendChild(link);
 
    const s = document.createElement("style");
    s.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; font-size: 16px; }
      body { background: #0a0a0a; color: #fff; overflow-x: hidden; }
      ::selection { background: #c8ff00; color: #000; }
 
      @keyframes marquee {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-8px); }
      }
 
      .nav-link {
        color: rgba(255,255,255,0.5);
        text-decoration: none;
        font-family: 'DM Sans', sans-serif;
        font-size: 0.8rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        transition: color 0.25s;
      }
      .nav-link:hover { color: #c8ff00; }
 
      .btn-primary {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: #c8ff00;
        color: #000;
        font-family: 'Oswald', sans-serif;
        font-weight: 600;
        font-size: 0.85rem;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        padding: 0.9rem 2.2rem;
        border: none;
        cursor: pointer;
        text-decoration: none;
        clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
        transition: background 0.2s, transform 0.2s;
      }
      .btn-primary:hover { background: #d6ff33; transform: translateY(-2px); }
 
      .btn-outline {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: transparent;
        color: #fff;
        font-family: 'Oswald', sans-serif;
        font-weight: 500;
        font-size: 0.85rem;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        padding: 0.9rem 2.2rem;
        border: 1px solid rgba(255,255,255,0.25);
        cursor: pointer;
        text-decoration: none;
        clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px));
        transition: border-color 0.2s, color 0.2s, transform 0.2s;
      }
      .btn-outline:hover { border-color: #c8ff00; color: #c8ff00; transform: translateY(-2px); }
 
      .section-tag {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-family: 'DM Sans', sans-serif;
        font-size: 0.7rem;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        color: #c8ff00;
        margin-bottom: 1.2rem;
      }
      .section-tag::before {
        content: '';
        display: block;
        width: 24px; height: 1px;
        background: #c8ff00;
      }
 
      @media (max-width: 768px) {
        .hide-mobile { display: none !important; }
        .show-mobile { display: flex !important; }
        .grid-2 { grid-template-columns: 1fr !important; gap: 3rem !important; }
        .grid-3 { grid-template-columns: 1fr !important; }
        .gallery-grid {
          grid-template-columns: 1fr 1fr !important;
          grid-template-rows: 200px 200px !important;
        }
        .gallery-grid > div:first-child { grid-row: auto !important; }
        .hero-pad { padding-left: 2rem !important; }
      }
    `;
    document.head.appendChild(s);
    return () => { document.head.removeChild(link); document.head.removeChild(s); };
  }, []);
  return null;
}
 
/* ─── Intersection fade-in ───────────────────────────────────────────────── */
function Reveal({ children, delay = 0, style = {}, className = "" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}
 
/* ─── Navbar ─────────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
 
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      padding: "0 2.5rem",
      background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(200,255,0,0.07)" : "none",
      transition: "all 0.4s",
      height: "72px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <a href="#home" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div style={{
          width: "30px", height: "30px", background: "#c8ff00",
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "0.7rem", color: "#000" }}>F</span>
        </div>
        <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "1.35rem", letterSpacing: "0.1em", color: "#fff" }}>
          FLEX<span style={{ color: "#c8ff00" }}>GYM</span>
        </span>
      </a>
 
      <nav className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
        {["Home","About","Gallery","Contact"].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
        ))}
      </nav>
 
      <div className="hide-mobile" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>
          +91 9876543210
        </span>
        <a href="#contact" className="btn-primary" style={{ padding: "0.6rem 1.4rem", fontSize: "0.78rem" }}>Join Now</a>
      </div>
 
      <button className="show-mobile" onClick={() => setOpen(!open)} style={{
        display: "none", flexDirection: "column", gap: "5px",
        background: "none", border: "none", cursor: "pointer",
      }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ width: i===2?"16px":"24px", height:"2px", background:"#c8ff00" }} />
        ))}
      </button>
 
      {open && (
        <div style={{
          position: "absolute", top: "72px", left: 0, right: 0,
          background: "#0d0d0d", borderTop: "1px solid rgba(200,255,0,0.1)",
          padding: "2rem 2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem",
        }}>
          {["Home","About","Gallery","Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" onClick={() => setOpen(false)}
              style={{ fontSize: "1.2rem" }}>{l}</a>
          ))}
          <a href="#contact" className="btn-primary" onClick={() => setOpen(false)} style={{ textAlign: "center", justifyContent: "center" }}>
            Join Now
          </a>
        </div>
      )}
    </header>
  );
}
 
/* ─── Marquee strip ──────────────────────────────────────────────────────── */
function Marquee({ items, speed = 30, bg = "#c8ff00", color = "#000" }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ background: bg, overflow: "hidden", padding: "0.75rem 0" }}>
      <div style={{
        display: "flex", gap: "3rem", width: "max-content", whiteSpace: "nowrap",
        animation: `marquee ${speed}s linear infinite`,
      }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: "'Oswald',sans-serif", fontWeight: 600,
            fontSize: "0.78rem", letterSpacing: "0.2em", textTransform: "uppercase", color,
            display: "flex", alignItems: "center", gap: "1.5rem",
          }}>
            {item} <span style={{ opacity: 0.35 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
 
/* ─── Hero ───────────────────────────────────────────────────────────────── */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 100); return () => clearTimeout(t); }, []);
 
  return (
    <section id="home" style={{ position: "relative", height: "100vh", minHeight: "660px", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url(https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1800&q=80)",
        backgroundSize: "cover", backgroundPosition: "center 30%",
        filter: "brightness(0.25) contrast(1.1)",
        transform: "scale(1.04)",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "50%",
        background: "linear-gradient(to top, #0a0a0a, transparent)",
      }} />
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: "3px", background: "#c8ff00",
        boxShadow: "0 0 30px rgba(200,255,0,0.7)",
      }} />
 
      {/* Right side stats */}
      <div className="hide-mobile" style={{
        position: "absolute", right: "2.5rem", top: "50%",
        transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", gap: "2.5rem", alignItems: "flex-end",
        opacity: loaded ? 1 : 0, transition: "opacity 1.1s ease 0.9s",
      }}>
        {[["500+","Members"],["12+","Trainers"],["5 AM","Opens"]].map(([n,l]) => (
          <div key={l} style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "1.6rem", color: "#c8ff00" }}>{n}</div>
            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>{l}</div>
          </div>
        ))}
      </div>
 
      {/* Content */}
      <div className="hero-pad" style={{
        position: "relative", height: "100%",
        display: "flex", flexDirection: "column", justifyContent: "center",
        paddingLeft: "5rem", paddingRight: "2.5rem", maxWidth: "860px",
      }}>
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(30px)",
          transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
        }}>
          <div className="section-tag" style={{ marginBottom: "1.5rem" }}>
            Chennai&apos;s #1 Fitness Club
          </div>
          <h1 style={{
            fontFamily: "'Oswald',sans-serif", fontWeight: 700,
            fontSize: "clamp(4.5rem, 11vw, 9.5rem)",
            lineHeight: 0.9, letterSpacing: "0.02em", textTransform: "uppercase", color: "#fff",
          }}>
            NO<br />
            <span style={{ color: "#c8ff00", textShadow: "0 0 60px rgba(200,255,0,0.35)" }}>PAIN</span>
            <br />
            <span style={{
              WebkitTextStroke: "1.5px rgba(255,255,255,0.25)",
              color: "transparent",
            }}>NO GAIN</span>
          </h1>
        </div>
 
        <div style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.9s ease 0.55s",
        }}>
          <div style={{ width: "56px", height: "2px", background: "#c8ff00", margin: "2rem 0", boxShadow: "0 0 10px rgba(200,255,0,0.5)" }} />
          <p style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
            color: "rgba(255,255,255,0.45)",
            maxWidth: "380px", lineHeight: 1.8, marginBottom: "2.5rem",
          }}>
            Transform your body. Elevate your mind.<br />
            Become the strongest version of yourself.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#contact" className="btn-primary">
              Start Training
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#about" className="btn-outline">Explore</a>
          </div>
        </div>
      </div>
 
      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
        opacity: 0.35, animation: "float 2.4s ease-in-out infinite",
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>
  );
}
 
/* ─── About ──────────────────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" style={{ background: "#0a0a0a", padding: "8rem 2.5rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
 
          {/* Image column */}
          <Reveal style={{ position: "relative" }}>
            <div style={{
              aspectRatio: "3/4", overflow: "hidden",
              clipPath: "polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)",
            }}>
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=700&q=80"
                alt="Training"
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.8) saturate(0.9)" }}
              />
              <div style={{ position: "absolute", top: 0, right: 0, width: "60px", height: "4px", background: "#c8ff00", boxShadow: "0 0 16px rgba(200,255,0,0.5)" }} />
              <div style={{ position: "absolute", top: 0, right: 0, width: "4px", height: "60px", background: "#c8ff00", boxShadow: "0 0 16px rgba(200,255,0,0.5)" }} />
            </div>
            {/* Stat card */}
            <div style={{
              position: "absolute", bottom: "-1.5rem", right: "-1.5rem",
              background: "#c8ff00", padding: "1.4rem 1.8rem",
              clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
            }}>
              <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "2.4rem", color: "#000", lineHeight: 1 }}>7+</div>
              <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#000", opacity: 0.65 }}>Years Strong</div>
            </div>
          </Reveal>
 
          {/* Text column */}
          <div>
            <Reveal>
              <div className="section-tag">About Flex Gym</div>
              <h2 style={{
                fontFamily: "'Oswald',sans-serif", fontWeight: 700,
                fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                lineHeight: 1, textTransform: "uppercase", color: "#fff", marginBottom: "1.5rem",
              }}>
                Built for those who<br /><span style={{ color: "#c8ff00" }}>refuse to settle</span>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.85, marginBottom: "1.2rem" }}>
                Flex Gym is Chennai's most dedicated fitness space — where science-backed training meets raw intensity. We don't just build bodies; we forge discipline, resilience, and confidence.
              </p>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.95rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.85, marginBottom: "2.5rem" }}>
                Whether you're a beginner or a seasoned athlete, our expert coaches and world-class facilities are here to push your limits every single day.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
                {[["500+","Members"],["12+","Coaches"],["3","Locations"]].map(([n,l]) => (
                  <div key={l}>
                    <div style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "2rem", color: "#c8ff00" }}>{n}</div>
                    <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
 
/* ─── Features ───────────────────────────────────────────────────────────── */
const FEATURES = [
  { num: "01", icon: "⚡", title: "Modern Equipment", body: "World-class machines and free weights curated for every training style and fitness goal." },
  { num: "02", icon: "🏆", title: "Expert Trainers", body: "Certified coaches who craft personalised programs to maximise your results safely." },
  { num: "03", icon: "🕐", title: "Flexible Timing", body: "Open 5 AM – 11 PM, 365 days. Train on your schedule, not ours." },
];
 
function Features() {
  return (
    <section style={{ background: "#0d0d0d", padding: "6rem 2.5rem", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem", marginBottom: "4rem" }}>
          <div>
            <div className="section-tag">Why Choose Us</div>
            <h2 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.5rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1 }}>
              Everything you<br /><span style={{ color: "#c8ff00" }}>need to win</span>
            </h2>
          </div>
          <a href="#contact" className="btn-outline">View All</a>
        </Reveal>
 
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2px" }}>
          {FEATURES.map((f, i) => (
            <Reveal key={f.num} delay={i * 100}>
              <div style={{ background: "#111", padding: "3rem 2.5rem", borderBottom: "2px solid transparent", height: "100%", transition: "border-color 0.3s, background 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="#c8ff00"; e.currentTarget.style.background="#141414"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="transparent"; e.currentTarget.style.background="#111"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
                  <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "3rem", color: "rgba(200,255,0,0.1)" }}>{f.num}</span>
                  <span style={{ fontSize: "1.6rem" }}>{f.icon}</span>
                </div>
                <h3 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: "1.45rem", letterSpacing: "0.04em", textTransform: "uppercase", color: "#fff", marginBottom: "0.9rem" }}>{f.title}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.75 }}>{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
 
/* ─── Gallery ────────────────────────────────────────────────────────────── */
const GALLERY = [
  { src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80", label: "Training Floor" },
  { src: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80", label: "Weights Zone" },
  { src: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80", label: "Cardio Area" },
  { src: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?auto=format&fit=crop&w=800&q=80", label: "Open Floor" },
];
 
function Gallery() {
  const [hover, setHover] = useState(null);
  return (
    <section id="gallery" style={{ background: "#0a0a0a", padding: "6rem 2.5rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Reveal style={{ marginBottom: "3rem" }}>
          <div className="section-tag">Inside Flex Gym</div>
          <h2 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.5rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1 }}>
            The Space.<br /><span style={{ color: "#c8ff00" }}>The Energy.</span>
          </h2>
        </Reveal>
 
        <div className="gallery-grid" style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr 1fr",
          gridTemplateRows: "280px 280px",
          gap: "6px",
        }}>
          {GALLERY.map((img, i) => (
            <Reveal key={i} delay={i * 70} style={{
              ...(i === 0 ? { gridRow: "1 / 3" } : {}),
              overflow: "hidden", position: "relative", cursor: "pointer",
            }}>
              <img
                src={img.src} alt={img.label}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{
                  width: "100%", objectFit: "cover", display: "block",
                  height: i === 0 ? "566px" : "100%",
                  transition: "transform 0.6s ease, filter 0.4s",
                  transform: hover === i ? "scale(1.07)" : "scale(1)",
                  filter: hover === i ? "brightness(0.7) saturate(1.1)" : "brightness(0.5) saturate(0.85)",
                }}
              />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "1.5rem 1.2rem",
                background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
                opacity: hover === i ? 1 : 0, transition: "opacity 0.3s",
              }}>
                <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: "0.9rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c8ff00" }}>
                  {img.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
 
/* ─── CTA Banner ──────────────────────────────────────────────────────────── */
function CTABanner() {
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "relative",
        backgroundImage: "url(https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1600&q=80)",
        backgroundSize: "cover", backgroundPosition: "center",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(200,255,0,0.93)" }} />
        <div style={{ position: "relative", textAlign: "center", padding: "8rem 2.5rem" }}>
          {/* Ghost text bg */}
          <div style={{
            position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Oswald',sans-serif", fontWeight: 700,
            fontSize: "clamp(4rem, 18vw, 14rem)",
            color: "rgba(0,0,0,0.06)", letterSpacing: "0.05em",
            textTransform: "uppercase", userSelect: "none", whiteSpace: "nowrap",
          }}>FLEX GYM</div>
 
          <Reveal>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.72rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(0,0,0,0.5)", marginBottom: "1rem" }}>
              ✦ Limited Memberships Available ✦
            </p>
            <h2 style={{
              fontFamily: "'Oswald',sans-serif", fontWeight: 700,
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              textTransform: "uppercase", color: "#000",
              lineHeight: 0.95, marginBottom: "2.5rem",
            }}>
              Start Your Fitness<br />Journey Today
            </h2>
            <a href="#contact" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              background: "#000", color: "#c8ff00",
              fontFamily: "'Oswald',sans-serif", fontWeight: 600,
              fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase",
              padding: "1rem 2.5rem", textDecoration: "none",
              clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              transition: "transform 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              Contact Us →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
 
/* ─── Contact ─────────────────────────────────────────────────────────────── */
function Contact() {
  return (
    <section id="contact" style={{ background: "#0a0a0a", padding: "7rem 2.5rem", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
 
          <div>
            <Reveal>
              <div className="section-tag">Get In Touch</div>
              <h2 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 5vw, 4rem)", textTransform: "uppercase", color: "#fff", lineHeight: 1, marginBottom: "1.5rem" }}>
                Ready to<br /><span style={{ color: "#c8ff00" }}>transform?</span>
              </h2>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.92rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "380px" }}>
                Walk in, or reach out. Our team is ready to help you start the most rewarding journey of your life.
              </p>
            </Reveal>
            <Reveal delay={100}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                {[
                  { icon: "📞", label: "Phone", value: "+91 9876543210", href: "tel:+919876543210" },
                  { icon: "📍", label: "Location", value: "Anna Nagar, Chennai, TN", href: "#" },
                  { icon: "🕐", label: "Hours", value: "Mon–Sun  •  5 AM – 11 PM", href: "#" },
                ].map(item => (
                  <a key={item.label} href={item.href} style={{
                    display: "flex", alignItems: "center", gap: "1.2rem",
                    textDecoration: "none", padding: "1.2rem 1.5rem",
                    background: "#111", borderLeft: "2px solid transparent",
                    transition: "border-color 0.3s, background 0.3s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor="#c8ff00"; e.currentTarget.style.background="#141414"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor="transparent"; e.currentTarget.style.background="#111"; }}
                  >
                    <span style={{ fontSize: "1.2rem", minWidth: "26px" }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8ff00", marginBottom: "0.2rem" }}>{item.label}</div>
                      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.65)" }}>{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
 
          <Reveal delay={150}>
            <div style={{
              background: "#111", padding: "2.5rem",
              clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
            }}>
              <h3 style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 600, fontSize: "1.35rem", textTransform: "uppercase", color: "#fff", marginBottom: "2rem", letterSpacing: "0.05em" }}>
                Send a Message
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { label: "Full Name", type: "text", placeholder: "Your name" },
                  { label: "Phone Number", type: "tel", placeholder: "+91 ..." },
                ].map(field => (
                  <div key={field.label}>
                    <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: "0.4rem" }}>{field.label}</label>
                    <input type={field.type} placeholder={field.placeholder} style={{
                      width: "100%", background: "#0a0a0a",
                      border: "1px solid rgba(255,255,255,0.07)",
                      color: "#fff", padding: "0.8rem 1rem",
                      fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem", outline: "none",
                      transition: "border-color 0.2s",
                    }}
                      onFocus={e => e.target.style.borderColor="#c8ff00"}
                      onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.07)"}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", display: "block", marginBottom: "0.4rem" }}>Message</label>
                  <textarea placeholder="Tell us your fitness goal..." rows={4} style={{
                    width: "100%", background: "#0a0a0a",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "#fff", padding: "0.8rem 1rem",
                    fontFamily: "'DM Sans',sans-serif", fontSize: "0.88rem",
                    resize: "vertical", outline: "none", transition: "border-color 0.2s",
                  }}
                    onFocus={e => e.target.style.borderColor="#c8ff00"}
                    onBlur={e => e.target.style.borderColor="rgba(255,255,255,0.07)"}
                  />
                </div>
                <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}>
                  Send Message →
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
 
/* ─── Footer ──────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "#060606", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 2.5rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ width: "24px", height: "24px", background: "#c8ff00", clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "0.55rem", color: "#000" }}>F</span>
          </div>
          <span style={{ fontFamily: "'Oswald',sans-serif", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "0.1em", color: "#fff" }}>FLEX<span style={{ color: "#c8ff00" }}>GYM</span></span>
        </div>
        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.18)", letterSpacing: "0.06em" }}>
          © {new Date().getFullYear()} Flex Gym Chennai. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Instagram","WhatsApp"].map(s => (
            <a key={s} href="#" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.28)", textDecoration: "none", letterSpacing: "0.12em", textTransform: "uppercase", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color="#c8ff00"}
              onMouseLeave={e => e.target.style.color="rgba(255,255,255,0.28)"}
            >{s}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
 
/* ─── WhatsApp FAB ────────────────────────────────────────────────────────── */
function WhatsApp() {
  return (
    <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
      style={{
        position: "fixed", bottom: "2rem", right: "2rem", zIndex: 999,
        width: "52px", height: "52px", borderRadius: "50%", background: "#25d366",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 24px rgba(37,211,102,0.45)",
        animation: "float 3s ease-in-out infinite",
        textDecoration: "none",
        transition: "transform 0.25s, box-shadow 0.25s",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform="scale(1.13)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(37,211,102,0.65)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 4px 24px rgba(37,211,102,0.45)"; }}
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="#fff">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}
 
/* ─── App ────────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Hero />
      <Marquee
        items={["Modern Equipment","Expert Trainers","Flexible Timing","Chennai's Best Gym","5 AM – 11 PM","Certified Coaches","No Pain No Gain"]}
        speed={28}
      />
      <About />
      <Features />
      <Gallery />
      <Marquee
        items={["Transform Your Body","Elevate Your Mind","Join Flex Gym","Start Today","Become Unstoppable"]}
        speed={22} bg="#111" color="rgba(255,255,255,0.2)"
      />
      <CTABanner />
      <Contact />
      <Footer />
      <WhatsApp />
    </>
  );
}