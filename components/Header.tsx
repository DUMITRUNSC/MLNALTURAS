"use client";

import { ArrowRight, Menu, MessageCircle, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site, whatsappUrl } from "@/lib/site";

const navLinks = [
  { label: "Servicios", href: "/#servicios", id: "servicios" },
  // Páginas propias. El id sigue sirviendo: en la portada se resalta al
  // pasar por su teaser, y en su página, por la ruta.
  {
    label: "Administradores",
    href: "/administradores",
    id: "administradores",
  },
  { label: "Arquitectos", href: "/arquitectos", id: "arquitectos" },
  { label: "Zonas", href: "/zonas", id: "zonas" },
  { label: "Empresa", href: "/#empresa", id: "empresa" },
  { label: "Contacto", href: "/#contacto", id: "contacto" },
];

// Página aparte: no entra en el seguimiento del scroll.
const enlaceEmpleo = { label: "Empleo", href: "/trabaja-con-nosotros" };

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const botonMenu = useRef<HTMLButtonElement>(null);
  const primerEnlace = useRef<HTMLAnchorElement>(null);
  const huboMenu = useRef(false);
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sección visible → marca el enlace correspondiente
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const visibles = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visibles.add(e.target.id);
          else visibles.delete(e.target.id);
        }
        const current = navLinks.find((l) => visibles.has(l.id));
        setActive(current ? current.id : null);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    for (const s of sections) observer.observe(s);
    return () => observer.disconnect();
  }, []);

  // Menú móvil: bloquea el scroll de fondo, cierra con Escape y lleva el
  // foco al primer enlace (y de vuelta al botón al cerrar).
  useEffect(() => {
    if (!open) {
      if (huboMenu.current) botonMenu.current?.focus();
      return;
    }
    huboMenu.current = true;
    primerEnlace.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    /* En móvil va pegada arriba, de borde a borde, con fondo sólido: la
       tarjeta flotante translúcida se veía como un recuadro gris cuando
       pasaba por encima de las secciones oscuras. En escritorio se queda
       como estaba. */
    <header className="fixed top-0 left-0 right-0 z-50 lg:px-8 lg:pt-4">
      <div
        className="w-full mx-auto border-b lg:border-b-0 transition-all duration-300"
        style={{
          maxWidth: "var(--ancho-pagina)",
          backgroundColor: "var(--white)",
          borderColor: "var(--line)",
          boxShadow: scrolled ? "var(--sombra-media)" : "var(--sombra-suave)",
        }}
      >
        <div className="flex items-center justify-between gap-5 h-[56px] lg:h-[64px] px-4 sm:px-6 lg:px-7">
          <a
            href="/"
            className="flex items-baseline gap-2.5 sm:gap-3 shrink-0 transition-opacity duration-150 hover:opacity-70"
            aria-label="MLN Altura Madrid, ir al inicio"
          >
            <span
              className="text-t6 font-bold tracking-[-0.045em] leading-none"
              style={{ color: "var(--ink)" }}
            >
              MLN
            </span>
            <span
              className="text-t1 font-medium tracking-[0.18em] sm:tracking-[0.28em] uppercase leading-none"
              style={{ color: "var(--ink-muted)" }}
            >
              Altura Madrid
            </span>
          </a>

          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8"
            aria-label="Secciones"
          >
            {navLinks.map((link) => {
              const isActive =
                (pathname === "/" && active === link.id) ||
                pathname === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className="relative text-t2 xl:text-t2 font-medium py-2 whitespace-nowrap transicion-color duration-150 hover:text-[var(--blue)]"
                  style={{
                    color: isActive ? "var(--blue)" : "var(--ink-soft)",
                  }}
                >
                  {link.label}
                  <span
                    className="absolute left-0 right-0 -bottom-0.5 h-[2px] transition-opacity duration-200"
                    style={{
                      backgroundColor: "var(--blue-fill)",
                      opacity: isActive ? 1 : 0,
                    }}
                  />
                </a>
              );
            })}

            <a
              href={enlaceEmpleo.href}
              className="text-t2 xl:text-t2 font-medium py-2 whitespace-nowrap transicion-color duration-150 hover:text-[var(--blue)]"
              style={{ color: "var(--ink-muted)" }}
            >
              {enlaceEmpleo.label}
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={`tel:${site.phone}`}
              className="hidden lg:inline-flex items-center gap-2 text-t2 font-semibold"
              style={{ color: "var(--ink)" }}
              aria-label={`Llamar al ${site.phoneDisplay}`}
            >
              {/* Por debajo de lg no se pinta: la barra fija de abajo ya da
                  Llamar, y era el mismo botón dos veces. */}
              <Phone size={15} style={{ color: "var(--blue)" }} aria-hidden />
              <span>{site.phoneDisplay}</span>
            </a>

            <a
              href="/#contacto"
              className="group hidden xl:inline-flex items-center gap-2 h-[42px] px-5 border text-t2 font-semibold transicion-color duration-200"
              style={{ borderColor: "var(--ink-soft)", color: "var(--ink)" }}
            >
              Pedir visita
              <ArrowRight
                size={15}
                aria-hidden
                style={{ color: "var(--blue)" }}
                className="transition-transform duration-200 group-hover:translate-x-[3px]"
              />
            </a>

            <button
              ref={botonMenu}
              type="button"
              onClick={() => setOpen(!open)}
              className="lg:hidden flex items-center justify-center h-11 w-11 -mr-2"
              style={{ color: "var(--ink)" }}
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {open && (
          /* Altura máxima = lo que queda de pantalla bajo la barra, con
             scroll propio: en un móvil de 320×568 el menú medía 722 px con el
             scroll del fondo bloqueado, y las acciones quedaban fuera. */
          <div
            id="menu-movil"
            className="lg:hidden px-5 sm:px-7 pt-1 border-t overflow-y-auto overscroll-contain"
            style={{
              borderColor: "var(--line)",
              maxHeight: "calc(100dvh - 64px - 1.5rem)",
              paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
            }}
          >
            <nav className="flex flex-col" aria-label="Secciones">
              {[
                { label: "Inicio", href: "/", id: "inicio" },
                ...navLinks,
                { ...enlaceEmpleo, id: "empleo" },
                {
                  label: "Preguntas frecuentes",
                  href: "/#preguntas",
                  id: "preguntas",
                },
              ].map((link, i) => (
                <a
                  key={link.href}
                  ref={i === 0 ? primerEnlace : undefined}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3.5 text-t4 font-medium border-b"
                  style={{
                    color: "var(--ink)",
                    borderColor: "var(--line-soft)",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-5 grid grid-cols-1 gap-2.5">
              <a
                href={`tel:${site.phone}`}
                className="flex items-center justify-center gap-2 h-12 text-t3 font-semibold text-white"
                style={{ backgroundColor: "var(--blue-fill)" }}
              >
                <Phone size={16} aria-hidden />
                Llamar al {site.phoneDisplay}
              </a>
              <a
                href={whatsappUrl("Hola, os escribo desde la web de MLN.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 h-12 text-t3 font-semibold border-2"
                style={{ borderColor: "var(--blue)", color: "var(--blue)" }}
              >
                <MessageCircle size={16} aria-hidden />
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
