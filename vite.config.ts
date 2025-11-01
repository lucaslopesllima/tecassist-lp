import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: "/", 
  build: {
    outDir: "dist", 
    assetsDir: "assets",
  },
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/api": {
        target: "https://techassist-landing-api.vercel.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
