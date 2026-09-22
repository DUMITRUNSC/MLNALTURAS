import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LegalLayout from "@/components/LegalLayout";
import { legal, PENDIENTE } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Cómo trata MLN Construcciones en Altura los datos personales que recibe a través de esta web: finalidades, base jurídica, plazos de conservación y derechos.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/privacidad" },
  openGraph: {
    title: "Política de privacidad | MLN Construcciones en Altura",
    description:
      "Cómo trata MLN Construcciones en Altura los datos personales de quien contacta por la web o deja su candidatura.",
    url: `${site.url}/privacidad`,
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

export default function Privacidad() {
  return (
    <>
      <Header />
      <LegalLayout
        ruta="/privacidad"
        marcador="Documentos legales"
        titulo="Política de privacidad"
        entradilla="Esta es la información ampliada sobre el tratamiento de datos personales en esta web. Está redactada sobre los artículos 13 y 15 a 22 del Reglamento (UE) 2016/679 y la Ley Orgánica 3/2018 (LOPDGDD)."
      >
        <h2>1. Quién es el responsable</h2>
        <dl className="dato">
          <dt>Responsable</dt>
          <dd>{legal.responsable}</dd>
        </dl>
        <dl className="dato">
          <dt>CIF</dt>
          <dd>{legal.cif === PENDIENTE ? <Pendiente /> : legal.cif}</dd>
        </dl>
        <dl className="dato">
          <dt>Domicilio</dt>
          <dd>
            {legal.domicilio === PENDIENTE ? <Pendiente /> : legal.domicilio}
            {legal.localidad ? `, ${legal.localidad}` : ""}
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
        <p>
          No hemos designado delegado de protección de datos, al no concurrir
          ninguno de los supuestos del artículo 37 del RGPD.
        </p>

        <h2>2. Qué datos tratamos y de dónde salen</h2>
        <p>
          Solo tratamos los datos que nos facilitas tú, a través de los
          formularios de esta web, por teléfono, por WhatsApp o por correo
          electrónico. No compramos bases de datos ni obtenemos datos de
          terceros.
        </p>
        <ul>
          <li>
            <strong>Solicitud de visita o presupuesto:</strong> nombre,
            teléfono, correo, en calidad de qué escribes, dirección o zona del
            edificio, la descripción del problema y las fotos o documentos que
            adjuntes.
          </li>
          <li>
            <strong>Candidatura de trabajo:</strong> nombre, teléfono, correo,
            puesto, si tienes formación en altura, lo que nos cuentes de tu
            experiencia y el currículum o certificados que nos envíes.
          </li>
          <li>
            <strong>Empresa o autónomo colaborador:</strong> nombre de la
            empresa, actividad, zona de trabajo, referencias y datos de la
            persona de contacto. La documentación (CIF, seguro y certificados)
            solo se pide después, por correo, cuando hay una obra concreta.
          </li>
        </ul>
        <p>
          No pedimos ni queremos datos de categorías especiales del artículo 9
          del RGPD (salud, afiliación sindical, convicciones y similares). Si
          nos los envías por tu cuenta dentro de un currículum, no los usaremos
          para decidir sobre tu candidatura.
        </p>

        <h2>3. Para qué los usamos y con qué base jurídica</h2>
        <ul>
          <li>
            <strong>Contestarte y preparar la visita o el presupuesto.</strong>{" "}
            Base: tu consentimiento al enviar el formulario y, en su caso, la
            relación precontractual (art. 6.1.a y 6.1.b del RGPD).
          </li>
          <li>
            <strong>
              Gestionar tu candidatura o tu propuesta de colaboración.
            </strong>{" "}
            Base: tu consentimiento (art. 6.1.a).
          </li>
          <li>
            <strong>Ejecutar la obra contratada</strong> y mantener la relación
            con clientes y proveedores. Base: ejecución del contrato (art.
            6.1.b).
          </li>
          <li>
            <strong>
              Cumplir obligaciones fiscales, contables y de prevención de
              riesgos laborales.
            </strong>{" "}
            Base: obligación legal (art. 6.1.c).
          </li>
        </ul>
        <p>
          No tomamos decisiones automatizadas ni elaboramos perfiles con tus
          datos. Tampoco los usamos para enviarte publicidad si no nos lo has
          pedido.
        </p>

        <h2>4. Cuánto tiempo los guardamos</h2>
        <ul>
          <li>
            <strong>Consultas que no acaban en obra:</strong>{" "}
            {legal.plazoContacto}.
          </li>
          <li>
            <strong>Candidaturas y currículums:</strong>{" "}
            {legal.plazoCandidatura}. Pasado ese plazo se eliminan o se
            bloquean.
          </li>
          <li>
            <strong>Clientes, proveedores y colaboradores:</strong>{" "}
            {legal.plazoContractual}.
          </li>
        </ul>

        <h2>5. A quién se los comunicamos</h2>
        <p>
          No cedemos tus datos a terceros, salvo obligación legal o
          requerimiento de una autoridad. Sí tratan datos por cuenta nuestra,
          como encargados del tratamiento y con contrato del artículo 28 del
          RGPD, los proveedores necesarios para que la empresa funcione:
          alojamiento de la web, correo electrónico y asesoría contable y
          laboral. Si alguno de ellos está fuera del Espacio Económico Europeo,
          la transferencia se ampara en las cláusulas contractuales tipo de la
          Comisión Europea o en una decisión de adecuación.
        </p>

        <h2>6. Tus derechos</h2>
        <p>
          Puedes ejercer en cualquier momento los siguientes derechos
          escribiendo a <a href={`mailto:${legal.email}`}>{legal.email}</a>,
          indicando cuál ejerces y acompañando copia de un documento que
          acredite tu identidad:
        </p>
        <ul>
          <li>Acceder a tus datos y saber qué hacemos con ellos.</li>
          <li>Rectificarlos si son inexactos.</li>
          <li>Suprimirlos cuando ya no sean necesarios.</li>
          <li>Limitar u oponerte al tratamiento.</li>
          <li>Portabilidad: recibirlos en un formato estructurado.</li>
          <li>
            Retirar el consentimiento que nos hayas dado, sin que eso afecte a
            lo hecho antes de retirarlo.
          </li>
        </ul>
        <p>
          Si crees que no hemos atendido bien tu derecho, puedes reclamar ante
          la{" "}
          <a
            href={legal.autoridad.web}
            target="_blank"
            rel="noopener noreferrer"
          >
            {legal.autoridad.nombre}
          </a>
          . Contestamos en el plazo de un mes desde la recepción de tu
          solicitud.
        </p>

        <h2>7. Seguridad</h2>
        <p>
          Aplicamos medidas técnicas y organizativas razonables para proteger
          tus datos: acceso limitado a quien lo necesita, equipos con contraseña
          y copias de seguridad. Esta web se sirve por conexión cifrada (HTTPS).
        </p>

        <h2>8. Menores de edad</h2>
        <p>
          Esta web no está dirigida a menores de 14 años y no recogemos datos de
          menores de forma consciente. Si detectamos que nos han llegado, los
          eliminamos.
        </p>

        <h2>9. Cambios en esta política</h2>
        <p>
          Si cambia la forma en que tratamos los datos, actualizaremos este
          texto y la fecha que aparece arriba. La versión vigente es siempre la
          publicada en {site.url.replace("https://", "")}/privacidad.
        </p>
      </LegalLayout>
      <Footer />
    </>
  );
}
