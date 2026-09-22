import { ArrowRight } from "lucide-react";

/**
 * Arquitectos — teaser de portada. Los cuatro bloques y las acciones viven
 * en /arquitectos (lib/arquitectos.ts). Sin foto, a propósito.
 */
export default function Arquitectos() {
  return (
    <section
      id="arquitectos"
      className="py-16 lg:py-28 border-b"
      style={{ backgroundColor: "var(--white)", borderColor: "var(--line)" }}
    >
      <div className="pagina">
        <div className="flex items-center gap-5 mb-8" data-reveal>
          <span
            className="w-10 h-px"
            style={{ backgroundColor: "var(--rule)" }}
          />
          <p className="eyebrow" style={{ color: "var(--ink-muted)" }}>
            Arquitectos e ingenierías
          </p>
        </div>

        <div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-16"
          data-reveal
        >
          <h2
            className="h-display"
            style={{ fontSize: "var(--d-3)", color: "var(--ink)" }}
          >
            El equipo de campo
            <br />
            que ejecuta lo que proyectas.
          </h2>
          <div className="lg:max-w-sm">
            <p
              className="text-t4 leading-relaxed mb-5"
              style={{ color: "var(--ink-muted)" }}
            >
              Contrata especializada en altura para inspección, toma de datos y
              ejecución, con la documentación que necesita la dirección de obra.
            </p>
            <a
              href="/arquitectos"
              className="group inline-flex items-center gap-3 min-h-11 py-2 text-t3 font-semibold"
              style={{ color: "var(--ink)" }}
            >
              Trabajar con MLN
              <ArrowRight
                size={18}
                style={{ color: "var(--blue)" }}
                className="transition-transform duration-300 ease-out group-hover:translate-x-[8px]"
                aria-hidden
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
