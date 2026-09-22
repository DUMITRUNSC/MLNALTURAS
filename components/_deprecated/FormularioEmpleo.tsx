"use client";

import {
  ArrowRight,
  Check,
  Copy,
  MessageCircle,
  Paperclip,
} from "lucide-react";
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
  Selector,
  useFormulario,
  useHoy,
} from "@/components/campos";
import { enviarPorServidor } from "@/lib/enviar";
import { legal } from "@/lib/legal";
import { site, whatsappUrl } from "@/lib/site";

type Via = "trabajador" | "empresa";
type ComoFue = "servidor" | "correo" | "whatsapp";

const puestos = [
  "Oficial de trabajos verticales",
  "Ayudante o peón especialista",
  "Albañil o revestimientos",
  "Pintor",
  "Impermeabilizador",
  "Otro",
];

const formaciones = ["Sí, en vigor", "Caducada o en curso", "Todavía no"];

const actividades = [
  "Trabajos verticales",
  "Rehabilitación de fachadas",
  "Impermeabilización",
  "Cubiertas y tejados",
  "Pintura",
  "Limpieza técnica en altura",
  "Otra",
];

/** La columna de la izquierda habla a quien está en esa pestaña. */
const intro = {
  trabajador: {
    marcador: "Candidatura",
    titulo: "Lo que cuenta no es el currículum.",
    parrafos: [
      "Es una obra que podamos ir a ver y cómo te manejas cuando estás colgado. Cuéntanoslo en cuatro líneas y adjunta lo que tengas: certificados, fotos de trabajos, el nombre de la empresa con la que estuviste.",
      "Escríbenos aunque no veas nada abierto. La candidatura se guarda y la miramos cuando entra la siguiente obra que encaje.",
    ],
    nota: "Una persona lo lee. No hay filtro automático ni puntuación.",
  },
  empresa: {
    marcador: "Colaboración",
    titulo: "Buscamos equipos que vuelvan.",
    parrafos: [
      "Cuando el calendario aprieta trabajamos con gente de fuera, y repetimos con quien deja la obra limpia, avisa si algo no encaja y cumple el plazo que firmó.",
      "Dinos qué podéis asumir y dónde. Si podemos ir a ver una obra vuestra, mejor que cualquier catálogo.",
    ],
    nota: "El CIF, el seguro de responsabilidad civil y los certificados de altura los pedimos por correo cuando haya una obra concreta. Ahora no hace falta.",
  },
} as const;

const vacio = {
  // trabajador
  nombre: "",
  telefono: "",
  email: "",
  puesto: "",
  formacion: "",
  // empresa
  razon: "",
  contacto: "",
  actividad: "",
  zona: "",
  webRef: "",
  // común
  mensaje: "",
};

/* Obligatorio: lo mínimo para poder llamar. El correo es opcional en las dos
   vías: este perfil se comunica por teléfono y WhatsApp, y el currículum
   viaja adjunto o por WhatsApp. */
const reglas = {
  trabajador: {
    nombre: ["texto", "el nombre"],
    telefono: ["tel", "el teléfono"],
    email: ["email-opcional", "el correo"],
    puesto: ["elegir", "el puesto"],
  },
  empresa: {
    razon: ["texto", "el nombre de la empresa"],
    contacto: ["texto", "la persona de contacto"],
    telefono: ["tel", "el teléfono"],
    email: ["email-opcional", "el correo"],
    actividad: ["elegir", "la actividad"],
  },
} as const;

/**
 * Candidaturas y propuestas de colaboración.
 *
 * Dos formularios cortos: cinco datos el de trabajador, cinco el de empresa.
 * Antes eran tres bloques cada uno, con disponibilidad, carné, tamaño del
 * equipo y documentación adjunta (CIF, póliza, certificados) que nadie
 * rellenaba y que no hace falta hasta que hay una obra concreta.
 *
 * Nada se guarda en la web: el envío llega al correo (Resend, con adjuntos)
 * o sale por el correo del candidato o por WhatsApp, y el acuse dice cuál.
 */
