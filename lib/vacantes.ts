/**
 * Vacantes abiertas. Es el único sitio que hay que tocar para publicar o
 * cerrar una oferta: la página de empleo enseña la lista, y si está vacía
 * dice que se aceptan candidaturas espontáneas.
 *
 * No hay panel ni base de datos a propósito: las candidaturas llegan al
 * correo y ahí se gestionan. Un archivo con dos o tres entradas al año no
 * necesita más.
 *
 * `salario` y `contrato` son opcionales, pero una oferta con ellos se
 * entiende antes y se puede marcar como JobPosting para Google. Sin ellos
 * no se genera marcado: mejor nada que un anuncio a medias.
 */
export type Vacante = {
  puesto: string;
  /** "Indefinido", "Temporal", "Fijo discontinuo"… */
  contrato?: string;
  /** "Jornada completa", "Media jornada"… */
  jornada?: string;
  /** Texto libre: "24.000–28.000 € brutos/año" o "según experiencia". */
  salario?: string;
  /** Una o dos líneas sobre la obra o el equipo al que se incorpora. */
  nota?: string;
  /** Fecha de publicación, AAAA-MM-DD. */
  desde: string;
};

export const vacantes: Vacante[] = [
  // Ejemplo (borrar o cambiar cuando haya una oferta real):
  // {
  //   puesto: "Oficial de trabajos verticales",
  //   contrato: "Indefinido",
  //   jornada: "Jornada completa",
  //   salario: "Según experiencia",
  //   nota: "Obra continua en Madrid capital y corona sur.",
  //   desde: "2026-10-01",
  // },
];

export const hayVacantes = vacantes.length > 0;
