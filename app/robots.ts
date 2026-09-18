import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Las previews de Vercel se cierran a los buscadores: si se indexa una, el
 * dominio de verdad arranca compitiendo consigo mismo. Solo el despliegue de
 * producción se deja rastrear.
 */
export default function robots(): MetadataRoute.Robots {
  const enProduccion =
    !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production";

  if (!enProduccion) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
