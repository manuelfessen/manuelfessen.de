import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: "nord",
      wrap: true,
    },
  },
  integrations: [tailwind()],
});