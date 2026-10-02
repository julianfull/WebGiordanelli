import Link from "next/link";
import { DATA, SHOW_PROPUESTAS } from "@/lib/data";
import { getMunicipioPageByName } from "@/lib/municipios";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { sectionPad } from "@/components/ui";

/* Manual 3.3: catorce municipios, un solo sistema de color. Cada tarjeta lleva a la página
   territorial del municipio. */
export function Municipios() {
  return (
    <section id="municipios" className={`${sectionPad} bg-surface-2`}>
      <div className="container-page">
        <div className="grid grid-cols-[1.1fr_.9fr] items-center gap-12 max-md:grid-cols-1">
          <SectionHead
            eyebrow="Territorio"
            title="Comprometido con los<br/>14 municipios"
            sub={"Desde la Asamblea Departamental, Pablo trabaja por cada rincón de Risaralda, escuchando a su gente y llevando su voz. Haz clic en tu municipio para " + (SHOW_PROPUESTAS ? "ver su propuesta territorial." : "conocerlo.")}
          />
          <Reveal className="rounded-[6px] border border-line bg-surface p-8">
            <h3 className="text-[20px]">Risaralda en cifras</h3>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {DATA.cifras.map((c, i) => (
                <div key={i} className="rounded-[6px] bg-surface-2 p-4">
                  <div className="font-display text-[25px] font-black tabular-nums text-ink">{c.v}</div>
                  <div className="mt-1 text-[14px] text-ink-faint">{c.k}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[12px] text-ink-faint">Fuente: DANE, proyecciones de población 2025.</p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {DATA.municipios.map((m, i) => {
            const page = getMunicipioPageByName(m.name);
            const body = (
              <>
                <div className="grid h-10 w-10 place-items-center rounded-[6px] bg-surface-2 font-display text-[16px] font-extrabold text-grafito">
                  {m.mono}
                </div>
                <div>
                  <div className="font-display text-[16px] font-bold">{m.name}</div>
                  <div className="text-[13px] text-ink-faint">{m.info}</div>
                </div>
              </>
            );
            const base =
              "relative flex min-h-[128px] flex-col gap-3 rounded-[6px] border border-line bg-surface px-5 pb-4 pt-5 text-left";

            return page ? (
              <Reveal
                key={m.name}
                delay={(i % 4) * 50}
                as={Link}
                href={`/${page.slug}`}
                aria-label={SHOW_PROPUESTAS ? `Ver propuesta para ${m.name}` : `Conocer ${m.name}`}
                className={`${base} focus-ring transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-grafito hover:shadow-[var(--shadow-md)]`}
              >
                {body}
                <span className="mt-auto inline-flex items-center gap-1.5 font-display text-[13px] font-bold text-rojo underline underline-offset-4">
                  {SHOW_PROPUESTAS ? "Ver propuesta" : "Conocer más"} <Icon name="arrowRight" size={16} />
                </span>
              </Reveal>
            ) : (
              <Reveal key={m.name} delay={(i % 4) * 50} className={base}>
                {body}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
