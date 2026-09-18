import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/**
 * Recepción de los tres formularios de la web.
 *
 * Llega un multipart/form-data con los campos y, si los hay, los adjuntos
 * (currículum, certificados, CIF, póliza). Se valida aquí otra vez —lo del
 * navegador es comodidad, no seguridad— y se manda por correo con Resend.
 *
 * Si no hay RESEND_API_KEY configurada, responde 503 con
 * { configurado: false } y el formulario del navegador se va por el camino
 * de siempre (mailto). Así la web funciona antes y después de contratar el
 * envío, sin tocar nada más.
 *
 * Límites: Vercel corta las peticiones a las funciones en 4,5 MB, así que el
 * tope real de adjuntos es 4 MB en total, no lo que admita Resend.
 */

export const runtime = "nodejs";

const MAX_FICHERO = 3 * 1024 * 1024; // 3 MB por archivo
const MAX_TOTAL = 4 * 1024 * 1024; // 4 MB entre todos
const MAX_FICHEROS = 6;

const TIPOS_ACEPTADOS = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/heic",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const ASUNTO: Record<string, string> = {
  cliente: "Solicitud de visita técnica",
  trabajador: "Candidatura para trabajar en MLN",
  empresa: "Propuesta de colaboración de empresa o autónomo",
};

/* Campos que no se admiten vacíos, por tipo de formulario. */
const OBLIGATORIOS: Record<string, string[]> = {
  cliente: ["nombre", "telefono", "consentimiento"],
  trabajador: ["nombre", "telefono", "consentimiento"],
  empresa: ["empresa", "telefono", "consentimiento"],
};

/* Freno sencillo por IP: seis envíos cada diez minutos. Se pierde al
   reiniciar el proceso, que para este volumen es más que suficiente. */
const visitas = new Map<string, number[]>();
const VENTANA = 10 * 60 * 1000;
const TOPE = 6;

function demasiados(ip: string) {
  const ahora = Date.now();
  const previas = (visitas.get(ip) ?? []).filter((t) => ahora - t < VENTANA);
  previas.push(ahora);
  visitas.set(ip, previas);
  if (visitas.size > 5000) visitas.clear();
  return previas.length > TOPE;
}

function limpia(valor: string) {
  // Nada de saltos de línea en las cabeceras del correo.
  return valor.replace(/[\r\n]+/g, " ").trim();
}

