/**
 * Mapa único de fotografías de la web.
 *
 * Regla: UNA foto por sitio. Nada se repite en dos secciones.
 * Para cambiar una foto, se cambia aquí y en ningún otro archivo.
 *
 * Ocupación actual (10 de 10 huecos):
 *   hero ........................ dos técnicos descolgados con el perfil de Madrid al fondo
 *   s01Fachadas ................. sellado de junta en fachada de piedra
 *   s02Cubiertas ................ tejado de teja curva sobre Madrid
 *   s03Impermeabilizacion ....... cubierta plana impermeabilizada
 *   s04Patios ................... patio de luces de comunidad
 *   s05Rehabilitacion ........... despiece de fachada ventilada de piedra
 *   s06Verticales ............... operario descolgado sobre fachada de piedra
 *   administradores ............. patio interior madrileño con balcones
 *   empresa ..................... operario descolgado en fachada de ladrillo
 *   empleo ...................... colocación de pavimento en azotea
 *
 * Sin foto, a propósito: la sección de arquitectos (solo tipografía y retícula).
 */
export const fotos = {
  hero: {
    src: "/fachada-madrid-dos-tecnicos.jpg",
    alt: "Dos técnicos de MLN descolgados por cuerda en la fachada de un edificio de Madrid, con la cúpula del Metrópolis y el perfil de la ciudad al fondo",
  },
  s01Fachadas: {
    src: "/sellado-junta-fachada.jpg",
    alt: "Operario sellando una junta de fachada de piedra descolgado por cuerda, con la Gran Vía al fondo",
  },
  s02Cubiertas: {
    src: "/tejado-teja-madrid.jpg",
    alt: "Tejado de teja curva con canalón y chimenea sobre los tejados de Madrid",
  },
  s03Impermeabilizacion: {
    src: "/impermeabilizacion-cubierta.jpg",
    alt: "Cubierta plana recién impermeabilizada con lámina gris evacuando agua de lluvia",
  },
  s04Patios: {
    src: "/patio-interior.jpg",
    alt: "Patio de luces de una comunidad de propietarios visto desde abajo",
  },
  s05Rehabilitacion: {
    src: "/fachada-piedra-detalle.jpg",
    alt: "Detalle del despiece de una fachada ventilada de piedra junto a la carpintería",
  },
  s06Verticales: {
    src: "/hero-fachada-madrid.jpg",
    alt: "Técnico descolgado por cuerda sobre la fachada de un edificio del centro de Madrid",
  },
  administradores: {
    src: "/patio-madrid-balcones.jpg",
    alt: "Patio interior de un edificio madrileño con balcones y plantas, del portal al cielo",
  },
  empresa: {
    src: "/fachada-ladrillo.jpg",
    alt: "Técnico de MLN trabajando descolgado sobre una fachada de ladrillo en Madrid",
  },
  empleo: {
    src: "/terraza-baldosas.jpg",
    alt: "Operario colocando pavimento sobre una azotea de Madrid",
  },
  /** Recorte vertical de la fachada completa: es el índice de servicios
      en escritorio, con los marcadores encima. */
  recorrido: {
    src: "/fachada-madrid-recorrido.jpg",
    alt: "Vista vertical de una fachada de Madrid con dos técnicos descolgados por cuerda y los tejados del centro al fondo",
  },
} as const;

// Aviso en desarrollo si alguna foto se ha colado dos veces.
if (process.env.NODE_ENV !== "production") {
  const usadas = Object.values(fotos).map((f) => f.src);
  const repetidas = [
    ...new Set(usadas.filter((s, i) => usadas.indexOf(s) !== i)),
  ];
  if (repetidas.length > 0) {
    console.warn("[MLN] Hay fotos repetidas en la web:", repetidas.join(", "));
  }
}
