import Image from "next/image";

/* ------------------------------------------------------------------ *
 * OBRAS — sección montada y SIN publicar, a propósito.
 *
 * Es la única cosa de esta web que no se puede escribir ni diseñar: hacen
 * falta obras reales con foto. Publicar tres fichas inventadas sería
 * exactamente lo que el aviso legal admite hoy («algunas imágenes son
 * ilustrativas»), y en este oficio la prueba falsa se nota.
 *
 * CÓMO PUBLICARLA, cuando tengas el material:
 *
 *   1. Mete las fotos en `public/` (una de antes y una de después por obra).
 *   2. Rellena las tres fichas de `obras` aquí abajo. Todos los campos son
 *      obligatorios menos `superficie`.
 *   3. En `app/page.tsx`, añade el import y coloca <Obras /> entre
 *      <Zonas /> y <Process />.
 *   4. Añade las fotos a `lib/fotos.ts` si quieres el control de duplicados.
 *
 * Mientras `obras` esté vacío, el componente no pinta nada aunque se monte,
 * así que no hay manera de publicar una sección a medias sin darse cuenta.
 * ------------------------------------------------------------------ */

type Obra = {
  /** «Rehabilitación de fachada · Chamberí, Madrid» */
  titulo: string;
  zona: string;
  problema: string;
  solucion: string;
  plazo: string;
  superficie?: string;
  antes: { src: string; alt: string };
  despues: { src: string; alt: string };
};

const obras: Obra[] = [];

export default function Obras() {
  if (obras.length === 0) return null;

  return (
    <section
      id="obras"
      className="py-24 lg:py-32"
      style={{ backgroundColor: "var(--white)" }}
    >
      <div className="pagina">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-20 mb-14 lg:mb-16">
          <div data-reveal>
            <div className="flex items-center gap-5 mb-8">
              <span
                className="w-10 h-px"
                style={{ backgroundColor: "var(--rule)" }}
              />
              <p className="eyebrow" style={{ color: "var(--ink-muted)" }}>
                Obras
              </p>
            </div>
            <h2
              className="h-display"
              style={{ fontSize: "var(--d-2)", color: "var(--ink)" }}
            >
              {obras.length === 3
                ? "Tres edificios, tres problemas distintos."
                : "Obra nuestra, no foto de catálogo."}
            </h2>
          </div>
          <p
            className="text-t4 leading-[1.62] max-w-[52ch] lg:self-end"
            style={{ color: "var(--ink-muted)" }}
          >
            Cada ficha lleva la zona, lo que había antes de entrar y el plazo
            real. Si quieres ver una de cerca, te decimos dónde está y la miras
            desde la calle.
          </p>
        </div>

        <ol className="flex flex-col">
          {obras.map((o, i) => (
            <li
              key={o.titulo}
              data-reveal
              className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-8 lg:gap-16 py-10 lg:py-14 border-t"
              style={{ borderColor: "var(--line)" }}
            >
              <div className="min-w-0">
                <p
                  className="tecnico text-t1 font-semibold mb-5"
                  style={{ color: "var(--ink-faint)" }}
                >
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(obras.length).padStart(2, "0")}
                  <span className="mx-3" aria-hidden>
                    ·
                  </span>
                  {o.zona}
                </p>
                <h3
                  className="h-display mb-6 text-balance"
                  style={{ fontSize: "var(--d-1)", color: "var(--ink)" }}
                >
                  {o.titulo}
                </h3>

                <dl className="flex flex-col">
                  {[
                    ["El problema", o.problema],
                    ["Qué hicimos", o.solucion],
                    ["Plazo", o.plazo],
                    ...(o.superficie ? [["Superficie", o.superficie]] : []),
                  ].map(([rotulo, valor]) => (
                    <div
                      key={rotulo}
                      className="grid sm:grid-cols-[132px_minmax(0,1fr)] gap-x-5 gap-y-1 py-3 border-t"
                      style={{ borderColor: "var(--line-soft)" }}
                    >
                      <dt
                        className="eyebrow pt-1"
                        style={{ color: "var(--ink-faint)" }}
                      >
                        {rotulo}
                      </dt>
                      <dd
                        className="text-t3 leading-[1.62] max-w-[46ch]"
                        style={{ color: "var(--ink-muted)" }}
                      >
                        {valor}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                {[
                  ["Antes", o.antes],
                  ["Después", o.despues],
                ].map(([rotulo, foto]) => (
                  <figure
                    key={rotulo as string}
                    className="flex flex-col gap-2"
                  >
                    <div
                      className="relative w-full aspect-[3/4] overflow-hidden"
                      style={{ backgroundColor: "var(--line-soft)" }}
                    >
                      <Image
                        src={(foto as Obra["antes"]).src}
                        alt={(foto as Obra["antes"]).alt}
                        fill
                        quality={90}
                        sizes="(max-width: 1024px) 45vw, 26vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption
                      className="eyebrow"
                      style={{ color: "var(--ink-faint)" }}
                    >
                      {rotulo as string}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
