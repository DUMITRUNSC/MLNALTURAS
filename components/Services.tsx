"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { fotos } from "@/lib/fotos";
import { servicios } from "@/lib/servicios";
import { whatsappUrl } from "@/lib/site";

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
      className="py-16 lg:py-32"
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
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 lg:mb-20"
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
            Desde una filtración puntual hasta la rehabilitación de una fachada.
            Trabajamos por cuerda cuando permite intervenir con menos medios y
            menos molestias.
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_400px] lg:gap-16">
          {/* Índice */}
          <ol>
            {servicios.map((s, i) => {
              const esta = i === activo;
              return (
                <li key={s.num}>
                  {/* Fila de índice, no enlace: antes las seis llevaban al
                      formulario y prometían un detalle que no había. Cuando
                      existan las páginas de servicio, cada fila enlazará a la
                      suya. Con teclado, los marcadores de la foto hacen lo
                      mismo que pasar el ratón.

                      El resaltado en azul solo existe de lg en adelante,
                      porque solo allí sirve para algo: mueve el marcador de la
                      foto. En un móvil no hay ratón, así que el 01 se quedaba
                      azul para siempre y parecía elegido a propósito. */}
                  {/* biome-ignore lint/a11y/noStaticElementInteractions: el resaltado al pasar el ratón es un atajo visual; el camino accesible son los marcadores, que son <button> */}
                  <div
                    onMouseEnter={() => setActivo(i)}
                    data-activo={esta ? "" : undefined}
                    className={`group grid grid-cols-[34px_minmax(0,1fr)_auto] lg:grid-cols-[56px_1fr_auto] items-start lg:items-center gap-x-4 sm:gap-x-6 gap-y-2 lg:gap-y-3 py-5 lg:py-8 border-t border-[var(--line)] lg:data-activo:border-[var(--blue)] transicion-color duration-300 ${
                      i === servicios.length - 1
                        ? "border-b border-b-[var(--line)]"
                        : ""
                    }`}
                  >
                    <span className="tecnico text-t1 font-semibold col-start-1 row-start-1 lg:row-span-2 self-start lg:self-center pt-1 lg:pt-0 text-[var(--ink-faint)] lg:group-data-activo:text-[var(--blue)] transicion-color duration-300">
                      {s.num}
                    </span>

                    <span className="min-w-0 col-start-2 row-start-1 transition-transform duration-300 ease-out lg:group-hover:translate-x-[6px]">
                      {/* h3 y no un span: es el nombre del servicio, y es lo que
                          un buscador lee como contenido de la sección. */}
                      <h3 className="text-t5 lg:text-[length:var(--d-1)] font-semibold tracking-[-0.02em] mb-1.5 text-[var(--ink)] lg:group-data-activo:text-[var(--blue)] transicion-color duration-300">
                        {s.titulo}
                      </h3>
                    </span>

                    {/* Miniatura solo en móvil, a la altura del título */}
                    <span
                      className="lg:hidden relative block col-start-3 row-start-1 w-[86px] sm:w-[104px] aspect-[4/3] overflow-hidden self-start"
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

                    {/* La descripción ocupa todo el ancho: encajonada entre el
                        número y la miniatura salían siete líneas por servicio.
                        Legible en reposo, no solo al pasar el ratón. */}
                    <span
                      className="col-start-1 col-span-3 lg:col-start-2 lg:col-span-1 row-start-2 block text-t3 leading-relaxed max-w-[46ch]"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {s.desc}
                    </span>
                  </div>
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
                    </button>
                  );
                })}

                {/* El nombre del servicio activo, en una banda dentro de la
                    foto. Antes colgaba del marcador hacia la izquierda y, en
                    los marcadores de la derecha, se salía de la foto y se
                    montaba encima del índice. */}
                <figcaption
                  className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-3 pt-10 pb-3"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(16,19,26,0) 0%, rgba(16,19,26,0.78) 70%)",
                  }}
                >
                  <span
                    className="eyebrow leading-snug text-balance transicion-color duration-300"
                    style={{ color: "var(--white)" }}
                  >
                    {servicios[activo].titulo}
                  </span>
                  <span
                    className="cota-foto tecnico text-t1 font-semibold uppercase shrink-0"
                    style={{ color: "var(--white)" }}
                  >
                    MLN / 02
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* Una sola banda: lo que no cabe en el índice, dicho en una línea. */}
        <div
          className="mt-10 lg:mt-14 pt-6 border-t flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-8"
          style={{ borderColor: "var(--line)" }}
        >
          <p className="text-t3 font-semibold" style={{ color: "var(--ink)" }}>
            ¿No encuentras tu problema?
          </p>
          <p
            className="tecnico text-t1 uppercase tracking-[0.12em] leading-[1.9] lg:flex-1"
            style={{ color: "var(--ink-muted)" }}
          >
            Humedades · Cristaleras · Placas solares · Antigraffiti ·
            Mantenimiento
          </p>
          <a
            href={whatsappUrl(
              "Hola, os escribo desde la web de MLN. Os mando fotos del problema.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 min-h-11 text-t3 font-semibold"
            style={{ color: "var(--blue)" }}
          >
            Envíanos unas fotos
            <ArrowRight
              size={17}
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-[6px]"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
