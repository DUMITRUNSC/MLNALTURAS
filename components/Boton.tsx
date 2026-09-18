import type { ComponentPropsWithoutRef, ReactNode } from "react";

/* Botón — las tres formas que usa la web, en un sitio.
 *
 *   relleno   acción principal de la pantalla. Azul de relleno, texto blanco.
 *   contorno  alternativa del mismo peso, sin color: WhatsApp, copiar, llamar.
 *   texto     salida discreta: volver, cancelar, seguir leyendo.
 *
 * Medidas: grande 56 px para las llamadas a la acción de una sección y
 * media 52 px dentro de un bloque o una lámina.
 * El relleno y el contorno suben 3 px al pasar por encima; quien tenga
 * activado «menos movimiento» no ve el desplazamiento, lo anula globals.css.
 *
 * Nada lleva radio: el lenguaje de la casa es cuadrado.
 */

type Variante = "relleno" | "contorno" | "texto";
type Medida = "grande" | "media";

const ALTO: Record<Medida, string> = {
  grande: "h-[56px]",
  media: "h-[52px]",
};

const ANCHO: Record<Medida, { relleno: string; contorno: string }> = {
  grande: { relleno: "px-8", contorno: "px-7" },
  media: { relleno: "px-6", contorno: "px-6" },
};

/* El hover que levanta 3 px no existe en una pantalla táctil: al pulsar con el
   dedo no pasaba absolutamente nada. El scale al 98 % da el acuse físico de
   que el botón ha recibido el toque, y a 150 ms no se percibe como lentitud. */
const BASE =
  "inline-flex items-center justify-center gap-3 font-semibold whitespace-nowrap transition-transform duration-150 active:scale-[0.98] active:translate-y-0 disabled:opacity-80 disabled:cursor-wait";

function clases(variante: Variante, medida: Medida, extra?: string) {
  const partes = [BASE, "text-t3", ALTO[medida]];
  if (variante === "relleno") {
    partes.push(ANCHO[medida].relleno, "text-white hover:-translate-y-[3px]");
  } else if (variante === "contorno") {
    partes.push(ANCHO[medida].contorno, "border hover:-translate-y-[3px]");
  }
  if (extra) partes.push(extra);
  return partes.join(" ");
}

function estilos(variante: Variante): React.CSSProperties {
  if (variante === "relleno") return { backgroundColor: "var(--blue-fill)" };
  if (variante === "contorno")
    return { borderColor: "var(--ink-soft)", color: "var(--ink)" };
  return { color: "var(--ink)" };
}

type Comun = {
  variante?: Variante;
  medida?: Medida;
  children: ReactNode;
};

type PropsBoton = Comun & Omit<ComponentPropsWithoutRef<"button">, "children">;

export function Boton({
  variante = "relleno",
  medida = "grande",
  className,
  style,
  type = "button",
  children,
  ...resto
}: PropsBoton) {
  return (
    <button
      type={type}
      className={clases(variante, medida, className)}
      style={{ ...estilos(variante), ...style }}
      {...resto}
    >
      {children}
    </button>
  );
}

type PropsEnlace = Comun & Omit<ComponentPropsWithoutRef<"a">, "children">;

export function BotonEnlace({
  variante = "relleno",
  medida = "grande",
  className,
  style,
  children,
  ...resto
}: PropsEnlace) {
  return (
    <a
      className={clases(variante, medida, className)}
      style={{ ...estilos(variante), ...style }}
      {...resto}
    >
      {children}
    </a>
  );
}
