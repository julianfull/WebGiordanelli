import { NextResponse } from "next/server";
import { getRedes } from "@/lib/redes";

/* Feed público que la sección "Redes" vuelve a pedir cada pocos minutos para actualizarse sin
   recargar la página. Solo expone datos públicos de las publicaciones, nunca el token. */

export const revalidate = 600;

export async function GET() {
  const feed = await getRedes();
  return NextResponse.json(feed, {
    headers: { "Cache-Control": "public, s-maxage=600, stale-while-revalidate=300" },
  });
}
