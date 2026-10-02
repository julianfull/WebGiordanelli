import Image from "next/image";
import type { MunicipioPageData } from "@/lib/data";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { sectionPad } from "@/components/ui";

export function Municipio({ data }: { data: MunicipioPageData }) {
  const M = data.municipio;
  const colors = M.flag.colors || [];
  return (
    <section className={`${sectionPad} bg-surface-2`}>
      <div className="container-page">
        <div className="grid grid-cols-[1.05fr_.95fr] items-start gap-14 max-lg:grid-cols-1 max-lg:gap-12">
          <div>
            <SectionHead eyebrow="El Municipio" title={`${data.name}, Risaralda`} />
            {/* Destacados con peso (Inter SemiBold), nunca con color ni cursiva (manual 4.2 · 4.3) */}
            <div className="mt-6 grid gap-4">
              {(M.intro || []).map((p, i) => (
                <p
                  key={i}
                  className="max-w-[62ch] text-[16px] [&_em]:font-semibold [&_em]:not-italic [&_strong]:font-semibold"
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 max-sm:grid-cols-2">
              {(M.stats || []).map((s) => (
                <Reveal key={s.label} className="rounded-[6px] border border-line bg-surface p-4">
                  <div className="text-grafito">
                    <Icon name={s.icon} size={20} />
                  </div>
                  <div className="mt-2 font-display text-[14px] font-bold text-ink">{s.label}</div>
                  <div className="mt-1 text-[14px] tabular-nums text-ink-faint">{s.value}</div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="rounded-[6px] border border-line bg-surface p-8">
            <div className="mb-6 font-display text-[12px] font-bold uppercase tracking-[.24em] text-rojo">
              Bandera oficial del municipio
            </div>
            <div className="relative flex aspect-[2/1] flex-col overflow-hidden rounded-[6px] border border-line">
              {M.flag.image ? (
                <Image
                  src={M.flag.image}
                  alt={`Bandera oficial de ${data.name}, Risaralda`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-contain"
                />
              ) : (
                colors.map((c) => (
                  <div key={c.name} className="flex-1" style={{ background: c.hex }} />
                ))
              )}
            </div>
            {/* Los colores se nombran siempre con texto, no solo con la muestra (manual 3.5) */}
            {colors.length > 0 && (
            <div className="mt-6 grid gap-3">
              {colors.map((c) => (
                <div key={c.name} className="flex items-center gap-3 text-[16px]">
                  <span
                    className="h-4 w-4 flex-none rounded-[3px] border border-line"
                    style={{ background: c.hex }}
                  />
                  <span>
                    <span className="font-semibold">{c.name}:</span> {c.meaning}
                  </span>
                </div>
              ))}
            </div>
            )}
            {M.flag.note && <p className="mt-6 text-[14px] text-ink-faint">{M.flag.note}</p>}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
