import Image from "next/image";
import type { MunicipioPageData } from "@/lib/data";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { Franjas } from "@/components/Franjas";
import { eyebrowClass } from "@/components/ui";

/* Hero a sangre con foto: velo de Grafito bajo el texto (manual 5.5), franjas a la izquierda
   (única aparición en la página) y titular en caja alta. El municipio va en el titular (3.3). */
export function ApiaHero({ data: A }: { data: MunicipioPageData }) {
  return (
    <section className="relative flex min-h-[78vh] items-center overflow-hidden bg-grafito text-white">
      <div className="absolute inset-0">
        <Image
          src={A.hero.image}
          alt={A.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: A.hero.pos ?? "center" }}
        />
      </div>
      <div className="velo" />
      <Franjas />
      <div className="container-page pl-[calc(clamp(21px,6vw,77px)+24px)]">
        <div className="relative z-[2] max-w-[760px] py-16">
          <Reveal className={eyebrowClass("dark")}>
            <Icon name={A.hero.icon} size={16} /> {A.nickname}
          </Reveal>
          <Reveal
            as="h1"
            delay={60}
            className="mt-4 text-[clamp(39px,6.4vw,88px)] text-white"
          >
            {A.headline1} <span className="text-naranja">{A.headlineHl}</span>
          </Reveal>
          <Reveal
            as="p"
            delay={120}
            className="mt-6 max-w-[48ch] text-[20px] leading-[1.45] text-[var(--on-dark-dim)]"
          >
            {A.intro}
          </Reveal>
        </div>
      </div>
      {/* Crédito fotográfico: obligatorio en fotos de terceros con licencia libre */}
      {A.hero.credit && (
        <a
          href={A.hero.credit.url}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring absolute bottom-3 right-4 z-[3] max-w-[90%] rounded-[6px] bg-grafito/70 px-2 py-1 text-right text-[12px] text-white underline decoration-white/50 underline-offset-2"
        >
          {A.hero.credit.text}
        </a>
      )}
    </section>
  );
}
