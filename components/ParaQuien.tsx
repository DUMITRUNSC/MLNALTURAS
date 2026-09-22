import { ArrowRight } from "lucide-react";

/**
 * Para quién trabajamos: los tres públicos en un solo bloque.
 *
 * Sustituye a las dos secciones separadas de administradores y arquitectos
 * y añade a comunidades y particulares, que es el público con más volumen y
 * no tenía bloque propio. Cada columna conserva su frase fuerte y lleva a su
 * sitio. Los ids de columna mantienen vivos los enlaces antiguos
 * (/#administradores, /#arquitectos) y el resaltado de la cabecera.
 */
const publicos = [
  {
    id: "comunidades",
    rotulo: "Comunidades y particulares",
    frase: "Te decimos qué tiene tu edificio y cuánto cuesta arreglarlo.",
    texto:
      "Por escrito y antes de la junta, para que la comunidad decida con el presupuesto delante. La visita técnica es gratuita.",
    enlace: "Pedir visita gratuita",
    href: "#contacto",
  },
  {
    id: "administradores",
    rotulo: "Administradores de fincas",
    frase: "Tú respondes ante la comunidad. Nosotros respondemos ante ti.",
    texto:
      "Un interlocutor, presupuesto que aguanta la junta y obra documentada de principio a fin. Sin centralitas ni cambios a mitad de obra.",
    enlace: "Cómo trabajamos con administradores",
    href: "/administradores",
  },
  {
    id: "arquitectos",
    rotulo: "Arquitectos e ingenierías",
    frase: "El equipo de campo que ejecuta lo que proyectas.",
    texto:
      "Contrata especializada en altura para inspección, toma de datos y ejecución, con la documentación que necesita la dirección de obra.",
    enlace: "Trabajar con MLN",
    href: "/arquitectos",
  },
];

export default function ParaQuien() {
  return (
    <section
      id="para-quien"
      className="py-16 lg:py-28"
      style={{ backgroundColor: "var(--bg-soft)" }}
    >
      <div className="pagina">
        <div className="flex items-center gap-5 mb-10 lg:mb-14" data-reveal>
          <span
            className="w-10 h-px"
            style={{ backgroundColor: "var(--rule)" }}
          />
          <h2 className="eyebrow" style={{ color: "var(--ink-muted)" }}>
            Para quién trabajamos
          </h2>
        </div>

        <div className="grid lg:grid-cols-3">
          {publicos.map((p, i) => (
            <div
              key={p.id}
              id={p.id}
              data-reveal
              className={`flex flex-col py-8 lg:py-2 border-t lg:border-t-0 ${
                i > 0 ? "lg:border-l lg:pl-10" : ""
              } ${i < publicos.length - 1 ? "lg:pr-10" : ""}`}
              style={{ borderColor: "var(--line)" }}
            >
              <p className="eyebrow mb-5" style={{ color: "var(--blue)" }}>
                {p.rotulo}
              </p>
              <h3
                className="h-display mb-5 text-balance text-[length:var(--d-2)] lg:text-[clamp(1.45rem,1.9vw,1.95rem)] lg:leading-[1.12]"
                style={{ color: "var(--ink)" }}
              >
                {p.frase}
              </h3>
              <p
                className="text-t4 leading-relaxed mb-6 max-w-[42ch]"
                style={{ color: "var(--ink-muted)" }}
              >
                {p.texto}
              </p>
              <a
                href={p.href}
                className="group mt-auto inline-flex items-center gap-3 min-h-11 text-t3 font-semibold"
                style={{ color: "var(--ink)" }}
              >
                {p.enlace}
                <ArrowRight
                  size={18}
                  aria-hidden
                  style={{ color: "var(--blue)" }}
                  className="transition-transform duration-300 ease-out group-hover:translate-x-[8px]"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
