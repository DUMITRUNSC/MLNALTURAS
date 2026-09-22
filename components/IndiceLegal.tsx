"use client";

import { useEffect, useState } from "react";

type Entrada = { id: string; num: string; texto: string };

const slug = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Índice lateral de un documento legal. Lee los h2 de .legal-prosa al montar
 * (así los textos legales no se tocan), les pone ancla y marca en azul el
 * apartado que se está leyendo.
 */
export default function IndiceLegal() {
  const [entradas, setEntradas] = useState<Entrada[]>([]);
  const [activo, setActivo] = useState<string>("");

  useEffect(() => {
    const titulos = Array.from(
      document.querySelectorAll<HTMLHeadingElement>(".legal-prosa h2"),
    );
    const lista = titulos.map((h) => {
      const bruto = h.textContent?.trim() ?? "";
      const m = bruto.match(/^(\d+)\.\s*(.*)$/);
      const texto = m ? m[2] : bruto;
      const num = m ? m[1].padStart(2, "0") : "";
      if (!h.id) h.id = slug(texto);
      return { id: h.id, num, texto };
    });
    setEntradas(lista);

    const obs = new IntersectionObserver(
      (es) => {
        for (const e of es) if (e.isIntersecting) setActivo(e.target.id);
      },
      { rootMargin: "-15% 0px -75% 0px", threshold: 0 },
    );
    for (const h of titulos) obs.observe(h);
    return () => obs.disconnect();
  }, []);

  if (entradas.length === 0) return null;

  return (
    <nav aria-label="Contenido del documento">
      <p className="eyebrow mb-4" style={{ color: "var(--ink-faint)" }}>
        Contenido
      </p>
      <ol className="flex flex-col">
        {entradas.map((e) => {
          const esta = e.id === activo;
          return (
            <li key={e.id}>
              <a
                href={`#${e.id}`}
                className="grid grid-cols-[26px_minmax(0,1fr)] gap-x-2 py-1.5 text-t2 leading-snug border-l pl-3 -ml-px transicion-color duration-150 hover:text-[var(--blue)]"
                style={{
                  borderColor: esta ? "var(--blue-fill)" : "transparent",
                  color: esta ? "var(--ink)" : "var(--ink-muted)",
                  fontWeight: esta ? 600 : 400,
                }}
              >
                <span
                  className="tecnico text-t1 pt-[2px]"
                  style={{ color: esta ? "var(--blue)" : "var(--ink-faint)" }}
                >
                  {e.num}
                </span>
                <span>{e.texto}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
