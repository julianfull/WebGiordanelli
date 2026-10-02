import type { MunicipioPageData } from "@/lib/data";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { cardClass, sectionPad } from "@/components/ui";

export function Eventos({ data: A }: { data: MunicipioPageData }) {
  const eventos = A.eventos || [];
  // Sin eventos verificados no se muestra la sección.
  if (eventos.length === 0) return null;
  const c = A.copy.eventos;
  return (
    <section className={sectionPad}>
      <div className="container-page">
        <SectionHead eyebrow={c.eyebrow} title={c.title} sub={c.sub} />
        <div className="mt-12 grid grid-cols-2 gap-6 max-lg:grid-cols-1">
          {eventos.map((e, i) => (
            <Reveal key={i} delay={(i % 2) * 90} className={cardClass}>
              {/* Etiqueta: Rojo sobre Gris Niebla (5,2:1) */}
              <span className="inline-flex items-center gap-2 rounded-[6px] bg-niebla px-3 py-1.5 font-display text-[12px] font-bold uppercase tracking-[.16em] text-rojo">
                <Icon name="calendar" size={14} /> {e.month}
              </span>
              <h3 className="mt-4 text-[20px]">{e.title}</h3>
              <p className="mt-3 text-[16px]">{e.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
