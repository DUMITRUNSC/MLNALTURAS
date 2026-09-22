import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  CabeceraInterior,
  CierreInterior,
  EnlaceProceso,
  PreguntasBreves,
} from "@/components/Interior";
import MobileCallBar from "@/components/MobileCallBar";
import Reveals from "@/components/Reveals";
import { iteMadrid, puntosAdministradores } from "@/lib/administradores";
import { fotos } from "@/lib/fotos";
import { site } from "@/lib/site";

const descripcion =
  "Un interlocutor, presupuesto que aguanta la junta y obra documentada de principio a fin. Subsanación de ITE y visita técnica gratuita en Madrid.";

export const metadata: Metadata = {
  // + « | MLN Construcciones en Altura» de la plantilla del layout.
  title: "Trabajos verticales para administradores de fincas",
  description: descripcion,
  alternates: { canonical: "/administradores" },
  openGraph: {
    title: "Administradores de fincas | MLN Construcciones en Altura",
    description: descripcion,
    url: `${site.url}/administradores`,
    siteName: site.legalName,
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/patio-madrid-balcones.jpg",
        alt: "Patio interior de un edificio madrileño con balcones",
      },
    ],
  },
};

export default function PaginaAdministradores() {
  return (
    <>
      <Header />
      <main id="contenido" style={{ backgroundColor: "var(--white)" }}>
        <CabeceraInterior
          miga="Administradores de fincas"
          ruta="/administradores"
          rotulo="Administradores de fincas"
          linea1="Tú respondes ante la comunidad."
          linea2="Nosotros respondemos ante ti."
          intro="Gestionas varias fincas y el problema no suele ser la obra: es el proveedor que no responde, el presupuesto que cambia a mitad de obra y la documentación que se retrasa."
        />

        <section className="py-16 lg:py-24">
          <div className="pagina grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20">
            <ol>
              {puntosAdministradores.map((p, i) => (
                <li
                  key={p.num}
                  data-reveal
                  className="grid grid-cols-[42px_1fr] gap-x-5 py-7 border-t"
                  style={{
                    borderColor: "var(--line)",
                    borderBottom:
                      i === puntosAdministradores.length - 1
                        ? "1px solid var(--line)"
                        : undefined,
                  }}
                >
                  <span
                    className="tecnico text-t1 pt-1"
                    style={{ color: "var(--ink-faint)" }}
                  >
                    {p.num}
                  </span>
                  <div>
                    <h2
                      className="text-t5 font-semibold mb-2 tracking-[-0.01em]"
                      style={{ color: "var(--ink)" }}
                    >
                      {p.title}
                    </h2>
                    <p
                      className="text-t3 leading-relaxed max-w-[54ch]"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {p.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <aside className="lg:pt-7">
              {/* La foto del patio se muda aquí desde la portada. */}
              <div
                className="foto-deriva relative w-full aspect-[4/5] max-h-[520px] overflow-hidden mb-8"
                style={{ backgroundColor: "var(--line-soft)" }}
              >
                <Image
                  src={fotos.administradores.src}
                  alt={fotos.administradores.alt}
                  fill
                  quality={85}
                  sizes="(max-width: 1024px) 92vw, 36vw"
                  className="object-cover"
                />
              </div>
              <div
                className="pt-6 border-t"
                style={{ borderColor: "var(--blue)" }}
              >
                <p className="eyebrow mb-3" style={{ color: "var(--blue)" }}>
                  ITE en Madrid
                </p>
                <p
                  className="text-t4 leading-relaxed max-w-[46ch] mb-8"
                  style={{ color: "var(--ink-soft)" }}
                >
                  {iteMadrid}
                </p>
                <EnlaceProceso />
              </div>
            </aside>
          </div>
        </section>

        <div style={{ backgroundColor: "var(--bg-soft)" }}>
          <PreguntasBreves
            preguntas={[
              "¿Quién es el interlocutor durante la obra?",
              "La ITE de nuestro edificio ha salido desfavorable. ¿Podéis ejecutar las obras?",
              "¿Quién paga la obra, la comunidad o el propietario?",
            ]}
          />
        </div>

        <CierreInterior
          titulo="Una finca, un interlocutor."
          texto="La visita técnica es gratuita. Vemos el edificio, definimos la intervención y te entregamos el presupuesto por escrito, listo para la junta."
          accion="Pedir visita para una finca"
          href="/?perfil=administrador#contacto"
        />
      </main>
      <Footer />
      <MobileCallBar />
      {/* Hueco para la barra fija. Del color del pie: cuando la barra se
          aparta en la sección de contacto, antes asomaba una franja blanca. */}
      <div
        className="lg:hidden h-[58px]"
        style={{ backgroundColor: "var(--zona-oscura)" }}
        aria-hidden
      />
      <Reveals />
    </>
  );
}
