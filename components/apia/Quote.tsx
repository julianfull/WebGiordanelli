import { DATA, SHOW_PROPUESTAS, type MunicipioPageData } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

/* Barra de cita (manual 5.1): filete Rojo a la izquierda + Montserrat Medium Italic.
   Es el formato oficial de las citas del candidato. */
export function Quote({ data: A }: { data: MunicipioPageData }) {
  const D = DATA;
  return (
    <section className="pb-0 pt-[clamp(56px,7vw,96px)]">
      <div className="container-page">
        <Reveal as="figure" className="max-w-[880px] border-l-[5px] border-rojo pl-6">
          <blockquote className="font-display text-[clamp(20px,2.4vw,31px)] font-medium italic leading-[1.3] text-ink">
            «{A.quote}»
          </blockquote>
          <figcaption className="mt-4 font-display text-[14px] font-semibold text-ink-faint">
            {D.candidate.name}{SHOW_PROPUESTAS && `, ${D.candidate.role}`}
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
