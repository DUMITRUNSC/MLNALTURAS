import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { BotonEnlace } from "@/components/Boton";
import { fotos } from "@/lib/fotos";
import { whatsappUrl } from "@/lib/site";

/**
 * Portada.
 * La foto es horizontal (16:9), así que se comporta de dos maneras:
 *  - en escritorio cubre toda la portada y el texto se lee sobre el cielo;
 *  - en móvil y tableta ocupa una banda inferior a sangre, donde la escena
 *    entera (los dos técnicos y Madrid al fondo) se ve sin recortar.
 */
export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: "var(--bg-soft)" }}
    >
      {/* Fachada */}
      <div className="absolute inset-x-0 bottom-0 h-[290px] sm:h-[290px] lg:inset-0 lg:h-auto">
        <Image
          src={fotos.hero.src}
          alt={fotos.hero.alt}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[62%_50%] lg:object-[60%_50%]"
        />
        {/* Velo horizontal en escritorio: el texto se lee sobre el cielo,
            la fachada queda limpia en el lado derecho */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, rgba(var(--velo-rgb),0.9) 0%, rgba(var(--velo-rgb),0.82) 26%, rgba(var(--velo-rgb),0.6) 42%, rgba(var(--velo-rgb),0.24) 56%, rgba(var(--velo-rgb),0.04) 68%, rgba(var(--velo-rgb),0) 78%)",
          }}
        />
        {/* Móvil y tableta: solo un difuminado en el borde superior de la banda */}
        <div
          className="absolute inset-x-0 top-0 h-20 lg:hidden"
          style={{
            background:
              "linear-gradient(180deg, var(--bg-soft) 0%, rgba(var(--velo-rgb),0.55) 45%, rgba(var(--velo-rgb),0) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 pagina">
        <div className="flex flex-col justify-center min-h-[600px] sm:min-h-[700px] lg:min-h-[840px] pt-24 sm:pt-32 pb-[268px] sm:pb-[310px] lg:py-36 lg:max-w-[56%] xl:max-w-[52%]">
          {/* El rótulo va DENTRO del h1: se ve igual, pero el titular que lee
              Google lleva «Trabajos verticales en Madrid». */}
          <h1 className="mb-6 lg:mb-8">
            <span className="flex items-center gap-3 sm:gap-5 mb-7 sm:mb-9">
              <span
                className="w-7 sm:w-12 h-px shrink-0"
                style={{ backgroundColor: "var(--rule)" }}
                aria-hidden
              />
              <span
                className="eyebrow tracking-[0.08em] sm:tracking-[0.14em]"
                style={{ color: "var(--ink-muted)" }}
              >
                Trabajos verticales en Madrid
              </span>
            </span>{" "}
            <span
              className="h-display block text-balance"
              style={{ fontSize: "var(--d-4)", color: "var(--ink)" }}
            >
              Tu edificio tiene un problema.
              <br />
              <span style={{ color: "var(--blue)" }}>
                Nosotros sabemos cómo llegar.
              </span>
            </span>
          </h1>

          <p
            className="text-t4 lg:text-t5 leading-[1.62] max-w-[33rem] mb-8 lg:mb-11"
            style={{ color: "var(--ink-soft)" }}
          >
            Reparamos fachadas, cubiertas y filtraciones mediante trabajos
            verticales. Sin andamio cuando no hace falta.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <BotonEnlace href="#contacto">
              Pedir visita gratuita
              <ArrowRight size={17} aria-hidden />
            </BotonEnlace>
            {/* Antes los dos botones iban a #contacto. Ahora el segundo hace
                exactamente lo que dice: abre WhatsApp. */}
            <BotonEnlace
              href={whatsappUrl(
                "Hola, os escribo desde la web de MLN. Os mando fotos del problema.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              variante="texto"
              className="group sm:justify-start"
            >
              Enviar fotos por WhatsApp
              <ArrowRight
                size={17}
                style={{ color: "var(--blue)" }}
                className="transition-transform duration-200 group-hover:translate-x-[6px]"
                aria-hidden
              />
            </BotonEnlace>
          </div>

          <div className="hidden lg:flex items-end gap-12 mt-24">
            <div className="flex items-start gap-5">
              <span
                className="w-px h-12"
                style={{ backgroundColor: "var(--rule)" }}
              />
              <p
                className="eyebrow leading-[1.9]"
                style={{ color: "var(--ink-faint)" }}
              >
                Madrid
                <br />a otra
                <br />
                altura
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="absolute z-10 bottom-5 right-6">
        <span className="cota-foto tecnico text-t1 font-semibold uppercase">
          MLN / 01
        </span>
      </p>
    </section>
  );
}
