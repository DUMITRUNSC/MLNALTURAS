"use client";

import { useEffect } from "react";

/**
 * Apariciones al hacer scroll. Marca el documento como listo (a partir de ahí
 * el CSS esconde lo que va a aparecer) y va revelando cada elemento
 * [data-reveal] o [data-reveal-mask] cuando entra en pantalla.
 * Sin JavaScript, nada se esconde.
 */
export default function Reveals() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const raiz = document.documentElement;
    raiz.setAttribute("data-reveal-listo", "");
    if (reduce.matches) return;

    const objetivos = document.querySelectorAll<HTMLElement>(
      "[data-reveal], [data-reveal-mask]",
    );

    const observer = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            e.target.classList.add("esta-dentro");
            observer.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    for (const el of objetivos) observer.observe(el);

    // Lo que ya está en pantalla al cargar, se muestra sin esperar
    requestAnimationFrame(() => {
      for (const el of objetivos) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("esta-dentro");
          observer.unobserve(el);
        }
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
