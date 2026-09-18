import { site, whatsappUrl } from "@/lib/site";

/** Enlaces con destino distinto: ninguno repetido. */
const secciones = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Proceso", href: "/#proceso" },
  { label: "Zonas de trabajo", href: "/#zonas" },
  { label: "Administradores", href: "/#administradores" },
  { label: "Arquitectos", href: "/#arquitectos" },
  { label: "La empresa", href: "/#empresa" },
  { label: "Trabaja con nosotros", href: "/trabaja-con-nosotros" },
  { label: "Preguntas", href: "/#preguntas" },
  { label: "Contacto", href: "/#contacto" },
];

const legales = [
  { label: "Aviso legal", href: "/aviso-legal" },
  { label: "Privacidad", href: "/privacidad" },
  { label: "Cookies", href: "/cookies" },
];

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: "var(--line)", backgroundColor: "var(--white)" }}
    >
      <div className="pagina">
        {/* Marca y contacto */}
        <div className="pt-11 lg:pt-14 pb-6">
          <div className="flex items-end justify-between gap-6">
            <a
              href="/"
              className="h-display leading-[0.9] w-fit block transition-opacity duration-150 hover:opacity-70"
              style={{
                fontSize: "var(--d-2)",
                letterSpacing: "-0.05em",
                color: "var(--ink)",
              }}
              aria-label="Ir al inicio"
            >
              MLN
            </a>
            <a
              href={`tel:${site.phone}`}
              className="text-t6 lg:text-t6 font-semibold tracking-[-0.03em] whitespace-nowrap"
              style={{ color: "var(--ink)" }}
            >
              {site.phoneDisplay}
            </a>
          </div>

          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 mt-3">
            <p className="eyebrow" style={{ color: "var(--ink-muted)" }}>
              Construcciones en Altura · Madrid
            </p>
            <div
              className="flex items-center gap-4 text-t2"
              style={{ color: "var(--ink-muted)" }}
            >
              <a
                href={whatsappUrl("Hola, os escribo desde la web de MLN.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center min-h-7 py-1 transicion-color duration-150 hover:text-[var(--blue)]"
              >
                WhatsApp
              </a>
              <span
                className="w-3 h-px"
                style={{ backgroundColor: "var(--line)" }}
                aria-hidden
              />
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center min-h-7 py-1 transicion-color duration-150 hover:text-[var(--blue)]"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>

        {/* Secciones: una sola franja, sin columnas que estiren el pie */}
        <nav
          className="flex flex-wrap gap-x-5 sm:gap-x-6 gap-y-2 py-5 border-t"
          style={{ borderColor: "var(--line)" }}
          aria-label="Secciones"
        >
          {secciones.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="inline-flex items-center min-h-7 py-1 text-t2 transicion-color duration-150 hover:text-[var(--blue)]"
              style={{ color: "var(--ink-soft)" }}
            >
              {s.label}
            </a>
          ))}
        </nav>

        {/* Zona de trabajo: texto, no una lista de enlaces al mismo sitio */}
        <p
          className="text-t2 leading-[1.55] pb-5 max-w-[70ch]"
          style={{ color: "var(--ink-faint)" }}
        >
          Madrid capital, Alcobendas, San Sebastián de los Reyes, Pozuelo,
          Majadahonda, Las Rozas, Getafe, Leganés, Alcalá de Henares y resto de
          la Comunidad.
        </p>

        {/* Pie legal */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-4 pb-[74px] lg:pb-4 border-t"
          style={{ borderColor: "var(--line)" }}
        >
          <p className="text-t1" style={{ color: "var(--ink-faint)" }}>
            © {new Date().getFullYear()} {site.legalName}
            {site.cif ? ` · CIF ${site.cif}` : ""}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legales.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="inline-flex items-center min-h-7 py-1 text-t1 transicion-color duration-150 hover:text-[var(--blue)]"
                style={{ color: "var(--ink-faint)" }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
