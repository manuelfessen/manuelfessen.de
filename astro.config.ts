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
import remarkMath from 'remark-math'
import remarkBreaks from 'remark-breaks'
import remarkBehead from 'remark-behead'
import remarkM2dx from 'astro-m2dx'
import remarkToc from './plugins/remark-toc'
import remarkRouteSlug from './plugins/remark-route-slug'
import remarkTags from './plugins/remark-tags'
import remarkReadingTime from './plugins/remark-reading-time'
import remarkDebug from './plugins/remark-debug'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import type { Options as PrettyCodeOptions } from 'rehype-pretty-code'
import type { Options as M2dxOptions } from 'astro-m2dx'

// https://astro-m2dx.netlify.app/
const remarM2dxOptions: M2dxOptions = {
  exportComponents: true,
  frontmatter: true,
  rawmdx: true,
  relativeImages: true,
  unwrapImages: true,
}

const prettyCodeOptions: PrettyCodeOptions = {
  theme: {
    dark: JSON.parse(readFileSync('./src/assets/one-dark-pro.json', 'utf8')),
    light: JSON.parse(readFileSync('./src/assets/atom-one-light.json', 'utf8')),
  },
  tokensMap: {},
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push('highlighted')
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ['word']
  },
}

// https://astro.build/config
export default defineConfig({
  site: 'https://www.manuelfessen.de',
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
        remarkMath,
        remarkBreaks,
        [remarkBehead, { minDepth: 2 }],
        remarkImages,
        [remarkM2dx, remarM2dxOptions],
        remarkToc,
        remarkRouteSlug,
        remarkTags,
        remarkReadingTime,
        remarkDebug,
      ],
      rehypePlugins: [rehypeKatex, [rehypePrettyCode, prettyCodeOptions]],
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
