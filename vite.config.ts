import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Относительная база: собранное приложение работает и в корне домена,
  // и на подпути вида https://<user>.github.io/<repo>/
  base: "./",
  plugins: [react()],
  build: {
    target: "es2020",
  },
});
