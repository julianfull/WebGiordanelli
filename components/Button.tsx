import type { ButtonHTMLAttributes } from "react";

/* Componentes base del manual (6.4): primario Rojo, secundario Grafito, borde y acento Turquesa.
   Nunca naranja ni turquesa sobre blanco en un botón: no alcanzan el contraste mínimo. */
type Variant = "primary" | "secondary" | "outline" | "outlineDark" | "accent";

const BASE =
  "inline-flex min-h-12 items-center justify-center gap-2.5 font-display font-bold uppercase tracking-[.08em] " +
  "rounded-[6px] border border-transparent whitespace-nowrap transition-colors duration-200 focus-ring";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-rojo text-white hover:bg-rojo-profundo",
  secondary: "bg-grafito text-white hover:bg-black",
  /* Borde sobre fondo claro */
  outline: "bg-transparent text-grafito border-grafito hover:bg-grafito hover:text-white",
  /* Borde sobre fondo oscuro o fotografía con velo */
  outlineDark: "bg-transparent text-white border-white hover:bg-white hover:text-grafito",
  /* Acento: Turquesa con texto Grafito (11:1). Uso puntual. */
  accent: "bg-turquesa text-grafito hover:bg-turquesa-hondo",
};

export function buttonClass(
  variant: Variant = "primary",
  size: "md" | "lg" = "md",
  block = false,
  extra = ""
): string {
  const sizing = size === "lg" ? "px-8 text-[14px]" : "px-6 text-[13px]";
  return `${BASE} ${VARIANTS[variant]} ${sizing} ${block ? "w-full" : ""} ${extra}`;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "md" | "lg";
  block?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  block = false,
  className = "",
  ...props
}: ButtonProps) {
  return <button className={buttonClass(variant, size, block, className)} {...props} />;
}
