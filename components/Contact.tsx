"use client";

import { ArrowRight, Check, Copy, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Boton, BotonEnlace } from "@/components/Boton";
import {
  Adjuntos,
  Area,
  Bloque,
  Cajetin,
  Campo,
  CapaRgpd,
  Faltan,
  Lamina,
  Opciones,
  useFormulario,
  useHoy,
} from "@/components/campos";
import { enviarPorServidor } from "@/lib/enviar";
import { legal } from "@/lib/legal";
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
  email: "",
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
    email: ["email-opcional", "el correo"],
  });
  const [acepto, setAcepto] = useState(false);
  const [errorConsentimiento, setErrorConsentimiento] = useState<string>();
  const [sent, setSent] = useState(false);
  const [comoFue, setComoFue] = useState<ComoFue>("correo");
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string>();
  const [ficheros, setFicheros] = useState<File[]>([]);
  const [copiado, setCopiado] = useState(false);
  const casilla = useRef<HTMLInputElement>(null);
  const hoy = useHoy();

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
      ["Email", v.email],
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
        email: v.email,
        perfil: v.perfil,
        "direccion o zona": v.zona,
        mensaje: v.mensaje,
        consentimiento: "aceptado",
      },
      ficheros,
    );
    setEnviando(false);
    if (salida === "enviado") {
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

  const porWhatsapp = () => {
    if (!guardia()) return;
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
      pie: "Te atiende quien sube al edificio.",
      href: `tel:${site.phone}`,
    },
    {
      rotulo: "WhatsApp",
      texto: "Enviar fotos del problema",
      pie: "En el ordenador se abre WhatsApp Web; también puedes leer el código de al lado con el móvil.",
      href: whatsappUrl("Hola, os escribo desde la web de MLN."),
      externo: true,
    },
    {
      rotulo: "Email",
      texto: site.email,
      pie: "Para proyectos, informes o especificaciones.",
      href: `mailto:${site.email}`,
    },
  ];

  return (
    <section
      id="contacto"
      className="py-24 lg:py-32"
      style={{ backgroundColor: "var(--white)" }}
    >
      <div className="pagina">
        <div className="grid lg:grid-cols-[0.78fr_1.22fr] gap-12 lg:gap-20">
          {/* Columna izquierda: en móvil va DESPUÉS del formulario, que es
              lo que la persona ha venido a buscar al pulsar el botón. */}
          <div className="order-2 lg:order-1">
            <div className="hidden lg:flex items-center gap-4 mb-8">
              <span
                className="w-10 h-px"
                style={{ backgroundColor: "var(--rule)" }}
              />
              <p className="eyebrow" style={{ color: "var(--ink-muted)" }}>
                Contacto
              </p>
            </div>

            <h2
              className="hidden lg:block h-display mb-7"
              style={{ fontSize: "var(--d-2)", color: "var(--ink)" }}
            >
              El primer paso
              <br />
              es subir a verlo.
            </h2>

            <p
              className="hidden lg:block text-t3 leading-[1.68] mb-5 max-w-[46ch]"
              style={{ color: "var(--ink-soft)" }}
            >
              Una visita técnica es exactamente eso: subimos, miramos el
              edificio de cerca y te decimos qué tiene, qué haríamos y cuánto
              cuesta. Por escrito, para que lo puedas llevar a una junta.
            </p>

            <p
              className="text-t3 leading-[1.6] mb-10 pl-4 border-l-2 max-w-[42ch]"
              style={{ color: "var(--ink-muted)", borderColor: "var(--blue)" }}
            >
              Contestamos en {site.responseTime} laborables. Si hay riesgo de
              desprendimiento o ha entrado agua, llama: intentamos verlo el
              mismo día.
            </p>

            <div className="grid lg:grid-cols-[minmax(0,1fr)_112px] gap-x-6 items-start">
              <div className="flex flex-col">
                {canales.map(({ rotulo, texto, pie, href, externo }) => (
                  <a
                    key={rotulo}
                    href={href}
                    {...(externo
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group grid grid-cols-[86px_minmax(0,1fr)_auto] items-baseline gap-4 py-5 border-t last:border-b"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <span
                      className="eyebrow"
                      style={{ color: "var(--ink-faint)" }}
                    >
                      {rotulo}
                    </span>
                    <span className="min-w-0">
                      <span
                        className="block text-t3 font-semibold break-words"
                        style={{ color: "var(--ink)" }}
                      >
                        {texto}
                      </span>
                      <span
                        className="block text-t2 leading-snug mt-1"
                        style={{ color: "var(--ink-muted)" }}
                      >
                        {pie}
                      </span>
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

              {/* El QR solo tiene sentido delante de un ordenador: quien lo ve
                  en el móvil ya tiene el enlace directo. Es un SVG estático
                  (el número no cambia), sin nada que generar en el navegador. */}
              <figure className="hidden lg:block m-0 pt-5">
                <Image
                  src="/qr-whatsapp.svg"
                  alt="Código QR que abre un chat de WhatsApp con MLN"
                  width={112}
                  height={112}
                  unoptimized
                  className="border"
                  style={{ borderColor: "var(--line)" }}
                />
                <figcaption
                  className="tecnico text-t1 mt-2 leading-snug"
                  style={{ color: "var(--ink-faint)" }}
                >
                  WHATSAPP
                  <br />
                  DESDE EL MÓVIL
                </figcaption>
              </figure>
            </div>

            <div
              className="pt-8 mt-10 border-t"
              style={{ borderColor: "var(--line)" }}
            >
              <p className="eyebrow mb-3" style={{ color: "var(--ink-faint)" }}>
                Zonas de trabajo
              </p>
              <p
                className="text-t2 leading-relaxed max-w-[46ch]"
                style={{ color: "var(--ink-muted)" }}
              >
                {site.areas.join(", ")}. Para otros municipios consultamos
                disponibilidad y desplazamiento antes de confirmar la visita.
              </p>
            </div>
          </div>

          {/* Formulario */}
          <div className="order-1 lg:order-2">
            <div className="lg:hidden flex items-center gap-4 mb-6">
              <span
                className="w-10 h-px"
                style={{ backgroundColor: "var(--rule)" }}
              />
              <p className="eyebrow" style={{ color: "var(--ink-muted)" }}>
                Contacto
              </p>
            </div>
            <h2
              className="lg:hidden h-display mb-3"
              style={{ fontSize: "var(--d-2)", color: "var(--ink)" }}
            >
              Solicita una visita técnica.
            </h2>
            <p
              className="lg:hidden text-t3 leading-[1.6] mb-8 max-w-[46ch]"
              style={{ color: "var(--ink-muted)" }}
            >
              Solo necesitamos un nombre y un teléfono. El resto nos ayuda a
              preparar la visita.
            </p>

            {sent ? (
              <div className="entra-acuse flex flex-col justify-center gap-5 py-6">
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
                    <Boton onClick={copiar} variante="contorno" medida="media">
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
                <Lamina
                  titulo="Solicitud de visita técnica"
                  referencia="MLN · VT / HOJA 01"
                >
                  {/* El contador cuenta SOLO los obligatorios: dos. */}
                  <Bloque
                    num="01"
                    titulo="Quién eres"
                    valores={[v.nombre, v.telefono]}
                  >
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
                      pista="Es por donde antes te localizamos."
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
                      pista="Opcional. Si lo indicas, te contestamos también por escrito."
                      valor={v.email}
                      onChange={f.pon("email")}
                      onBlur={f.toca("email")}
                      error={f.visible("email")}
                    />
                    <Opciones
                      nombre="perfil"
                      label="Escribes como"
                      opciones={perfiles}
                      valor={v.perfil}
                      onChange={f.pon("perfil")}
                      ancho
                    />
                  </Bloque>

                  <Bloque num="02" titulo="El edificio">
                    <Campo
                      id="zona"
                      label="Dirección o zona"
                      ancho
                      placeholder="Calle, barrio o municipio"
                      pista="Opcional. Con la calle sabemos qué tipo de edificio es antes de subir."
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
                      label="Fotos, informe o ITE"
                      pista="Opcional. Nos ayudan a preparar la visita."
                      ficheros={ficheros}
                      onCambio={setFicheros}
                    />
                  </Bloque>

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

                  <Cajetin
                    celdas={[
                      { rotulo: "Documento", valor: "Visita técnica" },
                      { rotulo: "Zona", valor: v.zona.trim() || "Madrid" },
                      { rotulo: "Fecha", valor: hoy || "—" },
                      { rotulo: "Respuesta", valor: site.responseTime },
                    ]}
                  >
                    <Faltan
                      campos={f.enviado ? f.faltan : []}
                      consentimiento={f.enviado && !acepto}
                      envio={errorEnvio}
                    />
                    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-5">
                      <Boton type="submit" disabled={enviando}>
                        {enviando ? "Enviando…" : "Solicitar visita técnica"}
                        {!enviando && <ArrowRight size={17} aria-hidden />}
                      </Boton>
                      <Boton onClick={porWhatsapp} variante="contorno">
                        <MessageCircle
                          size={17}
                          style={{ color: "var(--blue)" }}
                          aria-hidden
                        />
                        Enviar por WhatsApp
                      </Boton>
                      <p
                        className="text-t2 leading-snug max-w-[26ch] basis-full lg:basis-auto"
                        style={{ color: "var(--ink-muted)" }}
                      >
                        La visita técnica no se cobra, y de ella sale el
                        presupuesto por escrito.
                      </p>
                    </div>
                  </Cajetin>
                </Lamina>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
