import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Next 16 rechaza cualquier quality que no esté declarada aquí.
    // 75 para miniaturas, 90 para las fotos grandes.
    qualities: [75, 90],
  },
};

export default nextConfig;
