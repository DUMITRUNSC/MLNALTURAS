import { site } from "@/lib/site";

/**
 * Datos y textos legales en un único sitio.
 *
 * ⚠️ ANTES DE PUBLICAR hay que rellenar todo lo que aparezca como PENDIENTE:
 * sin CIF, domicilio y datos registrales el aviso legal no cumple el artículo 10
 * de la LSSI-CE, y sin ellos la política de privacidad tampoco identifica al
 * responsable. Los textos están redactados sobre los requisitos del RGPD
 * (arts. 13 y 15-22), la LOPDGDD (art. 11, información por capas) y la LSSI-CE,
 * pero conviene que los revise un abogado antes de publicarlos.
 */
export const PENDIENTE = "PENDIENTE DE COMPLETAR";

export const legal = {
  responsable: site.legalName,
  // `as string`: con `as const` el tipo literal impedía comparar con PENDIENTE.
  cif: (site.cif || PENDIENTE) as string,
  domicilio: (site.address.street || PENDIENTE) as string, // confirmado 18/09/2026
  localidad: `${site.address.postalCode || ""} ${site.address.city}`.trim(),
  registro: PENDIENTE as string, // Registro Mercantil de Madrid, tomo / folio / hoja
  email: site.email,
  telefono: site.phoneDisplay,
  actualizado: "18 de septiembre de 2026",

  // Plazos de conservación
  plazoCandidatura: "24 meses desde la última actualización del currículum",
  plazoContacto:
    "1 año desde el último contacto, salvo que se inicie una relación contractual",
  plazoContractual:
    "6 años, por las obligaciones fiscales y contables (art. 30 del Código de Comercio)",

  autoridad: {
    nombre: "Agencia Española de Protección de Datos",
    web: "https://www.aepd.es",
  },
} as const;

/** Primera capa de información (art. 11 LOPDGDD): lo que va junto al formulario. */
export const primeraCapa = [
  { campo: "Responsable", valor: `${legal.responsable} (${legal.cif})` },
  {
    campo: "Finalidad",
    valor: "Atender tu solicitud y ponernos en contacto contigo.",
  },
  {
    campo: "Legitimación",
    valor: "Tu consentimiento al enviar el formulario.",
  },
  {
    campo: "Destinatarios",
    valor: "No se ceden datos a terceros, salvo obligación legal.",
  },
  {
    campo: "Derechos",
    valor:
      "Acceder, rectificar y suprimir tus datos, limitar u oponerte al tratamiento, y portabilidad.",
  },
] as const;
