import { MessageCircle, Phone } from "lucide-react";
import { site, whatsappUrl } from "@/lib/site";

/** Barra fija inferior solo en móvil: llamar o WhatsApp desde cualquier punto. */
export default function MobileCallBar() {
  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 grid grid-cols-2 border-t"
      style={{
        borderColor: "var(--line)",
        backgroundColor: "var(--cabecera-fija)",
        backdropFilter: "blur(10px)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
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
