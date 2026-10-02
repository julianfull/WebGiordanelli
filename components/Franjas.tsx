/* Sistema de franjas (manual 5.1): tríada vertical Rojo → Naranja → Turquesa en proporción 4 : 2 : 1,
   siempre a sangre por un borde y una sola vez por página. */
export function Franjas({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 left-0 z-[3] flex w-[clamp(21px,6vw,77px)] ${className}`}
    >
      <span className="flex-[4] bg-rojo" />
      <span className="flex-[2] bg-naranja" />
      <span className="flex-[1] bg-turquesa" />
    </div>
  );
}
