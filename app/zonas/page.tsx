import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CabeceraInterior, CierreInterior } from "@/components/Interior";
import MobileCallBar from "@/components/MobileCallBar";
import Reveals from "@/components/Reveals";
import { ListaZonas } from "@/components/Zonas";
import { site } from "@/lib/site";

const descripcion =
  "Trabajos verticales y rehabilitación en Madrid capital, Alcobendas, Pozuelo, Majadahonda, Las Rozas, Getafe, Alcalá de Henares y resto de la Comunidad.";

export const metadata: Metadata = {
  title: "Trabajos verticales en Madrid y Comunidad: zonas",
  description: descripcion,
  alternates: { canonical: "/zonas" },
  openGraph: {
    title: "Zonas de trabajo | MLN Construcciones en Altura",
    description: descripcion,
    url: `${site.url}/zonas`,
    siteName: site.legalName,
    locale: "es_ES",
    type: "website",
  },
};

export default function PaginaZonas() {
  return (
    <>
      <Header />
      <main id="contenido" style={{ backgroundColor: "var(--white)" }}>
        <CabeceraInterior
          miga="Zonas de trabajo"
          ruta="/zonas"
          rotulo="Zonas de trabajo"
          linea1="Madrid y Comunidad."
          linea2="Para obras completas, llegamos más lejos."
          intro="Trabajamos en Madrid capital y toda la Comunidad. Para intervenciones de mayor alcance, valoramos otros destinos antes de confirmar la visita."
        />

        <section className="py-16 lg:py-24">
          <div className="pagina">
            <ListaZonas />
            <p
              className="mt-12 pt-8 border-t text-t3 leading-relaxed max-w-[62ch]"
              style={{ borderColor: "var(--line)", color: "var(--ink-muted)" }}
            >
              Antes de confirmar una visita, te decimos si podemos atenderla y
              en qué condiciones.
            </p>
          </div>
        </section>

        <CierreInterior
          titulo="Dinos dónde está el edificio."
          texto="Con la dirección y unas fotos te decimos si llegamos y en qué condiciones. La visita técnica es gratuita."
          accion="Pedir visita técnica"
          href="/#contacto"
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
