import { fotos } from "@/lib/fotos";

/**
 * Los seis frentes de obra. Viven aquí, y no dentro del componente, porque
 * los usa el índice de la portada y también los datos estructurados del
 * layout (OfferCatalog), que se generan en el servidor.
 */
export const servicios = [
  {
    num: "01",
    titulo: "Rehabilitación de fachadas",
    desc: "Saneado, sellado de juntas, reposición de mortero y pintura. Metro a metro, por cuerda, sin ocupar la calle.",
    foto: fotos.s01Fachadas,
  },
  {
    num: "02",
    titulo: "Reparación de cubiertas y tejados",
    desc: "Teja, canalón, cumbrera y remates. Reparación quirúrgica antes de que la filtración baje dos plantas.",
    foto: fotos.s02Cubiertas,
  },
  {
    num: "03",
    titulo: "Impermeabilización de azoteas y terrazas",
    desc: "Azoteas, terrazas y juntas de dilatación. Localizamos por dónde entra el agua y lo cerramos.",
    foto: fotos.s03Impermeabilizacion,
  },
  {
    num: "04",
    titulo: "Patios de luces y medianeras",
    desc: "El punto ciego del edificio: donde no entra andamio ni plataforma y solo se llega descolgado.",
    foto: fotos.s04Patios,
  },
  {
    num: "05",
    titulo: "ITE: subsanación de deficiencias",
    desc: "Ejecutamos las obras que marca el informe desfavorable y entregamos la documentación del cierre para acreditar la subsanación dentro de plazo.",
    foto: fotos.s05Rehabilitacion,
  },
  {
    num: "06",
    titulo: "Trabajos verticales y acceso por cuerda",
    desc: "Acceso por cuerda para inspección, toma de datos, limpieza técnica y montajes en altura.",
    foto: fotos.s06Verticales,
  },
];
