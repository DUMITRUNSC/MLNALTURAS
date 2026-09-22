"use client";

import { ArrowRight, Check } from "lucide-react";
import { useRef, useState } from "react";
import { Boton } from "@/components/Boton";
import {
  Area,
  Campo,
  CapaRgpd,
  Cebo,
  Faltan,
  Tramo,
  useFormulario,
} from "@/components/campos";
import { enviarPorServidor } from "@/lib/enviar";
import { legal } from "@/lib/legal";
import { medir } from "@/lib/medir";
import { site, whatsappUrl } from "@/lib/site";

const vacio = {
  nombre: "",
  telefono: "",
  mensaje: "",
};

/**
 * Mini-formulario de empleo: nombre, teléfono y comentario libre.
 * Mismo lenguaje que el contacto de la portada: cierre oscuro y hoja blanca.
 * Sin CV, sin selectores, sin adjuntos. El candidato deja sus datos y
 * MLN llama cuando haya una obra que encaje.
 */
export default function ContactoEmpleo() {
  const f = useFormulario(vacio, {
    nombre: ["texto", "el nombre"],
    telefono: ["tel", "el teléfono"],
  });
  const [acepto, setAcepto] = useState(false);
  const [errorConsentimiento, setErrorConsentimiento] = useState<string>();
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string>();
  const [apodo, setApodo] = useState("");
  const casilla = useRef<HTMLInputElement>(null);

  const v = f.valores;

  const guardia = () => {
    const okCasilla = acepto;
    setErrorConsentimiento(
      okCasilla
        ? undefined
        : "Sin tu consentimiento no podemos guardar tus datos.",
    );
    return f.revisar({ valido: okCasilla, foco: casilla.current });
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guardia()) return;
    setEnviando(true);
    setErrorEnvio(undefined);
    const salida = await enviarPorServidor(
      "trabajador",
      {
        nombre: v.nombre,
        telefono: v.telefono,
        mensaje: v.mensaje,
        consentimiento: "aceptado",
        apodo,
      },
      [],
    );
    setEnviando(false);
    if (salida === "enviado") {
      medir("formulario", { tipo: "empleo", via: "servidor" });
      setEnviado(true);
      return;
    }
    if (typeof salida === "object") {
      setErrorEnvio(salida.error);
      return;
    }
    // Fallback: correo
    window.location.href = `mailto:${site.emailEmpleo}?subject=${encodeURIComponent(
      "Empleo / Colaboración",
    )}&body=${encodeURIComponent(
      `Nombre: ${v.nombre}\nTeléfono: ${v.telefono}\n\n${v.mensaje}`,
    )}`;
    setEnviado(true);
  };

  const canales = [
    {
      rotulo: "Llamar",
      texto: site.phoneDisplay,
      pie: "Llámanos y lo hablamos.",
      href: `tel:${site.phone}`,
      grande: true,
    },
    {
      rotulo: "WhatsApp",
      texto: "Enviar mensaje",
      pie: "Cuéntanos en dos líneas qué haces.",
      href: whatsappUrl(
        "Hola, os escribo desde la web de MLN por el tema de empleo/colaboración.",
      ),
      externo: true,
    },
    {
      rotulo: "Email",
      texto: site.emailEmpleo,
      pie: "Si prefieres mandar certificados o fotos de obra.",
      href: `mailto:${site.emailEmpleo}?subject=${encodeURIComponent("Empleo / Colaboración")}`,
    },
  ];

  return (
    <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-start">
      {/* Columna izquierda */}
      <div className="lg:sticky lg:top-28">
        <div className="flex items-center gap-4 mb-8">
          <span
            className="w-10 h-px"
            style={{ backgroundColor: "var(--sobre-oscuro-tenue)" }}
          />
          <p className="eyebrow" style={{ color: "var(--sobre-oscuro-tenue)" }}>
            Contacto
          </p>
        </div>

        <h2
          className="h-display text-white mb-7"
          style={{ fontSize: "var(--d-2)" }}
        >
          Déjanos tus datos.
          <br />
          <span style={{ color: "var(--blue-light)" }}>Nosotros llamamos.</span>
        </h2>

        <p
          className="text-t4 leading-[1.65] mb-8 max-w-[44ch]"
          style={{ color: "var(--sobre-oscuro-suave)" }}
        >
          Da igual si vienes como trabajador, como autónomo o como empresa.
          Cuéntanos quién eres y qué sabes hacer, y cuando haya una obra que
          encaje te contactamos.
        </p>

        <p
          className="flex items-start gap-3 text-t3 leading-[1.55] mb-10 max-w-[44ch]"
          style={{ color: "var(--sobre-oscuro)" }}
        >
          <span
            className="mt-[0.45em] w-2 h-2 shrink-0 rounded-full"
            style={{ backgroundColor: "var(--blue-light)" }}
            aria-hidden
          />
          <span>
            No pedimos currículum. Lo que cuenta es una conversación y, después,
            verte trabajar.
          </span>
        </p>

        <div
          className="flex flex-col border-t"
          style={{ borderColor: "var(--filete-oscuro)" }}
        >
          {canales.map(({ rotulo, texto, pie, href, externo, grande }) => (
            <a
              key={rotulo}
              href={href}
              {...(externo
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group grid grid-cols-[84px_minmax(0,1fr)_auto] items-center gap-4 py-5 border-b"
              style={{ borderColor: "var(--filete-oscuro)" }}
            >
              <span
                className="eyebrow"
                style={{ color: "var(--sobre-oscuro-tenue)" }}
              >
                {rotulo}
              </span>
              <span className="min-w-0">
                <span
                  className={`block font-semibold text-white break-words transicion-color duration-150 group-hover:text-[var(--blue-light)] ${
                    grande ? "tracking-[-0.03em]" : "text-t4"
                  }`}
                  style={grande ? { fontSize: "var(--d-1)" } : undefined}
                >
                  {texto}
                </span>
                <span
                  className="block text-t2 leading-snug mt-1"
                  style={{ color: "var(--sobre-oscuro-tenue)" }}
                >
                  {pie}
                </span>
              </span>
              <ArrowRight
                size={16}
                aria-hidden
                style={{ color: "var(--blue-light)" }}
                className="transition-transform duration-200 group-hover:translate-x-[5px]"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Hoja blanca: formulario o acuse */}
      <div
        className="px-5 sm:px-9 lg:px-12 py-8 sm:py-10 lg:py-12"
        style={{ backgroundColor: "var(--white)" }}
      >
        {enviado ? (
          <div className="entra-acuse flex flex-col gap-5 py-4">
            <span
              className="w-12 h-12 flex items-center justify-center"
              style={{ backgroundColor: "var(--blue-soft)" }}
            >
              <Check
                size={24}
                strokeWidth={2.5}
                style={{ color: "var(--blue)" }}
                aria-hidden
              />
            </span>
            <h3
              className="font-semibold tracking-[-0.02em]"
              style={{ fontSize: "var(--d-1)", color: "var(--ink)" }}
            >
              Datos recibidos.
            </h3>
            <p
              className="text-t3 leading-relaxed max-w-[52ch]"
              style={{ color: "var(--ink-muted)" }}
            >
              Lo lee una persona, no un filtro. Cuando haya una obra que encaje
              te llamamos. Si es urgente, llámanos tú al{" "}
              <a
                href={`tel:${site.phone}`}
                className="font-semibold"
                style={{ color: "var(--blue)" }}
              >
                {site.phoneDisplay}
              </a>
              .
            </p>
            <button
              type="button"
              onClick={() => setEnviado(false)}
              className="self-start mt-2 min-h-11 text-t3 font-semibold"
              style={{ color: "var(--ink)" }}
            >
              Enviar otros datos
            </button>
          </div>
        ) : (
          <form onSubmit={enviar} noValidate>
            <Cebo valor={apodo} onChange={setApodo} />
            <div
              className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pb-7 border-b"
              style={{ borderColor: "var(--line)" }}
            >
              <div>
                <h3
                  className="font-semibold tracking-[-0.025em] mb-1.5"
                  style={{ fontSize: "var(--d-1)", color: "var(--ink)" }}
                >
                  Empleo y colaboración
                </h3>
                <p className="text-t3" style={{ color: "var(--ink-muted)" }}>
                  Un nombre, un teléfono y dos líneas sobre ti.
                </p>
              </div>
              <p
                className="tecnico text-t1 font-semibold uppercase tracking-[0.12em] whitespace-nowrap"
                style={{ color: "var(--blue)" }}
              >
                Sin currículum
              </p>
            </div>

            <Tramo num="01" titulo="Tus datos">
              <Campo
                id="nombre"
                label="Nombre"
                obligatorio
                autoComplete="name"
                valor={v.nombre}
                onChange={f.pon("nombre")}
                onBlur={f.toca("nombre")}
                error={f.visible("nombre")}
              />
              <Campo
                id="telefono"
                label="Teléfono"
                obligatorio
                tipo="tel"
                inputMode="tel"
                autoComplete="tel"
                valor={v.telefono}
                onChange={f.pon("telefono")}
                onBlur={f.toca("telefono")}
                error={f.visible("telefono")}
              />
            </Tramo>

            <Tramo num="02" titulo="Cuéntanos">
              <Area
                id="mensaje"
                label="¿Qué haces y qué buscas?"
                placeholder="Trabajador, autónomo o empresa. Qué sabes hacer, dónde has trabajado, qué buscas con nosotros…"
                valor={v.mensaje}
                onChange={f.pon("mensaje")}
              />
            </Tramo>

            <div className="pt-2">
              <CapaRgpd
                id="empleo"
                acepto={acepto}
                onAcepto={(x) => {
                  setAcepto(x);
                  if (x) setErrorConsentimiento(undefined);
                }}
                error={errorConsentimiento}
                refCasilla={casilla}
                plazo={legal.plazoCandidatura}
                texto={`He leído la información sobre protección de datos y consiento que ${site.legalName} trate mis datos para valorar mi candidatura o propuesta de colaboración.`}
              />

              <div className="mt-7">
                <Faltan
                  campos={f.enviado ? f.faltan : []}
                  consentimiento={f.enviado && !acepto}
                  envio={errorEnvio}
                />
                <Boton
                  type="submit"
                  disabled={enviando}
                  className="w-full sm:w-auto"
                >
                  {enviando ? "Enviando…" : "Enviar mis datos"}
                  {!enviando && <ArrowRight size={17} aria-hidden />}
                </Boton>
                <p
                  className="text-t2 leading-snug mt-4"
                  style={{ color: "var(--ink-muted)" }}
                >
                  Guardamos tus datos 24 meses para la siguiente obra que
                  encaje. Puedes pedirnos que los borremos cuando quieras.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
