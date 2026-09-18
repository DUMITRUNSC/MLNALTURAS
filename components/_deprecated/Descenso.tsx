"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const niveles = [
  {
    cota: "+20",
    titulo: "Cubierta y azotea",
    texto:
      "Casi todas las humedades que aparecen en el último piso empiezan aquí arriba: láminas cansadas, sumideros atascados, juntas de dilatación abiertas. Se ve en media hora si se sabe dónde mirar.",
  },
  {
    cota: "+14",
    titulo: "Fachada",
    texto:
      "Grietas, ladrillo suelto, morteros que se van, cajas de persiana que filtran. Se repara metro a metro, descolgados, sin ocupar la calle ni cortar la entrada del portal.",
  },
  {
    cota: "+6",
    titulo: "Patio de luces",
    texto:
      "El punto ciego del edificio: no se ve desde la calle y ahí no entra una plataforma ni un andamio. O se trabaja por cuerda, o no se trabaja.",
  },
  {
    cota: "0",
    titulo: "Portal y zócalo",
    texto:
      "Lo primero que ve quien entra y lo último que se arregla. Al terminar dejamos la zona limpia: en una comunidad, eso se nota tanto como la obra.",
  },
];

/**
 * Recorrido del edificio. Va dentro de FacadeScroll: aquí solo se marca la cota
 * en la que está la fachada de al lado.
 */
export default function Descenso() {
  const seccion = useRef<HTMLElement>(null);
  const linea = useRef<HTMLDivElement>(null);
  const [nivel, setNivel] = useState(0);
  const [estatico, setEstatico] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEstatico(true);
      return;
    }

    let raf = 0;
    const pintar = () => {
      raf = 0;
      const el = seccion.current;
      if (!el) return;
      const recorrido = el.offsetHeight - window.innerHeight;
      if (recorrido <= 0) return;

      const p = Math.min(
        Math.max(-el.getBoundingClientRect().top / recorrido, 0),
        1,
      );
      if (linea.current) linea.current.style.height = `${(p * 100).toFixed(2)}%`;

      const siguiente = Math.min(
        niveles.length - 1,
        Math.floor(p * niveles.length + 0.15),
      );
      setNivel((prev) => (prev === siguiente ? prev : siguiente));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(pintar);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="edificio"
      ref={seccion}
      className="relative"
      style={{ height: estatico ? "auto" : "300vh" }}
      aria-label="Recorrido por el edificio, de la cubierta al portal"
    >
      <div
        className={
          estatico
            ? "relative py-20"
            : "sticky top-0 h-screen flex items-start lg:items-center pt-28 lg:pt-0"
        }
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="lg:max-w-[46%]">
            <div className="flex items-center gap-4 mb-5 lg:mb-8">
              <span className="w-10 h-px" style={{ backgroundColor: "var(--ink-faint)" }} />
              <p className="eyebrow" style={{ color: "var(--ink-muted)" }}>
                El recorrido
              </p>
            </div>

            <h2
              className="h-display mb-7 lg:mb-11 max-w-[19ch]"
              style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)", color: "var(--ink)" }}
            >
              Un edificio se revisa de arriba abajo.
            </h2>

            <div className="relative">
              <div
                className="hidden lg:block absolute left-[6px] top-1 bottom-1 w-px"
                style={{ backgroundColor: "var(--line)" }}
                aria-hidden
              />
              <div
                ref={linea}
                className="hidden lg:block absolute left-[6px] top-1 w-px"
                style={{ backgroundColor: "var(--blue)", height: "0%" }}
                aria-hidden
              />

              <ol className="flex flex-col gap-6 lg:gap-7 min-h-[200px] lg:min-h-0">
                {niveles.map((n, i) => {
                  const activo = estatico || i === nivel;
                  return (
                    <li
                      key={n.titulo}
                      className={`lg:grid lg:grid-cols-[13px_1fr] lg:gap-6 transition-opacity duration-500 ${
                        i === nivel ? "" : "hidden lg:grid"
                      }`}
                      style={{ opacity: activo ? 1 : 0.38 }}
                    >
                      <span className="hidden lg:flex items-start pt-[7px]" aria-hidden>
                        <span
                          className="w-[13px] h-[13px] rounded-full border-2 transition-all duration-300"
                          style={{
                            borderColor: activo ? "var(--blue)" : "var(--ink-faint)",
                            backgroundColor: activo ? "var(--blue)" : "var(--white)",
                            boxShadow: activo ? "0 0 0 5px rgba(11,92,246,0.12)" : "none",
                          }}
                        />
                      </span>

                      <div>
                        <div className="flex items-baseline gap-3 mb-2">
                          <span
                            className="text-[11px] font-medium tracking-[0.2em] uppercase tabular-nums"
                            style={{ color: "var(--blue)" }}
                          >
                            Cota {n.cota}
                          </span>
                          <h3
                            className="text-[19px] lg:text-[20px] font-semibold tracking-[-0.02em]"
                            style={{ color: "var(--ink)" }}
                          >
                            {n.titulo}
                          </h3>
                        </div>
                        <p
                          className="text-[15px] lg:text-[15.5px] leading-[1.65] max-w-[54ch]"
                          style={{ color: "var(--ink-muted)" }}
                        >
                          {n.texto}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            <div className="flex lg:hidden items-center gap-2 mt-7" aria-hidden>
              {niveles.map((n, i) => (
                <span
                  key={n.titulo}
                  className="h-[3px] rounded-full transition-all duration-300"
                  style={{
                    width: i === nivel ? 28 : 12,
                    backgroundColor: i === nivel ? "var(--blue)" : "var(--line)",
                  }}
                />
              ))}
            </div>

            <a
              href="#contacto"
              className="mt-7 lg:mt-11 inline-flex items-center gap-2 text-[15px] font-semibold w-fit group"
              style={{ color: "var(--ink)" }}
            >
              Que alguien suba a verlo
              <ArrowRight
                size={17}
                style={{ color: "var(--blue)" }}
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
