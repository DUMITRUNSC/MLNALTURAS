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
    nota: "Personal certificado en altura",
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
    desc: "Repaso conjunto, limpieza de la zona, reportaje fotográfico por fases y garantía activa por escrito.",
    nota: "Documentación entregada",
  },
];

export default function Process() {
  return (
    <section
      id="proceso"
      className="py-28 lg:py-40"
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
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-24"
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
          <p
            className="text-t4 leading-relaxed max-w-xs lg:text-right"
            style={{ color: "var(--sobre-oscuro-suave)" }}
          >
            Contratar trabajos en altura es un acto de confianza. Cada fase está
            definida antes de empezar.
          </p>
        </div>

        <ol>
          {pasos.map((p, i) => (
            <li
              key={p.num}
              data-reveal
              className="grid grid-cols-1 lg:grid-cols-[minmax(0,190px)_minmax(0,1fr)_minmax(0,230px)] gap-y-4 lg:gap-x-16 py-10 lg:py-12 border-t"
              style={{
                borderColor: "var(--filete-oscuro)",
                borderBottom:
                  i === pasos.length - 1
                    ? "1px solid var(--filete-oscuro)"
                    : undefined,
              }}
            >
              <span
                className="block h-display tabular-nums leading-[0.82]"
                style={{
                  fontSize: "var(--n-3)",
                  color: "var(--sobre-oscuro-numero)",
                }}
                aria-hidden
              >
                {p.num}
              </span>

              <div className="lg:pt-2">
                <h3
                  className="font-semibold tracking-[-0.02em] text-white mb-3"
                  style={{ fontSize: "var(--d-1)" }}
                >
                  {p.titulo}
                </h3>
                <p
                  className="text-t3 leading-[1.65] max-w-[54ch]"
                  style={{ color: "var(--sobre-oscuro-suave)" }}
                >
                  {p.desc}
                </p>
              </div>

              <p
                className="eyebrow lg:pt-4 lg:text-right"
                style={{ color: "var(--blue-light)" }}
              >
                {p.nota}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
