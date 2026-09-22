"use client";

import { ArrowRight, Check, Copy, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Boton, BotonEnlace } from "@/components/Boton";
import {
  Adjuntos,
  Area,
  Campo,
  CapaRgpd,
  Cebo,
  Faltan,
  Opciones,
  Tramo,
  useFormulario,
} from "@/components/campos";
import { enviarPorServidor } from "@/lib/enviar";
import { legal } from "@/lib/legal";
import { medir } from "@/lib/medir";
import { site, whatsappUrl } from "@/lib/site";

const perfiles = [
  "Comunidad o particular",
  "Administrador de fincas",
  "Arquitecto o ingeniería",
  "Empresa o local",
];

const vacio = {
  nombre: "",
  telefono: "",
  perfil: "",
  zona: "",
  mensaje: "",
};

/** Por dónde ha salido la solicitud: cada camino tiene su acuse. */
type ComoFue = "servidor" | "correo" | "whatsapp";

/**
 * Solicitud de visita técnica.
 *
 * Solo dos datos son obligatorios (nombre y teléfono) y el formulario lo
 * dice. Antes había tres bloques con perfil, informe, plazo y contadores
 * «0 de 4 datos» que contaban también los opcionales: parecía una ficha
 * que había que rellenar entera. Lo que falta se pregunta por teléfono.
 *
 * Tres salidas: servidor (Resend, con adjuntos), correo del visitante
 * (mientras no haya clave) y WhatsApp. El acuse dice exactamente cuál ha
 * sido, porque abrir WhatsApp no es haber enviado nada todavía.
 */
