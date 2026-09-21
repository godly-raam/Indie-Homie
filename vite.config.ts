import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
      "home": fileURLToPath(new URL("./index.html", import.meta.url)),
      "artwork": fileURLToPath(new URL("./artwork/index.html", import.meta.url)),
      "not_found": fileURLToPath(new URL("./not_found/index.html", import.meta.url)),
      "info__about": fileURLToPath(new URL("./info/about/index.html", import.meta.url)),
      "gallery__artwork": fileURLToPath(new URL("./gallery/artwork/index.html", import.meta.url)),
      "gallery__photography": fileURLToPath(new URL("./gallery/photography/index.html", import.meta.url)),
      "guest__guestbook": fileURLToPath(new URL("./guest/guestbook/index.html", import.meta.url)),
      "guest__links": fileURLToPath(new URL("./guest/links/index.html", import.meta.url)),
      "library__blog": fileURLToPath(new URL("./library/blog/index.html", import.meta.url)),
      "library__reading-log": fileURLToPath(new URL("./library/reading-log/index.html", import.meta.url)),
      "library__snapshots": fileURLToPath(new URL("./library/snapshots/index.html", import.meta.url)),
      "scrapbook__palettes": fileURLToPath(new URL("./scrapbook/palettes/index.html", import.meta.url))
      },
    },
  },
});
