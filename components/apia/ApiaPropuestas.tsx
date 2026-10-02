import type { MunicipioPageData } from "@/lib/data";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { cardClass, iconTileClass, sectionPad } from "@/components/ui";

export function ApiaPropuestas({ data: A }: { data: MunicipioPageData }) {
  const c = A.copy.propuestas;
  return (
    <section className={sectionPad}>
      <div className="container-page">
        <SectionHead eyebrow={c.eyebrow} title={c.title} sub={c.sub} />
        <div className="mt-12 grid grid-cols-2 gap-6 max-lg:grid-cols-1">
          {(A.propuestas || []).map((p, i) => (
            <Reveal key={i} delay={(i % 2) * 90} className={`${cardClass} flex gap-6`}>
              <div className={iconTileClass}>
                <Icon name={p.icon} size={24} />
              </div>
              <div>
                <h3 className="text-[20px]">{p.title}</h3>
                <p className="mt-2 text-[16px]">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
