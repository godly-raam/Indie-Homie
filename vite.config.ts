import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const mpaRoutes = new Set([
  "/artwork",
  "/not_found",
  "/info/about",
  "/guest/guestbook",
  "/library/blog",
  "/library/reading-log",
  "/library/snapshots",
]);

export default defineConfig({
  appType: "mpa",
  plugins: [
    react(),
    {
      name: "mpa-trailing-slash",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = new URL(req.url ?? "/", "http://localhost");

          if (req.method === "GET" && mpaRoutes.has(url.pathname)) {
            res.writeHead(302, { Location: `${url.pathname}/${url.search}` });
            res.end();
            return;
          }

          next();
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
      "home": fileURLToPath(new URL("./index.html", import.meta.url)),
      "artwork": fileURLToPath(new URL("./artwork/index.html", import.meta.url)),
      "not_found": fileURLToPath(new URL("./not_found/index.html", import.meta.url)),
      "info__about": fileURLToPath(new URL("./info/about/index.html", import.meta.url)),
      "guest__guestbook": fileURLToPath(new URL("./guest/guestbook/index.html", import.meta.url)),
      "library__blog": fileURLToPath(new URL("./library/blog/index.html", import.meta.url)),
      "library__reading-log": fileURLToPath(new URL("./library/reading-log/index.html", import.meta.url)),
      "library__snapshots": fileURLToPath(new URL("./library/snapshots/index.html", import.meta.url))
      },
    },
  },
});
