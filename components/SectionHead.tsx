import { eyebrowClass, type Tone } from "@/components/ui";

interface SectionHeadProps {
  eyebrow?: string;
  /** Permite <br/> embebido en el título, igual que el prototipo original. */
  title: string;
  sub?: string;
  /** Fondo de la sección: claro (por defecto), Grafito o Rojo. */
  tone?: Tone;
}

/* Manual 4.3 · 4.5: antetítulo + subtitular + entradilla, siempre alineados a la izquierda. */
export function SectionHead({ eyebrow, title, sub, tone: t = "light" }: SectionHeadProps) {
  const onColor = t !== "light";
  return (
    <div className="max-w-[720px]">
      {eyebrow && <span className={eyebrowClass(t)}>{eyebrow}</span>}
      <h2
        className={`mt-4 text-[clamp(31px,3.6vw,49px)] ${onColor ? "text-white" : ""}`}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {sub && (
        <p
          className={`mt-4 max-w-[62ch] text-[20px] leading-[1.45] ${
            t === "dark" ? "text-[var(--on-dark-dim)]" : t === "rojo" ? "text-white" : "text-ink"
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
