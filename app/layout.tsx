import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono, Inter } from "next/font/google";
import { servicios } from "@/lib/servicios";
import { site } from "@/lib/site";
import "./globals.css";

/* Tres familias con rol, no una para todo:
   display  → titulares y numerales grandes
   cuerpo   → párrafos y campos
   utilidad → micro-rótulos, cotas y referencias de lámina */
const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const cuerpo = Inter({
  variable: "--font-cuerpo",
  subsets: ["latin"],
  display: "swap",
});

const utilidad = IBM_Plex_Mono({
  variable: "--font-util",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Trabajos verticales en Madrid | MLN Construcciones en Altura",
    template: "%s | MLN Construcciones en Altura",
  },
  // 155 caracteres: por encima de eso Google corta y se pierde el gancho.
  description:
    "Trabajos verticales en Madrid: rehabilitación de fachadas, cubiertas, impermeabilización e ITE sin andamio. Visita técnica gratis y presupuesto en 24–48 h.",
  // El canonical vive en cada página, no aquí: si se hereda, cualquier ruta
  // nueva que se olvide de ponerlo se autocanonicaliza a la portada.
  openGraph: {
    title: "Trabajos verticales en Madrid | MLN Construcciones en Altura",
    description:
      "Soluciones técnicas en altura para comunidades, administradores, arquitectos e ingenieros en Madrid. Control de principio a fin.",
    url: site.url,
    siteName: site.legalName,
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/hero-fachada-madrid.jpg",
        width: 1536,
        height: 1024,
        type: "image/jpeg",
        alt: "Técnico de MLN trabajando por cuerda en una fachada de Madrid",
      },
    ],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0B5CF6",
};

/* Datos estructurados del negocio.
 *
 * Una sola entidad con @id, para que lo que se añada después (el catálogo de
 * servicios, las migas de pan de cada página) cuelgue de ella y Google no vea
 * tres empresas distintas.
 *
 * Deliberadamente NO se declaran: geo, openingHoursSpecification,
 * aggregateRating ni review. Los dos primeros porque hacen falta la dirección
 * y el horario reales; los dos últimos porque inventar valoraciones es motivo
 * de acción manual. streetAddress, postalCode y vatID ya van con los datos
 * confirmados de lib/site.ts.
 */
const ID_EMPRESA = `${site.url}/#empresa`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": ID_EMPRESA,
  name: site.legalName,
  alternateName: site.name,
  description:
    "Empresa de trabajos verticales y construcción en altura en Madrid: fachadas, cubiertas, impermeabilización y mantenimiento de edificios.",
  url: site.url,
  telephone: site.phone,
  email: site.email,
  vatID: `ES${site.cif}`,
  image: `${site.url}/hero-fachada-madrid.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: site.phone,
    email: site.email,
    contactType: "customer service",
    areaServed: "ES-M",
    availableLanguage: ["es"],
  },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Comunidad de Madrid" },
    ...site.areas.map((zona) => ({ "@type": "Place", name: zona })),
  ],
  knowsAbout: [
    "Trabajos verticales",
    "Rehabilitación de fachadas",
    "Impermeabilización de cubiertas",
    "Subsanación de deficiencias ITE",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de trabajos verticales en Madrid",
    itemListElement: servicios.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${s.titulo} en Madrid`,
        description: s.desc,
        serviceType: s.titulo,
        provider: { "@id": ID_EMPRESA },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Comunidad de Madrid",
        },
      },
    })),
  },
};

const sitioLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#web`,
  url: site.url,
  name: site.legalName,
  inLanguage: "es-ES",
  publisher: { "@id": ID_EMPRESA },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${cuerpo.variable} ${utilidad.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: datos estructurados estáticos
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: datos estructurados estáticos
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sitioLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#contenido"
          className="salto-contenido sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:m-4 focus:px-4 focus:py-2 focus:text-sm"
        >
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
