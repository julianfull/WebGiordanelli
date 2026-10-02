/* Helpers de clases reutilizables (Tailwind) compartidos entre componentes. */

/* padding vertical de las secciones (múltiplos de 8 px, manual 6.4) */
export const sectionPad = "py-[clamp(64px,9vw,128px)]";

/* Tarjeta estándar: radio 6 px, borde Línea, sin adornos (manual 5.1 · 6.4) */
export const cardClass =
  "rounded-[6px] border border-line bg-surface p-8 transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]";

/* Caja del icono de una tarjeta: icono Grafito sobre Gris Niebla (manual 5.2) */
export const iconTileClass =
  "grid h-12 w-12 flex-none place-items-center rounded-[6px] bg-niebla text-grafito";

/* Antetítulo · etiqueta: Montserrat Bold, caja alta, tracking +0,24 em, color de acento (manual 4.3).
   Sobre claro va en Rojo (6,7:1); sobre Grafito en Turquesa (11:1); sobre Rojo en blanco
   (turquesa sobre rojo solo se admite en titulares grandes, 3.4). */
export type Tone = "light" | "dark" | "rojo";

export function eyebrowClass(t: Tone = "light"): string {
  const color = t === "dark" ? "text-turquesa" : t === "rojo" ? "text-white" : "text-rojo";
  return `inline-flex items-center gap-2 font-display text-[12px] font-bold uppercase tracking-[.24em] ${color}`;
}

/* input claro — escucha ciudadana */
export const fieldInk =
  "w-full min-h-12 bg-surface border border-line rounded-[6px] px-4 py-3 font-body font-normal text-ink " +
  "text-[16px] placeholder:text-ink-faint focus-ring transition-[border-color] duration-150 focus:border-grafito";

/* input sobre fondo de color — formulario Únete (fondo Rojo): campos blancos con texto Grafito */
export const fieldOnColor =
  "w-full min-h-12 bg-surface border border-transparent rounded-[6px] px-4 py-3 font-body font-normal text-ink " +
  "text-[16px] placeholder:text-ink-faint focus-ring";
