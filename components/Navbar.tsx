"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DATA } from "@/lib/data";
import { buttonClass } from "@/components/Button";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";

const linkClass =
  "focus-ring rounded-[6px] px-4 py-2 font-display text-[14px] font-semibold text-grafito underline-offset-[6px] transition-colors hover:underline";

/* Cabecera según manual 6.4: fondo claro (Gris Niebla, el mismo del archivo del logotipo),
   logotipo a color positivo, navegación en Montserrat y botón primario Rojo.
   En celular la navegación se despliega bajo la cabecera con el botón de menú. */
export function Navbar() {
  const [solid, setSolid] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    const onResize = () => window.innerWidth >= 768 && setMenu(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menu]);

  return (
    <header
      className={`sticky top-0 z-[60] border-b border-line bg-niebla transition-shadow ${
        solid || menu ? "shadow-[var(--shadow-md)]" : ""
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link
          href="/#top"
          aria-label="Pablo Giordanelli · inicio"
          className="focus-ring rounded-[6px]"
          onClick={(e) => {
            setMenu(false);
            if (window.location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <Logo />
        </Link>
        <nav className="flex items-center gap-2 max-md:hidden">
          {DATA.nav.map((n) => (
            <a key={n.href} href={n.href} className={linkClass}>
              {n.label}
            </a>
          ))}
          <a href="#unete" className={buttonClass("primary", "md", false, "ml-2")}>
            Súmate
          </a>
        </nav>
        <button
          type="button"
          onClick={() => setMenu(!menu)}
          aria-expanded={menu}
          aria-controls="menu-movil"
          aria-label={menu ? "Cerrar menú" : "Abrir menú"}
          className="focus-ring grid h-12 w-12 place-items-center rounded-[6px] text-grafito md:hidden"
        >
          <Icon name={menu ? "close" : "menu"} size={26} />
        </button>
      </div>

      {menu && (
        <nav id="menu-movil" className="animate-pop border-t border-line bg-niebla md:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {DATA.nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setMenu(false)} className={`${linkClass} py-3 text-[16px]`}>
                {n.label}
              </a>
            ))}
            <a href="#unete" onClick={() => setMenu(false)} className={buttonClass("primary", "md", true, "mt-2")}>
              Súmate
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
