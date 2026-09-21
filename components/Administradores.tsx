import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { fotos } from "@/lib/fotos";

const puntos = [
  {
    num: "01",
    title: "Un interlocutor, no una centralita",
    desc: "Hablas con el técnico que conoce el edificio y con el gerente que supervisa la intervención. Sin pasar por centralitas ni comerciales.",
  },
  {
    num: "02",
    title: "Presupuesto que aguanta la junta",
    desc: "Visita técnica, alcance y precio por escrito. Cualquier cambio se comunica y aprueba antes de ejecutarlo.",
  },
  {
    num: "03",
    title: "Subsanación de deficiencias de la ITE",
    desc: "Ejecutamos las obras que marca el informe y entregamos la documentación para acreditar la subsanación dentro del plazo.",
  },
  {
    num: "04",
    title: "Obra documentada de principio a fin",
    desc: "Plan de seguridad, reportaje fotográfico del antes y el después, y cierre firmado. Todo lo que necesitas para tu archivo.",
  },
];

export default function Administradores() {
  return (
    <section
      id="administradores"
      className="py-24 lg:py-32"
      style={{ backgroundColor: "var(--bg-soft)" }}
    >
      <div className="pagina">
        <div className="flex items-center gap-5 mb-10" data-reveal>
          <span
            className="w-10 h-px"
            style={{ backgroundColor: "var(--rule)" }}
          />
          <p className="eyebrow" style={{ color: "var(--ink-muted)" }}>
            Administradores de fincas
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-20">
          <div>
            <h2
              className="h-display mb-8"
              style={{ fontSize: "var(--d-3)", color: "var(--ink)" }}
              data-reveal
            >
              Tú respondes ante la comunidad.
              <br />
              <span style={{ color: "var(--blue)" }}>
                Nosotros respondemos ante ti.
              </span>
            </h2>

            <p
              className="text-t4 leading-relaxed mb-12 max-w-[52ch]"
              style={{ color: "var(--ink-muted)" }}
              data-reveal
            >
              Gestionas varias fincas y el problema no suele ser la obra: es el
              proveedor que no responde, el presupuesto que cambia a mitad de
              obra y la documentación que se retrasa.
            </p>

            <ol>
              {puntos.map((p, i) => (
                <li
                  key={p.num}
                  data-reveal
                  className="grid grid-cols-[42px_1fr] gap-x-5 py-7 border-t"
                  style={{
                    borderColor: "var(--line)",
                    borderBottom:
                      i === puntos.length - 1
                        ? "1px solid var(--line)"
                        : undefined,
                  }}
                >
                  <span
                    className="tecnico text-t1 pt-1"
                    style={{ color: "var(--ink-faint)" }}
                  >
                    {p.num}
                  </span>
                  <div>
                    <h3
                      className="text-t5 font-semibold mb-2 tracking-[-0.01em]"
                      style={{ color: "var(--ink)" }}
                    >
                      {p.title}
                    </h3>
                    <p
                      className="text-t3 leading-relaxed max-w-[54ch]"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {p.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <a
              href="#contacto"
              className="group mt-10 inline-flex items-center gap-3 min-h-11 py-2 text-t3 font-semibold"
              style={{ color: "var(--ink)" }}
            >
              Pedir visita para una finca
              <ArrowRight
                size={18}
                style={{ color: "var(--blue)" }}
                className="transition-transform duration-300 ease-out group-hover:translate-x-[8px]"
                aria-hidden
              />
            </a>
          </div>

          <div className="lg:pt-4">
            <div
              className="foto-deriva relative w-full aspect-[4/5] overflow-hidden"
              style={{ backgroundColor: "var(--line-soft)" }}
              data-reveal-mask
            >
              <Image
                src={fotos.administradores.src}
                alt={fotos.administradores.alt}
                fill
                quality={90}
                sizes="(max-width: 1024px) 92vw, 44vw"
                className="object-cover"
              />
            </div>

            <div
              className="pt-6 mt-6 border-t"
              style={{ borderColor: "var(--line)" }}
            >
              <p className="eyebrow mb-3" style={{ color: "var(--blue)" }}>
                ITE en Madrid
              </p>
              <p
                className="text-t3 leading-relaxed max-w-[46ch]"
                style={{ color: "var(--ink-soft)" }}
              >
                Cuando una ITE detecta deficiencias, ejecutamos las actuaciones
                que marca el informe y entregamos la documentación técnica y
                fotográfica necesaria para acreditar la subsanación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
