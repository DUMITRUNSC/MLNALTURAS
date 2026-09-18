import { ArrowLeft } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Rastro de vuelta en las páginas de dentro: la portada siempre a un clic,
 * sin depender de que la persona reconozca el logo como botón.
 */
export default function Miga({ aqui, ruta }: { aqui: string; ruta?: string }) {
  const migaLd = ruta
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: site.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: aqui,
            item: `${site.url}${ruta}`,
          },
        ],
      }
    : null;

  return (
    <>
      <nav className="flex items-center gap-4 mb-8" aria-label="Dónde estás">
        <a
          href="/"
          className="group inline-flex items-center gap-2 min-h-11 py-2 eyebrow transicion-color duration-150 hover:text-[var(--blue)]"
          style={{ color: "var(--ink-soft)" }}
        >
          <ArrowLeft
            size={14}
            aria-hidden
            className="transition-transform duration-200 group-hover:-translate-x-[3px]"
            style={{ color: "var(--blue)" }}
          />
          Inicio
        </a>
        <span
          className="w-6 h-px"
          style={{ backgroundColor: "var(--rule)" }}
          aria-hidden
        />
        <span
          className="eyebrow"
          style={{ color: "var(--ink-muted)" }}
          aria-current="page"
        >
          {aqui}
        </span>
      </nav>
      {migaLd && (
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: datos estructurados estáticos
          dangerouslySetInnerHTML={{ __html: JSON.stringify(migaLd) }}
        />
      )}
    </>
  );
}
