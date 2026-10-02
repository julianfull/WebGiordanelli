"use client";

import { useState } from "react";
import { DATA, SHOW_PROPUESTAS } from "@/lib/data";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { Button } from "@/components/Button";
import { fieldOnColor, sectionPad } from "@/components/ui";

interface FormState {
  nombre: string;
  tel: string;
  email: string;
  muni: string;
  msg: string;
}

const EMPTY: FormState = { nombre: "", tel: "", email: "", muni: "", msg: "" };

const ERRORES: Record<string, string> = {
  contacto_requerido: "Déjanos un teléfono o un correo para poder contactarte.",
  autorizacion_requerida: "Para enviar tus datos debes autorizar su tratamiento.",
  no_configurado: "El formulario aún no está conectado. Intenta más tarde.",
};

/* Cierre de la página: bloque Rojo (manual 3.3) con texto blanco y botón secundario Grafito. */
export function Unete() {
  const D = DATA;
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [autoriza, setAutoriza] = useState(false);
  const [trampa, setTrampa] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  const upd =
    (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value });

  /* Envía a /api/contacto, que guarda en la Hoja de cálculo de Drive y avisa por correo. */
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enviando) return;
    if (!form.nombre.trim()) return setError("Escribe tu nombre para poder registrarte.");
    if (!form.tel.trim() && !form.email.trim()) return setError(ERRORES.contacto_requerido);
    if (!autoriza) return setError(ERRORES.autorizacion_requerida);
    setError("");
    setEnviando(true);
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, autorizacion: autoriza, website: trampa, origen: window.location.href }),
      });
      const out = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !out.ok) throw new Error(out.error || "envio_fallido");
      setSent(true);
    } catch (err) {
      const code = err instanceof Error ? err.message : "";
      setError(ERRORES[code] ?? "No pudimos enviar tus datos. Revisa tu conexión e inténtalo de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section id="unete" className={`${sectionPad} bg-rojo text-white`}>
      <div className="container-page grid grid-cols-[.9fr_1.1fr] items-start gap-12 max-lg:grid-cols-1">
        <SectionHead
          tone="rojo"
          eyebrow="Únete"
          title="Transformemos Risaralda"
          sub="Tu participación es el motor de este movimiento. Déjanos tus datos y te mantendremos informado de todas las actividades en tu municipio."
        />
        {sent ? (
          <Reveal className="rounded-[6px] bg-surface p-8 text-ink">
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-[6px] bg-niebla text-grafito">
              <Icon name="check" size={24} />
            </div>
            <h3 className="text-[25px]">
              ¡Bienvenido al movimiento, {form.nombre.split(" ")[0]}!
            </h3>
            <p className="mt-3">
              Gracias por sumarte. Pronto nos comunicaremos contigo con las actividades en{" "}
              {form.muni || "tu municipio"}. {D.candidate.hashtag}
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => {
                setSent(false);
                setForm(EMPTY);
                setAutoriza(false);
              }}
            >
              Enviar otro
            </Button>
          </Reveal>
        ) : (
          <form onSubmit={submit} className="relative grid gap-4" noValidate>
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              <input
                className={fieldOnColor}
                aria-label="Tu nombre completo"
                placeholder="Tu nombre completo"
                value={form.nombre}
                onChange={upd("nombre")}
                required
              />
              <input
                className={fieldOnColor}
                aria-label="Teléfono o WhatsApp"
                placeholder="Teléfono / WhatsApp"
                value={form.tel}
                onChange={upd("tel")}
              />
            </div>
            <input
              className={fieldOnColor}
              type="email"
              aria-label="Correo electrónico"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={upd("email")}
            />
            <select
              className={fieldOnColor}
              aria-label="Municipio"
              value={form.muni}
              onChange={upd("muni")}
            >
              <option value="">¿De qué municipio eres?</option>
              {D.municipiosSelect.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <textarea
              className={`${fieldOnColor} min-h-[96px] resize-y`}
              aria-label={SHOW_PROPUESTAS ? "Propuesta más importante para tu municipio" : "Lo más importante para tu municipio"}
              placeholder={SHOW_PROPUESTAS ? "¿Qué propuesta te parece más importante para tu municipio?" : "¿Qué es lo más importante para tu municipio?"}
              value={form.msg}
              onChange={upd("msg")}
            />
            {/* Campo trampa contra bots: oculto para personas y lectores de pantalla */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
              value={trampa}
              onChange={(e) => setTrampa(e.target.value)}
            />
            {/* Autorización de tratamiento de datos (Ley 1581 de 2012) */}
            <label className="flex items-start gap-3 text-[14px] leading-[1.5] text-white">
              <input
                type="checkbox"
                className="focus-ring mt-0.5 h-5 w-5 flex-none accent-grafito"
                checked={autoriza}
                onChange={(e) => setAutoriza(e.target.checked)}
                required
              />
              <span>
                Autorizo al equipo de {D.candidate.name} a tratar mis datos personales para
                contactarme e informarme sobre sus actividades, conforme a la Ley 1581 de 2012.
              </span>
            </label>
            <Button type="submit" variant="secondary" size="lg" block disabled={enviando} aria-busy={enviando}>
              {enviando ? "Enviando…" : "Unirme al movimiento"} <Icon name="megaphone" size={18} />
            </Button>
            {error && (
              <p role="alert" className="rounded-[6px] bg-surface px-4 py-3 text-[14px] font-semibold text-ink">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