export default function Contact() {
  const f = useFormulario(vacio, {
    nombre: ["texto", "el nombre"],
    telefono: ["tel", "el teléfono"],
  });
  const [acepto, setAcepto] = useState(false);
  const [errorConsentimiento, setErrorConsentimiento] = useState<string>();
  const [sent, setSent] = useState(false);
  const [comoFue, setComoFue] = useState<ComoFue>("correo");
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string>();
  const [ficheros, setFicheros] = useState<File[]>([]);
  const [apodo, setApodo] = useState("");
  const [copiado, setCopiado] = useState(false);
  const casilla = useRef<HTMLInputElement>(null);

  const v = f.valores;

  /* Los enlaces de la portada y de la sección de arquitectos llegan con
     ?perfil=arquitecto|administrador. Preseleccionar «Escribes como» ahorra
     un toque a quien ya ha dicho quién es al pulsar. */
  // biome-ignore lint/correctness/useExhaustiveDependencies: solo al montar; a partir de ahí manda lo que elija la persona
  useEffect(() => {
    const quien = new URLSearchParams(window.location.search).get("perfil");
    if (!quien) return;
    const encaje = perfiles.find((op) =>
      op.toLowerCase().startsWith(quien.toLowerCase().slice(0, 6)),
    );
    if (encaje) f.pon("perfil")(encaje);
  }, []);

  /* Solo lo que la persona ha rellenado: en un chat de WhatsApp diez líneas
     de «(sin indicar)» sobran, y el consentimiento ya viaja aparte. */
  const resumen = () => {
    const lineas: [string, string][] = [
      ["Nombre", v.nombre],
      ["Teléfono", v.telefono],
      ["Escribe como", v.perfil],
      ["Dirección o zona", v.zona],
    ];
    return [
      "Solicitud de visita técnica",
      "",
      ...lineas
        .filter(([, valor]) => valor.trim() !== "")
        .map(([rotulo, valor]) => `${rotulo}: ${valor.trim()}`),
      ...(v.mensaje.trim() ? ["", v.mensaje.trim()] : []),
    ].join("\n");
  };

  const guardia = () => {
    const okCasilla = acepto;
    setErrorConsentimiento(
      okCasilla
        ? undefined
        : "Necesitamos tu consentimiento para poder responderte.",
    );
    return f.revisar({ valido: okCasilla, foco: casilla.current });
  };

  const porCorreo = () => {
    medir("formulario", { tipo: "visita", via: "correo" });
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      "Solicitud de visita técnica",
    )}&body=${encodeURIComponent(resumen())}`;
    setComoFue("correo");
    setSent(true);
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guardia()) return;
    setEnviando(true);
    setErrorEnvio(undefined);
    const salida = await enviarPorServidor(
      "cliente",
      {
        nombre: v.nombre,
        telefono: v.telefono,
        perfil: v.perfil,
        "direccion o zona": v.zona,
        mensaje: v.mensaje,
        consentimiento: "aceptado",
        apodo,
      },
      ficheros,
    );
    setEnviando(false);
    if (salida === "enviado") {
      medir("formulario", { tipo: "visita", via: "servidor" });
      setComoFue("servidor");
      setSent(true);
      return;
    }
    if (typeof salida === "object") {
      setErrorEnvio(salida.error);
      return;
    }
    // Todavía sin servidor de envío: sale por el correo de la persona.
    porCorreo();
  };

  /* Abrir WhatsApp no envía nada a MLN: lo envía la persona desde su chat.
     Por eso no se le exige la casilla ni los campos obligatorios. */
  const porWhatsapp = () => {
    medir("whatsapp", { donde: "formulario" });
    window.open(whatsappUrl(resumen()), "_blank", "noopener,noreferrer");
    setComoFue("whatsapp");
    setSent(true);
  };

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(resumen());
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      setCopiado(false);
    }
  };

  const acuse: Record<ComoFue, { titulo: string; texto: string }> = {
    servidor: {
      titulo: "Solicitud enviada.",
      texto: `Te llamamos en ${site.responseTime} laborables para concretar la visita${
        ficheros.length > 0 ? "; los archivos han llegado con ella" : ""
      }. Si es urgente, llámanos y lo vemos hoy.`,
    },
    whatsapp: {
      titulo: "Se ha abierto WhatsApp con tus datos.",
      texto:
        "Pulsa Enviar allí para que nos llegue; si tienes fotos, adjúntalas en el chat. Si no se ha abierto nada, copia los datos y pégalos en WhatsApp, o llámanos.",
    },
    correo: {
      titulo: "Se ha abierto tu correo con la solicitud.",
      texto:
        "Solo queda darle a enviar; si tienes una foto de la zona, adjúntala. Si no se ha abierto ningún programa de correo, copia los datos o mándanoslos por WhatsApp.",
    },
  };

  const canales = [
    {
      rotulo: "Llamar",
      texto: site.phoneDisplay,
      pie: "Llámanos y lo vemos contigo.",
      href: `tel:${site.phone}`,
      grande: true,
    },
    {
      rotulo: "WhatsApp",
      texto: "Enviar fotos del problema",
      pie: "Una foto dice más que una descripción.",
      href: whatsappUrl("Hola, os escribo desde la web de MLN."),
      externo: true,
    },
    {
      rotulo: "Email",
      texto: site.email,
      pie: "Proyectos, informes o especificaciones.",
      href: `mailto:${site.email}`,
    },
  ];

  return (
    <section
      id="contacto"
      className="py-16 lg:py-28"
      style={{ backgroundColor: "var(--zona-oscura)" }}
    >
      <div className="pagina">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-start">
          {/* Columna izquierda. En móvil va DESPUÉS del formulario, que es lo
              que la persona ha venido a buscar al pulsar «Pedir visita»; la
              barra fija de abajo ya le da llamar y WhatsApp. */}
          <div className="order-2 lg:order-1 lg:sticky lg:top-28">
            <div className="hidden lg:flex items-center gap-4 mb-8">
              <span
                className="w-10 h-px"
                style={{ backgroundColor: "var(--sobre-oscuro-tenue)" }}
              />
              <p
                className="eyebrow"
                style={{ color: "var(--sobre-oscuro-tenue)" }}
              >
                Contacto
              </p>
            </div>

            <h2
              className="hidden lg:block h-display text-white mb-7"
              style={{ fontSize: "var(--d-3)" }}
            >
              El primer paso
              <br />
              <span style={{ color: "var(--blue-light)" }}>
                es subir a verlo.
              </span>
            </h2>

            <p
              className="hidden lg:block text-t4 leading-[1.65] mb-8 max-w-[44ch]"
              style={{ color: "var(--sobre-oscuro-suave)" }}
            >
              Una visita técnica es exactamente eso: subimos, miramos el
              edificio de cerca y te decimos qué tiene, qué haríamos y cuánto
              cuesta. Por escrito, para que lo puedas llevar a una junta.
            </p>

            {/* Urgencia: una línea, con su punto, sin caja */}
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
                ¿Riesgo de desprendimiento o ha entrado agua? Llama: intentamos
                verlo el mismo día.
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

            {/* QR: solo delante de un ordenador. En el móvil ya hay enlace. */}
            <div className="hidden lg:flex items-center gap-5 mt-8">
              <Image
                src="/qr-whatsapp.svg"
                alt="Código QR que abre un chat de WhatsApp con MLN"
                width={76}
                height={76}
                unoptimized
                className="p-1.5"
                style={{ backgroundColor: "#ffffff" }}
              />
              <p
                className="text-t2 leading-snug max-w-[26ch]"
                style={{ color: "var(--sobre-oscuro-tenue)" }}
              >
                ¿Estás en el ordenador? Escanéalo y sigue por WhatsApp desde el
                móvil.
              </p>
            </div>
          </div>

          {/* Formulario: hoja blanca sobre el fondo oscuro */}
          <div className="order-1 lg:order-2">
            <div className="lg:hidden mb-8">
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="w-10 h-px"
                  style={{ backgroundColor: "var(--sobre-oscuro-tenue)" }}
                />
                <p
                  className="eyebrow"
                  style={{ color: "var(--sobre-oscuro-tenue)" }}
                >
                  Contacto
                </p>
              </div>
              <h2
                className="h-display text-white"
                style={{ fontSize: "var(--d-2)" }}
              >
                El primer paso
                <br />
                <span style={{ color: "var(--blue-light)" }}>
                  es subir a verlo.
                </span>
              </h2>
            </div>

            <div
              className="px-5 sm:px-9 lg:px-12 py-8 sm:py-10 lg:py-12"
              style={{ backgroundColor: "var(--white)" }}
            >
              {sent ? (
                <div className="entra-acuse flex flex-col justify-center gap-5 py-4">
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
                    {acuse[comoFue].titulo}
                  </h3>
                  <p
                    className="text-t3 leading-relaxed max-w-[52ch]"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {acuse[comoFue].texto}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {comoFue !== "servidor" && (
                      <BotonEnlace
                        href={whatsappUrl(resumen())}
                        target="_blank"
                        rel="noopener noreferrer"
                        medida="media"
                      >
                        <MessageCircle size={17} aria-hidden />
                        {comoFue === "whatsapp"
                          ? "Abrir WhatsApp otra vez"
                          : "Enviar por WhatsApp"}
                      </BotonEnlace>
                    )}
                    {comoFue !== "servidor" && (
                      <Boton
                        onClick={copiar}
                        variante="contorno"
                        medida="media"
                      >
                        <Copy size={16} aria-hidden />
                        {copiado ? "Datos copiados" : "Copiar los datos"}
                      </Boton>
                    )}
                    <Boton
                      onClick={() => setSent(false)}
                      variante="texto"
                      medida="media"
                      style={{ color: "var(--ink-muted)" }}
                    >
                      {comoFue === "servidor"
                        ? "Enviar otra solicitud"
                        : "Volver al formulario"}
                    </Boton>
                  </div>
                </div>
              ) : (
                <form onSubmit={enviar} noValidate>
                  <Cebo valor={apodo} onChange={setApodo} />
                  {/* Cabecera de la hoja */}
                  <div
                    className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pb-7 border-b"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <div>
                      <h3
                        className="font-semibold tracking-[-0.025em] mb-1.5"
                        style={{ fontSize: "var(--d-1)", color: "var(--ink)" }}
                      >
                        Solicita una visita técnica
                      </h3>
                      <p
                        className="text-t3"
                        style={{ color: "var(--ink-muted)" }}
                      >
                        Solo necesitamos un nombre y un teléfono.
                      </p>
                    </div>
                    <p
                      className="tecnico text-t1 font-semibold uppercase tracking-[0.12em] whitespace-nowrap"
                      style={{ color: "var(--blue)" }}
                    >
                      Gratuita · {site.responseTime}
                    </p>
                  </div>

                  <Tramo num="01" titulo="Quién eres">
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
                    <Opciones
                      nombre="perfil"
                      label="Escribes como"
                      opciones={perfiles}
                      valor={v.perfil}
                      onChange={f.pon("perfil")}
                      ancho
                    />
                  </Tramo>

                  <Tramo num="02" titulo="El edificio">
                    <Campo
                      id="zona"
                      label="Dirección o zona"
                      ancho
                      placeholder="Calle, barrio o municipio"
                      valor={v.zona}
                      onChange={f.pon("zona")}
                    />
                    <Area
                      id="mensaje"
                      label="¿Qué ocurre?"
                      placeholder="Grietas, filtraciones, informe de la ITE, desde cuándo, si ya lo ha mirado alguien…"
                      valor={v.mensaje}
                      onChange={f.pon("mensaje")}
                    />
                    <Adjuntos
                      id="adjuntos-contacto"
                      label="Fotos, informe o ITE · opcional"
                      ficheros={ficheros}
                      onCambio={setFicheros}
                    />
                  </Tramo>

                  <div className="pt-2">
                    <CapaRgpd
                      id="contacto"
                      acepto={acepto}
                      onAcepto={(x) => {
                        setAcepto(x);
                        if (x) setErrorConsentimiento(undefined);
                      }}
                      error={errorConsentimiento}
                      refCasilla={casilla}
                      plazo={legal.plazoContacto}
                      texto={`He leído la información sobre protección de datos y consiento que ${site.legalName} trate mis datos para responder a esta solicitud.`}
                    />

                    <div className="mt-7">
                      <Faltan
                        campos={f.enviado ? f.faltan : []}
                        consentimiento={f.enviado && !acepto}
                        envio={errorEnvio}
                      />
                      <div className="grid sm:grid-cols-[1.4fr_1fr] gap-3">
                        <Boton
                          type="submit"
                          disabled={enviando}
                          className="w-full"
                        >
                          {enviando ? "Enviando…" : "Solicitar visita técnica"}
                          {!enviando && <ArrowRight size={17} aria-hidden />}
                        </Boton>
                        <Boton
                          onClick={porWhatsapp}
                          variante="contorno"
                          className="w-full"
                        >
                          <MessageCircle
                            size={17}
                            style={{ color: "var(--blue)" }}
                            aria-hidden
                          />
                          Enviar por WhatsApp
                        </Boton>
                      </div>
                      <p
                        className="text-t2 leading-snug mt-4"
                        style={{ color: "var(--ink-muted)" }}
                      >
                        Visita gratuita y presupuesto por escrito. Respondemos
                        en {site.responseTime} laborables.
                      </p>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
