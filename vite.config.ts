import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 3000,
  },
  //TODO - SPP
  preview: {
    port: 8080,
  },
  server: {
    port: 8080,
    // proxy: {
    //   "/v1": {
    //     target: "https://engine.sppay.dev",
    //     changeOrigin: true,
    //     secure: false,
    //     // rewrite: (path) => path.replace(/^\/v1/, ""),
    //   },
    // },
  },
  //TODO - SPP
});
