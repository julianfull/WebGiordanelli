/* Vista HOME */
(function () {
  const { useState } = React;
  const Icon = window.Icon;
  const Reveal = window.Reveal;
  const SectionHead = window.SectionHead;

  const PHOTO = {
    cafe: "assets/pablo-cafe.png",
    formal: "assets/pablo-formal.png",
    pareja: "assets/pablo-pareja.png",
  };

  function HeroA({ onJoin, scrollTo }) {
    const D = window.DATA;
    return (
      <section className="hero" id="top">
        <div className="container hero-grid">
          <div>
            <Reveal as="span" className="eyebrow on-dark">
              <Icon name="star" size={14} /> Candidato a Gobernador · 2027
            </Reveal>
            <Reveal as="h1" delay={60} style={{ marginTop: 22 }}>
              Una <span className="hl">Risaralda</span> de todos, para todos
            </Reveal>
            <Reveal as="p" className="lead" delay={120}>
              Con experiencia en la Asamblea Departamental y un profundo amor por cada uno de nuestros municipios, {D.candidate.name} propone un gobierno cercano, transparente y transformador.
            </Reveal>
            <Reveal className="quote" delay={160}>“{D.candidate.hashtag}”</Reveal>
            <Reveal className="hero-cta" delay={220}>
              <button className="btn btn-primary btn-lg" onClick={() => scrollTo("#propuestas")}>Ver propuestas</button>
              <button className="btn btn-outline btn-lg" onClick={onJoin}>Apoyar la campaña</button>
            </Reveal>
          </div>
          <Reveal className="hero-portrait" delay={140}>
            <div className="frame">
              <img src={PHOTO.cafe} alt="Pablo Giordanelli en un municipio cafetero de Risaralda" />
            </div>
            <div className="hero-namecard">
              <div className="nm">{D.candidate.name}</div>
              <div className="rl">{D.candidate.role}</div>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  function HeroB({ onJoin, scrollTo }) {
    const D = window.DATA;
    return (
      <section className="hero hero-b" id="top">
        <div className="bg"><img src={PHOTO.cafe} alt="Pablo Giordanelli" /></div>
        <div className="scrim" />
        <div className="container">
          <div className="hero-b inner">
            <Reveal as="span" className="eyebrow on-dark">
              <Icon name="star" size={14} /> Candidato a Gobernador · 2027
            </Reveal>
            <Reveal as="h1" delay={60} style={{ marginTop: 22 }}>
              Una <span className="hl">Risaralda</span> de todos, para todos
            </Reveal>
            <Reveal as="p" className="lead" delay={120} style={{ maxWidth: "44ch" }}>
              Experiencia en la Asamblea Departamental y un profundo amor por cada municipio. Un gobierno cercano, transparente y transformador.
            </Reveal>
            <Reveal className="hero-cta" delay={200}>
              <button className="btn btn-primary btn-lg" onClick={() => scrollTo("#propuestas")}>Ver propuestas</button>
              <button className="btn btn-outline btn-lg" onClick={onJoin}>Apoyar la campaña</button>
            </Reveal>
          </div>
        </div>
      </section>
    );
  }

  function Ribbon() {
    const D = window.DATA;
    return (
      <div className="ribbon">
        <div className="container">
          <div className="ribbon-grid">
            {D.ribbon.map((r, i) => (
              <div className="cell" key={i}>
                <div className="num">{r.num}</div>
                <div className="lbl">{r.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function Propuestas() {
    const D = window.DATA;
    return (
      <section className="section" id="propuestas">
        <div className="container">
          <SectionHead
            eyebrow="Ejes de Gobierno"
            title="Propuestas para un<br/>Risaralda transformado"
            sub="Seis ejes estratégicos que marcarán el rumbo de nuestro departamento hacia el progreso sostenible, la equidad y el bienestar de todos los risaraldenses."
          />
          <div className="ejes-grid" style={{ marginTop: 48 }}>
            {D.ejes.map((e, i) => (
              <Reveal className="eje-card" key={i} delay={(i % 3) * 80}>
                <div className="eje-ico"><Icon name={e.icon} size={26} /></div>
                <div className="eje-num">EJE 0{i + 1}</div>
                <h3 style={{ marginTop: 6 }}>{e.title}</h3>
                <p>{e.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  function Municipios({ onOpenApia }) {
    const D = window.DATA;
    return (
      <section className="section" id="municipios" style={{ background: "var(--surface-2)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 48, alignItems: "center" }} className="muni-top">
            <SectionHead
              eyebrow="Territorio"
              title="Comprometido con los<br/>14 municipios"
              sub="Cada rincón de Risaralda merece un gobernante que lo conozca, lo ame y trabaje por él. Haz clic en Apía para ver una propuesta territorial a fondo."
            />
            <Reveal className="cifras">
              <h3>Risaralda en cifras</h3>
              <div className="cifras-grid">
                {D.cifras.map((c, i) => (
                  <div className="cifra" key={i}>
                    <div className="v">{c.v}</div>
                    <div className="k">{c.k}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="muni-grid" style={{ marginTop: 44 }}>
            {D.municipios.map((m, i) => {
              if (m.special) {
                return (
                  <Reveal key={m.name} className="muni-card is-apia" delay={(i % 4) * 50}
                    as="button" onClick={onOpenApia} aria-label="Ver propuesta para Apía">
                    <span className="apia-badge">Especial</span>
                    <div className="muni-mono"><Icon name="wind" size={18} /></div>
                    <div>
                      <div className="mn">{m.name}</div>
                      <div className="md">{m.info} · El Corazón del Viento</div>
                    </div>
                    <span className="apia-cta">Visitar Apía <Icon name="arrowRight" size={15} /></span>
                  </Reveal>
                );
              }
              return (
                <Reveal key={m.name} className="muni-card" delay={(i % 4) * 50}>
                  <div className="muni-mono">{m.mono}</div>
                  <div>
                    <div className="mn">{m.name}</div>
                    <div className="md">{m.info}</div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  function SobrePablo() {
    const D = window.DATA;
    return (
      <section className="section about" id="sobre">
        <div className="container">
          <div className="about-grid">
            <Reveal className="about-photos">
              <div className="p1"><img src={PHOTO.formal} alt="Pablo Giordanelli, Diputado de la Asamblea de Risaralda" /></div>
              <div className="p2"><img src={PHOTO.pareja} alt="Pablo Giordanelli en Risaralda" /></div>
            </Reveal>
            <div>
              <SectionHead dark eyebrow="Sobre Pablo" title="Un liderazgo forjado<br/>en Risaralda"
                sub="Pablo Giordanelli es un político risaraldense comprometido con su tierra, su gente y el futuro del departamento. Desde la Asamblea Departamental ha trabajado incansablemente por los intereses de los risaraldenses." />
              <div className="timeline">
                {D.timeline.map((t, i) => (
                  <Reveal className="tl-item" key={i} delay={i * 70}>
                    <div className="tt">{t.tt}</div>
                    <div className="tp">{t.tp}</div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  function Unete({ formRef }) {
    const D = window.DATA;
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({ nombre: "", tel: "", email: "", muni: "", msg: "" });
    const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });
    const submit = (e) => {
      e.preventDefault();
      if (!form.nombre.trim()) return;
      setSent(true);
    };
    return (
      <section className="section join" id="unete" ref={formRef}>
        <div className="container" style={{ textAlign: "center" }}>
          <SectionHead center dark eyebrow="Únete" title="Sé parte del cambio"
            sub="Tu participación es el motor de esta campaña. Déjanos tus datos y te mantendremos informado de todas las actividades en tu municipio." />
          {sent ? (
            <Reveal className="form-card" style={{ textAlign: "center", background: "color-mix(in srgb,#fff 10%,transparent)", border: "1.5px solid color-mix(in srgb, var(--accent) 50%, transparent)", borderRadius: 18, padding: 40 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--accent)", color: "var(--brand-950)", display: "grid", placeItems: "center", margin: "0 auto 18px" }}>
                <Icon name="check" size={32} />
              </div>
              <h3 style={{ color: "#fff", fontSize: 26 }}>¡Bienvenido al movimiento, {form.nombre.split(" ")[0]}!</h3>
              <p style={{ color: "var(--on-brand-dim)", marginTop: 10 }}>
                Gracias por sumarte. Pronto nos comunicaremos contigo con las actividades en {form.muni || "tu municipio"}. {D.candidate.hashtag}
              </p>
              <button className="btn btn-outline" style={{ marginTop: 20 }} onClick={() => { setSent(false); setForm({ nombre: "", tel: "", email: "", muni: "", msg: "" }); }}>Enviar otro</button>
            </Reveal>
          ) : (
            <form className="form-card" onSubmit={submit}>
              <div className="f-row">
                <input className="field" placeholder="Tu nombre completo" value={form.nombre} onChange={upd("nombre")} required />
                <input className="field" placeholder="Teléfono / WhatsApp" value={form.tel} onChange={upd("tel")} />
              </div>
              <input className="field" type="email" placeholder="Correo electrónico" value={form.email} onChange={upd("email")} />
              <select className="field" value={form.muni} onChange={upd("muni")}>
                <option value="">¿De qué municipio eres?</option>
                {D.municipiosSelect.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
              <textarea className="field" placeholder="¿Qué propuesta te parece más importante para tu municipio?" value={form.msg} onChange={upd("msg")} />
              <button className="btn btn-primary btn-lg btn-block" type="submit">
                Unirme al movimiento <Icon name="megaphone" size={18} />
              </button>
            </form>
          )}
        </div>
      </section>
    );
  }

  function HomeView({ heroVariant, onOpenApia, onJoin, formRef, scrollTo }) {
    return (
      <div className="view-enter">
        {heroVariant === "full" ? <HeroB onJoin={onJoin} scrollTo={scrollTo} /> : <HeroA onJoin={onJoin} scrollTo={scrollTo} />}
        <Ribbon />
        <Propuestas />
        <Municipios onOpenApia={onOpenApia} />
        <SobrePablo />
        <Unete formRef={formRef} />
      </div>
    );
  }

  window.HomeView = HomeView;
})();
