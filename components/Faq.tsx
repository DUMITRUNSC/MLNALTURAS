import { site } from "@/lib/site";

export const faqs = [
  {
    q: "¿Cuánto cuesta una intervención en altura?",
    a: "Depende de la superficie, el estado del soporte y el acceso. No damos precio sin ver el edificio: la visita técnica es gratuita y el presupuesto se entrega por escrito, con el alcance, los materiales y la mano de obra.",
  },
  {
    q: "¿Hace falta montar andamio?",
    a: "No siempre. Cuando el edificio y el alcance lo permiten, el acceso por cuerda evita montar una estructura auxiliar y reduce la ocupación y las molestias. Si un andamio o una plataforma son la solución correcta, lo decimos antes de presupuestar.",
  },
  {
    q: "¿Cuánto tardáis en dar respuesta?",
    a: `Damos una primera respuesta en ${site.responseTime} laborables y, con los datos del edificio, concretamos la visita. Si hay riesgo de desprendimiento o una filtración activa, llámanos para valorar la urgencia.`,
  },
  {
    q: "¿Trabajáis con seguro y personal certificado?",
    a: "Sí. Todo el equipo tiene formación específica de trabajos en altura y equipos de protección homologados con sus revisiones al día, y cada obra arranca con su plan de seguridad y salud.",
  },
  {
    q: "La ITE de nuestro edificio ha salido desfavorable. ¿Podéis ejecutar las obras?",
    a: "Sí, es uno de nuestros trabajos habituales. Ejecutamos lo que marca el informe y entregamos la documentación fotográfica y técnica necesaria para acreditar la subsanación dentro del plazo que fija el Ayuntamiento.",
  },
  {
    q: "¿Trabajáis solo en Madrid capital?",
    a: "Trabajamos en Madrid capital y toda la Comunidad. Para intervenciones de mayor alcance, valoramos el desplazamiento a otras provincias antes de confirmar la visita.",
  },
  {
    q: "¿Cuánto tarda la rehabilitación de una fachada?",
    a: "Depende de la superficie, el estado del soporte, el acceso y los trabajos necesarios. Después de visitar el edificio indicamos un plazo estimado y explicamos qué puede alterarlo antes de empezar.",
  },
  {
    q: "¿Quién paga la obra, la comunidad o el propietario?",
    a: "Depende de la naturaleza del elemento y de los estatutos de la comunidad. En el presupuesto dejamos claro qué zona y qué trabajos incluye la intervención; el reparto del coste debe confirmarlo la administración de la finca o el asesor correspondiente.",
  },
  {
    q: "¿Quién es el interlocutor durante la obra?",
    a: "Tendrás un interlocutor que conoce el edificio y al gerente supervisando el proyecto. No hay una centralita ni un comercial intermedio entre el cliente y el equipo técnico.",
  },
];

export default function Faq() {
  return (
    <section
      id="preguntas"
      className="py-24 lg:py-28"
      style={{ backgroundColor: "var(--bg-soft)" }}
    >
      <div className="pagina">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span
                className="w-10 h-px"
                style={{ backgroundColor: "var(--rule)" }}
              />
              <p className="eyebrow" style={{ color: "var(--ink-muted)" }}>
                Preguntas frecuentes
              </p>
            </div>
            <h2
              className="h-display mb-5"
              style={{ fontSize: "var(--d-2)", color: "var(--ink)" }}
            >
              Lo que preguntan
              <br />
              antes de contratar.
            </h2>
            <p
              className="text-t4 leading-relaxed"
              style={{ color: "var(--ink-muted)" }}
            >
              Si tu duda no está aquí, llama al{" "}
              <a
                href={`tel:${site.phone}`}
                className="font-semibold"
                style={{ color: "var(--blue)" }}
              >
                {site.phoneDisplay}
              </a>{" "}
              y la vemos contigo.
            </p>
          </div>

          <div className="flex flex-col">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                open={i === 0}
                className="group acordeon-mln border-b"
                style={{
                  borderColor: "var(--line)",
                  borderTop: i === 0 ? "1px solid var(--line)" : undefined,
                }}
              >
                <summary className="flex items-start justify-between gap-6 py-5 cursor-pointer list-none">
                  <span
                    className="text-t4 font-semibold leading-snug"
                    style={{ color: "var(--ink)" }}
                  >
                    {f.q}
                  </span>
                  <span className="mt-1 shrink-0 w-5 h-5 relative" aria-hidden>
                    <span
                      className="absolute top-1/2 left-0 w-5 h-[2px] -translate-y-1/2"
                      style={{ backgroundColor: "var(--blue-fill)" }}
                    />
                    <span
                      className="absolute left-1/2 top-0 h-5 w-[2px] -translate-x-1/2 transition-transform duration-200 group-open:rotate-90 group-open:opacity-0"
                      style={{ backgroundColor: "var(--blue-fill)" }}
                    />
                  </span>
                </summary>
                <p
                  className="text-t3 leading-relaxed pb-6 pr-10 max-w-[62ch]"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
