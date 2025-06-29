import { defineConfig } from "vite";
import path from "path"; // Importa el módulo 'path' de Node.js
import { fileURLToPath } from "url"; // Importa el módulo 'url' de Node.js
//import { visualizer } from 'rollup-plugin-visualizer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// https://vite.dev/config/
export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxInject: `import React from 'react'`,
  },
  assetsInclude: ["**/*.ttf", "**/*.woff", "**/*.woff2"],
  server: {
    hmr: {
      overlay: true, // Muestra errores como overlay
    },
    watch: {
      usePolling: true, // Ayuda con problemas de detección de cambios en algunos sistemas
    },
  },
  optimizeDeps: {
    force: true, // Fuerza a reconstruir dependencias optimizadas en cada inicio
  },
  resolve: {
    alias: {
      // Define tus aliases aquí
      "@src": path.resolve(__dirname, "./src"), // Alias para la carpeta 'src'
    },
  },
  build: {
    // Ensure UTF-8 encoding in build output
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    exclude: [
      "tests/e2e/**",
      "**/tests/e2e/**",
      "**/e2e/**",
      "node_modules/**",
      "dist/**",
    ],
    css: {
      modules: {
        classNameStrategy: "non-scoped",
      },
    },
  },
  plugins: [
    {
      name: "ignore-use-client-warnings",
      apply: "build",
      buildEnd() {
        // No-op: solo para que el plugin exista
      },
      // Vite no expone una API oficial para filtrar warnings, pero puedes intentar:
      configResolved(config) {
        const originalWarn = config.logger.warn;
        config.logger.warn = (msg) => {
          if (
            typeof msg === "string" &&
            msg.includes("Module level directives cause errors when bundled")
          ) {
            return;
          }
          originalWarn(msg);
        };
      },
    },
  ],
});
