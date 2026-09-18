import { ArrowRight } from "lucide-react";

export default function CTABlock() {
  return (
    <section
      className="py-28 lg:py-44"
      style={{ backgroundColor: "var(--blue-deep)" }}
    >
      <div className="pagina">
        <div className="flex items-center gap-5 mb-10">
          <span
            className="w-10 h-px"
            style={{ backgroundColor: "var(--sobre-oscuro-tenue)" }}
          />
          <p className="eyebrow" style={{ color: "var(--sobre-oscuro-tenue)" }}>
            Presupuesto cerrado por escrito · Madrid
          </p>
        </div>

        <h2
          className="h-display text-white mb-12 lg:mb-16 max-w-[24ch]"
          style={{ fontSize: "var(--d-5)" }}
          data-reveal
        >
          Hay problemas que empiezan muchos metros por encima de la acera.
        </h2>

        <div
          className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 pt-10 border-t"
          style={{ borderColor: "var(--filete-oscuro)" }}
        >
          <a
            href="#contacto"
            className="group inline-flex items-center gap-4 min-h-11 py-2 text-white font-semibold"
            style={{ fontSize: "var(--d-1)" }}
          >
            Cuéntanos qué ocurre
            <ArrowRight
              size={22}
              aria-hidden
              className="transition-transform duration-300 ease-out group-hover:translate-x-[8px]"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
