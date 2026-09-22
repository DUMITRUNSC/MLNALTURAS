"use client";

import { useEffect } from "react";
import { medir } from "@/lib/medir";

/**
 * Escucha los clics en cualquier enlace de teléfono o WhatsApp de la web,
 * estén donde estén (cabecera, barra móvil, contacto, pie), sin tener que
 * marcar cada botón a mano. El envío del formulario lo mide el propio
 * formulario, porque solo él sabe si ha salido bien.
 */
export default function Medicion() {
  useEffect(() => {
    const alPulsar = (e: MouseEvent) => {
      const enlace = (e.target as Element | null)?.closest?.("a[href]");
      if (!(enlace instanceof HTMLAnchorElement)) return;
      const href = enlace.getAttribute("href") ?? "";
      const donde =
        enlace.closest("section[id]")?.id ??
        (enlace.closest("header")
          ? "cabecera"
          : enlace.closest("footer")
            ? "pie"
            : "barra");
      if (href.startsWith("tel:")) medir("llamada", { donde });
      else if (href.includes("wa.me/")) medir("whatsapp", { donde });
    };
    document.addEventListener("click", alPulsar, { capture: true });
    return () =>
      document.removeEventListener("click", alPulsar, { capture: true });
  }, []);
  return null;
}
