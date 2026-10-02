/* Vista APÍA — "El Corazón del Viento" */
(function () {
  const { useState } = React;
  const Icon = window.Icon;
  const Reveal = window.Reveal;
  const SectionHead = window.SectionHead;

  const PHOTO = { cafe: "assets/pablo-cafe.png", formal: "assets/pablo-formal.png" };
  const TAGS = ["Aviturismo", "Café de Altura", "Turismo de montaña", "Cultura", "Otro"];

  function Backbar({ onBack, onJoin }) {
    const D = window.DATA;
    return (
      <div className="backbar">
        <div className="container backbar-inner">
          <button className="back-btn" onClick={onBack}>
            <Icon name="arrowLeft" size={18} /> Regresar al inicio
          </button>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, opacity: .9, letterSpacing: ".02em" }}>
            {D.candidate.name} · Apía
          </span>
          <button className="btn btn-primary" style={{ padding: "10px 20px" }} onClick={onJoin}>Apoyar</button>
        </div>
      </div>
    );
  }

  function ApiaHero({ variant }) {
    const A = window.DATA.apia;
    if (variant === "split") {
      return (
        <section className="hero" style={{ minHeight: "72vh", display: "flex", alignItems: "center" }}>
          <div className="container" style={{ display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 48, alignItems: "center", width: "100%" }}>
            <div>
              <Reveal as="div" className="wind"><Icon name="wind" size={22} /> {A.nickname}</Reveal>
              <Reveal as="h1" delay={60} style={{ color: "#fff", fontSize: "clamp(44px,6vw,84px)", fontWeight: 900, marginTop: 14 }}>
                {A.headline1} <span className="hl" style={{ color: "var(--accent)" }}>{A.headlineHl}</span>
              </Reveal>
              <Reveal as="p" className="lead" delay={120} style={{ maxWidth: "46ch" }}>{A.intro}</Reveal>
            </div>
            <Reveal className="hero-portrait" delay={140}>
              <div className="frame" style={{ aspectRatio: "4/4.6" }}><img src={PHOTO.cafe} alt="Pablo Giordanelli en Apía" /></div>
            </Reveal>
          </div>
        </section>
      );
    }
    return (
      <section className="apia-hero">
        <div className="bg"><img src={PHOTO.cafe} alt="Apía, Risaralda" /></div>
        <div className="scrim" />
        <div className="container">
          <div className="inner">
            <Reveal as="div" className="wind"><Icon name="wind" size={22} /> {A.nickname}</Reveal>
            <Reveal as="h1" delay={60} style={{ marginTop: 14 }}>
              {A.headline1} <span className="hl">{A.headlineHl}</span>
            </Reveal>
            <Reveal as="p" className="lead" delay={120} style={{ maxWidth: "48ch" }}>{A.intro}</Reveal>
          </div>
        </div>
      </section>
    );
  }

  function Quote() {
    const A = window.DATA.apia;
    const D = window.DATA;
    return (
      <section className="section" style={{ paddingTop: "clamp(56px,7vw,96px)", paddingBottom: 0 }}>
        <div className="container">
          <Reveal style={{ maxWidth: 880, margin: "0 auto", textAlign: "center" }}>
            <div style={{ color: "var(--accent)", display: "flex", justifyContent: "center", marginBottom: 18 }}><Icon name="quote" size={40} /></div>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(22px,2.6vw,34px)", lineHeight: 1.25, letterSpacing: "-.01em", color: "var(--ink)", textWrap: "balance" }}>
              {A.quote}
            </p>
            <p style={{ marginTop: 18, color: "var(--ink-faint)", fontWeight: 600 }}>— {D.candidate.name}, {D.candidate.role}</p>
          </Reveal>
        </div>
      </section>
    );
  }

  function Propuestas() {
    const A = window.DATA.apia;
    return (
      <section className="section">
        <div className="container">
          <SectionHead center eyebrow="Propuestas para Apía"
            title="Naturaleza que genera<br/>futuro y empleo"
            sub="Un plan que convierte la riqueza natural de Apía —su viento, su montaña y su café— en oportunidades reales para quienes viven aquí." />
          <div className="prop-grid" style={{ marginTop: 48 }}>
            {A.propuestas.map((p, i) => (
              <Reveal className="prop-card" key={i} delay={(i % 2) * 90}>
                <div className="prop-ico"><Icon name={p.icon} size={28} /></div>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function Galeria() {
    const A = window.DATA.apia;
    return (
      <section className="section" style={{ background: "var(--surface-2)" }}>
        <div className="container">
          <SectionHead eyebrow="Galería" title="El paisaje que defendemos"
            sub="Sube aquí las imágenes reales de Apía: el Tatamá, el parque, los cafetales y las aves que hacen único a este municipio." />
          <Reveal className="gal-grid" style={{ marginTop: 40 }}>
            {A.galeria.map((g, i) => (
              <div className="gal-item" key={i} style={{ gridColumn: g.span, gridRow: g.rows }}>
                <image-slot
                  id={"apia-gal-" + i}
                  shape="rounded" radius="16" fit="cover"
                  placeholder={g.ph}
                  style={{ width: "100%", height: "100%", display: "block" }}
                ></image-slot>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    );
  }

  function Escucha() {
    const A = window.DATA.apia;
    const [msgs, setMsgs] = useState(A.semillas.map((s) => ({ ...s, id: Math.random() })));
    const [f, setF] = useState({ name: "", sector: "", txt: "", tag: TAGS[0] });
    const [flash, setFlash] = useState(false);
    const upd = (k) => (e) => setF({ ...f, [k]: e.target.value });
    const initials = (n) => n.trim().split(/\s+/).slice(0, 2).map((x) => x[0]).join("").toUpperCase() || "?";
    const submit = (e) => {
      e.preventDefault();
      if (!f.name.trim() || !f.txt.trim()) return;
      setMsgs([{ ...f, name: f.name, muni: f.sector || "Apía", txt: f.txt, tag: f.tag, id: Math.random(), mine: true }, ...msgs]);
      setF({ name: "", sector: "", txt: "", tag: TAGS[0] });
      setFlash(true);
      setTimeout(() => setFlash(false), 2200);
    };
    return (
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Escucha Ciudadana"
            title="Apía propone, Pablo escucha"
            sub="Esta tierra la conocen quienes la habitan. Deja tu idea para el desarrollo de Apía y aparecerá en el muro al instante." />
          <div className="escucha-wrap" style={{ marginTop: 44 }}>
            <Reveal className="escucha-form" as="form" onSubmit={submit}>
              <div>
                <div className="lab">Tu nombre</div>
                <input className="field-ink" placeholder="Nombre y apellido" value={f.name} onChange={upd("name")} required style={{ marginTop: 8 }} />
              </div>
              <div>
                <div className="lab">Vereda o sector</div>
                <input className="field-ink" placeholder="Ej. Vereda La María, Centro…" value={f.sector} onChange={upd("sector")} style={{ marginTop: 8 }} />
              </div>
              <div>
                <div className="lab">Tema</div>
                <select className="field-ink" value={f.tag} onChange={upd("tag")} style={{ marginTop: 8 }}>
                  {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <div className="lab">Tu idea para Apía</div>
                <textarea className="field-ink" placeholder="¿Qué necesita Apía para crecer cuidando su naturaleza?" value={f.txt} onChange={upd("txt")} required style={{ marginTop: 8 }} />
              </div>
              <button className="btn btn-brand btn-lg btn-block" type="submit">
                Enviar mi idea <Icon name="send" size={17} />
              </button>
              {flash && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--accent-700)", fontWeight: 700, fontSize: 14, justifyContent: "center" }}>
                  <Icon name="check" size={16} /> ¡Gracias! Tu idea ya está en el muro.
                </div>
              )}
            </Reveal>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, color: "var(--ink-soft)", fontWeight: 700, fontFamily: "var(--font-display)", whiteSpace: "nowrap" }}>
                <Icon name="users" size={18} /> Muro de ideas · {msgs.length}
              </div>
              <div className="wall">
                {msgs.length === 0 && <div className="wall-empty">Sé el primero en dejar una idea para Apía.</div>}
                {msgs.map((m) => (
                  <div className="msg" key={m.id} style={m.mine ? { borderColor: "color-mix(in srgb, var(--accent) 55%, var(--line))" } : null}>
                    <div className="mh">
                      <div className="av" style={m.mine ? { background: "var(--accent)", color: "var(--brand-950)" } : null}>{initials(m.name)}</div>
                      <div>
                        <div className="mn">{m.name}</div>
                        <div className="mv"><Icon name="mapPin" size={11} style={{ display: "inline", verticalAlign: "-1px", marginRight: 3 }} />{m.muni}</div>
                      </div>
                    </div>
                    <div className="mt">{m.txt}</div>
                    {m.tag && <span className="tag">{m.tag}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function ApiaView({ variant, onBack, onJoin }) {
    return (
      <div className="view-enter">
        <Backbar onBack={onBack} onJoin={onJoin} />
        <ApiaHero variant={variant} />
        <Quote />
        <Propuestas />
        <Galeria />
        <Escucha />
      </div>
    );
  }

  window.ApiaView = ApiaView;
})();
