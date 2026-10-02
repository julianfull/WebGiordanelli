import Image from "next/image";
import type { MunicipioPageData } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { sectionPad } from "@/components/ui";

export function Galeria({ data: A }: { data: MunicipioPageData }) {
  const items = A.galeria || [];
  // Sin fotos no se muestra la sección.
  if (items.length === 0) return null;
  const c = A.copy.galeria;
  return (
    <section className={`${sectionPad} bg-surface-2`}>
      <div className="container-page">
        <SectionHead eyebrow={c.eyebrow} title={c.title} sub={c.sub} />
        <Reveal className="mt-10 grid auto-rows-[152px] grid-cols-12 gap-4 max-lg:auto-rows-[128px]">
          {items.map((g, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-[6px] bg-surface"
              style={{ gridColumn: g.span, gridRow: g.rows }}
            >
              {g.img ? (
                <>
                  <Image
                    src={g.img}
                    alt={g.ph}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    style={g.pos ? { objectPosition: g.pos } : undefined}
                  />
                  {/* Pie de foto sobre velo de Grafito (manual 3.5 · 5.5) */}
                  <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(to_top,rgba(26,26,26,.85),transparent)] p-4 font-display text-[14px] font-bold text-white">
                    {g.ph}
                  </div>
                </>
              ) : (
                <div className="grid h-full w-full place-items-center p-4">
                  <span className="font-display text-[14px] font-bold text-ink-faint">{g.ph}</span>
                </div>
              )}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
