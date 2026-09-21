/**
 * Zonas de trabajo, con lo que se encuentra el equipo en cada una.
 *
 * Es la única fuente: `site.areas` sale de aquí, así que el nombre de una zona
 * se cambia en un solo sitio y se actualizan la sección de la portada, el pie,
 * la lista del formulario y los datos estructurados a la vez.
 *
 * Las descripciones hablan del parque de edificios de cada zona, no de obras
 * concretas: mientras no haya obras publicadas, ninguna frase de aquí afirma
 * nada que no se pueda sostener.
 */
export const zonas = [
  {
    nombre: "Madrid capital",
    desc: "Fachadas, patios de luces, cubiertas y medianeras con accesos condicionados por la vía pública.",
  },
  {
    nombre: "Alcobendas y San Sebastián de los Reyes",
    desc: "Rehabilitación de fachadas, cubiertas planas, terrazas y juntas de dilatación.",
  },
  {
    nombre: "Pozuelo, Majadahonda y Las Rozas",
    desc: "Vivienda unifamiliar y comunidades pequeñas. Teja, canalón y cubierta inclinada, con acceso complicado por vegetación y desnivel.",
  },
  {
    nombre: "Getafe, Leganés y Fuenlabrada",
    desc: "Bloques en altura y fachadas de gran superficie donde el acceso por cuerda puede reducir medios auxiliares y molestias.",
  },
  {
    nombre: "Alcalá de Henares y Corredor del Henares",
    desc: "Fachadas en casco urbano y cubiertas de naves en el Corredor del Henares.",
  },
  {
    nombre: "Resto de la Comunidad de Madrid",
    desc: "Valoramos el desplazamiento según el alcance, la duración y los medios necesarios para la intervención.",
  },
] as const;
