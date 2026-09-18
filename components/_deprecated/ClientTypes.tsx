"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const clients = [
  {
    id: "comunidades",
    label: "Comunidades de vecinos",
    index: "01",
    problem:
      "La fachada lleva años sin revisión, aparecen manchas de humedad en los últimos pisos o el tejado da señales de problemas. La junta quiere actuar pero nadie quiere el coste y el caos de un andamio completo.",
    solution:
      "Evaluamos el estado real del edificio, diferenciamos lo urgente de lo que puede esperar y presupuestamos sin sorpresas. Ejecutamos con el mínimo impacto para los vecinos.",
    works: ["Pintura de fachada", "Impermeabilización de cubierta", "Reparación de grietas", "Revisión de canalones"],
  },
  {
    id: "administradores",
    label: "Administradores de fincas",
    index: "02",
    problem:
      "Gestionas varios edificios y necesitas un proveedor de confianza que responda en plazos reales, no te deje en evidencia ante los propietarios y entregue el trabajo documentado.",
    solution:
      "Respondemos en 24–48 h, presupuestamos por escrito y entregamos un cierre de obra documentado. Sin modificaciones de última hora que generen problemas con la comunidad.",
    works: ["Inspección técnica previa", "Presupuesto urgente", "Documentación de obra", "Mantenimiento preventivo"],
  },
  {
    id: "empresas",
    label: "Empresas y edificios terciarios",
    index: "03",
    problem:
      "Tienes un local, nave o edificio de oficinas con un problema en fachada, cubierta o instalaciones en altura que no puedes resolver con el mantenimiento habitual.",
    solution:
      "Actuamos fuera de horario laboral si es necesario. Trabajamos con coordinación de seguridad incluida y entregamos la documentación técnica que puedas necesitar.",
    works: ["Fachadas de naves", "Cubiertas industriales", "Limpieza de cristaleras", "Reparaciones urgentes"],
  },
  {
    id: "particulares",
    label: "Particulares",
    index: "04",
    problem:
      "Eres propietario de una vivienda y tienes un problema concreto: una gotera, una grieta visible o algo que requiere subir a zonas de riesgo que no puedes resolver tú solo.",
    solution:
      "Resolvemos el problema sin complicarte la vida. Te explicamos qué hay exactamente, qué implica la reparación y cuánto cuesta. Sin tecnicismos innecesarios.",
    works: ["Goteras en cubierta", "Grietas en fachada", "Pintura exterior", "Reparaciones puntuales"],
  },
];

export default function ClientTypes() {
  const [active, setActive] = useState(0);
  const c = clients[active];

  return (
    <section
      id="clientes"
      className="border-t"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--cream)" }}
    >
      <div className="max-w-[1400px] mx-auto px-8 xl:px-12">
        {/* Header */}
        <div
          className="flex items-center justify-between py-10 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <p
            className="text-[10px] font-medium tracking-[0.3em] uppercase"
            style={{ color: "var(--rust)" }}
          >
            — Para quién trabajamos
          </p>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-0">
          {/* Tabs */}
          <div
            className="flex flex-row lg:flex-col lg:border-r overflow-x-auto lg:overflow-visible"
            style={{ borderColor: "var(--border)" }}
          >
            {clients.map((cl, i) => (
              <button
                key={cl.id}
                onClick={() => setActive(i)}
                className="flex-shrink-0 text-left px-0 lg:pr-8 py-6 border-b transition-all duration-200 group"
                style={{
                  borderColor: "var(--border)",
                  marginRight: i < clients.length - 1 ? "2rem" : 0,
                }}
              >
                <span
                  className="block text-[9px] font-medium tracking-[0.3em] mb-1.5"
                  style={{ color: "var(--ink-faint)" }}
                >
                  {cl.index}
                </span>
                <span
                  className="block text-xs font-medium transition-colors duration-200 whitespace-nowrap lg:whitespace-normal"
                  style={{
                    color: active === i ? "var(--rust)" : "var(--ink-muted)",
                    fontWeight: active === i ? 600 : 400,
                  }}
                >
                  {cl.label}
                </span>
                {active === i && (
                  <div
                    className="hidden lg:block w-4 h-px mt-3"
                    style={{ backgroundColor: "var(--rust)" }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="lg:pl-16 py-12 lg:py-16">
            <h2
              className="leading-tight tracking-tight mb-8"
              style={{
                fontFamily: "var(--font-serif), serif",
                fontWeight: 300,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "var(--ink)",
              }}
            >
              {c.label}
            </h2>

            <div className="grid sm:grid-cols-2 gap-10 mb-10">
              <div>
                <p
                  className="text-[10px] font-medium tracking-[0.25em] uppercase mb-3"
                  style={{ color: "var(--ink-faint)" }}
                >
                  La situación habitual
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
                  {c.problem}
                </p>
              </div>
              <div>
                <p
                  className="text-[10px] font-medium tracking-[0.25em] uppercase mb-3"
                  style={{ color: "var(--rust)" }}
                >
                  Cómo actuamos
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--ink)" }}>
                  {c.solution}
                </p>
              </div>
            </div>

            {/* Works */}
            <div className="mb-10">
              <p
                className="text-[10px] font-medium tracking-[0.25em] uppercase mb-4"
                style={{ color: "var(--ink-faint)" }}
              >
                Trabajos frecuentes
              </p>
              <div className="flex flex-wrap gap-2">
                {c.works.map((w) => (
                  <span
                    key={w}
                    className="px-3 py-1.5 text-[11px] font-medium border"
                    style={{ borderColor: "var(--border)", color: "var(--ink-muted)" }}
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="#contacto"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
              style={{ color: "var(--rust)" }}
            >
              Solicitar evaluación sin compromiso <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
