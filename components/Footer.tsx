import { site, whatsappUrl } from "@/lib/site";

/* Pie compacto y oscuro: tres líneas.
 *   1. Marca + contacto (teléfono sin +34: así se lee en España; el enlace
 *      tel: sí lo lleva y marca desde cualquier móvil).
 *   2. Enlaces, en una sola franja, sin repetir destino.
 *   3. Legal: razón social, CIF, domicilio y páginas legales.
 * Las zonas ya están en /zonas y en la pregunta de la portada. */

const enlaces = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Cómo trabajamos", href: "/#proceso" },
  { label: "Administradores", href: "/administradores" },
  { label: "Arquitectos", href: "/arquitectos" },
  { label: "Zonas de trabajo", href: "/zonas" },
  { label: "La empresa", href: "/#empresa" },
  { label: "Preguntas", href: "/#preguntas" },
  { label: "Trabaja con nosotros", href: "/trabaja-con-nosotros" },
];

const legales = [
  { label: "Aviso legal", href: "/aviso-legal" },
  { label: "Privacidad", href: "/privacidad" },
  { label: "Cookies", href: "/cookies" },
];

const enlaceClaro =
  "inline-flex items-center min-h-9 transicion-color duration-150 hover:text-white";

export default function Footer() {
  const a = site.address;
  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: "var(--zona-oscura)",
        borderColor: "var(--filete-oscuro)",
      }}
    >
      <div className="pagina">
        {/* 1 · Marca y contacto */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pt-10 pb-6">
          <a
            href="/"
            className="flex items-baseline gap-3 w-fit transition-opacity duration-150 hover:opacity-70"
            aria-label="MLN, ir al inicio"
          >
            <span
              className="h-display leading-none text-white"
              style={{ fontSize: "var(--d-1)", letterSpacing: "-0.05em" }}
            >
              MLN
            </span>
            <span
              className="eyebrow"
              style={{ color: "var(--sobre-oscuro-tenue)" }}
            >
              Construcciones en Altura · Madrid
            </span>
          </a>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <a
              href={`tel:${site.phone}`}
              className="inline-flex items-center min-h-11 text-t5 font-semibold text-white tracking-[-0.02em] whitespace-nowrap transicion-color duration-150 hover:text-[var(--blue-light)]"
              aria-label={`Llamar al ${site.phoneDisplay}`}
            >
              {site.phoneDisplay}
            </a>
            <a
              href={whatsappUrl("Hola, os escribo desde la web de MLN.")}
              target="_blank"
              rel="noopener noreferrer"
              className={`${enlaceClaro} text-t3`}
              style={{ color: "var(--sobre-oscuro-suave)" }}
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${site.email}`}
              className={`${enlaceClaro} text-t3`}
              style={{ color: "var(--sobre-oscuro-suave)" }}
            >
              {site.email}
            </a>
          </div>
        </div>

        {/* 2 · Enlaces */}
        <nav
          className="flex flex-wrap gap-x-6 gap-y-0 py-3 border-t"
          style={{ borderColor: "var(--filete-oscuro)" }}
          aria-label="Secciones"
        >
          {enlaces.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`${enlaceClaro} text-t2`}
              style={{ color: "var(--sobre-oscuro-suave)" }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* 3 · Legal */}
        <div
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-x-6 gap-y-1 pt-3 pb-5 border-t"
          style={{ borderColor: "var(--filete-oscuro)" }}
        >
          <p
            className="text-t1 leading-relaxed py-2"
            style={{ color: "var(--sobre-oscuro-tenue)" }}
          >
            © {new Date().getFullYear()} {site.legalName}
            {site.cif ? ` · CIF ${site.cif}` : ""} · {a.street}, {a.postalCode}{" "}
            {a.city}
          </p>
          <div className="flex flex-wrap items-center gap-x-6">
            {legales.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`${enlaceClaro} text-t1`}
                style={{ color: "var(--sobre-oscuro-tenue)" }}
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
