import { ArrowRight } from "lucide-react";
import { zonas } from "@/lib/zonas";

/**
 * Dónde trabajamos, con lo que hay en cada zona.
 *
 * Hasta ahora las zonas eran una lista de nombres en el pie de página: ni una
 * persona sabía qué implica trabajar en cada una, ni un buscador entendía que
 * la empresa opera en Pozuelo. Cada zona lleva ahora su propio texto, que es
 * lo que separa una sección útil de una lista de municipios.
 *
 * Misma retícula que el índice de servicios: filete arriba, número en el
 * carril izquierdo y el contenido en una sola columna de lectura.
 */
export default function Zonas() {
  return (
    <section
      id="zonas"
      className="py-24 lg:py-32"
      style={{ backgroundColor: "var(--bg-soft)" }}
    >
      <div className="pagina">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-20 mb-14 lg:mb-16">
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
              Trabajamos donde nos podemos
              <br />
              plantar en media hora.
            </h2>
          </div>

          <div className="lg:self-end">
            <p
              className="text-t4 leading-[1.62] max-w-[52ch]"
              style={{ color: "var(--ink-muted)" }}
            >
              No somos una franquicia con delegaciones. Salimos de Madrid, y si
              el edificio está a más de una hora lo decimos en la primera
              llamada en vez de encajarlo con calzador.
            </p>
            {/* Este enlace estaba al final de las seis zonas y en móvil se
                quedaba enterrado: aquí lo ve quien lee el titular. */}
            <a
              href="#contacto"
              className="group inline-flex items-center gap-3 min-h-11 mt-5 text-t3 font-semibold transicion-color duration-150"
              style={{ color: "var(--blue)" }}
            >
              ¿Tu edificio no está en la lista? Dinos dónde está
              <ArrowRight
                size={17}
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-[5px]"
              />
            </a>
          </div>
        </div>

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
                <h3
                  className="text-t5 font-semibold tracking-[-0.02em] mb-2 text-balance"
                  style={{ color: "var(--ink)" }}
                >
                  {z.nombre}
                </h3>
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

        <p
          className="mt-12 pt-8 border-t text-t3 leading-relaxed max-w-[62ch]"
          style={{ borderColor: "var(--line)", color: "var(--ink-muted)" }}
        >
          Preferimos decir que no llegamos antes que aceptar la obra y darte
          largas.
        </p>
      </div>
    </section>
  );
}
