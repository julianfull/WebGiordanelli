import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/home/Hero";
import { Ribbon } from "@/components/home/Ribbon";
import { Propuestas } from "@/components/home/Propuestas";
import { Municipios } from "@/components/home/Municipios";
import { SobrePablo } from "@/components/home/SobrePablo";
import { Redes } from "@/components/home/Redes";
import { Unete } from "@/components/home/Unete";
import { SHOW_PROPUESTAS } from "@/lib/data";

/* La sección Redes renueva las publicaciones cada 10 min (ver lib/redes.ts). */
export const revalidate = 600;

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="view-enter">
        <Hero />
        <Ribbon />
        {SHOW_PROPUESTAS && <Propuestas />}
        <Municipios />
        <SobrePablo />
        <Redes />
        <Unete />
      </div>
      <Footer />
    </>
  );
}
