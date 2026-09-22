import { ArrowRight } from "lucide-react";
import { zonas } from "@/lib/zonas";

/**
 * Zonas — resumen de portada. El detalle por zona vive en /zonas, con la
 * misma fuente (lib/zonas.ts). Va justo antes de Contacto: es información de
 * comprobación («¿llegan a mi municipio?»), no de persuasión.
 */
const municipios = [
  "Madrid",
  "Alcobendas",
  "San Sebastián de los Reyes",
  "Pozuelo",
  "Majadahonda",
  "Las Rozas",
  "Getafe",
  "Leganés",
  "Fuenlabrada",
  "Alcalá de Henares",
  "Corredor del Henares",
];

export default function Zonas() {
  return (
    <section
      id="zonas"
      className="py-16 lg:py-28"
      style={{ backgroundColor: "var(--bg-soft)" }}
    >
      <div className="pagina grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-20">
        <div data-reveal>
          <div className="flex items-center gap-5 mb-8">
            <span
              className="w-10 h-px"
              style={{ backgroundColor: "var(--rule)" }}
            />
            <p className="eyebrow" style={{ color: "var(--ink-muted)" }}>
              Zonas de trabajo
            </p>
          </div>
          <h2
            className="h-display"
            style={{ fontSize: "var(--d-2)", color: "var(--ink)" }}
          >
            Madrid y Comunidad.
            <br />
            Para obras completas, llegamos más lejos.
          </h2>
        </div>

        <div className="lg:self-end">
          <p
            className="text-t4 leading-[1.62] max-w-[52ch] mb-6"
            style={{ color: "var(--ink-muted)" }}
          >
            Trabajamos en Madrid capital y toda la Comunidad. Para
            intervenciones de mayor alcance, valoramos otros destinos antes de
            confirmar la visita.
          </p>
          <p
            className="tecnico text-t1 uppercase tracking-[0.12em] leading-[2] mb-5 max-w-[60ch]"
            style={{ color: "var(--ink-soft)" }}
          >
            {municipios.join(" · ")}
          </p>
          <a
            href="/zonas"
            className="group inline-flex items-center gap-3 min-h-11 text-t3 font-semibold"
            style={{ color: "var(--blue)" }}
          >
            Ver zonas de trabajo
            <ArrowRight
              size={17}
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-[5px]"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

/** Las seis zonas con su descripción: la usa /zonas. (El resumen de arriba ya no se monta en la portada; queda por si se recupera.) */
export function ListaZonas() {
  return (
    <ol className="grid sm:grid-cols-2 gap-x-12 lg:gap-x-20">
      {zonas.map((z, i) => (
        <li
          key={z.nombre}
          data-reveal
          className="grid grid-cols-[34px_minmax(0,1fr)] gap-x-4 py-7 border-t"
          style={{ borderColor: "var(--line)" }}
        >
          <span
            className="tecnico text-t1 font-medium pt-1.5"
            style={{ color: "var(--ink-faint)" }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0">
            <h2
              className="text-t5 font-semibold tracking-[-0.02em] mb-2 text-balance"
              style={{ color: "var(--ink)" }}
            >
              {z.nombre}
            </h2>
            <p
              className="text-t3 leading-[1.62] max-w-[44ch]"
              style={{ color: "var(--ink-muted)" }}
            >
              {z.desc}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
