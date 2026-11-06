import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { buildSitemapXml } from "./src/sitemap.ts";
import { canonicalBaseUrl } from "./src/seo-config.ts";
import type { Plugin } from "vite";

const sitemapPlugin: Plugin = {
  name: "generate-sitemap-from-app-data",
  configureServer(server) {
    server.middlewares.use("/sitemap.xml", (_request, response) => {
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/xml; charset=utf-8");
      response.end(buildSitemapXml());
    });
  },
  generateBundle() {
    this.emitFile({
      type: "asset",
      fileName: "sitemap.xml",
      source: buildSitemapXml(),
    });
  },
};

const canonicalBasePlugin: Plugin = {
  name: "inject-canonical-base",
  transformIndexHtml(html) {
    return html.replaceAll("%CANONICAL_BASE_URL%", canonicalBaseUrl);
  },
};

export default defineConfig({
  plugins: [react(), sitemapPlugin, canonicalBasePlugin],
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    restoreMocks: true,
    clearMocks: true,
  },
});
