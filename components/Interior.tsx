import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { BotonEnlace } from "@/components/Boton";
import { faqs } from "@/components/Faq";
import Miga from "@/components/Miga";
import { site } from "@/lib/site";

/* Piezas comunes de las páginas de dentro (/administradores, /arquitectos,
 * /zonas). Mismo lenguaje que la portada: filete + rótulo, h-display,
 * retícula numerada. Sin tarjetas ni sombras. */

export function Rotulo({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-5 mb-8">
      <span className="w-10 h-px" style={{ backgroundColor: "var(--rule)" }} />
      <p className="eyebrow" style={{ color: "var(--ink-muted)" }}>
        {children}
      </p>
    </div>
  );
}

/** Portada de página interior: miga, rótulo, H1 en dos líneas e intro. */
export function CabeceraInterior({
  miga,
  ruta,
  rotulo,
  linea1,
  linea2,
  intro,
}: {
  miga: string;
  ruta: string;
  rotulo: string;
  linea1: string;
  linea2: string;
  intro: string;
}) {
  return (
    <section
      style={{
        background:
          "linear-gradient(180deg, var(--sky-1) 0%, var(--sky-2) 55%, var(--white) 100%)",
      }}
    >
      <div className="pagina pt-32 lg:pt-40 pb-14 lg:pb-20">
        <Miga aqui={miga} ruta={ruta} />
        <Rotulo>{rotulo}</Rotulo>
        <h1
          className="h-display mb-8 text-balance"
          style={{ fontSize: "var(--d-3)", color: "var(--ink)" }}
        >
          {linea1}
          <br />
          <span style={{ color: "var(--blue)" }}>{linea2}</span>
        </h1>
        <p
          className="text-t4 lg:text-t5 leading-[1.62] max-w-[56ch]"
          style={{ color: "var(--ink-soft)" }}
        >
          {intro}
        </p>
      </div>
    </section>
  );
}

/** Enlace de vuelta al proceso de la portada. */
export function EnlaceProceso() {
  return (
    <a
      href="/#proceso"
      className="group inline-flex items-center gap-3 min-h-11 py-2 text-t3 font-semibold"
      style={{ color: "var(--ink)" }}
    >
      Cómo trabajamos: cinco pasos, ninguna improvisación
      <ArrowRight
        size={17}
        aria-hidden
        style={{ color: "var(--blue)" }}
        className="transition-transform duration-200 group-hover:translate-x-[6px]"
      />
    </a>
  );
}

/** Unas pocas preguntas de la portada. Sin FAQPage: ese marcado es solo de la home. */
export function PreguntasBreves({
  preguntas,
}: {
  preguntas: readonly string[];
}) {
  const lista = faqs.filter((f) => preguntas.includes(f.q));
  return (
    <section
      className="py-20 lg:py-28"
      style={{ backgroundColor: "var(--white)" }}
    >
      <div className="pagina grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20">
        <div>
          <Rotulo>Preguntas frecuentes</Rotulo>
          <h2
            className="h-display"
            style={{ fontSize: "var(--d-2)", color: "var(--ink)" }}
          >
            Lo que suelen
            <br />
            preguntarnos.
          </h2>
        </div>
        <div>
          {lista.map((f, i) => (
            <details
              key={f.q}
              className="group border-b"
              style={{
                borderColor: "var(--line)",
                borderTop: i === 0 ? "1px solid var(--line)" : undefined,
              }}
            >
              <summary
                className="flex items-start justify-between gap-6 py-5 cursor-pointer list-none text-t4 font-semibold"
                style={{ color: "var(--ink)" }}
              >
                {f.q}
                <span
                  aria-hidden
                  className="text-t6 leading-none transition-transform duration-200 group-open:rotate-45"
                  style={{ color: "var(--blue)" }}
                >
                  +
                </span>
              </summary>
              <p
                className="pb-6 text-t3 leading-relaxed max-w-[62ch]"
                style={{ color: "var(--ink-muted)" }}
              >
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Cierre azul con la acción de la página y el teléfono. */
export function CierreInterior({
  titulo,
  texto,
  accion,
  href,
  extra,
}: {
  titulo: string;
  texto?: string;
  accion: string;
  href: string;
  extra?: ReactNode;
}) {
  return (
    <section
      className="py-20 lg:py-32"
      style={{ backgroundColor: "var(--blue-deep)" }}
    >
      <div className="pagina">
        <h2
          className="h-display text-white mb-6 max-w-[22ch]"
          style={{ fontSize: "var(--d-3)" }}
        >
          {titulo}
        </h2>
        {texto && (
          <p
            className="text-t4 leading-relaxed max-w-[54ch] mb-10"
            style={{ color: "var(--sobre-oscuro-tenue)" }}
          >
            {texto}
          </p>
        )}
        <div
          className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-8 pt-8 border-t"
          style={{ borderColor: "var(--filete-oscuro)" }}
        >
          <BotonEnlace href={href}>
            {accion}
            <ArrowRight size={17} aria-hidden />
          </BotonEnlace>
          <a
            href={`tel:${site.phone}`}
            className="inline-flex items-center min-h-11 text-t3 font-semibold text-white"
          >
            Llámanos: {site.phoneDisplay}
          </a>
          {extra}
        </div>
      </div>
    </section>
  );
}
