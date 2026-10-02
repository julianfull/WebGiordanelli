"use client";

import { useState } from "react";
import type { MunicipioPageData } from "@/lib/data";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { Button } from "@/components/Button";
import { fieldInk, sectionPad } from "@/components/ui";

interface FormState {
  name: string;
  sector: string;
  txt: string;
  tag: string;
}

const ERRORES: Record<string, string> = {
  autorizacion_requerida: "Para enviar tu idea debes autorizar el tratamiento de tus datos.",
  no_configurado: "El formulario aún no está conectado. Intenta más tarde.",
};

export function Escucha({ data: A }: { data: MunicipioPageData }) {
  const c = A.copy.escucha;
  const TAGS = c.tags?.length ? c.tags : ["Otro"];
  const [f, setF] = useState<FormState>({ name: "", sector: "", txt: "", tag: TAGS[0] });
  const [autoriza, setAutoriza] = useState(false);
  const [trampa, setTrampa] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [flash, setFlash] = useState(false);
  const [error, setError] = useState("");

  const upd =
    (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setF({ ...f, [k]: e.target.value });

  /* Envía a /api/ideas, que la guarda en la pestaña "Ideas" de la Hoja de cálculo y avisa por correo. */
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enviando) return;
    if (!f.name.trim()) return setError("Escribe tu nombre para enviar tu idea.");
    if (!f.txt.trim()) return setError(`Escribe tu idea para ${A.name}.`);
    if (!autoriza) return setError(ERRORES.autorizacion_requerida);
    setError("");
    setFlash(false);
    setEnviando(true);
    try {
      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: f.name,
          muni: A.name,
          sector: f.sector,
          tema: f.tag,
          idea: f.txt,
          autorizacion: autoriza,
          website: trampa,
          origen: window.location.href,
        }),
      });
      const out = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !out.ok) throw new Error(out.error || "envio_fallido");
      setF({ name: "", sector: "", txt: "", tag: TAGS[0] });
      setAutoriza(false);
      setFlash(true);
    } catch (err) {
      const code = err instanceof Error ? err.message : "";
      setError(ERRORES[code] ?? "No pudimos enviar tu idea. Revisa tu conexión e inténtalo de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  const labelClass = "grid gap-2 font-display text-[14px] font-bold text-ink";

  return (
    <section className={sectionPad}>
      <div className="container-page">
        <SectionHead eyebrow={c.eyebrow} title={c.title} sub={c.sub} />
        <div className="mt-12 max-w-[720px]">
          <Reveal
            as="form"
            onSubmit={submit}
            noValidate
            className="relative grid gap-4 rounded-[6px] border border-line bg-surface-2 p-8"
          >
            <label className={labelClass}>
              Tu nombre
              <input
                className={fieldInk}
                placeholder="Nombre y apellido"
                value={f.name}
                onChange={upd("name")}
                required
              />
            </label>
            <label className={labelClass}>
              {c.sectorLabel}
              <input
                className={fieldInk}
                placeholder={c.sectorPlaceholder}
                value={f.sector}
                onChange={upd("sector")}
              />
            </label>
            <label className={labelClass}>
              Tema
              <select className={fieldInk} value={f.tag} onChange={upd("tag")}>
                {TAGS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className={labelClass}>
              Tu idea para {A.name}
              <textarea
                className={`${fieldInk} min-h-[96px] resize-y`}
                placeholder={c.ideaPlaceholder}
                value={f.txt}
                onChange={upd("txt")}
                required
              />
            </label>
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
            <label className="flex items-start gap-3 text-[14px] leading-[1.5] text-ink">
              <input
                type="checkbox"
                className="focus-ring mt-0.5 h-5 w-5 flex-none accent-grafito"
                checked={autoriza}
                onChange={(e) => setAutoriza(e.target.checked)}
                required
              />
              <span>
                Autorizo al equipo de Pablo Giordanelli a tratar mis datos personales para recibir y
                gestionar mi idea, conforme a la Ley 1581 de 2012.
              </span>
            </label>
            <Button type="submit" variant="primary" size="lg" block disabled={enviando} aria-busy={enviando}>
              {enviando ? "Enviando…" : "Enviar mi idea"} <Icon name="send" size={18} />
            </Button>
            {flash && (
              <div role="status" className="flex items-center gap-2 font-display text-[14px] font-bold text-ink">
                <Icon name="check" size={16} /> ¡Gracias! Recibimos tu idea para {A.name}.
              </div>
            )}
            {error && (
              <p role="alert" className="rounded-[6px] border border-rojo bg-surface px-4 py-3 text-[14px] font-semibold text-ink">
                {error}
              </p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
