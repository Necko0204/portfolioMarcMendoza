import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:5050",
      "/sitemap.xml": "http://localhost:5050",
      "/robots.txt": "http://localhost:5050"
    }
  },
  build: {
    sourcemap: false,
    target: "es2022"
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true
  }
});
