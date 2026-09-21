import { ArrowRight } from "lucide-react";
import { hayVacantes, vacantes } from "@/lib/vacantes";

const vias = [
  {
    num: "01",
    etiqueta: "En plantilla",
    titulo: "Oficial de trabajos verticales",
    texto:
      "Para gente con oficio: fachada, albañilería, impermeabilización o pintura, y soltura trabajando descolgado. Se entra a una obra continua en Madrid, no a picos de temporada.",
    requisitos: [
      "Formación de trabajos en altura en vigor",
      "Experiencia demostrable en rehabilitación",
      "Trato correcto con vecinos y administradores",
      "Carné de conducir B",
    ],
    enlace: "#contacto-empleo",
    accion: "Contactar",
  },
  {
    num: "02",
    etiqueta: "Empresas y autónomos",
    titulo: "Equipos que asumen obra completa",
    texto:
      "Cuando el calendario aprieta trabajamos con equipos de fuera. Buscamos a los que vuelven: los que dejan la obra limpia, avisan si algo no encaja y cumplen el plazo que firmaron.",
    requisitos: [
      "Alta de autónomo o empresa y seguro de responsabilidad civil",
      "Certificados de altura y EPI con revisión al día",
      "Capacidad de asumir una obra completa, no solo una jornada",
      "Una obra anterior que podamos ir a ver",
    ],
    enlace: "#contacto-empleo",
    accion: "Contactar",
  },
];

/** Las dos formas de entrar en MLN. Vive en /trabaja-con-nosotros. */
export default function ViasDeEntrada() {
  return (
    <section
      id="vias"
      className="py-24 lg:py-32"
      style={{ backgroundColor: "var(--white)" }}
    >
      <div className="pagina">
        <div className="flex items-center gap-5 mb-10 lg:mb-14">
          <span
            className="w-10 h-px"
            style={{ backgroundColor: "var(--rule)" }}
          />
          <p className="eyebrow" style={{ color: "var(--ink-muted)" }}>
            Dos formas de entrar
          </p>
        </div>

        <div className="grid lg:grid-cols-2">
          {vias.map((v, i) => (
            <article
              key={v.titulo}
              data-reveal
              className={`flex flex-col pt-8 border-t ${
                i === 0 ? "lg:pr-16" : "mt-12 lg:mt-0 lg:pl-16 lg:border-l"
              }`}
              style={{ borderColor: "var(--line)" }}
            >
              <div className="flex items-baseline gap-4 mb-7">
                <span
                  className="tecnico text-t1"
                  style={{ color: "var(--ink-faint)" }}
                >
                  {v.num}
                </span>
                <span className="eyebrow" style={{ color: "var(--blue)" }}>
                  {v.etiqueta}
                </span>
              </div>

              <h2
                className="font-semibold tracking-[-0.025em] mb-4"
                style={{ fontSize: "var(--d-1)", color: "var(--ink)" }}
              >
                {v.titulo}
              </h2>
              <p
                className="text-t3 leading-[1.65] mb-7 max-w-[46ch]"
                style={{ color: "var(--ink-muted)" }}
              >
                {v.texto}
              </p>

              {/* Estado real de las ofertas: sale de lib/vacantes.ts. Solo en
                  la vía de plantilla; a los colaboradores no se les publica
                  vacante, se les llama cuando hay obra. */}
              {i === 0 && (
                <div
                  className="mb-9 pl-4 border-l-2 max-w-[46ch]"
                  style={{ borderColor: "var(--blue)" }}
                >
                  {hayVacantes ? (
                    <ul className="flex flex-col gap-3">
                      {vacantes.map((o) => (
                        <li key={o.puesto + o.desde}>
                          <p
                            className="eyebrow mb-1"
                            style={{ color: "var(--blue)" }}
                          >
                            Vacante abierta
                          </p>
                          <p
                            className="text-t3 font-semibold"
                            style={{ color: "var(--ink)" }}
                          >
                            {o.puesto}
                          </p>
                          <p
                            className="text-t2 leading-relaxed"
                            style={{ color: "var(--ink-muted)" }}
                          >
                            {[o.contrato, o.jornada, o.salario]
                              .filter(Boolean)
                              .join(" · ")}
                            {o.nota ? ` — ${o.nota}` : ""}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <>
                      <p
                        className="eyebrow mb-1"
                        style={{ color: "var(--ink-soft)" }}
                      >
                        Ahora mismo, sin vacante abierta
                      </p>
                      <p
                        className="text-t2 leading-relaxed"
                        style={{ color: "var(--ink-muted)" }}
                      >
                        Aceptamos candidaturas espontáneas: la guardamos y te
                        llamamos cuando entre la siguiente obra que encaje.
                      </p>
                    </>
                  )}
                </div>
              )}

              <p className="eyebrow mb-4" style={{ color: "var(--ink-faint)" }}>
                Lo que pedimos
              </p>
              <ul className="flex flex-col mb-10">
                {v.requisitos.map((r) => (
                  <li
                    key={r}
                    className="text-t3 leading-[1.6] py-3 border-t"
                    style={{
                      color: "var(--ink-soft)",
                      borderColor: "var(--line-soft)",
                    }}
                  >
                    {r}
                  </li>
                ))}
              </ul>

              <a
                href={v.enlace}
                className="group mt-auto inline-flex items-center gap-3 min-h-11 py-2 text-t3 font-semibold w-fit"
                style={{ color: "var(--ink)" }}
              >
                {v.accion}
                <ArrowRight
                  size={17}
                  style={{ color: "var(--blue)" }}
                  className="transition-transform duration-200 group-hover:translate-x-[6px]"
                  aria-hidden
                />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
