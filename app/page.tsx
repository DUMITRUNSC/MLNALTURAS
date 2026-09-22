import type { Metadata } from "next";
import Contact from "@/components/Contact";
import CTABlock from "@/components/CTABlock";
import Faq, { faqs } from "@/components/Faq";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MobileCallBar from "@/components/MobileCallBar";
import ParaQuien from "@/components/ParaQuien";
import Process from "@/components/Process";
import Reveals from "@/components/Reveals";
import Services from "@/components/Services";
import TrustBar from "@/components/TrustBar";
import WhyMLN from "@/components/WhyMLN";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/* El FAQPage va aquí y no en el layout: el marcado solo vale si las preguntas
   están visibles en esa misma página, y solo lo están en la portada. Cuando
   estaba en el layout se colaba también en las tres páginas legales, que es
   justo lo que Google considera marcado engañoso. */
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${site.url}/#preguntas`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <TrustBar />
        <Services />
        <CTABlock />
        <ParaQuien />
        <Process />
        <WhyMLN />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileCallBar />
      <Reveals />
      {/* Hueco para la barra fija. Del color del pie: cuando la barra se
          aparta en la sección de contacto, antes asomaba una franja blanca. */}
      <div
        className="lg:hidden h-[58px]"
        style={{ backgroundColor: "var(--zona-oscura)" }}
        aria-hidden
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: datos estructurados estáticos
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}
