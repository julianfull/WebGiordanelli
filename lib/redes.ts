/* Últimas publicaciones de Instagram y Facebook vía Graph API de Meta.
   Se consulta SOLO en el servidor: el token vive en variables de entorno y nunca llega al
   navegador, y los visitantes no necesitan iniciar sesión. Next cachea la respuesta y la renueva
   cada REDES_REVALIDATE segundos. Si falta configuración o Meta falla, la red queda en null y la
   sección muestra la tarjeta "Síguenos" en su lugar. Guía de configuración:
   integraciones/meta/LEEME.md */

import { createHmac } from "node:crypto";

export const REDES_REVALIDATE = 600; // 10 minutos

const GRAPH = "https://graph.facebook.com/v23.0";
const POSTS = 2;
const MAX_TEXTO = 400;

export type Red = "instagram" | "facebook";

export interface RedPost {
  id: string;
  red: Red;
  url: string;
  imagen: string | null;
  texto: string;
  fecha: string;
  tipo: "imagen" | "video" | "album" | "texto";
}

export interface RedesFeed {
  instagram: RedPost[] | null;
  facebook: RedPost[] | null;
}

/* Solo se aceptan enlaces https a los dominios de cada red, y fotos https. */
const HOSTS: Record<Red, string> = { instagram: "instagram.com", facebook: "facebook.com" };

function safeUrl(v: unknown, host?: string): string | null {
  if (typeof v !== "string") return null;
  try {
    const u = new URL(v);
    if (u.protocol !== "https:") return null;
    if (host && u.hostname !== host && !u.hostname.endsWith("." + host)) return null;
    return u.toString();
  } catch {
    return null;
  }
}

const texto = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, MAX_TEXTO) : "");

async function graph<T>(path: string, fields: string, token: string): Promise<T[]> {
  const params = new URLSearchParams({ fields, limit: String(POSTS), access_token: token });
  // appsecret_proof: si se configura, Meta rechaza el token usado sin la clave secreta de la app.
  const secret = process.env.META_APP_SECRET;
  if (secret) params.set("appsecret_proof", createHmac("sha256", secret).update(token).digest("hex"));

  const res = await fetch(`${GRAPH}/${path}?${params}`, {
    next: { revalidate: REDES_REVALIDATE, tags: ["redes"] },
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Graph API ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const out = (await res.json()) as { data?: T[] };
  return out.data ?? [];
}

interface IgMedia {
  id: string;
  caption?: string;
  media_type?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
}

async function instagram(token: string, igUserId: string): Promise<RedPost[]> {
  const data = await graph<IgMedia>(
    `${igUserId}/media`,
    "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp",
    token
  );
  return data.flatMap((m) => {
    const url = safeUrl(m.permalink, HOSTS.instagram);
    if (!url) return [];
    const video = m.media_type === "VIDEO";
    return [{
      id: m.id,
      red: "instagram" as const,
      url,
      imagen: safeUrl(video ? m.thumbnail_url : m.media_url),
      texto: texto(m.caption),
      fecha: m.timestamp ?? "",
      tipo: video ? "video" : m.media_type === "CAROUSEL_ALBUM" ? "album" : "imagen",
    }];
  });
}

interface FbPost {
  id: string;
  message?: string;
  full_picture?: string;
  permalink_url?: string;
  created_time?: string;
  status_type?: string;
}

async function facebook(token: string, pageId: string): Promise<RedPost[]> {
  const data = await graph<FbPost>(
    `${pageId}/posts`,
    "id,message,full_picture,permalink_url,created_time,status_type",
    token
  );
  return data.flatMap((p) => {
    const url = safeUrl(p.permalink_url, HOSTS.facebook);
    if (!url) return [];
    const imagen = safeUrl(p.full_picture);
    return [{
      id: p.id,
      red: "facebook" as const,
      url,
      imagen,
      texto: texto(p.message),
      fecha: p.created_time ?? "",
      tipo: p.status_type === "added_video" ? "video" : imagen ? "imagen" : "texto",
    }];
  });
}

async function intentar(red: Red, fn: () => Promise<RedPost[]>): Promise<RedPost[] | null> {
  try {
    const posts = await fn();
    return posts.length ? posts : null;
  } catch (err) {
    console.error(`[redes] No se pudo leer ${red}:`, err);
    return null;
  }
}

export async function getRedes(): Promise<RedesFeed> {
  const token = process.env.META_ACCESS_TOKEN;
  const igUserId = process.env.IG_USER_ID;
  const fbPageId = process.env.FB_PAGE_ID;
  const [ig, fb] = await Promise.all([
    token && igUserId ? intentar("instagram", () => instagram(token, igUserId)) : null,
    token && fbPageId ? intentar("facebook", () => facebook(token, fbPageId)) : null,
  ]);
  return { instagram: ig, facebook: fb };
}
