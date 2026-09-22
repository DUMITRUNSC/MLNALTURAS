"use client";

import { MessageCircle, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { site, whatsappUrl } from "@/lib/site";

/**
 * Barra fija inferior solo en móvil: llamar o WhatsApp desde cualquier punto.
 *
 * Se aparta en dos momentos:
 *  - mientras se escribe en un campo: con el teclado abierto tapaba el campo
 *    activo o el botón de enviar (sobre todo en iOS);
 *  - cuando la sección de contacto está en pantalla: allí ya están los mismos
 *    canales en grande y la barra solo restaba sitio.
 */
export default function MobileCallBar() {
  const [escribiendo, setEscribiendo] = useState(false);
  const [enContacto, setEnContacto] = useState(false);

  useEffect(() => {
    const esCampo = (el: EventTarget | null) =>
      el instanceof HTMLElement &&
      el.matches(
        "input:not([type=checkbox]):not([type=radio]):not([type=file]), textarea, select",
      );
    const entra = (e: FocusEvent) => esCampo(e.target) && setEscribiendo(true);
    const sale = (e: FocusEvent) => esCampo(e.target) && setEscribiendo(false);
    document.addEventListener("focusin", entra);
    document.addEventListener("focusout", sale);

    const secciones = ["contacto", "contacto-empleo"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const obs = new IntersectionObserver(
      (es) => setEnContacto(es.some((e) => e.isIntersecting)),
      { threshold: 0.15 },
    );
    for (const s of secciones) obs.observe(s);

    return () => {
      document.removeEventListener("focusin", entra);
      document.removeEventListener("focusout", sale);
      obs.disconnect();
    };
  }, []);

  const oculta = escribiendo || enContacto;

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 grid grid-cols-2 border-t transition-transform duration-200"
      style={{
        borderColor: "var(--line)",
        backgroundColor: "var(--cabecera-fija)",
        backdropFilter: "blur(10px)",
        paddingBottom: "env(safe-area-inset-bottom)",
        transform: oculta ? "translateY(110%)" : "none",
      }}
      aria-hidden={oculta || undefined}
      inert={oculta || undefined}
    >
      <a
        href={`tel:${site.phone}`}
        className="flex items-center justify-center gap-2 h-[58px] text-t3 font-semibold text-white"
        style={{ backgroundColor: "var(--blue-fill)" }}
      >
        <Phone size={17} aria-hidden />
        Llamar
      </a>
      <a
        href={whatsappUrl("Hola, os escribo desde la web de MLN.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 h-[58px] text-t3 font-semibold"
        style={{ color: "var(--ink)" }}
      >
        <MessageCircle size={17} style={{ color: "var(--blue)" }} aria-hidden />
        WhatsApp
      </a>
    </div>
  );
}
