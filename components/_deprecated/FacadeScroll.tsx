"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Relato de la fachada.
 * Envuelve la portada y el recorrido: una sola fotografía de un edificio de
 * Madrid dentro de un marco fijo, que baja mientras se hace scroll. El marco
 * (columna) mantiene la foto casi a tamaño real, así que se ve nítida y se lee
 * el edificio entero. El texto va al lado en escritorio y encima en móvil.
 */
export default function FacadeScroll({ children }: { children: ReactNode }) {
  const story = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const camera = useRef<HTMLDivElement>(null);
  const readout = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = story.current;
    const escenario = stage.current;
    const marco = frame.current;
    const foto = camera.current;
    if (!root || !escenario || !marco || !foto) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let inicio = 0;
    let rango = 1;
    let recorrido = 0;
    let suave = 0;

    const pintar = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, (window.scrollY - inicio) / rango));

      // Suavizado para que el movimiento no vaya a saltos
      suave += (p - suave) * 0.4;
      const q = Math.abs(p - suave) < 0.0008 ? p : suave;

      foto.style.transform = reduce.matches
        ? "none"
        : `translate3d(0, ${-(recorrido * q).toFixed(1)}px, 0)`;

      if (readout.current) {
        readout.current.textContent = reduce.matches
          ? "Vista del edificio"
          : q < 0.08
            ? "En altura"
            : q > 0.93
              ? "A pie de calle"
              : `Planta ${Math.max(1, Math.ceil((1 - q) * 6))}`;
      }

      if (!reduce.matches && q !== p) raf = requestAnimationFrame(pintar);
    };

    const encolar = () => {
      if (!raf) raf = requestAnimationFrame(pintar);
    };

    const medir = () => {
      inicio = root.getBoundingClientRect().top + window.scrollY;
      rango = Math.max(1, root.offsetHeight - escenario.offsetHeight);
      // Lo que puede bajar la foto dentro del marco
      recorrido = Math.max(0, foto.offsetHeight - marco.offsetHeight);
      suave = 0;
      encolar();
    };

    const observer = new ResizeObserver(medir);
    observer.observe(root);
    observer.observe(marco);
    observer.observe(foto);

    window.addEventListener("scroll", encolar, { passive: true });
    window.addEventListener("resize", medir);
    reduce.addEventListener("change", medir);
    medir();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", encolar);
      window.removeEventListener("resize", medir);
      reduce.removeEventListener("change", medir);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      className="facade-story"
      ref={story}
      aria-label="Madrid, un recorrido por la fachada"
    >
      <div className="facade-stage" ref={stage} aria-hidden="true">
        <div className="facade-frame" ref={frame}>
          <div className="facade-camera" ref={camera}>
            <Image
              src="/madrid-facade-continuous.jpg"
              alt=""
              fill
              sizes="(max-width: 1023px) 92vw, min(44vw, 660px)"
              quality={90}
              loading="eager"
              className="facade-photo"
            />
          </div>
          <div className="facade-veil" />
          <div className="facade-position">
            <span ref={readout}>En altura</span>
          </div>
        </div>
      </div>

      <div className="facade-content">{children}</div>
    </section>
  );
}
