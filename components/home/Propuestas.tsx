import { DATA } from "@/lib/data";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { cardClass, iconTileClass, sectionPad } from "@/components/ui";
import { ImageLightbox } from "@/components/home/ImageLightbox";

export function Propuestas() {
  return (
    <section id="propuestas" className={sectionPad}>
      <div className="container-page">
        <SectionHead
          eyebrow="Ejes de Gobierno"
          title="Propuestas para una<br/>Risaralda transformada"
          sub="Seis ejes estratégicos que marcarán el rumbo de nuestro departamento hacia el progreso sostenible, la equidad y el bienestar de todos los risaraldenses."
        />
        <div className="mt-12 grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-md:grid-cols-1">
          {DATA.ejes.map((e, i) => {
            const content = (
              <>
                <div className={`${iconTileClass} mb-6`}>
                  <Icon name={e.icon} size={24} />
                </div>
                <div className="font-display text-[12px] font-bold uppercase tracking-[.24em] text-rojo">
                  Eje 0{i + 1}
                </div>
                <h3 className="mt-2 text-[20px]">{e.title}</h3>
                <p className="mt-3 text-[16px]">{e.desc}</p>
              </>
            );

            return e.image ? (
              <ImageLightbox
                key={i}
                image={e.image}
                alt={`${e.title} · Risaralda Inteligente 2031`}
                delay={(i % 3) * 80}
                className={cardClass}
              >
                {content}
                <span className="mt-4 inline-flex items-center gap-2 font-display text-[14px] font-bold text-rojo underline underline-offset-4">
                  Ver propuesta completa <Icon name="arrowRight" size={16} />
                </span>
              </ImageLightbox>
            ) : (
              <Reveal key={i} delay={(i % 3) * 80} className={cardClass}>
                {content}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
