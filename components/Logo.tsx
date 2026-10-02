/* Logotipo apilado: "PABLO" arriba y "GIORDANELLI" debajo, ocupando el mismo ancho que el nombre
   (versión pedida por la campaña; el manual 2.2 fija el apellido a 0,32 X y con tracking libre).

   Todo va en un SVG con las unidades del recorte /logo-pablo.png (594 × 144):
   - "PABLO" es el recorte del archivo maestro /logo.png, sin redibujar.
   - El apellido mide 0,34 de la altura de PABLO (mayúscula de 48 u; en Montserrat la mayúscula
     es 0,70 em → fuente de 68 u) y se estira con textLength al ancho exacto de PABLO.
   - Separación entre líneas: 22 u.
   El recorte conserva el fondo Gris Niebla del maestro: el logo solo va sobre fondo Niebla. */
const W = 594; // ancho del recorte
const PABLO_H = 144; // alto del recorte
const GAP = 22;
const CAP = 48;
const INSET = 2; // margen del recorte alrededor de las letras

export function Logo({ className = "h-10 lg:h-12 xl:h-14" }: { className?: string }) {
  const H = PABLO_H + GAP + CAP + INSET;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Pablo Giordanelli"
      className={`w-auto ${className}`}
    >
      <image href="/logo-pablo.png" x={0} y={0} width={W} height={PABLO_H} />
      <text
        x={INSET}
        y={PABLO_H + GAP + CAP}
        textLength={W - INSET * 2}
        lengthAdjust="spacing"
        fontSize={CAP / 0.7}
        fontWeight={600}
        fill="var(--color-grafito)"
        style={{ fontFamily: "var(--font-display)" }}
      >
        GIORDANELLI
      </text>
    </svg>
  );
}
