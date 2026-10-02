import Image from "next/image";
import { getRedes } from "@/lib/redes";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { sectionPad } from "@/components/ui";
import { RedesFeed } from "@/components/home/RedesFeed";

/* Fondo Grafito (manual 5.3) con antetítulo Turquesa. El servidor trae las últimas publicaciones
   (cacheadas 10 min) y RedesFeed las vuelve a pedir en el navegador para mantenerlas al día. */
export async function Redes() {
  const feed = await getRedes();
  return (
    <section id="redes" className={`${sectionPad} surface-dark border-t border-white/10`}>
      <div className="container-page">
        <SectionHead
          tone="dark"
          eyebrow="Nuestras redes"
          title="Conectados con<br/>Risaralda"
          sub="Lo último de Pablo en Instagram y Facebook: recorridos, debates en la Asamblea y encuentros con la gente de los 14 municipios."
        />
        <Reveal className="mt-12 overflow-hidden rounded-[6px] border border-white/15">
          <Image
            src="/redes-banner.jpg"
            alt="Pablo Giordanelli sonriendo junto a un yipao. «No somos una marca de gobierno, sino una propuesta de visión»."
            width={1600}
            height={592}
            sizes="(max-width: 1280px) 100vw, 1232px"
            className="h-auto w-full"
          />
        </Reveal>
        <RedesFeed initial={feed} />
      </div>
    </section>
  );
}
