/**
 * Medición de contactos: la única forma de saber si la web trae clientes.
 *
 * Tres eventos: «llamada», «whatsapp» y «formulario». Hoy NO se envían a
 * ningún sitio: no hay analítica instalada. En cuanto se active una, sin
 * tocar nada más, los eventos le llegan:
 *   - Plausible: basta con su <script> (define window.plausible).
 *   - Vercel Web Analytics: con <Analytics /> de @vercel/analytics
 *     (define window.va; los eventos propios requieren plan Pro).
 * Ninguna de las dos usa cookies, así que no hace falta aviso de
 * consentimiento; aun así, actualizar la política de cookies al activarla.
 */
export type Evento = "llamada" | "whatsapp" | "formulario";

type Datos = Record<string, string>;

declare global {
  interface Window {
    plausible?: (nombre: string, opciones?: { props?: Datos }) => void;
    va?: (tipo: "event", datos: { name: string; data?: Datos }) => void;
  }
}

export function medir(nombre: Evento, datos: Datos = {}) {
  if (typeof window === "undefined") return;
  const datosConPagina = { pagina: window.location.pathname, ...datos };
  try {
    window.plausible?.(nombre, { props: datosConPagina });
    window.va?.("event", { name: nombre, data: datosConPagina });
  } catch {
    // La medición nunca puede romper un contacto.
  }
  window.dispatchEvent(
    new CustomEvent("mln:contacto", { detail: { nombre, ...datosConPagina } }),
  );
  if (process.env.NODE_ENV !== "production") {
    console.debug("[MLN medición]", nombre, datosConPagina);
  }
}
