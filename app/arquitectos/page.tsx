import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  CabeceraInterior,
  CierreInterior,
  EnlaceProceso,
} from "@/components/Interior";
import MobileCallBar from "@/components/MobileCallBar";
import Reveals from "@/components/Reveals";
import { bloquesArquitectos } from "@/lib/arquitectos";
import { site } from "@/lib/site";

const descripcion =
  "Contrata especializada en altura: acceso para inspección y toma de datos, ejecución fiel al proyecto y documentación para la dirección de obra.";

export const metadata: Metadata = {
  title: "Contrata de trabajos verticales para arquitectos",
  description: descripcion,
  alternates: { canonical: "/arquitectos" },
  openGraph: {
    title: "Arquitectos e ingenierías | MLN Construcciones en Altura",
    description: descripcion,
    url: `${site.url}/arquitectos`,
    siteName: site.legalName,
    locale: "es_ES",
    type: "website",
  },
};

export default function PaginaArquitectos() {
  return (
    <>
      <Header />
      <main id="contenido" style={{ backgroundColor: "var(--white)" }}>
        <CabeceraInterior
          miga="Arquitectos e ingenierías"
          ruta="/arquitectos"
          rotulo="Arquitectos e ingenierías"
          linea1="El equipo de campo"
          linea2="que ejecuta lo que proyectas."
          intro="Entramos como contrata especializada en altura dentro de tu obra, o como apoyo puntual para llegar a lo que no se inspecciona desde el suelo."
        />

        <section className="py-16 lg:py-24">
          <div className="pagina">
            <div
              className="grid md:grid-cols-2 border-t"
              style={{ borderColor: "var(--line)" }}
            >
              {bloquesArquitectos.map((b) => (
                <div
                  key={b.num}
                  data-reveal
                  className="py-10 lg:py-12 md:odd:pr-12 md:even:pl-12 border-b md:even:border-l"
                  style={{ borderColor: "var(--line)" }}
                >
                  <span
                    className="block h-display tabular-nums leading-none mb-6"
                    style={{ fontSize: "var(--d-3)", color: "var(--numero)" }}
                    aria-hidden
                  >
                    {b.num}
                  </span>
                  <h2
                    className="text-t5 font-semibold mb-3 tracking-[-0.02em]"
                    style={{ color: "var(--ink)" }}
                  >
                    {b.title}
                  </h2>
                  <p
                    className="text-t3 leading-[1.65] max-w-[52ch]"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <EnlaceProceso />
            </div>
          </div>
        </section>

        <CierreInterior
          titulo="Envíanos el proyecto o las mediciones."
          texto="Con el proyecto, las mediciones o unas fotos del punto a intervenir preparamos la propuesta. Si hace falta subir a verlo, la visita no se cobra."
          accion="Enviar proyecto o mediciones"
          href="/?perfil=arquitecto#contacto"
          extra={
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center min-h-11 text-t3 font-medium underline underline-offset-4"
              style={{ color: "var(--sobre-oscuro-tenue)" }}
            >
              {site.email}
            </a>
          }
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
