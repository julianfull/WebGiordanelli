# Formularios "Únete" e "Ideas" → Google Drive + Gmail

El mismo script recibe dos formularios:

| Formulario | Dónde está | Pestaña de la hoja | Asunto del correo |
|---|---|---|---|
| **Únete** | página de inicio | `Contactos` | `[Contacto Web PG] Nombre · Municipio` |
| **Tu idea para…** | cada página de municipio | `Ideas` | `[Idea Web PG] Municipio · Tema · Nombre` |

Cada envío se guarda como una fila en una **Hoja de cálculo de Google** (en tu Drive) y te llega un
**correo** al que Gmail le pone tu etiqueta.

El recorrido es: navegador → `/api/contacto` o `/api/ideas` (servidor del sitio) → Google Apps Script → Hoja + correo.
La dirección del script y su clave solo están en el servidor; nunca llegan al navegador.

## 1. Crear la Hoja de cálculo y el script (10 min)

1. En Google Drive: **Nuevo → Hojas de cálculo de Google**. Ponle un nombre, p. ej. `Contactos Web PG`.
2. En la hoja: **Extensiones → Apps Script**.
3. Borra el contenido de `Código.gs` y pega todo el archivo [`Contacto.gs`](./Contacto.gs).
4. Cambia `SECRET` por una clave larga y aleatoria. Puedes generarla con:
   `node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"`
5. (Opcional) Pon en `EMAIL_TO` otro correo si no quieres recibir los avisos en la cuenta dueña del script.
6. Guarda (💾). En la barra superior elige la función **`probar`** y pulsa **Ejecutar**.
   Google pedirá permisos (Hojas de cálculo y enviar correo): acéptalos. Se crearán las pestañas `Contactos` e `Ideas`.

## 2. Publicarlo como aplicación web

1. **Implementar → Nueva implementación → ⚙ → Aplicación web**.
2. **Ejecutar como:** *Yo*. **Quién tiene acceso:** *Cualquier usuario*.
   (Hace falta para que el sitio pueda llamarlo; sin la clave `SECRET` el script rechaza cualquier envío.)
3. Pulsa **Implementar** y copia la **URL de la aplicación web** (termina en `/exec`).

> Si más adelante cambias el código del script: **Implementar → Gestionar implementaciones → ✏ → Versión: Nueva versión**.
> Así la URL se mantiene.

## 3. Conectar el sitio

En la raíz del proyecto crea `.env.local` (copia de `.env.example`):

```
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/…/exec
GOOGLE_SCRIPT_SECRET=la-misma-clave-que-pusiste-en-SECRET
```

Reinicia `npm run dev`. En el hosting (p. ej. Vercel → *Settings → Environment Variables*) configura las
mismas dos variables y vuelve a desplegar.

## 4. Etiquetas en Gmail

1. En Gmail, busca: `subject:"[Contacto Web PG]"` → icono de filtros (☰) → **Crear filtro**.
2. Marca **Aplicar la etiqueta** → *Etiqueta nueva…* → p. ej. `Web / Contactos`.
3. (Opcional) **Omitir Recibidos** para que no llenen la bandeja principal. Pulsa **Crear filtro**.
4. Repite con `subject:"[Idea Web PG]"` y una etiqueta como `Web / Ideas`.

## Si ya tenías el script instalado (antes de las ideas)

1. Abre el editor de Apps Script de tu hoja y reemplaza todo el código por el nuevo
   [`Contacto.gs`](./Contacto.gs). **Vuelve a poner tu `SECRET`** (y `EMAIL_TO` si lo usabas).
2. Ejecuta **`probar`** una vez: crea la pestaña `Ideas`.
3. **Implementar → Gestionar implementaciones → ✏ → Versión: Nueva versión → Implementar.**
   La URL no cambia, así que no hay que tocar las variables del sitio.

Hasta que no publiques la nueva versión, el script viejo guardaría las ideas como filas casi vacías en `Contactos`.

## Límites y datos personales

- Una cuenta gratuita de Gmail puede enviar **unos 100 correos al día** desde Apps Script
  (Google Workspace: 1.500). Si se supera, la fila **igual se guarda** en la hoja y la persona ve
  el mensaje de éxito, pero ese aviso por correo no llega. La hoja es la fuente completa.
- Ambos formularios exigen la **autorización de tratamiento de datos (Ley 1581 de 2012)** y guardan la
  respuesta en la columna *Autoriza datos*. Hay que publicar una **política de tratamiento de datos** y
  enlazarla en los formularios: ese texto lo debe entregar la asesoría legal.
- Comparte la hoja solo con quien la necesite: contiene datos personales.
