import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "cart-page": [path.resolve(__dirname, "src/pages/CartPage.tsx")],
          "pizza-description-page": [
            path.resolve(__dirname, "src/pages/PizzaDescriptionPage.tsx"),
          ],
          "not-found-page": [
            path.resolve(__dirname, "src/pages/NotFoundPage.tsx"),
          ],
          vendor: ["react", "react-dom", "react-router-dom"],
        },
        chunkFileNames: "assets/[name].[hash].js",
      },
    },
  },
});
