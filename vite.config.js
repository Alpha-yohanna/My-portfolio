import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
  build: {
    // The Three.js/R3F scene is already lazy-loaded into its own chunk
    // (only fetched once the hero mounts), so its size doesn't block
    // initial paint. Raising this keeps the warning meaningful for
    // regressions in the main bundle instead of the already-mitigated one.
    chunkSizeWarningLimit: 1000,
  },
});
