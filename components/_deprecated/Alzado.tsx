"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ *
 * ALZADO TÉCNICO CON DESCENSO
 *
 * Un cliente que pide presupuesto no sabe qué es un «trabajo vertical»
 * hasta que ve por dónde se entra. Aquí el edificio está dibujado en
 * sección —no es una foto ni un icono— y la página se convierte en el
 * descenso: al bajar, el técnico baja por la cuerda, una guía marca a
 * qué altura va y la parte del edificio por la que pasa se señala sola.
 *
 * Cómo está hecho, y por qué así:
 *
 *  · El avance del scroll NO vive en el estado de React. Se escribe en
 *    una variable CSS (--p) directamente sobre el nodo, dentro de un
 *    requestAnimationFrame. Meterlo en el estado repintaría el SVG
 *    entero sesenta veces por segundo.
 *  · En el estado solo entran la zona señalada y el rótulo de planta,
 *    que cambian ocho o nueve veces en todo el recorrido.
 *  · La altura de la pista solo se añade cuando el JavaScript ha
 *    arrancado. Sin JS no hay dos pantallas de scroll con un dibujo
 *    quieto: la sección mide lo que mide su contenido.
 *  · Con «menos movimiento» activado no se engancha nada: el dibujo se
 *    queda quieto y se recorre con el ratón o el tabulador, como antes.
 *
 * El dibujo es decorativo para un lector de pantalla (aria-hidden): lo
 * que dice está en la lista de botones, que funciona con teclado.
 * ------------------------------------------------------------------ */

type Zona = {
  id: string;
  num: string;
  titulo: string;
  desc: string;
  /** Tramo del descenso en el que esta zona queda señalada. */
  desde: number;
  hasta: number;
};

const zonas: Zona[] = [
  {
    id: "azotea",
    num: "03",
    titulo: "Azotea y terraza",
    desc: "Donde empieza el descenso y donde empieza casi toda la filtración: la lámina, los sumideros y las juntas de dilatación.",
    desde: 0,
    hasta: 0.09,
  },
  {
    id: "cubierta",
    num: "02",
    titulo: "Cubierta y tejado",
    desc: "Teja, cumbrera, canalón y remates. Se llega desde la propia cubierta, sin plataforma y sin tocar la calle.",
    desde: 0.09,
    hasta: 0.2,
  },
  {
    id: "fachada",
    num: "01",
    titulo: "Paño de fachada",
    desc: "Saneado, sellado de juntas, mortero y pintura. Metro a metro, planta por planta, descolgados.",
    desde: 0.2,
    hasta: 0.52,
  },
  {
    id: "patio",
    num: "04",
    titulo: "Patio de luces",
    desc: "El punto ciego del edificio: no entra andamio ni plataforma y solo se llega desde arriba.",
    desde: 0.52,
    hasta: 0.7,
  },
  {
    id: "medianera",
    num: "04",
    titulo: "Medianera",
    desc: "El muro que nadie mira hasta que se mete el agua por él. Sin pedir acceso a la finca de al lado.",
    desde: 0.7,
    hasta: 0.86,
  },
  {
    id: "cuerda",
    num: "06",
    titulo: "Acceso por cuerda",
    desc: "Doble línea, anclajes revisados y personal con formación de altura. Lo que hace que todo lo anterior no necesite andamio.",
    desde: 0.86,
    hasta: 1.01,
  },
];

/* Rótulo de la altura por la que va pasando. */
const alturas: [number, string][] = [
  [0, "AZOTEA"],
  [0.1, "CUBIERTA"],
  [0.2, "P5"],
  [0.32, "P4"],
  [0.48, "P3"],
  [0.64, "P2"],
  [0.8, "P1"],
  [0.94, "BAJO"],
];

