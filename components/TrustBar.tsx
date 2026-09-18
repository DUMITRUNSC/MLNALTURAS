import { site } from "@/lib/site";

const datos = [
  // El oficio y la empresa, separados: ver la nota de lib/site.ts.
  site.empresaDesde
    ? `${site.añosOficio} años de oficio · empresa desde ${site.empresaDesde}`
    : `${site.añosOficio} años de oficio en altura`,
  "Madrid y alrededores",
  `Presupuesto cerrado en ${site.responseTime}`,
  "Sin andamio ni licencia de ocupación",
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
        <ul className="flex flex-wrap items-center gap-x-10 gap-y-3 py-5 lg:py-6">
          {datos.map((d, i) => (
            <li key={d} className="flex items-center gap-10">
              {i > 0 && (
                <span
                  className="hidden sm:block w-6 h-px"
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
