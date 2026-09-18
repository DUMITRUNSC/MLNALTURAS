import Image from "next/image";
import { fotos } from "@/lib/fotos";
import { site } from "@/lib/site";

const cifras = [
  {
    value: `${site.añosOficio}`,
    label: "años de oficio en altura",
    sub: site.empresaDesde
      ? `como autónomo y, desde ${site.empresaDesde}, con empresa propia`
      : "en Madrid y alrededores",
  },
  {
    value: "100%",
    label: "del personal con formación de altura",
    sub: "en vigor, y EPI homologado con su revisión al día",
  },
  {
    value: site.responseTime,
    label: "para dar respuesta",
    sub: "visita o presupuesto",
  },
];

/* Clases completas, no construidas: Tailwind solo genera las que ve escritas.
   Y solo desde `sm`: un gridColumn en línea forzaba columnas implícitas
   también en móvil, donde la retícula es de una, y la primera cifra
   quedaba a 0 px de ancho. */
const columna = ["sm:col-start-1", "sm:col-start-2", "sm:col-start-3"];

export default function WhyMLN() {
  return (
    <section
      id="empresa"
      className="py-24 lg:py-32"
      style={{ backgroundColor: "var(--bg-soft)" }}
    >
      <div className="pagina">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
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
              No somos los más baratos.
              <br />
              <span style={{ color: "var(--blue)" }}>
                Somos los que lo dejan bien.
              </span>
            </h2>

            <div
              className="flex flex-col gap-5 text-t4 leading-relaxed mb-10"
              style={{ color: "var(--ink-muted)" }}
            >
              <p>
                {site.legalName} es una empresa madrileña especializada en
                trabajos verticales, rehabilitación de fachadas y construcción
                en altura. El oficio son {site.añosOficio} años entrando donde
                el andamio no llega —fachadas, patios de luces, cubiertas y
                estructuras de difícil acceso en Madrid y su corona
                metropolitana—
                {site.empresaDesde
                  ? `, primero como autónomo y desde ${site.empresaDesde} como empresa propia.`
                  : ", y la empresa es la forma que le hemos dado."}
              </p>
              <p>
                Bajar el precio lo puede hacer cualquiera. Lo difícil es
                diagnosticar bien, ejecutar con seguridad y dejar el edificio
                resuelto, no parcheado. Esa es la única manera de trabajar que
                conocemos.
              </p>
            </div>

            {/* Tres filas en la retícula, no tres bloques: así la cifra, el
                rótulo y el pie comparten línea base entre columnas aunque el
                pie tenga una línea en una y tres en otra. */}
            <dl
              className="grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-[auto_auto_auto] gap-x-8 gap-y-2 pt-8 border-t"
              style={{ borderColor: "var(--line)" }}
            >
              {cifras.map((c, i) => (
                <div key={c.label} className="contents">
                  <dt className="sr-only">{c.label}</dt>
                  <dd
                    className={`h-display leading-none tracking-[-0.04em] sm:row-start-1 mt-6 sm:mt-0 ${columna[i]}`}
                    style={{ fontSize: "var(--n-1)", color: "var(--ink)" }}
                  >
                    {c.value}
                  </dd>
                  <dd
                    className={`text-t3 font-medium sm:row-start-2 ${columna[i]}`}
                    style={{ color: "var(--ink)" }}
                  >
                    {c.label}
                  </dd>
                  <dd
                    className={`text-t2 sm:row-start-3 ${columna[i]}`}
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {c.sub}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
