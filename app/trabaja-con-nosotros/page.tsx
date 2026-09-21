import type { Metadata } from "next";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import { BotonEnlace } from "@/components/Boton";
import ContactoEmpleo from "@/components/ContactoEmpleo";
import ViasDeEntrada from "@/components/Empleo";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Miga from "@/components/Miga";
import MobileCallBar from "@/components/MobileCallBar";
import Reveals from "@/components/Reveals";
import { fotos } from "@/lib/fotos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  // 39 + 31 de plantilla = 70 caracteres, que es lo que se ve entero.
  title: "Empleo en trabajos verticales en Madrid",
  description:
    "Oficiales de trabajos verticales en plantilla y empresas o autónomos colaboradores en Madrid. Llámanos o escríbenos directamente.",
  alternates: { canonical: "/trabaja-con-nosotros" },
  // En Next el openGraph de la página sustituye al del layout, no se fusiona:
  // sin imagen ni siteName aquí, al compartirlo por WhatsApp salía pelado.
  openGraph: {
    title: "Empleo en trabajos verticales | MLN Construcciones en Altura",
    description:
      "Oficiales de trabajos verticales en plantilla y empresas o autónomos colaboradores en Madrid.",
    url: `${site.url}/trabaja-con-nosotros`,
    siteName: site.legalName,
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/terraza-baldosas.jpg",
        width: 1536,
        height: 1024,
        type: "image/jpeg",
        alt: "Equipo de MLN trabajando en una terraza de Madrid",
      },
    ],
  },
};

const ofrecemos = [
  {
    num: "01",
    titulo: "Obra todo el año",
    desc: "Madrid y alrededores, con cartera repartida entre comunidades, administradores y arquitectos. No dependemos de una sola finca.",
  },
  {
    num: "02",
    titulo: "Equipos y material a cargo de la empresa",
    desc: "EPI, cuerdas y herramienta los pone MLN, con sus revisiones documentadas.",
  },
  {
    num: "03",
    titulo: "Formación y reciclaje al día",
    desc: "Los cursos de altura y sus renovaciones corren por cuenta de la empresa.",
  },
  {
    num: "04",
    titulo: "Un plan por obra, no un papel",
    desc: "Cada intervención arranca con su plan de seguridad y salud específico, coordinado con el edificio.",
  },
];

const despues = [
  {
    num: "01",
    titulo: "Lo lee una persona",
    desc: "No hay filtro automático ni puntuación. Lo revisamos nosotros y contestamos aunque en ese momento no haya nada abierto.",
  },
  {
    num: "02",
    titulo: "Una llamada y, si encaja, verte trabajar",
    desc: "Con oficio de altura el currículum dice poco. Preferimos una conversación corta y, después, una obra contigo.",
  },
  {
    num: "03",
    titulo: "Si no hay hueco, tu ficha se queda",
    desc: "Guardamos la candidatura 24 meses para la siguiente obra que encaje, y puedes pedirnos que la borremos cuando quieras.",
  },
];

