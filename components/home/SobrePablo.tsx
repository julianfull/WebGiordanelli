import Image from "next/image";
import { DATA } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { sectionPad } from "@/components/ui";

/* Fondo Grafito (manual 5.3, tipo 4) con antetítulos en Turquesa. */
export function SobrePablo() {
  return (
    <section id="sobre" className={`${sectionPad} surface-dark`}>
      <div className="container-page">
        <div className="grid grid-cols-[.9fr_1.1fr] items-center gap-14 max-lg:grid-cols-1 max-lg:gap-16">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[6px]">
              <Image
                src="/pablo-formal.png"
                alt="Pablo Giordanelli, Diputado de la Asamblea de Risaralda"
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-2 aspect-[3/2] w-[52%] overflow-hidden rounded-[6px] border-4 border-grafito">
              <Image
                src="/pablo-pareja.png"
                alt="Pablo Giordanelli en Risaralda"
                fill
                sizes="(max-width: 1024px) 50vw, 18vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <SectionHead
              tone="dark"
              eyebrow="Sobre Pablo"
              title="Un liderazgo forjado<br/>en Risaralda"
              sub="Pablo Giordanelli es un político risaraldense comprometido con su tierra, su gente y el futuro del departamento. Desde la Asamblea Departamental ha trabajado incansablemente por los intereses de los risaraldenses."
            />
            <div className="mt-8 grid gap-6">
              {DATA.timeline.map((t, i) => (
                <Reveal key={i} delay={i * 70} className="tl-item">
                  <div className="font-display text-[12px] font-bold uppercase tracking-[.24em] text-turquesa">
                    {t.tt}
                  </div>
                  <div className="mt-1 text-[16px] text-[var(--on-dark-dim)]">{t.tp}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
