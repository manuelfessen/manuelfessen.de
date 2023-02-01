import { readFileSync } from 'fs'
import { defineConfig } from 'astro/config'
import prefetch from '@astrojs/prefetch'
import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'
import tailwind from '@astrojs/tailwind'
import solidJs from '@astrojs/solid-js'
import mdx from '@astrojs/mdx'
import image from '@astrojs/image'
import compress from 'astro-compress'
import mdxProvider from './plugins/mdx-provider'
import remarkM2dx from 'astro-m2dx'
import remarkToc from './plugins/remark-toc'
import remarkRouteSlug from './plugins/remark-route-slug'
import remarkReadingTime from './plugins/remark-reading-time'
import type { Options as M2dxOptions } from 'astro-m2dx'

// https://astro-m2dx.netlify.app/
const remarM2dxOptions: M2dxOptions = {
  exportComponents: true,
  frontmatter: true,
  rawmdx: true,
  relativeImages: true,
  unwrapImages: true,
}

// https://astro.build/config
export default defineConfig({
  site: 'https://www.manuelfessen.de/',
  markdown: {
    syntaxHighlight: false,
  },
  vite: {
    plugins: [mdxProvider()],
  },
  integrations: [
    prefetch(),
    sitemap(),
    robotsTxt(),
    tailwind(),
    solidJs(),
    mdx({
      remarkPlugins: [
        [remarkM2dx, remarM2dxOptions],
        remarkToc,
        remarkRouteSlug,
        remarkReadingTime,
      ],
      extendPlugins: 'astroDefaults', // remark-gfm, remark-smartypants
    }),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    compress({
      img: {
        webp: false,
      },
    }),
  ],
})
