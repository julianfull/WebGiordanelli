import { DATA } from "@/lib/data";

/* Franja de cifras: bloque Rojo (color de bloque, manual 3.3) con texto blanco (6,0:1).
   Cifras en Montserrat Black; etiquetas en Montserrat (Inter nunca va en caja alta). */
export function Ribbon() {
  return (
    <div className="bg-rojo text-white">
      <div className="container-page">
        <div className={`grid ${DATA.ribbon.length === 3 ? "grid-cols-3 max-md:grid-cols-1" : "grid-cols-4 max-md:grid-cols-2"}`}>
          {DATA.ribbon.map((r, i) => (
            <div
              key={i}
              className={`border-l border-white/25 px-6 py-8 first:border-l-0 ${
                DATA.ribbon.length === 3
                  ? "max-md:border-l-0 max-md:border-t max-md:first:border-t-0"
                  : "max-md:[&:nth-child(3)]:border-l-0"
              }`}
            >
              <div className="font-display text-[clamp(31px,3vw,39px)] font-black tabular-nums tracking-[-.02em]">
                {r.num}
              </div>
              <div className="mt-1 font-display text-[12px] font-bold uppercase tracking-[.16em]">
                {r.lbl}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
