import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { BotonEnlace } from "@/components/Boton";
import { fotos } from "@/lib/fotos";

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
      <div className="absolute inset-x-0 bottom-0 h-[232px] sm:h-[290px] lg:inset-0 lg:h-auto">
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
        <div className="flex flex-col justify-center min-h-[620px] sm:min-h-[700px] lg:min-h-[840px] pt-28 sm:pt-32 pb-[244px] sm:pb-[310px] lg:py-36 lg:max-w-[56%] xl:max-w-[52%]">
          <div className="flex items-center gap-5 mb-9">
            <span
              className="w-12 h-px"
              style={{ backgroundColor: "var(--rule)" }}
            />
            <p className="eyebrow" style={{ color: "var(--ink-muted)" }}>
              Trabajos verticales · Madrid
            </p>
          </div>

          {/* El claim manda, pero el h1 tiene que llevar también la palabra que
              alguien escribe en Google: la tercera línea, más pequeña, va
              dentro del mismo h1 para que cuente como encabezado. */}
          <h1 className="mb-8">
            <span
              className="h-display block"
              style={{ fontSize: "var(--d-4)", color: "var(--ink)" }}
            >
              El edificio no se arregla desde el suelo.
              <br />
              <span style={{ color: "var(--blue)" }}>Bajamos nosotros.</span>
            </span>
            <span
              className="flex items-baseline gap-3 mt-6 text-t5 font-semibold tracking-[-0.01em]"
              style={{ color: "var(--ink-soft)" }}
            >
              <span
                className="w-6 h-px shrink-0 translate-y-[-0.35em]"
                style={{ backgroundColor: "var(--blue)" }}
                aria-hidden
              />
              Trabajos verticales en Madrid: fachadas, cubiertas e ITE.
            </span>
          </h1>

          <p
            className="text-t4 lg:text-t5 leading-[1.62] max-w-[33rem] mb-11"
            style={{ color: "var(--ink-soft)" }}
          >
            Rehabilitación de fachadas, cubiertas e impermeabilización por
            cuerda. Sin andamio, sin ocupar la calle y sin cortar el portal.
            Madrid y alrededores.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <BotonEnlace href="#contacto">
              Visita técnica gratuita
              <ArrowRight size={17} aria-hidden />
            </BotonEnlace>
            {/* Antes decía «Soy arquitecto o ingeniero»: describía a la
                persona en vez de decirle qué pasa al pulsar. Ahora lleva al
                formulario con el perfil ya elegido. */}
            <BotonEnlace
              href="/?perfil=arquitecto#contacto"
              variante="texto"
              className="group sm:justify-start"
            >
              Mandar las especificaciones
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
            <p
              className="tecnico text-t1 pb-1"
              style={{ color: "var(--ink-faint)" }}
            >
              40.4168° N — 3.7038° W
            </p>
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