function escapa(valor: string) {
  return valor
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(peticion: Request) {
  const clave = process.env.RESEND_API_KEY;
  if (!clave) {
    return NextResponse.json(
      { configurado: false, motivo: "Falta RESEND_API_KEY" },
      { status: 503 },
    );
  }

  const ip =
    peticion.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    peticion.headers.get("x-real-ip") ||
    "sin-ip";
  if (demasiados(ip)) {
    return NextResponse.json(
      { ok: false, error: "Demasiados envíos seguidos. Prueba en un rato." },
      { status: 429 },
    );
  }

  let datos: FormData;
  try {
    datos = await peticion.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "No se ha podido leer el formulario." },
      { status: 400 },
    );
  }

  // Cebo para robots: si viene relleno, se acepta en silencio y no se manda.
  if (String(datos.get("apodo") ?? "").trim() !== "") {
    return NextResponse.json({ ok: true, ignorado: true });
  }

  const tipo = String(datos.get("tipo") ?? "");
  if (!ASUNTO[tipo]) {
    return NextResponse.json(
      { ok: false, error: "Tipo de formulario desconocido." },
      { status: 400 },
    );
  }

  const campos: [string, string][] = [];
  const ficheros: File[] = [];
  for (const [nombre, valor] of datos.entries()) {
    if (nombre === "tipo" || nombre === "apodo") continue;
    if (valor instanceof File) {
      if (valor.size > 0) ficheros.push(valor);
      continue;
    }
    const texto = String(valor).trim();
    if (texto !== "") campos.push([nombre, texto]);
  }

  const puestos = new Set(campos.map(([n]) => n));
  const faltan = (OBLIGATORIOS[tipo] ?? []).filter((c) => !puestos.has(c));
  if (faltan.length > 0) {
    return NextResponse.json(
      { ok: false, error: `Faltan datos: ${faltan.join(", ")}.` },
      { status: 422 },
    );
  }

  if (ficheros.length > MAX_FICHEROS) {
    return NextResponse.json(
      { ok: false, error: `Como mucho ${MAX_FICHEROS} archivos.` },
      { status: 413 },
    );
  }
  let suma = 0;
  for (const f of ficheros) {
    if (f.size > MAX_FICHERO) {
      return NextResponse.json(
        { ok: false, error: `«${f.name}» pasa de 3 MB.` },
        { status: 413 },
      );
    }
    if (f.type && !TIPOS_ACEPTADOS.has(f.type)) {
      return NextResponse.json(
        { ok: false, error: `«${f.name}» no es PDF, imagen ni documento.` },
        { status: 415 },
      );
    }
    suma += f.size;
  }
  if (suma > MAX_TOTAL) {
    return NextResponse.json(
      { ok: false, error: "Los archivos suman más de 4 MB en total." },
      { status: 413 },
    );
  }

  const adjuntos = await Promise.all(
    ficheros.map(async (f) => ({
      filename: f.name.replace(/[^\w\s.\-áéíóúüñÁÉÍÓÚÜÑ]/g, "_").slice(0, 120),
      content: Buffer.from(await f.arrayBuffer()).toString("base64"),
    })),
  );

  const filas = campos
    .map(
      ([nombre, valor]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#68717F;font:500 12px/1.4 -apple-system,system-ui,sans-serif;text-transform:uppercase;letter-spacing:.08em;vertical-align:top;white-space:nowrap">${escapa(nombre)}</td><td style="padding:6px 0;color:#10131A;font:400 15px/1.55 -apple-system,system-ui,sans-serif">${escapa(valor).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");

  const html = `<div style="max-width:640px;margin:0 auto;padding:28px 24px;background:#fff">
<p style="margin:0 0 4px;color:#0B5CF6;font:600 11px/1 -apple-system,system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase">MLN · web</p>
<h1 style="margin:0 0 20px;color:#10131A;font:700 22px/1.25 -apple-system,system-ui,sans-serif">${ASUNTO[tipo]}</h1>
<table style="width:100%;border-collapse:collapse;border-top:1px solid #C3CAD5">${filas}</table>
<p style="margin:20px 0 0;color:#68717F;font:400 13px/1.5 -apple-system,system-ui,sans-serif">${adjuntos.length > 0 ? `${adjuntos.length} archivo(s) adjunto(s).` : "Sin archivos adjuntos."} Recibido el ${new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}.</p>
</div>`;

  const texto = campos.map(([n, v]) => `${n}: ${v}`).join("\n");

  const correoQuienEscribe = campos.find(
    ([n]) => n === "email" || n === "correo",
  )?.[1];
  const nombreQuienEscribe = campos.find(([n]) => n === "nombre")?.[1] ?? "";

  // RESEND_URL sólo se usa para probar el envío en local contra un servidor
  // de mentira; en producción no se define y va a la API de Resend.
  const destinoApi = process.env.RESEND_URL ?? "https://api.resend.com/emails";

  const respuesta = await fetch(destinoApi, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${clave}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACTO_REMITENTE ?? "MLN web <onboarding@resend.dev>",
      to: [process.env.CONTACTO_DESTINO ?? site.email],
      subject: limpia(
        `${ASUNTO[tipo]}${nombreQuienEscribe ? ` — ${nombreQuienEscribe}` : ""}`,
      ),
      html,
      text: texto,
      ...(correoQuienEscribe?.includes("@")
        ? { reply_to: limpia(correoQuienEscribe) }
        : {}),
      ...(adjuntos.length > 0 ? { attachments: adjuntos } : {}),
    }),
  });

  if (!respuesta.ok) {
    const detalle = await respuesta.text().catch(() => "");
    console.error("Resend respondió", respuesta.status, detalle.slice(0, 400));
    return NextResponse.json(
      { ok: false, error: "El envío ha fallado. Prueba por WhatsApp." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, adjuntos: adjuntos.length });
}
