/**
 * Receptor de los formularios de pablogiordanelli.co
 *
 * Qué hace con cada envío:
 *   1. Agrega una fila en esta Hoja de cálculo (queda en tu Google Drive):
 *      - formulario "Únete" → pestaña "Contactos"
 *      - "Tu idea para…" de las páginas de municipio (tipo "idea") → pestaña "Ideas"
 *   2. Te envía un correo con el asunto "[Contacto Web PG] …" o "[Idea Web PG] …" para que un
 *      filtro de Gmail le aplique tu etiqueta.
 *
 * Instalación: ver integraciones/google-apps-script/LEEME.md
 */

// Debe ser idéntico a GOOGLE_SCRIPT_SECRET en las variables de entorno del sitio.
const SECRET = 'PEGA_AQUI_UNA_CLAVE_LARGA_Y_ALEATORIA';

// Correo que recibe las notificaciones. Vacío = la cuenta dueña del script.
const EMAIL_TO = '';

// Prefijo fijo del asunto: es lo que usa el filtro de Gmail para poner la etiqueta.
const SUBJECT_TAG = '[Contacto Web PG]';
const SUBJECT_TAG_IDEA = '[Idea Web PG]';

const SHEET_NAME = 'Contactos';
const HEADERS = ['Fecha', 'Nombre', 'Teléfono / WhatsApp', 'Correo', 'Municipio', 'Mensaje', 'Autoriza datos (Ley 1581)', 'Página de origen'];

const SHEET_IDEAS = 'Ideas';
const HEADERS_IDEAS = ['Fecha', 'Nombre', 'Municipio', 'Barrio / vereda / sector', 'Tema', 'Idea', 'Autoriza datos (Ley 1581)', 'Página de origen'];

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: 'bad_request' });
  }
  if (data.secret !== SECRET) return json_({ ok: false, error: 'unauthorized' });
  if (data.tipo === 'idea') return guardarIdea_(data);

  const row = [
    new Date(),
    clean_(data.nombre),
    clean_(data.tel),
    clean_(data.email),
    clean_(data.muni),
    clean_(data.msg),
    data.autorizacion ? 'Sí' : 'No',
    clean_(data.origen),
  ];
  guardar_(SHEET_NAME, HEADERS, row);

  const mail = {
    subject: `${SUBJECT_TAG} ${row[1]} · ${row[4] || 'Sin municipio'}`,
    body: HEADERS.map((h, i) => `${h}: ${row[i] || '—'}`).join('\n'),
  };
  if (isEmail_(data.email)) mail.replyTo = data.email;
  avisar_(mail);

  return json_({ ok: true });
}

function guardarIdea_(data) {
  const row = [
    new Date(),
    clean_(data.nombre),
    clean_(data.muni),
    clean_(data.sector),
    clean_(data.tema),
    clean_(data.idea),
    data.autorizacion ? 'Sí' : 'No',
    clean_(data.origen),
  ];
  guardar_(SHEET_IDEAS, HEADERS_IDEAS, row);

  avisar_({
    subject: `${SUBJECT_TAG_IDEA} ${row[2] || 'Sin municipio'} · ${row[4] || 'Sin tema'} · ${row[1]}`,
    body: HEADERS_IDEAS.map((h, i) => `${h}: ${row[i] || '—'}`).join('\n'),
  });

  return json_({ ok: true });
}

/* Evita que dos envíos simultáneos se pisen al escribir la fila. */
function guardar_(name, headers, row) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    sheet_(name, headers).appendRow(row);
  } finally {
    lock.releaseLock();
  }
}

/* El registro ya quedó en la hoja: si el correo falla (p. ej. cuota diaria agotada) no se
   devuelve error, para que la persona no reenvíe y se dupliquen filas. */
function avisar_(mail) {
  mail.to = EMAIL_TO || Session.getEffectiveUser().getEmail();
  mail.body += '\n\nRegistro guardado en: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl();
  try {
    MailApp.sendEmail(mail);
  } catch (err) {
    console.error('No se pudo enviar el aviso por correo: ' + err);
  }
}

function sheet_(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(headers);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sh;
}

/* Texto plano, recortado, y sin fórmulas: un valor que empieza por = + - @ se guarda como texto. */
function clean_(v) {
  const s = String(v == null ? '' : v).trim().slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function isEmail_(v) {
  return typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Ejecútala una vez desde el editor para autorizar permisos y crear las hojas. */
function probar() {
  sheet_(SHEET_NAME, HEADERS);
  sheet_(SHEET_IDEAS, HEADERS_IDEAS);
  Logger.log('Hojas listas: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl());
}
