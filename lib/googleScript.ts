/* Envío al Google Apps Script que guarda la fila en la Hoja de cálculo de Drive y avisa por
   correo (integraciones/google-apps-script). La URL y la clave solo viven en el servidor. */

export class ScriptNoConfigurado extends Error {}

export const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function enviarAScript(data: Record<string, unknown>): Promise<void> {
  const url = process.env.GOOGLE_SCRIPT_URL;
  const secret = process.env.GOOGLE_SCRIPT_SECRET;
  if (!url || !secret) throw new ScriptNoConfigurado("Faltan GOOGLE_SCRIPT_URL o GOOGLE_SCRIPT_SECRET");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, secret }),
    redirect: "follow",
    cache: "no-store",
  });
  const out = (await res.json().catch(() => null)) as { ok?: boolean } | null;
  if (!res.ok || !out?.ok) throw new Error(`Apps Script respondió ${res.status}`);
}
