import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
/** Página legal: misma retícula y tipografía que el resto de la web. */
import Miga from "@/components/Miga";
import { legal } from "@/lib/legal";

export default function LegalLayout({
  marcador,
  titulo,
  entradilla,
  ruta,
  children,
}: {
  marcador: string;
  titulo: string;
  entradilla: string;
  /** Para el BreadcrumbList; sin ella la miga sale solo como navegación. */
  ruta?: string;
  children: ReactNode;
}) {
  return (
    <main id="contenido" style={{ backgroundColor: "var(--white)" }}>
      <div className="pagina">
        <header className="pt-32 lg:pt-40 pb-12 lg:pb-16">
          <Miga aqui={titulo} ruta={ruta} />

          <div className="flex items-center gap-5 mb-10">
            <span
              className="w-10 h-px"
              style={{ backgroundColor: "var(--rule)" }}
            />
            <p className="eyebrow" style={{ color: "var(--ink-muted)" }}>
              {marcador}
            </p>
          </div>

          <h1
            className="h-display mb-7 max-w-[22ch]"
            style={{ fontSize: "var(--d-3)", color: "var(--ink)" }}
          >
            {titulo}
          </h1>

          <p
            className="text-t4 leading-[1.62] max-w-[58ch]"
            style={{ color: "var(--ink-muted)" }}
          >
            {entradilla}
          </p>
        </header>

        <div
          className="grid lg:grid-cols-[200px_minmax(0,1fr)] gap-8 lg:gap-16 py-12 lg:py-16 border-t"
          style={{ borderColor: "var(--line)" }}
        >
          <p
            className="eyebrow lg:sticky lg:top-[120px] h-fit"
            style={{ color: "var(--ink-faint)" }}
          >
            Actualizado
            <br />
            {legal.actualizado}
          </p>

          <div className="legal-prosa max-w-[68ch]">{children}</div>
        </div>

        <div className="py-14 border-t" style={{ borderColor: "var(--line)" }}>
          <a
            href="/"
            className="group inline-flex items-center gap-3 text-t3 font-semibold"
            style={{ color: "var(--ink)" }}
          >
            <ArrowLeft
              size={18}
              style={{ color: "var(--blue)" }}
              className="transition-transform duration-300 ease-out group-hover:-translate-x-[6px]"
              aria-hidden
            />
            Volver al inicio
          </a>
        </div>
      </div>
    </main>
  );
}
