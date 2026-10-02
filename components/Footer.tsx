import Link from "next/link";
import { DATA, SHOW_PROPUESTAS, SOCIAL } from "@/lib/data";
import { Icon } from "@/components/Icon";

/* Pie en Grafito (manual 5.3). Los enlaces llevan subrayado, no solo color (3.5). */
const linkClass =
  "focus-ring block w-fit rounded-[6px] py-1.5 text-[16px] text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-turquesa";

const headClass = "mb-4 font-display text-[12px] font-bold uppercase tracking-[.24em] text-turquesa";

export function Footer() {
  const D = DATA;
  return (
    <footer className="bg-grafito text-[var(--on-dark-dim)]">
      <div className="container-page">
        <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-10 pb-8 pt-16 max-md:grid-cols-1 max-md:gap-8">
          <div>
            <div className="font-display text-[20px] font-extrabold text-white">{D.candidate.name}</div>
            <p className="mt-3 max-w-[300px] text-[16px]">
              Diputado de la Asamblea Departamental de Risaralda.
              <br />
              Una Risaralda de todos, para todos.
            </p>
            <p className="mt-3 font-display font-bold text-turquesa">{D.candidate.hashtag}</p>
            <div className="mt-4 flex gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} de ${D.candidate.name} (se abre en una pestaña nueva)`}
                  className="focus-ring grid h-12 w-12 place-items-center rounded-[6px] bg-white/10 text-white transition-colors hover:bg-white hover:text-grafito"
                >
                  <Icon name={s.icon} size={s.icon === "x" ? 17 : 20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className={headClass}>Navegación</h4>
            {SHOW_PROPUESTAS && <Link href="/#propuestas" className={linkClass}>Propuestas</Link>}
            <Link href="/#municipios" className={linkClass}>Municipios</Link>
            <Link href="/#sobre" className={linkClass}>Sobre Pablo</Link>
            <Link href="/#redes" className={linkClass}>Redes</Link>
            <Link href="/#unete" className={linkClass}>Contacto</Link>
          </div>

          <div>
            <h4 className={headClass}>Municipios</h4>
            <Link href="/pereira" className={linkClass}>Pereira</Link>
            <Link href="/apia" className={linkClass}>Apía</Link>
            <Link href="/#municipios" className={linkClass}>Ver todos</Link>
          </div>
        </div>

        <div className="flex justify-between border-t border-white/15 py-6 text-[14px] max-md:flex-col max-md:gap-2">
          <span>© 2026 {D.candidate.name}{SHOW_PROPUESTAS && " · Candidato a Gobernador de Risaralda"}</span>
          <span>{D.candidate.hashtag}</span>
        </div>
      </div>
    </footer>
  );
}
