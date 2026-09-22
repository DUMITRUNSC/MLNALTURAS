import type { NextConfig } from "next";

/* Cabeceras de seguridad básicas. Sin CSP a propósito: una política de
   contenido mal ajustada rompe fuentes, imágenes o el envío del formulario,
   y aquí no hay scripts de terceros que justifiquen el riesgo. */
const cabeceras = [
  {
    // Dos años. Sin `preload` a propósito: eso se pide una vez y cuesta
    // revertirlo si algún día hay un subdominio sin certificado.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Next 16 rechaza cualquier quality que no esté declarada aquí.
    // 75 para miniaturas, 85 y 90 para las fotos grandes.
    qualities: [75, 85, 90],
  },
  async headers() {
    return [{ source: "/:path*", headers: cabeceras }];
  },
};

export default nextConfig;
