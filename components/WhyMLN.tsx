import Image from "next/image";
import { fotos } from "@/lib/fotos";
import { site } from "@/lib/site";

export default function WhyMLN() {
  return (
    <section
      id="empresa"
      className="py-16 lg:py-28"
      style={{ backgroundColor: "var(--white)" }}
    >
      <div className="pagina">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-20 items-center">
          <div
            className="foto-deriva relative aspect-[16/11] overflow-hidden order-2 lg:order-1"
            style={{ backgroundColor: "var(--line-soft)" }}
            data-reveal-mask
          >
            <Image
              src={fotos.empresa.src}
              alt={fotos.empresa.alt}
              fill
              quality={90}
              sizes="(max-width: 1024px) 92vw, 46vw"
              className="object-cover"
            />
          </div>

          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-4 mb-8">
              <span
                className="w-10 h-px"
                style={{ backgroundColor: "var(--rule)" }}
              />
              <p className="eyebrow" style={{ color: "var(--ink-muted)" }}>
                La empresa
              </p>
            </div>

            <h2
              className="h-display mb-6"
              style={{ fontSize: "var(--d-2)", color: "var(--ink)" }}
            >
              {site.añosOficio} años de oficio.
              <br />
              <span style={{ color: "var(--blue)" }}>
                Cada obra, supervisada de cerca.
              </span>
            </h2>

            <div
              className="flex flex-col gap-5 text-t4 leading-relaxed"
              style={{ color: "var(--ink-muted)" }}
            >
              <p>
                {site.legalName} es una empresa madrileña de trabajos verticales
                y rehabilitación de edificios. Antes de crearla, su gerente pasó{" "}
                {site.añosAutonomo} años como autónomo en rehabilitación y
                trabajos en altura.
              </p>
              <p>
                De ahí sale el método: cada obra tiene un responsable técnico
                que la conoce desde la visita hasta la entrega, y un solo
                interlocutor para el cliente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
