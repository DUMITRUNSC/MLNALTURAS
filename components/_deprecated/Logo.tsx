/**
 * Logotipo MLN.
 * La marca es una plomada: la línea y el peso con los que se comprueba que algo
 * está a plomo. Es el instrumento del oficio y, a la vez, el gesto de la
 * empresa — descolgarse desde arriba. La línea va siempre en azul; el texto
 * hereda el color del contexto para que funcione en claro y en oscuro.
 */
export default function Logo({
  withWordmark = true,
  onDark = false,
}: {
  withWordmark?: boolean;
  onDark?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-3">
      <svg
        viewBox="0 0 8 34"
        width="8"
        height="34"
        aria-hidden
        className="shrink-0"
      >
        <line
          x1="4"
          y1="1"
          x2="4"
          y2="25"
          stroke="var(--blue)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M4 25 L7 30 L4 33 L1 30 Z" fill="var(--blue)" />
      </svg>

      <span className="flex items-baseline gap-3">
        <span
          className="text-t6 font-bold tracking-[-0.045em] leading-none"
          style={{ color: onDark ? "#fff" : "var(--ink)" }}
        >
          MLN
        </span>
        {withWordmark && (
          <span
            className="hidden sm:block text-t1 font-medium tracking-[0.28em] uppercase leading-none"
            style={{ color: onDark ? "rgba(255,255,255,0.6)" : "var(--ink-muted)" }}
          >
            Altura Madrid
          </span>
        )}
      </span>
    </span>
  );
}
