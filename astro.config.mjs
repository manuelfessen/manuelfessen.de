import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from '@astrojs/sitemap';

import astro from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: 'https://manuelfessen.github.io',
  vite: {
    ssr: {
      external: ["svgo"]
    }
  },
  // Important!
  // Only official '@astrojs/*' integrations are currently supported by Astro.
  // Add 'experimental.integrations: true' to make 'astro-robots-txt' working
  // with 'astro build' command.
  experimental: {
    integrations: true,
  },
  markdown: {
    shikiConfig: {
      theme: "nord",
      wrap: true
    }
  },
  integrations: [tailwind(), sitemap(), astro()]
});