/* App raíz — Pablo Giordanelli */
(function () {
  const { useState, useEffect, useRef, useCallback } = React;
  const { HomeView, ApiaView, Navbar, Footer } = window;

  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "paleta": "Verde + Dorado",
    "heroInicio": "Dividido",
    "heroApia": "Foto completa"
  }/*EDITMODE-END*/;

  function App() {
    const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
    const [view, setView] = useState("home");
    const formRef = useRef(null);

    const theme = (t.paleta || "").toLowerCase().startsWith("azul") ? "azul" : "verde";
    const heroVariant = (t.heroInicio === "Foto completa") ? "full" : "split";
    const apiaVariant = (t.heroApia === "Dividido") ? "split" : "image";

    // aplica tema a <html> para que body herede las variables
    useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    // al cambiar de vista, vuelve arriba
    useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" }); }, [view]);

    const scrollTo = useCallback((sel) => {
      const el = document.querySelector(sel);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 66, behavior: "smooth" });
    }, []);

    const goJoin = useCallback(() => {
      if (view !== "home") { setView("home"); setTimeout(() => scrollTo("#unete"), 120); }
      else scrollTo("#unete");
    }, [view, scrollTo]);

    const openApia = useCallback(() => setView("apia"), []);
    const backHome = useCallback(() => setView("home"), []);

    return (
      <div>
        {view === "home" && (
          <>
            <Navbar onJoin={goJoin} />
            <HomeView heroVariant={heroVariant} onOpenApia={openApia} onJoin={goJoin} formRef={formRef} scrollTo={scrollTo} />
            <Footer onOpenApia={openApia} />
          </>
        )}
        {view === "apia" && (
          <>
            <ApiaView variant={apiaVariant} onBack={backHome} onJoin={goJoin} />
            <Footer onOpenApia={openApia} />
          </>
        )}

        <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="Identidad visual" />
          <window.TweakRadio label="Paleta" value={t.paleta}
            options={["Verde + Dorado", "Azul + Verde"]}
            onChange={(v) => setTweak("paleta", v)} />
          <window.TweakSection label="Variantes de diseño" />
          <window.TweakRadio label="Hero · Inicio" value={t.heroInicio}
            options={["Dividido", "Foto completa"]}
            onChange={(v) => setTweak("heroInicio", v)} />
          <window.TweakRadio label="Hero · Apía" value={t.heroApia}
            options={["Foto completa", "Dividido"]}
            onChange={(v) => setTweak("heroApia", v)} />
          <window.TweakSection label="Navegación" />
          <window.TweakButton label={view === "home" ? "Ver vista de Apía" : "Volver al Inicio"}
            onClick={() => setView(view === "home" ? "apia" : "home")} />
        </window.TweaksPanel>
      </div>
    );
  }

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
})();