export default function Alzado() {
  const pista = useRef<HTMLDivElement>(null);
  const zonaScroll = useRef<string | null>(null);

  const [enPista, setEnPista] = useState(false);
  const [porScroll, setPorScroll] = useState<string | null>(null);
  const [altura, setAltura] = useState("AZOTEA");

  /* `sobre` es el paso del ratón o del tabulador y se va solo; `fijada` es
     un clic y se queda. Manda lo fijado, luego lo señalado a mano y, si no
     hay nada de eso, lo que diga el descenso. */
  const [sobre, setSobre] = useState<string | null>(null);
  const [fijada, setFijada] = useState<string | null>(null);
  const activa = fijada ?? sobre ?? porScroll;

  useEffect(() => {
    const menosMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (menosMovimiento) return;

    setEnPista(true);
    let pendiente = 0;

    const medir = () => {
      pendiente = 0;
      const el = pista.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const recorrido = r.height - window.innerHeight;
      const bruto = recorrido > 0 ? -r.top / recorrido : 0;
      const p = Math.min(1, Math.max(0, bruto));

      el.style.setProperty("--p", p.toFixed(4));

      const zona = zonas.find((z) => p >= z.desde && p < z.hasta);
      if (zona && zona.id !== zonaScroll.current) {
        zonaScroll.current = zona.id;
        setPorScroll(zona.id);
      }
      const rotulo = [...alturas].reverse().find(([desde]) => p >= desde);
      if (rotulo) setAltura(rotulo[1]);
    };

    const alScroll = () => {
      if (pendiente) return;
      pendiente = requestAnimationFrame(medir);
    };

    medir();
    window.addEventListener("scroll", alScroll, { passive: true });
    window.addEventListener("resize", alScroll);
    return () => {
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("resize", alScroll);
      if (pendiente) cancelAnimationFrame(pendiente);
    };
  }, []);

  const encendida = (id: string) =>
    activa === null || activa === id ? 1 : 0.34;
  const viva = (id: string) => activa === id;

  return (
    /* Sin overflow-hidden: un ancestro con overflow recortado convierte al
       sticky en un elemento normal y el dibujo se va de la pantalla. */
    <section id="alzado" style={{ backgroundColor: "var(--white)" }}>
      <div className="pagina pt-24 lg:pt-32">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-20 mb-12 lg:mb-16">
          <div data-reveal>
            <div className="flex items-center gap-5 mb-8">
              <span
                className="w-10 h-px"
                style={{ backgroundColor: "var(--rule)" }}
              />
              <p className="eyebrow" style={{ color: "var(--ink-muted)" }}>
                Alzado · Por dónde entramos
              </p>
            </div>
            <h2
              className="h-display"
              style={{ fontSize: "var(--d-2)", color: "var(--ink)" }}
            >
              Todo esto se toca
              <br />
              desde la misma cuerda.
            </h2>
          </div>
          <p
            className="text-t4 leading-[1.62] max-w-[52ch] lg:self-end"
            style={{ color: "var(--ink-muted)" }}
          >
            Un edificio de Madrid, en sección. Sigue bajando y el técnico baja
            contigo: cada parte se señala cuando pasa por delante. También
            puedes ir a una directamente, con el ratón o con el tabulador.
          </p>
        </div>
      </div>

      {/* ---------------- la pista del descenso ---------------- */}
      <div
        ref={pista}
        data-pista={enPista ? "si" : undefined}
        className="pista-descenso relative"
      >
        <div className="lg:sticky lg:top-[104px] pagina pb-24 lg:pb-32">
          <div className="grid lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] gap-8 lg:gap-16 items-start">
            {/* el dibujo */}
            {/* Dos capas: la de fuera se pega (en móvil), la de dentro es la
                caja del dibujo y ancla el rótulo de altura. */}
            <div className="sticky top-[72px] z-10 lg:static">
              <div
                className="relative w-full border"
                style={{
                  borderColor: "var(--rule)",
                  backgroundColor: "var(--bg-soft)",
                }}
              >
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: el dibujo es decorativo a propósito; lo que dice está en la lista de botones de al lado, que sí se lee y se recorre con teclado */}
                <svg
                  viewBox="0 26 700 800"
                  className="block w-full h-auto alzado"
                  aria-hidden
                >
                  <defs>
                    <pattern
                      id="rayado"
                      width="8"
                      height="8"
                      patternTransform="rotate(45)"
                      patternUnits="userSpaceOnUse"
                    >
                      <line
                        className="alzado-trama"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="8"
                      />
                    </pattern>
                    <pattern
                      id="reticula"
                      width="60"
                      height="60"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 60 0 L 0 0 0 60"
                        fill="none"
                        className="alzado-reticula"
                      />
                    </pattern>
                  </defs>

                  <rect
                    x="0"
                    y="0"
                    width="700"
                    height="900"
                    fill="url(#reticula)"
                  />

                  {/* medianera */}
                  <g
                    style={{ opacity: encendida("medianera") }}
                    className="alzado-grupo"
                  >
                    <path
                      d="M 440 150 L 528 192 L 528 800 L 440 800 Z"
                      style={{ fill: "url(#rayado)" }}
                      className={
                        viva("medianera")
                          ? "alzado-medianera viva"
                          : "alzado-medianera"
                      }
                    />
                  </g>

                  {/* patio de luces */}
                  <g
                    style={{ opacity: encendida("patio") }}
                    className="alzado-grupo"
                  >
                    <path
                      d="M 40 200 L 120 200 L 120 800 L 40 800 Z"
                      className={
                        viva("patio") ? "alzado-hueco viva" : "alzado-hueco"
                      }
                    />
                    {[0, 1, 2, 3, 4].map((i) => (
                      <rect
                        key={`pv${i}`}
                        x="62"
                        y={252 + i * 108}
                        width="36"
                        height="46"
                        className="alzado-vano"
                      />
                    ))}
                  </g>

                  {/* cubierta */}
                  <g
                    style={{ opacity: encendida("cubierta") }}
                    className="alzado-grupo"
                  >
                    <path
                      d="M 120 150 L 190 88 L 370 88 L 440 150 Z"
                      className={
                        viva("cubierta") ? "alzado-cara viva" : "alzado-cara"
                      }
                    />
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <line
                        key={`te${i}`}
                        x1={150 + i * 52}
                        y1="150"
                        x2={196 + i * 40}
                        y2="88"
                        className="alzado-filete-fino"
                      />
                    ))}
                    <rect
                      x="330"
                      y="46"
                      width="34"
                      height="42"
                      className="alzado-cara"
                    />
                  </g>

                  {/* azotea */}
                  <g
                    style={{ opacity: encendida("azotea") }}
                    className="alzado-grupo"
                  >
                    <rect
                      x="190"
                      y="74"
                      width="180"
                      height="14"
                      className={
                        viva("azotea") ? "alzado-cara viva" : "alzado-cara"
                      }
                    />
                    <line
                      x1="190"
                      y1="74"
                      x2="370"
                      y2="74"
                      className="alzado-filete"
                    />
                  </g>

                  {/* paño de fachada */}
                  <g
                    style={{ opacity: encendida("fachada") }}
                    className="alzado-grupo"
                  >
                    <rect
                      x="120"
                      y="150"
                      width="320"
                      height="650"
                      className={
                        viva("fachada") ? "alzado-cara viva" : "alzado-cara"
                      }
                    />
                    <rect
                      x="112"
                      y="150"
                      width="336"
                      height="18"
                      className="alzado-cara"
                    />
                    {[1, 2, 3, 4, 5].map((i) => (
                      <line
                        key={`fo${i}`}
                        x1="120"
                        y1={168 + i * 108}
                        x2="440"
                        y2={168 + i * 108}
                        className="alzado-filete-fino"
                      />
                    ))}
                    {[0, 1, 2, 3, 4, 5].map((nivel) =>
                      [0, 1, 2].map((hueco) => (
                        <g key={`h${nivel}-${hueco}`}>
                          <rect
                            x={152 + hueco * 102}
                            y={196 + nivel * 108}
                            width="58"
                            height={nivel === 5 ? 74 : 62}
                            className="alzado-vano"
                          />
                          {nivel > 0 && nivel < 5 && (
                            <line
                              x1={144 + hueco * 102}
                              y1={272 + nivel * 108}
                              x2={218 + hueco * 102}
                              y2={272 + nivel * 108}
                              className="alzado-filete"
                            />
                          )}
                        </g>
                      )),
                    )}
                    <rect
                      x="254"
                      y="712"
                      width="72"
                      height="88"
                      className="alzado-vano"
                    />
                    <path
                      d="M 232 296 l -13 44 l 11 26 l -15 50 l 9 32"
                      className={
                        viva("fachada") ? "alzado-grieta viva" : "alzado-grieta"
                      }
                    />
                  </g>

                  {/* cuerda y anclaje: se atenúan como el resto */}
                  <g
                    style={{ opacity: encendida("cuerda") }}
                    className="alzado-grupo"
                  >
                    <line
                      x1="334"
                      y1="88"
                      x2="334"
                      y2="800"
                      className={
                        viva("cuerda") ? "alzado-cuerda viva" : "alzado-cuerda"
                      }
                    />
                    <rect
                      x="326"
                      y="78"
                      width="16"
                      height="12"
                      className="alzado-anclaje"
                    />
                  </g>

                  {/* El técnico va fuera de cualquier grupo que se atenúe: es
                    quien marca dónde estás y tiene que verse siempre nítido. */}
                  <g
                    className={
                      viva("cuerda")
                        ? "alzado-operario viva"
                        : "alzado-operario"
                    }
                  >
                    {/* guía de cota: acompaña al técnico hasta el carril */}
                    <line
                      className="alzado-guia"
                      x1="356"
                      y1="434"
                      x2="578"
                      y2="434"
                    />
                    <rect
                      className="alzado-descensor"
                      x="327"
                      y="398"
                      width="14"
                      height="12"
                    />
                    <line x1="334" y1="410" x2="306" y2="434" />
                    <line x1="334" y1="410" x2="352" y2="434" />
                    <line
                      className="alzado-banqueta"
                      x1="302"
                      y1="434"
                      x2="354"
                      y2="434"
                    />
                    <circle cx="312" cy="396" r="11" />
                    <line x1="312" y1="407" x2="318" y2="430" />
                    <line x1="318" y1="430" x2="290" y2="433" />
                    <line x1="290" y1="433" x2="288" y2="456" />
                    <line x1="312" y1="414" x2="286" y2="404" />
                  </g>

                  {/* carril de cotas */}
                  <g className="alzado-cota">
                    <line x1="588" y1="78" x2="588" y2="800" />
                    {[
                      ["AZOTEA", 81],
                      ["P5", 222],
                      ["P4", 330],
                      ["P3", 438],
                      ["P2", 546],
                      ["P1", 654],
                      ["BAJO", 762],
                    ].map(([texto, y]) => (
                      <g key={texto as string}>
                        <line
                          x1="582"
                          y1={y as number}
                          x2="594"
                          y2={y as number}
                        />
                        <text
                          x="604"
                          y={(y as number) + 4}
                          className="alzado-texto"
                        >
                          {texto as string}
                        </text>
                      </g>
                    ))}
                  </g>

                  {/* suelo y rótulo del plano */}
                  <line
                    x1="0"
                    y1="800"
                    x2="700"
                    y2="800"
                    className="alzado-suelo"
                  />
                  <text x="14" y="820" className="alzado-texto">
                    MLN / ALZADO TIPO · MADRID
                  </text>
                </svg>

                {/* a qué altura va, en números */}
                {enPista && (
                  <p
                    className="absolute top-3 right-4 tecnico text-t1 font-semibold"
                    style={{ color: "var(--blue)" }}
                    aria-hidden
                  >
                    {altura}
                  </p>
                )}
              </div>
            </div>

            {/* la lista */}
            <ol className="flex flex-col">
              {zonas.map((z) => {
                const abierta = activa === z.id;
                return (
                  <li key={z.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setSobre(z.id)}
                      onMouseLeave={() => setSobre(null)}
                      onFocus={() => setSobre(z.id)}
                      onBlur={() => setSobre(null)}
                      onClick={() => setFijada(fijada === z.id ? null : z.id)}
                      aria-pressed={fijada === z.id}
                      className="group w-full grid grid-cols-[38px_minmax(0,1fr)] gap-x-4 py-4 lg:py-5 text-left border-t transicion-color duration-200"
                      style={{
                        borderColor: abierta ? "var(--blue)" : "var(--line)",
                      }}
                    >
                      <span
                        className="tecnico text-t1 font-semibold pt-1"
                        style={{
                          color: abierta ? "var(--blue)" : "var(--ink-faint)",
                        }}
                      >
                        {z.num}
                      </span>
                      <span className="min-w-0">
                        <span
                          className="block text-t5 font-semibold tracking-[-0.02em] mb-1"
                          style={{
                            color: abierta ? "var(--blue)" : "var(--ink)",
                          }}
                        >
                          {z.titulo}
                        </span>
                        <span
                          className="block text-t3 leading-[1.6] max-w-[52ch]"
                          style={{ color: "var(--ink-muted)" }}
                        >
                          {z.desc}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
              <li
                className="pt-5 border-t text-t2"
                style={{
                  borderColor: "var(--line)",
                  color: "var(--ink-faint)",
                }}
              >
                Alzado tipo de edificio residencial en Madrid. El tuyo tendrá lo
                suyo: por eso subimos a verlo antes de dar precio.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