export default function TrabajaConNosotros() {
  return (
    <>
      <Header />

      <main id="contenido" style={{ backgroundColor: "var(--white)" }}>
        {/* Portada de la página */}
        <section
          style={{
            background:
              "linear-gradient(180deg, var(--sky-1) 0%, var(--sky-2) 55%, var(--white) 100%)",
          }}
        >
          <div className="pagina">
            <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-20 items-end pt-32 lg:pt-40 pb-16 lg:pb-24">
              <div>
                <Miga
                  aqui="Empleo y colaboradores"
                  ruta="/trabaja-con-nosotros"
                />

                <h1
                  className="h-display mb-8"
                  style={{ fontSize: "var(--d-3)", color: "var(--ink)" }}
                >
                  Esto lo sostiene
                  <br />
                  <span style={{ color: "var(--blue)" }}>
                    quien se cuelga de la cuerda.
                  </span>
                </h1>

                <p
                  className="text-t4 leading-[1.62] max-w-[48ch] mb-9"
                  style={{ color: "var(--ink-muted)" }}
                >
                  Incorporamos despacio y nos quedamos con la gente mucho
                  tiempo. Hay dos formas de entrar: en plantilla, como oficial
                  de trabajos verticales, o como empresa o autónomo que asume
                  obra completa con nosotros.
                </p>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                  <BotonEnlace href="#contacto-empleo" medida="media">
                    Contactar
                  </BotonEnlace>
                  <a
                    href="#vias"
                    className="inline-flex items-center min-h-11 py-2 text-t3 font-semibold"
                    style={{ color: "var(--ink)" }}
                  >
                    Cómo se entra en MLN
                  </a>
                </div>
              </div>

              <div
                className="foto-deriva relative w-full aspect-[16/11] overflow-hidden"
                style={{ backgroundColor: "var(--line-soft)" }}
              >
                <Image
                  src={fotos.empleo.src}
                  alt={fotos.empleo.alt}
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="object-cover"
                />
                <p className="absolute bottom-4 right-5">
                  <span className="cota-foto tecnico text-t1 font-semibold uppercase">
                    MLN / Empleo
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 01 · Las dos vías, cada una con sus requisitos */}
        <ViasDeEntrada />

        {/* 02 · Lo que ofrecemos */}
        <section
          className="py-24 lg:py-32"
          style={{ backgroundColor: "var(--bg-soft)" }}
        >
          <div className="pagina">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20">
              <div>
                <div className="flex items-center gap-5 mb-8">
                  <span
                    className="w-10 h-px"
                    style={{ backgroundColor: "var(--ink-faint)" }}
                  />
                  <p className="eyebrow" style={{ color: "var(--ink-muted)" }}>
                    Lo que ofrecemos
                  </p>
                </div>
                <h2
                  className="h-display"
                  style={{ fontSize: "var(--d-2)", color: "var(--ink)" }}
                >
                  Qué ofrecemos
                  <br />
                  a quien entra en MLN.
                </h2>
              </div>

              <ol className="grid sm:grid-cols-2 gap-x-12">
                {ofrecemos.map((o) => (
                  <li
                    key={o.num}
                    data-reveal
                    className="grid grid-cols-[34px_minmax(0,1fr)] gap-x-4 py-6 border-t"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <span
                      className="tecnico text-t1 pt-1"
                      style={{ color: "var(--ink-faint)" }}
                    >
                      {o.num}
                    </span>
                    <div className="min-w-0">
                      <h3
                        className="text-t4 font-semibold mb-2 tracking-[-0.01em]"
                        style={{ color: "var(--ink)" }}
                      >
                        {o.titulo}
                      </h3>
                      <p
                        className="text-t3 leading-[1.62] max-w-[44ch]"
                        style={{ color: "var(--ink-muted)" }}
                      >
                        {o.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 03 · Qué pasa después de enviar los datos */}
        <section
          className="py-24 lg:py-32"
          style={{ backgroundColor: "var(--white)" }}
        >
          <div className="pagina">
            <div className="flex items-center gap-5 mb-10 lg:mb-14">
              <span
                className="w-10 h-px"
                style={{ backgroundColor: "var(--ink-faint)" }}
              />
              {/* h2 con la misma pinta: los tres h3 de abajo colgaban del h2
                  de la sección anterior. */}
              <h2 className="eyebrow" style={{ color: "var(--ink-muted)" }}>
                Qué pasa después
              </h2>
            </div>

            <ol className="grid lg:grid-cols-3">
              {despues.map((d, i) => (
                <li
                  key={d.num}
                  data-reveal
                  className={`pt-8 border-t ${
                    i === 0
                      ? "lg:pr-12"
                      : i === 1
                        ? "mt-10 lg:mt-0 lg:px-12 lg:border-l"
                        : "mt-10 lg:mt-0 lg:pl-12 lg:border-l"
                  }`}
                  style={{ borderColor: "var(--line)" }}
                >
                  <p
                    className="h-display leading-none mb-5 tabular-nums"
                    style={{
                      fontSize: "var(--n-2)",
                      color: "var(--numero)",
                    }}
                  >
                    {d.num}
                  </p>
                  <h3
                    className="text-t5 font-semibold tracking-[-0.02em] mb-3"
                    style={{ color: "var(--ink)" }}
                  >
                    {d.titulo}
                  </h3>
                  <p
                    className="text-t3 leading-[1.65] max-w-[42ch]"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {d.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 04 · Déjanos tus datos */}
        <section
          id="contacto-empleo"
          className="py-24 lg:py-32"
          style={{ backgroundColor: "var(--bg-soft)" }}
        >
          <div className="pagina">
            <ContactoEmpleo />
          </div>
        </section>
      </main>

      <Footer />
      <MobileCallBar />
      <div className="lg:hidden h-[58px]" aria-hidden />
      <Reveals />
    </>
  );
}
