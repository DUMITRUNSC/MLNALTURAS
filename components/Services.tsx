"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { fotos } from "@/lib/fotos";
import { servicios } from "@/lib/servicios";

/**
 * Dónde está cada servicio en un edificio de verdad.
 *
 * Coordenadas en % sobre la foto del recorrido (lib/fotos.ts → recorrido):
 * la foto se pinta a su proporción natural, nunca recortada con
 * object-fit, para que los marcadores caigan siempre en el mismo sitio.
 * El orden es el de `servicios`.
 */
const marcas: { x: number; y: number }[] = [
  { x: 69, y: 62 }, // 01 fachada: el paño del edificio en primer plano
  { x: 24, y: 32 }, // 02 cubiertas: los tejados del centro
  { x: 26, y: 48 }, // 03 impermeabilización: la azotea del edificio de enfrente
  { x: 43, y: 53 }, // 04 patios y medianeras: el muro lateral
  { x: 33, y: 91 }, // 05 ITE: el edificio entero, señalado en el portal
  { x: 85, y: 9 }, // 06 acceso por cuerda: los técnicos
];

export default function Services() {
  const [activo, setActivo] = useState(0);

  return (
    <section
      id="servicios"
      className="py-28 lg:py-40"
      style={{ backgroundColor: "var(--white)" }}
    >
      <div className="pagina">
        <div className="flex items-center gap-5 mb-10" data-reveal>
          <span
            className="w-10 h-px"
            style={{ backgroundColor: "var(--rule)" }}
          />
          <p className="eyebrow" style={{ color: "var(--ink-muted)" }}>
            Servicios · Por dónde entramos
          </p>
        </div>

        <div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16 lg:mb-20"
          data-reveal
        >
          <h2
            className="h-display"
            style={{ fontSize: "var(--d-3)", color: "var(--ink)" }}
          >
            Qué podemos reparar
            <br />
            en tu edificio.
          </h2>
          <p
            className="text-t4 leading-relaxed max-w-xs lg:text-right"
            style={{ color: "var(--ink-muted)" }}
          >
            Seis servicios, todos por encima de la primera planta. Cada uno
            está señalado en la foto donde ocurre.
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
          {/* Índice */}
          <ol>
            {servicios.map((s, i) => {
              const esta = i === activo;
              return (
                <li key={s.num}>
                  <a
                    href="#contacto"
                    onMouseEnter={() => setActivo(i)}
                    onFocus={() => setActivo(i)}
                    className="group grid grid-cols-[auto_1fr_auto] lg:grid-cols-[56px_1fr_auto] items-center gap-x-4 sm:gap-x-6 gap-y-3 py-7 lg:py-8 border-t transicion-color duration-300"
                    style={{
                      borderColor: esta ? "var(--blue)" : "var(--line)",
                      borderBottom:
                        i === servicios.length - 1
                          ? "1px solid var(--line)"
                          : undefined,
                    }}
                  >
                    <span
                      className="tecnico text-t1 font-semibold self-start lg:self-center pt-1 lg:pt-0 transicion-color duration-300"
                      style={{
                        color: esta ? "var(--blue)" : "var(--ink-faint)",
                      }}
                    >
                      {s.num}
                    </span>

                    <span className="min-w-0 transition-transform duration-300 ease-out lg:group-hover:translate-x-[6px]">
                      {/* h3 y no un span: es el nombre del servicio, y es lo que
                          un buscador lee como contenido de la sección. */}
                      <h3
                        className="font-semibold tracking-[-0.025em] mb-1.5 transicion-color duration-300"
                        style={{
                          fontSize: "var(--d-1)",
                          color: esta ? "var(--blue)" : "var(--ink)",
                        }}
                      >
                        {s.titulo}
                      </h3>
                      {/* Legible en reposo: antes iba al 60 % y solo se leía
                          al pasar el ratón (contraste 2,6:1). */}
                      <span
                        className="block text-t3 leading-relaxed max-w-[46ch]"
                        style={{ color: "var(--ink-muted)" }}
                      >
                        {s.desc}
                      </span>
                    </span>

                    {/* Miniatura solo en móvil */}
                    <span
                      className="lg:hidden relative block w-[86px] sm:w-[104px] aspect-[4/3] overflow-hidden self-start"
                      style={{ backgroundColor: "var(--bg-soft)" }}
                    >
                      <Image
                        src={s.foto.src}
                        alt={s.foto.alt}
                        fill
                        quality={75}
                        sizes="120px"
                        className="object-cover"
                      />
                    </span>

                    <ArrowRight
                      size={20}
                      aria-hidden
                      className="hidden lg:block transition-transform duration-300 ease-out group-hover:translate-x-[8px]"
                      style={{ color: "var(--blue)" }}
                    />
                  </a>
                </li>
              );
            })}
          </ol>

          {/* La foto con los marcadores: solo en escritorio, fija mientras
              se recorre el índice. */}
          <div className="hidden lg:block">
            <div className="sticky top-[112px] flex justify-end">
              <figure
                className="relative m-0"
                style={{
                  aspectRatio: "800 / 2000",
                  height: "calc(100vh - 152px)",
                  maxHeight: 860,
                  backgroundColor: "var(--bg-soft)",
                }}
              >
                <Image
                  src={fotos.recorrido.src}
                  alt={fotos.recorrido.alt}
                  fill
                  quality={85}
                  sizes="360px"
                  className="object-cover"
                />

                {/* Marcadores: un botón por servicio, sobre el sitio del
                    edificio donde se hace. El activo lleva el rótulo a su
                    izquierda, hacia el índice. */}
                {marcas.map((m, i) => {
                  const esta = i === activo;
                  const s = servicios[i];
                  return (
                    <button
                      key={s.num}
                      type="button"
                      onClick={() => setActivo(i)}
                      onMouseEnter={() => setActivo(i)}
                      onFocus={() => setActivo(i)}
                      aria-label={s.titulo}
                      aria-pressed={esta}
                      className="absolute flex items-center justify-center w-7 h-7 -translate-x-1/2 -translate-y-1/2 tecnico text-t1 font-semibold transition-transform duration-300"
                      style={{
                        left: `${m.x}%`,
                        top: `${m.y}%`,
                        transform: `translate(-50%, -50%) scale(${esta ? 1.18 : 1})`,
                        backgroundColor: esta ? "var(--blue)" : "var(--white)",
                        color: esta ? "var(--white)" : "var(--ink)",
                        boxShadow: "0 0 0 2px var(--blue), var(--sombra-media)",
                        zIndex: esta ? 2 : 1,
                      }}
                    >
                      {s.num}
                      {esta && (
                        <span
                          className="absolute right-full mr-3 flex items-center gap-2 whitespace-nowrap"
                          aria-hidden
                        >
                          <span
                            className="eyebrow px-2.5 py-1.5"
                            style={{
                              backgroundColor: "var(--white)",
                              color: "var(--ink)",
                              boxShadow: "var(--sombra-suave)",
                            }}
                          >
                            {s.titulo}
                          </span>
                          <span
                            className="block w-4 h-px"
                            style={{ backgroundColor: "var(--blue)" }}
                          />
                        </span>
                      )}
                    </button>
                  );
                })}

                <figcaption
                  className="absolute left-3 bottom-3 cota-foto tecnico text-t1 font-semibold uppercase"
                  style={{ color: "var(--white)" }}
                >
                  MLN / 02
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        <p
          className="mt-12 text-t3 leading-relaxed max-w-[72ch]"
          style={{ color: "var(--ink-muted)" }}
        >
          También: humedades por fachada, limpieza técnica de cristaleras y
          placas solares, antigraffiti y mantenimiento preventivo por contrato.{" "}
          <a
            href="#contacto"
            className="font-semibold"
            style={{ color: "var(--blue)" }}
          >
            Cuéntanos qué ocurre →
          </a>
        </p>
      </div>
    </section>
  );
}
