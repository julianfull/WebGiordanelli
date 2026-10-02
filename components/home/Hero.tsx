import Image from "next/image";
import { DATA, SHOW_PROPUESTAS } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { Franjas } from "@/components/Franjas";
import { buttonClass } from "@/components/Button";
import { eyebrowClass } from "@/components/ui";

/* Hero de inicio: fondo Grafito, franjas a sangre por la izquierda (única aparición en la página),
   titular en caja alta y palabra de énfasis en Naranja (4,7:1 sobre Grafito, solo titular). */
export function Hero() {
  const D = DATA;
  return (
    <section id="top" className="surface-dark">
      <Franjas />
      <div className="container-page relative z-[2] grid grid-cols-[1.05fr_.95fr] items-center gap-14 pb-[clamp(64px,8vw,112px)] pl-[calc(clamp(21px,6vw,77px)+24px)] pt-[clamp(56px,7vw,104px)] max-lg:grid-cols-1 max-lg:gap-10">
        <div>
          {SHOW_PROPUESTAS && (
            <Reveal as="span" className={eyebrowClass("dark")}>
              Candidato a Gobernador · {D.candidate.period}
            </Reveal>
          )}
          <Reveal
            as="h1"
            delay={60}
            className="mt-6 text-[clamp(39px,5.4vw,72px)] text-white"
          >
            Una <span className="text-naranja">Risaralda</span> de todos, para todos
          </Reveal>
          <Reveal
            as="p"
            delay={120}
            className="mt-6 max-w-[40ch] text-[20px] leading-[1.45] text-[var(--on-dark-dim)]"
          >
            Con experiencia en la Asamblea Departamental y un profundo amor por cada uno de
            nuestros municipios, {D.candidate.name} trabaja por un departamento más cercano, transparente y
            unido.
          </Reveal>
          <Reveal delay={160} className="mt-6 font-display text-[20px] font-bold text-turquesa">
            {D.candidate.hashtag}
          </Reveal>
          <Reveal delay={220} className="mt-8 flex flex-wrap gap-4">
            {SHOW_PROPUESTAS && (
              <a href="#propuestas" className={buttonClass("primary", "lg")}>
                Ver propuestas
              </a>
            )}
            <a href="#unete" className={buttonClass("outlineDark", "lg")}>
              Unirse a Pablo
            </a>
          </Reveal>
        </div>

        <Reveal delay={140} className="relative max-lg:max-w-[480px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[6px]">
            <Image
              src="/pablo-cafe.png"
              alt="Pablo Giordanelli en un municipio cafetero de Risaralda"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="velo-bottom" />
            <div className="absolute bottom-0 left-0 z-[3] p-6 text-white">
              <div className="font-display text-[20px] font-extrabold">{D.candidate.name}</div>
              {SHOW_PROPUESTAS && <div className="text-[14px] text-[var(--on-dark-dim)]">{D.candidate.role}</div>}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
