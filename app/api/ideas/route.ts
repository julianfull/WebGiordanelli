import { NextResponse } from "next/server";
import { enviarAScript, ScriptNoConfigurado, str } from "@/lib/googleScript";

/* Recibe el formulario "Tu idea para…" de las páginas de municipio. Va al mismo Apps Script que
   "Únete", marcado con tipo "idea" para que lo guarde en la pestaña "Ideas" de la hoja. */

const MAX = { nombre: 120, muni: 60, sector: 120, tema: 60, idea: 2000, origen: 200 } as const;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Campo trampa: los humanos no lo ven; si viene lleno es un bot. Se responde "ok" sin guardar.
  if (str(body.website, 200)) return NextResponse.json({ ok: true });

  const data = {
    tipo: "idea",
    nombre: str(body.nombre, MAX.nombre),
    muni: str(body.muni, MAX.muni),
    sector: str(body.sector, MAX.sector),
    tema: str(body.tema, MAX.tema),
    idea: str(body.idea, MAX.idea),
    origen: str(body.origen, MAX.origen),
    autorizacion: body.autorizacion === true,
  };

  if (!data.nombre) return NextResponse.json({ ok: false, error: "nombre_requerido" }, { status: 400 });
  if (!data.idea) return NextResponse.json({ ok: false, error: "idea_requerida" }, { status: 400 });
  if (!data.autorizacion) return NextResponse.json({ ok: false, error: "autorizacion_requerida" }, { status: 400 });

  try {
    await enviarAScript(data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof ScriptNoConfigurado) {
      console.error("[ideas]", err.message);
      return NextResponse.json({ ok: false, error: "no_configurado" }, { status: 503 });
    }
    console.error("[ideas] Error al enviar a Google:", err);
    return NextResponse.json({ ok: false, error: "envio_fallido" }, { status: 502 });
  }
}
