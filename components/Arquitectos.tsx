import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

const bloques = [
  {
    num: "01",
    title: "Acceso para inspección y toma de datos",
    desc: "Accedemos al punto necesario para catas, pruebas, fotografía de detalle o termografía, evitando medios auxiliares y ocupación de vía cuando el edificio lo permite.",
  },
  {
    num: "02",
    title: "Ejecución fiel al proyecto",
    desc: "Trabajamos con la solución y los materiales que marca la dirección facultativa. Si algo no encaja en obra, se avisa antes de ejecutarlo, no después.",
  },
  {
    num: "03",
    title: "Documentación para la dirección de obra",
    desc: "Partes de trabajo, reportaje fotográfico por fases y certificados de los materiales empleados. Lo que necesitas para certificar y para el libro del edificio.",
  },
  {
    num: "04",
    title: "Coordinación de seguridad y salud",
    desc: "Plan de seguridad específico de trabajos verticales, personal con formación en altura y equipos homologados con su revisión al día.",
  },
];

export default function Arquitectos() {
  return (
    <section
      id="arquitectos"
      className="py-24 lg:py-32"
      style={{ backgroundColor: "var(--white)" }}
    >
      <div className="pagina">
        <div className="flex items-center gap-5 mb-10" data-reveal>
          <span
            className="w-10 h-px"
            style={{ backgroundColor: "var(--rule)" }}
          />
          <p className="eyebrow" style={{ color: "var(--ink-muted)" }}>
            Arquitectos e ingenierías
          </p>
        </div>

        <div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16"
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
          <p
            className="text-t4 leading-relaxed max-w-xs lg:text-right"
            style={{ color: "var(--ink-muted)" }}
          >
            Entramos como contrata especializada en altura dentro de tu obra, o
            como apoyo puntual para llegar a lo que no se inspecciona desde el
            suelo.
          </p>
        </div>

        <div
          className="grid md:grid-cols-2 border-t"
          style={{ borderColor: "var(--line)" }}
        >
          {bloques.map((b) => (
            <div
              key={b.num}
              data-reveal
              className="py-10 lg:py-12 md:odd:pr-12 md:even:pl-12 border-b md:even:border-l"
              style={{ borderColor: "var(--line)" }}
            >
              <span
                className="block h-display tabular-nums leading-none mb-6"
                style={{ fontSize: "var(--d-3)", color: "var(--numero)" }}
                aria-hidden
              >
                {b.num}
              </span>
              <h3
                className="text-t5 font-semibold mb-3 tracking-[-0.02em]"
                style={{ color: "var(--ink)" }}
              >
                {b.title}
              </h3>
              <p
                className="text-t3 leading-[1.65] max-w-[52ch]"
                style={{ color: "var(--ink-muted)" }}
              >
                {b.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Dos acciones, porque a este público le sirven las dos: mandar las
            especificaciones y que le llamen. Antes solo había un enlace que
            describía un envío sin decir qué pasaba después. */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 mt-12">
          <a
            href="/?perfil=arquitecto#contacto"
            className="group inline-flex items-center gap-3 min-h-11 py-2 text-t3 font-semibold"
            style={{ color: "var(--ink)" }}
          >
            Enviar proyecto o mediciones
            <ArrowUpRight
              size={19}
              style={{ color: "var(--blue)" }}
              className="transition-transform duration-200 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]"
              aria-hidden
            />
          </a>
          <a
            href={`tel:${site.phone}`}
            className="inline-flex items-center min-h-11 py-2 text-t3 font-semibold transicion-color duration-150"
            style={{ color: "var(--ink-muted)" }}
          >
            Llámanos: {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
