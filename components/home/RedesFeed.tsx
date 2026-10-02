"use client";

import { useEffect, useState } from "react";
import { SOCIAL } from "@/lib/data";
import type { Red, RedPost, RedesFeed as Feed } from "@/lib/redes";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { buttonClass } from "@/components/Button";

/* Cada 5 min (y al volver a la pestaña) se pide /api/redes; el servidor responde desde su caché,
   así que Meta se consulta como mucho una vez cada 10 min sin importar cuántas visitas haya. */
const REFRESCO_MS = 5 * 60 * 1000;

const PERFIL = {
  instagram: SOCIAL.find((s) => s.icon === "instagram")!,
  facebook: SOCIAL.find((s) => s.icon === "facebook")!,
};

/* Fecha fija en hora de Colombia: igual en servidor y navegador (sin desajustes al hidratar). */
const fechaFmt = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "America/Bogota",
});

function fecha(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : fechaFmt.format(d);
}

export function RedesFeed({ initial }: { initial: Feed }) {
  const [feed, setFeed] = useState(initial);

  useEffect(() => {
    let vivo = true;
    const refrescar = async () => {
      if (document.visibilityState !== "visible") return;
      try {
        const res = await fetch("/api/redes");
        if (!res.ok) return;
        const nuevo = (await res.json()) as Feed;
        // Si Meta falla momentáneamente se conservan las publicaciones que ya se ven.
        if (vivo)
          setFeed((prev) => ({
            instagram: nuevo.instagram ?? prev.instagram,
            facebook: nuevo.facebook ?? prev.facebook,
          }));
      } catch {
        /* sin conexión: se reintenta en el próximo ciclo */
      }
    };
    const id = setInterval(refrescar, REFRESCO_MS);
    document.addEventListener("visibilitychange", refrescar);
    return () => {
      vivo = false;
      clearInterval(id);
      document.removeEventListener("visibilitychange", refrescar);
    };
  }, []);

  return (
    <div className="mt-12 grid grid-cols-2 gap-10 max-lg:grid-cols-1 max-lg:gap-14">
      <Grupo red="instagram" posts={feed.instagram} />
      <Grupo red="facebook" posts={feed.facebook} />
    </div>
  );
}

function Grupo({ red, posts }: { red: Red; posts: RedPost[] | null }) {
  const p = PERFIL[red];
  return (
    <div>
      <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-12 w-12 flex-none place-items-center rounded-[6px] bg-white/10 text-white">
            <Icon name={red} size={22} />
          </span>
          <div className="min-w-0">
            <h3 className="text-[20px] text-white">{p.label}</h3>
            <div className="truncate text-[14px] text-[var(--on-dark-dim)]">{p.handle}</div>
          </div>
        </div>
        {posts && (
          <span className="flex flex-none items-center gap-2 text-[12px] font-semibold uppercase tracking-[.16em] text-turquesa">
            <span className="h-2 w-2 animate-pulse rounded-full bg-turquesa motion-reduce:animate-none" aria-hidden="true" />
            En vivo
          </span>
        )}
      </div>

      {posts ? (
        <div className="mt-6 grid grid-cols-2 gap-6 max-sm:grid-cols-1">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 80} className="h-full">
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      ) : (
        <Siguenos red={red} />
      )}
    </div>
  );
}

function PostCard({ post }: { post: RedPost }) {
  const [abierto, setAbierto] = useState(false);
  const [sinFoto, setSinFoto] = useState(false);
  const nombre = PERFIL[post.red].label;
  const largo = post.texto.length > 140;
  const conFoto = post.imagen && !sinFoto;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[6px] border border-white/15 bg-white/[.04] transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-white/40">
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="group relative block aspect-square overflow-hidden bg-white/5"
      >
        {conFoto ? (
          <img
            src={post.imagen!}
            alt=""
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setSinFoto(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transition-none"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-rojo to-rojo-profundo text-white">
            <Icon name={post.tipo === "texto" ? "quote" : post.red} size={48} />
          </div>
        )}
        {post.tipo !== "imagen" && post.tipo !== "texto" && (
          <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-[6px] bg-grafito/75 text-white">
            <Icon name={post.tipo === "video" ? "play" : "layers"} size={18} />
          </span>
        )}
      </a>

      <div className="flex flex-1 flex-col p-5">
        {post.fecha && (
          <time dateTime={post.fecha} className="text-[12px] font-semibold uppercase tracking-[.16em] text-turquesa">
            {fecha(post.fecha)}
          </time>
        )}
        {post.texto && (
          <>
            <p
              className={`mt-2 whitespace-pre-line break-words text-[15px] leading-[1.55] text-[var(--on-dark-dim)] ${
                abierto ? "" : "line-clamp-3"
              }`}
            >
              {post.texto}
            </p>
            {largo && (
              <button
                type="button"
                onClick={() => setAbierto(!abierto)}
                aria-expanded={abierto}
                className="focus-ring mt-1 w-fit rounded-[6px] text-[14px] font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-turquesa"
              >
                {abierto ? "Ver menos" : "Ver más"}
              </button>
            )}
          </>
        )}
        <div className="mt-auto pt-5">
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver publicación en ${nombre} (se abre en una pestaña nueva)`}
            className={buttonClass("outlineDark", "md", true)}
          >
            Ver en {nombre} <Icon name="externalLink" size={16} />
          </a>
        </div>
      </div>
    </article>
  );
}

/* Sin token configurado o si Meta no responde: invitación a seguir el perfil. */
function Siguenos({ red }: { red: Red }) {
  const p = PERFIL[red];
  return (
    <div className="mt-6 flex flex-col items-start gap-5 rounded-[6px] border border-white/15 bg-white/[.04] p-8">
      <p className="text-[16px] text-[var(--on-dark-dim)]">
        Sigue a Pablo en {p.label} para ver sus recorridos por los municipios, su trabajo en la
        Asamblea y los encuentros con la comunidad.
      </p>
      <a
        href={p.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Seguir a Pablo Giordanelli en ${p.label} (se abre en una pestaña nueva)`}
        className={buttonClass("accent", "md")}
      >
        <Icon name={red} size={18} /> Seguir en {p.label}
      </a>
    </div>
  );
}
