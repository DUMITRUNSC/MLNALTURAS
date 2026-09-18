const works = [
  {
    num: "001",
    type: "Rehabilitación de fachada",
    location: "Madrid · Edificio residencial",
    year: "2024",
    cols: "lg:col-span-2",
    height: "h-[400px] lg:h-[480px]",
  },
  {
    num: "002",
    type: "Impermeabilización de cubierta",
    location: "Alcobendas · Comunidad de vecinos",
    year: "2024",
    cols: "",
    height: "h-[400px]",
  },
  {
    num: "003",
    type: "Reparación de grietas en fachada",
    location: "Getafe · Bloque de viviendas",
    year: "2023",
    cols: "",
    height: "h-[320px]",
  },
  {
    num: "004",
    type: "Pintura en técnica vertical",
    location: "Madrid · Local comercial",
    year: "2023",
    cols: "",
    height: "h-[320px]",
  },
  {
    num: "005",
    type: "Patio interior — saneado y pintura",
    location: "Alcalá de Henares · Edificio de oficinas",
    year: "2023",
    cols: "lg:col-span-2",
    height: "h-[360px]",
  },
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="border-t"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--cream)" }}
    >
      <div className="max-w-[1400px] mx-auto px-8 xl:px-12">
        {/* Header */}
        <div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 py-16 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <div>
            <p
              className="text-[10px] font-medium tracking-[0.3em] uppercase mb-5"
              style={{ color: "var(--rust)" }}
            >
              — Trabajos realizados
            </p>
            <h2
              className="leading-tight tracking-tight"
              style={{
                fontFamily: "var(--font-serif), serif",
                fontWeight: 300,
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                color: "var(--ink)",
              }}
            >
              Cada obra,
              <br />
              <em style={{ fontStyle: "italic" }}>un problema resuelto</em>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--ink-muted)" }}>
              Próximamente incorporaremos fotografías reales de nuestros proyectos.
              Si quieres ver referencias específicas, llámanos.
            </p>
            <a
              href="tel:+34600000000"
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: "var(--rust)" }}
            >
              600 000 000
            </a>
          </div>
        </div>

        {/* Grid */}
        <div className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {works.map((w) => (
              <div
                key={w.num}
                className={`relative group overflow-hidden border ${w.cols} ${w.height}`}
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--cream-dark)",
                }}
              >
                {/* Placeholder with technical cross pattern */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                      backgroundImage:
                        "linear-gradient(var(--ink) 1px, transparent 1px), linear-gradient(90deg, var(--ink) 1px, transparent 1px)",
                      backgroundSize: "30px 30px",
                    }}
                  />
                  {/* Cross-hair center mark */}
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="relative w-8 h-8">
                      <div className="absolute top-1/2 left-0 right-0 h-px" style={{ backgroundColor: "var(--ink-faint)" }} />
                      <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ backgroundColor: "var(--ink-faint)" }} />
                    </div>
                    <p
                      className="text-[9px] font-medium tracking-[0.3em] uppercase"
                      style={{ color: "var(--ink-faint)" }}
                    >
                      Fotografía en breve
                    </p>
                  </div>
                </div>

                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[var(--cream)] via-[var(--cream)]/80 to-transparent">
                  <div className="flex items-end justify-between">
                    <div>
                      <p
                        className="text-[9px] font-medium tracking-[0.3em] uppercase mb-1"
                        style={{ color: "var(--ink-faint)" }}
                      >
                        {w.num}
                      </p>
                      <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>
                        {w.type}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--ink-muted)" }}>
                        {w.location}
                      </p>
                    </div>
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--ink-faint)" }}
                    >
                      {w.year}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
