/* Componentes compartidos */
(function () {
  const { useEffect, useRef, useState } = React;
  const Icon = window.Icon;

  // Revela elementos al entrar en viewport
  function Reveal({ children, as = "div", className = "", delay = 0, style = {}, ...rest }) {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);
    useEffect(() => {
      if (shown) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < (window.innerHeight || 800) * 0.95) { setShown(true); return; }
      if (!("IntersectionObserver" in window)) { setShown(true); return; }
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { setShown(true); io.unobserve(el); } });
      }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
      io.observe(el);
      const t = setTimeout(() => setShown(true), 1500);
      return () => { io.disconnect(); clearTimeout(t); };
    }, [shown]);
    return React.createElement(as, {
      ref, className: "reveal " + (shown ? "in " : "") + className,
      style: { transitionDelay: delay ? delay + "ms" : undefined, ...style }, ...rest,
    }, children);
  }

  function SectionHead({ eyebrow, title, sub, center, dark }) {
    return (
      <div className="sec-head" style={center ? { marginLeft: "auto", marginRight: "auto", textAlign: "center" } : null}>
        {eyebrow && <span className={"eyebrow" + (dark ? " on-dark" : "")}>{eyebrow}</span>}
        <h2 dangerouslySetInnerHTML={{ __html: title }} />
        {sub && <p className="sub" style={center ? { marginLeft: "auto", marginRight: "auto" } : null}>{sub}</p>}
      </div>
    );
  }

  // Brand mark reutilizable
  function BrandMark({ light }) {
    const D = window.DATA;
    return (
      <a href="#top" className="brandmark" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
        <span className="seal">PG</span>
        <span style={{ display: "grid", lineHeight: 1.05 }}>
          <span className="bn">{D.candidate.name}</span>
          <span className="bs">Gobernación · Risaralda</span>
        </span>
      </a>
    );
  }

  function Navbar({ onJoin }) {
    const D = window.DATA;
    const [solid, setSolid] = useState(false);
    useEffect(() => {
      const onScroll = () => setSolid(window.scrollY > 12);
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
      <header className="nav" style={solid ? { boxShadow: "0 8px 30px -16px rgba(0,0,0,.5)" } : null}>
        <div className="container nav-inner">
          <BrandMark />
          <nav className="nav-links">
            {D.nav.map((n) => (
              <a key={n.href} href={n.href}>{n.label}</a>
            ))}
            <button className="btn btn-primary" style={{ marginLeft: 10, padding: "11px 22px" }} onClick={onJoin}>
              Sumarse
            </button>
          </nav>
        </div>
      </header>
    );
  }

  function Footer({ onOpenApia }) {
    const D = window.DATA;
    const go = (e, href) => { e.preventDefault(); const el = document.querySelector(href); if (el) el.scrollIntoView ? window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" }) : null; };
    return (
      <footer className="foot">
        <div className="container">
          <div className="foot-grid">
            <div>
              <div className="brand-lg">{D.candidate.name}</div>
              <p style={{ marginTop: 12, maxWidth: 280, fontSize: 14.5 }}>
                Candidato a la Gobernación de Risaralda.<br />Una Risaralda de todos, para todos.
              </p>
              <p style={{ marginTop: 10, color: "var(--accent)", fontWeight: 700, fontFamily: "var(--font-display)" }}>{D.candidate.hashtag}</p>
              <div className="foot-social">
                <a href="#" aria-label="Facebook" onClick={(e) => e.preventDefault()}><Icon name="facebook" size={18} /></a>
                <a href="#" aria-label="Instagram" onClick={(e) => e.preventDefault()}><Icon name="instagram" size={18} /></a>
                <a href="#" aria-label="X" onClick={(e) => e.preventDefault()}><Icon name="x" size={17} /></a>
              </div>
            </div>
            <div>
              <h4>Navegación</h4>
              <a href="#propuestas" onClick={(e) => go(e, "#propuestas")}>Propuestas</a>
              <a href="#municipios" onClick={(e) => go(e, "#municipios")}>Municipios</a>
              <a href="#sobre" onClick={(e) => go(e, "#sobre")}>Sobre Pablo</a>
              <a href="#unete" onClick={(e) => go(e, "#unete")}>Contacto</a>
            </div>
            <div>
              <h4>Municipios</h4>
              <a href="#municipios" onClick={(e) => go(e, "#municipios")}>Pereira</a>
              <a href="#municipios" onClick={(e) => go(e, "#municipios")}>Dosquebradas</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onOpenApia && onOpenApia(); }} style={{ color: "var(--accent)" }}>Apía →</a>
              <a href="#municipios" onClick={(e) => go(e, "#municipios")}>Ver todos</a>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2027 {D.candidate.name} · Candidato a Gobernador de Risaralda</span>
            <span>{D.candidate.hashtag}</span>
          </div>
        </div>
      </footer>
    );
  }

  Object.assign(window, { Reveal, SectionHead, BrandMark, Navbar, Footer });
})();
