"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";

interface ImageLightboxProps {
  image: string;
  alt: string;
  delay?: number;
  className?: string;
  /** Contenido de la tarjeta que abre la imagen. */
  children: ReactNode;
}

/* Tarjeta clicable que abre una imagen sobrepuesta a la página (la página queda visible, oscurecida, detrás). */
export function ImageLightbox({ image, alt, delay, className = "", children }: ImageLightboxProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <Reveal
        as="button"
        type="button"
        delay={delay}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={`focus-ring cursor-pointer text-left ${className}`}
      >
        {children}
      </Reveal>

      {open &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] grid place-items-center bg-grafito/85 p-4 sm:p-8"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="animate-pop relative max-h-full w-full max-w-[1100px] overflow-auto rounded-[6px] bg-surface shadow-[var(--shadow-lg)]"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="focus-ring sticky top-3 z-10 float-right mr-3 mt-3 grid h-12 w-12 place-items-center rounded-[6px] bg-grafito font-display text-[24px] font-bold leading-none text-white transition-colors hover:bg-black"
              >
                ×
              </button>
              <Image
                src={image}
                alt={alt}
                width={1312}
                height={1199}
                sizes="(max-width: 1100px) 100vw, 1100px"
                className="h-auto w-full"
                priority
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
