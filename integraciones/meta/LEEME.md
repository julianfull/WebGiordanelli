# Sección "Redes": conectar Instagram y Facebook

La sección **Redes** de la página de inicio muestra las 2 últimas publicaciones de Instagram y las 2
últimas de Facebook. Las lee el **servidor** con la Graph API oficial de Meta:

- Los visitantes no inician sesión y no se carga ningún script de Meta en su navegador.
- El token solo vive en variables de entorno del servidor. El navegador nunca lo recibe.
- Next.js guarda la respuesta 10 minutos (`REDES_REVALIDATE` en `lib/redes.ts`). La página vuelve a
  pedir `/api/redes` cada 5 minutos, así que una publicación nueva aparece sola en 10–15 minutos.
- Si falta configuración o Meta falla, cada red muestra la tarjeta "Seguir en …" y la página no se rompe.

## Requisitos

1. La cuenta de Instagram **@pgiordanelli1** debe ser **profesional** (de creador o de empresa).
   Se cambia en la app: *Configuración → Tipo de cuenta y herramientas*.
2. Esa cuenta de Instagram debe estar **vinculada a la página de Facebook** *GiordanelliPablo*
   (en Meta Business Suite: *Configuración → Cuentas de Instagram*).
3. La persona que configure esto debe ser **administradora** de la página de Facebook.

## Paso 1: crear la app de Meta

1. Entra a <https://developers.facebook.com/apps> y pulsa **Crear app**.
2. Elige el caso de uso *Otro* y luego el tipo **Empresa**.
3. En la app, agrega los productos **Instagram** (opción *API setup with Facebook login*) y
   **Facebook Login for Business**.
4. En *Configuración de la app → Básica*, copia la **Clave secreta de la app**: es `META_APP_SECRET`.

No hace falta enviar la app a revisión de Meta: solo lee la página y la cuenta de la que eres
administrador.

## Paso 2: obtener un token de página que no caduca

1. Abre el **Explorador de la Graph API**: <https://developers.facebook.com/tools/explorer>.
2. Arriba a la derecha elige tu app. En *Permisos* agrega:
   `pages_show_list`, `pages_read_engagement`, `instagram_basic` y `business_management`.
3. Pulsa **Generate Access Token** y acepta. Este es un token de usuario de corta duración.
4. Cámbialo por uno de larga duración abriendo esta URL en el navegador (con tus datos):

   ```
   https://graph.facebook.com/v23.0/oauth/access_token?grant_type=fb_exchange_token&client_id=APP_ID&client_secret=APP_SECRET&fb_exchange_token=TOKEN_CORTO
   ```

5. Con ese token largo, abre:

   ```
   https://graph.facebook.com/v23.0/me/accounts?fields=id,name,access_token,instagram_business_account&access_token=TOKEN_LARGO
   ```

   En la entrada de la página *GiordanelliPablo* encontrarás:
   - `access_token` → **`META_ACCESS_TOKEN`**. Un token de página obtenido así **no caduca**.
   - `id` → **`FB_PAGE_ID`**
   - `instagram_business_account.id` → **`IG_USER_ID`**

Puedes revisar el token en <https://developers.facebook.com/tools/debug/accesstoken>: debe decir
*Caduca: Nunca*.

## Paso 3: configurar las variables

En tu computador, agrégalas a `.env.local`. En el hosting (Vercel → *Settings → Environment
Variables*), agrégalas también y vuelve a desplegar:

```
META_ACCESS_TOKEN=...
FB_PAGE_ID=...
IG_USER_ID=...
META_APP_SECRET=...
```

Para comprobar que funciona, abre `/api/redes`. Debe devolver `instagram` y `facebook` con 2
publicaciones cada uno. Si alguna sale en `null`, el motivo aparece en los logs del servidor con
el prefijo `[redes]`.

## Cuándo hay que renovar el token

El token deja de funcionar si la persona que lo generó cambia su contraseña de Facebook, deja de
ser administradora de la página o quita el permiso a la app. En ese caso repite el paso 2 y
actualiza `META_ACCESS_TOKEN` en el hosting.
