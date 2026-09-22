import { site } from "@/lib/site";

const pasos = [
  {
    num: "01",
    titulo: "Inspección",
    desc: "Subimos al edificio y vemos el problema real: fachada, accesos, cubierta y riesgos. Sin diagnóstico no hay precio.",
    nota: `Primera respuesta en ${site.responseTime} laborables`,
  },
  {
    num: "02",
    titulo: "Propuesta",
    desc: "Alcance, sistema constructivo, materiales, plazo y precio por escrito. Preparado para llevarlo a la junta.",
    nota: "Validez 30 días",
  },
  {
    num: "03",
    titulo: "Seguridad",
    desc: "Plan de seguridad y salud específico de trabajos verticales, coordinado con el edificio antes de tocar nada.",
    nota: "Personal formado en altura",
  },
  {
    num: "04",
    titulo: "Ejecución",
    desc: "Equipo supervisado por el gerente, materiales acordados y parte diario. Si aparece algo que cambia el alcance, se comunica antes.",
    nota: "Cambios aprobados antes de ejecutar",
  },
  {
    num: "05",
    titulo: "Entrega",
    desc: "Repaso conjunto, limpieza de la zona, reportaje fotográfico por fases y garantía por escrito.",
    nota: "Documentación entregada",
  },
];

export default function Process() {
  return (
    <section
      id="proceso"
      className="py-16 lg:py-32"
      style={{ backgroundColor: "var(--zona-oscura)" }}
    >
      <div className="pagina">
        <div className="flex items-center gap-5 mb-10" data-reveal>
          <span
            className="w-10 h-px"
            style={{ backgroundColor: "var(--sobre-oscuro-tenue)" }}
          />
          <p className="eyebrow" style={{ color: "var(--sobre-oscuro-tenue)" }}>
            Cómo trabajamos · Alcance y precio por escrito
          </p>
        </div>

        <div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 lg:mb-20"
          data-reveal
        >
          <h2
            className="h-display text-white"
            style={{ fontSize: "var(--d-3)" }}
          >
            Cinco pasos.
            <br />
            Ninguna improvisación.
          </h2>
        </div>

        {/* Escritorio: los cinco pasos a la vez, en cinco columnas, sin
            pestañas: esconder cuatro textos para enseñar uno era perder.
            Móvil: vertical y compacto, número al lado del texto. */}
        <ol
          className="lg:grid lg:grid-cols-5 border-t lg:border-t-0"
          style={{ borderColor: "var(--filete-oscuro)" }}
        >
          {pasos.map((p, i) => (
            <li
              key={p.num}
              data-reveal
              className={`grid grid-cols-[52px_minmax(0,1fr)] gap-x-4 py-6 border-b lg:flex lg:flex-col lg:py-0 lg:pt-8 lg:pb-2 lg:border-b-0 lg:border-t ${
                i > 0 ? "lg:border-l lg:pl-7" : ""
              } ${i < pasos.length - 1 ? "lg:pr-7" : ""}`}
              style={{ borderColor: "var(--filete-oscuro)" }}
            >
              <span
                className="block h-display tabular-nums leading-[0.9] lg:mb-10"
                style={{
                  fontSize: "clamp(1.9rem, 4.4vw, 4.2rem)",
                  color: "var(--sobre-oscuro-numero)",
                }}
                aria-hidden
              >
                {p.num}
              </span>

              <div className="min-w-0 lg:flex lg:flex-1 lg:flex-col">
                <h3
                  className="font-semibold tracking-[-0.02em] text-white mb-2 lg:mb-3"
                  style={{ fontSize: "var(--d-1)" }}
                >
                  {p.titulo}
                </h3>
                <p
                  className="text-t3 leading-[1.62] max-w-[54ch] mb-3 lg:mb-8"
                  style={{ color: "var(--sobre-oscuro-suave)" }}
                >
                  {p.desc}
                </p>
                <p
                  className="eyebrow lg:mt-auto lg:pt-5 lg:border-t leading-[1.7]"
                  style={{
                    color: "var(--blue-light)",
                    borderColor: "var(--filete-oscuro)",
                  }}
                >
                  {p.nota}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
