import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MUNICIPIO_PAGES, getMunicipioPage } from "@/lib/municipios";
import { SHOW_PROPUESTAS } from "@/lib/data";
import { Footer } from "@/components/Footer";
import { Backbar } from "@/components/apia/Backbar";
import { ApiaHero } from "@/components/apia/ApiaHero";
import { Quote } from "@/components/apia/Quote";
import { Municipio } from "@/components/apia/Municipio";
import { ApiaPropuestas } from "@/components/apia/ApiaPropuestas";
import { Galeria } from "@/components/apia/Galeria";
import { Eventos } from "@/components/apia/Eventos";
import { Gastronomia } from "@/components/apia/Gastronomia";
import { Escucha } from "@/components/apia/Escucha";

type Params = { municipio: string };

// Solo existen las 14 páginas de municipio; cualquier otra ruta es 404.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return MUNICIPIO_PAGES.map((m) => ({ municipio: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const m = getMunicipioPage((await params).municipio);
  if (!m) return {};
  return {
    title: `${m.name}, ${m.headlineHl} · Pablo Giordanelli`,
    description: `${SHOW_PROPUESTAS ? "Propuesta territorial para" : "Conoce"} ${m.name}, Risaralda. ${m.intro} #RisaraldaNosUne`,
  };
}

export default async function MunicipioPage({ params }: { params: Promise<Params> }) {
  const m = getMunicipioPage((await params).municipio);
  if (!m) notFound();
  return (
    <>
      <Backbar title={m.name} />
      <div className="view-enter">
        <ApiaHero data={m} />
        <Quote data={m} />
        <Municipio data={m} />
        {SHOW_PROPUESTAS && <ApiaPropuestas data={m} />}
        <Galeria data={m} />
        <Eventos data={m} />
        <Gastronomia data={m} />
        <Escucha key={m.slug} data={m} />
      </div>
      <Footer />
    </>
  );
}
