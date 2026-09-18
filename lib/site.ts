import { zonas } from "./zonas";

/**
 * Datos de la empresa en un único sitio.
 *
 * Sobre los años: son dos cosas distintas y la web ya no las mezcla.
 * `añosOficio` es el tiempo que lleva Constantin colgado de la cuerda, que
 * empezó como autónomo. `empresaDesde` es el año en que eso pasó a ser una
 * S.L. Decir «20 años» a secas daba a entender que la sociedad tiene veinte,
 * y no los tiene. Contado por separado, además, es mejor argumento: el oficio
 * viene de lejos y la empresa es nueva, que es justo por qué el teléfono lo
 * coge el dueño.
 *
 * Mientras `empresaDesde` esté vacío, la web enseña solo los años de oficio y
 * no menciona la constitución: nada falso se publica por descuido.
 *
 * ⚠️ PENDIENTE DE CONFIRMAR antes de publicar:
 *   - añosOficio (la web dice 20: confirmar)
 *   - empresaDesde (año de constitución de la S.L.)
 *   - registro mercantil (tomo / folio / hoja), en lib/legal.ts
 * CIF y domicilio: CONFIRMADOS el 18/09/2026 (fuente: ficha fiscal de la empresa).
 */
export const site = {
  name: "MLN Altura Madrid",
  legalName: "MLN Construcciones en Altura S.L.",
  shortName: "MLN",
  tagline: "Altura Madrid",
  claim: "Control de principio a fin",
  // El dominio definitivo aún no está cerrado. Mientras, NEXT_PUBLIC_SITE_URL
  // permite desplegar a una preview sin que el canonical, el sitemap y el
  // Open Graph apunten a un dominio que todavía no resuelve.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mlnaltura.es",

  // --- Teléfono, WhatsApp, correo, CIF y dirección: CONFIRMADOS ---
  phone: "+34643086071",
  phoneDisplay: "643 08 60 71",
  whatsapp: "34643086071",
  // Correo real y en uso. Cuando exista el dominio definitivo conviene pasar
  // a contacto@ y equipo@ y dejar este como reenvío.
  email: "mlnaltura@gmail.com",
  emailEmpleo: "mlnaltura@gmail.com",
  cif: "B56346323",
  address: {
    street: "Calle Cabo de la Nao, 1, Local 12",
    city: "Arganda del Rey",
    region: "Comunidad de Madrid",
    postalCode: "28500",
    country: "ES",
  },
  // ----------------------------------------------------

  añosOficio: "20",
  /** Año de constitución de la S.L. Vacío hasta que esté confirmado. */
  empresaDesde: "",
  responseTime: "24–48 h",
  // Los nombres viven en lib/zonas.ts, junto a su descripción.
  areas: zonas.map((z) => z.nombre),
} as const;

export const whatsappUrl = (text: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
