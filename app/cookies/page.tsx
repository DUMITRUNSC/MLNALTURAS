import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LegalLayout from "@/components/LegalLayout";
import { legal } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de cookies",
  description:
    "Esta web no utiliza cookies de análisis, publicidad ni seguimiento de terceros. Aquí se explica qué se guarda en tu navegador y qué no.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/cookies" },
  openGraph: {
    title: "Política de cookies | MLN Construcciones en Altura",
    description:
      "Esta web no utiliza cookies de análisis ni de publicidad. Qué se guarda y qué no.",
    url: `${site.url}/cookies`,
    siteName: site.legalName,
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/hero-fachada-madrid.jpg",
        width: 1536,
        height: 1024,
        type: "image/jpeg",
        alt: "Técnico trabajando por cuerda en una fachada de Madrid",
      },
    ],
  },
};

export default function Cookies() {
  return (
    <>
      <Header />
      <LegalLayout
        ruta="/cookies"
        marcador="Documentos legales"
        titulo="Política de cookies"
        entradilla="La versión corta: esta web no te sigue. No hay analítica, no hay píxeles de publicidad y no hay cookies de terceros, así que tampoco hay ventana de consentimiento que cerrar."
      >
        <h2>1. Qué es una cookie</h2>
        <p>
          Una cookie es un pequeño archivo que una web guarda en tu navegador
          para recordar información. El artículo 22.2 de la LSSI-CE exige pedir
          consentimiento antes de instalar cookies que no sean estrictamente
          necesarias.
        </p>

        <h2>2. Qué cookies usa esta web</h2>
        <p>
          Ninguna que requiera tu consentimiento. Esta web es estática y no
          instala cookies de analítica, de publicidad, de redes sociales ni de
          seguimiento entre sitios.
        </p>
        <ul>
          <li>
            <strong>No hay</strong> Google Analytics ni ninguna otra herramienta
            de medición.
          </li>
          <li>
            <strong>No hay</strong> píxeles de Meta, TikTok, LinkedIn ni
            similares.
          </li>
          <li>
            <strong>No hay</strong> vídeos ni mapas incrustados de terceros que
            instalen cookies al cargar la página.
          </li>
        </ul>
        <p>
          El proveedor de alojamiento puede registrar datos técnicos de la
          conexión (dirección IP, navegador, fecha y hora) en sus ficheros de
          registro, por seguridad y para que el servicio funcione. Es un
          tratamiento necesario y no se usa para perfilarte.
        </p>

        <h2>3. Si algún día cambia</h2>
        <p>
          Si en el futuro se añade analítica, un mapa de Google o cualquier otro
          servicio con cookies, aparecerá una ventana de consentimiento antes de
          instalarlas, se detallarán aquí una por una con su finalidad y
          duración, y podrás rechazarlas con la misma facilidad con la que las
          aceptas.
        </p>

        <h2>4. Cómo controlar las cookies en tu navegador</h2>
        <p>
          En cualquier caso, puedes bloquear o eliminar las cookies desde la
          configuración de tu navegador: Chrome, Safari, Firefox y Edge lo
          permiten en su apartado de privacidad.
        </p>

        <h2>5. Dudas</h2>
        <p>
          Escríbenos a <a href={`mailto:${legal.email}`}>{legal.email}</a> y te
          lo explicamos.
        </p>
      </LegalLayout>
      <Footer />
    </>
  );
}
