/**
 * biome-ignore-all lint/a11y/noNoninteractiveElementToInteractiveRole: el patrón combobox de la WAI-ARIA APG pide <ul role="listbox"> con <li role="option">
 * biome-ignore-all lint/a11y/useKeyWithClickEvents: el teclado lo gobierna el listbox con aria-activedescendant, no cada opción
 * biome-ignore-all lint/a11y/useFocusableInteractive: en ese patrón el foco no salta a la opción, se queda en el listbox
 */
"use client";

import { Check, ChevronDown, Paperclip, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { primeraCapa } from "@/lib/legal";

/* ------------------------------------------------------------------ *
 * Campos de los tres formularios: cliente, trabajador y empresa.
 *
 * Nada de controles por defecto del navegador: el desplegable, la
 * casilla y las opciones están dibujados aquí. Y cada campo tiene
 * cuatro estados que se distinguen a simple vista:
 *
 *   vacío    filete gris medio  (#868FA0 · 3,3:1)
 *   relleno  filete tinta       (#2A303B · 13:1)   ← ya está hecho
 *   foco     filete azul 2px + halo
 *   error    filete rojo 2px + mensaje
 * ------------------------------------------------------------------ */

export const ROJO = "var(--rojo)";
const BORDE_VACIO = "var(--numero)";
const BORDE_HECHO = "var(--ink-soft)";

type Regla = "texto" | "tel" | "email" | "email-opcional" | "elegir";
export type Reglas = Record<string, readonly [Regla, string]>;

function marco(relleno: boolean, error?: string, foco?: boolean) {
  const base = { backgroundColor: "var(--campo-fondo)" };
  if (error) return { ...base, borderColor: ROJO, borderWidth: 2 };
  if (foco)
    return {
      ...base,
      backgroundColor: "var(--campo-foco)",
      borderColor: "var(--blue)",
      borderWidth: 2,
      boxShadow: "0 0 0 3px var(--halo-foco)",
    };
  return {
    ...base,
    borderColor: relleno ? BORDE_HECHO : BORDE_VACIO,
    borderWidth: relleno ? 1.5 : 1.25,
  };
}

const cajaBase =
  "w-full min-w-0 h-[52px] px-3.5 text-t4 text-left outline-none border-solid transition-[border-color,box-shadow] duration-150";

/* ----------------------------- lámina ----------------------------- */

/**
 * El formulario va dentro de una lámina: marco de filete y marcas de
 * esquina, como una hoja de plano. El marco no es adorno — delimita el
 * documento y separa los campos del resto de la página.
 */
export function Lamina({
  referencia,
  titulo,
  marcasArriba = true,
  children,
}: {
  referencia: string;
  titulo: string;
  /** Con pestañas encima, las marcas de arriba estorban la unión. */
  marcasArriba?: boolean;
  children: React.ReactNode;
}) {
  const esquinas = (
    [
      ["top-0 left-0", "border-t-2 border-l-2"],
      ["top-0 right-0", "border-t-2 border-r-2"],
      ["bottom-0 left-0", "border-b-2 border-l-2"],
      ["bottom-0 right-0", "border-b-2 border-r-2"],
    ] as const
  ).filter(([sitio]) => marcasArriba || !sitio.startsWith("top"));

  return (
    <div className="relative">
      {/* marcas de esquina */}
      {esquinas.map(([sitio, lados]) => (
        <span
          key={sitio}
          className={`absolute ${sitio} ${lados} w-4 h-4 z-10`}
          style={{ borderColor: "var(--blue)" }}
          aria-hidden
        />
      ))}

      <div
        className="border px-5 sm:px-8 lg:px-10 pt-7 pb-8"
        style={{ borderColor: "var(--rule)", backgroundColor: "var(--white)" }}
      >
        {/* encabezado de la lámina */}
        <div
          className="flex items-baseline justify-between gap-6 pb-6 mb-2 border-b"
          style={{ borderColor: "var(--line)" }}
        >
          <p className="eyebrow" style={{ color: "var(--ink-soft)" }}>
            {titulo}
          </p>
          <p
            className="tecnico text-t1 font-semibold whitespace-nowrap"
            style={{ color: "var(--ink-muted)" }}
          >
            {referencia}
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}

/* ----------------------------- cajetín ---------------------------- */

/** Cierre de la lámina: rótulo de datos y acciones, como un cajetín. */
export function Cajetin({
  celdas,
  children,
}: {
  celdas: readonly { rotulo: string; valor: string }[];
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8 border-t" style={{ borderColor: "var(--ink-soft)" }}>
      <dl className="grid grid-cols-2 lg:grid-cols-4">
        {celdas.map((c, i) => (
          <div
            key={c.rotulo}
            className={`py-3.5 px-4 first:pl-0 border-b lg:border-b-0 ${
              i > 0 ? "border-l" : ""
            }`}
            style={{ borderColor: "var(--line)" }}
          >
            <dt className="eyebrow mb-1" style={{ color: "var(--ink-muted)" }}>
              {c.rotulo}
            </dt>
            <dd
              className="text-t2 font-semibold m-0 tabular-nums"
              style={{ color: "var(--ink)" }}
            >
              {c.valor}
            </dd>
          </div>
        ))}
      </dl>
      <div className="pt-7 border-t" style={{ borderColor: "var(--line)" }}>
        {children}
      </div>
    </div>
  );
}

/** La fecha del día, puesta después de montar para no descuadrar el HTML. */
export function useHoy() {
  const [hoy, setHoy] = useState("");
  useEffect(() => {
    setHoy(
      new Intl.DateTimeFormat("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(new Date()),
    );
  }, []);
  return hoy;
}

/* ------------------------------ bloque ---------------------------- */

/**
 * Bloque numerado. El marcador de la izquierda lleva la cuenta de lo que
 * llevas hecho dentro, para que el formulario se pueda leer como una
 * lista de comprobación mientras lo rellenas.
 */
export function Bloque({
  num,
  titulo,
  valores,
  children,
}: {
  num: string;
  titulo: string;
  valores?: readonly string[];
  children: React.ReactNode;
}) {
  const total = valores?.length ?? 0;
  const hechos = valores?.filter((v) => v.trim() !== "").length ?? 0;
  const completo = total > 0 && hechos === total;
  const parte = total > 0 ? hechos / total : 0;

  return (
    <fieldset className="relative grid lg:grid-cols-[152px_minmax(0,1fr)] gap-x-9 gap-y-6 pt-8 pb-10">
      <legend className="sr-only">{titulo}</legend>

      {/* Riel de cotas: la línea sigue de bloque en bloque y se pinta de
          azul en la parte que llevas hecha. */}
      <span
        className="hidden lg:block absolute left-0 top-0 bottom-0 w-px"
        style={{ backgroundColor: "var(--line)" }}
        aria-hidden
      />
      <span
        className="hidden lg:block absolute left-0 top-0 w-px transition-[height] duration-500"
        style={{
          backgroundColor: "var(--blue-fill)",
          height: `${parte * 100}%`,
        }}
        aria-hidden
      />
      <span
        className="hidden lg:block absolute left-0 top-8 w-[9px] h-px"
        style={{ backgroundColor: completo ? "var(--blue)" : "var(--rule)" }}
        aria-hidden
      />

      <div className="flex lg:flex-col items-center lg:items-start gap-4 lg:gap-0 lg:pl-6">
        <span
          className="h-display leading-none tabular-nums"
          style={{
            fontSize: "var(--n-1)",
            color: completo ? "var(--blue)" : "var(--numero)",
          }}
          aria-hidden
        >
          {num}
        </span>
        <span className="eyebrow lg:mt-3" style={{ color: "var(--ink-soft)" }}>
          {titulo}
        </span>

        {total > 0 && (
          <span className="flex items-center gap-2 lg:mt-4">
            <span className="sr-only">
              {hechos} de {total} datos completados
            </span>
            <span
              className="w-[16px] h-[16px] flex items-center justify-center border"
              style={{
                borderColor: completo ? "var(--blue)" : "var(--numero)",
                backgroundColor: completo ? "var(--blue)" : "transparent",
                borderWidth: 1.5,
              }}
              aria-hidden
            >
              {completo && (
                <Check
                  size={11}
                  strokeWidth={3}
                  style={{ color: "var(--white)" }}
                />
              )}
            </span>
            <span
              className="tecnico text-t1 font-semibold"
              style={{ color: completo ? "var(--blue)" : "var(--ink-muted)" }}
              aria-hidden
            >
              {hechos}/{total}
            </span>
          </span>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-7">{children}</div>
    </fieldset>
  );
}

/* ------------------------------ rótulos --------------------------- */

function Rotulo({
  label,
  obligatorio,
  foco,
  error,
}: {
  label: string;
  obligatorio?: boolean;
  foco?: boolean;
  error?: string;
}) {
  return (
    <span
      className="eyebrow transicion-color duration-150"
      style={{ color: error ? ROJO : foco ? "var(--blue)" : "var(--ink-soft)" }}
    >
      {label}
      {obligatorio && (
        <span style={{ color: "var(--blue)" }} aria-hidden>
          {" "}
          *
        </span>
      )}
    </span>
  );
}

function Pie({
  id,
  error,
  pista,
}: {
  id: string;
  error?: string;
  pista?: string;
}) {
  if (error)
    return (
      <span
        id={`${id}-error`}
        role="alert"
        className="flex items-start gap-1.5 text-t2 leading-snug font-medium"
        style={{ color: ROJO }}
      >
        <span aria-hidden>·</span>
        {error}
      </span>
    );
  if (pista)
    return (
      <span
        id={`${id}-pista`}
        className="text-t2 leading-snug"
        style={{ color: "var(--ink-muted)" }}
      >
        {pista}
      </span>
    );
  return null;
}

type Comun = {
  id: string;
  label: string;
  valor: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  obligatorio?: boolean;
  error?: string;
  pista?: string;
  ancho?: boolean;
};

/* ------------------------------- texto ---------------------------- */

export function Campo({
  id,
  label,
  valor,
  onChange,
  onBlur,
  obligatorio,
  error,
  pista,
  ancho,
  tipo = "text",
  autoComplete,
  inputMode,
  placeholder,
}: Comun & {
  tipo?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  placeholder?: string;
}) {
  const [foco, setFoco] = useState(false);
  const relleno = valor.trim() !== "";

  return (
    <label
      htmlFor={id}
      className={`flex flex-col gap-2 min-w-0 self-start ${ancho ? "sm:col-span-2" : ""}`}
    >
      <Rotulo
        label={label}
        obligatorio={obligatorio}
        foco={foco}
        error={error}
      />
      <input
        id={id}
        type={tipo}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFoco(true)}
        onBlur={() => {
          setFoco(false);
          onBlur?.();
        }}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          error ? `${id}-error` : pista ? `${id}-pista` : undefined
        }
        className={`${cajaBase} campo-mln`}
        style={{ color: "var(--ink)", ...marco(relleno, error, foco) }}
      />
      <Pie id={id} error={error} pista={pista} />
    </label>
  );
}

/* ------------------------- texto de varias líneas ------------------ */

export function Area({
  id,
  label,
  valor,
  onChange,
  onBlur,
  obligatorio,
  error,
  pista,
  placeholder,
}: Comun & { placeholder?: string }) {
  const [foco, setFoco] = useState(false);
  const caja = useRef<HTMLTextAreaElement>(null);
  const relleno = valor.trim() !== "";

  // Crece con el texto: sin la esquinita de arrastre del navegador.
  // biome-ignore lint/correctness/useExhaustiveDependencies: «valor» es el disparador, aunque el efecto lea el alto del propio nodo
  useEffect(() => {
    const el = caja.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(120, el.scrollHeight)}px`;
  }, [valor]);

  return (
    <label htmlFor={id} className="flex flex-col gap-2 min-w-0 sm:col-span-2">
      <Rotulo
        label={label}
        obligatorio={obligatorio}
        foco={foco}
        error={error}
      />
      <textarea
        ref={caja}
        id={id}
        rows={4}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFoco(true)}
        onBlur={() => {
          setFoco(false);
          onBlur?.();
        }}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          error ? `${id}-error` : pista ? `${id}-pista` : undefined
        }
        className="campo-mln w-full min-w-0 px-3.5 py-3 text-t4 leading-[1.6] outline-none border-solid resize-none overflow-hidden transition-[border-color,box-shadow] duration-150"
        style={{
          color: "var(--ink)",
          minHeight: 120,
          ...marco(relleno, error, foco),
        }}
      />
      <Pie id={id} error={error} pista={pista} />
    </label>
  );
}

/* -------------------------- adjuntos ------------------------------ */

export const ADJUNTO_MAX = 3 * 1024 * 1024;
export const ADJUNTO_TOTAL = 4 * 1024 * 1024;
export const ADJUNTO_CUANTOS = 6;
const ADJUNTO_TIPOS = ".pdf,.jpg,.jpeg,.png,.heic,.doc,.docx";

function pesa(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`;
}

/**
 * Adjuntos. El campo de archivo del navegador no se puede diseñar y encima
 * cambia de idioma con el sistema operativo, así que el <input> va oculto y
 * lo que se ve es una zona de lámina con su botón y la lista de lo elegido,
 * numerada como el resto del formulario. Se puede soltar encima.
 *
 * Los límites (3 MB por archivo, 4 MB en total) no son un capricho: las
 * funciones de Vercel rechazan las peticiones de más de 4,5 MB, así que más
 * arriba el envío fallaría sin poder explicar por qué.
 */
export function Adjuntos({
  id,
  label,
  pista,
  ficheros,
  onCambio,
}: {
  id: string;
  label: string;
  pista?: string;
  ficheros: File[];
  onCambio: (f: File[]) => void;
}) {
  const entrada = useRef<HTMLInputElement>(null);
  const [encima, setEncima] = useState(false);
  const [error, setError] = useState<string>();

  const suma = ficheros.reduce((t, f) => t + f.size, 0);

  const admite = (nuevos: File[]) => {
    const juntos = [...ficheros];
    let aviso: string | undefined;
    for (const f of nuevos) {
      if (juntos.length >= ADJUNTO_CUANTOS) {
        aviso = `Como mucho ${ADJUNTO_CUANTOS} archivos.`;
        break;
      }
      if (f.size > ADJUNTO_MAX) {
        aviso = `«${f.name}» pasa de 3 MB. Comprímelo o mándalo por WhatsApp.`;
        continue;
      }
      if (juntos.some((y) => y.name === f.name && y.size === f.size)) continue;
      if (juntos.reduce((t, y) => t + y.size, 0) + f.size > ADJUNTO_TOTAL) {
        aviso = "Entre todos no pueden pasar de 4 MB.";
        continue;
      }
      juntos.push(f);
    }
    setError(aviso);
    onCambio(juntos);
  };

  const quitar = (f: File) => {
    setError(undefined);
    onCambio(ficheros.filter((x) => x !== f));
  };

  return (
    <div className="flex flex-col gap-2 min-w-0 sm:col-span-2">
      {/* El <input type=file> va oculto, así que su rótulo tiene que ser una
          etiqueta de verdad apuntando a él: si no, el lector de pantalla
          anuncia «examinar» y nada más. */}
      <label htmlFor={id}>
        <Rotulo label={label} error={error} />
      </label>

      {/* biome-ignore lint/a11y/noStaticElementInteractions: soltar archivos es un atajo de ratón; el camino accesible es el botón de dentro, que sí es un <button> */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setEncima(true);
        }}
        onDragLeave={() => setEncima(false)}
        onDrop={(e) => {
          e.preventDefault();
          setEncima(false);
          admite([...e.dataTransfer.files]);
        }}
        className="flex flex-wrap items-center gap-x-5 gap-y-3 px-4 py-4 border-dashed transition-[border-color,background-color] duration-150"
        style={{
          borderWidth: encima ? 2 : 1.25,
          borderColor: error
            ? ROJO
            : encima
              ? "var(--blue)"
              : ficheros.length > 0
                ? BORDE_HECHO
                : BORDE_VACIO,
          backgroundColor: encima ? "var(--blue-soft)" : "var(--campo-fondo)",
        }}
      >
        <input
          ref={entrada}
          id={id}
          type="file"
          multiple
          accept={ADJUNTO_TIPOS}
          className="sr-only"
          onChange={(e) => {
            admite([...(e.target.files ?? [])]);
            // Permite volver a elegir el mismo archivo después de quitarlo.
            e.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => entrada.current?.click()}
          className="inline-flex items-center gap-2 h-11 px-5 text-t3 font-semibold border transicion-color duration-150"
          style={{ borderColor: "var(--ink-soft)", color: "var(--ink)" }}
        >
          <Paperclip size={15} aria-hidden />
          {ficheros.length > 0 ? "Añadir más" : "Elegir archivos"}
        </button>
        <p
          className="text-t2 leading-snug"
          style={{ color: "var(--ink-muted)" }}
        >
          o suéltalos aquí. PDF, imagen o Word. Hasta 3 MB cada uno y 4 MB en
          total.
        </p>
      </div>

      {ficheros.length > 0 && (
        <ul className="flex flex-col" aria-live="polite">
          {ficheros.map((f, i) => (
            <li
              key={`${f.name}-${f.size}`}
              className="grid grid-cols-[26px_minmax(0,1fr)_auto_auto] items-center gap-x-3 py-2.5 border-b"
              style={{ borderColor: "var(--line-soft)" }}
            >
              <span
                className="tecnico text-t1 font-semibold"
                style={{ color: "var(--ink-faint)" }}
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className="text-t3 truncate"
                style={{ color: "var(--ink)" }}
                title={f.name}
              >
                {f.name}
              </span>
              <span
                className="tecnico text-t1 whitespace-nowrap"
                style={{ color: "var(--ink-muted)" }}
              >
                {pesa(f.size)}
              </span>
              <button
                type="button"
                onClick={() => quitar(f)}
                className="inline-flex items-center justify-center h-8 w-8 transicion-color duration-150"
                style={{ color: "var(--ink-muted)" }}
                aria-label={`Quitar ${f.name}`}
              >
                <X size={16} aria-hidden />
              </button>
            </li>
          ))}
          <li
            className="flex items-baseline justify-between gap-4 pt-2.5 text-t2"
            style={{ color: "var(--ink-muted)" }}
          >
            <span>
              {ficheros.length} de {ADJUNTO_CUANTOS} archivos
            </span>
            <span className="tecnico text-t1">{pesa(suma)} / 4,0 MB</span>
          </li>
        </ul>
      )}

      <Pie id={id} error={error} pista={pista} />
    </div>
  );
}

/* ----------------------- desplegable propio ----------------------- */

/**
 * Lista desplegable dibujada a mano: el desplegable del sistema no se
 * puede diseñar y en cada navegador se ve distinto.
 * Teclado: Enter o flechas para abrir, flechas para moverse, Enter para
 * elegir, Escape para cerrar.
 */
export function Selector({
  id,
  label,
  valor,
  onChange,
  onBlur,
  obligatorio,
  error,
  pista,
  ancho,
  opciones,
  vacio = "Sin elegir",
}: Comun & { opciones: readonly string[]; vacio?: string }) {
  const [abierto, setAbierto] = useState(false);
  const [foco, setFoco] = useState(false);
  const [activo, setActivo] = useState(0);
  const caja = useRef<HTMLDivElement>(null);
  const boton = useRef<HTMLButtonElement>(null);
  const lista = useRef<HTMLUListElement>(null);
  const relleno = valor.trim() !== "";
  const idLista = `${id}-lista`;

  useEffect(() => {
    if (!abierto) return;
    const fuera = (e: MouseEvent) => {
      if (caja.current && !caja.current.contains(e.target as Node)) {
        setAbierto(false);
        onBlur?.();
      }
    };
    document.addEventListener("mousedown", fuera);
    return () => document.removeEventListener("mousedown", fuera);
  }, [abierto, onBlur]);

  useEffect(() => {
    if (abierto) {
      setActivo(Math.max(0, opciones.indexOf(valor)));
      lista.current?.focus();
    }
  }, [abierto, opciones, valor]);

  const elegir = (o: string) => {
    onChange(o);
    setAbierto(false);
    boton.current?.focus();
    onBlur?.();
  };

  const teclas = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setAbierto(false);
      boton.current?.focus();
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setActivo((i) => {
        const n = e.key === "ArrowDown" ? i + 1 : i - 1;
        return (n + opciones.length) % opciones.length;
      });
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      setActivo(0);
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      setActivo(opciones.length - 1);
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      elegir(opciones[activo]);
    }
  };

  return (
    <div
      ref={caja}
      className={`flex flex-col gap-2 min-w-0 self-start relative ${ancho ? "sm:col-span-2" : ""}`}
    >
      <label htmlFor={id} className="cursor-pointer w-fit">
        <Rotulo
          label={label}
          obligatorio={obligatorio}
          foco={foco || abierto}
          error={error}
        />
      </label>

      <button
        ref={boton}
        id={id}
        type="button"
        role="combobox"
        aria-expanded={abierto}
        aria-controls={idLista}
        aria-haspopup="listbox"
        aria-invalid={error ? true : undefined}
        aria-describedby={
          error ? `${id}-error` : pista ? `${id}-pista` : undefined
        }
        onClick={() => setAbierto(!abierto)}
        onFocus={() => setFoco(true)}
        onBlur={() => setFoco(false)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setAbierto(true);
          }
        }}
        className={`${cajaBase} flex items-center justify-between gap-3 cursor-pointer`}
        style={{
          color: relleno ? "var(--ink)" : "var(--ink-muted)",
          ...marco(relleno, error, foco || abierto),
        }}
      >
        <span className="truncate">{relleno ? valor : vacio}</span>
        <ChevronDown
          size={16}
          aria-hidden
          className="shrink-0 transition-transform duration-200"
          style={{
            color: abierto ? "var(--blue)" : "var(--ink-muted)",
            transform: abierto ? "rotate(180deg)" : "none",
          }}
        />
      </button>

      {abierto && (
        <ul
          ref={lista}
          id={idLista}
          role="listbox"
          aria-label={label}
          tabIndex={-1}
          onKeyDown={teclas}
          aria-activedescendant={`${id}-o${activo}`}
          className="absolute z-30 top-full left-0 right-0 mt-1 max-h-[268px] overflow-y-auto outline-none"
          style={{
            backgroundColor: "var(--campo-fondo)",
            border: "1.5px solid var(--ink-soft)",
            boxShadow: "var(--sombra-panel)",
          }}
        >
          {opciones.map((o, i) => {
            const elegido = o === valor;
            const sobre = i === activo;
            return (
              <li
                key={o}
                id={`${id}-o${i}`}
                role="option"
                aria-selected={elegido}
                onMouseEnter={() => setActivo(i)}
                onClick={() => elegir(o)}
                className="relative flex items-center gap-3 px-3.5 py-3 text-t3 cursor-pointer border-b last:border-b-0"
                style={{
                  borderColor: "var(--line-soft)",
                  backgroundColor: sobre ? "var(--blue-soft)" : "transparent",
                  color: "var(--ink)",
                  fontWeight: elegido ? 600 : 400,
                }}
              >
                <span
                  className="absolute left-0 top-0 bottom-0 w-[3px]"
                  style={{
                    backgroundColor: elegido ? "var(--blue)" : "transparent",
                  }}
                  aria-hidden
                />
                {o}
                {elegido && (
                  <Check
                    size={15}
                    strokeWidth={2.5}
                    aria-hidden
                    className="ml-auto shrink-0"
                    style={{ color: "var(--blue)" }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}

      <Pie id={id} error={error} pista={pista} />
    </div>
  );
}

/* --------------------- opciones a la vista ------------------------ */

/** Pocas opciones: rectángulos, sin redondeos ni radios del sistema. */
export function Opciones({
  nombre,
  label,
  valor,
  onChange,
  opciones,
  obligatorio,
  error,
  ancho,
}: {
  nombre: string;
  label: string;
  valor: string;
  onChange: (v: string) => void;
  opciones: readonly string[];
  obligatorio?: boolean;
  error?: string;
  ancho?: boolean;
}) {
  return (
    <fieldset
      className={`flex flex-col gap-2.5 min-w-0 self-start ${ancho ? "sm:col-span-2" : ""}`}
    >
      <legend
        className="eyebrow mb-1"
        style={{ color: error ? ROJO : "var(--ink-soft)" }}
      >
        {label}
        {obligatorio && (
          <span style={{ color: "var(--blue)" }} aria-hidden>
            {" "}
            *
          </span>
        )}
      </legend>
      {error && (
        <span
          role="alert"
          className="text-t2 font-medium"
          style={{ color: ROJO }}
        >
          {error}
        </span>
      )}
      <div className="flex flex-wrap gap-2">
        {opciones.map((o) => {
          const activo = valor === o;
          return (
            <label
              key={o}
              className="cursor-pointer select-none"
              style={{ lineHeight: 0 }}
            >
              <input
                type="radio"
                name={nombre}
                value={o}
                checked={activo}
                onChange={() => onChange(o)}
                className="sr-only peer"
              />
              <span
                className="inline-flex items-center h-[44px] px-4 text-t3 border-solid transition-all duration-150 peer-focus-visible:shadow-[0_0_0_3px_var(--halo-foco)]"
                style={{
                  borderWidth: activo ? 2 : 1,
                  borderColor: activo ? "var(--blue-fill)" : BORDE_VACIO,
                  backgroundColor: activo
                    ? "var(--blue-fill)"
                    : "var(--campo-fondo)",
                  color: activo ? "var(--white)" : "var(--ink-soft)",
                  fontWeight: activo ? 600 : 400,
                }}
              >
                {o}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/* --------------------------- casilla propia ----------------------- */

export function Casilla({
  id,
  marcada,
  onCambio,
  error,
  children,
  refCasilla,
}: {
  id: string;
  marcada: boolean;
  onCambio: (v: boolean) => void;
  error?: string;
  children: React.ReactNode;
  refCasilla?: React.Ref<HTMLInputElement>;
}) {
  return (
    <>
      <label
        htmlFor={id}
        className="flex items-start gap-3.5 cursor-pointer group"
      >
        <input
          ref={refCasilla}
          id={id}
          type="checkbox"
          checked={marcada}
          onChange={(e) => onCambio(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="sr-only peer"
        />
        <span
          className="mt-[1px] w-[22px] h-[22px] shrink-0 flex items-center justify-center border-solid transition-all duration-150 peer-focus-visible:shadow-[0_0_0_3px_var(--halo-foco)]"
          style={{
            borderWidth: marcada ? 2 : error ? 2 : 1.5,
            borderColor: marcada ? "var(--blue)" : error ? ROJO : BORDE_VACIO,
            backgroundColor: marcada
              ? "var(--blue-fill)"
              : "var(--campo-fondo)",
          }}
          aria-hidden
        >
          {marcada && (
            <Check
              size={14}
              strokeWidth={3}
              style={{ color: "var(--white)" }}
            />
          )}
        </span>
        <span
          className="text-t2 leading-relaxed"
          style={{ color: "var(--ink-soft)" }}
        >
          {children}
        </span>
      </label>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-t2 font-medium mt-2 pl-[36px]"
          style={{ color: ROJO }}
        >
          {error}
        </p>
      )}
    </>
  );
}

/* --------------------------- validación --------------------------- */

const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
// Móvil o fijo español, con o sin prefijo y con separadores libres.
const RE_TEL = /^(?:\+?34)?[\s.-]?[6789]\d{2}(?:[\s.-]?\d{2}){3}$/;

export type Errores = Record<string, string>;

export function validar(
  valores: Record<string, string>,
  reglas: Reglas,
): Errores {
  const e: Errores = {};
  for (const [campo, [regla]] of Object.entries(reglas)) {
    const v = (valores[campo] ?? "").trim();
    if (regla === "email-opcional") {
      if (v && !RE_EMAIL.test(v)) e[campo] = "Revisa el correo: falta algo.";
      continue;
    }
    if (!v) {
      e[campo] =
        regla === "elegir" ? "Elige una opción." : "Este dato nos hace falta.";
      continue;
    }
    if (regla === "tel" && !RE_TEL.test(v))
      e[campo] = "Un teléfono español de 9 cifras.";
    if (regla === "email" && !RE_EMAIL.test(v))
      e[campo] = "Revisa el correo: falta algo.";
  }
  return e;
}

/** Lleva valores, tocados y errores de cualquiera de los formularios. */
export function useFormulario<T extends Record<string, string>>(
  inicial: T,
  reglas: Reglas,
) {
  const [valores, setValores] = useState<T>(inicial);
  const [tocados, setTocados] = useState<Record<string, boolean>>({});
  const [enviado, setEnviado] = useState(false);

  const errores = validar(valores, reglas);
  const visible = (campo: string) =>
    (tocados[campo] || enviado) && errores[campo] ? errores[campo] : undefined;

  const pon = (campo: keyof T) => (v: string) =>
    setValores((prev) => ({ ...prev, [campo]: v }));
  const toca = (campo: keyof T) => () =>
    setTocados((prev) => ({ ...prev, [campo as string]: true }));

  const revisar = (extra?: { valido: boolean; foco?: HTMLElement | null }) => {
    setEnviado(true);
    const primero = Object.keys(errores)[0];
    if (primero) {
      const el = document.getElementById(primero);
      el?.focus();
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    if (extra && !extra.valido) {
      extra.foco?.focus();
      extra.foco?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  };

  // Nombres de lo que falta, para poder decirlo con palabras
  const faltan = Object.keys(errores).map((c) => reglas[c]?.[1] ?? c);

  return {
    valores,
    setValores,
    errores,
    visible,
    pon,
    toca,
    revisar,
    enviado,
    faltan,
  };
}

/* -------------------- lo que falta, con nombres ------------------- */

export function Faltan({
  campos,
  consentimiento,
  envio,
}: {
  campos: string[];
  consentimiento?: boolean;
  /** Falló el envío, no la validación: aquí el problema no está en el formulario. */
  envio?: string;
}) {
  const lista = [
    ...campos,
    ...(consentimiento ? ["el consentimiento de datos"] : []),
  ];
  if (lista.length === 0 && !envio) return null;
  const texto =
    lista.length === 1
      ? lista[0]
      : `${lista.slice(0, -1).join(", ")} y ${lista[lista.length - 1]}`;
  return (
    <output
      className="flex items-start gap-3 mb-6 p-4 border-l-[3px]"
      style={{ borderColor: ROJO, backgroundColor: "var(--aviso-fondo)" }}
    >
      <span className="text-t2 leading-snug" style={{ color: ROJO }}>
        {lista.length > 0 ? (
          <>
            <strong className="font-semibold">
              {lista.length === 1
                ? "Falta un dato:"
                : `Faltan ${lista.length} datos:`}
            </strong>{" "}
            {texto}. Lo tienes marcado en rojo arriba.
          </>
        ) : (
          <>
            <strong className="font-semibold">No se ha podido enviar:</strong>{" "}
            {envio}
          </>
        )}
      </span>
    </output>
  );
}

/* ----------------------- protección de datos ---------------------- */

export function CapaRgpd({
  id,
  acepto,
  onAcepto,
  error,
  texto,
  plazo,
  refCasilla,
}: {
  id: string;
  acepto: boolean;
  onAcepto: (v: boolean) => void;
  error?: string;
  texto: string;
  plazo: string;
  refCasilla?: React.Ref<HTMLInputElement>;
}) {
  const [abierto, setAbierto] = useState(false);

  return (
    <div className="pt-7 border-t" style={{ borderColor: "var(--line)" }}>
      <button
        type="button"
        onClick={() => setAbierto(!abierto)}
        aria-expanded={abierto}
        aria-controls={`${id}-capa`}
        className="flex items-center gap-3 w-full min-h-11 py-2 text-left"
      >
        <span className="eyebrow" style={{ color: "var(--ink-muted)" }}>
          Información básica sobre protección de datos
        </span>
        <span
          className="flex-1 h-px"
          style={{ backgroundColor: "var(--rule)" }}
          aria-hidden
        />
        <ChevronDown
          size={15}
          aria-hidden
          className="transition-transform duration-200 shrink-0"
          style={{
            color: "var(--ink-muted)",
            transform: abierto ? "rotate(180deg)" : "none",
          }}
        />
      </button>

      <div id={`${id}-capa`} hidden={!abierto}>
        <dl className="grid sm:grid-cols-2 gap-x-10 mt-5">
          {primeraCapa.map((c) => (
            <div
              key={c.campo}
              className="grid gap-y-1 sm:grid-cols-[112px_minmax(0,1fr)] sm:gap-x-4 py-3 border-b"
              style={{ borderColor: "var(--line-soft)" }}
            >
              <dt
                className="eyebrow sm:pt-[3px]"
                style={{ color: "var(--ink-muted)" }}
              >
                {c.campo}
              </dt>
              <dd
                className="text-t2 leading-relaxed m-0 min-w-0"
                style={{ color: "var(--ink-soft)" }}
              >
                {c.valor}
              </dd>
            </div>
          ))}
        </dl>
        <p
          className="text-t2 leading-relaxed mt-4"
          style={{ color: "var(--ink-soft)" }}
        >
          Conservamos los datos {plazo} y después se eliminan o se bloquean.
          Puedes retirar tu consentimiento cuando quieras. Información ampliada
          en la{" "}
          <a
            href="/privacidad"
            className="font-semibold"
            style={{ color: "var(--blue)" }}
          >
            política de privacidad
          </a>
          .
        </p>
      </div>

      <div className="mt-6">
        <Casilla
          id={`${id}-consiento`}
          marcada={acepto}
          onCambio={onAcepto}
          error={error}
          refCasilla={refCasilla}
        >
          {texto}{" "}
          <span style={{ color: "var(--blue)" }} aria-hidden>
            *
          </span>
        </Casilla>
      </div>
    </div>
  );
}
