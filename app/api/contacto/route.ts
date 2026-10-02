import { NextResponse } from "next/server";
import { enviarAScript, ScriptNoConfigurado, str } from "@/lib/googleScript";

/* Recibe el formulario "Únete" y lo reenvía al Google Apps Script que guarda la fila en la
   Hoja de cálculo de Drive y envía el correo con la etiqueta. La URL y la clave del script solo
   viven en el servidor (variables de entorno), nunca en el navegador. */

const MAX = { nombre: 120, tel: 40, email: 160, muni: 60, msg: 2000, origen: 200 } as const;

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
    nombre: str(body.nombre, MAX.nombre),
    tel: str(body.tel, MAX.tel),
    email: str(body.email, MAX.email),
    muni: str(body.muni, MAX.muni),
    msg: str(body.msg, MAX.msg),
    origen: str(body.origen, MAX.origen),
    autorizacion: body.autorizacion === true,
  };

  if (!data.nombre) return NextResponse.json({ ok: false, error: "nombre_requerido" }, { status: 400 });
  if (!data.tel && !data.email) return NextResponse.json({ ok: false, error: "contacto_requerido" }, { status: 400 });
  if (!data.autorizacion) return NextResponse.json({ ok: false, error: "autorizacion_requerida" }, { status: 400 });

  try {
    await enviarAScript(data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof ScriptNoConfigurado) {
      console.error("[contacto]", err.message);
      return NextResponse.json({ ok: false, error: "no_configurado" }, { status: 503 });
    }
    console.error("[contacto] Error al enviar a Google:", err);
    return NextResponse.json({ ok: false, error: "envio_fallido" }, { status: 502 });
  }
}