export default function FormularioEmpleo() {
  const [via, setVia] = useState<Via>("trabajador");
  const [acepto, setAcepto] = useState(false);
  const [errorConsentimiento, setErrorConsentimiento] = useState<string>();
  const [enviado, setEnviado] = useState(false);
  const [comoFue, setComoFue] = useState<ComoFue>("correo");
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string>();
  const [ficheros, setFicheros] = useState<File[]>([]);
  const [copiado, setCopiado] = useState(false);
  const casilla = useRef<HTMLInputElement>(null);
  const hoy = useHoy();

  const f = useFormulario(vacio, reglas[via]);
  const v = f.valores;

  // Los enlaces de la página (#alta-empresa, #alta-trabajador) abren el
  // formulario ya en la vía que corresponde, también al volver con el botón
  // atrás o al pegar el enlace directo.
  useEffect(() => {
    const desdeHash = () => {
      const h = window.location.hash;
      if (h === "#alta-empresa") setVia("empresa");
      else if (h === "#alta-trabajador") setVia("trabajador");
    };
    desdeHash();
    window.addEventListener("hashchange", desdeHash);
    return () => window.removeEventListener("hashchange", desdeHash);
  }, []);

  /* Solo los campos rellenos: en WhatsApp las líneas «(sin indicar)» sobran. */
  const resumen = () => {
    const lineas: [string, string][] =
      via === "trabajador"
        ? [
            ["Nombre", v.nombre],
            ["Teléfono", v.telefono],
            ["Email", v.email],
            ["Puesto", v.puesto],
            ["Formación de altura en vigor", v.formacion],
          ]
        : [
            ["Empresa", v.razon],
            ["Persona de contacto", v.contacto],
            ["Teléfono", v.telefono],
            ["Email", v.email],
            ["Actividad", v.actividad],
            ["Zona", v.zona],
            ["Web o referencias", v.webRef],
          ];
    return [
      via === "trabajador"
        ? "Candidatura para trabajar en MLN"
        : "Propuesta de colaboración",
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
        : "Sin tu consentimiento no podemos guardar la candidatura.",
    );
    return f.revisar({ valido: okCasilla, foco: casilla.current });
  };

  const porCorreo = () => {
    const asunto =
      via === "trabajador"
        ? `Candidatura — ${v.puesto}`
        : `Colaboración — ${v.actividad}`;
    window.location.href = `mailto:${site.emailEmpleo}?subject=${encodeURIComponent(
      asunto,
    )}&body=${encodeURIComponent(resumen())}`;
    setComoFue("correo");
    setEnviado(true);
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guardia()) return;
    setEnviando(true);
    setErrorEnvio(undefined);
    const datos: Record<string, string> =
      via === "trabajador"
        ? {
            nombre: v.nombre,
            telefono: v.telefono,
            email: v.email,
            puesto: v.puesto,
            "formacion de altura en vigor": v.formacion,
            mensaje: v.mensaje,
            consentimiento: "aceptado",
          }
        : {
            empresa: v.razon,
            contacto: v.contacto,
            telefono: v.telefono,
            email: v.email,
            actividad: v.actividad,
            zona: v.zona,
            "web o referencias": v.webRef,
            mensaje: v.mensaje,
            consentimiento: "aceptado",
          };
    const salida = await enviarPorServidor(via, datos, ficheros);
    setEnviando(false);
    if (salida === "enviado") {
      setComoFue("servidor");
      setEnviado(true);
      return;
    }
    if (typeof salida === "object") {
      setErrorEnvio(salida.error);
      return;
    }
    porCorreo();
  };

  const porWhatsapp = () => {
    if (!guardia()) return;
    window.open(whatsappUrl(resumen()), "_blank", "noopener,noreferrer");
    setComoFue("whatsapp");
    setEnviado(true);
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

  if (enviado) {
    const conArchivos =
      ficheros.length === 0
        ? ""
        : ficheros.length === 1
          ? " con el archivo"
          : ` con los ${ficheros.length} archivos`;
    const acuse: Record<ComoFue, { titulo: string; texto: string }> = {
      servidor: {
        titulo:
          via === "trabajador" ? "Candidatura enviada." : "Propuesta enviada.",
        texto: `Nos ha llegado${conArchivos}. Lo lee una persona, no un filtro, y contestamos aunque en ese momento no haya nada abierto.${
          ficheros.length === 0 && via === "trabajador"
            ? " Si puedes, mándanos el currículum por WhatsApp: es lo que de verdad nos sirve."
            : ""
        }`,
      },
      whatsapp: {
        titulo: "Se ha abierto WhatsApp con tus datos.",
        texto: `Pulsa Enviar allí para que nos llegue${
          via === "trabajador"
            ? " y adjunta el currículum en el chat si lo tienes"
            : ""
        }. Si no se ha abierto nada, copia los datos y pégalos en WhatsApp, o llámanos.`,
      },
      correo: {
        titulo: "Se ha abierto tu correo con los datos.",
        texto:
          via === "trabajador"
            ? "Antes de darle a enviar, adjunta ahí tu currículum y los certificados de altura que tengas. Si no se ha abierto ningún programa de correo, copia los datos o mándanoslos por WhatsApp."
            : "Solo queda darle a enviar. Si no se ha abierto ningún programa de correo, copia los datos o mándanoslos por WhatsApp.",
      },
    };
    return (
      <div className="entra-acuse flex flex-col gap-6 py-4">
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
        {comoFue !== "servidor" && (
          <div className="flex flex-wrap gap-3">
            <BotonEnlace
              href={whatsappUrl(resumen())}
              target="_blank"
              rel="noopener noreferrer"
              medida="media"
            >
              <MessageCircle size={17} aria-hidden />
              {comoFue === "whatsapp"
                ? "Abrir WhatsApp otra vez"
                : "Mandarlo por WhatsApp"}
            </BotonEnlace>
            <Boton onClick={copiar} variante="contorno" medida="media">
              <Copy size={16} aria-hidden />
              {copiado ? "Datos copiados" : "Copiar los datos"}
            </Boton>
          </div>
        )}
        <p
          className="text-t3 leading-relaxed"
          style={{ color: "var(--ink-muted)" }}
        >
          También puedes escribirnos a{" "}
          <a
            href={`mailto:${site.emailEmpleo}`}
            className="font-semibold"
            style={{ color: "var(--blue)" }}
          >
            {site.emailEmpleo}
          </a>{" "}
          o llamar al{" "}
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
          Volver al formulario
        </button>
      </div>
    );
  }

  const t = intro[via];

  return (
    <div className="grid lg:grid-cols-[0.82fr_1.18fr] gap-12 lg:gap-16">
      {/* Anclas de la página: abren el formulario ya en la vía correcta */}
      <span id="alta-trabajador" className="block scroll-mt-28" aria-hidden />
      <span id="alta-empresa" className="block scroll-mt-28" aria-hidden />

      {/* Columna izquierda: cambia con la pestaña */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="flex items-center gap-4 mb-8">
          <span
            className="w-10 h-px"
            style={{ backgroundColor: "var(--rule)" }}
          />
          <p className="eyebrow" style={{ color: "var(--ink-muted)" }}>
            {t.marcador}
          </p>
        </div>
        <h2
          className="h-display mb-7"
          style={{ fontSize: "var(--d-2)", color: "var(--ink)" }}
        >
          {t.titulo}
        </h2>
        {t.parrafos.map((linea) => (
          <p
            key={linea.slice(0, 24)}
            className="text-t3 leading-[1.68] mb-5 max-w-[46ch]"
            style={{ color: "var(--ink-soft)" }}
          >
            {linea}
          </p>
        ))}
        <p
          className="text-t3 leading-[1.6] mt-7 pl-4 border-l-2 max-w-[42ch]"
          style={{ color: "var(--ink-muted)", borderColor: "var(--blue)" }}
        >
          {t.nota}
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
                rotulo: "Email",
                texto: site.emailEmpleo,
                href: `mailto:${site.emailEmpleo}`,
              },
              {
                rotulo: "Teléfono",
                texto: site.phoneDisplay,
                href: `tel:${site.phone}`,
              },
            ].map((c) => (
              <a
                key={c.rotulo}
                href={c.href}
                className="group grid grid-cols-[86px_minmax(0,1fr)_auto] items-baseline gap-4 py-4 border-t last:border-b"
                style={{ borderColor: "var(--line)" }}
              >
                <span className="eyebrow" style={{ color: "var(--ink-muted)" }}>
                  {c.rotulo}
                </span>
                <span
                  className="text-t3 font-semibold break-words"
                  style={{ color: "var(--ink)" }}
                >
                  {c.texto}
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

      {/* Columna derecha: pestañas de archivo + lámina */}
      <div>
        <div
          className="flex flex-col sm:flex-row gap-0 -mb-px relative z-10"
          role="tablist"
          aria-label="Tipo de solicitud"
        >
          {(
            [
              {
                id: "trabajador",
                nota: "01",
                label: "Quiero trabajar en MLN",
                pie: "En plantilla",
              },
              {
                id: "empresa",
                nota: "02",
                label: "Somos empresa o autónomo",
                pie: "Colaboradores",
              },
            ] as const
          ).map((p) => {
            const activo = via === p.id;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={activo}
                onClick={() => setVia(p.id)}
                className="flex-1 flex flex-col justify-center gap-1 px-5 py-4 text-left transicion-color duration-200"
                style={{
                  backgroundColor: activo ? "var(--white)" : "transparent",
                  borderTop: `3px solid ${activo ? "var(--blue)" : "var(--rule)"}`,
                  borderLeft: `1px solid ${activo ? "var(--rule)" : "transparent"}`,
                  borderRight: `1px solid ${activo ? "var(--rule)" : "transparent"}`,
                  borderBottom: activo
                    ? "1px solid var(--white)"
                    : "1px solid var(--rule)",
                }}
              >
                <span className="flex items-baseline gap-3">
                  <span
                    className="tecnico text-t1 font-semibold"
                    style={{
                      color: activo ? "var(--blue)" : "var(--ink-muted)",
                    }}
                  >
                    {p.nota}
                  </span>
                  <span
                    className="text-t3 font-semibold tracking-[-0.01em]"
                    style={{
                      color: activo ? "var(--ink)" : "var(--ink-muted)",
                    }}
                  >
                    {p.label}
                  </span>
                </span>
                <span
                  className="eyebrow pl-[26px]"
                  style={{ color: activo ? "var(--blue)" : "var(--ink-muted)" }}
                >
                  {p.pie}
                </span>
              </button>
            );
          })}
        </div>

        <form onSubmit={enviar} noValidate>
          <Lamina
            titulo={
              via === "trabajador" ? "Candidatura" : "Propuesta de colaboración"
            }
            referencia={
              via === "trabajador"
                ? "MLN · CAND / HOJA 01"
                : "MLN · COLAB / HOJA 01"
            }
            marcasArriba={false}
          >
            {via === "trabajador" ? (
              <>
                {/* El contador cuenta solo los obligatorios. */}
                <Bloque
                  num="01"
                  titulo="Quién eres"
                  valores={[v.nombre, v.telefono, v.puesto]}
                >
                  <Campo
                    id="nombre"
                    label="Nombre y apellidos"
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
                  <Selector
                    id="puesto"
                    label="Puesto"
                    obligatorio
                    ancho
                    opciones={puestos}
                    valor={v.puesto}
                    onChange={f.pon("puesto")}
                    onBlur={f.toca("puesto")}
                    error={f.visible("puesto")}
                  />
                  <Opciones
                    nombre="formacion"
                    label="¿Tienes formación de trabajos en altura?"
                    opciones={formaciones}
                    valor={v.formacion}
                    onChange={f.pon("formacion")}
                    ancho
                  />
                </Bloque>

                <Bloque num="02" titulo="Lo que has hecho">
                  <Area
                    id="mensaje"
                    label="Cuéntanos qué has hecho en altura"
                    placeholder="Obras, empresas con las que has estado, qué sabes hacer colgado…"
                    valor={v.mensaje}
                    onChange={f.pon("mensaje")}
                  />
                  <Adjuntos
                    id="adjuntos-empleo"
                    label="Currículum y certificados"
                    pista="Opcional. Si no lo tienes a mano, mándalo después por WhatsApp."
                    ficheros={ficheros}
                    onCambio={setFicheros}
                  />
                </Bloque>
              </>
            ) : (
              <>
                <Bloque
                  num="01"
                  titulo="La empresa"
                  valores={[v.razon, v.contacto, v.telefono, v.actividad]}
                >
                  <Campo
                    id="razon"
                    label="Nombre de la empresa o del autónomo"
                    obligatorio
                    ancho
                    autoComplete="organization"
                    valor={v.razon}
                    onChange={f.pon("razon")}
                    onBlur={f.toca("razon")}
                    error={f.visible("razon")}
                  />
                  <Campo
                    id="contacto"
                    label="Persona de contacto"
                    obligatorio
                    autoComplete="name"
                    valor={v.contacto}
                    onChange={f.pon("contacto")}
                    onBlur={f.toca("contacto")}
                    error={f.visible("contacto")}
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
                  <Selector
                    id="actividad"
                    label="Qué hacéis"
                    obligatorio
                    opciones={actividades}
                    valor={v.actividad}
                    onChange={f.pon("actividad")}
                    onBlur={f.toca("actividad")}
                    error={f.visible("actividad")}
                  />
                </Bloque>

                <Bloque num="02" titulo="Dónde y qué">
                  <Campo
                    id="zona"
                    label="Zona en la que trabajáis"
                    placeholder="Madrid y alrededores, toda la Comunidad…"
                    valor={v.zona}
                    onChange={f.pon("zona")}
                  />
                  <Campo
                    id="webRef"
                    label="Web o referencias"
                    placeholder="Una web, un perfil o una obra que podamos ver"
                    valor={v.webRef}
                    onChange={f.pon("webRef")}
                  />
                  <Area
                    id="mensaje"
                    label="Qué podéis asumir con nosotros"
                    placeholder="Obra completa, apoyo puntual, qué equipos tenéis, qué habéis hecho…"
                    valor={v.mensaje}
                    onChange={f.pon("mensaje")}
                  />
                </Bloque>
              </>
            )}

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
              texto={`He leído la información sobre protección de datos y consiento que ${site.legalName} trate mis datos y mi documentación para valorar ${via === "trabajador" ? "mi candidatura" : "esta propuesta"}.`}
            />

            <Cajetin
              celdas={[
                {
                  rotulo: "Documento",
                  valor: via === "trabajador" ? "Candidatura" : "Colaboración",
                },
                {
                  rotulo: via === "trabajador" ? "Puesto" : "Actividad",
                  valor: (via === "trabajador" ? v.puesto : v.actividad) || "—",
                },
                { rotulo: "Fecha", valor: hoy || "—" },
                { rotulo: "Conservación", valor: "24 meses" },
              ]}
            >
              <Faltan
                campos={f.enviado ? f.faltan : []}
                consentimiento={f.enviado && !acepto}
                envio={errorEnvio}
              />
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-5">
                <Boton type="submit" disabled={enviando}>
                  {enviando
                    ? "Enviando…"
                    : `Enviar ${via === "trabajador" ? "candidatura" : "propuesta"}`}
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
                {via === "trabajador" && (
                  <p
                    className="flex items-start gap-2 text-t2 leading-snug max-w-[28ch] basis-full lg:basis-auto"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    <Paperclip
                      size={14}
                      aria-hidden
                      style={{ color: "var(--blue)" }}
                      className="shrink-0 mt-[3px]"
                    />
                    {ficheros.length > 0
                      ? `${ficheros.length === 1 ? "1 archivo se envía" : `${ficheros.length} archivos se envían`} con el formulario.`
                      : "Puedes adjuntar el currículum arriba."}
                  </p>
                )}
              </div>
            </Cajetin>
          </Lamina>
        </form>
      </div>
    </div>
  );
}
