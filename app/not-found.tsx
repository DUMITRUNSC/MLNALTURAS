import type { Metadata } from "next";
import { BotonEnlace } from "@/components/Boton";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Esta página no existe",
  robots: { index: false, follow: true },
};

const secciones = [
  ["/#servicios", "Servicios"],
  ["/administradores", "Administradores de fincas"],
  ["/arquitectos", "Arquitectos e ingenieros"],
  ["/#preguntas", "Preguntas frecuentes"],
  ["/#contacto", "Contacto"],
  ["/trabaja-con-nosotros", "Trabaja con nosotros"],
];

/** 404 con salida: la de Next deja a la persona en una pantalla en blanco. */
export default function NoEncontrada() {
  return (
    <>
      <Header />
      <main id="contenido" style={{ backgroundColor: "var(--white)" }}>
        <div className="pagina pt-32 lg:pt-40 pb-24 lg:pb-32">
          <p
            className="tecnico font-semibold mb-8"
            style={{ fontSize: "var(--n-2)", color: "var(--rule)" }}
          >
            404
          </p>
          <h1
            className="h-display mb-6 max-w-[24ch]"
            style={{ fontSize: "var(--d-3)", color: "var(--ink)" }}
          >
            Esta página no está.
          </h1>
          <p
            className="text-t4 leading-[1.62] max-w-[52ch] mb-10"
            style={{ color: "var(--ink-muted)" }}
          >
            O la dirección se ha escrito mal, o la hemos movido. Lo que buscas
            está a un clic desde la portada, y si es urgente, el teléfono va más
            rápido que cualquier menú.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
            <BotonEnlace href="/">Volver a la portada</BotonEnlace>
            <BotonEnlace href={`tel:${site.phone}`} variante="contorno">
              Llamar al {site.phoneDisplay}
            </BotonEnlace>
          </div>

          <nav
            className="mt-16 pt-8 border-t flex flex-wrap gap-x-8 gap-y-3"
            style={{ borderColor: "var(--line)" }}
            aria-label="Secciones"
          >
            {secciones.map(([href, texto]) => (
              <a
                key={href}
                href={href}
                className="inline-flex items-center min-h-11 py-2 text-t3 font-semibold transicion-color duration-150 hover:text-[var(--blue)]"
                style={{ color: "var(--ink-soft)" }}
              >
                {texto}
              </a>
            ))}
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
