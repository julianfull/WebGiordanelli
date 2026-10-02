# Pablo Giordanelli · Campaña Risaralda 2027

Landing de campaña migrada desde el prototipo de Claude Design (React UMD + Babel
en runtime) a **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4**.

## Correr el proyecto

```bash
npm install      # ya ejecutado
npm run dev      # desarrollo → http://localhost:3000
npm run build    # build de producción
npm start        # servir el build
```

## Estructura

```
app/
  layout.tsx            # fuente Archivo (next/font) + metadata global
  globals.css           # Tailwind v4 + tokens @theme + capa de efectos (gradientes, animaciones)
  page.tsx              # ruta "/"  → home
  apia/page.tsx         # ruta "/apia" → vista de Apía (con su propia metadata/SEO)
components/
  Button.tsx            # botón con variantes (primary / brand / outline)
  Icon.tsx              # iconos SVG inline tipados (IconName)
  Reveal.tsx            # animación al entrar en viewport (IntersectionObserver)
  SectionHead.tsx       # encabezado de sección reutilizable
  Navbar.tsx Footer.tsx
  ui.ts                 # helpers de clases (eyebrow, inputs, padding de sección)
  home/                 # Hero, Ribbon, Propuestas, Municipios, SobrePablo, Unete
  apia/                 # Backbar, ApiaHero, Quote, ApiaPropuestas, Galeria, Escucha
lib/
  data.ts               # TODO el contenido de campaña, tipado
public/                 # fotos de Pablo (.png)
legacy/                 # prototipo original (NO entra al build) — referencia
```

## Decisiones de la migración

- **Rutas reales** `/` y `/apia` en lugar del cambio de vista por estado del prototipo
  (URLs propias, SEO, botón atrás del navegador).
- **Estilos a Tailwind v4**: tu paleta original (verde + dorado) vive como tokens
  `@theme` → usá `bg-brand`, `text-accent`, `font-display`, `shadow-lg`. Los efectos
  complejos (gradientes con `color-mix`, máscaras, `@keyframes`, pseudo-elementos)
  están en `app/globals.css` bajo `@layer components`.
- **Panel de tweaks descartado**: era chrome del editor de Claude, no parte del sitio.
  Se conservan los _defaults_ (tema verde+dorado, hero dividido, Apía a foto completa).
  El segundo tema (azul) sigue en el CSS: basta con `<html data-theme="azul">` para activarlo.
- **`image-slot`** (subida de imágenes del editor) → la galería de Apía muestra
  placeholders. Reemplazá cada uno por una imagen real en `public/` cuando las tengas.

## Próximos pasos sugeridos

- Conectar los formularios (Únete / Escucha) a un backend o servicio (Formspree, API route).
- Cargar imágenes reales en la galería de Apía y reemplazar los placeholders.
- Optimizar las fotos de Pablo (hoy ~2MB cada una).
```

# LP-Pablo-Giordaneli
