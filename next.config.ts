import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Necessário para o GitHub Pages quando não é um domínio customizado na raiz
  basePath: '/renomeador',
  // Recomendado para exportação estática no Next.js
  images: { 
    unoptimized: true 
  } 
};

export default nextConfig;
