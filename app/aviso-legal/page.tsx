import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LegalLayout from "@/components/LegalLayout";
import { legal, PENDIENTE } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  description:
    "Datos identificativos del titular de la web y condiciones de uso de mlnaltura.es, conforme al artículo 10 de la LSSI-CE.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/aviso-legal" },
  openGraph: {
    title: "Aviso legal | MLN Construcciones en Altura",
    description:
      "Datos identificativos del titular de la web de MLN Construcciones en Altura y condiciones de uso, según la LSSI-CE.",
    url: `${site.url}/aviso-legal`,
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

const Pendiente = () => <span className="pendiente">{PENDIENTE}</span>;

export default function AvisoLegal() {
  return (
    <>
      <Header />
      <LegalLayout
        ruta="/aviso-legal"
        marcador="Documentos legales"
        titulo="Aviso legal"
        entradilla="Datos identificativos del titular de esta web y condiciones de uso, según el artículo 10 de la Ley 34/2002 de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE)."
      >
        <h2>1. Titular de la web</h2>
        <dl className="dato">
          <dt>Denominación</dt>
          <dd>{legal.responsable}</dd>
        </dl>
        <dl className="dato">
          <dt>CIF</dt>
          <dd>{legal.cif === PENDIENTE ? <Pendiente /> : legal.cif}</dd>
        </dl>
        <dl className="dato">
          <dt>Domicilio social</dt>
          <dd>
            {legal.domicilio === PENDIENTE ? <Pendiente /> : legal.domicilio}
            {legal.localidad ? `, ${legal.localidad}` : ""}
          </dd>
        </dl>
        <dl className="dato">
          <dt>Datos registrales</dt>
          <dd>
            {legal.registro === PENDIENTE ? <Pendiente /> : legal.registro}
          </dd>
        </dl>
        <dl className="dato">
          <dt>Correo</dt>
          <dd>
            <a href={`mailto:${legal.email}`}>{legal.email}</a>
          </dd>
        </dl>
        <dl className="dato">
          <dt>Teléfono</dt>
          <dd>{legal.telefono}</dd>
        </dl>
        <dl className="dato">
          <dt>Actividad</dt>
          <dd>
            Trabajos verticales, construcción en altura, rehabilitación de
            fachadas y mantenimiento de edificios.
          </dd>
        </dl>

        <h2>2. Objeto</h2>
        <p>
          Esta web tiene una finalidad informativa: presentar los servicios de{" "}
          {legal.responsable} y permitir que quien lo necesite se ponga en
          contacto con la empresa. No se venden productos ni servicios a través
          de ella y no hay contratación electrónica.
        </p>

        <h2>3. Condiciones de uso</h2>
        <p>
          El acceso a esta web es libre y gratuito. Al usarla te comprometes a
          hacerlo de forma lícita, a no introducir datos falsos de terceros en
          los formularios y a no realizar acciones que puedan dañar el
          funcionamiento del sitio.
        </p>
        <p>
          La información publicada tiene carácter general. Los plazos, sistemas
          constructivos y precios de cualquier intervención se concretan siempre
          por escrito en el presupuesto, después de la visita técnica: nada de
          lo que se dice aquí sustituye a ese documento.
        </p>

        <h2>4. Propiedad intelectual e industrial</h2>
        <p>
          Los textos, el diseño, la estructura de navegación, la marca y las
          fotografías de esta web pertenecen a {legal.responsable} o se utilizan
          con autorización. Queda prohibida su reproducción, distribución o
          transformación sin consentimiento expreso, salvo el uso privado.
        </p>
        <p>
          Algunas imágenes de la web son ilustrativas y no documentan
          necesariamente una obra concreta ejecutada por la empresa.
        </p>

        <h2>5. Responsabilidad</h2>
        <p>
          Procuramos que la información esté actualizada y sea correcta, pero no
          podemos garantizar que esté libre de errores. No respondemos de los
          daños derivados de interrupciones del servicio, ni del uso que un
          tercero haga de los contenidos.
        </p>
        <p>
          Si esta web enlaza a sitios de terceros es solo para facilitar
          información; no controlamos sus contenidos ni asumimos responsabilidad
          sobre ellos.
        </p>

        <h2>6. Protección de datos</h2>
        <p>
          El tratamiento de los datos personales que se recogen en esta web se
          explica en la <a href="/privacidad">política de privacidad</a>.
        </p>

        <h2>7. Legislación aplicable</h2>
        <p>
          Este aviso legal se rige por la legislación española. Para cualquier
          controversia serán competentes los juzgados y tribunales del domicilio
          del titular, salvo que la normativa de consumidores determine otro
          fuero.
        </p>
        <p>Dominio: {site.url.replace("https://", "")}.</p>
      </LegalLayout>
      <Footer />
    </>
  );
}
