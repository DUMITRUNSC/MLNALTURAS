import { ArrowRight } from "lucide-react";

/**
 * Acceso a empleo desde la home: una franja, no una sección.
 * Quien decide una obra no es quien busca trabajo, así que aquí solo hay
 * una puerta. Todo el contenido vive en /trabaja-con-nosotros.
 */
export default function AvisoEmpleo() {
  return (
    <section
      className="border-t"
      style={{ borderColor: "var(--line)", backgroundColor: "var(--white)" }}
      aria-label="Empleo y colaboradores"
    >
      <div className="pagina">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 lg:gap-16 py-10 lg:py-12">
          <div>
            <p className="eyebrow mb-2.5" style={{ color: "var(--ink-faint)" }}>
              Empleo y colaboradores
            </p>
            <p
              className="text-t5 lg:text-t5 font-semibold tracking-[-0.02em] leading-snug max-w-[46ch]"
              style={{ color: "var(--ink)" }}
            >
              Buscamos oficiales de trabajos verticales, y equipos y autónomos
              que asuman obra completa en Madrid.
            </p>
          </div>

          <a
            href="/trabaja-con-nosotros"
            className="group inline-flex items-center gap-3 min-h-11 py-2 text-t3 font-semibold w-fit shrink-0 whitespace-nowrap"
            style={{ color: "var(--ink)" }}
          >
            Trabaja con nosotros
            <ArrowRight
              size={17}
              style={{ color: "var(--blue)" }}
              className="transition-transform duration-200 group-hover:translate-x-[6px]"
              aria-hidden
            />
          </a>
        </div>
      </div>
    </section>
  );
}
