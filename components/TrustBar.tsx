import { site } from "@/lib/site";

const datos = [
  `${site.añosOficio} años de oficio en altura`,
  "Un responsable técnico por obra",
  "Presupuesto por escrito",
  "Visita técnica gratuita",
];

/** Franja técnica: solo texto, sin iconos ni cajas. */
export default function TrustBar() {
  return (
    <section
      className="border-y"
      style={{ borderColor: "var(--line)", backgroundColor: "var(--white)" }}
      aria-label="Datos de MLN"
    >
      <div className="pagina">
        {/* 2×2 en móvil y tableta; en escritorio, una sola fila. Antes era un
            flex-wrap y el cuarto dato se descolgaba solo a otra línea. */}
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 py-5 lg:flex lg:flex-nowrap lg:items-center lg:justify-between lg:gap-x-8 lg:py-6">
          {datos.map((d, i) => (
            <li key={d} className="flex items-start sm:items-center gap-8">
              {i > 0 && (
                <span
                  className="hidden lg:block w-6 h-px"
                  style={{ backgroundColor: "var(--line)" }}
                  aria-hidden
                />
              )}
              <span className="eyebrow" style={{ color: "var(--ink-soft)" }}>
                {d}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
