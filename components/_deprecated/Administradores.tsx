import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { fotos } from "@/lib/fotos";

/**
 * Administradores — teaser de portada. El contenido completo (los cuatro
 * puntos, ITE, preguntas) vive en /administradores y en
 * lib/administradores.ts. El id se mantiene para que los enlaces antiguos
 * a /#administradores sigan cayendo aquí.
 */
export default function Administradores() {
  return (
    <section
      id="administradores"
      className="py-16 lg:py-28"
      style={{ backgroundColor: "var(--bg-soft)" }}
    >
      <div className="pagina grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-20 items-center">
        <div>
          <div className="flex items-center gap-5 mb-8" data-reveal>
            <span
              className="w-10 h-px"
              style={{ backgroundColor: "var(--rule)" }}
            />
            <p className="eyebrow" style={{ color: "var(--ink-muted)" }}>
              Administradores de fincas
            </p>
          </div>

          <h2
            className="h-display mb-7"
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
            className="text-t4 leading-relaxed mb-8 max-w-[50ch]"
            style={{ color: "var(--ink-muted)" }}
            data-reveal
          >
            Un interlocutor, presupuesto por escrito que aguanta la junta y obra
            documentada de principio a fin. Sin centralitas ni cambios a mitad
            de obra.
          </p>

          <a
            href="/administradores"
            className="group inline-flex items-center gap-3 min-h-11 py-2 text-t3 font-semibold"
            style={{ color: "var(--ink)" }}
          >
            Cómo trabajamos con administradores
            <ArrowRight
              size={18}
              style={{ color: "var(--blue)" }}
              className="transition-transform duration-300 ease-out group-hover:translate-x-[8px]"
              aria-hidden
            />
          </a>
        </div>

        <div
          className="foto-deriva relative w-full aspect-[16/11] lg:aspect-[4/5] lg:max-h-[560px] overflow-hidden"
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
      </div>
    </section>
  );
}
