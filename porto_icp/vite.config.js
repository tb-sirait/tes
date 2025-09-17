import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/", // gunakan root agar router tidak error
  plugins: [react()],
  server: {
    host: true,
    // history fallback untuk dev server
    fs: {
      strict: true,
    },
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[hash][extname]",
      },
    },
  },
  publicDir: "public",
});
