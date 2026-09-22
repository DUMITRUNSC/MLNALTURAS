import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import IndiceLegal from "@/components/IndiceLegal";
import Miga from "@/components/Miga";
import { legal } from "@/lib/legal";

/** Los tres documentos legales, en el orden en que se enlazan. */
const documentos = [
  { titulo: "Aviso legal", corto: "Aviso legal", ruta: "/aviso-legal" },
  {
    titulo: "Política de privacidad",
    corto: "Privacidad",
    ruta: "/privacidad",
  },
  { titulo: "Política de cookies", corto: "Cookies", ruta: "/cookies" },
];

/**
 * Página legal. Misma cabecera que las páginas de dentro, conmutador entre
 * los tres documentos, índice lateral fijo en escritorio y, al final, los
 * otros dos documentos en vez de un «volver» sin más.
 */
export default function LegalLayout({
  titulo,
  entradilla,
  ruta,
  children,
}: {
  /** Se mantiene por compatibilidad; el rótulo sale del orden del documento. */
  marcador?: string;
  titulo: string;
  entradilla: string;
  /** Para el BreadcrumbList; sin ella la miga sale solo como navegación. */
  ruta?: string;
  children: ReactNode;
}) {
  const i = documentos.findIndex((d) => d.ruta === ruta);
  const otros = documentos.filter((d) => d.ruta !== ruta);

  return (
    <main id="contenido" style={{ backgroundColor: "var(--white)" }}>
      <header
        style={{
          background:
            "linear-gradient(180deg, var(--sky-1) 0%, var(--sky-2) 55%, var(--white) 100%)",
        }}
      >
        <div className="pagina pt-32 lg:pt-40 pb-10 lg:pb-14">
          <Miga aqui={titulo} ruta={ruta} />

          <div className="flex items-center gap-5 mb-8">
            <span
              className="w-10 h-px"
              style={{ backgroundColor: "var(--rule)" }}
            />
            <p className="eyebrow" style={{ color: "var(--ink-muted)" }}>
              Documentos legales
              {i >= 0 ? ` · ${String(i + 1).padStart(2, "0")} / 03` : ""}
            </p>
          </div>

          <h1
            className="h-display mb-6 max-w-[22ch]"
            style={{ fontSize: "var(--d-3)", color: "var(--ink)" }}
          >
            {titulo}
          </h1>

          <p
            className="text-t4 lg:text-t5 leading-[1.62] max-w-[60ch]"
            style={{ color: "var(--ink-soft)" }}
          >
            {entradilla}
          </p>

          {/* Conmutador entre documentos: se ve dónde estás y a qué más hay */}
          <nav
            className="flex flex-nowrap gap-x-6 sm:gap-x-7 mt-10 border-b"
            style={{ borderColor: "var(--line)" }}
            aria-label="Documentos legales"
          >
            {documentos.map((d) => {
              const aqui = d.ruta === ruta;
              return (
                <a
                  key={d.ruta}
                  href={d.ruta}
                  aria-current={aqui ? "page" : undefined}
                  className="relative inline-flex items-center min-h-11 whitespace-nowrap text-t3 transicion-color duration-150 hover:text-[var(--blue)]"
                  style={{
                    color: aqui ? "var(--ink)" : "var(--ink-muted)",
                    fontWeight: aqui ? 600 : 400,
                  }}
                >
                  <span className="sm:hidden">{d.corto}</span>
                  <span className="hidden sm:inline">{d.titulo}</span>
                  <span
                    className="absolute left-0 right-0 -bottom-px h-[2px]"
                    style={{
                      backgroundColor: aqui
                        ? "var(--blue-fill)"
                        : "transparent",
                    }}
                    aria-hidden
                  />
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      <div className="pagina">
        <div className="grid lg:grid-cols-[240px_minmax(0,1fr)] gap-8 lg:gap-20 py-10 lg:py-16">
          <aside className="lg:sticky lg:top-[120px] h-fit">
            <p
              className="eyebrow leading-[1.8]"
              style={{ color: "var(--ink-faint)" }}
            >
              Actualizado · {legal.actualizado}
            </p>
            <div className="hidden lg:block mt-8">
              <IndiceLegal />
            </div>
          </aside>

          <div className="legal-prosa max-w-[68ch]">{children}</div>
        </div>

        {/* Cierre: los otros dos documentos y a quién escribir */}
        <div
          className="grid sm:grid-cols-2 border-t"
          style={{ borderColor: "var(--line)" }}
        >
          {otros.map((d, n) => (
            <a
              key={d.ruta}
              href={d.ruta}
              className={`group flex items-center justify-between gap-6 py-8 lg:py-10 border-b sm:border-b-0 ${
                n === 1 ? "sm:border-l sm:pl-10" : "sm:pr-10"
              }`}
              style={{ borderColor: "var(--line)" }}
            >
              <span>
                <span
                  className="eyebrow block mb-2"
                  style={{ color: "var(--ink-faint)" }}
                >
                  Documento legal
                </span>
                <span
                  className="font-semibold tracking-[-0.02em]"
                  style={{ fontSize: "var(--d-1)", color: "var(--ink)" }}
                >
                  {d.titulo}
                </span>
              </span>
              <ArrowRight
                size={22}
                aria-hidden
                style={{ color: "var(--blue)" }}
                className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-[8px]"
              />
            </a>
          ))}
        </div>

        <p
          className="py-8 border-t text-t3"
          style={{ borderColor: "var(--line)", color: "var(--ink-muted)" }}
        >
          ¿Dudas sobre tus datos o sobre esta web? Escríbenos a{" "}
          <a
            href={`mailto:${legal.email}`}
            className="font-semibold"
            style={{ color: "var(--blue)" }}
          >
            {legal.email}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
