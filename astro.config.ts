import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import sitemap from "@astrojs/sitemap";
import { remarkReadingTime } from './remark-plugins/remark-reading-time.mjs';

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: "dracula",
      wrap: true
    },
    remarkPlugins: [remarkReadingTime]
  },
  site: 'https://manuelfessen.de',
  vite: {
    ssr: {
      external: ["svgo"]
    }
  },
  integrations: [mdx({}), tailwind({
    config: {
      applyBaseStyles: false
    }
  }), image(), sitemap()]
});