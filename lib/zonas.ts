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
    desc: "Fachada de ladrillo y piedra en el centro, bloques de los sesenta y setenta en los distritos del sur. Casi todo con patio de luces, casi nada con sitio para montar andamio.",
  },
  {
    nombre: "Alcobendas y San Sebastián de los Reyes",
    desc: "Promociones de los ochenta y noventa entrando en su segunda ITE. Cubierta plana, terraza y junta de dilatación.",
  },
  {
    nombre: "Pozuelo, Majadahonda y Las Rozas",
    desc: "Vivienda unifamiliar y comunidades pequeñas. Teja, canalón y cubierta inclinada, con acceso complicado por vegetación y desnivel.",
  },
  {
    nombre: "Getafe, Leganés y Fuenlabrada",
    desc: "Bloque de altura y fachada de gran superficie. Aquí el trabajo por cuerda ahorra semanas de andamio y no deja la calle ocupada.",
  },
  {
    nombre: "Alcalá de Henares y Corredor del Henares",
    desc: "Casco antiguo con fachada protegida y polígono industrial con cubierta de chapa y fibrocemento.",
  },
  {
    nombre: "Resto de la Comunidad de Madrid",
    desc: "Salimos fuera para obra completa. Para una reparación pequeña a 70 km te diremos que busques a alguien de allí.",
  },
] as const;
