import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { buttonClass } from "@/components/Button";

interface BackbarProps {
  title?: string;
}

/* Cabecera de las páginas de municipio: misma base que la de inicio (manual 6.4). */
export function Backbar({ title = "Apía" }: BackbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-niebla">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <Link href="/" aria-label="Pablo Giordanelli · inicio" className="focus-ring rounded-[6px]">
            <Logo />
          </Link>
          <Link
            href="/"
            className="focus-ring inline-flex items-center gap-2 rounded-[6px] font-display text-[14px] font-semibold text-grafito underline underline-offset-4 max-sm:hidden"
          >
            <Icon name="arrowLeft" size={16} />
            Inicio
          </Link>
        </div>

        <span className="font-display text-[14px] font-bold text-grafito max-md:hidden">{title}</span>

        <a href="/#unete" className={buttonClass("primary", "md")}>
          Apoyar
        </a>
      </div>
    </header>
  );
}
