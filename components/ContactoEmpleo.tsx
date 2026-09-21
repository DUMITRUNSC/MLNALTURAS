"use client";

import { ArrowRight, Check, MessageCircle, Phone } from "lucide-react";
import { useRef, useState } from "react";
import { Boton } from "@/components/Boton";
import {
  Area,
  Bloque,
  Cajetin,
  Campo,
  CapaRgpd,
  Faltan,
  Lamina,
  useFormulario,
  useHoy,
} from "@/components/campos";
import { enviarPorServidor } from "@/lib/enviar";
import { legal } from "@/lib/legal";
import { site, whatsappUrl } from "@/lib/site";

const vacio = {
  nombre: "",
  telefono: "",
  email: "",
  mensaje: "",
};

/**
 * Mini-formulario de empleo: nombre, teléfono, email y comentario libre.
 * Sin CV, sin selectores, sin adjuntos. El candidato deja sus datos y
 * MLN llama cuando haya una obra que encaje.
 */
export default function ContactoEmpleo() {
  const f = useFormulario(vacio, {
    nombre: ["texto", "el nombre"],
    telefono: ["tel", "el teléfono"],
    email: ["email-opcional", "el correo"],
  });
  const [acepto, setAcepto] = useState(false);
  const [errorConsentimiento, setErrorConsentimiento] = useState<string>();
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string>();
  const casilla = useRef<HTMLInputElement>(null);
  const hoy = useHoy();

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
        email: v.email,
        mensaje: v.mensaje,
        consentimiento: "aceptado",
      },
      [],
    );
    setEnviando(false);
    if (salida === "enviado") {
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
      `Nombre: ${v.nombre}\nTeléfono: ${v.telefono}\nEmail: ${v.email}\n\n${v.mensaje}`,
    )}`;
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div className="entra-acuse flex flex-col gap-6 py-4 max-w-[540px]">
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
          Lo lee una persona, no un filtro. Cuando haya una obra que encaje te
          llamamos. Si es urgente, llámanos tú al{" "}
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
          className="self-start mt-2 text-t3 font-semibold"
          style={{ color: "var(--ink)" }}
        >
          Enviar otros datos
        </button>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-12 lg:gap-16">
      {/* Columna izquierda */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="flex items-center gap-4 mb-8">
          <span
            className="w-10 h-px"
            style={{ backgroundColor: "var(--rule)" }}
          />
          <p className="eyebrow" style={{ color: "var(--ink-muted)" }}>
            Contacto
          </p>
        </div>
        <h2
          className="h-display mb-7"
          style={{ fontSize: "var(--d-2)", color: "var(--ink)" }}
        >
          Déjanos tus datos.
          <br />
          <span style={{ color: "var(--blue)" }}>Nosotros llamamos.</span>
        </h2>
        <p
          className="text-t3 leading-[1.68] mb-5 max-w-[46ch]"
          style={{ color: "var(--ink-soft)" }}
        >
          Da igual si vienes como trabajador, como autónomo o como empresa.
          Cuéntanos quién eres y qué sabes hacer, y cuando haya una obra que
          encaje te contactamos.
        </p>
        <p
          className="text-t3 leading-[1.6] pl-4 border-l-2 max-w-[42ch]"
          style={{ color: "var(--ink-muted)", borderColor: "var(--blue)" }}
        >
          No pedimos currículum. Lo que cuenta es una conversación y, después,
          verte trabajar.
        </p>

        <div
          className="mt-10 pt-8 border-t"
          style={{ borderColor: "var(--line)" }}
        >
          <p className="eyebrow mb-4" style={{ color: "var(--ink-muted)" }}>
            O directamente
          </p>
          <div className="flex flex-col">
            {[
              {
                rotulo: "Llamar",
                texto: site.phoneDisplay,
                href: `tel:${site.phone}`,
                icono: (
                  <Phone
                    size={15}
                    style={{ color: "var(--blue)" }}
                    aria-hidden
                  />
                ),
              },
              {
                rotulo: "WhatsApp",
                texto: "Enviar mensaje",
                href: whatsappUrl(
                  "Hola, os escribo desde la web de MLN por el tema de empleo/colaboración.",
                ),
                externo: true,
                icono: (
                  <MessageCircle
                    size={15}
                    style={{ color: "var(--blue)" }}
                    aria-hidden
                  />
                ),
              },
              {
                rotulo: "Email",
                texto: site.emailEmpleo,
                href: `mailto:${site.emailEmpleo}?subject=${encodeURIComponent("Empleo / Colaboración")}`,
                icono: (
                  <ArrowRight
                    size={15}
                    style={{ color: "var(--blue)" }}
                    aria-hidden
                  />
                ),
              },
            ].map(({ rotulo, texto, href, externo, icono }) => (
              <a
                key={rotulo}
                href={href}
                {...(externo
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group grid grid-cols-[20px_86px_minmax(0,1fr)_auto] items-baseline gap-3 py-4 border-t last:border-b"
                style={{ borderColor: "var(--line)" }}
              >
                <span className="pt-[2px]">{icono}</span>
                <span className="eyebrow" style={{ color: "var(--ink-muted)" }}>
                  {rotulo}
                </span>
                <span
                  className="text-t3 font-semibold break-words"
                  style={{ color: "var(--ink)" }}
                >
                  {texto}
                </span>
                <ArrowRight
                  size={15}
                  aria-hidden
                  style={{ color: "var(--blue)" }}
                  className="transition-transform duration-200 group-hover:translate-x-[5px]"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Columna derecha: formulario mínimo */}
      <div>
        <form onSubmit={enviar} noValidate>
          <Lamina
            titulo="Empleo y colaboración"
            referencia="MLN · EMP / HOJA 01"
          >
            <Bloque
              num="01"
              titulo="Tus datos"
              valores={[v.nombre, v.telefono]}
            >
              <Campo
                id="nombre"
                label="Nombre"
                obligatorio
                ancho
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
                pista="Te llamamos o te escribimos por WhatsApp."
                valor={v.telefono}
                onChange={f.pon("telefono")}
                onBlur={f.toca("telefono")}
                error={f.visible("telefono")}
              />
              <Campo
                id="email"
                label="Email"
                tipo="email"
                inputMode="email"
                autoComplete="email"
                pista="Opcional."
                valor={v.email}
                onChange={f.pon("email")}
                onBlur={f.toca("email")}
                error={f.visible("email")}
              />
            </Bloque>

            <Bloque num="02" titulo="Cuéntanos">
              <Area
                id="mensaje"
                label="¿Qué haces y qué buscas?"
                placeholder="Trabajador, autónomo o empresa. Qué sabes hacer, dónde has trabajado, qué buscas con nosotros…"
                valor={v.mensaje}
                onChange={f.pon("mensaje")}
              />
            </Bloque>

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

            <Cajetin
              celdas={[
                { rotulo: "Documento", valor: "Empleo / Colaboración" },
                { rotulo: "Fecha", valor: hoy || "—" },
                { rotulo: "Conservación", valor: "24 meses" },
              ]}
            >
              <Faltan
                campos={f.enviado ? f.faltan : []}
                consentimiento={f.enviado && !acepto}
                envio={errorEnvio}
              />
              <Boton type="submit" disabled={enviando}>
                {enviando ? "Enviando…" : "Enviar datos"}
                {!enviando && <ArrowRight size={17} aria-hidden />}
              </Boton>
            </Cajetin>
          </Lamina>
        </form>
      </div>
    </div>
  );
}
