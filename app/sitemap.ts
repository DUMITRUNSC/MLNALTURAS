import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * lastModified a mano, no `new Date()`.
 *
 * Con la fecha del build, cada despliegue —aunque solo cambie un color— le
 * dice a Google que las cinco páginas se han modificado, y a base de mentirle
 * deja de hacer caso al dato. Al cambiar el contenido de una página de verdad,
 * se actualiza su fecha aquí.
 */
const rutas = [
  { ruta: "", fecha: "2026-09-22", frecuencia: "monthly", peso: 1 },
  {
    ruta: "/administradores",
    fecha: "2026-09-22",
    frecuencia: "monthly",
    peso: 0.8,
  },
  {
    ruta: "/arquitectos",
    fecha: "2026-09-22",
    frecuencia: "monthly",
    peso: 0.8,
  },
  { ruta: "/zonas", fecha: "2026-09-22", frecuencia: "monthly", peso: 0.7 },
  {
    ruta: "/trabaja-con-nosotros",
    fecha: "2026-09-14",
    frecuencia: "monthly",
    peso: 0.7,
  },
  {
    ruta: "/aviso-legal",
    fecha: "2026-09-07",
    frecuencia: "yearly",
    peso: 0.2,
  },
  { ruta: "/privacidad", fecha: "2026-09-07", frecuencia: "yearly", peso: 0.2 },
  { ruta: "/cookies", fecha: "2026-09-07", frecuencia: "yearly", peso: 0.2 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return rutas.map(({ ruta, fecha, frecuencia, peso }) => ({
    url: `${site.url}${ruta}`,
    lastModified: new Date(`${fecha}T12:00:00Z`),
    changeFrequency: frecuencia,
    priority: peso,
  }));
}
