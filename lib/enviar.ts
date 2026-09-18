/**
 * Envío de los formularios al servidor de la propia web (/api/contacto).
 *
 * Devuelve tres cosas distintas y cada una lleva a un camino distinto en el
 * formulario:
 *
 *   "enviado"       el correo ha salido de verdad, con sus adjuntos.
 *   "sin-servidor"  no hay clave de envío configurada todavía → el formulario
 *                   se va por mailto, como antes. No es un error.
 *   { error }       algo ha fallado de verdad y hay que decírselo a la persona.
 */

export type Tipo = "cliente" | "trabajador" | "empresa";

export type Envio = "enviado" | "sin-servidor" | { error: string };

export async function enviarPorServidor(
  tipo: Tipo,
  datos: Record<string, string>,
  ficheros: File[] = [],
): Promise<Envio> {
  const cuerpo = new FormData();
  cuerpo.set("tipo", tipo);
  for (const [nombre, valor] of Object.entries(datos)) {
    if (valor !== undefined && valor !== null && String(valor).trim() !== "") {
      cuerpo.set(nombre, String(valor));
    }
  }
  for (const f of ficheros) cuerpo.append("adjuntos", f);

  try {
    const r = await fetch("/api/contacto", { method: "POST", body: cuerpo });
    if (r.status === 503) return "sin-servidor";
    if (r.ok) return "enviado";
    const cuerpoError = await r.json().catch(() => null);
    return {
      error:
        cuerpoError?.error ??
        "No hemos podido enviarlo. Prueba por WhatsApp o llámanos.",
    };
  } catch {
    // Sin red, o el servidor no responde: que lo intente por los otros medios.
    return {
      error: "No hay conexión con el servidor. Prueba por WhatsApp o llámanos.",
    };
  }
}
