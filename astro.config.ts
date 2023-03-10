import { defineConfig } from 'astro/config';
import prefetch from '@astrojs/prefetch';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import tailwind from '@astrojs/tailwind';
import solidJs from '@astrojs/solid-js';
import mdx from '@astrojs/mdx';
import image from '@astrojs/image';
import compress from 'astro-compress';
import mdxProvider from './plugins/mdx-provider';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import remarkM2dx from 'astro-m2dx';
import remarkRouteSlug from './plugins/remark-route-slug';
import remarkReadingTime from './plugins/remark-reading-time';
import type { Options as M2dxOptions } from 'astro-m2dx';
import vercel from '@astrojs/vercel/static';

// https://astro-m2dx.netlify.app/
import partytown from "@astrojs/partytown";
const remarM2dxOptions: M2dxOptions = {
  exportComponents: true,
  frontmatter: true,
  rawmdx: true,
  relativeImages: true,
  unwrapImages: true
};


// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  site: 'https://www.manuelfessen.de/',
  output: "static",
  adapter: vercel({
    analytics: true
  }),
  markdown: {
    syntaxHighlight: false
  },
  vite: {
    plugins: [mdxProvider()]
  },
  integrations: [prefetch(), sitemap(), robotsTxt(), tailwind(), solidJs(), mdx({
    remarkPlugins: [[remarkM2dx, remarM2dxOptions], remarkRouteSlug, remarkReadingTime, remarkToc, [remarkCollapse, {
      test: "Table of contents"
    }]],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, {
      behavior: 'append'
    }]]
  }), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  }), compress({
    img: {
      webp: false
    }
  }), partytown({
    // Example: Add dataLayer.push as a forwarding-event.
    config: { 
      forward: ["dataLayer.push"] 
    },
  })],
});