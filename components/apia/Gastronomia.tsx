import type { MunicipioPageData } from "@/lib/data";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { cardClass, iconTileClass, sectionPad } from "@/components/ui";

export function Gastronomia({ data: A }: { data: MunicipioPageData }) {
  const categorias = A.gastronomia || [];
  if (categorias.length === 0) return null;
  const c = A.copy.gastronomia;
  return (
    <section className={`${sectionPad} bg-surface-2`}>
      <div className="container-page">
        <SectionHead eyebrow={c.eyebrow} title={c.title} sub={c.sub} />
        <div className="mt-12 grid grid-cols-3 gap-6 max-lg:grid-cols-1">
          {categorias.map((g, i) => (
            <Reveal key={i} delay={(i % 3) * 80} className={cardClass}>
              <div className={`${iconTileClass} mb-6`}>
                <Icon name={g.icon} size={24} />
              </div>
              <h3 className="text-[20px]">{g.title}</h3>
              <ul className="mt-4 grid gap-2">
                {(g.items || []).map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[16px]">
                    <span className="mt-[10px] h-1.5 w-1.5 flex-none rounded-full bg-rojo" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
